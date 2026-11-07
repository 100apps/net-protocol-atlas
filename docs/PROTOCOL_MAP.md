# 协议全图谱（按 OSI 层）

由 `data/protocols.json` 生成，与数据集同源。总数：161，核心：34。

## 第 1 层 · 物理层（5 个）

| 协议 | 全称 | 端口/标识 | RFC/标准 | 年份 | 深度 |
|---|---|---|---|---|---|
| 5G NR | 5G New Radio (3GPP TS 38.300) | — | 3GPP TS 38.300 | 2019 | standard |
| DSL | Digital Subscriber Line | — | ITU-T G.992.x | 1999 | standard |
| Ethernet PHY | Ethernet Physical Layer | — | IEEE 802.3 | 1973 | standard |
| SONET / SDH | Synchronous Optical Networking / Synchronous Digital Hierarchy | — | ITU-T G.707 | 1988 | standard |
| USB | Universal Serial Bus | — | USB 3.2 / USB4 | 1996 | standard |

## 第 2 层 · 数据链路层（35 个）

| 协议 | 全称 | 端口/标识 | RFC/标准 | 年份 | 深度 |
|---|---|---|---|---|---|
| 4G LTE | Long Term Evolution (3GPP TS 36.300) | — | 3GPP TS 36.300 | 2009 | standard |
| 802.1X / EAP | Port-Based Network Access Control | — | IEEE 802.1X | 2001 | standard |
| ATM | Asynchronous Transfer Mode | — | ITU-T I.361 | 1990 | standard |
| Bluetooth / BLE | Bluetooth & Bluetooth Low Energy | — | Bluetooth Core 5.x | 1999 | standard |
| CDP | Cisco Discovery Protocol | — | — | 1994 | standard |
| DOCSIS | Data Over Cable Service Interface Specification | — | DOCSIS 3.1 | 1997 | standard |
| EtherCAT | Ethernet for Control Automation Technology | — | IEC 61158 | 2003 | standard |
| Ethernet II | Ethernet II Framing | — | IEEE 802.3 | 1982 | core |
| Fibre Channel | Fibre Channel | — | INCITS FC-PH | 1994 | standard |
| Frame Relay | Frame Relay | — | ITU-T Q.922 | 1992 | standard |
| GPON | Gigabit Passive Optical Network | — | ITU-T G.984 | 2003 | standard |
| Geneve | Generic Network Virtualization Encapsulation | UDP 6081 | RFC 8926 | 2020 | standard |
| HDLC | High-Level Data Link Control | — | ISO/IEC 13239 | 1970 | standard |
| L2TP | Layer Two Tunneling Protocol | UDP 1701 | RFC 2661 | 1999 | standard |
| LACP | Link Aggregation Control Protocol | — | IEEE 802.1AX | 2000 | standard |
| LLDP | Link Layer Discovery Protocol | — | IEEE 802.1AB | 2005 | standard |
| LoRa / LoRaWAN | Long Range Wide Area Network | UDP 1700（网关常见） | LoRaWAN L2 Spec | 2015 | standard |
| MPLS | Multiprotocol Label Switching | — | RFC 3031 | 2001 | core |
| MSTP | Multiple Spanning Tree Protocol | — | IEEE 802.1s | 2002 | standard |
| NB-IoT | Narrowband IoT | — | 3GPP Release 13 | 2016 | standard |
| OpenFlow | OpenFlow Switch Protocol | TCP 6653 / 6633 | ONF TS-025 | 2009 | standard |
| PPP | Point-to-Point Protocol | — | RFC 1661 | 1994 | standard |
| PPPoE | PPP over Ethernet | — | RFC 2516 | 1999 | standard |
| PPTP | Point-to-Point Tunneling Protocol | TCP 1723 | RFC 2637 | 1999 | standard |
| QinQ | IEEE 802.1ad Provider Bridging | — | IEEE 802.1ad | 2006 | standard |
| RSTP | Rapid Spanning Tree Protocol | — | IEEE 802.1w | 2001 | standard |
| SPB | Shortest Path Bridging (IEEE 802.1aq) | — | IEEE 802.1aq | 2012 | standard |
| STP | Spanning Tree Protocol (IEEE 802.1D) | — | IEEE 802.1D | 1990 | core |
| TRILL | Transparent Interconnection of Lots of Links | — | RFC 6325 | 2011 | standard |
| VLAN | IEEE 802.1Q Virtual LAN | — | IEEE 802.1Q | 1998 | core |
| VXLAN | Virtual Extensible LAN | UDP 4789 | RFC 7348 | 2014 | core |
| WPA2 | Wi-Fi Protected Access 2 | — | IEEE 802.11i | 2004 | standard |
| WPA3 | Wi-Fi Protected Access 3 | — | — | 2018 | standard |
| Wi-Fi | Wireless LAN (IEEE 802.11) | — | IEEE 802.11 | 1997 | core |
| Z-Wave | Z-Wave Mesh Protocol | — | ITU-T G.9959 | 2001 | standard |

