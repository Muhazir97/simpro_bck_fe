<template>
    <header class="header-global">
        <base-nav class="navbar-main fixed-top bg-white shadow" type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                <img src="img/brand/TaniKu.png" alt="logo" style="height: 70px; width: 100px;">
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <router-link to="/">
                        <img src="img/brand/TaniKu.png">
                    </router-link>
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>

            <ul class="navbar-nav navbar-nav-hover align-items-lg-center" style="margin-left: -50px">
                <!-- <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-ui-04 d-lg-none"></i>
                        <span class="nav-link-inner--text">Components</span>
                    </a>
                    <div class="dropdown-menu-inner">
                        <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                <i class="ni ni-spaceship"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h6 class="heading text-primary mb-md-1">Getting started</h6>
                                <p class="description d-none d-md-inline-block mb-0">Get started with Bootstrap, the
                                    world's most popular framework for building responsive sites.</p>
                            </div>
                        </a>
                        <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                <i class="ni ni-ui-04"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h5 class="heading text-warning mb-md-1">Components</h5>
                                <p class="description d-none d-md-inline-block mb-0">Learn how to use Argon
                                    compiling Scss, change brand colors and more.</p>
                            </div>
                        </a>
                    </div>
                </base-dropdown> -->
                <!-- <base-dropdown tag="li" class="nav-item"> -->
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button" @click="modalArea.show = true">
                        <div class="row text-dark mt-lg-12">
                            <div class="col-2 float-right">
                                <i class="ni ni-pin-3 text-dark"></i>
                            </div>
                            <div class="col-9 float-right">
                                <small class="nav-link-inner--text">Area Barang</small><br>
                                <span>{{area}}</span>
                            </div>
                        </div>
                    </a>
                <!-- </base-dropdown> -->
            </ul>
            <ul class="navbar-nav navbar-nav-hover align-items-lg-center ml-lg-auto">
                <li>
                    <base-dropdown tag="li" class="nav-item"  @change="changeCategory()">
                        <a slot="title" href="#" class="nav-link nav-link-icon" data-toggle="dropdown" role="button" title="Category">
                            <i class="ni ni-collection text-dark"></i>
                            <span class="nav-link-inner--text text-dark">Category</span>
                        </a>
                        <router-link :to="{ name: 'Category', query: { category: 'Sayur & Buah'}}" class="dropdown-item">Sayur & Buah</router-link>
                        <router-link :to="{ name: 'Category', query: { category: 'Telur & Daging'}}" class="dropdown-item">Telur & Daging</router-link>
                        <router-link :to="{ name: 'Category', query: { category: 'Ikan'}}" class="dropdown-item">Ikan</router-link>
                        <router-link :to="{ name: 'Category', query: { category: 'Sembako'}}" class="dropdown-item">Sembako</router-link>
                        <router-link :to="{ name: 'Category', query: { category: 'Bumbu Masak/ Rempah'}}" class="dropdown-item">Bumbu Masak/ Rempah</router-link>
                        <router-link :to="{ name: 'Category', query: { category: 'Makanan Beku'}}" class="dropdown-item">Makanan Beku</router-link>
                        <router-link :to="{ name: 'Category', query: { category: 'Bibit Budidaya'}}" class="dropdown-item">Bibit Budidaya</router-link>
                        <router-link :to="{ name: 'Category', query: { category: 'Alat / Bahan Tani'}}" class="dropdown-item">Alat / Bahan Tani</router-link>
                    </base-dropdown>
                </li>
                <li class="nav-item">
                    <router-link :to="'/blog-user'" class="nav-link nav-link-icon" rel="noopener" data-toggle="tooltip" title="blog">
                        <i class="fa fa-list-alt text-dark"></i>
                        <span class="nav-link-inner--text text-dark">Blog</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="'/konfirmasi'" class="nav-link nav-link-icon" rel="noopener" data-toggle="tooltip" title="Keranjang">
                            <i class="fa fa-check-circle text-dark"></i>
                            <span class="nav-link-inner--text text-dark">Konfirmasi</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="'/keranjang'" class="nav-link nav-link-icon" rel="noopener" data-toggle="tooltip" title="Keranjang">
                        <i class="fa fa-cart-plus text-dark"><span class="badge badge-danger" style="margin-top: -20px">{{totalItem}}</span></i>
                        <span class="nav-link-inner--text text-dark">Keranjang</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <div v-if="authenticated == 'true'">
                        <base-dropdown tag="li" class="nav-item">
                            <a slot="title" href="#" class="nav-link nav-link-icon" data-toggle="dropdown" role="button" title="User">
                                <i class="fa fa-user-circle text-dark"></i>
                                <span class="nav-link-inner--text text-dark">{{nama_lengkap}}</span>
                            </a>
                            <router-link to="/profile" class="dropdown-item">Profile</router-link>
                            <a class="dropdown-item" @click="logout()" style="cursor: pointer;">Logout</a>
                        </base-dropdown>
                    </div>
                    <div v-else>
                        <router-link :to="'/login'" class="nav-link nav-link-icon" rel="noopener" data-toggle="tooltip" title="Login">
                            <i class="fa fa-user-circle text-dark"></i>
                            <span class="nav-link-inner--text text-dark">Login</span>
                        </router-link>
                    </div>
                </li>
            </ul>
        </base-nav>
        <div>
            <!-- MODAL AREA -->
            <modal :show.sync="modalArea.show"  size="large">
                <h6 class="modal-title mb-4" id="modal-title-default">Area Provinsi</h6>
                <div class="card bg-light mb-3 shadow-lg--hover" v-for="p in provinsi">
                  <div class="card-body">
                    <div class="custom-control custom-radio">
                      <input name="custom-radio-1" class="custom-control-input" :id="'customRadio'+p.provinsi" checked="" type="radio" v-model="areaProvinsi" @change="changeProvinsi()" :value="p.provinsi">
                      <label class="custom-control-label font-weight-bold" :for="'customRadio'+p.provinsi">{{p.provinsi}}</label>
                    </div>
                  </div>
                </div>
            </modal>

            <!-- MODAL KOTA -->
            <modal :show.sync="modalKota.show"  size="large">
                <h6 class="modal-title mb-4" id="modal-title-default">Area Kota</h6>
                <div class="card bg-light mb-3 shadow-lg--hover" v-for="k in kota">
                  <div class="card-body">
                    <div class="custom-control custom-radio">
                      <input name="custom-radio-1" class="custom-control-input" :id="'customRadio'+k.kota" checked="" type="radio" v-model="area" @change="changeArea()" :value="k.kota">
                      <label class="custom-control-label font-weight-bold" :for="'customRadio'+k.kota">{{k.kota}}</label>
                    </div>
                  </div>
                </div>
            </modal>
        </div>
    </header>
