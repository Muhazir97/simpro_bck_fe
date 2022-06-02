import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('client/index', {params});
    },
    show(id) {
        return Service().get('client/show/'+id);
    },
    create(params) {
        return Service().post('client/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('client/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('client/delete/'+id);
    },
}