import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('delivery/index', {params});
    },
    show(id) {
        return Service().get('delivery/show/'+id);
    },
    create(params) {
        return Service().post('delivery/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('delivery/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('delivery/delete/'+id);
    },
    import(params) {
        return Service().post('import/delivery', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    showDelivery(packing_list_no) {
        return Service().get('delivery/show-delivery/'+packing_list_no);
    },
    getDataSJ(packing_list_no) {
        return Service().get('delivery/show-SJ/'+packing_list_no);
    },
    updateSJ(packing_list_no, params) {
        return Service().post('delivery/update-delivery/'+packing_list_no, params);
    },
}