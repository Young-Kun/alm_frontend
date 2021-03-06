<template>
    <div v-resize="resizeChart">
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
            <Tabs v-model="tabsValue" type="card" @on-click="handleTabChange" :animated="false">
                <TabPane label="资产负债规模" name="assets">
                    <Row type="flex" v-if="tabsValue === 'assets'">
                        <i-col :xs="24" :md="24" :lg="12" v-for="(acc, idx) in accounts" :key="idx">
                            <Card class="chart-wrapper">
                                <div>
                                    <v-chart :options="asset_options[acc]" ref="chart" theme="default"></v-chart>
                                </div>
                            </Card>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="期限结构" name="dur">
                    <Row type="flex" v-if="tabsValue === 'dur'">
                        <i-col :xs="24" :md="24" :lg="12" v-for="(acc, idx) in accounts" :key="idx">
                            <Card class="chart-wrapper">
                                <div>
                                    <v-chart :options="dur_options[acc]" ref="chart" theme="default"></v-chart>
                                </div>
                            </Card>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="成本收益" name="cost">
                    <div v-if="tabsValue === 'cost'">
                        <div style="margin: 20px">
                            <RadioGroup type="button" v-model="costReturnAcc" @on-change="handleCostReturnAccChange">
                                <Radio label="T">公司整体</Radio>
                                <Radio label="C">传统账户</Radio>
                                <Radio label="P">分红账户</Radio>
                                <Radio label="U">万能账户</Radio>
                            </RadioGroup>
                        </div>
                        <Row type="flex">
                            <i-col :xs="24" :md="24" :lg="12" v-for="(type, idx) in costReturnTypes" :key="idx">
                                <Card class="chart-wrapper">
                                    <div>
                                        <v-chart :options="cost_return_options[costReturnAcc][type]" ref="chart"
                                                 theme="default"></v-chart>
                                    </div>
                                </Card>
                            </i-col>
                        </Row>
                    </div>
                </TabPane>
                <TabPane label="现金流" name="cf">
                    <div v-if="tabsValue === 'cf'">
                        <div style="margin: 20px">
                            <RadioGroup type="button" v-model="cashFlowQuarter"
                                        @on-change="handleCashFlowQuarterChange">
                                <Radio :label="q" v-for="(q, idx) in quarters" :key="idx">{{ q }}</Radio>
                            </RadioGroup>
                        </div>
                        <div style="margin: 20px">
                            <RadioGroup v-model="cashFlowScenario" @on-change="handleScenarioChange">
                                <Radio label="_base">基本情景</Radio>
                                <Radio label="_stress">压力情景</Radio>
                            </RadioGroup>
                        </div>
                        <Row type="flex">
                            <i-col :xs="24" :md="24" :lg="12" v-for="(acc, idx) in accounts" :key="idx">
                                <Card class="chart-wrapper">
                                    <div>
                                        <v-chart :options="cash_flow_options[acc]" ref="chart"
                                                 theme="default"></v-chart>
                                    </div>
                                </Card>
                            </i-col>
                        </Row>
                    </div>
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>

