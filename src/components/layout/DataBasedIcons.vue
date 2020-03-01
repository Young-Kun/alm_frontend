<template>
    <div class="wrapper">
        <div v-for="menu in menuListData" :key="menu.id">
            <Tooltip placement="right" class="item" :content="menu.span" v-if="!menu.menu_items">
                <i :class="['fa fa-fw '] + [menu.icon]"></i>
            </Tooltip>
            <Dropdown v-if="menu.menu_items" class="item" placement="right-start">
                <span><i :class="['fa fa-fw '] + [menu.icon]"></i></span>
                <DropdownMenu slot="list" style="margin-left: 1px; margin-top: -22px">
                    <DropdownItem v-for="item in menu.menu_items" :key="item.id">{{item.span}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DataBasedIcons",
        props: {
            menuListData: {
                type: Array,
                required: true
            },
        }
    }
</script>

<style scoped>
    .wrapper {
        height: calc(100vh - 64px);
        overflow-y: auto;
    }

    .item {
        display: block;
        width: 100%;
        color: rgba(255, 255, 255, 0.7);
        padding: 14px 0;
        cursor: pointer;
    }

    .item i {
        margin-left: 24px;
        font-size: large;
        transform: translateX(-5px);
    }

    .item:hover {
        background: #101117;
        color: #fff;
    }

    .item ul {
        background: #191a23;
        border-radius: 5px;
        padding: 5px 0;
    }

    .item li {
        color: rgba(255, 255, 255, 0.7);
    }

    .item li:hover {
        background: #101117;
        color: #fff;
    }
</style>