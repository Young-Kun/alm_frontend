<template>
    <Row type="flex" justify="center" style="margin-top: 10vh">
        <i-col :xs="24" :lg="8" :xxl="4">
            <Form ref="loginForm"
                  :model="loginModel"
                  :rules="loginRule"
                  @keydown.enter.native="handleLogin('loginForm')">
                <div class="login-header">
                    <Divider><h1>欢迎登录</h1></Divider>
                </div>
                <FormItem prop="username">
                    <i-input prefix="ios-person"
                             type="text"
                             clearable
                             maxlength="125"
                             v-model="loginModel.username"
                             placeholder="用户名"
                             v-focus>
                    </i-input>
                </FormItem>
                <FormItem prop="password">
                    <i-input prefix="ios-lock"
                             type="password"
                             password
                             v-model="loginModel.password"
                             placeholder="密码">
                    </i-input>
                </FormItem>
                <FormItem style="margin-bottom: 0">
                    <Checkbox v-model="loginModel.rememberMe">记住我{{ rememberDays }}天</Checkbox>
                </FormItem>
                <FormItem>
                    <Button type="primary" long @click="handleLogin('loginForm')">登录</Button>
                </FormItem>
            </Form>
        </i-col>
    </Row>
</template>

<script>
    import cookie from '@/custom/cookie'
    import {mapActions} from 'vuex'

    export default {
        name: 'Login',
        data() {
            return {
                rememberDays: 7,
                loginModel: {
                    username: '',
                    password: '',
                    rememberMe: true
                },
                loginRule: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'change'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'}
                    ]
                }
            }
        },
        methods: {
            ...mapActions([
                'setUser'
            ]),
            handleLogin(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        const {username, password, rememberMe} = this.loginModel;
                        const {rememberDays} = this;
                        this.$api.user.logIn(username, password).then(response => {
                            const expireDays = rememberMe ? rememberDays : null;
                            cookie.setCookie('username', username, expireDays);
                            cookie.setCookie('token', response.data.token, expireDays);
                            this.setUser();
                            this.$Message.success('登录成功！');
                            const redirect = this.$route.query.redirect;
                            if (redirect) {
                                console.log(redirect);
                                this.$router.push(redirect);
                            }
                        }).catch(error => {
                            this.$Message.error('用户名或密码错误！');
                            console.log(error.response)
                        })
                    } else {
                        this.$Message.error('数据格式错误！')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login-header {
        text-align: center;
        margin-bottom: 24px;
    }
</style>
