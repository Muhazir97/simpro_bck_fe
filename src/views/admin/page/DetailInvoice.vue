<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= INFORMATION ===============================  -->
      <div class="table-responsive mb-2">
        <div class="text-center display-4">
          <span style="margin-bottom: -20px; font-weight: bold;">DETAIL INVOICE</span>
          <a :href="apiUrl+'print-invoice/'+detailInvoiceData.invoice_no" target="_BLANK">
            <button type="submit" class="btn btn-sm btn-success btn-fill float-right">
              <i class="fa fa-file-text"></i> Print
            </button>
          </a>
          <hr style="margin-top: 50px;">
        </div>
      </div>
      <!-- ----------------- HEADER -------------- -->
      <h5 style="text-align: center; font-weight: bold;" class="mb-4">INVOICE</h5>

      <!-- ----------------- INFORMATION -------------- -->
      <div class="row mb-4">
        <div class="col-4">
          <p style="font-weight: bold;">{{ detailInvoiceData.client_name }}</p>        
          {{ detailInvoiceData.client_addres }}
        </div>
        <div class="col-4">
          <p style="margin-right: 90px;">No.</p>
          <p style="margin-top: -15px; margin-right: 90px;">Tanggal / Date</p>
          <p style="margin-top: -15px; margin-right: 90px;">Syarat Pembayaran / Term</p>
          <p style="margin-top: -15px; margin-right: 90px;">Mata Uang / Currency</p>
          <p style="margin-top: -15px; margin-right: 90px;">Jatuh Tempo / Due Date</p>
          <p style="margin-top: -15px; margin-right: 90px;">PO/SPK</p>
          <p style="margin-top: -15px; margin-right: 90px;">Job No</p>
        </div>
        <div class="col-4" style="margin-left: -50px;">
          <p>: &nbsp; {{ detailInvoiceData.invoice_no }} </p> 
          <p style="margin-top: -15px;">: &nbsp; {{ moment(detailInvoiceData.invoice_date).locale('id').format('LL') }} </p>
          <p style="margin-top: -15px;">: &nbsp; COD </p>
          <p style="margin-top: -15px;">: &nbsp; IDR </p>
          <p style="margin-top: -15px;">: &nbsp; {{ moment(moment().add(detailInvoiceData.due_date, 'days')).locale('id').format('LL') }} <input style="border: 1px solid white; text-align: center;" size="1" placeholder="Days" @change="updateInv(detailInvoiceData.invoice_no)" v-model="detailInvoiceData.due_date"></input> Days</p> 
          <p style="margin-top: -15px;">: &nbsp; {{ detailInvoiceData.po_no }} </p>
          <p style="margin-top: -15px;">: &nbsp; {{ detailInvoiceData.job_no }} </p>
        </div>
      </div>

      <!-- ----------------- TABLE -------------- -->
      <button type="submit" class="btn btn-sm btn-primary btn-fill float-right mb-2 mr-2" @click="addSJ()">
        Add Surat Jalan
      </button>
      <table border="1" class="mb-4">
        <thead>
          <slot name="columns">
            <tr style="background-color: #F0F8FF;">
              <th style="text-align:center; font-size: 14px;">KUANTITAS / Quantity Kg</th>
              <th style="text-align:center; font-size: 14px;">Keterangan / Description <br> JENIS & UKURAN / (Type & Size)</th>
              <th style="text-align:center; font-size: 14px;">HARGA PER UNIT / Unit Price</th>
              <th style="text-align:center; font-size: 14px;">JUMLAH / Amount</th>
              <th></th>
            </tr>
          </slot>
        </thead>
        <tbody>
          <tr v-for="(row, i) in table.data" :key="i">
            <td style="text-align: right;">{{ convertRp(row.weight) }}</td>
            <td v-if="detailInvoiceData.prod_class === 'Slitting'">Slitting Coil</td>
            <td v-if="detailInvoiceData.prod_class === 'Tolling'">{{ row.type_pipa }}</td>
            <td v-if="detailInvoiceData.prod_class === 'Shearing'">Shearing Coil</td>
            <td style="text-align: right;">{{ convertRp(row.rate) }}</td>
            <td style="text-align: right;">{{ convertRp(row.weight * row.rate) }}</td>
            <td style="text-align: center;">
              <i class="fa fa-times-circle" aria-hidden="true" title="Delete" style="cursor: pointer;" @click="saveSJ(row.id, 'delete')"></i>
            </td>
          </tr>
          <tr>
            <td style="text-align: right;" colspan="2" class="align-middle"></td>
            <td style="text-align: right;"> Sub Total <br> PPN 11 % <br><b style="margin-top: 80px;">Total</b></td>
            <td style="text-align: right; margin-top: 100px;">
              {{ convertRp(totalAmount) }} <br>
              {{ convertRp(Number(ppn).toFixed(0)) }} <br>
              <hr style="margin-top: -1px; background: black; height: 1px;"><p style="margin-top: -15px; font-weight: bold;"> {{ convertRp(Number(totalAmount + ppn).toFixed(0)) }}</p>
            </td>
            <td style="display: none;"></td>
          </tr>
        </tbody>
      </table>

      <!-- ========================= FOOTER ===============================  -->
      <div class="row">
        <div class="col-8">
          <p class="mt-4">Dibayarkan kepada / Please remit payment to :</p>
          <table class="table table-sm table-bordered">
            <tbody>
                <tr>
                  <td width="300">Atas Nama / Account Name</td>
                  <td>
                    <input style="border: 1px solid white; background: transparent;" size="50" placeholder="Atas Nama" @change="updateInv(detailInvoiceData.invoice_no)" v-model="detailInvoiceData.an_bank"></input>
                  </td>
                </tr>
                <tr>
                  <td width="300">No. Rekening / Account Number </td>
                  <td>
                    <input style="border: 1px solid white; background: transparent;" size="50" placeholder="No. Rekening" @change="updateInv(detailInvoiceData.invoice_no)" v-model="detailInvoiceData.no_rek"></input>
                  </td>
                </tr>
                <tr>
                  <td width="300">Bank</td>
                  <td>
                    <input style="border: 1px solid white; background: transparent;" size="50" placeholder="Bank" @change="updateInv(detailInvoiceData.invoice_no)" v-model="detailInvoiceData.bank"></input>
                  </td>
                </tr>
                <tr>
                  <td width="300">Cabang / Branch</td>
                  <td>
                    <input style="border: 1px solid white; background: transparent;" size="50" placeholder="Cabang" @change="updateInv(detailInvoiceData.invoice_no)" v-model="detailInvoiceData.cabang"></input>
                  </td>
                </tr>
            </tbody>
        </table>
        <small>
          1. Keterlambatan pembayaran akan dikenai denda 2% per bulan / <br>
             &nbsp;&nbsp;&nbsp;&nbsp; 2 % per month will be applied for delayed payments. <br>
          2. Pembayaran dengan cek / giro dinyatakan syah setelah diterima dalam rekening perusahaan / <br>
             &nbsp;&nbsp;&nbsp;&nbsp; Payments by cheque / gyro valid only after cleared by bank.
        </small>
        </div>
        <div class="col-4">
          <div style="width: 100%;">
            <div style="text-align: center;">
              <p style="text-align: center; margin-top: 70px"></p>
              <p style="text-align: center; margin-top: -15px;">Cilegon, {{ moment(detailInvoiceData.invoice_date).locale('id').format('LL') }}</p>
              <p style="text-align: center; margin-bottom: 60px; margin-top: -15px;">PT. BUANA CENTRA KARYA</p>
            </div>
          </div>
          <div style="width: 100%;">
            <div style="">
              <p style="text-align: center;"><input style="border: 1px solid white; text-align: center; border-bottom: 1px solid black;" value="Robinand"></p>
              <p style="text-align: center; margin-top: -15px;"><input style="border: 1px solid white; text-align: center;" value="Direktur"></p>
            </div>
          </div>
        </div>
      </div>
     

      <!-- MODAL ADD SURAT JALAN-->
      <div>
         <modal :show.sync="form.show">
           <template slot="header">
              <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
           </template>
           <div>
              <table class="table">
                <thead>
                  <slot name="columns">
                    <tr style="background-color: #F0F8FF;">
                      <th style="font-size: 13px;">Surat Jalan No</th>
                      <th style="font-size: 13px;">Tgl SJ</th>
                      <th></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in tableMDLSJ.data" :key="i">
                    <td style="font-size: 13px;">{{row.packing_list_no}}</td>
                    <td style="font-size: 13px;">{{row.packing_date}}</td>
                    <td>
                      <i class="fa fa-plus-square text-primary" aria-hidden="true" title="Add SJ" style="cursor: pointer;" @click="saveSJ(row.id, 'add')"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
           </div>
           <template slot="footer">
           </template>
         </modal>
      </div>
    </card>

    <!-- ============================== KWITANSI ======================= -->
    <card>
      <div class="row">
        <div class="col-8">
          <p Style="text-align: center; font-weight: bold; margin-top: 20px; margin-right: -290px;"><u>KWITANSI</u></p>
          <p style="text-align: center; font-weight: bold; margin-top: -20px; margin-right: -290px;">RECEIPT</p>
        </div>
        <div class="col-4 mt-4">
          <small style="margin-left: -80px;">{{ detailInvoiceData.invoice_no }}</small>
        </div>
      </div>
      
      <hr style="height: 2px; background: black;">
      <p>Sudah terima dari &nbsp;&nbsp; : &nbsp;  {{ detailInvoiceData.client_name }} <hr style="margin-top: -20px; background: black; height: 0.5px;"><br></p>
      <p style="margin-top: -70px;">Received from</p>
      <p>
        Jumlah uang &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;  <input style="border: 1px solid white; background: transparent;" size="100" placeholder="Terbilang ..." @change="updateInv(detailInvoiceData.invoice_no)" v-model="detailInvoiceData.jumlah_uang"></input> <hr style="margin-top: -20px; background: black; height: 0.3px;"><br>
      </p>
      <p style="margin-top: -70px;">The amount of</p>
      <p>Untuk pembayaran &nbsp;: &nbsp;   <hr style="margin-top: -20px; background: black; height: 0.1px;"><br></p>
      <p style="margin-top: -70px;">Paymet for</p>
      <hr style="height: 2px; background: black;">

      <p style="font-weight: bold; margin-left: 100px;"><u>Rp. {{ convertRp(Number(totalAmount + ppn).toFixed(0)) }}</u></p>

      <div class="row">
        <div class="col-8">
          <table class="table table-sm table-bordered mt-5">
            <tbody>
              <tr>
                <td>
                  Perhatian diminta dengan hormat Pembayaran dilakukan dengan giro bilyet A/N. PT Buana Centra Karya, Bank Syariah Indonesia, Cabang Cilegon, AC. 7149876938
                </td>
              </tr>
            </tbody>
          </table>
          <small>
            Catatan : Penyerahan kwitansi ini belum berarti pembayaran
              telah diterima 
          </small>
        </div>
        <div class="col-4" style="margin-top: -50px;">
          <div style="width: 100%;">
            <div style="text-align: center;">
              <p style="text-align: center; margin-top: 70px"></p>
              <p style="text-align: center; margin-top: -15px;">Cilegon, {{ moment(detailInvoiceData.invoice_date).locale('id').format('LL') }}</p>
              <p style="text-align: center; margin-bottom: 60px; margin-top: -15px;">PT. BUANA CENTRA KARYA</p>
            </div>
          </div>
          <div style="width: 100%;">
            <div style="">
              <p style="text-align: center;"><input style="border: 1px solid white; text-align: center; border-bottom: 1px solid black;" value="Robinand"></p>
              <p style="text-align: center; margin-top: -15px;"><input style="border: 1px solid white; text-align: center;" value="Direktur"></p>
            </div>
          </div>
        </div>
      </div>
    </card>

  </div>
