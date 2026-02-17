## Why

首次使用「逆向待辦清單」的使用者需要引導來理解這個獨特的概念和功能。沒有適當的引導，使用者可能不了解如何使用這個應用程式，導致使用體驗不佳和流失。現在建立 onboarding 流程可以幫助使用者快速上手，提升留存率和滿意度。

## What Changes

- 新增 onboarding modal 引導流程，包含三個步驟
- 步驟一：歡迎畫面，解釋「逆向待辦清單」概念
- 步驟二：功能介紹（輸入框、時間軸、標籤、統計）
- 步驟三：引導完成第一筆記錄
- 使用 LocalStorage 記錄 onboarding 完成狀態，完成後不再顯示
- 新增 `js/onboarding.js` 模組處理 onboarding 邏輯
- 新增 `styles/onboarding.css` 樣式檔案（或整合到 main.css）
- 更新 `index.html` 加入 onboarding container
- 更新 `js/app.js` 在初始化時檢查並顯示 onboarding

## Capabilities

### New Capabilities
- `onboarding-flow`: 首次使用引導流程，包含歡迎畫面、功能介紹、引導記錄、完成狀態管理

### Modified Capabilities

## Impact

**新增檔案**:
- `js/onboarding.js` - Onboarding 主要邏輯和流程控制
- `styles/onboarding.css` - Modal、步驟指示器、按鈕等樣式

**修改檔案**:
- `index.html` - 加入 onboarding container 元素
- `js/app.js` - 初始化時檢查 `whyd_onboarding_completed` 並觸發 onboarding

**依賴**:
- 使用 `js/store.js` 的 LocalStorage 功能來儲存完成狀態
- 使用 `js/utils.js` 的工具函數
- 樣式需與現有 `main.css` 深色主題保持一致

**資料**:
- LocalStorage key: `whyd_onboarding_completed` (boolean)
