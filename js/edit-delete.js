const EditDelete = {
    editingEntryId: null,
    deleteTargetId: null,

    init() {
        this.createDeleteDialog();
        this.bindGlobalEvents();
    },

    createDeleteDialog() {
        const dialog = document.createElement('div');
        dialog.id = 'delete-confirm-modal';
        dialog.className = 'modal hidden';
        dialog.innerHTML = `
            <div class="modal-content delete-confirm-content">
                <div class="modal-header">
                    <h2>確認刪除</h2>
                </div>
                <div class="modal-body">
                    <p class="delete-warning">確定要刪除此記錄嗎？</p>
                    <p class="delete-hint">此操作無法復原</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="delete-cancel-btn">取消</button>
                    <button class="btn btn-danger" id="delete-confirm-btn">刪除</button>
                </div>
            </div>
        `;
        document.body.appendChild(dialog);
    },

    bindGlobalEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.edit-btn')) {
                const entryId = parseInt(e.target.closest('.timeline-item').dataset.entryId);
                this.enterEditMode(entryId);
            }
            
            if (e.target.matches('.delete-btn')) {
                const entryId = parseInt(e.target.closest('.timeline-item').dataset.entryId);
                this.showDeleteConfirm(entryId);
            }
            
            if (e.target.matches('.edit-save-btn')) {
                const entryId = parseInt(e.target.closest('.timeline-item').dataset.entryId);
                this.saveEdit(entryId);
            }
            
            if (e.target.matches('.edit-cancel-btn')) {
                this.cancelEdit();
            }
            
            if (e.target.matches('.tag-pill-edit')) {
                e.target.classList.toggle('selected');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.editingEntryId !== null) {
                    this.cancelEdit();
                }
                this.hideDeleteConfirm();
            }
        });

        const deleteModal = document.getElementById('delete-confirm-modal');
        if (deleteModal) {
            deleteModal.addEventListener('click', (e) => {
                if (e.target === deleteModal) {
                    this.hideDeleteConfirm();
                }
            });

            const cancelBtn = document.getElementById('delete-cancel-btn');
            const confirmBtn = document.getElementById('delete-confirm-btn');
            
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => this.hideDeleteConfirm());
            }
            
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    if (this.deleteTargetId !== null) {
                        this.confirmDelete(this.deleteTargetId);
                    }
                });
            }
        }
    },

    enterEditMode(entryId) {
        if (this.editingEntryId !== null && this.editingEntryId !== entryId) {
            this.exitEditMode();
        }

        const data = Store.getData();
        const entry = data.entries.find(e => e.id === entryId);
        if (!entry) return;

        this.editingEntryId = entryId;
        TimelineView.renderEntries();
    },

    exitEditMode() {
        this.editingEntryId = null;
        TimelineView.renderEntries();
    },

    validateText(text) {
        if (!text || text.trim().length === 0) {
            return { valid: false, error: '內容不能為空' };
        }
        return { valid: true, error: null };
    },

    showEditError(entryId, errorMessage) {
        const errorEl = document.querySelector(`[data-entry-id="${entryId}"] .edit-error`);
        if (errorEl) {
            errorEl.textContent = errorMessage;
            errorEl.classList.remove('hidden');
        }
    },

    hideEditError(entryId) {
        const errorEl = document.querySelector(`[data-entry-id="${entryId}"] .edit-error`);
        if (errorEl) {
            errorEl.classList.add('hidden');
        }
    },

    saveEdit(entryId) {
        const entryEl = document.querySelector(`[data-entry-id="${entryId}"]`);
        if (!entryEl) return;

        const textInput = entryEl.querySelector('.edit-text-input');
        const text = textInput ? textInput.value : '';

        const validation = this.validateText(text);
        if (!validation.valid) {
            this.showEditError(entryId, validation.error);
            return;
        }

        this.hideEditError(entryId);

        const selectedTags = [];
        const tagPills = entryEl.querySelectorAll('.tag-pill-edit.selected');
        tagPills.forEach(pill => {
            selectedTags.push(pill.dataset.tagId);
        });

        const updatedEntry = Store.updateEntry(entryId, {
            text: text.trim(),
            tags: selectedTags
        });

        if (updatedEntry) {
            this.editingEntryId = null;
            
            window.dispatchEvent(new CustomEvent('entry-updated', {
                detail: { entry: updatedEntry },
                bubbles: true
            }));

            TimelineView.renderEntries();
        }
    },

    cancelEdit() {
        this.editingEntryId = null;
        TimelineView.renderEntries();
    },

    showDeleteConfirm(entryId) {
        this.deleteTargetId = entryId;
        const modal = document.getElementById('delete-confirm-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    },

    hideDeleteConfirm() {
        this.deleteTargetId = null;
        const modal = document.getElementById('delete-confirm-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    },

    confirmDelete(entryId) {
        const deletedEntry = Store.deleteEntry(entryId);
        
        if (deletedEntry) {
            window.dispatchEvent(new CustomEvent('entry-deleted', {
                detail: { id: entryId },
                bubbles: true
            }));
        }

        this.hideDeleteConfirm();
        TimelineView.renderEntries();
    },

    isEditing(entryId) {
        return this.editingEntryId === entryId;
    },

    getEditingEntryId() {
        return this.editingEntryId;
    }
};

window.EditDelete = EditDelete;
