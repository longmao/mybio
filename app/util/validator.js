define([], function() {

    var stategies = {
        isNotEmpty: function(elm) {
            return !!elm.trimVal()
        },
        isHtmlNotEmpty: function(elm) {
            return !!elm.children().length
        }
    }
    var validator = {
        check: function(dom, rule) {
            var len = dom.length;
            if (dom.length > 1) {
                var flag = true
                dom.each(function() {
                    if (!stategies[rule]($(this))) flag = false;
                })
                return flag
            } else {
                return stategies[rule](dom)
            }
        }
    }
    return validator
})
