import cors_config from './config'
import Vue from 'vue'

let common = {
    CPS_Offer_multipleEvents_settings: {
        getEventsParams: function (currentDom,is_dynamic_revenue) {
            var is_dynamic_revenue = is_dynamic_revenue || 1
            var events = []
            var forms = $(".multiple_events_box", currentDom);
            forms.map(function(index, form) {
                var query = {};
                var _this = form;
                var eventName = $(_this).find(".event_name").val();
                var conv_times = $(_this).find(".conv_times").val();
                var revenue = $(_this).find(".revenue").val();
                var payout = $(_this).find(".payout").val();
                var revenue_percentage = $(_this).find(".revenue_percentage").val();
                var payout_percentage = $(_this).find(".payout_percentage").val();
                if (is_dynamic_revenue != 1) {
                    revenue_percentage = 0;
                    payout_percentage = 0;
                    $(_this).find(".revenue_percentage").val(revenue_percentage)
                    $(_this).find(".payout_percentage").val(payout_percentage)
                }
                query = {
                    eventName: eventName,
                    conv_times: conv_times,
                    revenue: revenue,
                    payout:payout,
                    revenue_percentage:revenue_percentage,
                    payout_percentage:payout_percentage
                }
                events.push(query);
            })
            return events
        },

    },
    cps_offer_global_pixel: {
        getAdvancedPixelParams: function (currentDom, type, boxIndex, action, contentIndex) {
            var pixel = [];
            var forms = $(".global_pixel_type", currentDom);
            forms.map(function(index, form) {
                var query = {};
                var _this = form;
                var url = $(_this).find(".url").val();
                var method = $(_this).find(".method").val();
                var parameters = {};
                var headers = {};
                var added = {'': ''};
                var newParameters = [];
                var newHeaders = [];
                var id = $(_this).attr("id")
                if ( type !== 'parameters' && type !== 'headers' && type != 'addBox') {
                    $(_this).find(".parameters .paramName").map(function(ind, item) {
                        var paramName = $(item).val();
                        var paramValue = $(item).next().val();
                        parameters[paramName] = paramValue;
                    });
                    $(_this).find(".headers .paramName").map(function(dex, item) {
                        var paramName = $(item).val();
                        var paramValue = $(item).next().val();
                        headers[paramName] = paramValue;
                    });
                } else {
                    var itemParams = []
                    var itemHeaders = []
                    $(_this).find(".parameters .paramName").map(function(ind, item) {
                        var paramName = $(item).val();
                        var paramValue = $(item).next().val();
                        var pEl = {}
                        pEl[paramName] = paramValue;
                        itemParams.push(pEl)
                    });
                    $(_this).find(".headers .paramName").map(function(dex, item) {
                        var paramName = $(item).val();
                        var paramValue = $(item).next().val();
                        var hEl = {}
                        hEl[paramName] = paramValue;
                        itemHeaders.push(hEl)
                    });

                    parameters = itemParams
                    headers = itemHeaders
                }
                if (boxIndex == index) {
                    if (action == 'add') {
                        if (type === 'parameters') {
                            parameters.push(added);
                        }
                        if (type === 'headers') {
                            headers.push(added);
                        }
                    }
                    if (action == 'delete') {
                        if (type === 'parameters') {
                            parameters = _.remove(parameters, function(i, n) {
                              return n != contentIndex;
                            });
                        }
                        if (type === 'headers') {
                            headers = _.remove(headers, function(i, n) {
                              return n != contentIndex;
                            });
                        }
                    }
                }
                query = {
                    uri: url,
                    method: method,
                    parameters:parameters,
                    headers: headers,
                    id:id
                }
                pixel.push(query);
            })
            return pixel
        },
    },
    Base64: {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = common.Base64._utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },
        decode: function(input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = Base64._utf8_decode(output);

            return output;

        },
        _utf8_encode: function(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },
        _utf8_decode: function(utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }
    },
    uploadFile: function (offer_id, fileList, cookie_hack, callback) {
        var ajaxs = [];
        var errorInfo = [];
        var fileListEmpty = true;
        for (var i in fileList) {
            fileListEmpty = false;
            var singleData = new FormData();
            singleData.append('upload', fileList[i]);
            singleData.append('PHPSESSID', cookie_hack['PHPSESSID']);
            singleData.append('offer_id', offer_id);
            singleData.append('language', fileList[i].language);
            $.ajax({
                beforeSend: function(request) {
                    ajaxs.push(i);
                },
                async: false,
                url: cors_config.swfupload.upload_url.uploadFile,
                type: "POST",
                data: singleData,
                processData: false,
                contentType: false
            })
            .fail(function(msg) {
                errorInfo.push(fileList[i].name);
            })
            .always(function(data, msg, xhr) {
                try {
                    data = $.parseJSON(data);
                    if (msg == 'success' && data.flag == 'success') {
                        $('#creative_files_list').find('tr[data-md5path=' + i + ']').find('.file_link').attr('href', data.data.file_path);
                    } else {
                        errorInfo.push(fileList[i].name);
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        }
        if (errorInfo.length) {
            setTimeout(function() {
                if (errorInfo) {
                    common.msgs.pop_up('upload file failed, ' + errorInfo.join(' '), 'info', self.dom);
                }
            }, 300);
        }
        setTimeout(callback && callback(), 500);
    },
    handleAffiliate: {
        //get Search List position
        getBasic: function(_ul, _input) {
            var _pos = _input.offset();
            var _style = 'top:'+ (_input.outerHeight() + _pos.top) +'px;left:'+ _pos.left +'px;';
            _ul.attr('style', _style).hide();
        },
        //render Search List
        renderSearchList:function(o, keyword, _ul, _li, status, _input, searchOffset, callback, oldOptions) {

            /*
            * empty search list when init it everytime
            * if there is the search data ,show the search list
            * no more search data , unbind search scroll
            * click the search list when clicked on the document
            */
            $('.sel-search-list').empty().remove();
            //var searchOffset = window.localStorage.getItem("searchOffset");
            var that = this;
            if (searchOffset != 0) {
                var idx = searchOffset * 50;
            } else {
                _li = " ";
                var idx = 0 ; //data-opt-index
            }
            $.each(o, function(i, n){
                $.each(n, function(index, node){
                    if (node.last_name) {
                        var _opt_search_text = node.id + ' - ' + node.first_name + ' ' + node.last_name;
                    } else {
                        var _opt_search_text = node.id + ' - ' + node.first_name;
                    }
                    var _regexKey = new RegExp(keyword, 'igm');
                    if (_opt_search_text.indexOf(keyword) != -1) {
                        var _replaced_text = _opt_search_text.replace(_regexKey, function(){
                            return '<strong>'+ arguments[0] +'</strong>';
                        })
                        _li += '<li data-opt-value="'+ node.id +'" data-opt-index="'+ (idx + index) +'">'+ _replaced_text +'</li>';
                    }
                })
            })
            if (_li) {
                $("span.tips").css("visibility", "hidden");
                _input.next("span").css("visibility", "visible");
                _ul.html(_li);
                $('body').append(_ul);
                _ul.show();
            }
            that.bindSearchScroll(_input, searchOffset);
            that.bindClick(_ul, status, callback,oldOptions);
            if (status != "all" && o[status] && o[status].length == 0) {
                $("ul.sel-search-list").unbind("scroll");
            }
            $(document).click(function(e){
                that.closeList();
            })
        },
        //close search List
        closeList: function() {
            window.localStorage.setItem("searchOffset", 0);
            $("ul.sel-search-list").empty().hide().remove();
        },
        //page init render
        initRender:function(o, status, container) {
            /*
            *empty the select list when init page and change aff status
            *no more data , unbind select scroll
            */
            if (status == "all") {
                $("#aff_access select[multiple='multiple']").empty();
            }
            if (status != "all" && o[status].length == 0) {
                $("select[data-value='" + status + "']").unbind("scroll");
            } else {
                $.each(o, function(i, n){
                    $.each(n, function(index, node){
                        if (node.last_name) {
                            if (container){
                                container.append('<option value="'+ node.id +'">'+ node.id + ' - ' + node.first_name + ' ' + node.last_name +'</option>');
                            } else {
                                $('#aff_' + i).append('<option value="'+ node.id +'">'+ node.id + ' - ' + node.first_name + ' ' + node.last_name +'</option>');
                            }
                        } else {
                            if (container){
                                container.append('<option value="'+ node.id +'">'+ node.id + ' - ' + node.first_name + '</option>');
                            } else {
                                $('#aff_' + i).append('<option value="'+ node.id +'">'+ node.id + ' - ' + node.first_name + '</option>');
                            }
                        }
                    })
                })
            }
        },
        //bind  click  on search list
        bindClick:function(_ul, status, callback,oldOptions) {
            /*
            *if the clicked option is in _select,set the flag as true，stop circulate;
            *if the clicked option is not in _select,add the clicked option to the _select;
            * set the clicked option's "selected" as "selected" and move it to the front
            */
            var that = this
            _ul.on("click", "li", function(e) {
                e.stopPropagation();
                e.preventDefault();
                var clicked = $(this);
                var _select = $("select[data-value='" + status + "']");
                var _sel_val = clicked.attr('data-opt-value');
                var falg = false;
                var _is_multi_select = _select.attr('multiple') || false;
                var options = $('option', _select);
                var _select_len = options.length;
                for (var i = 0 ; i < _select_len; i++) {
                    var _opt_text = options[i].text;
                    if (_opt_text.toLowerCase() == clicked.text().toLowerCase()){
                        falg = true;
                        break;
                    }
                }
                /*if (!falg) {
                    var added = '<option value="'+ _sel_val +'" data-name="select_'+ status +'">'+ clicked.text() +'</option>';
                    _select.append(added);
                }*/
                if (!falg) {
                    var data_name = 'select_'+ status
                    var names = clicked.text().split(" ")
                    var first_name = names[0]
                    var last_name = name[1]
                    var added = [{
                        id:_sel_val,
                        "data-name": data_name,
                        first_name:first_name,
                        last_name:last_name,
                    }]
                    var newOptions = added.concat(oldOptions);

                }

                $('option[value='+ _sel_val +']', _select).siblings().prop('selected', false)
                _select.focus().find("option[value='" + _sel_val + "']").prop("selected", true)/*.trigger('click')*/
                that.closeList();
                if (_is_multi_select) {
                    $("option[value='" + _sel_val + "']", _select).prependTo(_select)
                    $("option[value='" + _sel_val + "']", _select).prop('selected', true)/*.trigger('click');*/
                    _select.scrollTop(0);
                }
                callback && callback(_sel_val,status,newOptions)
            })
        },
        //bind  scroll  on search list
        bindSearchScroll: function(_input, searchOffset) {
            if ($("ul.sel-search-list").css("display") == "block") {
                $("ul.sel-search-list").scroll(function(){
                    _input.trigger("keyup", "scroll");
                });
            }
        }
    },
    setReadOnly:function(elem, delay, type) {
        type = type || "editable"
        var delay_timer = delay || 1500;

        switch(type) {
            case "editable":
                setTimeout(function(){
                    var _element = elem;
                    _element.unbind().attr("href", "javascript:void(0)").editable('disable').on("click",function(e){
                        e.preventDefault();
                        return;
                    });
                },delay_timer)
                break;
            case "switch":
                elem.bootstrapSwitch('setActive', false);
                break;
            case "select":

                setTimeout(function(){
                    let chosen = elem.data('chosen');
                    if (chosen) { // *)
                      chosen.destroy();
                    }
                    elem.addClass("disabled")
                    elem.attr('disabled', true).unbind()
                },delay_timer)

                break;
            case "button":
            case "select":
            case "checkbox":
            case "text":
                setTimeout(function(){
                    elem.addClass("disabled")
                    elem.attr('disabled', true).unbind()

                },delay_timer)
                break;
        }

    },
    setReadOnlyFactory: function(arr, $parent) {

        var that = this;
        _.each(arr, function(elm){
            $("[data-control-name='bt-" + elm + "']", $parent).each(function(){
                let $dom = $(this);
                that.setReadOnly($dom, "" , elm)
            })
        })

    },
    getType : function(typeName) {
        var typeName = typeName || "";
        var type = ''
        if (typeName.toLowerCase().indexOf("bd")  >= 0) {
            type = 2;
        } else if (typeName.toLowerCase().indexOf("am")  >= 0) {
            type = 1;
        } else if (typeName.toLowerCase() == 2){
            type = 0;
        } else if (typeName.toLowerCase() == "am-bd"){
            type = "";
        } else {
            type = "";
        }
        return type;
    },
    generate_password(length) {
        var x = '23456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXY',
            tmp = '',
            l = l || 6;

        for(var i = 0; i < l; i++)  {
            tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
        }
        return  tmp;
    },
}
export default common
