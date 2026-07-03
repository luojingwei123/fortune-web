// 六爻断卦逻辑

import { trigrams, findHexagram, type Hexagram } from "./iching";

/**
 * 六爻类型
 */
export type YaoType = "oldYin" | "youngYin" | "youngYang" | "oldYang";

export interface LiuyaoResult {
  benGua: Hexagram;
  bianGua: Hexagram | undefined;
  benLines: number[]; // 从下到上，1 阳 0 阴（本卦）
  bianLines: number[]; // 变卦
  yaoTypes: YaoType[]; // 6 爻类型
  dongYaoPositions: number[]; // 动爻位（1-6）
  shiPos: number; // 世爻位置（1-6）
  yingPos: number; // 应爻位置
}

/**
 * 从 URL code 解码
 * 每字符：O=老阳 Y=少阳 y=少阴 o=老阴
 */
export function decodeYaos(code: string): YaoType[] {
  const map: Record<string, YaoType> = {
    O: "oldYang",
    Y: "youngYang",
    y: "youngYin",
    o: "oldYin",
  };
  return code
    .split("")
    .map((c) => map[c])
    .filter((x): x is YaoType => x !== undefined);
}

/**
 * 八宫世应表
 * 每一宫（如乾宫、坎宫），有 8 卦，世爻位分别为：6, 1, 2, 3, 4, 5, 4, 3
 * 顺序：本宫首卦、一世卦、二世卦、三世卦、四世卦、五世卦、游魂卦、归魂卦
 */
const shiPositions = [6, 1, 2, 3, 4, 5, 4, 3];

/**
 * 八宫卦名（京房八宫）
 * 每宫 8 卦按顺序：本宫首、一世、二世、三世、四世、五世、游魂、归魂
 */
const eightPalaces: Record<string, string[]> = {
  乾: ["乾为天", "天风姤", "天山遁", "天地否", "风地观", "山地剥", "火地晋", "火天大有"],
  坎: ["坎为水", "水泽节", "水雷屯", "水火既济", "泽火革", "雷火丰", "地火明夷", "地水师"],
  艮: ["艮为山", "山火贲", "山天大畜", "山泽损", "火泽睽", "天泽履", "风泽中孚", "风山渐"],
  震: ["震为雷", "雷地豫", "雷水解", "雷风恒", "地风升", "水风井", "泽风大过", "泽雷随"],
  巽: ["巽为风", "风天小畜", "风火家人", "风雷益", "天雷无妄", "火雷噬嗑", "山雷颐", "山风蛊"],
  离: ["离为火", "火山旅", "火风鼎", "火水未济", "山水蒙", "风水涣", "天水讼", "天火同人"],
  坤: ["坤为地", "地雷复", "地泽临", "地天泰", "雷天大壮", "泽天夬", "水天需", "水地比"],
  兑: ["兑为泽", "泽水困", "泽地萃", "泽山咸", "水山蹇", "地山谦", "雷山小过", "雷泽归妹"],
};

/**
 * 根据卦名查找它属于哪一宫、第几卦
 */
export function findPalaceOf(guaName: string): {
  palace: string;
  index: number;
} | null {
  for (const [palace, guas] of Object.entries(eightPalaces)) {
    const idx = guas.indexOf(guaName);
    if (idx >= 0) return { palace, index: idx };
  }
  return null;
}

/**
 * 世应位置
 */
export function getShiYing(guaName: string): { shi: number; ying: number } {
  const info = findPalaceOf(guaName);
  if (!info) return { shi: 6, ying: 3 };
  const shi = shiPositions[info.index];
  // 应爻 = 世爻 + 3（隔三位），若 >6 则减 6
  let ying = shi + 3;
  if (ying > 6) ying -= 6;
  return { shi, ying };
}

/**
 * 组装六爻结果
 */
export function buildLiuyaoResult(code: string): LiuyaoResult | null {
  const yaoTypes = decodeYaos(code);
  if (yaoTypes.length !== 6) return null;

  // 本卦：每爻的 value
  const benLines: number[] = yaoTypes.map((t) =>
    t === "oldYang" || t === "youngYang" ? 1 : 0
  );

  // 变卦：动爻翻转
  const bianLines = benLines.slice();
  const dongYaoPositions: number[] = [];
  yaoTypes.forEach((t, i) => {
    if (t === "oldYang" || t === "oldYin") {
      dongYaoPositions.push(i + 1);
      bianLines[i] = 1 - bianLines[i];
    }
  });

  // 找卦
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

  const benLowerName = findByLines(benLines.slice(0, 3));
  const benUpperName = findByLines(benLines.slice(3, 6));
  const benGua = findHexagram(benUpperName, benLowerName);
  if (!benGua) return null;

  let bianGua: Hexagram | undefined;
  if (dongYaoPositions.length > 0) {
    const bianLowerName = findByLines(bianLines.slice(0, 3));
    const bianUpperName = findByLines(bianLines.slice(3, 6));
    bianGua = findHexagram(bianUpperName, bianLowerName);
  }

  const { shi, ying } = getShiYing(benGua.name);

  return {
    benGua,
    bianGua,
    benLines,
    bianLines,
    yaoTypes,
    dongYaoPositions,
    shiPos: shi,
    yingPos: ying,
  };
}

// ==== 解读生成 ====

const yaoNames = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];

