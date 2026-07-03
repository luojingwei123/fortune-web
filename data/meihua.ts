// 梅花易数解读逻辑

import { trigrams, hexagrams, findHexagram, type Hexagram, type Trigram } from "./iching";

/**
 * 五行生克
 * 生：金 → 水 → 木 → 火 → 土 → 金
 * 克：金 → 木 → 土 → 水 → 火 → 金
 */
const shengSeq = ["金", "水", "木", "火", "土"];
function isSheng(from: string, to: string): boolean {
  const idx = shengSeq.indexOf(from);
  if (idx === -1) return false;
  return shengSeq[(idx + 1) % 5] === to;
}
function isKe(from: string, to: string): boolean {
  const idx = shengSeq.indexOf(from);
  if (idx === -1) return false;
  return shengSeq[(idx + 2) % 5] === to;
}

export type TiYongRelation =
  | "yong_sheng_ti" // 用生体 - 吉
  | "ti_sheng_yong" // 体生用 - 泄气
  | "yong_ke_ti" // 用克体 - 凶
  | "ti_ke_yong" // 体克用 - 平/克胜
  | "bihe"; // 比和 - 吉

export interface MeihuaResult {
  benGua: Hexagram; // 本卦
  bianGua: Hexagram | undefined; // 变卦
  dongYao: number; // 动爻位 1-6
  upper: Trigram;
  lower: Trigram;
  ti: Trigram; // 体卦
  yong: Trigram; // 用卦
  tiYong: TiYongRelation;
  benLines: number[]; // 本卦六爻 从下到上 1阳0阴
  bianLines: number[]; // 变卦六爻
}

const relationLabel: Record<TiYongRelation, string> = {
  yong_sheng_ti: "用生体（吉）",
  ti_sheng_yong: "体生用（泄气）",
  yong_ke_ti: "用克体（凶）",
  ti_ke_yong: "体克用（可胜）",
  bihe: "体用比和（吉）",
};

const relationDetail: Record<TiYongRelation, string> = {
  yong_sheng_ti:
    "用卦生助体卦，是最好的组合。外部力量、事情本身、他人正在给你输送能量。此时行动往往会得到超出预期的支持，不宜过度自我消耗，允许外来助力进入。",
  ti_sheng_yong:
    "体卦生用卦，你在向外泄气。你正在给这件事付出自己的能量，但可能得不到对等回报。要问自己：这份付出是不是必要的？如果值得，就继续；如果只是被裹挟，请及时收回。",
  yong_ke_ti:
    "用卦克体卦，是最需要警惕的组合。外部环境、他人或事情本身的走向对你不利。这时候硬扛不明智，宜退守、宜等待、宜借势转向。凶不是绝对，而是提示。",
  ti_ke_yong:
    "体卦克用卦，你能够压制这件事。有主动权，但也要付出精力去克。半吉半劳，行动可以，但别贪多。",
  bihe: "体用同一五行，能量彼此和谐。事情与你的状态高度契合，进退自如。这种时候的选择通常都不会太错，跟随内心即可。",
};

export function relationOf(
  ti: Trigram,
  yong: Trigram
): TiYongRelation {
  if (ti.element === yong.element) return "bihe";
  if (isSheng(yong.element, ti.element)) return "yong_sheng_ti";
  if (isSheng(ti.element, yong.element)) return "ti_sheng_yong";
  if (isKe(yong.element, ti.element)) return "yong_ke_ti";
  if (isKe(ti.element, yong.element)) return "ti_ke_yong";
  return "bihe"; // fallback
}

/**
 * 计算完整梅花结果
 * @param upNum 上卦先天数 1-8
 * @param downNum 下卦先天数 1-8
 * @param dongYao 动爻 1-6（1=最下 6=最上）
 */
export function buildMeihuaResult(
  upNum: number,
  downNum: number,
  dongYao: number
): MeihuaResult | null {
  const trigramList = ["", "乾", "兑", "离", "震", "巽", "坎", "艮", "坤"];
  const upperName = trigramList[upNum];
  const lowerName = trigramList[downNum];
  const upper = trigrams[upperName];
  const lower = trigrams[lowerName];
  if (!upper || !lower) return null;

  const benGua = findHexagram(upperName, lowerName);
  if (!benGua) return null;

  // 本卦六爻（从下到上）：先取下卦 3 爻，再取上卦 3 爻
  const benLines = [...lower.lines, ...upper.lines];

  // 变卦：动爻位置反转
  const bianLines = benLines.slice();
  bianLines[dongYao - 1] = 1 - bianLines[dongYao - 1];

  // 从 bianLines 找变卦
  const bianLower = bianLines.slice(0, 3);
  const bianUpper = bianLines.slice(3, 6);
  const findByLines = (arr: number[]) => {
    for (const [name, tri] of Object.entries(trigrams)) {
      if (
        tri.lines[0] === arr[0] &&
        tri.lines[1] === arr[1] &&
        tri.lines[2] === arr[2]
      ) {
        return name;
      }
    }
    return "";
  };
  const bianUpperName = findByLines(bianUpper);
  const bianLowerName = findByLines(bianLower);
  const bianGua = findHexagram(bianUpperName, bianLowerName);

  // 体用判定：动爻在上卦（4/5/6）→ 上卦为用、下卦为体
  //          动爻在下卦（1/2/3）→ 下卦为用、上卦为体
  const dongInUpper = dongYao >= 4;
  const ti = dongInUpper ? lower : upper;
  const yong = dongInUpper ? upper : lower;

  return {
    benGua,
    bianGua,
    dongYao,
    upper,
    lower,
    ti,
    yong,
    tiYong: relationOf(ti, yong),
    benLines,
    bianLines,
  };
}

