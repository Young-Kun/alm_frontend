<template>
    <Layout>
        <Sider id="sider" hide-trigger>
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
    import TopNav from "@/views/TopNav";
    import SiderNav from "@/views/SiderNav";
    import FooterNote from "@/views/FooterNote";

    export default {
        name: "Index",
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
        padding-left: 200px;
        padding-top: 64px;
    }

    #header {
        position: fixed;
        top: 0;
        right: 0;
        width: calc(100% - 200px);
        background: #fff;
        z-index: 1000;
        box-shadow: 0 0 6px 1px rgba(53, 64, 82, 0.1);
    }

    #content {
        padding: 24px;
    }
</style>
