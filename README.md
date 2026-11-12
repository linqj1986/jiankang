# 健康测试站

按性别与体重（40-70kg）跟踪今日营养摄入与运动量的纯静态站点（营养 + 运动两个页面）。

- 营养页：热量、蛋白质、脂肪、碳水、糖、钠(盐)、膳食纤维 + 维生素A/C/B1/B2 + 钙铁锌钾 共 15 项进度条
- 运动页：10 种运动按 WHO 口径折算为中等强度等效分钟，目标每日 30 分钟
- 目标值基于《中国居民膳食营养素参考摄入量(2023)》与 WHO 运动建议估算，热量/蛋白质随体重动态计算
- 内置 40+ 常见食物库（含汉堡王大皇堡套餐、肯德基劲脆鸡腿堡套餐等快餐数据）
- 当日记录存 localStorage，按日期自动清零；支持浅色/深色主题
- 零依赖、无构建步骤

## 本地预览

直接双击 `index.html` 即可，或：

```bash
npx serve .
```

## 部署到 Cloudflare Pages

1. 推送到 GitHub/GitLab 仓库
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git 选择该仓库
3. 构建命令留空，输出目录填 `/`（根目录）
4. 部署完成，后续 push 自动更新

## 文件结构

```
index.html      营养页
exercise.html   运动页
style.css       样式（浅/深色主题）
foods.js        食物营养数据库（估算值）
exercises.js    运动强度换算表
shared.js       公共逻辑（目标设置、主题、进度条渲染）
app.js          营养页交互
exercise.js     运动页交互
```

> 数据为估算值，仅供参考，不构成医疗建议。
