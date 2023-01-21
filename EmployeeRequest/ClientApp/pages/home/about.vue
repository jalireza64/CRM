<template>
    <div class="rtl">
        <kendo-panelbar ref="userInfoPanel" id="userInfoPanel" class="panel-bar">
            <div id="item1">
                <i class="fa fa-users"></i>&nbsp;
                {{$CaptionsLibrary.get('PersonnelInfo')}}
                <div>
                    <div class="container">
                        <div class="form-group break-line">
                            <label><span>{{$CaptionsLibrary.get("LoginTime")}}</span>: {{$UserInfo.CreatedSessionDateTime}}</label>
                        </div>
                        <div class="form-group">
                            <label><span>{{$CaptionsLibrary.get("DateAndTimeOfLastLogin")}}</span>: {{$UserInfo.DateAndTimeOfLastLogin}}</label>
                        </div>
                        <div class="form-group">
                            <label><span>{{$CaptionsLibrary.get("NetworkAddress")}}</span>: {{$UserInfo.IpAddressOfLastLogin}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </kendo-panelbar>
        <kendo-panelbar ref="lockInfoPanel" id="lockInfoPanel" class="panel-bar">
            <div id="item2">
                <i class="fa fa-lock"></i>&nbsp;
                {{$CaptionsLibrary.get('LockInformation')}}
                <div>
                    <div class="container">
                        <div class="form-group break-line">
                            <label><span>{{$CaptionsLibrary.get("EndUser")}}</span>: {{customerName}}</label>
                        </div>
                        <div class="form-group">
                            <label><span>{{$CaptionsLibrary.get("Version")}}</span>: {{version}}</label>
                        </div>
                        <div class="form-group">
                            <label><span>{{$CaptionsLibrary.get("MobileVersion")}}</span>: <abbr v-show="mobileLockState">{{$CaptionsLibrary.get("Have")}}</abbr><span v-show="!mobileLockState">{{$CaptionsLibrary.get("HaveNot")}}</span></label>
                        </div>
                    </div>
                </div>
            </div>
        </kendo-panelbar>
    </div>
</template>

<script lang="ts" src="./about.ts">
</script>

<style scoped>
    .panel-bar{
        margin-bottom:20px;
    }

    .container {
        display: grid;
        grid-template-columns: repeat(1, minmax(300px, 1fr));
        grid-gap: 20px;
        padding:10px;
    }

    .form-group span{
        font-weight:bold;
    }

</style>
