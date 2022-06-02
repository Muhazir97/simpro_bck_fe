import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('job-request/index', {params});
    },
    show(id) {
        return Service().get('job-request/show/'+id);
    },
    create(params) {
        return Service().post('job-request/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('job-request/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('job-request/delete/'+id);
    },
    showJob(job_no) {
        return Service().get('job-request/show-job/'+job_no);
    },
    addMaterial(params) {
        return Service().post('job-request/add-material', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    getMaterialReq(params) {
        return Service().get('job-request/material-request', {params});
    },
    deleteMaterial(id) {
        return Service().post('job-request/delete-material/'+id);
    },
    addAttachment(params) {
        return Service().post('job-request/add-attachment', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    getMatMas(params) {
        return Service().get('job-request/material-master-po', {params});
    },
    deleteAttachment(id) {
        return Service().post('job-request/delete-attachment/'+id);
    },
    sendRequest(params) {
        return Service().get('job-request/send-request', {params});
    },
    updateJobNote(job_no, params) {
        return Service().post('job-request/update-job-note/'+job_no, params);
    },
}