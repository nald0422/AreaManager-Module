<template>
    <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="source_data"
      :columns="columns"
      :filter="soi_application_filter"
      row-key="id"
      :loading="loading"
      dense
      :visible-columns="visibleColumns"
      :pagination.sync="pagination"
    >

        <template v-slot:header-cell-userId="props">
            <q-th :props="props">
                {{ props.col.label }}
                <q-popup-proxy context-menu>
                <q-banner class="q-mt-xs">
                <template v-slot:avatar>
                    <q-icon 
                        name="fas fa-filter" 
                        size="xs" dense round 
                        color="grey-10" />
                </template>
                <q-input
                    ref="input"     
                    color = "deep-orange" filled dense 
                    label="Search"
                    v-model="user_filter_input"
                    square
                    autofocus
                />
                </q-banner>
                    <q-list dense padding class="rounded-borders filtered-list">
                            <q-item clickable v-ripple v-for="filtered_user in filtered_users" :key="filtered_user">
                                <q-item-section>
                                    <!-- <q-checkbox v-model="selected_filtered_users" :val="filtered_user" color="deep-orange-7" :label="filtered_user" /> -->
                                    <input type="checkbox" :id="filtered_user" :value="{userId: filtered_user}" v-model="selected_filtered_users" :label="filtered_user">
                                    <label for="filtered_user">{{filtered_user}}</label>
                                </q-item-section>
                            </q-item>
                    </q-list>
                </q-popup-proxy>
            </q-th>
        </template>

        <template v-slot:header-cell-id="props">
            <q-th :props="props">
                {{ props.col.label }}
                <q-popup-proxy context-menu>
                <q-banner class="q-mt-xs">
                <template v-slot:avatar>
                    <q-icon 
                        name="fas fa-filter" 
                        size="xs" dense round 
                        color="grey-10" />
                </template>
                <q-input
                    ref="input"     
                    color = "deep-orange" filled dense 
                    label="Search"
                    v-model="id_filter_input"
                    square
                    autofocus
                />
                </q-banner>
                    <q-list dense padding class="rounded-borders filtered-list">
                            <q-item clickable v-ripple v-for="filtered_id in filtered_ids" :key="filtered_id">
                                <q-item-section>
                                    <q-checkbox v-model="selected_filtered_id" :val="filtered_id" color="deep-orange-7" :label="filtered_id" />
                                </q-item-section>
                            </q-item>
                    </q-list>
                </q-popup-proxy>
            </q-th>
        </template>

        <template v-slot:header-cell-title="props">
            <q-th :props="props">
                {{ props.col.label }}
                <q-popup-proxy context-menu>
                <q-banner class="q-mt-xs">
                <template v-slot:avatar>
                    <q-icon 
                        name="fas fa-filter" 
                        size="xs" dense round 
                        color="grey-10" />
                </template>
                <q-input
                    ref="input"     
                    color = "deep-orange" filled dense 
                    label="Search"
                    v-model="title_filter_input"
                    square
                    autofocus
                />
                </q-banner>
                    <q-list dense padding class="rounded-borders filtered-list">
                            <q-item clickable v-ripple v-for="filtered_title in filtered_titles" :key="filtered_title">
                                <q-item-section>
                                    <q-checkbox v-model="selected_filtered_title" :val="filtered_title" color="deep-orange-7" :label="filtered_title" />
                                </q-item-section>
                            </q-item>
                    </q-list>
                </q-popup-proxy>
            </q-th>
        </template>

        <template v-slot:header-cell-body="props">
            <q-th :props="props">
                {{ props.col.label }}
                <q-popup-proxy context-menu>
                <q-banner class="q-mt-xs">
                <template v-slot:avatar>
                    <q-icon 
                        name="fas fa-filter" 
                        size="xs" dense round 
                        color="grey-10" />
                </template>
                <q-input
                    ref="input"     
                    color = "deep-orange" filled dense 
                    label="Search"
                    v-model="body_filter_input"
                    square
                    autofocus
                />
                </q-banner>
                    <q-list dense padding class="rounded-borders filtered-list">
                            <q-item clickable v-ripple v-for="filtered_body in filtered_bodies" :key="filtered_body">
                                <q-item-section>
                                    <q-checkbox v-model="selected_filtered_body" :val="filtered_body" color="deep-orange-7" :label="filtered_body" />
                                </q-item-section>
                            </q-item>
                    </q-list>
                </q-popup-proxy>
            </q-th>
        </template>

        <template v-slot:top="props">
            <div class="col-3 q-table__title text-h6">Source of Income</div>
            <q-space />

            <q-input square dense color="deep-orange-7" v-model="soi_application_filter">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>

            <q-btn
                flat round dense
                icon="menu"
                color="grey-10"
                class="q-ml-md"
            >
                <q-menu fit anchor="bottom left" self="top left" content-class="bg-grey-10 text-white">
                    <q-list style="min-width: 100px">
                        <q-item clickable v-ripple @click="filters=true">
                            <q-item-section avatar>
                                <q-icon name="edit" color="yellow-8" round flat dense></q-icon>
                            </q-item-section>
                            <q-item-section>Edit table</q-item-section>
                        </q-item>
                        <q-item clickable v-ripple @click="print_json()">
                            <q-item-section avatar>
                                <q-icon name="picture_as_pdf" color="red-6" round flat dense></q-icon>
                            </q-item-section>
                            <q-item-section>Preview in PDF</q-item-section>
                        </q-item>
                        <downloadexcel
                                    :data = "source_data"
                                    :fields = "json_fields"
                                    type="csv"
                                    :before-generate = "startDownload"
                                    :before-finish = "finishDownload"
                                    :name = "fileName + '.csv'"
                        >
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-icon name="fas fa-file-excel" color="green" round flat dense></q-icon>
                                </q-item-section>
                                <q-item-section>Download as csv</q-item-section>
                            </q-item>
                        </downloadexcel>
                    </q-list>
                </q-menu>
                <q-tooltip>Menu</q-tooltip>
            </q-btn>
            
            <q-btn
            flat round dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
            />
        </template>

        <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="userId" :props="props">{{ props.row.userId }}</q-td>
                    <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                    <q-td key="title" class="text-ellipsis" :props="props">
                        {{ props.row.title }}
                        <q-popup-edit v-model="props.row.title">
                        <span>{{ props.row.title }}</span>
                        </q-popup-edit>
                    </q-td>
                    <q-td key="body" class="text-ellipsis" :props="props">
                        {{ props.row.body }}
                        <q-popup-edit v-model="props.row.body">
                        <span>{{ props.row.body }}</span>
                        </q-popup-edit>
                    </q-td>
                    <q-td key="action" :props="props" class="q-gutter-xs" style="min-width: 140px;">
                        <q-btn
                        color="primary"
                        class="btn-action"
                        icon="visibility"
                        size="sm"
                        @click="onView(props.row)"
                        />
                        <q-btn
                        color="secondary"
                        class="btn-action"
                        icon="edit"
                        size="sm"
                        @click="onUpdate(props.row)"
                        />
                        <q-btn
                        color="deep-orange"
                        class="btn-action"
                        icon="delete"
                        size="sm"
                        @click="onDelete(props.row)"
                        />
                    </q-td>
                </q-tr>
        </template>
    </q-table>

    <q-dialog v-model="filters" :persistent="true">
        <q-card style="width: 300px" class="q-pb-md">
            <q-card-section class="bg-grey-10 text-grey-1">
                <div class="text-h6">Filters</div>
            </q-card-section>

            <q-item dense class="q-pt-md">
                <q-item-section>
                    <q-checkbox keep-color v-model="visibleColumns" val="userId" label="Display User ID" />
                    <q-checkbox keep-color v-model="visibleColumns" val="id" label="Display Application ID" />
                    <q-checkbox keep-color v-model="visibleColumns" val="title" label="Display Title" />
                    <q-checkbox keep-color v-model="visibleColumns" val="body" label="Display Body" />
                </q-item-section>
            </q-item>
            <q-card-actions align="right" class="bg-white text-primary">
                <q-btn flat label="Done" @click="filters=false" />
            </q-card-actions>
        </q-card>
    </q-dialog>
  </div>
