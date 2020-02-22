<template>
    <Row :gutter="24">
        <i-col :span="18">
            <report-inf-card v-for="report in data" :key="report.id" :report="report"></report-inf-card>
        </i-col>
        <i-col :span="6">
            <Card>

            </Card>
        </i-col>
    </Row>
</template>

<script>
    import ReportInfCard from "@/components/ReportInfCard";
    export default {
        name: "DataReview",
        components: {ReportInfCard},
        data() {
            return {
                data: []
            }
        },
        mounted() {
            this.$api.report.reportList().then((response) => {
                this.data = response.data;
            }).catch(error => {
                console.log(error);
            })
        }
    }
</script>

<style scoped>

</style>