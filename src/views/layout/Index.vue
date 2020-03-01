<template>
    <Layout :class="[siderStatus]">
        <Sider id="sider" hide-trigger :width="siderStatus === 'expanded'? 200 : 60">
            <sider-nav></sider-nav>
        </Sider>
        <Layout id="insider-wrapper">
            <Header id="header">
                <top-nav></top-nav>
            </Header>
            <Content id="content">
                <router-view></router-view>
            </Content>
            <Footer>
                <footer-note></footer-note>
            </Footer>
        </Layout>
    </Layout>
</template>

<script>
    import TopNav from "@/views/layout/TopNav";
    import SiderNav from "@/views/layout/SiderNav";
    import FooterNote from "@/views/layout/FooterNote";
    import {mapGetters} from 'vuex';

    export default {
        name: "Index",
        computed: {
            ...mapGetters([
                'siderStatus'
            ])
        },
        components: {
            FooterNote,
            SiderNav,
            TopNav,
        }
    }
</script>

<style scoped>
    #sider {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        z-index: 1000;
    }

    #insider-wrapper {
        min-height: 100vh;
        padding-top: 64px;
    }

    .expanded #insider-wrapper {
        padding-left: 200px;
        transition: all .5s ease;
    }

    .collapsed #insider-wrapper {
        padding-left: 60px;
        transition: all .5s ease;
    }

    #header {
        position: fixed;
        top: 0;
        right: 0;
        background: #fff;
        z-index: 1000;
        box-shadow: 0 0 6px 1px rgba(53, 64, 82, 0.1);
        padding-left: 0;
    }

    .expanded #header {
        width: calc(100% - 200px);
        transition: all .2s ease-in-out;
    }

    .collapsed #header {
        width: calc(100% - 60px);
        transition: all .2s ease-in-out;
    }

    #content {
        padding: 24px;
    }
</style>