## 第 3 层 · 网络层（29 个）

| 协议 | 全称 | 端口/标识 | RFC/标准 | 年份 | 深度 |
|---|---|---|---|---|---|
| 6LoWPAN | IPv6 over Low-Power Wireless Personal Area Networks | — | RFC 4944 | 2007 | standard |
| ARP | Address Resolution Protocol | — | RFC 826 | 1982 | core |
| BFD | Bidirectional Forwarding Detection | UDP 3784 | RFC 5880 | 2010 | standard |
| BGP-4 | Border Gateway Protocol version 4 | TCP 179 | RFC 4271 | 2006 | core |
| Babel | The Babel Routing Protocol | UDP 6696 | RFC 8966 | 2021 | standard |
| EIGRP | Enhanced Interior Gateway Routing Protocol | IP 协议号 88 | RFC 7868 | 2016 | standard |
| GRE | Generic Routing Encapsulation | IP 协议号 47 | RFC 2784 | 2000 | standard |
| HSRP | Hot Standby Router Protocol | UDP 1985 | RFC 2281 | 1998 | standard |
| ICMP | Internet Control Message Protocol | — | RFC 792 | 1981 | core |
| ICMPv6 | ICMP for IPv6 | — | RFC 4443 | 2006 | standard |
| IGMP | Internet Group Management Protocol | — | RFC 3376 | 2002 | standard |
| IKEv2 | Internet Key Exchange version 2 | UDP 500 / 4500 | RFC 7296 | 2014 | standard |
| IPsec | Internet Protocol Security (AH/ESP) | — | RFC 4301 | 2005 | core |
| IPv4 | Internet Protocol version 4 | — | RFC 791 | 1981 | core |
| IPv6 | Internet Protocol version 6 | — | RFC 8200 | 2017 | core |
| IS-IS | Intermediate System to Intermediate System | — | ISO/IEC 10589 | 1990 | standard |
| LISP | Locator/ID Separation Protocol | UDP 4341 | RFC 9300 | 2022 | standard |
| NAT | Network Address Translation | — | RFC 3022 | 2001 | core |
| NDP | Neighbor Discovery Protocol | — | RFC 4861 | 2007 | standard |
| OSPF | Open Shortest Path First (v2/v3) | IP 协议号 89 | RFC 2328 / RFC 5340 | 1998 | core |
| PIM | Protocol Independent Multicast | IP 协议号 103 | RFC 7761 | 2016 | standard |
| RIP / RIPng | Routing Information Protocol | UDP 520 / 521 | RFC 1058 / RFC 2080 | 1988 | standard |
| RSVP | Resource Reservation Protocol | IP 协议号 46 | RFC 2205 | 1997 | standard |
| SLAAC | Stateless Address Autoconfiguration | — | RFC 4862 | 2007 | standard |
| Segment Routing | Segment Routing (SR-MPLS / SRv6) | — | RFC 8402 | 2018 | standard |
| Thread | Thread Network Protocol | — | Thread 1.3 Spec | 2015 | standard |
| VRRP | Virtual Router Redundancy Protocol | IP 协议号 112 | RFC 5798 | 2010 | standard |
| WireGuard | WireGuard Protocol | UDP 51820（默认） | — | 2020 | core |
| Zigbee | Zigbee PRO over IEEE 802.15.4 | — | IEEE 802.15.4 / Zigbee PRO | 2004 | standard |

