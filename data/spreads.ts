// 塔罗牌阵定义

export interface SpreadPosition {
  index: number;
  label: string; // 位置名，如"过去"
  hint: string; // 位置含义详细说明
  // 相对布局坐标（0-100 表示百分比，用于绝对定位）
  x: number;
  y: number;
  rotate?: number; // 旋转角度
}

export interface Spread {
  key: string;
  name: string;
  nameEn: string;
  count: number; // 抽几张
  desc: string;
  positions: SpreadPosition[];
  layoutHint: string;
}

export const spreads: Spread[] = [
  {
    key: "single",
    name: "单张牌阵",
    nameEn: "Single Card",
    count: 1,
    desc: "快速指引 · 每日建议 · 当下能量",
    layoutHint: "适合是/否问题、每日一抽、新手入门",
    positions: [
      {
        index: 1,
        label: "当下指引",
        hint: "这张牌代表你此刻的能量与建议",
        x: 50,
        y: 50,
      },
    ],
  },
  {
    key: "three",
    name: "三张牌阵",
    nameEn: "Past · Present · Future",
    count: 3,
    desc: "经典通用 · 过去 · 现在 · 未来",
    layoutHint: "适合绝大多数问题的起手式",
    positions: [
      { index: 1, label: "过去", hint: "已经发生、影响当前状况的过往因素", x: 20, y: 50 },
      { index: 2, label: "现在", hint: "当前正在发生、你所处的状态", x: 50, y: 50 },
      { index: 3, label: "未来", hint: "顺势发展下去可能的结果", x: 80, y: 50 },
    ],
  },
  {
    key: "celtic",
    name: "凯尔特十字",
    nameEn: "Celtic Cross",
    count: 10,
    desc: "深度全景 · 十位综合分析",
    layoutHint: "复杂问题的经典深度牌阵，覆盖内因外因、过去未来、期望结果",
    positions: [
      { index: 1, label: "当下核心", hint: "问题的核心状况，你现在的处境", x: 30, y: 50 },
      { index: 2, label: "阻碍/助力", hint: "横挡在你面前的挑战或推动因素", x: 30, y: 50, rotate: 90 },
      { index: 3, label: "远因/根源", hint: "问题的深层原因、潜意识影响", x: 30, y: 78 },
      { index: 4, label: "近期过去", hint: "刚过去不久、正在离开的因素", x: 12, y: 50 },
      { index: 5, label: "期望/意识", hint: "你对这件事的期待与想法", x: 30, y: 22 },
      { index: 6, label: "近期未来", hint: "即将到来的下一步", x: 48, y: 50 },
      { index: 7, label: "你自己", hint: "你在这件事中的角色与态度", x: 74, y: 78 },
      { index: 8, label: "外在环境", hint: "他人、环境对你的影响", x: 74, y: 60 },
      { index: 9, label: "希望/恐惧", hint: "内心真正的期盼与担忧", x: 74, y: 42 },
      { index: 10, label: "最终结果", hint: "综合各方面因素的可能结局", x: 74, y: 24 },
    ],
  },
];

export function getSpread(key: string): Spread | undefined {
  return spreads.find((s) => s.key === key);
}
