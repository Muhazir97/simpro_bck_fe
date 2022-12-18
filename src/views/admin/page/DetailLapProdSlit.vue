<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= INFORMATION ===============================  -->
      <div class="table-responsive mb-2">
        <div class="text-center display-4">
          <button type="submit" class="btn btn-sm btn-danger mt-3 btn-fill float-left" @click="remove()">
            <i class="fa fa-trash-o"></i> Delete All
          </button>
          <span style="margin-bottom: -20px; font-weight: bold;">DETAIL LAP PROD SLITTING</span>
          <a :href="apiUrl+'print-detail-lap-prod_slitting?process_program='+detailProdSlittingData.process_program" target="_BLANK">
            <button type="submit" class="btn btn-sm btn-warning btn-fill float-right ml-2">
              <i class="fa fa-file-text"></i> Print
            </button>
          </a>
          <a :href="apiUrl+'report-excel/report-slitting?process_program='+detailProdSlittingData.process_program" target="_BLANK">
            <button type="submit" class="btn btn-sm btn-success btn-fill float-right">
              <i class="fa fa-download"></i> Download
            </button>
          </a>
          <hr style="margin-top: 50px;">
        </div>
        <table class="table table-sm">
            <tbody>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">JOB NO</td>
                    <td width="300">  {{ detailProdSlittingData.job_no }} </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">PO NO</td>
                    <td> {{ detailProdSlittingData.po_no }} </td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">PROGRAM NO</td>
                    <td> {{ detailProdSlittingData.process_program }} </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">CLIENT</td>
                    <td> {{ detailProdSlittingData.owner }} </td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">CREATED BY</td>
                    <td> {{ detailProdSlittingData.created_by }} </td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">CREATED AT</td>
                    <td> {{ moment(detailProdSlittingData.created_at).locale('id').format('L') }} </td>
                    <td style="display: none"></td>
                </tr>
            </tbody>
        </table>

        <table class="table table-center table-sm table-bordered text-center">
          <thead>
            <tr>
                <th colspan="7" style="background-color: #FF7F50; text-align:center; color: black; font-weight: bold;"><span style="margin-left: 140px;">Material Input</span></th>
                <th colspan="8" style="background-color: #7FFF00; text-align:center; color: black; font-weight: bold;"><span style="margin-left: 250px;">Material Output</span></th>
                <th style="display: none"></th>
            </tr>
            <tr>
                <th style="background-color: #7FFFD4; color: black;">No</th>
                <th style="background-color: #7FFFD4; color: black;">Date</th>
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
                <th style="background-color: #7FFFD4; color: black;">Scrap</th>
                <th style="background-color: #7FFFD4; color: black;">Remark</th>
                <th style="display: none"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in table.data" :key="i">
              <td>{{ i + 1 }}</td>
               <!-- ============== DATE ========= -->
               <td>
                <!-- jika i sama dengan 0 -->
                <div v-if="i == 0">
                  {{ moment(row.slitting_date).locale('id').format('L') }}
                </div>
                <!-- jika i bukan sama dengan 0 -->
                <div v-else>
                  <!-- jika coil no sekarang dan sebelumnya sama -->
                  <div v-if="row.coil_no == table.data[i - 1].coil_no">
                    <!-- jika i sama dengan 0 -->
                    <div v-if="i == 0">
                      {{ moment(row.slitting_date).locale('id').format('L') }}
                    </div>
                    <!-- jika i bukan sama dengan 0 -->
                    <div v-else>
                      
                    </div>
                  </div>
                  <!-- jika coil no sekarang dan sebelumnya tidak sama -->
                  <div v-else>
                    {{ moment(row.slitting_date).locale('id').format('L') }}
                  </div>
                </div>
              </td>
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
              <td style="font-size: 13px;">{{ convertRp(row.scrap_all) }}</td>
              <td style="font-size: 13px;">{{ row.remark_all }}</td>
              <td style="display: none"></td>
            </tr>
            <tr>
              <td colspan="6">TOTAL INPUT</td>
              <td>{{ convertRp(totalWeightInput) }}</td>
              <td></td>
              <td colspan="4">TOTAL OUTPUT</td>
              <td>{{ convertRp(totalWeightOutput) }}</td>
              <td>{{ convertRp(totalScrap) }}</td>
              <td></td>
              <td style="display: none"></td>
            </tr>
            <tr>
              <td colspan="15">YIELD : {{ convertRp(yieldSlit) }} %</td>
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
  import reportSlitting from '@/services/reportSlitting.service';
  import Api from '@/helpers/api';
  import Autocomplete from 'vue2-autocomplete-js'
  require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
  var moment = require('moment');

  export default {
    components: {
      Card,
      Modal,
      Autocomplete,
    },
    data () {
      return {
        moment:moment,
        detailProdSlittingData: {},
        table: {
          data: [],
        },
        totalWeightInput : '',
        totalWeightOutput : '',
        totalScrap : '',
        yieldSlit : '',
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
        Api(context, reportSlitting.showreportSlitting(context.$route.params.process_program)).onSuccess(function(response) {
            context.detailProdSlittingData = response.data.data.data[0];
            context.table.data             = response.data.data.data;
            context.totalWeightInput       = response.data.data.totalWeightInput;
            context.totalWeightOutput      = response.data.data.totalWeightOutput;
            context.totalScrap             = response.data.data.totalScrap;
            context.yieldSlit              = response.data.data.yield;
        }).onFinish(function() {  
             
        })
        .call()        
      },
      remove() {
        var r = confirm("Anda yakin ingin menghapus data ini ?");
        if (r == true) {
          let context = this;

          Api(context, reportSlitting.deleteProgramNo(context.$route.params.process_program)).onSuccess(function(response) {
              context.get();
              context.notifyVue('Data Berhasil di Hapus', 'top', 'right', 'info')
              context.$router.go(-1)
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
