// ===== 营养素定义与每日目标 =====
// 目标值基于《中国居民膳食营养素参考摄入量(2023)》18-49岁轻体力活动成人估算
// type: 'goal' = 越接近/达到越好；'limit' = 上限，超过即超标
const NUTRIENTS = [
  // 宏量营养素
  { key: 'kcal',   name: '热量',       unit: 'kcal',  group: 'macro',   type: 'limit', target: (g, w) => Math.round((g === 'male' ? 34 : 32) * w / 10) * 10 },
  { key: 'protein',name: '蛋白质',     unit: 'g',     group: 'macro',   type: 'goal',  target: (g, w) => Math.round(w * 1.0) },
  { key: 'fat',    name: '脂肪',       unit: 'g',     group: 'macro',   type: 'limit', target: (g, w) => Math.round((g === 'male' ? 34 : 32) * w * 0.30 / 9) },
  { key: 'carb',   name: '碳水化合物', unit: 'g',     group: 'macro',   type: 'limit', target: (g, w) => Math.round((g === 'male' ? 34 : 32) * w * 0.60 / 4) },
  { key: 'sugar',  name: '糖',         unit: 'g',     group: 'macro',   type: 'limit', warnAt: 0.5, hint: 'WHO建议游离糖<50g，最好<25g', target: () => 50 },
  { key: 'fiber',  name: '膳食纤维',   unit: 'g',     group: 'macro',   type: 'goal',  target: () => 25 },
  { key: 'na',     name: '钠(盐)',     unit: 'mg',    group: 'macro',   type: 'limit', hint: '2000mg钠 ≈ 5g盐', target: () => 2000 },
  // 维生素
  { key: 'va', name: '维生素A',  unit: 'μgRAE', group: 'vitamin', type: 'goal', target: (g) => g === 'male' ? 800 : 700 },
  { key: 'vc', name: '维生素C',  unit: 'mg',     group: 'vitamin', type: 'goal', target: () => 100 },
  { key: 'b1', name: '维生素B1', unit: 'mg',     group: 'vitamin', type: 'goal', target: (g) => g === 'male' ? 1.4 : 1.2 },
  { key: 'b2', name: '维生素B2', unit: 'mg',     group: 'vitamin', type: 'goal', target: (g) => g === 'male' ? 1.4 : 1.2 },
  // 矿物质
  { key: 'ca', name: '钙', unit: 'mg', group: 'mineral', type: 'goal', target: () => 800 },
  { key: 'fe', name: '铁', unit: 'mg', group: 'mineral', type: 'goal', target: (g) => g === 'male' ? 12 : 18 },
  { key: 'zn', name: '锌', unit: 'mg', group: 'mineral', type: 'goal', target: (g) => g === 'male' ? 12 : 8.5 },
  { key: 'k',  name: '钾', unit: 'mg', group: 'mineral', type: 'goal', target: () => 2000 },
];

const GROUPS = { macro: '宏量营养素', vitamin: '维生素', mineral: '矿物质' };

// ===== 状态与存储 =====
let entries = []; // 食物记录 [{id, qty}]

function loadDayState() {
  try {
    const d = JSON.parse(localStorage.getItem(dayKey()));
    if (Array.isArray(d)) entries = d.filter((e) => e && FOODS.some((f) => f.id === e.id) && e.qty > 0);
  } catch (e) { /* 忽略损坏数据 */ }
}
function saveEntries() { localStorage.setItem(dayKey(), JSON.stringify(entries)); }

// ===== 计算 =====
function targetOf(n) { return n.target(profile.gender, profile.weight); }

function totals() {
  const t = {};
  for (const n of NUTRIENTS) t[n.key] = 0;
  for (const e of entries) {
    const f = FOODS.find((x) => x.id === e.id);
    if (!f) continue;
    for (const key in t) t[key] += (f.n[key] || 0) * e.qty;
  }
  return t;
}

// ===== 渲染 =====
function renderProfile() {
  document.querySelectorAll('.gender-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.gender === profile.gender);
    b.setAttribute('aria-pressed', b.dataset.gender === profile.gender);
  });
  $('#weight').value = profile.weight;
  $('#weight-val').textContent = profile.weight;
}

function renderDashboard() {
  const t = totals();
  const kcal = NUTRIENTS[0];
  const kcalTarget = targetOf(kcal);
  const kcalPct = Math.round(t.kcal / kcalTarget * 100);
  $('#hero-date').textContent = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
  $('#hero-val').textContent = Math.round(t.kcal);
  $('#hero-sub').textContent = `/ ${kcalTarget} kcal 目标`;
  $('#hero-pct').textContent = kcalPct + '%';
  $('#hero-state').innerHTML =
    meterState(kcal, t.kcal / kcalTarget) === 'critical' ? '<span class="chip chip-critical">⚠ 热量超标</span>' :
    meterState(kcal, t.kcal / kcalTarget) === 'warning'  ? '<span class="chip chip-warning">▲ 接近热量上限</span>' : '';

  for (const g of Object.keys(GROUPS)) {
    $(`#group-${g}`).innerHTML = NUTRIENTS.filter((n) => n.group === g).map((n) => meterHtml(n, t)).join('');
  }
  renderTable(t);
}

