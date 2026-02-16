## Why

用戶需要視覺化查看自己的成就記錄統計，了解在不同時間段內的表現趨勢、標籤分布和最活躍時段，以便更好地追蹤和改進自己的習慣。

## What Changes

- 新增 Statistics 模組，提供週/月統計切換功能
- 實現三種圖表視覺化：
  - 成就數量折線圖（顯示每日/週成就趨勢）
  - 標籤分布圓餅圖（顯示各標籤使用比例）
  - 最活躍時段長條圖（顯示 24 小時分佈）
- 使用純 Canvas 繪製圖表（無外部依賴）
- 在 index.html 中添加 stats-section 和 script 引用
- 擴展 Store 模組，新增 getEntriesByDateRange 方法

## Capabilities

### New Capabilities
- `statistics`: 統計視覺化模組，包含週/月統計切換、三種圖表繪製

### Modified Capabilities
- `store`: 新增 getEntriesByDateRange(from, to) 方法以支援日期範圍查詢

## Impact

- 新增檔案：js/statistics.js
- 修改檔案：js/store.js（新增方法）
- 修改檔案：index.html（添加 script 引用）
- 修改檔案：styles/main.css（新增統計相關樣式）
- 觸發方式：點擊底部 📊 按鈕
