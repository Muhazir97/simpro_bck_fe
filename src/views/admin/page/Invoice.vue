<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <a :href="apiUrl+'report-excel/invoice?job_no='+search.job_no+'&po_no='+search.po_no+'&client_name='+search.client_name+'&prod_class='+search.prod_class+'&invoice_no='+search.invoice_no+'&invoice_weight='+search.invoice_weight+'&invoice_qty='+search.invoice_qty+'&date='+search.date+'&ppn_status='+search.ppn_status+''" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Export</a>
          <button class="btn btn-sm btn-success mb-4" @click="modalImport()"><i class="fa fa-upload fa-sm"></i> Import</button>

          <!-- CARD -->
          <card class="strpied-tabled-with-hover shadow"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <div class="row">
                <div class="col-6">
                  <h4 class="card-title">Invoice</h4>
                </div>
                <div class="col-2">
                  <select class="form-select form-control" aria-label="Default select example" v-model="search.ppn_status"  @change="get()">
                  <option selected>Select Status</option>
                  <option value="INCLUDE PPN">INCLUDE PPN</option>
                  <option value="NOT INCLUDE PPN">NOT INCLUDE PPN</option>
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
                  <slot name="columns">
                    <tr style="background-color: #F0F8FF;">
                      <th>JOB NO</th>
                      <th>PO NO</th>
                      <th>CLIENT</th>
                      <th>PROD CLASS</th>
                      <th>WEIGHT</th>
                      <th>RATE</th>
                      <th>AMOUNT</th>
                      <th>INVOICE NO</th>
                      <th>INVOICE DATE</th>
                      <th>INVOICE WEIGHT</th>
                      <th>INVOICE AMOUNT</th>
                      <th>STATUS</th>
                      <th></th>
                      <th></th>
                      <th style="display: none" ></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in table.data" :key="i">
                    <td style="font-size: 13px;">
                      <label class="badge badge-success">{{row.job_no}}</label>
                    </td>
                    <td style="font-size: 13px;">
                      <small><label class="badge badge-warning">{{row.po_no}}</label></small>
                    </td>
                    <td style="font-size: 13px;">{{row.client_name}}</td>
                    <td style="font-size: 13px;">{{row.prod_class}}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.qty) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.rate) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.amount) }}</td>
                    <td style="font-size: 13px;">
                      <router-link :to="/detail-invoice/+row.invoice_no">
                        <label class="badge badge-info" style="cursor: pointer;">{{row.invoice_no}}</label>
                      </router-link>
                    </td>
                    <td style="font-size: 13px;">{{ moment(row.invoice_date).locale('id').format('L') }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.invoice_weight) }}</td>
                    <td style="font-size: 13px;">{{ convertRp(row.invoice_amount) }}</td>
                    <td style="font-size: 13px;">
                      <label class="badge badge-light" v-if="((moment(moment(row.invoice_date).add(row.due_date, 'days')).format('DDMMYYYY')) < (moment(new Date()).format('DDMMYYYY')))">{{moment(moment(row.invoice_date).add(row.due_date, 'days')).format('DDMMYYYY')}} < {{moment(new Date()).format('DDMMYYYY')}}</label>

                      <label class="badge badge-danger" v-if="((moment(moment(row.invoice_date).add(row.due_date, 'days')).format('DDMMYYYY')) > (moment(new Date()).format('DDMMYYYY')))">{{moment(moment(row.invoice_date).add(row.due_date, 'days')).format('DDMMYYYY')}} > {{moment(new Date()).format('DDMMYYYY')}}</label>

                      <label class="badge badge-success" v-if="row.status == 'Paid'">{{ row.status }}</label>
                      <label class="badge badge-warning" v-if="row.status == 'Partially Paid'">{{ row.status }}</label>
                    </td>
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
              <div class="float-left">TOTAL : {{table.data.length}}, TOTAL WEIGHT : {{ convertRp(totalWeight) }} </div>
              <div class="float-right">
                <base-pagination :page-count="pagination.page_count" v-model="pagination.default" @input="changePage"></base-pagination>
              </div>
            </template>
          </card>

          <!-- =============================== CHART WEIGHT INVOICE ============================ -->
          <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-2">
                </div>
                <div class="col-8 text-center">
                  <h5 class="card-title font-weight-bold"><u>DIAGRAM WEIGHT INVOICE</u> </h5><br>
                  <!-- <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">Desember - 2022</h5><br> -->
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
          </card>

          <!-- TOTAL AKUMULASI PER CLIENT WEIGHT -->
          <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-2">
                </div>
                <div class="col-8 text-center">
                  <h5 class="card-title font-weight-bold">RKP WEIGHT INVOICE</h5><br>
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
                      <th style="font-size: 13px; text-align: center;">SLITTING</th>
                      <th style="font-size: 13px; text-align: center;">TOLLING PIPA</th>
                      <th style="font-size: 13px; text-align: center;">SHEARING</th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in tableAkumulasiClient.data" :key="i">
                    <td style="font-size: 13px; text-align: center;">{{ i + 1 }}</td>
                    <td style="font-size: 13px;">{{ row.client_name }}</td>
                    <td style="font-size: 13px; text-align: center;"> {{ convertRp(row.weight_slitting) }} </td>
                    <td style="font-size: 13px; text-align: center;"> {{ convertRp(row.weight_tolling) }} </td>
                    <td style="font-size: 13px; text-align: center;"> {{ convertRp(row.weight_shearing) }} </td>
                  </tr>
                  <tr>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;" colspan="2">TOTAL</td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;"> {{ convertRp(totalAkumulasiSlittingALL) }} </td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;"> {{ convertRp(totalAkumulasiTollingALL) }} </td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;"> {{ convertRp(totalAkumulasiShearinggALL) }} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>

          <!-- ============================= CHART AMOUNT INVOICE ============================== -->
          <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-2">
                </div>
                <div class="col-8 text-center">
                  <h5 class="card-title font-weight-bold"><u>DIAGRAM AMOUNT INVOICE</u> </h5><br>
                  <!-- <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">Desember - 2022</h5><br> -->
                </div>
                <div class="col-2">
                  <a :href="apiUrl+'print-rkp-amount-invoice?job_no='+search.job_no+'&po_no='+search.po_no+'&client_name='+search.client_name+'&prod_class='+search.prod_class+'&invoice_no='+search.invoice_no+'&invoice_weight='+search.invoice_weight+'&invoice_qty='+search.invoice_qty+'&date='+search.date+'&ppn_status='+search.ppn_status+''" target="_BLANK">
                    <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                      <i class="fa fa-print "></i> Print
                    </button>
                  </a>
                </div>
              </div>
            </template>
            <div class="container" >
              <line-chart :chart-data="datacollectionAmount" :width="300" :height="120"></line-chart>
            </div>
          </card>

          <!-- TOTAL AKUMULASI PER CLIENT AMOUNT -->
          <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-2">
                </div>
                <div class="col-8 text-center">
                  <h5 class="card-title font-weight-bold">RKP AMOUNT INVOICE</h5><br>
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
                      <th style="font-size: 13px; text-align: center;">SLITTING</th>
                      <th style="font-size: 13px; text-align: center;">TOLLING PIPA</th>
                      <th style="font-size: 13px; text-align: center;">SHEARING</th>
                      <th style="font-size: 13px; text-align: center;">TOTAL ALL</th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in tableAkumulasiAmountClient.data" :key="i">
                    <td style="font-size: 13px; text-align: center;">{{ i + 1 }}</td>
                    <td style="font-size: 13px;">{{ row.client_name }}</td>
                    <td style="font-size: 13px; text-align: center;"> {{ convertRp(row.weight_slitting) }} </td>
                    <td style="font-size: 13px; text-align: center;"> {{ convertRp(row.weight_tolling) }} </td>
                    <td style="font-size: 13px; text-align: center;"> {{ convertRp(row.weight_shearing) }} </td>
                    <td style="font-size: 13px; text-align: center;"> {{ convertRp( (+row.weight_slitting + +row.weight_tolling + +row.weight_shearing) ) }} </td>
                  </tr>
                  <tr>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;" colspan="2">TOTAL</td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;"> {{ convertRp(totalAkumulasiAmountSlittingALL) }} </td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;"> {{ convertRp(totalAkumulasiAmountTollingALL) }} </td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;"> {{ convertRp(totalAkumulasiAmountShearinggALL) }} </td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;"> {{ convertRp( (+totalAkumulasiAmountSlittingALL + +totalAkumulasiAmountTollingALL + +totalAkumulasiAmountShearinggALL) ) }} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>

          <!-- AKUMULASI TOLLING PRODUKSI PIPA -->
          <card class="strpied-tabled-with-hover shadow container-fluid" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <!-- <div class="col-2">
                </div> -->
                <div class="col-6 text-center mb-3">
                  <h5 class="card-title font-weight-bold">LAPORAN PRODUKSI PIPA</h5><br>
                  <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">BULAN {{ moment().set({'month': month - 1}).locale('id').format('MMMM').toUpperCase() }} {{ moment().set({'year': year}).format('Y') }}</h5><br>
                </div>
                <div class="col-2">
                  <select class="form-select form-control w-10" v-model="month" @change="getLPInv()">
                    <option selected>Month</option>
                    <option value="1">Januari</option>
                    <option value="2">Februari</option>
                    <option value="3">Maret</option>
                    <option value="4">April</option>
                    <option value="5">Mei</option>
                    <option value="6">Juni</option>
                    <option value="7">Juli</option>
                    <option value="8">Agustus</option>
                    <option value="9">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
                  </select>
                </div>
                <div class="col-2">
                  <select class="form-select form-control w-10" v-model="year" @change="getLPInv()">
                    <option selected>Year</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                 </div>
                 <div class="col-2">
                  <a :href="apiUrl+'print-month-lp-pipa?month='+Number(month)+'&year='+year+''" target="_BLANK">
                    <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                      <i class="fa fa-file-text"></i> Print
                    </button>
                  </a>
                  <button type="submit" class="btn btn-sm btn-secondary btn-fill float-right" @click="filterSumaryPipa()">Filter</button>
                </div>
              </div>
            </template>
            <!-- <div class="scroll"> -->
              <table border='1'>
                <thead>
                  <slot name="columns">
                    <tr style="background-color: #F0F8FF;">
                      <th rowspan="2" style="font-size: 13px; text-align: center;" width="4">NO</th>
                      <!-- <th rowspan="2" style="font-size: 13px; text-align: center;">INVOICE NO</th> -->
                      <th rowspan="2" style="font-size: 13px; text-align: center;">TANGGAL</th>
                      <th rowspan="2" style="font-size: 13px; text-align: center;">OP NO</th>
                      <th rowspan="2" style="font-size: 13px; text-align: center;">No. SURAT JALAN COIL</th>
                      <th rowspan="2" colspan="2" style="font-size: 13px; text-align: center;">SIZE</th>
                      <th rowspan="2" style="font-size: 13px; text-align: center;">COIL TERPAKAI (KG)</th>
                      <th colspan="2" style="font-size: 13px; text-align: center;">HASIL PRODUKSI</th>
                      <!-- <th rowspan="2" style="font-size: 13px; text-align: center;">YIELD</th> -->
                      <th rowspan="2" style="font-size: 13px; text-align: center;">PO NO</th>
                      <th rowspan="2" style="font-size: 13px; text-align: center;">COIL NO</th>
                      <th rowspan="2" style="font-size: 13px; text-align: center;">CUSTOMER</th>
                    </tr>
                    <tr>
                      <th style="font-size: 13px; text-align: center;">BTG</th>
                      <th style="font-size: 13px; text-align: center;">BERAT (KG)</th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in tableLPPipa.data" :key="i">
                    <td style="font-size: 13px; text-align: center;">{{ i + 1 }}</td>
                    <!-- <td style="font-size: 13px; text-align: center;">{{ row.invoice_no }}</td> -->
                    <td style="font-size: 13px; text-align: center;">{{ moment(row.created_at).locale('id').format('L') }}</td>
                    <td style="font-size: 13px; text-align: center; white-space: nowrap;">{{ row.op_no }}</td>
                    <td style="font-size: 13px; text-align: center;">{{ row.surat_jalan_coil }}</td>
                    <td style="font-size: 13px; text-align: center;">{{ row.produksi_odia }}</td>
                    <td style="font-size: 13px; text-align: center; white-space: nowrap;">{{ row.produksi_nd }} x {{ row.produksi_tebal }} x {{ row.length }}</td>
                    <td style="font-size: 13px; text-align: center;">
                      <!-- jika i sama dengan 0 -->
                      <div v-if="i == 0">
                        {{ convertRp(row.material_berat_total) }}
                      </div>
                      <!-- jika i bukan sama dengan 0 -->
                      <div v-else>
                        <!-- jika coil no sekarang dan sebelumnya sama -->
                        <div v-if="row.op_no == tableLPPipa.data[i - 1].op_no">
                          <!-- jika i sama dengan 0 -->
                          <div v-if="i == 0">
                            {{ convertRp(row.material_berat_total) }}
                          </div>
                          <!-- jika i bukan sama dengan 0 -->
                          <div v-else>
                          </div>
                        </div>
                        <!-- jika coil no sekarang dan sebelumnya tidak sama -->
                        <div v-else>
                          {{ convertRp(row.material_berat_total) }}
                        </div>
                      </div>
                    </td>
                    <td style="font-size: 13px; text-align: center;">{{ convertRp(row.total_btg_count) }}</td>
                    <td style="font-size: 13px; text-align: center;">{{ convertRp(row.total_coil_terpakai_count) }}</td>
                    <!-- <td style="font-size: 13px; text-align: center;">
                      {{ (((row.total_berat_produksi_count / row.total_btg_count) *  (row.total_btg_count - (+row.remark_b + +row.remark_c))) / row.total_coil_terpakai_count * 100).toFixed(2) }} %
                    </td> -->
                    <td style="font-size: 13px; text-align: center;">{{ row.po_no }}</td>
                    <td style="font-size: 13px; text-align: center;">{{ row.coil_no }}</td>
                    <td style="font-size: 13px; text-align: center;">{{ row.client_name }}</td>
                  </tr>
                  <tr style="background-color: #F0F8FF;">
                    <td colspan="6" style="font-size: 13px; text-align: center; font-weight: bold;">TOTAL</td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalCoilTerpakaiAll) }}</td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalBtgAll) }}</td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalBeratProduksiAll) }}</td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;"></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            <!-- </div> -->
          </card>

        </div>

        <!-- MODAL CREATE -->
        <div>
           <modal :show.sync="form.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
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
                  :on-select="getData"
                  placeholder="Choose Job No"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <base-input type="text"
                    label="Invoice No"
                    placeholder="Invoice No"
                    v-model="invoiceData.invoice_no">
              </base-input>
              <base-input type="date"
                    label="Invoice Date"
                    placeholder="Invoice Date"
                    v-model="invoiceData.invoice_date">
              </base-input>
              <!-- <base-input type="number"
                    label="Invoice Weight"
                    placeholder="Invoice Weight"
                    v-model="invoiceData.invoice_weight">
              </base-input>
              <base-input type="number"
                    label="Invoice Qty"
                    placeholder="Invoice Qty"
                    v-model="invoiceData.invoice_qty">
              </base-input> -->
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
                  :on-select="getDataFilter"
                  placeholder="Choose Job No"
                  :min="3"
                  :process="processJSON"
                  :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
                  >
                </autocomplete>
              </div>
              <base-input type="text"
                    label="Po Number"
                    placeholder="Po Number"
                    v-model="search.po_no">
              </base-input>
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
              <small class="d-block text-uppercase font-weight-bold mb-3">Date range</small>
              <div class="input-daterange datepicker row align-items-center">
                  <div class="col">
                      <base-input addon-left-icon="ni ni-calendar-grid-58">
                          <flat-picker slot-scope="{focus, blur}"
                                       @on-open="focus"
                                       @on-close="blur"
                                       :config="{allowInput: true, mode: 'range',}"
                                       class="form-control datepicker"
                                       v-model="search.date">
                          </flat-picker>
                      </base-input>
                  </div>
              </div>
              <!-- <base-input type="number"
                    label="Invoice Weight"
                    placeholder="Invoice Weight"
                    v-model="search.invoice_weight">
              </base-input>
              <base-input type="number"
                    label="Invoice Qty"
                    placeholder="Invoice Qty"
                    v-model="search.invoice_qty">
              </base-input> -->
              <div class="form-group">
                <label>Status PPN</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.ppn_status">
                  <option selected>Select Status</option>
                  <option value="INCLUDE PPN">INCLUDE PPN</option>
                  <option value="NOT INCLUDE PPN">NOT INCLUDE PPN</option>
                </select>
              </div>

             </div>
             <template slot="footer">
                 <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="formFilter.show = false">Close</button>
                 <button type="primary" class="btn btn-sm btn-info btn-fill" @click="get(), formFilter.show = false">Filter</button>
             </template>
           </modal>
        </div>

        <!-- MODAL FILTER SUMARY PIPA -->
        <div>
           <modal :show.sync="formFilterSummaryPipa.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{formFilterSummaryPipa.title}}</h5>
             </template>
             <div>
              <div class="form-group">
                <small class="d-block text-uppercase font-weight-bold mb-3">Date range</small>
                <div class="input-daterange datepicker row align-items-center">
                    <div class="col">
                        <base-input addon-left-icon="ni ni-calendar-grid-58">
                            <flat-picker slot-scope="{focus, blur}"
                                         @on-open="focus"
                                         @on-close="blur"
                                         :config="{allowInput: true, mode: 'range',}"
                                         class="form-control datepicker"
                                         v-model="searchSummaryProd.date">
                            </flat-picker>
                        </base-input>
                    </div>
                </div>
              </div>
              <base-input type="text"
                    label="OP Number"
                    placeholder="OP Number"
                    v-model="searchSummaryProd.op_no">
              </base-input>
              <div class="form-group">
                <label>Size</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="formFilterSummaryPipa.size">
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
              <base-input type="text"
                    label="PO Number"
                    placeholder="PO Number"
                    v-model="searchSummaryProd.po_no">
              </base-input>
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
             </div>
             <template slot="footer">
                 <button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="formFilterSummaryPipa.show = false">Close</button>
                 <button type="primary" class="btn btn-sm btn-info btn-fill" @click="getLPInv(), formFilterSummaryPipa.show = false">Filter</button>
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

      </div>
    </div>
  </div>
