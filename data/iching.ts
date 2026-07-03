// 先天八卦 · 数据来源：邵雍《梅花易数》 + 朱熹《周易本义》

export interface Trigram {
  num: number; // 先天序数 1-8
  name: string;
  symbol: string; // ☰
  lines: [number, number, number]; // 从下到上，1 阳 0 阴
  nature: string;
  element: string;
  attr: string;
}

export const trigrams: Record<string, Trigram> = {
  '乾': { num: 1, name: '乾', symbol: '☰', lines: [1, 1, 1], nature: '天', element: '金', attr: '刚健' },
  '兑': { num: 2, name: '兑', symbol: '☱', lines: [1, 1, 0], nature: '泽', element: '金', attr: '喜悦' },
  '离': { num: 3, name: '离', symbol: '☲', lines: [1, 0, 1], nature: '火', element: '火', attr: '光明' },
  '震': { num: 4, name: '震', symbol: '☳', lines: [1, 0, 0], nature: '雷', element: '木', attr: '奋动' },
  '巽': { num: 5, name: '巽', symbol: '☴', lines: [0, 1, 1], nature: '风', element: '木', attr: '柔顺' },
  '坎': { num: 6, name: '坎', symbol: '☵', lines: [0, 1, 0], nature: '水', element: '水', attr: '险陷' },
  '艮': { num: 7, name: '艮', symbol: '☶', lines: [0, 0, 1], nature: '山', element: '土', attr: '静止' },
  '坤': { num: 8, name: '坤', symbol: '☷', lines: [0, 0, 0], nature: '地', element: '土', attr: '柔顺' },
};

export const trigramByNum: Trigram[] = [
  trigrams['乾'], // placeholder [0]
  trigrams['乾'], // 1
  trigrams['兑'], // 2
  trigrams['离'], // 3
  trigrams['震'], // 4
  trigrams['巽'], // 5
  trigrams['坎'], // 6
  trigrams['艮'], // 7
  trigrams['坤'], // 8
];
// 说明：trigramByNum[1] = 乾 … trigramByNum[8] = 坤

export interface Hexagram {
  no: number; // 周易卦序 1-64
  name: string;
  upper: string; // 上卦名
  lower: string; // 下卦名
  guaci: string; // 卦辞
  xiangci: string; // 象曰
}

