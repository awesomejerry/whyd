const Shortcuts = {
    init() {
        this.modal = document.getElementById('shortcuts-modal');
        this.flashElement = document.getElementById('shortcut-flash');
        this.bindEvents();
    },

    bindEvents() {
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.hideHelp();
            });
        }
    },

    handleKeydown(e) {
        const isInputFocused = this.isInputElement(e.target);
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modifier = isMac ? e.metaKey : e.ctrlKey;

        if (e.key === 'Escape') {
            this.handleEscape();
            return;
        }

        if (isInputFocused) return;

        if (modifier && e.key === 'n') {
            e.preventDefault();
            this.focusInput();
            return;
        }

        if (modifier && e.key === '/') {
            e.preventDefault();
            this.toggleHelp();
            return;
        }

        if (e.key === '?' && !modifier) {
            e.preventDefault();
            this.showHelp();
            return;
        }

        if (modifier && e.key === 'e') {
            e.preventDefault();
            this.triggerExport();
            return;
        }

        if (modifier && e.key === 's') {
            e.preventDefault();
            this.triggerStats();
            return;
        }
    },

    isInputElement(target) {
        const tagName = target.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') return true;
        if (target.isContentEditable) return true;
        return false;
    },

    handleEscape() {
        if (this.modal && !this.modal.classList.contains('hidden')) {
            this.hideHelp();
            return;
        }

        const exportModal = document.getElementById('export-modal');
        if (exportModal && !exportModal.classList.contains('hidden')) {
            if (typeof ExportFeature !== 'undefined') {
                ExportFeature.hide();
            }
            return;
        }

        const editingCard = document.querySelector('.timeline-card-editing');
        if (editingCard) {
            if (typeof EditDelete !== 'undefined') {
                EditDelete.cancelEdit();
            }
            return;
        }
    },

    focusInput() {
        const input = document.querySelector('.entry-input');
        if (input) {
            input.focus();
            this.showFlash();
        }
    },

    showHelp() {
        if (this.modal) {
            this.modal.classList.remove('hidden');
        }
    },

    hideHelp() {
        if (this.modal) {
            this.modal.classList.add('hidden');
        }
    },

    toggleHelp() {
        if (this.modal) {
            this.modal.classList.toggle('hidden');
        }
    },

    triggerExport() {
        if (typeof ExportFeature !== 'undefined') {
            ExportFeature.show();
            this.showFlash();
        }
    },

    triggerStats() {
        const btnStats = document.getElementById('btn-stats');
        if (btnStats && typeof App !== 'undefined') {
            App.toggleSection('stats-section', btnStats);
            this.showFlash();
        }
    },

    showFlash() {
        if (!this.flashElement) return;
        
        this.flashElement.classList.remove('shortcut-flash-active');
        void this.flashElement.offsetWidth;
        this.flashElement.classList.add('shortcut-flash-active');
        
        setTimeout(() => {
            this.flashElement.classList.remove('shortcut-flash-active');
        }, 300);
    }
};

window.Shortcuts = Shortcuts;
