<template>
    <Row :gutter="24">
        <i-col :span="9">
            <Card>
                <p slot="title">
                    请先选择月份
                </p>
                <p style="margin-bottom: 12px; color: gray">不可选的月份已有数据，请到【数据查看】中修改</p>
                <DatePicker ref="monthPicker"
                            type="month"
                            placeholder="选择评估月"
                            :options="options"
                            @on-change="handleSelectMonth">
                </DatePicker>
            </Card>
        </i-col>
        <i-col :span="15">
            <Card v-if="file_name">
                <Upload action=""
                        type="drag"
                        :before-upload="handleBeforeUpload">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或拖动上传</p>
                    </div>
                </Upload>
                <div v-if="file">文件: {{ file.name }}</div>
                <div style="text-align: right">
                    <Button type="text" style="margin-right: 12px" @click="handleCancel">取消</Button>
                    <Button type="primary" @click="handleUpload" :loading="loading">
                        <span v-if="!loading">确定</span>
                        <span v-if="loading">上传中</span>
                    </Button>
                </div>
            </Card>
        </i-col>
    </Row>
</template>

<script>
    import {dateStr} from "@/utils/func";

    export default {
        name: "DataUpload",
        data() {
            return {
                file_name: '',
                file: null,
                options: null,
                existed: [],
                loading: false
            }
        },
        methods: {
            // 该方法与DataItemCard组件的方法一致
            handleBeforeUpload(file) {
                if (!(/^.+\.xlsx$/).test(file.name)) {
                    this.$Message.error('请上传.xlsx文件');
                    return false;
                }
                if (file.size > 1024 * 1024 * 20) {
                    this.$Message.error('文件大小超过20M，请检查是否有误');
                    return false;
                }
                this.file = file;
                return false;
            },
            handleSelectMonth(date) {
                this.file_name = date.split('-').join('');
            },
            handleCancel() {
                this.file = null;
            },
            handleUpload() {
                if (!this.file) {
                    this.$Message.error('文件不能为空');
                    return;
                }
                let data = new FormData();
                data.append('file_name', this.file_name);
                data.append('file', this.file);
                this.loading = true;
                this.$api.data.uploadData(data).then(() => {
                    this.$Message.success('上传成功！');
                    this.file = null;
                    this.$refs.monthPicker.handleClear();
                    this.setExisted();
                    this.loading = false;
                }).catch(error => {
                    this.$Message.error('数据解析有误，详见控制台报错');
                    console.log(error.response);
                    this.loading = false;
                })
            },
            setExisted() {
                this.$api.data.datatList().then((response) => {
                    Promise.resolve(response.data.forEach((value) => {
                        this.existed.push(value.file_name);
                    })).then(() => {
                        const existed = this.existed;
                        this.options = {
                            disabledDate(date) {
                                return existed.indexOf(dateStr(date)) > -1;
                            }
                        }
                    })
                })
            }
        },
        mounted() {
            this.setExisted();
        }
    }
</script>

<style scoped>

</style>