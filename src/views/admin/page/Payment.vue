<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <a :href="apiUrl+'report-excel/payment?job_no='+search.job_no+'&po_no='+search.po_no+'&client_name='+search.client_name+'&prod_class='+search.prod_class+'&invoice_no='+search.invoice_no+'&pay_no='+search.pay_no+'&pay_status='+search.pay_status+'&pay_date='+search.pay_date+''" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Export</a>
          <!-- <button class="btn btn-sm btn-success mb-4" @click="modalImport()"><i class="fa fa-upload fa-sm"></i> Import</button> -->

          <!-- CARD -->
          <card class="strpied-tabled-with-hover shadow"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <div class="row">
                <div class="col-6">
                  <h4 class="card-title">Payment</h4>
                </div>
                <div class="col-2">
                  <select class="form-select form-control" aria-label="Default select example" v-model="search.pay_status"  @change="get()">
                  <option selected>Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Partially Paid">Partially Paid</option>
                </select>
                </div>
                <div class="col-4">
                  <button type="submit" class="btn btn-sm btn-secondary btn-fill float-right" @click="filter()">
                    Filter
                  </button>
                  <button type="submit" class="btn btn-sm btn-info btn-fill float-right mr-2" @click="create()">
                    Add New
                  </button>
                </div>
              </div>
            </template>
            <div class="scroll">
              <table class="table">
                <thead>
                  <slot name="columns" class="text-center">
                    <tr style="background-color: #F0F8FF;" class="text-center">
                      <th>JOB NO</th>
                      <!-- <th>PO NO</th> -->
                      <th>CLIENT</th>
                      <!-- <th>PROD CLASS</th> -->
                      <th>INVOICE NO</th>
                      <th>PAY NO</th>
                      <th>DPP</th>
                      <th>PPN</th>
                      <th>POTONGAN PPH</th>
                      <th>POTONGAN ADMIN</th>
                      <th>TOTAL PAYMENT</th>
                      <th>PAY STATUS</th>
                      <th>PAY DATE</th>
                      <th></th>
                      <th></th>
                      <th style="display: none"></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in table.data" :key="i">
                    <td style="font-size: 13px;">
                      <label class="badge badge-dark text-white">{{row.job_no}}</label>
                    </td>
                    <!-- <td style="font-size: 13px;"><small><label class="badge badge-warning">{{ row.po_no }}</label></small></td> -->
                    <td style="font-size: 13px;">{{row.client_name}}</td>
                    <!-- <td style="font-size: 13px;">{{row.prod_class}}</td> -->
                    <td style="font-size: 13px;">
                      <router-link :to="/detail-invoice/+row.invoice_no">
                        <label class="badge badge-primary" style="cursor: pointer;">{{row.invoice_no}}</label>
                      </router-link>
                    </td>
                    <td style="font-size: 13px;">
                      <label class="badge badge-info" style="cursor: pointer;" @click="detailPay(row.pay_no)">{{row.pay_no}}</label>
                    </td>
                    <td style="font-size: 13px;">{{ convertRp(row.dpp) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.ppn) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.potongan_pph) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.potongan_admin_bank) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(((+row.dpp + +row.ppn) - (+row.potongan_pph + +row.potongan_admin_bank))) }}</td>
                    <td style="font-size: 13px;">
                      <label class="badge badge-success" v-if="row.pay_status == 'Paid'">{{ row.pay_status }}</label>
                      <label class="badge badge-danger" v-if="row.pay_status == 'Partially Paid'">{{ row.pay_status }}</label>
                    </td>
                    <td style="font-size: 13px;">{{ moment(row.pay_date).locale('id').format('L') }}</td>
                    <td>
                      <i class="fa fa-edit" aria-hidden="true" style="cursor: pointer;" @click="edit(row.id)" title="Edit"></i>
                    </td>
                    <td>
                      <i class="fa fa-trash-o" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="remove(row.id)"></i>
                    </td>
                    <td style="display: none" ></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <template slot="footer">
              <div class="float-left">TOTAL : {{table.data.length}} </div>
              <div class="float-right">
                <base-pagination :page-count="pagination.page_count" v-model="pagination.default" @input="changePage"></base-pagination>
              </div>
            </template>
          </card>

          <!-- CHART PAYMENT -->
          <!-- <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-2">
                </div>
                <div class="col-8 text-center">
                  <h5 class="card-title font-weight-bold"><u>DIAGRAM PAYMENT</u> </h5><br>
                </div>
                <div class="col-2">
                  <a :href="apiUrl+'print-rkp-invoice?job_no='+search.job_no+'&po_no='+search.po_no+'&client_name='+search.client_name+'&prod_class='+search.prod_class+'&invoice_no='+search.invoice_no+'&invoice_weight='+search.invoice_weight+'&invoice_qty='+search.invoice_qty+'&date='+search.date+'&ppn_status='+search.ppn_status+''" target="_BLANK">
                    <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                      <i class="fa fa-print "></i> Print
                    </button>
                  </a>
                </div>
              </div>
            </template>
            <div class="container" >
              <line-chart :chart-data="datacollection" :width="300" :height="120"></line-chart>
            </div>
          </card> -->

          <!-- TOTAL AKUMULASI PER CLIENT -->
          <!-- <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-2">
                </div>
                <div class="col-8 text-center">
                  <h5 class="card-title font-weight-bold">RKP PAYMENT</h5><br>
                  <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">PT. BUANA CENTRA KARYA</h5><br>
                </div>
                <div class="col-2">
                </div>
              </div>
            </template>
            <div class="scroll">
              <table border='1'>
                <thead>
                  <slot name="columns">
                    <tr style="background-color: #F0F8FF;">
                      <th style="font-size: 13px; text-align: center;">NO</th>
                      <th style="font-size: 13px; text-align: center;">CUSTOMER</th>
                      <th style="font-size: 13px; text-align: center;">TOTAL PAYMENT</th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in tableAkumulasiClient.data" :key="i">
                    <td style="font-size: 13px; text-align: center;">{{ i + 1 }}</td>
                    <td style="font-size: 13px;">{{ row.client_name }}</td>
                    <td style="font-size: 13px; text-align: center;"> {{ convertRp(((+row.dpp + +row.ppn) - (+row.potongan_pph + +row.potongan_admin_bank))) }} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card> -->

        </div>

        <!-- MODAL FILTER -->
        <div>
           <modal :show.sync="formFilter.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{formFilter.title}}</h5>
             </template>
             <div>
              <div class="form-group">
                <label>Job No</label><br>
                <autocomplete
                  ref="autocomplete"
                  :url="apiUrl+'job-request/find-job-no'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="job_no"
                  label="job_name"
                  :on-select="getDataFilterJo"
                  placeholder="Choose Job No"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <!-- <base-input type="text"
                    label="Po Number"
                    placeholder="Po Number"
                    v-model="search.po_no">
              </base-input> -->
              <div class="form-group">
                <label>Client</label><br>
                <autocomplete 
                  ref="autocomplete"
                  :url="apiUrl+'client/find-client'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="client_name"
                  label="client_code"
                  :on-select="getDataFilterClient"
                  placeholder="Choose Client"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <div class="form-group">
                <label>Production Classification</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.prod_class">
                  <option selected>Select Classification</option>
                  <option value="Slitting">Slitting</option>
                  <option value="Tolling">Tolling</option>
                  <option value="Shearing">Shearing</option>
                </select>
              </div>
              <base-input type="text"
                    label="Invoice No"
                    placeholder="Invoice No"
                    v-model="search.invoice_no">
              </base-input>
              <base-input type="text"
                    label="Pay No"
                    placeholder="Pay No"
                    v-model="search.pay_no">
              </base-input>
              <div class="form-group">
                <label>Status</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.pay_status">
                  <option selected>Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Partially Paid">Partially Paid</option>
                </select>
              </div>
              <small class="d-block text-uppercase font-weight-bold mb-3">Date range</small>
              <div class="input-daterange datepicker row align-items-center">
                  <div class="col">
                      <base-input addon-left-icon="ni ni-calendar-grid-58">
                          <flat-picker slot-scope="{focus, blur}"
                                       @on-open="focus"
                                       @on-close="blur"
                                       :config="{allowInput: true, mode: 'range',}"
                                       class="form-control datepicker"
                                       v-model="search.pay_date">
                          </flat-picker>
                      </base-input>
                  </div>
              </div>

             </div>
             <template slot="footer">
                 <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="formFilter.show = false">Close</button>
                 <button type="primary" class="btn btn-sm btn-info btn-fill" @click="get(), formFilter.show = false">Filter</button>
             </template>
           </modal>
        </div>

        <!-- MODAL IMPORT -->
        <div>
           <modal :show.sync="formImport.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{formImport.title}}</h5>
             </template>
             <div>
                <base-input type="file"
                      label="Upload File"
                      placeholder="Upload File"
                      @change="filesChange">
                </base-input>
                <small>Download Template<a :href="storageUrl+'template_import/Template Import Invoice.xlsx'"> Import Invoice</a></small>
             </div>
             <template slot="footer">
                 <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="formImport.show = false">Close</button>
                 <button type="primary" class="btn btn-sm btn-info btn-fill" @click="importData()" :disabled="onLoading">
                    <span v-if="onLoading"><i class="fa fa-spinner fa-spin"></i> Please Wait...</span>
                    <span v-else>
                        <span>Import</span>
                    </span>
                </button>
             </template>
           </modal>
        </div>

        <!-- DETAIL PAYMENT -->
        <modal-lg :show.sync="formDetPay.show">
        <div class=" modal-lg">
          <template slot="header">
            <h5 class="modal-title" id="exampleModalLabel">{{formDetPay.title}}</h5>
           </template>
            <div class="row">
              <div class="col-8">
                <p>Detail Payment</p>
              </div>
              <div class="col-4">
                <a :href="apiUrl+'print-detail-payment/'+payOnClick" target="_BLANK">
                  <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                    <i class="fa fa-print "></i> Print
                  </button>
                </a>
              </div>
            </div><hr style="margin-top: 2px; margin-bottom: 7px;">
            <table border="1" style="border-color: #DCDCDC;" class="mb-3">
              <tbody>
                <tr>
                  <td style="background-color: #F0F8FF; font-weight: bold; width: 150px; font-size: 12px;">Invoice No</td>
                  <td colspan="3" style="font-size: 12px;" v-if="tableDetPay.data.length != 0">{{ tableDetPay.data[0].invoice_no }}</td>
                  <td style="display: none"></td>
                </tr>
                <tr>
                  <td style="background-color: #F0F8FF; font-weight: bold; width: 150px; font-size: 12px;">Pay No</td>
                  <td style="font-size: 12px;" v-if="tableDetPay.data.length != 0"> {{ tableDetPay.data[0].pay_no }} </td>
                  <td style="background-color: #F0F8FF; font-weight: bold; width: 150px; font-size: 12px;">Status</td>
                  <td style="font-size: 12px;" v-if="tableDetPay.data.length != 0">
                    <label class="badge badge-success" v-if="tableDetPay.data[0].pay_status == 'Paid'">{{ tableDetPay.data[0].pay_status }}</label>
                    <label class="badge badge-danger" v-if="tableDetPay.data[0].pay_status == 'Partially Paid'">{{ tableDetPay.data[0].pay_status }}</label> 
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #F0F8FF; font-weight: bold; width: 150px; font-size: 12px;">Job Number</td>
                  <td style="font-size: 12px;" v-if="tableDetPay.data.length != 0"> {{ tableDetPay.data[0].job_no }} </td>
                  <td style="background-color: #F0F8FF; font-weight: bold; width: 150px; font-size: 12px;">PO Number</td>
                  <td style="font-size: 12px;" v-if="tableDetPay.data.length != 0"> {{ tableDetPay.data[0].po_no }} </td>
                </tr>
                <tr>
                  <td style="background-color: #F0F8FF; font-weight: bold; width: 150px; font-size: 12px;">Client</td>
                  <td style="font-size: 12px;" v-if="tableDetPay.data.length != 0"> {{ tableDetPay.data[0].client_name }} </td>
                  <td style="background-color: #F0F8FF; font-weight: bold; width: 150px; font-size: 12px;">Production Class</td>
                  <td style="font-size: 12px;" v-if="tableDetPay.data.length != 0"> {{ tableDetPay.data[0].prod_class }} </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" class="btn btn-sm btn-info btn-fill float-right mr-2 mb-2" @click="createDetPay()">Add New</button>
            <table class="table">
              <thead>
                <slot name="columns" class="text-center">
                  <tr style="background-color: #F0F8FF;" class="text-center">
                    <th>NO</th>
                    <th>REF NO</th>
                    <th>DPP</th>
                    <th>PPN</th>
                    <th>POTONGAN PPH</th>
                    <th>POTONGAN ADMIN</th>
                    <th>PAY DATE</th>
                    <th></th>
                    <th></th>
                    <th style="display: none"></th>
                  </tr>
                </slot>
              </thead>
              <tbody>
                <tr v-for="(row, i) in tableDetPay.data" :key="i">
                  <td style="font-size: 13px;">{{ i + 1 }}</td>
                  <td style="font-size: 13px;">
                    <label class="badge badge-info">{{row.pay_no}}</label>
                  </td>
                  <td style="font-size: 13px;">{{ convertRp(row.dpp) }}</td>
                  <td style="font-size: 13px;">{{ convertRp(row.ppn) }}</td>
                  <td style="font-size: 13px;">{{ convertRp(row.potongan_pph) }}</td>
                  <td style="font-size: 13px;">{{ convertRp(row.potongan_admin_bank) }}</td>
                  <td style="font-size: 13px;">{{ moment(row.pay_date).locale('id').format('L') }}</td>
                  <td>
                    <i class="fa fa-edit" aria-hidden="true" style="cursor: pointer;" @click="edit(row.id)" title="Edit"></i>
                  </td>
                  <td>
                    <i class="fa fa-trash-o" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="remove(row.id)"></i>
                  </td>
                  <td style="display: none" ></td>
                </tr>
              </tbody>
            </table><hr>
            <div class="float-right">
              <p style="padding-right: 15px;">Total Invoice &nbsp;&nbsp;&nbsp; :&nbsp; {{ convertRp(subTotalInv) }}</p>
              <p style="padding-right: 15px; margin-top: -10px; border-bottom: 10px black; ">Total Payment &nbsp;:&nbsp;<span style="border-bottom: 3px double; margin-bottom: 50px;"> {{ convertRp(subTotalPay) }} </span> <span style="margin-bottom: -70px; margin-right: 30px;"> - </span></p>
              <p style="padding-right: 15px; margin-top: 10px; border-bottom: 10px black; font-weight: bold;">Sisa Bayar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; <span style="color: red">{{ convertRp((subTotalInv - subTotalPay)) }}</span></p>
            </div>
        </div>
        </modal-lg>

        <!-- MODAL CREATE -->
        <div>
           <modal :show.sync="form.show" :z-index="10000">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
             </template>
             <div>
              <div class="form-group">
                <label>Invoice No</label><br>
                <autocomplete
                  ref="autocomplete"
                  :url="apiUrl+'invoice/find-invoice-no'"
                  :customHeaders="{ Authorization: tokenApi }"
                  anchor="invoice_no"
                  label="invoice_amount"
                  :on-select="getData"
                  placeholder="Choose Invoice No"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <base-input type="text"
                    label="Pay No"
                    placeholder="Pay No"
                    v-model="paymentData.pay_no">
              </base-input>
              <base-input type="number"
                    label="DPP"
                    placeholder="DPP"
                    v-model="paymentData.dpp">
              </base-input>
              <base-input type="number"
                    label="PPN"
                    placeholder="PPN"
                    v-model="paymentData.ppn">
              </base-input>
              <base-input type="number"
                    label="Potongan PPH"
                    placeholder="Potongan PPH"
                    v-model="paymentData.potongan_pph">
              </base-input>
              <base-input type="number"
                    label="Potongan Admin Bank"
                    placeholder="Potongan Admin Bank"
                    v-model="paymentData.potongan_admin_bank">
              </base-input>
              <!-- <div class="form-group">
                <label>Status</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="paymentData.pay_status">
                  <option selected>Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Partially Paid">Partially Paid</option>
                </select>
              </div> -->
              <base-input type="date"
                    label="Pay Date"
                    placeholder="Pay Date"
                    v-model="paymentData.pay_date">
              </base-input>
             </div>
             <template slot="footer">
                <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="form.show = false">Close</button>
                <button type="primary" class="btn btn-sm btn-info btn-fill" @click="save()" :disabled="onLoading">
                    <span v-if="onLoading"><i class="fa fa-spinner fa-spin"></i> Please Wait...</span>
                    <span v-else>
                        <span>Save</span>
                    </span>
                </button>
             </template>
           </modal>
        </div>

        <!-- MODAL CREATE DET PAY -->
        <div>
           <modal :show.sync="formCreateDetPay.show" :z-index="10000">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{formCreateDetPay.title}}</h5>
             </template>
             <div>
              <base-input type="text"
                    label="Invoice No"
                    placeholder="Invoice No"
                    disabled
                    v-model="paymentData.invoice_no">
              </base-input>
              <base-input type="text"
                    label="Pay No"
                    placeholder="Pay No"
                    disabled
                    v-model="paymentData.pay_no">
              </base-input>
              <base-input type="number"
                    label="DPP"
                    placeholder="DPP"
                    v-model="paymentData.dpp">
              </base-input>
              <base-input type="number"
                    label="PPN"
                    placeholder="PPN"
                    v-model="paymentData.ppn">
              </base-input>
              <base-input type="number"
                    label="Potongan PPH"
                    placeholder="Potongan PPH"
                    v-model="paymentData.potongan_pph">
              </base-input>
              <base-input type="number"
                    label="Potongan Admin Bank"
                    placeholder="Potongan Admin Bank"
                    v-model="paymentData.potongan_admin_bank">
              </base-input>
              <base-input type="date"
                    label="Pay Date"
                    placeholder="Pay Date"
                    v-model="paymentData.pay_date">
              </base-input>
             </div>
             <template slot="footer">
                <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="formCreateDetPay.show = false">Close</button>
                <button type="primary" class="btn btn-sm btn-info btn-fill" @click="save()" :disabled="onLoading">
                    <span v-if="onLoading"><i class="fa fa-spinner fa-spin"></i> Please Wait...</span>
                    <span v-else>
                        <span>Save</span>
                    </span>
                </button>
             </template>
           </modal>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  // import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import ModalLg from '@/components/ModalLg.vue'
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import payment from '@/services/payment.service';
  import Autocomplete from 'vue2-autocomplete-js'
  require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  var moment = require('moment');
  import LineChart from '../LineChart.js'
  import StatsCard from '@/components/Cards/StatsCard.vue'
  
  export default {
    components: {
      // Card,
      Modal,
      ModalLg,
      Autocomplete,
      flatPicker,
      LineChart,
      StatsCard,
    },
    data () {
      return {
        moment:moment,
        pagination: {
          page_count: '',
          default: 1,
          page: '',
        },
        onLoading: false,
        table: {
          data: []
        },
        tableDetPay: {
          data: []
        },
        tableAkumulasiClient: {
          data: []
        },
        form: {
            add: true,
            title: "Add Data",
            show: false
        },
        formFilter: {
          add: true,
          title: "Filter",
          show: false
        },
        formImport: {
            add: true,
            title: "Import Invoice",
            show: false
        },
        formDetPay: {
            add: true,
            title: "Detail Payment",
            show: false
        },
        formCreateDetPay: {
            add: true,
            title: "Detail Payment",
            show: false
        },
        totalPay: '',
        paymentData: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: {
          job_no: '',
          po_no: '',
          client_name: '',
          prod_class: '',
          invoice_no: '',
          pay_no: '',
          pay_status: '',
          pay_date: '',
        },
        apiUrl :config.apiUrl,
        tokenApi : '',

        payOnClick: '',
        subTotalInv : '',
        subTotalPay : '',

        datacollection: null,

      }
    },
    mounted(){
      this.get();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, payment.index({job_no: context.search.job_no, po_no: context.search.po_no, client_name: context.search.client_name, prod_class: context.search.prod_class, invoice_no: context.search.invoice_no, pay_no: context.search.pay_no, invoice_qty: context.search.invoice_qty, pay_date: context.search.pay_date, pay_status: context.search.pay_status, page: context.pagination.page})).onSuccess(function(response) {    
            context.table.data = response.data.data.data.data;
            context.totalPay   = response.data.data.totalPay;

            context.tableAkumulasiClient.data  = response.data.data.totalAkumulasi;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        }).onFinish(function() {  
            context.fillData()
        })
        .call()
      },
      filter() {
        this.formFilter.add   = true;
        this.formFilter.show  = true;
        this.formFilter.title = "Filter";
        this.pagination.page  = 1 ;
      },
      create() {
          this.form.add    = true;
          this.form.show   = true;
          this.form.title  = "Add Data";
          this.paymentData = {}
          this.defaultDate()
          this.$refs.autocomplete.clearInput()
          this.onLoading   = false
      },
      edit(id) {
        let context = this;               
        Api(context, payment.show(id)).onSuccess(function(response) {
            context.paymentData = response.data.data[0];
            context.form.show   = true;
            context.form.title  = 'Edit Data';
            context.$refs.autocomplete.setValue(response.data.data[0].invoice_no)                 
        })
        .call()        
      },
      modalImport(){
        this.formImport.add   = true;
        this.formImport.show  = true;
        this.formImport.title = "Import Invoice";
      },
      filesChange(e) {
          this.dataImport = e.target.files[0];
      },
      importData(){
        let api = null;
        let context = this;
        let formData = new FormData();
        this.onLoading = true;

        if (this.dataImport != undefined) {
          formData.append('import_data', this.dataImport);
        }else{
          return alert('File Import Not Found')
        }

        api = Api(context, payment.import(formData));
        api.onSuccess(function(response) {
            context.onLoading = false;
            context.get();
            context.formImport.show = false;
            context.notifyVue('Data Berhasil di Import', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue('Data Gagal di Import' , 'top', 'right', 'danger')
            context.onLoading = false;
        }).onFinish(function() {  
        })
        .call();
      },
      save(){
        let api = null;
        let context = this;
        let formData = new FormData();
        this.onLoading = true;

        if (this.paymentData.invoice_no != undefined && this.paymentData.pay_no != undefined && this.paymentData.pay_date != undefined) {
          formData.append('invoice_no', this.paymentData.invoice_no);
          formData.append('pay_no', this.paymentData.pay_no);
          formData.append('dpp', (this.paymentData.dpp == undefined) ? '' : this.paymentData.dpp);
          formData.append('ppn', (this.paymentData.ppn == undefined) ? '' : this.paymentData.ppn);
          formData.append('potongan_pph', (this.paymentData.potongan_pph == undefined) ? '' : this.paymentData.potongan_pph);
          formData.append('potongan_admin_bank', (this.paymentData.potongan_admin_bank == undefined) ? '' : this.paymentData.potongan_admin_bank);
          formData.append('pay_date', this.paymentData.pay_date);
        }else{
          context.onLoading = false
          return alert('Invoice No, Pay No, Pay Date, Wajib Di Isi')
        }

        if (context.form.title == 'Add Data' || context.formCreateDetPay.title == 'Create On Detail Payment') {
            api = Api(context, payment.create(formData));
        } else {
            api = Api(context, payment.update(this.paymentData.id, formData));
        }
        api.onSuccess(function(response) {
            context.get();
            context.getDetailPay();
            context.form.show = false;
            context.formCreateDetPay.show = false;
            context.notifyVue((context.formTitle === 'Add Data') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.formTitle === 'Add Data') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {  
            context.onLoading = false
        })
        .call();
      },
      remove(id) {
          var r = confirm("Anda yakin ingin menghapus data ini ?");
          if (r == true) {
            let context = this;

            Api(context, payment.delete(id)).onSuccess(function(response) {
                context.get();
                context.getDetailPay();
                context.notifyVue('Data Berhasil di Hapus', 'top', 'right', 'info')
            }).call();
          }
      },
      detailPay(pay_no) {
        this.formDetPay.add   = true;
        this.formDetPay.show  = true;
        this.formDetPay.title = "Detail Payment";
        this.payOnClick = pay_no;
        this.getDetailPay(pay_no);
      },
      createDetPay() {
        this.formCreateDetPay.add   = true;
        this.formCreateDetPay.show  = true;
        this.formCreateDetPay.title = "Create On Detail Payment";
        this.defaultDate()
      },
      getDetailPay(){
        let context = this;               
        Api(context, payment.detailPayment(context.payOnClick)).onSuccess(function(response) {    
            context.tableDetPay.data = response.data.data.data;
            context.subTotalInv      = response.data.data.subTotalInv;
            context.subTotalPay      = response.data.data.subTotalPay;

            context.paymentData.invoice_no = response.data.data.data[0].invoice_no;
            context.paymentData.pay_no     = response.data.data.data[0].pay_no;
        }).onFinish(function() {  
        })
        .call()
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
      fillData () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        var color;

        this.datacollection = {
          labels: this.tableAkumulasiClient.data.map(item => item.client_name),
          datasets: [
            {
              label: '',
              backgroundColor: this.tableAkumulasiClient.data.map(item => '#' + Math.random().toString(16).substr(-6)),
              data: this.tableAkumulasiClient.data.map(item => item.total_payment)
            }
          ],
        }
      },
      changePage(page){
        this.pagination.page = page;
        this.get();
      },
      defaultDate(){
        var date  = new Date();
        var day   = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var today = date.getFullYear() + "-" + (month) + "-" + (day);

        this.paymentData.pay_date = today
      },

      // ================= Autocomplete ============
      // AMBIL DATA YANG DI PILIH AC
      getData(obj){
        this.$forceUpdate();
        this.paymentData.invoice_no = obj.invoice_no;
        this.paymentData.dpp        = obj.invoice_amount;
        this.paymentData.ppn        = ((obj.ppn == 1) ? (obj.invoice_amount * 0.11) : 0).toFixed(0) ;
      },
      getDataFilter(obj){
        this.search.invoice_no = obj.invoice_no;
      },
      getDataFilterJo(obj){
        this.search.job_no = obj.job_no;
      },
      getDataFilterClient(obj){
        this.search.client_name = obj.client_name;
      },
      // AMBIL DATA DARI API AC
      processJSON(json) {
        return json.data
      },
    }
  }
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
