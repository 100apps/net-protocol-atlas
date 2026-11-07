#!/usr/bin/env python3
"""校验 data/protocols.json：slug 唯一、必填字段、核心详解完整性、计数。"""
import json, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
data = json.loads((ROOT / "data" / "protocols.json").read_text(encoding="utf-8"))
errors = []
REQ = ["slug","name","fullName","layer","tcpipLayer","category","ports","rfc","year","summary","keywords","depth"]
CORE_REQ = ["headerFields","flow","wiresharkFilter","example","pitfalls"]
slugs = [p.get("slug","") for p in data]
if len(slugs) != len(set(slugs)):
    from collections import Counter
    errors += [f"重复 slug: {s}" for s,c in Counter(slugs).items() if c>1]
for p in data:
    for k in REQ:
        if k not in p: errors.append(f'{p.get("slug","?")}: 缺字段 {k}')
    if not (1 <= int(p.get("layer",0)) <= 7): errors.append(f'{p.get("slug")}: layer 越界 {p.get("layer")}')
    if p.get("depth") not in ("core","standard"): errors.append(f'{p.get("slug")}: depth 非法')
    if p.get("depth") == "core":
        for k in CORE_REQ:
            if not p.get(k): errors.append(f'{p.get("slug")}: core 缺详解字段 {k}')
print(f"协议总数: {len(data)}")
print(f"核心协议: {sum(1 for p in data if p['depth']=='core')}")
print(f"标准协议: {sum(1 for p in data if p['depth']=='standard')}")
from collections import Counter
print("按层分布: " + ", ".join(f"L{k}={v}" for k,v in sorted(Counter(p['layer'] for p in data).items())))
# protocols.js 同源检查
js = (ROOT / "data" / "protocols.js").read_text(encoding="utf-8")
assert js.startswith("window.PROTOCOLS"), "protocols.js 缺 window.PROTOCOLS 头"
jsdata = json.loads(js[len("window.PROTOCOLS = "):].rstrip().rstrip(";"))
assert jsdata == data, "protocols.js 与 protocols.json 内容不一致"
print("protocols.js 与 protocols.json 一致: OK")
if len(data) < 140: errors.append(f"协议总数 {len(data)} < 140")
if sum(1 for p in data if p['depth']=='core') < 32: errors.append("核心协议 < 32")
if errors:
    print("校验失败:"); [print(" -", e) for e in errors]; sys.exit(1)
print("校验通过 ✓")
