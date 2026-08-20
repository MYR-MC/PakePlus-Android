window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timer & Stopwatch</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --bg-1: #0f172a;
    --bg-2: #1e293b;
    --bg-3: #0b1224;
    --accent: #6366f1;
    --accent-2: #8b5cf6;
    --success: #10b981;
    --danger: #ef4444;
    --warning: #f59e0b;
    --text: #e2e8f0;
    --text-dim: #94a3b8;
    --border: #334155;
  }
  body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background: radial-gradient(ellipse at top, #1e1b4b 0%, var(--bg-1) 50%, #020617 100%);
    min-height: 100vh;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow: hidden;
    position: relative;
  }
  body::before {
    content: '';
    position: fixed;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background:
      radial-gradient(circle at 20% 30%, rgba(99,102,241,0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(139,92,246,0.15) 0%, transparent 50%);
    animation: drift 20s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }
  @keyframes drift {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-5%, 5%); }
  }
  .app {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 480px;
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 24px;
    padding: 32px 28px;
    box-shadow:
      0 25px 50px -12px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }
  .header-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
  }
  .header h1 { font-size: 1.15rem; font-weight: 700; letter-spacing: 0.02em; }
  .header p { font-size: 0.7rem; color: var(--text-dim); margin-top: 2px; }
  .mode-tabs {
    display: flex;
    background: var(--bg-3);
    border-radius: 14px;
    padding: 4px;
    margin-bottom: 28px;
    border: 1px solid var(--border);
  }
  .mode-tab {
    flex: 1;
    padding: 10px 12px;
    text-align: center;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-dim);
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.25s;
    user-select: none;
  }
  .mode-tab.active {
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #fff;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }
  .display {
    text-align: center;
    margin: 24px 0 32px;
  }
  .time {
    font-family: 'Consolas', 'Cascadia Code', 'Courier New', monospace;
    font-size: 4.5rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    background: linear-gradient(180deg, #fff 0%, #c7d2fe 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
    text-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
    font-variant-numeric: tabular-nums;
  }
  .millis {
    font-size: 2rem;
    opacity: 0.7;
  }
  .label {
    font-size: 0.7rem;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-top: 12px;
  }
  .controls {
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
  }
  .notify-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 12px;
    transition: all 0.2s;
  }
  .notify-toggle.enabled {
    border-color: rgba(16, 185, 129, 0.4);
    background: rgba(16, 185, 129, 0.06);
  }
  .notify-toggle-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .notify-toggle-icon {
    font-size: 1.2rem;
  }
  .notify-toggle-text { font-size: 0.88rem; font-weight: 600; }
  .notify-toggle-sub { font-size: 0.7rem; color: var(--text-dim); margin-top: 2px; }
  .switch {
    position: relative;
    width: 44px;
    height: 24px;
    background: var(--border);
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.25s;
  }
  .switch.on { background: var(--success); }
  .switch::after {
    content: '';
    position: absolute;
    top: 2px; left: 2px;
    width: 20px; height: 20px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.25s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .switch.on::after { transform: translateX(20px); }
  .btn {
    flex: 1;
    padding: 14px 16px;
    border: none;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: inherit;
  }
  .btn:hover { transform: translateY(-2px); }
  .btn:active { transform: translateY(0); }
  .btn-primary {
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #fff;
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
  }
  .btn-primary:hover { box-shadow: 0 12px 28px rgba(99, 102, 241, 0.5); }
  .btn-danger {
    background: linear-gradient(135deg, var(--danger), #dc2626);
    color: #fff;
    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
  }
  .btn-secondary {
    background: var(--bg-3);
    color: var(--text);
    border: 1px solid var(--border);
  }
  .btn-secondary:hover { background: #1e293b; }
  .timer-inputs {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .time-input {
    width: 80px;
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 8px;
    text-align: center;
    color: var(--text);
    font-size: 1.4rem;
    font-weight: 700;
    font-family: 'Consolas', monospace;
    outline: none;
    transition: all 0.2s;
  }
  .time-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
  .time-input::-webkit-outer-spin-button,
  .time-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .time-input { -moz-appearance: textfield; }
  .input-label {
    display: block;
    text-align: center;
    font-size: 0.65rem;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 4px;
  }
  .input-group { display: flex; flex-direction: column; align-items: center; }
  .laps {
    max-height: 220px;
    overflow-y: auto;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--bg-3);
    margin-top: 8px;
  }
  .laps::-webkit-scrollbar { width: 6px; }
  .laps::-webkit-scrollbar-track { background: transparent; }
  .laps::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  .lap-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 18px;
    border-bottom: 1px solid var(--border);
    font-family: 'Consolas', monospace;
    font-size: 0.88rem;
  }
  .lap-item:last-child { border-bottom: none; }
  .lap-item.fastest { background: rgba(16, 185, 129, 0.08); }
  .lap-item.slowest { background: rgba(239, 68, 68, 0.08); }
  .lap-num {
    color: var(--text-dim);
    font-size: 0.78rem;
    font-weight: 600;
  }
  .lap-time { font-weight: 600; }
  .lap-delta {
    color: var(--text-dim);
    font-size: 0.78rem;
  }
  .laps-empty {
    text-align: center;
    padding: 24px;
    color: var(--text-dim);
    font-size: 0.85rem;
  }
  .pulse {
    animation: pulse 1s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .flash {
    animation: flash 0.4s ease-out;
  }
  @keyframes flash {
    0% { background: var(--bg-3); }
    50% { background: rgba(99, 102, 241, 0.2); }
    100% { background: var(--bg-3); }
  }
  .hidden { display: none !important; }
  .toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background: var(--success);
    color: #fff;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s;
    z-index: 100;
  }
  .toast.show { transform: translateX(-50%) translateY(0); }
</style>
</head>
<body>

<div class="app">
  <div class="header">
    <div class="header-icon">⏱️</div>
    <div>
      <h1>Timer & Stopwatch</h1>
      <p>计时器 · 秒表 · 圈数记录</p>
    </div>
  </div>

  <div class="mode-tabs">
    <div class="mode-tab active" data-mode="stopwatch" onclick="switchMode('stopwatch')">秒表</div>
    <div class="mode-tab" data-mode="timer" onclick="switchMode('timer')">计时器</div>
  </div>

  <!-- 计时器输入 -->
  <div id="timerInputs" class="timer-inputs hidden">
    <div class="input-group">
      <input type="number" class="time-input" id="hours" min="0" max="99" value="0">
      <span class="input-label">小时</span>
    </div>
    <div class="input-group">
      <input type="number" class="time-input" id="minutes" min="0" max="59" value="5">
      <span class="input-label">分钟</span>
    </div>
    <div class="input-group">
      <input type="number" class="time-input" id="seconds" min="0" max="59" value="0">
      <span class="input-label">秒</span>
    </div>
  </div>

  <!-- 系统通知开关 -->
  <div id="notifyToggle" class="notify-toggle hidden">
    <div class="notify-toggle-info">
      <span class="notify-toggle-icon">🔔</span>
      <div>
        <div class="notify-toggle-text">系统通知</div>
        <div class="notify-toggle-sub" id="notifySubText">时间到了会在系统通知中心提醒你</div>
      </div>
    </div>
    <div class="switch" id="notifySwitch" onclick="toggleNotify()"></div>
  </div>

  <div class="display">
    <div class="time" id="display">00:00:00<span class="millis" id="millis">.00</span></div>
    <div class="label" id="statusLabel">点击开始计时</div>
  </div>

  <div class="controls">
    <button class="btn btn-primary" id="startBtn" onclick="handleStart()">开始</button>
    <button class="btn btn-danger" id="pauseBtn" onclick="handlePause()" style="display:none;">暂停</button>
    <button class="btn btn-secondary" onclick="handleReset()">重置</button>
  </div>

  <div id="stopwatchExtras" class="controls" style="margin-top:-12px;">
    <button class="btn btn-secondary" id="lapBtn" onclick="handleLap()">📍 记录圈数</button>
    <button class="btn btn-secondary" id="clearLapsBtn" onclick="clearLaps()">清空记录</button>
  </div>

  <div class="laps" id="lapsContainer">
    <div class="laps-empty">暂无圈数记录</div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
let mode = 'stopwatch';
let isRunning = false;
let startTime = 0;
let elapsed = 0;
let timerInterval = null;
let laps = [];
let lastLapTime = 0;
let audioCtx = null;
let notifyEnabled = false;

const display = document.getElementById('display');
const millis = document.getElementById('millis');
const statusLabel = document.getElementById('statusLabel');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapsContainer = document.getElementById('lapsContainer');

function switchMode(newMode) {
  if (isRunning) {
    showToast('请先停止当前计时');
    return;
  }
  mode = newMode;
  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });
  document.getElementById('timerInputs').classList.toggle('hidden', mode !== 'timer');
  document.getElementById('stopwatchExtras').style.display = mode === 'stopwatch' ? 'flex' : 'none';
  document.getElementById('notifyToggle').classList.toggle('hidden', mode !== 'timer');
  handleReset();
}

async function toggleNotify() {
  if (notifyEnabled) {
    notifyEnabled = false;
    document.getElementById('notifySwitch').classList.remove('on');
    document.getElementById('notifyToggle').classList.remove('enabled');
    document.getElementById('notifySubText').textContent = '时间到了会在系统通知中心提醒你';
    return;
  }
  if (!('Notification' in window)) {
    showToast('当前浏览器不支持系统通知');
    return;
  }
  if (Notification.permission === 'granted') {
    notifyEnabled = true;
    document.getElementById('notifySwitch').classList.add('on');
    document.getElementById('notifyToggle').classList.add('enabled');
    document.getElementById('notifySubText').textContent = '已开启 - 时间到会发送系统通知';
  } else if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      notifyEnabled = true;
      document.getElementById('notifySwitch').classList.add('on');
      document.getElementById('notifyToggle').classList.add('enabled');
      document.getElementById('notifySubText').textContent = '已开启 - 时间到会发送系统通知';
      showToast('系统通知已开启');
    } else {
      showToast('通知权限被拒绝');
    }
  } else {
    showToast('通知权限已被禁用，请在浏览器设置中开启');
  }
}

