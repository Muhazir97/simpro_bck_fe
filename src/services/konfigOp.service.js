import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('konfig-op/index', {params});
    },
    show(id) {
        return Service().get('konfig-op/show/'+id);
    },
    create(params) {
        return Service().post('konfig-op/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('konfig-op/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('konfig-op/delete/'+id);
    },
}