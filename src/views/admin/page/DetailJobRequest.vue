<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= JOB INFORMATION ===============================  -->
      <div class="row">
        <div class="col-6">
          <h4 slot="header" class="card-title">Job Information</h4>
        </div>
        <div class="col-6 mb-3">
          <a :href="apiUrl+'print-job-order/'+jobRequestData.job_no" target="_BLANK">
            <button type="submit" class="btn btn-sm btn-success btn-fill float-right">
              <i class="fa fa-file-text"></i> Print
            </button>
          </a>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-sm table-bordered">
            <tbody>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Job Name</td>
                    <td colspan="3">{{ jobRequestData.job_name }}</td>
                    <td style="display: none"></td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Job Number</td>
                    <td>{{ jobRequestData.job_no }}</td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Production Class</td>
                    <td>{{ jobRequestData.prod_class }}</td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Client</td>
                    <td>{{ jobRequestData.client_name }}</td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">PO Number</td>
                    <td>{{ jobRequestData.po_no }}</td>
                </tr>
                <tr>
                  <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Weight</td>
                  <td>{{ jobRequestData.weight }}</td>
                  <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Rate /KG</td>
                  <td>{{ jobRequestData.rate }}</td>
                </tr>
                <tr>
                  <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Created By</td>
                  <td>{{ jobRequestData.created_by }}</td>
                  <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Created At</td>
                  <td>{{ jobRequestData.created_at }}</td>
                </tr>
                <tr>
                  <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Job Description</td>
                  <td colspan="3">{{ jobRequestData.job_description }}</td>
                  <td style="display: none"></td>
                </tr>
            </tbody>
        </table>
      </div><hr>

      <!-- ========================= MATERIAL ===============================  -->
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover">
            <template slot="header">
              <div class="row">
                <div class="col-4">
                  <h4 class="card-title">Material</h4>
                </div>
                <div class="col-4">
                </div>
                <div class="col-4">
                  <button type="submit" class="btn btn-sm btn-dark btn-fill float-right" @click="addMaterial()" v-if="jobRequestData.job_status == 'Draft'">
                    Add New
                  </button>
                </div>
              </div>
            </template>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <slot name="columns">
                    <tr style="background-color: #F0F8FF;">
                      <!-- <th>PO No</th> -->
                      <th>Coil No</th>
                      <!-- <th>Owner</th> -->
                      <!-- <th>Job Number</th> -->
                      <th>Thick</th>
                      <th>Width</th>
                      <th>Weight</th>
                      <th>Spec</th>
                      <th>Information</th>
                      <th>Created At</th>
                      <th>Created By</th>
                      <th></th>
                      <th style="display: none" ></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in tableMatReq.data" :key="i">
                    <!-- <td style="font-size: 13px;">{{row.po_no}}</td> -->
                    <td style="font-size: 13px;">{{row.coil_no}}</td>
                    <!-- <td style="font-size: 13px;">{{row.owner}}</td> -->
                    <!-- <td style="font-size: 13px;">{{row.job_no}}</td> -->
                    <td style="font-size: 13px;">{{row.dimension_thick}}</td>
                    <td style="font-size: 13px;">{{row.dimension_width}}</td>
                    <td style="font-size: 13px;">{{row.dimension_weight}}</td>
                    <td style="font-size: 13px;">{{row.dimension_spec}}</td>
                    <td style="font-size: 13px;">{{row.information}}</td>
                    <td style="font-size: 13px;">{{row.created_at}}</td>
                    <td style="font-size: 13px;">{{row.created_by}}</td>
                    <td>
                      <i class="fa fa-times-circle" aria-hidden="true" title="Delete" style="cursor: pointer;" @click="saveMaterial(row.id, 'delete')" v-if="jobRequestData.job_status == 'Draft'"></i>
                    </td>
                    <td style="display: none" ></td>
                  </tr>
                  <!-- <tr>
                    <td style="font-size: 13px; font-weight: bold;">TOTAL</td>
                    <td style="font-size: 13px; font-weight: bold;">0.000</td>
                    <td style="font-size: 13px; font-weight: bold;">0.000</td>
                    <td style="font-size: 13px; font-weight: bold;" colspan="5">0.000</td>
                    <td style="display: none" ></td>
                  </tr> -->
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div>

      <!-- ========================= NOTE ===============================  -->
      <h4 class="card-title">Note</h4>
      <textarea rows="8" cols="120" 
                placeholder="Enter Message..." 
                style="border-radius: 10px; border: 1px solid #DCDCDC; color: #808080;"
                @change="updateJobNote(jobRequestData.job_no)"
                v-model="update_job_note"
                >
      </textarea>

      <!-- <div v-if="jobRequestData.job_status == 'Draft'" class="text-center mt-5">
        <button type="submit" class="btn btn-sm btn-primary btn-fill" @click="sendRequest('Process')" :disabled="(tableMatReq.data.length == 0)">
          <i class="fa fa-paper-plane" aria-hidden="true"></i> Process
        </button>
      </div> -->
      
      <!-- MODAL CREATE MATERIAL-->
      <div>
         <modal :show.sync="form.show">
           <template slot="header">
              <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
           </template>
           <div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <slot name="columns">
                    <tr style="background-color: #F0F8FF;">
                      <!-- <th style="font-size: 13px;">No PO</th> -->
                      <th style="font-size: 13px;">Coil No</th>
                      <!-- <th style="font-size: 13px;">Owner</th> -->
                      <!-- <th style="font-size: 13px;">Job Number</th> -->
                      <th style="font-size: 13px;">Thick</th>
                      <th style="font-size: 13px;">Width</th>
                      <th style="font-size: 13px;">Weight</th>
                      <th style="font-size: 13px;">Spec</th>
                      <!-- <th style="font-size: 13px;">Information</th> -->
                      <!-- <th style="font-size: 13px;">Created At</th> -->
                      <!-- <th style="font-size: 13px;">Created By</th> -->
                      <th></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in tableMatMas.data" :key="i">
                    <!-- <td style="font-size: 13px;">{{row.no_po}}</td> -->
                    <td style="font-size: 13px;">{{row.coil_no}}</td>
                    <!-- <td style="font-size: 13px;">{{row.owner}}</td> -->
                    <!-- <td style="font-size: 13px;">{{row.job_no}}</td> -->
                    <td style="font-size: 13px;">{{row.dimension_thick}}</td>
                    <td style="font-size: 13px;">{{row.dimension_width}}</td>
                    <td style="font-size: 13px;">{{row.dimension_weight}}</td>
                    <td style="font-size: 13px;">{{row.dimension_spec}}</td>
                    <!-- <td style="font-size: 13px;">{{row.information}}</td> -->
                    <!-- <td style="font-size: 13px;">{{row.created_at}}</td> -->
                    <!-- <td style="font-size: 13px;">{{row.created_by}}</td> -->
                    <td>
                      <i class="fa fa-check-square-o text-primary" aria-hidden="true" title="Add Material" style="cursor: pointer;" @click="saveMaterial(row.id, 'add')" v-if="jobRequestData.job_status == 'Draft'"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
           </div>
           <template slot="footer">
           </template>
         </modal>
      </div>

    </card>
  </div>
