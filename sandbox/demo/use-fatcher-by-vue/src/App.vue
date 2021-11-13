<template>
    <div>
        <div>fatcher test</div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
            <button @click="add">添加token</button>
            <button @click="remove">删除token</button>
            <button @click="loginBtn">登录</button>
            <button @click="getInfo">获取信息</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { login, getCheckInfo } from './api/platform';

const add = () => {
    sessionStorage.setItem('token', '123');
};
const remove = () => {
    sessionStorage.removeItem('token');
};
const loginBtn = () => {
    login({
        loginCode: 'yanfa123',
        password: '111111',
    }).then(res => {
        console.log(res);
    });
};
const getInfo = () => {
    getCheckInfo().then(res => {
        console.log(res);
    });
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
