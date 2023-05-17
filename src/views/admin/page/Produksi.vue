<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row" v-if="role != 'Visitor'">
        <div class="col-xl-4 col-md-6">
          <router-link :to="'/report-slitting'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-scissors text-muted"></i>
              </div>
              <div slot="content">
                <p class="card-category">Slitting</p>
                <h4 class="card-title"> {{ convertRp(Slt) }} </h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-4 col-md-6">
          <router-link :to="'/produksi-tolling'">
            <stats-card class="shadow">
              <div slot="header" class="icon-warning">
                <i class="nc-icon nc-support-17 text-primary"></i>
              </div>
              <div slot="content">
                <p class="card-category">Tolling Pipa</p>
                <h4 class="card-title"> {{ convertRp(Tll) }} </h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>

        <div class="col-xl-4 col-md-6">
          <router-link :to="'/report-shearing'">
            <stats-card class="shadow">
              <div slot="header" class="icon-danger">
                <i class="nc-icon nc-preferences-circle-rotate text-danger"></i>
              </div>
              <div slot="content">
                <p class="card-category">Shearing</p>
                <h4 class="card-title"> {{ convertRp(Shr) }} </h4>
              </div>
              <div slot="footer">
              </div>
            </stats-card>
          </router-link>
        </div>
      </div>

      <!-- WEEKLY REPORT -->
      <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
        <template slot="header">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8 text-center">
              <h5 class="card-title font-weight-bold">WEEKLY REPORT</h5><br>
              <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">{{ moment().locale('id').format('DD MMMM YYYY').toUpperCase() }}</h5><br>
            </div>
            <div class="col-2">
              <a :href="apiUrl+'print-weekly-report'" target="_BLANK">
                <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                  <i class="fa fa-print"></i> Print
                </button>
              </a>
            </div>
          </div>
        </template>
        <!-- <div class="scroll"> -->
          <p class="text-center font-weight-bold">LAST MONTH'S PRODUCTION REPORTS</p>
          <p class="text-center" style="margin-top: -18px;">{{ moment().subtract(1, "month").locale('id').format('MMMM YYYY') }}</p>
          <table border='1' class="mb-4">
            <thead>
              <slot name="columns">
                <tr>
                  <th style="font-size: 13px; text-align: center; background-color: #7CFC00;">SLITTING</th>
                  <th style="font-size: 13px; text-align: center; background-color: #7CFC00;">TOLLING PIPA</th>
                  <th style="font-size: 13px; text-align: center; background-color: #7CFC00;">SHEARING</th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(monthlySlt) }}</td>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(monthlyTll) }}</td>
                <td style="font-size: 13px; text-align: center;"></td>
              </tr>
            </tbody>
          </table>

          <p class="text-center font-weight-bold">WEEKLY PRODUCTION REPORTS</p>
          <p class="text-center" style="margin-top: -18px;">{{ moment(start).locale('id').format('DD MMMM') }} - {{ moment(end).locale('id').format('DD MMMM YYYY') }}</p>
          <table border='1' class="mb-4">
            <thead>
              <slot name="columns">
                <tr>
                  <th style="font-size: 13px; text-align: center; background-color: #6495ED;">SLITTING</th>
                  <th style="font-size: 13px; text-align: center; background-color: #6495ED;">AKUMULASI SLITTING</th>
                  <th style="font-size: 13px; text-align: center; background-color: #6495ED;">PIPA</th>
                  <th style="font-size: 13px; text-align: center; background-color: #6495ED;">AKUMULASI PIPA</th>
                  <th style="font-size: 13px; text-align: center; background-color: #6495ED;">SHEARING</th>
                  <th style="font-size: 13px; text-align: center; background-color: #6495ED;">AKUMULASI SHEARING</th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(weeklySlt) }}</td>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(weeklyAklmsiSlt) }}</td>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(weeklyTll) }}</td>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(weeklyAklmsiTll) }}</td>
                <td style="font-size: 13px; text-align: center;"></td>
                <td style="font-size: 13px; text-align: center;"></td>
              </tr>
            </tbody>
          </table>

          <p class="text-center font-weight-bold">HRC MOTHER COIL</p>
          <table border='1' class="mb-4">
            <thead>
              <slot name="columns">
                <tr>
                  <th style="font-size: 13px; text-align: center; background-color: #FFD700;">CLIENT</th>
                  <th style="font-size: 13px; text-align: center; background-color: #FFD700;">WEIGHT</th>
                  <th style="font-size: 13px; text-align: center; background-color: #FFD700;">QTY</th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">PT. DUTA HITA JAYA</td>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(hrcMcWeight) }}</td>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(hrcMcQty) }} Coil</td>
              </tr>
              <tr>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">PT. KRAKATAU PIPE INDUSTRIES</td>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(hrcMcWeightKPI) }}</td>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(hrcMcQtyKPI) }} Coil</td>
              </tr>
            </tbody>
          </table>

          <p class="text-center font-weight-bold">HRC SLIT COIL</p>
          <table border='1' class="mb-4">
            <thead>
              <slot name="columns">
                <tr>
                  <th style="font-size: 13px; text-align: center; background-color: #F08080;">CLIENT</th>
                  <th style="font-size: 13px; text-align: center; background-color: #F08080;">WEIGHT</th>
                  <th style="font-size: 13px; text-align: center; background-color: #F08080;">QTY</th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">PT. DUTA HITA JAYA</td>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(hrcScWeight) }}</td>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(hrcScQty) }} Coil</td>
              </tr>
              <tr>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">PT. KRAKATAU PIPE INDUSTRIES</td>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(hrcScWeightKPI) }}</td>
                <td style="font-size: 13px; text-align: center;">{{ convertRp(hrcScQtyKPI) }} Coil</td>
              </tr>
            </tbody>
          </table>
        <!-- </div> -->
      </card>

      <!-- PER MOUNTH -->
      <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
        <template slot="header">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8 text-center">
              <h5 class="card-title font-weight-bold">RKP PRODUKSI - {{new Date().getFullYear()}}</h5><br>
              <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">PT. BUANA CENTRA KARYA</h5><br>
            </div>
            <div class="col-2">
            </div>
          </div>
        </template>
        <!-- <div class="scroll"> -->
          <table border='1'>
            <thead>
              <slot name="columns">
                <tr style="background-color: #F0F8FF;">
                  <th style="font-size: 13px; text-align: center;">PERIODE</th>
                  <th style="font-size: 13px; text-align: center; background-color: #F0E68C;">SLITTING</th>
                  <th style="font-size: 13px; text-align: center; background-color: #00FA9A;">TOLLING PIPA</th>
                  <th style="font-size: 13px; text-align: center; background-color: #FFF5EE;">SHEARING</th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(1), get(1)">JANUARI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Jan) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Jan) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Jan) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(2), get(2)">FEBRUARI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Feb) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Feb) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Feb) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(3), get(3)">MARET</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Mar) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Mar) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Mar) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(4), get(4)">APRIL</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Apr) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Apr) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Apr) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(5), get(5)">MEI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Mei) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Mei) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Mei) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(6), get(6)">JUNI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Jun) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Jun) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Jun) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(7), get(7)">JULI</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Jul) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Jul) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Jul) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(8), get(8)">AGUSTUS</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Aug) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Aug) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Aug) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(9), get(9)">SEPTEMBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Sep) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Sep) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Sep) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(10), get(10)">OKTOBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Oct) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Oct) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Oct) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(11), get(11)">NOVEMBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Nov) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Nov) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Nov) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; cursor: pointer; color: blue;" @click="getRkpProduksiDaily(12), get(12)">DESEMBER</td>
                <td style="font-size: 13px; text-align: center; background-color: #F0E68C;">{{ convertRp(rkpSlt.Des) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #00FA9A;">{{ convertRp(rkpTll.Des) }}</td>
                <td style="font-size: 13px; text-align: center; background-color: #FFF5EE;">{{ convertRp(rkpShr.Des) }}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">TOTAL</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalWeightProdSlt) }}</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalWeightProdTll) }}</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(totalWeightProdShr) }}</td>
              </tr>
            </tbody>
          </table>
        <!-- </div> -->
      </card>

      <!-- DAILY -->
      <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
        <template slot="header">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8 text-center">
              <h5 class="card-title font-weight-bold">DAILY PRODUCTION REPORT</h5><br>
              <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">{{ moment().set({'month': month}).format('MMMM').toUpperCase() }} {{new Date().getFullYear()}}</h5><br>
            </div>
            <div class="col-2">
              <a :href="apiUrl+'print-daily-production-report?month='+Number(month + 1)+''" target="_BLANK">
                <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                  <i class="fa fa-print"></i> Print
                </button>
              </a>
            </div>
          </div>
        </template>
        <!-- <div class="scroll"> -->
          <table border='1'>
            <thead>
              <slot name="columns">
                <tr style="background-color: #F0F8FF;">
                  <th style="font-size: 13px; text-align: center;" width="4">DAY</th>
                  <th style="font-size: 13px; text-align: center;" width="4">DATE</th>
                  <th style="font-size: 13px; text-align: center; background-color: #DCDCDC;">SLITTING</th>
                  <th style="font-size: 13px; text-align: center; background-color: #F0FFF0;">TOLLING PIPA</th>
                  <th style="font-size: 13px; text-align: center; background-color: #FFFACD;">SHEARING</th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr v-for="(row, i) in table.data" :key="i">
                <td style="font-size: 13px; text-align: center;" :style="(moment( new Date().getFullYear()+'-'+Number(month + 1)+'-'+i).locale('id').format('ddd') == 'Sab' || moment( new Date().getFullYear()+'-'+Number(month + 1)+'-'+i).locale('id').format('ddd') == 'Min') ? 'background-color: red; color: white;' : ''">{{ moment( new Date().getFullYear()+'-'+Number(month + 1)+'-'+i).locale('id').format('ddd') }}</td>
                <td style="font-size: 13px; text-align: center;" :style="(moment( new Date().getFullYear()+'-'+Number(month + 1)+'-'+i).locale('id').format('ddd') == 'Sab' || moment( new Date().getFullYear()+'-'+Number(month + 1)+'-'+i).locale('id').format('ddd') == 'Min') ? 'background-color: red; color: white;' : ''">{{ i }}</td>
                <td style="font-size: 13px; text-align: center;" :style="(moment( new Date().getFullYear()+'-'+Number(month + 1)+'-'+i).locale('id').format('ddd') == 'Sab' || moment( new Date().getFullYear()+'-'+Number(month + 1)+'-'+i).locale('id').format('ddd') == 'Min') ? 'background-color: red; color: white;' : 'background-color: #DCDCDC;'">{{ convertRp(table.data[i]) }}</td>
                <td style="font-size: 13px; text-align: center;" :style="(moment( new Date().getFullYear()+'-'+Number(month + 1)+'-'+i).locale('id').format('ddd') == 'Sab' || moment( new Date().getFullYear()+'-'+Number(month + 1)+'-'+i).locale('id').format('ddd') == 'Min') ? 'background-color: red; color: white;' : 'background-color: #F0FFF0;'">{{ convertRp(table.dataTll[i]) }}</td>
                <td style="font-size: 13px; text-align: center;" :style="(moment( new Date().getFullYear()+'-'+Number(month + 1)+'-'+i).locale('id').format('ddd') == 'Sab' || moment( new Date().getFullYear()+'-'+Number(month + 1)+'-'+i).locale('id').format('ddd') == 'Min') ? 'background-color: red; color: white;' : 'background-color: #FFFACD;'">{{ convertRp(table.dataShr[i]) }}</td>
              </tr>
              <tr>
                <td colspan="2" style="font-size: 13px; text-align: center; font-weight: bold;">TOTAL</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(weightSltDaily) }}</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(weightTllDaily) }}</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;">{{ convertRp(weightShrDaily) }}</td>
              </tr>
            </tbody>
          </table>
        <!-- </div> -->
      </card>

      <!-- CHART INVOICE -->
      <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
        <template slot="header">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8 text-center">
              <h5 class="card-title font-weight-bold"><u>DIAGRAM WEIGHT PRODUKSI</u> </h5><br>
              <!-- <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">Desember - 2022</h5><br> -->
            </div>
            <div class="col-2">
              <a :href="apiUrl+'print-rkp-produksi?month='+Number(month + 1)+''" target="_BLANK">
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

      <!-- TOTAL AKUMULASI PER CLIENT -->
      <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
        <template slot="header">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8 text-center">
              <h5 class="card-title font-weight-bold">RKP WEIGHT PRODUKSI</h5><br>
              <h5 class="card-title font-weight-bold" style="margin-top: -20px; margin-bottom: -30px;">PT. BUANA CENTRA KARYA</h5><br>
            </div>
            <div class="col-2">
            </div>
          </div>
        </template>
          <h5 class="card-title font-weight-bold mb-2">PRODUKSI SLITTING</h5>
          <table border='1'>
            <thead>
              <slot name="columns">
                <tr style="background-color: #F0F8FF;">
                  <th style="font-size: 13px; text-align: center;">NO</th>
                  <th style="font-size: 13px; text-align: center;">CUSTOMER</th>
                  <th style="font-size: 13px; text-align: center;">WEIGHT</th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr v-for="(row, i) in tableAkumulasiClientSlitting.data" :key="i">
                <td style="font-size: 13px; text-align: center;">{{ i + 1 }}</td>
                <td style="font-size: 13px;">{{ row.owner }}</td>
                <td style="font-size: 13px; text-align: center;"> {{ convertRp(+row.weight_slitting + +row.scrap_slitting) }} </td>
              </tr>
              <tr>
                <td style="font-size: 13px; text-align: center; font-weight: bold;" colspan="2">TOTAL</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;"> {{ convertRp(totalAkumulasiSlittingAll) }}</td>
              </tr>
            </tbody>
          </table>

          <h5 class="card-title font-weight-bold mb-2 mt-4">PRODUKSI TOLLING</h5>
          <table border='1'>
            <thead>
              <slot name="columns">
                <tr style="background-color: #F0F8FF;">
                  <th style="font-size: 13px; text-align: center;">NO</th>
                  <th style="font-size: 13px; text-align: center;">CUSTOMER</th>
                  <th style="font-size: 13px; text-align: center;">WEIGHT</th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr v-for="(row, i) in tableAkumulasiClientTolling.data" :key="i">
                <td style="font-size: 13px; text-align: center;">{{ i + 1 }}</td>
                <td style="font-size: 13px;">{{ row.client_name }}</td>
                <td style="font-size: 13px; text-align: center;"> {{ convertRp(row.weight_tolling) }} </td>
              </tr>
              <tr>
                <td style="font-size: 13px; text-align: center; font-weight: bold;" colspan="2">TOTAL</td>
                <td style="font-size: 13px; text-align: center; font-weight: bold;"> {{ convertRp(totalAkumulasiTollingAll) }}</td>
              </tr>
            </tbody>
          </table>
      </card>

      </div>
    </div>
  </div>
