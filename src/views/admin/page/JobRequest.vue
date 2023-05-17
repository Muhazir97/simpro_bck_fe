<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <a v-if="role != 'Visitor'" :href="apiUrl+'report-excel/job-request?job_no='+search.job_no+'&job_name='+search.job_name+'&po_no='+search.po_no+'&client_name='+search.client_name+'&prod_class='+search.prod_class+'&date='+search.date+''" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Export</a>
          <button v-if="role != 'Visitor'" class="btn btn-sm btn-success mb-4" @click="modalImport()"><i class="fa fa-upload fa-sm"></i> Import</button>
          <card class="strpied-tabled-with-hover shadow"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <div class="row">
                <div class="col-4">
                  <h4 class="card-title">Job Order</h4>
                </div>
                <div class="col-4">
                </div>
                <div class="col-4">
                  <button type="submit" class="btn btn-sm btn-secondary btn-fill float-right" @click="filter()">
                    Filter
                  </button>
                  <button v-if="role != 'Visitor'" type="submit" class="btn btn-sm btn-info btn-fill float-right mr-2" @click="create()">
                    Add New
                  </button>
                </div>
              </div>
            </template>
            <div class="scroll">
              <table class="table">
                <thead>
                  <slot name="columns">
                    <tr style="background-color: #F0F8FF;">
                      <th>Job Number</th>
                      <th>Job Name</th>
                      <!-- <th>Job Description</th> -->
                      <th>Po Number</th>
                      <th>Client</th>
                      <th>Prod Class</th>
                      <th>Weight</th>
                      <th>Rate /KG</th>
                      <th>Status</th>
                      <th v-if="role != 'Visitor'">Created At</th>
                      <th v-if="role != 'Visitor'">Created By</th>
                      <th></th>
                      <th></th>
                      <th style="display: none" ></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in table.data" :key="i">
                    <td style="font-size: 13px;">
                      <label class="badge badge-info" style="cursor: pointer;" @click="detail(row.job_no)">{{ row.job_no }}</label>
                    </td>
                    <td style="font-size: 13px;">{{ row.job_name }}</td>
                    <!-- <td style="font-size: 13px;">{{row.job_description}}</td> -->
                    <td style="font-size: 13px;">{{ row.po_no }}</td>
                    <td style="font-size: 13px;">{{ row.client_name }}</td>
                    <td style="font-size: 13px;">{{ row.prod_class }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.weight) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.rate) }}</td>
                    <td>
                      <label class="badge badge-danger">{{row.job_status}}</label>
                    </td>
                    <td style="font-size: 13px;" v-if="role != 'Visitor'">{{ moment(row.created_at).locale('id').format('L') }}</td>
                    <td style="font-size: 13px;" v-if="role != 'Visitor'">{{row.created_by}}</td>
                    <td>
                      <i class="fa fa-edit" aria-hidden="true" style="cursor: pointer;" @click="edit(row.id)" title="Edit" v-if="role != 'Visitor'"></i>
                    </td>
                    <td>
                      <i class="fa fa-trash-o" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="remove(row.id)" v-if="role != 'Visitor'"></i>
                    </td>
                    <td style="display: none" ></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <template slot="footer">
              <div class="float-left">TOTAL : {{table.data.length}} , TOTAL WEIGHT : {{ convertRp(totalWeight) }} </div>
              <div class="float-right">
                <base-pagination :page-count="pagination.page_count" v-model="pagination.default" @input="changePage"></base-pagination>
              </div>
            </template>
          </card>

          <!-- CHART ORDER -->
          <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive" v-if="role != 'Visitor'">
            <template slot="header">
              <div class="row">
                <div class="col-2">
                </div>
                <div class="col-8 text-center">
                  <h5 class="card-title font-weight-bold"><u>DIAGRAM ORDER</u> </h5><br>
                  <!-- <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">Desember - 2022</h5><br> -->
                </div>
                <div class="col-2">
                  <a :href="apiUrl+'print-rkp-job-order?job_no='+search.job_no+'&job_name='+search.job_name+'&po_no='+search.po_no+'&client_name='+search.client_name+'&prod_class='+search.prod_class+'&date='+search.date+''" target="_BLANK">
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
          <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive" v-if="role != 'Visitor'">
            <template slot="header">
              <div class="row">
                <div class="col-2">
                </div>
                <div class="col-8 text-center">
                  <h5 class="card-title font-weight-bold">RKP WEIGHT ORDER</h5><br>
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

        <!-- MODAL CREATE JOB REQ-->
        <div>
           <modal :show.sync="form.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
             </template>
             <div>
              <div class="form-group">
                <label>Job Name</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="jobRequestData.job_name">
                  <option selected>Select Classification</option>
                  <option value="Slitting">Slitting</option>
                  <option value="Tolling">Tolling</option>
                  <option value="Shearing">Shearing</option>
                  <option value="Lain - Lain ...">Lain - Lain ...</option>
                </select>
              </div>
              <!-- <base-input type="text"
                    label="Job Description"
                    placeholder="Job Description"
                    v-model="jobRequestData.job_description">
              </base-input> -->
              <base-input type="text"
                    label="Po Number"
                    placeholder="Po Number"
                    v-model="jobRequestData.po_no">
              </base-input>
              <div class="form-group">
                <label>Client</label><br>
                <autocomplete 
                  ref="autocompleteAdd"
                  :url="apiUrl+'client/find-client'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="client_name"
                  label="client_code"
                  :on-select="getData"
                  placeholder="Choose Client"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <div class="form-group">
                <label>Production Classification</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="jobRequestData.prod_class">
                  <option selected>Select Classification</option>
                  <option value="Slitting">Slitting</option>
                  <option value="Tolling">Tolling</option>
                  <option value="Shearing">Shearing</option>
                </select>
              </div>
              <base-input type="number"
                  label=" Weight"
                  placeholder=" Weight"
                  v-model="jobRequestData.weight">
              </base-input>
              <base-input type="number"
                  label=" Rate"
                  placeholder=" Rate"
                  v-model="jobRequestData.rate">
              </base-input>
              <base-input type="date"
                    label="Date"
                    placeholder="Date"
                    v-model="jobRequestData.created_at">
              </base-input>
             </div>
             <template slot="footer">
                 <base-button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="form.show = false">Close</base-button>
                 <base-button type="primary" class="btn btn-sm btn-info btn-fill" @click="save()">Save</base-button>
             </template>
           </modal>
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
                    label="Job Name"
                    placeholder="Job Name"
                    v-model="search.job_name">
              </base-input>
              <base-input type="text"
                    label="Po Number"
                    placeholder="Po Number"
                    v-model="search.po_no">
              </base-input>
              <div class="form-group" v-if="role != 'Visitor'">
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
                 <base-button type="primary" class="btn btn-sm btn-info btn-fill" @click="get(), formFilter.show = false">Filter</base-button>
             </template>
           </modal>
        </div>

        <!-- MODAL IMPORT -->
        <div>
           <modal :show.sync="formImport.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{formImport.title}}</h5>
             </template>
             <div>
                <base-input type="file"
                      label="Upload File"
                      placeholder="Upload File"
                      @change="filesChange">
                </base-input>
                <small>Download Template<a :href="storageUrl+'template_import/Template Import Job Order.xlsx'"> Import Job Order</a></small>
             </div>
             <template slot="footer">
                 <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="formImport.show = false">Close</button>
                 <button type="primary" class="btn btn-sm btn-info btn-fill" @click="importData()" :disabled="onLoading">
                    <span v-if="onLoading"><i class="fa fa-spinner fa-spin"></i> Please Wait...</span>
                    <span v-else>
                        <span>Import</span>
                    </span>
                </button>
             </template>
           </modal>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import StatsCard from '@/components/Cards/StatsCard.vue'
  import Modal from '@/components/Modal.vue'
  import LineChart from '../LineChart.js'
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import jobRequest from '@/services/jobRequest.service';
  import Autocomplete from 'vue2-autocomplete-js'
  require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  var moment = require('moment');
  
  export default {
    components: {
      StatsCard,
      Modal,
      Autocomplete,
      flatPicker,
      LineChart,
    },
    data () {
      return {
        moment:moment,
        pagination: {
          page_count: '',
          default: 1,
          page: '',
        },
        onLoading: false,
        table: {
          data: []
        },
        tableAkumulasiClient: {
          data: []
        },
        totalAkumulasiSlittingALL: '',
        totalAkumulasiTollingALL: '',
        totalAkumulasiShearinggALL: '',
        form: {
            add: true,
            title: "Create Job Order",
            show: false
        },
        formFilter: {
            add: true,
            title: "Filter",
            show: false
        },
        formImport: {
            add: true,
            title: "Import Mother Coil",
            show: false
        },
        loadTimeout: null,
        search: {
          job_no: '',
          job_name: '',
          po_no: '',
          client_name: '',
          prod_class: '',
          date: '',
        },
        totalWeight: '',
        totalWeightSltDhj: '',
        totalWeightSltKpi: '',
        totalWeightTllDhj: '',
        totalWeightTllKpi: '',
        totalWeightShrAll: '',

        jobRequestData: {},
        apiUrl :config.apiUrl,
        storageUrl : config.storageUrl,
        tokenApi : '',
        role: '',
        dataImport: '',

        date_chart : [],
        datacollection: null,
      }
    },
    mounted(){
      this.get();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
      this.role     = localStorage.getItem('role');
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, jobRequest.index({job_no: context.search.job_no, job_name: context.search.job_name, po_no: context.search.po_no, client_name: context.search.client_name, prod_class: context.search.prod_class, date: context.search.date, page: context.pagination.page})).onSuccess(function(response) {    
            context.table.data            = response.data.data.data.data;
            context.pagination.page_count = response.data.data.data.last_page
            context.totalWeight           = response.data.data.totalWeight;

            context.totalWeightSltDhj = response.data.data.totalWeightSltDhj;
            context.totalWeightSltKpi = response.data.data.totalWeightSltKpi;
            context.totalWeightTllDhj = response.data.data.totalWeightTllDhj;
            context.totalWeightTllKpi = response.data.data.totalWeightTllKpi;
            context.totalWeightShrAll = response.data.data.totalWeightShrAll;

            context.tableAkumulasiClient.data  = response.data.data.totalAkumulasi;
            context.totalAkumulasiSlittingALL  = response.data.data.totalAkumulasiSlittingALL;
            context.totalAkumulasiTollingALL   = response.data.data.totalAkumulasiTollingALL;
            context.totalAkumulasiShearinggALL = response.data.data.totalAkumulasiShearinggALL;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        }).onFinish(function() {  
            context.fillData()
        })
        .call()
      },
      filter() {
        this.formFilter.add     = true;
        this.formFilter.show    = true;
        this.formFilter.title   = "Filter";
        this.pagination.page    = 1 ;
        this.search.client_name = ''
        this.$refs.autocomplete.clearInput()
      },
      create() {
          this.form.add       = true;
          this.form.show      = true;
          this.form.title     = "Create Job Order";
          this.jobRequestData = {}
          this.defaultDate()
          this.$refs.autocompleteAdd.clearInput()
      },
      edit(id) {
        let context = this;               
        Api(context, jobRequest.show(id)).onSuccess(function(response) {
            context.jobRequestData = response.data.data[0];
            context.jobRequestData.created_at = response.data.data[0].created_at.split(' ')[0];
            context.form.show      = true;
            context.form.title     = 'Edit Job Order';
            context.$refs.autocompleteAdd.setValue(response.data.data[0].client_name)                        
        })
        .call()        
      },
      modalImport(){
        this.formImport.add   = true;
        this.formImport.show  = true;
        this.formImport.title = "Import Mother Coil";
      },
      filesChange(e) {
          this.dataImport = e.target.files[0];
      },
      importData(){
        let api = null;
        let context = this;
        let formData = new FormData();
        this.onLoading = true;

        if (this.dataImport != undefined) {
          formData.append('import_data', this.dataImport);
        }else{
          return alert('File Import Not Found')
        }

        api = Api(context, jobRequest.import(formData));
        api.onSuccess(function(response) {
            context.onLoading = false;
            context.get();
            context.formImport.show = false;
            context.notifyVue('Data Berhasil di Import', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue('Data Gagal di Import' , 'top', 'right', 'danger')
            context.onLoading = false;
        }).onFinish(function() {  
        })
        .call();
      },
      save(){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        if (this.jobRequestData.job_name != undefined && this.jobRequestData.prod_class != undefined && this.jobRequestData.client_name != undefined && this.jobRequestData.weight != undefined && this.jobRequestData.rate != undefined  && this.jobRequestData.created_at != undefined) {
          formData.append('job_name', this.jobRequestData.job_name);
          // formData.append('job_description', this.jobRequestData.job_description);
          formData.append('client_name', this.jobRequestData.client_name);
          formData.append('po_no', this.jobRequestData.po_no);
          formData.append('prod_class', this.jobRequestData.prod_class);
          formData.append('weight', this.jobRequestData.weight);
          formData.append('rate', this.jobRequestData.rate);
          formData.append('created_at', this.jobRequestData.created_at);
        }else{
          alert('Semua Field Wajib Di Isi')
        }

        if (context.form.title == 'Create Job Order') {
            api = Api(context, jobRequest.create(formData));
        } else {
            api = Api(context, jobRequest.update(this.jobRequestData.id, formData));
        }
        api.onSuccess(function(response) {
            context.get();
            context.form.show = false;
            context.notifyVue((context.formTitle === 'Add Data') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.formTitle === 'Add Data') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
      },
      remove(id) {
          var r = confirm("Anda yakin ingin menghapus data ini ?");
          if (r == true) {
            let context = this;

            Api(context, jobRequest.delete(id)).onSuccess(function(response) {
                context.get();
                context.notifyVue('Data Berhasil di Hapus', 'top', 'right', 'info')
            }).call();
          }
      },
      detail(job_no){
        this.$router.push('/detail-job-request/'+job_no)
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
      },
      changePage(page){
        this.pagination.page = page;
        this.get();
      },
      defaultDate(){
        var date  = new Date();
        var day   = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var today = date.getFullYear() + "-" + (month) + "-" + (day);

        this.jobRequestData.created_at = today
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

      // ================= Autocomplete ============
      // AMBIL DATA YANG DI PILIH AC
      getData(obj){
        this.jobRequestData.client_name = obj.client_name;
      },
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
