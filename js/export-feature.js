// ExportFeature.js - WHYD 資料匯出功能

const ExportFeature = {
    init() {
        this.modal = document.getElementById('export-modal');
        this.currentTab = 'export';
        this.renderModal();
        this.bindEvents();
    },

    renderModal() {
        if (!this.modal) return;
        
        this.modal.innerHTML = `
            <div class="modal-content export-modal-content">
                <div class="modal-header">
                    <h2>匯出/匯入</h2>
                    <button class="modal-close" data-action="close">&times;</button>
                </div>
                <div class="modal-tabs">
                    <button class="modal-tab active" data-tab="export">匯出</button>
                    <button class="modal-tab" data-tab="import">匯入</button>
                </div>
                <div class="modal-body">
                    <div id="tab-export" class="tab-content active">
                        <div class="form-group">
                            <label class="form-label">匯出格式</label>
                            <div class="radio-group">
                                <label class="radio-option">
                                    <input type="radio" name="export-format" value="json" checked>
                                    <span class="radio-label">JSON</span>
                                    <span class="radio-desc">完整資料結構</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="export-format" value="csv">
                                    <span class="radio-label">CSV</span>
                                    <span class="radio-desc">試算表格式</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">日期範圍（選填）</label>
                            <div class="date-range-inputs">
                                <div class="date-input-wrapper">
                                    <label for="export-start">起始日期</label>
                                    <input type="date" id="export-start" class="date-input">
                                </div>
                                <div class="date-input-wrapper">
                                    <label for="export-end">結束日期</label>
                                    <input type="date" id="export-end" class="date-input">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tab-import" class="tab-content">
                        <div class="form-group">
                            <label class="form-label">選擇檔案</label>
                            <button class="btn btn-secondary btn-full" data-action="select-file">
                                選擇 JSON 檔案
                            </button>
                        </div>
                        <div id="import-preview" class="import-preview hidden"></div>
                        <div id="import-actions" class="form-group hidden">
                            <label class="form-label">匯入模式</label>
                            <div class="radio-group">
                                <label class="radio-option">
                                    <input type="radio" name="import-mode" value="merge" checked>
                                    <span class="radio-label">合併</span>
                                    <span class="radio-desc">新增到現有資料</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="import-mode" value="replace">
                                    <span class="radio-label">取代</span>
                                    <span class="radio-desc">清除現有資料</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-action="close">取消</button>
                    <button id="btn-export-action" class="btn btn-primary" data-action="export">匯出</button>
                    <button id="btn-import-action" class="btn btn-primary hidden" data-action="import">匯入</button>
                </div>
                <div class="export-notification hidden"></div>
                <div class="import-notification hidden"></div>
            </div>
        `;
    },

    bindEvents() {
        if (!this.modal) return;

        this.modal.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (action === 'close') this.hide();
            if (action === 'export') this.handleExport();
            if (e.target === this.modal) this.hide();

            if (e.target.classList.contains('modal-tab')) {
                this.switchTab(e.target.dataset.tab);
            }
        });
    },

    switchTab(tab) {
        this.currentTab = tab;
        
        this.modal.querySelectorAll('.modal-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
        });
        
        this.modal.querySelectorAll('.tab-content').forEach(c => {
            c.classList.toggle('active', c.id === `tab-${tab}`);
        });

        const exportBtn = this.modal.querySelector('#btn-export-action');
        const importBtn = this.modal.querySelector('#btn-import-action');
        if (exportBtn) exportBtn.classList.toggle('hidden', tab !== 'export');
        if (importBtn) importBtn.classList.toggle('hidden', tab !== 'import');

        if (tab === 'import' && typeof ImportFeature !== 'undefined') {
            ImportFeature.resetForm();
        }
    },

    show() {
        if (this.modal) {
            this.modal.classList.remove('hidden');
            this.switchTab('export');
        }
    },

    hide() {
        if (this.modal) {
            this.modal.classList.add('hidden');
            this.resetForm();
            if (typeof ImportFeature !== 'undefined') {
                ImportFeature.resetForm();
            }
        }
    },

    resetForm() {
        const formatInputs = this.modal.querySelectorAll('input[name="export-format"]');
        formatInputs.forEach(input => {
            input.checked = input.value === 'json';
        });
        const startInput = this.modal.querySelector('#export-start');
        const endInput = this.modal.querySelector('#export-end');
        if (startInput) startInput.value = '';
        if (endInput) endInput.value = '';
        this.hideNotification();
    },

    handleExport() {
        const format = this.getSelectedFormat();
        const dateRange = this.getDateRange();
        const data = Store.getData();
        
        let entries = data.entries || [];
        
        if (dateRange.start || dateRange.end) {
            entries = this.filterByDateRange(entries, dateRange);
        }

        if (entries.length === 0) {
            this.showNotification('沒有符合條件的資料', 'error');
            return;
        }

        try {
            if (format === 'json') {
                this.exportJSON(entries);
            } else {
                this.exportCSV(entries);
            }
            this.showNotification('匯出成功！', 'success');
            setTimeout(() => this.hide(), 1500);
        } catch (error) {
            console.error('Export failed:', error);
            this.showNotification('匯出失敗，請重試', 'error');
        }
    },

    getSelectedFormat() {
        const selected = this.modal.querySelector('input[name="export-format"]:checked');
        return selected ? selected.value : 'json';
    },

    getDateRange() {
        const startInput = this.modal.querySelector('#export-start');
        const endInput = this.modal.querySelector('#export-end');
        return {
            start: startInput ? startInput.value : null,
            end: endInput ? endInput.value : null
        };
    },

    filterByDateRange(entries, range) {
        return entries.filter(entry => {
            const entryDate = new Date(entry.createdAt).toISOString().split('T')[0];
            if (range.start && entryDate < range.start) return false;
            if (range.end && entryDate > range.end) return false;
            return true;
        });
    },

    exportJSON(entries) {
        const exportData = {
            exportedAt: new Date().toISOString(),
            entries: entries
        };
        const content = JSON.stringify(exportData, null, 2);
        this.downloadFile(content, 'json', 'application/json');
    },

    exportCSV(entries) {
        const headers = ['id', 'text', 'tags', 'createdAt'];
        const rows = entries.map(entry => {
            return headers.map(field => {
                let value = entry[field];
                if (field === 'tags') {
                    value = Array.isArray(value) ? value.join(';') : '';
                }
                return this.escapeCSV(String(value || ''));
            }).join(',');
        });
        
        const content = [headers.join(','), ...rows].join('\n');
        this.downloadFile(content, 'csv', 'text/csv');
    },

    escapeCSV(value) {
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            return '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
    },

    downloadFile(content, extension, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const filename = `whyd-export-${date}.${extension}`;
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    showNotification(message, type) {
        const notification = this.modal.querySelector('.export-notification');
        if (!notification) return;
        
        notification.textContent = message;
        notification.className = `export-notification export-notification-${type}`;
        notification.classList.remove('hidden');
    },

    hideNotification() {
        const notification = this.modal.querySelector('.export-notification');
        if (notification) {
            notification.classList.add('hidden');
        }
    }
};

window.ExportFeature = ExportFeature;
