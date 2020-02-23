<template>
    <Row :gutter="24">
        <i-col :span="18">
            <data-item-card v-for="item in data_list" :key="item.id" :data_item="item"></data-item-card>
        </i-col>
        <i-col :span="6">
            <Card>

            </Card>
        </i-col>
    </Row>
</template>

<script>
    import DataItemCard from "@/components/DataItemCard";

    export default {
        name: "DataReview",
        components: {
            DataItemCard,
        },
        data() {
            return {
                data_list: []
            }
        },
        mounted() {
            this.$api.data.datatList().then((response) => {
                this.data_list = response.data;
            }).catch(error => {
                console.log(error.response);
            })
        }
    }
</script>

<style scoped>

</style>