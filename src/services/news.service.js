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
    import(params) {
        return Service().post('import/news', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    showNews(news_no) {
        return Service().get('news/show-news/'+news_no);
    },
    updateBA(news_no, params) {
        return Service().post('news/update-news/'+news_no, params);
    },
    addSJ(params) {
        return Service().post('news/add-sj', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    deleteSJ(id) {
        return Service().post('news/delete-sj/'+id);
    },
}