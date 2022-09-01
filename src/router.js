// GeneralViews
import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import TableList from './views/admin/TableList.vue'
import NotFound from './views/NotFoundPage.vue'

// =================== ADMIN =====================
import DashboardLayout from "./views/admin/DashboardLayout";
import Overview from './views/admin/Overview.vue'
import ClientMaster from "./views/admin/page/ClientMaster";
import MaterialMaster from "./views/admin/page/MaterialMaster";
import SlitCoil from "./views/admin/page/SlitCoil";
import DetailSlitCoil from "./views/admin/page/DetailSlitCoil";
import JobRequest from "./views/admin/page/JobRequest";
import DetailJobRequest from "./views/admin/page/DetailJobRequest";
import ProduksiSlitting from "./views/admin/page/ProduksiSlitting";
import DetailProdSlitting from "./views/admin/page/DetailProdSlitting";
import ReportSlitting from "./views/admin/page/ReportSlitting";
import DetailLapProdSlit from "./views/admin/page/DetailLapProdSlit";
import ProduksiTolling from "./views/admin/page/ProduksiTolling";
import DetailProdTolling from "./views/admin/page/DetailProdTolling";
import KonfigOp from "./views/admin/page/KonfigOp";
import ReportTolling from "./views/admin/page/ReportTolling";
import ProduksiShearing from "./views/admin/page/ProduksiShearing";
import ReportShearing from "./views/admin/page/ReportShearing";
import Delivery from "./views/admin/page/Delivery";
import DetailDelivery from "./views/admin/page/DetailDelivery";
import News from "./views/admin/page/News";
import DetailNews from "./views/admin/page/DetailNews";
import Invoice from "./views/admin/page/Invoice";
import Payment from "./views/admin/page/Payment";
import AllAccount from './views/admin/page/AllAccount.vue'

Vue.use(Router);

const vurRouter = new Router({
  linkExactActiveClass: "active",
  mode: 'history',
  routes: [
  // =================== USER =====================
    {
      path: "/",
      name: "login",
      components: {
        // header: AppHeader,
        default: Login,
        // footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        // header: AppHeader,
        default: Register,
        // footer: AppFooter
      }
    },
// =================== ADMIN =====================
   {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    name: 'Dashboard Layout',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Overview
      },
      {
        path: 'client-master',
        name: 'ClientMaster',
        component: ClientMaster
      },
      {
        path: 'material-master',
        name: 'MaterialMaster',
        component: MaterialMaster
      },
      {
        path: 'slit-coil',
        name: 'SlitCoil',
        component: SlitCoil
      },
      {
        path: 'detail-slit-coil/:process_program',
        name: 'DetailSlitCoil',
        component: DetailSlitCoil
      },
      {
        path: 'job-request',
        name: 'JobRequest',
        component: JobRequest
      },
      {
        path: 'detail-job-request/:job_no',
        name: 'DetailJobRequest',
        component: DetailJobRequest
      },
      {
        path: 'produksi-slitting',
        name: 'ProduksiSlitting',
        component: ProduksiSlitting
      },
      {
        path: 'detail-prod-slitting/:process_program',
        name: 'DetailProdSlitting',
        component: DetailProdSlitting
      },
      {
        path: 'report-slitting',
        name: 'ReportSlitting',
        component: ReportSlitting
      },
      {
        path: 'detail-lap-prod-slit/:process_program',
        name: 'DetailLapProdSlit',
        component: DetailLapProdSlit
      },
      {
        path: 'produksi-tolling',
        name: 'ProduksiTolling',
        component: ProduksiTolling
      },
      {
        path: 'detail-prod-tolling/:op_no',
        name: 'DetailProdTolling',
        component: DetailProdTolling
      },
      {
        path: 'konfig-op',
        name: 'KonfigOp',
        component: KonfigOp
      },
      {
        path: 'report-tolling',
        name: 'ReportTolling',
        component: ReportTolling
      },
      {
        path: 'produksi-shearing',
        name: 'ProduksiShearing',
        component: ProduksiShearing
      },
      {
        path: 'report-shearing',
        name: 'ReportShearing',
        component: ReportShearing
      },
      {
        path: 'delivery',
        name: 'Delivery',
        component: Delivery
      },
      {
        path: 'detail-delivery/:packing_list_no',
        name: 'DetailDelivery',
        component: DetailDelivery
      },
      {
        path: 'news',
        name: 'News',
        component: News
      },
      {
        path: 'detail-news/:news_no',
        name: 'DetailNews',
        component: DetailNews
      },
      {
        path: 'invoice',
        name: 'Invoice',
        component: Invoice
      },
      {
        path: 'payment',
        name: 'Payment',
        component: Payment
      },
      {
        path: 'all-account',
        name: 'AllAccount',
        component: AllAccount
      },
    ]
  },
  // { path: '*', component: NotFound },

  // =================== GENERAL =====================
    {
      path: "/components",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
],

  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

vurRouter.beforeEach((to, from, next) => {
  const publicPages = ['login', 'landing', 'register','components'];
  const authRequired = !publicPages.includes(to.name);
  const authenticated = JSON.parse(localStorage.getItem('authenticated'));  

  if (authRequired && !authenticated) {
      alert('Session Kamu Habis Ayo Login Lagi !!!')
      return next({
          name: 'login',
          query: {redirect: to.fullPath}
      });
  }

  if (authenticated) {
      const auth = JSON.parse(authenticated);
      if (to.name == 'login') {
          return next({
              name: 'Dashboard'
          });
      }
      if (to.name != 'Relogin') {
          if (auth.expired) {
            alert('Session Kamu Habis Ayo Login Lagi !!!')
            localStorage.removeItem('token');
            localStorage.setItem('authenticated', false)  
            return next({
                name: 'login'
            });
          }
      }
  }
  next();
})


export default vurRouter;