function sendSystemNotification(title, body) {
  if (!notifyEnabled) return;
  if (Notification.permission !== 'granted') return;
  try {
    const notification = new Notification(title, {
      body: body,
      icon: '⏰',
      tag: 'timer-notify',
      requireInteraction: true,
      silent: false
    });
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (e) {
    showToast('通知发送失败: ' + e.message, 'error');
  }
}

function formatTime(ms, showMillis = true) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const mil = Math.floor((ms % 1000) / 10);
  const hStr = String(h).padStart(2, '0');
  const mStr = String(m).padStart(2, '0');
  const sStr = String(s).padStart(2, '0');
  const msStr = String(mil).padStart(2, '0');
  if (showMillis) {
    return hStr + ':' + mStr + ':' + sStr + '<span class="millis">.' + msStr + '</span>';
  }
  return hStr + ':' + mStr + ':' + sStr;
}

function updateDisplay() {
  if (mode === 'stopwatch') {
    display.innerHTML = formatTime(elapsed);
    statusLabel.textContent = isRunning ? '计时中...' : '已停止';
  } else {
    const remain = Math.max(0, getTimerTotalMs() - elapsed);
    display.innerHTML = formatTime(remain);
    statusLabel.textContent = isRunning ? '倒计时中...' : '已停止';
    if (isRunning && remain <= 0) {
      finishTimer();
    }
  }
}