</template>
<script>
  import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import jobRequest from '@/services/jobRequest.service';
  import Api from '@/helpers/api';
  import Autocomplete from 'vue2-autocomplete-js'
  require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')

  export default {
    components: {
      Card,
      Modal,
      Autocomplete
    },
    data () {
      return {
        form: {
            add: true,
            title: "Add Material",
            show: false
        },
        formAttach: {
            add: true,
            title: "Add Material",
            show: false
        },
        jobRequestData: {},
        tableMatReq: {
          data: []
        },
        tableMatMas: {
          data: []
        },
        attachRequest: {},
        update_job_note: '',
        apiUrl :config.apiUrl,
        storageUrl : config.storageUrl,
        tokenApi : '',
        material_code: '',
      }
    },
    mounted(){
      this.getHeader();
      this.getMaterialReq();
      // this.getMatMas();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
      getHeader() {
        let context = this;               
        Api(context, jobRequest.showJob(context.$route.params.job_no)).onSuccess(function(response) {
            context.jobRequestData = response.data.data[0];
            context.update_job_note = response.data.data[0].job_note
        }).onFinish(function() {  
            Api(context, jobRequest.getMatMas({client_name: context.jobRequestData.client_name})).onSuccess(function(response) {
                context.tableMatMas.data = response.data.data;             
            })
            .onError(function(error) {                    
                context.tableMatMas.data = []
            })
            .call()  
        })
        .call()        
      },
      getMaterialReq() {
        let context = this;               
        Api(context, jobRequest.getMaterialReq({job_no: context.$route.params.job_no})).onSuccess(function(response) {
            context.tableMatReq.data = response.data.data.data.data;                   
        })
        .onError(function(error) {                    
            context.tableMatReq.data = []
        })
        .call()        
      },
      addMaterial() {
          this.form.add   = true;
          this.form.show  = true;
          this.form.title = "Add Material";
      },
      saveMaterial(id, type){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        if (this.jobRequestData.job_no != undefined) {
          if (type == 'add') {
            formData.append('job_no', this.jobRequestData.job_no);
            formData.append('po_no', this.jobRequestData.po_no);
          }else{
            formData.append('job_no', '');
            formData.append('po_no', '');
          }
          formData.append('id', id);
        }else{
          alert('Semua Field Wajib Di Isi')
        }

        api = Api(context, jobRequest.addMaterial(formData));
        api.onSuccess(function(response) {
            context.notifyVue((context.formTitle === 'Add Material') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.formTitle === 'Add Material') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {  
            context.getMaterialReq();
            context.getHeader();
        })
        .call();
      },
      updateJobNote(job_no){
        let api     = null;
        let context = this;

        api = Api(context, jobRequest.updateJobNote(job_no, {job_note : context.update_job_note}));
        api.onSuccess(function(response) {
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).onError(function(error) { 
            context.notifyVue('Gagal Update Keranjang', 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
      },

      sendRequest(data){
        let context = this;               
        Api(context, jobRequest.sendRequest({job_no: context.$route.params.job_no, status: data}))
        .onSuccess(function(response) { 
            context.notifyVue('Send Request Successfully', 'top', 'right', 'info')
            context.$router.push('/job-request/')              
        })
        .onError(function(error) {                    
            context.notifyVue('Send Request Failed' , 'top', 'right', 'danger')
        })
        .call() 
      },
      // bilangan) {
      // /   var number_string = bilangan.toString(),
      //       sisa    = number_string.length % 3,
      //       rupiah  = number_string.substr(0, sisa),
      //       ribuan  = number_string.substr(sisa).match(/\d{3}/g);

      //   var number_string_2 = bilangan.toString(),
      //       sisaRatus     = number_string_2.length % 2,
      //       rupiahRatusan = number_string_2.substr(0, sisaRatus),
      //       ratusan       = number_string_2.substr(sisa).match(/\d{2}/g);

      //   if(number_string.length == 3) {
      //     var separator = sisaRatus ? '.' : '';
      //     rupiahRatusan += separator + ratusan.join('.');
      //     return rupiahRatusan
      //   }else if(ribuan){
      //     var separator = sisa ? ',' : '';
      //     rupiah += separator + ribuan.join(',');
      //     return rupiah
      //   }else{
      //     return bilangan
      //   }
      // },

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
      // ================= Autocomplete ============
      // AMBIL DATA YANG DI PILIH AC
      getData(obj){
        this.material_code = obj.material_code;
      },
      // AMBIL DATA DARI API AC
      processJSON(json) {
        return json.data
      },
    }
  }

</script>
<style lang='scss' scoped>
  ::placeholder {
    color: #DCDCDC;
    padding-top: 10px;
    padding-left: 14px;
  }
</style>
