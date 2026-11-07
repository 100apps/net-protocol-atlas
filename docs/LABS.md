# Wireshark 动手实验（8 个）

> 通用准备：安装 Wireshark，选对网卡；每个实验先写预测、再抓包对照，最后用本站点详情抽屉里的 `wiresharkFilter` 复核。仅在自己拥有或获授权的网络中抓包。

## 实验 1 · ARP 解析全过程
过滤器 `arp`。清空本机 ARP 缓存后 ping 一个局域网 IP，记录 Request 广播与 Reply 单播、缓存写入。思考：为什么 ARP 无认证？

## 实验 2 · VLAN Trunk 观察
在支持 VLAN 的环境（或 GNS3/Packet Tracer 模拟）抓 Trunk 口流量，过滤器 `vlan`，对比 Access 口无标签帧，量出 4 字节标签开销。

## 实验 3 · DHCP DORA 四步
过滤器 `bootp`。释放并重新获取地址（`ipconfig /release && /renew` 或 `dhclient`），标注 Discover/Offer/Request/ACK 与 Option 53/51/3/6。

## 实验 4 · traceroute 与 ICMP
过滤器 `icmp`。对公网目标做 traceroute，观察 TTL 递增与 Type 11 超时报文如何逐跳拼出路径；对比 UDP/TCP 型 traceroute 差异。

## 实验 5 · TCP 握手、传数据、挥手
过滤器 `tcp.port==443` 后访问一个 https 站点（或本地 HTTP 服务看明文）。用 IO Graph 与「Follow TCP Stream」标注 SYN/SYN-ACK/ACK、数据段序号推进、FIN 四步与 TIME-WAIT。

## 实验 6 · DNS 递归全链
过滤器 `dns`。禁用缓存后查询一个新域名，观察递归应答中的 CNAME 链；再开 DoH 对比：为什么抓不到明文 DNS 了？

## 实验 7 · TLS 1.3 握手
过滤器 `tls.handshake`。访问 https 站点，标注 ClientHello（SNI/ALPN/key_share）、ServerHello、证书与 Finished，确认全程只有 1-RTT。进阶：配 SSLKEYLOGFILE 解密自有流量。

## 实验 8 · MQTT 发布/订阅
本地起一个 Mosquitto broker，过滤器 `mqtt`，用 `mosquitto_pub/sub` 完成 CONNECT→SUBSCRIBE→PUBLISH 全流程，对比 QoS 0/1/2 的报文次数差异。

## 实验报告模板
目标 / 预测 / 过滤器 / 关键包截图 / 字段级标注（对照数据集 headerFields）/ 结论 / 踩到的坑（对照 pitfalls）。
