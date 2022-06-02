import "@/assets/vendor/nucleo/css/nucleo.css";
import "@/assets/vendor/font-awesome/css/font-awesome.css";
import "@/assets/scss/argon.scss";
import '@/assets/css/demo.css'
import globalComponents from "./globalComponents";
import globalDirectives from "./globalDirectives";
import VueLazyload from "vue-lazyload";
import SideBar from '@/components/SidebarPlugin'
import VTooltip from 'v-tooltip'
import Notifications from '@/components/NotificationPlugin'

export default {
  install(Vue) {
    Vue.use(globalComponents);
    Vue.use(globalDirectives);
    Vue.use(VueLazyload);
    Vue.use(SideBar)
    Vue.use(VTooltip)
    Vue.use(Notifications)
  }
};
