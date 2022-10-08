<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row" v-if="role != 'Visitor'">
        <div class="col-xl-4 col-md-6">
          <router-link :to="'/delivery-slt-int'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-cloud-download-93 text-muted"></i>
              </div>
              <div slot="content">
                <p class="card-category">Slitting Internal</p>
                <h4 class="card-title"> {{ convertRp(SltInt) }} </h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-4 col-md-6">
          <router-link :to="'/delivery-slt-ext'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-spaceship text-info"></i>
              </div>
              <div slot="content">
                <p class="card-category">Slitting External</p>
                <h4 class="card-title"> {{ convertRp(SltExt) }} </h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-4 col-md-6">
          <router-link :to="'/delivery-tl'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-support-17 text-primary"></i>
              </div>
              <div slot="content">
                <p class="card-category">Tolling Pipa</p>
                <h4 class="card-title"> {{ convertRp(SltTl) }} </h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-4 col-md-6">
          <router-link :to="'/delivery-shr'">
            <stats-card class="shadow">
              <div slot="header" class="icon-danger">
                <i class="nc-icon nc-preferences-circle-rotate text-danger"></i>
              </div>
              <div slot="content">
                <p class="card-category">Shearing</p>
                <h4 class="card-title"> {{ convertRp(SltShr) }} </h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-4 col-md-6">
          <router-link :to="'/delivery-spo'">
            <stats-card class="shadow">
              <div slot="header" class="icon-info">
                <i class="nc-icon nc-puzzle-10 text-dark"></i>
              </div>
              <div slot="content">
                <p class="card-category">Sipo</p>
                <h4 class="card-title"> {{ convertRp(SltSpo) }} </h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-4 col-md-6">
          <router-link :to="'/delivery-scr'">
            <stats-card class="shadow">
              <div slot="header" class="icon-danger">
                <i class="nc-icon nc-layers-3 text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Scrap</p>
                <h4 class="card-title"> {{ convertRp(SltScr) }} </h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>
      </div>

      </div>
    </div>
  </div>
</template>
<script>
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import delivery from '@/services/delivery.service';
  import ChartCard from '@/components/Cards/ChartCard.vue'
  import StatsCard from '@/components/Cards/StatsCard.vue'
  
  export default {
    components: {
      ChartCard,
      StatsCard,
    },
    data () {
      return {        
        apiUrl :config.apiUrl,
        tokenApi : '',
        role : '',
        SltInt : '',
        SltExt : '',
        SltTl : '',
        SltShr : '',
        SltScr : '',
        SltSpo : '',
      }
    },
    mounted(){
      this.get();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
      this.role = localStorage.getItem('role');
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, delivery.getCardAll()).onSuccess(function(response) {    
            context.SltInt = response.data.data.SltInt;
            context.SltExt = response.data.data.SltExt;
            context.SltTl  = response.data.data.SltTl;
            context.SltShr = response.data.data.SltShr;
            context.SltScr = response.data.data.SltScr;
            context.SltSpo = response.data.data.SltSpo;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        })
        .call()
      },
      convertRp(bilangan) {
        if (bilangan) {
          var number_string = bilangan.toString(),
              sisa    = number_string.length % 3,
              rupiah  = number_string.substr(0, sisa),
              ribuan  = number_string.substr(sisa).match(/\d{3}/g);

          if(ribuan){
            var separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
            return rupiah
          }else{
            return bilangan
          }
        }
      },
      
    }
  }
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
