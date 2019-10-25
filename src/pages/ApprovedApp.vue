<template>
    <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="source_data"
      :columns="columns"
      row-key="id"
      :loading="loading"
      dense
      :visible-columns="visibleColumns"
      :pagination.sync="pagination"
    >
      <template v-slot:top="props">
        <div class="col-3 q-table__title text-h6">Approved Applications</div>

        <q-space />

        <q-btn
          flat round dense
          icon="edit"
          color="indigo"
          class="q-ml-md"
          @click="filters = true"
        />

        <q-btn
          flat round dense
          icon="print"
          color="primary"
          class="q-ml-md"
        />

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
export default {
  data () {
    return {
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
        source_list: [],
        source_data: [],
        amId: "",
        dateFrom: "",
        dateTo: ""
    }
  },

    computed: {
        baseUri() {
            return this.$store.state.util.base_uri;
        },
    },

    method: {
        getSourceOfIncome(income) {
            var url = this.baseUri.concat(income+"/"+amId+"/"+dateFrom+"/"+dateTo);
                this.$axios
                .get(url)
                .then(response => {
                    this.source_data = response["date"]
                })
                .catch(error => console.log(error))
        }
    },

    created() {
        this.loading = true
        this.$axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(response => {
            // console.log(JSON.stringify(response.data));
            this.source_data = response.data
            this.loading = false
        })
        .catch(error => console.log(error))
  },
}
</script>

<style scoped>

</style>