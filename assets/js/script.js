// App State
let activeTab = 'standard';
let isMenuOpen = false;

// Persistent History Logic
let history = JSON.parse(localStorage.getItem('ignitecalc_history')) || [];

function saveHistory(item) {
    const historyItem = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        ...item
    };
    history.unshift(historyItem);
    if (history.length > 50) history.pop(); // Keep last 50 items
    localStorage.setItem('ignitecalc_history', JSON.stringify(history));
}

function clearHistory() {
    history = [];
    localStorage.removeItem('ignitecalc_history');
    renderApp();
}

// --- Standard Calculator State ---
let stdCurrent = '0';
let stdPrevious = '';
let stdOperation = null;

// --- Scientific Calculator State ---
let sciCurrent = '0';
let sciPrevious = '';
let sciOperation = null;

// --- CGPA State ---
let courses = [{ id: 1, title: '', unit: '', grade: '5' }];

// Initialize Application
function init() {
    renderApp();
}

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    renderApp();
}

function renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="app-container min-h-screen flex flex-col p-4 md:p-8">
            ${renderNavigation()}
            ${renderHeader()}
            <main class="flex-1 flex justify-center items-start pt-4 pb-12">
                ${renderActiveTab()}
            </main>
            ${renderFooter()}
            ${renderMenuOverlay()}
        </div>
    `;
    setupEventListeners();
}

function renderNavigation() {
    return `
        <nav class="flex justify-between items-center mb-8 px-2">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span class="font-bold text-white">IC</span>
                </div>
                <span class="font-outfit font-bold text-xl tracking-wide hidden sm:block">IgniteCalc</span>
            </div>
            <button onclick="toggleMenu()" class="glass px-5 py-2.5 rounded-xl font-bold text-slate-300 hover:text-white flex items-center gap-2 group">
                <div class="flex flex-col gap-1 w-5">
                    <span class="h-0.5 w-full bg-current transition-all group-hover:w-full"></span>
                    <span class="h-0.5 w-3/4 bg-current transition-all group-hover:w-full"></span>
                    <span class="h-0.5 w-full bg-current transition-all group-hover:w-full"></span>
                </div>
                Menu
            </button>
        </nav>
    `;
}

function renderHeader() {
    return `
        <div class="dynamic-island"></div>
        <header class="flex flex-col items-center gap-4 mb-12 text-center pt-2">
<h1 class="text-6xl md:text-8xl font-black font-outfit text-gradient tracking-tighter"> 
                CALC_PRO
            </h1>
            <p class="text-slate-500 text-sm md:text-base font-medium uppercase tracking-[0.2em] opacity-80">
                Premium Performance Suite
            </p>
        </header>
    `;
}

function renderMenuOverlay() {
    if (!isMenuOpen) return '';
    return `
        <div class="fixed inset-0 z-50 flex justify-end">
            <div onclick="toggleMenu()" class="menu-backdrop absolute inset-0"></div>
            <div class="glass w-full max-w-sm h-full shadow-2xl p-8 relative z-10 flex flex-col slide-in-right">
                <div class="flex justify-between items-center mb-12">
                    <span class="font-outfit font-black text-2xl tracking-tighter text-gradient">NAVIGATION</span>
                    <button onclick="toggleMenu()" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-slate-400">
                        ✕
                    </button>
                </div>
                
                <div class="flex flex-col gap-4">
                    <button onclick="switchTab('standard')" class="menu-item ${activeTab === 'standard' ? 'active' : ''} p-5 rounded-2xl flex flex-col text-left">
                        <span class="font-bold text-lg">Standard Mode</span>
                        <span class="text-xs opacity-60">High-speed arithmetic engine</span>
                    </button>
                    <button onclick="switchTab('scientific')" class="menu-item ${activeTab === 'scientific' ? 'active' : ''} p-5 rounded-2xl flex flex-col text-left">
                        <span class="font-bold text-lg">Scientific Mode</span>
                        <span class="text-xs opacity-60">Advanced mathematical processor</span>
                    </button>
                    <button onclick="switchTab('cgpa')" class="menu-item ${activeTab === 'cgpa' ? 'active' : ''} p-5 rounded-2xl flex flex-col text-left">
                        <span class="font-bold text-lg">CGPA Analyst</span>
                        <span class="text-xs opacity-60">Academic performance tracking</span>
                    </button>
                    <button onclick="switchTab('history')" class="menu-item ${activeTab === 'history' ? 'active' : ''} p-5 rounded-2xl flex flex-col text-left mt-8 border-dashed border-white/20">
                        <span class="font-bold text-lg">Calculated History</span>
                        <span class="text-xs opacity-60">Review your past operations</span>
                    </button>
                    <button onclick="switchTab('contact')" class="menu-item ${activeTab === 'contact' ? 'active' : ''} p-5 rounded-2xl flex flex-col text-left mt-2">
                        <span class="font-bold text-lg">Support & Contact</span>
                        <span class="text-xs opacity-60">Help & bug reports for IgniteCalc</span>
                    </button>
                </div>

                <div class="mt-auto pt-8 border-t border-white/5 text-center">
                    <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Device Status</p>
                    <div class="flex justify-center gap-6">
                        <div class="flex flex-col">
                            <span class="text-emerald-500 text-xs">PWA ACTIVE</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-indigo-400 text-xs">64-BIT ENGINE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderActiveTab() {
    if (activeTab === 'standard') return renderStandardCalc();
    if (activeTab === 'scientific') return renderScientificCalc();
    if (activeTab === 'cgpa') return renderCGPACalc();
    if (activeTab === 'history') return renderHistoryView();
    if (activeTab === 'contact') return renderContactView();
}

