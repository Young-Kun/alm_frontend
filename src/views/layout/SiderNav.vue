<template>
    <div>
        <div id="brand" @click="backToIndex">
            ALM
        </div>
        <Menu ref="siderMenu" theme="dark" accordion width="auto" id="sider-menu" :active-name="active"
              :open-names="open" v-if="siderStatus === 'expanded'">
            <data-based-menu-items :menu-list-data=siderMenuList></data-based-menu-items>
        </Menu>
    </div>
</template>

<script>
    import DataBasedMenuItems from "@/components/layout/DataBasedMenuItems";
    import {mapGetters} from 'vuex';

    export default {
        name: "SiderNav",
        data() {
            return {
                active: '',
                open: []
            }
        },
        computed: {
            ...mapGetters([
                'siderMenuList',
                'siderStatus'
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
        },
        mounted() {
            const active = this.$route.path.split('/').reverse()[0];
            const open = active.split('-')[0];
            this.active = active;
            this.open = [open];
            this.$nextTick(() => {
                this.$refs.siderMenu.updateOpened();
                this.$refs.siderMenu.updateActiveName();
            })
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