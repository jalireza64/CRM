import { Vue, Component } from "vue-property-decorator";
import * as CryptoJS from "crypto-js";
import { ResponseType, getNotificationType, EventType } from "../../assets/utilities";
@Component({

})
export default class AccountLogin extends Vue {
    canLoginByActiveDirectory = false;
    loginByActiveDirectory = false;
    CaptchaImage = "";
    user = {
        username: "",
        password: "",
        captchaText: "",
        loginType: 0
    };

    showLoginType() {
        $(this.$refs.loginByAd).slideToggle();
    }
    
    encrypt(value: string) {
        var key = CryptoJS.enc.Utf8.parse('8080808080808080');
        var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        return encrypted.toString();
    }

    login() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Account/Login",
            data: {
                //username: this.encrypt(this.user.username),
                //password: this.encrypt(this.user.password),
                captchaText: this.encrypt(this.user.captchaText),
                username: this.encrypt(this.user.username),
                password: this.encrypt(this.user.password),
            },
            dataType: "json",
            success: result => {
                if (result != null) {
                    debugger;
                    if (result.ResponseType === ResponseType.Ok) {
                        window.app.$emit(EventType.Login);
                        this.$router.push("/");
                    } else {
                        //@ts-ignore
                        this.$root.$children[0].popupNotificationWidget.show(result.Message, getNotificationType(result.ResponseType))
                    }
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    version = "";

    getVersion() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Shared/GetVersion",
            dataType: "json",
            success: result => {
                if (result != null) {
                    this.version = result;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    mounted() {
        $('.app').addClass('back');

        this.getCaptchaImage();
        this.getVersion();

        document.addEventListener("keyup", event => {
            if (event.getModifierState && event.getModifierState("CapsLock")) {
                this.showCapsLockNotification = true;
            } else {
                this.showCapsLockNotification = false;
            }
        });
    }

    showCapsLockNotification = false;

    getCaptchaImage() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Account/ShowCaptchaImageInByte",
            dataType: "json",
            success: result => {
                if (result != null) {
                    this.CaptchaImage = result.Data;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }
}