function renderContactView() {
    return `
        <section class="tab-content active w-full max-w-[600px]">
            <div class="calc-card glass p-8 md:p-12 rounded-[3.5rem] shadow-2xl text-center">
                <div class="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto mb-8 flex items-center justify-center p-1 shadow-xl shadow-indigo-500/20">
                    <div class="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                        <span class="text-3xl font-black font-outfit text-white">F</span>
                    </div>
                </div>
                
                <h2 class="text-3xl font-black font-outfit text-gradient mb-2 uppercase tracking-tighter">SUPPORT CENTER</h2>
                <p class="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mb-8">Developed by FLAMEZ_DEV02</p>

                <div class="space-y-4 text-left">
                    <div class="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 transition-all hover:bg-white/5">
                        <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
                            !
                        </div>
                        <div>
                            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Report a Problem</p>
                            <p class="text-slate-200 font-semibold">flamezdev.tech@gmail.com</p>
                        </div>
                    </div>

                    <div class="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 transition-all hover:bg-white/5">
                        <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                            🔗
                        </div>
                        <div>
                            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Social Presence</p>
                            <p class="text-slate-200 font-semibold">@flamez_dev02</p>
                        </div>
                    </div>

                    <div class="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 transition-all hover:bg-white/5">
                        <div class="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                            📍
                        </div>
                        <div>
                            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Base Location</p>
                            <p class="text-slate-200 font-semibold">Remote Operations</p>
                        </div>
                    </div>
                </div>

                <div class="mt-12">
                    <button onclick="switchTab('standard')" class="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-black tracking-widest text-xs shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all">
                        BACK TO SUITE
                    </button>
                </div>
            </div>
        </section>
    `;
}

function renderStandardCalc() {
    return `
        <section class="tab-content active w-full max-w-[420px]">
            <div class="calc-card glass p-8 rounded-[3rem] shadow-2xl">
                <div class="display bg-black/40 rounded-[2rem] p-8 mb-8 text-right flex flex-col justify-end min-h-[140px] border border-white/5 shadow-inner">
                    <div class="text-slate-500 text-lg font-medium opacity-60 mb-2">${stdPrevious} ${stdOperation || ''}</div>
                    <div class="text-5xl font-black font-outfit tracking-tighter">${stdCurrent}</div>
                </div>
                <div class="grid grid-cols-4 gap-4">
                    <button class="calc-btn clear bg-red-500/10 text-red-400 h-16 rounded-[1.25rem] font-bold text-lg" data-action="clear-std">AC</button>
                    <button class="calc-btn bg-white/5 p-5 rounded-[1.25rem] font-bold text-lg text-slate-300" data-action="del-std">DEL</button>
                    <button class="calc-btn bg-indigo-500/10 text-indigo-400 p-5 rounded-[1.25rem] font-bold text-2xl" data-op="/">÷</button>
                    <button class="calc-btn bg-indigo-500/10 text-indigo-400 p-5 rounded-[1.25rem] font-bold text-2xl" data-op="*">×</button>
                    
                    ${['7','8','9','-'].map((n, i) => `
                        <button class="calc-btn ${i === 3 ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5'} h-16 rounded-[1.25rem] font-bold text-xl" 
                                ${i === 3 ? `data-op="${n}"` : `data-num="${n}"`}>${n === '-' ? '−' : n}</button>
                    `).join('')}
                    
                    ${['4','5','6','+'].map((n, i) => `
                        <button class="calc-btn ${i === 3 ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5'} h-16 rounded-[1.25rem] font-bold text-xl" 
                                ${i === 3 ? `data-op="${n}"` : `data-num="${n}"`}>${n}</button>
                    `).join('')}
                    
                    <div class="col-span-3 grid grid-cols-3 gap-4">
                        ${['1','2','3','0','.'].map((n, i) => `
                            <button class="calc-btn bg-white/5 h-16 rounded-[1.25rem] font-bold text-xl ${n === '0' ? 'col-span-2' : ''}" data-num="${n}">${n}</button>
                        `).join('')}
                    </div>
                    <button class="calc-btn bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-[1.25rem] font-bold text-3xl shadow-lg shadow-indigo-500/30" data-action="calc-std">=</button>
                </div>
            </div>
        </section>
    `;
}

