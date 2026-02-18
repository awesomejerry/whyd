// Statistics.js - WHYD 統計視覺化模組
// 使用 Canvas 繪製圖表

const Statistics = {
    currentView: 'week',
    charts: {},

    init() {
        this.render();
        this.bindEvents();
        window.addEventListener('resize', Utils.debounce(() => this.redrawCharts(), 200));
        window.addEventListener('languageChanged', () => this.render());
    },

    render() {
        const section = document.getElementById('stats-section');
        if (!section) return;

        section.innerHTML = `
            <div class="stats-container">
                <div class="stats-header">
                    <h2>${i18n.t('stats.title')}</h2>
                    <div class="stats-toggle">
                        <button class="toggle-btn active" data-view="week">${i18n.t('stats.week')}</button>
                        <button class="toggle-btn" data-view="month">${i18n.t('stats.month')}</button>
                    </div>
                </div>
                <div class="stats-charts">
                    <div class="chart-card">
                        <h3>${i18n.t('stats.trendTitle')}</h3>
                        <canvas id="chart-line"></canvas>
                    </div>
                    <div class="chart-card">
                        <h3>${i18n.t('stats.tagDistTitle')}</h3>
                        <div class="pie-container">
                            <canvas id="chart-pie"></canvas>
                            <div id="pie-legend" class="pie-legend"></div>
                        </div>
                    </div>
                    <div class="chart-card">
                        <h3>${i18n.t('stats.activeTimeTitle')}</h3>
                        <canvas id="chart-bar"></canvas>
                    </div>
                </div>
            </div>
        `;
    },

    bindEvents() {
        const toggleBtns = document.querySelectorAll('.stats-toggle .toggle-btn');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                toggleBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentView = e.target.dataset.view;
                this.redrawCharts();
            });
        });
    },

    getDateRange() {
        const to = new Date();
        const from = new Date();
        const days = this.currentView === 'week' ? 7 : 30;
        from.setDate(from.getDate() - days + 1);
        return { from, to };
    },

    getEntries() {
        const { from, to } = this.getDateRange();
        return Store.getEntriesByDateRange(from, to);
    },

    redrawCharts() {
        const entries = this.getEntries();
        this.drawLineChart(entries);
        this.drawPieChart(entries);
        this.drawBarChart(entries);
    },

    setupCanvas(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;

        const container = canvas.parentElement;
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();
        const width = rect.width - 32;
        const height = canvasId === 'chart-pie' ? 200 : 180;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        return { ctx, width, height };
    },

    drawLineChart(entries) {
        const setup = this.setupCanvas('chart-line');
        if (!setup) return;

        const { ctx, width, height } = setup;
        const days = this.currentView === 'week' ? 7 : 30;
        const data = this.aggregateByDay(entries, days);

        const padding = { top: 20, right: 20, bottom: 30, left: 40 };
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        ctx.clearRect(0, 0, width, height);

        const maxVal = Math.max(...data.map(d => d.count), 1);
        const stepX = chartWidth / (data.length - 1 || 1);

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartHeight / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
        }

        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        data.forEach((d, i) => {
            const x = padding.left + stepX * i;
            const y = padding.top + chartHeight - (d.count / maxVal) * chartHeight;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        ctx.fillStyle = '#6366f1';
        data.forEach((d, i) => {
            const x = padding.left + stepX * i;
            const y = padding.top + chartHeight - (d.count / maxVal) * chartHeight;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.fillStyle = '#64748b';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        data.forEach((d, i) => {
            if (data.length <= 7 || i % 5 === 0) {
                const x = padding.left + stepX * i;
                ctx.fillText(d.label, x, height - 8);
            }
        });
    },

    aggregateByDay(entries, days) {
        const result = [];
        const today = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            const count = entries.filter(e => 
                new Date(e.createdAt).toDateString() === dateStr
            ).length;
            result.push({
                label: `${date.getMonth() + 1}/${date.getDate()}`,
                count
            });
        }
        return result;
    },

    drawPieChart(entries) {
        const setup = this.setupCanvas('chart-pie');
        if (!setup) return;

        const { ctx, width, height } = setup;
        const tagCounts = this.aggregateByTag(entries);
        const total = Object.values(tagCounts).reduce((a, b) => a + b, 0);

        ctx.clearRect(0, 0, width, height);

        if (total === 0) {
            ctx.fillStyle = '#94a3b8';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(i18n.t('stats.noData'), width / 2, height / 2);
            return;
        }

        const centerX = width / 2 - 50;
        const centerY = height / 2;
        const radius = Math.max(10, Math.min(centerX, centerY) - 10);
        let startAngle = -Math.PI / 2;

        const tags = Store.getTags();
        const legend = document.getElementById('pie-legend');
        legend.innerHTML = '';

        Object.entries(tagCounts).forEach(([tagId, count]) => {
            const tag = tags.find(t => t.id === tagId) || { name: tagId, color: '#94a3b8' };
            const sliceAngle = (count / total) * Math.PI * 2;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = tag.color;
            ctx.fill();

            startAngle += sliceAngle;

            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `
                <span class="legend-dot" style="background: ${tag.color}"></span>
                <span>${tag.name}</span>
                <span class="legend-count">${count}</span>
            `;
            legend.appendChild(legendItem);
        });
    },

    aggregateByTag(entries) {
        const counts = {};
        entries.forEach(e => {
            (e.tags || []).forEach(tagId => {
                counts[tagId] = (counts[tagId] || 0) + 1;
            });
        });
        return counts;
    },

    drawBarChart(entries) {
        const setup = this.setupCanvas('chart-bar');
        if (!setup) return;

        const { ctx, width, height } = setup;
        const hourlyData = this.aggregateByHour(entries);

        const padding = { top: 10, right: 10, bottom: 25, left: 30 };
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        ctx.clearRect(0, 0, width, height);

        const maxVal = Math.max(...hourlyData, 1);
        const barWidth = chartWidth / 24 - 2;

        const top3 = [...hourlyData].sort((a, b) => b - a).slice(0, 3);

        hourlyData.forEach((count, hour) => {
            const x = padding.left + (chartWidth / 24) * hour + 1;
            const barHeight = (count / maxVal) * chartHeight;
            const y = padding.top + chartHeight - barHeight;

            ctx.fillStyle = top3.includes(count) && count > 0 ? '#6366f1' : '#a5b4fc';
            ctx.fillRect(x, y, barWidth, barHeight);
        });

        ctx.fillStyle = '#64748b';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        [0, 6, 12, 18, 23].forEach(hour => {
            const x = padding.left + (chartWidth / 24) * hour + barWidth / 2;
            ctx.fillText(hour.toString(), x, height - 8);
        });
    },

    aggregateByHour(entries) {
        const counts = new Array(24).fill(0);
        entries.forEach(e => {
            const hour = new Date(e.createdAt).getHours();
            counts[hour]++;
        });
        return counts;
    }
};

window.Statistics = Statistics;
