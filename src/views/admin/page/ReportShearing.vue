<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <!-- TOMBOL EXPORT IMPORT -->
            <div class="col-6">
              <a :href="apiUrl+'report-excel/report-shearing?job_no='+search.job_no+'&po_no='+search.po_no+'&client_name='+search.client_name+'&lp_no='+search.lp_no+'&coil_no='+search.coil_no+'&input_pack='+search.input_pack+'&input_thick='+search.input_thick+'&input_width='+search.input_width+'&input_weight='+search.input_weight+'&output_pack='+search.output_pack+'&output_thick='+search.output_thick+'&output_width='+search.output_width+'&output_length='+search.output_length+'&output_total_sheet='+search.output_total_sheet+'&output_weight='+search.output_weight+'&remark='+search.remark+'&date='+search.date+''" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Export</a>
              <button class="btn btn-sm btn-success mb-4" @click="modalImport()"><i class="fa fa-upload fa-sm"></i> Import</button>
            </div>
            <!-- TOMBOL REPORT -->
            <div class="col-6">
            </div>
          </div>
          

          <!-- CARD -->
          <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-4">
                  <h4 class="card-title">Laporan Produksi Shearing</h4>
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
                      <th>LP NO</th>
                      <th>COIL NO</th>
                      <th>INPUT PACK</th>
                      <th>INPUT THICK</th>
                      <th>INPUT WIDTH</th>
                      <th>INPUT WEIGHT</th>
                      <th></th>
                      <th>OUTPUT PACK</th>
                      <th>OUTPUT THICK</th>
                      <th>OUTPUT WIDTH</th>
                      <th>OUTPUT LENGTH</th>
                      <th>OUTPUT TOTDAL SHEET</th>
                      <th>OUTPUT WEIGHT</th>
                      <th>REMARK</th>
                      <th>SHEARING DATE</th>
                      <th>Created At</th>
                      <th>Created By</th>
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
                      <small><label class="badge badge-warning">{{ row.po_no }}</label></small>
                    </td>
                    <td style="font-size: 13px;">{{ row.client_name }}</td>
                    <td style="font-size: 13px;">
                      <small><label class="badge badge-info">{{ row.lp_no }}</label></small>
                    </td>
                    <td style="font-size: 13px;">{{ row.coil_no }}</td>
                    <td style="font-size: 13px;">{{ row.input_pack }}</td>
                    <td style="font-size: 13px;">{{ row.input_thick }}</td>
                    <td style="font-size: 13px;">{{ row.input_width }}</td>
                    <td style="font-size: 13px;">{{ row.input_weight }}</td>
                    <td></td>
                    <td style="font-size: 13px;">{{ row.output_pack }}</td>
                    <td style="font-size: 13px;">{{ row.output_thick }}</td>
                    <td style="font-size: 13px;">{{ row.output_width }}</td>
                    <td style="font-size: 13px;">{{ row.output_length }}</td>
                    <td style="font-size: 13px;">{{ row.output_total_sheet }}</td>
                    <td style="font-size: 13px;">{{ row.output_weight }}</td>
                    <td style="font-size: 13px;">{{ row.remark }}</td>
                    <td style="font-size: 13px;">{{ row.shearing_date }}</td>
                    <td style="font-size: 13px;">{{ row.created_at }}</td>
                    <td style="font-size: 13px;">{{ row.created_by }}</td>
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
                  ref="autocompleteJO"
                  :url="apiUrl+'job-request/find-job-no'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="job_no"
                  label="client_name"
                  :on-select="getDataJO"
                  placeholder="Choose Job No"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <base-input type="text"
                    label="LP No"
                    placeholder="LP No"
                    v-model="reportShearingData.lp_no">
              </base-input>
              <base-input type="text"
                    label="Coil No"
                    placeholder="Coil No"
                    v-model="reportShearingData.coil_no">
              </base-input>
              <base-input type="text"
                    label="Input Pack"
                    placeholder="Input Pack"
                    v-model="reportShearingData.input_pack">
              </base-input>
              <base-input type="number"
                    label="Input Thick"
                    placeholder="Input Thick"
                    v-model="reportShearingData.input_thick">
              </base-input>
              <base-input type="number"
                    label="Input Width"
                    placeholder="Input Width"
                    v-model="reportShearingData.input_width">
              </base-input>
              <base-input type="number"
                    label="Input Weight"
                    placeholder="Input Weight"
                    v-model="reportShearingData.input_weight">
              </base-input>
              <base-input type="text"
                    label="Output Pack"
                    placeholder="Output Pack"
                    v-model="reportShearingData.output_pack">
              </base-input>
              <base-input type="number"
                    label="Output Thick"
                    placeholder="Output Thick"
                    v-model="reportShearingData.output_thick">
              </base-input>
              <base-input type="number"
                    label="Output Width"
                    placeholder="Output Width"
                    v-model="reportShearingData.output_width">
              </base-input>
              <base-input type="number"
                    label="Output Length"
                    placeholder="Output Length"
                    v-model="reportShearingData.output_length">
              </base-input>
              <base-input type="number"
                    label="Output Total Sheet"
                    placeholder="Output Total Sheet"
                    v-model="reportShearingData.output_total_sheet">
              </base-input>
              <base-input type="number"
                    label="Output Weight"
                    placeholder="Output Weight"
                    v-model="reportShearingData.output_weight">
              </base-input>
              <base-input type="text"
                    label="Remark"
                    placeholder="Remark"
                    v-model="reportShearingData.remark">
              </base-input>
              <base-input type="date"
                    label="Shearing Date"
                    placeholder="Shearing Date"
                    v-model="reportShearingData.shearing_date">
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
                  ref="autocompleteJO"
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
                    label="LP No"
                    placeholder="LP No"
                    v-model="search.lp_no">
              </base-input>
              <base-input type="text"
                    label="Coil No"
                    placeholder="Coil No"
                    v-model="search.coil_no">
              </base-input>
              <base-input type="text"
                    label="Input Pack"
                    placeholder="Input Pack"
                    v-model="search.input_pack">
              </base-input>
              <base-input type="number"
                    label="Input Thick"
                    placeholder="Input Thick"
                    v-model="search.input_thick">
              </base-input>
              <base-input type="number"
                    label="Input Width"
                    placeholder="Input Width"
                    v-model="search.input_width">
              </base-input>
              <base-input type="number"
                    label="Input Weight"
                    placeholder="Input Weight"
                    v-model="search.input_weight">
              </base-input>
              <base-input type="text"
                    label="Output Pack"
                    placeholder="Output Pack"
                    v-model="search.output_pack">
              </base-input>
              <base-input type="number"
                    label="Output Thick"
                    placeholder="Output Thick"
                    v-model="search.output_thick">
              </base-input>
              <base-input type="number"
                    label="Output Width"
                    placeholder="Output Width"
                    v-model="search.output_width">
              </base-input>
              <base-input type="number"
                    label="Output Length"
                    placeholder="Output Length"
                    v-model="search.output_length">
              </base-input>
              <base-input type="number"
                    label="Output Total Sheet"
                    placeholder="Output Total Sheet"
                    v-model="search.output_total_sheet">
              </base-input>
              <base-input type="number"
                    label="Output Weight"
                    placeholder="Output Weight"
                    v-model="search.output_weight">
              </base-input>
              <base-input type="text"
                    label="Remark"
                    placeholder="Remark"
                    v-model="search.remark">
              </base-input>
              <small class="d-block text-uppercase font-weight-bold mb-3">Shearing Date</small>
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
                <small>Download Template<a :href="storageUrl+'template_import/Template Import Report Shearing.xlsx'"> Import Report Shearing</a></small>
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
  import reportShearing from '@/services/reportShearing.service';
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
            title: "Import Report Shearing",
            show: false
        },
        reportShearingData: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: {
          job_no: '',
          po_no: '',
          client_name: '',
          lp_no: '',
          coil_no: '',
          input_pack: '',
          input_thick: '',
          input_width: '',
          input_weight: '',

          output_pack: '',
          output_thick: '',
          output_width: '',
          output_length: '',
          output_total_sheet: '',
          output_weight: '',
          remark: '',
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
        Api(context, reportShearing.index({job_no: context.search.job_no, po_no: context.search.po_no, client_name: context.search.client_name, lp_no: context.search.lp_no, coil_no: context.search.coil_no, input_pack: context.search.input_pack, input_thick: context.search.input_thick, input_width: context.search.input_width, input_weight: context.search.input_weight,  output_pack: context.search.output_pack, output_thick: context.search.output_thick, output_width: context.search.output_width, output_length: context.search.output_length, output_total_sheet: context.search.output_total_sheet, output_weight: context.search.output_weight, remark: context.search.remark, date: context.search.date, page: context.pagination.page})).onSuccess(function(response) {    
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
          this.form.add   = true;
          this.form.show  = true;
          this.form.title = "Add Data";
          this.reportShearingData   = {}
          this.$refs.autocompleteJO.clearInput()
          this.$refs.autocompleteCoil.clearInput()
      },
      edit(id) {
        let context = this;               
        Api(context, reportShearing.show(id)).onSuccess(function(response) {
            context.reportShearingData   = response.data.data[0];
            context.form.show  = true;
            context.form.title = 'Edit Data';      
            context.$refs.autocompleteJO.setValue(response.data.data[0].job_no)                  
            context.$refs.autocompleteCoil.setValue(response.data.data[0].coil_no)                  
        })
        .call()        
      },
      modalImport(){
        this.formImport.add   = true;
        this.formImport.show  = true;
        this.formImport.title = "Import Report Shearing";
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

        api = Api(context, reportShearing.import(formData));
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

        if (this.reportShearingData.job_no != undefined && this.reportShearingData.lp_no != undefined && this.reportShearingData.coil_no != undefined && this.reportShearingData.input_thick != undefined && this.reportShearingData.input_width != undefined && this.reportShearingData.input_weight != undefined && this.reportShearingData.output_thick != undefined && this.reportShearingData.output_width != undefined && this.reportShearingData.output_length != undefined && this.reportShearingData.output_total_sheet != undefined && this.reportShearingData.output_weight != undefined && this.reportShearingData.shearing_date != undefined) {
          formData.append('job_no', this.reportShearingData.job_no);
          formData.append('lp_no', this.reportShearingData.lp_no);
          formData.append('coil_no', this.reportShearingData.coil_no);
          formData.append('input_pack', (this.reportShearingData.input_pack == undefined) ? '' : this.reportShearingData.input_pack);
          formData.append('input_thick', this.reportShearingData.input_thick);
          formData.append('input_width', this.reportShearingData.input_width);
          formData.append('input_weight', this.reportShearingData.input_weight);

          formData.append('output_pack', (this.reportShearingData.output_pack == undefined) ? '' : this.reportShearingData.output_pack);
          formData.append('output_thick', this.reportShearingData.output_thick);
          formData.append('output_width', this.reportShearingData.output_width);
          formData.append('output_length', this.reportShearingData.output_length);
          formData.append('output_total_sheet', this.reportShearingData.output_total_sheet);
          formData.append('output_weight', this.reportShearingData.output_weight);
          formData.append('remark', (this.reportShearingData.remark == undefined) ? '' : this.reportShearingData.remark);
          formData.append('shearing_date', this.reportShearingData.shearing_date);
        }else{
          return alert('Data Wajib Di Isi kecuali Pack & Remark Coil')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, reportShearing.create(formData));
        } else {
            api = Api(context, reportShearing.update(this.reportShearingData.id, formData));
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

            Api(context, reportShearing.delete(id)).onSuccess(function(response) {
                context.get();
                context.notifyVue('Data Berhasil di Hapus', 'top', 'right', 'info')
            }).call();
          }
      },
      detail(process_program){
        this.$router.push('/detail-prod-slitting/'+process_program)
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
      getDataJO(obj){
        this.reportShearingData.job_no = obj.job_no;
      },
      getDataCoil(obj){
        this.reportShearingData.coil_no = obj.coil_no;
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
<style type="text/css">
  .scroll { 
    overflow: auto; 
    height: 500px; 
  }
  .scroll thead th { 
    position: sticky; 
    top: 0; 
    z-index: 1; 
  }

  table  { 
    border-collapse: collapse; 
    width: 100%; 
  }
  th, td { 
    padding: 8px 16px; 
  }
  th { 
    background: #F0F8FF; 
  }
</style>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
