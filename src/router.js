import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import TableList from './views/admin/TableList.vue'

// =================== ADMIN =====================
import DashboardLayout from "./views/admin/DashboardLayout";
import Overview from './views/admin/Overview.vue'
import ClientMaster from "./views/admin/page/ClientMaster";
import MaterialMaster from "./views/admin/page/MaterialMaster";
import JobRequest from "./views/admin/page/JobRequest";
import DetailJobRequest from "./views/admin/page/DetailJobRequest";
import Delivery from "./views/admin/page/Delivery";
import News from "./views/admin/page/News";
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
        name: 'Overview',
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
        path: 'delivery',
        name: 'Delivery',
        component: Delivery
      },
      {
        path: 'news',
        name: 'News',
        component: News
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
  const publicPages = ['login', 'landing', 'register'];
  const authRequired = !publicPages.includes(to.name);
  const authenticated = JSON.parse(localStorage.getItem('authenticated'));  

  if (authRequired && !authenticated) {
      return next({
          name: 'login',
          query: {redirect: to.fullPath}
      });
  }

  if (authenticated) {
      const auth = JSON.parse(authenticated);
      if (to.name == 'login') {
          return next({
              name: 'dashboard'
          });
      }
      if (to.name != 'Relogin') {
          if (auth.expired) {
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