</template>
<script>
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import produksi from '@/services/produksi.service';
  import ChartCard from '@/components/Cards/ChartCard.vue'
  import StatsCard from '@/components/Cards/StatsCard.vue'
  var moment = require('moment');
  import LineChart from '../LineChart.js'
  
  export default {
    components: {
      ChartCard,
      StatsCard,
      LineChart,
    },
    data () {
      return {    
        moment:moment,    
        apiUrl :config.apiUrl,
        tokenApi : '',
        role : '',
        Slt : '',
        Tll : '',
        Shr : '',
        tableAkumulasiClientSlitting: {
          data: []
        },
        tableAkumulasiClientTolling: {
          data: []
        },
        totalAkumulasiSlittingAll: '',
        totalAkumulasiTollingAll: '',
        rkpSlt: {},
        rkpTll: {},
        rkpShr: {},

        totalWeightSltDhj: '',
        totalWeightSltKpi: '',
        totalWeightTllDhj: '',
        totalWeightTllKpi: '',
        totalWeightShrAll: '',

        totalWeightProdSlt: '',
        totalWeightProdTll: '',
        totalWeightProdShr: '',
        table: {
          data: []
        },
        table: {
          dataTll: []
        },
        table: {
          dataShr: []
        },
        weightSltDaily: '',
        weightTllDaily: '',
        weightShrDaily: '',
        month: '',

        hrcMcWeight: '',
        hrcMcQty: '',
        hrcMcWeightKPI: '',
        hrcMcQtyKPI: '',
        hrcScWeight: '',
        hrcScQty: '',
        hrcScWeightKPI: '',
        hrcScQtyKPI: '',
        start: '',
        end: '',
        weeklySlt: '',
        weeklyAklmsiSlt: '',
        weeklyTll: '',
        weeklyAklmsiTll: '',
        monthlySlt: '',
        monthlyTll: '',

        totalWeightSltDhj: '',
        totalWeightSltKpi: '',
        totalWeightTllDhj: '',
        totalWeightTllKpi: '',

        datacollection: null,
        month: '',
      }
    },
    mounted(){
      this.get();
      this.getRkpProduksiMonth();
      this.getWeeklyReport();
      this.getRkpProduksiDaily(moment().format('MM'));
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
      this.role = localStorage.getItem('role');
      this.month = moment().format('MM')
    },
    methods: {
      get(){
        let context = this;               
        Api(context, produksi.getCardAll({month: this.month})).onSuccess(function(response) {    
            context.Slt = response.data.data.Slt;
            context.Tll = response.data.data.Tll;
            context.Shr = response.data.data.Shr;

            context.totalWeightSltDhj = response.data.data.totalWeightSltDhj;
            context.totalWeightSltKpi = response.data.data.totalWeightSltKpi;
            context.totalWeightTllDhj = response.data.data.totalWeightTllDhj;
            context.totalWeightTllKpi = response.data.data.totalWeightTllKpi;

            context.tableAkumulasiClientSlitting.data = response.data.data.totalAkumulasiSlitting;
            context.totalAkumulasiSlittingAll         = +response.data.data.totalAkumulasiSlittingAll[0].weight_slitting + +response.data.data.totalAkumulasiSlittingAll[0].scrap_slitting;
            context.tableAkumulasiClientTolling.data  = response.data.data.totalAkumulasiTolling;
            context.totalAkumulasiTollingAll          = response.data.data.totalAkumulasiTollingAll;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
            }
        }).onFinish(function() {  
            context.fillData()
        })
        .call()
      },
      getRkpProduksiMonth(param){
        let context = this;               
        Api(context, produksi.getRkpProduksiMonth()).onSuccess(function(response) {    
            context.rkpSlt = response.data.data.sltInt;
            context.rkpTll = response.data.data.tll;
            context.rkpShr = response.data.data.shr;
            
            context.totalWeightProdSlt = response.data.data.totalWeightProdSlt;
            context.totalWeightProdTll = response.data.data.totalWeightProdTll;
            context.totalWeightProdShr = response.data.data.totalWeightProdShr;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
            }
        })
        .call()
      },
      getRkpProduksiDaily(month){
        let context = this;               
        Api(context, produksi.getRkpProduksiDaily({month: month})).onSuccess(function(response) {
            context.table.data    = response.data.data.slt;
            context.table.dataTll = response.data.data.tll;
            context.table.dataShr = response.data.data.shr;
            
            context.weightSltDaily = response.data.data.weightSltDaily;
            context.weightTllDaily = response.data.data.weightTllDaily;
            context.weightShrDaily = response.data.data.weightShrDaily;

            // context.get(month)
            context.month = Number(month - 1);
            context.$forceUpdate();
        }).onError(function(error) {                    
            if (error.response.status == 404) {
            }
        })
        .call()
      },
      getWeeklyReport(month){
        let context = this;               
        Api(context, produksi.getWeeklyReport({month: month})).onSuccess(function(response) {    
            context.hrcMcWeight    = response.data.data.hrcMcWeight;
            context.hrcMcQty       = response.data.data.hrcMcQty;
            context.hrcMcWeightKPI = response.data.data.hrcMcWeightKPI;
            context.hrcMcQtyKPI    = response.data.data.hrcMcQtyKPI;
            context.hrcScWeight    = response.data.data.hrcScWeight;
            context.hrcScQty       = response.data.data.hrcScQty;
            context.hrcScWeightKPI = response.data.data.hrcScWeightKPI;
            context.hrcScQtyKPI    = response.data.data.hrcScQtyKPI;

            context.start           = response.data.data.start;
            context.end             = response.data.data.end;
            context.weeklySlt       = response.data.data.weeklySlt;
            context.weeklyAklmsiSlt = response.data.data.weeklyAklmsiSlt;
            context.weeklyTll       = response.data.data.weeklyTll;
            context.weeklyAklmsiTll = response.data.data.weeklyAklmsiTll;

            context.monthlySlt = response.data.data.monthlySlt;
            context.monthlyTll = response.data.data.monthlyTll;

            console.log(response.data.data)
        }).onError(function(error) {                    
            if (error.response.status == 404) {
            }
        }).onFinish(function() {  
            context.fillData()
        })
        .call()
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
      
    }
  }
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
