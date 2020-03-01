<template>
    <div class="tooltips-wrapper">
        <Tooltip placement="right-start" v-for="menu in menuListData" :key="menu.id">

        </Tooltip>
    </div>
</template>

<script>
    export default {
        name: "DataBasedTooltips",
        props: {
            menuListData: {
                type: Array,
                required: true
            },
        }
    }
</script>

<style scoped>
    .tooltips-wrapper {
        height: calc(100vh - 64px);
        overflow-y: auto;
    }
</style>