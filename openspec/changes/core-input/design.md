## Context

WHYD 應用目前缺少核心輸入功能，用戶無法添加新的成就記錄。應用已經具備：
- Store API (`js/store.js`) 用於資料持久化
- HTML 結構預留了 `#input-section` 區域
- 模組化的架構，各功能獨立為 JS 檔案

此功能是整個應用的基礎入口點，用戶將頻繁與之互動。

## Goals / Non-Goals

**Goals:**
- 提供一個簡單、高效的輸入介面
- 實作流暢的用戶體驗（動畫、自動聚焦）
- 確保可訪問性（鍵盤導航、螢幕閱讀器支援）
- 與現有 Store API 無縫整合
- 保持程式碼模組化、可維護

**Non-Goals:**
- 標籤輸入功能（將由 tag-system.js 處理）
- 複雜的富文本編輯器
- 即時協作或同步功能
- 草稿自動儲存

## Decisions

### 1. 使用原生 JavaScript 而非框架

**決策**: 使用純 JavaScript (Vanilla JS) 實作

**理由**:
- 專案其他模組都是純 JS，保持一致性
- 功能簡單，不需要框架的複雜性
- 減少外部依賴和打包需求
- 更快的載入速度

**替代方案考慮**:
- Vue/React component: 過度設計，增加複雜度
- Web Component: 可考慮，但目前專案規模不需要

### 2. 動畫使用 CSS Transitions

**決策**: 使用 CSS transitions 和 animations 處理視覺回饋

**理由**:
- 瀏覽器原生優化，性能更好
- 程式碼更簡潔，與樣式檔案分離
- 易於維護和調整
- 支援 `prefers-reduced-motion` 媒體查詢

**替代方案考慮**:
- JavaScript 動畫 (requestAnimationFrame): 過度複雜
- Web Animations API: 瀏覽器支援度考量

### 3. 事件驅動架構

**決策**: 提交成功後發出自定義事件

**理由**:
- 解耦模組間的依賴
- 其他模組 (timeline-view, streak-tracker) 可以監聽事件
- 遵循專案的模組化原則
- 易於擴展（未來可添加更多監聽器）

**實作方式**:
```javascript
window.dispatchEvent(new CustomEvent('entryAdded', { 
    detail: { entry } 
}));
```

### 4. 輸入驗證策略

**決策**: 前端即時驗證 + 提交前最終檢查

**理由**:
- 即時反饋提升用戶體驗
- 防止無效請求到達 Store API
- 使用 `String.trim()` 統一處理空白

**驗證時機**:
1. 提交時 (Enter/按鈕)
2. 即時反饋 (按鈕禁用狀態)

### 5. DOM 結構設計

**決策**: 使用語義化 HTML + ARIA 標籤

**理由**:
- 提升可訪問性
- SEO 友善（雖然對單頁應用影響較小）
- 符合 Web 標準

**結構**:
```html
<section id="input-section" class="section" aria-label="快速輸入">
    <form class="quick-entry-form">
        <input type="text" 
               aria-label="輸入完成的事項" 
               placeholder="你完成了什麼？">
        <button type="submit" aria-label="提交">
            新增
        </button>
    </form>
</section>
```

## Risks / Trade-offs

### Risk 1: 動畫可能影響低階設備性能

**風險**: 複雜動畫在老舊設備上可能卡頓

**緩解**:
- 使用 CSS transform 和 opacity（可硬體加速）
- 動畫保持在 300-500ms（不超過 1000ms）
- 使用 `@media (prefers-reduced-motion)` 提供無動畫選項

### Risk 2: 快速連續提交可能造成問題

**風險**: 用戶快速按 Enter 鍵可能觸發多次提交

**緩解**:
- 提交後暫時禁用輸入/按鈕 200-300ms
- 使用 debounce 或 flag 防止重複提交
- 清空輸入框提供視覺反饋

### Trade-off: 簡潔性 vs 功能豐富性

**權衡**: 保持輸入框簡單 vs 添加更多功能（如標籤建議、時間選擇等）

**選擇**: 優先簡潔性

**理由**:
- 核心價值是「快速記錄」
- 額外功能可以延後或由其他模組處理
- 降低認知負擔，提高使用頻率

## Migration Plan

### 部署步驟

1. **開發階段**
   - 建立 `js/core-input.js` 檔案
   - 在本地環境測試所有場景
   - 確保與 Store API 正確整合

2. **測試階段**
   - 測試所有規格中定義的場景
   - 跨瀏覽器測試
   - 可訪問性測試（鍵盤導航、螢幕閱讀器）

3. **部署**
   - 由於是純前端應用，無需後端遷移
   - 確認 `index.html` 已引用 `js/core-input.js`（已存在）
   - 部署靜態檔案

### 回滾策略

如果發現問題：
1. 移除 `js/core-input.js` 的引用（或清空檔案）
2. 用戶仍可查看現有記錄，只是無法新增
3. 不影響 LocalStorage 中的現有資料

## Open Questions

1. **樣式檔案位置**: `styles/main.css` 是否已存在？需要在此 change 中定義樣式嗎？
   - **建議**: 假設樣式已存在或將由其他 change 處理，此 change 專注於功能邏輯

2. **事件命名**: 自定義事件應該叫 `entryAdded` 還是 `whyd:entryAdded`（帶命名空間）？
   - **建議**: 使用簡單的 `entryAdded`，因為這是小型專案，不太會有命名衝突

3. **動畫類型**: 應該使用哪種動畫效果？
   - **建議**: 使用簡單的 fade-out + scale-down 效果（成功提示），或 pulse 效果（輸入框閃爍）

4. **按鈕文字**: 提交按鈕應該顯示什麼文字？
   - **建議**: "新增" 或 "✓" 圖標，保持簡潔
