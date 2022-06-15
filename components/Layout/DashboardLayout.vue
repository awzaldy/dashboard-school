<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <side-bar
      :background-color="sidebarBackground"
      :short-title="('sidebar.shortTitle')"
      :title="('sidebar.title')"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: ('sidebar.dashboard'),
            icon: 'tim-icons icon-chart-pie-36',
            path: '/dashboard'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{ name: ('sidebar.pages'), icon: 'tim-icons icon-image-02' }"
        >
          <sidebar-item
            :link="{ name: ('sidebar.pricing'), path: '/pricing' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: ('sidebar.rtl'), path: '/pages/rtl' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: ('sidebar.timeline'), path: '/pages/timeline' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: ('sidebar.login'), path: '/login' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: ('sidebar.register'), path: '/register' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: ('sidebar.lock'), path: '/lock' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: ('sidebar.userProfile'), path: '/pages/user' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: ('sidebar.components'),
            icon: 'tim-icons icon-molecule-40'
          }"
        >
          <sidebar-item :link="{ name: ('sidebar.multiLevelCollapse') }">
            <sidebar-item
              :link="{
                name: ('sidebar.example'),
                isRoute: false,
                path: 'https://google.com',
                target: '_blank'
              }"
            ></sidebar-item>
          </sidebar-item>

          <sidebar-item
            :link="{ name: ('sidebar.buttons'), path: '/components/buttons' }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: ('sidebar.gridSystem'),
              path: '/components/grid-system'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: ('sidebar.panels'), path: '/components/panels' }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: ('sidebar.sweetAlert'),
              path: '/components/sweet-alert'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: ('sidebar.notifications'),
              path: '/components/notifications'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: ('sidebar.icons'), path: '/components/icons' }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: ('sidebar.typography'),
              path: '/components/typography'
            }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{ name: ('sidebar.forms'), icon: 'tim-icons icon-notes' }"
        >
          <sidebar-item
            :link="{ name: ('sidebar.regularForms'), path: '/forms/regular' }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: ('sidebar.extendedForms'),
              path: '/forms/extended'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: ('sidebar.validationForms'),
              path: '/forms/validation'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: ('sidebar.wizard'), path: '/forms/wizard' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: ('sidebar.tables'),
            icon: 'tim-icons icon-puzzle-10'
          }"
        >
          <sidebar-item
            :link="{
              name: ('sidebar.regularTables'),
              path: '/table-list/regular'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: ('sidebar.extendedTables'),
              path: '/table-list/extended'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: ('sidebar.paginatedTables'),
              path: '/table-list/paginated'
            }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{ name: ('sidebar.maps'), icon: 'tim-icons icon-pin' }"
        >
          <sidebar-item
            :link="{ name: ('sidebar.googleMaps'), path: '/maps/google' }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: ('sidebar.fullScreenMaps'),
              path: '/maps/full-screen'
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: ('sidebar.vectorMaps'), path: '/maps/vector-map' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: ('sidebar.widgets'),
            icon: 'tim-icons icon-settings',
            path: '/widgets'
          }"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: ('sidebar.charts'),
            icon: 'tim-icons icon-chart-bar-32',
            path: '/charts'
          }"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: ('sidebar.calendar'),
            icon: 'tim-icons icon-time-alarm',
            path: '/calendar'
          }"
        ></sidebar-item>
      </template>
    </side-bar>
    <!--Share plugin (for demo purposes). You can remove it if don't plan on using it-->
    <sidebar-share :background-color.sync="sidebarBackground"> </sidebar-share>
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>

      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <nuxt></nuxt>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import SidebarShare from './SidebarSharePlugin';
function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';
import { SlideYDownTransition, ZoomCenterTransition } from 'vue2-transitions';

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    SlideYDownTransition,
    ZoomCenterTransition,
    SidebarShare
  },
  data() {
    return {
      sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    initScrollbar() {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar('sidebar');
        initScrollbar('main-panel');
        initScrollbar('sidebar-wrapper');

        docClasses.add('perfect-scrollbar-on');
      } else {
        docClasses.add('perfect-scrollbar-off');
      }
    }
  },
  mounted() {
    this.initScrollbar();
  }
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
