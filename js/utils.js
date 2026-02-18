// Utils.js - WHYD 工具函數

const Utils = {
    // 格式化時間（相對時間）
    formatTime(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return i18n.t('timeline.justNow');
        if (diffMins < 60) return i18n.t('timeline.minutesAgo', { n: diffMins });
        if (diffHours < 24) return i18n.t('timeline.hoursAgo', { n: diffHours });
        if (diffDays < 7) return i18n.t('timeline.daysAgo', { n: diffDays });

        // 顯示具體時間
        const locale = i18n.getLanguage() === 'zh-TW' ? 'zh-TW' : 'en-US';
        return date.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // 格式化日期
    formatDate(isoString) {
        const date = new Date(isoString);
        const locale = i18n.getLanguage() === 'zh-TW' ? 'zh-TW' : 'en-US';
        return date.toLocaleDateString(locale, {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });
    },

    // 取得今天是第幾天
    getDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    },

    // 產生唯一 ID
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    // 防抖函數
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 深拷貝
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
};

window.Utils = Utils;
