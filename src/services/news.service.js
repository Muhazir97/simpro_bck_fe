import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('news/index', {params});
    },
    show(id) {
        return Service().get('news/show/'+id);
    },
    create(params) {
        return Service().post('news/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('news/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('news/delete/'+id);
    },
}