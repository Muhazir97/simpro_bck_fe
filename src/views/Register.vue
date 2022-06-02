<template>
    <section class="section section-lg my-0" style="background-image: url('img/brand/bg_login.png'); background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),">
        <div class="shape shape-style-1 bg-gradient-green">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card style="background: linear-gradient(to right, #90EE90, #00FFFF)" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-center text-muted mb-4">
                                <h5 style="color: white;" shadow>Form Daftar User</h5>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Nama Lengkap"
                                            v-model="akun.nama_lengkap"
                                            addon-left-icon="ni ni-hat-3">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Alamat Lengkap"
                                            v-model="akun.alamat_lengkap"
                                            addon-left-icon="ni ni-map-big">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Kota"
                                            v-model="akun.kota"
                                            addon-left-icon="ni ni-building">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="provinsi"
                                            v-model="akun.provinsi"
                                            addon-left-icon="ni ni-istanbul">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            type="number"
                                            placeholder="No Handphone"
                                            v-model="akun.no_hp"
                                            addon-left-icon="ni ni-mobile-button">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            v-model="akun.email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Username"
                                            v-model="akun.username"
                                            addon-left-icon="ni ni-single-02">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            v-model="akun.password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="save()">Daftar</base-button>
                                </div>
                                <div class="text-center text-muted mb-4">
                                    <small><router-link :to="'/login'" class="nav-link nav-link-icon text-primary" rel="noopener" data-toggle="tooltip" title="Login">Sudah punya akun ? Login di sini</router-link></small>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import Api from '@/helpers/api';
    import akun from '@/services/akun.service';

    export default {
        data () {
          return {
            table: {
              data: []
            },
            form: {
                add: true,
                title: "Add Data",
                show: false
            },
            akun: {}, 
          }
        },
        mounted(){
        },
        methods: {
          save(){
            let api = null;
            let context = this;
            let formData = new FormData(); 

            formData.append('nama_lengkap', this.akun.nama_lengkap);
            formData.append('alamat_lengkap', this.akun.alamat_lengkap);
            formData.append('kota', this.akun.kota);
            formData.append('provinsi', this.akun.provinsi);
            formData.append('no_hp', this.akun.no_hp);
            formData.append('email', this.akun.email);
            formData.append('username', this.akun.username);
            formData.append('password', this.akun.password);

            api = Api(context, akun.create(formData));
            api.onSuccess(function(response) {
                context.akun = {}
                context.notifyVue(response.data.message, 'top', 'right', 'info')
            }).onError(function(error) {                    
                context.notifyVue(error.message, 'top', 'right', 'danger')
            }).onFinish(function() {  
            })
            .call();
          },
          notifyVue(message, verticalAlign, horizontalAlign, type) {
            const color = Math.floor((Math.random() * 4) + 1)
            this.$notifications.notify(
              {
                message: message,
                icon: 'nc-icon nc-app',
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: type
              })
          }
        }
    };
</script>
<style>
</style>
