// timeline-view.js - WHYD 時間軸視圖模組

const TimelineView = {
    filterTags: [],
    searchQuery: '',

    init() {
        this.render();
        this.bindEvents();
    },

    render() {
        const container = document.getElementById('timeline-section');
        if (!container) return;

        container.innerHTML = `
            <div class="timeline" id="timeline"></div>
        `;

        this.renderEntries();
    },

    bindEvents() {
        window.addEventListener('tag-selected', (e) => {
            this.filterTags = e.detail.selectedTags;
            this.renderEntries();
        });

        window.addEventListener('search-filtered', (e) => {
            this.searchQuery = e.detail.query || '';
            this.renderEntries();
        });

        window.addEventListener('entry-added', () => {
            this.renderEntries();
        });

        window.addEventListener('entry-updated', () => {
            this.renderEntries();
        });

        window.addEventListener('entry-deleted', () => {
            this.renderEntries();
        });
    },

    getFilteredEntries() {
        const data = Store.getData();
        let entries = data.entries || [];

        if (this.filterTags.length > 0) {
            entries = entries.filter(entry => 
                entry.tags && entry.tags.some(tagId => this.filterTags.includes(tagId))
            );
        }

        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            entries = entries.filter(entry => 
                entry.text && entry.text.toLowerCase().includes(query)
            );
        }

        return entries;
    },

    renderEntries() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        const entries = this.getFilteredEntries();
        const allTags = Store.getTags();

        if (entries.length === 0) {
            let emptyMessage = '開始記錄你完成的事吧！';
            if (this.searchQuery) {
                emptyMessage = '沒有符合搜尋條件的記錄';
            } else if (this.filterTags.length > 0) {
                emptyMessage = '沒有符合條件的記錄';
            }
            timeline.innerHTML = `
                <div class="timeline-empty">
                    <div class="timeline-empty-icon">📝</div>
                    <div class="timeline-empty-text">${emptyMessage}</div>
                </div>
            `;
            return;
        }

        timeline.innerHTML = entries.map(entry => {
            const entryTags = (entry.tags || [])
                .map(tagId => allTags.find(t => t.id === tagId))
                .filter(Boolean);

            const isEditing = window.EditDelete && EditDelete.isEditing(entry.id);

            if (isEditing) {
                return this.renderEditMode(entry, allTags, entryTags);
            }

            const tagsHtml = entryTags.length > 0 ? `
                <div class="timeline-tags">
                    ${entryTags.map(tag => `
                        <span class="tag-dot" style="background: ${tag.color}" title="${tag.name}"></span>
                    `).join('')}
                </div>
            ` : '';

            return `
                <div class="timeline-item" data-entry-id="${entry.id}">
                    <div class="timeline-marker"></div>
                    <div class="timeline-card">
                        <div class="timeline-actions">
                            <button class="edit-btn" title="編輯">✏️</button>
                            <button class="delete-btn" title="刪除">🗑️</button>
                        </div>
                        <div class="timeline-time">${Utils.formatTime(entry.createdAt)}</div>
                        <div class="timeline-content">${this.escapeHtml(entry.text)}</div>
                        ${tagsHtml}
                    </div>
                </div>
            `;
        }).join('');
    },

    renderEditMode(entry, allTags, entryTags) {
        const currentTagIds = entryTags.map(t => t.id);
        
        return `
            <div class="timeline-item" data-entry-id="${entry.id}">
                <div class="timeline-marker"></div>
                <div class="timeline-card timeline-card-editing">
                    <div class="edit-form">
                        <textarea class="edit-text-input" placeholder="輸入內容...">${this.escapeHtml(entry.text)}</textarea>
                        <div class="edit-tags">
                            ${allTags.map(tag => `
                                <span class="tag-pill tag-pill-edit ${currentTagIds.includes(tag.id) ? 'selected' : ''}" 
                                      data-tag-id="${tag.id}"
                                      style="--tag-color: ${tag.color}">
                                    <span class="tag-dot" style="background: ${tag.color}"></span>
                                    ${tag.name}
                                </span>
                            `).join('')}
                        </div>
                        <div class="edit-error hidden"></div>
                        <div class="edit-actions">
                            <button class="btn btn-secondary edit-cancel-btn">取消</button>
                            <button class="btn btn-primary edit-save-btn">儲存</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

window.TimelineView = TimelineView;
