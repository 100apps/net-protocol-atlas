# 贡献指南

欢迎补协议、修数据、加功能！本项目刻意保持**纯静态、零依赖、零构建**。

## 补一条协议（最欢迎的 PR）
1. 在 `data/protocols.json` 追加一个对象（字段见下），并同步 `data/protocols.js`：文件内容为 `window.PROTOCOLS = <与 json 完全一致的数组>;`。推荐改完 json 后用一行 Python 同步：
   `python3 -c "import json,pathlib; d=json.loads(pathlib.Path('data/protocols.json').read_text()); pathlib.Path('data/protocols.js').write_text('window.PROTOCOLS = '+json.dumps(d,ensure_ascii=False,indent=2)+';\n')"`
2. 必填：`slug`（小写连字符、全库唯一）、`name`、`fullName`、`layer`（OSI 1-7）、`tcpipLayer`、`category`、`ports`、`rfc`、`year`、`summary`（中文 1-2 句）、`keywords`、`depth`（`core`/`standard`）。
3. **RFC 号与端口必须确知才写，不确定留空字符串 `""`，严禁编造。**
4. 标 `core` 的协议必须再给全：`headerFields`（[字段,位数,说明] 数组）、`flow`（步骤数组）、`wiresharkFilter`、`example`、`pitfalls`。
5. 提交前自检：`python3 scripts/validate_data.py` 必须通过；再冒烟 CLI：`python3 tools/netproto.py info <你的slug>`。

## 改 Web / CLI
- Web 只用原生 HTML/CSS/JS，不引入任何框架与外部 CDN，保证 `file://` 可打开。
- CLI 只用 Python 标准库。
- 新功能请同时更新 README 功能表与 VALIDATION 说明。

## 规范
- 中文文案为主，协议名保留英文原文。
- 一个 PR 只做一件事；提交信息建议 `feat(data): add <slug>` / `fix: ...` / `docs: ...` 格式。