</template>

<script>

import downloadexcel from "vue-json-excel";
import { date } from 'quasar'

let app;

export default {
    components: {
        downloadexcel
    },
    
    data () {
        return {
            fileName: 'Source_of_Income',
            filters: false,
            rows: 10,
            loading: false,
            visibleColumns: ['userId', 'id', 'title', 'body'],
            pagination: {
                rowsPerPage: 10
            },
            columns: [
                {
                    name: "userId",
                    align: "left",
                    label: "User Id",
                    field: "userId",
                    sortable: true
                },
                {
                    name: "id",
                    align: "left",
                    label: "ID",
                    field: "id",
                    sortable: true
                },
                {
                    name: "title",
                    align: "left",
                    label: "Title",
                    field: "title",
                    sortable: true
                },
                {
                    name: "body",
                    align: "left",
                    label: "Body",
                    field: "body",
                    sortable: true
                },
                { name: "action", align: "center", label: "Action" }
            ],

            json_fields: {
                'USER ID': 'userId',
                'ID' : 'id',
                'CITY' : 'title',
                'Body': 'body',
            },

            json_meta: [
                [
                    {
                        'key': 'charset',
                        'value': 'utf-8'
                    }
                ]
            ],

            source_list: [],
            source_data: [],
            amId: '',
            dateFrom: '',
            dateTo: '',     

            soi_application_filter: '',
            
            user_filter_input: '',
            id_filter_input: '',
            title_filter_input: '',
            body_filter_input: '',
            
            filter_users: [],

            duplicate_users: [],
            duplicate_id: [],
            duplicate_title: [],
            duplicate_body: [],

            unique_users: [],
            unique_id: [],
            unique_title: [],
            unique_body: [],
            
            selected_filtered_users: [{userId: 2}],
            selected_filtered_id: [],
            selected_filtered_title: [],
            selected_filtered_body: [],
        }
    },

    computed: {
        baseUri() {
            return this.$store.state.util.base_uri;
        },

        filtered_users() {
            return this.unique_users.filter((element) => {
                return element.match(this.user_filter_input);
            })
        },

        filtered_ids() {
            return this.unique_id.filter((element) => {
                return element.match(this.id_filter_input);
            })
        },

        filtered_titles() {
            return this.unique_title.filter((element) => {
                return element.match(this.title_filter_input);
            })
        },

        filtered_bodies() {
            return this.unique_body.filter((element) => {
                return element.match(this.body_filter_input);
            })
        },
    },

    watch: {
        selected_filtered_users: function() {
            console.log("Data : " + JSON.stringify(this.selected_filtered_users))
            // this.getUserId(this.selected_filtered_users)
        }
    },

    methods: {
        getUserId(filters) {
             return this.source_data.filter(function (o) {
                 return Object.keys(filters).every(function (k) {
                    return o[k].split(',').some(function (v) {
                       return v === filters[k];
                    });
                });
            });
            //.map(function (o) {
            //    return o.title;
            //});
        },

        getSourceOfIncome(income) {
            var url = this.baseUri.concat(income+"/"+amId+"/"+dateFrom+"/"+dateTo);
                this.$axios
                .get(url)
                .then(response => {
                    this.source_data = response["date"]
                })
                .catch(error => console.log(error))
        },

        edit_soi(status){
            this.$store.commit('components/mutate_soi_comp', status);
        },

        print_json() {
            // console.log("Data : " + JSON.stringify(this.source_data))
            printJS({
                printable: this.source_data, 
                properties: ['userId', 'id', 'title', 'body'], 
                type: 'json',
                header: '<h3 class="custom-h3">SOURCE OF INCOME</h3>',
                headerStyle: 'font-weight: 300;',
                style: '.custom-h3 { color: #212121; }',
                repeatTableHeader: true
                })
        },

        startDownload(){
            this.loading = true
        },

        finishDownload(){
            this.loading = false
        },
    },

    created() {
        this.loading = true
        this.$axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(response => {
            // console.log(JSON.stringify(response.data));
            this.source_data = response.data
            // console.log("Data : " + JSON.stringify(response.data))
            this.loading = false
            this.source_data.forEach(element => {
                this.duplicate_users.push(JSON.stringify(element.userId))
                this.duplicate_id.push(JSON.stringify(element.id))
                this.duplicate_title.push(JSON.stringify(element.title))
                this.duplicate_body.push(JSON.stringify(element.body))
            });
            
            this.unique_users = Array.from(new Set(this.duplicate_users))
            this.unique_id = Array.from(new Set(this.duplicate_id))
            this.unique_title = Array.from(new Set(this.duplicate_title))
            this.unique_body = Array.from(new Set(this.duplicate_body))
        })
        .catch(error => console.log(error))

        console.log("selected : " + this.selected_filtered_users)
        console.log("Filtered : " +  this.getUserId(this.selected_filtered_users))

        // this.edit_soi(true)
    },  

    beforeDestroy() {
        // this.edit_soi(false)
    }
}
</script>

<style scoped lang="sass">
.q-table__title
    color: #1a237e

.filtered-list
    width: 300px
</style>