## Context

WHYD 是一個使用原生 JavaScript 的單頁應用，資料儲存在 LocalStorage。時間軸視圖目前支援標籤過濾，但不支援文字搜尋。現有架構使用自定義事件進行模組間通訊。

## Goals / Non-Goals

**Goals:**
- 實現即時搜尋過濾功能
- 與現有標籤過濾並存
- 保持程式碼模組化，新增獨立 `search.js` 模組

**Non-Goals:**
- 不實現進階搜尋（日期範圍、標籤組合）
- 不實現搜尋歷史記錄
- 不實現正則表達式搜尋

## Decisions

### 1. 搜尋模組設計
**決定：** 新增獨立 `Search` 模組
**理由：** 遵循現有模組化架構（如 `TimelineView`、`TagSystem`），保持關注點分離
**替代方案：** 直接在 `TimelineView` 中實現 → 可能導致模組職責不清

### 2. 過濾機制
**決定：** 使用自定義事件 `search-filtered` 通知 TimelineView
**理由：** 與現有 `tag-selected` 事件模式一致
**實現：** Search 模組監聽輸入變化，發送包含搜尋詞的事件

### 3. 過濾邏輯位置
**決定：** TimelineView 維護 `searchQuery` 狀態，在 `getFilteredEntries()` 中應用
**理由：** 集中過濾邏輯，標籤和搜尋可以組合使用

### 4. UI 位置
**決定：** 搜尋框放在時間軸區塊頂部
**理由：** 搜尋是時間軸相關功能，應與時間軸在同一區塊

## Risks / Trade-offs

- **[效能]** 大量記錄時搜尋可能延遲 → 使用 debounce 或保持即時（記錄通常不會太多）
- **[UX]** 搜尋和標籤同時啟用時的狀態顯示 → 清空搜尋時保留標籤過濾
