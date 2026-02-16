## Why

用戶需要將完成的任務分類管理，以便快速檢視不同領域的成就。目前 WHYD 缺乏標籤系統，導致用戶無法有效篩選和組織記錄。

## What Changes

- 新增預設標籤系統（工作、生活、學習、健康）
- 支援用戶自訂標籤
- 點擊標籤篩選 timeline 顯示
- 標籤選取狀態同步顯示於輸入框
- 實作標籤 CRUD 操作

## Capabilities

### New Capabilities
- `tag-management`: 標籤管理功能 - 包含預設標籤、自訂標籤的新增/刪除、標籤選取狀態管理

### Modified Capabilities
- 無（此為新功能）

## Impact

- **新增檔案**: `js/tag-system.js` - 標籤系統核心模組
- **修改檔案**: `js/store.js` - 擴充標籤資料結構以支援完整標籤物件
- **整合**: 與 `core-input.js` 整合標籤選取、與 `timeline-view.js` 整合篩選功能
- **CSS**: 已有標籤相關樣式，無需修改
