<template>
    <Card class="item" style="height: 175px">
        <div>
            <h1>{{ data_item.file_name }}</h1>
            <pre>文件大小：{{ data_item.file_size | fileSize }}</pre>
            <p class="inf">
                <Badge type="normal" :text="data_item.created_by"></Badge>
                创建于：{{ data_item.created | datetime }}
            </p>
            <p class="inf" v-if="data_item.modified_by">
                <Badge type="normal" :text="data_item.modified_by"></Badge>
                最后修改于：{{ data_item.modified | datetime }}
            </p>
            <ButtonGroup style="position: absolute; right: 24px; bottom: 21px">
                <Button type="primary" shape="circle" @click="handleDownload">
                    下载
                </Button>
                <Button type="warning" shape="circle" @click="modalForModify = true" :loading="loading">
                    <span v-if="loading">修改中...</span>
                    <span v-if="!loading">修改</span>
                </Button>
            </ButtonGroup>
            <Modal v-model="modalForModify"
                   title="修改文件"
                   :mask-closable="false"
                   @on-cancel="handleCancel"
                   @on-ok="handleUpload">
                <Upload action=""
                        type="drag"
                        :before-upload="handleBeforeUpload">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或拖动上传</p>
                    </div>
                </Upload>
                <div v-if="file">文件: {{ file.name }}</div>
            </Modal>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "ReportInfCard",
        data() {
            return {
                modalForModify: false,
                file: null,
                loading: false
            }
        },
        props: [
            'data_item'
        ],
        methods: {
            handleDownload() {
                this.$api.data.downloadData(this.data_item.file);
            },
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
            handleCancel() {
                this.file = null;
            },
            handleUpload() {
                if (!this.file) {
                    this.$Message.error('文件不能为空');
                    return false;
                }
                this.loading = true;
                let file = new FormData();
                file.append('file', this.file);
                this.$api.data.updateData(this.data_item.file_name, file).then((response) => {
                    this.$Message.success('修改成功！');
                    this.file = null;
                    this.data_item.modified = response.data.modified;
                    this.data_item.file_size = response.data.file_size;
                    this.data_item.modified_by = response.data.modified_by;
                    this.loading = false;
                }).catch(error => {
                    this.$Message.error('修改失败，详见console');
                    console.log(error.response)
                })
            }
        }
    }
</script>

<style scoped>
    .item {
        margin-bottom: 12px;
    }

    .inf {
        margin: 5px 0;
    }
</style>