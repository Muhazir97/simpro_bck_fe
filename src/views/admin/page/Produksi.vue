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

      <!-- PER MOUNTH -->
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
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(1)">JANUARI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Jan) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Jan) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Jan) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(2)">FEBRUARI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Feb) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Feb) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Feb) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(3)">MARET</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Mar) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Mar) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Mar) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(4)">APRIL</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Apr) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Apr) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Apr) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(5)">MEI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Mei) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Mei) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Mei) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(6)">JUNI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Jun) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Jun) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Jun) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(7)">JULI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Jul) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Jul) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Jul) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(8)">AGUSTUS</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Aug) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Aug) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Aug) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(9)">SEPTEMBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Sep) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Sep) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Sep) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(10)">OKTOBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Oct) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Oct) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Oct) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(11)">NOVEMBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Nov) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Nov) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Nov) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(12)">DESEMBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Des) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Des) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Des) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">TOTAL</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalWeightProdSlt) }}</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalWeightProdTll) }}</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalWeightProdShr) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>

      <!-- DAILY -->
      <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
        <template slot="header">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8 text-center">
              <h5 class="card-title font-weight-bold">Daily Poduction Report</h5><br>
              <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">{{ moment().set({'month': month}).format('MMMM') }} {{new Date().getFullYear()}}</h5><br>
            </div>
            <div class="col-2">
              <a :href="apiUrl+'print-daily-production-report?month='+Number(month + 1)+''" target="_BLANK">
                <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                  <i class="fa fa-file-text"></i> Print
                </button>
              </a>
            </div>
          </div>
        </template>
        <!-- <div class="scroll"> -->
          <table border='1'>
            <thead>
              <slot name="columns">
                <tr style="background-color: #F0F8FF;">
                  <th style="font-size: 13px; text-align: center;" width="4">TANGGAL</th>
                  <th style="font-size: 13px; text-align: center; background-color: #DCDCDC;">SLITTING</th>
                  <th style="font-size: 13px; text-align: center; background-color: #F0FFF0;">TOLLING PIPA</th>
                  <th style="font-size: 13px; text-align: center; background-color: #FFFACD;">SHEARING</th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr v-for="(row, i) in table.data" :key="i">
                <td style="font-size: 13px; text-align: center;">{{ i }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #DCDCDC;">{{ convertRp(table.data[i]) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0FFF0;">{{ convertRp(table.dataTll[i]) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFFACD;">{{ convertRp(table.dataShr[i]) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">TOTAL</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(weightSltDaily) }}</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(weightTllDaily) }}</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(weightShrDaily) }}</td>
              </tr>
            </tbody>
          </table>
        <!-- </div> -->
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
  var moment = require('moment');
  
  export default {
    components: {
      ChartCard,
      StatsCard,
    },
    data () {
      return {    
        moment:moment,    
        apiUrl :config.apiUrl,
        tokenApi : '',
        role : '',
        Slt : '',
        Tll : '',
        Shr : '',

        rkpSlt: {},
        rkpTll: {},
        rkpShr: {},

        totalWeightProdSlt: '',
        totalWeightProdTll: '',
        totalWeightProdShr: '',
        table: {
          data: []
        },
        table: {
          dataTll: []
        },
        table: {
          dataShr: []
        },
        weightSltDaily: '',
        weightTllDaily: '',
        weightShrDaily: '',
        month: '',
      }
    },
    mounted(){
      this.get();
      this.getRkpProduksiMonth();
      this.getRkpProduksiDaily(moment().format('MM'));
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
            
            context.totalWeightProdSlt = response.data.data.totalWeightProdSlt;
            context.totalWeightProdTll = response.data.data.totalWeightProdTll;
            context.totalWeightProdShr = response.data.data.totalWeightProdShr;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
            }
        })
        .call()
      },
      getRkpProduksiDaily(month){
        let context = this;               
        Api(context, produksi.getRkpProduksiDaily({month: month})).onSuccess(function(response) {
            context.table.data    = response.data.data.slt;
            context.table.dataTll = response.data.data.tll;
            context.table.dataShr = response.data.data.shr;
            
            context.weightSltDaily = response.data.data.weightSltDaily;
            context.weightTllDaily = response.data.data.weightTllDaily;
            context.weightShrDaily = response.data.data.weightShrDaily;

            context.month = Number(month - 1);
            context.$forceUpdate();
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
