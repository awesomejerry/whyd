## Why

用戶需要一個快速、直覺的方式來記錄每天完成的事項。目前的 WHYD 應用缺少核心輸入功能，用戶無法添加新的成就記錄。這個功能是整個應用的基礎，應該是用戶最常互動的介面元素。

一個永遠可見、易於使用的輸入框能讓用戶在任何時候快速記錄成就，降低記錄門檻，提高使用頻率。

## What Changes

- 在主介面頂部新增永久可見的輸入框區塊
- 實作文字輸入欄位，支援 Enter 鍵提交
- 新增提交按鈕作為替代提交方式
- 提交成功後顯示視覺動畫回饋
- 整合現有的 Store.addEntry() API 將記錄儲存至 LocalStorage
- 提交後自動清空輸入框，準備下一次輸入
- 基本輸入驗證（非空白檢查）

## Capabilities

### New Capabilities
- `quick-entry`: 快速輸入功能 - 永遠可見的輸入框讓用戶快速記錄完成的事項，支援鍵盤和按鈕兩種提交方式，並提供即時視覺回饋

### Modified Capabilities
- 無（這是新功能，不修改現有功能的需求）

## Impact

**新增檔案**：
- `js/core-input.js` - 核心輸入模組實作

**修改檔案**：
- 無需修改現有檔案，HTML 中已預留 `#input-section` 區域

**依賴**：
- `js/store.js` - 使用 Store.addEntry() API
- `styles/main.css` - 需要對應的樣式（可能在其他 change 中定義）

**API 整合**：
- 呼叫 `Store.addEntry(text, tags)` 儲存記錄
- 提交後可能需要觸發事件通知其他模組（timeline-view, streak-tracker 等）

**用戶體驗**：
- 輸入框永遠可見，位於主介面頂部
- 支援 Enter 鍵快速提交（效率優先）
- 提供按鈕作為替代提交方式（可訪問性）
- 動畫回饋提升用戶滿意度
