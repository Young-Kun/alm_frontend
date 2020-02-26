<template>
    <Row :gutter="24">
        <BackTop :height="1"></BackTop>
        <i-col style="padding-right: 188px">
            <data-item-card v-for="item in data_list" :key="item.id" :data_item="item"></data-item-card>
            <Card dis-hover :bordered="false" style="text-align: right">
                <Page show-total :page-size="filterParams.page_size" :total="data_count" @on-change="handlePagination"/>
            </Card>
        </i-col>
        <Card style="position: fixed; right: 24px; top: 88px; width: 150px">
            <h2 slot="title">
                <i class="fa fa-filter"></i>
                过滤
            </h2>
            <Menu width="auto" theme="light" active-name="all" @on-select="handleFilterYear" class="filter-menu">
                <MenuItem name="all">全部</MenuItem>
                <MenuItem v-for="(year, idx) in filter_years" :key="idx" :name="year">{{ year }}</MenuItem>
            </Menu>
        </Card>
    </Row>
</template>

<script>
    import DataItemCard from "@/components/data/DataItemCard";

    export default {
        name: "DataReview",
        components: {
            DataItemCard,
        },
        data() {
            return {
                data_list: [],
                data_count: 0,
                filter_years: null,
                filterParams: {
                    file_name__icontains: null,
                    page: null,
                    page_size: 4
                }
            }
        },
        methods: {
            getDataList(params) {
                return this.$api.data.datatList(params).then((response) => {
                    this.data_list = response.data.results;
                    this.data_count = response.data.count;
                }).catch(error => {
                    console.log(error.response);
                })
            },
            handleFilterYear(name) {
                this.filterParams.file_name__icontains = name === 'all' ? null : name;
                this.getDataList(this.filterParams);
            },
            handlePagination(page) {
                this.filterParams.page = page;
                this.getDataList(this.filterParams);
            }
        },
        mounted() {
            // 获取所有年份
            this.$api.data.datatList({page_size: 1000000}).then((response) => {
                let years = [];
                response.data.results.forEach((value) => {
                    years.push(value.file_name.slice(0, 4))
                });
                this.filter_years = new Set(years);
            }).catch(error => {
                console.log(error.response);
            });
            this.getDataList(this.filterParams);
        }
    }
</script>

<style scoped>
    .filter-menu {
        max-height: calc(60vh - 100px);
        overflow: auto;
    }
</style>