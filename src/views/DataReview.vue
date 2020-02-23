<template>
    <Row :gutter="24">
        <i-col style="padding-right: 188px">
            <data-item-card v-for="item in data_list" :key="item.id" :data_item="item"></data-item-card>
        </i-col>
        <Card style="position: fixed; right: 24px; top: 88px; width: 150px">
            <h2 slot="title">
                <i class="fa fa-filter"></i>
                过滤
            </h2>
            <Menu width="auto" theme="light" active-name="all" @on-select="handleFilterYear">
                <MenuItem name="all">全部</MenuItem>
                <MenuItem v-for="(year, idx) in filter_years" :key="idx" :name="year">{{ year }}</MenuItem>
            </Menu>
        </Card>
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
                data_list: [],
                filter_years: null,
                filterParams: {
                    file_name__icontains: null
                }
            }
        },
        methods: {
            getDataList(params) {
                return this.$api.data.datatList(params).then((response) => {
                    this.data_list = response.data;
                }).catch(error => {
                    console.log(error.response);
                })
            },
            handleFilterYear(name) {
                this.filterParams.file_name__icontains = name === 'all' ? null : name;
                this.getDataList(this.filterParams);
            }
        },
        mounted() {
            this.getDataList(this.filterParams).then(() => {
                let years = [];
                this.data_list.forEach((value) => {
                    years.push(value.file_name.slice(0, 4))
                });
                this.filter_years = new Set(years);
            }).catch(error => {
                console.log(error.response);
            });
        }
    }
</script>

<style scoped>

</style>