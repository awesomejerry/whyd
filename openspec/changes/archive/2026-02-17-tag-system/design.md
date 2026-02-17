## Context

WHYD 是一個純前端的任務追蹤應用，使用 LocalStorage 作為資料持久層。目前 Store 模組已有 `tags` 欄位，但僅儲存標籤名稱字串。需要擴充為完整標籤物件結構。

現有 CSS 樣式已定義預設標籤顏色：`--tag-work`, `--tag-life`, `--tag-learn`, `--tag-health`。

## Goals / Non-Goals

**Goals:**
- 實作標籤 CRUD 功能
- 標籤篩選 timeline
- 標籤狀態與輸入框同步
- 支援預設與自訂標籤

**Non-Goals:**
- 標籤編輯/刪除功能（v1 不含）
- 標籤顏色自選（使用自動指派）
- 標籤拖曳排序

## Decisions

### 1. 標籤資料結構
採用物件陣列而非字串陣列：
```js
tags: [
  { id: 'work', name: '工作', color: '#3b82f6', isDefault: true },
  { id: 'life', name: '生活', color: '#10b981', isDefault: true },
  { id: 'learn', name: '學習', color: '#f59e0b', isDefault: true },
  { id: 'health', name: '健康', color: '#ec4899', isDefault: true },
  { id: 'custom-xxx', name: '自訂', color: '#...', isDefault: false }
]
```
**理由**: 需要儲存 id, name, color, isDefault 屬性

### 2. 模組架構
TagSystem 模組負責：
- 渲染標籤 UI（tags-section）
- 管理選取狀態
- 提供 `getSelectedTags()` 給其他模組
- 發出 `tag-selected` 自訂事件

### 3. 篩選邏輯
TimelineView 訂閱 `tag-selected` 事件，根據選取的標籤 ID 陣列過濾 entries。

## Risks / Trade-offs

- **向後相容**: 舊資料 tags 為字串陣列 → 需 migration 邏輯
  - **Migration**: Store 初始化時檢測舊格式並轉換
