<template>
    <div class="tooltips-wrapper">
        <Tooltip placement="right-start" v-for="menu in menuListData" :key="menu.id" class="tooltip">
            <i :class="['fa fa-fw '] + [menu.icon]"></i>
            <div slot="content">

            </div>
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

    .tooltip {
        color: #fff;
        width: 100%;
        padding: 14px 0;
        text-align: center;
        cursor: pointer;
    }

    .tooltip:hover {
        background: #101117;
    }
</style>