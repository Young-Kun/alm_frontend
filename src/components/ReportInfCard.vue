<template>
    <Card class="item">
        <h1>{{ report.file_name }}</h1>

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