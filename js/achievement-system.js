const ACHIEVEMENTS = [
    {
        id: 'fire-starter',
        icon: '🔥',
        category: 'streak',
        nameKey: 'achievements.fireStarter',
        descKey: 'achievements.fireStarterDesc',
        requirement: { type: 'streak', value: 7 }
    },
    {
        id: 'week-warrior',
        icon: '📅',
        category: 'streak',
        nameKey: 'achievements.weekWarrior',
        descKey: 'achievements.weekWarriorDesc',
        requirement: { type: 'streak', value: 14 }
    },
    {
        id: 'month-master',
        icon: '🏆',
        category: 'streak',
        nameKey: 'achievements.monthMaster',
        descKey: 'achievements.monthMasterDesc',
        requirement: { type: 'streak', value: 30 }
    },
    {
        id: 'streak-legend',
        icon: '👑',
        category: 'streak',
        nameKey: 'achievements.streakLegend',
        descKey: 'achievements.streakLegendDesc',
        requirement: { type: 'streak', value: 100 }
    },
    {
        id: 'first-step',
        icon: '🌟',
        category: 'count',
        nameKey: 'achievements.firstStep',
        descKey: 'achievements.firstStepDesc',
        requirement: { type: 'count', value: 1 }
    },
    {
        id: 'tenacity',
        icon: '🎯',
        category: 'count',
        nameKey: 'achievements.tenacity',
        descKey: 'achievements.tenacityDesc',
        requirement: { type: 'count', value: 10 }
    },
    {
        id: 'century',
        icon: '💪',
        category: 'count',
        nameKey: 'achievements.century',
        descKey: 'achievements.centuryDesc',
        requirement: { type: 'count', value: 100 }
    },
    {
        id: 'overachiever',
        icon: '🚀',
        category: 'count',
        nameKey: 'achievements.overachiever',
        descKey: 'achievements.overachieverDesc',
        requirement: { type: 'count', value: 500 }
    },
    {
        id: 'tag-master',
        icon: '🏷️',
        category: 'usage',
        nameKey: 'achievements.tagMaster',
        descKey: 'achievements.tagMasterDesc',
        requirement: { type: 'tags', value: 4 }
    },
    {
        id: 'data-explorer',
        icon: '📊',
        category: 'usage',
        nameKey: 'achievements.dataExplorer',
        descKey: 'achievements.dataExplorerDesc',
        requirement: { type: 'statsViewed', value: 10 }
    },
    {
        id: 'exporter',
        icon: '📤',
        category: 'usage',
        nameKey: 'achievements.exporter',
        descKey: 'achievements.exporterDesc',
        requirement: { type: 'exported', value: true }
    },
    {
        id: 'theme-changer',
        icon: '🎨',
        category: 'usage',
        nameKey: 'achievements.themeChanger',
        descKey: 'achievements.themeChangerDesc',
        requirement: { type: 'themeChanged', value: true }
    },
    {
        id: 'polyglot',
        icon: '🌍',
        category: 'usage',
        nameKey: 'achievements.polyglot',
        descKey: 'achievements.polyglotDesc',
        requirement: { type: 'languageChanged', value: true }
    },
    {
        id: 'early-bird',
        icon: '🌅',
        category: 'time',
        nameKey: 'achievements.earlyBird',
        descKey: 'achievements.earlyBirdDesc',
        requirement: { type: 'time', value: 'early' }
    },
    {
        id: 'night-owl',
        icon: '🦉',
        category: 'time',
        nameKey: 'achievements.nightOwl',
        descKey: 'achievements.nightOwlDesc',
        requirement: { type: 'time', value: 'night' }
    }
];

const DEFAULT_TAG_IDS = ['work', 'life', 'learn', 'health'];

