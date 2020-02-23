<template>
    <Card class="item">
        <div>
            <h1>{{ data_item.file_name }}</h1>
            <pre>文件大小：{{ data_item.file_size | fileSize }}</pre>
            <p>
                <Badge type="normal" :text="data_item.created_by"></Badge>
                创建于：{{ data_item.created | datetime }}
            </p>
            <p v-if="data_item.modified_by">
                <Badge type="normal" :text="data_item.modified_by"></Badge>
                最后修改于：{{ data_item.modified | datetime }}
            </p>
            <ButtonGroup style="position: absolute; right: 24px; bottom: 16px">
                <Button type="primary" shape="circle" @click="handleDownload">
                    下载
                </Button>
                <Button type="warning" shape="circle">
                    修改
                </Button>
            </ButtonGroup>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "ReportInfCard",
        props: [
            'data_item'
        ],
        methods: {
            handleDownload() {
                this.$api.data.downloadData(this.data_item.file);
            }
        }
    }
</script>

<style scoped>
    .item {
        margin-bottom: 12px;
    }
</style>