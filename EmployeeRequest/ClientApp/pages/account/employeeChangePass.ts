﻿import { Vue, Component, Watch } from "vue-property-decorator";
import { EventType, ResponseType, getNotificationType } from "../../assets/utilities";
import * as CryptoJS from "crypto-js";

@Component({})
export default class AccountEmployeeChangePass extends Vue {
    user = {
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
    };

    passRegexProps: {
        regexPattern: string | null,
        regexError: string | null,
    } = {
            regexPattern: null,
            regexError: null,
        };

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

    changePass() {
        if (this.user.newPassword !== this.user.repeatPassword) {
            //@ts-ignore
            this.$root.$children[0].popupNotificationWidget.show(this.$MessagesLibrary.get('NewPasswordAndNewPasswordRepeateAreNotMatch'), 'error');
            return false;
        }

        if (this.user.oldPassword == this.user.newPassword) {
            //@ts-ignore
            this.$root.$children[0].popupNotificationWidget.show(this.$MessagesLibrary.get('YouCanNotSetOldPassword'), 'error');
            return false;
        }

        if (this.passRegexProps.regexPattern) {
            const match = this.user.newPassword.match(this.passRegexProps.regexPattern);
            if (!match) {
                //@ts-ignore
                this.$root.$children[0].popupNotificationWidget.show(this.passRegexProps.regexError || this.$MessagesLibrary.get('InvalidPassword'), 'error');
                return false;
            }
        }

        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Account/ChangePassword",
            data: {
                oldPass: this.encrypt(this.user.oldPassword),
                newPass: this.encrypt(this.user.newPassword)
            },
            dataType: "json",
            success: result => {
                debugger;
                if (result.ResponseType === ResponseType.Ok) {
                    this.$router.push("/account/login");
                } else {
                    //@ts-ignore
                    this.$root.$children[0].popupNotificationWidget.show(result.Message,
                        getNotificationType(result.ResponseType));
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    mounted() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "GET",
            url: "/api/Account/GetPassRegexProps",
            dataType: "json",
            success: result => {
                this.passRegexProps.regexPattern = result.RegexPattern;
                this.passRegexProps.regexError = result.RegexError;
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }
} 