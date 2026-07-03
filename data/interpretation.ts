// 塔罗静态深度解读生成器（无 LLM）
// 基于：牌意 + 正逆位 + 牌阵位置含义，组合出 3-6 段扩展解读

import type { TarotCard } from "./tarot";
import type { SpreadPosition, Spread } from "./spreads";
import { suitLabels } from "./tarot";

// 花色主题（用于生成花色相关的段落）
const suitTheme: Record<string, string> = {
  major:
    "大阿卡纳代表人生的重大课题与灵魂层面的启示，它的出现暗示这不是琐碎小事，而是命运正在推动某种转变。",
  wands:
    "权杖属火，主行动、激情、事业与创造能量，这张牌把注意力引向你的冲劲、抱负与执行力。",
  cups: "圣杯属水，主情感、直觉、关系与内心世界，这张牌关联着你的感受、羁绊与心灵流动。",
  swords:
    "宝剑属风，主思想、沟通、冲突与决断，这张牌指向你正在处理的判断、信念与言语交锋。",
  pentacles:
    "星币属土，主物质、金钱、健康与现实层面，这张牌把话题拉回可触可见的实际状况。",
};

// 元素气质
function elementFlavor(suit: string, reversed: boolean): string {
  const base = {
    major: reversed
      ? "生命课题当下被搁置或阻塞，你可能在抗拒某个必须面对的转变"
      : "一次生命层级的启示正在展开，你的选择会有深远影响",
    wands: reversed
      ? "行动力被消耗或方向不清，火焰在燃烧却没有落到实处"
      : "行动的时机到了，热情与主动会带你穿越",
    cups: reversed
      ? "情感的水流受阻，你可能在压抑感受或误读关系"
      : "情感在流动，直觉的指引比理性判断更可靠",
    swords: reversed
      ? "思维陷入循环或言语失和，你需要暂时放下辩论"
      : "清晰的判断和真相即将浮出水面，是时候做决定",
    pentacles: reversed
      ? "物质层面遇到阻碍或过度执着，需要重新评估性价比"
      : "现实回报在积累，脚踏实地会有稳定的收获",
  };
  return base[suit as keyof typeof base] || "";
}

// 位置类别（用来生成位置结合解读）
function classifyPosition(label: string): string {
  if (/过去|远因|根源|近期过去/.test(label)) return "past";
  if (/现在|当下|核心/.test(label)) return "present";
  if (/未来|结果|近期未来/.test(label)) return "future";
  if (/阻碍|助力/.test(label)) return "obstacle";
  if (/期望|意识|希望|恐惧/.test(label)) return "psyche";
  if (/自己/.test(label)) return "self";
  if (/外在|环境/.test(label)) return "external";
  if (/建议|指引/.test(label)) return "advice";
  return "generic";
}

/**
 * 生成正逆位深度含义（3-4 句）
 */
export function buildOrientationMeaning(
  card: TarotCard,
  reversed: boolean
): string {
  const orient = reversed ? "逆位" : "正位";
  const themeText = suitTheme[card.suit] || "";
  const flavor = elementFlavor(card.suit, reversed);

  const baseUpright = `作为${orient}出现的${card.nameCn}，能量是外显、直接、可被感知的。它带来的是主动的推力，牌面本身的意象——${card.upright}——正在你的当下发生或即将发生。`;

  const baseReversed = `作为${orient}出现的${card.nameCn}，能量偏向内隐、受阻或需要调整。它并不是纯粹的坏消息，而是提醒你注意被压抑、被忽视或被过度使用的一面。${card.reversed}这份提醒值得你放慢脚步认真对待。`;

  const base = reversed ? baseReversed : baseUpright;

  return `${base} ${themeText} ${flavor}。`;
}

/**
 * 生成位置结合解读（3-5 句）
 */
