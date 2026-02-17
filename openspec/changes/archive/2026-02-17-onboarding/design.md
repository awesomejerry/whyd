## Context

WHYD 是一個「逆向待辦清單」應用，讓使用者記錄已完成的事項而非待辦事項。首次使用者需要引導來理解這個獨特概念和功能。目前 Store 模組已有 `isOnboarded()` 和 `setOnboarded()` 方法，App.js 已預留 onboarding 檢查邏輯，index.html 也有 onboarding overlay 容器。

現有模組邊界清晰：Store 負責資料儲存，各功能模組獨立，事件系統使用 CustomEvent 通訊。樣式使用 CSS 變數，支援深色主題和動畫效果。

## Goals / Non-Goals

**Goals:**
- 建立三步驟引導流程：歡迎、功能介紹、引導記錄
- 使用 Modal 覆蓋層顯示，不影響主介面佈局
- 每步驟有清晰的視覺指示和導航按鈕
- 完成後永久記錄狀態，不再顯示
- 與現有 Store 模組整合，使用統一的資料格式
- 樣式與現有 main.css 保持一致

**Non-Goals:**
- 不處理重新顯示 onboarding（可透過清除 LocalStorage 實現）
- 不提供個人化或動態內容的 onboarding
- 不處理多語系或無障礙功能的特殊需求（本次不處理）

## Decisions

### 1. Onboarding 模組架構
**決策**: 建立獨立的 `Onboarding` 模組 (js/onboarding.js)，類似其他功能模組（Statistics、ExportFeature 等）。

**理由**:
- 符合現有模組邊界規範（shared-decisions.md）
- 職責單一，易於維護和測試
- 可獨立載入和移除

**替代方案**: 
- 整合到 app.js：會增加 app.js 複雜度，違反單一職責原則
- 分散到多個檔案：onboarding 邏輯相對簡單，單一檔案足夠

### 2. 樣式檔案位置
**決策**: 建立 `styles/onboarding.css` 獨立樣式檔案，在 index.html 中載入。

**理由**:
- 符合模組化設計，onboarding 樣式獨立管理
- 便於未來維護和移除
- 避免增加 main.css 的複雜度

**替代方案**:
- 整合到 main.css：會讓 main.css 變得龐大，不利維護
- 內嵌在 JS 中：不利於樣式調整和除錯

### 3. 步驟流程設計
**決策**: 使用步驟索引 (0, 1, 2) 管理流程，每步驟有獨立的 render 函數。

**理由**:
- 簡單明瞭，易於擴充步驟
- 每步驟可獨立控制內容和行為
- 步驟指示器容易計算和更新

**替代方案**:
- 使用狀態機：對於 3 步驟流程過於複雜
- 使用路由：不需要 URL 導航功能

### 4. UI 元素複用
**決策**: 複用現有的 modal、overlay、btn 等 CSS class。

**理由**:
- 保持視覺一致性
- 減少重複樣式定義
- 符合 shared-decisions.md 規範

**替代方案**:
- 全新設計 onboarding 專用樣式：會造成視覺不一致

### 5. 引導記錄實作
**決策**: 步驟三直接呼叫 Store.addEntry() 和 CoreInput 的清理函數。

**理由**:
- 使用現有 API，無需重新實作
- 與核心功能完全整合
- 記錄會立即出現在時間軸上

**替代方案**:
- 建立 onboarding 專用的假記錄：無法展示真實功能

## Risks / Trade-offs

**風險**: 使用者可能跳過 onboarding，不理解應用概念
**緩解**: 每步驟提供「跳過」按鈕，但步驟三明確標示「開始使用」而非「跳過」

**風險**: 首次載入時 onboarding JS 可能尚未執行，導致短暫閃爍
**緩解**: overlay 預設為 hidden，CSS 在 head 中載入，確保樣式先於 JS

**風險**: LocalStorage 被清除後 onboarding 會重新顯示
**緩解**: 這是預期行為，使用者重新安裝或清除資料後應重新引導

**權衡**: 不提供重新觀看 onboarding 的功能
**緩解**: 設計清晰直觀的介面，降低對 onboarding 的依賴

## Migration Plan

1. 建立 `js/onboarding.js` 和 `styles/onboarding.css`
2. 在 index.html 中加入 onboarding.css 載入和 onboarding.js script 標籤
3. 確認 app.js 的 onboarding 檢查邏輯正常運作
4. 測試首次使用流程
5. 測試完成後不再顯示的行為

**回滾策略**: 
- 註解 index.html 中的 onboarding.js 載入
- Store 預設 settings.onboarded = false，不會影響現有功能
