# 共享決策

> 所有並行開發的 sessions 都應該遵守這些決策。

---

## 資料格式

### Entry 結構
```javascript
{
  id: string,          // UUID
  text: string,        // 用戶輸入內容
  tags: string[],      // 標籤 ID 陣列
  createdAt: string    // ISO8601 時間戳
}
```

### Tag 結構
```javascript
{
  id: string,          // 'work' | 'life' | 'learn' | 'health' | custom
  name: string,        // 顯示名稱
  color: string        // HEX 色碼
}
```

### Streak 結構
```javascript
{
  current: number,     // 當前連續天數
  best: number,        // 最佳紀錄
  lastActiveDate: string  // ISO8601
}
```

---

## 介面規範

### Store
```javascript
Store.getData()                    // 取得所有資料
Store.saveData(data)               // 儲存資料
Store.addEntry(text, tags)         // 新增記錄，回傳 entry
Store.getTodayEntries()            // 取得今日記錄
Store.getEntriesByDateRange(from, to)  // 取得日期範圍記錄
Store.getTags()                    // 取得所有標籤
Store.addTag(tag)                  // 新增標籤
Store.updateStreak()               // 更新連續天數
Store.getAchievements()            // 取得成就資料
Store.saveAchievements(achievements) // 儲存成就資料
Store.unlockAchievement(id)        // 解鎖成就
Store.isAchievementUnlocked(id)    // 檢查成就是否已解鎖
Store.updateUsageStat(stat, value) // 更新使用統計
```

### Utils
```javascript
Utils.formatTime(isoString)        // 格式化時間（相對時間）
Utils.formatDate(isoString)        // 格式化日期
Utils.generateId()                 // 產生 UUID
```

---

## 命名規範

| 類型 | 規範 | 範例 |
|------|------|------|
| 檔案 | kebab-case | `daily-summary.js`, `statistics.js` |
| 模組 | PascalCase | `DailySummary`, `Statistics` |
| 函數 | camelCase | `getTodayEntries()`, `showSummary()` |
| 變數 | camelCase | `entryCount`, `selectedTags` |
| CSS class | kebab-case | `.summary-card`, `.stats-chart` |
| 常數 | SCREAMING_SNAKE | `STORAGE_KEY`, `DEFAULT_TAGS` |

---

## UI 設計規範

### 顏色（CSS 變數）
```css
--primary: #6366f1;
--primary-light: #818cf8;
--primary-dark: #4f46e5;
--bg: #f8fafc;
--surface: #ffffff;
--text: #1e293b;
--text-muted: #64748b;
--border: #e2e8f0;
--shadow: 0 1px 3px rgba(0,0,0,0.1);
--shadow-lg: 0 4px 12px rgba(0,0,0,0.15);
```

### 標籤顏色
```css
--tag-work: #3b82f6;    /* 工作 - 藍 */
--tag-life: #10b981;    /* 生活 - 綠 */
--tag-learn: #f59e0b;   /* 學習 - 橘 */
--tag-health: #ec4899;  /* 健康 - 粉 */
```

### 間距
```css
--radius: 12px;
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
```

---

## 事件系統

使用 `window.dispatchEvent` 和 `CustomEvent`：

```javascript
// 發送
window.dispatchEvent(new CustomEvent('eventName', {
  detail: { data },
  bubbles: true
}));

// 接收
window.addEventListener('eventName', (e) => {
  console.log(e.detail.data);
});
```

**已定義的事件：**
| 事件名 | 發送者 | 資料 |
|--------|--------|------|
| `entryAdded` | CoreInput | `{ entry }` |
| `tag-selected` | TagSystem | `{ selectedIds }` |
| `streakUpdated` | Store | `{ streak }` |
| `statsViewed` | App | - |
| `themeChanged` | theme.js | `{ theme }` |
| `languageChanged` | i18n | `{ language }` |
| `dataExported` | ExportFeature | `{ format, count }` |
| `achievementUnlocked` | AchievementSystem | `{ achievement }` |

---

## 模組邊界

| 模組 | 檔案 | 職責 |
|------|------|------|
| Store | `js/store.js` | 資料儲存 |
| Utils | `js/utils.js` | 工具函數 |
| App | `js/app.js` | 應用入口 |
| CoreInput | `js/core-input.js` | 輸入框 |
| TimelineView | `js/timeline-view.js` | 時間軸 |
| TagSystem | `js/tag-system.js` | 標籤系統 |
| StreakTracker | `js/streak-tracker.js` | 連續天數 |
| DailySummary | `js/daily-summary.js` | 每日回顧 |
| Statistics | `js/statistics.js` | 統計圖表 |
| ExportFeature | `js/export-feature.js` | 匯出功能 |
| AchievementSystem | `js/achievement-system.js` | 成就系統 |

---

## 更新日誌

- 2026-02-19: 新增 AchievementSystem 成就系統模組
- 2026-02-17: 初始版本（Phase 2 並行開發前）
