<template>
    <div v-resize="resizeChart">
        <Card style="width: 500px; margin-bottom: 12px">
            <DatePicker ref="monthStart"
                        type="month"
                        :options="monthStartOptions"
                        v-model="monthStart"
                        format="yyyyMM"
                        @on-change="handleMonthStartChange"
                        placeholder="选择起始月">
            </DatePicker>
            到
            <DatePicker ref="monthEnd"
                        type="month"
                        :options="monthEndOptions"
                        v-model="monthEnd"
                        format="yyyyMM"
                        @on-change="handleMonthEndChange"
                        placeholder="选择结束月">
            </DatePicker>
        </Card>
        <Card>
            <p slot="title"> 请选择指标项（可多选） </p>
            <div slot="extra">
                <ButtonGroup>
                    <Button type="primary" @click="allSelected">全选</Button>
                    <Button type="warning" @click="clearSelected">清空</Button>
                </ButtonGroup>
            </div>
            <Select multiple v-model="selected" @on-change="handleChangeSelected">
                <Option v-for="(indicator, idx) in indicators" :key="idx" :value="indicator.value">
                    {{ indicator.label }}
                </Option>
            </Select>
        </Card>
        <Card style="margin-top: 12px" v-if="this.selected.length">
            <div style="width: 100%; height: 800px">
                <v-chart :options="options" ref="chart"></v-chart>
            </div>
        </Card>
    </div>
</template>

<script>
    import {date, dateStr, getQuarters} from '@/utils/func'
    import ls from '@/utils/localStorage'

    export default {
        name: "Scores",
        data() {
            return {
                monthStartOptions: null,
                monthEndOptions: null,
                monthEnd: new Date(),
                monthStart: date('201901'),
                selected: ['tot_score', 'dur_score', 'cost_return_score', 'cash_flow_score'],
                indicators: [
                    {value: 'tot_score', label: '总分'},
                    {value: 'dur_score', label: '期限结构匹配得分'},
                    {value: 'cost_return_score', label: '成本收益匹配得分'},
                    {value: 'cash_flow_score', label: '现金流匹配得分'},
                    {value: 'dur_gap_l_scaled', label: '规模调整后的修正久期缺口得分'},
                    {value: 'dur_gap_a_scaled', label: '资产调整后的期限缺口得分'},
                    {value: 'hedge_rate', label: '利率风险对冲率得分'},
                    {value: 'dv', label: '基点价值变动率得分'},
                    {value: 'avg_3y_gap', label: '三年平均年化综合投资收益率与寿险业务三年平均负债资金成本率差额得分'},
                    {value: 'comp_gap', label: '年化综合投资收益率与寿险业务负债资金成本率差额得分'},
                    {value: 'ra_comp_gap', label: '风险调整后的年化综合投资收益率与寿险业务负债保证成本率差额得分'},
                    {value: 'fin_gap', label: '年化会计投资收益率与寿险业务负债有效成本率差额'},
                    {value: 'gap_stress1', label: '压力情景一下预计差额得分'},
                    {value: 'gap_stress2', label: '压力情景二下预计差额得分'},
                    {value: 'gap_stress3', label: '压力情景三下预计差额得分'},
                    {value: 'cash_flow_test_base', label: '现金流测试得分'},
                    {value: 'cash_flow_test_stress', label: '现金流压力测试得分'},
                    {value: 'liquidity', label: '流动性指标得分'},
                ],
                options: {
                    legend: {},
                    tooltip: {trigger: 'axis',},
                    dataset: {source: []},
                    xAxis: {type: 'category', name: '季度', nameTextStyle: {fontSize: 16}},
                    yAxis: {name: '得分', nameTextStyle: {fontSize: 16}},
                    grid: {top: 160},
                    series: []
                },

            }
        },
        methods: {
            plotChart() {
                const monthStart = ls.get('monthStart', 'date');
                const monthEnd = ls.get('monthEnd', 'date');
                const selected = ls.get('selected');
                if (monthStart && monthEnd && selected) {
                    this.monthStart = monthStart;
                    this.monthEnd = monthEnd;
                    this.selected = selected;
                } else {
                    ls.set('monthStart', this.monthStart, 'date');
                    ls.set('monthEnd', this.monthEnd, 'date');
                    ls.set('selected', this.selected);
                }
                this.setFloor(this.monthStart);
                this.setCeiling(this.monthEnd);
                this.handleChangeMonth();
            },
            handleChangeMonth() {
                const {monthStart, monthEnd} = this;
                this.$api.result.getScore(dateStr(monthStart), dateStr(monthEnd)).then((response) => {
                    if (response.data.length === 0) {
                        this.$Message.warning('数据不存在，请检查')
                    } else {
                        this.options.dataset.source = response.data;
                    }
                }).catch(error => {
                    console.log(error.response);
                });
            },
            setFloor(start) {
                this.monthEndOptions = {
                    disabledDate(date) {
                        return date < start;
                    }
                };
            },
            setCeiling(end) {
                this.monthStartOptions = {
                    disabledDate(date) {
                        return date > end;
                    }
                };
            },
            handleMonthStartChange(d) {
                if (!d || getQuarters(date(d), this.monthEnd).length === 0) {
                    return
                }
                this.setFloor(date(d));
                ls.set('monthStart', this.monthStart, 'date');
                this.handleChangeMonth();
            },
            handleMonthEndChange(d) {
                if (!d || getQuarters(this.monthStart, date(d)).length === 0) {
                    return
                }
                this.setCeiling(date(d));
                ls.set('monthEnd', this.monthEnd, 'date');
                this.handleChangeMonth();
            },
            clearSelected() {
                this.selected = [];
            },
            allSelected() {
                this.selected = [];
                this.indicators.forEach((item) => {
                    this.selected.push(item.value)
                })
            },
            handleShowSeries() {
                this.options.series = [];
                this.selected.forEach((item) => {
                    let label = null;
                    this.indicators.forEach((opt) => {
                        if (opt.value === item) {
                            label = opt.label;
                        }
                    });
                    this.options.series.push({
                        type: 'line', name: label, encode: {y: item}, symbol: 'circle', symbolSize: 8
                    });
                });
                if (this.selected.length) {
                    this.$refs.chart.mergeOptions(this.options, true, true)
                }
            },
            handleChangeSelected() {
                ls.set('selected', this.selected);
                this.handleShowSeries();
            },
            resizeChart() {
                this.$refs.chart.resize();
            }
        },
        beforeMount() {
            this.plotChart();
        }
    }
</script>

<style scoped>

</style>