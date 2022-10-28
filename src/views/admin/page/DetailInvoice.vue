<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= INFORMATION ===============================  -->
      <div class="table-responsive mb-2">
        <div class="text-center display-4">
          <span style="margin-bottom: -20px; font-weight: bold;">DETAIL INVOICE</span>
          <a :href="apiUrl+'print-news/'+detailInvoiceData.news_no" target="_BLANK">
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
          KOMPLEK KRAKATAU STEEL CIGADING
          PO BOX 7, WARNASARI, CITANGKIL
          KOTA CILEGON BANTEN 43443
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
          <p style="margin-top: -15px;">: &nbsp; 19 November 2022 </p> 
          <p style="margin-top: -15px;">: &nbsp; {{ detailInvoiceData.po_no }} </p>
          <p style="margin-top: -15px;">: &nbsp; {{ detailInvoiceData.job_no }} </p>
        </div>
      </div>

      <!-- ----------------- TABLE -------------- -->
      <table border="1" class="mb-4">
        <thead>
          <slot name="columns">
            <tr style="background-color: #F0F8FF;">
              <th style="text-align:center; font-size: 14px;">KUANTITAS / Quantity Kg</th>
              <th style="text-align:center; font-size: 14px;">Keterangan / Description <br> JENIS & UKURAN / (Type & Size)</th>
              <th style="text-align:center; font-size: 14px;">HARGA PER UNIT / Unit Price</th>
              <th style="text-align:center; font-size: 14px;">JUMLAH / Amount</th>
            </tr>
          </slot>
        </thead>
        <tbody>
          <tr>
           <td>28820</td>
           <td>Bare Pipe D 2 1/2" x 4,8 x 6000 mm (595 Btg)</td>
           <td>1100</td>
           <td>31702000</td>
          </tr>
          <tr>
            <td style="text-align: center;" colspan="1">Total</td>
            <td style="text-align: center;">{{ convertRp(totalQty) }}</td>
            <td style="text-align: center;">{{ convertRp(totalTonase) }}</td>
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
                  <td> PT. BUANA CENTRA KARYA </td>
                </tr>
                <tr>
                  <td width="300">No. Rekening / Account Number </td>
                  <td> 7149876938 </td>
                </tr>
                <tr>
                  <td width="300">Bank</td>
                  <td> BANK SYARIAH INDONESIA (BSI) </td>
                </tr>
                <tr>
                  <td width="300">Cabang / Branch</td>
                  <td> CILEGON </td>
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
              <p style="text-align: center; margin-top: -15px;">Cilegon, {{ detailInvoiceData.news_date }}</p>
              <p style="text-align: center; margin-bottom: 60px; margin-top: -15px;">PT. BUANA CENTRA KARYA</p>
            </div>
          </div>
          <div style="width: 100%;">
            <div style="">
              <p style="text-align: center;"><input style="border: 1px solid white; text-align: center; border-bottom: 1px solid black;" @change="updateBA(detailInvoiceData.news_no)" v-model="dataBA.nama_penerima"></p>
              <p style="text-align: center; margin-top: -15px;"><input style="border: 1px solid white; text-align: center;" @change="updateBA(detailInvoiceData.news_no)" v-model="dataBA.jabatan_penerima"></p>
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
                      <i class="fa fa-plus-square text-primary" aria-hidden="true" title="Add SJ" style="cursor: pointer;" @click="saveSJ(row.packing_list_no)"></i>
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

    <!-- ============================== REKAP SURAT JALAN ======================= -->
    <card>
      <p Style="text-align: center; font-weight: bold; margin-top: 20px">REKAP SURAT JALAN</p>
      <p style="text-align: center; font-weight: bold; margin-top: -20px">BA NO. {{detailInvoiceData.news_no}}</p>
      
      <div>
        <a :href="apiUrl+'print-rkp-sj-news/'+detailInvoiceData.news_no" target="_BLANK">
          <button type="submit" class="btn btn-sm btn-success btn-fill float-right">
            <i class="fa fa-file-text"></i> Print
          </button>
        </a>
        <button type="submit" class="btn btn-sm btn-primary btn-fill float-right mb-2 mr-2" @click="addSJ()">
          Add Surat Jalan
        </button>
      </div>
      <table border="1">
        <thead>
          <slot name="columns">
            <tr style="background-color: #F0F8FF;">
              <th style="text-align:center; font-size: 13px;">NO</th>
              <th style="text-align:center; font-size: 13px;">Surat Jalan No</th>
              <th style="text-align:center; font-size: 13px;">Tgl Surat Jalan</th>
              <th style="text-align:center; font-size: 14px;" v-if="detailInvoiceData.prod_class == 'Slitting'">Qty</th>
              <th style="text-align:center; font-size: 14px;" v-if="detailInvoiceData.prod_class == 'Tolling'">Btg</th>
              <th style="text-align:center; font-size: 13px;">TONASE (Kg)</th>
              <template v-if="detailInvoiceData.client_name !== 'PT. KRAKATAU PIPE INDUSTRIES' " >
                <th style="text-align:center; font-size: 13px;">Rate</th>
                <th style="text-align:center; font-size: 13px;">Jumlah</th>
              </template>
              <th></th>
              <th style="display: none;"></th>
            </tr>
          </slot>
        </thead>
        <<!-- tbody>
          <tr v-for="(row, i) in tableSJ.data" :key="i">
            <td style="font-size: 13px; text-align: center;">{{ i + 1 }}</td>
            <td style="font-size: 13px; text-align: center;">{{ row.surat_jalan_no }}</td>
            <td style="font-size: 13px; text-align: center;">{{ row.tgl_sj }}</td>
            <td style="font-size: 13px; text-align: center;">{{ convertRp(row.btg) }}</td>
            <td style="font-size: 13px; text-align: center;">{{ convertRp(row.tonase) }}</td>
            <template v-if="detailInvoiceData.client_name !== 'PT. KRAKATAU PIPE INDUSTRIES' " >
              <td style="font-size: 13px; text-align: center; border-bottom: none;">{{ convertRp(row.rate) }}</td>
              <td style="font-size: 13px; text-align: center; border-bottom: none;">{{ convertRp(row.jumlah) }}</td>
            </template>
            <td style="text-align: center;"><i class="fa fa-trash-o" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="remove(row.id)"></i></td>
            <td style="display: none;"></td>
          </tr>
          <tr>
            <td style="text-align: center; font-size: 13px;" colspan="3">Total</td>
            <td style="text-align: center; font-size: 13px;">{{ convertRp(totalQty) }}</td>
            <td style="text-align: center; font-size: 13px;">{{ convertRp(totalTonase) }}</td>
            <td></td>
            <td style="text-align: center; font-size: 13px;" v-if="detailInvoiceData.client_name !== 'PT. KRAKATAU PIPE INDUSTRIES' ">{{ convertRp(totalJmlh) }}</td>
            <td style="display: none;"></td>
          </tr> -->
        </tbody>
      </table>
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
        totalJmlh: '',
        dataBA : {
          nama: '',
          jabatan: '',
          surat_jalan_no: '',
          ppn: '',
          nama_penerima: '',
          jabatan_penerima: '',
          nama_mengetahui: '',
          jabatan_mengetahui: '',
          nama_menyetujui: '',
          jabatan_menyetujui: '',
        }
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
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.detailInvoiceData = '';
            }
        })
        .call()
      },
      // updateBA(news_no){
      //   let api     = null;
      //   let context = this;
      //   api = Api(context, news.updateBA(news_no, {
      //       nama: context.dataBA.nama,
      //       jabatan: context.dataBA.jabatan,
      //       ppn: context.dataBA.ppn,

      //       nama_penerima: context.dataBA.nama_penerima,
      //       jabatan_penerima: context.dataBA.jabatan_penerima,
      //       nama_mengetahui: context.dataBA.nama_mengetahui,
      //       jabatan_mengetahui: context.dataBA.jabatan_mengetahui,
      //       nama_menyetujui: context.dataBA.nama_menyetujui,
      //       jabatan_menyetujui: context.dataBA.jabatan_menyetujui,
      //     }));
      //   api.onSuccess(function(response) {
      //       context.notifyVue(response.data.message, 'top', 'right', 'info')
      //   }).onError(function(error) { 
      //       context.notifyVue('Update Failed', 'top', 'right', 'danger')
      //   }).onFinish(function() {  
      //   })
      //   .call();
      // },
      // addSJ() {
      //     this.form.add   = true;
      //     this.form.show  = true;
      //     this.form.title = "Add Surat Jalan";
      // },
      // saveSJ(surat_jalan_no){
      //   let api = null;
      //   let context = this;
      //   let formData = new FormData(); 

      //   formData.append('job_no', context.detailInvoiceData.job_no);
      //   formData.append('news_no', context.detailInvoiceData.news_no);
      //   formData.append('surat_jalan_no', surat_jalan_no);

      //   api = Api(context, news.addSJ(formData));
      //   api.onSuccess(function(response) {
      //       context.notifyVue((context.formTitle === 'Add SJ') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
      //   }).onError(function(error) {                    
      //       context.notifyVue((context.formTitle === 'Add SJ') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
      //   }).onFinish(function() {
      //       // context.$refs.autocomplete.clearInput()
      //       context.get();
      //   })
      //   .call();
      // },
      // remove(id) {
      //     var r = confirm("Anda yakin ingin menghapus data ini ?");
      //     if (r == true) {
      //       let context = this;

      //       Api(context, news.deleteSJ(id)).onSuccess(function(response) {
      //           context.get();
      //           context.notifyVue('Data Berhasil di Hapus', 'top', 'right', 'info')
      //       }).call();
      //     }
      // },


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
