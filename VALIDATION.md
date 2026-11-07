# 验证记录（VALIDATION）

验证日期：2026-11-07（Asia/Shanghai）· 环境：本机 Python 3 + Node（`node --check`）+ Node DOM 替身状态机实测。以下均为实际运行输出摘要，非预填。

## 1. 数据校验 `python3 scripts/validate_data.py`
```
协议总数: 161
核心协议: 34
标准协议: 127
按层分布: L1=5, L2=35, L3=29, L4=7, L5=1, L6=3, L7=81
protocols.js 与 protocols.json 一致: OK
校验通过 ✓
```
校验项：slug 唯一、12 个必填字段齐全、layer∈1-7、depth 合法、core 协议五件套详解（headerFields/flow/wiresharkFilter/example/pitfalls）齐全、总数 ≥140、core ≥32。

## 2. CLI 冒烟 `tools/netproto.py`（仅标准库）
- `stats`：协议总数 161 / 核心 34；分类：应用=73、安全/会话=18、网络/路由=24、数据链路/交换=23、物理/接入=16、传输=7 ✓
- `list`（含 `--layer` 过滤）：正常输出 slug/层/分类/名称/端口 ✓
- `search quic`：命中 4（UDP、QUIC、DoQ、HTTP/3）✓
- `info tcp`：完整输出含 headerFields 7 项、flow、过滤器 `tcp`、example、pitfalls ✓
- `subnet 192.168.1.37/26`：网络 192.168.1.0/26、广播 192.168.1.63、掩码 255.255.255.192、总数 64、可用 62、范围 .1–.62、通配符 0.0.0.63 ✓（另验 `10.0.0.1/8` 正常）
- `quiz --no-interactive`：正常输出 5 题（层/端口题）及答案 ✓

## 3. JS 语法与文件引用
- `node --check assets/app.js` ✓ · `node --check assets/theater.js` ✓ · `node --check data/protocols.js` ✓
- `index.html` 引用核查：`assets/style.css`、`data/protocols.js`、`assets/app.js`、`assets/theater.js` 全部存在 ✓
- app.js 花括号/圆括号配平（0/0）✓

## 4. 协议剧场 Packet Theater 专项检查（本轮新增，Node DOM 替身驱动真实状态机）
替身 harness 加载真实 `assets/theater.js` 并模拟点击，结果原文：
```
init: 步骤 0 / 10 · 已发送 0 个包 | packet rows: 0
https after 10x next: 步骤 10 / 10 · 已发送 22 个包 | packet rows: 22
seq highlights current: true
step detail has step10: true
after prev: 步骤 9 / 10 · 已发送 21 个包
after reset: 步骤 0 / 10 · 已发送 0 个包 | rows: 0
http end: 步骤 7 / 7 · 已发送 12 个包 | rows: 12
dns end: 步骤 6 / 6 · 已发送 7 个包 | rows: 7
```
逐项结论：
- [x] 场景数 = 3（HTTPS / 纯 HTTP / DNS+UDP），可切换且切换后自动重置
- [x] HTTPS 场景步数 = 10（输入URL→DHCP→ARP→DNS→TCP握手→TLS1.3→加密请求→响应渲染→四次挥手→安全小结），累计包 = 22
- [x] HTTP 场景步数 = 7、包 = 12；DNS 场景步数 = 6、包 = 9（打磨轮起：迭代查询展开为根/TLD/权威三问三答，见下节）
- [x] 下一步/上一步/重置真实可用：上一步包数 22→21（末步包被撤下），重置归零；播放/暂停为同一状态机的定时推进（代码路径与 next() 共用，`setInterval` 1700ms）
- [x] 时序图：含客户端 192.168.1.10 / 网关 192.168.1.1 / DNS 8.8.8.8 / Web 服务器 203.0.113.10 四节点；当前步箭头带 `current` 高亮（实测 true），已演 `done`、未演 `todo`
- [x] 包行点击 → 分层详情：实测 DHCP 包显示 Ethernet II + IPv4 + UDP + BOOTP/DHCP 分层表；DNS 包显示 Ethernet/IPv4/UDP/DNS
- [x] hex 转储为程序生成：实测首行 `0000  66 77 88 99 aa bb 00 11 22 33 44 55 08 00 45 00 ...`（目的 MAC=网关、源 MAC=客户端、EtherType 0x0800、IPv4 头），由 `buildBytes()/hexDump()` 按协议结构拼字节，非静态文案；加密载荷为确定性伪随机字节，明文 HTTP 的 hex 右侧 ASCII 可直读 `GET /login...`
- [x] 右侧步骤详情随步同步（实测第 10/10 步文案正确切换）
- [x] 剧场为首个标签页与默认激活面板（`panel-theater` 在 `panel-atlas` 之前且带 active）

