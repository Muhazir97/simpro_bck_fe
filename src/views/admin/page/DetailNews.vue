<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= INFORMATION ===============================  -->
      <div class="table-responsive mb-2">
        <div class="text-center display-4">
          <span style="margin-bottom: -20px; font-weight: bold;">DETAIL NEWS / BA</span>
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
        <p style="margin-bottom: 1px;">Nama <span style="margin-left: 45px;">:</span> <input type="" name="" style="border: 1px solid white;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.nama"></p>
        <p style="margin-bottom: 1px;">Perusahaan : PT. Buana Centar Karya</p>
        <p style="margin-bottom: 1px;">Jabatan <span style="margin-left: 30px;">:</span> <input type="" name="" style="border: 1px solid white;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.jabatan"></p>
        <p>Alamat <span style="margin-left: 38px;">:</span> Jl. Raya Merak Km. 115 Rawa Arum, Cilegon</p>
      </div>
      <p>Telah menyerahkan barang, <span v-if="detailNewsData.prod_class == 'Slitting'">Slitting Coil</span><span v-if="detailNewsData.prod_class == 'Tolling'">Tolling Pipa</span><span v-if="detailNewsData.prod_class == 'Shearing'">Shearing</span> {{detailNewsData.client_name}} dengan rincian sebagai berikut :</p>

      <!-- ----------------- DETAIL NEWS -------------- -->
      <p style="margin-bottom: 1px;">No Purchase Order : {{detailNewsData.po_no}}</p>
      <p>Job No <span style="margin-left: 87px;">:</span> {{detailNewsData.job_no}}</p>
      <div>
        <button type="submit" class="btn btn-sm btn-primary btn-fill float-right mb-2" @click="addSJ()">
          Add Surat Jalan
        </button>
      </div>
      <table class="table table-bordered">
        <thead>
          <slot name="columns">
            <tr style="background-color: #F0F8FF;">
              <th style="text-align:center;">NO</th>
              <th style="text-align:center;">Surat Jalan No</th>
              <th style="text-align:center;">Tgl Surat Jalan</th>
              <th style="text-align:center;">Nama Barang</th>
              <th style="text-align:center;">TONASE (Kg)</th>
              <th style="text-align:center;">Qty</th>
              <th style="text-align:center;">Rate</th>
              <th style="text-align:center;">Jumlah</th>
              <th></th>
              <th style="display: none;"></th>
            </tr>
          </slot>
        </thead>
        <tbody>
          <tr v-for="(row, i) in tableSJ.data" :key="i">
            <td style="font-size: 13px;">{{ i + 1 }}</td>
            <td style="font-size: 13px;">{{ row.surat_jalan_no }}</td>
            <td style="font-size: 13px;">{{ row.tgl_sj }}</td>
            <td style="font-size: 13px;">{{ row.nama_brg }}</td>
            <td style="font-size: 13px;">{{ convertRp(row.tonase) }}</td>
            <td style="font-size: 13px;">{{ convertRp(row.btg) }}</td>
            <td style="font-size: 13px; border-bottom: none;">{{ convertRp(row.rate) }}</td>
            <td style="font-size: 13px; border-bottom: none;">{{ convertRp(row.jumlah) }}</td>
            <td><i class="fa fa-trash-o" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="remove(row.id)"></i></td>
            <td style="display: none;"></td>
          </tr>
          <tr>
            <td colspan="4">Total</td>
            <td>{{ convertRp(totalTonase) }}</td>
            <td>{{ convertRp(totalQty) }}</td>
            <td></td>
            <td>{{ convertRp(totalJmlh) }}</td>
            <td style="display: none;"></td>
          </tr>
        </tbody>
      </table>

      <!-- ----------------- FOOTER -------------- -->
      <p>Harga tersebut <input type="" name="" style="border: 1px solid white;" @change="updateBA(detailNewsData.news_no)" v-model="dataBA.ppn"></p>
      <p>Demikian Berita Acara ini di buat, agar dapat dipergunakan sebagaimana mestinya.</p>

      <!-- MODAL ADD SURAT JALAN-->
      <div>
         <modal :show.sync="form.show">
           <template slot="header">
              <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
           </template>
           <div>
              <label>Surat Jalan No/ Delivery No</label><br>
              <autocomplete
                ref="autocomplete"
                :url="apiUrl+'delivery/find-delivery-no'"
                :customHeaders="{ Authorization: tokenApi }"
                anchor="packing_list_no"
                label="job_no"
                :on-select="getData"
                placeholder="Choose Surat Jalan No/ Delivery No"
                :min="3"
                :process="processJSON"
                :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                >
              </autocomplete>
           </div>
           <template slot="footer">
               <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="form.show = false">Close</button>
               <button type="primary" class="btn btn-sm btn-info btn-fill" @click="saveSJ()">Save</button>
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
            context.detailNewsData = response.data.data.data;
            context.dataBA         = response.data.data.data;
            context.tableSJ.data   = response.data.data.newsSJ;
            context.totalTonase    = response.data.data.totalTonase;
            context.totalQty       = response.data.data.totalQty;
            context.totalJmlh      = response.data.data.totalJmlh;
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
      saveSJ(){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        formData.append('job_no', context.detailNewsData.job_no);
        formData.append('news_no', context.detailNewsData.news_no);
        formData.append('surat_jalan_no', context.dataBA.surat_jalan_no);

        api = Api(context, news.addSJ(formData));
        api.onSuccess(function(response) {
            context.notifyVue((context.formTitle === 'Add SJ') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.formTitle === 'Add SJ') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {
            context.$refs.autocomplete.clearInput()
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
