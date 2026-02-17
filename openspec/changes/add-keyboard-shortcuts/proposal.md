## Why

使用者需要快速執行常見操作，而不必依賴滑鼠點擊。鍵盤快捷鍵能提升操作效率，特別是在頻繁記錄和查詢 what-I-did-today 的工作流程中。提供視覺回饋確保使用者知道快捷鍵已被觸發。

## What Changes

- 新增全域鍵盤事件監聽器
- 實作以下快捷鍵：
  - Ctrl/Cmd + N - 聚焦輸入框
  - Ctrl/Cmd + / - 顯示快捷鍵幫助面板
  - Escape - 取消當前操作（編輯、搜尋等）
  - Ctrl/Cmd + E - 匯出
  - Ctrl/Cmd + S - 統計
  - ? - 顯示快捷鍵幫助面板
- 新增 Modal 形式的幫助面板，顯示所有快捷鍵列表
- 點擊外部或按 Escape 關閉幫助面板
- 提供 visual feedback（flash 效果）當快捷鍵觸發時
- 避免在輸入框中觸發快捷鍵

## Capabilities

### New Capabilities
- `keyboard-shortcuts`: 全域鍵盤快捷鍵系統，包含快捷鍵註冊、觸發、幫助面板顯示、視覺回饋

### Modified Capabilities
None - This is a new capability that does not modify existing spec requirements.

## Impact

- **新增檔案**: `js/shortcuts.js` - 快捷鍵核心邏輯
- **修改檔案**: 
  - `index.html` - 新增幫助面板 HTML 結構
  - `styles/main.css` - 幫助面板樣式
  - `js/app.js` - 初始化快捷鍵模組
- **依賴**: 無外部依賴，使用原生 JavaScript
