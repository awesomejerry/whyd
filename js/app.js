// App.js - WHYD 應用程式入口
// 負責初始化所有模組和協調功能

const WHYD_VERSION = 'v1.3.1';

const App = {
    async init() {
        console.log(`🚀 WHYD ${WHYD_VERSION} 初始化中...`);

        await i18n.init();
        this.updateHeaderText();

        if (typeof Onboarding !== 'undefined' && !Store.isOnboarded()) {
            Onboarding.start();
        }

        // 初始化各模組
        if (typeof CoreInput !== 'undefined') CoreInput.init();
        if (typeof TagSystem !== 'undefined') TagSystem.init();
        if (typeof Search !== 'undefined') Search.init();
        if (typeof TimelineView !== 'undefined') TimelineView.init();
        if (typeof EditDelete !== 'undefined') EditDelete.init();
        if (typeof StreakTracker !== 'undefined') StreakTracker.init();
        if (typeof Statistics !== 'undefined') Statistics.init();
        if (typeof DailySummary !== 'undefined') DailySummary.init();
        if (typeof ExportFeature !== 'undefined') ExportFeature.init();
        if (typeof ImportFeature !== 'undefined') ImportFeature.init();
        if (typeof Shortcuts !== 'undefined') Shortcuts.init();
        if (typeof AchievementSystem !== 'undefined') AchievementSystem.init();

        // 綁定底部按鈕
        this.bindFooterButtons();

        window.addEventListener('dataImported', () => {
            if (typeof TimelineView !== 'undefined') TimelineView.render();
            if (typeof StreakTracker !== 'undefined') Store.updateStreak();
        });

        window.addEventListener('languageChanged', () => {
            this.refreshAllUI();
        });

        // 更新連續天數
        Store.updateStreak();

        // 顯示版本號
        const versionEl = document.getElementById('footer-version');
        if (versionEl) {
            versionEl.textContent = WHYD_VERSION;
        }

        console.log(`✅ WHYD ${WHYD_VERSION} 初始化完成`);
    },

    bindFooterButtons() {
        const btnExport = document.getElementById('btn-export');
        const btnStats = document.getElementById('btn-stats');
        const btnSummary = document.getElementById('btn-summary');
        const btnAchievements = document.getElementById('btn-achievements');

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

        if (btnAchievements) {
            btnAchievements.addEventListener('click', () => {
                if (typeof AchievementSystem !== 'undefined') {
                    AchievementSystem.showModal();
                }
            });
        }

        const btnSponsor = document.getElementById('btn-sponsor');
        if (btnSponsor) {
            btnSponsor.addEventListener('click', () => {
                window.open('https://github.com/sponsors/awesomejerry', '_blank');
            });
        }
    },

    toggleSection(sectionId, button) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const isHidden = section.classList.contains('hidden');

        document.querySelectorAll('.section.hidden-by-toggle')
            .forEach(s => s.classList.add('hidden'));

        if (isHidden) {
            section.classList.remove('hidden');
            section.classList.add('hidden-by-toggle');
            section.scrollIntoView({ behavior: 'smooth' });

            if (sectionId === 'stats-section' && typeof Statistics !== 'undefined') {
                setTimeout(() => Statistics.redrawCharts(), 100);
                window.dispatchEvent(new CustomEvent('statsViewed', { bubbles: true }));
            }

            if (sectionId === 'summary-section' && typeof DailySummary !== 'undefined') {
                setTimeout(() => DailySummary.render(), 100);
            }
        } else {
            section.classList.add('hidden');
            section.classList.remove('hidden-by-toggle');
        }

        document.querySelectorAll('.btn-icon').forEach(b => b.classList.remove('active'));
        if (isHidden) {
            button.classList.add('active');
        }
    },

    updateHeaderText() {
        const title = document.getElementById('app-title');
        const tagline = document.getElementById('app-tagline');
        if (title) title.textContent = i18n.t('app.title');
        if (tagline) tagline.textContent = i18n.t('app.tagline');
    },

    refreshAllUI() {
        this.updateHeaderText();
        if (typeof CoreInput !== 'undefined') CoreInput.render();
        if (typeof TagSystem !== 'undefined') TagSystem.render();
        if (typeof TimelineView !== 'undefined') TimelineView.render();
        if (typeof StreakTracker !== 'undefined') StreakTracker.init();
        if (typeof Statistics !== 'undefined') Statistics.render();
        if (typeof DailySummary !== 'undefined') DailySummary.render();
        if (typeof ExportFeature !== 'undefined') ExportFeature.renderModal();
        if (typeof Onboarding !== 'undefined' && !Store.isOnboarded()) {
            Onboarding.render();
        }
    }
};

// DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
