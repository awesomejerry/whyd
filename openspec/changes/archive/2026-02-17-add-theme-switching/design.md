## Context

WHYD 是一個純前端 JavaScript 應用，使用 CSS 變數管理樣式。目前使用單一淺色主題，需要擴展支援深色/淺色主題切換。

## Goals / Non-Goals

**Goals:**
- 使用 CSS 變數實現主題切換
- 預設深色主題
- 切換按鈕置於 footer
- localStorage 持久化用戶偏好
- 平滑過渡動畫

**Non-Goals:**
- 不支援更多主題（僅深色/淺色）
- 不支援系統主題自動切換
- 不支援自訂主題顏色

## Decisions

### 1. 主題控制方式
- 使用 `data-theme` 屬性於 `<html>` 元素
- **原因**: 標準做法，易於 CSS 選擇器定位

### 2. CSS 變數命名
- 保留現有變數名稱（`--bg`, `--surface`, `--text` 等）
- 在 `:root` 定義預設值（深色），`[data-theme="light"]` 覆蓋淺色值
- **原因**: 最小化現有樣式改動

### 3. 切換按鈕位置
- 放置於 footer，與其他功能按鈕一致
- **原因**: 保持 UI 一致性

### 4. 過渡效果
- 使用 CSS `transition` 於 `body` 和主要元素
- **原因**: 簡單有效，無需 JavaScript 動畫

## Risks / Trade-offs

- **Flash of unstyled content**: 頁面載入時可能短暫顯示錯誤主題 → 在 `<head>` 內同步讀取 localStorage 並設置主題
- **localStorage 不可用**: 部分隱私模式下無法使用 → 降級為 session 級別，不報錯
