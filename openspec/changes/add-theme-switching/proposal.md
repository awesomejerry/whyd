## Why

用戶需要深色/淺色主題切換功能，以適應不同使用環境和個人偏好。現有設計使用單一淺色主題，缺乏夜間使用或個人化需求的支援。

## What Changes

- 新增 CSS 變數系統支援深色/淺色主題
- 新增主題切換按鈕（☀️/🌙 圖標）
- 使用 `data-theme` 屬性控制主題狀態
- 使用 localStorage 記住用戶偏好
- 預設使用深色主題
- 切換時提供平滑過渡效果

## Capabilities

### New Capabilities
- `theme-switching`: 主題切換功能，包含深色/淺色主題定義、切換按鈕、用戶偏好持久化

### Modified Capabilities
- `ui-styles`: 更新現有 CSS 變數以支援主題切換

## Impact

- `styles/main.css` - 新增主題變數定義
- `js/theme.js` - 新增主題切換邏輯
- `index.html` - 新增切換按鈕和引入 theme.js
