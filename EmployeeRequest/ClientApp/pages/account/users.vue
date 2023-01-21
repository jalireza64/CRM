<template>
    <div class="rtl page">
        <kendo-window ref="UserWindow" :title="usersModel.operationTypeDesc" :visible="usersModel.isShowWindow" :modal="true">
            <div class="container">
                <div class="form-group">
                    <label for="name">{{$CaptionsLibrary.get("Firstname")}}</label>
                    <input type="text" class="k-textbox width-100" id="name" v-model="usersModel.name" />
                </div>
                <div class="form-group">
                    <label for="family">{{$CaptionsLibrary.get("Family")}}</label>
                    <input type="text" class="k-textbox width-100" id="family" v-model="usersModel.family" />
                </div>
                <div class="form-group">
                    <label for="username">{{$CaptionsLibrary.get("Username")}}</label>
                    <input type="text" class="k-textbox width-100" id="username" v-model="usersModel.username" />
                </div>
                <div class="form-group" v-show="usersModel.operationType == 0">
                    <label for="password">{{$CaptionsLibrary.get("Password")}}</label>
                    <input type="password" class="k-textbox width-100" id="password" v-model="usersModel.password" />
                </div>
                <div class="form-group">
                    <label for="accessLevel">{{$CaptionsLibrary.get("AccessLevel")}}</label>
                    <kendo-combobox v-model="usersModel.accessLevelId"
                                    id="accessLevel"
                                    :data-source="accessLevels"
                                    :data-text-field="'Title'"
                                    :data-value-field="'Id'"
                                    :filter="'contains'"
                                    class="width-100">
                    </kendo-combobox>
                </div>
                <div class="form-group">
                    <kendo-button @click.prevent="operation" class="k-button k-primary">{{$CaptionsLibrary.get("Confirm")}}</kendo-button>
                </div>
            </div>
        </kendo-window>
        <div class="bs-docs-example k-content flex" v-if="kendoMessages">
            <div class="title k-alt" style="display: grid;grid-template-columns: repeat(2, 1fr);">
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
                    <kendo-button style="float:left;margin:2px" class="k-button k-primary" v-show="selectedUser != null" @click.prevent="showEdit">
                        <div>
                            <i class="fa fa-edit"></i>
                        </div>
                    </kendo-button>
                    <kendo-button style="float:left;margin:2px" class="k-button k-primary" v-show="selectedUser != null" @click.prevent="remove">
                        <div>
                            <i class="fa fa-minus"></i>
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
                <kendo-grid-column :field="'Name'"
                                   :width="200"
                                   :title="$CaptionsLibrary.get('Firstname')"></kendo-grid-column>

                <kendo-grid-column :field="'Family'"
                                   :width="200"
                                   :title="$CaptionsLibrary.get('Family')"></kendo-grid-column>

                <kendo-grid-column :field="'Username'"
                                   :width="200"
                                   :title="$CaptionsLibrary.get('Username')"></kendo-grid-column>

                <kendo-grid-column :field="'Title'"
                                   :width="200"
                                   :title="$CaptionsLibrary.get('AccessLevel')"></kendo-grid-column>

            </kendo-grid>
        </div>
    </div>
</template>

<script lang="ts" src="./users.ts">
</script>

<style scoped>
    .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 20px;
        padding: 10px;
    }
        .chart-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(800px, 1fr));
        grid-gap: 20px;
        padding: 10px;
    }

    @media(max-width: 800px) {
        .chart-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-gap: 20px;
            padding: 10px;
        }
    }
</style>

<style>
    .k-grid {
        height: calc(100% - 43px);
    }

    .k-grid-content {
        height: calc(100% - 104px) !important;
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