/**
 * 生成大段解读
 */
export interface MeihuaInterpretation {
  overview: string; // 概述
  benGuaReading: string; // 本卦解读
  bianGuaReading: string; // 变卦解读
  dongYaoReading: string; // 动爻解读
  tiYongReading: string; // 体用生克
  overall: string; // 综合建议
}

const yaoNames = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];

export function buildMeihuaInterpretation(
  result: MeihuaResult,
  question: string,
  method: string
): MeihuaInterpretation {
  const {
    benGua,
    bianGua,
    dongYao,
    upper,
    lower,
    ti,
    yong,
    tiYong,
  } = result;

  const methodDesc: Record<string, string> = {
    time: "以此刻的天时起卦，天地为你落下一卦",
    number: "以你直觉写下的数字起卦，数中藏着心相",
    text: "以你写下的话起卦，字数即卦象",
  };
  const questionRef = question ? `就你所问的「${question}」而言` : "综合此刻的能量";

  const overview = `${methodDesc[method] || "为你起卦一卦"}。本卦：${benGua.name}（${upper.symbol}${lower.symbol}，上${upper.name}下${lower.name}），${yaoNames[dongYao - 1]}动，变卦为${bianGua ? bianGua.name : "自身"}。${questionRef}，这一卦落到你面前，它自有回应。`;

  const benGuaReading = `本卦${benGua.name}是你事情当下的整体面貌。卦辞曰：${benGua.guaci}。象曰：${benGua.xiangci}。上卦${upper.name}属${upper.element}主"${upper.attr}"，象征${upper.nature}；下卦${lower.name}属${lower.element}主"${lower.attr}"，象征${lower.nature}。${upper.nature}在${lower.nature}之上，正是${benGua.name}此刻的形貌。你可以把它当作一幅画——画里的天地关系，就是你此刻要面对的处境。`;

  const dongYaoReading = `本卦第${dongYao}爻（${yaoNames[dongYao - 1]}）为动爻。动爻是断卦的重点，它标记了整件事变化的关键节点——不是命定的转折，而是你可以感受到能量正在此处松动。${dongYao <= 2 ? "动爻在下，暗示变化起于内在或基础层面，事情的根还在动。" : dongYao <= 4 ? "动爻在中，暗示变化处于事情的中段，是过程中的关键抉择点。" : "动爻在上，暗示变化接近尾声或表现在外，结局或外在层面正在变。"} 抓住动爻的信号，比抓紧不变的部分更能帮你看清方向。`;

  const bianGuaReading = bianGua
    ? `变卦${bianGua.name}是这件事发展的趋势。卦辞曰：${bianGua.guaci}。象曰：${bianGua.xiangci}。从${benGua.name}走向${bianGua.name}，${benGua.name === bianGua.name ? "本变一致，说明能量稳定，形势不会剧烈变动" : "格局在转变"}。变卦不是既定结局，而是"若按当前趋势继续走下去，事情大约会走到那里"。这提示你：如果对现在的方向满意，就让它继续；如果不满意，动爻处正是介入的点。`
    : `变卦不显。本卦即为终局，事情的走向与它当下呈现的形貌一致。`;

  const tiYongReading = `体用关系是梅花易数断吉凶的核心。此卦中，${dongYao >= 4 ? `动爻在上卦，故上卦${yong.name}为"用"（代表所占之事的外部走向），下卦${ti.name}为"体"（代表你自己）` : `动爻在下卦，故下卦${yong.name}为"用"（代表事情本身），上卦${ti.name}为"体"（代表你自己）`}。体属${ti.element}，用属${yong.element}，判为「${relationLabel[tiYong]}」。${relationDetail[tiYong]}`;

  const luckHint: Record<typeof tiYong, string> = {
    yong_sheng_ti: "总体基调偏吉。这是可以承接的时机。",
    ti_sheng_yong: "总体基调半吉半累。付出可以，但要清楚代价。",
    yong_ke_ti: "总体基调偏凶。宜守不宜攻，等风头过去。",
    ti_ke_yong: "总体基调可胜但劳。硬要行也能推进，只是耗神。",
    bihe: "总体基调平和向吉。跟着感觉走大概不会错。",
  };

  const overall = `${questionRef}，卦象呈现的是一幅${upper.nature}${lower.nature}的图景，动在${yaoNames[dongYao - 1]}，变入${bianGua ? bianGua.name : "自身"}。${luckHint[tiYong]} 记住梅花易数的心法："万物皆有兆，兆中皆有理"。这一卦不是要框住你，而是把你此刻的处境画出来给你看。你看见了，就有了主动权。${benGua.xiangci}——这是象曰给你的一句话，你可以把它当作接下来一段时间的座右铭。真正的答案，永远都在你自己心里，卦只是你看清自己的一面镜子。`;

  return {
    overview,
    benGuaReading,
    dongYaoReading,
    bianGuaReading,
    tiYongReading,
    overall,
  };
}
