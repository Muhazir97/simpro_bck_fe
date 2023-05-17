<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <!-- TOMBOL EXPORT IMPORT -->
            <div class="col-6">
              <a :href="apiUrl+'report-excel/prod-tolling?job_no='+search.job_no+'&client_name='+search.client_name+'&po_no='+search.po_no+'&op_no='+search.op_no+'&specification='+search.specification+'&line_machine='+search.line_machine+'&nd='+search.nd+'&material_tebal='+search.material_tebal+'&date='+search.date+''" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Export</a>
              <button class="btn btn-sm btn-success mb-4" @click="modalImport()"><i class="fa fa-upload fa-sm"></i> Import</button>
            </div>
            <!-- TOMBOL REPORT -->
            <div class="col-6">
              <router-link to="/report-tolling">
                <button class="btn btn-sm btn-warning mb-4 float-right" style="margin-left: 200px;"><i class="fa fa-files-o fa-sm"></i> Report</button>
              </router-link>
            </div>
          </div>

          <!-- CARD -->
          <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-6">
                  <h4 class="card-title">Prod Tolling Pipa</h4>
                </div>
                <div class="col-2">
                  <select style="margin-right: 900px;" class="form-select form-control" v-model="search.line_machine" @change="get()">
                    <option selected>Select Line</option>
                    <option value="TM 60">TM 60</option>
                    <option value="TM 114">TM 114</option>
                  </select>
                </div>
                <div class="col-4">
                  <button type="submit" class="btn btn-sm btn-secondary btn-fill float-right" @click="filter()">
                    Filter
                  </button>
                  <button type="submit" class="btn btn-sm btn-info btn-fill float-right mr-2" @click="create()">
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
                      <th>JOB NO</th>
                      <th>PO NO</th>
                      <th>CLIENT</th>
                      <th>OP NO</th>
                      <th v-if="role == 'Admin'">LINE MACHINE</th>
                      <th v-if="role == 'Admin'">SPECIFICATION</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">WEIGHT SLITED</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">QTY OP</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">WEIGHT OP</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">ESTIMASI CUT OFF</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">QTY DELIV</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">WEIGHT DELIV</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">QTY SISA</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">WEIGHT SISA</th>
                      <th>CREATED AT</th>
                      <th></th>
                      <th></th>
                      <th style="display: none" ></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in table.data" :key="i">
                    <td style="font-size: 13px;">
                      <label class="badge badge-success">{{ row.job_no }}</label>
                    </td>
                    <td style="font-size: 13px;">
                      <label class="badge badge-warning">{{ row.po_no }}</label>
                    </td>
                    <td style="font-size: 13px;">
                      {{row.client_name}}
                    </td>
                    <td style="font-size: 13px;">
                      <label class="badge badge-info" style="cursor: pointer;" @click="detailOP(row.op_no)">{{row.op_no}}</label>
                    </td>
                    <td style="font-size: 13px;" v-if="role == 'Admin'">
                      {{row.line_machine}}
                    </td>
                    <td style="font-size: 13px;" v-if="role == 'Admin'">
                      {{ row.specification }}  {{ row.produksi_nd }} x {{ row.material_tebal }} x {{ row.produksi_panjang1 }} <span v-if="row.produksi_panjang"> & {{ row.produksi_panjang }}</span> <span v-if="row.produksi_panjang2"> & {{ row.produksi_panjang2 }}</span>
                    </td>
                    <!-- WEIGHT SLITED -->
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      {{ convertRp(row.material_berat_total) }}
                    </td>
                    <!-- QTY OP -->
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      {{ convertRp(row.produksi_jumlah1 + row.produksi_jumlah + row.produksi_jumlah2) }}
                    </td>
                    <!-- WEIGHT OP -->
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      {{ (+(row.produksi_berat_total1) + +(row.produksi_berat_total) + +(row.produksi_berat_total2)).toFixed(2) }}
                    </td>
                    <!-- ESTIMASI CUT OFF -->
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      {{ convertRp(row.total_btg_count) }}
                    </td>
                    <!-- QTY DELIV -->
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      {{ convertRp(row.qty_deliv) }}
                    </td>
                    <!-- WEIGHT DELIV -->
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      {{ row.weight_deliv }}
                    </td>
                    <!-- QTY SISA -->
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      <label class="badge badge-danger badge-fill">{{ convertRp(row.produksi_jumlah1 + row.produksi_jumlah + row.produksi_jumlah2 - row.qty_deliv) }}</label>
                    </td>
                    <!-- WEIGHT SISA -->
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      <label class="badge badge-danger badge-fill">{{ Number(+(row.produksi_berat_total1) + +(row.produksi_berat_total) + +(row.produksi_berat_total2) - (row.weight_deliv)).toFixed(2) }}</label>
                    </td>
                    <td style="font-size: 13px;">{{ moment(row.created_at).locale('id').format('L') }}</td>
                    <td>
                      <i class="fa fa-edit" aria-hidden="true" style="cursor: pointer;" @click="edit(row.id)" title="Edit"></i>
                    </td>
                    <td>
                      <i class="fa fa-trash-o" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="remove(row.id)"></i>
                    </td>
                    <td style="display: none" ></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <template slot="footer">
              <div class="float-right">
                <base-pagination :page-count="pagination.page_count" v-model="pagination.default" @input="changePage"></base-pagination>
              </div>
            </template>
          </card>

          <!-- MONTHLY REPORT PRODUKSI PIPA -->
          <card class="strpied-tabled-with-hover shadow container-fluid" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <!-- <div class="col-2">
                </div> -->
                <div class="col-6 text-center mb-3">
                  <h5 class="card-title font-weight-bold">LAPORAN PRODUKSI PIPA</h5><br>
                  <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">BULAN {{ moment().set({'month': month - 1}).locale('id').format('MMMM').toUpperCase() }} {{ moment().set({'year': year}).format('Y') }}</h5><br>
                </div>
                <div class="col-2">
                  <select class="form-select form-control w-10" v-model="month" @change="getLP()">
                    <option selected>Month</option>
                    <option value="1">Januari</option>
                    <option value="2">Februari</option>
                    <option value="3">Maret</option>
                    <option value="4">April</option>
                    <option value="5">Mei</option>
                    <option value="6">Juni</option>
                    <option value="7">Juli</option>
                    <option value="8">Agustus</option>
                    <option value="9">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
                  </select>
                </div>
                <div class="col-2">
                  <select class="form-select form-control w-10" v-model="year" @change="getLP()">
                    <option selected>Year</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                 </div>
                 <div class="col-2">
                  <a :href="apiUrl+'print-month-lp-pipa?month='+Number(month)+'&year='+year+''" target="_BLANK">
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
                      <th rowspan="2" style="font-size: 13px; text-align: center;" width="4">NO</th>
                      <th rowspan="2" style="font-size: 13px; text-align: center;">PO NO</th>
                      <th rowspan="2" style="font-size: 13px; text-align: center;">OP NO</th>
                      <th rowspan="2" style="font-size: 13px; text-align: center;">SIZE</th>
                      <th rowspan="2" style="font-size: 13px; text-align: center;">COIL TERPAKAI (KG)</th>
                      <th colspan="2" style="font-size: 13px; text-align: center;">HASIL PRODUKSI</th>
                      <th rowspan="2" style="font-size: 13px; text-align: center;">YIELD</th>
                      <th rowspan="2" style="font-size: 13px; text-align: center;">CUSTOMER</th>
                    </tr>
                    <tr>
                      <th style="font-size: 13px; text-align: center;">BTG</th>
                      <th style="font-size: 13px; text-align: center;">BERAT (KG)</th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in tableLPPipa.data" :key="i">
                    <td style="font-size: 13px; text-align: center;">{{ i + 1 }}</td>
                    <td style="font-size: 13px; text-align: center;">{{ row.po_no }}</td>
                    <td style="font-size: 13px; text-align: center;">{{ row.op_no }}</td>
                    <td style="font-size: 13px; text-align: center;">
                      {{ row.produksi_nd }} x {{ row.material_tebal }} x {{ row.length }}</span>
                    </td>
                    <td style="font-size: 13px; text-align: center;">{{ convertRp(row.total_coil_terpakai_count) }}</td>
                    <td style="font-size: 13px; text-align: center;">{{ convertRp(row.total_btg_count - row.remark_b - row.remark_c) }}</td>
                    <td style="font-size: 13px; text-align: center;">
                      {{ convertRp(((row.total_berat_produksi_count / row.total_btg_count) *  (row.total_btg_count - (+row.remark_b + +row.remark_c))).toFixed(2)) }}
                    </td>
                    <td style="font-size: 13px; text-align: center;">{{ (((row.total_berat_produksi_count / row.total_btg_count) *  (row.total_btg_count - (+row.remark_b + +row.remark_c))) / row.total_coil_terpakai_count * 100).toFixed(2) }} %</td>
                    <td style="font-size: 13px; text-align: center;">{{ row.client_name }}</td>
                  </tr>
                  <tr style="background-color: #F0F8FF;">
                    <td colspan="4" style="font-size: 13px; text-align: center; font-weight: bold;">TOTAL</td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalCoilTerpakaiAll) }}</td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalBtgAll) }}</td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalBeratProduksiAll.toFixed(2)) }}</td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ (totalBeratProduksiAll / totalCoilTerpakaiAll * 100).toFixed(2) }} %</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            <!-- </div> -->
          </card>
        </div>

        <!-- MODAL CREATE -->
        <div>
           <modal :show.sync="form.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
             </template>
             <div>
              <div class="form-group" v-if="form.title === 'Add Data'">
                <label>Job No</label><br>
                <autocomplete
                  disabled
                  ref="autocomplete"
                  :url="apiUrl+'job-request/find-job-no'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="job_no"
                  label="job_name"
                  :on-select="getData"
                  placeholder="Choose Job No / PO NO"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <!-- <base-input type="text"
                    label="OP No"
                    placeholder="OP No"
                    v-model="prodTollData.op_no">
              </base-input> -->
              <div class="form-group">
                <label>Line Machine</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="prodTollData.line_machine">
                  <option selected>Select Line</option>
                  <option value="TM 60">TM 60</option>
                  <option value="TM 114">TM 114</option>
                </select>
              </div>
              <base-input type="date"
                    label="Date"
                    placeholder="Date"
                    v-model="prodTollData.created_at">
              </base-input>

             </div>
             <template slot="footer">
                <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="form.show = false">Close</button>
                <button type="primary" class="btn btn-sm btn-info btn-fill" @click="save()" :disabled="onLoading">
                    <span v-if="onLoading"><i class="fa fa-spinner fa-spin"></i> Please Wait...</span>
                    <span v-else>
                        <span>Save</span>
                    </span>
                </button>
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
              <div class="form-group">
                <label>Job No</label><br>
                <autocomplete
                  ref="autocomplete"
                  :url="apiUrl+'job-request/find-job-no'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="job_no"
                  label="job_name"
                  :on-select="getDataFilter"
                  placeholder="Choose Job No"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <base-input type="text"
                    label="OP No"
                    placeholder="OP No"
                    v-model="search.op_no">
              </base-input>
              <div class="form-group">
                <label>Line Machine</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.line_machine">
                  <option selected>Select Line</option>
                  <option value="TM 60">TM 60</option>
                  <option value="TM 114">TM 114</option>
                </select>
              </div>
              <base-input type="text"
                    label="Specification"
                    placeholder="Specification"
                    v-model="search.specification">
              </base-input>
              <div class="form-group">
                <label>ND (Inchi)</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.nd">
                  <option selected>Select</option>
                  <option value='1 "'>1 "</option>
                  <option value='1½ "'>1½ "</option>
                  <option value='1¼ "'>1¼ "</option>
                  <option value='2 "'>2 "</option>
                  <option value='2½ "'>2½ "</option>
                  <option value='3 "'>3 "</option>
                  <option value='4 "'>4 "</option>
                  <option value='5 "'>5 "</option>
                </select>
              </div>
              <base-input type="text"
                    label="Tebal (mm)"
                    placeholder="Tebal (mm)"
                    v-model="search.material_tebal">
              </base-input>
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
              <div class="form-group">
                <label>Client</label><br>
                <autocomplete 
                  ref="autocomplete"
                  :url="apiUrl+'client/find-client'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="client_name"
                  label="client_code"
                  :on-select="getDataFilterClient"
                  placeholder="Choose Client"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>

             </div>
             <template slot="footer">
                 <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="formFilter.show = false">Close</button>
                 <button type="primary" class="btn btn-sm btn-info btn-fill" @click="get(), formFilter.show = false">Filter</button>
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
                <small>Download Template<a :href="storageUrl+'template_import/Template Import Produksi Tolling.xlsx'"> Import Produksi Tolling</a></small>
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
  import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import produksiTolling from '@/services/produksiTolling.service';
  import Autocomplete from 'vue2-autocomplete-js'
  require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  var moment = require('moment');
  
  export default {
    components: {
      Card,
      Modal,
      Autocomplete,
      flatPicker,
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
        tableLPPipa: {
          data: []
        },
        form: {
            add: true,
            title: "Add Data",
            show: false
        },
        formFilter: {
            add: true,
            title: "Filter",
            show: false
        },
        formImport: {
            add: true,
            title: "Import Prod Tolling",
            show: false
        },
        prodTollData: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: {
          job_no: '',
          po_no: '',
          client_name: '',
          op_no: '',
          specification: '',
          line_machine: '',
          date: '',
          nd: '',
          material_tebal: '',
        },
        apiUrl :config.apiUrl,
        tokenApi : '',
        dataImport: '',
        role: '',
        
        totalCoilTerpakaiAll: '',
        totalBtgAll: '',
        totalBeratProduksiAll: '',
        month: moment().format('MM'),
        year: moment().format('Y'),
      }
    },
    mounted(){
      this.get();
      this.getLP();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
      this.role = localStorage.getItem('role');
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, produksiTolling.index({job_no: context.search.job_no, po_no: context.search.po_no, client_name: context.search.client_name, op_no: context.search.op_no, specification: context.search.specification, line_machine: context.search.line_machine, date: context.search.date, nd: context.search.nd, material_tebal: context.search.material_tebal, page: context.pagination.page})).onSuccess(function(response) {  
            context.table.data            = response.data.data.data.data;
            context.pagination.page_count = response.data.data.data.last_page
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        })
        .call()
      },
      getLP(){
        let context = this;               
        Api(context, produksiTolling.getLP({month: this.month, year: this.year})).onSuccess(function(response) {  
            context.tableLPPipa.data      = response.data.data.data;
            context.totalBtgAll           = (response.data.data.totalBtgAll - response.data.data.totalBtgAllB - response.data.data.totalBtgAllC);
            context.totalCoilTerpakaiAll  = response.data.data.totalCoilTerpakaiAll;
            context.totalBeratProduksiAll = ((response.data.data.totalBeratProduksiAll / response.data.data.totalBtgAll) *  (response.data.data.totalBtgAll - (+response.data.data.totalBtgAllB + +response.data.data.totalBtgAllC)));
            console.log(((response.data.data.totalBeratProduksiAll / response.data.data.totalBtgAll) *  (response.data.data.totalBtgAll - (+response.data.data.totalBtgAllB + +response.data.data.totalBtgAllC))));
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.tableLPPipa.data = [];
            }
        })
        .call()
      },
      filter() {
        this.formFilter.add   = true;
        this.formFilter.show  = true;
        this.formFilter.title = "Filter";
        this.pagination.page  = 1 ;
      },
      create() {
          this.form.add     = true;
          this.form.show    = true;
          this.form.title   = "Add Data";
          this.prodTollData = {}
          this.defaultDate()
          this.$refs.autocomplete.clearInput()
          this.onLoading = false
      },
      edit(id) {
        let context = this;               
        Api(context, produksiTolling.show(id)).onSuccess(function(response) {
            context.prodTollData = response.data.data[0];
            context.form.show    = true;
            context.form.title   = 'Edit Data';      
            context.$refs.autocomplete.setValue(response.data.data[0].job_no)                  
        })
        .call()        
      },
      modalImport(){
        this.formImport.add   = true;
        this.formImport.show  = true;
        this.formImport.title = "Import Prod Tolling";
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

        api = Api(context, produksiTolling.import(formData));
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
        this.onLoading = true;
       
        if (this.prodTollData.job_no != undefined && this.prodTollData.line_machine != undefined && this.prodTollData.created_at != undefined) {
          formData.append('job_no', this.prodTollData.job_no);
          formData.append('date', this.prodTollData.created_at);
          formData.append('line_machine', this.prodTollData.line_machine);
        }else{
          return alert('Semua field Wajib Di Isi')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, produksiTolling.create(formData));
        } else {
            api = Api(context, produksiTolling.update(this.prodTollData.id, formData));
        }
        api.onSuccess(function(response) {
            context.get();
            context.form.show = false;
            context.notifyVue((context.formTitle === 'Add Data') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.formTitle === 'Add Data') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {  
            context.onLoading = false
        })
        .call();
      },
      remove(id) {
          var r = confirm("Anda yakin ingin menghapus data ini ?");
          if (r == true) {
            let context = this;

            Api(context, produksiTolling.delete(id)).onSuccess(function(response) {
                context.get();
                context.notifyVue('Data Berhasil di Hapus', 'top', 'right', 'info')
            }).call();
          }
      },
      detailOP(op_no){
        this.$router.push('/detail-prod-tolling/'+op_no)
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
      changePage(page){
        this.pagination.page = page;
        this.get();
      },
      defaultDate(){
        var date  = new Date();
        var day   = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var today = date.getFullYear() + "-" + (month) + "-" + (day);

        this.prodTollData.created_at = today
      },

      // ================= Autocomplete ============
      // AMBIL DATA YANG DI PILIH AC
      getData(obj){
        this.prodTollData.job_no = obj.job_no;
      },
      // AMBIL DATA YANG DI PILIH AC FILTER
      getDataFilter(obj){
        this.search.job_no = obj.job_no;
      },
      // AMBIL DATA YANG DI PILIH AC FILTER
      getDataFilterClient(obj){
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
