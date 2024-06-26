import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('produksi-tolling/index', {params});
    },
    getLP(params) {
        return Service().get('produksi-tolling/get-lp-pipa', {params});
    },
    show(id) {
        return Service().get('produksi-tolling/show/'+id);
    },
    create(params) {
        return Service().post('produksi-tolling/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('produksi-tolling/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('produksi-tolling/delete/'+id);
    },
    import(params) {
        return Service().post('import/prod-tolling', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    showProdTolling(op_no) {
        return Service().get('produksi-tolling/show-prod-tolling/'+op_no);
    },
    updatePT(op_no, params) {
        return Service().post('produksi-tolling/update-prod-tolling/'+op_no, params);
    },
    getDataDBB(params) {
        return Service().get('produksi-tolling/show-dbb', {params});
    },
    addMaterial(params) {
        return Service().post('produksi-tolling/add-material', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    addMaterialAll(params) {
        return Service().get('produksi-tolling/add-material-all', {params});
    },
    getSpecOp() {
        return Service().get('produksi-tolling/get-spec-op');
    },
    getOd(params) {
        return Service().get('produksi-tolling/get-od', {params});
    },
    getTebal(params) {
        return Service().get('produksi-tolling/get-tebal', {params});
    },
    getTolTebal(params) {
        return Service().get('produksi-tolling/get-tol-tebal', {params});
    },
}