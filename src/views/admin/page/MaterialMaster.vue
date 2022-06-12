<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <a :href="apiUrl+'report-excel/material-master?job_no='+search.job_no+'&po_no='+search.po_no+'&coil_no='+search.coil_no+'&owner='+search.owner+''" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Export</a>
          <button class="btn btn-sm btn-success mb-4" @click="modalImport()"><i class="fa fa-upload fa-sm"></i> Import</button>

          <!-- CARD -->
          <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-4">
                  <h4 class="card-title">Mother Coil</h4>
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
                      <th>Travel Latter NO</th>
                      <th>OWNER</th>
                      <th>COIL NO</th>
                      <th>THICK / mm</th>
                      <th>WIDTH / mm</th>
                      <th>WEIGHT / kg</th>
                      <th>SPEC</th>
                      <th>Description</th>
                      <th>Created At</th>
                      <th>PROCESS PROGRAM</th>
                      <th>PROCESS DATE</th>
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
                      <label class="badge badge-success">{{row.job_no}}</label>
                    </td>
                    <td style="font-size: 13px;">{{row.po_no}}</td>
                    <td style="font-size: 13px;">
                      <a :href="apiUrl+'print-mother-coil/'+row.travel_latter_no" target="_BLANK">
                        <small><label class="badge badge-primary" style="cursor: pointer;">{{ row.travel_latter_no }}</label></small>
                      </a>
                    </td>
                    <td style="font-size: 13px;">{{row.owner}}</td>
                    <td style="font-size: 13px;">
                      <label class="badge badge-danger">{{row.coil_no}}</label>
                    </td>
                    <td style="font-size: 13px;">{{ row.dimension_thick }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.dimension_width) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.dimension_weight) }}</td>
                    <td style="font-size: 13px;">{{ row.dimension_spec }}</td>
                    <td style="font-size: 13px;">{{row.information}}</td>
                    <td style="font-size: 13px;">{{row.created_at}}</td>
                    <td style="font-size: 13px;">{{row.process_program}}</td>
                    <td style="font-size: 13px;">{{row.process_date}}</td>
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
              <base-input type="text"
                    label="Travel Latter No"
                    placeholder="Travel Latter No"
                    v-model="material.travel_latter_no">
              </base-input>
              <base-input type="text"
                    label="Coil No"
                    placeholder="Coil No"
                    v-model="material.coil_no">
              </base-input>
              <div class="form-group">
                <label>Owner</label><br>
                <autocomplete
                  ref="autocomplete"
                  :url="apiUrl+'client/find-client'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="client_name"
                  label="client_code"
                  :on-select="getData"
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
                    v-model="material.dimension_thick">
              </base-input>
              <base-input type="number"
                    label="Dimension Width"
                    placeholder="Dimension Width"
                    v-model="material.dimension_width">
              </base-input>
              <base-input type="number"
                    label="Dimension Weight"
                    placeholder="Dimension Weight"
                    v-model="material.dimension_weight">
              </base-input>
              <base-input type="text"
                    label="Dimension Spec"
                    placeholder="Dimension Spec"
                    v-model="material.dimension_spec">
              </base-input>
              <base-input type="text"
                    label="Process Program"
                    placeholder="Process Program"
                    v-model="material.process_program">
              </base-input>
              <base-input type="date"
                    label="Process Date"
                    placeholder="Process Date"
                    v-model="material.process_date">
              </base-input>
              <base-input type="text"
                    label="Information"
                    placeholder="Information"
                    v-model="material.information">
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
             </div>
             <template slot="footer">
                 <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="formImport.show = false">Close</button>
                 <button type="primary" class="btn btn-sm btn-info btn-fill" @click="importData(), formImport.show = false">Import</button>
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
  import material from '@/services/material.service';
  import Autocomplete from 'vue2-autocomplete-js'
  require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
  
  export default {
    components: {
      Card,
      Modal,
      Autocomplete,
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
            title: "Import Mother Coil",
            show: false
        },
        material: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: {
          job_no: '',
          po_no: '',
          coil_no: '',
          owner: '',
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
        Api(context, material.index({job_no: context.search.job_no, po_no: context.search.po_no, coil_no: context.search.coil_no, owner: context.search.owner, page: context.pagination.page})).onSuccess(function(response) {    
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
          this.material   = {}
          this.$refs.autocomplete.clearInput()
      },
      edit(id) {
        let context = this;               
        Api(context, material.show(id)).onSuccess(function(response) {
            context.material   = response.data.data[0];
            context.form.show  = true;
            context.form.title = 'Edit Data';      
            context.$refs.autocomplete.setValue(response.data.data[0].owner)                  
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

        if (this.dataImport != undefined) {
          formData.append('import_data', this.dataImport);
        }else{
          return alert('File Import Not Found')
        }

        api = Api(context, material.import(formData));
        api.onSuccess(function(response) {
            context.get();
            context.formImport.show = false;
            context.notifyVue('Data Berhasil di Import', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue('Data Gagal di Import' , 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
      },
      save(){
        let api = null;
        let context = this;
        let formData = new FormData();

        if (this.material.travel_latter_no != undefined && this.material.owner != undefined) {
          formData.append('travel_latter_no', this.material.travel_latter_no);
          formData.append('owner', this.material.owner);
          formData.append('coil_no',(this.material.coil_no == undefined) ? '' : this.material.coil_no);
          formData.append('dimension_thick', (this.material.dimension_thick == undefined) ? '' : this.material.dimension_thick);
          formData.append('dimension_width', (this.material.dimension_width == undefined) ? '' : this.material.dimension_width);
          formData.append('dimension_weight', (this.material.dimension_weight == undefined) ? '' : this.material.dimension_weight);
          formData.append('dimension_spec', (this.material.dimension_spec == undefined) ? '' : this.material.dimension_spec);
          formData.append('process_program', (this.material.process_program == undefined) ? '' : this.material.process_program);
          formData.append('process_date', (this.material.process_date == undefined) ? '' : this.material.process_date);
          formData.append('information', (this.material.information == undefined) ? '' : this.material.information);
        }else{
          return alert('PO NO, Coil NO & Owner Wajib Di Isi')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, material.create(formData));
        } else {
            api = Api(context, material.update(this.material.id, formData));
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

            Api(context, material.delete(id)).onSuccess(function(response) {
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
            var separator = sisa ? ',' : '';
            rupiah += separator + ribuan.join(',');
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
        this.material.owner = obj.client_name;
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
  .scroll{
    height: 500px;
    overflow-y: auto;
    overflow-x: auto;
  }
</style>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