function getTimerTotalMs() {
  const h = parseInt(document.getElementById('hours').value) || 0;
  const m = parseInt(document.getElementById('minutes').value) || 0;
  const s = parseInt(document.getElementById('seconds').value) || 0;
  return (h * 3600 + m * 60 + s) * 1000;
}

function handleStart() {
  if (mode === 'timer' && !isRunning && elapsed === 0) {
    const total = getTimerTotalMs();
    if (total <= 0) {
      showToast('请设置有效的时间');
      return;
    }
  }
  isRunning = true;
  startTime = Date.now();
  startBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-flex';
  statusLabel.classList.add('pulse');
  statusLabel.textContent = mode === 'stopwatch' ? '计时中...' : '倒计时中...';
  timerInterval = setInterval(tick, 31);
  if (mode === 'stopwatch') {
    lastLapTime = elapsed;
  }
}

function tick() {
  if (mode === 'stopwatch') {
    elapsed = Date.now() - startTime;
  } else {
    elapsed = Date.now() - startTime;
  }
  updateDisplay();
}

function handlePause() {
  isRunning = false;
  clearInterval(timerInterval);
  startBtn.style.display = 'inline-flex';
  pauseBtn.style.display = 'none';
  statusLabel.classList.remove('pulse');
  statusLabel.textContent = '已暂停';
}

