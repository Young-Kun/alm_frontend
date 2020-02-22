<template>
    <Card class="item">
        <h1>{{ report.file_name }}</h1>
        <pre>文件大小：{{ report.file_size }}</pre>
        <p><Badge :text="report.created_by"></Badge>创建于：{{ report.created }}</p>
        <p v-if="report.modified_by"><Badge :text="report.modified_by"></Badge>最后修改于：{{ report.modified }}</p>
    </Card>
</template>

<script>
    export default {
        name: "ReportInfCard",
        props: [
            'report'
        ]
    }
</script>

<style scoped>
    .item {
        margin-bottom: 12px;
    }
</style>