export function buildPositionInterpretation(
  card: TarotCard,
  reversed: boolean,
  position: SpreadPosition,
  spread: Spread,
  question: string
): string {
  const orient = reversed ? "逆位" : "正位";
  const kind = classifyPosition(position.label);
  const meaning = reversed ? card.reversed : card.upright;
  const keywords = reversed
    ? card.keywordsNegative
    : card.keywordsPositive;

  const questionRef = question
    ? `围绕你的问题「${question}」`
    : "综合你此刻的处境";

  const templates: Record<string, string> = {
    past: `${questionRef}，${card.nameCn}（${orient}）落在"${position.label}"位置，意味着——${position.hint}——正是由${keywords}这些能量所塑造。过往这段时间里，${meaning.replace(/。$/, "")}这些经历不是空过，它们是你今天面对现状的深层土壤，理解并放下它们，是继续前行的前提。`,

    present: `${questionRef}，${card.nameCn}（${orient}）落在"${position.label}"位置——${position.hint}。此刻的你正处于${keywords}这样的能量场中，牌面提示：${meaning}你需要做的不是逃离当下，而是清醒地站在这里，感受它给你的信号。`,

    future: `${questionRef}，${card.nameCn}（${orient}）出现在"${position.label}"，指向——${position.hint}。如果一切按当前的方向继续推进，你将迎来${keywords}的场景：${meaning}但请记住，未来不是被判决的，它是被你此刻的每一个选择所召唤的。`,

    obstacle: `${card.nameCn}（${orient}）横在"${position.label}"位置——${position.hint}。它的能量表现为${keywords}，${meaning}这是你必须正视的一股力量：或是外部阻力，或是你自己的模式。${questionRef}，绕不开它，就直面它。`,

    psyche: `${card.nameCn}（${orient}）落在"${position.label}"，映照出你潜意识里${keywords}这些真实的心理波动。${meaning}这些情绪或想法可能你自己都没有完全承认，但它们确实在牵引你的判断与行为。${questionRef}，看见它们，是自由的第一步。`,

    self: `${card.nameCn}（${orient}）指向你在这件事里的角色——${position.hint}。你身上正显化出${keywords}的一面：${meaning}${questionRef}，这是你当前给出的姿态，是否契合你想要的结果，值得你诚实地问一问自己。`,

    external: `${card.nameCn}（${orient}）代表"${position.label}"——${position.hint}。外在环境正呈现${keywords}的能量：${meaning}${questionRef}，这些外部因素既非全然的助力，也非纯粹的阻碍，关键在于你如何与它们互动。`,

    advice: `${card.nameCn}（${orient}）在"${position.label}"位置——${position.hint}——为你提供了${keywords}这样的路径提示。${meaning}${questionRef}，塔罗从来不给具体答案，但这张牌指出的方向值得你认真考虑，尤其是它正逆位所暗示的姿态。`,

    generic: `${card.nameCn}（${orient}）落在"${position.label}"——${position.hint}。它承载${keywords}的能量：${meaning}${questionRef}，把这张牌与这个位置的含义扣在一起阅读，你会得到更完整的图景。`,
  };

  return templates[kind] || templates.generic;
}

/**
 * 建议行动（2-4 句）
 */
export function buildActionAdvice(
  card: TarotCard,
  reversed: boolean,
  position: SpreadPosition
): string {
  const kind = classifyPosition(position.label);
  const orient = reversed ? "逆位" : "正位";

  // 根据牌的主题词生成具体建议
  const keywords = (
    reversed ? card.keywordsNegative : card.keywordsPositive
  ).split("、");
  const keyword = keywords[0] || "";

  const suitAction: Record<string, string> = {
    major: reversed
      ? "接下来一段时间，停下来问自己：我是在抗拒什么？把这份抗拒说出来、写下来、告诉一个信得过的人。"
      : "接下来一段时间，允许自己被这件事推动，不要过度掌控节奏，让命运的浪把你带到该去的地方。",
    wands: reversed
      ? "把想做的事挑一件真的动手做起来，哪怕只是一小步。停留在计划阶段只会消耗热情。"
      : "行动优于犹豫。制定一个 3 天内能开始的具体动作，然后启动它，气势会自己带你走。",
    cups: reversed
      ? "允许自己承认真实的感受，无论多么复杂。可以尝试写日记或与信任的人深谈一次。"
      : "跟随你的直觉，尤其是那些「没有理由但很强烈」的感受，它们往往比理性推理更接近真相。",
    swords: reversed
      ? "暂时停止争辩和内耗，睡一觉、走一走、离开这个话题 24 小时，你会更清楚。"
      : "该做决定就做决定，把利弊列出来，然后选那个让你半夜想起也不后悔的。",
    pentacles: reversed
      ? "重新算一次账——时间、金钱、精力，看看真实投入产出比，不要被沉没成本绑架。"
      : "扎实地做一件小事：整理房间、复盘一笔账、完成一项拖延已久的实务。物质世界的稳定会传导到其他层面。",
  };

  const base = suitAction[card.suit] || "";
  const emphasis = keyword
    ? `记住"${keyword}"这个关键词——它是这张牌想让你在"${position.label}"上留意的核心。`
    : "";

  return `${base}${emphasis ? " " + emphasis : ""}`;
}

/**
 * 综合建议（6-8 句）
 */
