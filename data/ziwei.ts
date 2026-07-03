// 紫微斗数：使用 iztro 库排盘 + 静态解读文案
// iztro 由 SylarLong 维护，MIT
// 十四主星：紫微、天机、太阳、武曲、天同、廉贞、天府、太阴、贪狼、巨门、天相、天梁、七杀、破军

// 十二宫名 → 中文/英文描述
export const twelvePalaces: Record<string, { desc: string; focus: string }> = {
  命宫: {
    desc: "命宫代表你的核心自我、性格根基、人生总倾向",
    focus: "看整体性格与人生大方向",
  },
  兄弟: {
    desc: "兄弟宫代表兄弟姐妹、同辈、平级同事的关系",
    focus: "看你与平辈的相处模式",
  },
  夫妻: {
    desc: "夫妻宫代表配偶、恋爱关系、伴侣质量",
    focus: "看你在亲密关系中的表现",
  },
  子女: {
    desc: "子女宫代表子女、下属、创造成果、性能力",
    focus: "看你的传承与创造力",
  },
  财帛: {
    desc: "财帛宫代表个人财富、赚钱能力、金钱观念",
    focus: "看你的求财方式与理财观",
  },
  疾厄: {
    desc: "疾厄宫代表身体健康、体质、易患疾病",
    focus: "看你的健康弱点与保养重点",
  },
  迁移: {
    desc: "迁移宫代表外出、远行、社会关系、对外形象",
    focus: "看你在外面的运势与人缘",
  },
  仆役: {
    desc: "仆役宫（交友宫）代表朋友、下属、外部合作者",
    focus: "看你的交友质量与合作运",
  },
  官禄: {
    desc: "官禄宫代表事业、职业、社会成就、地位",
    focus: "看你的事业方向与职场表现",
  },
  田宅: {
    desc: "田宅宫代表房产、家庭环境、不动产、家族",
    focus: "看你的家庭安稳与不动产运",
  },
  福德: {
    desc: "福德宫代表精神世界、兴趣爱好、心理感受、福气",
    focus: "看你的内在快乐与精神取向",
  },
  父母: {
    desc: "父母宫代表父母、长辈、上司、权威",
    focus: "看你与长辈的关系及思想根源",
  },
};

// 十四主星简介
export const majorStarInfo: Record<
  string,
  { keyword: string; brief: string }
> = {
  紫微: {
    keyword: "帝王 · 尊贵 · 领导",
    brief:
      "紫微星是斗数第一主星，象征帝王之气。有此星者往往有权威感、责任心与领导力，但也可能孤傲、不易接受批评。",
  },
  天机: {
    keyword: "智慧 · 变化 · 谋略",
    brief:
      "天机星主智慧与变化。有此星者头脑灵活、善于策略与分析，但也可能想得多做得少、变数多。",
  },
  太阳: {
    keyword: "光明 · 热情 · 博爱",
    brief:
      "太阳星主光明与热情。有此星者性格开朗、乐于助人、有大爱，但也可能过于操劳、锋芒毕露。",
  },
  武曲: {
    keyword: "刚毅 · 财星 · 果断",
    brief:
      "武曲星是财星，主刚毅果断。有此星者行动力强、擅长求财，但也可能过于强硬、缺乏柔软。",
  },
  天同: {
    keyword: "福气 · 温和 · 享受",
    brief:
      "天同星主福气与温和。有此星者性情温和、擅长人际、有福气，但也可能懒散、缺乏动力。",
  },
  廉贞: {
    keyword: "次桃花 · 变革 · 争斗",
    brief:
      "廉贞星次桃花，主变革。有此星者敢于冲破规则、有魅力，但也可能情绪起伏、感情复杂。",
  },
  天府: {
    keyword: "库藏 · 稳重 · 保守",
    brief:
      "天府星主库藏，性格稳重保守。有此星者善于积累、注重物质安全，但也可能过于谨慎、缺乏冒险精神。",
  },
  太阴: {
    keyword: "阴柔 · 情感 · 内敛",
    brief:
      "太阴星主阴柔情感。有此星者敏感细腻、有艺术气质、重情，但也可能多愁善感、优柔寡断。",
  },
  贪狼: {
    keyword: "第一桃花 · 多才 · 欲望",
    brief:
      "贪狼星是第一桃花星，多才多艺。有此星者活泼、擅长交际、有多种才能，但也可能欲望过多、感情复杂。",
  },
  巨门: {
    keyword: "口才 · 是非 · 疑心",
    brief:
      "巨门星主口才与是非。有此星者口才好、善分析、有洞察力，但也可能多疑、口舌是非多。",
  },
  天相: {
    keyword: "辅佐 · 公正 · 服务",
    brief:
      "天相星是辅佐之星，主公正服务。有此星者忠诚可靠、有原则、擅协调，但也可能优柔、依赖他人决策。",
  },
  天梁: {
    keyword: "老成 · 荫庇 · 慈善",
    brief:
      "天梁星主老成荫庇。有此星者有长者风范、乐于助人、明辨是非，但也可能爱管闲事、过于挑剔。",
  },
  七杀: {
    keyword: "将星 · 冲劲 · 果决",
    brief:
      "七杀星是将星，主冲劲。有此星者敢闯敢拼、果决独立，但也可能刚烈孤僻、缺乏耐心。",
  },
  破军: {
    keyword: "开创 · 破坏 · 变动",
    brief:
      "破军星主开创与变动。有此星者敢于破旧立新、变化多端，但也可能不稳定、耗损较大。",
  },
};

