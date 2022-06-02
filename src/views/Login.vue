<template>
    <section class="section section-lg my-0" style="background-image: url('img/brand/bg_login_bck.jpg'); background-repeat:no-repeat; background-size: 1450px 800px">
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
                    <card  shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-lg-4">
                        <template>
                            <div class="text-muted text-center mb-5">
                                <img src="img/brand/bck.png" height="100" width="100" class="rounded-circle mr-2" style="margin-top: -100px;  border-color: white; border-width: 10px" shadow>
                            </div>
                        </template>
                        <template>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Username"
                                            v-model="username"
                                            v-on:keyup.enter="login()"
                                            addon-left-icon="ni ni-single-02">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            v-model="password"
                                            v-on:keyup.enter="login()"
                                            id="password"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            addon-right-icon="fa fa-eye-slash">
                                </base-input>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="login()" :disabled="onLoading">
                                        <span v-if="onLoading"><i class="fa fa-spinner fa-spin"></i> Please Wait...</span>
                                        <span v-else>
                                            <span>Login</span>
                                        </span>
                                    </base-button>
                                </div>
                            </form>
                            <div class="text-center text-muted mb-4">
                                <!-- <small><router-link :to="'/register'" class="nav-link nav-link-icon text-primary" rel="noopener" data-toggle="tooltip" title="Daftar">Belum punya akun ? Daftar di sini</router-link></small> -->
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import config from '@/configs/config';
    import axios from 'axios';
    import bus from '@/eventBus';
    import Api from '@/helpers/api';
    import akun from '@/services/akun.service';

export default {
    data() {
    return {
      username: '',
      password: '',
      onLoading: false,
    };
  },
  methods: {
    login() {             
      if (this.username && this.password) {
        var formData = new FormData()
        formData.append('username',  this.username)
        formData.append('password', this.password)

        axios.post(config.apiUrl +"auth/login", formData)
        .then(response => {
          localStorage.setItem('token', response.data.access_token)                                        
          localStorage.setItem('authenticated', true) 

            // ======== untuk menentukan admin ============
            let context = this;     
            context.onLoading = true;          
            Api(context, akun.indexProfile()).onSuccess(function(response) {
                var dataRole = response.data.data[0];
                context.notifyVue('Selamat anda berhasil login '+dataRole.full_name, 'top', 'right', 'info')
                localStorage.setItem('role', dataRole.role) 
                // if (dataRole.role == 'Admin') {
                    context.$router.push('/dashboard')
                // }else{
                //     context.$router.push('/profile')
                // }
            }).onError(function(error) {  
            })
            .call() 
            // ==============================================                                      
            context.onLoading = true;
          this.reloadUser();
        })
        .catch(err => {
         this.notifyVue('Username atau Password Salah', 'top', 'right', 'danger')
        })
      } else {
        this.notifyVue('Error Username Password Required', 'top', 'right', 'danger')
      }
    },
    reloadUser(){
        bus.$emit('RELOAD_USER')
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
};
</script>
