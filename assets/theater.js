// Packet Theater — 协议剧场：场景状态机 + 时序图 + 数据包列表 + 分层详情/hex（程序生成）
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  if (!$("panel-theater")) return;
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  var NODES = {
    client: { name: "客户端", ip: "192.168.1.10", mac: "00:11:22:33:44:55" },
    gateway: { name: "网关/路由器", ip: "192.168.1.1", mac: "66:77:88:99:aa:bb" },
    dns: { name: "DNS 服务器", ip: "8.8.8.8", mac: "—（经网关转发）" },
    server: { name: "Web 服务器", ip: "203.0.113.10", mac: "—（经网关转发）" }
  };
  function pk(from, to, proto, info, len, kind) { return { from: from, to: to, proto: proto, info: info, len: len, kind: kind }; }
  function st(title, detail, packets) { return { title: title, detail: detail, packets: packets }; }

  var SCENARIOS = [
    {
      id: "https", title: "场景 A · HTTPS 访问（10 步）", url: "https://example.com/",
      steps: [
        st("输入 URL", "在浏览器输入 https://example.com/ 并回车。浏览器先查缓存/HSTS：该站曾要求强制 HTTPS，直接走安全通道。本步是本地动作，无网络包。", []),
        st("DHCP 拿地址", "新入网的客户端还没有 IP：用 DORA 四步从网关（DHCP 服务器）租到 192.168.1.10/24、网关 192.168.1.1、DNS 8.8.8.8。源地址 0.0.0.0、广播 255.255.255.255。", [
          pk("client", "gateway", "DHCP", "Discover：广播找 DHCP 服务器", 342, "dhcp"), pk("gateway", "client", "DHCP", "Offer：报价 192.168.1.10", 342, "dhcp"),
          pk("client", "gateway", "DHCP", "Request：选定并请求该地址", 342, "dhcp"), pk("gateway", "client", "DHCP", "ACK：确认租约（含网关/DNS 选项）", 342, "dhcp")]),
        st("ARP 找网关", "目的 IP 不在本子网，要先把包交给网关。客户端广播 ARP 问「谁是 192.168.1.1」，网关单播回自己的 MAC，并写入 ARP 缓存。", [
          pk("client", "gateway", "ARP", "Request：Who has 192.168.1.1? Tell 192.168.1.10", 42, "arp"), pk("gateway", "client", "ARP", "Reply：192.168.1.1 is at 66:77:88:99:aa:bb", 42, "arp")]),
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
      id: "http", title: "场景 B · 纯 HTTP 访问（明文对比）", url: "http://example.com/",
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
      id: "dns", title: "场景 C · DNS + UDP 查询", url: "example.com（仅解析，不访问）",
      steps: [
        st("触发解析", "应用调用 getaddrinfo(\"example.com\")，系统解析器接管。本步本地动作，无网络包。", []),
        st("查缓存与 Hosts", "先查浏览器缓存→系统缓存→Hosts 文件，全部未命中才发网络查询。教学要点：绝大多数解析根本不出本机。本步无网络包。", []),
        st("UDP 查询递归服务器", "向 8.8.8.8:53 发一个 UDP 数据报（Transaction ID 随机）。没有三次握手——这就是 UDP 的风格：低成本、无状态，丢了靠上层重发。", [
          pk("client", "dns", "DNS", "Standard query A example.com（UDP，无握手）", 74, "dns")]),
        st("递归服务器迭代查询", "递归服务器自己也没有缓存：它依次去问根服务器（得 .com 地址）、.com 顶级域（得 example.com 权威地址）、权威服务器（得最终 A 记录）。这三问三答叫迭代查询。", [
          pk("dns", "server", "DNS", "迭代① 问根服务器：.com 在哪？", 70, "dns"), pk("server", "dns", "DNS", "根回应：referral → .com TLD 地址", 150, "dns"),
          pk("dns", "server", "DNS", "迭代②/③ 问 TLD 与权威：example.com 的 A？", 74, "dns"), pk("server", "dns", "DNS", "权威回应：A 203.0.113.10", 90, "dns")]),
        st("应答、缓存与交付", "递归服务器把答案回给客户端并按 TTL 缓存；客户端把 IP 交给应用，全程通常几十毫秒，且只用了 1 个往返的 UDP。", [
          pk("dns", "client", "DNS", "Standard query response A 203.0.113.10（TTL=300）", 90, "dns")]),
        st("异常：截断与改走 TCP", "若应答超过 UDP 承载（或被置 TC 截断位），客户端改用 TCP 53 重查——DNS 平时是 UDP，大包/区域传送时是 TCP，两者同端口。下行即一次 TCP 上的 DNS 查询示意。", [
          pk("client", "dns", "DNS-over-TCP", "TC 截断后改走 TCP 53 重查（2 字节长度前缀）", 76, "dns-tcp")])
      ]
    }
  ];

  // ---------- 程序生成 hex 字节 ----------
  function ipBytes(ip) { return ip.split(".").map(function (x) { return parseInt(x, 10); }); }
  function macBytes(mac) { return mac.indexOf(":") < 0 ? [0, 0, 0, 0, 0, 0] : mac.split(":").map(function (x) { return parseInt(x, 16); }); }
  function asciiBytes(s) { return s.split("").map(function (c) { return c.charCodeAt(0) & 0xff; }); }
  function pseudoBytes(seedText, n) { var out = [], s = 2166136261; for (var i = 0; i < seedText.length; i++) { s = (s ^ seedText.charCodeAt(i)) * 16777619 >>> 0; } for (var j = 0; j < n; j++) { s = (s * 1103515245 + 12345) >>> 0; out.push((s >>> 16) & 0xff); } return out; }
  function portsFor(p) {
    if (p.proto === "DNS" || p.proto === "DNS-over-TCP") return [53123, 53];
    if (p.proto === "DHCP") return [68, 67];
    if (p.proto === "HTTP") return [51001, 80];
    return [51000, 443];
  }
  function buildBytes(p) {
    var src = NODES[p.from], dst = NODES[p.to], b = [];
    var et = p.kind === "arp" ? 0x0806 : 0x0800;
    b = b.concat(macBytes(dst.mac === "—（经网关转发）" ? NODES.gateway.mac : dst.mac), macBytes(src.mac), [et >> 8, et & 255]);
    if (p.kind === "arp") {
      b = b.concat([0, 1, 8, 0, 6, 4, 0, p.info.indexOf("Reply") >= 0 ? 2 : 1], macBytes(src.mac), ipBytes(src.ip), macBytes(dst.mac === "—（经网关转发）" ? NODES.gateway.mac : dst.mac), ipBytes(dst.ip));
      return b;
    }
    var isTCP = ["TCP", "TLS", "HTTP", "DNS-over-TCP"].indexOf(p.proto) >= 0;
    var protoNum = isTCP ? 6 : 17;
    var totalLen = Math.min(p.len, 20 + (isTCP ? 20 : 8) + 60);
    b = b.concat([0x45, 0, totalLen >> 8, totalLen & 255, 0, 1, 0x40, 0, 64, protoNum, 0, 0], ipBytes(src.ip === "0.0.0.0" ? "0.0.0.0" : src.ip), ipBytes(p.proto === "DHCP" && p.info.indexOf("Discover") >= 0 ? "255.255.255.255" : dst.ip));
    var pr = portsFor(p), sport = p.from === "server" || p.from === "gateway" && p.proto === "DHCP" ? pr[1] : pr[0], dport = sport === pr[0] ? pr[1] : pr[0];
    if (!isTCP) { b = b.concat([sport >> 8, sport & 255, dport >> 8, dport & 255, 0, 40, 0, 0]); }
    else {
      var flags = p.kind === "tcp-syn" ? 0x02 : p.kind === "tcp-synack" ? 0x12 : p.kind === "tcp-fin" ? 0x11 : 0x10;
      b = b.concat([sport >> 8, sport & 255, dport >> 8, dport & 255, 0, 0, 0x03, 0xe8, 0, 0, 0, 0, 0x50, flags, 0x72, 0x10, 0, 0, 0, 0]);
    }
    if (p.kind === "http-req") b = b.concat(asciiBytes("GET /login HTTP/1.1\r\nHost: example.com\r\n\r\n"));
    else if (p.kind === "http-res") b = b.concat(asciiBytes("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<html>..."));
    else if (p.proto === "DNS" || p.proto === "DNS-over-TCP") b = b.concat([0x12, 0x34, 0x01, 0, 0, 1, 0, 0, 0, 0, 0, 0], asciiBytes("\x07example\x03com\x00"), [0, 1, 0, 1]);
    else if (p.proto === "TLS") b = b.concat(p.kind === "tls-data" ? [0x17, 0x03, 0x03, 0, 40].concat(pseudoBytes(p.info, 40)) : [0x16, 0x03, 0x01, 0, 40].concat(pseudoBytes(p.info, 40)));
    else if (p.kind === "dhcp") b = b.concat([1, 1, 6, 0, 0, 0, 0x2a, 0x10], pseudoBytes(p.info, 24), [0x63, 0x82, 0x53, 0x63, 0x35, 0x01, 0x01]);
    return b.slice(0, 128);
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
    var src = NODES[p.from], dst = NODES[p.to];
    var L = [["Ethernet II", [["目的 MAC", p.kind === "arp" && p.info.indexOf("Request") >= 0 ? "ff:ff:ff:ff:ff:ff（广播）" : (dst.mac.indexOf("—") === 0 ? NODES.gateway.mac + "（下一跳网关）" : dst.mac)], ["源 MAC", src.mac], ["EtherType", p.kind === "arp" ? "0x0806 (ARP)" : "0x0800 (IPv4)"]]]];
    if (p.kind === "arp") { L.push(["ARP", [["操作码", p.info.indexOf("Reply") >= 0 ? "2 (Reply)" : "1 (Request)"], ["发送方", src.ip + " / " + src.mac], ["目标", dst.ip]]]); return L; }
    var isTCP = ["TCP", "TLS", "HTTP", "DNS-over-TCP"].indexOf(p.proto) >= 0;
    L.push(["IPv4", [["源 IP", src.ip], ["目的 IP", dst.ip], ["协议号", isTCP ? "6 (TCP)" : "17 (UDP)"], ["TTL", "64"], ["总长（示意）", p.len + " B"]]]);
    var pr = portsFor(p);
    if (isTCP) L.push(["TCP", [["源/目的端口", pr[0] + " / " + pr[1]], ["标志", p.kind === "tcp-syn" ? "SYN" : p.kind === "tcp-synack" ? "SYN, ACK" : p.kind === "tcp-fin" ? "FIN, ACK" : "ACK"], ["说明", "序号/确认号见步骤详情与握手面板"]]]);
    else L.push(["UDP", [["源/目的端口", p.proto === "DHCP" ? "68 / 67" : pr[0] + " / 53"], ["特点", "无握手、无确认，靠上层超时重传"]]]);
    if (p.proto === "TLS") L.push(["TLS 1.3", [["记录类型", p.kind === "tls-data" ? "23 (Application Data，密文)" : "22 (Handshake)"], ["内容", p.info], ["可读性", p.kind === "tls-data" ? "不可读：AEAD 加密" : "握手参数明文，Finished 起加密"]]]);
    if (p.proto === "HTTP") L.push(["HTTP（明文）", [["内容", p.info], ["可读性", "完全可读——对比 hex 右侧 ASCII 列"]]]);
    if (p.proto === "DNS" || p.proto === "DNS-over-TCP") L.push(["DNS", [["Transaction ID", "0x1234"], ["查询", "example.com A IN"], ["方式", p.proto === "DNS" ? "UDP 53" : "TCP 53（长度前缀）"]]]);
    if (p.proto === "DHCP") L.push(["BOOTP / DHCP", [["消息", p.info], ["关键选项", "掩码/网关/DNS/租期（ACK 包）"], ["广播", "Discover 阶段目的为 255.255.255.255"]]]);
    return L;
  }

  // ---------- 状态机 ----------
  var state = { sc: SCENARIOS[0], step: -1, playing: false, timer: null, shown: [] };
  function allArrows() {
    var rows = [];
    state.sc.steps.forEach(function (s, si) { s.packets.forEach(function (p) { rows.push({ p: p, si: si }); }); });
    return rows;
  }
  function render() {
    $("th-title").textContent = state.sc.title + " — " + state.sc.url;
    $("th-nodes").innerHTML = Object.keys(NODES).map(function (k) { var n = NODES[k]; return '<div class="node"><strong>' + n.name + '</strong><br><span>' + n.ip + "</span></div>"; }).join('<div class="node-link">──</div>');
    // 时序图：全部箭头，当前步高亮，已演过变亮，未演变暗
    $("th-seq").innerHTML = allArrows().map(function (r) {
      var cls = r.si === state.step ? "arrow current" : r.si < state.step ? "arrow done" : "arrow todo";
      return '<div class="' + cls + '">' + esc(NODES[r.p.from].name) + " ── " + esc(r.p.proto) + " ──▶ " + esc(NODES[r.p.to].name) + ' <span>' + esc(r.p.info) + "</span></div>";
    }).join("") || '<p class="hint">本场景无数据包步骤。</p>';
    // 包列表：截至当前步
    state.shown = [];
    state.sc.steps.slice(0, state.step + 1).forEach(function (s) { s.packets.forEach(function (p) { state.shown.push(p); }); });
    var t = 0;
    $("th-packets").innerHTML = state.shown.map(function (p, i) {
      t += 0.012 + (i % 5) * 0.004;
      return '<tr data-idx="' + i + '"><td>' + (i + 1) + "</td><td>" + t.toFixed(3) + "</td><td>" + esc(NODES[p.from].ip) + "</td><td>" + esc(NODES[p.to].ip) + "</td><td>" + esc(p.proto) + "</td><td>" + p.len + "</td><td>" + esc(p.info) + "</td></tr>";
    }).join("") || '<tr><td colspan="7" class="hint">尚未发送数据包：点「下一步」或「播放」开始。</td></tr>';
    document.querySelectorAll("#th-packets tr[data-idx]").forEach(function (tr) { tr.addEventListener("click", function () { showPacket(parseInt(tr.dataset.idx, 10)); }); });
    // 步骤详情
    if (state.step < 0) { $("th-step-detail").innerHTML = "<h3>准备开始</h3><p>选场景后点「播放」自动演示，或「下一步」手动步进。点击底部任意数据包行，查看它的分层字段解析与十六进制转储。</p>"; }
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
    h += "<h4>十六进制转储（示例字节由程序按协议结构生成，显示前 " + bytes.length + " 字节；标称长度 " + p.len + " B）</h4><pre class='result hex'>" + esc(hexDump(bytes)) + "</pre>";
    $("th-packet-detail").innerHTML = h;
    $("th-packet-detail").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function stopPlay() { state.playing = false; if (state.timer) { clearInterval(state.timer); state.timer = null; } }
  function next() { if (state.step < state.sc.steps.length - 1) { state.step++; } else { stopPlay(); } render(); }
  function prev() { if (state.step > -1) { state.step--; } render(); }
  function reset() { stopPlay(); state.step = -1; $("th-packet-detail").innerHTML = '<p class="hint">点击底部任意数据包行，这里会显示该包的 Ethernet / IP / 传输层 / 应用层字段解析与 hex 转储。</p>'; render(); }
  $("th-play").addEventListener("click", function () {
    if (state.playing) { stopPlay(); render(); return; }
    if (state.step >= state.sc.steps.length - 1) reset();
    state.playing = true; render();
    state.timer = setInterval(function () { if (state.step >= state.sc.steps.length - 1) { stopPlay(); render(); return; } next(); }, 1700);
    next();
  });
  $("th-next").addEventListener("click", function () { stopPlay(); next(); });
  $("th-prev").addEventListener("click", function () { stopPlay(); prev(); });
  $("th-reset").addEventListener("click", reset);
  document.querySelectorAll("[data-sc]").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll("[data-sc]").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      state.sc = SCENARIOS.filter(function (s) { return s.id === b.dataset.sc; })[0];
      reset();
    });
  });
  reset();
})();
