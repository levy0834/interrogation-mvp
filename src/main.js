import './style.css'

const STORAGE_KEY = 'interrogation-mvp-ai-config'
const DEPLOY_MODE = 'proxy'
const DEFAULT_MODEL = 'deepseek-chat'
const PROXY_API_BASE = 'https://interrogation-33gtwuano-levy0834s-projects-c6ee7307.vercel.app'

const caseData = {
  id: 'case_rainfall',
  title: '雨夜坠楼案',
  code: 'CASE-01',
  intro: '暴雨夜，调查记者周岚坠亡于公寓后巷。三名最后接触她的人都给出了一套看似合理的说辞，但其中只有一人，知道了“不该知道的事”。',
  victim: {
    name: '周岚',
    role: '调查记者',
    notes: ['追查医药公司违规试药', '习惯留下资料备份', '死前 24 小时内约见了三名相关人']
  },
  suspects: [
    {
      id: 'lin',
      name: '林骁',
      role: '前男友 / 自由摄影师',
      vibe: '冲动、嘴硬、情绪不稳',
      portrait: '旧情纠葛',
      initial: { attitude: 46, stress: 34, guard: 58 },
      confession: {
        relationship: '她最近越来越疯，见谁都像在审犯人。我们吵过，但不代表我会杀她。',
        timeline: '我 20:30 去归还相机，差不多 21 点前就走了。镜头摔碎是意外。',
        motive: '她把我拍的片子拿去写稿，我当然火大。但我没必要毁了自己。'
      },
      pressured: {
        timeline: '行，我承认吵得比我说的厉害，但我离开时她还活着。',
        motive: '你可以说我混账，但冲动和谋杀不是一回事。'
      },
      contradictions: {
        evi_lens: '镜头是我摔的。我没否认，可那是在客厅。阳台那边的事不归我。',
        evi_doorlog: '门禁你都看到了，我 20:57 就走了。后面的事跟我没关系。'
      },
      tells: ['承认争吵升级', '刻意强调自己离开得早'],
      unlocks: ['evi_lens']
    },
    {
      id: 'xu',
      name: '许薇',
      role: '同事 / 新闻平台编辑',
      vibe: '理性、克制、回避责任',
      portrait: '冷静型误导',
      initial: { attitude: 61, stress: 22, guard: 42 },
      confession: {
        relationship: '周岚太激进了。我们只是对稿件发布节奏有分歧。',
        timeline: '我 21:10 去楼下送资料，没上楼，只给她发了消息。',
        motive: '我担心的是平台风险，不是她的死活。你最好别混为一谈。'
      },
      pressured: {
        timeline: '好，我在楼下多停了一会儿。我不想卷进去，所以没说全。',
        motive: '我确实想压稿，但那是职业判断，不是杀人动机。'
      },
      contradictions: {
        evi_coffee: '咖啡是我买的。我在附近等了一阵，这不代表我进过她家。',
        evi_mail: '她那封稿子如果真发出去，谁都拦不住。你该盯的是更怕曝光的人。'
      },
      tells: ['隐瞒停留时间', '知道稿件会惹上更大人物'],
      unlocks: ['evi_coffee']
    },
    {
      id: 'chen',
      name: '陈默',
      role: '医药公司法务负责人',
      vibe: '温和、克制、掌控欲强',
      portrait: '最体面，也最危险',
      initial: { attitude: 55, stress: 20, guard: 64 },
      confession: {
        relationship: '我只是代表公司和她谈和解。我希望事情不要闹到无法收场。',
        timeline: '我 21:42 上楼，22:00 前就离开了。离开时，她还活着。',
        motive: '如果她肯听，我甚至愿意帮她体面收尾。真正激动的人不是我。'
      },
      pressured: {
        timeline: '门禁系统常有延迟。你不会把一条记录当成真相吧？',
        motive: '你们总爱把“利益相关”理解成“有罪”。这是很幼稚的调查方式。'
      },
      contradictions: {
        evi_doorlog: '……我可能记错了准确时间，但这说明不了什么。',
        evi_shoeprint: '阳台？我只是在客厅和她谈，没理由靠近那里。',
        evi_backup: '她电脑里根本没有你们想找的录音。——等等，我的意思是，我猜她不会那么蠢。'
      },
      tells: ['过度强调“体面收场”', '知道录音不在电脑里', '试图贬低调查员'],
      unlocks: ['evi_doorlog']
    }
  ],
  clues: [
    { id: 'evi_lens', title: '碎裂的相机镜头', type: '物证', summary: '客厅地面发现破碎镜头，印证林骁确实与死者激烈争执。', details: '镜头碎裂位置在客厅，不在阳台。说明争吵发生过，但不构成坠楼直接证据。', source: '林骁口供 / 现场照片' },
    { id: 'evi_coffee', title: '楼下咖啡小票', type: '票据', summary: '时间 21:08，证明许薇在公寓附近停留时间不短。', details: '许薇声称只是短暂停留，但小票与消息时间结合，说明她在楼下徘徊过。', source: '许薇随身物' },
    { id: 'evi_mail', title: '未发送成功的调查稿邮件', type: '电子证据', summary: '周岚死亡前仍在尝试发送曝光材料。', details: '邮件发送失败时间靠近死亡时间，说明她当时正在紧急处理资料，不符合自杀前平静状态。', source: '死者电脑' },
    { id: 'evi_doorlog', title: '门禁记录', type: '系统记录', summary: '陈默 21:42 上楼，22:18 才离开，直接冲击其时间口供。', details: '林骁 20:57 离开；许薇无上楼记录；陈默停留时间明显超出其自述。', source: '公寓系统' },
    { id: 'evi_neighbor', title: '邻居证词', type: '口供', summary: '22 点后仍听到低沉男声争执。', details: '邻居描述声音克制而低沉，更接近陈默而非情绪型的林骁。', source: '邻居口供' },
    { id: 'evi_shoeprint', title: '阳台鞋印比对', type: '法证', summary: '阳台边缘折返鞋纹与陈默皮鞋吻合。', details: '鞋纹排除林骁常穿的运动鞋，说明有人在湿滑阳台边缘停留并折返。', source: '现场勘查' },
    { id: 'evi_backup', title: '录音云端备份提示', type: '手机截图', summary: '录音并不只在电脑里，说明有人试图找过本地文件。', details: '死者手机自动备份提示显示：录音早已同步云端。若有人强调“电脑里没有录音”，就说明他接触过书房设备。', source: '死者手机' },
    { id: 'evi_balcony', title: '雨夜阳台照片', type: '现场照片', summary: '栏杆外侧有擦痕，地面积水被拖动过。', details: '更像二次施力后的现场，不像单纯失足。', source: '现场照片' }
  ],
  ending: {
    culprit: 'chen',
    method: '争执后蓄意灭口并伪装意外坠楼',
    required: ['evi_doorlog', 'evi_shoeprint', 'evi_backup']
  }
}

