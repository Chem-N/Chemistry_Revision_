document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATABASE ---
    const cationDatabase = [
        { name: 'Sodium ion', formula: 'Na^+', options: ['Na^+', 'So^+'], elements: ['Na'] },
        { name: 'Potassium ion', formula: 'K^+', options: ['K^+', 'P^+'], elements: ['K'] },
        { name: 'Copper(I) ion', formula: 'Cu^+', options: ['Cu^+', 'Cu^2+'], elements: ['Cu'] },
        { name: 'Silver ion', formula: 'Ag^+', options: ['Ag^+', 'Ag^2+'], elements: ['Ag'] },
        { name: 'Hydrogen ion', formula: 'H^+', options: ['H^+', 'H^-'], elements: ['H'] },
        { name: 'Ammonium ion', formula: 'NH_4^+', options: ['NH_4^+', 'NH_3'], elements: ['N', 'H'] },
        { name: 'Magnesium ion', formula: 'Mg^2+', options: ['Mg^2+', 'Mg^+'], elements: ['Mg'] },
        { name: 'Calcium ion', formula: 'Ca^2+', options: ['Ca^2+', 'Ca^+'], elements: ['Ca'] },
        { name: 'Barium ion', formula: 'Ba^2+', options: ['Ba^2+', 'Ba^+'], elements: ['Ba'] },
        { name: 'Lead(II) ion', formula: 'Pb^2+', options: ['Pb^2+', 'Pb^4+'], elements: ['Pb'] },
        { name: 'Iron(II) ion', formula: 'Fe^2+', options: ['Fe^2+', 'Fe^3+'], elements: ['Fe'] },
        { name: 'Cobalt(II) ion', formula: 'Co^2+', options: ['Co^2+', 'Co^3+'], elements: ['Co'] },
        { name: 'Nickel(II) ion', formula: 'Ni^2+', options: ['Ni^2+', 'N^2+'], elements: ['Ni'] },
        { name: 'Manganese(II) ion', formula: 'Mn^2+', options: ['Mn^2+', 'Mg^2+'], elements: ['Mn'] },
        { name: 'Copper(II) ion', formula: 'Cu^2+', options: ['Cu^2+', 'Cu^+'], elements: ['Cu'] },
        { name: 'Zinc ion', formula: 'Zn^2+', options: ['Zn^2+', 'Zn^+'], elements: ['Zn'] },
        { name: 'Mercury(II) ion', formula: 'Hg^2+', options: ['Hg^2+', 'Me^2+'], elements: ['Hg'] },
        { name: 'Aluminium ion', formula: 'Al^3+', options: ['Al^3+', 'Al^2+'], elements: ['Al'] },
        { name: 'Iron(III) ion', formula: 'Fe^3+', options: ['Fe^3+', 'Fe^2+'], elements: ['Fe'] },
        { name: 'Chromium(III) ion', formula: 'Cr^3+', options: ['Cr^3+', 'Cr^6+'], elements: ['Cr'] }
    ];
    
    const anionDatabase = [
        { name: 'Hydride ion', formula: 'H^-', options: ['H^-', 'H^+'], elements: ['H'] },
        { name: 'Chloride ion', formula: 'Cl^-', options: ['Cl^-', 'Cl_2^-'], elements: ['Cl'] },
        { name: 'Bromide ion', formula: 'Br^-', options: ['Br^-', 'Br_2^-'], elements: ['Br'] },
        { name: 'Iodide ion', formula: 'I^-', options: ['I^-', 'I_2^-'], elements: ['I'] },
        { name: 'Hydroxide ion', formula: 'OH^-', options: ['OH^-', 'O^2-'], elements: ['O', 'H'] },
        { name: 'Nitrate ion', formula: 'NO_3^-', options: ['NO_3^-', 'NO_2^-'], elements: ['N', 'O'] },
        { name: 'Nitrite ion', formula: 'NO_2^-', options: ['NO_2^-', 'NO_3^-'], elements: ['N', 'O'] },
        { name: 'Hydrogencarbonate ion', formula: 'HCO_3^-', options: ['HCO_3^-', 'CO_3^2-'], elements: ['H', 'C', 'O'] },
        { name: 'Hydrogensulphate ion', formula: 'HSO_4^-', options: ['HSO_4^-', 'HSO_3^2-'], elements: ['H', 'S', 'O'] },
        { name: 'Cyanide ion', formula: 'CN^-', options: ['CN^-', 'CNO^-'], elements: ['C', 'N'] },
        { name: 'Permanganate ion', formula: 'MnO_4^-', options: ['MnO_4^-', 'MnO_3^2-'], elements: ['Mn', 'O'] },
        { name: 'Chlorate ion', formula: 'ClO_3^-', options: ['ClO_3^-', 'Cl^-'], elements: ['Cl', 'O'] },
        { name: 'Hypochlorite ion', formula: 'ClO^-', options: ['ClO^-', 'ClO_3^-'], elements: ['Cl', 'O'] },
        { name: 'Oxide ion', formula: 'O^2-', options: ['O^2-', 'O^-'], elements: ['O'] },
        { name: 'Sulphide ion', formula: 'S^2-', options: ['S^2-', 'S^-'], elements: ['S'] },
        { name: 'Sulphate ion', formula: 'SO_4^2-', options: ['SO_4^2-', 'SO_3^2-'], elements: ['S', 'O'] },
        { name: 'Sulphite ion', formula: 'SO_3^2-', options: ['SO_3^2-', 'SO_4^2-'], elements: ['S', 'O'] },
        { name: 'Thiosulphate ion', formula: 'S_2O_3^2-', options: ['S_2O_3^2-', 'SO_4^2-'], elements: ['S', 'O'] },
        { name: 'Silicate ion', formula: 'SiO_3^2-', options: ['SiO_3^2-', 'SiO_4^4-'], elements: ['Si', 'O'] },
        { name: 'Carbonate ion', formula: 'CO_3^2-', options: ['CO_3^2-', 'HCO_3^-'], elements: ['C', 'O'] },
        { name: 'Chromate ion', formula: 'CrO_4^2-', options: ['CrO_4^2-', 'Cr_2O_7^2-'], elements: ['Cr', 'O'] },
        { name: 'Dichromate ion', formula: 'Cr_2O_7^2-', options: ['Cr_2O_7^2-', 'Cr_2O_4^2-'], elements: ['Cr', 'O'] },
        { name: 'Nitride ion', formula: 'N^3-', options: ['N^3-', 'N^-'], elements: ['N'] },
        { name: 'Phosphide ion', formula: 'P^3-', options: ['P^3-', 'P^-'], elements: ['P'] },
        { name: 'Phosphate ion', formula: 'PO_4^3-', options: ['PO_4^3-', 'P^3-'], elements: ['P', 'O'] }
    ];
    const fullIonDatabase = [...cationDatabase, ...anionDatabase];
    const encouragingMessages = ["Well Done!", "Excellent!", "Good Job!", "Fantastic!"];

    // --- 2. GAME STATE & VARIABLES ---
    let currentMode = null;
    let score = 0;
    let questionNumber = 0;
    let questionList = [];
    let currentQuestion = null;
    let boardLocked = false;
    let isMuted = false;
    let formatMap = [];
    let plainUserInput = '';

    // --- 3. DOM ELEMENT REFERENCES ---
    const views = {
        mainMenu: document.getElementById('view-game2-menu'),
        modeSelect: document.getElementById('view-mode-select'),
        gameMC: document.getElementById('view-game-mc'),
        gameInput: document.getElementById('view-game-input'),
        endScreen: document.getElementById('view-end-screen')
    };

    const ui = {
        // MC Mode
        mcModeTitle: document.getElementById('mc-mode-title'),
        mcScoreValue: document.getElementById('mc-score-value'),
        mcIonName: document.getElementById('mc-ion-name'),
        mcAnswerOptions: document.getElementById('mc-answer-options'),
        mcFeedbackArea: document.getElementById('mc-feedback-area'),
        mcEndRevisionBtn: document.getElementById('mc-end-revision-btn'),
        // Input Mode
        inputIonName: document.getElementById('input-ion-name'),
        inputFormulaDisplay: document.getElementById('input-formula-display'),
        inputKeyboard: document.getElementById('input-keyboard'),
        inputFeedbackArea: document.getElementById('input-feedback-area'),
        inputSubmitBtn: document.getElementById('input-submit-btn'),
        inputNextQuestionBtn: document.getElementById('input-next-question-btn'),
        inputScoreValue: document.getElementById('input-score-value'),
        inputEndRevisionBtn: document.getElementById('input-end-revision-btn'),
        // End Screen
        finalScore: document.getElementById('final-score'),
        endTitle: document.getElementById('end-title'),
    };
    
    const soundIcons = {
        unmuted: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        muted: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5L6 9H2v6h4l5 4V5zM17 9l-6 6M23 9l-6 6" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    };

    // --- 4. AUDIO SETUP ---
    let audioContext = null;
    const playNote = (freq, start, dur, type) => { if (!audioContext || isMuted) return; const osc = audioContext.createOscillator(), gain = audioContext.createGain(); osc.connect(gain); gain.connect(audioContext.destination); osc.type = type; osc.frequency.setValueAtTime(freq, start); gain.gain.setValueAtTime(0.3, start); gain.gain.exponentialRampToValueAtTime(0.001, start + dur); osc.start(start); osc.stop(start + dur); };
    const correctSound = () => { if (!audioContext) return; playNote(880, audioContext.currentTime, 0.1, 'sine'); };
    const incorrectSound = () => { if (!audioContext) return; playNote(220, audioContext.currentTime, 0.2, 'sawtooth'); };
    const clickSound = () => { if (!audioContext) return; playNote(1200, audioContext.currentTime, 0.05, 'triangle'); };
    const triumphSound = () => { if (!audioContext || isMuted) return; const now = audioContext.currentTime; playNote(523.25, now, 0.15); playNote(659.25, now + 0.15, 0.15); playNote(783.99, now + 0.3, 0.15); playNote(1046.50, now + 0.45, 0.2); };
    const initializeAudio = () => { if (audioContext) return; try { audioContext = new (window.AudioContext || window.webkitAudioContext)(); if (audioContext.state === 'suspended') audioContext.resume(); } catch (e) { console.error("Web Audio API not supported"); } };
    function updateMuteButtons() { const icon = isMuted ? soundIcons.muted : soundIcons.unmuted; document.querySelectorAll('.mute-btn').forEach(btn => btn.innerHTML = icon); }
    function toggleMute() { isMuted = !isMuted; updateMuteButtons(); clickSound(); }

    // --- 5. CORE FUNCTIONS ---
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    function switchView(viewName) { Object.values(views).forEach(v => v.classList.remove('active')); if (views[viewName]) views[viewName].classList.add('active'); updateMuteButtons(); }

    function formatFormulaHTML(formula) { if (!formula) return ''; return formula.replace(/_(\d+)/g, '<sub>$1</sub>').replace(/\^([^_\^]+)/g, '<sup>$1</sup>'); }
    
    function buildFormatMap(formulaWithMarkup) { const map = []; let scriptType = 'normal'; for (let i = 0; i < formulaWithMarkup.length; i++) { const char = formulaWithMarkup[i]; if (char === '_') { scriptType = 'subscript'; continue; } if (char === '^') { scriptType = 'superscript'; continue; } map.push(scriptType); if (scriptType === 'subscript' && !/\d/.test(formulaWithMarkup[i+1])) { scriptType = 'normal'; } } return map; }
    
    function normalizeFormula(formula) { return formula.replace(/_1/g, ''); }

    function updateScoreUI() {
        if (currentMode === 'cation-mc' || currentMode === 'anion-mc') {
            ui.mcScoreValue.textContent = score;
            ui.mcScoreValue.classList.add('pop');
            setTimeout(() => ui.mcScoreValue.classList.remove('pop'), 200);
        } else if (currentMode === 'input') {
            ui.inputScoreValue.textContent = score;
            ui.inputScoreValue.classList.add('pop');
            setTimeout(() => ui.inputScoreValue.classList.remove('pop'), 200);
        }
    }

    // --- MC MODE LOGIC ---
    function startMCGame(mode) {
        currentMode = mode;
        if (mode === 'cation-mc') {
            questionList = shuffleArray([...cationDatabase]);
            ui.mcModeTitle.textContent = 'Cation Revision (MC)';
        } else {
            questionList = shuffleArray([...anionDatabase]);
            ui.mcModeTitle.textContent = 'Anion Revision (MC)';
        }
        score = 0;
        questionNumber = 0;
        boardLocked = false;
        updateScoreUI();
        switchView('gameMC');
        nextMCQuestion();
    }

    function nextMCQuestion() {
        boardLocked = false;
        questionNumber++;
        if (questionNumber > questionList.length) {
            questionNumber = 1;
            questionList = shuffleArray([...questionList]);
        }
        currentQuestion = questionList[questionNumber - 1];
        ui.mcIonName.innerHTML = currentQuestion.name;
        ui.mcAnswerOptions.innerHTML = '';
        const shuffledOptions = shuffleArray([...currentQuestion.options]);
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'answer-btn chemical-formula';
            button.innerHTML = formatFormulaHTML(option);
            button.dataset.formula = option;
            button.addEventListener('click', () => handleMCAnswer(option, button));
            ui.mcAnswerOptions.appendChild(button);
        });
        ui.mcFeedbackArea.innerHTML = 'Choose an answer.';
    }

    function handleMCAnswer(selectedFormula, button) {
        if (boardLocked) return;
        boardLocked = true;
        const isCorrect = selectedFormula === currentQuestion.formula;
        const delay = isCorrect ? 800 : 1500;
        Array.from(ui.mcAnswerOptions.children).forEach(btn => { btn.disabled = true; if (btn.dataset.formula === currentQuestion.formula) btn.classList.add('correct'); });
        if (isCorrect) {
            correctSound();
            score += 100;
            ui.mcFeedbackArea.innerHTML = `<span class="correct-text">✅ Correct!</span>`;
        } else {
            incorrectSound();
            score = Math.max(0, score - 50);
            button.classList.add('incorrect');
            const correctFormulaHTML = formatFormulaHTML(currentQuestion.formula);
            ui.mcFeedbackArea.innerHTML = `<span class="incorrect-text">❌ It's ${correctFormulaHTML}.</span>`;
        }
        updateScoreUI();
        setTimeout(() => nextMCQuestion(), delay);
    }

    // --- INPUT MODE LOGIC ---
    function startInputGame() {
        currentMode = 'input';
        questionList = shuffleArray([...fullIonDatabase]);
        score = 0;
        questionNumber = 0;
        boardLocked = false;
        updateScoreUI();
        switchView('gameInput');
        nextInputQuestion();
    }
    
    function nextInputQuestion() {
        questionNumber++;
        if (questionNumber > questionList.length) {
             questionNumber = 1;
             questionList = shuffleArray([...questionList]);
        }
        currentQuestion = questionList[questionNumber - 1];
        formatMap = buildFormatMap(currentQuestion.formula);
        ui.inputIonName.textContent = currentQuestion.name;

        // ** THE FIX IS HERE: Add/remove class based on name length **
        const longIonNames = ['Permanganate ion', 'Hydrogencarbonate ion', 'Hydrogensulphate ion'];
        if (longIonNames.includes(currentQuestion.name)) {
            ui.inputIonName.classList.add('long-name');
        } else {
            ui.inputIonName.classList.remove('long-name');
        }

        generateInputKeyboard(currentQuestion.elements);
        plainUserInput = '';
        updateInputDisplay();
        ui.inputFeedbackArea.innerHTML = '';
        ui.inputSubmitBtn.disabled = false;
        ui.inputNextQuestionBtn.disabled = false;
    }

    function updateInputDisplay() {
        let markedUpInput = '';
        for (let i = 0; i < plainUserInput.length; i++) {
            const char = plainUserInput[i];
            const script = formatMap[i] || 'normal';
            const prevScript = i > 0 ? (formatMap[i - 1] || 'normal') : null;
            if (script !== prevScript) {
                if (script === 'subscript') markedUpInput += '_';
                if (script === 'superscript') markedUpInput += '^';
            }
            markedUpInput += char;
        }
        ui.inputFormulaDisplay.innerHTML = formatFormulaHTML(markedUpInput);
    }

    function generateInputKeyboard(elements) {
        ui.inputKeyboard.innerHTML = '';
        const otherElements = elements.filter(el => el !== 'O');
        const elementKeys = ['O', ...otherElements];
        const controlKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', 'DEL'];
        const elementRow = document.createElement('div');
        elementRow.className = 'keyboard-row element-row';
        elementKeys.forEach(key => {
            const button = document.createElement('button');
            button.className = 'kbd-btn element';
            button.textContent = key;
            button.dataset.key = key;
            elementRow.appendChild(button);
        });
        const controlRow = document.createElement('div');
        controlRow.className = 'keyboard-row control-row';
        controlKeys.forEach(key => {
            const button = document.createElement('button');
            button.className = 'kbd-btn';
            button.textContent = key === 'DEL' ? '⌫' : key;
            button.dataset.key = key;
            if (!isNaN(parseInt(key))) button.classList.add('number');
            else if (['+', '-'].includes(key)) button.classList.add('charge');
            else if (key === 'DEL') button.classList.add('action');
            controlRow.appendChild(button);
        });
        ui.inputKeyboard.appendChild(elementRow);
        ui.inputKeyboard.appendChild(controlRow);
    }

    function handleKeyInput(key) {
        if (key === 'DEL') {
            plainUserInput = plainUserInput.slice(0, -1);
        } else {
            plainUserInput += key;
        }
        updateInputDisplay();
    }

    function checkInputAnswer() {
        let markedUpFinalInput = '';
        for (let i = 0; i < plainUserInput.length; i++) {
            const char = plainUserInput[i];
            const script = formatMap[i] || 'normal';
            const prevScript = i > 0 ? (formatMap[i - 1] || 'normal') : null;
            if (script !== prevScript) {
                if (script === 'subscript') markedUpFinalInput += '_';
                if (script === 'superscript') markedUpFinalInput += '^';
            }
            markedUpFinalInput += char;
        }
        const normalizedUserInput = normalizeFormula(markedUpFinalInput);
        const normalizedCorrectAnswer = normalizeFormula(currentQuestion.formula);
        ui.inputSubmitBtn.disabled = true;
        ui.inputNextQuestionBtn.disabled = true;
        const isCorrect = normalizedUserInput === normalizedCorrectAnswer;
        if (isCorrect) {
            correctSound();
            score += 100;
            ui.inputFeedbackArea.innerHTML = `<span class="correct-text">✅ Correct! Well Done!</span>`;
            setTimeout(nextInputQuestion, 1000);
        } else {
            incorrectSound();
            score = Math.max(0, score - 50);
            ui.inputFeedbackArea.innerHTML = `<span class="incorrect-text">❌ Not quite. The correct formula is ${formatFormulaHTML(currentQuestion.formula)}</span>`;
            setTimeout(nextInputQuestion, 2500);
        }
        updateScoreUI();
    }

    // --- GENERAL GAME FUNCTIONS ---
    function endGame() {
        triumphSound();
        ui.endTitle.innerHTML = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
        ui.finalScore.textContent = score;
        switchView('endScreen');
    }

    // --- 6. EVENT LISTENERS ---
    document.getElementById('goto-mode-select-btn').addEventListener('click', () => { clickSound(); switchView('modeSelect'); });
    document.querySelectorAll('.back-to-main-menu').forEach(btn => btn.addEventListener('click', () => { clickSound(); switchView('mainMenu'); }));
    document.querySelectorAll('.back-to-mode-select').forEach(btn => btn.addEventListener('click', () => { clickSound(); switchView('modeSelect'); }));
    document.getElementById('start-cation-mc-btn').addEventListener('click', () => { initializeAudio(); clickSound(); startMCGame('cation-mc'); });
    document.getElementById('start-anion-mc-btn').addEventListener('click', () => { initializeAudio(); clickSound(); startMCGame('anion-mc'); });
    document.getElementById('start-input-btn').addEventListener('click', () => { initializeAudio(); clickSound(); startInputGame(); });
    ui.mcEndRevisionBtn.addEventListener('click', () => { clickSound(); endGame(); });
    ui.inputEndRevisionBtn.addEventListener('click', () => { clickSound(); endGame(); });
    ui.inputKeyboard.addEventListener('click', (e) => { if (e.target.matches('.kbd-btn') && !ui.inputSubmitBtn.disabled) handleKeyInput(e.target.dataset.key); });
    ui.inputSubmitBtn.addEventListener('click', checkInputAnswer);
    ui.inputNextQuestionBtn.addEventListener('click', nextInputQuestion);
    document.getElementById('play-again-btn').addEventListener('click', () => { clickSound(); if (currentMode === 'input') startInputGame(); else startMCGame(currentMode); });
    document.getElementById('main-menu-btn').addEventListener('click', () => { clickSound(); switchView('modeSelect'); });
    document.querySelectorAll('.mute-btn').forEach(btn => btn.addEventListener('click', toggleMute));

    // Initial setup
    updateMuteButtons();
    switchView('mainMenu');
});

