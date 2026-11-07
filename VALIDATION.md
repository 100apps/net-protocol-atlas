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
- [x] HTTP 场景步数 = 7、包 = 12；DNS 场景步数 = 6、包 = 7（每步追加数与场景数据一致）
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
