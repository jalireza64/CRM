<template>
    <div class="rtl page">
        <kendo-window ref="CompanyWindow" :title="companyModel.operationTypeDesc" :visible="companyModel.isShowWindow" :modal="true" :width="'92%'" :resizable="false">
            <form class="container" @submit.prevent="operation">
                <div class="form-group">
                    <label for="compCode">{{$CaptionsLibrary.get("Id")}}</label>
                    <input type="text" class="k-textbox width-100" id="compCode" v-model="companyModel.comp_Code" required />
                </div>
                <div class="form-group">
                    <label for="desc1">{{$CaptionsLibrary.get("Company")}}</label>
                    <input type="text" class="k-textbox width-100" id="desc1" v-model="companyModel.desc1" required />
                </div>
                <div class="form-group">
                    <label for="respName">{{$CaptionsLibrary.get("Fullname")}}</label>
                    <input type="text" class="k-textbox width-100" id="respName" v-model="companyModel.resp_Name" required />
                </div>
                <div class="form-group break-line">
                    <label for="telNo1">{{$CaptionsLibrary.get("Tel")}}</label>
                    <input type="text" class="k-textbox width-100" id="telNo1" v-model="companyModel.tel_No_1" required />
                </div>
                <div class="form-group">
                    <label for="telNo2">{{$CaptionsLibrary.get("Tel")}}</label>
                    <input type="text" class="k-textbox width-100" id="telNo2" v-model="companyModel.tel_No_2" />
                </div>
                <div class="form-group">
                    <label for="cellPhone">{{$CaptionsLibrary.get("MobileNumber")}}</label>
                    <input type="text" class="k-textbox width-100" id="cellPhone" v-model="companyModel.cell_Phone" />
                </div>
                <div class="form-group">
                    <label for="faxNo">{{$CaptionsLibrary.get("Fax")}}</label>
                    <input type="text" class="k-textbox width-100" id="faxNo" v-model="companyModel.fax_No" />
                </div>
                <div class="form-group">
                    <label for="address">{{$CaptionsLibrary.get("Address")}}</label>
                    <input type="text" class="k-textbox width-100" id="address" v-model="companyModel.address" required />
                </div>
                <div class="form-group">
                    <label for="email">{{$CaptionsLibrary.get("Email")}}</label>
                    <input type="text" class="k-textbox width-100" id="email" v-model="companyModel.e_mail" />
                </div>
                <div class="form-group">
                    <label for="webSite">{{$CaptionsLibrary.get("WebSite")}}</label>
                    <input type="text" class="k-textbox width-100" id="webSite" v-model="companyModel.webSite" />
                </div>
                <div class="form-group">
                    <label for="ceo">{{$CaptionsLibrary.get("Ceo")}}</label>
                    <input type="text" class="k-textbox width-100" id="ceo" v-model="companyModel.ceo" />
                </div>
                <div class="form-group">
                    <label for="users">{{$CaptionsLibrary.get("User")}}</label>
                    <kendo-dropdownlist v-model="companyModel.consistence_user"
                                       id="users"
                                       :auto-close="false"
                                       :data-source="saleUsers"
                                       :data-text-field="'FULLNAME'"
                                       :data-value-field="'USER_ID'"
                                       :filter="'contains'"
                                       :tag-mode="'single'"
                                       :tagTemplate="'<span>#: data.values.length #'+' '+$CaptionsLibrary.get('ProductSelected')+'</span>'"
                                       class="width-100">
                    </kendo-dropdownlist>
                </div>
                <div class="form-group break-line">
                    <kendo-button class="k-button k-primary">{{$CaptionsLibrary.get("Confirm")}}</kendo-button>
                </div>
            </form>
        </kendo-window>
        <kendo-window ref="ProductWindow" :title='$CaptionsLibrary.get("Products")' :visible="false" :modal="true" :width="'92%'" :resizable="false">
            <form class="container" @submit.prevent="modifyCompProduct">
                <div class="form-group">
                    <label for="products">{{$CaptionsLibrary.get("Products")}}</label>
                    <kendo-multiselect v-model="companyModel.prdIdList"
                                       id="products"
                                       :auto-close="false"
                                       :data-source="products"
                                       :data-text-field="'SOFT_NAME'"
                                       :data-value-field="'PRD_ID'"
                                       :filter="'contains'"
                                       :tag-mode="'single'"
                                       :tagTemplate="'<span>#: data.values.length #'+' '+$CaptionsLibrary.get('ProductSelected')+'</span>'"
                                       class="width-100">
                    </kendo-multiselect>
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
                        {{$CaptionsLibrary.get('Operation')}}
                    </div>
                </div>
                <div>
                    <kendo-button style="float:left;margin:2px" class="k-button k-primary" @click.prevent="showAdd">
                        <div>
                            <i class="fa fa-plus"></i>
                        </div>
                    </kendo-button>
                    <kendo-button style="float:left;margin:2px" class="k-button k-primary" v-show="selectedCompany != null" @click.prevent="showEdit">
                        <div>
                            <i class="fa fa-edit"></i>
                        </div>
                    </kendo-button>
                    <kendo-button style="float:left;margin:2px" class="k-button k-primary" v-show="selectedCompany != null" @click.prevent="remove">
                        <div>
                            <i class="fa fa-minus"></i>
                        </div>
                    </kendo-button>
                    <kendo-button style="float:left;margin:2px" class="k-button k-primary" v-show="selectedCompany != null" @click.prevent="showProduct">
                        <div>
                            <i class="fa fa-box-open"></i>
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
                                   :width="200"
                                   :title="$CaptionsLibrary.get('Company')"></kendo-grid-column>

                <kendo-grid-column :field="'RESP_NAME'"
                                   :width="200"
                                   :title="$CaptionsLibrary.get('Fullname')"></kendo-grid-column>

                <kendo-grid-column :field="'CELL_PHONE'"
                                   :width="200"
                                   :title="$CaptionsLibrary.get('MobileNumber')"></kendo-grid-column>

                <kendo-grid-column :field="'TEL_NO_1'"
                                   :width="200"
                                   :title="$CaptionsLibrary.get('Tel')"></kendo-grid-column>

                <kendo-grid-column :field="'TEL_NO_2'"
                                   :width="200"
                                   :title="$CaptionsLibrary.get('Tel')"></kendo-grid-column>

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
