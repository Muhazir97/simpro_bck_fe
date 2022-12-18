<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= INFORMATION ===============================  -->
      <div class="table-responsive mb-2">
        <div class="text-center display-4">
          <span style="margin-bottom: -20px; font-weight: bold;">DETAIL BA</span>
          <a :href="apiUrl+'print-news/'+detailNewsData.news_no" target="_BLANK">
            <button type="submit" class="btn btn-sm btn-success btn-fill float-right">
              <i class="fa fa-file-text"></i> Print
            </button>
          </a>
          <hr style="margin-top: 50px;">
        </div>
      </div>
      <!-- ----------------- HEADER -------------- -->
      <p style="text-align: center; font-weight: bold;">BERITA ACARA</p>
      <p style="text-align: center; font-weight: bold; margin-top: -20px;">SERAH TERIMA <span v-if="detailNewsData.prod_class == 'Slitting'">SLITTING COIL</span><span v-if="detailNewsData.prod_class == 'Tolling'">TOLLING PIPA</span><span v-if="detailNewsData.prod_class == 'Shearing'">SHEARING</span></p>
      <p style="text-align: center; font-weight: bold; margin-top: -20px;">NO. {{detailNewsData.news_no}}</p>

      <!-- ----------------- INFORMATION -------------- -->
      <p>Kami yang bertanda tangan di bawah ini,</p>
      <div style="margin-left: 20px;">
        <p style="margin-bottom: 1px;">Nama <span style="margin-left: 45px;">:</span> <input size="40" style="border: 1px solid white;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.nama"></p>
        <p style="margin-bottom: 1px;">Perusahaan : PT. Buana Centar Karya</p>
        <p style="margin-bottom: 1px;">Jabatan <span style="margin-left: 30px;">:</span> <input size="40" style="border: 1px solid white;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.jabatan"></p>
        <p>Alamat <span style="margin-left: 38px;">:</span> Jl. Raya Merak Km. 115 Rawa Arum, Cilegon</p>
      </div>
      <p>Telah menyerahkan barang, <span v-if="detailNewsData.prod_class == 'Slitting'">Slitting Coil</span><span v-if="detailNewsData.prod_class == 'Tolling'">Tolling Pipa</span><span v-if="detailNewsData.prod_class == 'Shearing'">Shearing</span> {{detailNewsData.client_name}} dengan rincian sebagai berikut :</p>

      <!-- ----------------- DETAIL NEWS -------------- -->
      <p style="margin-bottom: 1px;">No Purchase Order : {{detailNewsData.po_no}}</p>
      <p style="margin-bottom: 1px;">Tonase <span style="margin-left: 87px;">:</span> {{convertRp(detailNewsData.tonase)}}</p>
      <p>Job No <span style="margin-left: 87px;">:</span> {{detailNewsData.job_no}}</p>
      <!-- <div>
        <button type="submit" class="btn btn-sm btn-primary btn-fill float-right mb-2" @click="addSJ()">
          Add Surat Jalan
        </button>
      </div> -->
      <table border="1">
        <thead>
          <slot name="columns">
            <tr style="background-color: #F0F8FF;">
              <th style="text-align:center; font-size: 14px;">NO</th>
              <th style="text-align:center; font-size: 14px;" v-if="detailNewsData.prod_class == 'Slitting'">Nama Pekerjaan</th>
              <th style="text-align:center; font-size: 14px;" v-if="detailNewsData.prod_class == 'Tolling'">Nama Barang</th>
              <th style="text-align:center; font-size: 14px;" v-if="detailNewsData.prod_class == 'Slitting'">Qty</th>
              <th style="text-align:center; font-size: 14px;" v-if="detailNewsData.prod_class == 'Tolling'">Btg</th>
              <th style="text-align:center; font-size: 14px;">TONASE (Kg)</th>
              <template v-if="detailNewsData.client_name !== 'PT. KRAKATAU PIPE INDUSTRIES' " >
                <th style="text-align:center; font-size: 14px;">Rate</th>
                <th style="text-align:center; font-size: 14px;">Jumlah</th>
              </template>
              <th style="text-align:center; font-size: 14px;">Tempat Penyerahan</th>
            </tr>
          </slot>
        </thead>
        <tbody>
          <tr v-for="(row, i) in tableMerg.data" :key="i">
            <td style="font-size: 13px; text-align: center;">{{ i + 1 }}</td>
            <td style="font-size: 13px; text-align: center;">{{ row.nama_brg }}</td>
            <td style="font-size: 13px; text-align: center;">{{ convertRp(row.btg) }}</td>
            <td style="font-size: 13px; text-align: center;">{{ convertRp(row.tonase) }}</td>
            <template v-if="detailNewsData.client_name !== 'PT. KRAKATAU PIPE INDUSTRIES' " >
              <td style="font-size: 13px; text-align: center; border-bottom: none;">{{ convertRp(row.rate) }}</td>
              <td style="font-size: 13px; text-align: center; border-bottom: none;">{{ convertRp(row.jumlah) }}</td>
            </template>
            <template v-if="i == 0">
              <td :rowspan="tableMerg.data.length" style="font-size: 13px; text-align: center;">Gudang PT. BCK</td>
            </template>
          </tr>
          <tr>
            <td style="text-align: center; font-size: 13px" colspan="2">Total</td>
            <td style="text-align: center; font-size: 13px">{{ convertRp(totalQty) }}</td>
            <td style="text-align: center; font-size: 13px">{{ convertRp(totalTonase) }}</td>
            <td v-if="detailNewsData.client_name !== 'PT. KRAKATAU PIPE INDUSTRIES' "></td>
            <td style="text-align: center; font-size: 13px" v-if="detailNewsData.client_name !== 'PT. KRAKATAU PIPE INDUSTRIES' ">{{ convertRp(totalJmlh) }}</td>
            <td style="display: none;"></td>
          </tr>
        </tbody>
      </table>

      <!-- ----------------- FOOTER -------------- -->
      <p class="mt-3">Harga tersebut <input style="border: 1px solid white;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.ppn"></p>
      <p>Demikian Berita Acara ini di buat, agar dapat dipergunakan sebagaimana mestinya.</p>

      <!-- ========================= TTD ===============================  -->
      <template v-if="detailNewsData.prod_class == 'Slitting'">
        <div class="row">
          <div class="col-4">
            <div style="width: 100%;">
              <div style="">
                <p style="text-align: center; margin-top: 30px">Cilegon, {{ detailNewsData.news_date }}</p>
                <p style="text-align: center; margin-top: -15px;">Yang menyerahkan</p>
                <p style="text-align: center; margin-bottom: 60px; margin-top: -15px;">PT. BUANA CENTRA KARYA</p>
              </div>
            </div>
            <div style="width: 100%; page-break-after: always;">
              <div style="">
                <p style="text-align: center;"><input disabled style="border: 1px solid white; text-align: center; border-bottom: 1px solid black;" v-model="dataBA.nama"><br></p>
                <p style="text-align: center; margin-top: -15px;">{{dataBA.jabatan}}<br></p>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div style="width: 100%;">
              <div style="text-align: center;">
                <p style="text-align: center; margin-top: 70px"></p>
                <p style="text-align: center; margin-top: -15px;">Yang Menerima</p>
                <p style="text-align: center; margin-bottom: 60px; margin-top: -15px;">{{detailNewsData.client_name}}</p>
              </div>
            </div>
            <div style="width: 100%;">
              <div style="">
                <p style="text-align: center;"><input style="border: 1px solid white; text-align: center; border-bottom: 1px solid black;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.nama_penerima"></p>
                <p style="text-align: center; margin-top: -15px;"><input style="border: 1px solid white; text-align: center;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.jabatan_penerima"></p>
              </div>
            </div>
          </div>
          <div class="col-4" v-if="detailNewsData.client_name == 'PT. KRAKATAU PIPE INDUSTRIES'">
            <div style="width: 100%;">
              <div style="text-align: center;">
                <p style="text-align: center; margin-top: 70px"></p>
                <p style="text-align: center; margin-top: -15px;">Mengetahui</p>
                <p style="text-align: center; margin-bottom: 60px; margin-top: -15px;">{{detailNewsData.client_name}}</p>
              </div>
            </div>
            <div style="width: 100%;">
              <div style="">
                <p style="text-align: center;"><input style="border: 1px solid white; text-align: center; border-bottom: 1px solid black;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.nama_mengetahui"></p>
                <p style="text-align: center; margin-top: -15px;"><input style="border: 1px solid white; text-align: center;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.jabatan_mengetahui"></p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="detailNewsData.prod_class == 'Tolling'">
        <div class="row">
          <div class="col-6">
            <div style="width: 100%;">
              <div style="">
                <p style="text-align: center; margin-top: 30px">Cilegon, {{ detailNewsData.news_date }}</p>
                <p style="text-align: center; margin-top: -15px;">Yang menyerahkan</p>
                <p style="text-align: center; margin-bottom: 60px; margin-top: -15px;">PT. BUANA CENTRA KARYA</p>
              </div>
            </div>
            <div style="width: 100%; page-break-after: always;">
              <div style="">
                <p style="text-align: center;"><input disabled style="border: 1px solid white; text-align: center; border-bottom: 1px solid black;" v-model="dataBA.nama"><br></p>
                <p style="text-align: center; margin-top: -15px;">{{dataBA.jabatan}}<br></p>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div style="width: 100%;">
              <div style="text-align: center;">
                <p style="text-align: center; margin-top: 70px"></p>
                <p style="text-align: center; margin-top: -15px;">Yang Menerima</p>
                <p style="text-align: center; margin-bottom: 60px; margin-top: -15px;">{{detailNewsData.client_name}}</p>
              </div>
            </div>
            <div style="width: 100%;">
              <div style="">
                <p style="text-align: center;"><input style="border: 1px solid white; text-align: center; border-bottom: 1px solid black;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.nama_penerima"></p>
                <p style="text-align: center; margin-top: -15px;"><input style="border: 1px solid white; text-align: center;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.jabatan_penerima"></p>
              </div>
            </div>
          </div>
          <div class="col-6" v-if="detailNewsData.client_name == 'PT. KRAKATAU PIPE INDUSTRIES'">
            <div style="width: 100%;">
              <div style="text-align: center;">
                <p style="text-align: center; margin-top: 70px"></p>
                <p style="text-align: center; margin-top: -15px;">Mengetahui</p>
                <p style="text-align: center; margin-bottom: 60px; margin-top: -15px;">{{detailNewsData.client_name}}</p>
              </div>
            </div>
            <div style="width: 100%;">
              <div style="">
                <p style="text-align: center;"><input style="border: 1px solid white; text-align: center; border-bottom: 1px solid black;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.nama_mengetahui"></p>
                <p style="text-align: center; margin-top: -15px;"><input style="border: 1px solid white; text-align: center;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.jabatan_mengetahui"></p>
              </div>
            </div>
          </div>
          <div class="col-6" v-if="detailNewsData.client_name == 'PT. KRAKATAU PIPE INDUSTRIES' && detailNewsData.prod_class == 'Tolling'">
            <div style="width: 100%;">
              <div style="text-align: center;">
                <p style="text-align: center; margin-top: 70px"></p>
                <p style="text-align: center; margin-top: -15px;">Menyutujui</p>
                <p style="text-align: center; margin-bottom: 60px; margin-top: -15px;">{{detailNewsData.client_name}}</p>
              </div>
            </div>
            <div style="width: 100%;">
              <div style="">
                <p style="text-align: center;"><input style="border: 1px solid white; text-align: center; border-bottom: 1px solid black;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.nama_menyetujui"></p>
                <p style="text-align: center; margin-top: -15px;"><input style="border: 1px solid white; text-align: center;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.jabatan_menyetujui"></p>
              </div>
            </div>
          </div>
        </div>
      </template>

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
      <p style="text-align: center; font-weight: bold; margin-top: -20px">BA NO. {{detailNewsData.news_no}}</p>
      
      <div>
        <a :href="apiUrl+'print-rkp-sj-news/'+detailNewsData.news_no" target="_BLANK">
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
              <th style="text-align:center; font-size: 14px;" v-if="detailNewsData.prod_class == 'Slitting'">Qty</th>
              <th style="text-align:center; font-size: 14px;" v-if="detailNewsData.prod_class == 'Tolling'">Btg</th>
              <th style="text-align:center; font-size: 13px;">TONASE (Kg)</th>
              <template v-if="detailNewsData.client_name !== 'PT. KRAKATAU PIPE INDUSTRIES' " >
                <th style="text-align:center; font-size: 13px;">Rate</th>
                <th style="text-align:center; font-size: 13px;">Jumlah</th>
              </template>
              <th></th>
              <th style="display: none;"></th>
            </tr>
          </slot>
        </thead>
        <tbody>
          <tr v-for="(row, i) in tableSJ.data" :key="i">
            <td style="font-size: 13px; text-align: center;">{{ i + 1 }}</td>
            <td style="font-size: 13px; text-align: center;">{{ row.surat_jalan_no }}</td>
            <td style="font-size: 13px; text-align: center;">{{ row.tgl_sj }}</td>
            <td style="font-size: 13px; text-align: center;">{{ convertRp(row.btg) }}</td>
            <td style="font-size: 13px; text-align: center;">{{ convertRp(row.tonase) }}</td>
            <template v-if="detailNewsData.client_name !== 'PT. KRAKATAU PIPE INDUSTRIES' " >
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
            <td style="text-align: center; font-size: 13px;" v-if="detailNewsData.client_name !== 'PT. KRAKATAU PIPE INDUSTRIES' ">{{ convertRp(totalJmlh) }}</td>
            <td style="display: none;"></td>
          </tr>
        </tbody>
      </table>
    </card>

  </div>
