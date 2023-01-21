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
export default class CompanyIndex extends Vue {
    kendoMessages: any = null;

    selectedCompany: any = null;

    async beforeCreate() {
        //@ts-ignore
        this.kendoMessages = await import('../../assets/kendo.messages.fa-IR.js');
    }

    initialModel = {
        comp_Code: "",
        desc1: "",
        ceo: "",
        tel_No_1: "",
        tel_No_2: "",
        fax_No: "",
        cell_Phone: "",
        resp_Name: "",
        e_mail: "",
        webSite: "",
        address: "",
        consistence_user: "",
        prdIdList: [],
        operationType: OperationType.Add,
        operationTypeDesc: "",
        isShowWindow: false};

    companyModel = { ...this.initialModel };

    reportDataSource: any = [];

    loadReportDataSource() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Company/getAllCompanies",
            dataType: "json",
            success: result => {
                if (result != null) {
                    var dataSource = new kendo.data.DataSource({
                        pageSize: 500,
                        data: result
                    });
                    this.reportDataSource = dataSource;
                    (this.$refs.CompanyWindow as any).kendoWidget().center().close()
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    showAdd() {
        this.clearForm();
        this.companyModel.isShowWindow = true;
        this.companyModel.operationType = OperationType.Add;
        this.companyModel.operationTypeDesc = this.$CaptionsLibrary.get('Add');
        (this.$refs.CompanyWindow as any).kendoWidget().center().open()
    }

    showEdit() {
        debugger;
        this.companyModel.isShowWindow = true;
        this.companyModel.operationType = OperationType.Modify;
        this.companyModel.operationTypeDesc = this.$CaptionsLibrary.get('Edit');
        this.companyModel.comp_Code = this.selectedCompany.COMP_CODE;
        this.companyModel.desc1 = this.selectedCompany.DESC1;
        this.companyModel.ceo = this.selectedCompany.CEO;
        this.companyModel.tel_No_1 = this.selectedCompany.TEL_NO_1;
        this.companyModel.tel_No_2 = this.selectedCompany.TEL_NO_2;
        this.companyModel.fax_No = this.selectedCompany.FAX_NO;
        this.companyModel.cell_Phone = this.selectedCompany.CELL_PHONE;
        this.companyModel.resp_Name = this.selectedCompany.RESP_NAME;
        this.companyModel.e_mail = this.selectedCompany.E_MAIL;
        this.companyModel.webSite = this.selectedCompany.WEB_SITE;
        this.companyModel.address = this.selectedCompany.ADDRESS;
        this.companyModel.consistence_user = this.selectedCompany.CONSISTENCE_USER;
        (this.$refs.CompanyWindow as any).kendoWidget().center().open()
    }

    showProduct() {
        this.companyModel.prdIdList = this.selectedCompany.ProductIds.map(function (ids: any) {
            return ids;
        });
        (this.$refs.ProductWindow as any).kendoWidget().center().open()
    }

    add() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Company/addCompany",
            data: {
                company: this.companyModel
            },
            dataType: "json",
            success: result => {
                debugger;
                if (result.ResponseType === ResponseType.Ok) {
                    //@ts-ignore
                    this.$root.$children[0].popupNotificationWidget.show(result.Message,getNotificationType(result.ResponseType));
                    (this.$refs.CompanyWindow as any).kendoWidget().close();
                    this.selectedCompany = null;
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
                company: this.companyModel
            },
            dataType: "json",
            success: result => {
                debugger;
                if (result.ResponseType === ResponseType.Ok) {
                    //@ts-ignore
                    this.$root.$children[0].popupNotificationWidget.show(result.Message, getNotificationType(result.ResponseType));
                    (this.$refs.CompanyWindow as any).kendoWidget().close();
                    this.selectedCompany = null;
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
        if (this.companyModel.operationType == OperationType.Add) {
            this.add()
        } else {
            this.modify();
        }
    }

    remove() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Company/removeCompany",
            data: {
                compCode: this.selectedCompany.COMP_CODE
            },
            dataType: "json",
            success: result => {
                if (result.ResponseType === ResponseType.Ok) {
                    //@ts-ignore
                    this.$root.$children[0].popupNotificationWidget.show(result.Message, getNotificationType(result.ResponseType));
                    this.selectedCompany = null;
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
        this.selectedCompany = grid.dataItem(grid.select());
    }

    clearForm() {
        this.companyModel = { ...this.initialModel };
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
                    //(this.$refs.ProductWindow as any).kendoWidget().center().open()
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    modifyCompProduct() {
        debugger;
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Company/modifyCompProduct",
            data: {
                compCode: this.selectedCompany.COMP_CODE,
                prdIdList: this.companyModel.prdIdList
            },
            dataType: "json",
            success: result => {
                debugger;
                if (result.ResponseType === ResponseType.Ok) {
                    //@ts-ignore
                    this.$root.$children[0].popupNotificationWidget.show(result.Message, getNotificationType(result.ResponseType));
                    (this.$refs.ProductWindow as any).kendoWidget().close();
                    this.selectedCompany = null;
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

    saleUsers = [];

    getAllSaleUsers() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Company/getAllSaleusers",
            dataType: "json",
            success: result => {
                if (result != null) {
                    this.saleUsers = result;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    mounted() {
        this.loadReportDataSource();
        this.getAllProducts();
        this.getAllSaleUsers();
    }
} 