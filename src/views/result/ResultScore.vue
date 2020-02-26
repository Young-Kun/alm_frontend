<template>
    <div>
        <Card>
            <DatePicker ref="monthStart"
                        type="month"
                        :options="monthStartOptions"
                        @on-change="handleMonthStartChange"
                        placeholder="选择起始月">
            </DatePicker>
            到
            <DatePicker ref="monthEnd"
                        type="month"
                        :options="monthEndOptions"
                        @on-change="handleMonthEndChange"
                        placeholder="选择结束月">
            </DatePicker>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "Scores",
        data() {
            return {
                monthStartOptions: null,
                monthEndOptions: null
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
            }
        }
    }
</script>

<style scoped>

</style>