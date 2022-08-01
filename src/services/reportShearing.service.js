import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('report-shearing/index', {params});
    },
    show(id) {
        return Service().get('report-shearing/show/'+id);
    },
    create(params) {
        return Service().post('report-shearing/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('report-shearing/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('report-shearing/delete/'+id);
    },
    import(params) {
        return Service().post('import/report-shearing', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    // showProdshearing(process_program) {
    //     return Service().get('report-shearing/show-prod-shearing/'+process_program);
    // },
}