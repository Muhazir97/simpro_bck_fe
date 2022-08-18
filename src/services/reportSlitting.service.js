import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('report-slitting/index', {params});
    },
    show(id) {
        return Service().get('report-slitting/show/'+id);
    },
    create(params) {
        return Service().post('report-slitting/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('report-slitting/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('report-slitting/delete/'+id);
    },
    import(params) {
        return Service().post('import/report-slitting', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    showreportSlitting(process_program) {
        return Service().get('report-slitting/show-lap-prod-slit/'+process_program);
    },
    getLapProdSlit(params) {
        return Service().get('report-slitting/get-lap-prod-slit', {params});
    },
}
