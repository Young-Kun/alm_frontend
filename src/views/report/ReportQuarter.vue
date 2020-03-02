<template>
    <div>
        <Row type="flex">
            <Card style="width: 250px">
                <DatePicker ref="monthStart"
                            type="month"
                            :options="quarterOptions"
                            v-model="quarter"
                            format="yyyyMM"
                            @on-change="handleQuarterChange"
                            placeholder="请选择季度">
                </DatePicker>
            </Card>
            <Card style="margin-left: auto; margin-right: 12px; display: flex; align-items: center">
                <div class="icon" title="窗口最大化"><i class="fa fa-window-maximize"></i></div>
                <div class="icon" title="全屏"><i class="fa fa-fw fa-arrows-alt"></i></div>
            </Card>
            <Card style="display: flex;align-items: center">
                <Page :current="2" :total="50" :page-size="1" simple/>
            </Card>
        </Row>
        <Card style="margin-top: 12px">

        </Card>
    </div>
</template>

<script>
    export default {
        name: "ReportQuarter",
        data() {
            return {
                quarter: '201912',
                quarterOptions: {
                    disabledDate(date) {
                        return (date.getMonth() + 1) % 3 !== 0;
                    }
                },
            }
        },
        methods: {
            handleQuarterChange() {
                console.log(1);
            }
        }
    }
</script>

<style scoped>
    .icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
    }
    
    .icon:hover {
        background: #f8f8f9;
        font-size: large;
    }
</style>