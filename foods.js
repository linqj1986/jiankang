// 食物营养数据库（每份估算值，来源：品牌公布值 + 《中国食物成分表》估算，仅供参考）
// n 字段单位: kcal=千卡, protein/fat/carb/sugar/fiber=克, na/ca/k=毫克, va=微克RAE, vc=毫克, b1/b2=毫克, fe=毫克, zn=毫克
const FOOD_CATS = {
  fastfood: '快餐套餐',
  staple: '主食',
  protein: '蛋白质',
  vegfruit: '蔬果',
  snack: '零食饮料',
  supplement: '补剂',
};

const FOODS = [
  // ===== 快餐套餐 / 单点 =====
  {
    id: 'bk-whopper-set', name: '汉堡王大皇堡套餐', unit: '份', cat: 'fastfood', desc: '大皇堡+中薯条+中可乐',
    n: { kcal: 1220, protein: 32, fat: 56, carb: 153, sugar: 65, fiber: 7, na: 1600, va: 90, vc: 16, b1: 0.5, b2: 0.3, ca: 160, fe: 5.3, zn: 4.0, k: 1000 },
  },
  {
    id: 'bk-whopper', name: '汉堡王大皇堡', unit: '个', cat: 'fastfood',
    n: { kcal: 660, protein: 28, fat: 40, carb: 49, sugar: 11, fiber: 3, na: 980, va: 90, vc: 6, b1: 0.35, b2: 0.25, ca: 150, fe: 4.5, zn: 3.5, k: 400 },
  },
  {
    id: 'kfc-zinger-set', name: '肯德基劲脆鸡腿堡套餐', unit: '份', cat: 'fastfood', desc: '劲脆鸡腿堡+薯条+百事可乐',
    n: { kcal: 1230, protein: 35, fat: 51, carb: 158, sugar: 65, fiber: 7, na: 1570, va: 40, vc: 12, b1: 0.42, b2: 0.3, ca: 90, fe: 3.7, zn: 2.5, k: 900 },
  },
  {
    id: 'kfc-zinger', name: '肯德基劲脆鸡腿堡', unit: '个', cat: 'fastfood',
    n: { kcal: 690, protein: 27, fat: 35, carb: 71, sugar: 10, fiber: 3, na: 1200, va: 40, vc: 3, b1: 0.3, b2: 0.3, ca: 80, fe: 3.0, zn: 2.5, k: 350 },
  },
  {
    id: 'mcd-bigmac-set', name: '麦当劳巨无霸套餐', unit: '份', cat: 'fastfood', desc: '巨无霸+中薯条+中可乐',
    n: { kcal: 1070, protein: 34, fat: 45, carb: 138, sugar: 62, fiber: 6, na: 1470, va: 60, vc: 11, b1: 0.4, b2: 0.35, ca: 190, fe: 5.2, zn: 3.5, k: 850 },
  },
  {
    id: 'mcd-bigmac', name: '麦当劳巨无霸', unit: '个', cat: 'fastfood',
    n: { kcal: 550, protein: 26, fat: 30, carb: 42, sugar: 9, fiber: 3, na: 1000, va: 60, vc: 2, b1: 0.35, b2: 0.3, ca: 180, fe: 4.5, zn: 3.5, k: 300 },
  },
  {
    id: 'mcd-spicy-set', name: '麦当劳麦辣鸡腿堡套餐', unit: '份', cat: 'fastfood', desc: '麦辣鸡腿堡+中薯条+中可乐',
    n: { kcal: 1090, protein: 32, fat: 44, carb: 151, sugar: 61, fiber: 6, na: 1320, va: 30, vc: 11, b1: 0.35, b2: 0.25, ca: 120, fe: 3.5, zn: 2.5, k: 800 },
  },
  {
    id: 'bk-fries', name: '汉堡王薯条(中)', unit: '份', cat: 'fastfood',
    n: { kcal: 350, protein: 4, fat: 16, carb: 50, sugar: 0.5, fiber: 4, na: 600, va: 0, vc: 10, b1: 0.15, b2: 0.05, ca: 10, fe: 0.8, zn: 0.5, k: 600 },
  },
  {
    id: 'kfc-fries', name: '肯德基薯条(中)', unit: '份', cat: 'fastfood',
    n: { kcal: 330, protein: 4, fat: 16, carb: 42, sugar: 0.3, fiber: 3.5, na: 350, va: 0, vc: 9, b1: 0.12, b2: 0.05, ca: 8, fe: 0.7, zn: 0.4, k: 550 },
  },
  {
    id: 'mcd-fries', name: '麦当劳薯条(中)', unit: '份', cat: 'fastfood',
    n: { kcal: 320, protein: 4, fat: 15, carb: 43, sugar: 0.3, fiber: 3, na: 260, va: 0, vc: 9, b1: 0.12, b2: 0.05, ca: 8, fe: 0.7, zn: 0.4, k: 550 },
  },
  {
    id: 'cola-m', name: '可乐(小杯约220ml)', unit: '杯', cat: 'fastfood',
    n: { kcal: 95, protein: 0, fat: 0, carb: 23, sugar: 23, fiber: 0, na: 9, va: 0, vc: 0, b1: 0, b2: 0, ca: 0, fe: 0, zn: 0, k: 0 },
  },

  // ===== 主食 =====
  {
    id: 'rice', name: '米饭', unit: '碗(约200g)', cat: 'staple',
    n: { kcal: 232, protein: 5.2, fat: 0.6, carb: 52, sugar: 0, fiber: 0.6, na: 5, va: 0, vc: 0, b1: 0.05, b2: 0.05, ca: 15, fe: 0.5, zn: 0.8, k: 70 },
  },
  {
    id: 'noodles', name: '面条(煮)', unit: '碗(约300g)', cat: 'staple',
    n: { kcal: 330, protein: 10, fat: 4, carb: 66, sugar: 1, fiber: 2, na: 100, va: 0, vc: 0, b1: 0.1, b2: 0.08, ca: 20, fe: 1.2, zn: 0.9, k: 80 },
  },
  {
    id: 'wheat-bread', name: '全麦面包', unit: '2片(约60g)', cat: 'staple',
    n: { kcal: 150, protein: 6, fat: 2.5, carb: 26, sugar: 3, fiber: 3.5, na: 300, va: 0, vc: 0, b1: 0.25, b2: 0.15, ca: 40, fe: 1.5, zn: 1.2, k: 130 },
  },
  {
    id: 'oatmeal', name: '燕麦粥', unit: '碗(燕麦40g)', cat: 'staple',
    n: { kcal: 150, protein: 5.5, fat: 3, carb: 26, sugar: 0.5, fiber: 4, na: 5, va: 0, vc: 0, b1: 0.2, b2: 0.06, ca: 25, fe: 1.4, zn: 1.3, k: 130 },
  },
  {
    id: 'mantou', name: '馒头', unit: '个(约100g)', cat: 'staple',
    n: { kcal: 223, protein: 7, fat: 1.1, carb: 47, sugar: 1, fiber: 2, na: 165, va: 0, vc: 0, b1: 0.05, b2: 0.05, ca: 30, fe: 1.0, zn: 0.7, k: 100 },
  },
  {
    id: 'corn', name: '鲜玉米', unit: '根(可食约150g)', cat: 'staple',
    n: { kcal: 130, protein: 4.8, fat: 1.5, carb: 29, sugar: 7, fiber: 3.5, na: 2, va: 10, vc: 10, b1: 0.2, b2: 0.08, ca: 10, fe: 0.8, zn: 0.9, k: 270 },
  },
  {
    id: 'sweet-potato', name: '蒸红薯', unit: '个(约200g)', cat: 'staple',
    n: { kcal: 170, protein: 3, fat: 0.5, carb: 40, sugar: 10, fiber: 5, na: 60, va: 250, vc: 25, b1: 0.1, b2: 0.1, ca: 40, fe: 1.0, zn: 0.6, k: 400 },
  },
  {
    id: 'sweet-potato-50', name: '地瓜(红薯)', unit: '50g', cat: 'staple',
    n: { kcal: 43, protein: 0.8, fat: 0.1, carb: 10, sugar: 2.5, fiber: 1.3, na: 15, va: 63, vc: 6, b1: 0.02, b2: 0.02, ca: 10, fe: 0.25, zn: 0.15, k: 100 },
  },
  {
    id: 'taro-50', name: '芋头', unit: '50g', cat: 'staple',
    n: { kcal: 41, protein: 0.7, fat: 0.1, carb: 9, sugar: 1, fiber: 0.8, na: 17, va: 2, vc: 3, b1: 0.03, b2: 0.03, ca: 18, fe: 0.5, zn: 0.2, k: 190 },
  },
  {
    id: 'potato-50', name: '土豆', unit: '50g', cat: 'staple',
    n: { kcal: 40, protein: 1.3, fat: 0.1, carb: 8.6, sugar: 0.4, fiber: 0.6, na: 1.4, va: 3, vc: 14, b1: 0.05, b2: 0.02, ca: 4, fe: 0.4, zn: 0.2, k: 170 },
  },
  {
    id: 'dumplings', name: '猪肉白菜水饺', unit: '10个(约250g)', cat: 'staple',
    n: { kcal: 450, protein: 18, fat: 20, carb: 42, sugar: 3, fiber: 2, na: 750, va: 20, vc: 10, b1: 0.5, b2: 0.25, ca: 40, fe: 2.5, zn: 2.5, k: 300 },
  },

  // ===== 蛋白质 =====
  {
    id: 'chicken-breast', name: '鸡胸肉', unit: '100g(熟)', cat: 'protein',
    n: { kcal: 165, protein: 31, fat: 3.6, carb: 0, sugar: 0, fiber: 0, na: 74, va: 5, vc: 0, b1: 0.07, b2: 0.1, ca: 10, fe: 1.0, zn: 1.0, k: 260 },
  },
  {
    id: 'egg', name: '鸡蛋', unit: '1个(约50g)', cat: 'protein',
    n: { kcal: 72, protein: 6.3, fat: 4.8, carb: 0.4, sugar: 0.2, fiber: 0, na: 70, va: 75, vc: 0, b1: 0.03, b2: 0.25, ca: 25, fe: 1.0, zn: 0.7, k: 60 },
  },
  {
    id: 'milk', name: '全脂牛奶', unit: '250ml', cat: 'protein',
    n: { kcal: 135, protein: 8, fat: 8, carb: 8.5, sugar: 8.5, fiber: 0, na: 100, va: 60, vc: 0, b1: 0.1, b2: 0.35, ca: 260, fe: 0.3, zn: 1.1, k: 270 },
  },
  {
    id: 'yogurt', name: '无糖酸奶', unit: '200g', cat: 'protein',
    n: { kcal: 120, protein: 7, fat: 6, carb: 9, sugar: 9, fiber: 0, na: 80, va: 50, vc: 0, b1: 0.05, b2: 0.25, ca: 240, fe: 0.2, zn: 1.4, k: 240 },
  },
  {
    id: 'pork-loin', name: '猪里脊', unit: '100g', cat: 'protein',
    n: { kcal: 155, protein: 20.2, fat: 7.9, carb: 0.7, sugar: 0, fiber: 0, na: 45, va: 5, vc: 0, b1: 0.5, b2: 0.15, ca: 6, fe: 1.5, zn: 2.3, k: 300 },
  },
  {
    id: 'beef-lean', name: '牛瘦肉', unit: '100g', cat: 'protein',
    n: { kcal: 125, protein: 20, fat: 4.5, carb: 2, sugar: 0, fiber: 0, na: 60, va: 10, vc: 0, b1: 0.05, b2: 0.15, ca: 10, fe: 3.0, zn: 4.0, k: 280 },
  },
  {
    id: 'salmon', name: '三文鱼', unit: '100g', cat: 'protein',
    n: { kcal: 180, protein: 19, fat: 10.5, carb: 0, sugar: 0, fiber: 0, na: 65, va: 15, vc: 0, b1: 0.2, b2: 0.25, ca: 15, fe: 0.5, zn: 0.6, k: 360 },
  },
  {
    id: 'shrimp', name: '虾仁', unit: '100g', cat: 'protein',
    n: { kcal: 90, protein: 18, fat: 1.2, carb: 2, sugar: 0, fiber: 0, na: 170, va: 20, vc: 0, b1: 0.02, b2: 0.06, ca: 60, fe: 1.5, zn: 1.3, k: 250 },
  },
  {
    id: 'tofu', name: '北豆腐', unit: '150g', cat: 'protein',
    n: { kcal: 150, protein: 13, fat: 7, carb: 3, sugar: 1, fiber: 1.5, na: 10, va: 0, vc: 0, b1: 0.1, b2: 0.1, ca: 200, fe: 2.5, zn: 1.5, k: 150 },
  },
  {
    id: 'soymilk', name: '无糖豆浆', unit: '250ml', cat: 'protein',
    n: { kcal: 50, protein: 4.5, fat: 2, carb: 3.5, sugar: 1.5, fiber: 0, na: 20, va: 0, vc: 0, b1: 0.05, b2: 0.1, ca: 30, fe: 1.0, zn: 0.7, k: 180 },
  },

  // ===== 蔬果 =====
  {
    id: 'broccoli', name: '西兰花', unit: '100g(熟)', cat: 'vegfruit',
    n: { kcal: 35, protein: 4, fat: 0.6, carb: 4.3, sugar: 1.5, fiber: 3.5, na: 30, va: 100, vc: 65, b1: 0.1, b2: 0.15, ca: 45, fe: 1.0, zn: 0.5, k: 300 },
  },
  {
    id: 'spinach', name: '菠菜', unit: '100g(熟)', cat: 'vegfruit',
    n: { kcal: 30, protein: 3, fat: 0.4, carb: 3.5, sugar: 0.4, fiber: 2, na: 85, va: 470, vc: 25, b1: 0.05, b2: 0.2, ca: 65, fe: 2.5, zn: 0.8, k: 310 },
  },
  {
    id: 'tomato', name: '番茄', unit: '1个(约150g)', cat: 'vegfruit',
    n: { kcal: 25, protein: 1.2, fat: 0.3, carb: 5, sugar: 3.5, fiber: 1.5, na: 8, va: 65, vc: 20, b1: 0.05, b2: 0.05, ca: 15, fe: 0.5, zn: 0.3, k: 350 },
  },
  {
    id: 'carrot', name: '胡萝卜', unit: '100g', cat: 'vegfruit',
    n: { kcal: 39, protein: 1, fat: 0.2, carb: 8.5, sugar: 5, fiber: 3, na: 70, va: 680, vc: 12, b1: 0.05, b2: 0.05, ca: 32, fe: 0.8, zn: 0.3, k: 190 },
  },
  {
    id: 'lettuce', name: '生菜', unit: '100g', cat: 'vegfruit',
    n: { kcal: 15, protein: 1.3, fat: 0.3, carb: 2, sugar: 1, fiber: 1.5, na: 30, va: 160, vc: 12, b1: 0.03, b2: 0.06, ca: 35, fe: 1.0, zn: 0.3, k: 170 },
  },
  {
    id: 'apple', name: '苹果', unit: '1个(约200g)', cat: 'vegfruit',
    n: { kcal: 105, protein: 0.5, fat: 0.3, carb: 27, sugar: 20, fiber: 4.5, na: 3, va: 5, vc: 8, b1: 0.03, b2: 0.03, ca: 10, fe: 0.5, zn: 0.2, k: 210 },
  },
  {
    id: 'banana', name: '香蕉', unit: '1根(可食约120g)', cat: 'vegfruit',
    n: { kcal: 110, protein: 1.3, fat: 0.3, carb: 25, sugar: 14, fiber: 3, na: 2, va: 5, vc: 10, b1: 0.05, b2: 0.06, ca: 5, fe: 0.3, zn: 0.2, k: 300 },
  },
  {
    id: 'orange', name: '橙子', unit: '1个(可食约180g)', cat: 'vegfruit',
    n: { kcal: 85, protein: 1.4, fat: 0.3, carb: 21, sugar: 17, fiber: 4, na: 2, va: 40, vc: 60, b1: 0.1, b2: 0.05, ca: 35, fe: 0.4, zn: 0.2, k: 280 },
  },

  // ===== 零食饮料 =====
  {
    id: 'orange-juice', name: '100%橙汁', unit: '250ml', cat: 'snack',
    n: { kcal: 110, protein: 1.7, fat: 0.5, carb: 26, sugar: 24, fiber: 0.5, na: 5, va: 35, vc: 75, b1: 0.08, b2: 0.05, ca: 25, fe: 0.5, zn: 0.2, k: 450 },
  },
  {
    id: 'latte', name: '拿铁(全脂奶无糖)', unit: '中杯约350ml', cat: 'snack',
    n: { kcal: 160, protein: 8.5, fat: 6, carb: 14, sugar: 12, fiber: 0, na: 110, va: 70, vc: 0, b1: 0.1, b2: 0.4, ca: 280, fe: 0.3, zn: 1.0, k: 380 },
  },
  {
    id: 'potato-chips', name: '薯片', unit: '1袋(约50g)', cat: 'snack',
    n: { kcal: 275, protein: 3, fat: 18, carb: 25, sugar: 0.5, fiber: 2, na: 250, va: 0, vc: 10, b1: 0.05, b2: 0.05, ca: 15, fe: 1.0, zn: 0.5, k: 600 },
  },
  {
    id: 'dark-chocolate', name: '黑巧克力(70%)', unit: '50g', cat: 'snack',
    n: { kcal: 300, protein: 4, fat: 22, carb: 24, sugar: 14, fiber: 6, na: 10, va: 5, vc: 0, b1: 0.05, b2: 0.1, ca: 40, fe: 6.0, zn: 2.0, k: 360 },
  },

  // ===== 补剂 =====
  {
    id: 'ysd-happy-vit', name: '养生堂成长快乐儿童复合维生素软糖', unit: '1粒(约2.5g)', cat: 'supplement', desc: '每粒约含VA160μg VC25mg B1/B2各0.5mg 锌1mg',
    n: { kcal: 10, protein: 0, fat: 0, carb: 2.5, sugar: 2, fiber: 0, na: 5, va: 160, vc: 25, b1: 0.5, b2: 0.5, ca: 0, fe: 0, zn: 1.0, k: 0 },
  },
];

if (typeof module !== 'undefined') module.exports = { FOODS, FOOD_CATS };
