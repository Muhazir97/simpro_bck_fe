<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= JOB INFORMATION ===============================  -->
      <div class="text-center display-4">
        <span style="margin-bottom: -20px; font-weight: bold;">DETAIL JOB ORDER</span>
        <a v-if="role != 'Visitor'" :href="apiUrl+'print-job-order/'+jobRequestData.job_no" target="_BLANK">
          <button type="submit" class="btn btn-sm btn-success btn-fill float-right">
            <i class="fa fa-file-text"></i> Print
          </button>
        </a>
        <hr style="margin-top: 50px;">
      </div>
      <div class="row">
        <div class="col-6">
          <h4 slot="header" class="card-title">Job Information</h4>
        </div>
        <div class="col-6 mb-3">
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-sm table-bordered">
            <tbody>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Job Name</td>
                    <td colspan="3">{{ jobRequestData.job_name }}</td>
                    <td style="display: none"></td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Job Number</td>
                    <td>{{ jobRequestData.job_no }}</td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Production Class</td>
                    <td>{{ jobRequestData.prod_class }}</td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Client</td>
                    <td>{{ jobRequestData.client_name }}</td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">PO Number</td>
                    <td>{{ jobRequestData.po_no }}</td>
                </tr>
                <tr>
                  <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Weight</td>
                  <td>{{ convertRp(jobRequestData.weight) }}</td>
                  <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Rate /KG</td>
                  <td>{{ convertRp(jobRequestData.rate) }}</td>
                </tr>
                <tr>
                  <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Created By</td>
                  <td>{{ jobRequestData.created_by }}</td>
                  <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Created At</td>
                  <td>{{ jobRequestData.created_at }}</td>
                </tr>
                <!-- <tr>
                  <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Job Description</td>
                  <td colspan="3">{{ jobRequestData.job_description }}</td>
                  <td style="display: none"></td>
                </tr> -->
            </tbody>
        </table>
      </div>

      <!-- ========================= MATERIAL ===============================  -->
      <!-- <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover">
            <template slot="header">
              <div class="row">
                <div class="col-4">
                  <h4 class="card-title">Material</h4>
                </div>
                <div class="col-4">
                </div>
                <div class="col-4">
                  <button type="submit" class="btn btn-sm btn-dark btn-fill float-right" @click="addMaterial()">
                    Add New
                  </button>
                </div>
              </div>
            </template>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <slot name="columns">
                    <tr style="background-color: #F0F8FF;">
                      <th>Coil No</th>
                      <th>Thick</th>
                      <th>Width</th>
                      <th>Weight</th>
                      <th>Spec</th>
                      <th>Information</th>
                      <th></th>
                      <th style="display: none" ></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in tableMatReq.data" :key="i">
                    <td style="font-size: 13px;">{{row.coil_no}}</td>
                    <td style="font-size: 13px;">{{row.dimension_thick}}</td>
                    <td style="font-size: 13px;">{{row.dimension_width}}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.dimension_weight) }}</td>
                    <td style="font-size: 13px;">{{row.dimension_spec}}</td>
                    <td style="font-size: 13px;">{{row.information}}</td>
                    <td>
                      <i class="fa fa-times-circle" aria-hidden="true" title="Delete" style="cursor: pointer;" @click="saveMaterial('delete', row.id, row.coil_no, row.dimension_thick, row.dimension_width, row.dimension_weight, row.dimension_spec, row.information)" v-if="jobRequestData.job_status == 'Draft'"></i>
                    </td>
                    <td style="display: none" ></td>
                  </tr>
                  <tr>
                    <td colspan="3" style="font-size: 13px; font-weight: bold;">TOTAL</td>
                    <td style="font-size: 13px; font-weight: bold;" colspan="5">{{ convertRp(totalWeight) }}</td>
                    <td style="display: none" ></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div> -->

      <div class="mt-5 py-5 border-top text-center">
        <tabs fill class="flex-column flex-md-row">
            <card shadow>
                <!-- ================= MATERIAL ============== -->
                <tab-pane key="pembelian">
                  <template slot="title">
                      <i class="ni ni-box-2 mr-2"></i>Material
                  </template>
                  <div class="row">
                    <div class="col-4">
                      <h5 class="card-title float-left">Material</h5>
                    </div>
                    <div class="col-4">
                    </div>
                    <div class="col-4">
                      <button v-if="role != 'Visitor'" type="submit" class="btn btn-sm btn-dark btn-fill float-right" @click="addMaterial()">
                        Add New
                      </button>
                    </div>
                  </div>
                  <div class="table-responsive">
                      <table class="table">
                        <thead style="font-size: 13px;">
                          <slot name="columns">
                            <tr style="background-color: #F0F8FF;">
                              <th>No</th>
                              <th>Coil No</th>
                              <th>Thick</th>
                              <th>Width</th>
                              <th>Weight</th>
                              <th>Spec</th>
                              <th>Information</th>
                              <th></th>
                              <th style="display: none" ></th>
                            </tr>
                          </slot>
                        </thead>
                        <tbody>
                          <tr v-for="(row, i) in tableMatReq.data" :key="i">
                            <td style="font-size: 13px;">{{ i + 1 }}</td>
                            <template v-if="jobRequestData.prod_class == 'Slitting' || jobRequestData.prod_class == 'Shearing'">
                              <td style="font-size: 13px;">{{row.coil_no}}</td>
                              <td style="font-size: 13px;">{{row.dimension_thick}}</td>
                              <td style="font-size: 13px;">{{row.dimension_width}}</td>
                              <td style="font-size: 13px;">{{ convertRp(row.dimension_weight) }}</td>
                              <td style="font-size: 13px;">{{row.dimension_spec}}</td>
                              <td style="font-size: 13px;">{{row.information}}</td>
                              <td>
                                <i class="fa fa-times-circle" aria-hidden="true" title="Delete" style="cursor: pointer;" @click="saveMaterial('delete', row.id, row.coil_no, row.dimension_thick, row.dimension_width, row.dimension_weight, row.dimension_spec, row.information)" v-if="jobRequestData.job_status == 'Draft'"></i>
                              </td>
                            </template>
                            <template v-else>
                              <td style="font-size: 13px;">{{row.coil_no }} {{ row.pack }}</td>
                              <td style="font-size: 13px;">{{row.thick}}</td>
                              <td style="font-size: 13px;">{{row.width}}</td>
                              <td style="font-size: 13px;">{{ convertRp(row.weight) }}</td>
                              <td style="font-size: 13px;">{{row.dimension_spec}}</td>
                              <td style="font-size: 13px;">{{row.information}}</td>
                            </template>
                            <td style="display: none" ></td>
                          </tr>
                          <tr>
                            <td colspan="4" style="font-size: 13px; font-weight: bold;">TOTAL</td>
                            <td style="font-size: 13px; font-weight: bold;">{{ convertRp(totalWeight) }}</td>
                            <td colspan="3"></td>
                            <td style="display: none" ></td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                </tab-pane>

                <!-- ==================== PRODUKSI ==================== -->
                <tab-pane key="barang">
                    <template slot="title">
                        <i class="ni ni-settings-gear-65 mr-2"></i>Produksi
                    </template>
                    <div class="row">
                      <div class="col-4">
                        <h5 class="card-title float-left">Produksi</h5>
                      </div>
                      <div class="col-4">
                      </div>
                      <div class="col-4">
                        <!-- <button type="submit" class="btn btn-sm btn-success btn-fill float-right" @click="addMaterial()">
                          <i class="fa fa-file-text"></i> Print
                        </button> -->
                      </div>
                    </div>
                    <div class="table-responsive">
                      <template v-if="jobRequestData.prod_class == 'Slitting'">
                        <table class="table">
                          <thead style="font-size: 13px;">
                            <slot name="columns">
                              <tr style="background-color: #F0F8FF;">
                                <th>No</th>
                                <th>SJ No</th>
                                <th>Slitting Date</th>
                                <th>Program</th>
                                <th>Coil No</th>
                                <th>Pack</th>
                                <th>Thick</th>
                                <th>Width</th>
                                <th>Weight</th>
                                <th v-if="role != 'Visitor'">Scrap</th>
                                <th>Remark</th>
                                <th style="display: none" ></th>
                              </tr>
                            </slot>
                          </thead>
                          <tbody>
                            <tr v-for="(row, i) in tableDataProd.data" :key="i">
                              <td style="font-size: 15px;">{{ i + 1 }}</td>
                              <td style="font-size: 15px;">
                                <label class="badge badge-primary">{{row.travel_latter_no}}</label>
                              </td>
                              <td style="font-size: 15px;">{{ moment(row.slitting_date).locale('id').format('L') }}</td>
                              <td style="font-size: 15px;">
                                <div v-if="role != 'Visitor'">
                                  <router-link :to="/detail-lap-prod-slit/+row.process_program">
                                    <label style="cursor: pointer;" class="badge badge-info">{{row.process_program}}</label>
                                  </router-link>
                                </div>
                                <div v-if="role == 'Visitor'">
                                  <label class="badge badge-info">{{row.process_program}}</label>
                                </div>
                              </td>
                              <td style="font-size: 15px;">
                                <label class="badge badge-danger">{{row.coil_no}}</label>
                              </td>
                              <td style="font-size: 15px;">{{row.pack}}</td>
                              <td style="font-size: 15px;">{{row.thick}}</td>
                              <td style="font-size: 15px;">{{ convertRp(row.width) }}</td>
                              <td style="font-size: 15px;">{{ convertRp(row.weight) }}</td>
                              <td style="font-size: 15px;" v-if="role != 'Visitor'">{{row.scrap_all}}</td>
                              <td style="font-size: 15px;">{{row.remark_all}}</td>
                              <td style="display: none" ></td>
                            </tr>
                            <tr>
                              <td colspan="8" style="font-size: 13px; font-weight: bold;">TOTAL</td>
                              <td style="font-size: 13px; font-weight: bold;">{{ convertRp(totalWeightProd) }}</td>
                              <td style="font-size: 13px; font-weight: bold;">{{ convertRp(totalWeightScrap) }}</td>
                              <td colspan="3"></td>
                              <td style="display: none" ></td>
                            </tr>
                          </tbody>
                        </table>
                      </template>

                      <template v-if="jobRequestData.prod_class == 'Tolling'">
                        <!-- RESUME PIPA -->
                        <p class="font-weight-bold">Resume Pipa</p>
                        <table class="table">
                          <thead style="font-size: 13px;">
                            <slot name="columns">
                              <tr style="background-color: #F0F8FF;">
                                <th>No</th>
                                <th>SIZE</th>
                                <th>Qty Pipa Prime</th>
                                <!-- <th>Qty Pipa Non Prime</th> -->
                                <th>Weight Pipa Prime</th>
                                <!-- <th>Weight Pipa Non Prime</th> -->
                                <th style="display: none" ></th>
                              </tr>
                            </slot>
                          </thead>
                          <tbody>
                            <tr v-for="(row, i) in tableDataResumProd.data" :key="i">
                              <td style="font-size: 15px;">{{ i + 1 }}</td>
                              <td style="font-size: 15px;">{{ row.produksi_nd }} X {{ row.material_tebal }} mm X {{ row.length }} mm</td>
                              <td style="font-size: 15px;">{{ convertRp(row.qty_a - (+row.remark_b + +row.remark_c)) }}</td>
                              <!-- <td style="font-size: 15px;">{{ convertRp(+row.remark_b + +row.remark_c) }}</td> -->
                              <td style="font-size: 15px;">{{ convertRp(((row.prod_weight / row.qty_a) *  (row.qty_a - (+row.remark_b + +row.remark_c))).toFixed(0)) }}</td>
                              <!-- <td style="font-size: 15px;">{{ convertRp(((row.prod_weight / row.qty_a) *  (+row.remark_b + +row.remark_c)).toFixed(0)) }}</td> -->
                              <td style="display: none" ></td>
                            </tr>
                          </tbody>
                        </table><hr>
                        <!-- DETAIL PIPA -->
                        <p class="font-weight-bold">Detail Pipa</p>
                        <table class="table">
                          <thead style="font-size: 13px;">
                            <slot name="columns">
                              <tr style="background-color: #F0F8FF;">
                                <th>No</th>
                                <th>Date</th>
                                <th>OP No</th>
                                <th>Coil No</th>
                                <th>Coil Weight</th>
                                <th>Qty</th>
                                <th>Prod Weight</th>
                                <th>Remark B</th>
                                <th>Remark C</th>
                                <th style="display: none" ></th>
                              </tr>
                            </slot>
                          </thead>
                          <tbody>
                            <tr v-for="(row, i) in tableDataProd.data" :key="i">
                              <td style="font-size: 15px;">{{ i + 1 }}</td>
                              <td style="font-size: 15px;">
                                <div v-if="role != 'Visitor'">
                                  <label class="badge badge-info" style="cursor: pointer;">
                                    <router-link :to="/detail-report-tolling/+row.date"><span style="color: gray;">{{ moment(row.date).locale('id').format('L') }}</span></router-link>
                                  </label>
                                </div>
                                <div v-if="role == 'Visitor'">
                                  <label class="badge badge-info">
                                    <span style="color: gray;">{{ moment(row.date).locale('id').format('L') }}</span>
                                  </label>
                                </div>
                              </td>
                              <td style="font-size: 15px;">
                                <label class="badge badge-primary" @click="detailOP(row.op_no)">{{row.op_no}}</label>
                              </td>
                              <td>
                                <label class="badge badge-danger">{{row.coil_no }} {{ row.pack}}</label>
                              </td>
                              <td style="font-size: 15px;">{{ convertRp(row.weight) }}</td>
                              <td style="font-size: 15px;">{{ convertRp(row.qty) }}</td>
                              <td style="font-size: 15px;">{{ convertRp(row.prod_weight) }}</td>
                              <td style="font-size: 15px;">{{ convertRp(row.remark_b) }}</td>
                              <td style="font-size: 15px;">{{ convertRp(row.remark_c) }}</td>
                              <td style="display: none" ></td>
                            </tr>
                            <tr>
                              <td colspan="4" style="font-size: 13px; font-weight: bold;">TOTAL</td>
                              <td style="font-size: 13px; font-weight: bold;">{{ convertRp(totalWeightProd) }}</td>
                              <td style="font-size: 13px; font-weight: bold;">{{ convertRp(totalWeightScrap) }}</td>
                              <td colspan="3"></td>
                              <td style="display: none" ></td>
                            </tr>
                          </tbody>
                        </table>
                      </template>

                      <template v-if="jobRequestData.prod_class == 'Shearing'">
                        <table class="table">
                          <thead style="font-size: 13px;">
                            <slot name="columns">
                              <tr style="background-color: #F0F8FF;">
                                <th>No</th>
                                <th>Coil No</th>
                                <th>Input Pack</th>
                                <th>Input Thick</th>
                                <th>Input Width</th>
                                <th>Input Weight</th>
                                <th></th>
                                <th>Output Pack</th>
                                <th>Output Thick</th>
                                <th>Output Width</th>
                                <th>Output Length</th>
                                <th>Total Sheet</th>
                                <th>Output Weight</th>
                                <th>Remark</th>
                                <th>Date</th>
                                <th style="display: none" ></th>
                              </tr>
                            </slot>
                          </thead>
                          <tbody>
                            <tr v-for="(row, i) in tableDataProd.data" :key="i">
                              <td style="font-size: 13px;">{{ i + 1 }}</td>
                              <td style="font-size: 13px;">{{ row.coil_no }}</td>
                              <td style="font-size: 13px;">{{ row.input_pack }}</td>
                              <td style="font-size: 13px;">{{ row.input_thick }}</td>
                              <td style="font-size: 13px;">{{ row.input_width }}</td>
                              <td style="font-size: 13px;">{{ convertRp(row.input_weight) }}</td>
                              <td></td>
                              <td style="font-size: 13px;">{{ row.output_pack }}</td>
                              <td style="font-size: 13px;">{{ row.output_thick }}</td>
                              <td style="font-size: 13px;">{{ row.output_width }}</td>
                              <td style="font-size: 13px;">{{ row.output_length }}</td>
                              <td style="font-size: 13px;">{{ row.output_total_sheet }}</td>
                              <td style="font-size: 13px;">{{ convertRp(row.output_weight) }}</td>
                              <td style="font-size: 13px;">{{ row.remark }}</td>
                              <td style="font-size: 13px;">{{ moment(row.shearing_date).locale('id').format('L') }}</td>
                              <td style="display: none" ></td>
                            </tr>
                            <tr>
                              <td colspan="5" style="font-size: 13px; font-weight: bold;">TOTAL</td>
                              <td style="font-size: 13px; font-weight: bold;">{{ convertRp(totalWeightProd) }}</td>
                              <td colspan="6"></td>
                              <td style="font-size: 13px; font-weight: bold;">{{ convertRp(totalWeightScrap) }}</td>
                              <td colspan="2"></td>
                              <td style="display: none" ></td>
                            </tr>
                          </tbody>
                        </table>
                      </template>
                    </div>
                </tab-pane>

                <!-- ===================== DELIVERY ==================== -->
                <tab-pane key="pesanan">
                    <template slot="title">
                        <i class="ni ni-delivery-fast mr-2"></i>Delivery
                    </template>
                    <div class="row">
                      <div class="col-4">
                        <h5 class="card-title float-left">Delivery</h5>
                      </div>
                      <div class="col-4">
                      </div>
                      <div class="col-4">
                        <!-- <button type="submit" class="btn btn-sm btn-success btn-fill float-right" @click="addMaterial()">
                          <i class="fa fa-file-text"></i> Print
                        </button> -->
                      </div>
                    </div>
                    <div class="table-responsive">
                      <!-- <template v-if="jobRequestData.prod_class == 'Tolling'"> -->
                        <!-- RESUME PIPA -->
                        <!-- <p class="font-weight-bold">Resume Pipa Terkirim</p>
                        <table class="table">
                          <thead style="font-size: 13px;">
                            <slot name="columns">
                              <tr style="background-color: #F0F8FF;">
                                <th>No</th>
                                <th>Length</th>
                                <th>Qty Pipa Delivery</th>
                                <th>Weight Pipa Delivery</th>
                                <th style="display: none" ></th>
                              </tr>
                            </slot>
                          </thead>
                          <tbody>
                            <tr v-for="(row, i) in tableDataDelivPipe.data" :key="i">
                              <td style="font-size: 15px;">{{ i + 1 }}</td>
                              <td style="font-size: 15px;">{{ row.panjang }}</td>
                              <td style="font-size: 15px;">{{ convertRp(row.qty) }}</td>
                              <td style="font-size: 15px;">{{ convertRp(row.weight) }}</td>
                              <td style="display: none" ></td>
                            </tr>
                          </tbody>
                        </table><hr> -->
                      <!-- DETAIL DELIVERY -->
                      <!-- <p class="font-weight-bold">Detail Delivery</p>
                      </template> -->
                      <table class="table">
                        <thead style="font-size: 13px;">
                          <slot name="columns">
                            <tr style="background-color: #F0F8FF;">
                              <th>No</th>
                              <th>Surat Jalan No</th>
                              <th>Weight</th>
                              <th>Qty</th>
                              <th>Date</th>
                              <th style="display: none" ></th>
                            </tr>
                          </slot>
                        </thead>
                        <tbody>
                          <tr v-for="(row, i) in tableDataDeliv.data" :key="i">
                            <td style="font-size: 15px;">{{ i + 1 }}</td>
                            <td style="font-size: 15px;">
                              <div v-if="role != 'Visitor'">
                                <router-link :to="/detail-delivery/+row.packing_list_no">
                                  <label class="badge badge-info" style="cursor: pointer;">{{row.packing_list_no}}</label>
                                </router-link>
                              </div>
                              <div v-if="role == 'Visitor'">
                                <label class="badge badge-info">{{row.packing_list_no}}</label>
                              </div>
                            </td>
                            <td style="font-size: 15px;">{{convertRp(row.weight)}}</td>
                            <td style="font-size: 15px;">{{convertRp(row.qty)}}</td>
                            <td style="font-size: 15px;">{{moment(row.packing_date).locale('id').format('L')}}</td>
                            <td style="display: none" ></td>
                          </tr>
                          <tr>
                            <td colspan="2" style="font-size: 13px; font-weight: bold;">TOTAL</td>
                            <td style="font-size: 13px; font-weight: bold;">{{ convertRp(totalWeightDeliv) }}</td>
                            <td style="font-size: 13px; font-weight: bold;">{{ convertRp(totalQtyDeliv) }}</td>
                            <td colspan="3"></td>
                            <td style="display: none" ></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </tab-pane>

                <!-- ===================== Invoice ==================== -->
                <tab-pane key="pesanan">
                  <template slot="title">
                      <i class="ni ni-single-copy-04 mr-2"></i>Invoice
                  </template>
                  <div class="row">
                    <div class="col-4">
                      <h5 class="card-title float-left">Invoice</h5>
                    </div>
                    <div class="col-4">
                    </div>
                    <div class="col-4">
                      <!-- <button type="submit" class="btn btn-sm btn-success btn-fill float-right" @click="addMaterial()">
                        <i class="fa fa-file-text"></i> Print
                      </button> -->
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead style="font-size: 13px;">
                        <slot name="columns">
                          <tr style="background-color: #F0F8FF;">
                            <th>No</th>
                            <th>Invoice No</th>
                            <th>Date</th>
                            <th>Weight</th>
                            <th>Amount</th>
                            <th style="display: none" ></th>
                          </tr>
                        </slot>
                      </thead>
                      <tbody>
                        <tr v-for="(row, i) in tableDataInv.data" :key="i">
                          <td style="font-size: 15px;">{{ i + 1 }}</td>
                          <td style="font-size: 15px;">
                            <div v-if="role != 'Visitor'">
                              <router-link :to="/detail-invoice/+row.invoice_no">
                                <label class="badge badge-info" style="cursor: pointer;">{{row.invoice_no}}</label>
                              </router-link>
                            </div>
                            <div v-if="role == 'Visitor'">
                              <label class="badge badge-info">{{row.invoice_no}}</label>
                            </div>
                          </td>
                          <td style="font-size: 15px;">{{moment(row.invoice_date).locale('id').format('L')}}</td>
                          <td style="font-size: 15px;">{{convertRp(row.invoice_weight)}}</td>
                          <td style="font-size: 15px;">{{convertRp(row.invoice_amount)}}</td>
                          <td style="display: none" ></td>
                        </tr>
                        <tr>
                          <td colspan="3" style="font-size: 13px; font-weight: bold;">TOTAL</td>
                          <td style="font-size: 13px; font-weight: bold;">{{ convertRp(totalWeightInv) }}</td>
                          <td style="font-size: 13px; font-weight: bold;">{{ convertRp(totalAmountInv) }}</td>
                          <td style="display: none" ></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </tab-pane>
            </card>
        </tabs>
    </div>

      <!-- ========================= NOTE ===============================  -->
      <h4 class="card-title">Note</h4>
      <textarea rows="8" cols="120" 
                placeholder="Enter Message..." 
                style="border-radius: 10px; border: 1px solid #DCDCDC; color: #808080;"
                @change="updateJobNote(jobRequestData.job_no)"
                v-model="update_job_note"
                :disabled="role == 'Visitor'" 
                >
      </textarea>

      <!-- <div v-if="jobRequestData.job_status == 'Draft'" class="text-center mt-5">
        <button type="submit" class="btn btn-sm btn-primary btn-fill" @click="sendRequest('Process')" :disabled="(tableMatReq.data.length == 0)">
          <i class="fa fa-paper-plane" aria-hidden="true"></i> Process
        </button>
      </div> -->
      
      <!-- MODAL CREATE MATERIAL-->
      <div>
         <modal :show.sync="form.show">
           <template slot="header">
              <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
           </template>
           <div>
            <div class="scroll">
              <table class="table">
                <thead>
                  <slot name="columns">
                    <tr style="background-color: #F0F8FF;">
                      <th style="font-size: 13px;">Coil No</th>
                      <th style="font-size: 13px;">Thick</th>
                      <th style="font-size: 13px;">Width</th>
                      <th style="font-size: 13px;">Weight</th>
                      <th style="font-size: 13px;">Spec</th>
                      <th></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in tableMatMas.data" :key="i">
                    <td style="font-size: 13px;">{{row.coil_no}}</td>
                    <td style="font-size: 13px;">{{row.dimension_thick}}</td>
                    <td style="font-size: 13px;">{{row.dimension_width}}</td>
                    <td style="font-size: 13px;">
                      {{row.dimension_weight}}
                      <!-- <input style="border: 1px solid white; text-align: center;" v-model="row.dimension_weight" size="7"> -->
                    </td>
                    <td style="font-size: 13px;">{{row.dimension_spec}}</td>
                    <td>
                      <i class="fa fa-plus-square text-primary" aria-hidden="true" title="Add Material" style="cursor: pointer;" @click="saveMaterial('add', row.id, row.coil_no, row.dimension_thick, row.dimension_width, row.dimension_weight, row.dimension_spec, row.information)"></i>
                    </td>
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
  import jobRequest from '@/services/jobRequest.service';
  import Api from '@/helpers/api';
  import Autocomplete from 'vue2-autocomplete-js'
  require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
  import Tabs from "@/components/Tabs/Tabs.vue";
  import TabPane from "@/components/Tabs/TabPane.vue";
  var moment = require('moment');

  export default {
    components: {
      Card,
      Modal,
      Autocomplete,
      Tabs,
      TabPane,
    },
    data () {
      return {
        moment:moment,
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
        jobRequestData: {},
        tableMatReq: {
          data: []
        },
        tableMatMas: {
          data: []
        },
        tableDataResumProd: {
          data: []
        },
        tableDataProd: {
          data: []
        },
        tableDataDelivPipe: {
          data: []
        },
        tableDataDeliv: {
          data: []
        },
        tableDataInv: {
          data: []
        },
        attachRequest: {},
        update_job_note: '',
        apiUrl :config.apiUrl,
        storageUrl : config.storageUrl,
        tokenApi : '',
        role: '',

        material_code: '',
        totalWeight: '',
        totalWeightProd: '',
        totalWeightScrap: '',
        totalWeightDeliv: '',
        totalQtyDeliv: '',
        totalWeightInv: '',
        totalAmountInv: '',
      }
    },
    mounted(){
      this.getHeader();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
      this.role     = localStorage.getItem('role');
    },
    methods: {
      getHeader() {
        let context = this;               
        Api(context, jobRequest.showJob(context.$route.params.job_no)).onSuccess(function(response) {
            context.jobRequestData = response.data.data[0];
            context.update_job_note = response.data.data[0].job_note
        }).onFinish(function() {  
            context.getMaterialReq();
        })
        .call()        
      },
      getMatMas(){
        let context = this; 
        Api(context, jobRequest.getMatMas({client_name: context.jobRequestData.client_name})).onSuccess(function(response) {
            context.tableMatMas.data = response.data.data;             
        })
        .onError(function(error) {                    
            context.tableMatMas.data = []
        })
        .call() 
      },
      getMaterialReq() {
        let context = this;               
        Api(context, jobRequest.getMaterialReq({job_no: context.$route.params.job_no, prod_class: context.jobRequestData.prod_class})).onSuccess(function(response) {
            context.tableMatReq.data        = response.data.data.data;
            context.totalWeight             = response.data.data.totalWeight;
            context.tableDataResumProd.data = response.data.data.resumeProd;
            context.tableDataProd.data      = response.data.data.dataProd;
            context.totalWeightProd         = response.data.data.totalWeightProd;
            context.totalWeightScrap        = response.data.data.totalWeightScrap;
            context.tableDataDelivPipe.data = response.data.data.delivPipe;
            context.tableDataDeliv.data     = response.data.data.dataDelivery;
            context.totalWeightDeliv        = response.data.data.totalWeightDeliv;
            context.totalQtyDeliv           = response.data.data.totalQtyDeliv;
            context.tableDataInv.data       = response.data.data.dataInvoice;
            context.totalWeightInv          = response.data.data.totalWeightInv;
            context.totalAmountInv          = response.data.data.totalAmountInv;
            console.log(response.data.data.resumeProd)
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
          this.getMatMas();
      },
      saveMaterial(type, id, coil_no, mc_thick, mc_width, mc_weight, mc_spec, mc_information){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        if (this.jobRequestData.job_no != undefined) {
          if (type == 'add') {
            formData.append('job_no', this.jobRequestData.job_no);
            formData.append('po_no', this.jobRequestData.po_no);
            formData.append('coil_no', (coil_no == null) ? '' : coil_no);
            formData.append('mc_thick', (mc_thick == null) ? '' : mc_thick);
            formData.append('mc_width', (mc_width == null) ? '' : mc_width);
            formData.append('mc_weight', (mc_weight == null) ? '' : mc_weight);
            formData.append('mc_spec', (mc_spec == null) ? '' : mc_spec);
            formData.append('mc_information', (mc_information == null) ? '' : mc_information);
          }else if (type == 'delete') {
             formData.append('job_no', '');
              formData.append('po_no', '');
          }
          formData.append('type', type);
          formData.append('id', id);
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
            context.getMatMas();
        })
        .call();
      },
      updateJobNote(job_no){
        let api     = null;
        let context = this;

        api = Api(context, jobRequest.updateJobNote(job_no, {job_note : context.update_job_note}));
        api.onSuccess(function(response) {
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).onError(function(error) { 
            context.notifyVue('Gagal Update Keranjang', 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
      },

      sendRequest(data){
        let context = this;               
        Api(context, jobRequest.sendRequest({job_no: context.$route.params.job_no, status: data}))
        .onSuccess(function(response) { 
            context.notifyVue('Send Request Successfully', 'top', 'right', 'info')
            context.$router.push('/job-request/')              
        })
        .onError(function(error) {                    
            context.notifyVue('Send Request Failed' , 'top', 'right', 'danger')
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
