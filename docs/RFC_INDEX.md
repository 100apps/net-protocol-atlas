# 核心协议 RFC / 标准索引

| 协议 | RFC / 标准 | 端口/标识 | Wireshark 过滤器 |
|---|---|---|---|
| ARP | RFC 826 | — | `arp` |
| BGP-4 | RFC 4271 | TCP 179 | `bgp` |
| DHCPv4 | RFC 2131 | UDP 67 / 68 | `bootp（或 dhcp）` |
| DNS | RFC 1035 | UDP/TCP 53 | `dns` |
| Ethernet II | IEEE 802.3 | — | `eth` |
| FTP | RFC 959 | TCP 21（控制）/ 20（主动数据） | `ftp 或 ftp-data` |
| HTTP/1.1 | RFC 9112 | TCP 80 | `http` |
| HTTP/2 | RFC 9113 | TCP 443（h2） | `http2` |
| HTTP/3 | RFC 9114 | UDP 443 | `http3` |
| ICMP | RFC 792 | — | `icmp` |
| IPsec | RFC 4301 | — | `esp 或 udp.port==500/4500` |
| IPv4 | RFC 791 | — | `ip` |
| IPv6 | RFC 8200 | — | `ipv6` |
| MPLS | RFC 3031 | — | `mpls` |
| MQTT | —（非 RFC 标准，见数据集 fullName） | TCP 1883 / 8883 | `mqtt` |
| NAT | RFC 3022 | — | `ip.addr==<公网IP>（内外对比抓包）` |
| NTP | RFC 5905 | UDP 123 | `ntp` |
| OSPF | RFC 2328 / RFC 5340 | IP 协议号 89 | `ospf` |
| QUIC | RFC 9000 | UDP 443（HTTP/3 常见） | `quic` |
| RTP | RFC 3550 | UDP（动态端口） | `rtp` |
| SCTP | RFC 9260 | — | `sctp` |
| SIP | RFC 3261 | UDP/TCP 5060 / 5061 | `sip` |
| SMTP | RFC 5321 | TCP 25 / 587 / 465 | `smtp` |
| SNMP | RFC 3411 | UDP 161 / 162 | `snmp` |
| SSH | RFC 4253 | TCP 22 | `ssh` |
| STP | IEEE 802.1D | — | `stp` |
| TCP | RFC 9293 | — | `tcp` |
| TLS 1.3 | RFC 8446 | TCP 443（HTTPS） | `tls` |
| UDP | RFC 768 | — | `udp` |
| VLAN | IEEE 802.1Q | — | `vlan` |
| VXLAN | RFC 7348 | UDP 4789 | `vxlan` |
| WebSocket | RFC 6455 | TCP 80 / 443 | `websocket` |
| Wi-Fi | IEEE 802.11 | — | `wlan` |
| WireGuard | —（非 RFC 标准，见数据集 fullName） | UDP 51820（默认） | `wireguard` |

注：无 RFC 的协议（如 WireGuard、gRPC）以官方规范/论文为准，数据集中 rfc 留空，不编造编号。