// 简化的星曜类型
export interface StarMini {
  name: string;
  type: "major" | "lucky" | "sha" | "minor";
  brightness?: "bright" | "normal" | "dim";
  siHua?: string;
}

export interface PalaceMini {
  name: string;
  branchName: string; // 地支中文
  stemName: string; // 天干中文
  stars: StarMini[];
  isMing: boolean;
  isShen: boolean;
  isCurrentDaXian: boolean;
  daXianRange?: [number, number];
}

export interface ZiweiChartMini {
  palaces: PalaceMini[]; // 12 个
  mingGongBranch: string;
  shenGongBranch: string;
  ziweiPos: string;
  wuxingJuName: string;
  lunarInfo: {
    lunarYear: number;
    lunarMonth: number;
    lunarDay: number;
  };
  currentAge: number;
  gender: string;
}

/**
 * 使用 iztro 排盘（客户端调用）
 * 由于 iztro 需要 window 环境，只能在 client component 中调用
 */
export async function castZiweiClient(
  year: number,
  month: number,
  day: number,
  hour: number,
  gender: "male" | "female"
): Promise<ZiweiChartMini> {
  const { astro } = await import("iztro");
  const solarDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const iztroGender = gender === "male" ? "男" : "女";
  const astrolabe = astro.bySolar(solarDate, hour, iztroGender, true, "zh-CN");

  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - year;

  const palaces: PalaceMini[] = astrolabe.palaces.map((p: any) => {
    const range = p.decadal?.range;
    const daXianRange = range ? ([range[0], range[1]] as [number, number]) : undefined;
    const isCurrent =
      daXianRange && currentAge >= daXianRange[0] && currentAge <= daXianRange[1];

    // 合并主星、次星、杂耀
    const allStars: StarMini[] = [
      ...(p.majorStars ?? []).map((s: any) => ({
        name: s.name,
        type: "major" as const,
        brightness:
          s.brightness === "庙" || s.brightness === "旺"
            ? ("bright" as const)
            : s.brightness === "陷" || s.brightness === "不"
              ? ("dim" as const)
              : ("normal" as const),
        siHua: s.mutagen,
      })),
      ...(p.minorStars ?? []).slice(0, 4).map((s: any) => ({
        name: s.name,
        type: "minor" as const,
        siHua: s.mutagen,
      })),
    ];

    return {
      name: p.name,
      branchName: p.earthlyBranch,
      stemName: p.heavenlyStem,
      stars: allStars,
      isMing: p.name === "命宫",
      isShen: p.isBodyPalace ?? false,
      isCurrentDaXian: !!isCurrent,
      daXianRange,
    };
  });

  const ziweiPalace = palaces.find((p) =>
    p.stars.some((s) => s.name === "紫微" && s.type === "major")
  );

  const lunar = astrolabe as any;
  return {
    palaces,
    mingGongBranch: astrolabe.earthlyBranchOfSoulPalace as string,
    shenGongBranch: astrolabe.earthlyBranchOfBodyPalace as string,
    ziweiPos: ziweiPalace?.branchName || "",
    wuxingJuName: astrolabe.fiveElementsClass as string,
    lunarInfo: {
      lunarYear: lunar.lunarDate ? parseInt(String(lunar.lunarDate).split("-")[0], 10) : year,
      lunarMonth: 1,
      lunarDay: 1,
    },
    currentAge,
    gender,
  };
}

