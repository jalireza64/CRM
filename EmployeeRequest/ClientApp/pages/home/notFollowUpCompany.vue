<template>
    <div class="rtl page">
        <div class="bs-docs-example k-content flex" v-if="kendoMessages">
            <div class="title k-alt" style="display: grid;grid-template-columns: 1fr 2fr;">
                <div>
                    <div style="float:right;margin:5px">
                        <i class="fa fa-users"></i>
                        {{$CaptionsLibrary.get('Operation')}}
                    </div>
                </div>
                <div>
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

                <kendo-grid-column :field="'CONSISTENCE_USER'"
                                   :width="200"
                                   :title="$CaptionsLibrary.get('User')"></kendo-grid-column>

                <kendo-grid-column :field="'DATE_DIFF'"
                                   :width="600"
                                   :format="'{0:##,#}'"
                                   :title="$CaptionsLibrary.get('Day')"></kendo-grid-column>


            </kendo-grid>
        </div>
    </div>
</template>

<script lang="ts" src="./notFollowUpCompany.ts">
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
            overflow: scroll
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
