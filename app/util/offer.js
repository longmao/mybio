export default {
    convertQueryStr(i, v){
        if (v == true && !_.isNumber(v)) {
            return ''
        } else if (i == 'advertiser') {
            return v && v.toString()
        } else {
            return v
        }
    }

}
