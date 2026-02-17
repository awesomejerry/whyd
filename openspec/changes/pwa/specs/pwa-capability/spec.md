# PWA Capability

PWA (Progressive Web App) 核心功能，提供離線支援和安裝能力。

## Requirements

### REQ-001: Web App Manifest
- 應用必須提供有效的 `manifest.json` 檔案
- Manifest 必須包含以下欄位：
  - `name`: "WHYD"
  - `short_name`: "WHYD"
  - `description`: "逆向待辦清單 - 記錄你完成了什麼"
  - `start_url`: "/"
  - `display`: "standalone"
  - `orientation`: "portrait"
  - `theme_color`: "#1a1a2e"
  - `background_color`: "#1a1a2e"
  - `icons`: 包含應用圖示

### REQ-002: Service Worker 註冊
- 應用必須在頁面載入時註冊 Service Worker
- Service Worker 檔案位於根目錄：`/service-worker.js`
- 註冊必須支援更新檢測

### REQ-003: 離線快取
- Service Worker 必須使用 Cache API 快取靜態資源
- 快取策略：Cache First, Network Fallback
- 必須快取以下資源類型：
  - HTML 檔案
  - CSS 檔案
  - JavaScript 檔案
  - 圖示檔案（SVG）

### REQ-004: 版本控制
- 快取名稱必須包含版本號
- 版本更新時必須清除舊快取
- 版本號定義為常數，方便維護

### REQ-005: PWA Meta Tags
- index.html 必須包含以下 meta tags：
  - `<link rel="manifest" href="manifest.json">`
  - `<meta name="theme-color" content="#1a1a2e">`
  - `<meta name="apple-mobile-web-app-capable" content="yes">`
  - `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`
  - `<meta name="apple-mobile-web-app-title" content="WHYD">`

## Acceptance Criteria

- [ ] 應用可在離線狀態下正常載入和使用
- [ ] 應用可透過瀏覽器「安裝」功能加入主畫面
- [ ] Lighthouse PWA audit 分數 >= 90
- [ ] 現有功能不受影響
