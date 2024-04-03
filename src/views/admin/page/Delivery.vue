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
                <p class="card-category">Pipa Non Prime</p>
                <h4 class="card-title"> {{ convertRp(SltScr) }} </h4>
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
              <h5 class="card-title font-weight-bold">RKP DELIVERY - {{ year }}</h5><br>
              <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">PT. BUANA CENTRA KARYA</h5><br>
            </div>
            <div class="col-2">
              <select class="form-select form-control" aria-label="Default select example" v-model="year" @click="get(month), getRkpDeliveryMonth()">
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
        </template>
        <!-- <div class="scroll"> -->
          <table border='1'>
            <thead>
              <slot name="columns">
                <tr style="background-color: #F0F8FF;">
                  <th style="font-size: 13px; text-align: center;">PERIODE</th>
                  <th style="font-size: 13px; text-align: center; background-color: #F0E68C;">SLITTING INT</th>
                  <th style="font-size: 13px; text-align: center; background-color: #E6E6FA;">SLITTING EXT</th>
                  <th style="font-size: 13px; text-align: center; background-color: #00FA9A;">TOLLING PIPA</th>
                  <th style="font-size: 13px; text-align: center; background-color: #FFF5EE;">SHEARING</th>
                  <th style="font-size: 13px; text-align: center; background-color: #87CEFA">SIPO</th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="get(1)">JANUARI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSltInt.Jan) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #E6E6FA;">{{ convertRp(rkpSltExt.Jan) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Jan) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Jan) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #87CEFA">{{ convertRp(rkpSpo.Jan) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="get(2)">FEBRUARI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSltInt.Feb) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #E6E6FA;">{{ convertRp(rkpSltExt.Feb) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Feb) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Feb) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #87CEFA">{{ convertRp(rkpSpo.Feb) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="get(3)">MARET</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSltInt.Mar) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #E6E6FA;">{{ convertRp(rkpSltExt.Mar) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Mar) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Mar) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #87CEFA">{{ convertRp(rkpSpo.Mar) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="get(4)">APRIL</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSltInt.Apr) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #E6E6FA;">{{ convertRp(rkpSltExt.Apr) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Apr) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Apr) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #87CEFA">{{ convertRp(rkpSpo.Apr) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="get(5)">MEI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSltInt.Mei) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #E6E6FA;">{{ convertRp(rkpSltExt.Mei) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Mei) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Mei) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #87CEFA">{{ convertRp(rkpSpo.Mei) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="get(6)">JUNI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSltInt.Jun) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #E6E6FA;">{{ convertRp(rkpSltExt.Jun) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Jun) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Jun) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #87CEFA">{{ convertRp(rkpSpo.Jun) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="get(7)">JULI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSltInt.Jul) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #E6E6FA;">{{ convertRp(rkpSltExt.Jul) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Jul) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Jul) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #87CEFA">{{ convertRp(rkpSpo.Jul) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="get(8)">AGUSTUS</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSltInt.Aug) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #E6E6FA;">{{ convertRp(rkpSltExt.Aug) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Aug) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Aug) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #87CEFA">{{ convertRp(rkpSpo.Aug) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="get(9)">SEPTEMBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSltInt.Sep) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #E6E6FA;">{{ convertRp(rkpSltExt.Sep) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Sep) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Sep) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #87CEFA">{{ convertRp(rkpSpo.Sep) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="get(10)">OKTOBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSltInt.Oct) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #E6E6FA;">{{ convertRp(rkpSltExt.Oct) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Oct) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Oct) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #87CEFA">{{ convertRp(rkpSpo.Oct) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="get(11)">NOVEMBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSltInt.Nov) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #E6E6FA;">{{ convertRp(rkpSltExt.Nov) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Nov) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Nov) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #87CEFA">{{ convertRp(rkpSpo.Nov) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="get(12)">DESEMBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSltInt.Des) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #E6E6FA;">{{ convertRp(rkpSltExt.Des) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Des) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Des) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #87CEFA">{{ convertRp(rkpSpo.Des) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">TOTAL</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalWeightSltInt) }}</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalWeightSltExt) }}</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalWeightTll) }}</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalWeightShr) }}</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalWeightSpo) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">TOTAL SLITTING</td>
                <td colspan="2" style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(Number(+(totalWeightSltInt) + +(totalWeightSltExt))) }}</td>
                <td style="display: none" ></td>
              </tr>
            </tbody>
          </table>
        <!-- </div> -->
      </card>

      <!-- CHART DELIVERY -->
      <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
        <template slot="header">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8 text-center">
              <h5 class="card-title font-weight-bold"><u>DIAGRAM DELIVERY</u> </h5><br>
              <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">
                <span v-if="month != '' ">{{ moment().set({'month': Number(month) - 1}).locale('id').format('MMMM').toUpperCase() }} {{ year }}</span>
                <span v-else>ALL</span>
              </h5><br>
            </div>
            <div class="col-2">
              <a :href="apiUrl+'print-rkp-delivery?month='+month+'&year='+year+''" target="_BLANK">
                <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                  <i class="fa fa-print "></i> Print
                </button>
              </a>
            </div>
          </div>
        </template>
        <div class="container" >
          <line-chart :chart-data="datacollection" :width="300" :height="120"></line-chart>
        </div>
      </card>

      <!-- TOTAL AKUMULASI PER CLIENT -->
      <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
        <template slot="header">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8 text-center">
              <h5 class="card-title font-weight-bold">RKP WEIGHT DELIVERY</h5><br>
              <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">PT. BUANA CENTRA KARYA</h5><br>
            </div>
            <div class="col-2">
            </div>
          </div>
        </template>
        <!-- <div class="scroll"> -->
          <table border='1'>
            <thead>
              <slot name="columns">
                <tr style="background-color: #F0F8FF;">
                  <th style="font-size: 13px; text-align: center;">NO</th>
                  <th style="font-size: 13px; text-align: center;">CUSTOMER</th>
                  <th style="font-size: 13px; text-align: center;">SLITTING</th>
                  <th style="font-size: 13px; text-align: center;">TOLLING PIPA</th>
                  <th style="font-size: 13px; text-align: center;">SHEARING</th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr v-for="(row, i) in tableAkumulasiClient.data" :key="i">
                <td style="font-size: 13px; text-align: center;">{{ i + 1 }}</td>
                <td style="font-size: 13px;">{{ row.client_name }}</td>
                <td style="font-size: 13px; text-align: center;"> {{ convertRp(row.weight_slitting) }} </td>
                <td style="font-size: 13px; text-align: center;"> {{ convertRp(row.weight_tolling) }} </td>
                <td style="font-size: 13px; text-align: center;"> {{ convertRp(row.weight_shearing) }} </td>
              </tr>
              <tr>
                <td style="font-size: 13px; text-align: center; font-weight: bold;" colspan="2">TOTAL</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;"> {{ convertRp(totalAkumulasiSlittingALL) }} </td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;"> {{ convertRp(totalAkumulasiTollingALL) }} </td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;"> {{ convertRp(totalAkumulasiShearinggALL) }} </td>
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
  import delivery from '@/services/delivery.service';
  import ChartCard from '@/components/Cards/ChartCard.vue'
  import StatsCard from '@/components/Cards/StatsCard.vue'
  import LineChart from '../LineChart.js'
  var moment = require('moment');
  
  export default {
    components: {
      ChartCard,
      StatsCard,
      LineChart,
    },
    data () {
      return {      
        moment:moment,  
        tableAkumulasiClient: {
          data: []
        },
        totalAkumulasiSlittingALL: '',
        totalAkumulasiTollingALL: '',
        totalAkumulasiShearinggALL: '',
        apiUrl :config.apiUrl,
        tokenApi : '',
        role : '',
        SltInt : '',
        SltExt : '',
        SltTl : '',
        SltShr : '',
        SltScr : '',
        SltSpo : '',

        rkpSltInt: {},
        rkpSltExt: {},
        rkpTll: {},
        rkpShr: {},
        rkpSpo: {},

        totalWeightSltInt: '',
        totalWeightSltExt: '',
        totalWeightTll: '',
        totalWeightShr: '',

        totalWeightSltDhj: '',
        totalWeightSltKpi: '',
        totalWeightTllDhj: '',
        totalWeightTllKpi: '',
        totalWeightShrAll: '',

        datacollection: null,
        month: '',
        year: '',
      }
    },
    mounted(){
      this.month = moment().format('MM')
      this.year  = new Date().getFullYear()
      this.get();
      this.getRkpDeliveryMonth();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
      this.role = localStorage.getItem('role');
    },
    methods: {
      get(month){
        let context = this;               
        Api(context, delivery.getCardAll({month: month, year: context.year})).onSuccess(function(response) {    
            context.SltInt = response.data.data.SltInt;
            context.SltExt = response.data.data.SltExt;
            context.SltTl  = response.data.data.SltTl;
            context.SltShr = response.data.data.SltShr;
            context.SltScr = response.data.data.SltScr;
            context.SltSpo = response.data.data.SltSpo;

            context.totalWeightSltDhj = response.data.data.totalWeightSltDhj;
            context.totalWeightSltKpi = response.data.data.totalWeightSltKpi;
            context.totalWeightTllDhj = response.data.data.totalWeightTllDhj;
            context.totalWeightTllKpi = response.data.data.totalWeightTllKpi;
            context.totalWeightShrAll = response.data.data.totalWeightShrAll;

            context.tableAkumulasiClient.data  = response.data.data.totalAkumulasi;
            context.totalAkumulasiSlittingALL  = response.data.data.totalAkumulasiSlittingALL;
            context.totalAkumulasiTollingALL   = response.data.data.totalAkumulasiTollingALL;
            context.totalAkumulasiShearinggALL = response.data.data.totalAkumulasiShearinggALL;
            
            context.month = (month != undefined) ? Number(month) : '';
            context.$forceUpdate();
        }).onError(function(error) {                    
            if (error.response.status == 404) {
            }
        }).onFinish(function() {  
            context.fillData()
        })
        .call()
      },
      getRkpDeliveryMonth(param){
        let context = this;               
        Api(context, delivery.getRkpDeliveryMonth({year: context.year})).onSuccess(function(response) {    
            context.rkpSltInt = response.data.data.sltInt;
            context.rkpSltExt = response.data.data.sltExt;
            context.rkpTll    = response.data.data.tll;
            context.rkpShr    = response.data.data.shr;
            context.rkpSpo    = response.data.data.spo;

            context.totalWeightSltInt = response.data.data.totalWeightSltInt;
            context.totalWeightSltExt = response.data.data.totalWeightSltExt;
            context.totalWeightTll    = response.data.data.totalWeightTll;
            context.totalWeightShr    = response.data.data.totalWeightShr;
            context.totalWeightSpo    = response.data.data.totalWeightSpo;
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
      fillData () {
        this.datacollection = {
          labels: ['SLITTING', 'TOLLING', 'SHEARING ALL CLIENT'],
          datasets: [
            {
              label: 'DHJ',
              backgroundColor: '#7FFFD4',
              data: [this.totalWeightSltDhj,this.totalWeightTllDhj,this.totalWeightShrAll]
            }, 
            {
              label: 'KPI',
              backgroundColor: '#f87979',
              data: [this.totalWeightSltKpi,this.totalWeightTllKpi,0]
            }
          ],
        }
      },
      
    }
  }
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
