## Context

WHYD 是一個純前端的成就追蹤應用，使用 LocalStorage 儲存資料。當前 Store 模組僅支援 getTodayEntries()，需要擴展以支援日期範圍查詢。統計功能需要視覺化展示用戶的成就記錄，使用純 Canvas 繪製（不用 Chart.js 等外部庫）。

## Goals / Non-Goals

**Goals:**
- 實現週/月統計切換功能
- 使用 Canvas 繪製三種圖表（折線圖、圓餅圖、長條圖）
- 響應式圖表，適配不同螢幕尺寸
- 擴展 Store.getEntriesByDateRange(from, to) 方法
- 遵循現有 CSS 變數規範

**Non-Goals:**
- 不使用外部圖表庫
- 不實現資料匯出功能（由 Export 模組負責）
- 不實現自訂日期範圍選擇

## Decisions

### 圖表繪製方式
- **決定**: 使用 Canvas API
- **理由**: 無外部依賴、輕量、效能好
- **替代方案**: SVG（DOM 操作較複雜）、Chart.js（增加依賴）

### 資料獲取
- **決定**: 擴展 Store 模組，新增 getEntriesByDateRange(from, to)
- **理由**: 集中資料邏輯，便於維護和測試
- **替代方案**: 在 Statistics 模組內直接過濾 entries（違反單一職責）

### 響應式處理
- **決定**: 監聽 resize 事件並重繪圖表
- **理由**: 確保圖表在各種裝置上正確顯示
- **實現**: 使用 Utils.debounce 防抖

## Risks / Trade-offs

- **Canvas 文字模糊** → 使用 devicePixelRatio 處理高 DPI 螢幕
- **無資料時的空狀態** → 顯示友善提示訊息
- **大量資料效能** → 限制顯示範圍（最多 30 天）
