<template>
    <Card class="item">
        <div>
            <h1>{{ data_item.file_name }}</h1>
            <pre>文件大小：{{ data_item.file_size | fileSize }}</pre>
            <p>
                <Badge type="normal" :text="data_item.created_by"></Badge>
                创建于：{{ data_item.created | datetime }}
            </p>
            <p v-if="data_item.modified_by">
                <Badge type="normal" :text="data_item.modified_by"></Badge>
                最后修改于：{{ data_item.modified | datetime }}
            </p>
            <ButtonGroup style="position: absolute; right: 24px; bottom: 16px">
                <Button type="primary" shape="circle" @click="handleDownload">
                    下载
                </Button>
                <Button type="warning" shape="circle" @click="modalForModify = true">
                    修改
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
                let file = new FormData();
                file.append('file', this.file);
                this.$api.data.updateData(this.data_item.id, file).then(() => {
                    this.$Message.success('修改成功！');
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    .item {
        margin-bottom: 12px;
    }
</style>