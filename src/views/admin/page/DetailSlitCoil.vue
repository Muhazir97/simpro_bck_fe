<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= INFORMATION ===============================  -->
      <div class="table-responsive mb-2">
        <div class="text-center display-4">
          <span style="margin-bottom: -20px; font-weight: bold;">DETAIL SLIT COIL</span>
          <a :href="apiUrl+'report-excel/merge-prod-slitting?process_program='+detailProdSlittingData.process_program" target="_BLANK">
            <button type="submit" class="btn btn-sm btn-success btn-fill float-right">
              <i class="fa fa-download"></i> Download
            </button>
          </a>
          <hr style="margin-top: 50px;">
        </div>
        <table class="table table-sm">
            <tbody>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="100">JOB NO</td>
                    <td width="300">  {{ detailProdSlittingData.job_no }} </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">PO NO</td>
                    <td> {{ detailProdSlittingData.po_no }} </td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="100">TRAVEL LATTER NO</td>
                    <td> {{ detailProdSlittingData.process_program }} </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">CLIENT</td>
                    <td> {{ detailProdSlittingData.client_name }} </td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="100">START TANGGAL</td>
                    <td> {{ detailProdSlittingData.created_by }} </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">FINISH TANGGAL</td>
                    <td> {{ detailProdSlittingData.created_at }} </td>
                    <td style="display: none"></td>
                </tr>
            </tbody>
        </table>

        <table class="table table-center table-sm table-bordered text-center">
          <thead>
            <tr>
                <th colspan="6" style="background-color: #FF7F50; text-align:center; color: black; font-weight: bold;"><span style="margin-left: 140px;">Material Input</span></th>
                <th colspan="8" style="background-color: #7FFF00; text-align:center; color: black; font-weight: bold;"><span style="margin-left: 250px;">Material Output</span></th>
                <th style="display: none"></th>
            </tr>
            <tr>
                <th style="background-color: #7FFFD4; color: black;">No</th>
                <th style="background-color: #7FFFD4; color: black;">Coil No</th>
                <th style="background-color: #7FFFD4; color: black;">Spec</th>
                <th style="background-color: #7FFFD4; color: black;">Thick (mm)</th>
                <th style="background-color: #7FFFD4; color: black;">Width (mm)</th>
                <th style="background-color: #7FFFD4; color: black;">Weight (kg)</th>

                <th style="background-color: #7FFFD4; color: black;">No</th>
                <th style="background-color: #7FFFD4; color: black;">Coil No</th>
                <th style="background-color: #7FFFD4; color: black;">Pack</th>
                <th style="background-color: #7FFFD4; color: black;">Thick (mm)</th>
                <th style="background-color: #7FFFD4; color: black;">Width (mm)</th>
                <th style="background-color: #7FFFD4; color: black;">Weight (kg)</th>
                <th style="display: none"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in table.data" :key="i">
              <td>{{ i + 1 }}</td>
               <!-- ============== COIL NO ========= -->
               <td>
                  <!-- jika i sama dengan 0 -->
                  <div v-if="i == 0">
                    {{ row.coil_no }}
                  </div>
                  <!-- jika i bukan sama dengan 0 -->
                  <div v-else>
                    <!-- jika coil no sekarang dan sebelumnya sama -->
                    <div v-if="row.coil_no == table.data[i - 1].coil_no">
                      <!-- jika i sama dengan 0 -->
                      <div v-if="i == 0">
                        {{ row.coil_no }}
                      </div>
                      <!-- jika i bukan sama dengan 0 -->
                      <div v-else>
                        
                      </div>
                    </div>
                    <!-- jika coil no sekarang dan sebelumnya tidak sama -->
                    <div v-else>
                      {{ row.coil_no }}
                    </div>
                  </div>
                </td>
              <!-- ============== SPEC ========= -->
              <td>
                <!-- jika i sama dengan 0 -->
                <div v-if="i == 0">
                  {{ row.dimension_spec }}
                </div>
                <!-- jika i bukan sama dengan 0 -->
                <div v-else>
                  <!-- jika coil no sekarang dan sebelumnya sama -->
                  <div v-if="row.coil_no == table.data[i - 1].coil_no">
                    <!-- jika i sama dengan 0 -->
                    <div v-if="i == 0">
                      {{ row.dimension_spec }}
                    </div>
                    <!-- jika i bukan sama dengan 0 -->
                    <div v-else>
                      
                    </div>
                  </div>
                  <!-- jika coil no sekarang dan sebelumnya tidak sama -->
                  <div v-else>
                    {{ row.dimension_spec }}
                  </div>
                </div>
              </td>
              <!-- ============== THICK ========= -->
              <td>
                <!-- jika i sama dengan 0 -->
                <div v-if="i == 0">
                  {{ row.dimension_thick }}
                </div>
                <!-- jika i bukan sama dengan 0 -->
                <div v-else>
                  <!-- jika coil no sekarang dan sebelumnya sama -->
                  <div v-if="row.coil_no == table.data[i - 1].coil_no">
                    <!-- jika i sama dengan 0 -->
                    <div v-if="i == 0">
                      {{ row.dimension_thick }}
                    </div>
                    <!-- jika i bukan sama dengan 0 -->
                    <div v-else>
                      
                    </div>
                  </div>
                  <!-- jika coil no sekarang dan sebelumnya tidak sama -->
                  <div v-else>
                    {{ row.dimension_thick }}
                  </div>
                </div>
              </td>
              <!-- ============== WIDTH ========= -->
              <td>
                <!-- jika i sama dengan 0 -->
                <div v-if="i == 0">
                  {{ convertRp(row.dimension_width) }}
                </div>
                <!-- jika i bukan sama dengan 0 -->
                <div v-else>
                  <!-- jika coil no sekarang dan sebelumnya sama -->
                  <div v-if="row.coil_no == table.data[i - 1].coil_no">
                    <!-- jika i sama dengan 0 -->
                    <div v-if="i == 0">
                      {{ convertRp(row.dimension_width) }}
                    </div>
                    <!-- jika i bukan sama dengan 0 -->
                    <div v-else>
                      
                    </div>
                  </div>
                  <!-- jika coil no sekarang dan sebelumnya tidak sama -->
                  <div v-else>
                    {{ convertRp(row.dimension_width) }}
                  </div>
                </div>
              </td>
              <!-- ============== WEIGHT ========= -->
              <td>
                <!-- jika i sama dengan 0 -->
                <div v-if="i == 0">
                  {{ convertRp(row.dimension_weight) }}
                </div>
                <!-- jika i bukan sama dengan 0 -->
                <div v-else>
                  <!-- jika coil no sekarang dan sebelumnya sama -->
                  <div v-if="row.coil_no == table.data[i - 1].coil_no">
                    <!-- jika i sama dengan 0 -->
                    <div v-if="i == 0">
                      {{ convertRp(row.dimension_weight) }}
                    </div>
                    <!-- jika i bukan sama dengan 0 -->
                    <div v-else>
                      
                    </div>
                  </div>
                  <!-- jika coil no sekarang dan sebelumnya tidak sama -->
                  <div v-else>
                    {{ convertRp(row.dimension_weight) }}
                  </div>
                </div>
              </td>

              <td style="font-size: 13px;">{{ i + 1 }}</td>
              <td style="font-size: 13px;">{{ row.coil_no }}</td>
              <td style="font-size: 13px;">{{ row.pack }}</td>
              <td style="font-size: 13px;">{{ row.thick }}</td>
              <td style="font-size: 13px;">{{ convertRp(row.width) }}</td>
              <td style="font-size: 13px;">{{ convertRp(row.weight) }}</td>
              <td style="display: none"></td>
            </tr>
            <tr>
              <td colspan="5">TOTAL INPUT</td>
              <td>{{ convertRp(totalWeightInput) }}</td>
              <!-- <td></td>
              <td colspan="5">TOTAL OUTPUT</td> -->
              <td style="display: none"></td>
            </tr>
          </tbody>
        </table>

      </div>

    </card>
  </div>
</template>
<script>
  import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import slitCoil from '@/services/slitCoil.service';
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
        detailProdSlittingData: {},
        table: {
          data: [],
        },
        totalWeightInput : '',
        apiUrl :config.apiUrl,
        storageUrl : config.storageUrl,
        tokenApi : '',
      }
    },
    mounted(){
      this.get();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
      get() {
        let context = this;               
        Api(context, slitCoil.showSlitCoil(context.$route.params.process_program)).onSuccess(function(response) {
            context.detailProdSlittingData = response.data.data.data[0];
            context.table.data             = response.data.data.data;
            context.totalWeightInput       = response.data.data.totalWeightInput;
        }).onFinish(function() {  
             
        })
        .call()        
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
        this.updatePT(this.detailProdSlittingData.op_no)
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
  .table-center td, th {
   text-align: center;   
}
</style>
