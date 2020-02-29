<template>
    <div>
        <Card style="width: 500px; margin-bottom: 12px">
            <DatePicker ref="monthStartInd"
                        type="month"
                        :options="monthStartIndOptions"
                        v-model="monthStartInd"
                        format="yyyyMM"
                        @on-change="handleMonthStartIndChange"
                        placeholder="选择起始月">
            </DatePicker>
            到
            <DatePicker ref="monthEndInd"
                        type="month"
                        :options="monthEndIndOptions"
                        v-model="monthEndInd"
                        format="yyyyMM"
                        @on-change="handleMonthEndIndChange"
                        placeholder="选择结束月">
            </DatePicker>
        </Card>
        <Card>
            <Tabs :value="tabsValue" type="card" @on-click="handleTabChange">
                <TabPane label="资产负债规模" name="assets">
                    <Row type="flex">
                        <i-col :xs="24" :md="24" :lg="12" v-for="(acc, idx) in accounts" :key="idx" :border="false">
                            <Card class="chart-wrapper">
                                <div>
                                    <v-chart :options="asset_options[acc]" ref="chart" theme="default"></v-chart>
                                </div>
                            </Card>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="期限结构" name="dur">
                    <Row type="flex">
                        <i-col :xs="24" :md="24" :lg="12" v-for="(acc, idx) in accounts" :key="idx">
                            <Card class="chart-wrapper">
                                <div>
                                    <v-chart :options="dur_options[acc]" ref="chart" theme="default"></v-chart>
                                </div>
                            </Card>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="成本收益" name="cost">标签二的内容</TabPane>
                <TabPane label="成本收益压力测试" name="cost_test">标签三的内容</TabPane>
                <TabPane label="现金流" name="cf">标签三的内容</TabPane>
            </Tabs>
        </Card>
    </div>
</template>

