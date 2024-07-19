在 VS Code 中設置 Prettier 作為 JavaScript 的代碼格式化工具，可以通過以下步驟來完成：

### 1. 安裝 Prettier 擴展

首先，安裝 Prettier extension

### 2. 設置 Prettier 為默認格式化工具

1. 打開命令面板（快捷鍵 `Ctrl+Shift+P`）。
2. 搜索並選擇 "Preferences: Open Settings (JSON)"。
3. 添加或更新以下設置：

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

這些設置將確保 Prettier 被設置為默認格式化工具並在保存時自動格式化 JavaScript 文件。

### 3. 創建或更新 Prettier 配置文件

你可以在項目的根目錄下創建一個 `.prettierrc` 配置文件來定制 Prettier 的行為。以下是一個示例 `.prettierrc` 文件：

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

這些設置指定了 Prettier 的一些基本配置，例如使用單引號，tab 宽度為 2，以及在 ES5 中使用尾隨逗號。

### 4. 忽略特定文件或文件夾（可選）

如果你想忽略特定文件或文件夾，可以創建一個 `.prettierignore` 文件並添加需要忽略的路徑。例如：

```text
node_modules/
dist/
build/
```

### 5. 格式化代碼

現在，你可以在 VS Code 中格式化 JavaScript 代碼了。你可以通過以下方式格式化代碼：

- 保存文件時自動格式化（如果啟用了 `editor.formatOnSave`）。
- 手動格式化：打開命令面板（快捷鍵 `Ctrl+Shift+P`），搜索並選擇 "Format Document"。

這樣，你就已經在 VS Code 中成功設置了 Prettier 作為 JavaScript 的代碼格式化工具。如果有任何問題或需要進一步的幫助，隨時告訴我。

# 執行測試

Terminal run `$npm test`.