</template>
<script>
  import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import invoice from '@/services/invoice.service';
  import Api from '@/helpers/api';
  import Autocomplete from 'vue2-autocomplete-js'
  require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
  var moment = require('moment');

  export default {
    components: {
      Card,
      Modal,
      Autocomplete
    },
    data () {
      return {
        moment:moment,
        form: {
            add: true,
            title: "Add Surat Jalan",
            show: false
        },
        table: {
          data: []
        },
        tableMDLSJ: {
          data: []
        },
        apiUrl :config.apiUrl,
        storageUrl : config.storageUrl,
        tokenApi : '',
        detailInvoiceData: {},
        totalTonase: '',
        totalQty: '',
        totalAmount: '',
        ppn: '',
      }
    },
    mounted(){
      this.get();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, invoice.showInvoice(context.$route.params.invoice_no)).onSuccess(function(response) {    
            context.detailInvoiceData = response.data.data.data;
            context.tableMDLSJ.data   = response.data.data.dataSJMdl;
            context.table.data        = response.data.data.dataSJTbl;
            context.totalAmount       = response.data.data.totalAmount;
            context.ppn               = response.data.data.ppn;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.detailInvoiceData = '';
            }
        })
        .call()
      },
      addSJ() {
          this.form.add   = true;
          this.form.show  = true;
          this.form.title = "Add Surat Jalan";
      },
      saveSJ(id, type){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        formData.append('id', id);
        formData.append('type', type);
        formData.append('invoice_no', context.detailInvoiceData.invoice_no);

        api = Api(context, invoice.addSJ(formData));
        api.onSuccess(function(response) {
            context.notifyVue((context.formTitle === 'Add Material') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.formTitle === 'Add Material') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {  
            context.get();
        })
        .call();
      },
      remove(id) {
          var r = confirm("Anda yakin ingin menghapus data ini ?");
          if (r == true) {
            let context = this;

            Api(context, news.deleteSJ(id)).onSuccess(function(response) {
                context.get();
                context.notifyVue('Data Berhasil di Hapus', 'top', 'right', 'info')
            }).call();
          }
      },
      updateInv(invoice_no){
        let api     = null;
        let context = this;

        api = Api(context, invoice.updateInv({
            invoice_no: context.detailInvoiceData.invoice_no,
            due_date: context.detailInvoiceData.due_date,
            an_bank: context.detailInvoiceData.an_bank,
            no_rek: context.detailInvoiceData.no_rek,
            bank: context.detailInvoiceData.bank,
            cabang: context.detailInvoiceData.cabang,
            jumlah_uang: context.detailInvoiceData.jumlah_uang,
          }));
        api.onSuccess(function(response) {
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).onError(function(error) { 
            context.notifyVue('Update Failed', 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
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
        this.dataBA.surat_jalan_no = obj.packing_list_no;
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
