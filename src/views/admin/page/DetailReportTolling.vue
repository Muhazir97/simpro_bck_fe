<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= INFORMATION ===============================  -->
      <div class="table-responsive mb-2">
        <div class="text-center display-4">
          <span style="margin-bottom: -20px; font-weight: bold;">DAILY PIPE PROD REPORT</span>
          <a :href="apiUrl+'print-report-prod-tolling?date='+table.data[0].date" target="_BLANK">
            <button type="submit" class="btn btn-sm btn-warning btn-fill float-right">
              <i class="fa fa-file-text"></i> Print
            </button>
          </a>
          <hr style="margin-top: 50px;">
        </div>
        <table class="table table-sm table-bordered">
          <tbody>
              <tr>
                <td style="background-color: #F0F8FF; font-weight: bold;" width="150">DATE</td>
                <td width="350"> {{ moment(table.data[0].date).locale('id').format('LL') }} </td>
                <td style="background-color: #F0F8FF; font-weight: bold;" width="150">DAY</td>
                <td> {{ moment(table.data[0].date).locale('id').format('dddd') }} </td>
              </tr>
          </tbody>
        </table>

        <div class="scroll">
          <table border="1">
            <thead>
              <tr>
                <th rowspan="2" style="font-size: 12px; text-align: center; background-color: #FFA07A;">NO</th>
                <th rowspan="2" style="font-size: 12px; text-align: center; background-color: #FFA07A;">SHIFT</th>
                <th rowspan="2" style="font-size: 12px; text-align: center; background-color: #FFA07A;">JOB NO</th>
                <th rowspan="2" style="font-size: 12px; text-align: center; background-color: #FFA07A;">PO NO</th>
                <th rowspan="2" style="font-size: 12px; text-align: center; background-color: #FFA07A;">CLIENT</th>
                <th rowspan="2" style="font-size: 12px; text-align: center; background-color: #FFA07A;">OP NO</th>
                <th colspan="5" style="background-color: #7FFF00; text-align:center; color: black; font-weight: bold;">COIL</th>
                <th colspan="4" style="background-color: #87CEFA; text-align:center; color: black; font-weight: bold;">PIPE PRODUCTION</th>
                <th colspan="2" style="background-color: #F5DEB3; text-align:center; color: black; font-weight: bold;">REMARK</th>
              </tr>
              <tr>
                <th style="font-size: 12px; text-align: center; background-color: #7FFF00;">COIL NO</th>
                <th style="font-size: 12px; text-align: center; background-color: #7FFF00;">GRADE</th>
                <th style="font-size: 12px; text-align: center; background-color: #7FFF00;">THICK</th>
                <th style="font-size: 12px; text-align: center; background-color: #7FFF00;">WIDTH</th>
                <th style="font-size: 12px; text-align: center; background-color: #7FFF00;">WEIGHT</th>
                <th style="font-size: 12px; text-align: center; background-color: #87CEFA;">OD</th>
                <th style="font-size: 12px; text-align: center; background-color: #87CEFA;">LENGTH</th>
                <th style="font-size: 12px; text-align: center; background-color: #87CEFA;">QTY</th>
                <th style="font-size: 12px; text-align: center; background-color: #87CEFA;">PROD WEIGHT</th>
                <th style="font-size: 12px; text-align: center; background-color: #F5DEB3;">B</th>
                <th style="font-size: 12px; text-align: center; background-color: #F5DEB3;">C</th>
                <th style="display: none" ></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in table.data" :key="i">
                <td style="font-size: 12px; text-align: center;">{{ i + 1 }}</td>
                <td style="font-size: 12px; text-align: center;">{{ row.shift }}</td>
                <td style="font-size: 12px; text-align: center;">
                  <label class="badge badge-success">{{ row.job_no }}</label>
                </td>
                <td style="font-size: 12px; text-align: center;">{{ row.po_no }}</td>
                <td style="font-size: 12px;">{{ row.client_name }}</td>
                <td style="font-size: 12px; text-align: center;">
                  <label class="badge badge-info">{{ row.op_no }}</label>
                </td>
                <td>
                  <small><label class="badge badge-danger">{{ row.coil_no }} {{ row.pack}}</label></small>
                </td>
                <td style="font-size: 12px; text-align: center;">{{ row.grade}}</td>
                <td style="font-size: 12px; text-align: center;">{{ row.thick}}</td>
                <td style="font-size: 12px; text-align: center;">{{ convertRp(row.width) }}</td>
                <td style="font-size: 12px; text-align: center;">{{ convertRp(row.weight) }}</td>
                <td style="font-size: 12px; text-align: center;">{{ row.od}}</td>
                <td style="font-size: 12px; text-align: center;"><input type="input" @change="updateLength(row.id, row.length)" v-model="row.length" size="5"></td>
                <td style="font-size: 12px; text-align: center;">{{ convertRp(row.qty)}} </td>
                <td style="font-size: 12px; text-align: center;">{{ convertRp(row.prod_weight) }}</td>
                <td style="font-size: 12px; text-align: center;">{{ convertRp(row.remark_b) }}</td>
                <td style="font-size: 12px; text-align: center;">{{ convertRp(row.remark_c) }}</td>
                <td style="display: none" ></td>
              </tr>
              <tr>
                <td style="font-size: 12px; text-align: center; font-weight: bold;" colspan="10">TOTAL</td>
                <td style="font-size: 12px; text-align: center; font-weight: bold;" >{{ convertRp(totalWeightCoil) }}</td>
                <td colspan="2"></td>
                <td style="font-size: 12px; text-align: center; font-weight: bold;">{{ convertRp(totalQty) }}</td>
                <td style="font-size: 12px; text-align: center; font-weight: bold;">{{ convertRp(totalWeightProd) }}</td>
                <td style="font-size: 12px; text-align: center; font-weight: bold;">{{ convertRp(totalRemarkB) }}</td>
                <td style="font-size: 12px; text-align: center; font-weight: bold;">{{ convertRp(totalRemarkC) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <div class="card">
              <textarea style="border: 1px solid white; resize: none; font-size: 15px;" rows="7" cols="40" @change="updateRpt(table.data[0].id)" v-model="reportData.catatan"></textarea> 
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
  import reportTolling from '@/services/reportTolling.service';
  import Api from '@/helpers/api';
  var moment = require('moment');

  export default {
    components: {
      Card,
      Modal,
    },
    data () {
      return {
        moment:moment,
        detailProdSlittingData: {},
        table: {
          data: [],
        },
        reportData: {},
        apiUrl :config.apiUrl,
        storageUrl : config.storageUrl,
        tokenApi : '',

        totalWeightCoil : '',
        totalWeightProd : '',
        totalQty : '',
        totalRemarkB : '',
        totalRemarkC : '',
      }
    },
    mounted(){
      this.get();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
      get() {
        let context = this;               
        Api(context, reportTolling.showReportTolling(context.$route.params.date)).onSuccess(function(response) {
            context.table.data      = response.data.data.data;
            context.totalWeightCoil = response.data.data.totalWeightCoil;
            context.totalWeightProd = response.data.data.totalWeightProd;
            context.totalQty        = response.data.data.totalQty;
            context.totalRemarkB    = response.data.data.totalRemarkB;
            context.totalRemarkC    = response.data.data.totalRemarkC;

            context.reportData.catatan = response.data.data.data[0].catatan;
        }).onFinish(function() {  
             
        })
        .call()        
      },
      updateRpt(id){
        let api     = null;
        let context = this;

        api = Api(context, reportTolling.updateRpt(id, {
            catatan : context.reportData.catatan,
        }));
        api.onSuccess(function(response) {
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).onError(function(error) { 
            context.notifyVue('Update Failed', 'top', 'right', 'danger')
        }).onFinish(function() { 
            context.get(); 
        })
        .call();
      },
      updateLength(id, length){
        let api     = null;
        let context = this;

        api = Api(context, reportTolling.updateLength(id, {
            length : length,
        }));
        api.onSuccess(function(response) {
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).onError(function(error) { 
            context.notifyVue('Update Failed', 'top', 'right', 'danger')
        }).onFinish(function() { 
            context.get(); 
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
