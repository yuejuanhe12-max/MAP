# 北师香港浸会大学 · 校园服务网站（初版）

校园地图导览为主，集成失物招领与学部介绍。

## 本地预览

在项目目录执行：

```bash
# 方式一：Python
python3 -m http.server 8080

# 方式二：npx
npx serve .
```

浏览器打开：http://localhost:8080

## 页面结构

| 层级 | 页面 | 说明 |
|------|------|------|
| 一级 | 主界面 | 校园地图 +「失物招领」「学部介绍」入口 |
| 二级 | 失物招领 | 可缩放拖动地图、黄/蓝标记、筛选与提交 |
| 二级 | 学部介绍 | 四个学部卡片，仅 SCC 可进入师资页 |
| 三级 | SCC 师资 | 左文右图教师卡片，含 Geuntae PARK 示例 |

## 替换官方素材

- 校园地图：当前使用官网手绘图 `assets/campus-map.jpg`（2025 版），可自行替换同路径文件
- 学校 Logo：替换页眉 `.logo-mark` 或使用 `<img>` 引用官方 Logo
- 教师头像：在 `js/data.js` 的 `SCC_FACULTY` 中为每位教师添加 `photo` 字段并在模板中使用

## 文件说明

- `index.html` — 页面结构与弹窗
- `css/styles.css` — 品牌色、响应式、交互样式
- `js/data.js` — 失物、学部、师资数据
- `js/app.js` — 路由、地图、弹窗逻辑
- `assets/campus-map.svg` — 示意校园地图（可替换）
