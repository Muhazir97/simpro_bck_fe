import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('material/index', {params});
    },
    show(id) {
        return Service().get('material/show/'+id);
    },
    create(params) {
        return Service().post('material/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('material/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('material/delete/'+id);
    },
}