<template>
  <div class="wrapper scroll">
    <side-bar>
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link to="/dashboard">
        <i class="nc-icon nc-chart-bar-32"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/client-master" v-if="role == 'Admin' || role == 'Reception' || role == 'Delivery' || role == 'Accounting'">
        <i class="nc-icon nc-badge"></i>
        <p>Client Master</p>
      </sidebar-link>
      <sidebar-link to="/material-master" v-if="role == 'Admin' || role == 'Reception' ||  role == 'Visitor'">
        <i class="nc-icon nc-app"></i>
        <p>Mother Coil</p>
      </sidebar-link>
      <sidebar-link to="/slit-coil" v-if="role == 'Admin' || role == 'Reception' || role == 'Visitor'">
        <i class="nc-icon nc-support-17"></i>
        <p>Slit Coil</p>
      </sidebar-link>
      <sidebar-link to="/job-request" v-if="role == 'Admin' || role == 'Delivery' || role == 'Reception' ||  role == 'Visitor'">
        <i class="nc-icon nc-notes"></i>
        <p>Job Order</p>
      </sidebar-link>
      <sidebar-link to="/produksi" v-if="role == 'Admin' || role == 'Delivery' || role == 'Reception'">
        <i class="nc-icon nc-settings-gear-64"></i>
        <p>Produksi</p>
      </sidebar-link>
      <!-- <sidebar-link to="#" v-if="role == 'Admin' || role == 'Reception' || role == 'Delivery'">
        <base-dropdown tag="li">
            <template slot="title">
              <i class="nc-icon nc-settings-90"></i>
              <p>Produksi <i class="fa fa-angle-right fa-xs" aria-hidden="true"></i></p>
            </template>
            <sidebar-link to="/report-slitting" v-if="role == 'Admin' || role == 'Reception' || role == 'Delivery'">
              <i class="nc-icon nc-scissors"></i>
              <p>Slitting</p>
            </sidebar-link>
            <sidebar-link to="/produksi-tolling" v-if="role == 'Admin' || role == 'Delivery'">
              <i class="nc-icon nc-chart"></i>
              <p>Tolling</p>
            </sidebar-link>
            <sidebar-link to="/produksi-shearing" v-if="role == 'Admin'">
              <i class="nc-icon nc-preferences-circle-rotate"></i>
              <p>Shearing</p>
            </sidebar-link>
          </base-dropdown>
      </sidebar-link> -->
      <sidebar-link to="/delivery" v-if="role == 'Admin' || role == 'Delivery'">
        <i class="nc-icon nc-delivery-fast"></i>
        <p>Delivery</p>
      </sidebar-link>
      <!-- <sidebar-link to="/news" v-if="role == 'Admin' || role == 'Delivery'">
        <i class="nc-icon nc-paper-2"></i>
        <p>Berita Acara</p>
      </sidebar-link> -->
      <sidebar-link to="/invoice" v-if="role == 'Admin' || role == 'Delivery'">
        <i class="nc-icon nc-single-copy-04"></i>
        <p>Invoice</p>
      </sidebar-link>
      <sidebar-link to="/payment" v-if="role == 'Admin' || role == 'Delivery'">
        <i class="nc-icon nc-credit-card"></i>
        <p>Payment</p>
      </sidebar-link>
      <sidebar-link to="/all-account" v-if="role == 'Admin'">
        <i class="nc-icon nc-single-02"></i>
        <p>Account</p>
      </sidebar-link>
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
