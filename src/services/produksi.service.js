import Service from '@/helpers/service'

export default {
    getCardAll(params) {
        return Service().get('produksi/get-all-card', {params});
    },
    getRkpProduksiMonth(params) {
        return Service().get('produksi/get-rkp-produksi-month', {params});
    },
}