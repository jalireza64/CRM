<template>
    <div class="rtl page">
        <kendo-window ref="InfoWindow" :title='$CaptionsLibrary.get("Information")' :visible="saleDetailModel.isShowInfoWindow" :modal="true" :width="'92%'" :resizable="false">
            <div class="container">
                <div class="form-group">
                    <label for="compCode">{{$CaptionsLibrary.get("Id")}}</label>
                    <input type="text" class="k-textbox width-100" id="compCode" v-model="companyModel.COMP_CODE" required />
                </div>
                <div class="form-group">
                    <label for="desc1">{{$CaptionsLibrary.get("Company")}}</label>
                    <input type="text" class="k-textbox width-100" id="desc1" v-model="companyModel.DESC1" required />
                </div>
                <div class="form-group">
                    <label for="respName">{{$CaptionsLibrary.get("Fullname")}}</label>
                    <input type="text" class="k-textbox width-100" id="respName" v-model="companyModel.RESP_NAME" required />
                </div>
                <div class="form-group break-line">
                    <label for="telNo1">{{$CaptionsLibrary.get("Tel")}}</label>
                    <input type="text" class="k-textbox width-100" id="telNo1" v-model="companyModel.TEL_NO_1" required />
                </div>
                <div class="form-group">
                    <label for="telNo2">{{$CaptionsLibrary.get("Tel")}}</label>
                    <input type="text" class="k-textbox width-100" id="telNo2" v-model="companyModel.TEL_NO_2" />
                </div>
                <div class="form-group">
                    <label for="cellPhone">{{$CaptionsLibrary.get("MobileNumber")}}</label>
                    <input type="text" class="k-textbox width-100" id="cellPhone" v-model="companyModel.CELL_PHONE" />
                </div>
                <div class="form-group">
                    <label for="faxNo">{{$CaptionsLibrary.get("Fax")}}</label>
                    <input type="text" class="k-textbox width-100" id="faxNo" v-model="companyModel.FAX_NO" />
                </div>
                <div class="form-group">
                    <label for="address">{{$CaptionsLibrary.get("Address")}}</label>
                    <input type="text" class="k-textbox width-100" id="address" v-model="companyModel.ADDRESS" required />
                </div>
                <div class="form-group">
                    <label for="email">{{$CaptionsLibrary.get("Email")}}</label>
                    <input type="text" class="k-textbox width-100" id="email" v-model="companyModel.E_MAIL" />
                </div>
                <div class="form-group">
                    <label for="webSite">{{$CaptionsLibrary.get("WebSite")}}</label>
                    <input type="text" class="k-textbox width-100" id="webSite" v-model="companyModel.WEBSITE" />
                </div>
                <div class="form-group">
                    <label for="ceo">{{$CaptionsLibrary.get("Ceo")}}</label>
                    <input type="text" class="k-textbox width-100" id="ceo" v-model="companyModel.CEO" />
                </div>
            </div>
        </kendo-window>
        <kendo-window ref="FilterWindow" :title='$CaptionsLibrary.get("Filter")' :visible="saleDetailModel.isShowWindow" :modal="true" :width="'92%'" :resizable="false">
            <form class="container" @submit.prevent="loadReportDataSource">
                <div class="form-group">
                    <label for="CompCode">{{$CaptionsLibrary.get("Company")}}</label>
                    <kendo-dropdownlist v-model="saleDetailModel.comp_code"
                                        id="CompCode"
                                        :auto-close="false"
                                        :data-source="companies"
                                        :data-text-field="'DESC1'"
                                        :data-value-field="'COMP_CODE'"
                                        :filter="'contains'"
                                        class="width-100">
                    </kendo-dropdownlist>
                </div>
                <div class="form-group">
                    <label for="PrdId">{{$CaptionsLibrary.get("Products")}}</label>
                    <kendo-dropdownlist v-model="saleDetailModel.prd_id"
                                        id="PrdId"
                                        :auto-close="false"
                                        :data-source="products"
                                        :data-text-field="'SOFT_NAME'"
                                        :data-value-field="'PRD_ID'"
                                        :filter="'contains'"
                                        class="width-100">
                    </kendo-dropdownlist>
                </div>
                <div class="form-group break-line">
                    <kendo-button class="k-button k-primary">{{$CaptionsLibrary.get("Confirm")}}</kendo-button>
                </div>
            </form>
        </kendo-window>
        <kendo-window ref="SaleDetailWindow" :title="saleDetailModel.operationTypeDesc" :visible="saleDetailModel.isShowWindow" :modal="true" :width="'92%'" :resizable="false">
            <form class="container" @submit.prevent="operation">
                <div class="form-group">
                    <label for="fDAte">{{$CaptionsLibrary.get("Date")}}</label>
                    <sv-datepicker v-model="saleDetailModel.f_date" name="fDAte" id="fDAte"></sv-datepicker>
                </div>
                <div class="form-group">
                    <label for="saleState">{{$CaptionsLibrary.get("Status")}}</label>
                    <kendo-dropdownlist v-model="saleDetailModel.state"
                                        id="saleState"
                                        :auto-close="false"
                                        :data-source="saleStates"
                                        :data-text-field="'Value'"
                                        :data-value-field="'Key'"
                                        :filter="'contains'"
                                        class="width-100">
                    </kendo-dropdownlist>
                </div>
                <div class="form-group" v-show="saleDetailModel.state == 3">
                    <label for="amount">{{$CaptionsLibrary.get("Amount")}}</label>
                    <kendo-numerictextbox v-model.number="saleDetailModel.fee" class="width-100"
                                          id="amount"
                                          :min="0"
                                          :max="1000000000"
                                          :round="false"
                                          :spinners="true">
                    </kendo-numerictextbox>
                </div>
                <div class="form-group break-line">
                    <label for="followDate">{{$CaptionsLibrary.get("Date") +" "+ $CaptionsLibrary.get("Follow")}}</label>
                    <sv-datepicker v-model="saleDetailModel.follow_date" name="followDate" id="followDate"></sv-datepicker>
                </div>
                <div class="form-group break-line">
                    <label for="desc1">{{$CaptionsLibrary.get("Description")}}</label>
                    <input type="text" class="k-textbox width-100" id="desc1" v-model="saleDetailModel.desc1" required />
                </div>
                <div class="form-group break-line">
                    <kendo-button class="k-button k-primary">{{$CaptionsLibrary.get("Confirm")}}</kendo-button>
                </div>
            </form>
        </kendo-window>
        <div class="bs-docs-example k-content flex" v-if="kendoMessages">
            <div class="title k-alt" style="display: grid;grid-template-columns: 1fr 2fr;">
                <div>
                    <div style="float:right;margin:5px">
                        <i class="fa fa-users"></i>
                        {{companyModel.DESC1}}
                    </div>
                </div>
                <div>
                    <kendo-button style="float:left;margin:2px" class="k-button k-primary" @click.prevent="showFilter">
                        <div>
                            <i class="fa fa-filter"></i>
                        </div>
                    </kendo-button>
                    <kendo-button style="float:left;margin:2px" class="k-button k-primary" v-show="saleDetailModel.comp_code.length != 0 && saleDetailModel.prd_id.length != 0" @click.prevent="showAdd">
                        <div>
                            <i class="fa fa-plus"></i>
                        </div>
                    </kendo-button>
                    <kendo-button style="float:left;margin:2px" class="k-button k-primary" v-show="selectedSaleDetail != null" @click.prevent="remove">
                        <div>
                            <i class="fa fa-minus"></i>
                        </div>
                    </kendo-button>
                    <kendo-button style="float:left;margin:2px" class="k-button k-primary" v-show="saleDetailModel.comp_code.length != 0 && saleDetailModel.prd_id.length != 0" @click.prevent="showInfo">
                        <div>
                            <i class="fa fa-info"></i>
                        </div>
                    </kendo-button>
                </div>
            </div>
            <kendo-grid :data-source="reportDataSource"
                        ref="reportGrid"
                        @change="reportGridSelect"
                        :resizable="true"
                        :sortable-mode="'multiple'"
                        :sortable-allow-unsort="true"
                        :sortable-show-indexes="true"
                        :column-menu="true"
                        :selectable="true"
                        :filterable="true"
                        :groupable="true"
                        :pageable="true">
                <kendo-grid-column :field="'DESC1'"
                                   :width="400"
                                   :title="$CaptionsLibrary.get('Description')"></kendo-grid-column>

                <kendo-grid-column :field="'F_DATE'"
                                   :width="130"
                                   :title="$CaptionsLibrary.get('Date')"></kendo-grid-column>

                <kendo-grid-column :field="'FOLLOW_DATE'"
                                   :width="150"
                                   :title="$CaptionsLibrary.get('Date') +' '+ $CaptionsLibrary.get('Follow')"></kendo-grid-column>

                <kendo-grid-column :field="'FULLNAME'"
                                   :width="200"
                                   :title="$CaptionsLibrary.get('EmployeeInformation')"></kendo-grid-column>

                <kendo-grid-column :field="'STATE'"
                                   :width="130"
                                   :title="$CaptionsLibrary.get('Status')"></kendo-grid-column>

                <kendo-grid-column :field="'FEE'"
                                   :width="130"
                                   :format="'{0:##,#}'"
                                   :title="$CaptionsLibrary.get('Amount')"></kendo-grid-column>


            </kendo-grid>
        </div>
    </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style scoped>
    .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 20px;
        padding: 10px;
    }

    @media(max-width: 800px) {
    .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 20px;
        padding: 10px;
        /*height:400px;*/
        overflow:scroll
    }
    }
</style>

<style>
    .k-grid {
        height: calc(100% - 43px);
    }

    .k-grid-content {
        height: calc(100% - 120px) !important;
    }

    @media(max-width: 800px) {
        .k-grid {
            height: calc(100% - 50px);
    }
        .k-grid-content {
            height: calc(100% - 120px) !important;
        }
    }
</style>
