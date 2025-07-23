import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

function generateMarkdownTree(
  dirPath: string,
  prefix = '',
  showIcons = true,
  excludeDirs: string[] = [],
  isLast = true
): string {
  let tree = '';
  const items = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((item) => !excludeDirs.includes(item.name))
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  const total = items.length;

  items.forEach((item, index) => {
    const isDir = item.isDirectory();
    const isItemLast = index === total - 1;
    const connector = isItemLast ? '└─ ' : '├─ ';
    const icon = showIcons ? (isDir ? '📁 ' : '📄 ') : '';
    tree += `${prefix}${connector}${icon}${item.name}\n`;

    if (isDir) {
      const newPrefix = prefix + (isItemLast ? '    ' : '│   ');
      tree += generateMarkdownTree(
        path.join(dirPath, item.name),
        newPrefix,
        showIcons,
        excludeDirs,
        isItemLast
      );
    }
  });

  return tree;
}

export function activate(context: vscode.ExtensionContext) {
  const generateFromWorkspace = vscode.commands.registerCommand(
    'file-tree-generator.generateTree',
    async () => {
      const folders = vscode.workspace.workspaceFolders;
      if (!folders) {
        vscode.window.showWarningMessage('No folder opened.');
        return;
      }

      const config = vscode.workspace.getConfiguration('fileTreeGenerator');
      const showIcons = config.get<boolean>('showIcons', true);
      const excludeDirs = config.get<string[]>('excludeFolders', ['node_modules', 'venv']);

      const rootPath = folders[0].uri.fsPath;
      const tree = generateMarkdownTree(rootPath, '', showIcons, excludeDirs);
      const filePath = path.join(rootPath, 'file-tree.md');

      fs.writeFileSync(filePath, tree, 'utf8');

      const doc = await vscode.workspace.openTextDocument(filePath);
      vscode.window.showTextDocument(doc);

      vscode.window.showInformationMessage('📁 File tree (markdown) generated at root folder.');
    }
  );

  const generateFromFolder = vscode.commands.registerCommand(
    'file-tree-generator.generateTreeFromFolder',
    async (uri: vscode.Uri) => {
      if (!uri || !fs.statSync(uri.fsPath).isDirectory()) {
        vscode.window.showErrorMessage('Please select a folder.');
        return;
      }

      const config = vscode.workspace.getConfiguration('fileTreeGenerator');
      const showIcons = config.get<boolean>('showIcons', true);
      const excludeDirs = config.get<string[]>('excludeFolders', ['node_modules', 'venv']);

      const tree = generateMarkdownTree(uri.fsPath, '', showIcons, excludeDirs);
      const filePath = path.join(uri.fsPath, 'file-tree.md');

      fs.writeFileSync(filePath, tree, 'utf8');

      const doc = await vscode.workspace.openTextDocument(filePath);
      vscode.window.showTextDocument(doc);

      vscode.window.showInformationMessage('📁 File tree (markdown) generated in selected folder.');
    }
  );

  context.subscriptions.push(generateFromWorkspace, generateFromFolder);
}

export function deactivate() {}
