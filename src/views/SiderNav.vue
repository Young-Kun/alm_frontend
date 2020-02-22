<template>
    <div>
        <div id="brand" @click="backToIndex">
            ALM
        </div>
        <Menu theme="dark" accordion width="auto" id="sider-menu" :open-names="['data']">
            <data-based-menu-items :menu-list-data=siderMenuList></data-based-menu-items>
        </Menu>
    </div>
</template>

<script>
    import DataBasedMenuItems from "@/components/DataBasedMenuItems";
    import {mapGetters} from 'vuex';

    export default {
        name: "SiderNav",
        computed: {
            ...mapGetters([
                'siderMenuList',
            ])
        },
        components: {
            DataBasedMenuItems,
        },
        methods: {
            backToIndex() {
                this.$router.push({name: 'index'}).catch(() => {
                });
            },
        }
    }
</script>

<style scoped>
    #brand {
        height: 64px;
        line-height: 64px;
        color: #fff;
        text-align: center;
        font-size: x-large;
        border-bottom: 1px solid #101117;
        cursor: pointer;
    }
</style>