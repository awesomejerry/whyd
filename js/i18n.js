const i18n = {
    currentLanguage: 'zh-TW',
    translations: {},
    supportedLanguages: ['zh-TW', 'en'],
    
    async init() {
        await this.loadTranslations();
        const savedLang = Store.getLanguage();
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            this.currentLanguage = savedLang;
        }
        this.updateHtmlLang();
        this.bindEvents();
    },
    
    async loadTranslations() {
        try {
            const [zhTW, en] = await Promise.all([
                fetch('locales/zh-TW.json').then(r => r.json()),
                fetch('locales/en.json').then(r => r.json())
            ]);
            this.translations['zh-TW'] = zhTW;
            this.translations['en'] = en;
        } catch (error) {
            console.error('Failed to load translations:', error);
            this.translations['zh-TW'] = {};
            this.translations['en'] = {};
        }
    },
    
    t(key, params = {}) {
        const translation = this.translations[this.currentLanguage];
        if (!translation) return key;
        
        let text = translation[key] || key;
        
        // 替換參數 {param}
        Object.keys(params).forEach(param => {
            text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
        });
        
        return text;
    },
    
    setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) return;
        this.currentLanguage = lang;
        Store.setLanguage(lang);
        this.updateHtmlLang();
        this.dispatchEvent();
    },
    
    toggleLanguage() {
        const currentIndex = this.supportedLanguages.indexOf(this.currentLanguage);
        const nextIndex = (currentIndex + 1) % this.supportedLanguages.length;
        this.setLanguage(this.supportedLanguages[nextIndex]);
    },
    
    updateHtmlLang() {
        document.documentElement.lang = this.currentLanguage;
    },
    
    dispatchEvent() {
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage },
            bubbles: true
        }));
    },
    
    bindEvents() {
        const langBtn = document.getElementById('btn-language');
        if (langBtn) {
            langBtn.addEventListener('click', () => this.toggleLanguage());
        }
        
        window.addEventListener('languageChanged', () => {
            this.updateLanguageButton();
        });
        
        this.updateLanguageButton();
    },
    
    updateLanguageButton() {
        const langBtn = document.getElementById('btn-language');
        if (langBtn) {
            const displayLang = this.currentLanguage === 'zh-TW' ? '中' : 'EN';
            langBtn.textContent = displayLang;
        }
    },
    
    getLanguage() {
        return this.currentLanguage;
    }
};

window.i18n = i18n;
