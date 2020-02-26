<template>
    <div>
        <Row :gutter="24">
            <i-col :span="12">
                <Card>
                    <p slot="title"> 请选择起止月份 </p>
                    <DatePicker ref="monthStart"
                                type="month"
                                :options="monthStartOptions"
                                v-model="monthStart"
                                @on-change="handleMonthStartChange"
                                placeholder="选择起始月">
                    </DatePicker>
                    到
                    <DatePicker ref="monthEnd"
                                type="month"
                                :options="monthEndOptions"
                                v-model="monthEnd"
                                @on-change="handleMonthEndChange"
                                placeholder="选择结束月">
                    </DatePicker>
                </Card>
            </i-col>
            <i-col :span="12">
                <Card>
                    <p slot="title"> 请选择指标项（可多选） </p>
                    <Button type="text" slot="extra" @click="clearSelected">清空</Button>
                    <Select multiple v-model="selectedIndicators">
                        <Option v-for="(indicator, idx) in indicators" :key="idx" :value="indicator.value">
                            {{ indicator.label }}
                        </Option>
                    </Select>
                </Card>
            </i-col>
        </Row>
        <Row style="margin-top: 12px">
            <Button type="primary" @click="handlePlot">查询</Button>
            <Card style="margin-top: 12px">
                <div ref="chart" style="width: 100%; height: 500px">

                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
    import {getQuarters} from '@/custom/func'

    export default {
        name: "Scores",
        data() {
            return {
                monthStartOptions: null,
                monthEndOptions: null,
                monthEnd: new Date(),
                monthStart: '20190101',
                selectedIndicators: null,
                data: [],
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
                ]
            }
        },
        methods: {
            handleMonthStartChange(date) {
                const end = new Date(new Date(date) - 24 * 60 * 60 * 1000);
                this.monthEndOptions = {
                    disabledDate(date) {
                        return date < end;
                    }
                }
            },
            handleMonthEndChange(date) {
                const start = new Date(date);
                this.monthStartOptions = {
                    disabledDate(date) {
                        return date > start;
                    }
                }
            },
            clearSelected() {
                this.selectedIndicators = null;
            },
            // renderChart() {
            //     console.log(this.indicators);
            //     this.$echarts.init(this.$refs.chart).setOption({
            //         legend: {},
            //         tooltip: {
            //             trigger: 'axis',
            //         },
            //         dataset: {
            //             source: [
            //                 {data: '201903', tot_score: 80, dfa: 90},
            //                 {data: '201906', tot_score: 89, dfa:40},
            //             ]
            //         },
            //         xAxis: {type: 'category'},
            //         yAxis: {},
            //         series: [
            //             {
            //                 type: 'line',
            //                 encode: {
            //                     x: 'data',
            //                     y: ['tot_score']
            //                 }
            //             }
            //         ]
            //     })
            // },
            handlePlot() {
                this.data = [];
                const {monthStart, monthEnd} = this;
                if (!(monthStart * monthEnd)) {
                    this.$Message.error('请先选择起止月份');
                    return false;
                }
                const quarters = getQuarters(monthStart, monthEnd);
                if (quarters.length === 0) {
                    this.$Message.error('所选期间没有季度月');
                    return false;
                }
                quarters.forEach((q) => {
                    this.$api.result.getScore(q).then((response) => {
                        if (response.data.length === 0) {
                            this.$Message.warning(q + '的数据不存在，请检查')
                        } else {
                            this.data.push(response.data[0]);
                        }
                    }).catch(error => {
                        this.$Message.error('无法获取' + q + '得分');
                        console.log(error.response);
                    })
                });
                // this.renderChart();
            }
        },
        mounted() {
            this.handlePlot();
        }
    }
</script>

<style scoped>

</style>