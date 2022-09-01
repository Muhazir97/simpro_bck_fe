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
                <div class="col-3">
                  <h4 class="card-title">Konfig OP</h4>
                </div>
                <div class="col-6 text-center">
                  <input type="text"
                        class="input"
                        placeholder="Search"
                        v-model="search"
                        v-on:keyup="filter" 
                        size="40"
                        style="border-radius: 10px; border: 1px solid #DCDCDC; color: #808080;">
                  </input>
                </div>
                <div class="col-3">
                  <button type="submit" class="btn btn-sm btn-info btn-fill float-right" @click="create()">
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
                      <th>SPEC</th>
                      <th>ND</th>
                      <th>OD</th>
                      <th>TOL OD PLUS</th>
                      <th>TOL OD MIN</th>
                      <th>TEBAL</th>
                      <th>TOL TEBAL PLUS</th>
                      <th>TOL TEBAL MIN</th>
                      <th></th>
                      <th></th>
                      <th style="display: none" ></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in table.data" :key="i">
                    <td style="font-size: 13px;">{{row.spec}}</td>
                    <td style="font-size: 13px;">{{row.nd}}</td>
                    <td style="font-size: 13px;">{{row.od}}</td>
                    <td style="font-size: 13px;">{{row.tol_od_plus}}</td>
                    <td style="font-size: 13px;">{{row.tol_od_min}}</td>
                    <td style="font-size: 13px;">{{row.tebal}}</td>
                    <td style="font-size: 13px;">{{row.tol_tebal_plus}}</td>
                    <td style="font-size: 13px;">{{row.tol_tebal_min}}</td>
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
                    label="Spec"
                    placeholder="Spec"
                    v-model="konfigData.spec">
              </base-input>
              <div >
                <label>Normal Diameter</label><br>
                <select class="form-select form-control" v-model="konfigData.nd" @change="getOdOp()">
                  <option selected>Select</option>
                  <option value='1 "'>1 "</option>
                  <option value='1½ "'>1½ "</option>
                  <option value='1¼ "'>1¼ "</option>
                  <option value='2 "'>2 "</option>
                  <option value='2½ "'>2½ "</option>
                  <option value='3 "'>3 "</option>
                  <option value='4 "'>4 "</option>
                  <option value='5 "'>5 "</option>
                </select>
              </div>
              <base-input type="text"
                    label="OD"
                    placeholder="OD"
                    v-model="konfigData.od">
              </base-input>
              <base-input type="text"
                    label="Toleransi OD Plus"
                    placeholder="Toleransi OD Plus"
                    v-model="konfigData.tol_od_plus">
              </base-input>
              <base-input type="text"
                    label="Toleransi OD Min"
                    placeholder="Toleransi OD Min"
                    v-model="konfigData.tol_od_min">
              </base-input>
              <base-input type="text"
                    label="Tebal"
                    placeholder="Tebal"
                    v-model="konfigData.tebal">
              </base-input>
              <base-input type="text"
                    label="Toleransi Tebal Plus"
                    placeholder="Toleransi Tebal Plus"
                    v-model="konfigData.tol_tebal_plus">
              </base-input>
              <base-input type="text"
                    label="Toleransi Tebal Min"
                    placeholder="Toleransi Tebal Min"
                    v-model="konfigData.tol_tebal_min">
              </base-input>
             </div>
             <template slot="footer">
                 <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="form.show = false">Close</button>
                 <button type="primary" class="btn btn-sm btn-info btn-fill" @click="save()">Save</button>
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
  import konfigOp from '@/services/konfigOp.service';
  import produksiTolling from '@/services/produksiTolling.service';
  
  export default {
    components: {
      Card,
      Modal
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
        konfigData: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: '',
      }
    },
    mounted(){
      this.get();
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, konfigOp.index({search: context.search, page: context.pagination.page})).onSuccess(function(response) {    
            context.table.data = response.data.data.data.data;
            context.pagination.page_count = response.data.data.data.last_page
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        })
        .call()
      },
      getOdOp() {
        let context = this;               
        Api(context, produksiTolling.getOd({specification: context.konfigData.spec, nd: context.konfigData.nd})).onSuccess(function(response) {
          context.konfigData.od             = response.data.data[0].od
          context.konfigData.tol_od_plus    = response.data.data[0].tol_od_plus
          context.konfigData.tol_od_min     = response.data.data[0].tol_od_min
          context.konfigData.tebal          = response.data.data[0].tebal
          context.konfigData.tol_tebal_plus = response.data.data[0].tol_tebal_plus
          context.konfigData.tol_tebal_min  = response.data.data[0].tol_tebal_min

          context.$forceUpdate();
        })
        .onError(function(error) {  
          
        })
        .call()        
      },
      filter() {
        this.pagination.page  = 1 ;
        clearTimeout(this.loadTimeout);
        this.loadTimeout = setTimeout(() => {
            this.get()
        }, 100);
      },
      create() {
          this.form.add   = true;
          this.form.show  = true;
          this.form.title = "Add Data";
          this.konfigData = {}
      },
      edit(id) {
        let context = this;               
        Api(context, konfigOp.show(id)).onSuccess(function(response) {
            context.konfigData     = response.data.data[0];
            context.form.show  = true;
            context.form.title = 'Edit Data';                        
        })
        .call()        
      },
      save(){
        let api = null;
        let context = this;
        let formData = new FormData();

        if (this.konfigData.spec != undefined && this.konfigData.nd != undefined && this.konfigData.od != undefined && this.konfigData.tol_od_plus != undefined && this.konfigData.tol_od_min != undefined && this.konfigData.tebal != undefined && this.konfigData.tol_tebal_plus != undefined && this.konfigData.tol_tebal_min != undefined) {
          formData.append('spec', this.konfigData.spec);
          formData.append('nd', this.konfigData.nd);
          formData.append('od', this.konfigData.od);
          formData.append('tol_od_plus', this.konfigData.tol_od_plus);
          formData.append('tol_od_min', this.konfigData.tol_od_min);
          formData.append('tebal', this.konfigData.tebal);
          formData.append('tol_tebal_plus', this.konfigData.tol_tebal_plus);
          formData.append('tol_tebal_min', this.konfigData.tol_tebal_min);
        }else{
          alert('Semua Field Wajib Di Isi')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, konfigOp.create(formData));
        } else {
            api = Api(context, konfigOp.update(this.konfigData.id, formData));
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

            Api(context, konfigOp.delete(id)).onSuccess(function(response) {
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
      changePage(page){
        this.pagination.page = page;
        this.get();
      },
    }
  }
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
  ::placeholder {
    color: #DCDCDC;
    padding-left: 20px;
  }
</style>
