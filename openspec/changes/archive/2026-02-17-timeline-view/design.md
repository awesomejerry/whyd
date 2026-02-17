## Context

前端純 JS 應用，使用 Store.getTodayEntries() 取得資料

## Goals / Non-Goals

**Goals:**
- 時間軸 UI 顯示今日記錄
- 自動更新（新記錄加入時）
- 空狀態顯示

**Non-Goals:**
- 歷史視圖（future change）
- 編輯/刪除記錄

## Decisions

- 左側時間軸線 + 右側卡片的經典設計
- 攔截 Store.addEntry 自動更新
- 使用 Utils.formatTime 顯示相對時間
