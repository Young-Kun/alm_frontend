<template>
    <div>
        <div id="brand" @click="backToIndex">
            ALM
        </div>
        <Menu ref="siderMenu" theme="dark" accordion width="auto" id="sider-menu" :active-name="active"
              :open-names="open" v-show="siderStatus === 'expanded'" @click.native="updateActive">
            <data-based-menu-items :menu-list-data=siderMenuList></data-based-menu-items>
        </Menu>
        <div v-show="siderStatus === 'collapsed'" @click="updateActive">
            <data-based-icons :menu-list-data="siderMenuList" :active="active" :open="open[0]"></data-based-icons>
        </div>
    </div>
</template>

<script>
    import DataBasedMenuItems from "@/components/layout/DataBasedMenuItems";
    import DataBasedIcons from "@/components/layout/DataBasedIcons";
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
            DataBasedIcons,
        },
        methods: {
            backToIndex() {
                this.$router.push({name: 'index'}).catch(() => {
                });
            },
            updateActive() {
                const active = this.$route.path.split('/').reverse()[0];
                const open = active.split('-')[0];
                this.active = active;
                this.open = [open];
                this.$nextTick(() => {
                    this.$refs.siderMenu.updateOpened();
                    this.$refs.siderMenu.updateActiveName();
                })
            }
        },
        mounted() {
            this.updateActive();
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