<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-xl-4 col-md-6" style="cursor:pointer;">
              <stats-card class="shadow">
                <div slot="header" class="icon-warning">
                  <i class="nc-icon nc-app text-info"></i>
                </div>
                <div slot="content">
                  <p class="card-category">All Slit Coil</p>
                  <h4 class="card-title">{{ convertRp(totalWeightDel) }}</h4>
                </div>
                <div slot="footer">
                </div>
              </stats-card>
            </div>

            <div class="col-xl-4 col-md-6" style="cursor:pointer;" @click="search.material_status = 'SLIT FROM INT', get()">
              <stats-card class="shadow">
                <div slot="header" class="icon-warning">
                  <i class="nc-icon nc-cloud-download-93 text-warning"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Slit From Prod</p>
                  <h4 class="card-title">{{ convertRp(totalWeightSlitInt) }}</h4>
                </div>
                <div slot="footer">
                </div>
              </stats-card>
            </div>

            <div class="col-xl-4 col-md-6" style="cursor:pointer;" @click="search.material_status = 'SLIT FROM EXT', get()">
              <stats-card class="shadow">
                <div slot="header" class="icon-warning">
                  <i class="nc-icon nc-spaceship text-danger"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Slit From Outside</p>
                  <h4 class="card-title">{{ convertRp(totalWeightSlitExt) }}</h4>
                </div>
                <div slot="footer">
                </div>
              </stats-card>
            </div>

            <div class="col-xl-4 col-md-6" style="cursor:pointer;" @click="search.material_status = 'PROD', get()">
              <stats-card class="shadow">
                <div slot="header" class="icon-warning">
                  <i class="nc-icon nc-settings-gear-64 text-success"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Production</p>
                  <h4 class="card-title">{{ convertRp(totalWeightProd) }}</h4>
                </div>
                <div slot="footer">
                </div>
              </stats-card>
            </div>

            <div class="col-xl-4 col-md-6" style="cursor:pointer;" @click="search.material_status = 'NOT YET PROD', get()">
              <stats-card class="shadow">
                <div slot="header" class="icon-warning">
                  <i class="nc-icon nc-notes"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Not Yet Prod</p>
                  <h4 class="card-title">{{ convertRp(totalWeightNotProd) }}</h4>
                </div>
                <div slot="footer">
                </div>
              </stats-card>
            </div>

            <div class="col-xl-4 col-md-6" style="cursor:pointer;" @click="search.material_status = 'PENDING', get()" v-if="role != 'Visitor'">
              <stats-card class="shadow">
                <div slot="header" class="icon-warning">
                  <i class="nc-icon nc-time-alarm text-warning"></i>
                </div>
                <div slot="content">
                  <p class="card-category">OP Pending</p>
                  <h4 class="card-title">{{ convertRp(totalWeightPending) }}</h4>
                </div>
                <div slot="footer">
                </div>
              </stats-card>
            </div>
          </div>

          <div v-if="role != 'Visitor'">
            <a :href="apiUrl+'report-excel/slit-coil?job_no='+search.job_no+'&po_no='+search.po_no+'&travel_latter_no='+search.travel_latter_no+'&coil_no='+search.coil_no+'&process_program='+search.process_program+'&owner='+search.owner+'&pack='+search.pack+'&thick='+search.thick+'&width='+search.width+'&weight='+search.weight+'&size='+search.size+'&slitting_date='+search.slitting_date+'&material_status='+search.material_status+'&slit_from='+search.slit_from+'&age='+search.age+''" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Export</a>

            <button class="btn btn-sm btn-success mb-4" @click="modalImport()"><i class="fa fa-upload fa-sm"></i> Import</button>

            <a :href="apiUrl+'report-pdf/slit-coil?job_no='+search.job_no+'&po_no='+search.po_no+'&travel_latter_no='+search.travel_latter_no+'&coil_no='+search.coil_no+'&process_program='+search.process_program+'&owner='+search.owner+'&pack='+search.pack+'&thick='+search.thick+'&width='+search.width+'&weight='+search.weight+'&size='+search.size+'&slitting_date='+search.slitting_date+'&material_status='+search.material_status+'&slit_from='+search.slit_from+'&age='+search.age+''" target="_BLANK" class="btn btn-sm btn-warning mb-4"><i class="fa fa-file-text fa-sm"></i> PRINT</a>
          </div>

          <!-- CARD -->
          <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-4">
                  <h4 class="card-title">Slit Coil</h4>
                </div>
                <div class="col-4">
                </div>
                <div class="col-4">
                  <button type="submit" class="btn btn-sm btn-secondary btn-fill float-right" @click="filter()">
                    Filter
                  </button>
                  <button type="submit" class="btn btn-sm btn-info btn-fill float-right mr-2" @click="create()" v-if="role != 'Visitor'">
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
                      <th>Surat Jalan NO</th>
                      <th>DATE</th>
                      <th>OWNER</th>
                      <th>COIL NO</th>
                      <th>PACK</th>
                      <th>THICK / mm</th>
                      <th>WIDTH / mm</th>
                      <th>WEIGHT / kg</th>
                      <th>DESCRIPTION</th>
                      <th>SLIT FROM</th>
                      <th>PROGRAM</th>
                      <th>OP NO</th>
                      <th>Age</th>
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
                      <!-- <a :href="apiUrl+'print-mother-coil/'+row.travel_latter_no" target="_BLANK"> -->
                        <small><label class="badge badge-primary">{{row.travel_latter_no}}</label></small>
                      <!-- </a> -->
                    </td>
                    <td style="font-size: 13px;">{{ moment(row.slitting_date).locale('id').format('L') }}</td>
                    <td style="font-size: 13px;">{{row.owner}}</td>
                    <td style="font-size: 13px;">
                      <label class="badge badge-danger">{{row.coil_no}}</label>
                    </td>
                    <td style="font-size: 13px;">{{row.pack}}</td>
                    <td style="font-size: 13px;">{{row.thick}}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.width) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.weight) }}</td>
                    <td style="font-size: 13px;">{{row.description}}</td>
                    <td style="font-size: 13px;">
                      <small><label class="badge badge-warning">{{ row.slit_from }}</label></small>
                    </td>
                    <td style="font-size: 13px;">
                      <div v-if="role != 'Visitor'">
                        <label class="badge badge-info" style="cursor: pointer;" @click="detail(row.process_program)">{{row.process_program}}</label>
                      </div>
                      <div v-if="role == 'Visitor'">
                        <label class="badge badge-info">{{row.process_program}}</label>
                      </div>
                    </td>
                    <td style="font-size: 13px;">
                      <small><label class="badge badge-light">{{ row.op_no }}</label></small>
                    </td>
                    <td style="font-size: 13px;">{{ moment().diff(row.slitting_date, "days")+' Days' }}</td>
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
              <div class="float-left">TOTAL COIL : {{table.data.length}} , TOTAL MATERIAL WEIGHT : {{ convertRp(totalMaterialWeight) }} </div>
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
              <base-input type="date"
                    label="Date Entry"
                    placeholder="Date Entry"
                    v-model="slitCoilData.slitting_date">
              </base-input>
              <!-- <div class="form-group">
                <label>Material Status</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="slitCoilData.material_status">
                  <option selected>Select Status</option>
                  <option value="DELIVERY">DELIVERY</option>
                  <option value="NOT YET DELIVERY">NOT YET DELIVERY</option>
                </select>
              </div> -->
              <base-input type="text"
                    label="Surat Jalan No"
                    placeholder="Surat Jalan No"
                    v-model="slitCoilData.travel_latter_no">
              </base-input>
              <div class="form-group" v-if="role != 'Visitor'">
                <label>Owner</label><br>
                <autocomplete 
                  ref="autocompleteAdd"
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
              <base-input type="text"
                    label="PO No"
                    placeholder="PO No"
                    v-model="slitCoilData.po_no">
              </base-input>
              <base-input type="text"
                    label="Coil No"
                    placeholder="Coil No"
                    v-model="slitCoilData.coil_no">
              </base-input>              
              <base-input type="text"
                    label="Pack"
                    placeholder="Pack"
                    v-model="slitCoilData.pack">
              </base-input>
              <base-input type="number"
                    label="Thick"
                    placeholder="Thick"
                    v-model="slitCoilData.thick">
              </base-input>
              <base-input type="number"
                    label="Width"
                    placeholder="Width"
                    v-model="slitCoilData.width">
              </base-input>
              <base-input type="number"
                    label="Weight"
                    placeholder="Weight"
                    v-model="slitCoilData.weight">
              </base-input>
              <base-input type="text"
                    label="Spec"
                    placeholder="Spec"
                    v-model="slitCoilData.spec">
              </base-input>
              <base-input type="text"
                    label="Description"
                    placeholder="Description"
                    v-model="slitCoilData.description">
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
              <small class="d-block text-uppercase font-weight-bold mb-3">Date Entry</small>
              <div class="input-daterange datepicker row align-items-center">
                  <div class="col">
                      <base-input addon-left-icon="ni ni-calendar-grid-58">
                          <flat-picker slot-scope="{focus, blur}"
                                       @on-open="focus"
                                       @on-close="blur"
                                       :config="{allowInput: true, mode: 'range',}"
                                       class="form-control datepicker"
                                       v-model="search.slitting_date">
                          </flat-picker>
                      </base-input>
                  </div>
              </div>
              <div class="form-group">
                <label>Material Status</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.material_status">
                  <option selected>Select Status</option>
                  <option value="NOT YET PROD">NOT YET PROD</option>
                  <option value="PROD">PROD</option>
                  <option value="SLIT FROM INT">SLIT FROM INT</option>
                  <option value="SLIT FROM EXT">SLIT FROM EXT</option>
                </select>
              </div>
              <!-- <div class="form-group">
                <label>Slit From</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.slit_from">
                  <option selected>Select From</option>
                  <option value="FROM OUTSIDE">FROM OUTSIDE</option>
                  <option value="FROM PRODUCTION">FROM PRODUCTION</option>
                </select>
              </div> -->
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
              <base-input type="text"
                    label="Program No"
                    placeholder="Program No"
                    v-model="search.process_program">
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
              <base-input type="text"
                    label="Pack"
                    placeholder="Pack"
                    v-model="search.pack">
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
              <base-input type="number"
                    label="Weight"
                    placeholder="Weight"
                    v-model="search.weight">
              </base-input>
              <!-- <base-input type="number"
                    label="Size"
                    placeholder="Size"
                    v-model="search.size">
              </base-input> -->
              <base-input type="number"
                    label="Age"
                    placeholder="Days"
                    v-model="search.age">
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
                <small>Download Template<a :href="storageUrl+'template_import/Template Import Slit Coil.xlsx'"> Import Slit Coil</a></small>
                <div class="mt-2" v-if="tabelError.data.length !== 0 ">
                  <table>
                    <thead>
                      <slot name="columns">
                        <tr style="background-color: #F0F8FF;">
                          <th style="font-size: 13px; text-align: center;">Column</th>
                          <th style="font-size: 13px; text-align: center;">Error</th>
                          <th style="font-size: 13px; text-align: center;">Row</th>
                          <th style="font-size: 13px; text-align: center;">Values</th>
                        </tr>
                      </slot>
                    </thead>
                    <tbody>
                      <tr v-for="(row, i) in tabelError.data" :key="i">
                        <td style="font-size: 13px; text-align: center;">{{ row.attribute }}</td>
                        <td style="font-size: 13px; text-align: center;">{{ row.errors }}</td>
                        <td style="font-size: 13px; text-align: center;">{{ row.row }}</td>
                        <td style="font-size: 13px; text-align: center;">{{ row.values }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
  import slitCoil from '@/services/slitCoil.service';
  import Autocomplete from 'vue2-autocomplete-js'
  require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  import ChartCard from '@/components/Cards/ChartCard.vue'
  import StatsCard from '@/components/Cards/StatsCard.vue'
  var moment = require('moment');
  
  export default {
    components: {
      Card,
      Modal,
      Autocomplete,
      flatPicker,
      ChartCard,
      StatsCard,
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
        tabelError: {
          data: []
        },
        totalMaterialWeight: '',
        totalWeightDel: '',
        totalWeightSlitInt: '',
        totalWeightSlitExt: '',
        totalWeightProd: '',
        totalWeightPending: '',
        totalWeightNotProd: '',
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
            title: "Import Slit Coil",
            show: false
        },
        slitCoilData: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: {
          job_no: '',
          po_no: '',
          travel_latter_no: '',
          coil_no: '',
          process_program: '',
          owner: '',
          pack: '',
          thick: '',
          width: '',
          weight: '',
          size: '',
          slitting_date: '',
          material_status: '',
          slit_from: '',
          age: '',
        },
        apiUrl :config.apiUrl,
        tokenApi : '',
        role : '',
        dataImport: '',
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
        Api(context, slitCoil.index({job_no: context.search.job_no, po_no: context.search.po_no, travel_latter_no: context.search.travel_latter_no, coil_no: context.search.coil_no, process_program: context.search.process_program, owner: context.search.owner, pack: context.search.pack, thick: context.search.thick, width: context.search.width, weight: context.search.weight, size: context.search.size, slitting_date: context.search.slitting_date, material_status: context.search.material_status, slit_from: context.search.slit_from, age: context.search.age, page: context.pagination.page})).onSuccess(function(response) {    
            context.table.data            = response.data.data.data.data;
            context.pagination.page_count = response.data.data.data.last_page;
            context.totalMaterialWeight   = response.data.data.totalWeight;
            context.totalWeightDel        = response.data.data.totalWeightDel;
            context.totalWeightSlitInt    = response.data.data.totalWeightSlitInt;
            context.totalWeightSlitExt    = response.data.data.totalWeightSlitExt;
            context.totalWeightProd       = response.data.data.totalWeightProd;
            context.totalWeightPending    = response.data.data.totalWeightPending;
            context.totalWeightNotProd    = response.data.data.totalWeightNotProd;
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
          this.slitCoilData = {}
          this.$refs.autocompleteAdd.clearInput()
      },
      edit(id) {
        let context = this;               
        Api(context, slitCoil.show(id)).onSuccess(function(response) {
            context.slitCoilData = response.data.data[0];
            context.form.show    = true;
            context.form.title   = 'Edit Data';      
            context.$refs.autocomplete.setValue(response.data.data[0].owner)                  
        })
        .call()        
      },
      modalImport(){
        this.formImport.add   = true;
        this.formImport.show  = true;
        this.formImport.title = "Import Slit Coil";
        this.tabelError.data  = [];
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

        api = Api(context, slitCoil.import(formData));
        api.onSuccess(function(response) {
            context.onLoading = false;
            context.get();
            context.formImport.show = false;
            context.notifyVue('Data Berhasil di Import', 'top', 'right', 'info')
        }).onError(function(error) {   
            context.tabelError.data = error.response.data.data;  
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

        if (this.slitCoilData.travel_latter_no != undefined && this.slitCoilData.owner != undefined && this.slitCoilData.coil_no != undefined && this.slitCoilData.pack != undefined && this.slitCoilData.slitting_date != undefined && this.slitCoilData.thick != undefined && this.slitCoilData.width != undefined && this.slitCoilData.weight != undefined && this.slitCoilData.spec != undefined) {
          formData.append('po_no', (this.slitCoilData.po_no == undefined) ? '' : this.slitCoilData.po_no);
          formData.append('travel_latter_no', this.slitCoilData.travel_latter_no);
          formData.append('owner', this.slitCoilData.owner);
          formData.append('process_program', this.slitCoilData.process_program);
          formData.append('slitting_date', this.slitCoilData.slitting_date);
          formData.append('coil_no', this.slitCoilData.coil_no);
          formData.append('pack', this.slitCoilData.pack);
          formData.append('thick', this.slitCoilData.thick);
          formData.append('width', this.slitCoilData.width);
          formData.append('weight', this.slitCoilData.weight);
          formData.append('spec', this.slitCoilData.spec);
          formData.append('description', (this.slitCoilData.description == undefined) ? '' : this.slitCoilData.description);
        }else{
          return alert('Date Entry Surat Jalan No, Owner, Coil NO, Pack, Thick, Width, Weight, Spec Wajib Di Isi')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, slitCoil.create(formData));
        } else {
            api = Api(context, slitCoil.update(this.slitCoilData.id, formData));
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

            Api(context, slitCoil.delete(id)).onSuccess(function(response) {
                context.get();
                context.notifyVue('Data Berhasil di Hapus', 'top', 'right', 'info')
            }).call();
          }
      },
      detail(process_program){
        this.$router.push('/detail-slit-coil/'+process_program)
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
        this.slitCoilData.owner = obj.client_name;
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
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