</template>
<script>
  import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import news from '@/services/news.service';
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
            title: "Add Surat Jalan",
            show: false
        },
        tableSJ: {
          data: []
        },
        tableMerg: {
          data: []
        },
        tableMDLSJ: {
          data: []
        },
        apiUrl :config.apiUrl,
        storageUrl : config.storageUrl,
        tokenApi : '',
        detailNewsData: {},
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
      get() {
        let context = this;               
        Api(context, news.showNews(context.$route.params.news_no)).onSuccess(function(response) {
            context.detailNewsData  = response.data.data.data;
            context.dataBA          = response.data.data.data;
            context.tableSJ.data    = response.data.data.newsSJ;
            context.tableMerg.data  = response.data.data.mergSJ;
            context.tableMDLSJ.data = response.data.data.dataDeliverySJ;
            context.totalTonase     = response.data.data.totalTonase;
            context.totalQty        = response.data.data.totalQty;
            context.totalJmlh       = response.data.data.totalJmlh;
        }).onFinish(function() {  
             
        })
        .call()        
      },
      updateBA(news_no){
        let api     = null;
        let context = this;
        api = Api(context, news.updateBA(news_no, {
            nama: context.dataBA.nama,
            jabatan: context.dataBA.jabatan,
            ppn: context.dataBA.ppn,

            nama_penerima: context.dataBA.nama_penerima,
            jabatan_penerima: context.dataBA.jabatan_penerima,
            nama_mengetahui: context.dataBA.nama_mengetahui,
            jabatan_mengetahui: context.dataBA.jabatan_mengetahui,
            nama_menyetujui: context.dataBA.nama_menyetujui,
            jabatan_menyetujui: context.dataBA.jabatan_menyetujui,
          }));
        api.onSuccess(function(response) {
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).onError(function(error) { 
            context.notifyVue('Update Failed', 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
      },
      addSJ() {
          this.form.add   = true;
          this.form.show  = true;
          this.form.title = "Add Surat Jalan";
      },
      saveSJ(surat_jalan_no){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        formData.append('job_no', context.detailNewsData.job_no);
        formData.append('news_no', context.detailNewsData.news_no);
        formData.append('surat_jalan_no', surat_jalan_no);

        api = Api(context, news.addSJ(formData));
        api.onSuccess(function(response) {
            context.notifyVue((context.formTitle === 'Add SJ') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.formTitle === 'Add SJ') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {
            // context.$refs.autocomplete.clearInput()
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