function renderScientificCalc() {
    return `
        <section class="tab-content active w-full max-w-[650px]">
            <div class="calc-card glass p-8 rounded-[3rem] shadow-2xl">
                <div class="display bg-black/40 rounded-[2rem] p-8 mb-8 text-right flex flex-col justify-end min-h-[160px] border border-white/5 shadow-inner">
                    <div class="text-slate-500 text-lg font-medium opacity-60 mb-2">${sciPrevious} ${sciOperation || ''}</div>
                    <div class="text-5xl font-black font-outfit tracking-tighter">${sciCurrent}</div>
                </div>
                <div class="grid grid-cols-5 gap-3">
                    ${['sin', 'cos', 'tan'].map(f => `<button class="calc-btn bg-indigo-500/10 text-indigo-400 p-4 rounded-xl font-bold italic" data-func="${f}">${f}</button>`).join('')}
                    <button class="calc-btn bg-red-500/10 text-red-400 p-4 rounded-xl font-bold" data-action="clear-sci">AC</button>
                    <button class="calc-btn bg-white/5 p-4 rounded-xl font-bold" data-action="del-sci">DEL</button>

                    ${['log', 'ln', 'pi'].map(f => `<button class="calc-btn bg-purple-500/10 text-purple-400 p-4 rounded-xl font-bold italic" data-func="${f}">${f === 'pi' ? 'π' : f}</button>`).join('')}
                    <button class="calc-btn bg-indigo-500/10 text-indigo-400 p-4 rounded-xl font-bold text-2xl" data-op-sci="/">÷</button>
                    <button class="calc-btn bg-indigo-500/10 text-indigo-400 p-4 rounded-xl font-bold text-2xl" data-op-sci="*">×</button>

                    <button class="calc-btn bg-purple-500/10 text-purple-400 p-4 rounded-xl font-bold italic" data-func="sqrt">√</button>
                    ${['7','8','9'].map(n => `<button class="calc-btn bg-white/5 p-4 rounded-xl font-bold text-xl" data-num-sci="${n}">${n}</button>`).join('')}
                    <button class="calc-btn bg-indigo-500/10 text-indigo-400 p-4 rounded-xl font-bold text-2xl" data-op-sci="-">−</button>

                    <button class="calc-btn bg-purple-500/10 text-purple-400 p-4 rounded-xl font-bold italic" data-func="pow2">x²</button>
                    ${['4','5','6'].map(n => `<button class="calc-btn bg-white/5 p-4 rounded-xl font-bold text-xl" data-num-sci="${n}">${n}</button>`).join('')}
                    <button class="calc-btn bg-indigo-500/10 text-indigo-400 p-4 rounded-xl font-bold text-2xl" data-op-sci="+">+</button>

                    <button class="calc-btn bg-purple-500/10 text-purple-400 p-4 rounded-xl font-bold italic" data-op-sci="^">xʸ</button>
                    ${['1','2','3'].map(n => `<button class="calc-btn bg-white/5 p-4 rounded-xl font-bold text-xl" data-num-sci="${n}">${n}</button>`).join('')}
                    <button class="calc-btn bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-2xl shadow-lg" data-action="calc-sci">=</button>

                    ${['e', 'abs'].map(f => `<button class="calc-btn bg-purple-500/10 text-purple-400 p-4 rounded-xl font-bold text-xl italic" data-func="${f}">${f === 'abs' ? '|x|' : f}</button>`).join('')}
                    <button class="calc-btn bg-white/5 p-4 rounded-xl font-bold text-xl" data-num-sci="0">0</button>
                    <button class="calc-btn bg-white/5 p-4 rounded-xl font-bold text-xl" data-num-sci=".">.</button>
                    <button class="calc-btn bg-white/5 p-4 rounded-xl font-medium text-xs" data-func="rand">RAND</button>
                </div>
            </div>
        </section>
    `;
}

