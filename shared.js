// ===== 公共：全局状态、主题、进度条渲染（营养页 index 与运动页 exercise 共用） =====
const $ = (sel) => document.querySelector(sel);
const profileKey = 'nutri_profile';
const dayKey = () => 'nutri_day_' + new Date().toLocaleDateString('sv-SE'); // 本地日期 yyyy-mm-dd
const exKey = () => 'nutri_ex_' + new Date().toLocaleDateString('sv-SE');

let profile = { gender: 'male', weight: 60, theme: null }; // theme: null=跟随系统 / 'light' / 'dark'

function loadProfile() {
  try {
    const p = JSON.parse(localStorage.getItem(profileKey));
    if (p && (p.gender === 'male' || p.gender === 'female')) profile = { ...profile, ...p };
  } catch (e) { /* 忽略损坏数据 */ }
}
function saveProfile() { localStorage.setItem(profileKey, JSON.stringify(profile)); }

function applyTheme() {
  if (profile.theme) document.documentElement.dataset.theme = profile.theme;
  else delete document.documentElement.dataset.theme;
}
// 主题切换: 自动 -> 亮 -> 暗 循环
function initTheme() {
  $('#theme-btn').addEventListener('click', () => {
    const order = [null, 'light', 'dark'];
    profile.theme = order[(order.indexOf(profile.theme) + 1) % order.length];
    saveProfile(); applyTheme();
    $('#theme-btn').textContent = profile.theme === 'dark' ? '🌙' : profile.theme === 'light' ? '☀️' : '🌗';
  });
  $('#theme-btn').textContent = profile.theme === 'dark' ? '🌙' : profile.theme === 'light' ? '☀️' : '🌗';
}

function fmt(v, unit) {
  const r = v >= 100 ? Math.round(v) : Math.round(v * 10) / 10;
  return r + ' ' + unit;
}

// 进度条状态: accent(进行中) / good(已达标) / warning(接近上限) / critical(超标)
function meterState(n, ratio) {
  if (n.type === 'goal') return ratio >= 1 ? 'good' : 'accent';
  const warn = n.warnAt || 0.8;
  if (ratio > 1) return 'critical';
  if (ratio >= warn) return 'warning';
  return 'accent';
}

// 某营养素含量最高的食物 top n（excludeCats 可排除分类，如给"建议"排除快餐）
function topFoods(key, n, excludeCats) {
  return FOODS
    .filter((f) => !excludeCats || !excludeCats.includes(f.cat))
    .map((f) => ({ name: f.name, v: f.n[key] || 0 }))
    .sort((a, b) => b.v - a.v)
    .filter((x) => x.v > 0)
    .slice(0, n)
    .map((x) => x.name);
}

// 进度条 HTML（营养素与运动量共用）
function meterHtml(n, t) {
  const target = n.target(profile.gender, profile.weight);
  const val = t[n.key];
  const ratio = target > 0 ? val / target : 0;
  const pct = Math.round(ratio * 100);
  const state = meterState(n, ratio);
  const stateLabel =
    state === 'critical' ? '<span class="state state-critical">⚠ 超标</span>' :
    state === 'warning'  ? '<span class="state state-warning">▲ 接近上限</span>' :
    state === 'good'     ? '<span class="state state-good">✓ 已达标</span>' : '';
  const hint = n.hint ? `<span class="hint">${n.hint}</span>` : '';
  // 摄入不足(低于目标80%)提示补充来源；糖/钠接近或超过上限提示少吃；运动不足给出建议
  let tip = '';
  if (n.type === 'goal' && ratio < 0.8) {
    const items = n.key === 'exercise'
      ? EXERCISES.slice().sort((a, b) => b.equiv - a.equiv).slice(0, 3).map((x) => `${x.name}${x.unit}`)
      : topFoods(n.key, 3, ['fastfood', 'snack']);
    tip = `<div class="meter-tip">💡 ${n.key === 'exercise' ? '建议' : '可补'}：${items.join('、')}</div>`;
  } else if ((n.key === 'sugar' || n.key === 'na') && (state === 'warning' || state === 'critical')) {
    tip = `<div class="meter-tip meter-tip-warn">⚠ 少吃：${topFoods(n.key, 3).join('、')}</div>`;
  }
  return `
  <div class="meter fill-${state}" role="group" aria-label="${n.name} 已摄入${fmt(val, n.unit)}，目标${fmt(target, n.unit)}，${pct}%">
    <div class="meter-head">
      <span class="meter-name">${n.name}${hint}</span>
      <span class="meter-val">${fmt(val, n.unit)} <span class="divider">/</span> ${fmt(target, n.unit)}</span>
      <span class="meter-pct">${pct}%</span>${stateLabel}
    </div>
    <div class="meter-track"><div class="meter-fill" style="width:${Math.min(100, pct)}%"></div></div>
    ${tip}
  </div>`;
}

if (typeof module !== 'undefined') module.exports = { meterState, topFoods };
