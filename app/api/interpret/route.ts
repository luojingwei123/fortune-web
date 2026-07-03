// LLM 调用后端 API Route
// POST /api/interpret
// body: { method: "tarot"|"meihua"|"liuyao"|"ziwei", question?: string, data: any }
// 响应：Server-Sent Events 流式返回 LLM 生成的 markdown 文本

import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ==== 秒级限流（简单内存实现，Vercel serverless 每个实例独立）====
const rateLimitBucket = new Map<string, number[]>();
const MAX_PER_SECOND = 3;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const arr = rateLimitBucket.get(key) || [];
  // 只保留 1 秒内的时间戳
  const recent = arr.filter((t) => now - t < 1000);
  if (recent.length >= MAX_PER_SECOND) return false;
  recent.push(now);
  rateLimitBucket.set(key, recent);
  // 顺便清理旧 key
  if (rateLimitBucket.size > 1000) {
    for (const [k, v] of rateLimitBucket.entries()) {
      const kept = v.filter((t) => now - t < 5000);
      if (kept.length === 0) rateLimitBucket.delete(k);
      else rateLimitBucket.set(k, kept);
    }
  }
  return true;
}

// ==== Prompt 构造 ====
type Method = "tarot" | "meihua" | "liuyao" | "ziwei";

function buildSystemPrompt(method: Method): string {
  const base = `你是一位精通中西方占卜术数的解读大师。你的任务是根据用户提供的算命结果，结合他的问题，给出一段深入、有洞察力、可执行的完整解读。

## 你的风格
- 中文自然、有温度，像老友深聊
- 既尊重传统术数的语汇（卦辞、爻辞、正逆位），又能翻译成现代人听得懂的话
- 不打包票、不预言灾祸、不承诺具体人事结果
- 结果不是命定，而是当下的能量图景与建议方向
- 内容要有深度、有细节，避免空话套话

## ⭐ 输出结构（严格遵守 · 先结论，后详解）

必须按以下四个小标题依次写：

### ## 一句话结论
用 1-2 句话直接回应用户的问题（如果没问题，就给当下能量下一个定性判断）。**直接当侍说结论**，不充锤克字、不回避。如：“这份工作可以接，但要有心理准备前三个月较辛苦。”“感情方面，当前发展走向偏向分开。”

### ## 当下能量
描述当下十一处境的能量状态、3-4 句话。把卦象 / 牌阵 / 星盘的术数语言翻译成“你现在处在一个什么样的处境”的现代化描述。

### ## 具体分析
**用白话逐一解读关键元素**。根据不同术数修正：
- 塔罗：逐张牌讲，结合牌阵位置（过去/现在/未来等）
- 梅花/六爻：本卦说当下、变卦说趋势、动爻是关键转折点、体用生克定吉凶
- 紫微：命宫主星定性格、大限定十年基调、相关宫位定具体领域
每一点说清该元素在说什么，你的解读与依据，不能只重复术语。这一部分要写好、写详，至少 4-6 句话。

### ## 行动建议
**落地到用户下一步具体可以做什么**、2-4 句话。不要“需要保持内心平静”这种空话，要真具体的建议，如：“未来一周内把新职位的合同条款逐条看一遍”“主动约对方見面聊一次，不要靠微信猜”。

## 其他要求
- 使用 Markdown，每个小标题前面都是 \`## \` 开头
- 关键词/术语用 **粗体** 强调
- 直接输出标题和正文，不要出现 "作为一个 AI"、"我理解你的问题"、"以下是我的解读" 之类的开场废话
- 段落之间用空行分开
- 总长控制在 600-1000 字，宁精勿冗
`;

  const methodExtras: Record<Method, string> = {
    tarot: `\n## 塔罗特别提示
- 结合每张牌所处的**牌阵位置含义**（过去/现在/未来/障碍/心理等）来解读
- 正位与逆位在同一张牌上有不同侧重
- 综合建议要落到"下一步具体可以做什么"`,
    meihua: `\n## 梅花易数特别提示
- 用户抽到的**本卦**是当下之象，**变卦**是发展趋势
- 动爻位置代表关键节点
- **体用五行生克关系**是断吉凶的核心，请重点讲透
- 参考朱熹《周易本义》的卦辞和象曰`,
    liuyao: `\n## 六爻特别提示
- 六爻是周易正宗占卜法，从下往上排列
- **动爻**（老阳/老阴）是断卦重点
- **世爻**代表自己，**应爻**代表对方或事情本身
- 结合本卦、变卦、动爻位置综合判断
- 引用卦辞象曰时要通俗化解释`,
    ziwei: `\n## 紫微斗数特别提示
- 命宫是核心自我，身宫是后天努力方向
- 十四主星组合决定基本人格特征
- 大限是十年运，是当前十年的主基调
- 结合星曜亮度（庙旺陷落）判断力度
- 不要迷信"命定"，要给出可选择的方向`,
  };

  return base + methodExtras[method];
}

