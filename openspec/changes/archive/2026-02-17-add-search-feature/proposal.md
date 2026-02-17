## Why

用戶需要快速找到時間軸中的特定記錄。當記錄數量增多時，手動滾動查找變得困難。搜尋功能讓用戶能即時過濾時間軸內容，提升使用效率。

## What Changes

- 在時間軸上方加入搜尋輸入框
- 即時搜尋：輸入時立即過濾時間軸
- 不區分大小寫的部分匹配
- 搜尋框包含搜尋圖標和清除按鈕
- 無結果時顯示提示訊息
- 發送 `search-filtered` 事件更新時間軸

## Capabilities

### New Capabilities
- `search`: 時間軸搜尋功能，支援即時過濾、不區分大小寫、部分匹配

### Modified Capabilities
- `timeline-view`: 加入搜尋過濾支援，監聽 `search-filtered` 事件更新顯示

## Impact

- 新增檔案：`js/search.js`
- 修改檔案：`js/timeline-view.js`
- 修改檔案：`index.html`
- 修改檔案：`styles/main.css`