## 第 4 层 · 传输层（7 个）

| 协议 | 全称 | 端口/标识 | RFC/标准 | 年份 | 深度 |
|---|---|---|---|---|---|
| DCCP | Datagram Congestion Control Protocol | — | RFC 4340 | 2006 | standard |
| MPTCP | Multipath TCP | — | RFC 8684 | 2020 | standard |
| QUIC | QUIC Transport Protocol | UDP 443（HTTP/3 常见） | RFC 9000 | 2021 | core |
| SCTP | Stream Control Transmission Protocol | — | RFC 9260 | 2022 | core |
| TCP | Transmission Control Protocol | — | RFC 9293 | 2022 | core |
| UDP | User Datagram Protocol | — | RFC 768 | 1980 | core |
| UDP-Lite | Lightweight UDP | IP 协议号 136 | RFC 3828 | 2004 | standard |

## 第 5 层 · 会话层（1 个）

| 协议 | 全称 | 端口/标识 | RFC/标准 | 年份 | 深度 |
|---|---|---|---|---|---|
| SOCKS5 | SOCKS Protocol Version 5 | TCP 1080 | RFC 1928 | 1996 | standard |

## 第 6 层 · 表示层（3 个）

| 协议 | 全称 | 端口/标识 | RFC/标准 | 年份 | 深度 |
|---|---|---|---|---|---|
| DTLS | Datagram Transport Layer Security | UDP 443 / 5349 等 | RFC 9147 | 2022 | standard |
| TLS 1.2 | Transport Layer Security 1.2 | TCP 443（HTTPS） | RFC 5246 | 2008 | standard |
| TLS 1.3 | Transport Layer Security 1.3 | TCP 443（HTTPS） | RFC 8446 | 2018 | core |

## 第 7 层 · 应用层（81 个）

