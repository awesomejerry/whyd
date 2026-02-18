const ImportFeature = {
    MAX_FILE_SIZE: 5 * 1024 * 1024,

    init() {
        this.modal = document.getElementById('export-modal');
        this.fileInput = null;
        this.previewData = null;
        this.bindEvents();
    },

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'select-file') {
                this.triggerFileSelect();
            }
            if (e.target.dataset.action === 'import') {
                this.handleImport();
            }
        });

        document.addEventListener('change', (e) => {
            if (e.target.id === 'import-file-input') {
                this.handleFileSelect(e.target);
            }
        });
    },

    triggerFileSelect() {
        if (!this.fileInput) {
            this.fileInput = document.createElement('input');
            this.fileInput.type = 'file';
            this.fileInput.id = 'import-file-input';
            this.fileInput.accept = '.json,application/json';
            this.fileInput.style.display = 'none';
            document.body.appendChild(this.fileInput);
        }
        this.fileInput.click();
    },

    handleFileSelect(input) {
        const file = input.files[0];
        if (!file) return;

        if (file.size > this.MAX_FILE_SIZE) {
            this.showNotification('檔案過大，請選擇小於 5MB 的檔案', 'error');
            input.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                this.validateAndPreview(data);
            } catch (error) {
                this.showNotification('檔案格式錯誤，請選擇有效的 JSON 檔案', 'error');
                this.clearPreview();
            }
        };
        reader.onerror = () => {
            this.showNotification('讀取檔案失敗，請重試', 'error');
            this.clearPreview();
        };
        reader.readAsText(file);
        input.value = '';
    },

    validateAndPreview(data) {
        if (!data || typeof data !== 'object') {
            this.showNotification('檔案格式不正確，缺少 entries 資料', 'error');
            this.clearPreview();
            return;
        }

        const entries = Array.isArray(data.entries) ? data.entries : 
                        (Array.isArray(data) ? data : null);

        if (!entries) {
            this.showNotification('檔案格式不正確，缺少 entries 資料', 'error');
            this.clearPreview();
            return;
        }

        const validEntries = entries.filter(entry => 
            entry && typeof entry.text === 'string' && entry.createdAt
        );

        if (validEntries.length === 0) {
            this.showNotification('檔案中沒有有效的記錄', 'error');
            this.clearPreview();
            return;
        }

        this.previewData = validEntries;
        this.showPreview(validEntries.length);
        this.hideNotification();
    },

    showPreview(count) {
        const previewEl = document.getElementById('import-preview');
        if (previewEl) {
            previewEl.innerHTML = `
                <div class="import-preview-content">
                    <span class="import-preview-icon">📄</span>
                    <span class="import-preview-text">將匯入 <strong>${count}</strong> 筆記錄</span>
                </div>
            `;
            previewEl.classList.remove('hidden');
        }

        const actionsEl = document.getElementById('import-actions');
        if (actionsEl) {
            actionsEl.classList.remove('hidden');
        }
    },

    clearPreview() {
        this.previewData = null;
        const previewEl = document.getElementById('import-preview');
        if (previewEl) {
            previewEl.innerHTML = '';
            previewEl.classList.add('hidden');
        }
        const actionsEl = document.getElementById('import-actions');
        if (actionsEl) {
            actionsEl.classList.add('hidden');
        }
    },

    handleImport() {
        if (!this.previewData || this.previewData.length === 0) {
            this.showNotification('請先選擇要匯入的檔案', 'error');
            return;
        }

        const mode = this.getSelectedMode();
        
        if (mode === 'replace') {
            if (!confirm('取代模式會清除所有現有資料，確定要繼續嗎？')) {
                return;
            }
        }

        try {
            this.importData(this.previewData, mode);
            this.showNotification(`成功匯入 ${this.previewData.length} 筆記錄`, 'success');
            this.clearPreview();
            setTimeout(() => {
                if (this.modal) {
                    this.modal.classList.add('hidden');
                }
                window.dispatchEvent(new CustomEvent('dataImported', { bubbles: true }));
            }, 1500);
        } catch (error) {
            console.error('Import failed:', error);
            this.showNotification('匯入失敗，請重試', 'error');
        }
    },

    getSelectedMode() {
        const selected = document.querySelector('input[name="import-mode"]:checked');
        return selected ? selected.value : 'merge';
    },

    importData(entries, mode) {
        const data = Store.getData();
        
        if (mode === 'replace') {
            data.entries = [];
            data.tags = data.tags.filter(t => t.isDefault !== false);
        }

        const existingTagIds = new Set(Store.getTags().map(t => t.id));

        entries.forEach(entry => {
            if (entry.tags && Array.isArray(entry.tags)) {
                entry.tags.forEach(tagId => {
                    if (!existingTagIds.has(tagId)) {
                        const newTag = {
                            id: tagId,
                            name: tagId,
                            color: this.generateTagColor(),
                            isDefault: false
                        };
                        data.tags = data.tags || [];
                        data.tags.push(newTag);
                        existingTagIds.add(tagId);
                    }
                });
            }

            const newEntry = {
                id: entry.id || Date.now() + Math.random(),
                text: entry.text,
                tags: entry.tags || [],
                createdAt: entry.createdAt
            };
            data.entries.unshift(newEntry);
        });

        Store.saveData(data);
    },

    generateTagColor() {
        const colors = [
            '#8b5cf6', '#06b6d4', '#84cc16', '#f97316',
            '#6366f1', '#14b8a6', '#eab308', '#ef4444'
        ];
        const data = Store.getData();
        const customCount = (data.tags || []).filter(t => !t.isDefault).length;
        return colors[customCount % colors.length];
    },

    showNotification(message, type) {
        const notification = document.querySelector('.import-notification');
        if (notification) {
            notification.textContent = message;
            notification.className = `import-notification import-notification-${type}`;
            notification.classList.remove('hidden');
        }
    },

    hideNotification() {
        const notification = document.querySelector('.import-notification');
        if (notification) {
            notification.classList.add('hidden');
        }
    },

    resetForm() {
        this.clearPreview();
        this.hideNotification();
        const modeInputs = document.querySelectorAll('input[name="import-mode"]');
        modeInputs.forEach(input => {
            input.checked = input.value === 'merge';
        });
    }
};

window.ImportFeature = ImportFeature;
