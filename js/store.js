// Store.js - WHYD 資料儲存層
// 使用 LocalStorage 儲存用戶的成就記錄

const STORE_KEY = 'whyd_data';

const DEFAULT_TAGS = [
    { id: 'work', name: '工作', color: '#3b82f6', isDefault: true },
    { id: 'life', name: '生活', color: '#10b981', isDefault: true },
    { id: 'learn', name: '學習', color: '#f59e0b', isDefault: true },
    { id: 'health', name: '健康', color: '#ec4899', isDefault: true }
];

const CUSTOM_TAG_COLORS = [
    '#8b5cf6', '#06b6d4', '#84cc16', '#f97316',
    '#6366f1', '#14b8a6', '#eab308', '#ef4444'
];

const Store = {
    getData() {
        const data = localStorage.getItem(STORE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            this.migrateTags(parsed);
            return parsed;
        }
        return {
            entries: [],
            tags: [],
            settings: {
                onboarded: false,
                theme: 'light'
            },
            streak: {
                current: 0,
                best: 0,
                lastDate: null
            }
        };
    },

    saveData(data) {
        localStorage.setItem(STORE_KEY, JSON.stringify(data));
    },

    migrateTags(data) {
        if (!data.tags || data.tags.length === 0) return;
        if (typeof data.tags[0] === 'string') {
            data.tags = data.tags.map((name, i) => ({
                id: `migrated-${i}`,
                name,
                color: CUSTOM_TAG_COLORS[i % CUSTOM_TAG_COLORS.length],
                isDefault: false
            }));
            this.saveData(data);
        }
    },

    addEntry(text, tags = []) {
        const data = this.getData();
        const entry = {
            id: Date.now(),
            text,
            tags,
            createdAt: new Date().toISOString()
        };
        data.entries.unshift(entry);
        this.saveData(data);
        return entry;
    },

    getTodayEntries() {
        const data = this.getData();
        const today = new Date().toDateString();
        return data.entries.filter(e =>
            new Date(e.createdAt).toDateString() === today
        );
    },

    getEntriesByDateRange(from, to) {
        const data = this.getData();
        const fromDate = new Date(from);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        return data.entries.filter(e => {
            const entryDate = new Date(e.createdAt);
            return entryDate >= fromDate && entryDate <= toDate;
        });
    },

    getTags() {
        const customTags = this.getData().tags || [];
        return [...DEFAULT_TAGS, ...customTags];
    },

    getTagById(id) {
        return this.getTags().find(t => t.id === id);
    },

    addTag(tag) {
        const data = this.getData();
        const existing = data.tags.find(t => t.name === tag.name);
        if (existing) return existing;

        const colorIndex = data.tags.length % CUSTOM_TAG_COLORS.length;
        const newTag = {
            id: `custom-${Date.now()}`,
            name: tag.name,
            color: CUSTOM_TAG_COLORS[colorIndex],
            isDefault: false
        };
        data.tags.push(newTag);
        this.saveData(data);
        return newTag;
    },

    updateStreak() {
        const data = this.getData();
        const today = new Date().toDateString();
        const lastDate = data.streak.lastDate;

        if (lastDate === today) {
            return data.streak;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate === yesterday.toDateString()) {
            data.streak.current++;
        } else if (lastDate !== today) {
            data.streak.current = 1;
        }

        data.streak.best = Math.max(data.streak.best, data.streak.current);
        data.streak.lastDate = today;
        this.saveData(data);
        return data.streak;
    },

    setOnboarded() {
        const data = this.getData();
        data.settings.onboarded = true;
        this.saveData(data);
    },

    isOnboarded() {
        return this.getData().settings.onboarded;
    }
};

window.Store = Store;
