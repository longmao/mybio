$.fn.trimVal = function(){
    return $.trim($(this).val())
}
$.fn.trimText = function(){
    return $.trim($(this).text())
}
$.fn.emptyVal = function(){
    return $(this).val("")
}
$.fn.allVal = function(){
    var arr = [];
    $(this).each(function(){
        $(this).val() && arr.push($(this).val())
    })

    return arr;
}

$.fn.getFormQuery = function(){
    let config = {};
    let $form = $(this)
    $form.serializeArray().map(function(item) {
        if ( config[item.name] ) {
            if ( typeof(config[item.name]) === "string" ) {
                config[item.name] = [config[item.name]];
            }
            config[item.name].push(item.value);
        } else {
            config[item.name] = item.value;
        }
    });

    let obj = {}
    _.map(config,function(val,key){
        if(key.match(/\[\]$/) && typeof(val) === "object"){
            obj[key.replace(/\[\]$/,"")] = val

        }else{
            obj[key] = val
        }
    })
    return obj
}


$.fn.getFormData = function(){
    let $form = $(this)
    var _query_form =  new FormData($form[0]);
    var _query = _query_form;

    return _query;
}


$.scrollToDom = function($dom, offset){
    offset = offset || -100
    $('html, body').animate({
        scrollTop: $dom.offset().top + offset
    }, 800);
}

$.isMobile = function() {
    return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
}