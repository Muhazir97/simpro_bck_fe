<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <!-- TOMBOL EXPORT IMPORT -->
            <div class="col-6">
              <a :href="apiUrl+'report-excel/prod-tolling?job_no='+search.job_no+'&client_name='+search.client_name+'&po_no='+search.po_no+'&op_no='+search.op_no+'&specification='+search.specification+'&line_machine='+search.line_machine+'&date='+search.date+''" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Export</a>
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
                <div class="col-4">
                  <h4 class="card-title">Prod Tolling</h4>
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
                      <th>JOB NO</th>
                      <th>PO NO</th>
                      <th>CLIENT</th>
                      <th>OP NO</th>
                      <th v-if="role == 'Admin'">LINE MACHINE</th>
                      <th v-if="role == 'Admin'">SPECIFICATION</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">QTY OP</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">WEIGHT OP</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">QTY DELIV</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">WEIGHT DELIV</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">QTY SISA</th>
                      <th v-if="role == 'Admin' || role == 'Delivery'">WEIGHT SISA</th>
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
                      {{ row.specification }}  {{ row.produksi_nd }} x {{ row.material_tebal }} x {{ row.produksi_panjang1 }}
                    </td>
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      {{ convertRp(row.produksi_jumlah1 + row.produksi_jumlah + row.produksi_jumlah2) }}
                    </td>
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      {{ +(row.produksi_berat_total1) + +(row.produksi_berat_total) + +(row.produksi_berat_total2) }}
                    </td>
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      {{ convertRp(row.qty_deliv) }}
                    </td>
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      {{ row.weight_deliv }}
                    </td>
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      <label class="badge badge-danger badge-fill">{{ convertRp(row.produksi_jumlah1 + row.produksi_jumlah + row.produksi_jumlah2 - row.qty_deliv) }}</label>
                    </td>
                    <td style="font-size: 13px;" v-if="role == 'Admin' || role == 'Delivery'">
                      <label class="badge badge-danger badge-fill">{{ Number(+(row.produksi_berat_total1) + +(row.produksi_berat_total) + +(row.produksi_berat_total2) - (row.weight_deliv)).toFixed(2) }}</label>
                    </td>
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
              <base-input type="text"
                    label="OP No"
                    placeholder="OP No"
                    v-model="prodTollData.op_no">
              </base-input>
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
              <base-input type="text"
                    label="Line Machine"
                    placeholder="Line Machine"
                    v-model="search.line_machine">
              </base-input>
              <base-input type="text"
                    label="Specification"
                    placeholder="Specification"
                    v-model="search.specification">
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
  
  export default {
    components: {
      Card,
      Modal,
      Autocomplete,
      flatPicker,
    },
    data () {
      return {
        pagination: {
          page_count: '',
          default: 1,
          page: '',
        },
        onLoading: false,
        table: {
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
        },
        apiUrl :config.apiUrl,
        tokenApi : '',
        dataImport: '',
        role: '',
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
        Api(context, produksiTolling.index({job_no: context.search.job_no, po_no: context.search.po_no, client_name: context.search.client_name, op_no: context.search.op_no, specification: context.search.specification, line_machine: context.search.line_machine, date: context.search.date, page: context.pagination.page})).onSuccess(function(response) {  
            context.table.data            = response.data.data.data.data;
            context.pagination.page_count = response.data.data.data.last_page
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
          this.prodTollData = {}
          this.$refs.autocomplete.clearInput()
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
       
        if (this.prodTollData.job_no != undefined && this.prodTollData.op_no != undefined && this.prodTollData.line_machine != undefined && this.prodTollData.created_at != undefined) {
          formData.append('job_no', this.prodTollData.job_no);
          formData.append('op_no', this.prodTollData.op_no);
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

      // ================= Autocomplete ============
      // AMBIL DATA YANG DI PILIH AC
      getData(obj){
        this.prodTollData.job_no = obj.job_no;
      },
      // AMBIL DATA YANG DI PILIH AC FILTER
      getDataFilter(obj){
        this.search.job_no = obj.job_no;
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
