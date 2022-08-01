<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <a :href="apiUrl+'report-excel/job-request?job_no='+search.job_no+'&job_name='+search.job_name+'&po_no='+search.po_no+'&client_name='+search.client_name+'&prod_class='+search.prod_class+'&date='+search.date+''" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Export</a>
          <button class="btn btn-sm btn-success mb-4" @click="modalImport()"><i class="fa fa-upload fa-sm"></i> Import</button>
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
                  <button type="submit" class="btn btn-sm btn-info btn-fill float-right mr-2" @click="create()" v-if="role == 'Requester'">
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
  import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import jobRequest from '@/services/jobRequest.service';
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
        jobRequestData: {},
        apiUrl :config.apiUrl,
        storageUrl : config.storageUrl,
        tokenApi : '',
        role: '',
        dataImport: '',
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
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
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
          this.$refs.autocompleteAdd.clearInput()
      },
      edit(id) {
        let context = this;               
        Api(context, jobRequest.show(id)).onSuccess(function(response) {
            context.jobRequestData = response.data.data[0];
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

        if (this.jobRequestData.job_name != undefined && this.jobRequestData.prod_class != undefined && this.jobRequestData.client_name != undefined && this.jobRequestData.weight != undefined && this.jobRequestData.rate != undefined) {
          formData.append('job_name', this.jobRequestData.job_name);
          // formData.append('job_description', this.jobRequestData.job_description);
          formData.append('client_name', this.jobRequestData.client_name);
          formData.append('po_no', this.jobRequestData.po_no);
          formData.append('prod_class', this.jobRequestData.prod_class);
          formData.append('weight', this.jobRequestData.weight);
          formData.append('rate', this.jobRequestData.rate);
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
