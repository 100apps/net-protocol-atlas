# 吃透网络协议 · 全图谱实验室 — Net Protocol Atlas

> 一个**纯静态、零构建、零依赖**的网络协议学习实验室：161 个协议全图谱 + 7 个能上手点的交互工具 + Python 命令行 + Wireshark 实验手册。双击 `index.html` 就能学，部署到 GitHub Pages 就能分享。

灵感来自抖音「Fragmemory」一类网络协议学习工具视频：原工具收录 **13 个协议**（分类：全部 13 / 基础 4 / 应用 7 / 安全 3），核心卖点是一个 **HTTPS 6 步演示**（安全请求→DNS→TCP 握手→TLS 握手→加密交换→渲染，配时序图、类 Wireshark 包列表与分层包详情）。本项目在**完全复刻并扩充这套演示形态**的基础上，把协议数量、场景数量与可动手程度全部拉开代差：**查、算、演、解、练**全做实，让你不只是「看过协议」，而是能算开销、能演握手、能解报文、能做题自测。

## 为什么超越同类工具

| 能力 | 原工具（Fragmemory 视频所示） | 本项目 Net Protocol Atlas（实测数字） |
|---|---|---|
| 协议数量 | **13 个**（基础 4 / 应用 7 / 安全 3） | **161 个**（核心详解 34），含物理接入到工业/物联/P2P |
| 场景演示 | **1 个**：HTTPS 6 步演示 | **协议剧场 3 个场景**：HTTPS 扩到 **10 步 / 22 个包**（补 DHCP、ARP、挥手、安全小结）、纯 HTTP 明文对比（7 步）、DNS+UDP 查询（6 步，含迭代查询与 TC 改走 TCP）；另有封装模拟器、握手动画、报文解析器等其余交互模块 |
| 演示联动 | 时序图 + 包列表 + 包详情 | 同样三件套且全部联动：时序图高亮当前步箭头、包列表随步追加、点包行看分层字段 + **程序生成的 hex 转储**；播放/暂停/上一步/下一步/重置状态机真实可用（已自动化实测，见 VALIDATION.md） |
| 数据质量 | 端口/RFC 常缺失或含糊 | 每条含端口、RFC/标准、年份、中文摘要；**不确定的留空、绝不编造** |
| 查协议 | 静态图，放大看 | 全文搜索 + 按 OSI 层/分类/深度筛选 + 详情抽屉（头部字段/流程/过滤器/坑） |
| 报文封装 | 讲概念 | **封装模拟器**：逐层选协议算开销、效率与 MTU 分片，堆叠条可视化 |
| TCP 握手 | 静态图示 | **步进动画**：序号、确认号、双方状态机同步变化 |
| 抓包理解 | 另开 Wireshark 摸索 | **内置十六进制解析器**：4 个示例包一键解析 Ethernet/IP/TCP/UDP/ICMP 字段 |
| 子网划分 | 另找计算器 | **内置 IPv4 子网计算器**（网页版 + CLI 版同口径） |
| 系统串联 | 碎片知识点 | **「输入 URL 到页面打开」协议之旅**时间线，把 DNS/TCP/TLS/HTTP/路由一次串完 |
| 自测 | 无 | **测验模式**从数据集自动出题计分；另附 8 个 Wireshark 动手实验 |
| 离线/部署 | 依赖平台 App | 纯静态：`file://` 直开、GitHub Pages 一键部署、CLI 仅 Python 标准库 |

## 协议计数与分层目录

**总数 161 · 核心详解 34 · 标准条目 127**（以 `python3 scripts/validate_data.py` 输出为准）

| OSI 层 | 数量 | 代表协议 |
|---|---|---|
| L1 物理层 | 5 | Ethernet PHY、5G NR、DSL、SONET/SDH、USB |
| L2 数据链路层 | 35 | Ethernet II、VLAN、STP/RSTP/MSTP、LACP、MPLS、VXLAN、Wi-Fi/WPA、PPP/PPPoE |
| L3 网络层 | 29 | IPv4、IPv6、ARP、ICMP、NAT、IPsec、OSPF、BGP、WireGuard、GRE |
| L4 传输层 | 7 | TCP、UDP、SCTP、QUIC、MPTCP、DCCP、UDP-Lite |
| L5 会话层 | 1 | SOCKS5 |
| L6 表示层 | 3 | TLS 1.2、TLS 1.3、DTLS |
| L7 应用层 | 81 | DNS/DoH/DoT/DoQ、HTTP/1.1·2·3、WebSocket、SSH、SMTP、MQTT、SIP/RTP、WebRTC、Kafka、OPC UA 等 |

