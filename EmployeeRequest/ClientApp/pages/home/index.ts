import { Vue, Component, Watch } from "vue-property-decorator";
import { EventType, getCurrentDate, formatNumber } from "../../assets/utilities";
import SvDatepicker from "../../components/datepicker/datepicker.vue";
import '@progress/kendo-ui/js/kendo.buttongroup.js';

@Component({
    components: {
        SvDatepicker
    }
})
export default class HomeIndex extends Vue {

    




    mounted() {
        $('.app').removeClass('back');
        //(this.$refs.profilePanel as any).kendoWidget().expand($("#item1"), false);
        //$('#item1 > span').addClass('k-state-selected');

        //(this.$refs.alternatePanel as any).kendoWidget().expand($("#item2"), false);
        //$('#item2 > span').addClass('k-state-selected');
    }
} 