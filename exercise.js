// ===== 运动页：目标、状态与交互 =====
// 运动：伪营养素条目，复用仪表盘进度条；摄入值 = 今日中等强度等效分钟
const EX_NUTRIENT = { key: 'exercise', name: '运动量', unit: '分钟', type: 'goal', hint: 'WHO建议每周150分钟中等强度', target: () => EX_TARGET };

let exEntries = []; // 运动记录 [{id, qty}]

function loadExState() {
  try {
    const x = JSON.parse(localStorage.getItem(exKey()));
    if (Array.isArray(x)) exEntries = x.filter((e) => e && EXERCISES.some((v) => v.id === e.id) && e.qty > 0);
  } catch (e) { /* 忽略损坏数据 */ }
}
function saveEx() { localStorage.setItem(exKey(), JSON.stringify(exEntries)); }

// 今日运动量（中等强度等效分钟）
function exTotal() {
  return exEntries.reduce((s, e) => {
    const x = EXERCISES.find((v) => v.id === e.id);
    return s + (x ? x.equiv * e.qty : 0);
  }, 0);
}

// ===== 渲染 =====
function renderExDashboard() {
  const total = exTotal();
  const ratio = total / EX_TARGET;
  const pct = Math.round(ratio * 100);
  $('#hero-date').textContent = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
  $('#hero-val').textContent = Math.round(total);
  $('#hero-sub').textContent = `/ ${EX_TARGET} 分钟目标`;
  $('#hero-pct').textContent = pct + '%';
  $('#hero-state').innerHTML =
    ratio >= 1 ? '<span class="chip chip-good">✓ 已达标</span>' :
    ratio >= 0.8 ? '<span class="chip chip-warning">▲ 快达标了</span>' : '';
  $('#group-exercise').innerHTML = meterHtml(EX_NUTRIENT, { exercise: total });
}

function renderExList() {
  $('#ex-list').innerHTML = EXERCISES.map((x) => `
    <button type="button" class="food-item" data-act="add" data-id="${x.id}">
      <span class="food-name">${x.name}<em>${x.desc || ''}</em></span>
      <span class="food-kcal">${x.unit} ≈${x.equiv}分</span>
    </button>`).join('');
}

function renderExEntries() {
  const box = $('#ex-entries');
  if (!exEntries.length) {
    box.innerHTML = '<p class="empty">今天还没有运动记录，点击上方运动添加</p>';
    return;
  }
  box.innerHTML = exEntries.map((e) => {
    const x = EXERCISES.find((v) => v.id === e.id);
    return `
    <div class="entry">
      <div class="entry-info">
        <span class="entry-name">${x.name}</span>
        <span class="entry-unit">${x.unit} · ≈${x.equiv * e.qty}等效分</span>
      </div>
      <div class="qty">
        <button type="button" data-act="dec" data-id="${e.id}" aria-label="减少${x.name}">−</button>
        <span>${e.qty}</span>
        <button type="button" data-act="inc" data-id="${e.id}" aria-label="增加${x.name}">＋</button>
      </div>
      <button type="button" class="entry-del" data-act="del" data-id="${e.id}" aria-label="删除${x.name}">✕</button>
    </div>`;
  }).join('');
}

function renderEx() {
  renderExDashboard();
  renderExList();
  renderExEntries();
}

// ===== 交互 =====
function addExercise(id) {
  const e = exEntries.find((x) => x.id === id);
  if (e) e.qty++;
  else exEntries.push({ id, qty: 1 });
  saveEx();
  renderExEntries();
  renderExDashboard();
}

function init() {
  loadProfile();
  loadExState();
  applyTheme();
  initTheme();

  // 运动列表与记录（事件委托）
  $('#ex-list').addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-act="add"]');
    if (btn) addExercise(btn.dataset.id);
  });
  $('#ex-entries').addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-act]');
    if (!btn) return;
    const e = exEntries.find((x) => x.id === btn.dataset.id);
    if (!e) return;
    if (btn.dataset.act === 'inc') e.qty++;
    if (btn.dataset.act === 'dec') e.qty--;
    if (btn.dataset.act === 'del') e.qty = 0;
    exEntries = exEntries.filter((x) => x.qty > 0);
    saveEx(); renderExEntries(); renderExDashboard();
  });
  $('#ex-clear-btn').addEventListener('click', () => {
    if (exEntries.length && confirm('确定清空今天的运动记录？')) {
      exEntries = []; saveEx(); renderExEntries(); renderExDashboard();
    }
  });

  renderEx();
}

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', init);
if (typeof module !== 'undefined') module.exports = { exTotal };
