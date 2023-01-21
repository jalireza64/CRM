import { Vue, Component } from "vue-property-decorator";
import { EventType, ResponseType as ResponseType, getNotificationType } from "../../assets/utilities";

@Component({

})
export default class HomeAbout extends Vue {

    calculationFaults = [];

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

    customerName = "";

    getCustomerName() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/shared/GetFinalCustomerName",
            dataType: "json",
            success: result => {
                if (result != null) {
                    this.customerName = result;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    mobileLockState = true;

    getMobileLockInformation() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Shared/GetMobileLockInformation",
            dataType: "json",
            success: result => {
                if (result != null) {
                    if (result.ResponseType === ResponseType.Ok) {
                        this.mobileLockState = result.Data;
                    } else {
                        //@ts-ignore
                        this.$root.$children[0].popupNotificationWidget.show(result.Message,
                            getNotificationType(result.ResponseType));
                    }
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    mounted() {
        this.getCustomerName();
        this.getVersion();
        this.getMobileLockInformation();
        (this.$refs.userInfoPanel as any).kendoWidget().expand($("#item1"), false);
        $('#item1 > span').addClass('k-state-selected');

        (this.$refs.lockInfoPanel as any).kendoWidget().expand($("#item2"), false);
        $('#item2 > span').addClass('k-state-selected');
    }
} 