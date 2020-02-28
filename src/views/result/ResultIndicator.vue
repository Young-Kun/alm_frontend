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
                    <div class="chart-wrapper">
                        <v-chart></v-chart>
                    </div>
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
    import {date} from "@/custom/func";
    import ls from "@/custom/localStorage";

    export default {
        name: "ResultIndicator",
        data() {
            return {
                monthStartIndOptions: null,
                monthEndIndOptions: null,
                monthStartInd: date('201901'),
                monthEndInd: new Date(),
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
        },
        beforeMount() {
            this.plotChartInd();
        }
    }
</script>

<style scoped>
    .chart-wrapper {
        width: 100%;
        height: 800px;
    }
</style>