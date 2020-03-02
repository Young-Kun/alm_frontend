<template>
    <div>
        <Row type="flex">
            <Card style="width: 250px">
                <DatePicker ref="monthStart"
                            type="month"
                            :options="quarterOptions"
                            v-model="quarter"
                            format="yyyyMM"
                            @on-change="handleQuarterChange"
                            placeholder="请选择季度">
                </DatePicker>
            </Card>
            <Card style="margin-left: auto; margin-right: 12px; display: flex; align-items: center">
                <div class="icon" title="导出为PDF" @click="exportToPDF"><i class="fa fa-file-pdf-o"></i></div>
                <div class="icon" title="窗口最大化" @click="handleMaximize"><i class="fa fa-window-maximize"></i></div>
                <div class="icon" title="全屏" @click="handleScreenFull"><i class="fa fa-fw fa-arrows-alt"></i></div>
            </Card>
            <Card style="display: flex;align-items: center">
                <Page :current="thePage" :total="50" :page-size="1" simple @on-change="handleFlick"/>
            </Card>
        </Row>
        <div class="slide-wrapper" :class="[maximize]" id="slide-wrapper">
            <Card class="slide" :style="{height: slideHeight}" v-resize="handleResize"
                  ref="slide" dis-hover :bordered="false">
                <page1 class="page" v-show="thePage === 1"></page1>
                <page2 class="page" v-show="thePage === 2"></page2>
            </Card>
        </div>
    </div>
</template>

<script>
    import screenfull from 'screenfull';
    import Page1 from "@/components/report/Page1";
    import Page2 from "@/components/report/Page2";

    export default {
        name: "ReportQuarter",
        components: {
            Page1,
            Page2
        },
        data() {
            return {
                quarter: '201912',
                slideHeight: '',
                maximize: '',
                fullScreen: '',
                thePage: 1,
                quarterOptions: {
                    disabledDate(date) {
                        return (date.getMonth() + 1) % 3 !== 0;
                    }
                }
            }
        },
        methods: {
            handleQuarterChange() {
                console.log(1);
            },
            handleResize() {
                this.slideHeight = this.$refs.slide.$el.clientWidth / 1.7777 + 'px';
            },
            handleMaximize() {
                this.maximize = 'maximize';
                this.$Message.info(`按 <b>[esc]</b> 键退出`);
            },
            handleScreenFull() {
                if (screenfull.isEnabled) {
                    screenfull.request(document.getElementById('slide-wrapper'));
                }
            },
            exportToPDF() {
                this.$getPdf('page', '1')
            },
            exit(e) {
                if (e.key === 'Escape') {
                    this.maximize = '';
                }
            },
            handleFlick(page) {
                this.thePage = page;
            }
        },
        mounted() {
            this.handleResize();
            document.addEventListener('keyup', this.exit);
        },
        beforeDestroy() {
            document.removeEventListener('keyup', this.exit);
        }
    }
</script>

<style scoped>
    .icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
    }

    .icon:hover {
        background: #f8f8f9;
        font-size: large;
    }

    .slide {
        width: 100%;
        margin-top: 12px;
    }

    .slide-wrapper.maximize {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 1001;
        display: flex;
        align-items: center;
        background: #fff;
    }

    .page {
        width: 100%;
        height: 100%;
    }
</style>