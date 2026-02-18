# AGENT.md - WHYD 開發指南

> 給未來的開發 Agent：這是 WHYD 專案的開發指南，請在開始開發前閱讀此文件。

## 專案概述

**WHYD** (What Have You Done) 是一個逆向待辦清單應用，讓用戶記錄已完成的事項，而非待辦事項。

- **Live URL:** https://awesomejerry.github.io/whyd/
- **Repository:** https://github.com/awesomejerry/whyd
- **當前版本:** v1.0.0

## 技術棧

- **前端:** 原生 HTML + CSS + JavaScript (無框架)
- **儲存:** LocalStorage (離線優先)
- **PWA:** Service Worker + Web App Manifest
- **圖表:** Canvas API
- **開發流程:** OpenSpec (Spec-Driven Development)

## 專案結構

```
whyd/
├── index.html              # 主頁面
├── manifest.json           # PWA manifest
├── service-worker.js       # Service Worker (快取控制)
├── favicon.svg             # 網站圖示
│
├── styles/
│   ├── main.css            # 主樣式 (包含所有元件)
│   └── onboarding.css      # 引導流程樣式
│
├── js/
│   ├── app.js              # 主入口、版本號
│   ├── store.js            # 資料存儲層
│   ├── utils.js            # 工具函數
│   ├── theme.js            # 主題切換
│   ├── core-input.js       # 輸入框模組
│   ├── tag-system.js       # 標籤系統
│   ├── search.js           # 搜尋功能
│   ├── timeline-view.js    # 時間軸顯示
│   ├── edit-delete.js      # 編輯/刪除功能
│   ├── streak-tracker.js   # 連續記錄追蹤
│   ├── daily-summary.js    # 每日摘要
│   ├── statistics.js       # 統計圖表
│   ├── export-feature.js   # 匯出功能
│   ├── import-feature.js   # 匯入功能
│   ├── onboarding.js       # 引導流程
│   └── shortcuts.js        # 快捷鍵
│
├── openspec/
│   ├── specs/              # 功能規格 (15 個 spec)
│   ├── changes/archive/    # 變更歷史 (13 個 change)
│   └── shared-decisions.md # 共享決策記錄
│
├── docs/
│   └── THEME_CHECKLIST.md  # 主題開發檢查清單
│
├── README.md               # 專案說明
└── AGENT.md                # 本文件
```

## 開發規範

### 1. 主題變數 (重要!)

所有顏色必須使用 CSS 變數，確保深色/淺色主題都能正常顯示：

```css
/* 正確 ✅ */
.my-component {
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--border);
}

/* 錯誤 ❌ */
.my-component {
    color: #333;           /* 硬編碼顏色 */
    background: white;     /* 無法切換主題 */
}
```

**可用的 CSS 變數：**
- `--text` - 主要文字顏色
- `--surface` - 元件背景色
- `--bg` - 頁面背景色
- `--border` - 邊框顏色
- `--primary` - 主題色
- `--shadow` - 陰影

詳細規範見：`docs/THEME_CHECKLIST.md`

### 2. 模組結構

每個功能模組應遵循此結構：

```javascript
const FeatureName = {
    init() {
        this.render();
        this.bindEvents();
    },

    render() {
        // 渲染 UI
    },

    bindEvents() {
        // 綁定事件
    },

    // 其他方法...
};
```

### 3. 資料存儲

所有資料操作必須透過 `Store` 模組：

```javascript
// 讀取資料
const entries = Store.getEntries();
const tags = Store.getTags();

// 寫入資料
Store.addEntry({ text: '...', tags: [...], timestamp: Date.now() });
Store.updateEntry(id, updates);
Store.deleteEntry(id);
```

### 4. 版本更新

發布新版本時，必須同時更新三處：

1. `js/app.js` - `WHYD_VERSION` 常數
2. `service-worker.js` - `CACHE_VERSION` 常數
3. Git tag - `git tag -a vX.Y.Z -m "..."`

```javascript
// js/app.js
const WHYD_VERSION = 'v1.1.0';  // 更新這裡

// service-worker.js
const CACHE_VERSION = 'v1.1.0';  // 也要更新這裡
```

## 測試方式

### 本地測試

使用 `local-web-testing` skill：

```bash
# 1. 啟動本地伺服器
cd /home/jerry/.openclaw/workspace/projects/whyd
python3 -m http.server 8080

# 2. 使用 browser 工具測試
# 開啟 http://localhost:8080
```

### 線上測試

直接測試 GitHub Pages：

```
https://awesomejerry.github.io/whyd/?v=<timestamp>
```

使用 timestamp 參數強制刷新快取。

### 主題測試

1. 開啟深色主題，檢查所有元件
2. 切換淺色主題，再次檢查
3. 特別注意：文字顏色、背景、邊框、陰影

## 發布流程

```bash
# 1. 確認所有測試通過
# 2. 更新版本號 (js/app.js, service-worker.js)
# 3. 提交變更
git add .
git commit -m " vX.Y.Z: 描述變更"
git push origin master

# 4. 建立 tag
git tag -a vX.Y.Z -m "WHYD vX.Y.Z - 描述"
git push origin vX.Y.Z

# 5. GitHub Pages 會自動部署
```

## 常見問題

### Q: 新增的 JS 檔案沒有載入？

A: 檢查 `index.html` 的 `<script>` 標籤順序，依賴的模組要先載入：

```html
<!-- 1. 核心模組 -->
<script src="js/store.js"></script>
<script src="js/utils.js"></script>

<!-- 2. 功能模組 -->
<script src="js/your-new-module.js"></script>

<!-- 3. 主應用 (最後載入) -->
<script src="js/app.js"></script>
```

### Q: Service Worker 沒有更新？

A: 使用者需要：
1. 關閉所有分頁
2. 或手動清除快取：DevTools → Application → Clear storage

開發時可以用：
```javascript
navigator.serviceWorker.getRegistrations().then(r => r.forEach(s => s.unregister()));
caches.keys().then(k => k.forEach(c => caches.delete(c)));
```

### Q: 新功能需要建立 OpenSpec change 嗎？

A: 
- **小修改 (bug fix, UI 微調):** 不需要
- **新功能:** 建議使用 OpenSpec 流程
- **重大變更:** 必須使用 OpenSpec 流程

OpenSpec skill 位置：`/home/jerry/.openclaw/workspace/skills/openspec/SKILL.md`

## 已知限制

1. **LocalStorage 容量:** 約 5MB，足夠存放數年的記錄
2. **無後端:** 資料只存在本地，無法跨裝置同步
3. **無用戶系統:** 單人使用，無登入功能

## 未來功能候選

以下功能尚未實作，可作為未來開發方向：

1. **成就系統** - 連續 7 天、完成 100 件事等徽章
2. **備份/還原** - 完整資料匯出/匯入
3. **雲端同步** - 跨裝置資料同步
4. **統計增強** - 更多圖表類型、自訂時間範圍
5. **標籤管理** - 編輯/刪除標籤、標籤統計

---

*最後更新: 2026-02-18 | WHYD v1.0.0*