function handleReset() {
  isRunning = false;
  clearInterval(timerInterval);
  elapsed = 0;
  lastLapTime = 0;
  startBtn.style.display = 'inline-flex';
  pauseBtn.style.display = 'none';
  statusLabel.classList.remove('pulse');
  updateDisplay();
  if (mode === 'stopwatch') {
    clearLaps();
  }
}

function finishTimer() {
  handlePause();
  statusLabel.textContent = '时间到！';
  playBeep();
  const h = parseInt(document.getElementById('hours').value) || 0;
  const m = parseInt(document.getElementById('minutes').value) || 0;
  const s = parseInt(document.getElementById('seconds').value) || 0;
  const timeText = h + '小时' + m + '分钟' + s + '秒';
  showToast('⏰ 时间到！');
  sendSystemNotification('⏰ 计时器时间到！', '你设置的 ' + timeText + ' 已经结束');
}

function playBeep() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = 880;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.5);
    setTimeout(() => {
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.frequency.value = 1320;
      osc2.type = 'sine';
      gain2.gain.setValueAtTime(0, audioCtx.currentTime);
      gain2.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
      gain2.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.6);
      osc2.start(audioCtx.currentTime);
      osc2.stop(audioCtx.currentTime + 0.6);
    }, 600);
  } catch (e) {}
}

function handleLap() {
  if (!isRunning) {
    showToast('请先开始计时');
    return;
  }
  const totalElapsed = elapsed;
  const lapTime = totalElapsed - lastLapTime;
  laps.push({ total: totalElapsed, lap: lapTime });
  lastLapTime = totalElapsed;
  renderLaps();
  showToast('圈数 #' + laps.length + ' 已记录');
}

function clearLaps() {
  laps = [];
  renderLaps();
}

function renderLaps() {
  if (laps.length === 0) {
    lapsContainer.innerHTML = '<div class="laps-empty">暂无圈数记录</div>';
    return;
  }
  const minLap = Math.min(...laps.map(l => l.lap));
  const maxLap = Math.max(...laps.map(l => l.lap));
  const isMulti = laps.length > 1;
  const html = laps.map((lap, i) => {
    let cls = 'lap-item';
    if (isMulti && lap.lap === minLap) cls += ' fastest';
    else if (isMulti && lap.lap === maxLap) cls += ' slowest';
    return '<div class="' + cls + '">' +
      '<span class="lap-num">#' + (i + 1) + '</span>' +
      '<span class="lap-time">' + formatTime(lap.total, false) + '</span>' +
      '<span class="lap-delta">+' + formatTime(lap.lap, false) + '</span>' +
    '</div>';
  }).reverse().join('');
  lapsContainer.innerHTML = html;
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

updateDisplay();
</script>

</body>
</html>