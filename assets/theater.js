// Packet Theater — 协议剧场：场景状态机 + 时序图 + 数据包列表 + 分层详情/hex（程序按结构生成，字节数与标称长度一致）
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  if (!$("panel-theater")) return;
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  var LAN_NODES = {
    client: { name: "客户端", ip: "192.168.1.10", mac: "00:11:22:33:44:55" },
    gateway: { name: "网关/路由器", ip: "192.168.1.1", mac: "66:77:88:99:aa:bb" },
    dns: { name: "DNS 服务器", ip: "8.8.8.8", mac: "—（经网关转发）" },
    server: { name: "Web 服务器", ip: "203.0.113.10", mac: "—（经网关转发）" }
  };
  var DNS_NODES = {
    client: { name: "客户端", ip: "192.168.1.10", mac: "00:11:22:33:44:55" },
    resolver: { name: "递归解析器", ip: "8.8.8.8", mac: "—（经网关转发）" },
    root: { name: "根服务器", ip: "198.41.0.4", mac: "—（互联网逐跳）" },
    tld: { name: ".com TLD 服务器", ip: "192.5.6.30", mac: "—（互联网逐跳）" },
    auth: { name: "权威服务器", ip: "203.0.113.53", mac: "—（互联网逐跳）" }
  };
  var BCAST = { dmac: "ff:ff:ff:ff:ff:ff" };
  function pk(from, to, proto, info, len, kind, addr) { return { from: from, to: to, proto: proto, info: info, len: len, kind: kind, addr: addr || null }; }
  function st(title, detail, packets) { return { title: title, detail: detail, packets: packets }; }

  var SCENARIOS = [
    {
      id: "https", title: "场景 A · HTTPS 访问（10 步）", url: "https://example.com/", nodes: LAN_NODES, order: ["client", "gateway", "dns", "server"],
      steps: [
        st("输入 URL", "在浏览器输入 https://example.com/ 并回车。浏览器先查缓存/HSTS：该站曾要求强制 HTTPS，直接走安全通道。本步是本地动作，无网络包。", []),
        st("DHCP 拿地址", "新入网的客户端还没有 IP，按 DORA 四步从网关（DHCP 服务器）租地址。客户端置了广播标志位：在确认租约前它收不了单播，所以 Discover/Request 从 0.0.0.0 发往广播 255.255.255.255（目的 MAC ff:ff:ff:ff:ff:ff），服务器的 Offer/ACK 也回广播；ACK 之后客户端才正式启用 192.168.1.10/24、网关 192.168.1.1、DNS 8.8.8.8。", [
          pk("client", "gateway", "DHCP", "Discover：广播找 DHCP 服务器", 342, "dhcp-discover", { sip: "0.0.0.0", dip: "255.255.255.255", dmac: "ff:ff:ff:ff:ff:ff" }),
          pk("gateway", "client", "DHCP", "Offer：广播报价 yiaddr=192.168.1.10", 342, "dhcp-offer", { sip: "192.168.1.1", dip: "255.255.255.255", dmac: "ff:ff:ff:ff:ff:ff" }),
          pk("client", "gateway", "DHCP", "Request：广播请求该地址（通知其它服务器落选）", 342, "dhcp-request", { sip: "0.0.0.0", dip: "255.255.255.255", dmac: "ff:ff:ff:ff:ff:ff" }),
          pk("gateway", "client", "DHCP", "ACK：广播确认租约（含网关/DNS 选项），客户端此后启用 192.168.1.10", 342, "dhcp-ack", { sip: "192.168.1.1", dip: "255.255.255.255", dmac: "ff:ff:ff:ff:ff:ff" })]),
        st("ARP 找网关", "目的 IP 不在本子网，要先把包交给网关。客户端广播 ARP 问「谁是 192.168.1.1」，网关单播回自己的 MAC，并写入 ARP 缓存。", [
          pk("client", "gateway", "ARP", "Request：Who has 192.168.1.1? Tell 192.168.1.10", 42, "arp", BCAST), pk("gateway", "client", "ARP", "Reply：192.168.1.1 is at 66:77:88:99:aa:bb", 42, "arp")]),
        st("DNS 解析", "经网关向 8.8.8.8 发 UDP 53 查询 example.com 的 A 记录，应答 203.0.113.10（TTL 决定缓存时长）。无握手、问完即走。", [
          pk("client", "dns", "DNS", "Standard query A example.com", 74, "dns"), pk("dns", "client", "DNS", "Standard query response A 203.0.113.10", 90, "dns")]),
        st("TCP 三次握手", "与 203.0.113.10:443 建连：SYN(seq=1000) → SYN-ACK(seq=5000, ack=1001) → ACK(ack=5001)。注意以太网帧的实际收件人始终是网关 MAC，由它逐跳转发。", [
          pk("client", "server", "TCP", "51000 → 443 [SYN] Seq=1000", 66, "tcp-syn"), pk("server", "client", "TCP", "443 → 51000 [SYN, ACK] Seq=5000 Ack=1001", 66, "tcp-synack"), pk("client", "server", "TCP", "51000 → 443 [ACK] Ack=5001", 54, "tcp-ack")]),
        st("TLS 1.3 握手", "在 TCP 之上协商加密：ClientHello（SNI=example.com、key_share）→ 服务器回 ServerHello+证书+Finished → 客户端验签证书并回 Finished。仅 1-RTT，双方派生会话密钥。", [
          pk("client", "server", "TLS", "Client Hello（SNI / key_share / ALPN=h2）", 512, "tls-hello"), pk("server", "client", "TLS", "Server Hello + Certificate + Finished", 1450, "tls-hello"), pk("client", "server", "TLS", "Finished（握手完成，密钥就绪）", 80, "tls-fin")]),
        st("加密 HTTP 请求", "浏览器把 GET / 请求装进 TLS 应用数据记录加密发出。抓包只能看到记录类型 23 与密文长度，看不到路径与 Cookie——这正是 HTTPS 与 HTTP 的分水岭（对比场景 B）。", [
          pk("client", "server", "TLS", "Application Data：加密的 GET / HTTP 请求", 320, "tls-data")]),
        st("响应与渲染", "服务器加密回送 HTML；浏览器解密后构建 DOM/CSSOM，再并行请求 CSS/JS/图片（复用本连接），布局绘制上屏。包 2 是客户端的 TCP 确认。", [
          pk("server", "client", "TLS", "Application Data：加密的 200 OK + HTML", 1450, "tls-data"), pk("client", "server", "TCP", "51000 → 443 [ACK] 确认响应数据", 54, "tcp-ack")]),
        st("TCP 四次挥手", "页面加载完、连接空闲关闭：FIN→ACK→FIN→ACK 两方向独立关闭，主动方进 TIME-WAIT（2MSL）防旧包串扰。", [
          pk("client", "server", "TCP", "51000 → 443 [FIN, ACK]", 54, "tcp-fin"), pk("server", "client", "TCP", "443 → 51000 [ACK]", 54, "tcp-ack"),
          pk("server", "client", "TCP", "443 → 51000 [FIN, ACK]", 54, "tcp-fin"), pk("client", "server", "TCP", "51000 → 443 [ACK] → TIME-WAIT", 54, "tcp-ack")]),
        st("证书 / 安全小结", "最后一条 TLS Alert（close_notify）加密告别。本次访问的安全来自三点：证书链验证了服务器身份、TLS 1.3 提供前向保密、AEAD 保证机密+完整。代价是多出 DHCP/ARP/DNS/握手的往返——每个协议都在为下一步铺路。点任意数据包行可看它的分层字段与 hex 转储。", [
          pk("client", "server", "TLS", "Alert：close_notify（加密）", 85, "tls-data")])
      ]
    },
    {
      id: "http", title: "场景 B · 纯 HTTP 访问（明文对比）", url: "http://example.com/", nodes: LAN_NODES, order: ["client", "gateway", "dns", "server"],
      steps: [
        st("输入 URL", "输入 http://example.com/，无 HSTS 强制升级，全程明文。本步无网络包。", []),
        st("DNS 解析", "与 HTTPS 相同：UDP 查 8.8.8.8 得 203.0.113.10。注意 DNS 本身也是明文，可被劫持导向假站。", [
          pk("client", "dns", "DNS", "Standard query A example.com", 74, "dns"), pk("dns", "client", "DNS", "Standard query response A 203.0.113.10", 90, "dns")]),
        st("TCP 三次握手", "目标端口改为 80：SYN → SYN-ACK → ACK 建连。", [
          pk("client", "server", "TCP", "51001 → 80 [SYN] Seq=2000", 66, "tcp-syn"), pk("server", "client", "TCP", "80 → 51001 [SYN, ACK] Seq=8000 Ack=2001", 66, "tcp-synack"), pk("client", "server", "TCP", "51001 → 80 [ACK] Ack=8001", 54, "tcp-ack")]),
        st("明文 HTTP 请求", "GET 请求以纯文本发出：路径、Cookie、表单口令在链路上任何人都能读。点开下面这行包看 hex 转储——右侧 ASCII 列能直接读出 GET 与 Host，这就是明文的风险。", [
          pk("client", "server", "HTTP", "GET /login HTTP/1.1（明文！）", 210, "http-req")]),
        st("响应与渲染", "服务器明文回 200 与 HTML，沿途可被窃听、篡改、注入广告。浏览器照常渲染，用户往往毫无察觉。", [
          pk("server", "client", "HTTP", "HTTP/1.1 200 OK（明文 HTML）", 900, "http-res"), pk("client", "server", "TCP", "51001 → 80 [ACK] 确认", 54, "tcp-ack")]),
        st("TCP 四次挥手", "FIN→ACK→FIN→ACK 关闭连接，流程与 HTTPS 相同（没有 TLS 层要告别）。", [
          pk("client", "server", "TCP", "51001 → 80 [FIN, ACK]", 54, "tcp-fin"), pk("server", "client", "TCP", "80 → 51001 [ACK]", 54, "tcp-ack"),
          pk("server", "client", "TCP", "80 → 51001 [FIN, ACK]", 54, "tcp-fin"), pk("client", "server", "TCP", "51001 → 80 [ACK] → TIME-WAIT", 54, "tcp-ack")]),
        st("安全小结（明文风险）", "HTTP 的问题不在慢，而在无身份、无机密、无完整：可窃听、可篡改、可冒充。现代浏览器把 HTTP 标为「不安全」，新站一律 HTTPS + HSTS。本步无网络包。", [])
      ]
    },
    {
      id: "dns", title: "场景 C · DNS + UDP 查询", url: "example.com（仅解析，不访问）", nodes: DNS_NODES, order: ["client", "resolver", "root", "tld", "auth"],
      steps: [
        st("触发解析", "应用调用 getaddrinfo(\"example.com\")，系统解析器接管。本步本地动作，无网络包。", []),
        st("查缓存与 Hosts", "先查浏览器缓存→系统缓存→Hosts 文件，全部未命中才发网络查询。教学要点：绝大多数解析根本不出本机。本步无网络包。", []),
        st("UDP 查询递归服务器", "向递归解析器 8.8.8.8:53 发一个 UDP 数据报（Transaction ID 随机，置 RD 期望递归）。没有三次握手——这就是 UDP 的风格：低成本、无状态，丢了靠上层重发。", [
          pk("client", "resolver", "DNS", "Standard query A example.com（UDP，无握手）", 74, "dns")]),
        st("递归服务器迭代查询", "递归解析器自己也没有缓存：它以迭代方式依次问根服务器（根只回 .com 的 referral）、.com TLD 服务器（只回 example.com 权威的 referral）、权威服务器（回最终 A 记录）。问的人始终是解析器，被问的逐级缩小范围——这与第 3 步客户端对解析器的递归查询要分清。", [
          pk("resolver", "root", "DNS", "迭代① 问根服务器：example.com 的 A？", 74, "dns"), pk("root", "resolver", "DNS", "根响应：referral → .com TLD 服务器地址", 150, "dns"),
          pk("resolver", "tld", "DNS", "迭代② 问 TLD：example.com 的 A？", 74, "dns"), pk("tld", "resolver", "DNS", "TLD 响应：referral → example.com 权威服务器地址", 160, "dns"),
          pk("resolver", "auth", "DNS", "迭代③ 问权威：example.com 的 A？", 74, "dns"), pk("auth", "resolver", "DNS", "权威响应：A 203.0.113.10（TTL=300）", 90, "dns")]),
        st("应答、缓存与交付", "递归解析器把答案回给客户端并按 TTL 缓存；客户端把 IP 交给应用，全程通常几十毫秒，且客户端侧只用了 1 个往返的 UDP。", [
          pk("resolver", "client", "DNS", "Standard query response A 203.0.113.10（TTL=300）", 90, "dns")]),
        st("异常：截断与改走 TCP", "若应答超过 UDP 承载（或被置 TC 截断位），客户端改用 TCP 53 向递归解析器重查——DNS 平时是 UDP，大包/区域传送时是 TCP，两者同端口。下行即一次 TCP 上的 DNS 查询示意。", [
          pk("client", "resolver", "DNS-over-TCP", "TC 截断后改走 TCP 53 重查（2 字节长度前缀）", 76, "dns-tcp")])
      ]
    }
  ];

  // ---------- 地址口径 ----------
  function nodeOf(k) { return state.sc.nodes[k]; }
  function effSip(p) { return (p.addr && p.addr.sip) || nodeOf(p.from).ip; }
  function effDip(p) { return (p.addr && p.addr.dip) || nodeOf(p.to).ip; }
  function effSmac(p) { return (p.addr && p.addr.smac) || nodeOf(p.from).mac; }
  function effDmac(p) { return (p.addr && p.addr.dmac) || nodeOf(p.to).mac; }
  var SERVER_SIDE = { dns: 1, resolver: 1, root: 1, tld: 1, auth: 1, server: 1 };
  function portPair(p) {
    var pair = p.proto === "DHCP" ? [68, 67] : (p.proto === "DNS" || p.proto === "DNS-over-TCP") ? [53123, 53] : p.proto === "HTTP" ? [51001, 80] : [51000, 443];
    if (p.proto === "DHCP") return p.from === "gateway" ? [67, 68] : [68, 67];
    var fs = !!SERVER_SIDE[p.from], ts = !!SERVER_SIDE[p.to];
    if (ts && !fs) return pair;                 // 客户端 → 服务器
    if (fs && !ts) return [pair[1], pair[0]];    // 服务器 → 客户端
    if (fs && ts) return p.from === "resolver" ? pair : [pair[1], pair[0]]; // 解析器→根/TLD/权威 或反向
    return pair;
  }

  // ---------- 程序生成 hex 字节（长度 == 标称长度） ----------
  function ipBytes(ip) { return ip.split(".").map(function (x) { return parseInt(x, 10); }); }
  function macBytes(mac) { return mac.indexOf(":") < 0 ? [0, 0, 0, 0, 0, 0] : mac.split(":").map(function (x) { return parseInt(x, 16); }); }
  function asciiBytes(s) { return s.split("").map(function (c) { return c.charCodeAt(0) & 0xff; }); }
  function pseudoBytes(seedText, n) { var out = [], s = 2166136261; for (var i = 0; i < seedText.length; i++) { s = (s ^ seedText.charCodeAt(i)) * 16777619 >>> 0; } for (var j = 0; j < n; j++) { s = (s * 1103515245 + 12345) >>> 0; out.push((s >>> 16) & 0xff); } return out; }
  function buildBytes(p) {
    var b = [];
    var et = p.kind === "arp" ? 0x0806 : 0x0800;
    b = b.concat(macBytes(effDmac(p)), macBytes(effSmac(p)), [et >> 8, et & 255]);
    if (p.kind === "arp") {
      var isReply = p.info.indexOf("Reply") >= 0;
      b = b.concat([0, 1, 8, 0, 6, 4, 0, isReply ? 2 : 1], macBytes(effSmac(p)), ipBytes(effSip(p)), macBytes(isReply ? effDmac(p) : "00:00:00:00:00:00"), ipBytes(effDip(p)));
    } else {
      var isTCP = ["TCP", "TLS", "HTTP", "DNS-over-TCP"].indexOf(p.proto) >= 0;
      var protoNum = isTCP ? 6 : 17;
      var ipTotal = p.len - 14; // IP 报文总长 = 帧长 − 以太网头 14
      b = b.concat([0x45, 0, (ipTotal >> 8) & 255, ipTotal & 255, 0, 1, 0x40, 0, 64, protoNum, 0, 0], ipBytes(effSip(p)), ipBytes(effDip(p)));
      var pr = portPair(p), sport = pr[0], dport = pr[1];
      if (!isTCP) {
        var udpLen = ipTotal - 20;
        b = b.concat([sport >> 8, sport & 255, dport >> 8, dport & 255, (udpLen >> 8) & 255, udpLen & 255, 0, 0]);
      } else {
        var flags = p.kind === "tcp-syn" ? 0x02 : p.kind === "tcp-synack" ? 0x12 : p.kind === "tcp-fin" ? 0x11 : 0x10;
        b = b.concat([sport >> 8, sport & 255, dport >> 8, dport & 255, 0, 0, 0x03, 0xe8, 0, 0, 0x13, 0x89, 0x50, flags, 0x72, 0x10, 0, 0, 0, 0]);
      }
      if (p.kind === "http-req") b = b.concat(asciiBytes("GET /login HTTP/1.1\r\nHost: example.com\r\nCookie: session=secret\r\n\r\n"));
      else if (p.kind === "http-res") b = b.concat(asciiBytes("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<html><body>login page</body></html>"));
      else if (p.proto === "DNS" || p.proto === "DNS-over-TCP") { if (p.proto === "DNS-over-TCP") b = b.concat([0, 40]); b = b.concat([0x12, 0x34, 0x81, 0x80, 0, 1, 0, 1, 0, 0, 0, 0], asciiBytes("\x07example\x03com\x00"), [0, 1, 0, 1]); }
      else if (p.proto === "TLS") b = b.concat(p.kind === "tls-data" ? [0x17, 0x03, 0x03, 0, 60] : [0x16, 0x03, 0x01, 0, 60], pseudoBytes(p.info, 60));
      else if (p.proto === "DHCP") {
        var msgType = p.kind === "dhcp-discover" ? 1 : p.kind === "dhcp-offer" ? 2 : p.kind === "dhcp-request" ? 3 : 5;
        // BOOTP 固定区：op/htype/hlen/hops, xid, secs/flags(广播位), ciaddr, yiaddr, siaddr, giaddr, chaddr(16), sname(64), file(128)
        b = b.concat([p.from === "gateway" ? 2 : 1, 1, 6, 0, 0, 0, 0x2a, 0x10, 0, 0, 0x80, 0x00]); // secs=0, flags=0x8000 广播位（共 12B 至 giaddr 前）
        b = b.concat([0, 0, 0, 0]);                                                                    // ciaddr（请求前恒 0）
        b = b.concat(p.kind === "dhcp-offer" || p.kind === "dhcp-ack" ? ipBytes("192.168.1.10") : [0, 0, 0, 0]); // yiaddr
        b = b.concat(ipBytes("192.168.1.1"));                                                          // siaddr
        b = b.concat([0, 0, 0, 0]);                                                                    // giaddr
        b = b.concat(macBytes(LAN_NODES.client.mac), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);                  // chaddr 16B
        for (var z = 0; z < 64 + 128; z++) b.push(0);                                                   // sname + file
        b = b.concat([0x63, 0x82, 0x53, 0x63, 0x35, 0x01, msgType, 0x32, 0x04], ipBytes("192.168.1.10"), [0x37, 0x04, 1, 3, 6, 51, 0xff]);
      }
    }
    if (b.length < p.len) { var pad = pseudoBytes(p.info + p.proto, p.len - b.length); b = b.concat(pad); }
    return b.slice(0, p.len);
  }
  function hexDump(bytes) {
    var lines = [];
    for (var o = 0; o < bytes.length; o += 16) {
      var chunk = bytes.slice(o, o + 16);
      var hex = chunk.map(function (x) { return x.toString(16).padStart(2, "0"); }).join(" ");
      var asc = chunk.map(function (x) { return x >= 32 && x < 127 ? String.fromCharCode(x) : "."; }).join("");
      lines.push(o.toString(16).padStart(4, "0") + "  " + hex.padEnd(48) + "  " + asc);
    }
    return lines.join("\n");
  }
  function layersFor(p) {
    var dmac = effDmac(p), smac = effSmac(p);
    var L = [["Ethernet II", [["目的 MAC", dmac], ["源 MAC", smac], ["EtherType", p.kind === "arp" ? "0x0806 (ARP)" : "0x0800 (IPv4)"]]]];
    if (p.kind === "arp") { L.push(["ARP", [["操作码", p.info.indexOf("Reply") >= 0 ? "2 (Reply)" : "1 (Request)"], ["发送方", effSip(p) + " / " + smac], ["目标", effDip(p) + (p.info.indexOf("Request") >= 0 ? "（目的 MAC 广播询问）" : "")]]]); return L; }
    var isTCP = ["TCP", "TLS", "HTTP", "DNS-over-TCP"].indexOf(p.proto) >= 0;
    L.push(["IPv4", [["源 IP", effSip(p)], ["目的 IP", effDip(p)], ["协议号", isTCP ? "6 (TCP)" : "17 (UDP)"], ["TTL", "64"], ["总长", (p.len - 14) + " B（帧长 " + p.len + " − 以太网头 14）"]]]);
    var pr = portPair(p);
    if (isTCP) L.push(["TCP", [["源端口 → 目的端口", pr[0] + " → " + pr[1]], ["标志", p.kind === "tcp-syn" ? "SYN" : p.kind === "tcp-synack" ? "SYN, ACK" : p.kind === "tcp-fin" ? "FIN, ACK" : "ACK"], ["说明", "序号/确认号见步骤详情与握手面板"]]]);
    else L.push(["UDP", [["源端口 → 目的端口", pr[0] + " → " + pr[1]], ["特点", "无握手、无确认，靠上层超时重传"]]]);
    if (p.proto === "TLS") L.push(["TLS 1.3", [["记录类型", p.kind === "tls-data" ? "23 (Application Data，密文)" : "22 (Handshake)"], ["内容", p.info], ["可读性", p.kind === "tls-data" ? "不可读：AEAD 加密" : "握手参数明文，Finished 起加密"]]]);
    if (p.proto === "HTTP") L.push(["HTTP（明文）", [["内容", p.info], ["可读性", "完全可读——对比 hex 右侧 ASCII 列"]]]);
    if (p.proto === "DNS" || p.proto === "DNS-over-TCP") L.push(["DNS", [["Transaction ID", "0x1234"], ["查询", "example.com A IN"], ["方向", nodeOf(p.from).name + " → " + nodeOf(p.to).name], ["方式", p.proto === "DNS" ? "UDP 53" : "TCP 53（长度前缀）"]]]);
    if (p.proto === "DHCP") {
      var yi = (p.kind === "dhcp-offer" || p.kind === "dhcp-ack") ? "192.168.1.10" : "0.0.0.0（尚未分配）";
      L.push(["BOOTP / DHCP", [["消息类型", p.info], ["yiaddr（你的地址）", yi], ["siaddr（服务器）", "192.168.1.1"], ["广播口径", "源 " + effSip(p) + " → 目的 " + effDip(p) + "；客户端置广播标志，租约确认前 Offer/ACK 也走广播"], ["关键选项", "掩码 255.255.255.0 / 网关 192.168.1.1 / DNS 8.8.8.8 / 租期（ACK 包）"]]]);
    }
    return L;
  }

  // ---------- 状态机 ----------
  var state = { sc: SCENARIOS[0], step: -1, playing: false, timer: null, shown: [] };
  function seqRows() {
    var rows = [];
    state.sc.steps.forEach(function (s, si) {
      if (!s.packets.length) rows.push({ local: true, si: si, title: s.title });
      s.packets.forEach(function (p) { rows.push({ p: p, si: si }); });
    });
    return rows;
  }
  function render() {
    $("th-title").textContent = state.sc.title + " — " + state.sc.url;
    $("th-nodes").innerHTML = state.sc.order.map(function (k) { var n = state.sc.nodes[k]; return '<div class="node"><strong>' + esc(n.name) + '</strong><br><span>' + n.ip + "</span></div>"; }).join('<div class="node-link">──</div>');
    $("th-seq").innerHTML = seqRows().map(function (r) {
      var cls = (r.local ? "arrow local" : "arrow") + (r.si === state.step ? " current" : r.si < state.step ? " done" : " todo");
      if (r.local) return '<div class="' + cls + '">🧭 本地动作 · ' + esc(r.title) + " <span>（无网络包，本步在本机内完成）</span></div>";
      return '<div class="' + cls + '">' + esc(nodeOf(r.p.from).name) + " ── " + esc(r.p.proto) + " ──▶ " + esc(nodeOf(r.p.to).name) + ' <span>' + esc(r.p.info) + "</span></div>";
    }).join("");
    state.shown = [];
    state.sc.steps.slice(0, state.step + 1).forEach(function (s) { s.packets.forEach(function (p) { state.shown.push(p); }); });
    var t = 0;
    $("th-packets").innerHTML = state.shown.map(function (p, i) {
      t += 0.012 + (i % 5) * 0.004;
      return '<tr data-idx="' + i + '"><td>' + (i + 1) + "</td><td>" + t.toFixed(3) + "</td><td>" + esc(effSip(p)) + "</td><td>" + esc(effDip(p)) + "</td><td>" + esc(p.proto) + "</td><td>" + p.len + "</td><td>" + esc(p.info) + "</td></tr>";
    }).join("") || '<tr><td colspan="7" class="hint">尚未发送数据包：点「播放」开始，或点「下一步」手动步进。</td></tr>';
    document.querySelectorAll("#th-packets tr[data-idx]").forEach(function (tr) { tr.addEventListener("click", function () { showPacket(parseInt(tr.dataset.idx, 10)); }); });
    if (state.step < 0) { $("th-step-detail").innerHTML = "<h3>准备开始</h3><p>▶ 点「播放」开始自动演示，或点「下一步」手动步进。选场景后从第 1 步演起；点击底部任意数据包行，查看它的分层字段解析与十六进制转储。</p>"; }
    else { var s = state.sc.steps[state.step]; $("th-step-detail").innerHTML = "<h3>第 " + (state.step + 1) + " / " + state.sc.steps.length + " 步 · " + esc(s.title) + "</h3><p>" + esc(s.detail) + "</p><p class='hint'>本步数据包：" + s.packets.length + " 个</p>"; }
    $("th-progress").textContent = "步骤 " + Math.max(0, state.step + 1) + " / " + state.sc.steps.length + " · 已发送 " + state.shown.length + " 个包";
    $("th-play").textContent = state.playing ? "⏸ 暂停" : "▶ 播放";
  }
  function showPacket(i) {
    var p = state.shown[i]; if (!p) return;
    var bytes = buildBytes(p);
    var h = "<h3>包 #" + (i + 1) + " · " + esc(p.proto) + " · " + esc(p.info) + "</h3>";
    h += layersFor(p).map(function (layer) {
      return "<h4>" + esc(layer[0]) + "</h4><table>" + layer[1].map(function (f) { return "<tr><td>" + esc(f[0]) + "</td><td>" + esc(f[1]) + "</td></tr>"; }).join("") + "</table>";
    }).join("");
    h += "<h4>十六进制转储（按该包结构生成，共 " + bytes.length + " 字节，与标称长度 " + p.len + " B 一致）</h4><pre class='result hex'>" + esc(hexDump(bytes)) + "</pre>";
    $("th-packet-detail").innerHTML = h;
    $("th-packet-detail").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function stopPlay() { state.playing = false; if (state.timer) { clearInterval(state.timer); state.timer = null; } var pb = $("th-play"); if (pb) pb.textContent = "▶ 播放"; }
  function advance() { if (state.step < state.sc.steps.length - 1) { state.step++; } else { stopPlay(); } render(); }
  function goPrev() { if (state.step > -1) { state.step--; } render(); }
  function reset() { stopPlay(); state.step = -1; $("th-packet-detail").innerHTML = '<p class="hint">点击底部任意数据包行，这里会显示该包的 Ethernet / IP / 传输层 / 应用层字段解析与 hex 转储。</p>'; render(); }
  $("th-play").addEventListener("click", function () {
    if (state.playing) { stopPlay(); render(); return; }
    if (state.step >= state.sc.steps.length - 1) reset();
    state.playing = true; render();
    state.timer = setInterval(function () { if (state.step >= state.sc.steps.length - 1) { stopPlay(); render(); return; } advance(); }, 1700);
    advance();
  });
  $("th-next").addEventListener("click", function () { stopPlay(); advance(); });
  $("th-prev").addEventListener("click", function () { stopPlay(); goPrev(); });
  $("th-reset").addEventListener("click", function () { stopPlay(); reset(); });
  document.querySelectorAll("[data-sc]").forEach(function (b) {
    b.addEventListener("click", function () {
      stopPlay();
      document.querySelectorAll("[data-sc]").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      state.sc = SCENARIOS.filter(function (s) { return s.id === b.dataset.sc; })[0];
      reset();
    });
  });
  reset();
})();
