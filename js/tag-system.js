// tag-system.js - WHYD 標籤系統模組

const TagSystem = {
    selectedTags: new Set(),
    isAddingTag: false,

    init() {
        this.render();
        this.bindEvents();
    },

    render() {
        const container = document.getElementById('tags-section');
        if (!container) return;

        container.innerHTML = `
            <div class="tags-header">
                <span class="tags-title">標籤</span>
                <button class="tag-filter-btn" id="clear-filter-btn">清除篩選</button>
            </div>
        `;

        // 在 sticky-input-area 裡面創建 tags-sticky-bar
        const stickyArea = document.querySelector('.sticky-input-area');
        if (stickyArea) {
            let stickyBar = document.getElementById('tags-sticky-bar');
            if (!stickyBar) {
                stickyBar = document.createElement('div');
                stickyBar.id = 'tags-sticky-bar';
                stickyBar.className = 'tags-sticky-bar';
                stickyArea.appendChild(stickyBar);
            }
            stickyBar.innerHTML = `<div class="tags-list" id="tags-list"></div>`;
        }

        this.renderTags();
    },

    renderTags() {
        const listEl = document.getElementById('tags-list');
        if (!listEl) return;

        const tags = Store.getTags();
        const selectedIds = Array.from(this.selectedTags);

        let html = tags.map(tag => {
            const isSelected = this.selectedTags.has(tag.id);
            const isFaded = selectedIds.length > 0 && !isSelected;
            return `
                <button class="tag-pill ${isSelected ? 'selected' : ''} ${isFaded ? 'faded' : ''}"
                        data-tag-id="${tag.id}"
                        style="--tag-color: ${tag.color}">
                    <span class="tag-dot" style="background: ${tag.color}"></span>
                    <span class="tag-name">${tag.name}</span>
                </button>
            `;
        }).join('');

        html += `
            <button class="tag-pill tag-add-btn" id="tag-add-btn">
                <span class="tag-add-icon">+</span>
            </button>
        `;

        listEl.innerHTML = html;
    },

    bindEvents() {
        // 使用 document 級別的事件委派，因為標籤可能在不同容器
        document.addEventListener('click', (e) => {
            const tagPill = e.target.closest('.tag-pill[data-tag-id]');
            if (tagPill) {
                const tagId = tagPill.dataset.tagId;
                this.toggleTag(tagId);
                return;
            }

            if (e.target.closest('#tag-add-btn')) {
                this.showAddTagInput();
                return;
            }

            if (e.target.closest('#tag-add-confirm')) {
                const input = document.getElementById('tag-add-input');
                if (input && input.value.trim()) {
                    this.addCustomTag(input.value.trim());
                }
                return;
            }

            if (e.target.closest('#tag-add-cancel')) {
                this.hideAddTagInput();
                return;
            }
        });

        const clearBtn = document.getElementById('clear-filter-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearSelection());
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.id === 'tag-add-input') {
                if (e.target.value.trim()) {
                    this.addCustomTag(e.target.value.trim());
                }
            }
            if (e.key === 'Escape') {
                this.hideAddTagInput();
            }
        });
    },

    toggleTag(tagId) {
        if (this.selectedTags.has(tagId)) {
            this.deselectTag(tagId);
        } else {
            this.selectTag(tagId);
        }
    },

    selectTag(tagId) {
        this.selectedTags.add(tagId);
        this.renderTags();
        this.emitChange();
    },

    deselectTag(tagId) {
        this.selectedTags.delete(tagId);
        this.renderTags();
        this.emitChange();
    },

    clearSelection() {
        this.selectedTags.clear();
        this.renderTags();
        this.emitChange();
    },

    getSelectedTags() {
        return Array.from(this.selectedTags);
    },

    hasSelection() {
        return this.selectedTags.size > 0;
    },

    showAddTagInput() {
        const addBtn = document.getElementById('tag-add-btn');
        if (!addBtn || this.isAddingTag) return;

        this.isAddingTag = true;
        addBtn.outerHTML = `
            <div class="tag-add-input-wrapper" id="tag-add-wrapper">
                <input type="text" class="tag-add-input" id="tag-add-input" 
                       placeholder="標籤名稱" maxlength="10" autofocus>
                <button class="tag-add-confirm" id="tag-add-confirm">✓</button>
                <button class="tag-add-cancel" id="tag-add-cancel">✕</button>
            </div>
        `;

        setTimeout(() => {
            const input = document.getElementById('tag-add-input');
            if (input) input.focus();
        }, 50);
    },

    hideAddTagInput() {
        const wrapper = document.getElementById('tag-add-wrapper');
        if (!wrapper) return;

        this.isAddingTag = false;
        wrapper.outerHTML = `
            <button class="tag-pill tag-add-btn" id="tag-add-btn">
                <span class="tag-add-icon">+</span>
            </button>
        `;
    },

    addCustomTag(name) {
        const newTag = Store.addTag({ name });
        this.hideAddTagInput();
        this.renderTags();
        this.selectTag(newTag.id);
    },

    emitChange() {
        window.dispatchEvent(new CustomEvent('tag-selected', {
            detail: { selectedTags: this.getSelectedTags() }
        }));
    }
};

window.TagSystem = TagSystem;
