<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= INFORMATION ===============================  -->
      <div class="table-responsive mb-2">
        <div class="text-center display-4">
          <span style="margin-bottom: -20px; font-weight: bold;">DETAIL PROD TOLLING</span>
          <a :href="apiUrl+'print-prod-tolling/'+detailProdTollingData.op_no" target="_BLANK">
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
                    <td width="300">  {{ detailProdTollingData.job_no }} </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">PO NO</td>
                    <td> {{ detailProdTollingData.po_no }} </td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">OP NO</td>
                    <td> {{ detailProdTollingData.op_no }} </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">CLIENT</td>
                    <td> {{ detailProdTollingData.client_name }} </td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">LINE MACHINE</td>
                    <td> {{ detailProdTollingData.line_machine }} </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">CREATED AT</td>
                    <td> {{ detailProdTollingData.created_at }} </td>
                </tr>
                <tr>
                  <td style="background-color: #F0F8FF; font-weight: bold;" width="150">SPECIFICATION</td>
                  <td colspan="3">{{ detailProdTollingData.specification }}</td>
                  <td style="display: none"></td>
                </tr>
            </tbody>
        </table>
      </div> 

      <!-- ========================= MATERIAL ===============================  -->
      <span style="font-weight:bold;">MATERIAL</span>
      <div class="" >
        <table class="table table-bordered">
          <thead class="text-center">
              <tr style="background-color: #F0F8FF;">
                <th style="text-align: center;">SPESIFIKASI</th>
                <th style="text-align: center;">LEBAR (mm)</th>
                <th style="text-align: center;">TEBAL (mm)</th>
                <th style="text-align: center;">JUMLAH SKELP</th>
                <th style="text-align: center;">BERAT TOTAL (Kg)</th>
                <th style="text-align: center;">KETERANGAN</th>
                <th style="display: none"></th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-size: 13px;">
                <input style="border: 1px solid white; text-align: center; margin-right: -100px;" size="9" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.material_spesifikasi"></input> 
              </td>
              <td style="font-size: 13px;">
                <input style="border: 1px solid white; text-align: center; margin-right: -100px;" size="9" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.material_lebar"></input> 
              </td>
              <td style="font-size: 13px;">
                <input style="border: 1px solid white; text-align: center; margin-right: -100px;" size="9" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.material_tebal"></input> 
              </td>
              <td style="font-size: 13px;">
                <input style="border: 1px solid white; text-align: center; margin-right: -100px;" size="9" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.material_jumlah_skelp"></input>  
              </td>
              <td style="font-size: 13px; text-align: center;">
                ± {{ convertRp(dataOP.material_berat_total) }}   
              </td>
              <td style="font-size: 13px;">
                <input style="border: 1px solid white; text-align: center; margin-right: -100px;" size="9" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.material_keterangan"></input>  
              </td>
              <td style="display: none"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ========================= PRODUKSI ===============================  -->
      <span style="font-weight:bold;">PRODUKSI</span>
      <div class="" >
        <table class="table table-bordered text-center">
          <thead class="text-center">
              <tr style="background-color: #F0F8FF;">
                <th>ND (inchi)</th>
                <th colspan="2" class="text-center">O Dia (mm)</th>
                <th colspan="2">TEBAL (mm)</th>
                <th colspan="2">PANJANG (mm)</th>
                <th>JUMLAH (btg)</th>
                <th>BERAT TOTAL (Kg)</th>
                <th>KETERANGAN</th>
                <th style="display: none"></th>
              </tr>
          </thead>
          <tbody>
            <tr>
                <td rowspan="2" style="font-size: 13px;">
                  <div class="form-group">
                    <select class="form-select form-control" aria-label="Default select example" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_nd">
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
                </td>
                <td rowspan="2" style="font-size: 13px;">
                  <div class="form-group">
                    <select class="form-select form-control" aria-label="Default select example" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_odia">
                      <option selected>Select</option>
                      <option value='76.30'>76.30</option>
                      <option value='75.50'>75.50</option>
                      <option value='74.20'>74.20</option>
                    </select>
                  </div>
                </td>
                <td style="font-size: 13px;">+ 77.10</td>
                <td rowspan="2" style="font-size: 13px;">
                  <div class="form-group">
                    <select class="form-select form-control" aria-label="Default select example" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_tebal">
                      <option selected>Select</option>
                      <option value='2.80'>2.80</option>
                      <option value='6.20'>6.20</option>
                      <option value='2.40'>2.40</option>
                    </select>
                  </div>
                </td>
                <td style="font-size: 13px;">+ 3,40</td>
                <td style="font-size: 13px;" rowspan="3">
                  <textarea style="border: 1px solid white; resize: none;" cols="10" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_panjang"></textarea>  
                </td>
                <td style="font-size: 13px;">- 0</td>
                <td style="font-size: 13px;" rowspan="3">
                  <textarea style="border: 1px solid white; resize: none;" cols="10" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_panjang"></textarea>  
                </td>
                <td style="font-size: 13px;" rowspan="3">
                  <textarea style="border: 1px solid white; resize: none;" cols="10" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_jumlah"></textarea>   
                </td>
                <td style="font-size: 13px;" rowspan="3">
                  <textarea style="border: 1px solid white; resize: none;" rows="5" cols="20" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_keterangan"></textarea>
                </td>
                <td style="display: none"></td>
            </tr>
            <tr>
                <td style="font-size: 13px;">- 75,5</td>
                <td style="font-size: 13px;">- 2,30</td>
                <td style="font-size: 13px;">+ 10</td>
                <td style="display: none"></td>
            </tr>
            
            <!-- <tr>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white; resize: none;" rows="5" cols="10" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_nd"></textarea> 
              </td>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white; resize: none;" rows="5" cols="15" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_odia"></textarea>
              </td>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white; resize: none;" rows="5" cols="10" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_tebal"></textarea> 
              </td>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white; resize: none;" rows="5" cols="10" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_panjang"></textarea>  
              </td>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white; resize: none;" rows="5" cols="10" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_jumlah"></textarea>   
              </td>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white; resize: none;" rows="5" cols="10" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_berat_total"></textarea>  
              </td>
              <td style="font-size: 13px;">
                <textarea style="border: 1px solid white; resize: none;" rows="5" cols="20" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.produksi_keterangan"></textarea>
              </td>
              <td style="display: none"></td>
            </tr> -->
          </tbody>
        </table>
      </div>

      <!-- ========================= PROCESS LAINNYA ===============================  -->
      <div class="card mb-2">
        <div class="row">
          <div class="col-4">
            <p style="margin-left: 5px; margin-bottom: 0px; margin-top: 10px; font-size: 14px;">
             PROCESS LAINNYA : <br>
             ~ PLAIN END <span style="margin-left: 75px;">: <input type="checkbox" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.check_plainend"></span> <br>
             ~ BEVEL END <span style="margin-left: 71px;">: <input type="checkbox" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.check_bevelend"></span> <br>
             ~ THREAD END <span style="margin-left: 58px;">: <input type="checkbox" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.check_threadend"></span> <br>
             ~ EDDY CURRENT <span style="margin-left: 38px;">: <input type="checkbox" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.check_eddycurrent"></span> <br>
             ~ HYDROTEST <span style="margin-left: 63px;">: <input type="checkbox" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.check_hydrotest"></span> <br>
            </p>
            <p style="margin-left: 50px; margin-bottom: 10px; margin-top: 6px; font-size: 14px;"> TEKANAN : <input style="border: 1px solid white;"  @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.tekanan">
            </p>
            <p style="margin-left: 5px; margin-bottom: 10px; margin-top: 2px; font-size: 14px;">
             ~ COATING VARNISH <span style="margin-left: 20px;">: <input type="checkbox" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.check_coatingvarnish"> </span> <br>
             ~ ZINC COATAING <span style="margin-left: 40px;">: <input type="checkbox" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.check_zinccoating"></span><br>
             ~ MARKING <span style="margin-left: 83px;">: <input type="checkbox" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.check_marking"></span> <br>
             ~ KODE WARNA <span style="margin-left: 55px;">: <input type="checkbox" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.check_kodewarna"></span> <br>
            </p>
          </div>

          <div class="col-3">
            <textarea style="border: 1px solid white; resize: none; font-size: 15px; margin-top: 30px;" rows="5" cols="15" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.sudut"></textarea>
          </div>

          <div class="col-5">
            <span style="margin-top:200px;">
              <div class="card">
                <textarea style="border: 1px solid white; resize: none; font-size: 15px;" rows="5" cols="40" @change="updatePT(detailProdTollingData.op_no)" v-model="dataOP.catatan"></textarea> 
              </div>
            </span>
          </div>
        </div>
      </div>
    </card>

