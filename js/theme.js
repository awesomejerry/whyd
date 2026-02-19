(function() {
    const STORAGE_KEY = 'theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    function getStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function setStoredTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            // localStorage not available, continue without persistence
        }
    }

    function applyTheme(theme) {
        if (theme === LIGHT) {
            document.documentElement.setAttribute('data-theme', LIGHT);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    function getCurrentTheme() {
        const stored = getStoredTheme();
        if (stored) {
            return stored;
        }
        return DARK;
    }

    function toggleTheme() {
        const current = getCurrentTheme();
        const next = current === DARK ? LIGHT : DARK;
        setStoredTheme(next);
        applyTheme(next);
        updateToggleButton(next);
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: next },
            bubbles: true
        }));
    }

    function updateToggleButton(theme) {
        const btn = document.getElementById('btn-theme');
        if (btn) {
            btn.textContent = theme === DARK ? '☀️' : '🌙';
            btn.title = theme === DARK ? '切換淺色主題' : '切換深色主題';
        }
    }

    function init() {
        const theme = getCurrentTheme();
        applyTheme(theme);
        updateToggleButton(theme);

        const btn = document.getElementById('btn-theme');
        if (btn) {
            btn.addEventListener('click', toggleTheme);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
