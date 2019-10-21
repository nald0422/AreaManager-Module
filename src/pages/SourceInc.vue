<template>
    <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="source_data"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">Approved Applications</div>

        <q-space />

        <div v-if="$q.screen.gt.xs" class="col">
          <q-toggle v-model="visibleColumns" val="userId" label="User Id" />
          <q-toggle v-model="visibleColumns" val="id" label="ID" />
          <q-toggle v-model="visibleColumns" val="title" label="Title" />
          <q-toggle v-model="visibleColumns" val="body" label="Body" />
        </div>
        <q-select
          v-else
          v-model="visibleColumns"
          multiple
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          style="min-width: 150px"
        />

        <q-btn
          flat round dense
          icon="edit"
          class="q-ml-md"
        />

        <q-btn
          flat round dense
          icon="print"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      visibleColumns: ['userId', 'id', 'title', 'body'],
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
        }
    },

    method: {
        getSourceOfIncome(income) {
            var url = this.baseUri.concat(income+"/"+amId+"/"+dateFrom+"/"+dateTo);
                this.$axios
                .get(url)
                .then(response => {
                    this.source_data = response["date"]
                })
                .catch(error => console.log(error));
        }
    },

    created() {
        this.$axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(response => {
            // console.log(JSON.stringify(response.data));
            this.source_data = response.data;
            })
        .catch(error => console.log(error));
  }
}
</script>

<style scoped>

</style>