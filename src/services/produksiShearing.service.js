import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('produksi-shearing/index', {params});
    },
    show(id) {
        return Service().get('produksi-shearing/show/'+id);
    },
    create(params) {
        return Service().post('produksi-shearing/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('produksi-shearing/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('produksi-shearing/delete/'+id);
    },
    import(params) {
        return Service().post('import/prod-shearing', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    showProdshearing(process_program) {
        return Service().get('produksi-shearing/show-prod-shearing/'+process_program);
    },
}