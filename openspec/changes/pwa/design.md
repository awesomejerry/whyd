## Context

WHYD 是一個純前端應用，使用原生 JavaScript 開發，所有資料儲存在 localStorage。目前沒有任何離線支援或 PWA 功能。需要加入 PWA 功能以支援離線使用和安裝到主畫面。

## Goals / Non-Goals

**Goals:**
- 支援離線使用（Cache First 策略）
- 可安裝到裝置主畫面
- 快速載入（從快取載入靜態資源）
- 版本控制（快取名稱包含版本號，方便更新）

**Non-Goals:**
- Push Notifications（暫不實作）
- Background Sync（暫不實作）
- 動態快取策略（統一使用 Cache First）

## Decisions

### 1. 快取策略：Cache First, Network Fallback
- **決策**：優先從快取讀取，快取失敗時從網路獲取
- **理由**：靜態資源變動頻率低，優先使用快取可確保離線可用
- **替代方案**：
  - Network First：不適合離線場景
  - Stale While Revalidate：實作複雜度高，效益有限

### 2. 圖示格式：SVG + PNG Fallback
- **決策**：manifest 使用 SVG 圖示，瀏覽器支援時優先使用向量圖
- **理由**：現有 favicon.svg 可直接使用，減少維護成本
- **備註**：manifest 支援 SVG 時，不需要額外生成 PNG

### 3. 版本控制：使用常數版本號
- **決策**：在 service-worker.js 中定義 `CACHE_VERSION` 常數
- **理由**：簡單明確，更新時只需修改一處
- **格式**：`v1`, `v2`, `v3`... 

## Risks / Trade-offs

- **[快取更新延遲]** → 用戶需要關閉所有分頁後重新開啟才能獲得更新
- **[SVG 圖示相容性]** → 部分舊版瀏覽器可能不支援 SVG manifest icons，但不影響基本功能
