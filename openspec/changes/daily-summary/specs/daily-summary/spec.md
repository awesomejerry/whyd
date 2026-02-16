# Spec: Daily Summary Module

## Module: `js/daily-summary.js`

### Dependencies
- `Store.getTodayEntries()` - 取得今日記錄
- `Store.getTags()` - 取得標籤定義
- `Utils.formatTime()` - 格式化時間

### API

#### `DailySummary.init()`
初始化模組，綁定事件。

#### `DailySummary.show()`
顯示每日回顧頁面。

#### `DailySummary.hide()`
隱藏每日回顧頁面。

#### `DailySummary.render()`
渲染回顧內容。

#### `DailySummary.calculateStats(entries)`
計算統計資料。

**Parameters:**
- `entries` - Array - 今日記錄陣列

**Returns:**
```javascript
{
    total: number,           // 總數
    earliest: string,        // 最早時間 (HH:mm)
    latest: string,          // 最晚時間 (HH:mm)
    tagDistribution: [{      // 標籤分布
        id: string,
        name: string,
        color: string,
        count: number,
        percentage: number
    }]
}
```

#### `DailySummary.setHighlight(entryId)`
設定今日最重要的成就。

#### `DailySummary.getHighlight()`
取得今日標記的成就 ID。

#### `DailySummary.checkEveningPrompt()`
檢查是否需要晚上自動提示。

### Data Storage

#### localStorage Keys
- `whyd_highlight_{YYYY-MM-DD}` - 儲存該日標記的成就 ID
- `whyd_prompted_{YYYY-MM-DD}` - 儲存該日是否已提示

### HTML Structure

```html
<section id="summary-section" class="section hidden">
    <div class="summary-container">
        <div class="summary-header">
            <h2>今日回顧</h2>
            <button class="summary-close">×</button>
        </div>
        
        <div class="summary-stats">
            <div class="stat-card">
                <span class="stat-value" id="summary-total">0</span>
                <span class="stat-label">總數</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="summary-earliest">--:--</span>
                <span class="stat-label">最早</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="summary-latest">--:--</span>
                <span class="stat-label">最晚</span>
            </div>
        </div>
        
        <div class="summary-tags">
            <h3>標籤分布</h3>
            <div id="summary-tag-bars"></div>
        </div>
        
        <div class="summary-highlight">
            <h3>今日最重要的事</h3>
            <div id="summary-highlight-list"></div>
        </div>
        
        <div class="summary-timeline">
            <h3>今日記錄</h3>
            <div id="summary-timeline-list"></div>
        </div>
    </div>
</section>
```

### CSS Classes

| Class | Description |
|-------|-------------|
| `.summary-container` | 主容器 |
| `.summary-header` | 標題列 |
| `.summary-close` | 關閉按鈕 |
| `.summary-stats` | 統計卡片容器 |
| `.stat-card` | 單一統計卡片 |
| `.stat-value` | 統計數值 |
| `.stat-label` | 統計標籤 |
| `.summary-tags` | 標籤分布區 |
| `.tag-bar` | 單一標籤進度條 |
| `.tag-bar-fill` | 進度條填充 |
| `.summary-highlight` | 重要標記區 |
| `.highlight-item` | 可選擇的成就項目 |
| `.highlight-item.selected` | 已選擇的成就 |
| `.summary-timeline` | 時間線預覽 |

### Behavior

1. **開啟回顧**
   - 點擊底部 🌙 按鈕
   - 呼叫 `App.toggleSection('summary-section', btnSummary)`

2. **計算統計**
   - 呼叫 `Store.getTodayEntries()`
   - 計算總數、時間分布、標籤分布
   - 更新 UI

3. **標記重要成就**
   - 點擊成就項目
   - 儲存至 localStorage
   - 更新 UI 顯示選中狀態

4. **關閉回顧**
   - 點擊關閉按鈕或再次點擊 🌙 按鈕
   - 隱藏 section

5. **晚上提示**
   - 檢查當前時間是否在 20:00-23:00
   - 檢查當天是否已提示
   - 若條件符合且有記錄，自動顯示回顧

### Error Handling

- 若無今日記錄，顯示空狀態提示
- 若 Store 未定義，不執行初始化
- 使用防禦性檢查避免錯誤
