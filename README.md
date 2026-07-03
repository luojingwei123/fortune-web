# 窥 · Fortune

> **四种传承术数，一次娱乐体验。**
>
> 塔罗 · 梅花易数 · 六爻 · 紫微斗数

一个响应式的中式算命 Web 应用（PC + 移动端一套代码），首页简洁四卡片入口，每种算命方式进入后有各自独立的视觉风格与交互流程。

⚠️ **本项目仅为传统术数文化展示与娱乐体验，不构成任何指导意见，请理性对待。**

---

## 📍 当前进度

| 版本 | 内容 | 状态 |
|---|---|---|
| **V0.1** | 首页 + **塔罗牌**（3 种牌阵、静态解读） | ✅ 完成 |
| V0.2 | **梅花易数**（数字/时间起卦 + 卦辞解读） | 🚧 待开发 |
| V0.3 | **六爻**（三枚铜钱摇卦 + 世应用神） | 🚧 待开发 |
| V0.4 | **紫微斗数**（生辰 + 十二宫命盘） | 🚧 待开发 |
| V1.0 | 部署上线 · Cloudflare Pages | 🚧 待部署 |

---

## 🎨 设计定位

- **首页**：极简 · 米白（`#FAF7F2`） + 朱砂点缀（`#8B0000`），Noto Serif SC 中文衬线主字。
- **塔罗页**：深紫玄幻星辰（`#0F0724` + 金色 `#D4AF37`），Cormorant Garamond 英文衬线 + 星光粒子背景 + 3D 翻牌。
- **梅花易数页（预留）**：宣纸质感 + 水墨（`#F5EFE0` + `#0E0E0E` + 朱印 `#B22222`），Ma Shan Zheng 毛笔字。
- **六爻页（预留）**：深靛铜钱（`#0F1A24` + 铜金 `#B08D57` + 竹青 `#4A6B4A`），ZCOOL XiaoWei 古朴中文。
- **紫微页（预留）**：深空星辰（`#050815` + 紫金 `#9B59B6` + 星白），Cinzel 星辰感英文 + 十二宫命盘。

配色/字体常量集中在 `app/globals.css` 的 `:root` 与 `.theme-*` 作用域。

---

## 🚀 快速上手

```bash
# 装依赖
npm install

# 启动 dev（默认端口 3000；用 PORT=3200 可换端口）
npm run dev

# 打开 http://localhost:3000
```

生产构建 / 导出静态站：

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
- **Framer Motion**（动画）
- **Lucide React**（图标）

---

## 📁 目录结构

```
fortune-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 全局字体 + metadata
│   ├── page.tsx                  # ⭐ 首页（简洁 · 4 卡片入口）
│   ├── globals.css               # 全站 CSS · 主题变量 · 3D 翻牌
│   ├── tarot/                    # ⭐ 塔罗（已完成）
│   │   ├── layout.tsx            #   深紫玄幻 · 星光背景
│   │   ├── page.tsx              #   Step 1 · 选牌阵 + 输入问题
│   │   ├── draw/page.tsx         #   Step 2 · 洗牌 + 抽牌
│   │   └── result/page.tsx       #   Step 3 · 结果 · 关键词/牌意/位置解读/综合建议
│   ├── meihua/                   # 梅花易数（预留，V0.2）
│   ├── liuyao/                   # 六爻（预留，V0.3）
│   └── ziwei/                    # 紫微斗数（预留，V0.4）
│
├── data/                         # 数据模块
│   ├── tarot.ts                  # ⭐ 78 张塔罗牌完整数据（TS）
│   ├── spreads.ts                # ⭐ 3 种牌阵定义（单张/三张/凯尔特十字）
│   └── reference/                # 原始参考数据（原始 JSON / MD）
│       ├── tarot-cn.json
│       ├── tarot-keywords.txt
│       └── tarot-spreads.md
│
├── public/
│   └── tarot/                    # ⭐ 78 张塔罗牌图（Rider-Waite-Smith，公版）
│       ├── m00.jpg ~ m21.jpg     #   大阿卡纳 22 张
│       ├── w01.jpg ~ w14.jpg     #   权杖
│       ├── c01.jpg ~ c14.jpg     #   圣杯
│       ├── s01.jpg ~ s14.jpg     #   宝剑
│       └── p01.jpg ~ p14.jpg     #   星币
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🎯 塔罗页交互流程（已实现）

```
/tarot                        Step 1: 选牌阵（单张/三张/凯尔特十字）+ 心中一个问题
   ↓