const defaultAIConfig = {
  enabled: true,
  baseUrl: DEPLOY_MODE,
  apiKey: '',
  model: DEFAULT_MODEL,
  temperature: '0.9',
  maxTokens: '220'
}

const aiConfig = loadAIConfig()

const suspectState = Object.fromEntries(caseData.suspects.map((suspect) => [suspect.id, {
  attitude: suspect.initial.attitude,
  stress: suspect.initial.stress,
  guard: suspect.initial.guard,
  phase: '冷静',
  asked: [],
  breakthroughs: []
}]))

const state = {
  screen: 'home',
  currentSuspectId: 'chen',
  discoveredClues: ['evi_lens', 'evi_mail', 'evi_neighbor', 'evi_balcony'],
  evidenceUsed: [],
  statementLog: [],
  accusation: { culprit: '', method: '', evidenceIds: [] },
  outcome: null,
  toast: '',
  aiOpen: false,
  aiBusy: false,
  aiTesting: false,
  aiError: '',
  aiTestResult: '',
  activeLead: ''
}

const topics = [
  { id: 'relationship', label: '你和死者是什么关系？' },
  { id: 'timeline', label: '案发当晚你的行程是什么？' },
  { id: 'motive', label: '你为什么会出现在她家附近？' }
]

const leads = {
  lin: [
    { id: 'lin_timeline', label: '追问：你为什么一直强调自己走得早？', unlockWhen: () => suspectState.lin.phase !== '冷静', effect: () => ({ text: '林骁烦躁地啧了一声：“因为我知道你们就盯着时间不放。可我说了，吵归吵，我没碰阳台。”', stress: 10, guard: -8, clue: null }) }
  ],
  xu: [
    { id: 'xu_wait', label: '追问：你在楼下到底等谁？', unlockWhen: () => state.discoveredClues.includes('evi_coffee'), effect: () => ({ text: '许薇垂下眼：“我在等她改主意，也在等别人先出手……这回答你满意吗？”', stress: 9, guard: -8, clue: null }) }
  ],
  chen: [
    { id: 'chen_doorlog', label: '追问：21:42 上楼到 22:18 离开，这中间你在做什么？', unlockWhen: () => state.discoveredClues.includes('evi_doorlog'), effect: () => ({ text: '陈默停顿半秒：“你把时间记得这么死，只会暴露你手里没别的东西。” 但他这次没再重复“22点前离开”。', stress: 16, guard: -10, clue: 'evi_shoeprint' }) },
    { id: 'chen_backup', label: '追问：你为什么会知道录音不在电脑里？', unlockWhen: () => state.discoveredClues.includes('evi_backup'), effect: () => ({ text: '陈默目光第一次真正冷了下去：“我说的是常识判断。” 这句辩解太快，快得像掩饰。', stress: 20, guard: -12, clue: null }) }
  ]
}

function availableLeads() {
  return (leads[state.currentSuspectId] || []).filter((item) => item.unlockWhen())
}

function pursueLead(leadId) {
  const suspect = suspectById(state.currentSuspectId)
  const s = suspectState[suspect.id]
  const lead = availableLeads().find((item) => item.id === leadId)
  if (!lead) return
  const result = lead.effect()
  s.stress = Math.min(100, s.stress + result.stress)
  s.guard = Math.max(0, s.guard + result.guard)
  updatePhase(s)
  if (result.clue) addClue(result.clue)
  state.activeLead = leadId
  addLog(suspect.id, 'lead', `${lead.label}
${result.text}`)
  toast('你抓住了一个正在扩大的破绽')
  render()
}