function renderCGPACalc() {
    return `
        <section class="tab-content active w-full max-w-[850px]">
            <div class="calc-card glass p-8 md:p-12 rounded-[3.5rem] shadow-2xl">
                <div id="course-container" class="space-y-4 mb-8">
                    <div class="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-6 px-4 text-slate-500 font-bold text-xs uppercase tracking-widest">
                        <div>Course Description</div>
                        <div>Credit Units</div>
                        <div>Letter Grade</div>
                        <div class="w-10"></div>
                    </div>
                    
                    ${courses.map(course => `
                        <div class="course-row grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center bg-black/40 p-5 rounded-3xl border border-white/5 hover:border-indigo-500/30">
                            <input data-id="${course.id}" data-field="title" type="text" placeholder="e.g. Advanced Calculus" value="${course.title}" class="cgpa-input bg-transparent border border-white/5 rounded-2xl p-4 outline-none focus:border-indigo-500 focus:bg-white/5 transition-all font-semibold text-slate-200">
                            <input data-id="${course.id}" data-field="unit" type="number" placeholder="Units" value="${course.unit}" class="cgpa-input bg-transparent border border-white/5 rounded-2xl p-4 outline-none focus:border-indigo-500 focus:bg-white/5 transition-all font-semibold text-slate-200">
                            <select data-id="${course.id}" data-field="grade" class="cgpa-input bg-slate-900 border border-white/5 rounded-2xl p-4 outline-none focus:border-indigo-500 focus:bg-white/5 transition-all font-bold text-indigo-400">
                                <option value="5" ${course.grade === '5' ? 'selected' : ''}>A (5.0)</option>
                                <option value="4" ${course.grade === '4' ? 'selected' : ''}>B (4.0)</option>
                                <option value="3" ${course.grade === '3' ? 'selected' : ''}>C (3.0)</option>
                                <option value="2" ${course.grade === '2' ? 'selected' : ''}>D (2.0)</option>
                                <option value="1" ${course.grade === '1' ? 'selected' : ''}>E (1.0)</option>
                                <option value="0" ${course.grade === '0' ? 'selected' : ''}>F (0.0)</option>
                            </select>
                            <button onclick="removeCourseRow(${course.id})" class="h-14 w-14 flex items-center justify-center text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all">✕</button>
                        </div>
                    `).join('')}
                </div>

                <div class="flex flex-col md:flex-row gap-6 mb-12">
                    <button id="add-course-btn" class="flex-1 p-5 bg-white/5 text-slate-300 border border-white/10 rounded-3xl font-bold hover:bg-white/10 transition-all">+ Add Course</button>
                    <button id="calculate-cgpa-btn" class="flex-1 p-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-3xl font-black tracking-wider shadow-xl shadow-indigo-500/20">CALCULATE SCORE</button>
                </div>

                <div class="cgpa-result bg-black/60 p-12 rounded-[3rem] border border-white/5 text-center shadow-inner relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                    <p class="text-slate-500 font-bold mb-4 uppercase tracking-[0.3em] text-xs">Verified Academic Rating</p>
                    <div id="cgpa-display" class="text-7xl md:text-9xl font-black font-outfit text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">0.00</div>
                    <p id="grade-remark" class="mt-6 text-slate-400 font-bold tracking-tight"></p>
                </div>
            </div>
        </section>
    `;
}

