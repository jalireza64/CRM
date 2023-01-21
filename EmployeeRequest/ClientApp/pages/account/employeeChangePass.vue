<template>
    <div class="rtl">
        <form class="bs-docs-example k-content" @submit.prevent="changePass">
            <div class="title k-alt">
                <i class="fa fa-key"></i>
                {{$CaptionsLibrary.get('ChangePassword')}}
            </div>
            <div class="container">
                <div class="form-group break-line">
                    <label for="oldPassword">{{$CaptionsLibrary.get("OldPassword")}}</label>
                    <input id="oldPassword" v-model="user.oldPassword" type="password" class="k-textbox width-100" />
                </div>
                <div class="form-group break-line">
                    <label for="newPassword">{{$CaptionsLibrary.get("NewPassword")}}</label>
                    <input id="newPassword" v-model="user.newPassword" type="password" class="k-textbox width-100" />
                </div>
                <div class="form-group break-line">
                    <label for="repeatPassword">{{$CaptionsLibrary.get("DuplicateNewPassword")}}</label>
                    <input id="repeatPassword" v-model="user.repeatPassword" type="password" class="k-textbox width-100" />
                </div>
                <div class="form-group break-line">
                    <kendo-button class="k-button k-primary">{{$CaptionsLibrary.get("ChangePassword")}}</kendo-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts" src="./employeeChangePass.ts">
</script>

<style scoped>
    .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 20px;
    }
</style>