| 协议 | 全称 | 端口/标识 | RFC/标准 | 年份 | 深度 |
|---|---|---|---|---|---|
| AMQP | Advanced Message Queuing Protocol | TCP 5672 / 5671 | — | 2006 | standard |
| BACnet | Building Automation and Control Networks | UDP 47808 | ANSI/ASHRAE 135 | 1995 | standard |
| BitTorrent | BitTorrent Protocol | TCP/UDP 6881-6889（常见） | — | 2001 | standard |
| CoAP | Constrained Application Protocol | UDP 5683 / 5684 | RFC 7252 | 2014 | standard |
| DHCPv4 | Dynamic Host Configuration Protocol v4 | UDP 67 / 68 | RFC 2131 | 1997 | core |
| DHCPv6 | Dynamic Host Configuration Protocol v6 | UDP 546 / 547 | RFC 8415 | 2018 | standard |
| DNP3 | Distributed Network Protocol 3 | TCP/UDP 20000 | IEEE 1815 | 1993 | standard |
| DNS | Domain Name System | UDP/TCP 53 | RFC 1035 | 1987 | core |
| DNSSEC | DNS Security Extensions | UDP/TCP 53 | RFC 4033 | 2005 | standard |
| Diameter | Diameter Base Protocol | TCP/SCTP 3868 | RFC 6733 | 2012 | standard |
| DoH | DNS over HTTPS | TCP 443 | RFC 8484 | 2018 | standard |
| DoQ | DNS over QUIC | UDP 853 | RFC 9250 | 2022 | standard |
| DoT | DNS over TLS | TCP 853 | RFC 7858 | 2016 | standard |
| FTP | File Transfer Protocol | TCP 21（控制）/ 20（主动数据） | RFC 959 | 1985 | core |
| FTPS | FTP over TLS | TCP 990 / 21 | RFC 4217 | 2005 | standard |
| Gopher | Gopher Protocol | TCP 70 | RFC 1436 | 1993 | standard |
| GraphQL | GraphQL Query Language | TCP 443（HTTPS 常见） | — | 2015 | standard |
| HLS | HTTP Live Streaming | TCP 80 / 443 | RFC 8216 | 2017 | standard |
| HTTP/1.1 | HyperText Transfer Protocol 1.1 | TCP 80 | RFC 9112 | 2022 | core |
| HTTP/2 | HyperText Transfer Protocol Version 2 | TCP 443（h2） | RFC 9113 | 2022 | core |
| HTTP/3 | HyperText Transfer Protocol Version 3 | UDP 443 | RFC 9114 | 2022 | core |
| HTTPS | HTTP over TLS | TCP 443 | RFC 9110 | 2022 | standard |
| ICE | Interactive Connectivity Establishment | — | RFC 8445 | 2018 | standard |
| IMAP | Internet Message Access Protocol | TCP 143 / 993 | RFC 9051 | 2021 | standard |
| IPFS / libp2p | InterPlanetary File System / libp2p | TCP 4001（libp2p 常见） | — | 2015 | standard |
| IRC | Internet Relay Chat | TCP 6667 / 6697 | RFC 2812 | 2000 | standard |
| KNX | KNX Building Automation | UDP 3671（KNXnet/IP） | ISO/IEC 14543 | 1990 | standard |
| Kafka Protocol | Apache Kafka Wire Protocol | TCP 9092 | — | 2011 | standard |
| Kerberos | Kerberos Network Authentication Protocol | TCP/UDP 88 | RFC 4120 | 2005 | standard |
| LDAP | Lightweight Directory Access Protocol | TCP 389 / 636 | RFC 4511 | 2006 | standard |
| LLMNR | Link-Local Multicast Name Resolution | UDP 5355 | RFC 4795 | 2007 | standard |
| MQTT | Message Queuing Telemetry Transport | TCP 1883 / 8883 | — | 2014 | core |
| Matter | Matter over IP (CSA) | — | — | 2022 | standard |
| Memcached Protocol | Memcached Text/Binary Protocol | TCP/UDP 11211 | — | 2003 | standard |
| Modbus TCP | Modbus Messaging on TCP/IP | TCP 502 | — | 1999 | standard |
| NETCONF | Network Configuration Protocol | TCP 830 | RFC 6241 | 2011 | standard |
| NFS | Network File System | TCP/UDP 2049 | RFC 7530 | 2015 | standard |
| NNTP | Network News Transfer Protocol | TCP 119 / 563 | RFC 3977 | 2006 | standard |
| NTP | Network Time Protocol | UDP 123 | RFC 5905 | 2010 | core |
| NetFlow / IPFIX | NetFlow v9 / IP Flow Information Export | UDP 2055（常见） | RFC 7011 | 2013 | standard |
| OAuth 2.0 | OAuth 2.0 Authorization Framework | TCP 443（HTTPS） | RFC 6749 | 2012 | standard |
| OPC UA | OPC Unified Architecture | TCP 4840 | IEC 62541 | 2008 | standard |
| OpenID Connect | OpenID Connect Core 1.0 | TCP 443（HTTPS） | — | 2014 | standard |
| POP3 | Post Office Protocol 3 | TCP 110 / 995 | RFC 1939 | 1996 | standard |
| PROFINET | Process Field Network | — | — | 2003 | standard |
| PTP | Precision Time Protocol (IEEE 1588) | UDP 319 / 320 | IEEE 1588 | 2008 | standard |
| RADIUS | Remote Authentication Dial-In User Service | UDP 1812 / 1813 | RFC 2865 | 2000 | standard |
| RDAP | Registration Data Access Protocol | TCP 443 | RFC 9082 | 2021 | standard |
| REST | Representational State Transfer | TCP 80 / 443 | — | 2000 | standard |
| RESTCONF | RESTCONF Protocol | TCP 443（HTTPS） | RFC 8040 | 2017 | standard |
| RTCP | RTP Control Protocol | UDP（RTP 端口+1 常见） | RFC 3550 | 2003 | standard |
| RTMP | Real-Time Messaging Protocol | TCP 1935 | — | 2005 | standard |
| RTP | Real-time Transport Protocol | UDP（动态端口） | RFC 3550 | 2003 | core |
| RTSP | Real Time Streaming Protocol | TCP 554 | RFC 7826 | 2016 | standard |
| Redis RESP | Redis Serialization Protocol | TCP 6379 | — | 2009 | standard |
| SAML | Security Assertion Markup Language 2.0 | TCP 443（HTTPS） | — | 2005 | standard |
| SDP | Session Description Protocol | — | RFC 8866 | 2021 | standard |
| SFTP | SSH File Transfer Protocol | TCP 22 | — | 2001 | standard |
| SIP | Session Initiation Protocol | UDP/TCP 5060 / 5061 | RFC 3261 | 2002 | core |
| SMB | Server Message Block | TCP 445 | — | 1983 | standard |
| SMTP | Simple Mail Transfer Protocol | TCP 25 / 587 / 465 | RFC 5321 | 2008 | core |
| SNMP | Simple Network Management Protocol | UDP 161 / 162 | RFC 3411 | 2002 | core |
| SNMP Trap / Inform | SNMP Notification | UDP 162 | RFC 3413 | 2002 | standard |
| SOAP | Simple Object Access Protocol | TCP 80 / 443 | — | 2003 | standard |
| SRT | Secure Reliable Transport | UDP 9000（常见） | — | 2017 | standard |
| SSH | Secure Shell Protocol | TCP 22 | RFC 4253 | 2006 | core |
| STOMP | Simple Text Oriented Messaging Protocol | TCP 61613（常见） | — | 2011 | standard |
| STUN | Session Traversal Utilities for NAT | UDP/TCP 3478 | RFC 8489 | 2020 | standard |
| Syslog | Syslog Protocol | UDP/TCP 514 | RFC 5424 | 2009 | standard |
| TACACS+ | Terminal Access Controller Access-Control System Plus | TCP 49 | RFC 8907 | 2020 | standard |
| TFTP | Trivial File Transfer Protocol | UDP 69 | RFC 1350 | 1992 | standard |
| TURN | Traversal Using Relays around NAT | UDP/TCP 3478 | RFC 8656 | 2020 | standard |
| Telnet | Telnet Protocol | TCP 23 | RFC 854 | 1983 | standard |
| WHOIS | WHOIS Protocol | TCP 43 | RFC 3912 | 2004 | standard |
| WebRTC | Web Real-Time Communication | UDP（动态） | RFC 8825 | 2021 | standard |
| WebSocket | The WebSocket Protocol | TCP 80 / 443 | RFC 6455 | 2011 | core |
| XMPP | Extensible Messaging and Presence Protocol | TCP 5222 / 5269 | RFC 6120 | 2011 | standard |
| gNMI | gRPC Network Management Interface | TCP 57400（常见部署） | — | 2016 | standard |
| gRPC | gRPC over HTTP/2 + Protobuf | TCP 443（常见） | — | 2016 | standard |
| iSCSI | Internet Small Computer Systems Interface | TCP 3260 | RFC 7143 | 2014 | standard |
| mDNS | Multicast DNS | UDP 5353 | RFC 6762 | 2013 | standard |
