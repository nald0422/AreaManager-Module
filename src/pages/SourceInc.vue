<template>
    <div class="q-pa-md">
        <div class="SEARCH__container q-pb-md">
            <div class="SEARCH__card">
                <div class="fit row wrap justify-start items-start content-start">
                    <div class="col-3 self-start q-pa-md">
                        <q-input dense filled v-model="startingDate" mask="date" :rules="['date']" placeholder="Ending date" hint="Date from"  color="yellow-8">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" v-model="starting_calendar">
                                        <q-date color="yellow-8" v-model="startingDate" @input="closeDialog(starting_calendar)" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>
                    <div class="col-3 self-start q-pa-md">
                        <q-input dense filled v-model="endingDate" mask="date" :rules="['date']" placeholder="Ending date" hint="Date to"  color="yellow-8">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" v-model="ending_calendar">
                                        <q-date color="yellow-8" v-model="endingDate" @input="closeDialog(ending_calendar)" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>
                    <div class="col-3 offset-1 self-start q-pa-md">
                        <q-select 
                            dense 
                            v-model="soi_model" 
                            :options="soi_options" 
                            label="Source of Income"
                            transition-show="jump-up"
                            transition-hide="jump-up"
                            options-selected-class="text-yellow-9"
                            color="yellow-9"
                        >
                            <template v-slot:option="scope">
                                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                                    <q-item-section avatar>
                                        <q-icon :name="scope.opt.icon" />
                                    </q-item-section>

                                    <q-item-section>
                                        <q-item-label v-html="scope.opt.label" />
                                        <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                    </div>
                </div>
            </div>
        </div>
    <q-table
      title="Treats"
      :data="filter_data"
      :columns="columns"
      :filter="soi_application_filter"
      :filter-method="myFilter"
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
                        color="deep-orange-8" />
                </template>0
                <q-input
                    ref="input"     
                    color = "deep-orange" filled dense 
                    label="Search"
                    v-model="id_filter_input"
                    square
                    autofocus
                />
                </q-banner>
                <q-option-group
                    :options="option_users"
                    label="Users"
                    type="checkbox"
                    v-model="selected_filtered_users"
                    class = "q-ml-sm"
                />
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
                            <q-item clickable v-ripple v-for="filtered_id in unique_id" :key="filtered_id">
                                <q-item-section>
                                    <q-checkbox v-model="selected_filtered_id" :val="filtered_id" color="yellow-8" :label="filtered_id" />
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
                                <q-checkbox v-model="selected_filtered_title" :val="filtered_title" color="yellow-8" :label="filtered_title" />
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
                                    <q-checkbox v-model="selected_filtered_body" :val="filtered_body" color="yellow-8" :label="filtered_body" />
                                </q-item-section>
                            </q-item>
                    </q-list>
                </q-popup-proxy>
            </q-th>
        </template>

        <template v-slot:top="props">
                <div class="q-table__title text-center text-h6">Source of Income</div>            
                <q-space />

                <q-input square dense color="yellow-8" v-model="soi_application_filter">
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

            source_data: [],
            filter_data: [],

            starting_calendar: false,
            ending_calendar: false,
            startingDate: date.formatDate(Date.now(), 'YYYY/MM/DD'),
            endingDate: date.formatDate(Date.now(), 'YYYY/MM/DD'),    
            
            soi_application_filter: '',

            soi_model: {
                label: 'Employment',
                value: 'employment',
                icon: 'work'
            },

            soi_options: [
                {
                    label: 'Employment',
                    value: 'employment',
                    icon: 'work'
                }, 
                {
                    label: 'Business',
                    value: 'business',
                    icon: 'business'
                }, 
                {
                    label: 'Agriculture',
                    value: 'agriculture',
                    icon: 'spa'
                }
            ],
            
            user_filter_input: '',
            id_filter_input: '',
            title_filter_input: '',
            body_filter_input: '',

            duplicate_users: [],
            duplicate_id: [],
            duplicate_title: [],
            duplicate_body: [],

            unique_users: [],
            unique_id: [],
            unique_title: [],
            unique_body: [],

            option_users: [],

            selected_filtered_users: [],
            selected_filtered_id: [],
            selected_filtered_title: [],
            selected_filtered_body: [],

            token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOlsxMDAsMTExLDExMCw5NywxMDgsMTAwXX0sImlhdCI6MTU3MzIwODEyNiwiZXhwIjoxNTczMjk0NTI2fQ.pPKgDJsOirqcU50XOlNwKsobkEG4CBmntcfiRu29LBA'
        }
    },

    computed: {
        baseUri() {
            return this.$store.state.util.base_uri
        },

        userModel() {
            return this.$store.state.userModel.user_data
        },

        getDateFrom() {
            return this.$store.state.components.date_from
        },

        getDateTo() {
            return this.$store.state.components.date_to
        },

        filtered_users() {
            return this.option_users.filter((element) => {
                return element.match(this.user_filter_input);
            })
        },

        filtered_ids() {
            return this.duplicate_id.filter((element) => {
                return element.match(this.id_filter_input);
            })
        },

        filtered_titles() {
            return this.duplicate_title.filter((element) => {
                return element.match(this.title_filter_input);
            })
        },

        filtered_bodies() {
            return this.duplicate_body.filter((element) => {
                return element.match(this.body_filter_input);
            })
        },
    },

    watch: {
        selected_filtered_users: function() {
            console.log("Data : " + this.selected_filtered_users)

            var toSearch = this.selected_filtered_users
            console.log('To search: ' + toSearch)
            if (toSearch.length < 1) 
            {
                return this.filter_data = this.source_data
            }
            else 
            {
                this.filter_data = this.source_data.filter(function(e) 
                {
                    return toSearch.includes(e.userId)
                });
            }
            // console.log('Matched: ' + JSON.stringify(result))
        },

        soi_model: function() {
            this.getSourceOfIncome()
        },

        startingDate: function() {
            console.log("Date From : " + this.dateFrom)
        },

        endingDate: function() {
            console.log("Date to : " + this.dateTo)
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
        },

        myFilter (rows, terms, cols, cellValue) {
            const lowerTerms = terms ? terms.toLowerCase() : ''
            return rows.filter(
                row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
            )
        },

        getSourceOfIncome() {
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                    'Authorization': "bearer " + this.user_data[1].token,
                    }
            };

            console.log("User token : " + this.user_data[1].token)

            var bodyParameters = {
                key: "value"
            }

            var dateFrom = date.formatDate(this.startingDate, 'YYYY-MM-DD')
            var dateTo = date.formatDate(this.endingDate, 'YYYY-MM-DD')

            this.$axios
            .get('http://192.168.2.119:3000/areamanager/query/sourceincome/list/'
                    +this.soi_model.value+'/2015000015/'+dateFrom+'/'+dateTo,
                    config)
            .then(response => {
                console.log('Source Data: ' + response.data)
                // this.source_data = response.data
            })
            .catch(error => console.log(error))

            console.log('Configuration : ' + config)

            array.forEach(element => {
                
            });
        },

        getEmployeeList() {

        },

        edit_soi(status){
            this.$store.commit('components/mutate_soi_comp', status)
        },

        set_user(user) {
            this.$store.commit('userModel/mutate_user', user)
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

        closeDialog(calendar) {
            if(calendar === this.starting_calendar) {
                this.starting_calendar = false
            } else if (calendar === this.ending_calendar) {
                this.ending_calendar = false
            }
        },

        onMainClick() {
        
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
            this.filter_data = this.source_data
            // console.log("Data : " + JSON.stringify(response.data))
            this.loading = false
            this.source_data.forEach(element => {
                this.duplicate_users.push(element.userId)
                this.duplicate_id.push(JSON.stringify(element.id))
                this.duplicate_title.push(JSON.stringify(element.title))
                this.duplicate_body.push(JSON.stringify(element.body))
            });

            this.unique_users = Array.from(new Set(this.duplicate_users))
            this.unique_id = Array.from(new Set(this.duplicate_id))
            this.unique_title = Array.from(new Set(this.duplicate_title))
            this.unique_body = Array.from(new Set(this.duplicate_body))

            this.unique_users.forEach(element => {
                this.option_users.push({label: JSON.stringify(element), value: element, color: 'deep-orange-8'})
            });
            
            // myFilter(rows, terms, cols, cellValue)
            
        })
        .catch(error => console.log(error))

        console.log("selected : " + this.selected_filtered_users)
        console.log("Filtered : " +  this.getUserId(this.selected_filtered_users))

        this.$axios
        .post("http://192.168.2.119:3000/user/login", {username: 'ZG9uYWxk', password: 'Zjk3YThkZWZkMDI5N2YxNDBiNjU0N2FkNTcxNGVkZWE='})
        .then(response => {
            this.user_data = response.data
            this.set_user(this.user_data)
            console.log("Data: " + JSON.stringify(this.user_data))
            console.log("Login Api: " + JSON.stringify(this.user_data[0].userModel[0].user_id))
            localStorage.setItem('authToken', this.user_data[1].token)

            // this.getSourceOfIncome()
        })
        .catch(error => console.log(error))
    },  
}
</script>

<style scoped lang="sass">
.q-table__title
    color: black

.filtered-list
    width: 300px

.SEARCH
    &__container
        position: relative;
    &__card
        color: #000
        background-color: #fff
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
        padding: 5px
</style>

