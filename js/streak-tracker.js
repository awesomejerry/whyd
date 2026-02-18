// StreakTracker.js - WHYD 連續天數追蹤器

class StreakTracker {
    constructor(storageKey = 'whyd_streak') {
        this.storageKey = storageKey;
        this.data = this.loadStreakData();
    }

    static init() {
        const instance = new StreakTracker();
        const container = document.getElementById('streak-section');
        
        if (container) {
            container.innerHTML = instance.renderStyles() + instance.render();
        }
        
        window.addEventListener('entryAdded', () => {
            instance.recordActivity();
            if (container) {
                container.innerHTML = instance.renderStyles() + instance.render();
            }
        });

        window.addEventListener('languageChanged', () => {
            if (container) {
                container.innerHTML = instance.renderStyles() + instance.render();
            }
        });
        
        return instance;
    }

    getStorageKey() {
        return this.storageKey;
    }

    loadStreakData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error('Failed to load streak data:', e);
        }
        return {
            lastActivityDate: null,
            currentStreak: 0,
            bestStreak: 0
        };
    }

    saveStreakData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        } catch (e) {
            console.error('Failed to save streak data:', e);
        }
    }

    getDaysBetween(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
        const diffTime = Math.abs(d2 - d1);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    getTodayDate() {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now.toISOString().split('T')[0];
    }

    recordActivity() {
        const today = this.getTodayDate();
        
        if (this.data.lastActivityDate === today) {
            return this.data.currentStreak;
        }

        if (this.data.lastActivityDate === null) {
            this.data.currentStreak = 1;
            this.data.bestStreak = 1;
        } else {
            const daysSinceLastActivity = this.getDaysBetween(this.data.lastActivityDate, today);
            
            if (daysSinceLastActivity === 1) {
                this.data.currentStreak++;
                if (this.data.currentStreak > this.data.bestStreak) {
                    this.data.bestStreak = this.data.currentStreak;
                }
            } else if (daysSinceLastActivity > 1) {
                this.data.currentStreak = 1;
            }
        }

        this.data.lastActivityDate = today;
        this.saveStreakData();
        
        return this.data.currentStreak;
    }

    calculateStreak() {
        const today = this.getTodayDate();
        
        if (this.data.lastActivityDate === null) {
            return 0;
        }

        const daysSinceLastActivity = this.getDaysBetween(this.data.lastActivityDate, today);
        
        if (daysSinceLastActivity > 1) {
            this.data.currentStreak = 0;
            this.saveStreakData();
            return 0;
        }

        return this.data.currentStreak;
    }

    getFlameTier(streak) {
        if (streak < 1) return { icon: '', label: i18n.t('streak.noStreak'), class: 'no-streak' };
        if (streak <= 3) return { icon: '💫', label: i18n.t('streak.sparkle'), class: 'sparkle' };
        if (streak <= 6) return { icon: '🔥', label: i18n.t('streak.flame1'), class: 'flame-1' };
        if (streak < 30) return { icon: '🔥🔥', label: i18n.t('streak.flame2'), class: 'flame-2' };
        return { icon: '🔥🔥🔥', label: i18n.t('streak.flame3'), class: 'flame-3' };
    }

    getStreakData() {
        return {
            current: this.data.currentStreak,
            best: this.data.bestStreak,
            tier: this.getFlameTier(this.data.currentStreak)
        };
    }

    render() {
        const streakData = this.getStreakData();
        const tier = streakData.tier;
        
        return `
            <div class="streak-tracker">
                <div class="streak-current">
                    <span class="streak-icon ${tier.class}">${tier.icon}</span>
                    <span class="streak-count">${streakData.current}</span>
                    <span class="streak-label">${i18n.t('streak.days')}</span>
                </div>
                <div class="streak-best">
                    <span class="streak-best-label">${i18n.t('streak.bestRecord')}</span>
                    <span class="streak-best-count">${streakData.best}</span>
                    <span class="streak-best-unit">${i18n.t('streak.day')}</span>
                </div>
            </div>
        `;
    }

    renderStyles() {
        return `
            <style>
                .streak-tracker {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 12px 16px;
                    background: var(--surface);
                    border-radius: 12px;
                    border: 1px solid var(--border);
                }

                .streak-current {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .streak-icon {
                    font-size: 24px;
                    display: inline-block;
                }

                .streak-icon.flame-1,
                .streak-icon.flame-2,
                .streak-icon.flame-3 {
                    animation: flameFlicker 0.5s ease-in-out infinite alternate;
                }

                .streak-icon.flame-2 {
                    animation-duration: 0.4s;
                }

                .streak-icon.flame-3 {
                    animation-duration: 0.3s;
                    animation-name: flameFlickerIntense;
                }

                .streak-icon.sparkle {
                    animation: sparkleGlow 1.5s ease-in-out infinite;
                }

                @keyframes flameFlicker {
                    0% {
                        transform: translateY(0) scale(1);
                        filter: brightness(1);
                    }
                    100% {
                        transform: translateY(-2px) scale(1.05);
                        filter: brightness(1.2);
                    }
                }

                @keyframes flameFlickerIntense {
                    0% {
                        transform: translateY(0) scale(1) rotate(-2deg);
                        filter: brightness(1) drop-shadow(0 0 4px #ff6b35);
                    }
                    50% {
                        transform: translateY(-3px) scale(1.1) rotate(2deg);
                        filter: brightness(1.3) drop-shadow(0 0 8px #ff6b35);
                    }
                    100% {
                        transform: translateY(-1px) scale(1.05) rotate(-1deg);
                        filter: brightness(1.15) drop-shadow(0 0 6px #ff6b35);
                    }
                }

                @keyframes sparkleGlow {
                    0%, 100% {
                        transform: scale(1) rotate(0deg);
                        filter: brightness(1);
                    }
                    50% {
                        transform: scale(1.15) rotate(15deg);
                        filter: brightness(1.3);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .streak-icon.flame-1,
                    .streak-icon.flame-2,
                    .streak-icon.flame-3,
                    .streak-icon.sparkle {
                        animation: none;
                    }
                }

                .streak-count {
                    font-size: 28px;
                    font-weight: 700;
                    color: var(--text);
                }

                .streak-label {
                    font-size: 14px;
                    color: var(--text-muted);
                }

                .streak-best {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding-left: 16px;
                    border-left: 1px solid var(--border);
                }

                .streak-best-label {
                    font-size: 12px;
                    color: var(--text-muted);
                }

                .streak-best-count {
                    font-size: 18px;
                    font-weight: 600;
                    color: #ffd700;
                }

                .streak-best-unit {
                    font-size: 12px;
                    color: var(--text-muted);
                }
            </style>
        `;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StreakTracker;
}

// Auto-initialization helper
function initStreakTracker(containerSelector) {
    const tracker = new StreakTracker();
    const container = document.querySelector(containerSelector);
    
    if (container) {
        container.innerHTML = tracker.renderStyles() + tracker.render();
    }
    
    return tracker;
}

// Global access
window.StreakTracker = StreakTracker;
window.initStreakTracker = initStreakTracker;
