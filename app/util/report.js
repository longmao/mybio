export default {

    convertItemText(nameArr){
        let arr = []
        let item = { "click": "Gross Clicks", "cr": "CR(Gross)", "state": "area", "unique_click": "Unique Clicks","conversions": "conversion" };
        $.each(nameArr, function(i,v){
            if(item[v]) {
                arr.push(item[v])
            }else{
                arr.push(v)
            }
        })
        return arr
    }

}