export function buildOverallAdvice(
  cards: { card: TarotCard; reversed: boolean; position: SpreadPosition }[],
  question: string,
  spreadName: string
): string {
  const total = cards.length;
  const upCount = cards.filter((c) => !c.reversed).length;
  const revCount = total - upCount;

  // 花色分布
  const suitCount: Record<string, number> = {};
  cards.forEach((c) => {
    suitCount[c.card.suit] = (suitCount[c.card.suit] || 0) + 1;
  });
  const dominantSuit = Object.entries(suitCount).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // 大阿卡纳占比
  const majorCount = suitCount["major"] || 0;

  // === 基调 ===
  let tone = "";
  if (upCount === total) {
    tone = `整副牌全部以正位呈现，${
      total > 1 ? "这是相当罕见的一致" : "能量非常清晰"
    }：宇宙的门是开的，你的直觉、你的行动、你的期待正在同一个方向上共振。此刻不宜过度谨慎，反而应该乘势而为。`;
  } else if (revCount === total) {
    tone = `整副牌全部以逆位呈现——这并不意味着糟糕，而是一个非常明确的信号：你需要向内转，暂停外向的追逐。你所面临的每一个课题都不在外面，而在你自己的模式、认知、情绪里。这是一次"该慢下来"的邀请。`;
  } else if (upCount > revCount) {
    tone = `${upCount} 张正位、${revCount} 张逆位。整体是向前推进的，但有一到几个需要审视的角落。主线在流动，只要愿意面对逆位牌所指出的阻塞点，路是通的。`;
  } else if (revCount > upCount) {
    tone = `${revCount} 张逆位、${upCount} 张正位。当前你要做的功课多于要享受的果实。这不是坏事，逆位牌像是路标，告诉你哪里需要修补、哪里需要放下、哪里需要重新校准。`;
  } else {
    tone = `正逆位各半——你的处境处在明显的过渡阶段。旧模式在瓦解，新模式还未稳定。这种时候最忌两件事：一是硬撑维持现状，二是被焦虑推着乱做决定。`;
  }

  // === 主题 ===
  const allKeywords = cards.flatMap((c) =>
    (c.reversed ? c.card.keywordsNegative : c.card.keywordsPositive).split("、")
  );
  const uniqueKeywords = Array.from(new Set(allKeywords)).slice(0, 8);
  const themes = `牌面浮现的核心关键词是：${uniqueKeywords.join(
    "、"
  )}。这些不是零散的词，把它们放在一起你会看到一条主线——你正在经历一次关于「${uniqueKeywords[0]}」与「${uniqueKeywords[1] || uniqueKeywords[0]}」之间的张力。`;

  // === 元素/花色分析 ===
  let elementAnalysis = "";
  if (dominantSuit && dominantSuit[1] >= 2) {
    const suitName = suitLabels[dominantSuit[0] as keyof typeof suitLabels];
    const suitReadings: Record<string, string> = {
      major: `${dominantSuit[1]} 张大阿卡纳集中出现，说明这已经不是一个日常小选择的层级，你面对的是人生阶段性的重要课题，请给予相应的重视。`,
      wands: `${dominantSuit[1]} 张权杖牌集中出现，火元素主导——话题围绕行动、事业、冲劲和创造力。你的处境呼唤主动，不呼唤等待。`,
      cups: `${dominantSuit[1]} 张圣杯牌集中出现，水元素主导——话题围绕情感、关系与内心真实的流动。理性判断在这里靠后，请把感受放在前面。`,
      swords: `${dominantSuit[1]} 张宝剑牌集中出现，风元素主导——话题围绕思考、沟通、判断和潜在的冲突。你需要更清晰的表达和更冷静的分析。`,
      pentacles: `${dominantSuit[1]} 张星币牌集中出现，土元素主导——话题围绕物质、金钱、健康和现实资源。玄虚的想法暂时放一放，回到具体的事上。`,
    };
    elementAnalysis = suitReadings[dominantSuit[0]] || "";
  } else if (majorCount >= 1 && cards.length <= 3) {
    elementAnalysis = `其中出现了 ${majorCount} 张大阿卡纳，这个位置的能量份量特别重，值得单独多看几眼。`;
  }

  // === 方向建议 ===
  const questionRef = question
    ? `围绕你的问题「${question}」`
    : "综合牌面整体";
  let direction = "";
  if (upCount > revCount) {
    direction = `${questionRef}，方向建议：往前走。不要被少数逆位牌吓退，把它们当成路上的减速带，减速通过即可，不必绕道。`;
  } else if (revCount > upCount) {
    direction = `${questionRef}，方向建议：暂停并回收。不是撤退，是收拢——把散出去的能量、注意力、情感线收回来，先把自己稳住，再决定下一步。`;
  } else {
    direction = `${questionRef}，方向建议：小步试探。既不激进也不僵持，每次做一个可撤回的小决定，观察反应，再调整。`;
  }

  // === 结语 ===
  const closing = `${spreadName}给你的从来不是唯一答案。塔罗的价值不在预言未来，而在此刻让你和自己的内心对上话。这些牌能够被你抽到、按这个顺序落到这些位置——已经完成了它们的使命。剩下的路，还是你自己走。`;

  return [tone, themes, elementAnalysis, direction, closing]
    .filter(Boolean)
    .join(" ");
}