const AchievementSystem = {
    toastQueue: [],
    isShowingToast: false,

    init() {
        this.bindEvents();
        this.renderModal();
        console.log('🏆 Achievement System initialized');
    },

    bindEvents() {
        window.addEventListener('entryAdded', (e) => {
            this.checkAchievements('count');
            this.checkAchievements('time');
            if (e.detail && e.detail.entry && e.detail.entry.tags) {
                e.detail.entry.tags.forEach(tagId => {
                    Store.updateUsageStat('tagUsed', tagId);
                });
                this.checkAchievements('usage');
            }
        });

        window.addEventListener('streakUpdated', () => {
            this.checkAchievements('streak');
        });

        window.addEventListener('statsViewed', () => {
            Store.updateUsageStat('statsViewed');
            this.checkAchievements('usage');
        });

        window.addEventListener('themeChanged', () => {
            Store.updateUsageStat('themeChanged');
            this.checkAchievements('usage');
        });

        window.addEventListener('languageChanged', () => {
            Store.updateUsageStat('languageChanged');
            this.checkAchievements('usage');
        });

        window.addEventListener('dataExported', () => {
            Store.updateUsageStat('exported');
            this.checkAchievements('usage');
        });
    },

    checkAchievements(category) {
        const achievements = ACHIEVEMENTS.filter(a => a.category === category);
        const data = Store.getData();
        const achievementsData = Store.getAchievements();

        achievements.forEach(achievement => {
            if (Store.isAchievementUnlocked(achievement.id)) return;

            let unlocked = false;
            const req = achievement.requirement;

            switch (req.type) {
                case 'streak':
                    unlocked = data.streak && data.streak.current >= req.value;
                    break;
                case 'count':
                    unlocked = data.entries && data.entries.length >= req.value;
                    break;
                case 'tags':
                    const usedTags = achievementsData.usageStats.tagsUsed.filter(t => DEFAULT_TAG_IDS.includes(t));
                    unlocked = usedTags.length >= req.value;
                    break;
                case 'statsViewed':
                    unlocked = achievementsData.usageStats.statsViewed >= req.value;
                    break;
                case 'exported':
                    unlocked = achievementsData.usageStats.exported === req.value;
                    break;
                case 'themeChanged':
                    unlocked = achievementsData.usageStats.themeChanged === req.value;
                    break;
                case 'languageChanged':
                    unlocked = achievementsData.usageStats.languageChanged === req.value;
                    break;
                case 'time':
                    unlocked = this.checkTimeAchievement(req.value);
                    break;
            }

            if (unlocked) {
                this.unlockAchievement(achievement);
            }
        });
    },

    checkTimeAchievement(timeType) {
        const now = new Date();
        const hour = now.getHours();

        if (timeType === 'early') {
            return hour >= 0 && hour < 6;
        } else if (timeType === 'night') {
            return hour >= 0 && hour < 5;
        }
        return false;
    },

    unlockAchievement(achievement) {
        if (!Store.unlockAchievement(achievement.id)) return;

        this.toastQueue.push(achievement);
        this.processToastQueue();

        window.dispatchEvent(new CustomEvent('achievementUnlocked', {
            detail: { achievement },
            bubbles: true
        }));
    },

    processToastQueue() {
        if (this.isShowingToast || this.toastQueue.length === 0) return;

        this.isShowingToast = true;
        const achievement = this.toastQueue.shift();
        this.showToast(achievement);

        setTimeout(() => {
            this.isShowingToast = false;
            this.processToastQueue();
        }, 3500);
    },

    showToast(achievement) {
        let toast = document.getElementById('achievement-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'achievement-toast';
            toast.className = 'achievement-toast';
            document.body.appendChild(toast);
        }

        const name = i18n.t(achievement.nameKey);
        const desc = i18n.t(achievement.descKey);

        toast.innerHTML = `
            <div class="achievement-toast-content">
                <span class="achievement-toast-icon">${achievement.icon}</span>
                <div class="achievement-toast-text">
                    <div class="achievement-toast-title">${i18n.t('achievements.unlocked')}!</div>
                    <div class="achievement-toast-name">${name}</div>
                </div>
            </div>
        `;

        toast.classList.remove('hidden');
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('hidden');
        }, 3000);
    },

    getProgress(achievement) {
        const data = Store.getData();
        const achievementsData = Store.getAchievements();
        const req = achievement.requirement;

        switch (req.type) {
            case 'streak':
                return {
                    current: data.streak ? data.streak.current : 0,
                    required: req.value,
                    unit: i18n.t('achievements.days')
                };
            case 'count':
                return {
                    current: data.entries ? data.entries.length : 0,
                    required: req.value,
                    unit: i18n.t('achievements.entries')
                };
            case 'tags':
                const usedTags = achievementsData.usageStats.tagsUsed.filter(t => DEFAULT_TAG_IDS.includes(t));
                return {
                    current: usedTags.length,
                    required: req.value,
                    unit: i18n.t('achievements.tags')
                };
            case 'statsViewed':
                return {
                    current: achievementsData.usageStats.statsViewed,
                    required: req.value,
                    unit: i18n.t('achievements.views')
                };
            default:
                return null;
        }
    },

    renderModal() {
        const existingModal = document.getElementById('achievement-modal');
        if (existingModal) return;

        const modal = document.createElement('div');
        modal.id = 'achievement-modal';
        modal.className = 'modal hidden';
        modal.innerHTML = `
            <div class="modal-content achievement-modal-content">
                <div class="modal-header">
                    <h2>🏆 ${i18n.t('achievements.title')}</h2>
                    <button class="modal-close" onclick="AchievementSystem.hideModal()">&times;</button>
                </div>
                <div class="achievement-filters">
                    <button class="achievement-filter active" data-filter="all">${i18n.t('achievements.all')}</button>
                    <button class="achievement-filter" data-filter="streak">${i18n.t('achievements.categoryStreak')}</button>
                    <button class="achievement-filter" data-filter="count">${i18n.t('achievements.categoryCount')}</button>
                    <button class="achievement-filter" data-filter="usage">${i18n.t('achievements.categoryUsage')}</button>
                    <button class="achievement-filter" data-filter="time">${i18n.t('achievements.categoryTime')}</button>
                </div>
                <div class="modal-body">
                    <div class="achievement-stats" id="achievement-stats"></div>
                    <div class="achievement-grid" id="achievement-grid"></div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.bindFilterEvents();
    },

    bindFilterEvents() {
        const filters = document.querySelectorAll('.achievement-filter');
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                this.renderGallery(filter.dataset.filter);
            });
        });
    },

    showModal() {
        this.renderGallery('all');
        const modal = document.getElementById('achievement-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    },

    hideModal() {
        const modal = document.getElementById('achievement-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    },

    renderGallery(filter = 'all') {
        this.renderModal();

        const grid = document.getElementById('achievement-grid');
        const stats = document.getElementById('achievement-stats');
        if (!grid || !stats) return;

        let achievements = ACHIEVEMENTS;
        if (filter !== 'all') {
            achievements = ACHIEVEMENTS.filter(a => a.category === filter);
        }

        const achievementsData = Store.getAchievements();
        const unlockedCount = achievements.filter(a => 
            achievementsData.unlockedIds.includes(a.id)
        ).length;

        stats.innerHTML = `
            <span class="achievement-stats-text">${i18n.t('achievements.progress', { 
                unlocked: unlockedCount, 
                total: achievements.length 
            })}</span>
        `;

        grid.innerHTML = achievements.map(achievement => {
            const isUnlocked = achievementsData.unlockedIds.includes(achievement.id);
            const name = i18n.t(achievement.nameKey);
            const desc = i18n.t(achievement.descKey);
            const progress = this.getProgress(achievement);

            let progressHtml = '';
            if (!isUnlocked && progress) {
                progressHtml = `
                    <div class="achievement-progress">
                        <div class="achievement-progress-bar">
                            <div class="achievement-progress-fill" style="width: ${Math.min(100, (progress.current / progress.required) * 100)}%"></div>
                        </div>
                        <span class="achievement-progress-text">${progress.current}/${progress.required} ${progress.unit}</span>
                    </div>
                `;
            }

            const unlockedAt = achievementsData.unlockedAt[achievement.id];
            const unlockedAtHtml = isUnlocked && unlockedAt ? 
                `<div class="achievement-unlocked-at">${i18n.t('achievements.unlockedAt')}: ${this.formatDate(unlockedAt)}</div>` : '';

            return `
                <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-info">
                        <div class="achievement-name">${name}</div>
                        <div class="achievement-desc">${desc}</div>
                        ${isUnlocked ? `<div class="achievement-badge">${i18n.t('achievements.unlocked')}</div>` : ''}
                        ${unlockedAtHtml}
                        ${progressHtml}
                    </div>
                </div>
            `;
        }).join('');
    },

    formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString(i18n.getLanguage() === 'zh-TW' ? 'zh-TW' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
};

window.AchievementSystem = AchievementSystem;