<script>
    import {
        axisFormatBillion,
        axisFormatPercent,
        date,
        dateStr, formatBillionX, formatPercent,
        getArray,
        getObjOfAcc,
        getQuarters,
        tooltipFormatPercent
    } from "@/utils/func";
    import ls from "@/utils/localStorage";

    export default {
        name: "ResultIndicator",
        data() {
            return {
                cashFlowScenario: '_base',
                cashFlowPeriods: ['q1', 'q2', 'q3', 'q4', 'y2', 'y3'],
                cashFlowQuarter: '201912',
                costReturnAcc: 'T',
                costReturnTypes: ['comp', 'fin', 'ra', 'avg'],
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
                cost_return_options: {
                    T: {
                        comp: {title: {text: '综合口径'}, series: []},
                        fin: {title: {text: '会计口径'}, series: []},
                        ra: {title: {text: '风险调整口径'}, series: []},
                        avg: {title: {text: '三年平均口径'}, series: []},
                    },
                    C: {
                        comp: {title: {text: '综合口径'}, series: []},
                        fin: {title: {text: '会计口径'}, series: []},
                        ra: {title: {text: '风险调整口径'}, series: []},
                        avg: {title: {text: '三年平均口径'}, series: []},
                    },
                    P: {
                        comp: {title: {text: '综合口径'}, series: []},
                        fin: {title: {text: '会计口径'}, series: []},
                        ra: {title: {text: '风险调整口径'}, series: []},
                        avg: {title: {text: '三年平均口径'}, series: []},
                    },
                    U: {
                        comp: {title: {text: '综合口径'}, series: []},
                        fin: {title: {text: '会计口径'}, series: []},
                        ra: {title: {text: '风险调整口径'}, series: []},
                        avg: {title: {text: '三年平均口径'}, series: []},
                    }
                },
                cash_flow_options: {
                    T: {title: {text: '公司整体'}, series: []},
                    C: {title: {text: '传统账户'}, series: []},
                    P: {title: {text: '分红账户'}, series: []},
                    U: {title: {text: '万能账户'}, series: []}
                }
            }
        },
        computed: {
            quarters() {
                return getQuarters(this.monthStartInd, this.monthEndInd).reverse();
            }
        },
        methods: {
            plotChartInd() {
                const monthStartInd = ls.get('monthStartInd', 'date');
                const monthEndInd = ls.get('monthEndInd', 'date');
                const tabsValue = ls.get('tabsValue');
                const costReturnAcc = ls.get('costReturnAcc');
                const cashFlowQuarter = ls.get('cashFlowQuarter');
                const cashFlowScenario = ls.get('cashFlowScenario');
                if (monthStartInd && monthEndInd && tabsValue && costReturnAcc && cashFlowQuarter && cashFlowScenario) {
                    this.monthStartInd = monthStartInd;
                    this.monthEndInd = monthEndInd;
                    this.tabsValue = tabsValue;
                    this.costReturnAcc = costReturnAcc;
                    this.cashFlowQuarter = cashFlowQuarter;
                    this.cashFlowScenario = cashFlowScenario;
                } else {
                    ls.set('monthStartInd', this.monthStartInd, 'date');
                    ls.set('monthEndInd', this.monthEndInd, 'date');
                    ls.set('tabsValue', this.monthEndInd);
                    ls.set('costReturnAcc', this.costReturnAcc);
                    ls.set('cashFlowQuarter', this.cashFlowQuarter);
                    ls.set('cashFlowScenario', this.cashFlowScenario);
                }
                this.setFloor(this.monthStartInd);
                this.setCeiling(this.monthEndInd);
                this.plot();
            },
            plot() {
                this.plotAl();
                this.plotDur();
                this.plotCostReturn();
                this.plotCashFlow();
            },
            handleCostReturnAccChange(name) {
                ls.set('costReturnAcc', name);
            },
            handleTabChange(name) {
                ls.set('tabsValue', name);
            },
            handleCashFlowQuarterChange(name) {
                this.plotCashFlow();
                ls.set('cashFlowQuarter', name);
            },
            handleScenarioChange(name) {
                this.plotCashFlow();
                ls.set('cashFlowScenario', name);
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
                if (this.monthStartInd > date(this.cashFlowQuarter)) {
                    this.cashFlowQuarter = this.quarters[0];
                    ls.set('cashFlowQuarter', this.quarters[0]);
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
                if (this.monthEndInd < date(this.cashFlowQuarter)) {
                    this.cashFlowQuarter = this.quarters[0];
                    ls.set('cashFlowQuarter', this.quarters[0]);
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
                            const reserve_acc = getArray(getObjOfAcc(reserve, 'account', acc), 'reserve');
                            let opt = this.asset_options[acc];
                            opt.dataset = {source: getObjOfAcc(data, 'account', acc)};
                            opt.tooltip = {trigger: 'axis', axisPointer: {type: 'shadow'}};
                            opt.grid = {left: 60};
                            opt.yAxis = {type: 'category'};
                            opt.xAxis = {show: false};
                            opt.legend = {bottom: 0, data: ['会计准备金', '期末资金运用净额']};
                            opt.series = [];
                            opt.series.push(
                                {type: 'line', data: reserve_acc, name: '会计准备金', symbol: 'emptyDiamond'},
                                {
                                    type: 'line',
                                    encode: {x: 'tot'},
                                    name: '期末资金运用净额',
                                    lineStyle: {opacity: 0.5},
                                    label: {show: true, offset: [-10, -10], formatter: formatBillionX}
                                },
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
                        opt.dataset = {source: getObjOfAcc(dur, 'account', acc)};
                        opt.tooltip = {trigger: 'axis', axisPointer: {type: 'shadow'}};
                        opt.yAxis = {};
                        opt.xAxis = {type: 'category'};
                        opt.grid = {bottom: 120};
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
            plotCostReturn() {
                this.$api.result.getCostReturn(dateStr(this.monthStartInd), dateStr(this.monthEndInd)).then((response) => {
                    const cost_return = response.data;
                    this.accounts.forEach((acc) => {
                        this.costReturnTypes.forEach((type) => {
                            let opt = this.cost_return_options[acc][type];
                            opt.dataset = {source: getObjOfAcc(cost_return, 'account', acc)};
                            opt.tooltip = {
                                trigger: 'axis', axisPointer: {type: 'shadow'},
                                formatter: tooltipFormatPercent
                            };
                            opt.grid = {bottom: 80};
                            opt.yAxis = {axisLabel: {formatter: axisFormatPercent}};
                            opt.xAxis = {type: 'category'};
                            opt.legend = {bottom: 0};
                            opt.series = [];
                            if (type === 'comp') {
                                opt.series.push(
                                    {
                                        type: 'bar',
                                        encode: {y: 'comp_gap'},
                                        name: '利差',
                                        barCategoryGap: '50%',
                                    },
                                    {
                                        type: 'line',
                                        encode: {y: 'comp_return'},
                                        name: '年化综合收益率',
                                        label: {show: true, formatter: formatPercent, position: 'top'}
                                    },
                                    {
                                        type: 'line',
                                        encode: {y: 'capital_cost'},
                                        name: '资金成本率',
                                        label: {show: true, formatter: formatPercent, position: 'bottom'}
                                    },
                                )
                            }
                            if (type === 'fin') {
                                opt.series.push(
                                    {
                                        type: 'bar',
                                        encode: {y: 'fin_gap'},
                                        name: '利差',
                                        barCategoryGap: '50%',
                                    },
                                    {
                                        type: 'line',
                                        encode: {y: 'fin_return'},
                                        name: '年化会计收益率',
                                        label: {show: true, formatter: formatPercent, position: 'top'}
                                    },
                                    {
                                        type: 'line',
                                        encode: {y: 'eff_cost'},
                                        name: '有效成本率',
                                        label: {show: true, formatter: formatPercent, position: 'bottom'}
                                    },
                                )
                            }
                            if (type === 'ra') {
                                opt.series.push(
                                    {
                                        type: 'bar',
                                        encode: {y: 'ra_comp_gap'},
                                        name: '利差',
                                        barCategoryGap: '50%',
                                    },
                                    {
                                        type: 'line',
                                        encode: {y: 'ra_comp_return'},
                                        name: '风险调整后综合收益率',
                                        label: {show: true, formatter: formatPercent, position: 'top'}
                                    },
                                    {
                                        type: 'line',
                                        encode: {y: 'gre_cost'},
                                        name: '保证成本率',
                                        label: {show: true, formatter: formatPercent, position: 'bottom'}
                                    },
                                )
                            }
                            if (type === 'avg') {
                                opt.series.push(
                                    {
                                        type: 'bar',
                                        encode: {y: 'avg_3y_gap'},
                                        name: '利差',
                                        barCategoryGap: '50%',
                                    },
                                    {
                                        type: 'line',
                                        encode: {y: 'avg_3y_return'},
                                        name: '三年平均综合收益率',
                                        label: {show: true, formatter: formatPercent, position: 'top'}
                                    },
                                    {
                                        type: 'line',
                                        encode: {y: 'avg_3y_cost'},
                                        name: '三年平均资金成本率',
                                        label: {show: true, formatter: formatPercent, position: 'bottom'}
                                    },
                                )
                            }
                        })
                    })
                })
            },
            plotCashFlow() {
                const sce = this.cashFlowScenario;
                this.$api.result.getCashFlowTest(dateStr(this.monthStartInd), dateStr(this.monthEndInd)).then((response) => {
                    const data = response.data;
                    this.accounts.forEach((acc) => {
                        let opt = this.cash_flow_options[acc];
                        const source = getObjOfAcc(getObjOfAcc(data, 'account', acc), 'data', this.cashFlowQuarter)
                        opt.tooltip = {trigger: 'axis', axisPointer: {type: 'shadow'},};
                        opt.xAxis = {type: 'category', data: this.cashFlowPeriods};
                        opt.yAxis = {axisLabel: {formatter: axisFormatBillion}};
                        opt.grid = {bottom: 80};
                        opt.legend = {bottom: 0, data: ['业务现金流', '资产现金流', '净现金流', '累计现金流']};
                        opt.series = [];
                        let business_cf = [];
                        let assets_cf = [];
                        let financing_cf = [];
                        let net_cf = [];
                        let accumulated_cf = [];
                        this.cashFlowPeriods.forEach((p) => {
                            business_cf.push(source[0]['cf_business_' + p + sce]);
                            assets_cf.push(source[0]['cf_assets_' + p + sce]);
                            financing_cf.push(source[0]['cf_financing_' + p + sce]);
                            net_cf.push(source[0]['cf_net_' + p + sce]);
                            accumulated_cf.push(source[0]['cf_accumulated_' + p + sce]);
                        });
                        opt.series.push(
                            {
                                type: 'line',
                                data: accumulated_cf,
                                name: '累计现金流',
                                label: {
                                    show: true, formatter: (params) => {
                                        return (params.value / 1e8).toFixed(0);
                                    }
                                }
                            },
                            {type: 'bar', data: business_cf, name: '业务现金流', stack: '1'},
                            {type: 'bar', data: assets_cf, name: '资产现金流', stack: '1'},
                            {type: 'bar', data: financing_cf, name: '筹资现金流', stack: '1'},
                            {type: 'line', data: net_cf, name: '净现金流'},
                        )
                    })
                })
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
        height: 350px;
    }
</style>