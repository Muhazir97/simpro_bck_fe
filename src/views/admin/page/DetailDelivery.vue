<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= INFORMATION ===============================  -->
      <div class="table-responsive mb-2">
        <div class="text-center display-4">
          <span style="margin-bottom: -20px; font-weight: bold;">DETAIL DELIVERY</span>

          <a :href="apiUrl+'print-delivery/'+detailDeliveryData.packing_list_no+'?page='+pagination.page" target="_BLANK">
            <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
              <i class="fa fa-file-text"></i> Print
            </button>
          </a>
          <a :href="apiUrl+'report-word/delivery/'+detailDeliveryData.packing_list_no+'?page='+pagination.page" target="_BLANK">
            <button type="submit" class="btn btn-sm btn-primary btn-fill float-right">
              <i class="fa fa-file-text"></i> Word
            </button>
          </a>
          <hr style="margin-top: 50px;">
        </div>
        <table class="table table-sm table-bordered">
            <tbody>
                
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">PO NO</td>
                    <td width="300">  {{ detailDeliveryData.po_no }} </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">SURAT JALAN NO</td>
                    <td> {{ detailDeliveryData.packing_list_no }} </td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">JOB NO</td>
                    <td width="300">  {{ detailDeliveryData.job_no }} </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">TANGGAL</td>
                    <td> {{ detailDeliveryData.packing_date }} </td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150" v-if="detailDeliveryData.prod_class !== 'Shearing'">LP No</td>
                    <!-- JIKA SLITTING -->
                    <!-- <td colspan="3" v-if="detailDeliveryData.prod_class == 'Slitting'"> {{ lp_no }} </td> -->
                    <td colspan="3" v-if="detailDeliveryData.prod_class == 'Slitting'"> 
                      <autocomplete
                        ref="autocompleteLP"
                        :url="apiUrl+'slit-coil/find-program'"
                        :customHeaders="{ Authorization: tokenApi }"
                        anchor="process_program"
                        label="coil_no"
                        :on-select="getDataSLT"
                        placeholder="Choose Program No"
                        :min="2"
                        :process="processJSON"
                        :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                        >
                      </autocomplete>  
                    </td>
                    <!-- JIKA TOLLING -->
                    <td colspan="3" v-if="detailDeliveryData.prod_class == 'Tolling'"> 
                      <autocomplete
                        ref="autocomplete"
                        :url="apiUrl+'produksi-tolling/find-op-no'"
                        :customHeaders="{ Authorization: tokenApi }"
                        anchor="op_no"
                        label="specification"
                        :on-select="getData"
                        placeholder="Choose OP"
                        :min="2"
                        :process="processJSON"
                        :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                        >
                      </autocomplete>  
                    </td>
                    <td style="display: none;"></td>
                </tr>
            </tbody>
        </table>
      </div> 

      <!-- ========================= ADDRES ===============================  -->
      <div width="10" v-if="detailDeliveryData.prod_class == 'Slitting'">
        <div class="form-group" width="10">
          <select class="form-select form-control" aria-label="Default select example" v-model="dataSJ.type_pengiriman" @change="updateSJ(detailDeliveryData.packing_list_no)">
            <option value="INTERNAL">INTERNAL</option>
            <option value="EXTERNAL">EXTERNAL</option>
          </select>
        </div>
      </div>
      <div>
        CUSTOMER :
        <div class="row">
          <div class="col-6">
            <div class="card">
              <textarea style="border: 1px solid white; font-size: 15px; resize: none;" rows="5" cols="40" disabled> Kpd YTH : &#10; {{ detailDeliveryData.client_name }} &#10; {{ detailDeliveryData.client_addres }}</textarea>
            </div>
          </div>
          <div class="col-6" v-if="dataSJ.type_pengiriman == 'INTERNAL'">
            <div class="card" style="height:120px;">
               Alamat Kirim :<br>  LOCO PT. Buana Centra Karya <br>Jl. Raya Merak KM.115 Cilegon 
            </div>
          </div>
          <div class="col-6" v-if="dataSJ.type_pengiriman == 'EXTERNAL'">
            <div class="card">
              <textarea style="border: 1px solid white; font-size: 15px; resize: none;" rows="5" cols="40" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.alamat_kirim"></textarea> 
            </div>
          </div>
          <div class="col-6" v-if="detailDeliveryData.prod_class == 'Tolling' || detailDeliveryData.prod_class == 'Shearing'">
            <div class="card">
              <textarea style="border: 1px solid white; font-size: 15px; resize: none;" rows="5" cols="40" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.alamat_kirim"></textarea> 
            </div>
          </div>
        </div>
        <p style="margin-bottom: -25px;">Sesuai dengan Pesanan tersebut di atas, maka harap diterima dengan baik barang-barang sbb.</p>
        <button type="submit" class="btn btn-sm btn-dark btn-fill float-right" @click="addMaterial()" v-if="detailDeliveryData.prod_class == 'Slitting'">
          Add Material
        </button>
        <hr style="margin-top:40px;">
      </div>

      <!-- ========================= MATERIAL ===============================  -->
      <!-- TABLE FOR SLITTING -->
      <div class="table-responsive mb-4" v-if="detailDeliveryData.prod_class == 'Slitting'">
        <table border='1'>
          <thead>
            <tr style="background-color: #F0F8FF;">
              <th style="font-size: 13px; text-align: center;">NO</th>
              <th colspan="2" style="font-size: 13px; text-align: center;">COIL NO</th>
              <th style="font-size: 13px; text-align: center;">DIMENSI</th>
              <th style="font-size: 13px; text-align: center;">JUMLAH</th>
              <th style="font-size: 13px; text-align: center;">BERAT</th>
              <th style="font-size: 13px; text-align: center;">SPECIFICATION</th>
              <th style="font-size: 13px; text-align: center;">PROGRAM NO</th>
              <th style="font-size: 13px; text-align: center;" v-if="detailDeliveryData.packing_list_no.includes('EXT')">SJ INT</th>
              <th style="font-size: 13px; text-align: center;" v-if="detailDeliveryData.packing_list_no.includes('SPO')">JOB NO</th>
              <th style="font-size: 13px; text-align: center;"></th>
              <th style="display: none" ></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in tableMatTbl.data" :key="i">
              <td style="font-size: 13px; text-align: center;">{{i + 1}}</td>
              <td style="font-size: 13px; text-align: center;">{{row.coil_no}}</td>
              <td style="font-size: 13px; text-align: center;">{{row.pack}}</td>
              <td style="font-size: 13px; text-align: center;">{{row.thick}} x {{row.width}} x S</td>
              <td style="font-size: 13px; text-align: center;">1</td>
              <td style="font-size: 13px; text-align: center;">{{convertRp(row.weight)}}</td>
              <td style="font-size: 13px; text-align: center;">{{row.dimension_spec}}</td>
              <td style="font-size: 13px; text-align: center;">{{row.process_program}}</td>
              <td style="font-size: 13px; text-align: center;" v-if="detailDeliveryData.packing_list_no.includes('EXT')">{{row.from_sj_int}}</td>
              <td style="font-size: 13px; text-align: center;" v-if="detailDeliveryData.packing_list_no.includes('SPO')">{{row.job_no}}</td>
              <td style="text-align:center;">
                <i class="fa fa-times-circle" aria-hidden="true" title="Delete" style="cursor: pointer;" @click="saveMaterial('delete', row.id)"></i>
              </td>
              <td style="display: none" ></td>
            </tr>
            <tr>
              <td colspan="4" style="font-size: 13px; text-align: center; font-weight: bold; ">TOTAL</td>
              <td style="font-size: 13px; font-weight: bold; text-align: center;" >{{convertRp(totalQty)}}</td>
              <td style="font-size: 13px; font-weight: bold; text-align: center;" >{{convertRp(totalWeight)}}</td>
              <td style="display: none" ></td>
            </tr>
          </tbody>
        </table>
        <div class="mt-2">
          <base-pagination :page-count="pagination.page_count" v-model="pagination.default" @input="changePage"></base-pagination>
        </div>
      </div>

      <!-- TABLE FOR PIPA -->
      <div class="mb-4" v-if="detailDeliveryData.prod_class == 'Tolling'" >
        <table border='1'>
          <thead>
            <tr style="background-color: #F0F8FF;">
              <th style="font-size: 13px; text-align: center;">NO</th>
              <th style="font-size: 13px; text-align: center;">DESKRIPSI</th>
              <th style="font-size: 13px; text-align: center;">SPESIFIKASI</th>
              <th style="font-size: 13px; text-align: center;">JUMLAH</th>
              <th style="font-size: 13px; text-align: center;">TONASE (Kg)</th>
              <th style="font-size: 13px; text-align: center;" width="20%">COIL NO</th>
              <th style="font-size: 13px; text-align: center;">OP NO</th>
              <th style="font-size: 13px; text-align: center;"></th>
              <th style="display: none" ></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in tableMatTbl.data" :key="i">
              <td style="font-size: 13px; text-align: center;">{{i + 1}}</td>
              <td style="font-size: 13px; text-align: center;">
                {{row.type_pipa }} {{ row.nd }} x {{ row.material_tebal }} x <input style="border: 1px solid white; text-align: center;" @change="countQty(row.id, row.qty, row.material_tebal, row.od, row.panjang, 'auto')" v-model="row.panjang" size="2" >
              </td>
              <td style="font-size: 13px; text-align: center;">{{ row.spesifikasi }}</td>
              <td style="font-size: 13px; text-align: center;">
                <input style="border: 1px solid white; text-align: center;" @change="countQty(row.id, row.qty, row.material_tebal, row.od, row.panjang, 'auto')" v-model="row.qty" size="5" >
              </td>
              <td style="font-size: 13px; text-align: center;">
                <input style="border: 1px solid white; text-align: center;" @change="countQty(row.id, row.qty, row.material_tebal, row.od, row.panjang, row.tonase)" v-model="row.tonase" size="5" >
              </td>
              <td style="font-size: 13px;">{{row.coil_no}}</td>

              <td style="font-size: 13px; text-align: center;">{{row.op_no}}</td>
              <td style="text-align:center;">
                <i class="fa fa-times-circle" aria-hidden="true" title="Delete" style="cursor: pointer;" @click="deleteMatToll(row.id)"></i>
              </td>
              <td style="display: none" ></td>
            </tr>
            <tr>
              <td colspan="3" style="font-size: 13px; text-align: center; font-weight: bold; ">TOTAL</td>
              <td style="font-size: 13px; font-weight: bold; text-align: center;" >{{convertRp(totalQty)}}</td>
              <td style="font-size: 13px; font-weight: bold; text-align: center;" >{{totalWeight}}</td>
              <td style="display: none" ></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- TABLE FOR SHEARING -->
      <div class="table-responsive mb-4" v-if="detailDeliveryData.prod_class == 'Shearing'">
        <table border='1'>
          <thead>
            <tr style="background-color: #F0F8FF;">
              <th style="font-size: 13px; text-align: center;">NO</th>
              <th style="font-size: 13px; text-align: center;">COIL NO</th>
              <th style="font-size: 13px; text-align: center;">DIMENSI</th>
              <th style="font-size: 13px; text-align: center;">JUMLAH</th>
              <th style="font-size: 13px; text-align: center;">BERAT</th>
              <th style="font-size: 13px; text-align: center;">KETERANGAN</th>
              <th style="display: none" ></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-size: 13px; text-align: center;">
                <textarea style="border: 1px solid white; padding-right: -30; resize: none; width: 100%; text-align:center;" rows="20" cols="2" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.no_seq"></textarea>
              </td>
              <td style="font-size: 13px; text-align: center;">
                <textarea style="border: 1px solid white; resize: none; width: 100%; text-align:center;" rows="20" cols="13" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.coil_no_all"></textarea>
              </td>
              <td style="font-size: 13px; text-align: center;">
                <textarea style="border: 1px solid white; resize: none; width: 100%;" rows="20" cols="22" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.spesifikasi"></textarea>
              </td>
              <td style="font-size: 13px; text-align: center;">
                <textarea style="border: 1px solid white; resize: none; width: 100%; text-align:center;" rows="20" cols="5" @change="updateSJ(detailDeliveryData.packing_list_no), countQtyShr()" v-model="dataSJ.jumlah"></textarea>
              </td>
              <td style="font-size: 13px; text-align: center;">
                <textarea style="border: 1px solid white; resize: none; width: 100%; text-align:center;" rows="20" cols="5" @change="updateSJ(detailDeliveryData.packing_list_no), countWeight()" v-model="dataSJ.tonase"></textarea>
              </td>
              <td style="font-size: 13px; text-align: center;">
                <textarea style="border: 1px solid white; resize: none; width: 100%;" rows="20" cols="15" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.deskripsi"></textarea>
              </td>
              <td style="display: none" ></td>
            </tr>
            <tr>
              <td colspan="3" style="font-size: 13px; text-align: center; font-weight: bold; ">TOTAL</td>
              <td style="font-size: 13px; font-weight: bold; text-align: center;" >{{convertRp(totalQty)}}</td>
              <td style="font-size: 13px; font-weight: bold; text-align: center;" >{{totalWeight}}</td>
              <td style="display: none" ></td>
            </tr>
          </tbody>
        </table>
        <div class="mt-2">
          <base-pagination :page-count="pagination.page_count" v-model="pagination.default" @input="changePage"></base-pagination>
        </div>
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
          <div class="col-3 text-center">
            <p style="margin-left: 5px; margin-bottom: 120px; margin-top: 23px; font-size: 13px;">DI TERIMA OLEH</p>
            <p style="margin-left: 5px; font-size: 13px; font-size: 13px; margin-bottom: -20px;">
              <!-- NAMA : <input type="" name="" style="border: 1px solid white;"><hr> -->
            </p>
          </div>
          <!-- <div class="col-2 text-center">
            <p style="margin-left: 5px; margin-bottom: 120px; margin-top: 23px; font-size: 13px;">GUDANG</p>
            <p style="margin-left: -10px; font-size: 13px; font-size: 13px; margin-bottom: -25px;">
              <input type="" name="" style="border: 1px solid white; text-align: center;" @change="updateSJ(detailDeliveryData.packing_list_no)" v-model="dataSJ.gudang"><hr>
            </p>
          </div> -->
          <div class="col-3 text-center">
            <p style="margin-left: 5px; margin-bottom: 120px; margin-top: 23px; font-size: 13px;">DRIVER</p>
            <p style="margin-left: 5px; font-size: 13px; font-size: 13px; margin-bottom: -20px;">
              {{ dataSJ.driver }}<hr>
            </p>
          </div>
          <div class="col-3 text-center">
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

      <!-- MODAL CREATE MATERIAL-->
      <div>
         <modal :show.sync="form.show">
           <template slot="header">
              <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
           </template>
           <div>

            TOTAL QTY : {{tableMatMdl.data.length}}<br>
            TOTAL WEIGHT : {{convertRp(totalWeightMdl)}}
            <i class="fa fa-check-circle text-primary fa-lg ml-2" style="cursor: pointer;" aria-hidden="true" title="Add Material All" @click="saveMaterial('all')"></i>
            <base-input 
                  v-if="detailDeliveryData.packing_list_no.includes('SPO')"
                  type="text"
                  label="Search Thick"
                  placeholder="Search Thick"
                  v-model="search.thick"
                  @change="getMaterialMdl()">
            </base-input>

            <div class="scroll">
              <table class="table">
                <thead>
                  <slot name="columns">
                    <tr style="background-color: #F0F8FF;">
                      <th></th>
                      <th style="font-size: 13px;">Coil No</th>
                      <th style="font-size: 13px;">Pack</th>
                      <th style="font-size: 13px;">Thick</th>
                      <th style="font-size: 13px;">Width</th>
                      <th style="font-size: 13px;">Weight</th>
                      <th style="font-size: 13px; width:">SJ NO</th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in tableMatMdl.data" :key="i">
                    <td>
                      <i class="fa fa-plus-square text-primary" aria-hidden="true" title="Add Material" style="cursor: pointer;" @click="saveMaterial('add', row.id)"></i>
                    </td>
                    <td style="font-size: 13px;">{{row.coil_no}}</td>
                    <td style="font-size: 13px;">{{row.pack}}</td>
                    <td style="font-size: 13px;">{{row.thick}}</td>
                    <td style="font-size: 13px;">{{row.width}}</td>
                    <td style="font-size: 13px;">{{row.weight}}</td>
                    <td style="font-size: 13px;"><span style="white-space: nowrap;">{{row.travel_latter_no}}</span></td>
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
        pagination: {
          page_count: '',
          default: 1,
          page: 1,
        },
        form: {
            add: true,
            title: "Add Material",
            show: false
        },
        detailDeliveryData: {},
        tableMatTbl: {
          data: []
        },
        tableMatMdl: {
          data: []
        },
        totalQty: '',
        totalWeight: '',
        totalWeightMdl: '',
        update_job_note: '',
        apiUrl :config.apiUrl,
        storageUrl : config.storageUrl,
        tokenApi : '',
        material_code: '',
        lp_no: '',

        dataSJ : {
          alamat_kirim: '',
          transporter: '',
          no_kendaraan: '',
          driver: '',
          gudang: '',
          security: '',
          delegated_pt: '',
          lpp_no: '',

          no_seq: '',
          deskripsi: '',
          spesifikasi: '',
          jumlah: '',
          tonase: '',
          coil_no_all: '',
          type_pengiriman: '',
        },
        getDes : '',
        process_program: '',
        search: {
          thick: '',
        },
      }
    },
    mounted(){
      this.get();
      this.getDataSJ();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
      get() {
        let context = this;               
        Api(context, delivery.showDelivery(context.$route.params.packing_list_no)).onSuccess(function(response) {
            context.detailDeliveryData = response.data.data;
        }).onFinish(function() {  
             context.getMaterialTbl();
        })
        .call()        
      },
      getDataSJ() {
        let context = this;               
        Api(context, delivery.getDataSJ(context.$route.params.packing_list_no)).onSuccess(function(response) {
            context.dataSJ = response.data.data.data;
            context.getDes = response.data.data.getDes;
            context.$refs.autocompleteLP.setValue(response.data.data.data.lpp_no)    
        })
        .onError(function(error) {                    
            context.dataSJ = []
        })
        .call()        
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
            lpp_no : context.dataSJ.lpp_no,

            // for sj shearing
            no_seq : context.dataSJ.no_seq,
            coil_no_all : context.dataSJ.coil_no_all,
            spesifikasi : context.dataSJ.spesifikasi,
            deskripsi : context.dataSJ.deskripsi,
            jumlah : context.dataSJ.jumlah,
            tonase : context.dataSJ.tonase,
            type_pengiriman : context.dataSJ.type_pengiriman,

            total_qty : context.detailDeliveryData.qty,
            total_weight : context.detailDeliveryData.weight,
          }));
        api.onSuccess(function(response) {
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).onError(function(error) { 
            context.notifyVue('Update Failed', 'top', 'right', 'danger')
        }).onFinish(function() {
            context.get()
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
      // ============================== KONSEP LAMA FOR TOLLING =================================
      countQty(id, qty, tebalMaterial, od, prod_panjang, type){
        let api     = null;
        let context = this;

        api = Api(context, delivery.updateQtyTol({
            id_del_tl : id,
            qty : qty,
            panjang : prod_panjang,
            tonase : (type == 'auto') ? Number(qty * (0.02466 * tebalMaterial * (od - tebalMaterial) * ( prod_panjang / 1000) * 1)).toFixed(2) : type,
            packing_list_no: this.detailDeliveryData.packing_list_no
        }));
        api.onSuccess(function(response) {
            context.notifyVue('Updated Successfully', 'top', 'right', 'info')
        }).onError(function(error) { 
            context.notifyVue('Update Failed', 'top', 'right', 'danger')
        }).onFinish(function() {
          context.getMaterialTbl();  
        })
        .call();
      },

      // === for shearing ===
      countQtyShr(){
        let diBuatArray   = this.dataSJ.jumlah.split(/(\s+)/)
        let removeNewLine = diBuatArray.filter(x => !/^\s*$/.test(x));
        let convertNumber = removeNewLine.map(i=>Number(i));
        let totalQty = 0;

        for (let i = 0; i < convertNumber.length; i++) {
            totalQty   += convertNumber[i];
        }
        
        this.detailDeliveryData.qty = totalQty
        this.updateSJ(this.detailDeliveryData.packing_list_no)
      },
      countWeight(){
        this.$forceUpdate();
        let diBuatArray   = this.dataSJ.tonase.split(/(\s+)/)
        let removeNewLine = diBuatArray.filter(x => !/^\s*$/.test(x));
        let convertNumber = removeNewLine.map(i=>Number(i));
        let totalWeight = 0;

        for (let i = 0; i < convertNumber.length; i++) {
            totalWeight += convertNumber[i];
        }
        
        this.detailDeliveryData.weight = totalWeight.toFixed(2)
        this.updateSJ(this.detailDeliveryData.packing_list_no)
        this.getMaterialTbl()
      },
      // ==========================

      addMaterialToll(op_no, packing_list_no){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        formData.append('op_no', op_no);
        formData.append('packing_list_no', packing_list_no);

        api = Api(context, delivery.addMaterialToll(formData));
        api.onSuccess(function(response) {
            context.notifyVue((context.formTitle === 'Add Material') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.formTitle === 'Add Material') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {  
            context.getMaterialTbl()
        })
        .call();
      },
      deleteMatToll(id) {
        let api = null;
        let context = this;

        Api(context, delivery.deleteMatToll(id)).onSuccess(function(response) {
            context.getMaterialTbl();
            context.notifyVue('Data Berhasil di Hapus', 'top', 'right', 'info')
        }).call();
      },
      // ========================== END ===============================


      // ========================== KONSEP BARU FOR SLITTING ===============================
      getMaterialMdl() {
        let context = this;               
        Api(context, delivery.getMaterialMdl({process_program: context.process_program, type_pengiriman: context.dataSJ.type_pengiriman, surat_jalan_no: context.detailDeliveryData.packing_list_no, job_no: context.detailDeliveryData.job_no, thick: context.search.thick,})).onSuccess(function(response) {
            context.tableMatMdl.data = response.data.data.data;
            context.totalWeightMdl   = response.data.data.totalWeight;
            console.log(response.data.data)                   
        })
        .onError(function(error) {                    
            context.tableMatMdl.data = []
        })
        .call()        
      },
      getMaterialTbl() {
        let context = this;     

        context.$forceUpdate();          
        Api(context, delivery.getMaterialTbl({job_no: context.detailDeliveryData.job_no, surat_jalan_no: context.detailDeliveryData.packing_list_no, page: context.pagination.page})).onSuccess(function(response) {
            context.tableMatTbl.data      = response.data.data.data.data;                   
            context.totalQty              = response.data.data.totalQty;                   
            context.totalWeight           = response.data.data.totalWeight;                   
            context.lp_no                 = response.data.data.lp_no;    
            context.pagination.page_count = response.data.data.data.last_page     
        })
        .onError(function(error) {                    
            context.tableMatTbl.data = []
        })
        .call()        
      },
      addMaterial() {
        this.form.add   = true;
        this.form.show  = true;
        this.form.title = "Add Material";
        this.getMaterialMdl()
      },
      saveMaterial(type, id){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        if (this.detailDeliveryData.packing_list_no != undefined) {
          // if (type == 'add') {
            formData.append('packing_list_no', this.detailDeliveryData.packing_list_no);
            formData.append('packing_date', this.detailDeliveryData.packing_date);
          // }else if (type == 'delete') {
          //    formData.append('packing_list_no', '');
          //     formData.append('packing_date', '');
          // }
          formData.append('type', type);
          formData.append('process_program', context.process_program);
          formData.append('id', id);
          formData.append('job_no', this.detailDeliveryData.job_no);
          formData.append('po_no', this.detailDeliveryData.po_no);
        }else{
          alert('Semua Field Wajib Di Isi')
        }

        api = Api(context, delivery.addMaterial(formData));
        api.onSuccess(function(response) {
            context.notifyVue((context.formTitle === 'Add Material') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.formTitle === 'Add Material') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {  
            context.getMaterialMdl();
            context.getMaterialTbl();
        })
        .call();
      },
      // ========================== END ===============================

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
      // ================= Autocomplete ============
      // AMBIL DATA YANG DI PILIH AC
      getDataSLT(obj){
        this.process_program = obj.process_program;
        this.updateSJ(this.detailDeliveryData.packing_list_no)
        this.getMaterialMdl()
      },
      // AMBIL DATA YANG DI PILIH AC
      getData(obj){
        this.dataSJ.lpp_no = (this.detailDeliveryData.prod_class == 'Slitting') ? obj.process_program : obj.op_no;
        this.updateSJ(this.detailDeliveryData.packing_list_no)
        this.addMaterialToll(obj.op_no, this.detailDeliveryData.packing_list_no)
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
