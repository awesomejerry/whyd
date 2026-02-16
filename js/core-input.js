const CoreInput = {
    elements: {},
    isSubmitting: false,

    init() {
        this.createDOM();
        this.attachEventListeners();
        this.autoFocus();
    },

    createDOM() {
        const section = document.getElementById('input-section');
        if (!section) return;

        section.innerHTML = `
            <div class="input-wrapper" id="input-wrapper">
                <input 
                    type="text" 
                    class="entry-input" 
                    id="entry-input" 
                    placeholder="你完成了什麼？"
                    aria-label="輸入完成的事項"
                    autocomplete="off"
                    maxlength="500"
                >
                <button 
                    type="button" 
                    class="submit-btn" 
                    id="submit-btn"
                    aria-label="提交"
                    disabled
                >
                    <svg class="submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                </button>
            </div>
            <div class="selected-tags-display" id="selected-tags-display"></div>
        `;

        this.elements.wrapper = document.getElementById('input-wrapper');
        this.elements.input = document.getElementById('entry-input');
        this.elements.button = document.getElementById('submit-btn');
        this.elements.tagDisplay = document.getElementById('selected-tags-display');

        this.updateSelectedTagsDisplay();
    },

    attachEventListeners() {
        const input = this.elements.input;
        const button = this.elements.button;

        if (!input || !button) return;

        button.addEventListener('click', () => this.handleSubmit());

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSubmit();
            }
        });

        input.addEventListener('input', () => {
            this.updateButtonState();
        });

        window.addEventListener('tag-selected', () => {
            this.updateSelectedTagsDisplay();
        });
    },

    validateInput(text) {
        const trimmed = text.trim();
        return trimmed.length > 0;
    },

    updateButtonState() {
        if (!this.elements.input || !this.elements.button) return;
        const isValid = this.validateInput(this.elements.input.value);
        this.elements.button.disabled = !isValid;
    },

    handleSubmit() {
        if (this.isSubmitting) return;

        const input = this.elements.input;
        if (!input) return;

        const text = input.value;
        const trimmedText = text.trim();

        if (!this.validateInput(text)) {
            return;
        }

        this.isSubmitting = true;

        const tags = typeof TagSystem !== 'undefined' ? TagSystem.getSelectedTags() : [];
        const entry = Store.addEntry(trimmedText, tags);

        this.clearInput();
        this.updateButtonState();
        this.triggerSuccessAnimation();
        this.dispatchEntryAddedEvent(entry);

        setTimeout(() => {
            this.isSubmitting = false;
            this.autoFocus();
        }, 300);
    },

    clearInput() {
        if (this.elements.input) {
            this.elements.input.value = '';
        }
    },

    autoFocus() {
        if (this.elements.input) {
            this.elements.input.focus();
        }
    },

    triggerSuccessAnimation() {
        const wrapper = this.elements.wrapper;
        if (!wrapper) return;

        wrapper.classList.add('submit-success');
        
        setTimeout(() => {
            wrapper.classList.remove('submit-success');
        }, 300);
    },

    dispatchEntryAddedEvent(entry) {
        const event = new CustomEvent('entryAdded', {
            detail: { entry },
            bubbles: true
        });
        window.dispatchEvent(event);

        window.dispatchEvent(new CustomEvent('entry-added'));
    },

    updateSelectedTagsDisplay() {
        const display = this.elements.tagDisplay;
        if (!display) return;

        const selectedIds = typeof TagSystem !== 'undefined' ? TagSystem.getSelectedTags() : [];
        
        if (selectedIds.length === 0) {
            display.innerHTML = '';
            return;
        }

        const tags = Store.getTags();
        const selectedTags = tags.filter(t => selectedIds.includes(t.id));

        display.innerHTML = selectedTags.map(tag => `
            <span class="tag-pill selected" style="--tag-color: ${tag.color}">
                <span class="tag-dot" style="background: ${tag.color}"></span>
                ${tag.name}
            </span>
        `).join('');
    }
};

window.CoreInput = CoreInput;
