# WHYD

> **W**hat **H**ave **Y**ou **D**one — 逆向待辦清單，記錄你完成了什麼

## 概念

傳統待辦清單讓人聚焦在「沒做到的」，WHYD 讓你看見「已完成的」。

記錄每天的成就，建立正向循環，累積成就感。

## 功能列表

| 功能 | 描述 | 狀態 |
|------|------|------|
| 快速輸入 | 一鍵記錄完成的事 | ✅ |
| 時間軸視覺化 | 看一天的成就流 | ✅ |
| 標籤分類 | 工作/生活/學習/健康，自訂標籤 | ✅ |
| 每日摘要 | 晚上總結今天做了什麼 | ✅ |
| 統計圖表 | 週/月成就分析 (折線圖、圓餅圖、長條圖) | ✅ |
| 連續記錄 | 追蹤使用天數 streak | ✅ |
| 匯出功能 | JSON/CSV 匯出，可選日期範圍 | ✅ |
| 匯入功能 | 匯入 JSON，支援合併/取代模式 | ✅ |
| 引導流程 | 3 步驟新用戶引導 | ✅ |
| PWA 支援 | 可加入主畫面，離線可用 | ✅ |
| 編輯/刪除 | 編輯已記錄的事項 | ✅ |
| 搜尋功能 | 即時搜尋過濾 | ✅ |
| 主題切換 | 深色/淺色主題 | ✅ |
| 快捷鍵 | Ctrl+N, Ctrl+/, Ctrl+E 等 | ✅ |

## 設計原則

1. **極簡** — 輸入框永遠可見，一鍵完成
2. **無壓力** — 沒有提醒、沒有紅點、純粹記錄
3. **手感好** — 動畫回饋、滑動操作
4. **離線可用** — LocalStorage 儲存

## 技術棧

- 原生 HTML + CSS + JavaScript
- LocalStorage（離線優先）
- PWA（Service Worker）
- Canvas（統計圖表）

## 版本號

版本號格式：`vMAJOR.MINOR.PATCH`

- **MAJOR** - 重大架構變更
- **MINOR** - 新功能
- **PATCH** - Bug 修復

查看版本：開啟 Console 或在頁面底部查看

## 目標用戶

- 容易焦慮、覺得自己不夠好的人
- 工作內容零散，難以事先規劃的人
- 想建立成就感而非愧疚感的人

## 靈感來源

- 心理學研究：正向強化比負面壓力更有效
- 「Done list」vs「To-do list」的概念
- 生產力不是靠壓力，是靠動力

## 專案結構

```
whyd/
├── index.html
├── manifest.json
├── service-worker.js
├── styles/
│   └── main.css
├── js/
│   ├── app.js           # 主應用入口
│   ├── store.js         # 資料存儲
│   ├── core-input.js    # 輸入框
│   ├── timeline-view.js # 時間軸
│   ├── tag-system.js    # 標籤系統
│   ├── streak-tracker.js# 連續記錄
│   ├── daily-summary.js # 每日摘要
│   ├── statistics.js    # 統計圖表
│   ├── export-feature.js# 匯出功能
│   ├── onboarding.js    # 引導流程
│   ├── search.js        # 搜尋功能
│   ├── theme.js         # 主題切換
│   ├── shortcuts.js     # 快捷鍵
│   ├── edit-delete.js   # 編輯刪除
│   └── utils.js         # 工具函數
├── openspec/
│   ├── specs/           # 功能規格
│   └── changes/archive/ # 變更歷史
└── docs/
    └── THEME_CHECKLIST.md
```

---

## 一句話總結

> 不是列出要做的事，而是看見自己已經做到的事。
