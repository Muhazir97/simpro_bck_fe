<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover shadow"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <div class="row">
                <div class="col-4">
                  <h4 class="card-title">Delivery</h4>
                  <!-- <p class="card-category">Here is a subtitle for this table</p> -->
                </div>
                <div class="col-4">
                  <!-- <base-input type="text"
                            placeholder="Search"
                            v-model="search"
                            v-on:keyup="filter"
                            size="small">
                  </base-input> -->
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
            <table class="table">
              <thead>
                <slot name="columns">
                  <tr style="background-color: #F0F8FF;">
                    <th>JOB NO</th>
                    <th>PROD CLASS</th>
                    <th>PO NO</th>
                    <th>CLIENT</th>
                    <th>PACKING LIST NO</th>
                    <th>PACKING DATE</th>
                    <th>WEIGHT</th>
                    <th>QTY</th>
                    <th>SIZE</th>
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
                  <td style="font-size: 13px;">{{row.prod_class}}</td>
                  <td style="font-size: 13px;">{{row.po_no}}</td>
                  <td style="font-size: 13px;">{{row.client_name}}</td>
                  <td style="font-size: 13px;">
                    <label class="badge badge-danger">{{row.packing_list_no}}</label>
                  </td>
                  <td style="font-size: 13px;">{{row.packing_date}}</td>
                  <td style="font-size: 13px;">{{row.weight}}</td>
                  <td style="font-size: 13px;">{{row.qty}}</td>
                  <td style="font-size: 13px;">{{row.size}}</td>
                  <td style="font-size: 13px;">{{row.created_at}}</td>
                  <td style="font-size: 13px;">{{row.created_by}}</td>
                  <td>
                    <i class="fa fa-edit" aria-hidden="true" style="cursor: pointer;" @click="edit(row.id)" title="Edit"></i>
                  </td>
                  <td>
                    <i class="fa fa-trash-o" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="remove(row.id)"></i>
                  </td>
                </tr>
              </tbody>
            </table>
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
                    label="Packing List No"
                    placeholder="Packing List No"
                    v-model="deliveryData.packing_list_no">
              </base-input>
              <base-input type="date"
                    label="Packing Date"
                    placeholder="Packing Date"
                    v-model="deliveryData.packing_date">
              </base-input>
              <base-input type="number"
                    label="Weight"
                    placeholder="Weight"
                    v-model="deliveryData.weight">
              </base-input>
              <base-input type="number"
                    label="Qty"
                    placeholder="Qty"
                    v-model="deliveryData.qty">
              </base-input>
              <base-input type="number"
                    label="Size"
                    placeholder="Size"
                    v-model="deliveryData.size">
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
                  :on-select="getData"
                  placeholder="Choose Job No"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <base-input type="text"
                    label="Packing List No"
                    placeholder="Packing List No"
                    v-model="deliveryData.packing_list_no">
              </base-input>
              <base-input type="date"
                    label="Packing Date"
                    placeholder="Packing Date"
                    v-model="deliveryData.packing_date">
              </base-input>
              <base-input type="number"
                    label="Weight"
                    placeholder="Weight"
                    v-model="deliveryData.weight">
              </base-input>
              <base-input type="number"
                    label="Qty"
                    placeholder="Qty"
                    v-model="deliveryData.qty">
              </base-input>
              <base-input type="number"
                    label="Size"
                    placeholder="Size"
                    v-model="deliveryData.size">
              </base-input>
             </div>
             <template slot="footer">
                 <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="formFilter.show = false">Close</button>
                 <button type="primary" class="btn btn-sm btn-info btn-fill" @click="get(), formFilter.show = false">Filter</button>
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
  import delivery from '@/services/delivery.service';
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
        deliveryData: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: '',
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
        Api(context, delivery.index({search: this.search})).onSuccess(function(response) {    
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
      },
      create() {
          this.form.add     = true;
          this.form.show    = true;
          this.form.title   = "Add Data";
          this.deliveryData = {}
          this.$refs.autocomplete.clearInput()
      },
      edit(id) {
        let context = this;               
        Api(context, delivery.show(id)).onSuccess(function(response) {
            context.deliveryData = response.data.data[0];
            context.form.show    = true;
            context.form.title   = 'Edit Data';  
            context.$refs.autocomplete.setValue(response.data.data[0].job_no)                      
        })
        .call()        
      },
      save(){
        let api = null;
        let context = this;
        let formData = new FormData();

        if (this.deliveryData.job_no != undefined && this.deliveryData.packing_list_no != undefined && this.deliveryData.packing_date != undefined && this.deliveryData.weight != undefined && this.deliveryData.qty != undefined && this.deliveryData.size != undefined) {
          formData.append('job_no', this.deliveryData.job_no);
          formData.append('packing_list_no', this.deliveryData.packing_list_no);
          formData.append('packing_date', this.deliveryData.packing_date);
          formData.append('weight', this.deliveryData.weight);
          formData.append('qty', this.deliveryData.qty);
          formData.append('size', this.deliveryData.size);
        }else{
          return alert('Semua Field Wajib Di Isi')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, delivery.create(formData));
        } else {
            api = Api(context, delivery.update(this.deliveryData.id, formData));
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

            Api(context, delivery.delete(id)).onSuccess(function(response) {
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

      // ================= Autocomplete ============
      // AMBIL DATA YANG DI PILIH AC
      getData(obj){
        this.deliveryData.job_no = obj.job_no;
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
