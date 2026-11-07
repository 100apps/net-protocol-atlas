#!/usr/bin/env python3
"""Net Protocol Atlas CLI — 仅 Python 标准库。用法见 --help / README。"""
import argparse, ipaddress, json, random, sys
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "data" / "protocols.json"

def load():
    return json.loads(DATA.read_text(encoding="utf-8"))

def cmd_list(a):
    ps = load()
    if a.layer is not None:
        ps = [p for p in ps if p["layer"] == a.layer]
    if a.category:
        ps = [p for p in ps if a.category in p["category"]]
    for p in ps:
        print(f'{p["slug"]:16s} L{p["layer"]} {p["category"]:10s} {p["name"]:22s} {p["ports"] or "-"}')
    print(f"共 {len(ps)} 个")

def cmd_search(a):
    kw = a.kw.lower(); ps = load()
    hits = [p for p in ps if kw in (p["name"]+" "+p["fullName"]+" "+p["ports"]+" "+p["rfc"]+" "+p["keywords"]+" "+p["summary"]+" "+p["slug"]).lower()]
    for p in hits:
        print(f'{p["slug"]:16s} {p["name"]} — {p["summary"]}')
    print(f"命中 {len(hits)} 个")

def cmd_info(a):
    ps = load(); m = {p["slug"]: p for p in ps}
    p = m.get(a.slug)
    if not p:
        print(f"未找到 slug={a.slug}，可用 list 查看全部。"); return 1
    for k in ["slug","name","fullName","layer","tcpipLayer","category","ports","rfc","year","summary","keywords","depth"]:
        print(f"{k}: {p.get(k,'')}")
    if p.get("headerFields"):
        print("headerFields:")
        for f in p["headerFields"]: print(f"  - {f[0]} ({f[1]}): {f[2]}")
    if p.get("flow"): print("flow: " + " → ".join(p["flow"]))
    if p.get("wiresharkFilter"): print(f"wiresharkFilter: {p['wiresharkFilter']}")
    if p.get("example"): print(f"example: {p['example']}")
    if p.get("pitfalls"): print("pitfalls: " + "；".join(p["pitfalls"]))
    return 0

def cmd_subnet(a):
    try:
        net = ipaddress.ip_network(a.cidr, strict=False)
    except ValueError as e:
        print(f"无效 CIDR: {e}"); return 1
    if not isinstance(net, ipaddress.IPv4Network):
        print("当前 subnet 子命令仅支持 IPv4"); return 1
    hosts = list(net.hosts()) if net.num_addresses <= 2**24 else []
    print(f"网络地址: {net.network_address}/{net.prefixlen}")
    print(f"广播地址: {net.broadcast_address}")
    print(f"子网掩码: {net.netmask}")
    print(f"地址总数: {net.num_addresses}")
    print(f"可用主机数: {max(net.num_addresses-2, 1 if net.prefixlen>=31 else 0)}")
    if hosts: print(f"可用范围: {hosts[0]} - {hosts[-1]}")
    print(f"通配符掩码: {ipaddress.IPv4Address((~int(net.netmask)) & 0xFFFFFFFF)}")
    return 0

def cmd_quiz(a):
    ps = load(); random.seed()
    qs = []
    pool = random.sample(ps, k=min(20, len(ps)))
    for p in pool:
        if len(qs) >= 5: break
        if len(qs) % 2 == 0:
            wrong = random.sample([l for l in range(1,8) if l != p["layer"]], 3)
            opts = random.sample([p["layer"]]+wrong, 4)
            qs.append((f'「{p["name"]}」位于 OSI 第几层？', opts, p["layer"]))
        elif p["ports"]:
            others = random.sample([x["ports"] for x in ps if x["ports"] and x["slug"] != p["slug"]], 3)
            opts = random.sample([p["ports"]]+others, 4)
            qs.append((f'「{p["name"]}」的常用端口/标识是？', opts, p["ports"]))
    score = 0
    for i,(q,opts,ans) in enumerate(qs,1):
        print(f"\nQ{i}. {q}")
        for j,o in enumerate(opts,1): print(f"  {j}. {o}")
        print(f"答案: {ans}")
        if not a.no_interactive:
            try:
                got = input("你的选择(序号，直接回车跳过): ").strip()
                if got.isdigit() and opts[int(got)-1] == ans: score += 1; print("✓ 正确")
                elif got: print("✗ 错误")
            except EOFError:
                pass
    print(f"\n共 {len(qs)} 题" + (f"，得分 {score}" if not a.no_interactive else "（非交互模式：已打印题目与答案）"))
    return 0

def cmd_stats(a):
    ps = load()
    from collections import Counter
    print(f"协议总数: {len(ps)}")
    print(f"核心协议: {sum(1 for p in ps if p['depth']=='core')}")
    print("按 OSI 层: " + ", ".join(f"L{k}={v}" for k,v in sorted(Counter(p['layer'] for p in ps).items())))
    print("按分类: " + ", ".join(f"{k}={v}" for k,v in sorted(Counter(p['category'] for p in ps).items())))
    print("按 TCP/IP 层: " + ", ".join(f"{k}={v}" for k,v in sorted(Counter(p['tcpipLayer'] for p in ps).items())))
    return 0

def main():
    ap = argparse.ArgumentParser(prog="netproto", description="Net Protocol Atlas CLI")
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("list"); s.add_argument("--layer", type=int); s.add_argument("--category"); s.set_defaults(fn=cmd_list)
    s = sub.add_parser("search"); s.add_argument("kw"); s.set_defaults(fn=cmd_search)
    s = sub.add_parser("info"); s.add_argument("slug"); s.set_defaults(fn=cmd_info)
    s = sub.add_parser("subnet"); s.add_argument("cidr"); s.set_defaults(fn=cmd_subnet)
    s = sub.add_parser("quiz"); s.add_argument("--no-interactive", action="store_true", help="只打印题目与答案，不等待输入"); s.set_defaults(fn=cmd_quiz)
    s = sub.add_parser("stats"); s.set_defaults(fn=cmd_stats)
    a = ap.parse_args()
    r = a.fn(a)
    sys.exit(r or 0)

if __name__ == "__main__":
    main()