export const hexagrams: Hexagram[] = [
  { no: 1, name: '乾为天', upper: '乾', lower: '乾', guaci: '乾。元亨利贞。', xiangci: '天行健，君子以自强不息。' },
  { no: 2, name: '坤为地', upper: '坤', lower: '坤', guaci: '坤。元亨，利牝马之贞。君子有攸往，先迷后得主。利西南得朋，东北丧朋。安贞吉。', xiangci: '地势坤，君子以厚德载物。' },
  { no: 3, name: '水雷屯', upper: '坎', lower: '震', guaci: '屯。元亨利贞，勿用有攸往，利建侯。', xiangci: '云雷屯，君子以经纶。' },
  { no: 4, name: '山水蒙', upper: '艮', lower: '坎', guaci: '蒙。亨。匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告。利贞。', xiangci: '山下出泉，蒙。君子以果行育德。' },
  { no: 5, name: '水天需', upper: '坎', lower: '乾', guaci: '需。有孚，光亨贞吉。利涉大川。', xiangci: '云上于天，需。君子以饮食宴乐。' },
  { no: 6, name: '天水讼', upper: '乾', lower: '坎', guaci: '讼。有孚窒惕，中吉，终凶。利见大人，不利涉大川。', xiangci: '天与水违行，讼。君子以作事谋始。' },
  { no: 7, name: '地水师', upper: '坤', lower: '坎', guaci: '师。贞，丈人吉，无咎。', xiangci: '地中有水，师。君子以容民畜众。' },
  { no: 8, name: '水地比', upper: '坎', lower: '坤', guaci: '比。吉。原筮元永贞，无咎。不宁方来，后夫凶。', xiangci: '地上有水，比。先王以建万国，亲诸侯。' },
  { no: 9, name: '风天小畜', upper: '巽', lower: '乾', guaci: '小畜。亨。密云不雨，自我西郊。', xiangci: '风行天上，小畜。君子以懿文德。' },
  { no: 10, name: '天泽履', upper: '乾', lower: '兑', guaci: '履。履虎尾，不咥人，亨。', xiangci: '上天下泽，履。君子以辩上下，定民志。' },
  { no: 11, name: '地天泰', upper: '坤', lower: '乾', guaci: '泰。小往大来，吉亨。', xiangci: '天地交，泰。后以财成天地之道，辅相天地之宜，以左右民。' },
  { no: 12, name: '天地否', upper: '乾', lower: '坤', guaci: '否之匪人，不利君子贞。大往小来。', xiangci: '天地不交，否。君子以俭德辟难，不可荣以禄。' },
  { no: 13, name: '天火同人', upper: '乾', lower: '离', guaci: '同人于野，亨。利涉大川，利君子贞。', xiangci: '天与火，同人。君子以类族辨物。' },
  { no: 14, name: '火天大有', upper: '离', lower: '乾', guaci: '大有。元亨。', xiangci: '火在天上，大有。君子以遏恶扬善，顺天休命。' },
  { no: 15, name: '地山谦', upper: '坤', lower: '艮', guaci: '谦。亨，君子有终。', xiangci: '地中有山，谦。君子以裒多益寡，称物平施。' },
  { no: 16, name: '雷地豫', upper: '震', lower: '坤', guaci: '豫。利建侯行师。', xiangci: '雷出地奋，豫。先王以作乐崇德，殷荐之上帝，以配祖考。' },
  { no: 17, name: '泽雷随', upper: '兑', lower: '震', guaci: '随。元亨利贞，无咎。', xiangci: '泽中有雷，随。君子以向晦入宴息。' },
  { no: 18, name: '山风蛊', upper: '艮', lower: '巽', guaci: '蛊。元亨，利涉大川。先甲三日，后甲三日。', xiangci: '山下有风，蛊。君子以振民育德。' },
  { no: 19, name: '地泽临', upper: '坤', lower: '兑', guaci: '临。元亨利贞。至于八月有凶。', xiangci: '泽上有地，临。君子以教思无穷，容保民无疆。' },
  { no: 20, name: '风地观', upper: '巽', lower: '坤', guaci: '观。盥而不荐，有孚颙若。', xiangci: '风行地上，观。先王以省方观民设教。' },
  { no: 21, name: '火雷噬嗑', upper: '离', lower: '震', guaci: '噬嗑。亨。利用狱。', xiangci: '雷电噬嗑。先王以明罚敕法。' },
  { no: 22, name: '山火贲', upper: '艮', lower: '离', guaci: '贲。亨。小利有攸往。', xiangci: '山下有火，贲。君子以明庶政，无敢折狱。' },
  { no: 23, name: '山地剥', upper: '艮', lower: '坤', guaci: '剥。不利有攸往。', xiangci: '山附于地，剥。上以厚下安宅。' },
  { no: 24, name: '地雷复', upper: '坤', lower: '震', guaci: '复。亨。出入无疾，朋来无咎。反复其道，七日来复。利有攸往。', xiangci: '雷在地中，复。先王以至日闭关，商旅不行，后不省方。' },
  { no: 25, name: '天雷无妄', upper: '乾', lower: '震', guaci: '无妄。元亨利贞。其匪正有眚，不利有攸往。', xiangci: '天下雷行，物与无妄。先王以茂对时育万物。' },
  { no: 26, name: '山天大畜', upper: '艮', lower: '乾', guaci: '大畜。利贞，不家食吉。利涉大川。', xiangci: '天在山中，大畜。君子以多识前言往行，以畜其德。' },
  { no: 27, name: '山雷颐', upper: '艮', lower: '震', guaci: '颐。贞吉。观颐，自求口实。', xiangci: '山下有雷，颐。君子以慎言语，节饮食。' },
  { no: 28, name: '泽风大过', upper: '兑', lower: '巽', guaci: '大过。栋桡，利有攸往，亨。', xiangci: '泽灭木，大过。君子以独立不惧，遁世无闷。' },
  { no: 29, name: '坎为水', upper: '坎', lower: '坎', guaci: '习坎。有孚，维心亨，行有尚。', xiangci: '水洊至，习坎。君子以常德行，习教事。' },
  { no: 30, name: '离为火', upper: '离', lower: '离', guaci: '离。利贞，亨。畜牝牛，吉。', xiangci: '明两作，离。大人以继明照于四方。' },
  { no: 31, name: '泽山咸', upper: '兑', lower: '艮', guaci: '咸。亨，利贞，取女吉。', xiangci: '山上有泽，咸。君子以虚受人。' },
  { no: 32, name: '雷风恒', upper: '震', lower: '巽', guaci: '恒。亨，无咎，利贞。利有攸往。', xiangci: '雷风恒。君子以立不易方。' },
  { no: 33, name: '天山遁', upper: '乾', lower: '艮', guaci: '遁。亨。小利贞。', xiangci: '天下有山，遁。君子以远小人，不恶而严。' },
  { no: 34, name: '雷天大壮', upper: '震', lower: '乾', guaci: '大壮。利贞。', xiangci: '雷在天上，大壮。君子以非礼弗履。' },
  { no: 35, name: '火地晋', upper: '离', lower: '坤', guaci: '晋。康侯用锡马蕃庶，昼日三接。', xiangci: '明出地上，晋。君子以自昭明德。' },
  { no: 36, name: '地火明夷', upper: '坤', lower: '离', guaci: '明夷。利艰贞。', xiangci: '明入地中，明夷。君子以莅众，用晦而明。' },
  { no: 37, name: '风火家人', upper: '巽', lower: '离', guaci: '家人。利女贞。', xiangci: '风自火出，家人。君子以言有物而行有恒。' },
  { no: 38, name: '火泽睽', upper: '离', lower: '兑', guaci: '睽。小事吉。', xiangci: '上火下泽，睽。君子以同而异。' },
  { no: 39, name: '水山蹇', upper: '坎', lower: '艮', guaci: '蹇。利西南，不利东北。利见大人，贞吉。', xiangci: '山上有水，蹇。君子以反身修德。' },
  { no: 40, name: '雷水解', upper: '震', lower: '坎', guaci: '解。利西南。无所往，其来复吉。有攸往，夙吉。', xiangci: '雷雨作，解。君子以赦过宥罪。' },
  { no: 41, name: '山泽损', upper: '艮', lower: '兑', guaci: '损。有孚，元吉，无咎，可贞，利有攸往。曷之用？二簋可用享。', xiangci: '山下有泽，损。君子以惩忿窒欲。' },
  { no: 42, name: '风雷益', upper: '巽', lower: '震', guaci: '益。利有攸往，利涉大川。', xiangci: '风雷益。君子以见善则迁，有过则改。' },
  { no: 43, name: '泽天夬', upper: '兑', lower: '乾', guaci: '夬。扬于王庭，孚号有厉。告自邑，不利即戎。利有攸往。', xiangci: '泽上于天，夬。君子以施禄及下，居德则忌。' },
  { no: 44, name: '天风姤', upper: '乾', lower: '巽', guaci: '姤。女壮，勿用取女。', xiangci: '天下有风，姤。后以施命诰四方。' },
  { no: 45, name: '泽地萃', upper: '兑', lower: '坤', guaci: '萃。亨，王假有庙。利见大人，亨，利贞。用大牲吉，利有攸往。', xiangci: '泽上于地，萃。君子以除戎器，戒不虞。' },
  { no: 46, name: '地风升', upper: '坤', lower: '巽', guaci: '升。元亨，用见大人，勿恤。南征吉。', xiangci: '地中生木，升。君子以顺德，积小以高大。' },
  { no: 47, name: '泽水困', upper: '兑', lower: '坎', guaci: '困。亨，贞，大人吉，无咎。有言不信。', xiangci: '泽无水，困。君子以致命遂志。' },
  { no: 48, name: '水风井', upper: '坎', lower: '巽', guaci: '井。改邑不改井，无丧无得。往来井井，汔至亦未繘井，羸其瓶，凶。', xiangci: '木上有水，井。君子以劳民劝相。' },
  { no: 49, name: '泽火革', upper: '兑', lower: '离', guaci: '革。巳日乃孚，元亨利贞，悔亡。', xiangci: '泽中有火，革。君子以治历明时。' },
  { no: 50, name: '火风鼎', upper: '离', lower: '巽', guaci: '鼎。元吉，亨。', xiangci: '木上有火，鼎。君子以正位凝命。' },
  { no: 51, name: '震为雷', upper: '震', lower: '震', guaci: '震。亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。', xiangci: '洊雷震。君子以恐惧修省。' },
  { no: 52, name: '艮为山', upper: '艮', lower: '艮', guaci: '艮。艮其背，不获其身。行其庭，不见其人。无咎。', xiangci: '兼山艮。君子以思不出其位。' },
  { no: 53, name: '风山渐', upper: '巽', lower: '艮', guaci: '渐。女归吉，利贞。', xiangci: '山上有木，渐。君子以居贤德善俗。' },
  { no: 54, name: '雷泽归妹', upper: '震', lower: '兑', guaci: '归妹。征凶，无攸利。', xiangci: '泽上有雷，归妹。君子以永终知敝。' },
  { no: 55, name: '雷火丰', upper: '震', lower: '离', guaci: '丰。亨，王假之，勿忧，宜日中。', xiangci: '雷电皆至，丰。君子以折狱致刑。' },
  { no: 56, name: '火山旅', upper: '离', lower: '艮', guaci: '旅。小亨，旅贞吉。', xiangci: '山上有火，旅。君子以明慎用刑而不留狱。' },
  { no: 57, name: '巽为风', upper: '巽', lower: '巽', guaci: '巽。小亨，利有攸往，利见大人。', xiangci: '随风巽。君子以申命行事。' },
  { no: 58, name: '兑为泽', upper: '兑', lower: '兑', guaci: '兑。亨，利贞。', xiangci: '丽泽兑。君子以朋友讲习。' },
  { no: 59, name: '风水涣', upper: '巽', lower: '坎', guaci: '涣。亨，王假有庙。利涉大川，利贞。', xiangci: '风行水上，涣。先王以享于帝立庙。' },
  { no: 60, name: '水泽节', upper: '坎', lower: '兑', guaci: '节。亨，苦节不可贞。', xiangci: '泽上有水，节。君子以制数度，议德行。' },
  { no: 61, name: '风泽中孚', upper: '巽', lower: '兑', guaci: '中孚。豚鱼吉，利涉大川，利贞。', xiangci: '泽上有风，中孚。君子以议狱缓死。' },
  { no: 62, name: '雷山小过', upper: '震', lower: '艮', guaci: '小过。亨，利贞。可小事，不可大事。飞鸟遗之音，不宜上，宜下，大吉。', xiangci: '山上有雷，小过。君子以行过乎恭，丧过乎哀，用过乎俭。' },
  { no: 63, name: '水火既济', upper: '坎', lower: '离', guaci: '既济。亨小，利贞。初吉终乱。', xiangci: '水在火上，既济。君子以思患而预防之。' },
  { no: 64, name: '火水未济', upper: '离', lower: '坎', guaci: '未济。亨，小狐汔济，濡其尾，无攸利。', xiangci: '火在水上，未济。君子以慎辨物居方。' },
];

// 根据上下卦名找 hexagram
export function findHexagram(upper: string, lower: string): Hexagram | undefined {
  return hexagrams.find((h) => h.upper === upper && h.lower === lower);
}

// 六爻（0=阴 1=阳，从下到上）→ 上下卦
export function linesToHexagram(sixLines: number[]): Hexagram | undefined {
  if (sixLines.length !== 6) return undefined;
  const lowerLines = sixLines.slice(0, 3) as [number, number, number];
  const upperLines = sixLines.slice(3, 6) as [number, number, number];
  const findByLines = (arr: [number, number, number]) => {
    for (const [name, tri] of Object.entries(trigrams)) {
      if (tri.lines[0] === arr[0] && tri.lines[1] === arr[1] && tri.lines[2] === arr[2]) {
        return name;
      }
    }
    return '';
  };
  const upperName = findByLines(upperLines);
  const lowerName = findByLines(lowerLines);
  return findHexagram(upperName, lowerName);
}