import Service from '@/helpers/service'

export default {

    pembelian() {
        return Service().get('profile/pembelian');
    },
    pesanan() {
        return Service().get('profile/pesanan');
    },
    reqMitra(params) {
        return Service().post('profile/request-mitra', params);
    },
    getMitra() {
        return Service().get('profile/get-mitra');
    },
    accMitra(params) {
        return Service().post('profile/acc-mitra', params);
    },
    deletePembelian(id) {
        return Service().post('profile/delete-pembelian/'+id);
    },
}