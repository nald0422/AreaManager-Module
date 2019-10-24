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
          <span class="q-ml-sm">Area Manager</span>
        </q-toolbar-title>
        <q-space />
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-menu fit anchor="bottom left" self="top left">
                <q-list style="min-width: 100px">
                    <q-item clickable v-ripple active>
                        <q-item-section avatar>
                            <q-icon name = "trending_flat"></q-icon>
                        </q-item-section>
                        <q-item-section>Logout</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple active @click="accountSettings_Modal=true">
                        <q-item-section avatar>
                            <q-icon name = "group"></q-icon>
                        </q-item-section>
                        <q-item-section>Management</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
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
                    <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{link.text}}</q-item-label>
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
                    <div class="col-4 self-start q-pt-xl q-px-lg">
                        <q-option-group
                            v-model="group"
                            :options="options"
                            color="red"
                            left-label
                            />
                    </div>
                        <div class="col-grow self-start">
                            <div class="q-pa-md">
                                <div class="q-gutter-sm">
                                    <q-list dense padding class="rounded-borders">
                                        <q-item clickable v-ripple v-for="branch in branches" :key="branch">
                                            <q-item-section>
                                                <q-checkbox v-model="selectedBranch" :val="branch" color="cyan" :label="branch" />
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </div>
                            <div class="q-px-sm">
                            The model data: <strong>{{ selectedBranch }}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Done" color="primary" @click="accountSettings_Modal=false" />
                <q-btn flat label="Save" color="positive" />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-page-container>
        <div class="SEARCH__container">
            <div class="SEARCH__card">
                <div class="fit row wrap justify-start items-start content-start">
                    <div class="col-3 self-start q-pa-md">
                        <q-input dense filled v-model="startingDate" mask="date" :rules="['date']" placeholder="Ending date" hint="Date to"  color="purple-12">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" v-model="starting_calendar">
                                        <q-date v-model="startingDate" @input="closeDialog(starting_calendar)" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>
                    <div class="col-3 self-start q-pa-md">
                        <q-input dense filled v-model="endingDate" mask="date" :rules="['date']" placeholder="Ending date" hint="Date to"  color="purple-12">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" v-model="ending_calendar">
                                        <q-date v-model="endingDate" @input="closeDialog(ending_calendar)" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>
                    <div class="col-3 offset-1 self-start q-pa-md" v-show="soi_status">
                        <q-btn-dropdown
                            color="cyan"
                            push
                            no-caps
                            @click="onMainClick"
                            transition="slide-right"
                        >
                            <template v-slot:label>
                                <div class="row items-center no-wrap">
                                    <q-icon left name="money" />
                                    <div class="text-center">
                                        {{dropdown_label}}
                                    </div>
                                </div>
                            </template>

                            <q-list>
                                <q-item clickable v-close-popup @click="onItemClick('Self Employed')">
                                    <q-item-section avatar>
                                        <q-avatar icon="work" color="red" text-color="white" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>Self employed</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="onItemClick('Business')">
                                    <q-item-section avatar>
                                        <q-avatar icon="business" color="red" text-color="white" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>Business</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </div>
                </div>
            </div>
        </div>
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
            exactPhrase: '',
            hasWords: '',
            startingDate: date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
            endingDate: date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
            starting_calendar: false,
            ending_calendar: false,
            excludeWords: '',
            byWebsite: '',
            byDate: 'Any time',
            links1: [
                { icon: 'check', text: 'Appproved Applications', route: '/approvedApp' },
                { icon: 'group_work', text: 'Applications by Age', route: '/appByAge' },
                { icon: 'attach_money', text: 'Source of Income', route: '/sourceIncome' },
            ],

            dropdown_label: 'Source of Income',
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
        
        onMainClick() {

        },

        onItemClick(item) {
            this.dropdown_label = item
        }
    },

    computed: {
        soi_status() {
            return this.$store.state.components.soi_comp
        }
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
        color: #2F3538

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
  background: #F2C037
</style>