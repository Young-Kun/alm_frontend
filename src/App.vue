<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
    }
</script>

<style>
    .echarts {
        width: 100%!important;
        height: 100%!important;
    }

    .slide .ivu-card-body {
        height: 100%;
        padding: 0;
    }
</style>
