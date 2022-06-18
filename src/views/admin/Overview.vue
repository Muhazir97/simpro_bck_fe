<template>
  <div class="content">
    <div class="container-fluid">
        <!-- <a :href="apiUrl+'report-all'" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Generate Report</a> -->
      <div class="row">
        <!-- <div class="col-xl-3 col-md-6">
          <router-link :to="'/job-request'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-badge text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Client Master</p>
                <h4 class="card-title">{{count_job_request}}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div> -->
        <div class="col-xl-3 col-md-6">
          <router-link :to="'/client-master'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-badge text-muted"></i>
              </div>
              <div slot="content">
                <p class="card-category">Client Master</p>
                <h4 class="card-title">{{ count_task.client }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6">
          <router-link :to="'/material-master'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-app text-info"></i>
              </div>
              <div slot="content">
                <p class="card-category">Mother Coil</p>
                <h4 class="card-title">{{ count_task.material }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6">
          <router-link :to="'/slit-coil'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-support-17 text-light"></i>
              </div>
              <div slot="content">
                <p class="card-category">Slit Coil</p>
                <h4 class="card-title">{{ count_task.slit_coil }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6" v-if="role == 'Requester'">
          <router-link :to="'/job-request'">
            <stats-card class="shadow">
              <div slot="header" class="icon-danger">
                <i class="nc-icon nc-notes text-danger"></i>
              </div>
              <div slot="content">
                <p class="card-category">Job Order</p>
                <h4 class="card-title">{{ count_task.job_request }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6" v-if="role == 'Requester'">
          <router-link :to="'/delivery'">
            <stats-card class="shadow">
              <div slot="header" class="icon-danger">
                <i class="nc-icon nc-delivery-fast text-warning"></i>
              </div>
              <div slot="content">
                <p class="card-category">Delivery</p>
                <h4 class="card-title">{{ count_task.delivery }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6" v-if="role == 'Requester'">
          <router-link :to="'/news'">
            <stats-card class="shadow">
              <div slot="header" class="icon-info">
                <i class="nc-icon nc-paper-2 text-dark"></i>
              </div>
              <div slot="content">
                <p class="card-category">News</p>
                <h4 class="card-title">{{ count_task.news }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6" v-if="role == 'Requester'">
          <router-link :to="'/invoice'">
            <stats-card class="shadow">
              <div slot="header" class="icon-info">
                <i class="nc-icon nc-single-copy-04 text-primary"></i>
              </div>
              <div slot="content">
                <p class="card-category">Invoice</p>
                <h4 class="card-title">{{ count_task.invoice }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-3 col-md-6" v-if="role == 'Requester'">
          <router-link :to="'/payment'">
            <stats-card class="shadow">
              <div slot="header" class="icon-info">
                <i class="nc-icon nc-credit-card text-success"></i>
              </div>
              <div slot="content">
                <p class="card-category">Payment</p>
                <h4 class="card-title">{{ count_task.invoice }}</h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>
      </div>
      <div class="table-responsive">
        <card class="strpied-tabled-with-hover shadow"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <div class="row">
                <div class="col-2">
                  <!-- <h4 class="card-title">Payment</h4> -->
                  <!-- <p class="card-category">Here is a subtitle for this table</p> -->
                </div>
                <div class="col-8 text-center">
                  <h5 class="card-title font-weight-bold">STEEL CENTER</h5><br>
                  <h5 class="card-title font-weight-bold" style="margin-top: -20px;">PROJECT MONITORING - 2022</h5><br>
                  <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">PT. BUANA CENTRA KARYA</h5><br>
                </div>
                <div class="col-2">
                  <!-- <button type="submit" class="btn btn-sm btn-info btn-fill float-right" @click="create()">
                    Add New
                  </button> -->
                </div>
              </div>
            </template>
            <table class="table">
              <thead>
                <slot name="columns">
                  <tr style="background-color: #F0F8FF;">
                    <th>NO</th>
                    <th>PO NO</th>
                    <th>DATE</th>
                    <th>CLIENT</th>
                    <th>JOB NO</th>
                    <th>PROD CLASS</th>
                    <th>QTY</th>
                    <th>UNIT</th>
                    <th>RATE</th>
                    <th>TOTAL</th>
                    <th>DELIVERY QTY</th>
                    <th>DELIVERY DATE</th>
                    <th>DELIVERY TOTAL</th>
                    <th>NEWS QTY</th>
                    <th>NEWS DATE</th>
                    <th>NEWS TOTAL</th>
                    <th>INVOICE QTY</th>
                    <th>INVOICE AMOUNT</th>
                    <th>INVOICE OUT</th>
                    <th>INVOICE TOTAL</th>
                    <th>PAYMENT QTY</th>
                    <th>PAYMENT DATE</th>
                    <th>PAYMENT TOTAL</th>
                    <th>Created At</th>
                    <th>Created By</th>
                    <th></th>
                  </tr>
                </slot>
              </thead>
              <tbody>
                <!-- <tr v-for="(row, i) in table.data" :key="i">
                  <td style="font-size: 13px;">
                    <label class="badge badge-success">{{row.job_no}}</label>
                  </td>
                  <td style="font-size: 13px;">{{row.prod_class}}</td>
                  <td style="font-size: 13px;">{{row.po_no}}</td>
                  <td style="font-size: 13px;">{{row.client_name}}</td>
                  <td style="font-size: 13px;">{{row.qty}}</td>
                  <td style="font-size: 13px;">{{row.unit}}</td>
                  <td style="font-size: 13px;">{{row.rate}}</td>
                  <td style="font-size: 13px;">{{row.amount}}</td>
                  <td style="font-size: 13px;">
                    <label class="badge badge-danger">{{row.invoice_no}}</label>
                  </td>
                  <td style="font-size: 13px;">{{row.invoice_date}}</td>
                  <td style="font-size: 13px;">{{row.invoice_qty}}</td>
                  <td style="font-size: 13px;">{{row.invoice_amount}}</td>
                  <td style="font-size: 13px;">{{row.invoice_balance}}</td>
                  <td style="font-size: 13px;">{{row.created_at}}</td>
                  <td style="font-size: 13px;">{{row.created_by}}</td>
                  <td>
                    <i class="fa fa-edit" aria-hidden="true" style="cursor: pointer;" @click="edit(row.id)" title="Edit"></i>
                  </td>
                  <td>
                    <i class="fa fa-trash-o" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="remove(row.id)"></i>
                  </td>
                </tr> -->
              </tbody>
            </table>
          </card>
      </div>

      <!-- <div class="container-fluid" style="width: 900px;">
        <line-chart :chart-data="datacollection" height="150"></line-chart>
      </div> -->

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from '@/components/Cards/ChartCard.vue'
  import StatsCard from '@/components/Cards/StatsCard.vue'
  import LTable from '@/components/Table.vue'
  import LineChart from './LineChart.js'
  import Api from '@/helpers/api';
  import dashboard from '@/services/dashboard.service';
  import config from '@/configs/config';

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard,
      LineChart
    },
    data () {
      return {
        count_task : [],
        apiUrl :config.apiUrl,
        role: '',
     }
    },
    mounted(){
      this.countTask();
      this.role = localStorage.getItem('role');
    },
    methods: {
      countTask(){
        let context = this;               
        Api(context, dashboard.countTask()).onSuccess(function(response) {    
            context.count_task = response.data.data;
            console.log(response.data.data)
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.count_job_request = [];
            }
        })
        .call()
      },
    }
  }
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>