</template>

<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import Modal from "@/components/Modal.vue";
import Beranda from "@/views/users/Beranda.vue";
import bus from '../eventBus';
import Api from '@/helpers/api';
import transaksi from '@/services/transaksi.service';
import akun from '@/services/akun.service';
import axios from 'axios';
import config from '@/configs/config';

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
    Modal
  },
  data() {
      return {
          area: '',
          areaProvinsi: '',
          modalArea: {
              show: '',
          },
          modalKota: {
              show: false,
          },
          authenticated: '',
          totalItem: 0,
          nama_lengkap: '',
          provinsi: {},
          kota: {},
      };
  },
  mounted(){
    this.get()
    this.getProvinsi()
  },
  created () {
        var context = this;
        bus.$on('RELOAD_USER', function () {
          context.get();
        });
    },
  methods: {
    get(){
        let modalArea      = localStorage.getItem('area');
        this.authenticated = localStorage.getItem('authenticated')

        if (modalArea == null) {
            this.modalArea.show = true;
        }else{
            this.area = modalArea
            this.modalArea.show = false;
            this.modalKota.show = false;
        }

        if (this.authenticated == 'true') {
            // LOAD KERANJANG
            let context = this;               
            Api(context, transaksi.keranjang()).onSuccess(function(response) {    
              context.totalItem = response.data.data.totalItem;
            }).onError(function(error) {                    
              if (error.response.status == 404) {
                  context.totalItem = [];
              }
            })
            .call()

            // LOAD USER
            this.getProfile()
        }
    },
    getProvinsi(){
        axios.get(config.apiUrl +"akun/get-provinsi").then(response => {
            this.provinsi = response.data.data
        })
        .catch(err => {
            if (err.response.status == 404) {
                this.totalItem = [];
            }
        })
    },
    changeProvinsi(){
        this.modalKota.show = true
        let params = {provinsi: event.target.value}
            
        axios.get(config.apiUrl +"akun/get-kota", {params}).then(response => {
            this.kota = response.data.data
        })
        .catch(err => {
            if (error.response.status == 404) {
                this.kota = [];
            }
        })
    },
    changeArea(){
        localStorage.setItem('area', event.target.value)
        this.get()
        bus.$emit('RELOAD_GET_BARANG')
    },
    changeCategory(){
        bus.$emit('CHANGE_CATEGORY')
    },
    logout(){
      localStorage.removeItem('token');
      localStorage.setItem('authenticated', false)  
      this.$router.push('/login')
      this.get()
      this.totalItem = 0;
    },
    getProfile(){
        let context = this;               
        Api(context, akun.indexProfile()).onSuccess(function(response) {    
            context.nama_lengkap = response.data.data[0].nama_lengkap;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.nama_lengkap = [];
            }
        })
        .call()
    },
  }
};
</script>
<style>
</style>
