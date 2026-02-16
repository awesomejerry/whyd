// App.js - WHYD 應用程式入口
// 負責初始化所有模組和協調功能

const App = {
    init() {
        console.log('🚀 WHYD 初始化中...');

        // 檢查是否需要引導
        if (typeof Onboarding !== 'undefined' && !Store.isOnboarded()) {
            Onboarding.start();
        }

        // 初始化各模組
        if (typeof CoreInput !== 'undefined') CoreInput.init();
        if (typeof TagSystem !== 'undefined') TagSystem.init();
        if (typeof TimelineView !== 'undefined') TimelineView.init();
        if (typeof StreakTracker !== 'undefined') StreakTracker.init();
        if (typeof Statistics !== 'undefined') Statistics.init();
        if (typeof DailySummary !== 'undefined') DailySummary.init();
        if (typeof ExportFeature !== 'undefined') ExportFeature.init();

        // 綁定底部按鈕
        this.bindFooterButtons();

        // 更新連續天數
        Store.updateStreak();

        console.log('✅ WHYD 初始化完成');
    },

    bindFooterButtons() {
        const btnExport = document.getElementById('btn-export');
        const btnStats = document.getElementById('btn-stats');
        const btnSummary = document.getElementById('btn-summary');

        if (btnExport) {
            btnExport.addEventListener('click', () => {
                if (typeof ExportFeature !== 'undefined') {
                    ExportFeature.show();
                }
            });
        }

        if (btnStats) {
            btnStats.addEventListener('click', () => {
                this.toggleSection('stats-section', btnStats);
            });
        }

        if (btnSummary) {
            btnSummary.addEventListener('click', () => {
                this.toggleSection('summary-section', btnSummary);
            });
        }
    },

    toggleSection(sectionId, button) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const isHidden = section.classList.contains('hidden');

        // 隱藏其他 section
        document.querySelectorAll('.section.hidden-by-toggle')
            .forEach(s => s.classList.add('hidden'));

        // 切換目標 section
        if (isHidden) {
            section.classList.remove('hidden');
            section.classList.add('hidden-by-toggle');
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            section.classList.add('hidden');
            section.classList.remove('hidden-by-toggle');
        }

        // 更新按鈕狀態
        document.querySelectorAll('.btn-icon').forEach(b => b.classList.remove('active'));
        if (isHidden) {
            button.classList.add('active');
        }
    }
};

// DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
