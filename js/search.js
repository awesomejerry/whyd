const Search = {
    searchQuery: '',

    init() {
        this.render();
        this.bindEvents();
    },

    render() {
        const container = document.getElementById('timeline-section');
        if (!container) return;

        const searchHTML = `
            <div class="search-container">
                <div class="search-wrapper">
                    <span class="search-icon">🔍</span>
                    <input 
                        type="text" 
                        class="search-input" 
                        id="search-input"
                        placeholder="搜尋記錄..."
                    >
                    <button class="search-clear-btn hidden" id="search-clear-btn" title="清除搜尋">✕</button>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('afterbegin', searchHTML);
    },

    bindEvents() {
        const searchInput = document.getElementById('search-input');
        const clearBtn = document.getElementById('search-clear-btn');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.trim();
                this.updateClearButton();
                this.dispatchSearchEvent();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearSearch();
            });
        }
    },

    updateClearButton() {
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) {
            if (this.searchQuery.length > 0) {
                clearBtn.classList.remove('hidden');
            } else {
                clearBtn.classList.add('hidden');
            }
        }
    },

    clearSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        this.searchQuery = '';
        this.updateClearButton();
        this.dispatchSearchEvent();
    },

    dispatchSearchEvent() {
        window.dispatchEvent(new CustomEvent('search-filtered', {
            detail: { query: this.searchQuery }
        }));
    },

    getQuery() {
        return this.searchQuery;
    }
};

window.Search = Search;
