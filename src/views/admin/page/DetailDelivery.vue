<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= INFORMATION ===============================  -->
      <div class="table-responsive mb-2">
        <div class="text-center display-4">
          <span style="margin-bottom: -20px; font-weight: bold;">DETAIL DELIVERY</span>
          <a :href="apiUrl+'print-delivery/'+detailDeliveryData.packing_list_no" target="_BLANK">
            <button type="submit" class="btn btn-sm btn-success btn-fill float-right">
              <i class="fa fa-file-text"></i> Print
            </button>
          </a>
          <hr style="margin-top: 50px;">
        </div>
        <table class="table table-sm table-bordered">
            <tbody>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">JOB NO</td>
                    <td width="300">  {{ detailDeliveryData.job_no }} </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">SURAT JALAN NO</td>
                    <td> {{ detailDeliveryData.packing_list_no }} </td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">LPP No</td>
                    <td>   </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">TANGGAL</td>
                    <td> {{ detailDeliveryData.packing_date }} </td>
                </tr>
            </tbody>
        </table>
      </div> 

      <!-- ========================= ADDRES ===============================  -->
      CUSTOMER :
      <div class="row">
        <div class="col-6">
          <div class="card">
            <textarea style="border: 1px solid white; font-size: 15px;" rows="5" cols="40" disabled> Kpd YTH : &#10; {{ detailDeliveryData.client_name }} &#10; {{ detailDeliveryData.client_addres }}</textarea>
          </div>
        </div>
        <div class="col-6">
          <div class="card">
            <textarea style="border: 1px solid white; font-size: 15px;" rows="5" cols="40" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.alamat_kirim"></textarea> 
          </div>
        </div>
      </div>
      <p style="margin-bottom: -25px;">Sesuai dengan Pesanan Tuan tersebut di atas, maka harap diterima dengan baik barang-barang sbb.</p>
      <hr>

      <!-- ========================= MATERIAL ===============================  -->
      <div class="" >
        <table class="table table-bordered">
          <thead>
            <slot name="columns">
              <tr style="background-color: #F0F8FF;">
                <th>NO</th>
                <th>NO. COIL/PAKET DIMENSI</th>
                <th>SPESIFIKASI</th>
                <th>JUMLAH</th>
                <th>TONASE (Kg)</th>
                <th>KETERANGAN</th>
              </tr>
            </slot>
          </thead>
          <tbody>

            <tr>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white;" rows="10" cols="2"></textarea> 
              </td>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white;" rows="10" cols="45"></textarea> 
              </td>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white;" rows="10" cols="20"></textarea> 
              </td>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white;" rows="10" cols="10"></textarea>  
              </td>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white;" rows="10" cols="10"></textarea>   
              </td>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white;" rows="11" cols="20"></textarea>  
              </td>
            </tr>

            <tr>
              <td style="font-weight: bold" colspan="2">Total</td>
              <td style="font-weight: bold">{{ convertRp(detailDeliveryData.qty) }}</td>
              <td style="font-weight: bold">{{ convertRp(detailDeliveryData.weight) }}</td>
              <td colspan="2"></td>
              <td style="display: none;"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ========================= FOOTER ===============================  -->
      <div class="card mb-2">
        <p style="margin-left: 5px; margin-bottom: -1px; margin-top: 2px; font-size: 14px;">TRANSPORTER <span style="margin-left: 8px;">:</span> 
          <input type="" name="" style="border: 1px solid white;" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.transporter">
        </p>
        <p style="margin-left: 5px; margin-bottom: -1px; font-size: 14px;">NO KENDARAAN : 
          <input type="" name="" style="border: 1px solid white;" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.no_kendaraan">
        </p>
        <p style="margin-left: 5px; font-size: 14px;">DRIVER <span style="margin-left: 60px;">:</span> 
          <input type="" name="" style="border: 1px solid white;" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.driver">
        </p>

        <div class="row">
          <div class="col-3">
            <p style="margin-left: 5px; margin-bottom: 120px; font-size: 13px;">Barang-barang tersebut di atas <br> telat di terima dengan benar oleh :</p>
            <p style="margin-left: 5px; font-size: 13px; font-size: 13px; margin-bottom: -20px;">
              NAMA : <input type="" name="" style="border: 1px solid white;"><hr>
            </p>
          </div>
          <div class="col-2 text-center">
            <p style="margin-left: 5px; margin-bottom: 120px; margin-top: 23px; font-size: 13px;">GUDANG</p>
            <p style="margin-left: -10px; font-size: 13px; font-size: 13px; margin-bottom: -25px;">
              <input type="" name="" style="border: 1px solid white; text-align: center;" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.gudang"><hr>
            </p>
          </div>
          <div class="col-2 text-center">
            <p style="margin-left: 5px; margin-bottom: 120px; margin-top: 23px; font-size: 13px;">DRIVER</p>
            <p style="margin-left: 5px; font-size: 13px; font-size: 13px; margin-bottom: -20px;">
              {{ dataSJ.driver }}<hr>
            </p>
          </div>
          <div class="col-2 text-center">
            <p style="margin-left: 5px; margin-bottom: 120px; margin-top: 23px; font-size: 13px;">SECURITY</p>
            <p style="margin-left: -10px; font-size: 13px; font-size: 13px; margin-bottom: -25px;">
              <input type="" name="" style="border: 1px solid white; text-align: center;" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.security"><hr>
            </p>
          </div>
          <div class="col-3 text-center">
            <p style="margin-left: 5px; margin-bottom: 120px; margin-top: 23px; font-size: 13px;">PT. BUANA CENTRA KARYA</p>
            <p style="margin-left: -10px; font-size: 13px; font-size: 13px; margin-bottom: -25px;">
              <input type="" name="" style="border: 1px solid white; text-align: center;" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.delegated_pt"><hr>
            </p>
          </div>
        </div>
        <p style="margin-left: 5px; font-size: 13px; margin-top: 15px;" class="text-center">Barang-barang yang telah di terima dengan benar oleh pihak pembeli tidak dapat dikembalikan kecuali bila ada pembicaraan lebih dahulu.</p>
      </div>

    </card>
  </div>
</template>
<script>
  import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import delivery from '@/services/delivery.service';
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
        detailDeliveryData: {},
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

        dataSJ : {
          alamat_kirim: ' SPK./PO : ALAMAT KIRIM :  ',
          transporter: '',
          no_kendaraan: '',
          driver: '',
          gudang: '',
          security: '',
          delegated_pt: '',
        }
      }
    },
    mounted(){
      this.get();
      this.getDataSJ();
      // this.getMatMas();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
      get() {
        let context = this;               
        Api(context, delivery.showDelivery(context.$route.params.packing_list_no)).onSuccess(function(response) {
            context.detailDeliveryData = response.data.data;
        }).onFinish(function() {  
             
        })
        .call()        
      },
      getDataSJ() {
        let context = this;               
        Api(context, delivery.getDataSJ(context.$route.params.packing_list_no)).onSuccess(function(response) {
            context.dataSJ = response.data.data;                   
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
      saveMaterial(id, coil_no, type){
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
          formData.append('coil_no', coil_no);
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
      updateSJ(packing_list_no){
        let api     = null;
        let context = this;

        api = Api(context, delivery.updateSJ(packing_list_no, {
            alamat_kirim : context.dataSJ.alamat_kirim,
            transporter : context.dataSJ.transporter,
            no_kendaraan : context.dataSJ.no_kendaraan,
            driver : context.dataSJ.driver,
            gudang : context.dataSJ.gudang,
            security : context.dataSJ.security,
            delegated_pt : context.dataSJ.delegated_pt,
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
