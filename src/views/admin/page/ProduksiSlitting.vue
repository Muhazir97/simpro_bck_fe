<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <!-- TOMBOL EXPORT IMPORT -->
            <div class="col-6">
              <a :href="apiUrl+'report-excel/prod-slitting?job_no='+search.job_no+'&po_no='+search.po_no+'&client_name='+search.client_name+'&process_program='+search.process_program+'&coil_no='+search.coil_no+'&pack='+search.pack+'&thick='+search.thick+'&width_from='+search.width_from+'&width_to='+search.width_to+'&weight_coil='+search.weight_coil+'&date='+search.date+''" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Export</a>
              <button class="btn btn-sm btn-success mb-4" @click="modalImport()"><i class="fa fa-upload fa-sm"></i> Import</button>
            </div>
            <!-- TOMBOL REPORT -->
            <div class="col-6">
              <router-link to="/report-slitting">
                <button class="btn btn-sm btn-warning mb-4 float-right" style="margin-left: 200px;"><i class="fa fa-files-o fa-sm"></i> Report</button>
              </router-link>
            </div>
          </div>

          <!-- CARD -->
          <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-4">
                  <h4 class="card-title">Produksi Slitting</h4>
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
                      <th>PROGRAM</th>
                      <th>COIL NO</th>
                      <th>PACK</th>
                      <th>THICK</th>
                      <th>WIDTH FORM</th>
                      <th>WIDTH TO</th>
                      <th>WEIGHT COIL</th>
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
                      <label class="badge badge-warning">{{ row.po_no }}</label>
                    </td>
                    <td style="font-size: 13px;">{{row.client_name}}</td>
                    <td style="font-size: 13px;">
                      <label class="badge badge-info" style="cursor: pointer;" @click="detail(row.process_program)">{{row.process_program}}</label>
                    </td>
                    <td style="font-size: 13px;">
                      {{row.coil_no}}
                    </td>
                    <td style="font-size: 13px;">{{ row.pack }}</td>
                    <td style="font-size: 13px;">{{ row.thick }}</td>
                    <td style="font-size: 13px;">{{ row.width_from }}</td>
                    <td style="font-size: 13px;">{{ row.width_to }}</td>
                    <td style="font-size: 13px;">{{ row.weight_coil }}</td>
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
                  ref="autocompleteJO"
                  :url="apiUrl+'job-request/find-job-no'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="job_no"
                  label="job_name"
                  :on-select="getDataJO"
                  placeholder="Choose Job No"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <base-input type="text"
                    label="Process Program"
                    placeholder="Process Program"
                    v-model="prodSlitData.process_program">
              </base-input>
              <div class="form-group">
                <label>Coil No</label><br>
                <autocomplete
                  ref="autocompleteCoil"
                  :url="apiUrl+'material/find-coil-no'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="coil_no"
                  label="travel_latter_no"
                  :on-select="getDataCoil"
                  placeholder="Choose Coil No"
                  :min="2"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <base-input type="text"
                    label="Pack"
                    placeholder="Pack"
                    v-model="prodSlitData.pack">
              </base-input>
              <base-input type="number"
                    label="Thick"
                    placeholder="Thick"
                    v-model="prodSlitData.thick">
              </base-input>
              <base-input type="number"
                    label="Width From"
                    placeholder="Width From"
                    v-model="prodSlitData.width_from">
              </base-input>
              <base-input type="number"
                    label="Width To"
                    placeholder="Width To"
                    v-model="prodSlitData.width_to">
              </base-input>
              <base-input type="number"
                    label="Weight Coil"
                    placeholder="Weight Coil"
                    v-model="prodSlitData.weight_coil">
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
              <!-- <base-input type="text"
                    label="Job No"
                    placeholder="Job No"
                    v-model="search.job_no">
              </base-input>
              <base-input type="text"
                    label="PO No"
                    placeholder="PO No"
                    v-model="search.po_no">
              </base-input> -->
              <base-input type="text"
                    label="Surat Jalan No"
                    placeholder="Surat Jalan No"
                    v-model="search.travel_latter_no">
              </base-input>
              <base-input type="text"
                    label="Coil No"
                    placeholder="Coil No"
                    v-model="search.coil_no">
              </base-input>
              <div class="form-group">
                <label>Owner</label><br>
                <autocomplete 
                  ref="autocomplete"
                  :url="apiUrl+'client/find-client'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="client_name"
                  label="client_code"
                  :on-select="getDataFilter"
                  placeholder="Choose Owner"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <base-input type="number"
                    label="Dimension Thick"
                    placeholder="Dimension Thick"
                    v-model="search.thick">
              </base-input>
              <base-input type="number"
                    label="Dimension Width"
                    placeholder="Dimension Width"
                    v-model="search.width">
              </base-input>
              <base-input type="number"
                    label="Dimension Weight"
                    placeholder="Dimension Weight"
                    v-model="search.weight">
              </base-input>
              <base-input type="text"
                    label="Dimension Spec"
                    placeholder="Dimension Spec"
                    v-model="search.spec">
              </base-input>
              <base-input type="text"
                    label="Process Program"
                    placeholder="Process Program"
                    v-model="search.process_program">
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
                                       v-model="search.range">
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
                <small>Download Template<a :href="storageUrl+'template_import/Template Import Produksi Slitting.xlsx'"> Import Produksi Slitting</a></small>
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
  import produksiSlitting from '@/services/produksiSlitting.service';
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
            title: "Import Prod Slitting",
            show: false
        },
        prodSlitData: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: {
          job_no: '',
          po_no: '',
          client_name: '',
          process_program: '',
          coil_no: '',
          pack: '',
          thick: '',
          width_from: '',
          width_to: '',
          weight_coil: '',
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
        Api(context, produksiSlitting.index({job_no: context.search.job_no, po_no: context.search.po_no, client_name: context.search.client_name, process_program: context.search.process_program, coil_no: context.search.coil_no, pack: context.search.pack, thick: context.search.thick, width_from: context.search.width_from, width_to: context.search.width_to, weight_coil: context.search.weight_coil, date: context.search.date, page: context.pagination.page})).onSuccess(function(response) {    
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
          this.prodSlitData   = {}
          this.$refs.autocompleteJO.clearInput()
          this.$refs.autocompleteCoil.clearInput()
      },
      edit(id) {
        let context = this;               
        Api(context, produksiSlitting.show(id)).onSuccess(function(response) {
            context.prodSlitData   = response.data.data[0];
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
        this.formImport.title = "Import Prod Slitting";
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

        api = Api(context, produksiSlitting.import(formData));
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

        if (this.prodSlitData.job_no != undefined && this.prodSlitData.process_program != undefined && this.prodSlitData.coil_no != undefined && this.prodSlitData.pack != undefined && this.prodSlitData.thick != undefined && this.prodSlitData.width_from != undefined && this.prodSlitData.width_to != undefined) {
          formData.append('job_no', this.prodSlitData.job_no);
          formData.append('process_program', this.prodSlitData.process_program);
          formData.append('coil_no', this.prodSlitData.coil_no);
          formData.append('pack', this.prodSlitData.pack);
          formData.append('thick', this.prodSlitData.thick);
          formData.append('width_from', this.prodSlitData.width_from);
          formData.append('width_to', this.prodSlitData.width_to);
          formData.append('weight_coil', (this.prodSlitData.weight_coil == undefined) ? '' : this.prodSlitData.weight_coil);
        }else{
          return alert('Data Wajib Di Isi kecuali Weight Coil')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, produksiSlitting.create(formData));
        } else {
            api = Api(context, produksiSlitting.update(this.prodSlitData.id, formData));
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

            Api(context, produksiSlitting.delete(id)).onSuccess(function(response) {
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
        this.prodSlitData.job_no = obj.job_no;
      },
      getDataCoil(obj){
        this.prodSlitData.coil_no = obj.coil_no;
      },
      // AMBIL DATA YANG DI PILIH AC FILTER
      getDataFilter(obj){
        this.search.owner = obj.client_name;
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