/tarot/draw?spread=...&q=...  Step 2: 洗牌动画 → 扇形 21 张牌堆 → 点击抽 N 张
   ↓
/tarot/result?spread=...&cards=0u,10r,21u&q=...
                              Step 3: 每张牌展示 → 关键词 / 牌意 / 位置解读 → 综合建议
```

### URL 参数约定

- `spread`: `single` / `three` / `celtic`
- `cards`: `0u,10r,21u` — id + `u`(upright 正位) 或 `r`(reversed 逆位)
- `q`: 用户输入的问题（URL encoded，可为空）

---

## 🔮 下次接班指南（重要 · 给未来的自己看）

如果你是下次接手这个项目的 Claude / claw / me：

1. **本地目录**：`~/Projects/fortune-web`
2. **本地开发**：`cd ~/Projects/fortune-web && PORT=3200 npm run dev`（3000 端口常被占）
3. **参考数据源**（另一个仓）：https://github.com/luojingwei123/fortune-telling-dataset
   - 梅花易数：`开发资料/2_梅花易数/`（起卦规则、64卦、体用生克断法）
   - 六爻：`开发资料/3_六爻预测/` + `开发资料/开源库/liuyao-references/`（卦辞爻辞完整）
   - 紫微：`开发资料/开源库/ziwei-doushu-data/`（TS 完整算法可直接引用）
   - 八字/农历辅助：`开发资料/开源库/lunar-javascript/`（V0.4 需要）
4. **已确认的设计决策**（团长拍板过，不要回头改）：
   - 无用户系统、无 LLM（先静态解读）
   - 每种算命方式独立视觉主题
   - 响应式一套代码 PC + 手机
   - 首页简洁米白 · 各子页面各自深色主题
   - 首页 slogan 就叫「四种传承术数，一次娱乐体验」
   - 牌阵三种都做（用户选择）
5. **视觉主题 CSS 变量已预留**：`.theme-meihua` / `.theme-liuyao` / `.theme-ziwei` 已在 `globals.css` 定义好，直接用即可
6. **下一步待办（V0.2 · 梅花易数）**：
   - 参考 `fortune-telling-dataset/开发资料/2_梅花易数/`
   - 起卦方式支持：数字起卦（输入两个数字）/ 时间起卦（用当前时间）
   - 数据结构：先天八卦 8 卦 + 64 卦 + 体用生克断法
   - 页面：`/meihua`（引导）→ `/meihua/cast`（起卦动画）→ `/meihua/result`（本卦+变卦+断卦）
   - 需要新增：`data/gua.ts`（64 卦完整数据）+ `data/bagua.ts`（八卦基础）
7. **首页卡片解锁**：完成 V0.2 后，把 `app/page.tsx` 里对应方式的 `status: "coming"` 改成 `"available"`
8. **未决问题**：
   - 部署时如果图片资源太大要不要用 Next.js Image 优化？（当前用 `<img>`）
   - 是否要加"抽牌历史"（本地 localStorage 保存最近 5 次）？

---

## ⚠️ 合规提示

依据「刑法·封建迷信虚构事实诈骗」相关规定，本项目：

- ✅ 定位为**传统术数文化展示** + **娱乐体验**
- ✅ 每个结果页明确标注「仅供娱乐参考」
- ❌ 不销售任何"开运物"、"符咒"、"化解服务"
- ❌ 不承诺具体人事的确定性预测
- ❌ 不收费

---

## 📖 数据来源

- **塔罗牌图**：[Rider-Waite-Smith Tarot Deck](https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck)（1909 年出版，公版）
- **塔罗牌意**：Mark McElroy《A Guide to Tarot Meanings》整理，参考仓 [luojingwei123/fortune-telling-dataset](https://github.com/luojingwei123/fortune-telling-dataset)

---

## 🔄 更新历史

| 日期 | 版本 | 说明 |
|---|---|---|
| 2026-07-03 | V0.1 | 首页 + 塔罗（3 牌阵 + 静态解读）|

---

**维护者**：@luojingwei123 + Claude (Anthropic)
