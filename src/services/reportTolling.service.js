import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('report-tolling/index', {params});
    },
    show(id) {
        return Service().get('report-tolling/show/'+id);
    },
    create(params) {
        return Service().post('report-tolling/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('report-tolling/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('report-tolling/delete/'+id);
    },
    import(params) {
        return Service().post('import/report-tolling', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    showReportTolling(date) {
        return Service().get('report-tolling/show-report-tolling/'+date);
    },
    updateRpt(id, params) {
        return Service().post('report-tolling/update-report-tolling/'+id, params);
    },
    updateLength(id, params) {
        return Service().post('report-tolling/update-report-tolling-length/'+id, params);
    },
}
