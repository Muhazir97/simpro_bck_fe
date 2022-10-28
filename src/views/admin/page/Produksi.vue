<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row" v-if="role != 'Visitor'">
        <div class="col-xl-4 col-md-6">
          <router-link :to="'/report-slitting'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-scissors text-muted"></i>
              </div>
              <div slot="content">
                <p class="card-category">Slitting</p>
                <h4 class="card-title"> {{ convertRp(Slt) }} </h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-4 col-md-6">
          <router-link :to="'/produksi-tolling'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-support-17 text-primary"></i>
              </div>
              <div slot="content">
                <p class="card-category">Tolling Pipa</p>
                <h4 class="card-title"> {{ convertRp(Tll) }} </h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-4 col-md-6">
          <router-link :to="'/report-shearing'">
            <stats-card class="shadow">
              <div slot="header" class="icon-danger">
                <i class="nc-icon nc-preferences-circle-rotate text-danger"></i>
              </div>
              <div slot="content">
                <p class="card-category">Shearing</p>
                <h4 class="card-title"> {{ convertRp(Shr) }} </h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>
      </div>

      <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
        <template slot="header">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8 text-center">
              <h5 class="card-title font-weight-bold">RKP PRODUKSI - {{new Date().getFullYear()}}</h5><br>
              <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">PT. BUANA CENTRA KARYA</h5><br>
            </div>
            <div class="col-2">
            </div>
          </div>
        </template>
        <div class="scroll">
          <table border='1'>
            <thead>
              <slot name="columns">
                <tr style="background-color: #F0F8FF;">
                  <th style="font-size: 13px; text-align: center;">PERIODE</th>
                  <th style="font-size: 13px; text-align: center; background-color: #F0E68C;">SLITTING</th>
                  <th style="font-size: 13px; text-align: center; background-color: #00FA9A;">TOLLING PIPA</th>
                  <th style="font-size: 13px; text-align: center; background-color: #FFF5EE;">SHEARING</th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr>
                <td style="font-size: 13px;">JANUARI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Jan) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Jan) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Jan) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px;">FEBRUARI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Feb) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Feb) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Feb) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px;">MARET</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Mar) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Mar) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Mar) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px;">APRIL</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Apr) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Apr) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Apr) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px;">MEI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Mei) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Mei) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Mei) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px;">JUNI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Jun) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Jun) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Jun) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px;">JULI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Jul) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Jul) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Jul) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px;">AGUSTUS</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Aug) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Aug) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Aug) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px;">SEPTEMBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Sep) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Sep) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Sep) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px;">OKTOBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Oct) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Oct) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Oct) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px;">NOVEMBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Nov) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Nov) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Nov) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px;">DESEMBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Des) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Des) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Des) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>

      </div>
    </div>
  </div>
</template>
<script>
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import produksi from '@/services/produksi.service';
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
        Slt : '',
        Tll : '',
        Shr : '',

        rkpSlt: {},
        rkpTll: {},
        rkpShr: {},
      }
    },
    mounted(){
      this.get();
      this.getRkpProduksiMonth();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
      this.role = localStorage.getItem('role');
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, produksi.getCardAll()).onSuccess(function(response) {    
            context.Slt = response.data.data.Slt;
            context.Tll = response.data.data.Tll;
            context.Shr = response.data.data.Shr;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
            }
        })
        .call()
      },
      getRkpProduksiMonth(param){
        let context = this;               
        Api(context, produksi.getRkpProduksiMonth()).onSuccess(function(response) {    
            context.rkpSlt = response.data.data.sltInt;
            context.rkpTll = response.data.data.tll;
            context.rkpShr = response.data.data.shr;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
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
