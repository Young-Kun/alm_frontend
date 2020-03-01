<template>
    <div>
        <div id="brand" @click="backToIndex">
            ALM
        </div>
        <Menu ref="siderMenu" theme="dark" accordion width="auto" id="sider-menu" :active-name="active"
              :open-names="open" v-if="siderStatus === 'expanded'">
            <data-based-menu-items :menu-list-data=siderMenuList></data-based-menu-items>
        </Menu>
        <div v-if="siderStatus === 'collapsed'">
            <data-based-tooltips :menu-list-data="siderMenuList"></data-based-tooltips>
        </div>
    </div>
</template>

<script>
    import DataBasedMenuItems from "@/components/layout/DataBasedMenuItems";
    import DataBasedTooltips from "@/components/layout/DataBasedTooltips";
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
            DataBasedTooltips,
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
            if (this.siderStatus === 'expanded') {
                this.$nextTick(() => {
                    this.$refs.siderMenu.updateOpened();
                    this.$refs.siderMenu.updateActiveName();
                })
            }
        }
    }
</script>

<style scoped>
    #brand {
        height: 64px;
        line-height: 64px;
        color: #fff;
        text-align: center;
        border-bottom: 1px solid #101117;
        cursor: pointer;
    }

    .expanded #brand {
        font-size: x-large;
        transition: all .2s ease-in-out;
    }

    .collapsed #brand {
        font-size: large;
        transition: all .2s ease-in-out;
    }
</style>