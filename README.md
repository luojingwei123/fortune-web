# 窥 · Fortune

> **四种传承术数,一次娱乐体验。**
>
> 塔罗 · 梅花易数 · 六爻 · 紫微斗数

一个响应式的中式算命 Web 应用(PC + 移动端一套代码),首页简洁四卡片入口,每种算命方式进入后有各自独立的视觉风格与交互流程。

⚠️ **本项目仅为传统术数文化展示与娱乐体验,不构成任何指导意见,请理性对待。**

---

## 📍 当前进度

| 版本 | 内容 | 状态 |
|---|---|---|
| **V0.1** | 首页 + **塔罗牌**(3 种牌阵、静态解读) | ✅ 完成 |
| **V0.1.1** | 塔罗交互优化:分排铺牌 + 两次点击确认 + 六段式解读 | ✅ 完成 |
| **V0.2** | **梅花易数**(时间/数字/字数三种起卦 · 本卦+变卦+动爻+体用生克) | ✅ 完成 |
| **V0.3** | **六爻起卦**(三枚铜钱摇 6 次 · 世应+动爻+断卦) | ✅ 完成 |
| **V0.4** | **紫微斗数**(生辰 → 十二宫命盘 · 命宫身宫大限) | ✅ 完成 |
| V1.0 | 部署上线 · Cloudflare Pages / Vercel | 🚧 待部署 |

---

## 🎨 设计定位

- **首页**:极简 · 米白(`#FAF7F2`) + 朱砂点缀(`#8B0000`),Noto Serif SC 中文衬线主字。
- **塔罗页**:深紫玄幻星辰(`#0F0724` + 金色 `#D4AF37`),Cormorant Garamond 英文衬线 + 星光粒子背景 + 3D 翻牌。
- **梅花易数页**:宣纸质感 + 水墨(`#F5EFE0` + `#0E0E0E` + 朱印 `#B22222`),Ma Shan Zheng 毛笔字标题 + 三层墨圈动画。
- **六爻页**:深靛铜钱(`#0F1A24` + 铜金 `#B08D57` + 竹青 `#4A6B4A`),ZCOOL XiaoWei 古朴中文 + 铜钱旋转动画。
- **紫微页**:深空星辰(`#050815` + 紫金 `#9B59B6` + 星白),Cinzel 星辰感英文 + 4×4 十二宫命盘。

配色/字体常量集中在 `app/globals.css` 的 `:root` 与 `.theme-*` 作用域。

---

## 🚀 快速上手

```bash
# 装依赖
npm install

# 启动 dev(默认端口 3000;用 PORT=3200 可换端口)
PORT=3200 npm run dev

# 打开 http://localhost:3200
```

生产构建 / 导出静态站:

```bash
npm run build
npm start
```

---

## 🧩 技术栈

- **Next.js 16** (App Router · Turbopack)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**
- **Framer Motion**(动画)
- **Lucide React**(图标)
- **iztro**(紫微斗数排盘 · SylarLong · MIT)

---

## 📁 目录结构

