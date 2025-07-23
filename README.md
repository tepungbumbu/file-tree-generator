# 📁 File Tree Generator

A simple and useful VS Code extension to **generate a clean file tree structure** of your current workspace or any selected folder.

> Supports icons, folder exclusions, and outputs as Markdown (`file-tree.md`)

---

## ✨ Features

- 📝 **Export as `file-tree.md`** in the root folder or selected path
- 🖼️ **Custom icon support** (uses `folder.png` and `file.png`)
- 📦 **Built-in emoji mode**: `📁`, `📄` (if icon images disabled)
- ✅ **Toggle icons on/off** in settings
- 🚫 **Exclude folders** like `node_modules`, `venv`, `.git`, etc.
- 🔎 **Markdown preview ready** → `Ctrl+Shift+V`
- 🖱️ **Right-click context menu** in Explorer

---

## ⚙️ Extension Settings

You can configure this extension via your workspace or user settings.

```json
{
  "fileTreeGenerator.showIcons": true,
  "fileTreeGenerator.excludeFolders": ["node_modules", "venv", ".git"]
}
