## Why

WHYD 目前僅支援繁體中文，限制了國際用戶的使用體驗。為了擴大用戶群並提升應用的可及性，需要建立完整的國際化（i18n）系統，讓用戶可以自由切換語言。

## What Changes

- 建立獨立的 i18n 模組處理語言管理和翻譯
- 建立語言檔案（zh-TW.json, en.json）存放所有翻譯文字
- 新增語言切換按鈕讓用戶切換介面語言
- 更新所有 UI 模組使用 i18n 翻譯函數
- 將用戶語言偏好儲存到 Store
- 動態更新 HTML lang 屬性

## Capabilities

### New Capabilities
- `i18n`: 國際化系統，支援語言切換、翻譯鍵值查找、語言偏好儲存

### Modified Capabilities
- `store`: 新增語言偏好儲存功能
- `ui-styles`: 新增語言切換按鈕樣式
- `onboarding-flow`: 文字改用 i18n 翻譯

## Impact

- **新增檔案**：
  - `js/i18n.js` - i18n 模組
  - `locales/zh-TW.json` - 繁體中文翻譯
  - `locales/en.json` - 英文翻譯

- **修改檔案**：
  - `js/store.js` - 新增語言偏好儲存
  - `js/app.js` - 初始化 i18n
  - `js/core-input.js` - placeholder 使用 i18n
  - `js/timeline-view.js` - 空狀態文字使用 i18n
  - `js/tag-system.js` - 標籤文字使用 i18n
  - `js/streak-tracker.js` - 連續天數文字使用 i18n
  - `js/onboarding.js` - 引導文字使用 i18n
  - `js/statistics.js` - 統計文字使用 i18n
  - `js/export-feature.js` - 匯出相關文字使用 i18n
  - `js/import-feature.js` - 匯入相關文字使用 i18n
  - `js/daily-summary.js` - 每日回顧文字使用 i18n
  - `js/modal.js` - Modal 標題和按鈕使用 i18n
  - `js/notifications.js` - 通知訊息使用 i18n
  - `index.html` - Header 文字、新增語言切換按鈕
  - `styles/main.css` - 語言切換按鈕樣式
