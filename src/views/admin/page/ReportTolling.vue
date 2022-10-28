<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <a :href="apiUrl+'report-excel/report-tolling?job_no='+search.job_no+'&po_no='+search.po_no+'&client_name='+search.client_name+'&op_no='+search.op_no+'&coil_no='+search.coil_no+'&thick='+search.thick+'&width='+search.width+'&date='+search.date+''" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Export</a>
          <button class="btn btn-sm btn-success mb-4" @click="modalImport()"><i class="fa fa-upload fa-sm"></i> Import</button>

          <!-- CARD -->
          <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-4">
                  <h4 class="card-title">Laporan Produksi Pipa</h4>
                </div>
                <div class="col-4">
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
                      <th>DATE</th>
                      <th>OP NO</th>
                      <th>COIL NO</th>
                      <th>COIL WEIGHT</th>
                      <th>QTY</th>
                      <th>PROD WEIGHT</th>
                      <th>REMARK B</th>
                      <th>REMARK C</th>
                      <th></th>
                      <th></th>
                      <th style="display: none" ></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in table.data" :key="i">
                    <td style="font-size: 13px;">
                      <label class="badge badge-info" style="cursor: pointer;">
                        <router-link :to="/detail-report-tolling/+row.date"><span style="color: gray;">{{ moment(row.date).locale('id').format('L') }}</span></router-link>
                      </label>
                    </td>
                    <td style="font-size: 13px;">
                      <label class="badge badge-primary" style="cursor: pointer;" @click="detailOP(row.op_no)">{{row.op_no}}</label>
                    </td>
                    <td>
                      <small><label class="badge badge-danger">{{row.coil_no }} {{ row.pack}}</label></small>
                    </td>
                    <td style="font-size: 13px;">{{ convertRp(row.weight) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.qty) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.prod_weight) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.remark_b) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.remark_c) }}</td>
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
              <div class="float-left">TOTAL : {{table.data.length}} , TOTAL WEIGHT : {{ convertRp(totalWeight) }} </div>
              <div class="float-right">
                <base-pagination :page-count="pagination.page_count" v-model="pagination.default" @input="changePage"></base-pagination>
              </div>
            </template>
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
                <label>OP No</label><br>
                <autocomplete
                  ref="autocomplete"
                  :url="apiUrl+'produksi-tolling/find-op-no'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="op_no"
                  label="specification"
                  :on-select="getData"
                  placeholder="Choose OP No"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <div class="form-group" v-if="form.title === 'Add Data'">
                <label>Coil No</label><br>
                <autocomplete
                  ref="autocomplete"
                  :url="apiUrl+'slit-coil/find-slit-coil'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="coil_no"
                  label="pack"
                  :on-select="getDataCoilNo"
                  placeholder="Choose Coil No"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <base-input type="number"
                    label="Qty"
                    placeholder="Qty"
                    v-model="reportTollingData.qty">
              </base-input>
              <base-input type="number"
                    label="Remark B"
                    placeholder="Remark B"
                    v-model="reportTollingData.remark_b">
              </base-input>
              <base-input type="number"
                    label="Remark C"
                    placeholder="Remark C"
                    v-model="reportTollingData.remark_c">
              </base-input>
              <base-input type="number"
                    label="Shift"
                    placeholder="Shift"
                    v-model="reportTollingData.shift">
              </base-input>
              <base-input type="date"
                    label="Date"
                    placeholder="Date"
                    v-model="reportTollingData.date">
              </base-input>

             </div>
             <template slot="footer">
                 <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="form.show = false">Close</button>
                 <button type="primary" class="btn btn-sm btn-info btn-fill" @click="save()">Save</button>
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
                    label="PO No"
                    placeholder="PO No"
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
                  :on-select="getDataFilterClient"
                  placeholder="Choose Client"
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
              <base-input type="text"
                    label="Coil No"
                    placeholder="Coil No"
                    v-model="search.coil_no">
              </base-input>
              <base-input type="number"
                    label="Thick"
                    placeholder="Thick"
                    v-model="search.thick">
              </base-input>
              <base-input type="number"
                    label="Width"
                    placeholder="Width"
                    v-model="search.width">
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
                <small>Download Template<a :href="storageUrl+'template_import/Template Import Daily Tolling Production Report.xlsx'"> Import Daily Tolling Production Report</a></small>
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
  import reportTolling from '@/services/reportTolling.service';
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
        totalWeight: '',
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
            title: "Import Daily Tolling Production Report",
            show: false
        },
        reportTollingData: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: {
          job_no: '',
          po_no: '',
          client_name: '',
          op_no: '',
          coil_no: '',
          thick: '',
          width: '',
          date: '',
        },
        apiUrl :config.apiUrl,
        tokenApi : '',
        dataImport: '',
      }
    },
    mounted(){
      this.get();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, reportTolling.index({job_no: context.search.job_no, po_no: context.search.po_no, client_name: context.search.client_name, op_no: context.search.op_no, coil_no: context.search.coil_no, thick: context.search.thick, width: context.search.width, date: context.search.date, page: context.pagination.page})).onSuccess(function(response) {    
            context.table.data            = response.data.data.data.data;
            context.pagination.page_count = response.data.data.data.last_page
            context.totalWeight           = response.data.data.totalWeight;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
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
          this.reportTollingData = {}
          this.$refs.autocomplete.clearInput()
      },
      edit(id) {
        let context = this;               
        Api(context, reportTolling.show(id)).onSuccess(function(response) {
            context.reportTollingData = response.data.data[0];
            context.form.show         = true;
            context.form.title        = 'Edit Data';     
            context.$refs.autocomplete.setValue(response.data.data[0].op_no)                  
        })
        .call()        
      },
      modalImport(){
        this.formImport.add   = true;
        this.formImport.show  = true;
        this.formImport.title = "Import Daily Tolling Production Report";
      },
      filesChange(e) {
          this.dataImport = e.target.files[0];
      },
      importData(){
        let api      = null;
        let context  = this;
        let formData = new FormData();
        this.onLoading = true;

        if (this.dataImport != undefined) {
          formData.append('import_data', this.dataImport);
        }else{
          return alert('File Import Not Found')
        }

        api = Api(context, reportTolling.import(formData));
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

        if (this.reportTollingData.op_no != undefined && this.reportTollingData.coil_no != undefined) {
          formData.append('op_no', this.reportTollingData.op_no);
          formData.append('coil_no', this.reportTollingData.coil_no);
          formData.append('pack', this.reportTollingData.pack);
          formData.append('qty', (this.reportTollingData.qty == undefined) ? '' : this.reportTollingData.qty);
          formData.append('remark_b', (this.reportTollingData.remark_b == undefined) ? '' : this.reportTollingData.remark_b);
          formData.append('remark_c', (this.reportTollingData.remark_c == undefined) ? '' : this.reportTollingData.remark_c);
          formData.append('shift', (this.reportTollingData.shift == undefined) ? '' : this.reportTollingData.shift);
          formData.append('date', (this.reportTollingData.date == undefined) ? '' : this.reportTollingData.date);
        }else{
          return alert('OP No, Coil NO Wajib Di Isi')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, reportTolling.create(formData));
        } else {
            api = Api(context, reportTolling.update(this.reportTollingData.id, formData));
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

            Api(context, reportTolling.delete(id)).onSuccess(function(response) {
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

      // ================= Autocomplete ============
      // AMBIL DATA YANG DI PILIH AC
      getData(obj){
        this.reportTollingData.op_no = obj.op_no;
      },
      getDataCoilNo(obj){
        this.reportTollingData.coil_no = obj.coil_no;
        this.reportTollingData.pack    = obj.pack;
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
