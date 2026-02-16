// timeline-view.js - WHYD 時間軸視圖模組

const TimelineView = {
    filterTags: [],

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

        window.addEventListener('entry-added', () => {
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

        return entries;
    },

    renderEntries() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        const entries = this.getFilteredEntries();
        const allTags = Store.getTags();

        if (entries.length === 0) {
            timeline.innerHTML = `
                <div class="timeline-empty">
                    <div class="timeline-empty-icon">📝</div>
                    <div class="timeline-empty-text">
                        ${this.filterTags.length > 0 ? '沒有符合條件的記錄' : '開始記錄你完成的事吧！'}
                    </div>
                </div>
            `;
            return;
        }

        timeline.innerHTML = entries.map(entry => {
            const entryTags = (entry.tags || [])
                .map(tagId => allTags.find(t => t.id === tagId))
                .filter(Boolean);

            const tagsHtml = entryTags.length > 0 ? `
                <div class="timeline-tags">
                    ${entryTags.map(tag => `
                        <span class="tag-dot" style="background: ${tag.color}" title="${tag.name}"></span>
                    `).join('')}
                </div>
            ` : '';

            return `
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-card">
                        <div class="timeline-time">${Utils.formatTime(entry.createdAt)}</div>
                        <div class="timeline-content">${this.escapeHtml(entry.text)}</div>
                        ${tagsHtml}
                    </div>
                </div>
            `;
        }).join('');
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

window.TimelineView = TimelineView;
