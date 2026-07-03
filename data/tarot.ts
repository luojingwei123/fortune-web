// 韦特塔罗 78 张牌 · 中文数据
// 数据来源：Rider-Waite-Smith Tarot Deck + Mark McElroy《A Guide to Tarot Meanings》

export type TarotSuit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';

export interface TarotCard {
  id: number;
  nameEn: string;
  nameCn: string;
  suit: TarotSuit;
  image: string; // e.g. /tarot/m00.jpg
  keywordsPositive: string;
  keywordsNegative: string;
  upright: string;
  reversed: string;
}

export const suitLabels: Record<TarotSuit, string> = {
  major: '大阿卡纳',
  wands: '权杖',
  cups: '圣杯',
  swords: '宝剑',
  pentacles: '星币',
};

export const tarotDeck: TarotCard[] = [
  { id: 0, nameEn: 'The Fool', nameCn: '愚者', suit: 'major', image: '/tarot/m00.jpg', keywordsPositive: '自由、新开始、纯真、信任、冒险', keywordsNegative: '轻率、鲁莽、幼稚、缺乏经验', upright: '新的开始，勇于跨出未知的一步，保持初心和好奇心。适合尝试新事物，但需注意不要过于草率。', reversed: '冒失、缺乏计划、不切实际的幻想。行动前请多加思考。' },
  { id: 1, nameEn: 'The Magician', nameCn: '魔术师', suit: 'major', image: '/tarot/m01.jpg', keywordsPositive: '能力、创造、意志力、专注、行动', keywordsNegative: '操纵、欺骗、优柔寡断、滥用天赋', upright: '你拥有实现目标所需的一切能力和资源，需要专注和主动出击。', reversed: '自欺欺人或欺骗他人，能力被浪费，需重新审视目的。' },
  { id: 2, nameEn: 'The High Priestess', nameCn: '女祭司', suit: 'major', image: '/tarot/m02.jpg', keywordsPositive: '直觉、神秘、内省、耐心、静观', keywordsNegative: '秘密外泄、忽视直觉、消极', upright: '倾听内心和直觉，答案已在心中，不要急于行动。', reversed: '过于依赖表面信息，需要转向内心听自己的声音。' },
  { id: 3, nameEn: 'The Empress', nameCn: '皇后', suit: 'major', image: '/tarot/m03.jpg', keywordsPositive: '丰饶、母性、创造力、感性、繁荣', keywordsNegative: '过度依赖、创造力受阻、感情失控', upright: '生活充满生机与创造，感情丰富，事业有收获。', reversed: '缺乏方向感，创造力被压抑，感情或事业遭遇瓶颈。' },
  { id: 4, nameEn: 'The Emperor', nameCn: '皇帝', suit: 'major', image: '/tarot/m04.jpg', keywordsPositive: '权威、秩序、理性、领导、稳固', keywordsNegative: '专制、僵化、控制欲过强', upright: '以坚定的意志和理性行事，能建立秩序和成就。', reversed: '过于强硬或缺乏权威，需要平衡刚柔。' },
  { id: 5, nameEn: 'The Hierophant', nameCn: '教皇', suit: 'major', image: '/tarot/m05.jpg', keywordsPositive: '传统、教育、灵性、忠告、规范', keywordsNegative: '教条、固执、拒绝新知', upright: '遵循传统或求助前辈，走稳妥可靠的道路。', reversed: '反抗规则可能带来自由，也可能带来麻烦。' },
  { id: 6, nameEn: 'The Lovers', nameCn: '恋人', suit: 'major', image: '/tarot/m06.jpg', keywordsPositive: '爱情、和谐、选择、结合、价值观', keywordsNegative: '选择困难、关系破裂、失衡', upright: '美好的感情或人际关系，或者是一个重大选择。', reversed: '关系出现分歧或不平衡，需要真诚沟通。' },
  { id: 7, nameEn: 'The Chariot', nameCn: '战车', suit: 'major', image: '/tarot/m07.jpg', keywordsPositive: '胜利、决心、控制、前进、成功', keywordsNegative: '缺乏方向、失控、内心冲突', upright: '凭借意志力和自制力克服障碍，取得胜利。', reversed: '内心失衡或方向不明，需要重新聚焦。' },
  { id: 8, nameEn: 'Strength', nameCn: '力量', suit: 'major', image: '/tarot/m08.jpg', keywordsPositive: '勇气、耐心、内在力量、自信、慈悲', keywordsNegative: '怯懦、暴躁、缺乏自制', upright: '以柔克刚，凭借内心的坚定和爱心解决问题。', reversed: '自信不足或过于强硬，需要重新找到平衡。' },
  { id: 9, nameEn: 'The Hermit', nameCn: '隐者', suit: 'major', image: '/tarot/m09.jpg', keywordsPositive: '内省、智慧、独处、寻找、指引', keywordsNegative: '孤独、封闭、逃避、隔绝', upright: '退居内心寻找答案，用智慧照亮前路。', reversed: '过度孤立或缺乏方向，需要与外界建立联系。' },
  { id: 10, nameEn: 'Wheel of Fortune', nameCn: '命运之轮', suit: 'major', image: '/tarot/m10.jpg', keywordsPositive: '转变、机缘、命运、周期、幸运', keywordsNegative: '厄运、失控、抗拒变化', upright: '命运正在转变，把握机会顺势而为。', reversed: '运势不佳或需承担过去的因果，耐心等待时机。' },
  { id: 11, nameEn: 'Justice', nameCn: '正义', suit: 'major', image: '/tarot/m11.jpg', keywordsPositive: '公平、诚实、责任、真相、法律', keywordsNegative: '不公、欺骗、逃避责任', upright: '以理性和公正处事，因果分明。', reversed: '面对不公或需承担隐藏责任，请诚实面对。' },
  { id: 12, nameEn: 'The Hanged Man', nameCn: '倒吊人', suit: 'major', image: '/tarot/m12.jpg', keywordsPositive: '牺牲、暂停、换视角、领悟、耐心', keywordsNegative: '拖延、停滞、无谓的牺牲', upright: '暂停行动，换个角度看问题，会有新的领悟。', reversed: '陷入停滞或牺牲无回报，需要打破现状。' },
  { id: 13, nameEn: 'Death', nameCn: '死神', suit: 'major', image: '/tarot/m13.jpg', keywordsPositive: '结束、转变、重生、放下、蜕变', keywordsNegative: '抗拒改变、停滞、恐惧结束', upright: '旧事物结束是新开始的必然，勇敢放下。', reversed: '拒绝改变或迟迟不能放下，痛苦延长。' },
  { id: 14, nameEn: 'Temperance', nameCn: '节制', suit: 'major', image: '/tarot/m14.jpg', keywordsPositive: '平衡、节制、调和、耐心、和谐', keywordsNegative: '失衡、过度、冲动、不耐烦', upright: '以中庸之道调和矛盾，稳步前行。', reversed: '生活失去平衡，或急于求成，需要收敛。' },
  { id: 15, nameEn: 'The Devil', nameCn: '恶魔', suit: 'major', image: '/tarot/m15.jpg', keywordsPositive: '欲望、诱惑、束缚、物欲、上瘾', keywordsNegative: '解脱、觉醒、摆脱束缚', upright: '受制于物质欲望或不健康的关系，是时候审视自己的欲望。', reversed: '开始觉醒并摆脱束缚，走向自由。' },
  { id: 16, nameEn: 'The Tower', nameCn: '塔', suit: 'major', image: '/tarot/m16.jpg', keywordsPositive: '突变、崩塌、揭示、觉醒、动荡', keywordsNegative: '灾难、突然打击、抗拒变化', upright: '旧秩序突然崩塌，虽痛苦但为重建奠定基础。', reversed: '内心动荡，正在经历深刻反思。' },
  { id: 17, nameEn: 'The Star', nameCn: '星星', suit: 'major', image: '/tarot/m17.jpg', keywordsPositive: '希望、灵感、宁静、康复、指引', keywordsNegative: '失望、失去信心、悲观', upright: '困境后的希望，被爱与信心指引前行。', reversed: '怀疑或失望，需要重新点燃希望之光。' },
  { id: 18, nameEn: 'The Moon', nameCn: '月亮', suit: 'major', image: '/tarot/m18.jpg', keywordsPositive: '潜意识、幻象、直觉、恐惧、迷惘', keywordsNegative: '欺骗、误解、恐惧过度', upright: '有隐藏的真相或恐惧需要面对，跟随直觉。', reversed: '困惑逐渐消散，真相浮现。' },
  { id: 19, nameEn: 'The Sun', nameCn: '太阳', suit: 'major', image: '/tarot/m19.jpg', keywordsPositive: '喜悦、成功、光明、活力、真理', keywordsNegative: '过度乐观、傲慢、成就受挫', upright: '幸福、成就、真心相待，一切都在光明中。', reversed: '暂时的失落或需要更谦逊的态度。' },
  { id: 20, nameEn: 'Judgement', nameCn: '审判', suit: 'major', image: '/tarot/m20.jpg', keywordsPositive: '复苏、觉醒、宽恕、使命、重生', keywordsNegative: '自我怀疑、无法释怀、拒绝改变', upright: '重新审视人生，得到宽恕与释放。', reversed: '无法原谅自己或他人，需要放下过去。' },
  { id: 21, nameEn: 'The World', nameCn: '世界', suit: 'major', image: '/tarot/m21.jpg', keywordsPositive: '完成、圆满、成就、整合、旅行', keywordsNegative: '未完成、缺失、耽搁', upright: '一个阶段圆满完成，可以开始新旅程。', reversed: '感觉少了什么，需要善始善终。' },
  { id: 22, nameEn: 'Ace of Wands', nameCn: '权杖一', suit: 'wands', image: '/tarot/w01.jpg', keywordsPositive: '灵感、开创、激情、行动', keywordsNegative: '缺乏动力、创意枯竭、拖延', upright: '新灵感或热情涌现，是行动的好时机。', reversed: '缺乏干劲，或热情消退。' },
  { id: 23, nameEn: 'Two of Wands', nameCn: '权杖二', suit: 'wands', image: '/tarot/w02.jpg', keywordsPositive: '计划、抉择、掌控、远见', keywordsNegative: '犹豫、拖延、目光短浅', upright: '规划未来，把握主动，有远见的抉择。', reversed: '犹豫不决错失机会。' },
  { id: 24, nameEn: 'Three of Wands', nameCn: '权杖三', suit: 'wands', image: '/tarot/w03.jpg', keywordsPositive: '扩展、进步、远景、合作', keywordsNegative: '延误、目光受限', upright: '计划有初步成果，可以扩展视野。', reversed: '进程受阻或需要重新评估方向。' },
  { id: 25, nameEn: 'Four of Wands', nameCn: '权杖四', suit: 'wands', image: '/tarot/w04.jpg', keywordsPositive: '庆祝、稳定、家庭、和谐', keywordsNegative: '不和、家庭问题', upright: '阶段性成功，值得庆祝，家庭和谐。', reversed: '家庭内部有矛盾或不安。' },
  { id: 26, nameEn: 'Five of Wands', nameCn: '权杖五', suit: 'wands', image: '/tarot/w05.jpg', keywordsPositive: '竞争、冲突、争论、活力', keywordsNegative: '内部纷争、和解无门', upright: '激烈的竞争或分歧，需通过讨论化解。', reversed: '分歧扩大或内部矛盾无法调和。' },
  { id: 27, nameEn: 'Six of Wands', nameCn: '权杖六', suit: 'wands', image: '/tarot/w06.jpg', keywordsPositive: '胜利、荣誉、赞誉、公开成功', keywordsNegative: '骄傲、失败、失去支持', upright: '获得公众认可和胜利。', reversed: '被质疑、失去支持者或成就被削弱。' },
  { id: 28, nameEn: 'Seven of Wands', nameCn: '权杖七', suit: 'wands', image: '/tarot/w07.jpg', keywordsPositive: '捍卫、坚持、勇气、防御', keywordsNegative: '退让、挫败、失去立场', upright: '面对挑战坚守立场。', reversed: '力不从心，被迫退让。' },
  { id: 29, nameEn: 'Eight of Wands', nameCn: '权杖八', suit: 'wands', image: '/tarot/w08.jpg', keywordsPositive: '迅速、消息、飞跃、进展', keywordsNegative: '延误、混乱、方向不明', upright: '事情迅速推进，好消息到来。', reversed: '进展受阻或消息延迟。' },
  { id: 30, nameEn: 'Nine of Wands', nameCn: '权杖九', suit: 'wands', image: '/tarot/w09.jpg', keywordsPositive: '坚持、警觉、韧性、最后关头', keywordsNegative: '疲惫、防备心过重', upright: '接近成功但需守住最后关口。', reversed: '过度警戒或身心俱疲。' },
  { id: 31, nameEn: 'Ten of Wands', nameCn: '权杖十', suit: 'wands', image: '/tarot/w10.jpg', keywordsPositive: '重担、责任、坚持、承担', keywordsNegative: '过劳、被压垮、无法坚持', upright: '任务繁重但接近终点，需要坚持。', reversed: '承担过重，需要放下部分负担。' },
  { id: 32, nameEn: 'Page of Wands', nameCn: '权杖侍从', suit: 'wands', image: '/tarot/w11.jpg', keywordsPositive: '热情、消息、探索、青春', keywordsNegative: '不成熟、易怒、坏消息', upright: '有新消息或新兴趣，充满好奇。', reversed: '计划受阻或情绪化冲动。' },
  { id: 33, nameEn: 'Knight of Wands', nameCn: '权杖骑士', suit: 'wands', image: '/tarot/w12.jpg', keywordsPositive: '冒险、热忱、行动派、勇往直前', keywordsNegative: '冲动、鲁莽、易怒', upright: '热情澎湃、行动迅速，敢于冒险。', reversed: '冲动而缺乏计划，容易受挫。' },
  { id: 34, nameEn: 'Queen of Wands', nameCn: '权杖王后', suit: 'wands', image: '/tarot/w13.jpg', keywordsPositive: '自信、热情、独立、领导力', keywordsNegative: '跋扈、嫉妒、控制欲', upright: '自信且富有魅力的女性，事业顺利。', reversed: '过于强势或情绪化，需要调整心态。' },
  { id: 35, nameEn: 'King of Wands', nameCn: '权杖国王', suit: 'wands', image: '/tarot/w14.jpg', keywordsPositive: '领导、远见、开拓、权威', keywordsNegative: '专横、冲动、独断', upright: '有远见的领导者，事业开拓有成。', reversed: '过于独断或行事鲁莽。' },
  { id: 36, nameEn: 'Ace of Cups', nameCn: '圣杯一', suit: 'cups', image: '/tarot/c01.jpg', keywordsPositive: '情感萌发、爱、直觉、灵感', keywordsNegative: '情感封闭、失恋、直觉受阻', upright: '新的感情、爱意涌现，心灵充满能量。', reversed: '情感受挫或压抑，无法表达。' },
  { id: 37, nameEn: 'Two of Cups', nameCn: '圣杯二', suit: 'cups', image: '/tarot/c02.jpg', keywordsPositive: '相爱、合作、平等、结合', keywordsNegative: '失和、分离、误会', upright: '两个人的美好联结，感情或合作契合。', reversed: '关系出现摩擦或误解。' },
  { id: 38, nameEn: 'Three of Cups', nameCn: '圣杯三', suit: 'cups', image: '/tarot/c03.jpg', keywordsPositive: '友谊、庆祝、欢乐、团聚', keywordsNegative: '小团体、酗酒、社交疲劳', upright: '友谊、庆祝的时刻，充满欢乐。', reversed: '过度社交或友谊出现小裂痕。' },
  { id: 39, nameEn: 'Four of Cups', nameCn: '圣杯四', suit: 'cups', image: '/tarot/c04.jpg', keywordsPositive: '沉思、无聊、机会未察、内省', keywordsNegative: '错过机会、消极、麻木', upright: '对现状感到无趣，或错失身边的机会。', reversed: '开始重新振作，找到新的兴趣。' },
  { id: 40, nameEn: 'Five of Cups', nameCn: '圣杯五', suit: 'cups', image: '/tarot/c05.jpg', keywordsPositive: '失落、遗憾、悲伤、后悔', keywordsNegative: '释怀、接受、放下过去', upright: '沉浸在失落中，忽视了剩下的美好。', reversed: '开始走出伤痛，看见希望。' },
  { id: 41, nameEn: 'Six of Cups', nameCn: '圣杯六', suit: 'cups', image: '/tarot/c06.jpg', keywordsPositive: '回忆、童年、故人、纯真', keywordsNegative: '沉溺过去、逃避现实', upright: '美好的回忆或旧友重逢。', reversed: '过度沉溺于过去，无法向前。' },
  { id: 42, nameEn: 'Seven of Cups', nameCn: '圣杯七', suit: 'cups', image: '/tarot/c07.jpg', keywordsPositive: '幻想、选择多、可能性、白日梦', keywordsNegative: '犹豫不决、脱离现实、成瘾', upright: '太多选择让人眼花缭乱，需辨清真假。', reversed: '从幻想中清醒，做出决定。' },
  { id: 43, nameEn: 'Eight of Cups', nameCn: '圣杯八', suit: 'cups', image: '/tarot/c08.jpg', keywordsPositive: '放下、离开、寻找、进步', keywordsNegative: '逃避、犹豫、恋恋不舍', upright: '主动放下不满足的现状去寻找新方向。', reversed: '留恋旧事物或恐惧改变。' },
  { id: 44, nameEn: 'Nine of Cups', nameCn: '圣杯九', suit: 'cups', image: '/tarot/c09.jpg', keywordsPositive: '满足、愿望达成、幸福、享受', keywordsNegative: '过度享乐、自满、不知足', upright: '愿望成真，享受当下的幸福。', reversed: '空虚感或自满于表面。' },
  { id: 45, nameEn: 'Ten of Cups', nameCn: '圣杯十', suit: 'cups', image: '/tarot/c10.jpg', keywordsPositive: '家庭幸福、圆满、和谐、爱', keywordsNegative: '家庭失和、期待落空', upright: '家庭美满，情感圆满。', reversed: '家庭内部摩擦或期望与现实差距。' },
  { id: 46, nameEn: 'Page of Cups', nameCn: '圣杯侍从', suit: 'cups', image: '/tarot/c11.jpg', keywordsPositive: '灵感、梦想、爱的信号、天真', keywordsNegative: '情绪化、不成熟、幻想过头', upright: '新的情感信号或创意，充满灵性。', reversed: '情绪化或过于天真。' },
  { id: 47, nameEn: 'Knight of Cups', nameCn: '圣杯骑士', suit: 'cups', image: '/tarot/c12.jpg', keywordsPositive: '浪漫、追求、感性、艺术', keywordsNegative: '情绪不稳、幻想、优柔寡断', upright: '浪漫的追求者，感性、有艺术气质。', reversed: '感情不稳定或不切实际。' },
  { id: 48, nameEn: 'Queen of Cups', nameCn: '圣杯王后', suit: 'cups', image: '/tarot/c13.jpg', keywordsPositive: '温柔、直觉、共情、母性', keywordsNegative: '情绪化、依赖、多愁善感', upright: '感性温柔、富有直觉的女性。', reversed: '情绪波动或过度依赖他人。' },
  { id: 49, nameEn: 'King of Cups', nameCn: '圣杯国王', suit: 'cups', image: '/tarot/c14.jpg', keywordsPositive: '情感成熟、包容、智慧、平静', keywordsNegative: '情绪抑制、操控、被动', upright: '情感成熟稳重，处事有度。', reversed: '情感压抑或表里不一。' },
  { id: 50, nameEn: 'Ace of Swords', nameCn: '宝剑一', suit: 'swords', image: '/tarot/s01.jpg', keywordsPositive: '真相、突破、清晰、决断', keywordsNegative: '困惑、思绪混乱、误解', upright: '清晰的洞察和突破，是决断的好时机。', reversed: '思维混乱或真相被扭曲。' },
  { id: 51, nameEn: 'Two of Swords', nameCn: '宝剑二', suit: 'swords', image: '/tarot/s02.jpg', keywordsPositive: '抉择、僵局、平衡、暂停', keywordsNegative: '逃避决定、拖延', upright: '陷入两难，需要暂时停下思考。', reversed: '决定被拖延或做出错误选择。' },
  { id: 52, nameEn: 'Three of Swords', nameCn: '宝剑三', suit: 'swords', image: '/tarot/s03.jpg', keywordsPositive: '心痛、悲伤、失去、诚实', keywordsNegative: '疗愈、原谅、走出伤痛', upright: '感情或友谊遭受重创。', reversed: '伤口在愈合，学会释怀。' },
  { id: 53, nameEn: 'Four of Swords', nameCn: '宝剑四', suit: 'swords', image: '/tarot/s04.jpg', keywordsPositive: '休息、静养、恢复、沉思', keywordsNegative: '过度休息、逃避、麻木', upright: '需要暂停休息，恢复能量。', reversed: '无法真正放松或逃避问题。' },
  { id: 54, nameEn: 'Five of Swords', nameCn: '宝剑五', suit: 'swords', image: '/tarot/s05.jpg', keywordsPositive: '冲突、失败、争斗、赢得代价', keywordsNegative: '和解、放下、承认失败', upright: '赢得表面胜利但代价沉重。', reversed: '开始放下冲突，寻求和解。' },
  { id: 55, nameEn: 'Six of Swords', nameCn: '宝剑六', suit: 'swords', image: '/tarot/s06.jpg', keywordsPositive: '过渡、旅行、离开、康复', keywordsNegative: '停滞、无法离开、抗拒改变', upright: '从困境中走出，开启新阶段。', reversed: '困在旧模式中无法迈步。' },
  { id: 56, nameEn: 'Seven of Swords', nameCn: '宝剑七', suit: 'swords', image: '/tarot/s07.jpg', keywordsPositive: '策略、隐瞒、机智、独行', keywordsNegative: '背叛、欺骗、耍诈', upright: '使用策略或独立行动，注意坦诚。', reversed: '谎言败露或需要坦白。' },
  { id: 57, nameEn: 'Eight of Swords', nameCn: '宝剑八', suit: 'swords', image: '/tarot/s08.jpg', keywordsPositive: '自我束缚、犹豫、被困、无助', keywordsNegative: '解脱、看清真相、勇敢面对', upright: '被自己的思维困住，其实束缚是自己造成的。', reversed: '开始看清并挣脱束缚。' },
  { id: 58, nameEn: 'Nine of Swords', nameCn: '宝剑九', suit: 'swords', image: '/tarot/s09.jpg', keywordsPositive: '焦虑、失眠、内心煎熬、忧虑', keywordsNegative: '缓解焦虑、寻求帮助', upright: '极度的焦虑或恐惧，多为自我恐惧所致。', reversed: '焦虑开始缓解，寻求支持。' },
  { id: 59, nameEn: 'Ten of Swords', nameCn: '宝剑十', suit: 'swords', image: '/tarot/s10.jpg', keywordsPositive: '结束、终结、痛苦、谷底', keywordsNegative: '复原、重生、否极泰来', upright: '痛苦到了极点，也是重生的开始。', reversed: '开始走出低谷，慢慢恢复。' },
  { id: 60, nameEn: 'Page of Swords', nameCn: '宝剑侍从', suit: 'swords', image: '/tarot/s11.jpg', keywordsPositive: '好奇、机敏、观察、消息', keywordsNegative: '散播八卦、多疑、失误', upright: '机敏观察、寻找真相。', reversed: '散布不实消息或多疑。' },
  { id: 61, nameEn: 'Knight of Swords', nameCn: '宝剑骑士', suit: 'swords', image: '/tarot/s12.jpg', keywordsPositive: '行动果断、迅速、正义、直言', keywordsNegative: '冲动、鲁莽、口无遮拦', upright: '果断勇敢，追求真理。', reversed: '冲动而缺乏考虑。' },
  { id: 62, nameEn: 'Queen of Swords', nameCn: '宝剑王后', suit: 'swords', image: '/tarot/s13.jpg', keywordsPositive: '理性、独立、公正、洞察', keywordsNegative: '冷漠、苛刻、孤立', upright: '理性独立、明辨是非的女性。', reversed: '情感疏离或言辞过于尖锐。' },
  { id: 63, nameEn: 'King of Swords', nameCn: '宝剑国王', suit: 'swords', image: '/tarot/s14.jpg', keywordsPositive: '理性、权威、明察、公正', keywordsNegative: '专横、冷酷、操控', upright: '以理性和权威处事的领导者。', reversed: '过于冷酷或滥用权力。' },
  { id: 64, nameEn: 'Ace of Pentacles', nameCn: '星币一', suit: 'pentacles', image: '/tarot/p01.jpg', keywordsPositive: '新机会、财富萌芽、实际、扎实', keywordsNegative: '错失机会、财务不稳、犹豫', upright: '新的物质机会或财务机遇萌芽。', reversed: '机会转瞬即逝，需谨慎评估。' },
  { id: 65, nameEn: 'Two of Pentacles', nameCn: '星币二', suit: 'pentacles', image: '/tarot/p02.jpg', keywordsPositive: '平衡、多任务、灵活、调度', keywordsNegative: '失衡、混乱、压力过大', upright: '灵活应对多项任务，保持平衡。', reversed: '任务失控，需重新分配精力。' },
  { id: 66, nameEn: 'Three of Pentacles', nameCn: '星币三', suit: 'pentacles', image: '/tarot/p03.jpg', keywordsPositive: '合作、团队、技能、成就', keywordsNegative: '内讧、缺乏协作', upright: '团队合作发挥专长，共同成就。', reversed: '合作中出现摩擦或缺乏沟通。' },
  { id: 67, nameEn: 'Four of Pentacles', nameCn: '星币四', suit: 'pentacles', image: '/tarot/p04.jpg', keywordsPositive: '稳固、储蓄、控制、安全', keywordsNegative: '吝啬、执着、不愿分享', upright: '守住已有的财富和成就。', reversed: '过度守财或不肯放手。' },
  { id: 68, nameEn: 'Five of Pentacles', nameCn: '星币五', suit: 'pentacles', image: '/tarot/p05.jpg', keywordsPositive: '困境、贫困、担忧、寻求帮助', keywordsNegative: '走出困境、看到希望', upright: '物质或精神上的困境，需要求助。', reversed: '困境开始好转，重拾希望。' },
  { id: 69, nameEn: 'Six of Pentacles', nameCn: '星币六', suit: 'pentacles', image: '/tarot/p06.jpg', keywordsPositive: '施与、慷慨、公平、慈善', keywordsNegative: '不平等、依赖、施舍不均', upright: '分享与给予，也可能接受帮助。', reversed: '关系不平等或施与失衡。' },
  { id: 70, nameEn: 'Seven of Pentacles', nameCn: '星币七', suit: 'pentacles', image: '/tarot/p07.jpg', keywordsPositive: '耐心、等待收获、评估、投资', keywordsNegative: '无回报、失望、努力落空', upright: '耐心等待付出的回报。', reversed: '投入未见回报，需重新评估。' },
  { id: 71, nameEn: 'Eight of Pentacles', nameCn: '星币八', suit: 'pentacles', image: '/tarot/p08.jpg', keywordsPositive: '专注、勤奋、匠心、精进', keywordsNegative: '枯燥、缺乏动力、粗心', upright: '专注精进，成为技艺高手。', reversed: '缺乏专注或态度敷衍。' },
  { id: 72, nameEn: 'Nine of Pentacles', nameCn: '星币九', suit: 'pentacles', image: '/tarot/p09.jpg', keywordsPositive: '独立、富足、优雅、自我实现', keywordsNegative: '过度依赖财富、孤独', upright: '独立自足，享受成果。', reversed: '过于依赖物质或感到空虚。' },
  { id: 73, nameEn: 'Ten of Pentacles', nameCn: '星币十', suit: 'pentacles', image: '/tarot/p10.jpg', keywordsPositive: '富裕、家族、传承、稳定', keywordsNegative: '家庭矛盾、财产纠纷', upright: '家族富裕、财富传承。', reversed: '家庭内部有分歧或财务纠纷。' },
  { id: 74, nameEn: 'Page of Pentacles', nameCn: '星币侍从', suit: 'pentacles', image: '/tarot/p11.jpg', keywordsPositive: '学习、机遇、脚踏实地、青涩', keywordsNegative: '缺乏经验、拖延、错失机会', upright: '新的学习机会或财务机遇。', reversed: '缺乏行动力或错失机会。' },
  { id: 75, nameEn: 'Knight of Pentacles', nameCn: '星币骑士', suit: 'pentacles', image: '/tarot/p12.jpg', keywordsPositive: '务实、勤奋、稳健、可靠', keywordsNegative: '固执、过于保守、无趣', upright: '稳步前行、脚踏实地的追求者。', reversed: '过于保守或缺乏灵活性。' },
  { id: 76, nameEn: 'Queen of Pentacles', nameCn: '星币王后', suit: 'pentacles', image: '/tarot/p13.jpg', keywordsPositive: '务实、慷慨、母性、丰饶', keywordsNegative: '物质主义、忽视精神', upright: '务实持家的女性，事业与家庭兼顾。', reversed: '过于重视物质或家庭失衡。' },
  { id: 77, nameEn: 'King of Pentacles', nameCn: '星币国王', suit: 'pentacles', image: '/tarot/p14.jpg', keywordsPositive: '富有、成功、稳重、慷慨', keywordsNegative: '贪婪、固执、专制', upright: '事业有成、稳重可靠的男性。', reversed: '过于看重钱财或专断独行。' },
];

export function findCardById(id: number): TarotCard | undefined {
  return tarotDeck.find((c) => c.id === id);
}