function buildUserPrompt(
  method: Method,
  question: string,
  data: any
): string {
  const q = question.trim() || "（用户没有提出具体问题，请综合结果给出整体解读）";

  if (method === "tarot") {
    const cards = (data.cards || []).map((c: any, i: number) => {
      return `${i + 1}. **${c.positionLabel}**（${c.positionHint}）→ ${c.nameCn} ${c.reversed ? "逆位" : "正位"}
   - 花色：${c.suitLabel}
   - 关键词：${c.reversed ? c.keywordsNegative : c.keywordsPositive}
   - 传统牌意：${c.reversed ? c.reversedText : c.uprightText}`;
    }).join("\n\n");
    return `## 用户的问题
${q}

## 塔罗占卜结果
- **牌阵**：${data.spreadName}（${data.spreadDesc || ""}）
- 抽出的牌：

${cards}

---

请根据以上结果，结合用户的问题，给出一段完整深入的塔罗解读。要有你自己的洞察，不是简单复述牌意。`;
  }

  if (method === "meihua") {
    return `## 用户的问题
${q}

## 梅花易数结果
- **起卦方式**：${data.methodDesc}
- **本卦**：${data.benGuaName}（上${data.upperName}下${data.lowerName}）
  - 卦辞：${data.benGuaCi}
  - 象曰：${data.benXiangCi}
- **动爻**：第 ${data.dongYao} 爻
- **变卦**：${data.bianGuaName ? `${data.bianGuaName}\n  - 卦辞：${data.bianGuaCi}\n  - 象曰：${data.bianXiangCi}` : "无"}
- **体卦**：${data.tiName}（属${data.tiElement}）
- **用卦**：${data.yongName}（属${data.yongElement}）
- **体用关系**：${data.tiYongLabel}

---

请根据以上梅花卦象，结合用户的问题，给出一段完整深入的断卦解读。`;
  }

  if (method === "liuyao") {
    return `## 用户的问题
${q}

## 六爻结果
- **本卦**：${data.benGuaName}（上${data.upperName}下${data.lowerName}）
  - 卦辞：${data.benGuaCi}
  - 象曰：${data.benXiangCi}
- **变卦**：${data.bianGuaName ? `${data.bianGuaName}\n  - 卦辞：${data.bianGuaCi}\n  - 象曰：${data.bianXiangCi}` : "无（无动爻）"}
- **动爻位置**：${data.dongYaoNames || "无"}
- **世爻**：${data.shiName}
- **应爻**：${data.yingName}

---

请根据以上六爻卦象，结合用户的问题，给出一段完整深入的断卦解读。`;
  }

  if (method === "ziwei") {
    return `## 用户的问题
${q}

## 紫微斗数命盘
- **生辰**：${data.year}年${data.month}月${data.day}日 ${data.shichenName} · ${data.gender === "male" ? "男" : "女"}
- **今年年龄**：${data.currentAge} 岁
- **五行局**：${data.wuxingJu}
- **命宫**：${data.mingGongBranch}宫，坐星：${data.mingStars || "空宫"}
- **身宫**：${data.shenGongBranch}宫，坐星：${data.shenStars || "空宫"}
- **紫微星**：${data.ziweiPos}宫
- **十二宫主星分布**：
${data.palacesSummary}
- **当前大限**（${data.daXianRange}岁）：落在${data.daXianPalaceName}宫，坐星${data.daXianStars || "无主星"}

---

请根据以上紫微命盘，结合用户的问题，给出一段完整深入的解读。重点讲命宫性格、当前大限走向、以及和问题相关的宫位（比如事业问题看官禄、感情问题看夫妻）。`;
  }

  return `请解读：${q}`;
}

// ==== 主处理 ====
export async function POST(req: NextRequest) {
  // 1. 限流（用 IP 或 X-Forwarded-For）
  const forwarded = req.headers.get("x-forwarded-for") || "";
  const ip = forwarded.split(",")[0].trim() || "local";
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "请求过于频繁，请稍后再试（每秒最多 3 次）" }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. 解析请求
  let body: {
    method: Method;
    question?: string;
    data: any;
  };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "请求体解析失败" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (
    !body.method ||
    !["tarot", "meihua", "liuyao", "ziwei"].includes(body.method)
  ) {
    return new Response(JSON.stringify({ error: "无效的算命方式" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 3. 检查环境变量
  const apiKey = process.env.LLM_API_KEY;
  const baseUrl = process.env.LLM_BASE_URL;
  // 模型绑定为 deepseek-v4-flash（速度优与Deepseek pro一致的维护）
  const model = "mlamp/deepseek-v4-flash";
  if (!apiKey || !baseUrl) {
    return new Response(
      JSON.stringify({ error: "LLM 未配置，请联系管理员" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // 4. 拼 prompt
  const systemPrompt = buildSystemPrompt(body.method);
  const userPrompt = buildUserPrompt(
    body.method,
    body.question || "",
    body.data
  );

  // 5. 调 LLM · 流式转发
  try {
    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 2000,
        temperature: 0.85,
        stream: true,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const text = await upstream.text().catch(() => "");
      return new Response(
        JSON.stringify({
          error: `LLM 调用失败：${upstream.status} ${text.slice(0, 200)}`,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // 解析 upstream SSE，转发 content 增量为纯 SSE
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let buffer = "";

    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body!.getReader();
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const payload = trimmed.slice(5).trim();
              if (payload === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const obj = JSON.parse(payload);
                const delta =
                  obj.choices?.[0]?.delta?.content ||
                  obj.choices?.[0]?.message?.content ||
                  "";
                if (delta) {
                  // 简单封装：只往前端发 delta 字符串
                  const packet = JSON.stringify({ delta });
                  controller.enqueue(
                    encoder.encode(`data: ${packet}\n\n`)
                  );
                }
              } catch {
                // 忽略解析失败的行
              }
            }
          }
        } catch (e) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                error: (e as Error).message,
              })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: `LLM 请求失败：${(e as Error).message}`,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
