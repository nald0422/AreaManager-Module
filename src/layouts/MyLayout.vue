<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
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
            <q-menu>
                <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup @click="accountSettings_Modal = true">
                        <q-item-section>Settings</q-item-section>
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
      content-class="bg-white"
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

    <q-dialog v-model="accountSettings_Modal">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
                <div class="text-h6">Settings</div>
            </q-card-section>

            <q-card-section>
                <div class="fit row wrap justify-start items-start content-start">
                    <div class="col-3 self-start">
                        <q-list bordered padding class="rounded-borders text-primary">
                            <q-item clickable v-ripple active>
                                <q-item-section avatar>
                                    <q-icon name = "account_box"></q-icon>
                                </q-item-section>
                                <q-item-section>Settings</q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                    <div class="col-grow self-start"></div>
                </div>
                
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="OK" />
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
                </div>
            </div>
        </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { date } from 'quasar'

export default {
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