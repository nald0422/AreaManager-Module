<template>
    <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="approvedApp_data"
      :columns="columns"
      row-key="name"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">Approved Applications</div>

        <q-space />

        <div v-if="$q.screen.gt.xs" class="col">
          <q-toggle v-model="visibleColumns" val="calories" label="Calories" />
          <q-toggle v-model="visibleColumns" val="fat" label="Fat" />
          <q-toggle v-model="visibleColumns" val="carbs" label="Carbs" />
          <q-toggle v-model="visibleColumns" val="protein" label="Protein" />
          <q-toggle v-model="visibleColumns" val="sodium" label="Sodium" />
          <q-toggle v-model="visibleColumns" val="calcium" label="Calcium" />
          <q-toggle v-model="visibleColumns" val="iron" label="Iron" />
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
          icon="print"
          @click="props.toggleFullscreen"
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
          <q-td key="id" :props="props">{{ props.row.userId }}</q-td>
          <q-td key="name" :props="props">{{ props.row.id }}</q-td>
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
        visibleColumns: ['personId', 'personName', 'personAge'],
        filter: '',
        approvedApp_data: [],
        columns: [
            {
                name: "personId",
                align: "left",
                label: "PERSON ID",
                field: "personId",
                sortable: true
            },
            {
                name: "personName",
                align: "left",
                label: "PERSON NAME",
                field: "personName",
                sortable: true
            },
            {
                name: "personAge",
                align: "left",
                label: "PERSON AGE",
                field: "personAge",
                sortable: true
            }
        ],
        data: [],
        dateFrom: "2019-01-01",
        dateTo: "2019-03-29",
        amId: "2019000002",
    }
  },
    
    created() {
    this.$axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        console.log(JSON.stringify(response));
        this.data = response["data"];
      })
      .catch(error => console.log(error));

        console.log("approved app data length : " + this.data.length)
  },

//   computed: {
//       baseUri() {
//           return this.$store.state.util.base_uri.concat("Persons");
//       }
//   },

  
}
</script>

<style scoped lang="sass">

</style>