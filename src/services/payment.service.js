import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('payment-admin/index', {params});
    },
    show(id) {
        return Service().get('payment/show/'+id);
    },
    create(params) {
        return Service().post('payment/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('payment/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('payment/delete/'+id);
    },
    detailPayment(pay_no) {
        return Service().get('payment/detail-payment/'+pay_no);
    },
    // import(params) {
    //     return Service().post('import/payment', params, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data'
    //         }
    //     });
    // },
    // showInvoice(invoice_no) {
    //     return Service().get('payment/show-payment/'+pay_no);
    // },
    // addSJ(params) {
    //     return Service().post('payment/add-sj', params);
    // },
    // updateInv(params) {
    //     return Service().post('payment/update-inv', params);
    // },
}