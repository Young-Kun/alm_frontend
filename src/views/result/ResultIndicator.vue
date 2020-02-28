<template>
    <div>
<!--        <Card style="width: 500px; margin-bottom: 12px">-->
<!--            <DatePicker ref="monthStart"-->
<!--                        type="month"-->
<!--                        :options="monthStartOptions"-->
<!--                        v-model="monthStart"-->
<!--                        format="yyyyMM"-->
<!--                        @on-change="handleMonthStartChange"-->
<!--                        placeholder="选择起始月">-->
<!--            </DatePicker>-->
<!--            到-->
<!--            <DatePicker ref="monthEnd"-->
<!--                        type="month"-->
<!--                        :options="monthEndOptions"-->
<!--                        v-model="monthEnd"-->
<!--                        format="yyyyMM"-->
<!--                        @on-change="handleMonthEndChange"-->
<!--                        placeholder="选择结束月">-->
<!--            </DatePicker>-->
<!--        </Card>-->
<!--        <Card>-->
<!--            <Tabs value="assets" type="card">-->
<!--                <TabPane label="资产负债" name="assets">-->
<!--                    <div class="chart-wrapper">-->
<!--                        <v-chart></v-chart>-->
<!--                    </div>-->
<!--                </TabPane>-->
<!--                <TabPane label="期限结构" name="dur">标签一的内容</TabPane>-->
<!--                <TabPane label="成本收益" name="cost">标签二的内容</TabPane>-->
<!--                <TabPane label="成本收益压力测试" name="cost_test">标签三的内容</TabPane>-->
<!--                <TabPane label="现金流" name="cf">标签三的内容</TabPane>-->
<!--            </Tabs>-->
<!--        </Card>-->
    </div>
</template>

<script>
    export default {
        name: "ResultIndicator"
    }
</script>

<style scoped>
    .chart-wrapper {
        width: 100%;
        height: 800px;
    }
</style>