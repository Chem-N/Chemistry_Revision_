document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATABASE ---
    // ** MODIFICATION: All formulas reformatted with explicit markup (_ for subscript, ^ for superscript) **
    const questionDatabase = [
        { ion: 'Cu^2+(aq)', color: 'Blue', options: ['Blue', 'Purple', 'Colourless', 'Yellow'] },
        { ion: 'Fe^2+(aq)', color: 'Pale Green', options: ['Pale Green', 'Yellow', 'Blue', 'Purple'] },
        { ion: 'Fe^3+(aq)', color: 'Yellow/Brown', options: ['Yellow/Brown', 'Pale Green', 'Blue', 'Colourless'] },
        { ion: 'Ni^2+(aq)', color: 'Green', options: ['Green', 'Blue', 'Pink', 'Purple'] },
        { ion: 'Cr^3+(aq)', color: 'Green', options: ['Green', 'Orange', 'Yellow', 'Blue'] },
        { ion: 'MnO_4^-(aq)', color: 'Purple', options: ['Purple', 'Green', 'Colourless', 'Pink'] },
        { ion: 'Cr_2O_7^2-(aq)', color: 'Orange', options: ['Orange', 'Yellow', 'Green', 'Purple'] },
        { ion: 'Co^2+(aq)', color: 'Pink', options: ['Pink', 'Blue', 'Green', 'Colourless'] },
        { ion: 'Mn^2+(aq)', color: 'Very pale pink', options: ['Colourless', 'Very pale pink', 'Blue', 'Pale Green'] },
        { ion: 'CrO_4^2-(aq)', color: 'Yellow', options: ['Colourless', 'Yellow', 'Green', 'Orange'] },
    ];
    const encouragingMessages = ["Well Done!", "Excellent!", "Good Job!", "Fantastic!", "Great Work!"];

    // --- 2. GAME STATE & VARIABLES ---
    let currentMode = null; // 'revision' or 'challenge'
    let score = 0;
    let questionNumber = 0;
    let questionList = [];
    let currentQuestion = null;
    let boardLocked = false;
    let isMuted = false;
    let correctAnswers = 0;

    // --- 3. DOM ELEMENT REFERENCES ---
    const views = {
        mainMenu: document.getElementById('main-menu-view'),
        game: document.getElementById('game-view'),
        endScreen: document.getElementById('end-screen-view')
    };

    const ui = {
        modeTitle: document.getElementById('mode-title'),
        scoreValue: document.getElementById('score-value'),
        questionCounterDisplay: document.getElementById('question-counter-display'),
        questionCounterValue: document.getElementById('question-counter-value'),
        ionName: document.getElementById('ion-name'),
        answerOptions: document.getElementById('answer-options'),
        feedbackArea: document.getElementById('feedback-area'),
        endRevisionBtn: document.getElementById('end-revision-btn'),
        gameMuteBtn: document.getElementById('game-mute-btn'),
        mainMenuMuteBtn: document.getElementById('main-menu-mute-btn'),
        finalScore: document.getElementById('final-score'),
        endTitle: document.getElementById('end-title'),
    };
    
    const soundIcons = {
        unmuted: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        muted: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5L6 9H2v6h4l5 4V5zM17 9l-6 6M23 9l-6 6" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    };

    // --- 4. AUDIO SETUP ---
    let audioContext = null;

    function playNote(frequency, startTime, duration, type = 'sine') {
        if (!audioContext || isMuted) return;
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, startTime);
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }
    
    const correctSound = () => { if (!audioContext) return; playNote(880, audioContext.currentTime, 0.1, 'sine'); };
    const incorrectSound = () => { if (!audioContext) return; playNote(220, audioContext.currentTime, 0.2, 'sawtooth'); };
    const clickSound = () => { if (!audioContext) return; playNote(1200, audioContext.currentTime, 0.05, 'triangle'); };
    const triumphSound = () => {
        if (!audioContext || isMuted) return;
        const now = audioContext.currentTime;
        playNote(523.25, now, 0.15, 'sine'); 
        playNote(659.25, now + 0.15, 0.15, 'sine'); 
        playNote(783.99, now + 0.3, 0.15, 'sine'); 
        playNote(1046.50, now + 0.45, 0.2, 'sine');
    };

    function initializeAudio() {
        if (audioContext) return;
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
        } catch (e) {
            console.error("Web Audio API is not supported in this browser");
        }
    }
    
    function updateMuteButtons() {
        const icon = isMuted ? soundIcons.muted : soundIcons.unmuted;
        ui.gameMuteBtn.innerHTML = icon;
        ui.mainMenuMuteBtn.innerHTML = icon;
    }

    // --- 5. CORE FUNCTIONS ---
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    /**
     * ** THE FIX IS HERE: The new, explicit parser function **
     * Converts a chemical formula with explicit markup (_ for subscript, ^ for superscript)
     * into HTML with <sub> and <sup> tags.
     * @param {string} formula - The formula string, e.g., "MnO_4^-".
     * @returns {string} The HTML-formatted string, e.g., "MnO<sub>4</sub><sup>-</sup>".
     */
    function formatFormula(formula) {
        if (!formula) return '';
        return formula
            .replace(/_(\d+)/g, '<sub>$1</sub>') // Converts "_n" to "<sub>n</sub>"
            .replace(/\^([0-9]*[+\-−])/g, '<sup>$1</sup>'); // Converts "^charge" to "<sup>charge</sup>"
    }

    function switchView(viewName) {
        Object.values(views).forEach(v => v.classList.remove('active'));
        views[viewName].classList.add('active');
        updateMuteButtons();
    }
    
    function startGame(mode) {
        initializeAudio(); 
        
        currentMode = mode;
        score = 0;
        questionNumber = 0;
        correctAnswers = 0;
        boardLocked = false;
        
        ui.modeTitle.textContent = mode === 'revision' ? 'Revision Mode' : 'Challenge Mode';
        document.getElementById('score-display').style.display = mode === 'revision' ? 'block' : 'none';
        ui.questionCounterDisplay.style.display = mode === 'challenge' ? 'block' : 'none';
        ui.endRevisionBtn.style.display = mode === 'revision' ? 'block' : 'none';
        ui.feedbackArea.innerHTML = 'Choose an answer.';
        
        questionList = shuffleArray([...questionDatabase]);
            
        switchView('game');
        updateScoreUI();
        nextQuestion();
    }

    function nextQuestion() {
        if (currentMode === 'challenge' && questionNumber >= questionList.length) {
            endGame();
            return;
        }
        
        boardLocked = false;
        questionNumber++;

        if (currentMode === 'revision' && questionNumber > questionList.length) {
            questionNumber = 1;
            questionList = shuffleArray([...questionDatabase]);
        }

        currentQuestion = questionList[questionNumber - 1];

        ui.questionCounterValue.textContent = `${questionNumber}/${questionList.length}`;
        // ** MODIFICATION: Applying the parser function **
        ui.ionName.innerHTML = formatFormula(currentQuestion.ion);
        
        ui.answerOptions.innerHTML = '';
        const shuffledOptions = shuffleArray([...currentQuestion.options]);
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = option;
            button.addEventListener('click', () => handleAnswer(option, button));
            ui.answerOptions.appendChild(button);
        });

        ui.feedbackArea.innerHTML = 'Choose an answer.';
    }
    
    function handleAnswer(selectedOption, button) {
        if (boardLocked) return;
        boardLocked = true;
        
        const isCorrect = selectedOption === currentQuestion.color;
        const delay = isCorrect ? 800 : 1500;
        
        Array.from(ui.answerOptions.children).forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === currentQuestion.color) {
                btn.classList.add('correct');
            }
        });
        
        if (isCorrect) {
            correctSound();
            if (currentMode === 'revision') score += 100;
            correctAnswers++;
            ui.feedbackArea.innerHTML = `<span class="correct-text">✅ Correct!</span>`;
        } else {
            incorrectSound();
            if (currentMode === 'revision') score = Math.max(0, score - 50);
            button.classList.add('incorrect');
            ui.feedbackArea.innerHTML = `<span class="incorrect-text">❌ It's ${currentQuestion.color}.</span>`;
        }

        updateScoreUI();

        setTimeout(() => {
            nextQuestion();
        }, delay); 
    }
    
    function updateScoreUI() {
        if(currentMode === 'revision') {
            ui.scoreValue.textContent = score;
            ui.scoreValue.classList.add('pop');
            setTimeout(() => ui.scoreValue.classList.remove('pop'), 200);
        }
    }

    function endGame() {
        triumphSound();
        ui.endTitle.innerHTML = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
        
        if (currentMode === 'revision') {
            ui.finalScore.textContent = score;
        } else {
            ui.finalScore.textContent = `${correctAnswers} / ${questionList.length}`;
        }
        
        switchView('endScreen');
    }

    function showMainMenu() {
        switchView('mainMenu');
    }

    function toggleMute() {
        isMuted = !isMuted;
        updateMuteButtons();
        clickSound();
    }

    // --- 6. EVENT LISTENERS ---
    document.getElementById('revision-btn').addEventListener('click', () => { clickSound(); startGame('revision'); });
    document.getElementById('challenge-btn').addEventListener('click', () => { clickSound(); startGame('challenge'); });
    document.querySelectorAll('.back-button').forEach(btn => btn.addEventListener('click', () => { clickSound(); showMainMenu(); }));
    document.getElementById('main-menu-btn').addEventListener('click', () => { clickSound(); showMainMenu(); });
    document.getElementById('play-again-btn').addEventListener('click', () => { clickSound(); startGame(currentMode); });
    ui.gameMuteBtn.addEventListener('click', toggleMute);
    ui.mainMenuMuteBtn.addEventListener('click', toggleMute);
    ui.endRevisionBtn.addEventListener('click', () => { clickSound(); endGame(); });
    
    // --- Initial setup ---
    updateMuteButtons();
    switchView('mainMenu');
});

