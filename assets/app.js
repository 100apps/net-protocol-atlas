// Net Protocol Atlas — pure static, zero dependency. Data from window.PROTOCOLS (data/protocols.js)
(function () {
  "use strict";
  var P = window.PROTOCOLS || [];
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  // Tabs
  document.querySelectorAll("#tabs button").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll("#tabs button").forEach(function (x) { x.classList.remove("active"); });
      document.querySelectorAll(".panel").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      $("panel-" + b.dataset.tab).classList.add("active");
    });
  });

  // ---------- 1. Atlas ----------
  $("stat-count").textContent = P.length;
  var layerSel = $("filter-layer"), catSel = $("filter-cat");
  var layers = {}, cats = {};
  P.forEach(function (p) { layers[p.layer] = 1; cats[p.category] = 1; });
  Object.keys(layers).sort().forEach(function (l) { layerSel.insertAdjacentHTML("beforeend", '<option value="' + l + '">OSI 第 ' + l + ' 层</option>'); });
  Object.keys(cats).sort().forEach(function (c) { catSel.insertAdjacentHTML("beforeend", '<option value="' + esc(c) + '">' + esc(c) + "</option>"); });

  function renderGrid() {
    var q = $("search").value.trim().toLowerCase();
    var lf = layerSel.value, cf = catSel.value, df = $("filter-depth").value;
    var list = P.filter(function (p) {
      if (lf && String(p.layer) !== lf) return false;
      if (cf && p.category !== cf) return false;
      if (df && p.depth !== df) return false;
      if (q) {
        var hay = (p.name + " " + p.fullName + " " + p.ports + " " + p.rfc + " " + p.keywords + " " + p.summary + " " + p.slug).toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    $("atlas-count").textContent = "共 " + list.length + " 个协议（点击卡片查看详情；★核心含报文头/流程/过滤器详解）";
    $("grid").innerHTML = list.map(function (p) {
      return '<button class="card" data-slug="' + esc(p.slug) + '"><h3>' + esc(p.name) + (p.depth === "core" ? " ★" : "") + '</h3><div>' +
        '<span class="badge">OSI L' + p.layer + " · " + esc(p.tcpipLayer) + '</span><span class="badge">' + esc(p.category) + '</span>' +
        (p.ports ? '<span class="badge">' + esc(p.ports) + "</span>" : "") +
        (p.depth === "core" ? '<span class="badge core">核心详解</span>' : "") +
        "</div><p>" + esc(p.summary) + "</p></button>";
    }).join("") || '<p class="hint">无匹配协议，换个关键词试试。</p>';
    document.querySelectorAll(".card").forEach(function (c) { c.addEventListener("click", function () { openDrawer(c.dataset.slug); }); });
  }
  ["search", "filter-layer", "filter-cat", "filter-depth"].forEach(function (id) {
    $(id).addEventListener("input", renderGrid); $(id).addEventListener("change", renderGrid);
  });
  function openDrawer(slug) {
    var p = P.filter(function (x) { return x.slug === slug; })[0]; if (!p) return;
    var h = "<h2>" + esc(p.name) + " — " + esc(p.fullName) + "</h2>";
    h += "<table><tr><th>OSI 层</th><td>第 " + p.layer + " 层</td></tr><tr><th>TCP/IP 层</th><td>" + esc(p.tcpipLayer) + "</td></tr>" +
      "<tr><th>分类</th><td>" + esc(p.category) + "</td></tr><tr><th>端口</th><td>" + esc(p.ports || "—") + "</td></tr>" +
      "<tr><th>RFC / 标准</th><td>" + esc(p.rfc || "—") + "</td></tr><tr><th>年份</th><td>" + esc(p.year) + "</td></tr>" +
      "<tr><th>关键词</th><td>" + esc(p.keywords) + "</td></tr><tr><th>深度</th><td>" + (p.depth === "core" ? "核心" : "标准") + "</td></tr></table>";
    h += "<p>" + esc(p.summary) + "</p>";
    if (p.headerFields) { h += "<h3>报文头字段</h3><table><tr><th>字段</th><th>位数</th><th>说明</th></tr>" + p.headerFields.map(function (f) { return "<tr><td>" + esc(f[0]) + "</td><td>" + esc(f[1]) + "</td><td>" + esc(f[2]) + "</td></tr>"; }).join("") + "</table>"; }
    if (p.flow) { h += "<h3>工作流程</h3><ol>" + p.flow.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>"; }
    if (p.wiresharkFilter) { h += "<h3>Wireshark 过滤器</h3><pre class='result'>" + esc(p.wiresharkFilter) + "</pre>"; }
    if (p.example) { h += "<h3>示例</h3><p>" + esc(p.example) + "</p>"; }
    if (p.pitfalls) { h += "<h3>常见坑</h3><ul>" + p.pitfalls.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>"; }
    $("drawer-body").innerHTML = h; $("drawer").hidden = false;
  }
  $("drawer-close").addEventListener("click", function () { $("drawer").hidden = true; });
  renderGrid();

  // ---------- 2. Encap simulator ----------
  function encRun() {
    function sel(id) { var e = $(id); var o = e.options[e.selectedIndex]; return { bytes: parseInt(e.value, 10) + parseInt(o.dataset.extra || "0", 10), name: o.dataset.name || o.textContent }; }
    var app = sel("enc-app"), trans = sel("enc-trans"), net = sel("enc-net"), link = sel("enc-link");
    var payload = Math.max(0, parseInt($("enc-payload").value, 10) || 0);
    var mtu = Math.max(68, parseInt($("enc-mtu").value, 10) || 1500);
    var appBytes = app.bytes;
    var ipPayload = appBytes + payload + trans.bytes;
    var totalOnWire = link.bytes + net.bytes + ipPayload;
    var ipTotal = net.bytes + ipPayload;
    var fragPayloadPer = mtu - net.bytes;
    var frags = ipTotal <= mtu ? 1 : Math.ceil(ipPayload / Math.max(1, fragPayloadPer));
    var overhead = totalOnWire - payload;
    var eff = totalOnWire ? (payload / totalOnWire * 100).toFixed(1) : "0.0";
    var parts = [
      { n: link.name, b: link.bytes, c: "#f472b6" }, { n: net.name, b: net.bytes, c: "#38bdf8" },
      { n: trans.name, b: trans.bytes, c: "#a78bfa" }, { n: app.name, b: appBytes, c: "#fbbf24" }, { n: "载荷", b: payload, c: "#34d399" }
    ].filter(function (x) { return x.b > 0; });
    var sum = parts.reduce(function (a, x) { return a + x.b; }, 0) || 1;
    $("enc-stack").innerHTML = parts.map(function (x) {
      var pct = x.b / sum * 100;
      return '<div style="flex:' + x.b + ";background:" + x.c + '">' + (pct >= 10 ? x.b + "B" : "") + "</div>";
    }).join("");
    $("enc-legend").innerHTML = parts.map(function (x) {
      var pct = (x.b / sum * 100).toFixed(1);
      return '<span class="legend-item"><i style="background:' + x.c + '"></i>' + esc(x.n) + " · " + x.b + "B · " + pct + "%</span>";
    }).join("");
    $("enc-result").textContent =
      "各层开销：链路 " + link.bytes + "B + 网络 " + net.bytes + "B + 传输 " + trans.bytes + "B + 应用头 " + appBytes + "B = 头部总开销 " + (overhead) + "B\n" +
      "线上总长度：" + totalOnWire + " B（IP 报文总长 " + ipTotal + " B）\n" +
      "MTU=" + mtu + " 时分片数：" + frags + (frags > 1 ? "（每片 IP 载荷上限约 " + fragPayloadPer + "B，实际还需按 8 字节对齐；分片增加丢包与重组成本）" : "（无需分片）") + "\n" +
      "有效载荷效率：" + eff + "%\n提示：VXLAN/隧道封装选项已把外层封装计入网络层字节；教学估算值，精确值随选项字段变化。";
  }
  $("enc-run").addEventListener("click", encRun);
  ["enc-app", "enc-trans", "enc-net", "enc-link", "enc-payload", "enc-mtu"].forEach(function (id) { $(id).addEventListener("change", encRun); $(id).addEventListener("input", encRun); });
  encRun();

  // ---------- 3. TCP handshake ----------
  var hs = null;
  var OPEN_STEPS = [
    { log: "① 客户端 → 服务端：SYN seq=1000", tag: "SYN", dir: "c2s", c: "SYN-SENT", s: "SYN-RCVD", d: "客户端发送 SYN 同步序号，服务端收到后进入 SYN-RCVD。" },
    { log: "② 服务端 → 客户端：SYN seq=5000, ACK ack=1001", tag: "SYN-ACK", dir: "s2c", c: "ESTABLISHED*", s: "SYN-RCVD", d: "服务端同步自己的序号并确认客户端序号（ack=1000+1）。*客户端收到后才真正 ESTABLISHED。" },
    { log: "③ 客户端 → 服务端：ACK ack=5001", tag: "ACK", dir: "c2s", c: "ESTABLISHED", s: "ESTABLISHED", d: "连接建立完成，双方可传数据。序号按字节计数。" }
  ];
  var CLOSE_STEPS = [
    { log: "① 客户端 → 服务端：FIN seq=u", tag: "FIN", dir: "c2s", c: "FIN-WAIT-1", s: "CLOSE-WAIT", d: "主动关闭方发 FIN，只表示本方向不再发数据。" },
    { log: "② 服务端 → 客户端：ACK ack=u+1", tag: "ACK", dir: "s2c", c: "FIN-WAIT-2", s: "CLOSE-WAIT", d: "被动方先确认，应用层把剩余数据发完。" },
    { log: "③ 服务端 → 客户端：FIN seq=v", tag: "FIN", dir: "s2c", c: "TIME-WAIT", s: "LAST-ACK", d: "被动方发自己的 FIN。" },
    { log: "④ 客户端 → 服务端：ACK ack=v+1 → 等待 2MSL 后 CLOSED", tag: "ACK", dir: "c2s", c: "TIME-WAIT→CLOSED", s: "CLOSED", d: "主动方进入 TIME-WAIT（2MSL）防旧包污染新连接。" }
  ];
  function hsTotal() { return hs && hs.mode === "open" ? OPEN_STEPS.length : hs && hs.mode === "close" ? CLOSE_STEPS.length : 0; }
  function hsProgress() { var t = hsTotal(); $("hs-progress").textContent = t ? "第 " + hs.step + " 步 / 共 " + t + " 步" : "第 0 步 · 先选握手或挥手"; }
  function hsPacketReset() { var pk = $("hs-packet"); pk.style.opacity = "0"; pk.style.left = "4%"; }
  function hsReset() {
    hs = { mode: null, step: 0, cisn: 1000, sisn: 5000 };
    $("hs-client-state").textContent = "CLOSED"; $("hs-server-state").textContent = "LISTEN";
    $("hs-client-seq").textContent = "seq = —"; $("hs-server-seq").textContent = "seq = —";
    $("hs-log").innerHTML = ""; $("hs-desc").textContent = "点击「开始三次握手」后逐步推进。";
    hsPacketReset(); hsProgress();
  }
  $("hs-open").addEventListener("click", function () { hsReset(); hs.mode = "open"; $("hs-desc").textContent = "三次握手：第 0 步 / 共 3 步，点「下一步」推进。"; hsProgress(); });
  $("hs-close").addEventListener("click", function () { hsReset(); hs.mode = "close"; $("hs-client-state").textContent = "ESTABLISHED"; $("hs-server-state").textContent = "ESTABLISHED"; $("hs-desc").textContent = "四次挥手（从 ESTABLISHED 开始）：第 0 步 / 共 4 步，点「下一步」推进。"; hsProgress(); });
  $("hs-reset").addEventListener("click", hsReset);
  $("hs-step").addEventListener("click", function () {
    if (!hs || !hs.mode) { $("hs-desc").textContent = "请先点「开始三次握手」或「开始四次挥手」。"; return; }
    var steps = hs.mode === "open" ? OPEN_STEPS : CLOSE_STEPS;
    if (hs.step >= steps.length) { $("hs-desc").textContent = "流程已结束，可重置重演。"; return; }
    var st = steps[hs.step++];
    var li = document.createElement("li"); li.textContent = st.log; $("hs-log").appendChild(li);
    $("hs-client-state").textContent = st.c; $("hs-server-state").textContent = st.s; $("hs-desc").textContent = st.d;
    $("hs-client-seq").textContent = "客户端 ISN=1000"; $("hs-server-seq").textContent = "服务端 ISN=5000";
    var pk = $("hs-packet"); pk.textContent = st.tag; pk.style.opacity = "1";
    pk.style.left = st.dir === "c2s" ? "4%" : "88%"; // 先归位无过渡
    pk.style.transition = "none"; void pk.offsetWidth;
    pk.style.transition = "left .8s ease, opacity .3s";
    pk.style.left = st.dir === "c2s" ? "88%" : "4%"; // 再滑向对端
    hsProgress();
  });
  hsReset();

  // ---------- 4. Hex parser ----------
  var SAMPLES = {
    ipv4tcp: "00 11 22 33 44 55 66 77 88 99 aa bb 08 00 45 00 00 28 00 01 40 00 40 06 00 00 c0 a8 01 02 5d b8 d8 22 c0 50 00 50 00 00 03 e8 00 00 00 00 50 02 72 10 00 00 00 00",
    ipv4udp: "00 11 22 33 44 55 66 77 88 99 aa bb 08 00 45 00 00 21 00 02 00 00 40 11 00 00 c0 a8 01 02 08 08 08 08 c3 50 00 35 00 0d 00 00 12 34 01 00",
    ipv6tcp: "00 11 22 33 44 55 66 77 88 99 aa bb 86 dd 60 00 00 00 00 14 06 40 20 01 0d b8 00 00 00 00 00 00 00 00 00 00 00 01 20 01 0d b8 00 00 00 00 00 00 00 00 00 00 00 02 01 bb 1f 90 00 00 00 01 00 00 00 00 50 02 72 10 00 00 00 00",
    icmp: "00 11 22 33 44 55 66 77 88 99 aa bb 08 00 45 00 00 1c 00 03 00 00 40 01 00 00 c0 a8 01 02 c0 a8 01 01 08 00 00 00 00 01 00 01"
  };
  document.querySelectorAll("[data-sample]").forEach(function (b) { b.addEventListener("click", function () { $("parse-input").value = SAMPLES[b.dataset.sample]; parseRun(); }); });
  function hexBytes(s) { var m = s.replace(/0x/gi, " ").match(/[0-9a-fA-F]{2}/g); return m ? m.map(function (x) { return parseInt(x, 16); }) : []; }
  function mac(b, o) { return b.slice(o, o + 6).map(function (x) { return x.toString(16).padStart(2, "0"); }).join(":"); }
  function ipv4s(b, o) { return b.slice(o, o + 4).join("."); }
  function ipv6s(b, o) { var parts = []; for (var i = 0; i < 16; i += 2) parts.push(((b[o + i] << 8) | b[o + i + 1]).toString(16)); return parts.join(":").replace(/(:0){2,}/, "::"); }
  function tcpFlags(f) { var names = []; if (f & 2) names.push("SYN"); if (f & 16) names.push("ACK"); if (f & 1) names.push("FIN"); if (f & 4) names.push("RST"); if (f & 8) names.push("PSH"); if (f & 32) names.push("URG"); return names.join("|") || "无"; }
  function parseRun() {
    var b = hexBytes($("parse-input").value);
    if (b.length < 14) { $("parse-result").innerHTML = '<p class="hint">报文太短：至少需要 14 字节以太网头。请载入示例。</p>'; return; }
    var rows = [], et = (b[12] << 8) | b[13], off = 14;
    rows.push(["Ethernet 目的 MAC", mac(b, 0)], ["Ethernet 源 MAC", mac(b, 6)], ["EtherType", "0x" + et.toString(16).padStart(4, "0") + (et === 0x0800 ? " (IPv4)" : et === 0x86dd ? " (IPv6)" : et === 0x8100 ? " (VLAN)" : "")]);
    if (et === 0x8100 && b.length >= 18) { rows.push(["VLAN ID", ((b[14] & 0x0f) << 8) | b[15]]); et = (b[16] << 8) | b[17]; off = 18; rows.push(["内层 EtherType", "0x" + et.toString(16).padStart(4, "0")]); }
    var proto = -1, l4off = -1;
    if (et === 0x0800 && b.length >= off + 20) {
      var ihl = (b[off] & 0x0f) * 4; proto = b[off + 9]; l4off = off + ihl;
      rows.push(["IPv4 版本/IHL", (b[off] >> 4) + " / " + ihl + "B"], ["IPv4 总长", (b[off + 2] << 8) | b[off + 3]], ["IPv4 TTL", b[off + 8]], ["IPv4 协议号", proto + (proto === 6 ? " (TCP)" : proto === 17 ? " (UDP)" : proto === 1 ? " (ICMP)" : "")], ["IPv4 源", ipv4s(b, off + 12)], ["IPv4 目的", ipv4s(b, off + 16)]);
    } else if (et === 0x86dd && b.length >= off + 40) {
      proto = b[off + 6]; l4off = off + 40;
      rows.push(["IPv6 载荷长", (b[off + 4] << 8) | b[off + 5]], ["IPv6 Next Header", proto], ["IPv6 跳限", b[off + 7]], ["IPv6 源", ipv6s(b, off + 8)], ["IPv6 目的", ipv6s(b, off + 24)]);
    }
    if (l4off > 0 && proto === 6 && b.length >= l4off + 20) {
      rows.push(["TCP 源端口", (b[l4off] << 8) | b[l4off + 1]], ["TCP 目的端口", (b[l4off + 2] << 8) | b[l4off + 3]], ["TCP Seq", (b[l4off + 4] * 16777216 + (b[l4off + 5] << 16) + (b[l4off + 6] << 8) + b[l4off + 7])], ["TCP 头长", ((b[l4off + 12] >> 4) * 4) + "B"], ["TCP Flags", tcpFlags(b[l4off + 13])], ["TCP 窗口", (b[l4off + 14] << 8) | b[l4off + 15]]);
    } else if (l4off > 0 && proto === 17 && b.length >= l4off + 8) {
      rows.push(["UDP 源端口", (b[l4off] << 8) | b[l4off + 1]], ["UDP 目的端口", (b[l4off + 2] << 8) | b[l4off + 3]], ["UDP 长度", (b[l4off + 4] << 8) | b[l4off + 5]]);
    } else if (l4off > 0 && proto === 1 && b.length >= l4off + 4) {
      rows.push(["ICMP Type", b[l4off] + (b[l4off] === 8 ? " (Echo Request)" : b[l4off] === 0 ? " (Echo Reply)" : "")], ["ICMP Code", b[l4off + 1]]);
    } else if (l4off > 0) { rows.push(["上层协议", "协议号 " + proto + "（未展开或报文不完整）"]); }
    rows.push(["总字节数", b.length]);
    $("parse-result").innerHTML = "<table><tr><th>字段</th><th>值</th></tr>" + rows.map(function (r) { return "<tr><td>" + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td></tr>"; }).join("") + "</table>";
  }
  $("parse-run").addEventListener("click", parseRun);
  $("parse-input").value = SAMPLES.ipv4tcp; parseRun();

  // ---------- 5. Subnet ----------
  function ipToInt(s) { var p = s.split(".").map(Number); if (p.length !== 4 || p.some(function (x) { return isNaN(x) || x < 0 || x > 255; })) return null; return ((p[0] * 256 + p[1]) * 256 + p[2]) * 256 + p[3]; }
  function intToIp(n) { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join("."); }
  function subnetRun() {
    var v = $("subnet-input").value.trim().split("/"); var ip = ipToInt(v[0] || ""); var pre = parseInt(v[1], 10);
    if (ip === null || isNaN(pre) || pre < 0 || pre > 32) { $("subnet-result").textContent = "输入无效，格式示例：192.168.1.37/26"; return; }
    var mask = pre === 0 ? 0 : (0xffffffff << (32 - pre)) >>> 0;
    var net = (ip & mask) >>> 0, bcast = (net | (~mask >>> 0)) >>> 0, total = Math.pow(2, 32 - pre);
    var usable = pre >= 31 ? (pre === 32 ? 1 : 2) : total - 2;
    var first = pre >= 31 ? net : net + 1, last = pre >= 31 ? bcast : bcast - 1;
    $("subnet-result").textContent = "网络地址: " + intToIp(net) + "/" + pre + "\n广播地址: " + intToIp(bcast) + "\n子网掩码: " + intToIp(mask) + "\n地址总数: " + total + "\n可用主机数: " + usable + "\n可用范围: " + intToIp(first) + " – " + intToIp(last) + "\n通配符掩码: " + intToIp((~mask) >>> 0);
  }
  $("subnet-run").addEventListener("click", subnetRun);
  $("subnet-input").addEventListener("input", subnetRun);
  subnetRun();

  // ---------- 6. Journey ----------
  var journey = { steps: [], idx: 0, playing: false, timer: null };
  function journeyBuild() {
    var raw = $("journey-url").value.trim() || "https://example.com/";
    var u; try { u = new URL(raw); } catch (e) { u = new URL("https://example.com/"); }
    var https = u.protocol === "https:";
    journey.steps = [
      ["1 · URL 解析与 HSTS", "浏览器拆出协议/主机/路径；若命中 HSTS，http 自动升级 https。本例：" + u.href],
      ["2 · DNS 解析（DNS/DoH）", "查缓存→递归服务器把 " + u.hostname + " 解析为 IP（A/AAAA），TTL 决定缓存时长。"],
      ["3 · 建立连接", https ? "先 TCP 三次握手，再 TLS 1.3 握手（1-RTT，证书验证 + ALPN 协商 h2/http1.1）；若走 HTTP/3 则改为 QUIC over UDP。" : "TCP 三次握手到 " + u.hostname + ":80。"],
      ["4 · 发送 HTTP 请求", "GET " + (u.pathname || "/") + "，带 Host、User-Agent、Cookie 等头。"],
      ["5 · 服务器处理与响应", "可能经 CDN/负载均衡/反向代理，回源取数据后返回状态行、响应头与 HTML。沿途经过 NAT、路由（OSPF/BGP 选路）、交换（VLAN/MAC 转发）。"],
      ["6 · 浏览器渲染", "解析 HTML→构建 DOM/CSSOM→请求 CSS/JS/图片（每个子资源重复解析/复用连接）→布局、绘制、上屏。"],
      ["7 · 后续交互", "WebSocket 长连接、AJAX/fetch、缓存校验（ETag/Last-Modified）持续工作，连接保活复用。"]
    ];
    journey.idx = 0;
  }
  function journeyStop() { journey.playing = false; if (journey.timer) { clearInterval(journey.timer); journey.timer = null; } $("journey-play").textContent = "▶ 播放"; }
  function journeyRender() {
    $("journey-list").innerHTML = journey.steps.map(function (s, i) {
      var cls = i === journey.idx ? "jstep current" : i < journey.idx ? "jstep done" : "jstep todo";
      return '<li class="' + cls + '"><strong>' + esc(s[0]) + "</strong><br>" + esc(s[1]) + "</li>";
    }).join("");
    $("journey-progress").textContent = "第 " + (journey.idx + 1) + " / 共 " + journey.steps.length + " 步";
    $("journey-play").textContent = journey.playing ? "⏸ 暂停" : "▶ 播放";
  }
  function journeyGo(d) { journey.idx = Math.min(journey.steps.length - 1, Math.max(0, journey.idx + d)); journeyRender(); }
  $("journey-run").addEventListener("click", function () { journeyStop(); journeyBuild(); journeyRender(); });
  $("journey-next").addEventListener("click", function () { journeyStop(); journeyGo(1); });
  $("journey-prev").addEventListener("click", function () { journeyStop(); journeyGo(-1); });
  $("journey-play").addEventListener("click", function () {
    if (journey.playing) { journeyStop(); journeyRender(); return; }
    if (journey.idx >= journey.steps.length - 1) journey.idx = 0;
    journey.playing = true; journeyRender();
    journey.timer = setInterval(function () { if (journey.idx >= journey.steps.length - 1) { journeyStop(); journeyRender(); return; } journeyGo(1); }, 1500);
  });
  journeyBuild(); journeyRender();

  // ---------- 7. Quiz ----------
  var quiz = null;
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function buildQuiz() {
    var qs = [], pool = shuffle(P.slice());
    for (var i = 0; i < pool.length && qs.length < 10; i++) {
      var p = pool[i];
      if (qs.length % 2 === 0) {
        var layers = shuffle([1, 2, 3, 4, 5, 6, 7].filter(function (l) { return l !== p.layer; })).slice(0, 3);
        qs.push({ q: "「" + p.name + "」位于 OSI 第几层？", opts: shuffle([p.layer].concat(layers)).map(function (l) { return "第 " + l + " 层"; }), ans: "第 " + p.layer + " 层",
          explain: p.name + "（" + p.fullName + "）是 OSI 第 " + p.layer + " 层协议，属" + p.category + "类。" + p.summary });
      } else if (p.ports) {
        var others = shuffle(P.filter(function (x) { return x.ports && x.slug !== p.slug; })).slice(0, 3).map(function (x) { return x.ports; });
        if (others.length === 3) qs.push({ q: "「" + p.name + "」的常用端口/标识是？", opts: shuffle([p.ports].concat(others)), ans: p.ports,
          explain: p.name + " 的常用端口/标识是 " + p.ports + "。" + p.summary });
      }
    }
    return qs.slice(0, 10);
  }
  $("quiz-start").addEventListener("click", function () {
    quiz = { qs: buildQuiz(), idx: 0, score: 0, records: [], locked: false };
    $("quiz-score").textContent = ""; $("quiz-review").innerHTML = ""; showQ();
  });
  $("quiz-next").addEventListener("click", function () {
    if (!quiz || !quiz.locked) return;
    quiz.idx++; quiz.locked = false; showQ();
  });
  function showQ() {
    if (!quiz) return;
    $("quiz-feedback").hidden = true; $("quiz-next").hidden = true;
    if (quiz.idx >= quiz.qs.length) {
      $("quiz-box").innerHTML = "";
      $("quiz-score").textContent = "完成！得分 " + quiz.score + " / " + quiz.qs.length + (quiz.score >= 8 ? " 🏆 吃透了！" : quiz.score >= 5 ? " 👍 继续加油" : " 📚 建议回图谱复习");
      $("quiz-review").innerHTML = "<h3>逐题回顾</h3>" + quiz.records.map(function (r, i) {
        return '<p class="' + (r.ok ? "review-ok" : "review-bad") + '">' + (r.ok ? "✅" : "❌") + " 第 " + (i + 1) + " 题：" + esc(r.q) + "<br>你的答案：" + esc(r.chosen) + (r.ok ? "" : " · 正确答案：" + esc(r.ans)) + "</p>";
      }).join("");
      return;
    }
    var q = quiz.qs[quiz.idx];
    $("quiz-box").innerHTML = "<h3>第 " + (quiz.idx + 1) + " / " + quiz.qs.length + " 题：" + esc(q.q) + "</h3>" + q.opts.map(function (o) { return '<button class="quiz-opt">' + esc(o) + "</button>"; }).join("");
    $("quiz-score").textContent = "当前得分：" + quiz.score;
    document.querySelectorAll(".quiz-opt").forEach(function (b) {
      b.addEventListener("click", function () { answerQ(b, q); });
    });
  }
  function answerQ(b, q) {
    if (!quiz || quiz.locked) return;
    quiz.locked = true;
    var chosen = b.textContent, ok = chosen === q.ans;
    if (ok) quiz.score++;
    quiz.records.push({ q: q.q, chosen: chosen, ans: q.ans, ok: ok });
    document.querySelectorAll(".quiz-opt").forEach(function (x) {
      x.disabled = true;
      if (x.textContent === q.ans) { x.classList.add("opt-correct"); }
      if (x === b && !ok) { x.classList.add("opt-wrong"); }
    });
    var fb = $("quiz-feedback");
    fb.hidden = false;
    fb.className = "quiz-feedback " + (ok ? "ok" : "bad");
    fb.innerHTML = (ok ? "✅ 答对了！" : "❌ 答错了。正确答案：" + esc(q.ans)) + "<br><span>" + esc(q.explain) + "</span>";
    $("quiz-next").hidden = false;
    $("quiz-next").textContent = quiz.idx >= quiz.qs.length - 1 ? "看结果 ▶" : "下一题 ▶";
    $("quiz-score").textContent = "当前得分：" + quiz.score;
  }
})();