export interface LiuyaoInterpretation {
  overview: string;
  benReading: string;
  bianReading: string;
  dongReading: string;
  shiYingReading: string;
  overall: string;
}

export function buildLiuyaoInterpretation(
  result: LiuyaoResult,
  question: string
): LiuyaoInterpretation {
  const { benGua, bianGua, dongYaoPositions, shiPos, yingPos, yaoTypes } =
    result;

  const questionRef = question ? `就你所问的「${question}」而言` : "综合此刻的能量";

  const dongCount = dongYaoPositions.length;
  const dongDesc =
    dongCount === 0
      ? "六爻皆静，没有动爻"
      : dongCount === 6
      ? "六爻皆动，变化剧烈"
      : `${dongCount} 个动爻，分别在${dongYaoPositions.map((p) => yaoNames[p - 1]).join("、")}`;

  const overview = `你摇出的本卦是${benGua.name}，${dongDesc}。${bianGua ? `变卦为${bianGua.name}。` : "无变卦，事情主要看本卦。"}世爻在${yaoNames[shiPos - 1]}，应爻在${yaoNames[yingPos - 1]}。${questionRef}，这一卦以周易本源的方式回应了你的问题。`;

  const benReading = `本卦${benGua.name}是你事情当下的"本源之象"。卦辞曰：${benGua.guaci}。象曰：${benGua.xiangci}。这段古文是几千年来验证下来的智慧，值得你反复品读。卦辞讲的是这个卦的整体形势，象曰则是从形象出发给出的处世之道。把它们和你现在的处境对照——通常会有相当直接的呼应。`;

  const dongReading = dongCount === 0
    ? `六爻皆静，是很特别的一种卦象。它意味着事情当下处于稳定状态，没有明显的动能推动变化，也没有明显的能量正在瓦解。这种状态既是好事——不用担心突发变故；也是提醒——如果你希望事情有变，你需要主动引入新的能量。`
    : dongCount === 6
    ? `六爻俱动，是极其罕见的卦象。事情正在剧烈变化，方方面面都在移动。这时候要格外冷静，任何决定都可能几天后就被推翻。宜静观、宜等待、宜先看清全局再动手。`
    : `本卦中有 ${dongCount} 个动爻——${dongYaoPositions.map((p) => yaoNames[p - 1]).join("、")}。动爻是事情的关键节点，是可以改变走向的支点。${dongYaoPositions.map((p) => {
        if (p <= 2) return `${yaoNames[p - 1]}动，暗示变化起于内在或事情的根基`;
        if (p <= 4) return `${yaoNames[p - 1]}动，暗示变化在事情的进程中段`;
        return `${yaoNames[p - 1]}动，暗示变化接近尾声或表现在外部`;
      }).join("；")}。抓住这些位置的信号，你就抓住了主动权。`;

  const bianReading = bianGua
    ? `变卦${bianGua.name}揭示这件事顺其自然发展下去的趋势。卦辞曰：${bianGua.guaci}。象曰：${bianGua.xiangci}。${benGua.name}→${bianGua.name}是本变对照，你可以把两卦的差别当作"如果不主动干预，事情会怎么走"的答卷。它不是判决书，是趋势报告——你越早读懂，越早有主动权。`
    : `本卦无动爻，故无变卦。事情就以本卦的形貌呈现，没有明显的转折趋势。`;

  const shiYingReading = `世爻${yaoNames[shiPos - 1]}代表你自己，应爻${yaoNames[yingPos - 1]}代表所占之事的另一方（或事情本身）。${
    Math.abs(shiPos - yingPos) === 3
      ? "世应相隔三位，是正常配置。"
      : "世应位置特殊。"
  } ${
    shiPos > yingPos
      ? "世高于应，你在事情中处于相对主动的位置。"
      : shiPos < yingPos
      ? "世低于应，你在事情中处于被动位置，多观察对方的动向。"
      : ""
  } 六爻断卦讲究世应关系——世应比和为好，世应相冲则事有阻。这需要结合具体的爻辞和当下情境综合判断，但基本原则是：先看清自己和对方各自的位置，再想怎么互动。`;

  // 综合建议：根据动爻和卦名
  let toneLead = "";
  if (dongCount === 0) {
    toneLead = "六爻皆静。事情当前处于稳态，向哪儿走要看你自己。";
  } else if (dongCount >= 4) {
    toneLead = `${dongCount} 爻俱动，变化正剧烈进行。要冷静，别急着做大决定。`;
  } else if (dongYaoPositions.some((p) => p === shiPos)) {
    toneLead = "动爻正好落在世爻，事情的关键变化直接影响到你自己，非常值得警觉。";
  } else if (dongYaoPositions.some((p) => p === yingPos)) {
    toneLead = "动爻落在应爻，事情的关键变化在对方或外部，你要密切观察对方的动作。";
  } else {
    toneLead = "动爻位置适中，事情有明确的转折点，但不会剧烈失控。";
  }

  const closing = `${benGua.xiangci}——这是本卦象曰给你的一句话。六爻断卦从来不是判死刑，它是给你一份来自天地的建议。真正的判断权在你手里，卦只是让你看清此刻的位置和方向。`;

  const overall = `${questionRef}，${toneLead} 本卦${benGua.name}${bianGua ? `→变卦${bianGua.name}` : ""}，是这次占卜的完整信息。${closing}`;

  return {
    overview,
    benReading,
    dongReading,
    bianReading,
    shiYingReading,
    overall,
  };
}
