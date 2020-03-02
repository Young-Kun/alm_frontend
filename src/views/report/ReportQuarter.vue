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
                <div class="icon" title="窗口最大化" @click="handleMaximize"><i class="fa fa-window-maximize"></i></div>
                <div class="icon" title="全屏"><i class="fa fa-fw fa-arrows-alt"></i></div>
            </Card>
            <Card style="display: flex;align-items: center">
                <Page :current="2" :total="50" :page-size="1" simple/>
            </Card>
        </Row>
        <div class="slide-wrapper" :class="[maximize]">
            <Card class="slide" :style="{height: slideHeight}" v-resize="handleResize"
                  ref="slide" dis-hover :bordered="false">

            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ReportQuarter",
        data() {
            return {
                quarter: '201912',
                slideHeight: '',
                maximize: '',
                fullScreen: '',
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
                this.$Message.info('按esc键退出');
            },
            exit(e) {
                if (e.keyCode === 27) {
                    this.maximize = '';
                    this.fullScreen = '';
                }
            }
        },
        mounted() {
            this.handleResize();
            document.addEventListener('keydown', this.exit);
        },
        beforeDestroy() {
            document.removeEventListener('keydown', this.exit);
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
</style>