const Onboarding = {
    currentStep: 0,
    totalSteps: 3,
    selectedTags: [],
    userText: '完成了第一件小事！',
    
    start() {
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
                <h2 class="step-title">歡迎來到 WHYD</h2>
                <p class="step-description">
                    這是一個<strong>逆向待辦清單</strong>應用程式。
                </p>
                <p class="step-description">
                    不同於傳統的待辦清單記錄「要做什麼」，<br>
                    WHYD 讓你記錄<strong>已經完成的事</strong>。
                </p>
                <p class="step-hint">
                    無論多小的事都值得記錄 - 喝了一杯水、回了一封郵件、<br>
                    學了一個新單字...都是你的成就！
                </p>
            </div>
        `;
    },
    
    renderStep1() {
        return `
            <div class="step-content">
                <div class="step-icon">✨</div>
                <h2 class="step-title">認識功能</h2>
                <div class="feature-list">
                    <div class="feature-item">
                        <span class="feature-icon">📝</span>
                        <div class="feature-info">
                            <strong>輸入框</strong>
                            <p>快速記錄你的成就</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">📅</span>
                        <div class="feature-info">
                            <strong>時間軸</strong>
                            <p>查看所有記錄的歷史</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">🏷️</span>
                        <div class="feature-info">
                            <strong>標籤系統</strong>
                            <p>用標籤分類你的記錄</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">📊</span>
                        <div class="feature-info">
                            <strong>統計圖表</strong>
                            <p>查看你的成就統計</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderStep2() {
        const tags = Store.getTags();
        this.selectedTags = ['work'];
        
        return `
            <div class="step-content">
                <div class="step-icon">🚀</div>
                <h2 class="step-title">開始第一筆記錄</h2>
                <p class="step-description">試著記錄你的第一個成就吧！</p>
                
                <div class="guided-input">
                    <input type="text" 
                           class="guided-text-input" 
                           id="onboarding-entry-input"
                           value="${this.userText}"
                           placeholder="輸入你完成的事...">
                    
                    <div class="guided-tags">
                        <p class="guided-tags-label">選擇標籤：</p>
                        <div class="guided-tags-list">
                            ${tags.map(tag => `
                                <button class="guided-tag-pill ${this.selectedTags.includes(tag.id) ? 'selected' : ''}"
                                        data-tag-id="${tag.id}"
                                        onclick="Onboarding.toggleTag('${tag.id}')"
                                        style="--tag-color: ${tag.color}">
                                    <span class="tag-dot" style="background: ${tag.color}"></span>
                                    ${tag.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    getFooterButtons() {
        if (this.currentStep < this.totalSteps - 1) {
            return `
                <button class="btn btn-skip" onclick="Onboarding.skipOnboarding()">跳過</button>
                <button class="btn btn-primary" onclick="Onboarding.nextStep()">下一步</button>
            `;
        } else {
            return `
                <button class="btn btn-primary btn-start" onclick="Onboarding.completeOnboarding()">開始使用</button>
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
