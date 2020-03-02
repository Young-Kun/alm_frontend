<template>
    <Row type="flex">
        <span id="sider-toggle" @click="handleSider">
            <i class="fa fa-outdent fa-fw"></i>
        </span>
        <!--左边菜单-->
        <Menu mode="horizontal" theme="light" class="menu">
            <MenuItem name="1" :to="{name:'test1'}">
                <Icon type="ios-paper"/>
                <span>测试1</span>
            </MenuItem>
        </Menu>
        <!--右边菜单-->
        <Dropdown trigger="click" v-if="username">
        <span>
            {{ username }}
            <Icon type="ios-arrow-down"></Icon>
        </span>
            <DropdownMenu slot="list">
                <DropdownItem @click.native="handleLogout">
                    <i class="fa fa-sign-out"></i>
                    退出
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </Row>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import cookie from "@/utils/cookie";

    export default {
        name: "TopNav",
        computed: {
            ...mapGetters([
                'username',
                'siderStatus',
            ])
        },
        methods: {
            ...mapActions([
                'setUser',
                'collapseSider',
                'expandSider',
            ]),
            handleLogout() {
                cookie.delCookie('username');
                cookie.delCookie('token');
                Promise.resolve(this.setUser()).then(() => {
                    this.$router.go(0);
                    this.$Message.success('退出成功');
                });
            },
            handleSider() {
                this.siderStatus === 'expanded' ? this.collapseSider() : this.expandSider();
            }
        }
    }
</script>

<style scoped>
    .menu {
        height: 64px;
        line-height: 64px;
        margin-right: auto;
    }

    .ivu-menu-horizontal.ivu-menu-light:after {
        height: 0;
    }

    .ivu-dropdown {
        cursor: pointer;
    }

    .ivu-dropdown:hover {
        color: #2d8cf0;
    }

    #sider-toggle {
        display: inline-block;
        padding: 0 12px;
        cursor: pointer;
    }

    #sider-toggle:hover {
        background: #f8f8f9;
    }

    .collapsed #sider-toggle i {
        transform: rotateY(180deg);
        transition: transform .5s ease;
    }

    .expanded #sider-toggle i {
        transition: transform .5s ease;
    }
</style>