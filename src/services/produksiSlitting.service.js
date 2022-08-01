import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('produksi-slitting/index', {params});
    },
    show(id) {
        return Service().get('produksi-slitting/show/'+id);
    },
    create(params) {
        return Service().post('produksi-slitting/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('produksi-slitting/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('produksi-slitting/delete/'+id);
    },
    import(params) {
        return Service().post('import/prod-slitting', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    showProdSlitting(process_program) {
        return Service().get('produksi-slitting/show-prod-slitting/'+process_program);
    },
    // getSpec(coil_no) {
    //     return Service().get('produksi-slitting/get-spec-mat-iput/'+coil_no);
    // },
}