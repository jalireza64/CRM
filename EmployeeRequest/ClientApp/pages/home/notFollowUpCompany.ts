import { Vue, Component, Watch } from "vue-property-decorator";
import { EventType, getCurrentDate, formatNumber, OperationType, ResponseType, getNotificationType } from "../../assets/utilities";
import '@progress/kendo-ui/js/kendo.buttongroup.js';
import SvDatepicker from "../../components/datepicker/datepicker.vue";

@Component({
    components: {
        SvDatepicker
    }
})
export default class HomeNotFollowUpCompany extends Vue {
    kendoMessages: any = null;

    selectedCompany: any = null;

    async beforeCreate() {
        //@ts-ignore
        this.kendoMessages = await import('../../assets/kendo.messages.fa-IR.js');
    }

    reportDataSource: any = [];

    loadReportDataSource() {
        window.app.$emit(EventType.StartWaiting);
        $.ajax({
            type: "POST",
            url: "/api/Home/GetNotFollowUpCompany",
            dataType: "json",
            success: result => {
                if (result != null) {
                    debugger;
                    var dataSource = new kendo.data.DataSource({
                        pageSize: 500,
                        data: result
                    });
                    this.reportDataSource = dataSource;
                }
            },
            complete: () => {
                window.app.$emit(EventType.EndWaiting);
            }
        });
    }

    reportGridSelect(e: any) {
        const grid = e.sender;
        this.selectedCompany = grid.dataItem(grid.select());
    }

    mounted() {
        this.loadReportDataSource();
    }
} 