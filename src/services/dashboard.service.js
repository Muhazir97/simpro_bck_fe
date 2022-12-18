import Service from '@/helpers/service'

export default {
    countTask(params) {
        return Service().get('dashboard/count-task', {params});
    },
}