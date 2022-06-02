<template>
  <div class="wrapper scroll">
    <side-bar>
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link to="/dashboard">
        <i class="nc-icon nc-chart-bar-32"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/client-master" v-if="role == 'Requester'">
        <i class="nc-icon nc-badge"></i>
        <p>Client Master</p>
      </sidebar-link>
      <sidebar-link to="/material-master" v-if="role == 'Requester'">
        <i class="nc-icon nc-app"></i>
        <p>Material Master</p>
      </sidebar-link>
      <sidebar-link to="/job-request" v-if="role == 'Requester'">
        <i class="nc-icon nc-notes"></i>
        <p>Job Order</p>
      </sidebar-link>
      <sidebar-link to="/delivery">
        <i class="nc-icon nc-delivery-fast"></i>
        <p>Delivery</p>
      </sidebar-link>
      <sidebar-link to="/news">
        <i class="nc-icon nc-paper-2"></i>
        <p>News</p>
      </sidebar-link>
      <sidebar-link to="/invoice">
        <i class="nc-icon nc-single-copy-04"></i>
        <p>Invoice</p>
      </sidebar-link>
      <sidebar-link to="/payment">
        <i class="nc-icon nc-credit-card"></i>
        <p>Payment</p>
      </sidebar-link>
      <sidebar-link to="/all-account">
        <i class="nc-icon nc-single-02"></i>
        <p>Account</p>
      </sidebar-link>
      <!-- <sidebar-link to="/logout">
        <i class="nc-icon nc-sun-fog-29"></i>
        <p>Logout</p>
      </sidebar-link> -->

    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    data () {
      return {
        role: '',
     }
    },
    mounted(){
      this.role = localStorage.getItem('role');
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