## 5. 已知边界
- 剧场与解析器中的字节/长度为教学示意（标称长度与真实抓包可不同），README 已声明。
- 未在真实浏览器中点击验证（本环境以 Node 替身实测状态机与渲染字符串代替；file:// 与 Pages 的加载路径为纯静态三件套 + 顺序 script 标签，无 fetch 依赖）。
- 尚未推送 GitHub：需用户先建空仓并授权（见仓库 README/CONTRIBUTING）。

## Pages 打磨轮（D1–D3）（真浏览器实测缺陷单修复）

### 修法落点
- **D1.1 DHCP 口径**（assets/theater.js）：包加 addr 覆盖（源/目的 IP、目的 MAC）。Discover/Request = 0.0.0.0 → 255.255.255.255、目的 MAC ff:ff:ff:ff:ff:ff；Offer/ACK = 192.168.1.1 → 255.255.255.255 广播（客户端置广播标志、租约确认前收不了单播），BOOTP 区按真实布局生成（flags 广播位、yiaddr 仅 Offer/ACK 填 192.168.1.10），步骤文字同步说明。
- **D1.2 场景 C 节点/方向**：场景级节点集（nodes/order 随场景切换）。场景 C = 客户端 / 递归解析器 8.8.8.8 / 根服务器 198.41.0.4 / .com TLD 192.5.6.30 / 权威 203.0.113.53；迭代步展开 6 包（解析器→根→解析器→TLD→解析器→权威→解析器），箭头与包列表源/目标按真实迭代方向；不再出现「Web 服务器」冒充 DNS 角色。端口方向由 portPair() 按收发角色统一推导（分层解析与 hex 同源）。
- **D1.3 hex 长度**：buildBytes 按结构拼完后填充到标称长度，IP 总长=帧长−14、UDP 长度字段同步；全场景 43 个包逐个实测 hex 字节数 == 标称长度。详情标题改直述「共 N 字节，与标称长度一致」，删除「示例/示意」类含糊措辞。
- **D2.4–D2.6 初始即有反馈**：封装 encRun() 页面加载即算（改选项/输入实时重算）；解析器加载即载入并解析 IPv4+TCP 示例，示例按钮改为填入+立即解析；子网加载即按 192.168.1.37/26 出结果；协议之旅加载即渲染并可步进（上一步/下一步/播放 + 第 x/共 7 步，未到弱化、当前高亮）。
- **D2.7 测验反馈**：点选项立即锁定并显示 ✅/❌、正确答案与解析（explain 由协议层/端口+简介生成），「下一题」才继续；结束页总分 + 逐题回顾（你的答案/正确答案/对错）。
- **D2.8 握手动画**：加「第 x 步/共 y 步」进度；加数据包元素在客户端↔服务端间按方向滑动（CSS transition，含 SYN/FIN 等标签）。
- **D2.9/D2.10**：抽屉深度显示核心/标准；封装堆叠条窄段不放内嵌文字，条下加统一图例（名称+字节+占比），段名去掉重复字节后缀。
- **D3.11–D3.13**：剧场初始与重置共用 reset()（步骤 0/总步数、0 包、播放引导文案）；无包步骤在时序区生成虚线「本地动作」行并参与 current/done 高亮；所有步进/切换入口先 stopPlay()（含播放按钮文案立即复位）再执行，消除播放竞态。
- **响应式**（assets/style.css）：≤720px 导航横向滚动不换行挤压、面板表格横向滚动、堆叠条窄段最小宽放开。

### 自测（Node DOM 替身驱动真实 app.js / theater.js）
```
node --check assets/app.js / assets/theater.js → OK
29 项断言 ALL TESTS PASSED，要点：
  D1.1 Discover 包列表 0.0.0.0→255.255.255.255 ✓ 详情目的 MAC ff:ff:ff:ff:ff:ff ✓ Offer 广播+yiaddr ✓
  D1.2 场景 C 节点含根/TLD/权威/解析器、无 Web 服务器 ✓ 迭代箭头 解析器→根 / 根→解析器 / 解析器→权威 ✓
  D1.3 全场景 43 包 hexCount==标称长度（342/66/1450/... 逐包核）✓ MISMATCH []
  D11 初始==重置（进度文案+包列表 HTML 一致）✓ D12 无包步 local current 高亮 ✓ D13 播放→上一步先生效、播放钮复位 ✓
  D2.4 封装/解析/子网/旅程初始即出结果 ✓ D2.5 示例一键出 UDP 表 ✓ D2.6 旅程步进 1→2 ✓
  D2.7 答错出 ❌+正确答案+解析、结束页总分+逐题回顾 ✓ D2.8 握手第 1/3 步进度+包元素移动 ✓
```
改动文件：index.html、assets/app.js、assets/theater.js、assets/style.css、VALIDATION.md。
