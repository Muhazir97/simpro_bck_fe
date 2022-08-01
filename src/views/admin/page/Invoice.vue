<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <a :href="apiUrl+'report-excel/invoice?job_no='+search.job_no+'&po_no='+search.po_no+'&invoice_no='+search.invoice_no+'&invoice_weight='+search.invoice_weight+'&invoice_qty='+search.invoice_qty+'&date='+search.date+''" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Export</a>
          <button class="btn btn-sm btn-success mb-4" @click="modalImport()"><i class="fa fa-upload fa-sm"></i> Import</button>

          <!-- CARD -->
          <card class="strpied-tabled-with-hover shadow"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <div class="row">
                <div class="col-4">
                  <h4 class="card-title">Invoice</h4>
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
                      <th>PROD CLASS</th>
                      <th>QTY</th>
                      <th>UNIT</th>
                      <th>RATE</th>
                      <th>AMOUNT</th>
                      <th>INVOICE NO</th>
                      <th>INVOICE DATE</th>
                      <th>INVOICE WEIGHT</th>
                      <th>INVOICE QTY</th>
                      <th>INVOICE AMOUNT</th>
                      <!-- <th>INVOICE BALANCE</th> -->
                      <th>Created At</th>
                      <th>Created By</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in table.data" :key="i">
                    <td style="font-size: 13px;">
                      <label class="badge badge-success">{{row.job_no}}</label>
                    </td>
                    <td style="font-size: 13px;">
                      <small><label class="badge badge-warning">{{row.po_no}}</label></small>
                    </td>
                    <td style="font-size: 13px;">{{row.client_name}}</td>
                    <td style="font-size: 13px;">{{row.prod_class}}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.qty) }}</td>
                    <td style="font-size: 13px;">{{row.unit}}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.rate) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.amount) }}</td>
                    <td style="font-size: 13px;">
                      <label class="badge badge-info">{{row.invoice_no}}</label>
                    </td>
                    <td style="font-size: 13px;">{{row.invoice_date}}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.invoice_weight) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.invoice_qty) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.invoice_amount) }}</td>
                    <!-- <td style="font-size: 13px;">{{ convertRp(row.invoice_balance) }}</td> -->
                    <td style="font-size: 13px;">{{row.created_at}}</td>
                    <td style="font-size: 13px;">{{row.created_by}}</td>
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
              <div class="form-group">
                <label>Job No</label><br>
                <autocomplete
                  ref="autocomplete"
                  :url="apiUrl+'job-request/find-job-no'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="job_no"
                  label="job_name"
                  :on-select="getData"
                  placeholder="Choose Job No"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <base-input type="text"
                    label="Invoice No"
                    placeholder="Invoice No"
                    v-model="invoiceData.invoice_no">
              </base-input>
              <base-input type="date"
                    label="Invoice Date"
                    placeholder="Invoice Date"
                    v-model="invoiceData.invoice_date">
              </base-input>
              <base-input type="number"
                    label="Invoice Weight"
                    placeholder="Invoice Weight"
                    v-model="invoiceData.invoice_weight">
              </base-input>
              <base-input type="number"
                    label="Invoice Qty"
                    placeholder="Invoice Qty"
                    v-model="invoiceData.invoice_qty">
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
                    label="Invoice No"
                    placeholder="Invoice No"
                    v-model="search.invoice_no">
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
              <base-input type="number"
                    label="Invoice Weight"
                    placeholder="Invoice Weight"
                    v-model="search.invoice_weight">
              </base-input>
              <base-input type="number"
                    label="Invoice Qty"
                    placeholder="Invoice Qty"
                    v-model="search.invoice_qty">
              </base-input>

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
                <small>Download Template<a :href="storageUrl+'template_import/Template Import Invoice.xlsx'"> Import Invoice</a></small>
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
  import invoice from '@/services/invoice.service';
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
            title: "Import Invoice",
            show: false
        },
        invoiceData: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: {
          job_no: '',
          po_no: '',
          invoice_no: '',
          invoice_weight: '',
          invoice_qty: '',
          date: '',
        },
        apiUrl :config.apiUrl,
        tokenApi : '',
      }
    },
    mounted(){
      this.get();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, invoice.index({job_no: context.search.job_no, po_no: context.search.po_no, invoice_no: context.search.invoice_no, invoice_weight: context.search.invoice_weight, invoice_qty: context.search.invoice_qty, date: context.search.date, page: context.pagination.page})).onSuccess(function(response) {    
            context.table.data = response.data.data.data.data;
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
          this.form.add   = true;
          this.form.show  = true;
          this.form.title = "Add Data";
          this.invoiceData   = {}
          this.$refs.autocomplete.clearInput()
      },
      edit(id) {
        let context = this;               
        Api(context, invoice.show(id)).onSuccess(function(response) {
            context.invoiceData     = response.data.data[0];
            context.form.show  = true;
            context.form.title = 'Edit Data';
            context.$refs.autocomplete.setValue(response.data.data[0].job_no)                 
        })
        .call()        
      },
      modalImport(){
        this.formImport.add   = true;
        this.formImport.show  = true;
        this.formImport.title = "Import Invoice";
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

        api = Api(context, invoice.import(formData));
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

        if (this.invoiceData.job_no != undefined && this.invoiceData.invoice_no != undefined && this.invoiceData.invoice_date != undefined && this.invoiceData.invoice_weight != undefined && this.invoiceData.invoice_qty != undefined) {
          formData.append('job_no', this.invoiceData.job_no);
          // formData.append('qty', this.invoiceData.qty);
          // formData.append('unit', this.invoiceData.unit);
          // formData.append('rate', this.invoiceData.rate);
          // formData.append('amount', this.invoiceData.amount);
          formData.append('invoice_no', this.invoiceData.invoice_no);
          formData.append('invoice_date', this.invoiceData.invoice_date);
          formData.append('invoice_weight', this.invoiceData.invoice_weight);
          formData.append('invoice_qty', this.invoiceData.invoice_qty);
          // formData.append('invoice_amount', this.invoiceData.invoice_amount);
          formData.append('invoice_balance', this.invoiceData.invoice_balance);
        }else{
          return alert('Job No, Invoice No, Invoice Date, Invoice Weight dan Invoice Weight Wajib Di Isi')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, invoice.create(formData));
        } else {
            api = Api(context, invoice.update(this.invoiceData.id, formData));
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

            Api(context, invoice.delete(id)).onSuccess(function(response) {
                context.get();
                context.notifyVue('Data Berhasil di Hapus', 'top', 'right', 'info')
            }).call();
          }
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
        this.invoiceData.job_no = obj.job_no;
      },
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