<script>
    import {date, dateStr, getArray, getObjOfAcc, getQuarters} from "@/custom/func";
    import ls from "@/custom/localStorage";

    export default {
        name: "ResultIndicator",
        data() {
            return {
                monthStartIndOptions: null,
                monthEndIndOptions: null,
                tabsValue: 'assets',
                monthStartInd: date('201901'),
                monthEndInd: new Date(),
                accounts: ['T', 'C', 'P', 'U'],
                asset_options: {
                    T: {title: {text: '公司整体'}, series: []},
                    C: {title: {text: '传统账户'}, series: []},
                    P: {title: {text: '分红账户'}, series: []},
                    U: {title: {text: '万能账户'}, series: []}
                },
                dur_options: {
                    T: {title: {text: '公司整体'}, series: []},
                    C: {title: {text: '传统账户'}, series: []},
                    P: {title: {text: '分红账户'}, series: []},
                    U: {title: {text: '万能账户'}, series: []}
                },
            }
        },
        methods: {
            plotChartInd() {
                const monthStartInd = ls.get('monthStartInd', 'date');
                const monthEndInd = ls.get('monthEndInd', 'date');
                const tabsValue = ls.get('tabsValue');
                if (monthStartInd && monthEndInd && tabsValue) {
                    this.monthStartInd = monthStartInd;
                    this.monthEndInd = monthEndInd;
                    this.tabsValue = tabsValue;
                } else {
                    ls.set('monthStartInd', this.monthStartInd, 'date');
                    ls.set('monthEndInd', this.monthEndInd, 'date');
                    ls.set('tabsValue', this.monthEndInd);
                }
                this.setFloor(this.monthStartInd);
                this.setCeiling(this.monthEndInd);
                this.plot();
            },
            plot() {
                this.plotAl();
                this.plotDur();
            },
            handleTabChange(name) {
                ls.set('tabsValue', name);
            },
            setFloor(start) {
                this.monthEndIndOptions = {
                    disabledDate(date) {
                        return date < start;
                    }
                };
            },
            setCeiling(end) {
                this.monthStartIndOptions = {
                    disabledDate(date) {
                        return date > end;
                    }
                };
            },
            handleMonthStartIndChange(d) {
                if (!d || getQuarters(date(d), this.monthEndInd).length === 0) {
                    return
                }
                const end = date(d);
                this.monthEndIndOptions = {
                    disabledDate(date) {
                        return date < end;
                    }
                };
                ls.set('monthStartInd', this.monthStartInd, 'date');
                this.plot();
            },
            handleMonthEndIndChange(d) {
                if (!d || getQuarters(this.monthStartInd, date(d)).length === 0) {
                    return
                }
                const start = date(d);
                this.monthStartIndOptions = {
                    disabledDate(date) {
                        return date > start;
                    }
                };
                ls.set('monthEndInd', this.monthEndInd, 'date');
                this.plot();
            },
            plotAl() {
                let reserve = null;
                this.$api.result.getReserve(dateStr(this.monthStartInd), dateStr(this.monthEndInd)).then((response) => {
                    reserve = response.data;
                    this.$api.result.getAssets(dateStr(this.monthStartInd), dateStr(this.monthEndInd)).then((response) => {
                        const data = response.data;
                        this.accounts.forEach((acc) => {
                            const reserve_acc = getArray(getObjOfAcc(reserve, acc), 'reserve');
                            let opt = this.asset_options[acc];
                            opt.dataset = {source: getObjOfAcc(data, acc)};
                            opt.tooltip = {trigger: 'axis', axisPointer: {type: 'shadow'}};
                            opt.grid = {left: 60};
                            opt.yAxis = {type: 'category'};
                            opt.xAxis = {show: false};
                            opt.legend = {bottom: 0, data: ['会计准备金', '期末资金运用净额']};
                            opt.series = [];
                            opt.series.push(
                                {type: 'line', data: reserve_acc, name: '会计准备金', symbol: 'emptyDiamond'},
                                {type: 'line', encode: {x: 'tot'}, name: '期末资金运用净额'},
                                {type: 'bar', encode: {x: 'cash'}, name: '现金及流动性管理工具', stack: acc, barWidth: '36%'},
                                {type: 'bar', encode: {x: 'fixed_income'}, name: '固定收益类投资资产', stack: acc},
                                {type: 'bar', encode: {x: 'equity'}, name: '权益类投资资产', stack: acc},
                                {type: 'bar', encode: {x: 'loan'}, name: '保单贷款', stack: acc},
                            )
                        });
                    }).catch(error => {
                        console.log(error.response);
                    });
                }).catch(error => {
                    console.log(error.response);
                });
            },
            plotDur() {
                this.$api.result.getDur(dateStr(this.monthStartInd), dateStr(this.monthEndInd)).then((response) => {
                    const dur = response.data;
                    this.accounts.forEach((acc) => {
                        let opt = this.dur_options[acc];
                        opt.dataset = {source: getObjOfAcc(dur, acc)};
                        opt.tooltip = {trigger: 'axis', axisPointer: {type: 'shadow'}};
                        opt.yAxis = {};
                        opt.xAxis = {type: 'category'};
                        opt.grid = {bottom: 100};
                        opt.legend = {bottom: 0};
                        opt.series = [];
                        opt.series.push(
                            {type: 'line', encode: {y: 'a'}, name: '资产修正久期', symbol: 'emptyDiamond'},
                            {
                                type: 'line',
                                encode: {y: 'gap_l_scaled'},
                                name: '规模调整后的修正久期缺口',
                                label: {show: true, formatter: '{@gap_l_scaled}'}
                            },
                            {type: 'bar', encode: {y: 'in_scaled'}, name: '规模调整后的现金流入修正久期'},
                            {type: 'bar', encode: {y: 'l_out'}, name: '负债现金流出修正久期', barGap: 0, barCategoryGap: '50%'},
                        )
                    })
                }).catch(error => {
                    console.log(error.response);
                });
            },
            resizeChart() {
                const charts = this.$refs.chart;
                if (charts.length) {
                    charts.forEach((chart) => {
                        chart.resize();
                    });
                }
            }
        },
        beforeMount() {
            this.plotChartInd();
            window.addEventListener('resize', this.resizeChart);
        }
        ,
        beforeDestroy() {
            window.removeEventListener('resize', this.resizeChart)
        }
    }
</script>

<style scoped>
    .chart-wrapper {
        padding: 0 24px;
        margin: 8px;
    }

    .chart-wrapper div {
        width: 100%;
        height: 400px;
    }
</style>