// 数据表格视图（无障碍/查看精确值）
function renderTable(t) {
  const rows = NUTRIENTS.map((n) => {
    const target = targetOf(n);
    return `<tr><td>${n.name}</td><td>${fmt(t[n.key], '')}</td><td>${fmt(target, n.unit)}</td><td>${Math.round(t[n.key] / target * 100)}%</td></tr>`;
  }).join('');
  $('#table-body').innerHTML = rows;
}

function renderEntries() {
  const box = $('#entries');
  if (!entries.length) {
    box.innerHTML = '<p class="empty">今天还没有记录，搜索或点击上方食物添加</p>';
    return;
  }
  box.innerHTML = entries.map((e) => {
    const f = FOODS.find((x) => x.id === e.id);
    const kcal = Math.round(f.n.kcal * e.qty);
    return `
    <div class="entry">
      <div class="entry-info">
        <span class="entry-name">${f.name}</span>
        <span class="entry-unit">${f.unit} · ${kcal} kcal</span>
      </div>
      <div class="qty">
        <button type="button" data-act="dec" data-id="${e.id}" aria-label="减少${f.name}">−</button>
        <span>${e.qty}</span>
        <button type="button" data-act="inc" data-id="${e.id}" aria-label="增加${f.name}">＋</button>
      </div>
      <button type="button" class="entry-del" data-act="del" data-id="${e.id}" aria-label="删除${f.name}">✕</button>
    </div>`;
  }).join('');
}

function renderFoodList() {
  const q = $('#search').value.trim().toLowerCase();
  const cat = $('#food-list').dataset.cat || 'all';
  const list = FOODS.filter((f) =>
    (cat === 'all' || f.cat === cat) &&
    (!q || f.name.toLowerCase().includes(q) || (f.desc || '').toLowerCase().includes(q))
  );
  $('#food-list').innerHTML = list.length
    ? list.map((f) => `
      <button type="button" class="food-item" data-act="add" data-id="${f.id}">
        <span class="food-name">${f.name}${f.desc ? `<em>${f.desc}</em>` : ''}</span>
        <span class="food-kcal">${f.n.kcal} kcal</span>
      </button>`).join('')
    : '<p class="empty">没有找到「' + $('#search').value + '」</p>';
}

function render() {
  renderProfile();
  renderDashboard();
  renderEntries();
  renderFoodList();
}

// ===== 交互 =====
function addFood(id) {
  const e = entries.find((x) => x.id === id);
  if (e) e.qty++;
  else entries.push({ id, qty: 1 });
  saveEntries();
  renderEntries();
  renderDashboard();
}

function init() {
  loadProfile();
  loadDayState();
  applyTheme();
  initTheme();

  // 性别
  document.querySelectorAll('.gender-btn').forEach((b) =>
    b.addEventListener('click', () => { profile.gender = b.dataset.gender; saveProfile(); render(); }));
  // 体重
  $('#weight').addEventListener('input', (ev) => {
    profile.weight = +ev.target.value; saveProfile(); renderProfile(); renderDashboard();
  });
  // 搜索 / 分类
  $('#search').addEventListener('input', renderFoodList);
  document.querySelectorAll('.cat-btn').forEach((b) =>
    b.addEventListener('click', () => {
      $('#food-list').dataset.cat = b.dataset.cat;
      document.querySelectorAll('.cat-btn').forEach((x) => x.classList.toggle('active', x === b));
      renderFoodList();
    }));
  // 食物列表与今日记录（事件委托）
  $('#food-list').addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-act="add"]');
    if (btn) addFood(btn.dataset.id);
  });
  $('#entries').addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-act]');
    if (!btn) return;
    const e = entries.find((x) => x.id === btn.dataset.id);
    if (!e) return;
    if (btn.dataset.act === 'inc') e.qty++;
    if (btn.dataset.act === 'dec') e.qty--;
    if (btn.dataset.act === 'del') e.qty = 0;
    entries = entries.filter((x) => x.qty > 0);
    saveEntries(); renderEntries(); renderDashboard();
  });
  // 清空
  $('#clear-btn').addEventListener('click', () => {
    if (entries.length && confirm('确定清空今天的全部记录？')) {
      entries = []; saveEntries(); renderEntries(); renderDashboard();
    }
  });

  render();
}

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', init);
if (typeof module !== 'undefined') module.exports = { NUTRIENTS, totals: () => totals() };
