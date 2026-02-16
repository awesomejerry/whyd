const DailySummary = {
    SUMMARY_HIGHLIGHT_KEY: 'whyd_highlight_',
    SUMMARY_PROMPTED_KEY: 'whyd_prompted_',

    init() {
        console.log('🌙 DailySummary 初始化...');
        this.cacheElements();
        this.checkEveningPrompt();
    },

    cacheElements() {
        this.section = document.getElementById('summary-section');
    },

    getTodayKey(suffix) {
        const today = new Date().toISOString().split('T')[0];
        return `${suffix}${today}`;
    },

    getHighlight() {
        const key = this.getTodayKey(this.SUMMARY_HIGHLIGHT_KEY);
        return localStorage.getItem(key);
    },

    setHighlight(entryId) {
        const key = this.getTodayKey(this.SUMMARY_HIGHLIGHT_KEY);
        if (entryId) {
            localStorage.setItem(key, entryId);
        } else {
            localStorage.removeItem(key);
        }
    },

    wasPromptedToday() {
        const key = this.getTodayKey(this.SUMMARY_PROMPTED_KEY);
        return localStorage.getItem(key) === 'true';
    },

    markPromptedToday() {
        const key = this.getTodayKey(this.SUMMARY_PROMPTED_KEY);
        localStorage.setItem(key, 'true');
    },

    checkEveningPrompt() {
        const now = new Date();
        const hour = now.getHours();
        
        if (hour >= 20 && hour < 23 && !this.wasPromptedToday()) {
            const entries = Store.getTodayEntries();
            if (entries.length > 0) {
                this.markPromptedToday();
                this.show();
            }
        }
    },

    calculateStats(entries) {
        if (!entries || entries.length === 0) {
            return {
                total: 0,
                earliest: '--:--',
                latest: '--:--',
                tagDistribution: []
            };
        }

        const total = entries.length;
        
        const times = entries.map(e => new Date(e.createdAt).getTime());
        const earliestDate = new Date(Math.min(...times));
        const latestDate = new Date(Math.max(...times));
        
        const formatHour = (date) => {
            return date.toLocaleTimeString('zh-TW', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        };

        const tagCount = {};
        entries.forEach(entry => {
            if (entry.tags && entry.tags.length > 0) {
                entry.tags.forEach(tagId => {
                    tagCount[tagId] = (tagCount[tagId] || 0) + 1;
                });
            }
        });

        const tags = Store.getTags();
        const tagDistribution = Object.entries(tagCount)
            .map(([id, count]) => {
                const tag = tags.find(t => t.id === id);
                return {
                    id,
                    name: tag ? tag.name : id,
                    color: tag ? tag.color : '#64748b',
                    count,
                    percentage: Math.round((count / total) * 100)
                };
            })
            .sort((a, b) => b.count - a.count);

        return {
            total,
            earliest: formatHour(earliestDate),
            latest: formatHour(latestDate),
            tagDistribution
        };
    },

    render() {
        if (!this.section) return;

        const entries = Store.getTodayEntries();
        const stats = this.calculateStats(entries);
        const highlightId = this.getHighlight();

        const container = document.createElement('div');
        container.className = 'summary-container';

        if (entries.length === 0) {
            container.innerHTML = `
                <div class="summary-empty">
                    <div class="summary-empty-icon">📝</div>
                    <p class="summary-empty-text">今天還沒有任何記錄</p>
                    <p class="summary-empty-hint">開始記錄你的成就吧！</p>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="summary-header">
                    <h2>今日回顧</h2>
                </div>
                
                <div class="summary-stats">
                    <div class="stat-card">
                        <span class="stat-value">${stats.total}</span>
                        <span class="stat-label">總數</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value">${stats.earliest}</span>
                        <span class="stat-label">最早</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-value">${stats.latest}</span>
                        <span class="stat-label">最晚</span>
                    </div>
                </div>
                
                ${stats.tagDistribution.length > 0 ? `
                <div class="summary-tags">
                    <h3>標籤分布</h3>
                    <div class="tag-bars">
                        ${stats.tagDistribution.map(tag => `
                            <div class="tag-bar">
                                <div class="tag-bar-info">
                                    <span class="tag-bar-dot" style="background: ${tag.color}"></span>
                                    <span class="tag-bar-name">${tag.name}</span>
                                    <span class="tag-bar-count">${tag.count} (${tag.percentage}%)</span>
                                </div>
                                <div class="tag-bar-track">
                                    <div class="tag-bar-fill" style="width: ${tag.percentage}%; background: ${tag.color}"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <div class="summary-highlight">
                    <h3>今日最重要的事</h3>
                    <div class="highlight-list">
                        ${entries.map(entry => `
                            <div class="highlight-item ${entry.id.toString() === highlightId ? 'selected' : ''}" 
                                 data-id="${entry.id}">
                                <span class="highlight-icon">${entry.id.toString() === highlightId ? '⭐' : '☆'}</span>
                                <span class="highlight-text">${entry.text}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="summary-timeline">
                    <h3>今日記錄</h3>
                    <div class="summary-timeline-list">
                        ${entries.slice(0, 5).map(entry => `
                            <div class="summary-timeline-item">
                                <span class="summary-time">${Utils.formatTime(entry.createdAt)}</span>
                                <span class="summary-content">${entry.text}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        this.section.innerHTML = '';
        this.section.appendChild(container);

        this.bindHighlightEvents();
    },

    bindHighlightEvents() {
        if (!this.section) return;

        const items = this.section.querySelectorAll('.highlight-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const entryId = item.dataset.id;
                const currentHighlight = this.getHighlight();

                if (currentHighlight === entryId) {
                    this.setHighlight(null);
                    item.classList.remove('selected');
                    item.querySelector('.highlight-icon').textContent = '☆';
                } else {
                    items.forEach(i => {
                        i.classList.remove('selected');
                        i.querySelector('.highlight-icon').textContent = '☆';
                    });
                    this.setHighlight(entryId);
                    item.classList.add('selected');
                    item.querySelector('.highlight-icon').textContent = '⭐';
                }
            });
        });
    },

    show() {
        this.render();
        if (this.section) {
            this.section.classList.remove('hidden');
            this.section.classList.add('hidden-by-toggle');
        }
    },

    hide() {
        if (this.section) {
            this.section.classList.add('hidden');
            this.section.classList.remove('hidden-by-toggle');
        }
    }
};

window.DailySummary = DailySummary;
