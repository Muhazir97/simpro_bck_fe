import Service from '@/helpers/service'

export default {
    countTask() {
        return Service().get('dashboard/count-task');
    },
}