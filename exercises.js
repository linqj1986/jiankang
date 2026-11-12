// 运动库：每份折算为"中等强度等效分钟"(WHO口径：1分钟高强度=2分钟中等强度，轻度约减半)
// equiv = 每份的等效分钟数，用于与每日目标(30分钟)比较
const EXERCISES = [
  { id: 'jog',        name: '慢跑',        unit: '1km',   equiv: 15, desc: '高强度·配速7~8分钟/km' },
  { id: 'brisk-walk', name: '快走',        unit: '10分钟', equiv: 10, desc: '中等强度·约5.5km/h' },
  { id: 'stroll',     name: '慢走/散步',   unit: '千步',   equiv: 4,  desc: '轻度·千步约8分钟' },
  { id: 'swim',       name: '游泳',        unit: '10分钟', equiv: 10, desc: '中等强度·休闲泳姿' },
  { id: 'bike',       name: '骑车',        unit: '10分钟', equiv: 7,  desc: '轻~中等·通勤速度' },
  { id: 'rope',       name: '跳绳',        unit: '10分钟', equiv: 20, desc: '高强度' },
  { id: 'stairs',     name: '爬楼梯/爬坡', unit: '10分钟', equiv: 15, desc: '高强度' },
  { id: 'strength',   name: '力量训练',    unit: '10分钟', equiv: 10, desc: '中等强度·WHO建议每周2次' },
  { id: 'badminton',  name: '羽毛球/乒乓', unit: '10分钟', equiv: 8,  desc: '中等强度·休闲对打' },
  { id: 'yoga',       name: '瑜伽/拉伸',   unit: '10分钟', equiv: 4,  desc: '轻度' },
];

// 每日运动目标：WHO建议成人每周150~300分钟中等强度有氧，按日均30分钟
const EX_TARGET = 30;

if (typeof module !== 'undefined') module.exports = { EXERCISES, EX_TARGET };
