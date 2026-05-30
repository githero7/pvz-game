# 植物大战僵尸 (Plants vs. Zombies) - JavaScript 复刻版

在线体验：[https://githero7.github.io/pvz-game/](https://githero7.github.io/pvz-game/)

## 简介

植物大战僵尸的 JavaScript 复刻版，使用纯 JavaScript 实现，无需任何框架或运行时。

⚠️ **版权声明**：本项目代码仅供学习交流。植物大战僵尸是 Electronic Arts / PopCap 的注册商标，所有角色、图片、音频、文案版权归其所有。

## 快速开始

1. 克隆仓库
   ```bash
   git clone git@github.com:githero7/pvz-game.git
   ```

2. 准备游戏素材

   将原版 `assets/img/` 和 `assets/audio/` 放到对应目录下：
   ```
   assets/
   ├── css/
   │   └── style.css
   ├── js/
   │   ├── core.js
   │   └── levels.js
   ├── img/         ← 需要自己准备
   │   ├── cards/
   │   ├── misc/
   │   ├── plants/
   │   ├── ui/
   │   └── zombies/
   └── audio/       ← 需要自己准备
       ├── Faster.mp3
       ├── UraniwaNi.mp3
       └── Ultimate battle.mp3
   ```

3. 直接在浏览器中打开 `index.html` 即可运行

## 项目结构

```
.
├── index.html              # 主页面
├── assets/
│   ├── css/style.css       # 样式表
│   └── js/
│       ├── core.js         # 核心游戏逻辑
│       └── levels.js       # 关卡数据
└── .gitignore
```

## 浏览器支持

- Chrome（推荐）
- Firefox
- Safari
- Edge

## License

代码仅供学习交流，不提供任何许可证。素材版权归 EA / PopCap 所有。
