<template>
    <Card style="width: 500px; margin-bottom: 12px">
        <DatePicker ref="start"
                    type="month"
                    :options="startOptions"
                    v-model="startDate"
                    format="yyyyMM"
                    @on-change="handleStartChange"
                    placeholder="选择起始月">
        </DatePicker>
        到
        <DatePicker ref="end"
                    type="month"
                    :options="endOptions"
                    v-model="endDate"
                    format="yyyyMM"
                    @on-change="handleEndChange"
                    placeholder="选择结束月">
        </DatePicker>
    </Card>
</template>

<script>
    import {date} from "@/custom/func";

    export default {
        name: "DatePickerStartEnd",
        data() {
            return {
                startOptions: null,
                endOptions: null,
                startDate: date('201901'),
                endDate: new Date(),
            }
        },
        methods: {
            handleStartChange(d) {
                const end = date(d);
                this.endOptions = {
                    disabledDate(date) {
                        return date < end;
                    }
                };
                this.$emit('start-change');
            },
            handleEndChange(d) {
                const start = date(d);
                this.startOptions = {
                    disabledDate(date) {
                        return date > start;
                    }
                };
                this.$emit('end-change')
            }
        },
        mounted() {
            this.endOptions = {
                disabledDate(date) {
                    return date < this.endDate;
                }
            };
            this.startOptions = {
                disabledDate(date) {
                    return date > this.startDate;
                }
            };
        }
    }
</script>

<style scoped>

</style>