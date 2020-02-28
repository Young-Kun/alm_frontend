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
            <Tabs value="assets" type="card">
                <TabPane label="资产负债" name="assets">
                    <Row type="flex">
                        <i-col :xs="24" :lg="12" v-for="(acc, idx) in accounts" :key="idx">
                            <div class="chart-wrapper">
                                <v-chart :options="al_options[acc]"></v-chart>
                            </div>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="期限结构" name="dur">标签一的内容</TabPane>
                <TabPane label="成本收益" name="cost">标签二的内容</TabPane>
                <TabPane label="成本收益压力测试" name="cost_test">标签三的内容</TabPane>
                <TabPane label="现金流" name="cf">标签三的内容</TabPane>
            </Tabs>
        </Card>
    </div>
</template>

<script>
    import {date, dateStr, getObjOfAcc} from "@/custom/func";
    import ls from "@/custom/localStorage";

    export default {
        name: "ResultIndicator",
        data() {
            return {
                monthStartIndOptions: null,
                monthEndIndOptions: null,
                monthStartInd: date('201901'),
                monthEndInd: new Date(),
                accounts: ['T', 'C', 'P', 'U'],
                al_options: {
                    T: {
                        title: {text: '公司整体'},
                        tooltip: {trigger: 'axis'},
                        dataset: {source: []},
                        yAxis: {type: 'category'},
                        xAxis: {show: false},
                        series: []
                    },
                    C: {
                        title: {text: '传统账户'},
                        tooltip: {trigger: 'axis'},
                        dataset: {source: []},
                        yAxis: {type: 'category'},
                        xAxis: {show: false},
                        series: []
                    },
                    P: {
                        title: {text: '分红账户'},
                        tooltip: {trigger: 'axis'},
                        dataset: {source: []},
                        yAxis: {type: 'category'},
                        xAxis: {show: false},
                        series: []
                    },
                    U: {
                        title: {text: '万能账户'},
                        tooltip: {trigger: 'axis'},
                        dataset: {source: []},
                        yAxis: {type: 'category'},
                        xAxis: {show: false},
                        series: []
                    }
                }
            }
        },
        methods: {
            plotChartInd() {
                const monthStartInd = ls.get('monthStartInd', 'date');
                const monthEndInd = ls.get('monthEndInd', 'date');
                if (monthStartInd && monthEndInd) {
                    this.monthStartInd = monthStartInd;
                    this.monthEndInd = monthEndInd;
                } else {
                    ls.set('monthStartInd', this.monthStartInd, 'date');
                    ls.set('monthEndInd', this.monthEndInd, 'date');
                }
                this.setFloor(this.monthStartInd);
                this.setCeiling(this.monthEndInd);
                this.plotAl();
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
                const end = date(d);
                this.monthEndIndOptions = {
                    disabledDate(date) {
                        return date < end;
                    }
                };
                ls.set('monthStartInd', this.monthStartInd, 'date');
            },
            handleMonthEndIndChange(d) {
                const start = date(d);
                this.monthStartIndOptions = {
                    disabledDate(date) {
                        return date > start;
                    }
                };
                ls.set('monthEndInd', this.monthEndInd, 'date');
            },
            plotAl() {
                this.$api.result.getAssets(dateStr(this.monthStartInd), dateStr(this.monthEndInd)).then((response) => {
                    const data = response.data;
                    // this.al_options.title.dataset.source = getObjOfAcc(data, 'T');
                    this.accounts.forEach((acc) => {
                        let opt = this.al_options[acc];
                        opt.dataset.source = getObjOfAcc(data, acc);
                        opt.series = [];
                        opt.series.push(
                            {type: 'line', encode: {x: 'tot'}, name: '期末资金运用净额'},
                            {type: 'bar', encode: {x: 'cash'}, name: '现金及流动性管理工具', stack: acc, barWidth:'50%'},
                            {type: 'bar', encode: {x: 'fixed_income'}, name: '固定收益类投资资产', stack: acc},
                            {type: 'bar', encode: {x: 'equity'}, name: '权益类投资资产', stack: acc},
                            {type: 'bar', encode: {x: 'loan'}, name: '保单贷款', stack: acc},
                        )
                    });
                }).catch(error => {
                    console.log(error.response);
                });
            }
        },
        beforeMount() {
            this.plotChartInd();
        }
    }
</script>

<style scoped>
    .chart-wrapper {
        width: 100%;
        height: 400px;
    }
</style>