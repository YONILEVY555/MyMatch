
import moment from 'moment'

class DateHelpers{

    getTodayEighteenYearsAgo(){
        const date =  moment(new Date(new Date().setFullYear(new Date().getFullYear() - 18))).format('YYYY-MM-DD')
        return date
    }

}

export default new DateHelpers()