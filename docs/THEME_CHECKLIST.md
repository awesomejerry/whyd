# 主題切換檢查清單

## CSS 變數 (已定義)

```css
:root {
    --bg: #0f0f1a;
    --surface: #1a1a2e;
    --text: #f1f5f9;
    --text-muted: #94a3b8;
    --border: #334155;
    --primary: #6366f1;
    --shadow: 0 1px 3px rgba(0,0,0,0.3);
}

[data-theme="light"] {
    --bg: #f8fafc;
    --surface: #ffffff;
    --text: #1e293b;
    --text-muted: #64748b;
    --border: #e2e8f0;
    --shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

## 檢查項目

### 1. CSS 檔案 (styles/)
- [ ] `main.css` - 使用 var(--text), var(--bg), var(--surface)
- [ ] `onboarding.css` - 使用 var(--text), var(--surface)

### 2. Inline Styles (js/*.js)
- [ ] `streak-tracker.js` - renderStyles() 使用 CSS 變數

### 3. 常見問題

#### 文字顏色
**問題**: 硬編碼 `color: #fff` 或 `color: #000`
**解決**: 使用 `color: var(--text)`

#### 背景顏色
**問題**: 硬編碼 `background: #1a1a2e`
**解決**: 使用 `background: var(--bg)` 或 `var(--surface)`

#### 邊框顏色
**問題**: 硬編碼 `border-color: rgba(255,255,255,0.1)`
**解決**: 使用 `border-color: var(--border)`

### 4. 新增功能時

1. **新增 CSS 樣式時**
   - 檢查是否使用 `var(--text)`, `var(--bg)`, `var(--surface)`
   - 不要使用硬編碼顏色如 `#fff`, `#000`, `#1a1a2e`

2. **新增 inline styles 時**
   - 在 JS 中使用 CSS 變數
   - 例如: `style="color: var(--text)"`

3. **新增 SVG 或圖片時**
   - 確保圖示在深色和淺色背景下都清晰可見

## 已修正的問題

| 日期 | 檔案 | 問題 | 解決 |
|------|------|------|------|
| 2026-02-18 | `main.css` | `.tag-pill` 沒有文字顏色 | 加入 `color: var(--text)` |
| 2026-02-18 | `onboarding.css` | `.guided-tag-pill` 沒有文字顏色 | 加入 `color: var(--text)` |
| 2026-02-18 | `streak-tracker.js` | inline styles 硬編碼深色 | 改用 CSS 變數 |

## 測試方法

1. **切換主題**
   - 點擊 ☀️/🌙 按鈕
   - 檢查所有文字是否可見

2. **檢查特定區域**
   - [ ] 標籤按鈕 (工作/生活/學習/健康)
   - [ ] 連續天數區塊
   - [ ] 統計圖表
   - [ ] 每日回顧
   - [ ] Onboarding 標籤

3. **強制刷新**
   - `Ctrl + Shift + R` 清除快取
