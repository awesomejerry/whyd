## 1. Store 擴充

- [x] 1.1 擴充 Store.getTags() 回傳完整標籤物件陣列（含預設標籤）
- [x] 1.2 新增 Store.addTag(tag) 支援完整標籤物件
- [x] 1.3 新增 Store.migrateTags() 處理舊格式 migration

## 2. TagSystem 模組實作

- [x] 2.1 建立 js/tag-system.js 基礎結構與 init()
- [x] 2.2 實作 renderTags() 渲染標籤列表
- [x] 2.3 實作 selectTag(id) / deselectTag(id) 選取邏輯
- [x] 2.4 實作 getSelectedTags() 回傳選取標籤 ID
- [x] 2.5 實作 addCustomTag() 新增自訂標籤

## 3. UI 整合

- [x] 3.1 綁定標籤點擊事件觸發選取/取消
- [x] 3.2 實作「新增標籤」輸入 UI
- [x] 3.3 發出 'tag-selected' 自訂事件供 TimelineView 監聽

## 4. CoreInput 整合

- [x] 4.1 建立 js/core-input.js 基礎結構與 init()
- [x] 4.2 渲染輸入框與提交按鈕
- [x] 4.3 顯示選取標籤於輸入區域
- [x] 4.4 提交時包含選取標籤 ID

## 5. TimelineView 整合

- [x] 5.1 建立 js/timeline-view.js 基礎結構與 init()
- [x] 5.2 渲染 entries 列表
- [x] 5.3 監聽 'tag-selected' 事件過濾顯示
- [x] 5.4 顯示 entry 的標籤色彩點

## 6. 測試驗證

- [x] 6.1 驗證預設標籤正確顯示
- [x] 6.2 驗證新增自訂標籤功能
- [x] 6.3 驗證標籤篩選 timeline
- [x] 6.4 驗證標籤同步至輸入框
