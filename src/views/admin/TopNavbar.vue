<template>
  <nav class="navbar navbar-expand-lg">
    <div>
      <!-- MODAL MENU -->
      <modal :show.sync="modalMenu.show">
       <template slot="header">
          <img src="img/brand/bck.png" width="13%"><p style="margin-top: 10px; margin-bottom:-15px; margin-left: 10px;">SIMPRO BCK</p>
       </template>
       <div>
          <div style="margin-bottom: 20px">
            <router-link  to="/dashboard" @click.native="modalMenu.show = false">
              <i class="nc-icon nc-chart-bar-32 text-dark"></i> <span class="text-dark"> Dashboard </span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px" v-if="role == 'Admin' || role == 'Reception' || role == 'Delivery' || role == 'Accounting'">
            <router-link  to="/client-master" @click.native="modalMenu.show = false">
              <i class="nc-icon nc-badge text-dark"></i> <span class="text-dark"> Client Master </span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px" v-if="role == 'Admin' || role == 'Reception' ||  role == 'Visitor'">
            <router-link  to="/material-master" @click.native="modalMenu.show = false">
              <i class="nc-icon nc-app text-dark"></i> <span class="text-dark"> Mother Coil </span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px" v-if="role == 'Admin' || role == 'Reception' || role == 'Visitor'">
            <router-link  to="/slit-coil" @click.native="modalMenu.show = false">
              <i class="nc-icon nc-support-17 text-dark"></i> <span class="text-dark"> Slit Coil </span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px" v-if="role == 'Admin' || role == 'Delivery' || role == 'Reception'">
            <router-link  to="/job-request" @click.native="modalMenu.show = false">
              <i class="nc-icon nc-notes text-dark"></i> <span class="text-dark"> Job Order </span>
            </router-link><br>
          </div>

          <div style="margin-bottom: 20px" v-if="role == 'Admin' || role == 'Reception' || role == 'Delivery'">
            <base-dropdown tag="li">
              <template slot="title">
                <i class="nc-icon nc-settings-90 text-dark"></i> <span class="text-dark"> Produksi </span> <i class="fa fa-angle-right fa-xs text-dark" aria-hidden="true"></i>
              </template>
              <sidebar-link to="/report-slitting" @click.native="modalMenu.show = false" v-if="role == 'Admin' || role == 'Reception' || role == 'Delivery'">
                <i class="nc-icon nc-scissors text-white"></i> <span class="text-white"> Slitting </span>
              </sidebar-link>
              <sidebar-link to="/produksi-tolling" @click.native="modalMenu.show = false" v-if="role == 'Admin'">
                <i class="nc-icon nc-chart text-white"></i> <span class="text-white"> Tolling </span>
              </sidebar-link>
              <sidebar-link to="/produksi-shearing" @click.native="modalMenu.show = false" v-if="role == 'Admin'">
                <i class="nc-icon nc-preferences-circle-rotate text-white"></i> <span class="text-white"> Shearing </span>
              </sidebar-link>
            </base-dropdown>
          </div>

          <div style="margin-bottom: 20px" v-if="role == 'Admin' || role == 'Delivery'">
            <router-link  to="/delivery" @click.native="modalMenu.show = false">
              <i class="nc-icon nc-delivery-fast text-dark"></i> <span class="text-dark"> Delivery </span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px" v-if="role == 'Admin' || role == 'Delivery'">
            <router-link  to="/news" @click.native="modalMenu.show = false">
              <i class="nc-icon nc-paper-2 text-dark"></i> <span class="text-dark"> News / BA </span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px" v-if="role == 'Admin' || role == 'Delivery'">
            <router-link  to="/invoice" @click.native="modalMenu.show = false">
              <i class="nc-icon nc-single-copy-04 text-dark"></i> <span class="text-dark"> Invoice </span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px" v-if="role == 'Admin' || role == 'Delivery'">
            <router-link  to="/payment" @click.native="modalMenu.show = false">
              <i class="nc-icon nc-credit-card text-dark"></i> <span class="text-dark"> Payment </span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px" v-if="role == 'Admin'">
            <router-link  to="/all-account" @click.native="modalMenu.show = false">
              <i class="nc-icon nc-single-02 text-dark"></i> <span class="text-dark"> Account </span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px" v-if="role == 'Admin' || role == 'Delivery'">
            <router-link  to="#" @click.native="modalMenu.show = false, logout()">
              <i class="fa fa-sign-out text-dark"></i> <span class="text-dark"> Logout</span>
            </router-link><br>
          </div>
       </div>
     </modal>
    </div>

    <div class="container-fluid">
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <p style="margin-top: -15px; margin-bottom:-15px; margin-right: 30px;">Hi {{ username }}</p>
          <li class="nav-item">
            <button type="submit" class="btn btn-sm btn-danger btn-fill float-right" @click="logout()" style="margin-top: -15px; margin-bottom:-15px;">
              <small>Logout</small>
            </button>
          </li>
        </ul>
        
      </div>
    </div>
  </nav>
</template>
<script>
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import axios from 'axios';

  export default {
    components: {
      Modal
    },
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false,
        modalMenu: {
            show: false,
        },
        username: '',
        role: '',
      }
    },
    mounted(){
      this.username = localStorage.getItem('username');
      this.role = localStorage.getItem('role');
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.modalMenu.show = true;
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      logout(){
        axios.get(config.apiUrl +"auth/logout").then(response => {
          this.notifyVue('Anda berhasil logout', 'top', 'right', 'info')
          localStorage.removeItem('token');
          localStorage.setItem('authenticated', false)
          this.$router.push('/login')
        })
        .catch(err => {
            this.notifyVue('Gagal Logout', 'top', 'right', 'danger')
        })
      },
      notifyVue(message, verticalAlign, horizontalAlign, type) {
        const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
        {
            message: message,
            icon: 'nc-icon nc-notification-70',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: type
        })
      }
    }
  }

</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