全量清单（脚本按层生成的表格）：[docs/PROTOCOL_MAP.md](docs/PROTOCOL_MAP.md) · 核心 RFC 索引：[docs/RFC_INDEX.md](docs/RFC_INDEX.md)

数据文件：`data/protocols.json`（主数据）与 `data/protocols.js`（同内容，`window.PROTOCOLS=...`，保证 `file://` 无需 fetch 也能读）。

## 快速开始

### 方式一：直接打开网页（零安装）
下载/克隆本仓库后，双击 `index.html` 即可。置顶模块 + 七大功能：
0. **协议剧场 Packet Theater（打开即见）** — 3 个场景（HTTPS 10 步 / HTTP 明文对比 / DNS+UDP），时序图+包列表+分层详情+hex 联动，播放/步进/重置可控
1. **协议全图谱** — 搜索 + 按层/分类/深度筛选，点卡片看详情抽屉
2. **报文封装模拟器** — 选各层协议算头部开销、总长度、MTU 分片与效率
3. **TCP 握手动画面板** — 按钮步进三次握手/四次挥手，看序号与状态机
4. **十六进制报文解析器** — 示例包一键解析，也可粘贴自己的 hex
5. **IPv4 子网计算器**
6. **协议之旅** — 输入 URL，生成从 DNS 到渲染的协议时间线
7. **测验模式** — 数据集自动出层/端口题并计分

### 方式二：GitHub Pages
推送到 GitHub 后启用 Pages（仓库 Settings → Pages，或直接用内置 `.github/workflows/pages.yml`），即可在线访问。

### 方式三：Python CLI（仅标准库，Python 3.9+）
```bash
python3 tools/netproto.py list                 # 全部协议（可加 --layer 4 / --category 应用）
python3 tools/netproto.py search quic          # 关键词搜索
python3 tools/netproto.py info tcp             # 单协议详情（核心协议含头部字段）
python3 tools/netproto.py subnet 192.168.1.37/26
python3 tools/netproto.py quiz                 # 5 题小测（--no-interactive 只打印题目答案）
python3 tools/netproto.py stats                # 数据集统计
python3 scripts/validate_data.py               # 校验数据集
```

## 截图占位说明
本节预留截图位（维护者部署后替换）：`docs/screenshots/atlas.png`（全图谱）、`docs/screenshots/encap.png`（封装模拟器）、`docs/screenshots/parser.png`（报文解析器）。在截图补齐前，可直接打开 `index.html` 体验全部功能——所有功能均为真实可用的交互实现，无演示占位。

## 学习路线摘要
6 周路线全文见 [docs/LEARNING_PATH.md](docs/LEARNING_PATH.md)：第 1 周二层与 ARP → 第 2 周 IP/子网/NAT/DHCP/OSPF → 第 3 周 TCP/QUIC 深挖 → 第 4 周 BGP 与隧道 → 第 5 周应用层全家桶 → 第 6 周实时/物联与综合抓包项目。配套 [docs/LABS.md](docs/LABS.md) 的 8 个 Wireshark 实验边学边抓。

## 目录结构
```
index.html            网页入口（纯静态）
assets/               style.css + app.js（零依赖）
data/                 protocols.json / protocols.js（161 条同源数据）
tools/netproto.py     Python CLI（仅标准库）
scripts/validate_data.py  数据校验
docs/                 PROTOCOL_MAP / LEARNING_PATH / LABS / RFC_INDEX
.github/workflows/    validate.yml（CI 校验+冒烟）/ pages.yml（Pages 部署）
```

## 贡献
见 [CONTRIBUTING.md](CONTRIBUTING.md)。最受欢迎的贡献是补协议：RFC 与端口必须确知才填、不确定留空。

## License
MIT — 见 [LICENSE](LICENSE)。Copyright (c) 2026 Net Protocol Atlas Contributors.

## 免责
本项目为教学工具：头部字节数等为常见/估算值（如 HTTP 头部、QUIC 开销随实现变化），精确数值以对应 RFC 与实际抓包为准；抓包实验请仅在自有或获授权的网络中进行。协议商标与名称归各自标准组织/权利方所有。