function renderHistoryView() {
    return `
        <section class="tab-content active w-full max-w-[800px]">
            <div class="calc-card glass p-8 md:p-12 rounded-[3.5rem] shadow-2xl">
                <div class="flex justify-between items-center mb-10">
                    <h2 class="text-3xl font-black font-outfit text-gradient">SESSION LOGS</h2>
                    <button onclick="clearHistory()" class="px-5 py-2.5 bg-red-500/10 text-red-400 rounded-xl font-bold text-xs hover:bg-red-500/20 transition-all uppercase tracking-widest">Wipe Data</button>
                </div>
                
                <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                    ${history.length === 0 ? `
                        <div class="py-20 text-center opacity-30">
                            <p class="font-outfit text-xl font-medium tracking-widest uppercase">No Operations Logged</p>
                            <p class="text-sm mt-2">Calculations will appear here automatically</p>
                        </div>
                    ` : history.map(item => `
                        <div class="history-item glass bg-white/5 p-6 rounded-3xl border border-white/5">
                            <div class="flex justify-between items-start mb-3">
                                <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full">${item.type}</span>
                                <span class="text-[10px] text-slate-500 font-mono">${item.timestamp}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-slate-500 text-sm font-medium mb-1">${item.operation || ''}</span>
                                <span class="text-2xl font-black font-outfit tracking-tighter text-white">
                                    ${item.result} 
                                    ${item.remark ? `<span class="text-xs font-bold text-indigo-400/60 ml-2">| ${item.remark}</span>` : ''}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

function renderFooter() {
    return `
        <footer class="text-center py-10 text-slate-600 text-[10px] font-bold uppercase tracking-[0.5em] mt-12">
            © 2026 IgniteCalc Developed by <span class="text-indigo-500 transition-colors hover:text-purple-500">Flamez_Dev02</span>
        </footer>
    `;
}

// Event Listeners Setup
function setupEventListeners() {
    if (isMenuOpen) return; // Prevent binding when menu is open

    // Standard Calc
    document.querySelectorAll('[data-num]').forEach(btn => {
        btn.onclick = () => {
            if (btn.dataset.num === '.' && stdCurrent.includes('.')) return;
            stdCurrent = stdCurrent === '0' ? btn.dataset.num : stdCurrent + btn.dataset.num;
            renderApp();
        };
    });
    document.querySelectorAll('[data-op]').forEach(btn => {
        btn.onclick = () => {
            if (stdPrevious) performStdCalc();
            stdOperation = btn.dataset.op;
            stdPrevious = stdCurrent;
            stdCurrent = '0';
            renderApp();
        };
    });
    const clearStdBtn = document.querySelector('[data-action="clear-std"]');
    if (clearStdBtn) clearStdBtn.onclick = () => { stdCurrent = '0'; stdPrevious = ''; stdOperation = null; renderApp(); };
    
    const delStdBtn = document.querySelector('[data-action="del-std"]');
    if (delStdBtn) delStdBtn.onclick = () => { stdCurrent = stdCurrent.length > 1 ? stdCurrent.slice(0,-1) : '0'; renderApp(); };

    const calcStdBtn = document.querySelector('[data-action="calc-std"]');
    if (calcStdBtn) calcStdBtn.onclick = () => { performStdCalc(true); renderApp(); };

    // Scientific Calc
    document.querySelectorAll('[data-num-sci]').forEach(btn => {
        btn.onclick = () => {
            if (btn.dataset.numSci === '.' && sciCurrent.includes('.')) return;
            sciCurrent = sciCurrent === '0' ? btn.dataset.numSci : sciCurrent + btn.dataset.numSci;
            renderApp();
        };
    });
    document.querySelectorAll('[data-op-sci]').forEach(btn => {
        btn.onclick = () => {
            if (sciPrevious) performSciCalc();
            sciOperation = btn.dataset.opSci;
            sciPrevious = sciCurrent;
            sciCurrent = '0';
            renderApp();
        };
    });
    document.querySelectorAll('[data-func]').forEach(btn => {
        btn.onclick = () => {
            const val = parseFloat(sciCurrent);
            let res;
            let opStr = `${btn.dataset.func}(${val})`;
            switch (btn.dataset.func) {
                case 'sin': res = Math.sin(val * Math.PI / 180); break;
                case 'cos': res = Math.cos(val * Math.PI / 180); break;
                case 'tan': res = Math.tan(val * Math.PI / 180); break;
                case 'log': res = Math.log10(val); break;
                case 'ln': res = Math.log(val); break;
                case 'sqrt': res = Math.sqrt(val); break;
                case 'pow2': res = Math.pow(val, 2); break;
                case 'pi': res = Math.PI; opStr = "π"; break;
                case 'e': res = Math.E; opStr = "e"; break;
                case 'abs': res = Math.abs(val); break;
                case 'rand': res = Math.random(); opStr = "RANDOM"; break;
            }
            sciCurrent = res.toFixed(8).replace(/\.?0+$/, "");
            saveHistory({ type: 'SCIENTIFIC', operation: opStr, result: sciCurrent });
            renderApp();
        };
    });
    const clearSciBtn = document.querySelector('[data-action="clear-sci"]');
    if (clearSciBtn) clearSciBtn.onclick = () => { sciCurrent = '0'; sciPrevious = ''; sciOperation = null; renderApp(); };
    
    const delSciBtn = document.querySelector('[data-action="del-sci"]');
    if (delSciBtn) delSciBtn.onclick = () => { sciCurrent = sciCurrent.length > 1 ? sciCurrent.slice(0,-1) : '0'; renderApp(); };

    const calcSciBtn = document.querySelector('[data-action="calc-sci"]');
    if (calcSciBtn) calcSciBtn.onclick = () => { performSciCalc(true); renderApp(); };

    // CGPA
    const addCourseBtn = document.getElementById('add-course-btn');
    if (addCourseBtn) addCourseBtn.onclick = () => {
        courses.push({ id: Date.now(), title: '', unit: '', grade: '5' });
        renderApp();
    };

    const calcCGPABtn = document.getElementById('calculate-cgpa-btn');
    if (calcCGPABtn) calcCGPABtn.onclick = () => calculateResults();

    document.querySelectorAll('.cgpa-input').forEach(input => {
        input.onchange = (e) => {
            const id = parseInt(input.dataset.id);
            const field = input.dataset.field;
            const val = e.target.value;
            courses = courses.map(c => c.id === id ? { ...c, [field]: val } : c);
        };
    });
}

// Logic Helpers
function switchTab(tabId) {
    activeTab = tabId;
    isMenuOpen = false;
    renderApp();
}

function performStdCalc(save = false) {
    let res;
    const p = parseFloat(stdPrevious);
    const c = parseFloat(stdCurrent);
    if (isNaN(p) || isNaN(c)) return;
    const op = stdOperation;
    switch (op) {
        case '+': res = p + c; break;
        case '-': res = p - c; break;
        case '*': res = p * c; break;
        case '/': res = p / c; break;
    }
    const resultStr = res.toString();
    if (save) saveHistory({ type: 'STANDARD', operation: `${p} ${op} ${c}`, result: resultStr });
    stdCurrent = resultStr;
    stdPrevious = '';
    stdOperation = null;
}

function performSciCalc(save = false) {
    let res;
    const p = parseFloat(sciPrevious);
    const c = parseFloat(sciCurrent);
    if (isNaN(p) || isNaN(c)) return;
    const op = sciOperation;
    switch (op) {
        case '+': res = p + c; break;
        case '-': res = p - c; break;
        case '*': res = p * c; break;
        case '/': res = p / c; break;
        case '^': res = Math.pow(p, c); break;
    }
    const resultStr = res.toString();
    if (save) saveHistory({ type: 'SCIENTIFIC', operation: `${p} ${op} ${c}`, result: resultStr });
    sciCurrent = resultStr;
    sciPrevious = '';
    sciOperation = null;
}

function removeCourseRow(id) {
    if (courses.length > 1) {
        courses = courses.filter(c => c.id !== id);
        renderApp();
    }
}

function calculateResults() {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
        const u = parseFloat(c.unit);
        const g = parseFloat(c.grade);
        if (!isNaN(u)) {
            totalPoints += (u * g);
            totalCredits += u;
        }
    });

    const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    let remarkText = "";
    
    if (cgpa >= 4.5) remarkText = "First Class Honors. Excellence Personified!";
    else if (cgpa >= 3.5) remarkText = "Second Class Upper. Fantastic Work!";
    else if (cgpa >= 2.4) remarkText = "Second Class Lower. Good Job!";
    else remarkText = "Keep Grinding. Success is a journey!";

    saveHistory({ type: 'CGPA', operation: `${totalCredits} Total Units`, result: cgpa, remark: remarkText });
    renderApp();
    
    // Manual updates after render to preserve animation state
    document.getElementById('cgpa-display').innerText = cgpa;
    const remark = document.getElementById('grade-remark');
    remark.innerText = remarkText;

    if (cgpa >= 4.5) remark.className = "mt-6 text-emerald-400 font-bold text-lg";
    else if (cgpa >= 3.5) remark.className = "mt-6 text-cyan-400 font-bold text-lg";
    else if (cgpa >= 2.4) remark.className = "mt-6 text-yellow-500 font-bold text-lg";
    else remark.className = "mt-6 text-orange-400 font-bold text-lg";
}

// Start App
init();

// Expose functions to global scope for inline onclick handlers
window.toggleMenu = toggleMenu;
window.switchTab = switchTab;
window.removeCourseRow = removeCourseRow;
window.clearHistory = clearHistory;
window.calculateResults = calculateResults;
