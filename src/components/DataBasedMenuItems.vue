<template>
    <div class="menu-items-wrapper">
        <div v-for="menu in menuListData" :key="menu.id">
            <div v-if="menu.menu_items">
                <Submenu :name="menu.name">
                    <template slot="title">
                        <i :class="['fa fa-fw '] + [menu.icon]"></i>
                        <span>{{ menu.span }}</span>
                    </template>
                    <MenuItem v-for="item in menu.menu_items" :key="item.id" :name="item.name" :to=item.to>
                        <i :class="['fa fa-fw '] + [item.icon]"></i>
                        <span>{{ item.span }}</span>
                    </MenuItem>
                </Submenu>
            </div>
            <div v-else>
                <MenuItem :name="menu.name" :to="menu.to">
                    <i :class="['fa fa-fw '] + [menu.icon]"></i>
                    <span>{{ menu.span }}</span>
                </MenuItem>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MenuItems",
        props: {
            menuListData: {
                type: Array,
                required: true
            },
        }
    }
</script>

<style scoped>
    .menu-items-wrapper .ivu-menu-item, .menu-items-wrapper .ivu-menu-submenu {
        white-space: nowrap;
    }
    .menu-items-wrapper {
        height: calc(100vh - 64px);
        overflow-y: auto;
    }
</style>