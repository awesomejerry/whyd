# Tasks: Daily Summary

## Status Legend
- [ ] 待辦
- [~] 進行中
- [x] 完成

---

## Phase 1: Core Implementation

### Task 1.1: 建立 DailySummary 模組
- [x] 建立 `js/daily-summary.js`
- [x] 實作 `DailySummary.init()`
- [x] 實作 `DailySummary.show()`
- [x] 實作 `DailySummary.hide()`
- [x] 實作 `DailySummary.render()`

### Task 1.2: 統計計算功能
- [x] 實作 `DailySummary.calculateStats()`
- [x] 計算總數
- [x] 計算最早/最晚時間
- [x] 計算標籤分布

### Task 1.3: 重要標記功能
- [x] 實作 `DailySummary.setHighlight()`
- [x] 實作 `DailySummary.getHighlight()`
- [x] localStorage 儲存/讀取

### Task 1.4: 晚上提示功能
- [x] 實作 `DailySummary.checkEveningPrompt()`
- [x] 時間檢查 (20:00-23:00)
- [x] localStorage 提示記錄

---

## Phase 2: UI Implementation

### Task 2.1: HTML 結構
- [x] 確認 index.html 已有 summary-section
- [x] 動態生成統計卡片
- [x] 動態生成標籤分布
- [x] 動態生成成就列表

### Task 2.2: CSS 樣式
- [x] 新增 summary-container 樣式
- [x] 新增 stat-card 樣式
- [x] 新增 tag-bar 樣式
- [x] 新增 highlight-item 樣式
- [x] 響應式設計

### Task 2.3: 事件綁定
- [x] 綁定底部 🌙 按鈕
- [x] 綁定關閉按鈕
- [x] 綁定成就選擇事件

---

## Phase 3: Integration

### Task 3.1: 整合至 App
- [x] 更新 index.html 引用 daily-summary.js
- [x] 確認 app.js 已有防禦性檢查

### Task 3.2: 測試驗證
- [x] 驗證開啟/關閉功能
- [x] 驗證統計計算正確性
- [x] 驗證重要標記功能
- [x] 驗證晚上提示功能

---

## Completion Criteria
- [x] 所有功能正常運作
- [x] 符合 UI 規範
- [x] 使用 CSS 變數
- [x] 防禦性檢查
