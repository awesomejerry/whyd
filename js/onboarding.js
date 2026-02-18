const Onboarding = {
    currentStep: 0,
    totalSteps: 3,
    selectedTags: [],
    userText: null,
    
    start() {
        this.userText = i18n.t('onboarding.sampleText');
        const overlay = document.getElementById('onboarding-overlay');
        if (!overlay) return;
        
        this.render();
        overlay.classList.remove('hidden');
        overlay.classList.add('fade-in');
    },
    
    render() {
        const overlay = document.getElementById('onboarding-overlay');
        if (!overlay) return;
        
        overlay.innerHTML = this.getModalHTML();
        this.bindEvents();
    },
    
    getModalHTML() {
        return `
            <div class="onboarding-modal slide-up">
                <div class="onboarding-header">
                    <div class="step-indicator">${this.currentStep + 1}/${this.totalSteps}</div>
                    ${this.currentStep > 0 ? '<button class="btn-back" onclick="Onboarding.prevStep()">←</button>' : ''}
                </div>
                <div class="onboarding-content">
                    ${this.getStepContent()}
                </div>
                <div class="onboarding-footer">
                    ${this.getFooterButtons()}
                </div>
            </div>
        `;
    },
    
    getStepContent() {
        switch(this.currentStep) {
            case 0:
                return this.renderStep0();
            case 1:
                return this.renderStep1();
            case 2:
                return this.renderStep2();
            default:
                return '';
        }
    },
    
    renderStep0() {
        return `
            <div class="step-content">
                <div class="step-icon">🎉</div>
                <h2 class="step-title">${i18n.t('onboarding.welcome')}</h2>
                <p class="step-description">
                    ${i18n.t('onboarding.reverseTodo1')}<strong>${i18n.t('onboarding.reverseTodo2')}</strong>${i18n.t('onboarding.reverseTodo3')}
                </p>
                <p class="step-description">
                    ${i18n.t('onboarding.intro1')}<br>
                    WHYD ${i18n.t('onboarding.intro2')}<strong>${i18n.t('onboarding.intro3')}</strong>${i18n.t('onboarding.intro4')}
                </p>
                <p class="step-hint">
                    ${i18n.t('onboarding.hint')}
                </p>
            </div>
        `;
    },
    
    renderStep1() {
        return `
            <div class="step-content">
                <div class="step-icon">✨</div>
                <h2 class="step-title">${i18n.t('onboarding.features')}</h2>
                <div class="feature-list">
                    <div class="feature-item">
                        <span class="feature-icon">📝</span>
                        <div class="feature-info">
                            <strong>${i18n.t('onboarding.inputFeature')}</strong>
                            <p>${i18n.t('onboarding.inputFeatureDesc')}</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">📅</span>
                        <div class="feature-info">
                            <strong>${i18n.t('onboarding.timelineFeature')}</strong>
                            <p>${i18n.t('onboarding.timelineFeatureDesc')}</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">🏷️</span>
                        <div class="feature-info">
                            <strong>${i18n.t('onboarding.tagFeature')}</strong>
                            <p>${i18n.t('onboarding.tagFeatureDesc')}</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">📊</span>
                        <div class="feature-info">
                            <strong>${i18n.t('onboarding.statsFeature')}</strong>
                            <p>${i18n.t('onboarding.statsFeatureDesc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderStep2() {
        const tags = Store.getTags();
        this.selectedTags = ['work'];
        const sampleText = this.userText || i18n.t('onboarding.sampleText');
        
        return `
            <div class="step-content">
                <div class="step-icon">🚀</div>
                <h2 class="step-title">${i18n.t('onboarding.firstEntry')}</h2>
                <p class="step-description">${i18n.t('onboarding.firstEntryDesc')}</p>
                
                <div class="guided-input">
                    <input type="text" 
                           class="guided-text-input" 
                           id="onboarding-entry-input"
                           value="${sampleText}"
                           placeholder="${i18n.t('onboarding.entryPlaceholder')}">
                    
                    <div class="guided-tags">
                        <p class="guided-tags-label">${i18n.t('onboarding.selectTags')}</p>
                        <div class="guided-tags-list">
                            ${tags.map(tag => {
                                const displayName = this.getTagName(tag);
                                return `
                                    <button class="guided-tag-pill ${this.selectedTags.includes(tag.id) ? 'selected' : ''}"
                                            data-tag-id="${tag.id}"
                                            onclick="Onboarding.toggleTag('${tag.id}')"
                                            style="--tag-color: ${tag.color}">
                                        <span class="tag-dot" style="background: ${tag.color}"></span>
                                        ${displayName}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getTagName(tag) {
        const defaultTagKeys = {
            'work': 'tags.work',
            'life': 'tags.life',
            'learn': 'tags.learn',
            'health': 'tags.health'
        };
        if (defaultTagKeys[tag.id] && tag.isDefault) {
            return i18n.t(defaultTagKeys[tag.id]);
        }
        return tag.name;
    },
    
    getFooterButtons() {
        if (this.currentStep < this.totalSteps - 1) {
            return `
                <button class="btn btn-skip" onclick="Onboarding.skipOnboarding()">${i18n.t('onboarding.skip')}</button>
                <button class="btn btn-primary" onclick="Onboarding.nextStep()">${i18n.t('onboarding.next')}</button>
            `;
        } else {
            return `
                <button class="btn btn-primary btn-start" onclick="Onboarding.completeOnboarding()">${i18n.t('onboarding.start')}</button>
            `;
        }
    },
    
    toggleTag(tagId) {
        const index = this.selectedTags.indexOf(tagId);
        if (index > -1) {
            this.selectedTags.splice(index, 1);
        } else {
            this.selectedTags.push(tagId);
        }
        
        document.querySelectorAll('.guided-tag-pill').forEach(pill => {
            const id = pill.getAttribute('data-tag-id');
            if (this.selectedTags.includes(id)) {
                pill.classList.add('selected');
            } else {
                pill.classList.remove('selected');
            }
        });
    },
    
    nextStep() {
        if (this.currentStep < this.totalSteps - 1) {
            this.currentStep++;
            this.render();
        }
    },
    
    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.render();
        }
    },
    
    skipOnboarding() {
        Store.setOnboarded();
        this.close();
    },
    
    completeOnboarding() {
        const input = document.getElementById('onboarding-entry-input');
        const text = input ? input.value.trim() : this.userText;
        
        if (text) {
            Store.addEntry(text, this.selectedTags);
            
            if (typeof TimelineView !== 'undefined') {
                TimelineView.render();
            }
            
            if (typeof CoreInput !== 'undefined') {
                const mainInput = document.querySelector('.entry-input');
                if (mainInput) {
                    mainInput.value = '';
                }
            }
        }
        
        Store.setOnboarded();
        this.close();
    },
    
    close() {
        const overlay = document.getElementById('onboarding-overlay');
        if (!overlay) return;
        
        overlay.classList.add('hidden');
        overlay.innerHTML = '';
    },
    
    bindEvents() {
        const input = document.getElementById('onboarding-entry-input');
        if (input) {
            input.addEventListener('input', (e) => {
                this.userText = e.target.value;
            });
        }
    }
};

window.Onboarding = Onboarding;