function failureReview() {
  const missing = caseData.ending.required.filter((id) => !state.accusation.evidenceIds.includes(id))
  if (!missing.length && state.accusation.culprit === caseData.ending.culprit) return '你已经摸到真相边缘，缺的是把作案逻辑说得更狠、更完整。'
  if (missing.includes('evi_doorlog')) return '你最缺的是时间线。回去继续压陈默的门禁记录，把“22点前离开”的口供打穿。'
  if (missing.includes('evi_shoeprint')) return '你还没把现场痕迹锁死。继续围绕阳台、鞋印和擦痕做文章。'
  if (missing.includes('evi_backup')) return '你错过了最值钱的认知破绽。想办法逼出“他为什么知道录音不在电脑里”。'
  return '你的结论还不够硬。回头检查时间线、现场痕迹和录音三条线是不是都闭环了。'
}

const evidenceReactions = {
  lin: {
    evi_lens: { text: caseData.suspects[0].contradictions.evi_lens, stress: 18, guard: -10 },
    evi_doorlog: { text: caseData.suspects[0].contradictions.evi_doorlog, stress: 10, guard: -8 }
  },
  xu: {
    evi_coffee: { text: caseData.suspects[1].contradictions.evi_coffee, stress: 12, guard: -6 },
    evi_mail: { text: caseData.suspects[1].contradictions.evi_mail, stress: 8, guard: -8 }
  },
  chen: {
    evi_doorlog: { text: caseData.suspects[2].contradictions.evi_doorlog, stress: 24, guard: -12 },
    evi_shoeprint: { text: caseData.suspects[2].contradictions.evi_shoeprint, stress: 26, guard: -12 },
    evi_backup: { text: caseData.suspects[2].contradictions.evi_backup, stress: 32, guard: -18 }
  }
}

const app = document.querySelector('#app')

function loadAIConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...defaultAIConfig, ...JSON.parse(raw) } : { ...defaultAIConfig }
  } catch {
    return { ...defaultAIConfig }
  }
}

function saveAIConfig() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(aiConfig))
}

function suspectById(id) {
  return caseData.suspects.find((item) => item.id === id)
}

function clueById(id) {
  return caseData.clues.find((item) => item.id === id)
}

function addClue(id) {
  if (!state.discoveredClues.includes(id)) state.discoveredClues.push(id)
}

function addLog(suspectId, kind, text, mode = 'rules') {
  state.statementLog.unshift({ suspectId, kind, text, mode, time: Date.now() })
}

function updatePhase(s) {
  if (s.stress >= 85 || s.guard <= 18) s.phase = '崩溃'
  else if (s.stress >= 62 || s.guard <= 32) s.phase = '动摇'
  else if (s.guard >= 65) s.phase = '防御'
  else s.phase = '冷静'
}

function toast(text) {
  state.toast = text
  render()
  window.clearTimeout(toast.timer)
  toast.timer = window.setTimeout(() => {
    state.toast = ''
    render()
  }, 1800)
}

function hasUsableAIConfig() {
  const useProxy = aiConfig.baseUrl.trim() === 'proxy'
  if (useProxy) return aiConfig.enabled && aiConfig.model.trim()
  return aiConfig.enabled && aiConfig.baseUrl.trim() && aiConfig.apiKey.trim() && aiConfig.model.trim()
}

function normalizeBaseUrl(url) {
  return url.replace(/\/$/, '')
}

async function callOpenAICompat(messages) {
  const useProxy = aiConfig.baseUrl.trim() === 'proxy'
  const url = useProxy ? `${PROXY_API_BASE}/api/chat` : `${normalizeBaseUrl(aiConfig.baseUrl)}/chat/completions`
  const headers = {
    'Content-Type': 'application/json'
  }

  if (!useProxy) {
    headers.Authorization = `Bearer ${aiConfig.apiKey.trim()}`
  }

  let res

  try {
    res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: aiConfig.model.trim(),
        messages,
        temperature: Number(aiConfig.temperature || 0.9),
        max_tokens: Number(aiConfig.maxTokens || 220)
      })
    })
  } catch (error) {
    throw new Error(`网络请求失败：${error.message || error}`)
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status}：${text || '上游接口返回异常'}`)
  }

  const data = await res.json().catch(() => null)
  const content = data?.choices?.[0]?.message?.content?.trim()
  if (!content) throw new Error('接口返回成功，但没有拿到 choices[0].message.content')
  return content
}

function buildSuspectSystemPrompt(suspect, s, context) {
  return `你在扮演悬疑审讯游戏中的嫌疑人【${suspect.name}】。

你的身份：${suspect.role}
人物气质：${suspect.vibe}
当前状态：压力 ${s.stress}/100，防御 ${s.guard}/100，配合 ${s.attitude}/100，阶段 ${s.phase}

案件背景：雨夜坠楼案。死者周岚是调查记者，正在追查医药公司违规试药。你与她在案发当晚有接触。

已知角色口供基线：
- 关系：${suspect.confession.relationship}
- 时间线：${suspect.confession.timeline}
- 动机：${suspect.confession.motive}

你必须遵守：
1. 绝不能直接跳出角色。
2. 绝不能直接承认“我是凶手”或完整泄露真相。
3. 你的回答要像被审讯时的真人说话，不要像 AI 助手。
4. 长度控制在 1~3 句，短、硬、带情绪。
5. 如果玩家问题命中你的弱点，你可以出现动摇、回避、改口、失言，但不能把案件全盘讲穿。
6. 只输出嫌疑人的台词，不要输出解释、括号、标签。

