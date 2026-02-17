## Why

WHYD 目前是一個純網頁應用，需要網路才能載入。用戶希望在離線環境下也能使用，並且能將應用安裝到裝置主畫面上，獲得更好的使用體驗。PWA 功能可以解決這些問題，提供離線支援、快速載入和原生應用般的體驗。

## What Changes

- 新增 `manifest.json` - PWA 配置檔案，定義應用名稱、圖示、主題色等
- 新增 `service-worker.js` - Service Worker 處理離線快取
- 更新 `index.html` - 加入 PWA 相關 meta tags 和 manifest 連結
- 可能需要新增圖示檔案（192x192, 512x512）

## Capabilities

### New Capabilities
- `pwa-capability`: PWA 核心功能，包含 manifest 配置、Service Worker 快取策略、離線支援

### Modified Capabilities
無

## Impact

- 新增檔案：`manifest.json`, `service-worker.js`
- 修改檔案：`index.html`
- 快取的靜態資源：所有 HTML, CSS, JS 檔案
- 不影響現有功能和樣式
