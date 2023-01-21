import { Vue, Component, Watch } from "vue-property-decorator";
import { EventType, getCurrentDate, formatNumber, OperationType, ResponseType, getNotificationType } from "../../assets/utilities";
import '@progress/kendo-ui/js/kendo.buttongroup.js';
import SvDatepicker from "../../components/datepicker/datepicker.vue";
import CryptoJS from "crypto-js";

@Component({
    components: {
        SvDatepicker
    }
})
export default class SaleProcessIndex extends Vue {
    kendoMessages: any = null;

    selectedSaleDetail: any = null;

    async beforeCreate() {
        //@ts-ignore
        this.kendoMessages = await import('../../assets/kendo.messages.fa-IR.js');
    }

    initialModel = {
        comp_code: "",
        prd_id: "",
        desc1: "",
        det_id: 0,
        f_date: "",
        follow_date: "",
        state: "",
        fee: null,
        operationType: OperationType.Add,
        operationTypeDesc: "",
        isShowWindow: false,
        isShowFilterWindow: false,
        isShowInfoWindow: false,
    };

    saleDetailModel = { ...this.initialModel };

    reportDataSource: any = [];

    loadReportDataSource() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/SaleDetail/getAllSaleDetails",
            data: {
                COMP_CODE: this.saleDetailModel.comp_code,
                PRD_ID: this.saleDetailModel.prd_id
            },
            dataType: "json",
            success: result => {
                if (result != null) {
                    var dataSource = new kendo.data.DataSource({
                        pageSize: 500,
                        data: result
                    });
                    this.reportDataSource = dataSource;
                    this.getCompanyInfo();
                    (this.$refs.FilterWindow as any).kendoWidget().center().close()
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    showInfo() {
        this.saleDetailModel.isShowInfoWindow = true;
        (this.$refs.InfoWindow as any).kendoWidget().center().open()
    }

    showFilter() {
        this.saleDetailModel.isShowFilterWindow = true;

        (this.$refs.FilterWindow as any).kendoWidget().center().open()
    }

    showAdd() {
        this.clearForm();
        this.saleDetailModel.isShowWindow = true;
        this.saleDetailModel.operationType = OperationType.Add;
        this.saleDetailModel.operationTypeDesc = this.$CaptionsLibrary.get('Add');
        (this.$refs.SaleDetailWindow as any).kendoWidget().center().open()
    }

    showEdit() {
        debugger;
        this.saleDetailModel.isShowWindow = true;
        this.saleDetailModel.operationType = OperationType.Modify;
        this.saleDetailModel.operationTypeDesc = this.$CaptionsLibrary.get('Edit');
        this.saleDetailModel.comp_code = this.selectedSaleDetail.COMP_CODE;
        this.saleDetailModel.desc1 = this.selectedSaleDetail.DESC1;
        this.saleDetailModel.det_id = this.selectedSaleDetail.DET_ID;
        this.saleDetailModel.f_date = this.selectedSaleDetail.F_DATE;
        this.saleDetailModel.follow_date = this.selectedSaleDetail.FOLLOW_DATE;
        this.saleDetailModel.prd_id = this.selectedSaleDetail.PRD_ID;
        this.saleDetailModel.state = this.selectedSaleDetail.STATE;
        this.saleDetailModel.fee = this.selectedSaleDetail.FEE;
        (this.$refs.SaleDetailWindow as any).kendoWidget().center().open()
    }

    add() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/SaleDetail/addSaleDetail",
            data: {
                saleDetail: this.saleDetailModel
            },
            dataType: "json",
            success: result => {
                debugger;
                if (result.ResponseType === ResponseType.Ok) {
                    //@ts-ignore
                    this.$root.$children[0].popupNotificationWidget.show(result.Message,getNotificationType(result.ResponseType));
                    (this.$refs.SaleDetailWindow as any).kendoWidget().close();
                    this.selectedSaleDetail = null;
                    this.loadReportDataSource();
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

    modify() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Company/modifyCompany",
            data: {
                company: this.saleDetailModel
            },
            dataType: "json",
            success: result => {
                debugger;
                if (result.ResponseType === ResponseType.Ok) {
                    //@ts-ignore
                    this.$root.$children[0].popupNotificationWidget.show(result.Message, getNotificationType(result.ResponseType));
                    (this.$refs.SaleDetailWindow as any).kendoWidget().close();
                    this.selectedSaleDetail = null;
                    this.loadReportDataSource();
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

    operation() {
        if (this.saleDetailModel.operationType == OperationType.Add) {
            this.add()
        } else {
            this.modify();
        }
    }

    remove() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/SaleDetail/removeSaleDetail",
            data: {
                DetId: this.selectedSaleDetail.DET_ID
            },
            dataType: "json",
            success: result => {
                if (result.ResponseType === ResponseType.Ok) {
                    //@ts-ignore
                    this.$root.$children[0].popupNotificationWidget.show(result.Message, getNotificationType(result.ResponseType));
                    this.selectedSaleDetail = null;
                    this.loadReportDataSource();
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

    reportGridSelect(e: any) {
        debugger;
        const grid = e.sender;
        this.selectedSaleDetail = grid.dataItem(grid.select());
    }

    clearForm() {
        var prdId = this.saleDetailModel.prd_id;
        var CompCode = this.saleDetailModel.comp_code;
        this.saleDetailModel = { ...this.initialModel };
        this.saleDetailModel.prd_id = prdId;
        this.saleDetailModel.comp_code = CompCode;
    }

    companies = [];

    getAllCompanies() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Company/getAllCompanies",
            dataType: "json",
            success: result => {
                if (result != null) {
                    this.companies = result;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    products = [];

    getAllProducts() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Company/getAllProducts",
            dataType: "json",
            success: result => {
                if (result != null) {
                    this.products = result;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    saleStates = [];

    getAllSaleStates() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/SaleDetail/GetAllSaleStates",
            dataType: "json",
            success: result => {
                if (result != null) {
                    this.saleStates = result;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    companyModel = {};

    getCompanyInfo() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/SaleDetail/getCompanyInfo",
            dataType: "json",
            data: {
                COMP_CODE: this.saleDetailModel.comp_code
            },
            success: result => {
                if (result != null) {
                    debugger;
                    this.companyModel = result;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    mounted() {
        this.getAllSaleStates();
        this.getAllProducts();
        this.getAllCompanies();
    }
} 