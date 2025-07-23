# 📁 File Tree Generator

VS Code extension to generate and export a clean file tree of your workspace or any selected folder.

## ✨ Features

- 📄 Outputs as `file-tree.md`
- 🖼️ Uses custom icons (`file.png`, `folder.png`)
- 🎛️ Toggle icons on/off via settings
- 🚫 Supports folder exclusion (e.g. `node_modules`, `venv`)
- 📋 View in Markdown Preview (`Ctrl+Shift+V`)

## 🛠️ Usage

### 🔧 Command Palette

- `Ctrl+Shift+P` → `Generate File Tree`

### 🖱️ Context Menu

- Right click on any folder → `Generate File Tree from Here`

## ⚙️ Settings

```json
"fileTreeGenerator.showIcons": true,
"fileTreeGenerator.excludeFolders": ["node_modules", "venv"]