// ==== 解读生成 ====

export interface ZiweiInterpretation {
  overview: string;
  mingGongReading: string; // 命宫解读
  shenGongReading: string; // 身宫解读
  keyPalacesReading: string; // 事业/财帛/夫妻等重点宫
  currentDaXian: string; // 当前大限
  overall: string; // 综合建议
}

export function buildZiweiInterpretation(
  chart: ZiweiChartMini,
  question: string
): ZiweiInterpretation {
  const mingGong = chart.palaces.find((p) => p.isMing);
  const shenGong = chart.palaces.find((p) => p.isShen);
  const currentDaXianPalace = chart.palaces.find((p) => p.isCurrentDaXian);

  const questionRef = question ? `就你所问的「${question}」` : "";

  // ==== overview ====
  const mingMajors = mingGong?.stars.filter((s) => s.type === "major").map((s) => s.name) || [];
  const mingStarsText = mingMajors.length > 0 ? mingMajors.join("、") : "空宫";
  const overview = `你的命盘已排定。命宫在${mingGong?.branchName || "未知"}宫，坐星${mingStarsText}${mingMajors.length > 0 ? "" : "，命宫无主星"}。身宫在${shenGong?.branchName || "未知"}宫。紫微星落${chart.ziweiPos}宫。五行局：${chart.wuxingJuName}。${questionRef}${questionRef ? "，" : ""}这张命盘的星象将从性格、事业、财富、感情、健康几个层面回应你。`;

  // ==== 命宫解读 ====
  let mingGongReading = "";
  if (mingMajors.length === 0) {
    mingGongReading = `你的命宫无主星，斗数称为"空宫"。空宫并不代表命弱，反而说明你的性格更依赖对宫（迁移宫）的星曜以及邻宫的辅助力量塑造。这类命格往往性格灵活多变、更受外部环境影响，需要通过后天经历和主动选择来"填补"自我。你的核心特质不是"天生刻在骨子里"的，而是你在人生中一点点长出来的。这既是自由，也是责任。`;
  } else {
    const readings = mingMajors.map((star) => {
      const info = majorStarInfo[star];
      if (!info) return `${star}星`;
      return `${star}（${info.keyword}）——${info.brief}`;
    });
    mingGongReading = `你的命宫主星是${mingStarsText}。命宫代表你的核心自我、性格根基与人生总倾向，是所有宫位中最重要的一宫。\n\n${readings.join("\n\n")}\n\n${mingMajors.length > 1 ? "多主星同宫，说明你的性格是多面组合的，不同的星相互影响，共同塑造你的行事风格。日常中你可能既有 A 星的一面，也有 B 星的一面，视情境而不同。" : "单主星坐命，性格特质相对纯粹清晰。"}`;
  }

  // ==== 身宫解读 ====
  const shenMajors = shenGong?.stars.filter((s) => s.type === "major").map((s) => s.name) || [];
  const shenStarsText = shenMajors.length > 0 ? shenMajors.join("、") : "空宫";
  let shenGongReading = "";
  if (shenGong?.isMing) {
    shenGongReading = `你的身宫与命宫同宫，坐星${mingStarsText}。这种命格叫"命身同宫"，说明你人生的方向和你的天性高度一致——你想成为的样子和你本来的样子是重合的。这类人往往目标明确、活得纯粹，也更容易走出属于自己的路。`;
  } else {
    shenGongReading = `你的身宫独立于命宫，落在${shenGong?.name}位置，坐星${shenStarsText}。身宫代表你后天的努力方向、成年后主要的关注领域。${shenGong?.name === "夫妻" ? "身宫在夫妻，说明你人生的重心之一是感情与伴侣。" : shenGong?.name === "官禄" ? "身宫在官禄，说明事业与社会成就是你人生的主战场。" : shenGong?.name === "财帛" ? "身宫在财帛，说明理财与物质安全会成为你重要的人生课题。" : shenGong?.name === "迁移" ? "身宫在迁移，说明你的人生剧本更多在外部、在流动中展开。" : shenGong?.name === "福德" ? "身宫在福德，说明精神世界、兴趣爱好比外部成就对你更重要。" : "这个位置暗示你成年后的注意力会更多放在这个领域。"} 命身分处不同宫，通常意味着"我是谁"和"我做什么"之间会有需要调和的地方。`;
  }

  // ==== 重点宫位 ====
  const keyPalaceNames = ["官禄", "财帛", "夫妻", "福德"];
  const keyReadings: string[] = [];
  keyPalaceNames.forEach((name) => {
    const palace = chart.palaces.find((p) => p.name === name);
    if (!palace) return;
    const majors = palace.stars.filter((s) => s.type === "major").map((s) => s.name);
    const info = twelvePalaces[name];
    if (majors.length === 0) {
      keyReadings.push(`**${name}宫**（${info?.focus}）：无主星。${name}宫空宫，${name === "官禄" ? "事业发展需借力于对宫夫妻宫的能量，晚成或多变" : name === "财帛" ? "求财方式需借助迁移与其他宫位综合判断" : name === "夫妻" ? "感情较为清淡或需外部助力才能圆满" : "精神世界的方向需从其他宫位综合判断"}。`);
    } else {
      const briefStars = majors.map((s) => {
        const inf = majorStarInfo[s];
        return inf ? `${s}（${inf.keyword.split("·")[0]}）` : s;
      }).join("、");
      keyReadings.push(`**${name}宫**（${info?.focus}）：坐${briefStars}。${info?.desc}。这个宫位显示，你在这个领域的核心倾向由这些星的能量共同决定。`);
    }
  });

  const keyPalacesReading = keyReadings.join("\n\n");

  // ==== 当前大限 ====
  let currentDaXian = "";
  if (currentDaXianPalace && currentDaXianPalace.daXianRange) {
    const [start, end] = currentDaXianPalace.daXianRange;
    const dxMajors = currentDaXianPalace.stars.filter((s) => s.type === "major").map((s) => s.name);
    currentDaXian = `你今年 ${chart.currentAge} 岁，正处于第${chart.palaces.filter((p) => p.daXianRange && p.daXianRange[0] < start).length + 1}个大限（${start}-${end}岁），大限落在${currentDaXianPalace.name}宫，坐星${dxMajors.length > 0 ? dxMajors.join("、") : "无主星"}。\n\n大限决定这十年的主基调。${currentDaXianPalace.name === "命宫" ? "大限走回命宫，是一个重要的自我整合期——过去的经验会汇聚成型。" : currentDaXianPalace.name === "官禄" ? "大限走官禄，这十年是事业上冲刺的时期，机会和考验并存。" : currentDaXianPalace.name === "财帛" ? "大限走财帛，这十年的核心议题是钱——赚钱、理财、财务规划。" : currentDaXianPalace.name === "夫妻" ? "大限走夫妻，这十年感情与伴侣是主线，无论好坏都会有深刻的经历。" : currentDaXianPalace.name === "田宅" ? "大限走田宅，这十年围绕家、房产、家庭稳定展开。" : currentDaXianPalace.name === "福德" ? "大限走福德，这十年更多是精神层面的探索与享受，也可能是心境的转变期。" : `大限在${currentDaXianPalace.name}宫，这个领域会是接下来十年的重点。`}`;
  } else {
    currentDaXian = "当前大限信息暂不明确。";
  }

  // ==== 综合 ====
  const overall = `${questionRef ? questionRef + "，" : ""}你的紫微命盘核心是"命宫${mingStarsText}"这个组合。它决定了你天生看世界的方式与最本真的行事偏好。命是天赋，运是选择，紫微斗数的价值不是告诉你"你注定是什么样"，而是让你看清"你的天赋倾向是什么，最适合走什么方向"。\n\n看一张命盘，最忌讳的是把它当判决书——里面有吉星，也有煞星，它们同时存在，正如你身上同时有光明面和阴影面。真正好的命盘不是"没有煞星"，而是"你知道怎么运用你有的所有能量"。\n\n请把这张命盘当作一份自我认识的地图。看熟它，然后合上它，去走自己的路。真正的答案，永远在你日复一日的选择里。`;

  return {
    overview,
    mingGongReading,
    shenGongReading,
    keyPalacesReading,
    currentDaXian,
    overall,
  };
}
