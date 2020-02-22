<template>
    <Card class="item">
        <div>
            <h1>{{ report.file_name }}</h1>
            <pre>文件大小：{{ report.file_size | fileSize }}</pre>
            <p>
                <Badge type="normal" :text="report.created_by"></Badge>
                创建于：{{ report.created | datetime }}
            </p>
            <p v-if="report.modified_by">
                <Badge type="normal" :text="report.modified_by"></Badge>
                最后修改于：{{ report.modified | datetime }}
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
            'report'
        ],
        methods: {
            handleDownload() {
                this.$api.report.downloadReport(this.report.file_data).then(() => {
                    this.$Message.success('开始下载');
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    .item {
        margin-bottom: 12px;
    }
</style>