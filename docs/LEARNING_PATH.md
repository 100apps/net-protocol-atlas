# 6 周学习路线：吃透网络协议

> 配合本仓库使用：第 1 步在图谱（index.html）查协议卡片，第 2 步在 Wireshark 抓包验证（见 LABS.md），第 3 步用测验模式自测。

## 第 1 周 · 二层与局域网
Ethernet II 帧结构、MAC 学习/泛洪、VLAN/Trunk、STP/RSTP/MSTP 防环、LACP 聚合、LLDP、ARP。动手：实验 1、2。
里程碑：能默画以太网帧 + VLAN 标签，并解释一次 ARP 全过程。

## 第 2 周 · IP 与路由基础
IPv4/IPv6 头部、子网划分（练子网计算器）、ICMP/ping/traceroute、NAT、DHCP DORA、静态路由 → OSPF。动手：实验 3、4。
里程碑：独立完成 VLSM 划分；说清 NAT 映射表生命周期。

## 第 3 周 · 传输层深挖
TCP 三次握手/四次挥手（练握手动画）、滑动窗口、拥塞控制（慢启动→AIMD→CUBIC/BBR）、UDP、SCTP、QUIC。动手：实验 5。
里程碑：对着抓包逐包标注序号/确认号变化。

## 第 4 周 · 互联网路由与隧道
BGP 选路策略与 AS、MPLS 标签、GRE/IPsec/WireGuard、VXLAN/Geneve 与数据中心网络。动手：实验 6。
里程碑：画出跨 AS 的一次访问全路径。

## 第 5 周 · 应用层全家桶
DNS（含 DoH/DoT/DoQ、DNSSEC）、HTTP/1.1→2→3 演进、WebSocket、邮件三件套（SMTP/POP3/IMAP）、FTP/SFTP/SSH、SNMP/NTP。动手：实验 7。
里程碑：完整复述「输入 URL 到页面打开」的协议之旅（站点第 ⑥ 面板）。

## 第 6 周 · 实时、物联与综合项目
SIP/RTP/RTCP、WebRTC（STUN/TURN/ICE）、MQTT/CoAP/AMQP、工业协议（Modbus/OPC UA/BACnet）。动手：实验 8 + 综合项目：自选一条业务流（如一次视频通话/一次 IoT 上报），抓包并写全协议栈标注报告。
里程碑：通过测验模式 10/10，并能给任意一条流量写出分层解析。

## 长期
- 读 RFC 原文顺序：791 → 826 → 9293 → 1035 → 4271 → 9000 → 8446。
- 把每个新遇到的协议补进 `data/protocols.json` 提 PR，就是最好的复习。
