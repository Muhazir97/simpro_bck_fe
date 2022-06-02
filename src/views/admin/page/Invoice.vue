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
                  <h4 class="card-title">Invoice</h4>
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
                    <th>JOB NO</th>
                    <th>PROD CLASS</th>
                    <th>PO NO</th>
                    <th>CLIENT</th>
                    <th>QTY</th>
                    <th>UNIT</th>
                    <th>RATE</th>
                    <th>AMOUNT</th>
                    <th>INVOICE NO</th>
                    <th>INVOICE DATE</th>
                    <th>INVOICE QTY</th>
                    <th>INVOICE AMOUNT</th>
                    <th>INVOICE BALANCE</th>
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
                  <td style="font-size: 13px;">{{row.qty}}</td>
                  <td style="font-size: 13px;">{{row.unit}}</td>
                  <td style="font-size: 13px;">{{row.rate}}</td>
                  <td style="font-size: 13px;">{{row.amount}}</td>
                  <td style="font-size: 13px;">
                    <label class="badge badge-danger">{{row.invoice_no}}</label>
                  </td>
                  <td style="font-size: 13px;">{{row.invoice_date}}</td>
                  <td style="font-size: 13px;">{{row.invoice_qty}}</td>
                  <td style="font-size: 13px;">{{row.invoice_amount}}</td>
                  <td style="font-size: 13px;">{{row.invoice_balance}}</td>
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
              <base-input type="number"
                    label="Qty"
                    placeholder="Qty"
                    v-model="invoiceData.qty">
              </base-input>
              <base-input type="text"
                    label="Unit"
                    placeholder="Unit"
                    v-model="invoiceData.unit">
              </base-input>
              <base-input type="number"
                    label="Rate"
                    placeholder="Rate"
                    v-model="invoiceData.rate">
              </base-input>
              <base-input type="number"
                    label="Amount"
                    placeholder="Amount"
                    v-model="invoiceData.amount">
              </base-input>
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
                    label="Invoice Qty"
                    placeholder="Invoice Qty"
                    v-model="invoiceData.invoice_qty">
              </base-input>
              <base-input type="number"
                    label="Invoice Amount"
                    placeholder="Invoice Amount"
                    v-model="invoiceData.invoice_amount">
              </base-input>
              <base-input type="number"
                    label="Invoice Balance"
                    placeholder="Invoice Balance"
                    v-model="invoiceData.invoice_balance">
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
  import invoice from '@/services/invoice.service';
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
        invoiceData: {}, 
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
        Api(context, invoice.index({search: this.search})).onSuccess(function(response) {    
            context.table.data = response.data.data.data.data;
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
      save(){
        let api = null;
        let context = this;
        let formData = new FormData();

        if (this.invoiceData.job_no != undefined && this.invoiceData.qty != undefined && this.invoiceData.unit != undefined && this.invoiceData.rate != undefined && this.invoiceData.amount != undefined && this.invoiceData.invoice_no != undefined && this.invoiceData.invoice_date != undefined && this.invoiceData.invoice_qty != undefined && this.invoiceData.invoice_amount != undefined && this.invoiceData.invoice_balance != undefined) {
          formData.append('job_no', this.invoiceData.job_no);
          formData.append('qty', this.invoiceData.qty);
          formData.append('unit', this.invoiceData.unit);
          formData.append('rate', this.invoiceData.rate);
          formData.append('amount', this.invoiceData.amount);
          formData.append('invoice_no', this.invoiceData.invoice_no);
          formData.append('invoice_date', this.invoiceData.invoice_date);
          formData.append('invoice_qty', this.invoiceData.invoice_qty);
          formData.append('invoice_amount', this.invoiceData.invoice_amount);
          formData.append('invoice_balance', this.invoiceData.invoice_balance);
        }else{
          return alert('Semua Field Wajib Di Isi')
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

      // ================= Autocomplete ============
      // AMBIL DATA YANG DI PILIH AC
      getData(obj){
        this.invoiceData.job_no = obj.job_no;
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