<!-- ============================================= DATA BAHAN BAKU UNTUK PRODUKSI PIPA ================================================================ -->
    <card>
      <!-- ========================= INFORMATION ===============================  -->
      <div class="table-responsive mb-2">
        <div class="text-center display-6 mb-4">
          <span style="margin-bottom: 10px; font-weight: bold;"><u>DATA BAHAN BAKU UNTUK PRODUKSI PIPA</u></span>
        </div>
        <button type="submit" class="btn btn-sm btn-dark btn-fill float-right mb-2" @click="addMaterial()">
          Add Material
        </button>
        <table class="table table-sm table-bordered">
            <tbody>
                <!-- <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="200">SOURCE MATERIAL</td>
                    <td colspan="3">
                      <autocomplete
                        ref="autocomplete"
                        :url="apiUrl+'slit-coil/find-program'"
                        :customHeaders="{ Authorization: tokenApi }"
                        anchor="process_program"
                        label="coil_no"
                        :on-select="getData"
                        placeholder="Choose Program Code"
                        :min="2"
                        :process="processJSON"
                        :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                        >
                      </autocomplete>
                    </td>
                    <td style="display: none"></td>
                </tr> -->
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="200">Reff. NO. OP</td>
                    <td colspan="3"> {{ detailProdTollingData.op_no }} </td>
                    <td style="display: none"></td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="200">Date</td>
                    <td colspan="3"> {{ detailProdTollingData.created_at }} </td>
                    <td style="display: none"></td>
                </tr>
                <tr>
                  <td style="background-color: #F0F8FF; font-weight: bold;" width="200">ASAL</td>
                  <td colspan="3">{{ detailProdTollingData.client_name }}</td>
                  <td style="display: none"></td>
                </tr>
            </tbody>
        </table>
      </div> 

      <!-- ========================= MATERIAL ===============================  -->
      <div class="" >
        <table class="table">
          <thead class="text-center">
              <tr style="background-color: #F0F8FF;">
                <th style="text-align: center;">NO</th>
                <th style="text-align: center;">NO URUT COIL</th>
                <th style="text-align: center;">NO COIL</th>
                <th style="text-align: center;">SPEC. & GRADE</th>
                <th style="text-align: center;">THICK (mm)</th>
                <th style="text-align: center;">WIDTH (mm)</th>
                <th style="text-align: center;">WEIGHT (mm)</th>
                <th style="text-align: center;">PROGRAM NO</th>
                <th></th>
                <th style="display: none"></th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in tableDBB.data" :key="i">
              <td style="font-size: 13px; text-align: center;">{{ i + 1 }}</td>
              <td style="font-size: 13px; text-align: center;">{{ row.pack }}</td>
              <td style="font-size: 13px; text-align: center;">{{ row.coil_no }}</td>
              <td style="font-size: 13px; text-align: center;">{{ row.spec }}</td>
              <td style="font-size: 13px; text-align: center;">{{ row.thick}}</td>
              <td style="font-size: 13px; text-align: center;">{{ convertRp(row.width) }}</td>
              <td style="font-size: 13px; text-align: center;">{{ convertRp(row.weight) }}</td>
              <td style="font-size: 13px; text-align: center;">{{ row.process_program }}</td>
              <td style="text-align: center;">
                <i class="fa fa-times-circle fa-lg" aria-hidden="true" title="Delete" style="cursor: pointer;" @click="saveMaterial('delete', row.id)"></i>
              </td>
              <td style="display: none"></td>
            </tr>
            <tr>
              <td colspan="6" style="font-size: 13px; font-weight: bold; text-align: center;" >TOTAL</td>
              <td style="font-size: 13px; font-weight: bold; text-align: center;" >{{ convertRp(dataOP.material_berat_total) }}</td>
              <td></td>
              <td></td>
              <td style="display: none"></td>
            </tr>
            <tr>
              <td colspan="9" style="text-align: center; font-weight: bold;">AVAILABLE</td>
              <td style="display: none"></td>
            </tr>
            <tr v-for="(row, j) in tableDBB.dataAvailable" class="strikethrough">
              <td style="font-size: 13px; text-align: center;">{{ j + 1 }}</td>
              <td style="font-size: 13px; text-align: center;">{{ row.pack }}</td>
              <td style="font-size: 13px; text-align: center;">{{ row.coil_no }}</td>
              <td style="font-size: 13px; text-align: center;">{{ row.spec }}</td>
              <td style="font-size: 13px; text-align: center;">{{ row.thick}}</td>
              <td style="font-size: 13px; text-align: center;">{{ convertRp(row.width) }}</td>
              <td style="font-size: 13px; text-align: center;">{{ convertRp(row.weight) }}</td>
              <td style="font-size: 13px; text-align: center;">{{ row.process_program }}</td>
              <td>
                <i class="fa fa-check-square-o fa-lg text-primary" aria-hidden="true" title="Add Material" style="cursor: pointer;" @click="saveMaterial('add', row.idavilable)"></i>
              </td>
              <td style="display: none"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- MODAL FILTER -->
        <div>
           <modal :show.sync="formFilter.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{formFilter.title}}</h5>
             </template>
             <div>
              <!-- <base-input type="text"
                    label="Job No"
                    placeholder="Job No"
                    v-model="search.job_no">
              </base-input>
              <base-input type="text"
                    label="PO No"
                    placeholder="PO No"
                    v-model="search.po_no">
              </base-input> -->
              <small class="d-block text-uppercase font-weight-bold mb-3">Date Entry</small>
              <div class="input-daterange datepicker row align-items-center">
                  <div class="col">
                      <base-input addon-left-icon="ni ni-calendar-grid-58">
                          <flat-picker slot-scope="{focus, blur}"
                                       @on-open="focus"
                                       @on-close="blur"
                                       :config="{allowInput: true, mode: 'range',}"
                                       class="form-control datepicker"
                                       v-model="search.slitting_date">
                          </flat-picker>
                      </base-input>
                  </div>
              </div>
              <div class="form-group">
                <label>Slit From</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.slit_from">
                  <option selected>Select From</option>
                  <option value="FROM OUTSIDE">FROM OUTSIDE</option>
                  <option value="FROM PRODUCTION">FROM PRODUCTION</option>
                </select>
              </div>
              <base-input type="text"
                    label="Surat Jalan No"
                    placeholder="Surat Jalan No"
                    v-model="search.travel_latter_no">
              </base-input>
              <base-input type="text"
                    label="Coil No"
                    placeholder="Coil No"
                    v-model="search.coil_no">
              </base-input>
              <base-input type="text"
                    label="Program No"
                    placeholder="Program No"
                    v-model="search.process_program">
              </base-input>
              <div class="form-group">
                <label>Owner</label><br>
                <autocomplete 
                  ref="autocomplete"
                  :url="apiUrl+'client/find-client'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="client_name"
                  label="client_code"
                  :on-select="getDataFilter"
                  placeholder="Choose Owner"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <base-input type="text"
                    label="Pack"
                    placeholder="Pack"
                    v-model="search.pack">
              </base-input>
              <base-input type="number"
                    label="Thick"
                    placeholder="Thick"
                    v-model="search.thick">
              </base-input>
              <base-input type="number"
                    label="Width"
                    placeholder="Width"
                    v-model="search.width">
              </base-input>
              <base-input type="number"
                    label="Weight"
                    placeholder="Weight"
                    v-model="search.weight">
              </base-input>
             </div>
             <template slot="footer">
                 <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="formFilter.show = false">Close</button>
                 <button type="primary" class="btn btn-sm btn-info btn-fill" @click="getDataDBB(), formFilter.show = false">Filter</button>
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
  import produksiTolling from '@/services/produksiTolling.service';
  import Api from '@/helpers/api';
  import Autocomplete from 'vue2-autocomplete-js'
  require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";

  export default {
    components: {
      Card,
      Modal,
      Autocomplete,
      flatPicker,
    },
    data () {
      return {
        detailProdTollingData: {},
        tableDBB: {
          data: [],
          dataAvailable: [],

        },
        formFilter: {
            add: true,
            title: "Filter",
            show: false
        },
        apiUrl :config.apiUrl,
        storageUrl : config.storageUrl,
        tokenApi : '',

        dataOP : {
          material_spesifikasi : '',
          material_lebar : '',
          material_tebal : '',
          material_jumlah_skelp : '',
          material_berat_total : '',
          material_keterangan : '',

          produksi_nd : '',
          produksi_odia : '',
          produksi_tebal : '',
          produksi_panjang : '',
          produksi_jumlah : '',
          produksi_berat_total : '',
          produksi_keterangan : '',

          check_plainend: false,
          check_bevelend: false,
          check_threadend: false,
          check_eddycurrent: false,
          check_hydrotest: false,
          check_coatingvarnish: false,
          check_zinccoating: false,
          check_marking: false,
          check_kodewarna: false,

          tekanan: '75 kgf/cm2',
          catatan: ' Catatan : Produksi panjang 4.260 mm sebanyak 14.161 batang. Kekurangan coil menyusul ',
          sudut: 'SUDUT : 30 - 35',

          dbb_program_code : '',
          dbb_no_dbb : '',
        },
        search: {
          job_no: '',
          po_no: '',
          travel_latter_no: '',
          coil_no: '',
          process_program: '',
          owner: '',
          pack: '',
          thick: '',
          width: '',
          weight: '',
          slitting_date: '',
          slit_from: '',
        },
      }
    },
    mounted(){
      this.get();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
      get() {
        let context = this;               
        Api(context, produksiTolling.showProdTolling(context.$route.params.op_no)).onSuccess(function(response) {
            context.detailProdTollingData        = response.data.data;

            context.dataOP.material_spesifikasi  = response.data.data.material_spesifikasi
            context.dataOP.material_lebar        = response.data.data.material_lebar
            context.dataOP.material_tebal        = response.data.data.material_tebal
            context.dataOP.material_jumlah_skelp = response.data.data.material_jumlah_skelp
            context.dataOP.material_berat_total  = response.data.data.material_berat_total
            context.dataOP.material_keterangan   = response.data.data.material_keterangan

            context.dataOP.produksi_nd           = response.data.data.produksi_nd
            context.dataOP.produksi_odia         = response.data.data.produksi_odia
            context.dataOP.produksi_tebal        = response.data.data.produksi_tebal
            context.dataOP.produksi_panjang      = response.data.data.produksi_panjang
            context.dataOP.produksi_jumlah       = response.data.data.produksi_jumlah
            context.dataOP.produksi_berat_total  = response.data.data.produksi_berat_total
            context.dataOP.produksi_keterangan   = response.data.data.produksi_keterangan

            context.dataOP.check_plainend       = (response.data.data.check_plainend == 1) ? true : false
            context.dataOP.check_bevelend       = (response.data.data.check_bevelend == 1) ? true : false
            context.dataOP.check_threadend      = (response.data.data.check_threadend == 1) ? true : false
            context.dataOP.check_eddycurrent    = (response.data.data.check_eddycurrent == 1) ? true : false
            context.dataOP.check_hydrotest      = (response.data.data.check_hydrotest == 1) ? true : false
            context.dataOP.check_coatingvarnish = (response.data.data.check_coatingvarnish == 1) ? true : false
            context.dataOP.check_zinccoating    = (response.data.data.check_zinccoating == 1) ? true : false
            context.dataOP.check_marking        = (response.data.data.check_marking == 1) ? true : false
            context.dataOP.check_kodewarna      = (response.data.data.check_kodewarna == 1) ? true : false

            context.dataOP.tekanan               = response.data.data.tekanan
            context.dataOP.catatan               = response.data.data.catatan
            context.dataOP.sudut                 = response.data.data.sudut
            context.dataOP.dbb_program_code      = response.data.data.dbb_program_code

            context.getDataDBB();
        }).onFinish(function() {  
             
        })
        .call()        
      },
      // getDataDBB() {
      //   let context = this;               
      //   Api(context, produksiTolling.getDataDBB(context.dataOP.dbb_program_code, {job_no : context.detailProdTollingData.job_no})).onSuccess(function(response) {
      //       context.tableDBB.data          = response.data.data.data;
      //       context.tableDBB.dataAvailable = response.data.data.dataAvailable;
      //   })
      //   .onError(function(error) {                    
      //       context.tableDBB.data = []
      //   })
      //   .call()        
      // },
      getDataDBB(param){
        let context = this;               
        Api(context, produksiTolling.getDataDBB({job_no: context.detailProdTollingData.job_no, po_no: context.search.po_no, travel_latter_no: context.search.travel_latter_no, coil_no: context.search.coil_no, process_program: context.search.process_program, owner: context.search.owner, pack: context.search.pack, thick: context.search.thick, width: context.search.width, weight: context.search.weight, slitting_date: context.search.slitting_date, slit_from: context.search.slit_from})).onSuccess(function(response) {    
            context.tableDBB.data          = response.data.data.data;
            context.tableDBB.dataAvailable = response.data.data.dataAvailable;

            context.dataOP.material_spesifikasi  = response.data.data.data[0].spec
            context.dataOP.material_lebar        = response.data.data.data[0].width
            context.dataOP.material_tebal        = response.data.data.data[0].thick
            context.dataOP.material_jumlah_skelp = response.data.data.data.length
            context.dataOP.material_berat_total  = response.data.data.allWeight

            this.updatePT(this.detailProdTollingData.op_no)
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.tableDBB.data = [];
            }
        })
        .call()
      },
      saveMaterial(type, id){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        if (context.detailProdTollingData.job_no != undefined) {
          if (type == 'add') {
            formData.append('job_no', context.detailProdTollingData.job_no);
            formData.append('po_no', context.detailProdTollingData.po_no);
          }else{
            formData.append('job_no', '');
            formData.append('po_no', '');
          }
          formData.append('id', id);
        }else{
          alert('Semua Field Wajib Di Isi')
        }

        api = Api(context, produksiTolling.addMaterial(formData));
        api.onSuccess(function(response) {
            context.notifyVue((context.formTitle === 'Add Material') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.formTitle === 'Add Material') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {  
            context.getDataDBB();
        })
        .call();
      },
      updatePT(op_no){
        let api     = null;
        let context = this;

        api = Api(context, produksiTolling.updatePT(op_no, {
            material_spesifikasi : context.dataOP.material_spesifikasi,
            material_lebar : context.dataOP.material_lebar,
            material_tebal : context.dataOP.material_tebal,
            material_jumlah_skelp : context.dataOP.material_jumlah_skelp,
            material_berat_total : context.dataOP.material_berat_total,
            material_keterangan : context.dataOP.material_keterangan,

            produksi_nd : context.dataOP.produksi_nd,
            produksi_odia : context.dataOP.produksi_odia,
            produksi_tebal : context.dataOP.produksi_tebal,
            produksi_panjang : context.dataOP.produksi_panjang,
            produksi_jumlah : context.dataOP.produksi_jumlah,
            produksi_berat_total : context.dataOP.produksi_berat_total,
            produksi_keterangan : context.dataOP.produksi_keterangan,

            check_plainend: context.dataOP.check_plainend,
            check_bevelend: context.dataOP.check_bevelend,
            check_threadend: context.dataOP.check_threadend,
            check_eddycurrent: context.dataOP.check_eddycurrent,
            check_hydrotest: context.dataOP.check_hydrotest,
            check_coatingvarnish: context.dataOP.check_coatingvarnish,
            check_zinccoating: context.dataOP.check_zinccoating,
            check_marking: context.dataOP.check_marking,
            check_kodewarna: context.dataOP.check_kodewarna,

            tekanan: context.dataOP.tekanan,
            catatan: context.dataOP.catatan,
            sudut: context.dataOP.sudut,
            dbb_program_code: context.dataOP.dbb_program_code,
          }));
        api.onSuccess(function(response) {
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).onError(function(error) { 
            context.notifyVue('Update Failed', 'top', 'right', 'danger')
        }).onFinish(function() { 
            context.getDataDBB(); 
        })
        .call();
      },
      addMaterial() {
          this.formFilter.add   = true;
          this.formFilter.show  = true;
          this.formFilter.title = "Add Material";
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
        this.dataOP.dbb_program_code = obj.process_program;
        this.updatePT(this.detailProdTollingData.op_no)
      },
      // AMBIL DATA YANG DI PILIH AC FILTER
      getDataFilter(obj){
        this.search.owner = obj.client_name;
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
<style type="text/css" scoped>
  table {
    border-collapse: collapse;
  }

  td {
    width: 100px
  }

  .strikethrough {
    background: repeating-linear-gradient(
      180deg,
      red 0%,
      red 100%
    );
    background-size: 100% 2px;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
