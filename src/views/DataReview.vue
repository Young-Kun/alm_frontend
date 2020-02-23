<template>
    <Row :gutter="24">
        <i-col :span="18">
            <report-inf-card v-for="item in data_list" :key="item.id" :data_item="item"></report-inf-card>
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
                data_list: []
            }
        },
        mounted() {
            this.$api.data.datatList().then((response) => {
                this.data_list = response.data;
            }).catch(error => {
                console.log(error);
            })
        }
    }
</script>

<style scoped>

</style>