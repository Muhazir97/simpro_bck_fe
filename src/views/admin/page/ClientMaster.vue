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
                  <h4 class="card-title">Client Master</h4>
                  <!-- <p class="card-category">Here is a subtitle for this table</p> -->
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
            <table class="table">
              <thead>
                <slot name="columns">
                  <tr style="background-color: #F0F8FF;">
                    <th>Client Code</th>
                    <th>Client Name</th>
                    <th>Client Description</th>
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
                  <td style="font-size: 13px;">{{row.client_code}}</td>
                  <td style="font-size: 13px;">{{row.client_name}}</td>
                  <td style="font-size: 13px;">{{row.client_description}}</td>
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
                    label="Client Code"
                    placeholder="Client Code"
                    v-model="client.client_code">
              </base-input>
              <base-input type="text"
                    label="Client Name"
                    placeholder="Client Name"
                    v-model="client.client_name">
              </base-input>
              <base-input type="text"
                    label="Client Description"
                    placeholder="Client Description"
                    v-model="client.client_description">
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
  import client from '@/services/client.service';
  
  export default {
    components: {
      Card,
      Modal
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
        client: {}, 
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
        Api(context, client.index({search: this.search})).onSuccess(function(response) {    
            context.table.data = response.data.data.data.data;
            console.log(response)
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        })
        .call()
      },
      filter() {
        clearTimeout(this.loadTimeout);
        this.loadTimeout = setTimeout(() => {
            this.get()
        }, 100);
      },
      create() {
          this.form.add   = true;
          this.form.show  = true;
          this.form.title = "Add Data";
          this.client = {}
      },
      edit(id) {
        let context = this;               
        Api(context, client.show(id)).onSuccess(function(response) {
            context.client     = response.data.data[0];
            context.form.show  = true;
            context.form.title = 'Edit Data';                        
        })
        .call()        
      },
      save(){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        if (this.client.client_code != undefined && this.client.client_name != undefined && this.client.client_description != undefined) {
          formData.append('client_code', this.client.client_code);
          formData.append('client_name', this.client.client_name);
          formData.append('client_description', this.client.client_description);
        }else{
          alert('Semua Field Wajib Di Isi')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, client.create(formData));
        } else {
            api = Api(context, client.update(this.client.id, formData));
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

            Api(context, client.delete(id)).onSuccess(function(response) {
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
      }
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
