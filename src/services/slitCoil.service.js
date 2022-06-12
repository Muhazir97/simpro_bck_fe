import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('slit-coil/index', {params});
    },
    show(id) {
        return Service().get('slit-coil/show/'+id);
    },
    create(params) {
        return Service().post('slit-coil/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('slit-coil/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('slit-coil/delete/'+id);
    },
    import(params) {
        return Service().post('import/slit-coil', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
}
