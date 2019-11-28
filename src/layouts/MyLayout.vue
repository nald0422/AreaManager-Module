<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-grey-10 text-grey-1" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <span class="q-ml-sm text-deep-orange-5">Area Manager</span>
        </q-toolbar-title>
        <q-space />
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="30px" icon="person">
              
            </q-avatar>
            <q-menu square fit anchor="bottom left" self="top left" content-class="bg-grey-10 text-white" :offset="[50, 11]">
                <q-list style="min-width: 100px">
                    <q-item clickable v-ripple @click="signOff()">
                        <q-item-section avatar>
                            <q-icon name = "trending_flat"></q-icon>
                        </q-item-section>
                        <q-item-section>Logout</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="accountSettings_Modal=true">
                        <q-item-section avatar>
                            <q-icon name = "group"></q-icon>
                        </q-item-section>
                        <q-item-section>Management</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
            <q-tooltip content-class="bg-purple">Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-10"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding>
            <q-expansion-item
                expand-seperator
                icon="file_copy"
                label="Queries"
                :content-inset-level="0.5"
                default-opened
                class="EXP__expansionItem"
            >
            <q-item class="GNL__drawer-item" :to="link.route" v-ripple clickable v-for="link in links1" :key="link.text" active-class="my-menu-link">
                <q-item-section avatar>
                    <q-icon :color="link.color" :name="link.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label class="text-grey-1">{{link.text}}</q-item-label>
                </q-item-section>
            </q-item>
            </q-expansion-item>
          <!-- <q-item class="GNL__drawer-item" v-ripple v-for="link in links1" :key="link.text" clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item> -->

          <!-- <div class="q-mt-md">
            <div class="flex flex-center q-gutter-xs">
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Privacy">Privacy</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Terms">Terms</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="About">About Google</a>
            </div>
          </div> -->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-dialog v-model="accountSettings_Modal" :persistent="true">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section class="bg-grey-10 text-grey-1">
                <div class="text-h6">User Management</div>
            </q-card-section>

            <q-card-section>
                <div class="fit row wrap justify-start items-start content-start">
                    <div class="col-4 self-start q-pt-lg q-px-sm">
                        <label class="text-h6">Area Managers</label>
                        <hr>
                        <div class="q-pt-md q-px-sm">
                            <q-option-group
                                id="optionGroup"
                                v-model="group"
                                :options="options"
                                color="red"
                                left-label
                                />
                        </div>
                    </div>
                    <div class="col-grow self-start q-pt-lg q-px-sm">
                        <label class="text-h6">Branches</label>
                        <q-btn size="md" dense color="indigo" icon="add" style="float: right" @click="assignBranches_modal=true"/>
                        <hr>
                        <q-list dense padding class="rounded-borders">
                            <q-item clickable v-ripple v-for="branch in branches" :key="branch">
                                <q-item-section>
                                    <q-checkbox v-model="selectedBranch" :val="branch" color="cyan" :label="branch" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <div class="q-px-sm">
                            The model data: <strong>{{ selectedBranch }}</strong>
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Done" color="blue-10" @click="accountSettings_Modal=false" />
                <q-btn flat label="Apply" color="green-10" />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-dialog v-model="assignBranches_modal" :persistent="true">
        <q-card style="width: 300px; max-width: 80vw;">
            <q-card-section class="bg-grey-10 text-grey-1">
                <div class="text-h6">Branch Assignment</div>
            </q-card-section>
            <q-card-section>
            <q-list dense padding class="rounded-borders">
                <q-item clickable v-ripple v-for="branch in branches" :key="branch">
                    <q-item-section>
                        <q-checkbox v-model="selectedBranch" :val="branch" color="cyan" :label="branch" />
                    </q-item-section>
                </q-item>
            </q-list>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="deep-orange-14" @click="assignBranches_modal=false" />
                <q-btn flat label="Assign" color="green-10" />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-page-container>
        <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { date } from 'quasar'

import account_comp from '../components/Account.vue'
import admin_comp from '../components/Admin.vue'


export default {
    components: {
        account_comp,
        admin_comp
    },


    data () {
        return {
            leftDrawerOpen: false,
            search: '',
            showAdvanced: false,
            showDateOptions: false,
            accountSettings_Modal: false,
            assignBranches_modal: false,
            exactPhrase: '',
            hasWords: '',
            startingDate: date.formatDate(Date.now(), 'YYYY/MM/DD'),
            endingDate: date.formatDate(Date.now(), 'YYYY/MM/DD'),
            starting_calendar: false,
            ending_calendar: false,
            excludeWords: '',
            byWebsite: '',
            byDate: 'Any time',
            links1: [
                { icon: 'check', text: 'Appproved Applications', color: 'grey-1', route: '/approvedApp' },
                { icon: 'group_work', text: 'Applications by Age', color: 'grey-1', route: '/appByAge' },
                { icon: 'attach_money', text: 'Source of Income', color: 'grey-1', route: '/sourceIncome' },
            ],

            dropdown_label: 'Source of Income',
            dropdown_icon: 'money',
            selectedComponent: 'account_comp',
            selectedManager: [],   // Area managers
            selectedBranch: [],  // Branches checkbox
            group: 'op1',
            columns: [
                {
                    name: 'Name',
                    required: true,
                    align: 'left',
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                }
            ],
            options: [
                {
                label: 'Area Manager A',
                value: 'op1'
                },
                {
                label: 'Area Manager B',
                value: 'op2'
                },
                {
                label: 'Area Manager C',
                value: 'op3'
                }
            ],
            branches: ['Antipas', 'Aurora', 'Butuan', 'Buug', 'Banga']

        }
    },

    methods: {

        signOff() {
            this.$q.cookies.remove('authToken')
            this.remove_user()
            this.$router.push('/login')
        },

        remove_user() {
            this.$store.commit('userModel/mutate_remove_user')
        },

        onClear () {
        this.exactPhrase = ''
        this.hasWords = ''
        this.excludeWords = ''
        this.byWebsite = ''
        this.byDate = 'Any time'
        },

        changeDate (option) {
        this.byDate = option
        this.showDateOptions = false
        },

        closeDialog(calendar) {
            if(calendar === this.starting_calendar) {
                this.starting_calendar = false
            } else if (calendar === this.ending_calendar) {
                this.ending_calendar = false
            }
        },
    },

    computed: {
        soi_status() {
            return this.$store.state.components.soi_comp
        }
    },

    watch: {
        accountSettings_Modal: function() {
            if(this.accountSettings_Modal == true) {
                console.log('Account Settings Modal')
            }
        },

        assignBranches_modal: function() {
            if(this.assignBranches_modal == true) {
                console.log('Assign Branches Modal')
            }
        },
    },

    created () {
        console.log("Date: " + this.startingDate)
    }
}
</script>

<style scoped lang="sass">
.GNL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 55%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      .q-icon
        color: #2F3538
    .q-item__label
      color: #2F3538
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 400
      line-height: 1.25rem
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000

.EXP
    &__expansionItem
        font-weight: 500
        color: white

.SEARCH
    &__container
        position: relative;
    &__card
        color: #000
        background-color: #fff
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
        padding: 5px

.my-menu-link
  color: white
</style>