补充上下文：${context}`
}

async function askAI(topicId, label) {
  const suspect = suspectById(state.currentSuspectId)
  const s = suspectState[suspect.id]
  const context = `玩家正在问话。问话主题是：${label}。当前已发现证据：${state.discoveredClues.map((id) => clueById(id)?.title).join('、')}。`
  const messages = [
    { role: 'system', content: buildSuspectSystemPrompt(suspect, s, context) },
    { role: 'user', content: label }
  ]
  return callOpenAICompat(messages)
}

async function freeAskAI() {
  const suspect = suspectById(state.currentSuspectId)
  const s = suspectState[suspect.id]
  const input = document.querySelector('#free-ask-input')?.value?.trim()
  if (!input) return toast('先写一句你想追问的话')
  if (!hasUsableAIConfig()) return toast('先在上方填好 AI 配置再启用 AI 审讯')

  state.aiBusy = true
  state.aiError = ''
  render()

  try {
    const context = `玩家自由追问。当前证据：${state.discoveredClues.map((id) => clueById(id)?.title).join('、')}。玩家可能在试图逼问时间线、书房、录音、阳台或动机。`
    const reply = await callOpenAICompat([
      { role: 'system', content: buildSuspectSystemPrompt(suspect, s, context) },
      { role: 'user', content: input }
    ])

    s.stress = Math.min(100, s.stress + 8)
    s.guard = Math.max(0, s.guard - 4)
    updatePhase(s)
    addLog(suspect.id, 'ai', `玩家追问：${input}\n${reply}`, 'ai')
    document.querySelector('#free-ask-input').value = ''
    if (suspect.id === 'chen' && /书房|录音|电脑|时间|阳台/.test(input)) addClue('evi_doorlog')
  } catch (error) {
    state.aiError = String(error.message || error)
    toast('AI 调用失败，已保留规则模式可玩')
  } finally {
    state.aiBusy = false
    render()
  }
}

async function askTopic(topicId) {
  const suspect = suspectById(state.currentSuspectId)
  const s = suspectState[suspect.id]
  const base = suspect.confession[topicId]
  const pressured = suspect.pressured[topicId]
  let reply = base

  if (hasUsableAIConfig()) {
    try {
      state.aiBusy = true
      state.aiError = ''
      render()
      reply = await askAI(topicId, topics.find((item) => item.id === topicId)?.label || topicId)
    } catch (error) {
      state.aiError = String(error.message || error)
      reply = base
      toast('AI 问话失败，已回退到规则回答')
    } finally {
      state.aiBusy = false
    }
  } else {
    if (s.phase === '动摇' && pressured) reply = pressured
    if (s.phase === '崩溃' && suspect.id === 'chen' && topicId === 'timeline') {
      reply = '你们以为抓住时间就够了？她当时还活着，只是……她不该拿那些东西威胁我。'
      if (!s.breakthroughs.includes('timeline')) s.breakthroughs.push('timeline')
    }
  }

  s.asked.push(topicId)
  s.stress = Math.min(100, s.stress + 6)
  s.guard = Math.max(0, s.guard - 3)
  updatePhase(s)

  suspect.unlocks?.forEach(addClue)
  addLog(suspect.id, 'ask', `${topics.find((item) => item.id === topicId)?.label}\n${reply}`, hasUsableAIConfig() ? 'ai' : 'rules')

  if (suspect.id === 'chen' && s.phase === '动摇') addClue('evi_doorlog')
  render()
}

function pressureSuspect() {
  const suspect = suspectById(state.currentSuspectId)
  const s = suspectState[suspect.id]
  s.stress = Math.min(100, s.stress + 16)
  s.guard = Math.max(0, s.guard - 10)
  s.attitude = Math.max(0, s.attitude - 6)
  updatePhase(s)

  const text = s.phase === '崩溃'
    ? suspect.id === 'lin'
      ? `${suspect.name}猛地咬住后槽牙，情绪已经压不住了。再逼一步，他就会失控。`
      : suspect.id === 'xu'
        ? `${suspect.name}停顿得有些过久，像是在重新编辑自己的说法。她开始不稳了。`
        : `${suspect.name}沉默了数秒，呼吸依旧克制，但每个停顿都比刚才更危险。你知道他快撑不住了。`
    : suspect.id === 'lin'
      ? `${suspect.name}把视线别开，语气已经带火。`
      : suspect.id === 'xu'
        ? `${suspect.name}神情没变，但回话明显更谨慎了。`
        : `${suspect.name}仍然维持体面，可那层从容已经开始裂。`

  addLog(suspect.id, 'pressure', text)
  if (suspect.id === 'chen' && s.phase !== '冷静') addClue('evi_shoeprint')
  render()
}

function presentEvidence(evidenceId) {
  const suspect = suspectById(state.currentSuspectId)
  const s = suspectState[suspect.id]
  const reaction = evidenceReactions[suspect.id]?.[evidenceId]
  const clue = clueById(evidenceId)

  if (!reaction) {
    s.guard = Math.min(100, s.guard + 4)
    s.attitude = Math.max(0, s.attitude - 4)
    updatePhase(s)
    addLog(suspect.id, 'evidence', `你出示了【${clue.title}】。${suspect.name}看了一眼，冷冷地说：“这和我有什么关系？”`)
    toast('这份证据和当前话题关联不强')
    render()
    return
  }

  s.stress = Math.min(100, s.stress + reaction.stress)
  s.guard = Math.max(0, s.guard + reaction.guard)
  if (!state.evidenceUsed.includes(evidenceId)) state.evidenceUsed.push(evidenceId)
  if (evidenceId === 'evi_backup') addClue('evi_backup')
  if (evidenceId === 'evi_shoeprint') addClue('evi_shoeprint')
  if (evidenceId === 'evi_doorlog') addClue('evi_doorlog')

  updatePhase(s)
  addLog(suspect.id, 'evidence', `你出示了【${clue.title}】。\n${reaction.text}`)
  toast('命中破绽，新的矛盾已被记录')
  render()
}

function isReadyToClose() {
  return ['evi_doorlog', 'evi_shoeprint', 'evi_backup'].every((id) => state.discoveredClues.includes(id))
}

function toggleAccuseEvidence(id) {
  const current = state.accusation.evidenceIds
  if (current.includes(id)) state.accusation.evidenceIds = current.filter((item) => item !== id)
  else if (current.length < 3) state.accusation.evidenceIds = [...current, id]
  render()
}

function submitAccusation() {
  const correctCulprit = state.accusation.culprit === caseData.ending.culprit
  const correctMethod = state.accusation.method === caseData.ending.method
  const correctEvidenceCount = state.accusation.evidenceIds.filter((id) => caseData.ending.required.includes(id)).length

  let verdict = '失败'
  let title = '指控未成立'
  let body = '你的怀疑并非全错，但证据链还没闭合。真正的凶手仍然有空间脱身。'

  if (correctCulprit && correctEvidenceCount >= 2 && correctMethod) {
    verdict = '完美结案'
    title = '指控成立'
    body = '陈默的时间线、阳台鞋印与“知道录音不在电脑里”的失言形成闭环。周岚不是意外坠楼，而是在争执后被二次施力推下阳台。'
  } else if (correctCulprit && correctEvidenceCount >= 2) {
    verdict = '成功结案'
    title = '你抓到了人，但真相还差半步'
    body = '你锁定了陈默，也抓住了核心证据，但作案逻辑没有完全讲清。案件依然成立，只是少了那记最重的落锤。'
  }

  if (verdict === '失败') body = `${body} ${failureReview()}`
  state.outcome = { verdict, title, body }
  state.screen = 'ending'
  render()
}

function renderAISettings() {
  return `
    <div class="ai-panel ${state.aiOpen ? 'open' : ''}">
      <div class="ai-head">
        <div>
          <div class="panel-title">AI 审讯已接通</div>
          <strong>${aiConfig.enabled ? '模型与密钥由服务端托管，用户无需配置' : '当前已切回规则模式'}</strong>
        </div>
        <button class="btn ghost small-btn" data-action="toggle-ai-panel">${state.aiOpen ? '收起状态' : '查看状态'}</button>
      </div>
      ${state.aiOpen ? `
        <div class="ai-form">
          <div class="mini-grid">
            <label><span>当前模式</span><input value="Vercel 服务端代理" disabled /></label>
            <label><span>AI 状态</span><input value="${aiConfig.enabled ? '已启用' : '已停用'}" disabled /></label>
          </div>
          <div class="toggle-row wrap-row">
            <label class="checkbox-row"><input id="ai-enabled" type="checkbox" ${aiConfig.enabled ? 'checked' : ''}/> <span>启用 AI 审讯</span></label>
            <div class="btn-row">
              <button class="btn secondary small-btn" data-action="save-ai-config">保存偏好</button>
              <button class="btn ghost small-btn" data-action="test-ai-connection">${state.aiTesting ? '测试中…' : '测试连接'}</button>
            </div>
          </div>
          <div class="form-tip">上游 URL、API Key、默认模型都已转移到服务端环境变量，前端不再暴露这些配置。</div>
          ${state.aiTestResult ? `<div class="ai-test-result">${state.aiTestResult}</div>` : ''}
          ${state.aiError ? `<div class="ai-error">${state.aiError}</div>` : ''}
        </div>
      ` : ''}
    </div>
  `
}

function renderOnboarding() {
  if (state.screen !== 'home') return ''
  return `
    <section class="onboarding-strip">
      <article class="onboarding-card">
        <span>01</span>
        <div>
          <strong>先压外围口供</strong>
          <p>先摸清林骁和许薇的时间线，把“谁没上楼、谁在附近徘徊”压实。</p>
        </div>
      </article>
      <article class="onboarding-card">
        <span>02</span>
        <div>
          <strong>再回头击穿陈默</strong>
          <p>盯住门禁、阳台、录音去问，陈默最怕你把这三条线串起来。</p>
        </div>
      </article>
      <article class="onboarding-card">
        <span>03</span>
        <div>
          <strong>最后锁定指控</strong>
          <p>只要时间线、现场鞋印、录音认知破绽闭环，指控就能落地。</p>
        </div>
      </article>
    </section>
  `
}

function renderVerdictPreview() {
  const picked = state.accusation.evidenceIds.map((id) => clueById(id)?.title).filter(Boolean)
  if (!picked.length && !state.accusation.culprit && !state.accusation.method) return ''
  return `
    <div class="verdict-preview">
      <div class="panel-title">指控预演</div>
      <p>你准备把矛头指向 <strong>${state.accusation.culprit ? suspectById(state.accusation.culprit)?.name : '——'}</strong>，并主张 <strong>${state.accusation.method || '——'}</strong>。</p>
      <p>你手上的核心证据：${picked.length ? picked.join(' / ') : '——'}</p>
    </div>
  `
}

function renderHome() {
  return `
    <section class="hero-shell">
      <div class="case-badge">${caseData.code} · 单案审讯博弈</div>
      <h1>${caseData.title}</h1>
      <p class="lead">${caseData.intro}</p>
      ${renderAISettings()}
      ${renderProgressStrip()}
      ${renderOnboarding()}
      <div class="hero-grid">
        <div class="panel highlight">
          <div class="panel-title">死者档案</div>
          <h3>${caseData.victim.name}</h3>
          <p>${caseData.victim.role}</p>
          <ul>${caseData.victim.notes.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="panel">
          <div class="panel-title">嫌疑人</div>
          <div class="suspect-list compact">
            ${caseData.suspects.map((suspect) => `
              <button class="suspect-card ${state.currentSuspectId === suspect.id ? 'active' : ''}" data-action="pick-suspect" data-id="${suspect.id}">
                <div>
                  <strong>${suspect.name}</strong>
                  <span>${suspect.role}</span>
                </div>
                <em>${suspect.portrait}</em>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="cta-row">
        <button class="btn primary" data-action="start">开始调查</button>
        <button class="btn ghost" data-action="go-clues">先看案卷</button>
      </div>
    </section>
  `
}

function getCaseProgress() {
  const keyFound = caseData.ending.required.filter((id) => state.discoveredClues.includes(id)).length
  const total = caseData.ending.required.length
  return Math.round((keyFound / total) * 100)
}

function getDeductionHints() {
  const hints = []
  if (state.discoveredClues.includes('evi_doorlog')) hints.push('时间线开始松动：陈默的离开时间和自述不一致。')
  if (state.discoveredClues.includes('evi_shoeprint')) hints.push('现场指向阳台：鞋印把“不是意外”往前推了一步。')
  if (state.discoveredClues.includes('evi_backup')) hints.push('认知破绽出现：有人知道录音不在电脑里。')
  if (!hints.length) hints.push('先把陈默逼到“动摇”，门禁和阳台两条线才会冒出来。')
  return hints
}

function renderProgressStrip() {
  const progress = getCaseProgress()
  const hints = getDeductionHints()
  return `
    <section class="progress-strip">
      <div class="progress-card">
        <div class="panel-title">破案进度</div>
        <div class="progress-line"><span style="width:${progress}%"></span></div>
        <div class="progress-meta">
          <strong>${progress}%</strong>
          <span>关键证据 ${caseData.ending.required.filter((id) => state.discoveredClues.includes(id)).length}/${caseData.ending.required.length}</span>
        </div>
      </div>
      <div class="progress-card hint-card">
        <div class="panel-title">推理提示</div>
        <ul>${hints.map((h) => `<li>${h}</li>`).join('')}</ul>
      </div>
    </section>
  `
}

function renderClueLinks() {
  const links = [
    ['evi_doorlog', 'evi_neighbor', '门禁记录 + 邻居证词 → 22 点后仍有男声争执，陈默时间口供最危险。'],
    ['evi_shoeprint', 'evi_balcony', '鞋印比对 + 阳台擦痕 → 更像推搡后的伪装现场，不像单纯失足。'],
    ['evi_backup', 'evi_mail', '云端备份 + 未发出的调查稿 → 凶手试图阻断资料，但并未完全得手。']
  ]
  const unlocked = links.filter(([a,b]) => state.discoveredClues.includes(a) && state.discoveredClues.includes(b))
  if (!unlocked.length) return '<div class="empty-state compact">找到能互相印证的两条证据后，这里会自动形成推理链。</div>'
  return unlocked.map(([a,b,text]) => `
    <article class="deduction-link">
      <div class="deduction-tags"><span>${clueById(a).title}</span><span>${clueById(b).title}</span></div>
      <p>${text}</p>
    </article>
  `).join('')
}

function renderTopbar() {
  const ready = isReadyToClose()
  return `
    <header class="topbar">
      <div>
        <div class="case-badge">${caseData.code}</div>
        <h2>${caseData.title}</h2>
      </div>
      <div class="top-actions">
        <span class="mode-pill ${hasUsableAIConfig() ? 'ai' : 'rules'}">${hasUsableAIConfig() ? 'AI 模式' : '规则模式'}</span>
        <button class="top-link" data-action="go-board">线索板</button>
        <button class="top-link ${ready ? 'ready' : ''}" data-action="go-close">${ready ? '锁定指控' : '证据未足'}</button>
      </div>
    </header>
  `
}

function renderInvestigation() {
  const suspect = suspectById(state.currentSuspectId)
  const s = suspectState[suspect.id]
  return `
    ${renderTopbar()}
    ${renderAISettings()}
    ${renderProgressStrip()}
    <section class="main-layout">
      <aside class="suspect-panel">
        <div class="portrait">${suspect.name.slice(0, 1)}</div>
        <div class="panel-title">当前审讯对象</div>
        <h3>${suspect.name}</h3>
        <p>${suspect.role}</p>
        <div class="status-pill ${s.phase}">${s.phase}</div>
        <div class="meter-list">
          <div><span>压力</span><strong>${s.stress}</strong></div>
          <div><span>防御</span><strong>${s.guard}</strong></div>
          <div><span>配合</span><strong>${s.attitude}</strong></div>
        </div>
        <div class="note-box">${suspect.vibe}</div>
        <div class="objective-box">
          <div class="panel-title small">当前目标</div>
          <p>${suspect.id === 'chen' ? '盯住时间线、阳台、录音去逼出失言。' : '先把外围人物口供压实，再回头击穿陈默。'}</p>
        </div>
        <div class="switch-list">
          ${caseData.suspects.map((item) => `
            <button class="switch-btn ${item.id === suspect.id ? 'active' : ''}" data-action="pick-suspect" data-id="${item.id}">${item.name}</button>
          `).join('')}
        </div>
      </aside>
      <section class="dialogue-panel">
        <div class="panel-title">审讯记录</div>
        <div class="log-stream">
          ${state.statementLog.length ? state.statementLog.map((entry) => `
            <article class="log-card ${entry.kind}">
              <div class="log-meta">${suspectById(entry.suspectId).name} · ${entry.kind === 'ask' ? '问话' : entry.kind === 'evidence' ? '证据施压' : entry.kind === 'ai' ? '自由追问' : '连续施压'} · ${entry.mode === 'ai' ? 'AI 回答' : '规则反馈'}</div>
              <p>${entry.text.replace(/\n/g, '<br/>')}</p>
            </article>
          `).join('') : '<div class="empty-state">先从一个问题开始，把口供拉出来。</div>'}
        </div>
        <div class="action-panel">
          <div class="action-group">
            <div class="panel-title small">问话</div>
            <div class="chip-row">
              ${topics.map((topic) => `<button class="chip" data-action="ask-topic" data-id="${topic.id}" ${state.aiBusy ? 'disabled' : ''}>${topic.label}</button>`).join('')}
            </div>
          </div>
          <div class="action-group">
            <div class="panel-title small">自由追问（AI）</div>
            <div class="free-ask-row">
              <input id="free-ask-input" placeholder="比如：你为什么知道录音不在电脑里？" ${state.aiBusy ? 'disabled' : ''} />
              <button class="btn primary small-btn" data-action="free-ask" ${state.aiBusy ? 'disabled' : ''}>${state.aiBusy ? '思考中…' : '追问'}</button>
            </div>
          </div>
          <div class="action-group">
            <div class="panel-title small">追问破绽</div>
            <div class="chip-row">
              ${availableLeads().length ? availableLeads().map((lead) => `<button class="chip lead-chip" data-action="pursue-lead" data-id="${lead.id}">${lead.label}</button>`).join('') : '<span class="inline-tip">先逼出口供裂缝，追问选项才会出现。</span>'}
            </div>
          </div>
          <div class="action-group">
            <div class="panel-title small">施压</div>
            <button class="btn secondary" data-action="pressure">连续追问，逼他露口风</button>
          </div>
          <div class="action-group">
            <div class="panel-title small">出示证据</div>
            <div class="chip-row evidence">
              ${state.discoveredClues.map((id) => {
                const clue = clueById(id)
                return `<button class="chip evidence-chip" data-action="present-evidence" data-id="${id}">${clue.title}</button>`
              }).join('')}
            </div>
          </div>
        </div>
      </section>
    </section>
  `
}

function renderClueBoard() {
  return `
    ${renderTopbar()}
    ${renderProgressStrip()}
    <section class="board-layout">
      <div class="section-head">
        <div>
          <div class="panel-title">证物板</div>
          <h3>已取得 ${state.discoveredClues.length} 条线索</h3>
        </div>
        <button class="btn ghost" data-action="go-investigation">返回审讯</button>
      </div>
      <div class="deduction-section">
        <div class="panel-title">证据关联</div>
        ${renderClueLinks()}
      </div>
      <div class="clue-grid">
        ${state.discoveredClues.map((id) => {
          const clue = clueById(id)
          return `
            <article class="clue-card ${caseData.ending.required.includes(id) ? 'key' : ''}">
              <div class="clue-top">
                <span class="tag">${clue.type}</span>
                ${caseData.ending.required.includes(id) ? '<span class="tag danger">关键</span>' : ''}
              </div>
              <h4>${clue.title}</h4>
              <p>${clue.summary}</p>
              <div class="clue-source">${clue.source}</div>
              <div class="clue-detail">${clue.details}</div>
            </article>
          `
        }).join('')}
      </div>
    </section>
  `
}

function renderCloseCase() {
  return `
    ${renderTopbar()}
    <section class="close-layout">
      <div class="panel large">
        <div class="panel-title">锁定指控</div>
        <h3>现在，给出你的结论。</h3>
        <div class="close-block">
          <label>你要指控谁？</label>
          <div class="option-grid">
            ${caseData.suspects.map((suspect) => `
              <button class="option-card ${state.accusation.culprit === suspect.id ? 'selected' : ''}" data-action="choose-culprit" data-id="${suspect.id}">
                <strong>${suspect.name}</strong>
                <span>${suspect.role}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <div class="close-block">
          <label>你认定的作案逻辑</label>
          <div class="option-grid single-line">
            ${[
              '冲动失手',
              '争执后蓄意灭口并伪装意外坠楼',
              '自杀伪装成谋杀'
            ].map((item) => `
              <button class="option-card ${state.accusation.method === item ? 'selected' : ''}" data-action="choose-method" data-id="${item}">${item}</button>
            `).join('')}
          </div>
        </div>
        <div class="close-block">
          <label>选择 3 条最关键的证据</label>
          <div class="option-grid">
            ${state.discoveredClues.map((id) => {
              const clue = clueById(id)
              return `
                <button class="option-card ${state.accusation.evidenceIds.includes(id) ? 'selected' : ''}" data-action="toggle-evidence" data-id="${id}">
                  <strong>${clue.title}</strong>
                  <span>${clue.summary}</span>
                </button>
              `
            }).join('')}
          </div>
        </div>
        ${renderVerdictPreview()}
        <div class="cta-row left">
          <button class="btn ghost" data-action="go-investigation">返回补证</button>
          <button class="btn primary" data-action="submit-case">锁定指控</button>
        </div>
      </div>
    </section>
  `
}

function getOutcomeTone() {
  if (!state.outcome) return 'neutral'
  if (state.outcome.verdict === '完美结案') return 'perfect'
  if (state.outcome.verdict === '成功结案') return 'good'
  return 'bad'
}

function renderEnding() {
  return `
    <section class="ending-shell ${getOutcomeTone()}">
      <div class="case-badge">结案回放</div>
      <h1>${state.outcome.title}</h1>
      <div class="verdict">${state.outcome.verdict}</div>
      <div class="ending-tags">
        <span>${state.accusation.culprit ? `你指控了 ${suspectById(state.accusation.culprit)?.name}` : '未锁定嫌疑人'}</span>
        <span>${state.accusation.evidenceIds.length} 条核心证据</span>
      </div>
      <p class="lead">${state.outcome.body}</p>
      <div class="panel large recap-panel">
        <div class="panel-title">审讯回放</div>
        <p>你真正完成的不是一次选择题，而是把三条分散的线索压成了一条证据链：时间线说谎、现场痕迹、认知失言。</p>
      </div>
      <div class="panel large">
        <div class="panel-title">标准答案</div>
        <ul>
          <li>真凶：陈默</li>
          <li>作案逻辑：${caseData.ending.method}</li>
          <li>关键证据：${caseData.ending.required.map((id) => clueById(id).title).join(' / ')}</li>
        </ul>
      </div>
      <div class="cta-row">
        <button class="btn ghost" data-action="restart">重新调查</button>
        <button class="btn primary" data-action="go-board">回看证据链</button>
      </div>
    </section>
  `
}

function escapeAttr(value) {
  return String(value || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

function readAIForm() {
  const model = document.querySelector('#ai-model')?.value?.trim()
  const temperature = document.querySelector('#ai-temperature')?.value?.trim()
  const maxTokens = document.querySelector('#ai-max-tokens')?.value?.trim()
  aiConfig.baseUrl = DEPLOY_MODE
  aiConfig.apiKey = ''
  aiConfig.model = model || aiConfig.model
  aiConfig.temperature = temperature || aiConfig.temperature
  aiConfig.maxTokens = maxTokens || aiConfig.maxTokens
  aiConfig.enabled = !!document.querySelector('#ai-enabled')?.checked
}

async function testAIConnection() {
  readAIForm()
  saveAIConfig()
  state.aiError = ''
  state.aiTestResult = ''

  const useProxy = aiConfig.baseUrl.trim() === 'proxy'
  if ((!useProxy && (!aiConfig.baseUrl || !aiConfig.apiKey || !aiConfig.model)) || (useProxy && !aiConfig.model)) {
    state.aiError = useProxy
      ? '代理模式下至少要填 Model。'
      : '当前部署应走代理模式；如果看到这条，说明本地旧配置脏了。'
    render()
    return
  }

  state.aiTesting = true
  render()

  try {
    const content = await callOpenAICompat([
      { role: 'system', content: '你是一个连通性测试器。只回复 OK。' },
      { role: 'user', content: '请只回复 OK' }
    ])
    state.aiTestResult = `连接成功：${content}`
    toast('AI 接口已连通')
  } catch (error) {
    state.aiError = String(error.message || error)
  } finally {
    state.aiTesting = false
    render()
  }
}

function bindEvents() {
  document.querySelectorAll('[data-action]').forEach((el) => {
    el.addEventListener('click', async () => {
      const { action, id } = el.dataset
      if (action === 'toggle-ai-panel') state.aiOpen = !state.aiOpen
      if (action === 'save-ai-config') {
        readAIForm()
        saveAIConfig()
        state.aiError = ''
        state.aiTestResult = ''
        toast('AI 配置已保存在本机浏览器')
      }
      if (action === 'test-ai-connection') await testAIConnection()
      if (action === 'pick-suspect') state.currentSuspectId = id
      if (action === 'start') state.screen = 'investigation'
      if (action === 'go-clues' || action === 'go-board') state.screen = 'board'
      if (action === 'go-investigation') state.screen = 'investigation'
      if (action === 'go-close' && isReadyToClose()) state.screen = 'close'
      if (action === 'ask-topic') await askTopic(id)
      if (action === 'free-ask') await freeAskAI()
      if (action === 'pursue-lead') pursueLead(id)
      if (action === 'pressure') pressureSuspect()
      if (action === 'present-evidence') presentEvidence(id)
      if (action === 'choose-culprit') state.accusation.culprit = id
      if (action === 'choose-method') state.accusation.method = id
      if (action === 'toggle-evidence') toggleAccuseEvidence(id)
      if (action === 'submit-case') submitAccusation()
      if (action === 'restart') window.location.reload()
      render()
    })
  })
}

function render() {
  const screens = {
    home: renderHome,
    investigation: renderInvestigation,
    board: renderClueBoard,
    close: renderCloseCase,
    ending: renderEnding
  }

  app.innerHTML = `${screens[state.screen]()}${state.toast ? `<div class="toast">${state.toast}</div>` : ''}`
  bindEvents()
}

render()
