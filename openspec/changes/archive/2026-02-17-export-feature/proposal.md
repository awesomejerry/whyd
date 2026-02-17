## Why

用戶需要將 WHYD 的成就記錄匯出為外部檔案，以便備份、遷移或與其他工具整合。目前無法將資料從應用程式中取出，這限制了數據的可用性。

## What Changes

- 新增匯出功能模組，支援 JSON 和 CSV 兩種格式
- 提供日期範圍選擇器，讓用戶可選擇匯出特定時間區間的資料
- 新增匯出成功/失敗的提示機制
- 在底部導航列的 📤 按鈕觸發匯出 Modal

## Capabilities

### New Capabilities
- `export-feature`: 資料匯出功能，包含格式選擇、日期範圍過濾、檔案下載

### Modified Capabilities
- 無

## Impact

- 新增檔案：`js/export-feature.js`
- 修改檔案：`styles/main.css`（新增 Modal 和表單樣式）
- 修改檔案：`index.html`（取消 export-feature.js 的註解）
- 相依模組：Store (js/store.js)、Utils (js/utils.js)
