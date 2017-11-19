_.mixin({
    getQueryParams: function(queryString) {
        var query = (queryString || window.location.search).substring(1); // delete ?
        if (!query) {
            return false;
        }
        return _
            .chain(query.split('&'))
            .map(function(params) {
                var p = params.split('=');
                return [p[0], decodeURIComponent(p[1])];
            })
            .object()
            .value();
    },
    'sortKeysBy': function(obj, comparator) {
        var keys = _.sortBy(_.keys(obj), function(key) {
            return comparator ? comparator(obj[key], key) : key;
        });

        var newObj = _.zipObject(keys, _.map(keys, function(key) {
            return obj[key];
        }));
        return newObj
    },
    generate_password : function (l) {
        var x = '23456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXY',
            tmp = '',
            l = l || 6;

        for(var i = 0; i < l; i++)  {
            tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
        }

        return  tmp;
    },
    pluck: function(data, id){
        return _.map(data, id)
    },
    pluckAttrById: function(collections,arr_id,id,name) {
        var arr = []
        _.map(collections,function(each_obj,key){
            if(_.indexOf(arr_id,each_obj[id || "id"]) !== -1){
                arr.push(each_obj[name || "name"])
            }
        })
        return arr
    },
    isMobile(){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
})
