<template>
    <Row :gutter="24">
        <i-col :span="9">
            <Card>
                <p slot="title">
                    请先选择月份
                </p>
                <p style="margin-bottom: 12px; color: gray">不可选的月份已有数据，请到【数据查看】中修改</p>
                <DatePicker type="month"
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
                    <Button type="primary" @click="handleUpload">确定</Button>
                </div>
            </Card>
        </i-col>
    </Row>
</template>

<script>
    export default {
        name: "DataUpload",
        data() {
            return {
                file_name: '',
                file: null,
                options: null,
                existed: []
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
                let data = new FormData();
                data.append('file_name', this.file_name);
                data.append('file', this.file);
                this.$api.data.uploadData(data).then(() => {
                    this.$Message.success('上传成功！');
                    this.file = null;
                    this.setExisted();
                }).catch(error => {
                    console.log(error.response)
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
                                const y = date.getFullYear().toString();
                                let m = date.getMonth() + 1;
                                if (m < 10) {
                                    m = '0' + m;
                                } else {
                                    m = m.toString();
                                }
                                const ym = y + m;
                                return existed.indexOf(ym) > -1;
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