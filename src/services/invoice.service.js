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
}