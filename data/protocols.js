window.PROTOCOLS = [
  {
    "slug": "ethernet-phy",
    "name": "Ethernet PHY",
    "fullName": "Ethernet Physical Layer",
    "layer": 1,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "IEEE 802.3",
    "year": 1973,
    "summary": "以太网物理层，定义双绞线/光纤上的编码、速率与协商。",
    "keywords": "phy,双绞线,光纤,自协商",
    "depth": "standard"
  },
  {
    "slug": "wifi",
    "name": "Wi-Fi",
    "fullName": "Wireless LAN (IEEE 802.11)",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "IEEE 802.11",
    "year": 1997,
    "summary": "无线局域网标准族，定义空口接入、关联、加密与漫游，是家庭与企业无线接入的主力。",
    "keywords": "802.11,wlan,wireless,无线",
    "depth": "core",
    "headerFields": [
      [
        "Frame Control",
        "16 bit",
        "帧类型：管理/控制/数据"
      ],
      [
        "Duration",
        "16 bit",
        "信道占用时长（NAV）"
      ],
      [
        "地址字段",
        "48 bit × 多个",
        "RA/TA/BSSID/DA 随帧类型变化"
      ],
      [
        "QoS Control",
        "16 bit",
        "802.11e 优先级（数据帧）"
      ]
    ],
    "flow": [
      "扫描 Beacon/Probe",
      "认证（Open/SAE 等）",
      "关联/重关联",
      "四次握手（WPA2）派生 PTK 后加密通信"
    ],
    "wiresharkFilter": "wlan",
    "example": "手机连 AP：Probe→Auth→Assoc→EAPOL 四次握手→DHCP",
    "pitfalls": [
      "信道干扰与同频冲突",
      "漫游粘性终端不切换 AP"
    ]
  },
  {
    "slug": "bluetooth",
    "name": "Bluetooth / BLE",
    "fullName": "Bluetooth & Bluetooth Low Energy",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "Bluetooth Core 5.x",
    "year": 1999,
    "summary": "短距无线协议，经典蓝牙与低功耗 BLE 广泛用于耳机、穿戴与物联网设备。",
    "keywords": "ble,蓝牙,低功耗,短距",
    "depth": "standard"
  },
  {
    "slug": "nr-5g",
    "name": "5G NR",
    "fullName": "5G New Radio (3GPP TS 38.300)",
    "layer": 1,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "3GPP TS 38.300",
    "year": 2019,
    "summary": "5G 空口协议，支持 eMBB、URLLC 与大规模机器通信，切片与毫米波是其标志。",
    "keywords": "5g,nr,蜂窝,切片",
    "depth": "standard"
  },
  {
    "slug": "lte-4g",
    "name": "4G LTE",
    "fullName": "Long Term Evolution (3GPP TS 36.300)",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "3GPP TS 36.300",
    "year": 2009,
    "summary": "4G 蜂窝接入技术，全 IP 扁平架构，长期主导移动宽带。",
    "keywords": "lte,4g,蜂窝,移动",
    "depth": "standard"
  },
  {
    "slug": "lora",
    "name": "LoRa / LoRaWAN",
    "fullName": "Long Range Wide Area Network",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "UDP 1700（网关常见）",
    "rfc": "LoRaWAN L2 Spec",
    "year": 2015,
    "summary": "低功耗广域物联网协议，公里级覆盖、低速率，适合传感上报。",
    "keywords": "lorawan,iot,低功耗,广域",
    "depth": "standard"
  },
  {
    "slug": "zigbee",
    "name": "Zigbee",
    "fullName": "Zigbee PRO over IEEE 802.15.4",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "IEEE 802.15.4 / Zigbee PRO",
    "year": 2004,
    "summary": "低功耗网状物联网协议，常用于智能家居灯光、传感与控制。",
    "keywords": "zigbee,802.15.4,mesh,智能家居",
    "depth": "standard"
  },
  {
    "slug": "thread",
    "name": "Thread",
    "fullName": "Thread Network Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "Thread 1.3 Spec",
    "year": 2015,
    "summary": "基于 IPv6/6LoWPAN 的低功耗网状协议，是 Matter 的底层网络之一。",
    "keywords": "thread,6lowpan,matter,mesh",
    "depth": "standard"
  },
  {
    "slug": "dsl",
    "name": "DSL",
    "fullName": "Digital Subscriber Line",
    "layer": 1,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "ITU-T G.992.x",
    "year": 1999,
    "summary": "利用电话铜线提供宽带接入的调制技术族，含 ADSL/VDSL/G.fast。",
    "keywords": "dsl,adsl,vdsl,铜线",
    "depth": "standard"
  },
  {
    "slug": "sonet-sdh",
    "name": "SONET / SDH",
    "fullName": "Synchronous Optical Networking / Synchronous Digital Hierarchy",
    "layer": 1,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "ITU-T G.707",
    "year": 1988,
    "summary": "同步光传输体系，曾是骨干光网络的主流复用与保护标准。",
    "keywords": "sonet,sdh,光传输,骨干",
    "depth": "standard"
  },
  {
    "slug": "gpon",
    "name": "GPON",
    "fullName": "Gigabit Passive Optical Network",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "ITU-T G.984",
    "year": 2003,
    "summary": "无源光网络接入技术，光纤到户 FTTH 的主流方案之一。",
    "keywords": "gpon,ftth,光纤到户,olt,onu",
    "depth": "standard"
  },
  {
    "slug": "docsis",
    "name": "DOCSIS",
    "fullName": "Data Over Cable Service Interface Specification",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "DOCSIS 3.1",
    "year": 1997,
    "summary": "同轴电缆宽带接入标准，用于有线电视网络提供互联网接入。",
    "keywords": "docsis,同轴,有线宽带",
    "depth": "standard"
  },
  {
    "slug": "usb",
    "name": "USB",
    "fullName": "Universal Serial Bus",
    "layer": 1,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "USB 3.2 / USB4",
    "year": 1996,
    "summary": "通用串行总线，定义主机与外设的物理连接、枚举与传输。",
    "keywords": "usb,外设,串行总线",
    "depth": "standard"
  },
  {
    "slug": "fibre-channel",
    "name": "Fibre Channel",
    "fullName": "Fibre Channel",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "INCITS FC-PH",
    "year": 1994,
    "summary": "存储区域网络的高速传输协议，常用于 SAN 光纤存储。",
    "keywords": "fc,san,存储网络",
    "depth": "standard"
  },
  {
    "slug": "ethernet",
    "name": "Ethernet II",
    "fullName": "Ethernet II Framing",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "IEEE 802.3",
    "year": 1982,
    "summary": "最主流的局域网帧格式，以 MAC 地址转发，是几乎所有有线网络的基石。",
    "keywords": "ethernet,mac,帧,lan,二层",
    "depth": "core",
    "headerFields": [
      [
        "目的 MAC",
        "48 bit",
        "接收方硬件地址"
      ],
      [
        "源 MAC",
        "48 bit",
        "发送方硬件地址"
      ],
      [
        "EtherType",
        "16 bit",
        "上层协议类型，如 0x0800=IPv4"
      ],
      [
        "FCS",
        "32 bit",
        "帧校验序列 CRC"
      ]
    ],
    "flow": [
      "网卡封装上层数据为帧",
      "交换机按 MAC 表转发/泛洪",
      "目的网卡校验 FCS 后上交"
    ],
    "wiresharkFilter": "eth",
    "example": "dst aa:bb:.. src 00:11:.. type 0x0800 → IPv4 报文",
    "pitfalls": [
      "MAC 表老化导致泛洪",
      "双工不匹配引发大量 CRC 错误"
    ]
  },
  {
    "slug": "vlan",
    "name": "VLAN",
    "fullName": "IEEE 802.1Q Virtual LAN",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "IEEE 802.1Q",
    "year": 1998,
    "summary": "在以太网帧中插入 4 字节标签划分虚拟局域网，实现二层隔离与 Trunk 汇聚。",
    "keywords": "vlan,802.1q,trunk,隔离",
    "depth": "core",
    "headerFields": [
      [
        "TPID",
        "16 bit",
        "固定 0x8100 标识 802.1Q 标签"
      ],
      [
        "PCP",
        "3 bit",
        "优先级（CoS）"
      ],
      [
        "DEI",
        "1 bit",
        "丢弃合格指示"
      ],
      [
        "VID",
        "12 bit",
        "VLAN ID，1-4094 可用"
      ]
    ],
    "flow": [
      "接入端口为帧打 PVID 标签",
      "Trunk 口携带标签跨交换机",
      "对端按 VID 转发并剥标签"
    ],
    "wiresharkFilter": "vlan",
    "example": "Trunk 抓包可见 vlan.id=10/20 的两类帧同链路复用",
    "pitfalls": [
      "Native VLAN 不一致导致串 VLAN",
      "Trunk 未放行新 VLAN 是最常见不通原因"
    ]
  },
  {
    "slug": "qinq",
    "name": "QinQ",
    "fullName": "IEEE 802.1ad Provider Bridging",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "IEEE 802.1ad",
    "year": 2006,
    "summary": "双层 VLAN 标签（运营商桥接），扩展 VLAN 数量并隔离客户网络。",
    "keywords": "qinq,802.1ad,双层标签",
    "depth": "standard"
  },
  {
    "slug": "stp",
    "name": "STP",
    "fullName": "Spanning Tree Protocol (IEEE 802.1D)",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "IEEE 802.1D",
    "year": 1990,
    "summary": "生成树协议，通过阻塞冗余端口消除二层环路。",
    "keywords": "stp,生成树,防环,bpdu",
    "depth": "core",
    "headerFields": [
      [
        "协议 ID",
        "16 bit",
        "固定 0"
      ],
      [
        "版本",
        "8 bit",
        "STP=0，RSTP=2"
      ],
      [
        "BPDU 类型",
        "8 bit",
        "配置/拓扑变更"
      ],
      [
        "Root ID",
        "64 bit",
        "根桥优先级+MAC"
      ],
      [
        "Root Path Cost",
        "32 bit",
        "到根桥的累计开销"
      ]
    ],
    "flow": [
      "选举根桥（最小 Bridge ID）",
      "每桥选根端口",
      "每网段选指定端口",
      "其余端口阻塞防环"
    ],
    "wiresharkFilter": "stp",
    "example": "交换机互联成环时抓到周期 Configuration BPDU",
    "pitfalls": [
      "收敛慢（STP 30-50s）",
      "BPDU 保护缺失可被伪造根桥攻击"
    ]
  },
  {
    "slug": "rstp",
    "name": "RSTP",
    "fullName": "Rapid Spanning Tree Protocol",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "IEEE 802.1w",
    "year": 2001,
    "summary": "快速生成树，收敛从几十秒缩短到秒级，是 STP 的演进。",
    "keywords": "rstp,快速生成树,收敛",
    "depth": "standard"
  },
  {
    "slug": "mstp",
    "name": "MSTP",
    "fullName": "Multiple Spanning Tree Protocol",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "IEEE 802.1s",
    "year": 2002,
    "summary": "多生成树，把多个 VLAN 映射到不同生成树实例实现负载分担。",
    "keywords": "mstp,多生成树,vlan负载",
    "depth": "standard"
  },
  {
    "slug": "lacp",
    "name": "LACP",
    "fullName": "Link Aggregation Control Protocol",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "IEEE 802.1AX",
    "year": 2000,
    "summary": "链路聚合控制协议，把多条物理链路捆成一条逻辑链路提升带宽与冗余。",
    "keywords": "lacp,聚合,bonding,802.3ad",
    "depth": "standard"
  },
  {
    "slug": "lldp",
    "name": "LLDP",
    "fullName": "Link Layer Discovery Protocol",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "IEEE 802.1AB",
    "year": 2005,
    "summary": "链路层发现协议，邻居设备互通告身份、端口与能力，便于拓扑发现。",
    "keywords": "lldp,邻居发现,拓扑",
    "depth": "standard"
  },
  {
    "slug": "cdp",
    "name": "CDP",
    "fullName": "Cisco Discovery Protocol",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "",
    "year": 1994,
    "summary": "思科私有邻居发现协议，在思科设备间通告设备与接口信息。",
    "keywords": "cdp,cisco,邻居发现",
    "depth": "standard"
  },
  {
    "slug": "ppp",
    "name": "PPP",
    "fullName": "Point-to-Point Protocol",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "RFC 1661",
    "year": 1994,
    "summary": "点对点链路协议，提供封装、链路控制与网络层协商（LCP/NCP）。",
    "keywords": "ppp,拨号,点对点,lcp",
    "depth": "standard"
  },
  {
    "slug": "pppoe",
    "name": "PPPoE",
    "fullName": "PPP over Ethernet",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "RFC 2516",
    "year": 1999,
    "summary": "以太网上承载 PPP，宽带拨号接入的经典方式，MTU 降为 1492。",
    "keywords": "pppoe,宽带拨号,mtu1492",
    "depth": "standard"
  },
  {
    "slug": "hdlc",
    "name": "HDLC",
    "fullName": "High-Level Data Link Control",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "ISO/IEC 13239",
    "year": 1970,
    "summary": "面向比特的同步链路协议，是许多广域网链路封装的鼻祖。",
    "keywords": "hdlc,广域网,同步链路",
    "depth": "standard"
  },
  {
    "slug": "mpls",
    "name": "MPLS",
    "fullName": "Multiprotocol Label Switching",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "RFC 3031",
    "year": 2001,
    "summary": "多协议标签交换，用短标签转发代替最长前缀查找，支撑 VPN 与流量工程。",
    "keywords": "mpls,标签,vpn,流量工程",
    "depth": "core",
    "headerFields": [
      [
        "Label",
        "20 bit",
        "标签值，本地意义"
      ],
      [
        "TC/EXP",
        "3 bit",
        "流量类别/QoS"
      ],
      [
        "S",
        "1 bit",
        "栈底标志"
      ],
      [
        "TTL",
        "8 bit",
        "生存时间，防环"
      ]
    ],
    "flow": [
      "LER 为报文压入标签（Push）",
      "LSR 按标签交换转发（Swap）",
      "出口 LER 弹出标签（Pop/PHP）"
    ],
    "wiresharkFilter": "mpls",
    "example": "运营商 PE 间报文带 label 100/200 的两层标签跑 L3VPN",
    "pitfalls": [
      "标签仅本地有效，勿跨设备套用",
      "MTU 需预留标签开销"
    ]
  },
  {
    "slug": "vxlan",
    "name": "VXLAN",
    "fullName": "Virtual Extensible LAN",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "UDP 4789",
    "rfc": "RFC 7348",
    "year": 2014,
    "summary": "用 UDP 封装二层帧跨三层扩展虚拟网络，数据中心多租户的核心隧道。",
    "keywords": "vxlan,隧道,数据中心,vtep",
    "depth": "core",
    "headerFields": [
      [
        "Flags",
        "8 bit",
        "I 位标识 VNI 有效"
      ],
      [
        "VNI",
        "24 bit",
        "虚拟网络标识，支持约 1600 万租户"
      ],
      [
        "外层 UDP",
        "16 bit 源/目的",
        "目的端口 4789，源端口做负载均衡哈希"
      ]
    ],
    "flow": [
      "VTEP 把二层帧封入 VXLAN+UDP+外层 IP",
      "底层三层网络按外层地址转发",
      "对端 VTEP 解封装交付目标虚机"
    ],
    "wiresharkFilter": "vxlan",
    "example": "udp.port==4789 解出内层 VM 间 ARP/TCP 流量",
    "pitfalls": [
      "外层 MTU 不足导致分片/丢包，需调大底层 MTU",
      "组播/头端复制选型影响泛洪效率"
    ]
  },
  {
    "slug": "geneve",
    "name": "Geneve",
    "fullName": "Generic Network Virtualization Encapsulation",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "UDP 6081",
    "rfc": "RFC 8926",
    "year": 2020,
    "summary": "通用网络虚拟化封装，可扩展选项字段，意在统一 VXLAN/NVGRE 等隧道。",
    "keywords": "geneve,隧道,虚拟化",
    "depth": "standard"
  },
  {
    "slug": "l2tp",
    "name": "L2TP",
    "fullName": "Layer Two Tunneling Protocol",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "UDP 1701",
    "rfc": "RFC 2661",
    "year": 1999,
    "summary": "二层隧道协议，常与 IPsec 组合提供远程接入 VPN。",
    "keywords": "l2tp,vpn,隧道",
    "depth": "standard"
  },
  {
    "slug": "pptp",
    "name": "PPTP",
    "fullName": "Point-to-Point Tunneling Protocol",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "TCP 1723",
    "rfc": "RFC 2637",
    "year": 1999,
    "summary": "早期 VPN 隧道协议，因加密弱点已基本淘汰，仅作历史了解。",
    "keywords": "pptp,vpn,已淘汰",
    "depth": "standard"
  },
  {
    "slug": "frame-relay",
    "name": "Frame Relay",
    "fullName": "Frame Relay",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "ITU-T Q.922",
    "year": 1992,
    "summary": "早年广域网虚电路技术，已被 MPLS/IP VPN 取代。",
    "keywords": "frame relay,广域网,虚电路",
    "depth": "standard"
  },
  {
    "slug": "atm",
    "name": "ATM",
    "fullName": "Asynchronous Transfer Mode",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "ITU-T I.361",
    "year": 1990,
    "summary": "53 字节定长信元交换技术，曾用于骨干与 DSL 上行，现已退场。",
    "keywords": "atm,信元,骨干",
    "depth": "standard"
  },
  {
    "slug": "trill",
    "name": "TRILL",
    "fullName": "Transparent Interconnection of Lots of Links",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "RFC 6325",
    "year": 2011,
    "summary": "用链路状态路由替代生成树的二层多路径协议。",
    "keywords": "trill,二层多路径",
    "depth": "standard"
  },
  {
    "slug": "spb",
    "name": "SPB",
    "fullName": "Shortest Path Bridging (IEEE 802.1aq)",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "IEEE 802.1aq",
    "year": 2012,
    "summary": "最短路径桥接，基于 IS-IS 的二层多路径与大规模 VLAN 扩展。",
    "keywords": "spb,802.1aq,最短路径",
    "depth": "standard"
  },
  {
    "slug": "ipv4",
    "name": "IPv4",
    "fullName": "Internet Protocol version 4",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "",
    "rfc": "RFC 791",
    "year": 1981,
    "summary": "互联网的基石网络层协议，32 位地址、尽力而为交付，至今仍承载大量流量。",
    "keywords": "ipv4,ip,地址,路由",
    "depth": "core",
    "headerFields": [
      [
        "Version",
        "4 bit",
        "固定 4"
      ],
      [
        "IHL",
        "4 bit",
        "头部长度（单位 4 字节）"
      ],
      [
        "Total Length",
        "16 bit",
        "报文总长"
      ],
      [
        "TTL",
        "8 bit",
        "每跳减 1，防环"
      ],
      [
        "Protocol",
        "8 bit",
        "6=TCP，17=UDP，1=ICMP"
      ],
      [
        "源/目的 IP",
        "32 bit ×2",
        "发送方与接收方地址"
      ],
      [
        "Header Checksum",
        "16 bit",
        "仅头部校验"
      ]
    ],
    "flow": [
      "主机查路由表定下一跳",
      "逐跳按目的 IP 最长前缀转发",
      "TTL 耗尽则回 ICMP Time Exceeded"
    ],
    "wiresharkFilter": "ip",
    "example": "ping 包：ip.src=192.168.1.2 ip.dst=8.8.8.8 proto=1",
    "pitfalls": [
      "分片后丢一片全报废",
      "NAT 改写后校验和需重算"
    ]
  },
  {
    "slug": "ipv6",
    "name": "IPv6",
    "fullName": "Internet Protocol version 6",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "",
    "rfc": "RFC 8200",
    "year": 2017,
    "summary": "128 位地址的下一代 IP，简化头部、原生扩展头与自动配置。",
    "keywords": "ipv6,128位,双栈",
    "depth": "core",
    "headerFields": [
      [
        "Version",
        "4 bit",
        "固定 6"
      ],
      [
        "Traffic Class",
        "8 bit",
        "等价 IPv4 ToS"
      ],
      [
        "Flow Label",
        "20 bit",
        "流标识"
      ],
      [
        "Payload Length",
        "16 bit",
        "载荷长度"
      ],
      [
        "Next Header",
        "8 bit",
        "下一个扩展头/上层协议"
      ],
      [
        "Hop Limit",
        "8 bit",
        "等价 TTL"
      ],
      [
        "源/目的地址",
        "128 bit ×2",
        "IPv6 地址"
      ]
    ],
    "flow": [
      "主机经 SLAAC/DHCPv6 得地址",
      "NDP 解析邻居链路地址",
      "逐跳转发，路由器不做分片"
    ],
    "wiresharkFilter": "ipv6",
    "example": "ipv6.dst 含 2001:db8::1 的 TCP 流量",
    "pitfalls": [
      "扩展头过长被中间设备丢弃",
      "双栈下 Happy Eyeballs 掩盖 v6 故障"
    ]
  },
  {
    "slug": "arp",
    "name": "ARP",
    "fullName": "Address Resolution Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "",
    "rfc": "RFC 826",
    "year": 1982,
    "summary": "把 IPv4 地址解析为 MAC 地址的协议，广播请求、单播应答、缓存表驱动。",
    "keywords": "arp,地址解析,mac,广播",
    "depth": "core",
    "headerFields": [
      [
        "硬件类型",
        "16 bit",
        "以太网=1"
      ],
      [
        "协议类型",
        "16 bit",
        "IPv4=0x0800"
      ],
      [
        "操作码",
        "16 bit",
        "1=请求，2=应答"
      ],
      [
        "发送方 MAC/IP",
        "48/32 bit",
        "请求者地址"
      ],
      [
        "目标 MAC/IP",
        "48/32 bit",
        "被解析方地址"
      ]
    ],
    "flow": [
      "查 ARP 缓存，未命中",
      "广播 ARP Request：谁是 X.X.X.X？",
      "目标单播 Reply 通告 MAC",
      "写入缓存后发帧"
    ],
    "wiresharkFilter": "arp",
    "example": "arp.opcode==1 的广播请求刷屏即可能 ARP 风暴/欺骗",
    "pitfalls": [
      "ARP 无认证，可被欺骗投毒",
      " gratuitous ARP 冲突引发地址抢占"
    ]
  },
  {
    "slug": "ndp",
    "name": "NDP",
    "fullName": "Neighbor Discovery Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "",
    "rfc": "RFC 4861",
    "year": 2007,
    "summary": "IPv6 的邻居发现协议，集 ARP、ICMP 路由发现与重定向于一体。",
    "keywords": "ndp,ipv6,邻居发现,slaac",
    "depth": "standard"
  },
  {
    "slug": "icmp",
    "name": "ICMP",
    "fullName": "Internet Control Message Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "",
    "rfc": "RFC 792",
    "year": 1981,
    "summary": "IP 的差错与控制报文协议，ping 与 traceroute 都建立在它之上。",
    "keywords": "icmp,ping,traceroute,差错",
    "depth": "core",
    "headerFields": [
      [
        "Type",
        "8 bit",
        "8=Echo 请求，0=应答，11=超时，3=不可达"
      ],
      [
        "Code",
        "8 bit",
        "类型下的细分"
      ],
      [
        "Checksum",
        "16 bit",
        "全报文校验"
      ],
      [
        "Identifier/Sequence",
        "16/16 bit",
        "ping 匹配请求应答"
      ]
    ],
    "flow": [
      "源端发送 Echo Request",
      "对端回 Echo Reply",
      "中间路由器 TTL 超时回 Type 11（traceroute 原理）"
    ],
    "wiresharkFilter": "icmp",
    "example": "icmp.type==8 看 ping 请求序列",
    "pitfalls": [
      "全关 ICMP 会断 PMTUD 造成大包黑洞",
      "ICMP 重定向可被滥用"
    ]
  },
  {
    "slug": "icmpv6",
    "name": "ICMPv6",
    "fullName": "ICMP for IPv6",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "",
    "rfc": "RFC 4443",
    "year": 2006,
    "summary": "IPv6 的控制报文协议，同时承载 NDP、MLD 等关键功能。",
    "keywords": "icmpv6,ipv6,ping6",
    "depth": "standard"
  },
  {
    "slug": "igmp",
    "name": "IGMP",
    "fullName": "Internet Group Management Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "",
    "rfc": "RFC 3376",
    "year": 2002,
    "summary": "主机向路由器报告组播成员关系的协议（IGMPv3 支持源过滤）。",
    "keywords": "igmp,组播,multicast",
    "depth": "standard"
  },
  {
    "slug": "nat",
    "name": "NAT",
    "fullName": "Network Address Translation",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "",
    "rfc": "RFC 3022",
    "year": 2001,
    "summary": "网络地址转换，改写 IP/端口实现私网共享公网地址（NAPT 最常见）。",
    "keywords": "nat,napt,地址转换,私网",
    "depth": "core",
    "headerFields": [
      [
        "映射表项",
        "—",
        "内网 IP:端口 ↔ 公网 IP:端口 ↔ 对端"
      ],
      [
        "转换方向",
        "—",
        "出站改源（SNAT），入站改目的（DNAT）"
      ]
    ],
    "flow": [
      "私网主机出包，NAT 改源地址/端口并记表",
      "回包按映射表反向改写目的",
      "超时回收映射项"
    ],
    "wiresharkFilter": "ip.addr==<公网IP>（内外对比抓包）",
    "example": "192.168.1.5:51000 出 WAN 变为 203.0.113.1:62001",
    "pitfalls": [
      "NAT 破坏端到端，FTP/SIP 需 ALG 或主动模式适配",
      "对称 NAT 让 P2P 打洞失败"
    ]
  },
  {
    "slug": "ipsec",
    "name": "IPsec",
    "fullName": "Internet Protocol Security (AH/ESP)",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "安全/会话",
    "ports": "",
    "rfc": "RFC 4301",
    "year": 2005,
    "summary": "网络层安全协议族，AH 提供完整性、ESP 提供加密与完整性，站点间 VPN 的基石。",
    "keywords": "ipsec,esp,ah,vpn,加密",
    "depth": "core",
    "headerFields": [
      [
        "SPI",
        "32 bit",
        "安全参数索引，标识 SA"
      ],
      [
        "Sequence Number",
        "32 bit",
        "抗重放序号"
      ],
      [
        "ESP ICV",
        "变长",
        "完整性校验值"
      ],
      [
        "ESP 加密载荷",
        "变长",
        "加密的原始 IP 报文（隧道模式）"
      ]
    ],
    "flow": [
      "IKE 协商建立 SA",
      "ESP 隧道模式加密整包并加外层 IP 头",
      "对端验 ICV、解密、抗重放检查"
    ],
    "wiresharkFilter": "esp 或 udp.port==500/4500",
    "example": "站点间流量在公网只能看到 ESP 密文与 SPI",
    "pitfalls": [
      "MTU/MSS 未调导致分片与丢包",
      "NAT 环境须开 NAT-T（UDP 4500）"
    ]
  },
  {
    "slug": "ikev2",
    "name": "IKEv2",
    "fullName": "Internet Key Exchange version 2",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "安全/会话",
    "ports": "UDP 500 / 4500",
    "rfc": "RFC 7296",
    "year": 2014,
    "summary": "IPsec 的密钥协商协议，负责 SA 建立、身份认证与 NAT 穿越。",
    "keywords": "ikev2,ipsec,密钥交换,vpn",
    "depth": "standard"
  },
  {
    "slug": "gre",
    "name": "GRE",
    "fullName": "Generic Routing Encapsulation",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "IP 协议号 47",
    "rfc": "RFC 2784",
    "year": 2000,
    "summary": "通用路由封装，把一种协议装进另一种协议里做隧道，简单但不加密。",
    "keywords": "gre,隧道,封装",
    "depth": "standard"
  },
  {
    "slug": "ospf",
    "name": "OSPF",
    "fullName": "Open Shortest Path First (v2/v3)",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "IP 协议号 89",
    "rfc": "RFC 2328 / RFC 5340",
    "year": 1998,
    "summary": "链路状态内部网关协议，以 Dijkstra 计算最短路径，企业与运营商内网主流 IGP。",
    "keywords": "ospf,链路状态,igp,区域",
    "depth": "core",
    "headerFields": [
      [
        "Version",
        "8 bit",
        "OSPFv2=2"
      ],
      [
        "Type",
        "8 bit",
        "1=Hello 2=DBD 3=LSR 4=LSU 5=LSAck"
      ],
      [
        "Router ID",
        "32 bit",
        "路由器标识"
      ],
      [
        "Area ID",
        "32 bit",
        "区域号，骨干为 0"
      ]
    ],
    "flow": [
      "Hello 发现并维持邻居",
      "交换 DBD/LSR/LSU 同步链路状态库",
      "Dijkstra 计算最短路径树并装表"
    ],
    "wiresharkFilter": "ospf",
    "example": "ospf.type==1 的 Hello 包含邻居列表与 DR/BDR",
    "pitfalls": [
      "区域/网络类型不匹配邻居起不来",
      "MTU 不一致卡在 ExStart"
    ]
  },
  {
    "slug": "bgp",
    "name": "BGP-4",
    "fullName": "Border Gateway Protocol version 4",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "TCP 179",
    "rfc": "RFC 4271",
    "year": 2006,
    "summary": "互联网自治系统间的路径向量协议，是全球路由表的缔造者。",
    "keywords": "bgp,as,互联网路由,路径向量",
    "depth": "core",
    "headerFields": [
      [
        "Marker",
        "128 bit",
        "全 1，同步与认证占位"
      ],
      [
        "Length",
        "16 bit",
        "消息总长"
      ],
      [
        "Type",
        "8 bit",
        "1=OPEN 2=UPDATE 3=NOTIFICATION 4=KEEPALIVE"
      ],
      [
        "AS_PATH（UPDATE 属性）",
        "变长",
        "途经 AS 列表，防环与选路"
      ]
    ],
    "flow": [
      "TCP 179 建连",
      "OPEN 交换版本/AS/能力",
      "UPDATE 通告/撤销前缀",
      "KEEPALIVE 保活，策略选最优路径装表"
    ],
    "wiresharkFilter": "bgp",
    "example": "bgp.type==2 的 UPDATE 携带 NLRI 与 AS_PATH",
    "pitfalls": [
      "选路是策略而非最短：LocalPref>AS_PATH>MED...",
      "路由反射/联盟配置错误引发环路或黑洞"
    ]
  },
  {
    "slug": "rip",
    "name": "RIP / RIPng",
    "fullName": "Routing Information Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "UDP 520 / 521",
    "rfc": "RFC 1058 / RFC 2080",
    "year": 1988,
    "summary": "距离向量路由协议，以跳数为度量、上限 15 跳，仅适合小型网络。",
    "keywords": "rip,距离向量,跳数",
    "depth": "standard"
  },
  {
    "slug": "eigrp",
    "name": "EIGRP",
    "fullName": "Enhanced Interior Gateway Routing Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "IP 协议号 88",
    "rfc": "RFC 7868",
    "year": 2016,
    "summary": "思科起源的高级距离向量协议，收敛快、度量复合，曾为专有后已公开。",
    "keywords": "eigrp,cisco,dual",
    "depth": "standard"
  },
  {
    "slug": "isis",
    "name": "IS-IS",
    "fullName": "Intermediate System to Intermediate System",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "",
    "rfc": "ISO/IEC 10589",
    "year": 1990,
    "summary": "链路状态 IGP，运营商骨干常用，可扩展性与稳定性著称。",
    "keywords": "isis,链路状态,运营商,igp",
    "depth": "standard"
  },
  {
    "slug": "pim",
    "name": "PIM",
    "fullName": "Protocol Independent Multicast",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "IP 协议号 103",
    "rfc": "RFC 7761",
    "year": 2016,
    "summary": "与单播路由无关的组播路由协议，PIM-SM 是组播部署主流。",
    "keywords": "pim,组播,multicast",
    "depth": "standard"
  },
  {
    "slug": "vrrp",
    "name": "VRRP",
    "fullName": "Virtual Router Redundancy Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "IP 协议号 112",
    "rfc": "RFC 5798",
    "year": 2010,
    "summary": "虚拟路由冗余协议，多台路由器共用虚拟网关 IP 实现网关高可用。",
    "keywords": "vrrp,网关冗余,高可用",
    "depth": "standard"
  },
  {
    "slug": "hsrp",
    "name": "HSRP",
    "fullName": "Hot Standby Router Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "UDP 1985",
    "rfc": "RFC 2281",
    "year": 1998,
    "summary": "思科私有的网关冗余协议，功能与 VRRP 对应。",
    "keywords": "hsrp,cisco,网关冗余",
    "depth": "standard"
  },
  {
    "slug": "bfd",
    "name": "BFD",
    "fullName": "Bidirectional Forwarding Detection",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "UDP 3784",
    "rfc": "RFC 5880",
    "year": 2010,
    "summary": "双向转发检测，毫秒级链路/邻居故障检测，为路由协议加速收敛。",
    "keywords": "bfd,故障检测,收敛",
    "depth": "standard"
  },
  {
    "slug": "slaac",
    "name": "SLAAC",
    "fullName": "Stateless Address Autoconfiguration",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "",
    "rfc": "RFC 4862",
    "year": 2007,
    "summary": "IPv6 无状态地址自动配置，主机依路由器通告前缀自行生成地址。",
    "keywords": "slaac,ipv6,自动配置",
    "depth": "standard"
  },
  {
    "slug": "wireguard",
    "name": "WireGuard",
    "fullName": "WireGuard Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "安全/会话",
    "ports": "UDP 51820（默认）",
    "rfc": "",
    "year": 2020,
    "summary": "极简现代 VPN 协议，代码量小、性能高、密码学固定套件，已合入 Linux 内核。",
    "keywords": "wireguard,vpn,现代,内核",
    "depth": "core",
    "headerFields": [
      [
        "Message Type",
        "8 bit",
        "1=握手发起 2=响应 3=Cookie 4=数据"
      ],
      [
        "Receiver Index",
        "32 bit",
        "会话索引"
      ],
      [
        "加密载荷",
        "变长",
        "ChaCha20-Poly1305 加密的 IP 包"
      ]
    ],
    "flow": [
      "发起方用静态/临时密钥做 Noise 握手",
      "1-RTT 内建立会话密钥",
      "数据包以隧道内 IP 直接加密转发"
    ],
    "wiresharkFilter": "wireguard",
    "example": "udp.port==51820 且 wg.type==1 的握手包",
    "pitfalls": [
      "UDP 被封则全断，无 TCP 兜底",
      "AllowedIPs 配置即路由，写错就黑洞"
    ]
  },
  {
    "slug": "lisp",
    "name": "LISP",
    "fullName": "Locator/ID Separation Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "UDP 4341",
    "rfc": "RFC 9300",
    "year": 2022,
    "summary": "位置与身份分离协议，用映射系统解耦终端身份与路由位置。",
    "keywords": "lisp,位置分离,映射",
    "depth": "standard"
  },
  {
    "slug": "segment-routing",
    "name": "Segment Routing",
    "fullName": "Segment Routing (SR-MPLS / SRv6)",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "",
    "rfc": "RFC 8402",
    "year": 2018,
    "summary": "段路由，源节点指定路径段列表，简化流量工程控制面。",
    "keywords": "sr,srv6,sr-mpls,流量工程",
    "depth": "standard"
  },
  {
    "slug": "babel",
    "name": "Babel",
    "fullName": "The Babel Routing Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "UDP 6696",
    "rfc": "RFC 8966",
    "year": 2021,
    "summary": "网状与无线网络友好的距离向量路由协议，用于自组织网络。",
    "keywords": "babel,mesh,自组织",
    "depth": "standard"
  },
  {
    "slug": "rsvp",
    "name": "RSVP",
    "fullName": "Resource Reservation Protocol",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "IP 协议号 46",
    "rfc": "RFC 2205",
    "year": 1997,
    "summary": "资源预留协议，为流预留带宽，曾是 IntServ QoS 的信令。",
    "keywords": "rsvp,qos,资源预留",
    "depth": "standard"
  },
  {
    "slug": "sixlowpan",
    "name": "6LoWPAN",
    "fullName": "IPv6 over Low-Power Wireless Personal Area Networks",
    "layer": 3,
    "tcpipLayer": "网络层",
    "category": "网络/路由",
    "ports": "",
    "rfc": "RFC 4944",
    "year": 2007,
    "summary": "让 IPv6 跑在低功耗小帧链路上的适配层，含头部压缩与分片。",
    "keywords": "6lowpan,ipv6,iot,压缩",
    "depth": "standard"
  },
  {
    "slug": "tcp",
    "name": "TCP",
    "fullName": "Transmission Control Protocol",
    "layer": 4,
    "tcpipLayer": "传输层",
    "category": "传输",
    "ports": "",
    "rfc": "RFC 9293",
    "year": 2022,
    "summary": "面向连接、可靠有序的字节流协议，三次握手建连、四次挥手断连，拥塞与流量控制俱全。",
    "keywords": "tcp,可靠,握手,拥塞控制",
    "depth": "core",
    "headerFields": [
      [
        "源/目的端口",
        "16 bit ×2",
        "应用进程标识"
      ],
      [
        "Sequence Number",
        "32 bit",
        "字节流序号"
      ],
      [
        "Acknowledgment",
        "32 bit",
        "期望收到的下一字节"
      ],
      [
        "Data Offset",
        "4 bit",
        "头部长度"
      ],
      [
        "Flags",
        "9 bit",
        "SYN/ACK/FIN/RST/PSH/URG 等"
      ],
      [
        "Window",
        "16 bit",
        "接收窗口（流量控制）"
      ],
      [
        "Checksum",
        "16 bit",
        "伪头部+头部+数据校验"
      ]
    ],
    "flow": [
      "三次握手：SYN → SYN+ACK → ACK",
      "数据传输：序号确认+滑动窗口+拥塞控制",
      "四次挥手：FIN/ACK ×2 方向独立关闭"
    ],
    "wiresharkFilter": "tcp",
    "example": "tcp.flags.syn==1 && tcp.flags.ack==0 找建连首包",
    "pitfalls": [
      "队头阻塞与粘包是应用层问题",
      "TIME_WAIT 堆积多见于短连接服务端主动关闭"
    ]
  },
  {
    "slug": "udp",
    "name": "UDP",
    "fullName": "User Datagram Protocol",
    "layer": 4,
    "tcpipLayer": "传输层",
    "category": "传输",
    "ports": "",
    "rfc": "RFC 768",
    "year": 1980,
    "summary": "无连接、尽力而为的数据报协议，头部仅 8 字节，DNS/QUIC/音视频的底座。",
    "keywords": "udp,数据报,无连接,低延迟",
    "depth": "core",
    "headerFields": [
      [
        "源端口",
        "16 bit",
        "可选，0 表示不用"
      ],
      [
        "目的端口",
        "16 bit",
        "目标应用"
      ],
      [
        "Length",
        "16 bit",
        "头部+数据总长"
      ],
      [
        "Checksum",
        "16 bit",
        "IPv4 可选/IPv6 必选"
      ]
    ],
    "flow": [
      "应用直接封装数据报发出",
      "无握手、无确认、无重传",
      "对端按端口交付（或回 ICMP 端口不可达）"
    ],
    "wiresharkFilter": "udp",
    "example": "udp.port==53 的 DNS 查询/应答对",
    "pitfalls": [
      "无拥塞控制，大流量 UDP 易打满链路",
      "分片丢失整报废且难排查"
    ]
  },
  {
    "slug": "sctp",
    "name": "SCTP",
    "fullName": "Stream Control Transmission Protocol",
    "layer": 4,
    "tcpipLayer": "传输层",
    "category": "传输",
    "ports": "",
    "rfc": "RFC 9260",
    "year": 2022,
    "summary": "多宿主、多流的可靠传输协议，电信信令出身，现用于 WebRTC 数据通道。",
    "keywords": "sctp,多流,多宿主,webrtc",
    "depth": "core",
    "headerFields": [
      [
        "源/目的端口",
        "16 bit ×2",
        "端点标识"
      ],
      [
        "Verification Tag",
        "32 bit",
        "关联验证码"
      ],
      [
        "Chunk",
        "变长",
        "DATA/INIT/SACK 等块"
      ]
    ],
    "flow": [
      "四次握手 INIT→INIT-ACK(cookie)→COOKIE-ECHO→COOKIE-ACK",
      "多流独立交付 + 多宿主路径切换"
    ],
    "wiresharkFilter": "sctp",
    "example": "sctp.chunk_type==0 的 DATA 块",
    "pitfalls": [
      "中间 NAT/防火墙常不支持 SCTP",
      "与 TCP 选型要看多流收益是否真实"
    ]
  },
  {
    "slug": "quic",
    "name": "QUIC",
    "fullName": "QUIC Transport Protocol",
    "layer": 4,
    "tcpipLayer": "传输层",
    "category": "传输",
    "ports": "UDP 443（HTTP/3 常见）",
    "rfc": "RFC 9000",
    "year": 2021,
    "summary": "基于 UDP 的加密多路复用传输，0-RTT/1-RTT 建连，是 HTTP/3 的底座。",
    "keywords": "quic,udp,http3,0-rtt,多路复用",
    "depth": "core",
    "headerFields": [
      [
        "Header Form",
        "1 bit",
        "长头（握手）/短头（数据）"
      ],
      [
        "Connection ID",
        "变长",
        "连接迁移的关键标识"
      ],
      [
        "Packet Number",
        "变长",
        "单调递增包号"
      ],
      [
        "Frames",
        "变长",
        "STREAM/ACK/CRYPTO 等帧"
      ]
    ],
    "flow": [
      "长头 Initial 携带 TLS 1.3 握手（1-RTT）",
      "短头 1-RTT 数据，多流独立无队头阻塞",
      "地址变化时凭 Connection ID 迁移连接"
    ],
    "wiresharkFilter": "quic",
    "example": "udp.port==443 且 quic 的 Initial 包含 TLS SNI",
    "pitfalls": [
      "UDP 443 被封/限速时需回落 TCP",
      "0-RTT 有重放风险，幂等请求才可用"
    ]
  },
  {
    "slug": "mptcp",
    "name": "MPTCP",
    "fullName": "Multipath TCP",
    "layer": 4,
    "tcpipLayer": "传输层",
    "category": "传输",
    "ports": "",
    "rfc": "RFC 8684",
    "year": 2020,
    "summary": "多路径 TCP，单个连接可同时走 Wi-Fi 与蜂窝等多条路径。",
    "keywords": "mptcp,多路径,tcp扩展",
    "depth": "standard"
  },
  {
    "slug": "dccp",
    "name": "DCCP",
    "fullName": "Datagram Congestion Control Protocol",
    "layer": 4,
    "tcpipLayer": "传输层",
    "category": "传输",
    "ports": "",
    "rfc": "RFC 4340",
    "year": 2006,
    "summary": "带拥塞控制的不可靠数据报协议，为实时媒体设计但部署极少。",
    "keywords": "dccp,拥塞控制,数据报",
    "depth": "standard"
  },
  {
    "slug": "udplite",
    "name": "UDP-Lite",
    "fullName": "Lightweight UDP",
    "layer": 4,
    "tcpipLayer": "传输层",
    "category": "传输",
    "ports": "IP 协议号 136",
    "rfc": "RFC 3828",
    "year": 2004,
    "summary": "允许部分校验覆盖的 UDP 变体，容忍受损载荷交给应用处理。",
    "keywords": "udplite,部分校验",
    "depth": "standard"
  },
  {
    "slug": "tls12",
    "name": "TLS 1.2",
    "fullName": "Transport Layer Security 1.2",
    "layer": 6,
    "tcpipLayer": "传输层",
    "category": "安全/会话",
    "ports": "TCP 443（HTTPS）",
    "rfc": "RFC 5246",
    "year": 2008,
    "summary": "广泛部署的传输加密协议，套件可协商，已被 1.3 逐步取代。",
    "keywords": "tls,加密,https,证书",
    "depth": "standard"
  },
  {
    "slug": "tls13",
    "name": "TLS 1.3",
    "fullName": "Transport Layer Security 1.3",
    "layer": 6,
    "tcpipLayer": "传输层",
    "category": "安全/会话",
    "ports": "TCP 443（HTTPS）",
    "rfc": "RFC 8446",
    "year": 2018,
    "summary": "最新主流 TLS，1-RTT 握手、默认前向保密、砍掉不安全套件。",
    "keywords": "tls13,加密,握手,前向保密",
    "depth": "core",
    "headerFields": [
      [
        "Record Type",
        "8 bit",
        "23=应用数据 22=握手"
      ],
      [
        "Legacy Version",
        "16 bit",
        "为兼容填 0x0303"
      ],
      [
        "Length",
        "16 bit",
        "记录长度"
      ],
      [
        "加密载荷",
        "变长",
        "AEAD 加密内容"
      ]
    ],
    "flow": [
      "ClientHello（带 key_share 猜测密钥）",
      "ServerHello + 证书 + Finished（1-RTT）",
      "双方 Finished 后即传应用数据",
      "可选 0-RTT 早期数据（有重放风险）"
    ],
    "wiresharkFilter": "tls",
    "example": "tls.handshake.type==1 的 ClientHello 看 SNI/ALPN",
    "pitfalls": [
      "中间盒不兼容新版本引发降级/断连",
      "0-RTT 不可用于非幂等操作"
    ]
  },
  {
    "slug": "dtls",
    "name": "DTLS",
    "fullName": "Datagram Transport Layer Security",
    "layer": 6,
    "tcpipLayer": "传输层",
    "category": "安全/会话",
    "ports": "UDP 443 / 5349 等",
    "rfc": "RFC 9147",
    "year": 2022,
    "summary": "面向数据报的 TLS，为 UDP 应用（WebRTC/VPN）提供加密。",
    "keywords": "dtls,udp加密,webrtc",
    "depth": "standard"
  },
  {
    "slug": "dot1x",
    "name": "802.1X / EAP",
    "fullName": "Port-Based Network Access Control",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "安全/会话",
    "ports": "",
    "rfc": "IEEE 802.1X",
    "year": 2001,
    "summary": "端口准入控制框架，配合 EAP 与 RADIUS 做有线/无线身份认证。",
    "keywords": "802.1x,eap,准入,认证",
    "depth": "standard"
  },
  {
    "slug": "radius",
    "name": "RADIUS",
    "fullName": "Remote Authentication Dial-In User Service",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "安全/会话",
    "ports": "UDP 1812 / 1813",
    "rfc": "RFC 2865",
    "year": 2000,
    "summary": "AAA 协议（认证/授权/计费），企业 Wi-Fi 与 VPN 登录的后端常客。",
    "keywords": "radius,aaa,认证,计费",
    "depth": "standard"
  },
  {
    "slug": "diameter",
    "name": "Diameter",
    "fullName": "Diameter Base Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "安全/会话",
    "ports": "TCP/SCTP 3868",
    "rfc": "RFC 6733",
    "year": 2012,
    "summary": "RADIUS 的演进版 AAA 协议，移动核心网（计费/策略）的主力。",
    "keywords": "diameter,aaa,核心网",
    "depth": "standard"
  },
  {
    "slug": "tacacs",
    "name": "TACACS+",
    "fullName": "Terminal Access Controller Access-Control System Plus",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "安全/会话",
    "ports": "TCP 49",
    "rfc": "RFC 8907",
    "year": 2020,
    "summary": "设备管理 AAA 协议，网络设备运维登录与命令授权常用。",
    "keywords": "tacacs,aaa,设备管理",
    "depth": "standard"
  },
  {
    "slug": "kerberos",
    "name": "Kerberos",
    "fullName": "Kerberos Network Authentication Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "安全/会话",
    "ports": "TCP/UDP 88",
    "rfc": "RFC 4120",
    "year": 2005,
    "summary": "基于票据的单点登录认证协议，Windows 域与企业 SSO 的基石。",
    "keywords": "kerberos,票据,sso,域",
    "depth": "standard"
  },
  {
    "slug": "oauth2",
    "name": "OAuth 2.0",
    "fullName": "OAuth 2.0 Authorization Framework",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "安全/会话",
    "ports": "TCP 443（HTTPS）",
    "rfc": "RFC 6749",
    "year": 2012,
    "summary": "授权框架，让第三方应用在不拿到密码的前提下获得受限访问令牌。",
    "keywords": "oauth2,授权,令牌,第三方登录",
    "depth": "standard"
  },
  {
    "slug": "oidc",
    "name": "OpenID Connect",
    "fullName": "OpenID Connect Core 1.0",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "安全/会话",
    "ports": "TCP 443（HTTPS）",
    "rfc": "",
    "year": 2014,
    "summary": "建立在 OAuth 2.0 之上的身份层，用 ID Token 做现代单点登录。",
    "keywords": "oidc,openid,sso,id token",
    "depth": "standard"
  },
  {
    "slug": "saml",
    "name": "SAML",
    "fullName": "Security Assertion Markup Language 2.0",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "安全/会话",
    "ports": "TCP 443（HTTPS）",
    "rfc": "",
    "year": 2005,
    "summary": "基于 XML 断言的企业联邦单点登录标准，IdP/SP 模式。",
    "keywords": "saml,sso,联邦,企业",
    "depth": "standard"
  },
  {
    "slug": "wpa2",
    "name": "WPA2",
    "fullName": "Wi-Fi Protected Access 2",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "安全/会话",
    "ports": "",
    "rfc": "IEEE 802.11i",
    "year": 2004,
    "summary": "Wi-Fi 安全标准（AES-CCMP），四次握手派生会话密钥。",
    "keywords": "wpa2,wifi安全,aes,四次握手",
    "depth": "standard"
  },
  {
    "slug": "wpa3",
    "name": "WPA3",
    "fullName": "Wi-Fi Protected Access 3",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "安全/会话",
    "ports": "",
    "rfc": "",
    "year": 2018,
    "summary": "新一代 Wi-Fi 安全标准，SAE 握手抗离线字典攻击、默认更强隐私。",
    "keywords": "wpa3,sae,wifi安全",
    "depth": "standard"
  },
  {
    "slug": "socks",
    "name": "SOCKS5",
    "fullName": "SOCKS Protocol Version 5",
    "layer": 5,
    "tcpipLayer": "传输层",
    "category": "安全/会话",
    "ports": "TCP 1080",
    "rfc": "RFC 1928",
    "year": 1996,
    "summary": "通用代理协议，在会话层转发 TCP/UDP，常用于科学代理与跳板。",
    "keywords": "socks5,代理,proxy",
    "depth": "standard"
  },
  {
    "slug": "dns",
    "name": "DNS",
    "fullName": "Domain Name System",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP/TCP 53",
    "rfc": "RFC 1035",
    "year": 1987,
    "summary": "互联网的电话簿：把域名递归/迭代解析为 IP 地址，分层分布式数据库。",
    "keywords": "dns,域名,解析,递归",
    "depth": "core",
    "headerFields": [
      [
        "Transaction ID",
        "16 bit",
        "请求应答匹配"
      ],
      [
        "Flags",
        "16 bit",
        "QR/Opcode/AA/RD/RA/RCODE"
      ],
      [
        "QD/AN/NS/AR Count",
        "16 bit ×4",
        "各区记录数"
      ],
      [
        "QNAME/QTYPE/QCLASS",
        "变长",
        "查询名/类型/类"
      ]
    ],
    "flow": [
      "查本地缓存/Hosts",
      "未命中向递归服务器查询",
      "递归服务器迭代问根→顶级域→权威",
      "应答按 TTL 缓存"
    ],
    "wiresharkFilter": "dns",
    "example": "dns.qry.name contains \"example\" 且 dns.flags.response==0",
    "pitfalls": [
      "UDP 应答过大触发 TC 位改走 TCP",
      "DNS 放大攻击与缓存投毒"
    ]
  },
  {
    "slug": "doh",
    "name": "DoH",
    "fullName": "DNS over HTTPS",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 443",
    "rfc": "RFC 8484",
    "year": 2018,
    "summary": "把 DNS 查询装进 HTTPS，防窃听与篡改，与普通网页流量同形。",
    "keywords": "doh,dns加密,https",
    "depth": "standard"
  },
  {
    "slug": "dot",
    "name": "DoT",
    "fullName": "DNS over TLS",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 853",
    "rfc": "RFC 7858",
    "year": 2016,
    "summary": "专用端口上用 TLS 加密 DNS 查询，策略清晰、易识别。",
    "keywords": "dot,dns加密,tls",
    "depth": "standard"
  },
  {
    "slug": "doq",
    "name": "DoQ",
    "fullName": "DNS over QUIC",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 853",
    "rfc": "RFC 9250",
    "year": 2022,
    "summary": "用 QUIC 承载 DNS，低延迟且加密，兼得 DoT 的隐私与 UDP 的速度。",
    "keywords": "doq,dns加密,quic",
    "depth": "standard"
  },
  {
    "slug": "dnssec",
    "name": "DNSSEC",
    "fullName": "DNS Security Extensions",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "安全/会话",
    "ports": "UDP/TCP 53",
    "rfc": "RFC 4033",
    "year": 2005,
    "summary": "给 DNS 记录加数字签名链，防止伪造应答（只证真实、不加密）。",
    "keywords": "dnssec,签名,防伪造",
    "depth": "standard"
  },
  {
    "slug": "mdns",
    "name": "mDNS",
    "fullName": "Multicast DNS",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 5353",
    "rfc": "RFC 6762",
    "year": 2013,
    "summary": "局域网组播域名解析（.local），零配置发现打印机与 AirPlay 设备。",
    "keywords": "mdns,local,零配置,发现",
    "depth": "standard"
  },
  {
    "slug": "llmnr",
    "name": "LLMNR",
    "fullName": "Link-Local Multicast Name Resolution",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 5355",
    "rfc": "RFC 4795",
    "year": 2007,
    "summary": "Windows 局域网名称解析协议，DNS 失败时的兜底，也是内网攻击常见面。",
    "keywords": "llmnr,windows,名称解析",
    "depth": "standard"
  },
  {
    "slug": "dhcpv4",
    "name": "DHCPv4",
    "fullName": "Dynamic Host Configuration Protocol v4",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 67 / 68",
    "rfc": "RFC 2131",
    "year": 1997,
    "summary": "动态主机配置协议，DORA 四步自动分配 IP、掩码、网关与 DNS。",
    "keywords": "dhcp,dora,自动分配,租约",
    "depth": "core",
    "headerFields": [
      [
        "Op",
        "8 bit",
        "1=请求 2=应答"
      ],
      [
        "XID",
        "32 bit",
        "事务 ID"
      ],
      [
        "YIAddr",
        "32 bit",
        "分配给客户端的地址"
      ],
      [
        "Options",
        "变长",
        "掩码(1)/网关(3)/DNS(6)/租期(51)"
      ]
    ],
    "flow": [
      "Discover 广播找服务器",
      "Offer 提供地址报价",
      "Request 选定并请求",
      "ACK 确认租约（DORA）"
    ],
    "wiresharkFilter": "bootp（或 dhcp）",
    "example": "bootp.option.dhcp==1..4 对应 DORA 四步",
    "pitfalls": [
      "私接路由器开 DHCP 会抢答致全网断网",
      "租期一半时单播续租（T1），7/8 时广播（T2）"
    ]
  },
  {
    "slug": "dhcpv6",
    "name": "DHCPv6",
    "fullName": "Dynamic Host Configuration Protocol v6",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 546 / 547",
    "rfc": "RFC 8415",
    "year": 2018,
    "summary": "IPv6 的有状态配置协议，可与 SLAAC 配合下发地址与参数。",
    "keywords": "dhcpv6,ipv6,配置",
    "depth": "standard"
  },
  {
    "slug": "http11",
    "name": "HTTP/1.1",
    "fullName": "HyperText Transfer Protocol 1.1",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 80",
    "rfc": "RFC 9112",
    "year": 2022,
    "summary": "万维网的文本应用协议，请求-响应、持久连接与分块传输沿用至今。",
    "keywords": "http,web,请求响应,持久连接",
    "depth": "core",
    "headerFields": [
      [
        "请求行",
        "文本",
        "方法 + 路径 + HTTP/1.1"
      ],
      [
        "Host",
        "文本头",
        "虚拟主机必备"
      ],
      [
        "Content-Length / Transfer-Encoding",
        "文本头",
        "定长或 chunked 分块"
      ],
      [
        "状态行",
        "文本",
        "版本 + 状态码 + 原因短语"
      ]
    ],
    "flow": [
      "TCP(+TLS) 建连",
      "发送请求行+头+体",
      "服务器回状态行+头+体",
      "Keep-Alive 复用连接传下一请求"
    ],
    "wiresharkFilter": "http",
    "example": "http.request.method==\"GET\" 跟随 Follow HTTP Stream 看全会话",
    "pitfalls": [
      "队头阻塞：同连接请求串行",
      "头部与体边界错误引发请求走私"
    ]
  },
  {
    "slug": "http2",
    "name": "HTTP/2",
    "fullName": "HyperText Transfer Protocol Version 2",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 443（h2）",
    "rfc": "RFC 9113",
    "year": 2022,
    "summary": "二进制分帧、多路复用与头部压缩，解决 HTTP/1.1 队头阻塞。",
    "keywords": "http2,多路复用,hpack,分帧",
    "depth": "core",
    "headerFields": [
      [
        "Frame Length",
        "24 bit",
        "帧载荷长度"
      ],
      [
        "Frame Type",
        "8 bit",
        "DATA/HEADERS/SETTINGS/PRIORITY 等"
      ],
      [
        "Flags",
        "8 bit",
        "END_STREAM/END_HEADERS 等"
      ],
      [
        "Stream ID",
        "31 bit",
        "流标识，奇客户端/偶服务端"
      ]
    ],
    "flow": [
      "连接前言 Magic + SETTINGS 交换",
      "HPACK 压缩头部成 HEADERS 帧",
      "多 Stream 在一条 TCP 上多路复用"
    ],
    "wiresharkFilter": "http2",
    "example": "http2.type==1 的 HEADERS 帧按 streamid 跟踪",
    "pitfalls": [
      "TCP 层丢包仍阻塞所有流（传输队头阻塞）",
      "SETTINGS/流控参数不当压吞吐"
    ]
  },
  {
    "slug": "http3",
    "name": "HTTP/3",
    "fullName": "HyperText Transfer Protocol Version 3",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 443",
    "rfc": "RFC 9114",
    "year": 2022,
    "summary": "跑在 QUIC 之上的 HTTP，连接迁移与更低建连延迟。",
    "keywords": "http3,quic,web,连接迁移",
    "depth": "core",
    "headerFields": [
      [
        "QUIC STREAM 帧",
        "变长",
        "承载 HTTP/3 帧"
      ],
      [
        "HEADERS（QPACK）",
        "变长",
        "QPACK 压缩的头部"
      ],
      [
        "SETTINGS（H3）",
        "变长",
        "连接级参数"
      ]
    ],
    "flow": [
      "QUIC 1-RTT 建连（含 TLS 1.3）",
      "单向控制流交换 SETTINGS",
      "请求/响应走双向流，互不阻塞"
    ],
    "wiresharkFilter": "http3",
    "example": "quic 流内 http3 的 HEADERS 帧",
    "pitfalls": [
      "企业网封 UDP 时不可用，需 Alt-Svc 回落",
      "QPACK 动态表同步理解门槛高"
    ]
  },
  {
    "slug": "https",
    "name": "HTTPS",
    "fullName": "HTTP over TLS",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 443",
    "rfc": "RFC 9110",
    "year": 2022,
    "summary": "HTTP + TLS 的安全形态，现代网站默认入口，证书验证身份。",
    "keywords": "https,tls,证书,安全web",
    "depth": "standard"
  },
  {
    "slug": "websocket",
    "name": "WebSocket",
    "fullName": "The WebSocket Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 80 / 443",
    "rfc": "RFC 6455",
    "year": 2011,
    "summary": "浏览器与服务器的全双工长连接协议，由 HTTP 升级握手建立。",
    "keywords": "websocket,全双工,长连接,实时",
    "depth": "core",
    "headerFields": [
      [
        "FIN+Opcode",
        "8+4 bit",
        "分片标志 + 类型（1=文本 2=二进制 8=关闭 9=Ping）"
      ],
      [
        "MASK+Length",
        "1+7 bit 起",
        "客户端发帧必须掩码"
      ],
      [
        "Payload",
        "变长",
        "应用数据"
      ]
    ],
    "flow": [
      "HTTP GET 带 Upgrade 头握手（101）",
      "双方以帧全双工通信",
      "Ping/Pong 保活，Close 帧关闭"
    ],
    "wiresharkFilter": "websocket",
    "example": "websocket.opcode==1 的文本帧（聊天消息）",
    "pitfalls": [
      "无内置重连/消息确认，应用层要自理",
      "长连接需心跳防中间设备老化回收"
    ]
  },
  {
    "slug": "grpc",
    "name": "gRPC",
    "fullName": "gRPC over HTTP/2 + Protobuf",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 443（常见）",
    "rfc": "",
    "year": 2016,
    "summary": "高性能 RPC 框架，Protobuf 契约 + HTTP/2 流，微服务间通信主流。",
    "keywords": "grpc,rpc,protobuf,微服务",
    "depth": "standard"
  },
  {
    "slug": "graphql",
    "name": "GraphQL",
    "fullName": "GraphQL Query Language",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 443（HTTPS 常见）",
    "rfc": "",
    "year": 2015,
    "summary": "客户端按需查询的数据语言与运行时，单端点、强类型 Schema。",
    "keywords": "graphql,查询,api,schema",
    "depth": "standard"
  },
  {
    "slug": "rest",
    "name": "REST",
    "fullName": "Representational State Transfer",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 80 / 443",
    "rfc": "",
    "year": 2000,
    "summary": "资源导向的 Web API 架构风格（非协议本身），以 HTTP 动词与状态码表达操作。",
    "keywords": "rest,api,架构风格,资源",
    "depth": "standard"
  },
  {
    "slug": "soap",
    "name": "SOAP",
    "fullName": "Simple Object Access Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 80 / 443",
    "rfc": "",
    "year": 2003,
    "summary": "基于 XML 信封的企业级消息协议，WS-* 体系严格但笨重。",
    "keywords": "soap,xml,企业集成,wsdl",
    "depth": "standard"
  },
  {
    "slug": "ftp",
    "name": "FTP",
    "fullName": "File Transfer Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 21（控制）/ 20（主动数据）",
    "rfc": "RFC 959",
    "year": 1985,
    "summary": "经典文件传输协议，双通道（控制+数据）、明文传输，已被更安全方案取代。",
    "keywords": "ftp,文件传输,双通道,明文",
    "depth": "core",
    "headerFields": [
      [
        "控制命令",
        "文本",
        "USER/PASS/RETR/PASV/PORT"
      ],
      [
        "响应码",
        "3 位数字",
        "230 登录成功/227 进入被动模式"
      ]
    ],
    "flow": [
      "TCP 21 控制连接登录",
      "PASV/PORT 协商数据连接",
      "LIST/RETR/STOR 走数据连接传文件"
    ],
    "wiresharkFilter": "ftp 或 ftp-data",
    "example": "ftp.request.command==\"RETR\" 的下载过程",
    "pitfalls": [
      "明文口令不可在公网用",
      "主动模式常被防火墙/NAT 阻断"
    ]
  },
  {
    "slug": "ftps",
    "name": "FTPS",
    "fullName": "FTP over TLS",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 990 / 21",
    "rfc": "RFC 4217",
    "year": 2005,
    "summary": "给 FTP 加 TLS 加密，分显式（21）与隐式（990）两种模式。",
    "keywords": "ftps,ftp加密,tls",
    "depth": "standard"
  },
  {
    "slug": "sftp",
    "name": "SFTP",
    "fullName": "SSH File Transfer Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 22",
    "rfc": "",
    "year": 2001,
    "summary": "走 SSH 通道的文件传输协议（与 FTP 无关），运维传文件首选。",
    "keywords": "sftp,ssh,文件传输",
    "depth": "standard"
  },
  {
    "slug": "ssh",
    "name": "SSH",
    "fullName": "Secure Shell Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 22",
    "rfc": "RFC 4253",
    "year": 2006,
    "summary": "加密远程登录与通道协议，运维、Git 与隧道的基础设施。",
    "keywords": "ssh,远程登录,隧道,运维",
    "depth": "core",
    "headerFields": [
      [
        "Packet Length",
        "32 bit",
        "包长"
      ],
      [
        "Padding",
        "变长",
        "对齐加密块"
      ],
      [
        "Payload",
        "变长",
        "加密的协议消息（通道/执行）"
      ]
    ],
    "flow": [
      "版本交换与算法协商（KEX）",
      "主机密钥验证 + 用户认证",
      "开 Session 通道执行命令/转发"
    ],
    "wiresharkFilter": "ssh",
    "example": "只能看到加密包长序列，看不到内容（设计如此）",
    "pitfalls": [
      "首次主机指纹不核对等于裸奔",
      "弱口令+密码登录暴露 22 端口必被爆破"
    ]
  },
  {
    "slug": "telnet",
    "name": "Telnet",
    "fullName": "Telnet Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 23",
    "rfc": "RFC 854",
    "year": 1983,
    "summary": "明文远程终端协议，不安全，仅留作排障与历史。",
    "keywords": "telnet,明文,远程终端",
    "depth": "standard"
  },
  {
    "slug": "smtp",
    "name": "SMTP",
    "fullName": "Simple Mail Transfer Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 25 / 587 / 465",
    "rfc": "RFC 5321",
    "year": 2008,
    "summary": "邮件发送与中继协议，投递链路由 MX 记录驱动。",
    "keywords": "smtp,邮件,发送,mx",
    "depth": "core",
    "headerFields": [
      [
        "命令",
        "文本",
        "HELO/EHLO、MAIL FROM、RCPT TO、DATA"
      ],
      [
        "响应码",
        "3 位数字",
        "220 就绪/250 OK/354 发正文/550 拒收"
      ]
    ],
    "flow": [
      "连接后服务器发 220 横幅",
      "EHLO + STARTTLS/认证",
      "MAIL→RCPT→DATA 发信",
      "QUIT 结束，MX 按优先级投递"
    ],
    "wiresharkFilter": "smtp",
    "example": "smtp.req.command==\"DATA\" 前后的投递过程",
    "pitfalls": [
      "开放中继会被滥发垃圾邮件",
      "SPF/DKIM/DMARC 缺失导致进垃圾箱"
    ]
  },
  {
    "slug": "pop3",
    "name": "POP3",
    "fullName": "Post Office Protocol 3",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 110 / 995",
    "rfc": "RFC 1939",
    "year": 1996,
    "summary": "把邮件下载到本地的收信协议，模型简单、多端同步弱。",
    "keywords": "pop3,邮件,收信",
    "depth": "standard"
  },
  {
    "slug": "imap",
    "name": "IMAP",
    "fullName": "Internet Message Access Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 143 / 993",
    "rfc": "RFC 9051",
    "year": 2021,
    "summary": "服务端管理邮箱的收信协议，多端同步与文件夹/标记同步。",
    "keywords": "imap,邮件,同步",
    "depth": "standard"
  },
  {
    "slug": "tftp",
    "name": "TFTP",
    "fullName": "Trivial File Transfer Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 69",
    "rfc": "RFC 1350",
    "year": 1992,
    "summary": "极简文件传输（停等确认），用于网络引导与设备固件分发。",
    "keywords": "tftp,引导,固件,简单",
    "depth": "standard"
  },
  {
    "slug": "smb",
    "name": "SMB",
    "fullName": "Server Message Block",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 445",
    "rfc": "",
    "year": 1983,
    "summary": "Windows 文件/打印共享协议，现代版本 SMB 3.x 支持加密。",
    "keywords": "smb,共享,cifs,文件共享",
    "depth": "standard"
  },
  {
    "slug": "nfs",
    "name": "NFS",
    "fullName": "Network File System",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP/UDP 2049",
    "rfc": "RFC 7530",
    "year": 2015,
    "summary": "类 Unix 的网络文件系统，NFSv4 整合状态与安全。",
    "keywords": "nfs,文件系统,unix共享",
    "depth": "standard"
  },
  {
    "slug": "iscsi",
    "name": "iSCSI",
    "fullName": "Internet Small Computer Systems Interface",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 3260",
    "rfc": "RFC 7143",
    "year": 2014,
    "summary": "把 SCSI 块命令装进 TCP/IP，让 IP 网络充当存储网络。",
    "keywords": "iscsi,san,块存储",
    "depth": "standard"
  },
  {
    "slug": "snmp",
    "name": "SNMP",
    "fullName": "Simple Network Management Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 161 / 162",
    "rfc": "RFC 3411",
    "year": 2002,
    "summary": "网络设备监控与管理协议，GET/SET/TRAP + MIB 模型沿用至今。",
    "keywords": "snmp,网管,mib,监控",
    "depth": "core",
    "headerFields": [
      [
        "Version",
        "—",
        "v1/v2c/v3"
      ],
      [
        "Community / 安全参数",
        "文本/—",
        "v2c 团体字明文，v3 带认证加密"
      ],
      [
        "PDU",
        "变长",
        "GET/GETNEXT/GETBULK/SET/TRAP + OID 列表"
      ]
    ],
    "flow": [
      "管理站向 Agent UDP 161 发 GET",
      "Agent 查 MIB 回 Response",
      "异常时 Agent 向 162 发 Trap/Inform"
    ],
    "wiresharkFilter": "snmp",
    "example": "snmp.name contains \"1.3.6.1.2.1.1\" 的系统组查询",
    "pitfalls": [
      "v2c 团体字明文且常为 public",
      "UDP 放大可被用于反射攻击"
    ]
  },
  {
    "slug": "ntp",
    "name": "NTP",
    "fullName": "Network Time Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 123",
    "rfc": "RFC 5905",
    "year": 2010,
    "summary": "网络时钟同步协议，分层 Stratum 体系把误差压到毫秒级。",
    "keywords": "ntp,时间同步,时钟",
    "depth": "core",
    "headerFields": [
      [
        "LI/VN/Mode",
        "2/3/3 bit",
        "闰秒/版本/模式（3=客户端 4=服务器）"
      ],
      [
        "Stratum",
        "8 bit",
        "时钟层级"
      ],
      [
        "Originate/Receive/Transmit Timestamp",
        "64 bit ×3",
        "四时间戳算延迟与偏差"
      ]
    ],
    "flow": [
      "客户端记 T1 发请求",
      "服务器记 T2 收、T3 发",
      "客户端记 T4，按公式算 offset/delay 并调钟"
    ],
    "wiresharkFilter": "ntp",
    "example": "ntp.flags.mode==4 的服务器应答含 stratum",
    "pitfalls": [
      "未认证 NTP 可被劫持改时间",
      "单调时钟与跳变影响分布式系统"
    ]
  },
  {
    "slug": "ptp",
    "name": "PTP",
    "fullName": "Precision Time Protocol (IEEE 1588)",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 319 / 320",
    "rfc": "IEEE 1588",
    "year": 2008,
    "summary": "精密时间协议，亚微秒级同步，用于电信、电力与高频交易。",
    "keywords": "ptp,1588,精密同步",
    "depth": "standard"
  },
  {
    "slug": "syslog",
    "name": "Syslog",
    "fullName": "Syslog Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP/TCP 514",
    "rfc": "RFC 5424",
    "year": 2009,
    "summary": "系统日志传输的事实标准，Facility/Severity 分级。",
    "keywords": "syslog,日志,运维",
    "depth": "standard"
  },
  {
    "slug": "netflow",
    "name": "NetFlow / IPFIX",
    "fullName": "NetFlow v9 / IP Flow Information Export",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 2055（常见）",
    "rfc": "RFC 7011",
    "year": 2013,
    "summary": "流记录导出协议（NetFlow 思科源、IPFIX 为标准），供流量分析与安全审计。",
    "keywords": "netflow,ipfix,流量分析,流记录",
    "depth": "standard"
  },
  {
    "slug": "ldap",
    "name": "LDAP",
    "fullName": "Lightweight Directory Access Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 389 / 636",
    "rfc": "RFC 4511",
    "year": 2006,
    "summary": "轻量目录访问协议，企业账号目录（AD/OpenLDAP）的查询与认证接口。",
    "keywords": "ldap,目录,ad,账号",
    "depth": "standard"
  },
  {
    "slug": "sip",
    "name": "SIP",
    "fullName": "Session Initiation Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP/TCP 5060 / 5061",
    "rfc": "RFC 3261",
    "year": 2002,
    "summary": "多媒体会话信令协议，负责呼叫的建立、修改与拆除（VoIP 核心）。",
    "keywords": "sip,voip,信令,呼叫",
    "depth": "core",
    "headerFields": [
      [
        "请求行/状态行",
        "文本",
        "INVITE sip:.. SIP/2.0 或 SIP/2.0 200 OK"
      ],
      [
        "Via/From/To/Call-ID/CSeq",
        "文本头",
        "路由与会话标识四件套"
      ],
      [
        "SDP 体",
        "文本",
        "媒体编解码与地址协商"
      ]
    ],
    "flow": [
      "INVITE → 100 Trying → 180 Ringing",
      "200 OK + ACK 三方握手建会话",
      "RTP 传媒体",
      "BYE + 200 OK 拆线"
    ],
    "wiresharkFilter": "sip",
    "example": "sip.Method==\"INVITE\" 跟 VoIP Calls 还原通话",
    "pitfalls": [
      "SIP 与 NAT 天生不合，需 SBC/ALG",
      "明文 SIP 易被扫描盗打"
    ]
  },
  {
    "slug": "rtp",
    "name": "RTP",
    "fullName": "Real-time Transport Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP（动态端口）",
    "rfc": "RFC 3550",
    "year": 2003,
    "summary": "实时媒体传输协议，带序号与时间戳承载音视频流。",
    "keywords": "rtp,音视频,实时,媒体",
    "depth": "core",
    "headerFields": [
      [
        "V/P/X/CC",
        "2/1/1/4 bit",
        "版本与 CSRC 数"
      ],
      [
        "PT",
        "7 bit",
        "载荷类型（编解码）"
      ],
      [
        "Sequence Number",
        "16 bit",
        "丢包/乱序检测"
      ],
      [
        "Timestamp",
        "32 bit",
        "采样时钟，同步与抖动计算"
      ],
      [
        "SSRC",
        "32 bit",
        "同步源标识"
      ]
    ],
    "flow": [
      "SIP/SDP 协商后开 RTP 流",
      "发送端按采样周期打包发送",
      "接收端按序号/时间戳建抖动缓冲播放",
      "RTCP 周期反馈质量"
    ],
    "wiresharkFilter": "rtp",
    "example": "rtp.ssrc 区分多路流，Telephony→RTP Streams 看抖动丢包",
    "pitfalls": [
      "无拥塞控制，高码率流挤占带宽",
      "RTP 明文需 SRTP 加密（WebRTC 强制）"
    ]
  },
  {
    "slug": "rtcp",
    "name": "RTCP",
    "fullName": "RTP Control Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP（RTP 端口+1 常见）",
    "rfc": "RFC 3550",
    "year": 2003,
    "summary": "RTP 的控制伴侣，反馈丢包、抖动等 QoS 统计。",
    "keywords": "rtcp,qos,反馈",
    "depth": "standard"
  },
  {
    "slug": "rtsp",
    "name": "RTSP",
    "fullName": "Real Time Streaming Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 554",
    "rfc": "RFC 7826",
    "year": 2016,
    "summary": "流媒体控制协议（播放/暂停/定位），安防摄像头常用。",
    "keywords": "rtsp,流媒体,摄像头",
    "depth": "standard"
  },
  {
    "slug": "webrtc",
    "name": "WebRTC",
    "fullName": "Web Real-Time Communication",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP（动态）",
    "rfc": "RFC 8825",
    "year": 2021,
    "summary": "浏览器原生实时音视频与数据通道框架，集 SRTP/DTLS/ICE 于一体。",
    "keywords": "webrtc,实时,浏览器,音视频",
    "depth": "standard"
  },
  {
    "slug": "stun",
    "name": "STUN",
    "fullName": "Session Traversal Utilities for NAT",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP/TCP 3478",
    "rfc": "RFC 8489",
    "year": 2020,
    "summary": "NAT 穿越工具协议，让终端发现自己的公网映射地址。",
    "keywords": "stun,nat穿越,webrtc",
    "depth": "standard"
  },
  {
    "slug": "turn",
    "name": "TURN",
    "fullName": "Traversal Using Relays around NAT",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP/TCP 3478",
    "rfc": "RFC 8656",
    "year": 2020,
    "summary": "NAT 穿越失败时的中继兜底协议，转发媒体流。",
    "keywords": "turn,中继,nat穿越",
    "depth": "standard"
  },
  {
    "slug": "ice",
    "name": "ICE",
    "fullName": "Interactive Connectivity Establishment",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "",
    "rfc": "RFC 8445",
    "year": 2018,
    "summary": "综合主机/反射/中继候选做连通性检查的 NAT 穿越框架。",
    "keywords": "ice,候选,连通性检查",
    "depth": "standard"
  },
  {
    "slug": "hls",
    "name": "HLS",
    "fullName": "HTTP Live Streaming",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 80 / 443",
    "rfc": "RFC 8216",
    "year": 2017,
    "summary": "苹果提出的切片式 HTTP 自适应流媒体（m3u8 + TS/fMP4）。",
    "keywords": "hls,流媒体,m3u8,直播",
    "depth": "standard"
  },
  {
    "slug": "rtmp",
    "name": "RTMP",
    "fullName": "Real-Time Messaging Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 1935",
    "rfc": "",
    "year": 2005,
    "summary": "经典推流协议，直播采集端到 CDN 的老牌选择，正被 SRT/WebRTC 替代。",
    "keywords": "rtmp,推流,直播",
    "depth": "standard"
  },
  {
    "slug": "srt",
    "name": "SRT",
    "fullName": "Secure Reliable Transport",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 9000（常见）",
    "rfc": "",
    "year": 2017,
    "summary": "低延迟可靠的 UDP 视频传输协议，广电与直播回传常用。",
    "keywords": "srt,低延迟,视频传输",
    "depth": "standard"
  },
  {
    "slug": "mqtt",
    "name": "MQTT",
    "fullName": "Message Queuing Telemetry Transport",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 1883 / 8883",
    "rfc": "",
    "year": 2014,
    "summary": "轻量发布/订阅消息协议，物联网遥测的事实标准（QoS 0/1/2）。",
    "keywords": "mqtt,发布订阅,物联网,qos",
    "depth": "core",
    "headerFields": [
      [
        "固定头",
        "8 bit+",
        "报文类型(高4位)+标志 + 剩余长度"
      ],
      [
        "CONNECT 载荷",
        "变长",
        "ClientID/遗嘱/账号"
      ],
      [
        "PUBLISH",
        "变长",
        "Topic + QoS + Payload"
      ]
    ],
    "flow": [
      "CONNECT/CONNACK 建连",
      "SUBSCRIBE 订阅主题",
      "PUBLISH 经 Broker 按主题转发",
      "PINGREQ 保活"
    ],
    "wiresharkFilter": "mqtt",
    "example": "mqtt.msgtype==3 的 PUBLISH 看 topic 与载荷",
    "pitfalls": [
      "1883 明文无认证暴露公网危险",
      "QoS2 四步成本高，多数场景 QoS1 足够"
    ]
  },
  {
    "slug": "coap",
    "name": "CoAP",
    "fullName": "Constrained Application Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 5683 / 5684",
    "rfc": "RFC 7252",
    "year": 2014,
    "summary": "受限设备的 Web 协议（UDP 版 HTTP），带确认与观察机制。",
    "keywords": "coap,受限设备,udp,iot",
    "depth": "standard"
  },
  {
    "slug": "amqp",
    "name": "AMQP",
    "fullName": "Advanced Message Queuing Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 5672 / 5671",
    "rfc": "",
    "year": 2006,
    "summary": "企业级消息队列协议（RabbitMQ），交换机/路由键/队列模型。",
    "keywords": "amqp,消息队列,rabbitmq",
    "depth": "standard"
  },
  {
    "slug": "xmpp",
    "name": "XMPP",
    "fullName": "Extensible Messaging and Presence Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 5222 / 5269",
    "rfc": "RFC 6120",
    "year": 2011,
    "summary": "基于 XML 流的即时消息与存在协议，联邦式架构。",
    "keywords": "xmpp,即时消息,联邦",
    "depth": "standard"
  },
  {
    "slug": "kafka-protocol",
    "name": "Kafka Protocol",
    "fullName": "Apache Kafka Wire Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 9092",
    "rfc": "",
    "year": 2011,
    "summary": "Kafka 的二进制协议（非 IETF 标准），支撑高吞吐日志流平台。",
    "keywords": "kafka,流平台,消息",
    "depth": "standard"
  },
  {
    "slug": "stomp",
    "name": "STOMP",
    "fullName": "Simple Text Oriented Messaging Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 61613（常见）",
    "rfc": "",
    "year": 2011,
    "summary": "极简文本消息协议，常作 WebSocket 之上的消息层。",
    "keywords": "stomp,消息,websocket",
    "depth": "standard"
  },
  {
    "slug": "modbus-tcp",
    "name": "Modbus TCP",
    "fullName": "Modbus Messaging on TCP/IP",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 502",
    "rfc": "",
    "year": 1999,
    "summary": "工业控制的经典主从协议上 TCP 封装，PLC/SCADA 广泛使用。",
    "keywords": "modbus,plc,工业,scada",
    "depth": "standard"
  },
  {
    "slug": "opcua",
    "name": "OPC UA",
    "fullName": "OPC Unified Architecture",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 4840",
    "rfc": "IEC 62541",
    "year": 2008,
    "summary": "工业互操作标准，信息建模 + 安全通道，工业 4.0 的数据底座。",
    "keywords": "opcua,工业4.0,互操作",
    "depth": "standard"
  },
  {
    "slug": "bacnet",
    "name": "BACnet",
    "fullName": "Building Automation and Control Networks",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 47808",
    "rfc": "ANSI/ASHRAE 135",
    "year": 1995,
    "summary": "楼宇自控协议（暖通/照明/安防），BACnet/IP 最常见。",
    "keywords": "bacnet,楼宇自控,hvac",
    "depth": "standard"
  },
  {
    "slug": "dnp3",
    "name": "DNP3",
    "fullName": "Distributed Network Protocol 3",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP/UDP 20000",
    "rfc": "IEEE 1815",
    "year": 1993,
    "summary": "电力 SCADA 远动协议，变电站与调度中心之间通信。",
    "keywords": "dnp3,电力,scada",
    "depth": "standard"
  },
  {
    "slug": "profinet",
    "name": "PROFINET",
    "fullName": "Process Field Network",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "",
    "rfc": "",
    "year": 2003,
    "summary": "西门子主导的工业以太网标准，含实时等级 RT/IRT。",
    "keywords": "profinet,工业以太网,西门子",
    "depth": "standard"
  },
  {
    "slug": "ethercat",
    "name": "EtherCAT",
    "fullName": "Ethernet for Control Automation Technology",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "",
    "rfc": "IEC 61158",
    "year": 2003,
    "summary": "高实时工业以太网，主站帧飞越从站时读写数据。",
    "keywords": "ethercat,工业,实时",
    "depth": "standard"
  },
  {
    "slug": "bittorrent",
    "name": "BitTorrent",
    "fullName": "BitTorrent Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP/UDP 6881-6889（常见）",
    "rfc": "",
    "year": 2001,
    "summary": "点对点分片共享协议，Tracker/DHT + 稀有优先调度。",
    "keywords": "bittorrent,p2p,下载,dht",
    "depth": "standard"
  },
  {
    "slug": "ipfs",
    "name": "IPFS / libp2p",
    "fullName": "InterPlanetary File System / libp2p",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 4001（libp2p 常见）",
    "rfc": "",
    "year": 2015,
    "summary": "内容寻址的 P2P 存储与网络栈，CID + DHT 定位内容。",
    "keywords": "ipfs,libp2p,内容寻址,p2p",
    "depth": "standard"
  },
  {
    "slug": "openflow",
    "name": "OpenFlow",
    "fullName": "OpenFlow Switch Protocol",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "数据链路/交换",
    "ports": "TCP 6653 / 6633",
    "rfc": "ONF TS-025",
    "year": 2009,
    "summary": "SDN 南向协议，控制器通过流表直接编程交换机转发。",
    "keywords": "openflow,sdn,流表,控制器",
    "depth": "standard"
  },
  {
    "slug": "netconf",
    "name": "NETCONF",
    "fullName": "Network Configuration Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 830",
    "rfc": "RFC 6241",
    "year": 2011,
    "summary": "基于 XML/YANG 的网络配置协议，事务式编辑设备配置。",
    "keywords": "netconf,yang,配置管理",
    "depth": "standard"
  },
  {
    "slug": "restconf",
    "name": "RESTCONF",
    "fullName": "RESTCONF Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 443（HTTPS）",
    "rfc": "RFC 8040",
    "year": 2017,
    "summary": "用 HTTP/JSON 访问 YANG 数据的 NETCONF REST 化版本。",
    "keywords": "restconf,yang,配置",
    "depth": "standard"
  },
  {
    "slug": "gnmi",
    "name": "gNMI",
    "fullName": "gRPC Network Management Interface",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 57400（常见部署）",
    "rfc": "",
    "year": 2016,
    "summary": "基于 gRPC 的网络管理接口，订阅式遥测 Telemetry 主流。",
    "keywords": "gnmi,telemetry,grpc,遥测",
    "depth": "standard"
  },
  {
    "slug": "whois",
    "name": "WHOIS",
    "fullName": "WHOIS Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 43",
    "rfc": "RFC 3912",
    "year": 2004,
    "summary": "域名/IP 注册信息查询协议，文本问答式，正被 RDAP 取代。",
    "keywords": "whois,域名查询,注册信息",
    "depth": "standard"
  },
  {
    "slug": "rdap",
    "name": "RDAP",
    "fullName": "Registration Data Access Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 443",
    "rfc": "RFC 9082",
    "year": 2021,
    "summary": "WHOIS 的结构化继任者，HTTPS + JSON 返回注册数据。",
    "keywords": "rdap,whois继任,json",
    "depth": "standard"
  },
  {
    "slug": "irc",
    "name": "IRC",
    "fullName": "Internet Relay Chat",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 6667 / 6697",
    "rfc": "RFC 2812",
    "year": 2000,
    "summary": "互联网早期实时聊天协议，频道模型影响深远。",
    "keywords": "irc,聊天,频道",
    "depth": "standard"
  },
  {
    "slug": "nntp",
    "name": "NNTP",
    "fullName": "Network News Transfer Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 119 / 563",
    "rfc": "RFC 3977",
    "year": 2006,
    "summary": "Usenet 新闻组分发与阅读协议。",
    "keywords": "nntp,usenet,新闻组",
    "depth": "standard"
  },
  {
    "slug": "gopher",
    "name": "Gopher",
    "fullName": "Gopher Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 70",
    "rfc": "RFC 1436",
    "year": 1993,
    "summary": "万维网之前的文档菜单检索协议，现为互联网史标本。",
    "keywords": "gopher,历史,文档检索",
    "depth": "standard"
  },
  {
    "slug": "redis-resp",
    "name": "Redis RESP",
    "fullName": "Redis Serialization Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP 6379",
    "rfc": "",
    "year": 2009,
    "summary": "Redis 的请求-响应序列化协议（RESP2/3），简单高效。",
    "keywords": "redis,resp,缓存",
    "depth": "standard"
  },
  {
    "slug": "memcached",
    "name": "Memcached Protocol",
    "fullName": "Memcached Text/Binary Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "TCP/UDP 11211",
    "rfc": "",
    "year": 2003,
    "summary": "分布式缓存的键值协议，文本协议易调试。",
    "keywords": "memcached,缓存,键值",
    "depth": "standard"
  },
  {
    "slug": "matter",
    "name": "Matter",
    "fullName": "Matter over IP (CSA)",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "",
    "rfc": "",
    "year": 2022,
    "summary": "智能家居互联标准（原 CHIP），跑在 Thread/Wi-Fi 之上统一设备模型。",
    "keywords": "matter,智能家居,互联",
    "depth": "standard"
  },
  {
    "slug": "knx",
    "name": "KNX",
    "fullName": "KNX Building Automation",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 3671（KNXnet/IP）",
    "rfc": "ISO/IEC 14543",
    "year": 1990,
    "summary": "楼宇自动化总线标准，灯光/遮阳/暖通统一控制。",
    "keywords": "knx,楼宇,总线",
    "depth": "standard"
  },
  {
    "slug": "zwave",
    "name": "Z-Wave",
    "fullName": "Z-Wave Mesh Protocol",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "ITU-T G.9959",
    "year": 2001,
    "summary": "低功耗智能家居网状协议，Sub-GHz 频段抗干扰。",
    "keywords": "zwave,智能家居,mesh",
    "depth": "standard"
  },
  {
    "slug": "nbiot",
    "name": "NB-IoT",
    "fullName": "Narrowband IoT",
    "layer": 2,
    "tcpipLayer": "接入层",
    "category": "物理/接入",
    "ports": "",
    "rfc": "3GPP Release 13",
    "year": 2016,
    "summary": "蜂窝低功耗广域物联技术，依托运营商网络广覆盖。",
    "keywords": "nbiot,lpwan,蜂窝物联",
    "depth": "standard"
  },
  {
    "slug": "sdp",
    "name": "SDP",
    "fullName": "Session Description Protocol",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "",
    "rfc": "RFC 8866",
    "year": 2021,
    "summary": "描述多媒体会话参数（媒体/编解码/地址）的文本格式，SIP/WebRTC 必备。",
    "keywords": "sdp,会话描述,webrtc",
    "depth": "standard"
  },
  {
    "slug": "snmp-trap-note",
    "name": "SNMP Trap / Inform",
    "fullName": "SNMP Notification",
    "layer": 7,
    "tcpipLayer": "应用层",
    "category": "应用",
    "ports": "UDP 162",
    "rfc": "RFC 3413",
    "year": 2002,
    "summary": "SNMP 的异步告警机制条目：Trap 单向、Inform 需确认（并入 SNMP 体系学习）。",
    "keywords": "snmp,trap,告警",
    "depth": "standard"
  }
];