</template>
<script>
  // import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import invoice from '@/services/invoice.service';
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
        tableAkumulasiClient: {
          data: []
        },
        totalAkumulasiSlittingALL: '',
        totalAkumulasiTollingALL: '',
        totalAkumulasiShearinggALL: '',

        tableAkumulasiAmountClient: {
          data: []
        },
        totalAkumulasiAmountSlittingALL: '',
        totalAkumulasiAmountTollingALL: '',
        totalAkumulasiAmountShearinggALL: '',
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
        formFilterSummaryPipa: {
          add: true,
          title: "Filter Summary",
          show: false
        },
        formImport: {
            add: true,
            title: "Import Invoice",
            show: false
        },
        totalWeight: '',
        // grafik weight
        totalWeightSltDhj: '',
        totalWeightSltKpi: '',
        totalWeightTllDhj: '',
        totalWeightTllKpi: '',
        totalWeightShrAll: '',
        // grafik amount
        totalAmountSltDhj: '',
        totalAmountSltKpi: '',
        totalAmountTllDhj: '',
        totalAmountTllKpi: '',
        totalAmountShrAll: '',

        invoiceData: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: {
          job_no: '',
          po_no: '',
          client_name: '',
          prod_class: '',
          invoice_no: '',
          invoice_weight: '',
          invoice_qty: '',
          date: '',
          ppn_status: '',
        },
        apiUrl :config.apiUrl,
        tokenApi : '',

        datacollection: null,
        datacollectionAmount: null,

        tableLPPipa: {
          data: []
        },
        totalCoilTerpakaiAll: 0,
        totalBtgAll: 0,
        totalBeratProduksiAll: 0,
        month: '3',
        year: moment().format('Y'),
        searchSummaryProd: {
          date: '',
          op_no: '',
          surat_jalan_no: '',
          size: '',
          po_no: '',
          client_name: '',
        },
      }
    },
    mounted(){
      this.get();
      this.getLPInv();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, invoice.index({job_no: context.search.job_no, po_no: context.search.po_no, client_name: context.search.client_name, prod_class: context.search.prod_class, invoice_no: context.search.invoice_no, invoice_weight: context.search.invoice_weight, invoice_qty: context.search.invoice_qty, date: context.search.date, ppn_status: context.search.ppn_status, page: context.pagination.page})).onSuccess(function(response) {    
            context.table.data            = response.data.data.data.data;
            context.pagination.page_count = response.data.data.data.last_page
            context.totalWeight           = response.data.data.totalWeight;

            // REKAPAN INVOICE WEIGHT CHART
            context.totalWeightSltDhj = response.data.data.totalWeightSltDhj;
            context.totalWeightSltKpi = response.data.data.totalWeightSltKpi;
            context.totalWeightTllDhj = response.data.data.totalWeightTllDhj;
            context.totalWeightTllKpi = response.data.data.totalWeightTllKpi;
            context.totalWeightShrAll = response.data.data.totalWeightShrAll;
            // REKAPAN INVOICE WEIGHT TABLE
            context.tableAkumulasiClient.data  = response.data.data.totalAkumulasi;
            context.totalAkumulasiSlittingALL  = response.data.data.totalAkumulasiSlittingALL;
            context.totalAkumulasiTollingALL   = response.data.data.totalAkumulasiTollingALL;
            context.totalAkumulasiShearinggALL = response.data.data.totalAkumulasiShearinggALL;

            // REKAPAN INVOICE WEIGHT CHART
            context.totalAmountSltDhj = response.data.data.totalAmountSltDhj;
            context.totalAmountSltKpi = response.data.data.totalAmountSltKpi;
            context.totalAmountTllDhj = response.data.data.totalAmountTllDhj;
            context.totalAmountTllKpi = response.data.data.totalAmountTllKpi;
            context.totalAmountShrAll = response.data.data.totalAmountShrAll;
            // REKAPAN INVOICE AMOUNT
            context.tableAkumulasiAmountClient.data  = response.data.data.totalAkumulasiAmount;
            context.totalAkumulasiAmountSlittingALL  = response.data.data.totalAkumulasiAmountSlittingALL;
            context.totalAkumulasiAmountTollingALL   = response.data.data.totalAkumulasiAmountTollingALL;
            context.totalAkumulasiAmountShearinggALL = response.data.data.totalAkumulasiAmountShearinggALL;

        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        }).onFinish(function() {  
            context.fillData()
            context.fillDataAmount()
        })
        .call()
      },
      getLPInv(){
        let context = this;               
        Api(context, invoice.getLPInv({month: this.month, year: this.year, date: this.searchSummaryProd.date, op_no: this.searchSummaryProd.op_no, surat_jalan_no: this.searchSummaryProd.surat_jalan_no, size: this.searchSummaryProd.size, po_no: this.searchSummaryProd.po_no, client_name: this.searchSummaryProd.client_name})).onSuccess(function(response) {  
            context.tableLPPipa.data      = response.data.data.data;
            context.totalBtgAll           = response.data.data.totalBtgAll;
            context.totalCoilTerpakaiAll  = response.data.data.totalCoilTerpakaiAll;
            context.totalBeratProduksiAll = ((response.data.data.totalBeratProduksiAll / response.data.data.totalBtgAll) *  (response.data.data.totalBtgAll - (+response.data.data.totalBtgAllB + +response.data.data.totalBtgAllC)));
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.tableLPPipa.data = [];
            }
        })
        .call()
      },
      filter() {
        this.formFilter.add   = true;
        this.formFilter.show  = true;
        this.formFilter.title = "Filter";
        this.pagination.page  = 1 ;
      },
      filterSumaryPipa() {
        this.formFilterSummaryPipa.add   = true;
        this.formFilterSummaryPipa.show  = true;
        this.formFilterSummaryPipa.title = "Filter";
      },
      create() {
          this.form.add    = true;
          this.form.show   = true;
          this.form.title  = "Add Data";
          this.invoiceData = {}
          this.defaultDate()
          this.$refs.autocomplete.clearInput()
          this.onLoading = false
      },
      edit(id) {
        let context = this;               
        Api(context, invoice.show(id)).onSuccess(function(response) {
            context.invoiceData     = response.data.data[0];
            context.form.show  = true;
            context.form.title = 'Edit Data';
            context.$refs.autocomplete.setValue(response.data.data[0].job_no)                 
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

        api = Api(context, invoice.import(formData));
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

        if (this.invoiceData.job_no != undefined && this.invoiceData.invoice_no != undefined && this.invoiceData.invoice_date != undefined) {
          formData.append('job_no', this.invoiceData.job_no);
          formData.append('invoice_no', this.invoiceData.invoice_no);
          formData.append('invoice_date', this.invoiceData.invoice_date);
        }else{
          return alert('Job No, Invoice No, Invoice Date, Wajib Di Isi')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, invoice.create(formData));
        } else {
            api = Api(context, invoice.update(this.invoiceData.id, formData));
        }
        api.onSuccess(function(response) {
            context.get();
            context.form.show = false;
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

            Api(context, invoice.delete(id)).onSuccess(function(response) {
                context.get();
                context.notifyVue('Data Berhasil di Hapus', 'top', 'right', 'info')
            }).call();
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
        this.datacollection = {
          labels: ['SLITTING', 'TOLLING', 'SHEARING ALL CLIENT'],
          datasets: [
            {
              label: 'DHJ',
              backgroundColor: '#7FFFD4',
              data: [this.totalWeightSltDhj,this.totalWeightTllDhj,this.totalWeightShrAll]
            }, 
            {
              label: 'KPI',
              backgroundColor: '#f87979',
              data: [this.totalWeightSltKpi,this.totalWeightTllKpi,0]
            }
          ],
        }
      },
      fillDataAmount () {
        this.datacollectionAmount = {
          labels: ['SLITTING', 'TOLLING', 'SHEARING ALL CLIENT'],
          datasets: [
            {
              label: 'DHJ',
              backgroundColor: '#40E0D0',
              data: [this.totalAmountSltDhj,this.totalAmountTllDhj,this.totalAmountShrAll]
            }, 
            {
              label: 'KPI',
              backgroundColor: '#FF4500',
              data: [this.totalAmountSltKpi,this.totalAmountTllKpi,0]
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

        this.invoiceData.invoice_date = today
      },

      // ================= Autocomplete ============
      // AMBIL DATA YANG DI PILIH AC
      getData(obj){
        this.invoiceData.job_no = obj.job_no;
      },
      getDataFilter(obj){
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