```
fortune-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 全局字体 + metadata
│   ├── page.tsx                  # ⭐ 首页(简洁 · 4 卡片入口)
│   ├── globals.css               # 全站 CSS · 主题变量 · 3D 翻牌
│   │
│   ├── tarot/                    # ⭐ 塔罗(深紫玄幻)
│   │   ├── layout.tsx
│   │   ├── page.tsx              #   Step 1 · 选牌阵 + 输入问题
│   │   ├── draw/page.tsx         #   Step 2 · 洗牌 + 分排铺牌 + 两次点击确认
│   │   └── result/page.tsx       #   Step 3 · 六段式解读
│   │
│   ├── meihua/                   # ⭐ 梅花易数(水墨宣纸)
│   │   ├── layout.tsx
│   │   ├── page.tsx              #   Step 1 · 选起卦方式 + 输入
│   │   ├── cast/page.tsx         #   Step 2 · 水墨晕开动画
│   │   └── result/page.tsx       #   Step 3 · 本卦/变卦/动爻/体用
│   │
│   ├── liuyao/                   # ⭐ 六爻(深靛铜钱)
│   │   ├── layout.tsx
│   │   ├── page.tsx              #   Step 1 · 输入问题
│   │   ├── cast/page.tsx         #   Step 2 · 铜钱旋转 6 次
│   │   └── result/page.tsx       #   Step 3 · 世应/动爻/卦辞
│   │
│   └── ziwei/                    # ⭐ 紫微斗数(深空星辰)
│       ├── layout.tsx
│       ├── page.tsx              #   Step 1 · 输入生辰
│       └── result/page.tsx       #   4×4 十二宫命盘 + 命宫/身宫/大限
│
├── data/                         # 数据 & 解读逻辑
│   ├── tarot.ts                  # 78 张塔罗牌数据
│   ├── spreads.ts                # 3 种塔罗牌阵定义
│   ├── interpretation.ts         # 塔罗六段式解读生成器
│   ├── iching.ts                 # 先天八卦 + 64 卦(朱熹《周易本义》)
│   ├── meihua.ts                 # 梅花断卦(体用生克+解读)
│   ├── liuyao.ts                 # 六爻断卦(世应+八宫+解读)
│   ├── ziwei.ts                  # 紫微解读(十四主星简介+宫位)
│   └── reference/                # 原始参考数据
│       ├── tarot-cn.json
│       ├── tarot-keywords.txt
│       └── tarot-spreads.md
│
├── public/
│   └── tarot/                    # 78 张塔罗牌图(Rider-Waite-Smith,公版)
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🎯 四种交互流程

### 塔罗
```
/tarot → /tarot/draw → /tarot/result
选牌阵 · 输入问题 → 洗牌·分排铺开·两次点击确认 → 六段式解读+综合建议
```

### 梅花易数
```
/meihua → /meihua/cast → /meihua/result
选起卦方式(时间/数字/字数)+ 问题 → 水墨晕开 → 本卦/变卦/动爻/体用生克+综合断卦
```

### 六爻
```
/liuyao → /liuyao/cast → /liuyao/result
输入问题 → 铜钱旋转 6 次(每爻记录字背分布) → 本卦/变卦/动爻/世应+综合断卦
```

### 紫微斗数
```
/ziwei → /ziwei/result
输入生辰四柱+性别 → 4×4 十二宫命盘 + 命宫/身宫/大限/主星解读
```

---

## 🔮 下次接班指南(重要 · 给未来的自己看)

如果你是下次接手这个项目的 Claude / claw / me:

1. **本地目录**:`~/Projects/fortune-web`
2. **本地开发**:`cd ~/Projects/fortune-web && PORT=3200 npm run dev`
3. **参考数据源**(另一个仓):https://github.com/luojingwei123/fortune-telling-dataset
4. **已确认的设计决策**(团长拍板过,不要回头改):
   - 无用户系统、无 LLM(先静态解读)
   - 每种算命方式独立视觉主题
   - 响应式一套代码 PC + 手机
   - 首页简洁米白 · 各子页面深色主题
   - 首页 slogan:「四种传承术数,一次娱乐体验」
   - 塔罗牌阵三种都做(用户可选)
   - 塔罗抽牌:分排铺开 + hover 突出 + 两次点击确认 + 每次洗牌
5. **主题 CSS 变量**:`.theme-tarot / .theme-meihua / .theme-liuyao / .theme-ziwei` 已在 `globals.css` 定义
6. **紫微用 iztro 库**:`npm i iztro`,在客户端组件里 `await import('iztro')`。iztro 会自己处理农历、干支、安星
7. **下一步(V1.0)**:部署到 Cloudflare Pages 或 Vercel
   - 推荐 Vercel(Next.js 官方):`vercel` CLI 一键
   - Cloudflare Pages 也 OK,需要 `output: 'export'` 或用 `@cloudflare/next-on-pages`
   - 图片 8.6 MB 静态资源没问题
8. **AI 深度解读（V0.5）**：每个结果页下方有一个“生成 AI 深度解读”按钮，前端 POST `/api/interpret` → 后端拼 prompt 调 DeepSeek V4 Pro（通过 `https://octogw.imocto.cn/v1` 网关）→ 流式返回 SSE。环境变量放 `.env.local`：    ```    LLM_API_KEY=<mlamp octopush 网关 key>    LLM_BASE_URL=https://octogw.imocto.cn/v1    LLM_MODEL=mlamp/deepseek-v4-pro    ```    限流：每 IP 每秒最多 3 个请求（内存 bucket、重启后重置）。
9. **可能的后续优化**：
   - 塔罗大牌阵结果长条堆叠可以做左右滑动
   - 紫微命盘手机端 4×4 太挤，可以改成上下滑动列表
   - 加“结果分享图”（生成海报）
   - 加“抽卡历史”（localStorage 存最近 5 次）

---

## ⚠️ 合规提示

依据「刑法·封建迷信虚构事实诈骗」相关规定,本项目:

- ✅ 定位为**传统术数文化展示** + **娱乐体验**
- ✅ 每个结果页明确标注「仅供娱乐参考」
- ❌ 不销售任何"开运物"、"符咒"、"化解服务"
- ❌ 不承诺具体人事的确定性预测
- ❌ 不收费

---

## 📖 数据来源

- **塔罗牌图**:[Rider-Waite-Smith Tarot Deck](https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck)(1909 年出版,公版)
- **塔罗牌意**:Mark McElroy《A Guide to Tarot Meanings》
- **周易 64 卦辞象曰**:朱熹《周易本义》(维基文库整理)
- **紫微斗数排盘**:[iztro](https://github.com/SylarLong/iztro)(MIT)
- **参考仓**:[fortune-telling-dataset](https://github.com/luojingwei123/fortune-telling-dataset)

---

## 🔄 更新历史

| 日期 | 版本 | 说明 |
|---|---|---|
| 2026-07-03 | V0.1   | 首页 + 塔罗(3 牌阵 + 静态解读)|
| 2026-07-03 | V0.1.1 | 塔罗交互重写:分排铺牌、两次点击确认、每次洗牌;六段式解读 + 5 部分综合建议 |
| 2026-07-03 | V0.2   | 梅花易数(时间/数字/字数起卦 + 本卦变卦动爻体用生克 + 大段断卦)|
| 2026-07-03 | V0.3   | 六爻起卦(三铜钱摇 6 次 + 本卦变卦 + 世应 + 八宫定位 + 断卦)|
| 2026-07-03 | V0.4   | 紫微斗数（iztro 排盘 + 4×4 十二宫命盘 + 命宫身宫大限主星解读）|
| 2026-07-03 | V0.4.1 | 首页顺序调整（塔罗放最后）+ 4 页入口加起卦方式介绍板块 |
| 2026-07-03 | V0.5   | AI 深度解读（DeepSeek V4 Pro 流式输出 · 秒级限流 3/s · 开关式按钮）|

---

**维护者**:@luojingwei123 + Claude (Anthropic)
