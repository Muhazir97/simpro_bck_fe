import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('invoice-admin/index', {params});
    },
    show(id) {
        return Service().get('invoice/show/'+id);
    },
    create(params) {
        return Service().post('invoice/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('invoice/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('invoice/delete/'+id);
    },
    import(params) {
        return Service().post('import/invoice', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    showInvoice(invoice_no) {
        return Service().get('invoice/show-invoice/'+invoice_no);
    },
    addSJ(params) {
        return Service().post('invoice/add-sj', params);
    },
    updateInv(params) {
        return Service().post('invoice/update-inv', params);
    },
}