<template>
    <div class="rtl" style="display:flex;align-items:center;height:100%;">

        <form class="container bs-docs-example k-content" @submit.prevent="login">
            <div class="title k-alt grid-header">
                <div class="grid-content-title-right">
                        <i class="fa fa-key"></i>
                        {{$CaptionsLibrary.get('Login')}}
                </div>
                <div class="grid-content-title-left">
                    {{version}}
                </div>
            </div>

            <span>{{$CaptionsLibrary.get("SaleManagementSystem")}}</span>
            <div class="form-group">
                <label for="username" style="display:none">{{$CaptionsLibrary.get("Username")}}</label>
                <k-input id="username" v-model="user.username" class="k-textbox width-100" :placeholder="$CaptionsLibrary.get('Username')" required />
            </div>
            <div class="form-group">
                <label for="password" style="display:none">{{$CaptionsLibrary.get("Password")}}</label>
                <k-input id="password" v-model="user.password" type="password" class="k-textbox width-100" :placeholder="$CaptionsLibrary.get('Password')" required />
            </div>
            <div class="form-group break-line k-block k-warning-colored" v-show="showCapsLockNotification">
                <div style="display:flex;align-items:center;">
                    <i class="fa fa-exclamation-triangle"></i>&nbsp;&nbsp;
                    <label style="direction:ltr">{{$CaptionsLibrary.get("CapsLockIsOn")}}</label>
                </div>
            </div>
            <div class="form-group">
                <div class="captcha-wrapper">
                    <k-input v-model="user.captchaText" type="text" class="width-100" :placeholder="$CaptionsLibrary.get('CaptchaText')" required />
                    <img class="captcha-image" :src="'data:img/png;base64,'+CaptchaImage" alt="Captcha Image" />
                    <kendo-button class="k-button k-primary" @click="getCaptchaImage"><i class="fa fa-sync"></i></kendo-button>
                </div>
            </div>
            <div class="form-group">
                <kendo-button class="k-button k-primary">{{$CaptionsLibrary.get("Entry")}}</kendo-button>
            </div>
        </form>

        <div class="copyright">
            Copyright © 2020 <a href="http://www.raadeen.ir" target="_blank">raadeen</a>. All rights reserved.
        </div>

    </div>
</template>

<script lang="ts" src="./login.ts">
</script>

<style scoped>
    .grid-header {
        display: flex;
        align-items: center;
    }

    .grid-content-title-right {
        flex: 1 1;
        text-align: right;
    }

    .grid-content-title-left {
        flex: 1 1;
        text-align: left;
    }

    .logo {
        width: 7rem;
        float: right;
    }

    .captcha-wrapper {
        display: flex;
        align-items: center;
    }

    .captcha-wrapper button{
        height:30px;
    }

    .container {
        margin: auto;
        width: 350px;
        text-align: center;
        display: grid;
        grid-row-gap: 1.5rem;
    }

    .captcha-image{
        height: 30px;
    }

    .box-center{
        direction:ltr;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -25px; 
    }

    .copyright{
        direction:ltr;
        width:100%;
        position: absolute;
        top: 99%;
        left: 1%;
        margin-top: -25px; 
    }
</style>
