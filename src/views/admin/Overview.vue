<template>
  <div class="content">
    <div class="container-fluid">
        <!-- <a :href="apiUrl+'report-all'" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Generate Report</a> -->
      <div class="row" v-if="role != 'Visitor'">
        <div class="col-xl-3 col-md-6">
          <router-link :to="'/client-master'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-badge text-muted"></i>
              </div>
              <div slot="content">
                <p class="card-category">Client Master</p>
                <h4 class="card-title">{{ count_task.client }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6">
          <router-link :to="'/material-master'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-app text-info"></i>
              </div>
              <div slot="content">
                <p class="card-category">Mother Coil</p>
                <h4 class="card-title">{{ count_task.material }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6">
          <router-link :to="'/slit-coil'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-support-17 text-light"></i>
              </div>
              <div slot="content">
                <p class="card-category">Slit Coil</p>
                <h4 class="card-title">{{ count_task.slit_coil }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6">
          <router-link :to="'/job-request'">
            <stats-card class="shadow">
              <div slot="header" class="icon-danger">
                <i class="nc-icon nc-notes text-danger"></i>
              </div>
              <div slot="content">
                <p class="card-category">Job Order</p>
                <h4 class="card-title">{{ count_task.job_request }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6">
          <router-link :to="'/delivery'">
            <stats-card class="shadow">
              <div slot="header" class="icon-danger">
                <i class="nc-icon nc-delivery-fast text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Delivery</p>
                <h4 class="card-title">{{ count_task.delivery }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6">
          <router-link :to="'/news'">
            <stats-card class="shadow">
              <div slot="header" class="icon-info">
                <i class="nc-icon nc-paper-2 text-dark"></i>
              </div>
              <div slot="content">
                <p class="card-category">BA</p>
                <h4 class="card-title">{{ count_task.news }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6">
          <router-link :to="'/invoice'">
            <stats-card class="shadow">
              <div slot="header" class="icon-info">
                <i class="nc-icon nc-single-copy-04 text-primary"></i>
              </div>
              <div slot="content">
                <p class="card-category">Invoice</p>
                <h4 class="card-title">{{ count_task.invoice }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <!-- <div class="col-xl-3 col-md-6">
          <router-link :to="'/payment'">
            <stats-card class="shadow">
              <div slot="header" class="icon-info">
                <i class="nc-icon nc-credit-card text-success"></i>
              </div>
              <div slot="content">
                <p class="card-category">Payment</p>
                <h4 class="card-title">{{ count_task.invoice }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div> -->
      </div>

        <div class="table-responsive" v-if="role != 'Visitor'">
          <card class="strpied-tabled-with-hover shadow"
                  body-classes="table-full-width table-responsive"
            >
              <template slot="header">
                <div class="row">
                  <div class="col-3">
                    <!-- <h4 class="card-title">Payment</h4> -->
                  </div>
                  <div class="col-6 text-center">
                    <h5 class="card-title font-weight-bold">STEEL CENTER</h5><br>
                    <h5 class="card-title font-weight-bold" style="margin-top: -20px;">PROJECT MONITORING - {{new Date().getFullYear()}}</h5><br>
                    <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">PT. BUANA CENTRA KARYA</h5><br>
                  </div>
                  <div class="col-3 mt-4">
                    <a :href="apiUrl+'print-project-monitoring?job_no='+search.job_no+'&po_no='+search.po_no+'&client_name='+search.client_name+'&prod_class='+search.prod_class+'&date='+search.date+''" target="_BLANK">
                      <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                        <i class="fa fa-file-text"></i> Print
                      </button>
                    </a>
                    <button type="submit" class="btn btn-sm btn-secondary btn-fill float-right" @click="filter()"><i class="fa fa-filter"></i> Filter</button>
                  </div>
                </div>
              </template>
              <div class="scroll">
                <table class="table">
                  <thead>
                    <slot name="columns">
                      <tr style="background-color: #F0F8FF;">
                        <!-- <th>NO</th> -->
                        <th>JOB NO</th>
                        <th>PO NO</th>
                        <th>CLIENT</th>
                        <th>DATE</th>
                        <th>PROD CLASS</th>
                        <th style="background-color: #F0E68C;">WEIGHT</th>
                        <th style="background-color: #F0E68C;">RATE</th>
                        <th style="background-color: #F0E68C;">TOTAL</th>
                        <th></th>
                        <th style="background-color: #E6E6FA;">DELIVERY OUT</th>
                        <th style="background-color: #E6E6FA;">DELIVERY SISA</th>
                        <th style="background-color: #E6E6FA;">DELIVERY TOTAL (Rp)</th>
                        <th></th>
                        <th style="background-color: #00FA9A;">BA OUT</th>
                        <th style="background-color: #00FA9A;">BA SISA</th>
                        <th style="background-color: #00FA9A;">BA TOTAL</th>
                        <th></th>
                        <th style="background-color: #FFE4B5;">INVOICE OUT</th>
                        <th style="background-color: #FFE4B5;">INVOICE SISA</th>
                        <th style="background-color: #FFE4B5;">INVOICE AMOUNT</th>
                        <th style="display: none" ></th>
                      </tr>
                    </slot>
                  </thead>
                  <tbody>
                    <tr v-for="(row, i) in table.data" :key="i">
                      <!-- <td> {{ i + 1 }}</td> -->
                      <td style="font-size: 13px;">
                        <router-link :to="/detail-job-request/+row.job_no"><label style="cursor: pointer;" class="badge badge-success">{{row.job_no}}</label></router-link>
                      </td>
                      <td style="font-size: 13px;">{{row.po_no}}</td>
                      <td style="font-size: 13px;">{{row.client_name}}</td>
                      <td style="font-size: 13px;">{{ moment(row.created_at).locale('id').format('L') }}</td>
                      <td style="font-size: 13px;">{{row.prod_class}}</td>
                      <td style="font-size: 13px; background-color: #F0E68C;">{{ convertRp(row.weight) }}</td>
                      <td style="font-size: 13px; background-color: #F0E68C;">{{row.rate}}</td>
                      <td style="font-size: 13px; background-color: #F0E68C;">{{ convertRp(row.weight * row.rate) }}</td>
                      <td></td>
                      <!-- DELIVERY -->
                      <td style="font-size: 13px; background-color: #E6E6FA;">{{ convertRp(row.delivery_qty) }}</td>
                      <td style="font-size: 13px; background-color: #E6E6FA;" v-if="row.delivery_qty">{{ convertRp(row.weight - row.delivery_qty) }}</td>
                      <td v-else style="font-size: 13px; background-color: #E6E6FA;"></td>
                      <td style="font-size: 13px; background-color: #E6E6FA;">{{ convertRp(row.delivery_qty * row.rate) }}</td>
                      <td></td>
                      <!-- NEWS -->
                      <td style="font-size: 13px; background-color: #00FA9A;">{{ convertRp(row.news_qty) }}</td>
                      <td style="font-size: 13px; background-color: #00FA9A;"  v-if="row.news_qty">{{ convertRp(row.weight - row.news_qty) }}</td>
                      <td v-else style="font-size: 13px; background-color: #00FA9A;"></td>
                      <td style="font-size: 13px; background-color: #00FA9A;">{{ convertRp(row.news_qty * row.rate) }}</td>
                      <td></td>
                      <!-- INVOICE -->
                      <td style="font-size: 13px; background-color: #FFE4B5;">{{ convertRp(row.invoice_qty) }}</td>
                      <td style="font-size: 13px; background-color: #FFE4B5;"  v-if="row.invoice_qty">{{ convertRp(row.weight - row.invoice_qty) }}</td>
                      <td v-else style="font-size: 13px; background-color: #FFE4B5;"></td>
                      <td style="font-size: 13px; background-color: #FFE4B5;">{{ convertRp(row.invoice_qty * row.rate) }}</td>
                      <th style="display: none" ></th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </card>
        </div>

        <!-- MODAL FILTER -->
        <div>
           <modal :show.sync="formFilter.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{formFilter.title}}</h5>
             </template>
             <div>
              <base-input type="text"
                    label="Job No"
                    placeholder="Job No"
                    v-model="search.job_no">
              </base-input>
              <base-input type="text"
                    label="Po Number"
                    placeholder="Po Number"
                    v-model="search.po_no">
              </base-input>
              <div class="form-group">
                <label>Client</label><br>
                <autocomplete 
                  ref="autocomplete"
                  :url="apiUrl+'client/find-client'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="client_name"
                  label="client_code"
                  :on-select="getDataFilter"
                  placeholder="Choose Client"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <div class="form-group">
                <label>Production Classification</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.prod_class">
                  <option selected>Select Classification</option>
                  <option value="Slitting">Slitting</option>
                  <option value="Tolling">Tolling</option>
                  <option value="Shearing">Shearing</option>
                </select>
              </div>
              <small class="d-block text-uppercase font-weight-bold mb-3">Date range</small>
              <div class="input-daterange datepicker row align-items-center">
                  <div class="col">
                      <base-input addon-left-icon="ni ni-calendar-grid-58">
                          <flat-picker slot-scope="{focus, blur}"
                                       @on-open="focus"
                                       @on-close="blur"
                                       :config="{allowInput: true, mode: 'range',}"
                                       class="form-control datepicker"
                                       v-model="search.date">
                          </flat-picker>
                      </base-input>
                  </div>
              </div>

             </div>
             <template slot="footer">
                 <base-button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="formFilter.show = false">Close</base-button>
                 <base-button type="primary" class="btn btn-sm btn-info btn-fill" @click="countTask(), formFilter.show = false">Filter</base-button>
             </template>
           </modal>
        </div>

        <!-- JIKA ROLE NYA VISITOR -->
        <div v-if="role == 'Visitor'">
          <p class="display-2 img-fluid floating align-content-center">Hallo Selamat Datang di Simpro BCK</p>
          <img src="img/theme/Hello.png" class="img-fluid floating">
        </div>

      <!-- <div class="container-fluid" style="width: 900px;">
        <line-chart :chart-data="datacollection" height="150"></line-chart>
      </div> -->

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Modal from '@/components/Modal.vue'
  import ChartCard from '@/components/Cards/ChartCard.vue'
  import StatsCard from '@/components/Cards/StatsCard.vue'
  import LTable from '@/components/Table.vue'
  import LineChart from './LineChart.js'
  import Api from '@/helpers/api';
  import dashboard from '@/services/dashboard.service';
  import config from '@/configs/config';
  var moment = require('moment');
  import Autocomplete from 'vue2-autocomplete-js'
  require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";


  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard,
      LineChart,
      Modal,
      Autocomplete,
      flatPicker,
    },
    data () {
      return {
        moment:moment,
        formFilter: {
          add: true,
          title: "Filter",
          show: false
        },
        count_task : [],
        apiUrl :config.apiUrl,
        role: '',
        table: {
          data: []
        },
        search: {
          job_no: '',
          po_no: '',
          client_name: '',
          prod_class: '',
          date: '',
        },
        tokenApi : '',
     }
    },
    mounted(){
      this.countTask();
      this.role = localStorage.getItem('role');
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
      countTask(){
        let context = this;               
        Api(context, dashboard.countTask({job_no: context.search.job_no, job_name: context.search.job_name, po_no: context.search.po_no, prod_class: context.search.prod_class, date: context.search.date})).onSuccess(function(response) {    
            context.count_task = response.data.data;
            context.table.data = response.data.data.report;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.count_job_request = [];
            }
        })
        .call()
      },
      filter() {
        this.formFilter.add   = true;
        this.formFilter.show  = true;
        this.formFilter.title = "Filter";
        this.$refs.autocomplete.clearInput()
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

      // ================= Autocomplete ============
      // AMBIL DATA YANG DI PILIH AC FILTER
      getDataFilter(obj){
        this.search.client_name = obj.client_name;
      },
      // AMBIL DATA DARI API AC
      processJSON(json) {
        return json.data
      },
    }
  }
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>