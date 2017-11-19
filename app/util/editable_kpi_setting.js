/**

 **/

import cors_config from './config'

(function($) {
    "use strict";

    var Kpi_setting = function(options) {
        this.init('kpi_setting', options, Kpi_setting.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(Kpi_setting, $.fn.editabletypes.abstractinput);

    $.extend(Kpi_setting.prototype, {
        /**
          Renders input from tpl

          @method render() 
         **/
        render: function() {},

        /**
          Default method to show value in element. Can be overwritten by display option.

          @method value2html(value, element) 
         **/
        value2html: function(value, element) {
            var html = ""
            var list = value



            html = list
            $(element).html(html);
        },

        /**
          Gets value from element's html

          @method html2value(html) 
         **/
        html2value: function(html) {
            /*
               you may write parsing method to get value by element's html
               e.g. "Moscow, st. Lenina, bld. 15" => {city: "Moscow", street: "Lenina", building: "15"}
               but for complex structures it's not recommended.
               Better set value directly via javascript, e.g. 
               editable({
            value: {
            city: "Moscow", 
            street: "Lenina", 
            building: "15"
            }
            });
            */

            var names = html.split(" ");
            return null;
            //return {first_name: names[0], last_name: names[1]};
        },

        /**
          Converts value to string. 
          It is used in internal comparing (not for sending to server).

          @method value2str(value)  
         **/
        value2str: function(value) {
            var str = '';
            if (value) {
                for (var k in value) {
                    str = str + k + ':' + value[k] + ';';
                }
            }
            return str;
        },

        /*
           Converts string to value. Used for reading value from 'data-value' attribute.

           @method str2value(str)  
           */
        str2value: function(str) {
            /*  
               this is mainly for parsing value defined in data-value attribute. 
               If you will always set value by javascript, no need to overwrite it
               */
            return str;
        },

        /**
          Sets value of input.

          @method value2input(value) 
          @param {mixed} value
         **/
        value2input: function(value) {
            var that = this;

            var $this = $(this.options.scope);

            var fetchEventData = function(opts, callback, fail_callback) {
                var url = cors_config.api_protocal + "//" + cors_config.api_host + "/newymapi/Ocpa/getIndex";
                $.ajax({
                    url: url,
                    data: opts,
                    dataType: "json",
                    type: "get",
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    }
                }).done(function(data) {
                    callback && callback(data)
                }).fail(function(msg) {
                    fail_callback && fail_callback()
                })
            }

            var renderMaxMinIndex = function($cont, list) {
                if (list) {

                    $cont.find('[name="retention_day"]').find("option[value='" + list.retention_day + "']").prop("selected", true)
                    $cont.find('[name="delay_day"]').find("option[value='" + list.delay_day + "']").prop("selected", true)
                    $cont.find('[name="index[level1][maxIndex]"]').val(list.index[0].max_ratio)
                    $cont.find('[name="index[level1][minIndex]"]').val(list.index[0].min_ratio)
                    $cont.find('[name="index[level2][maxIndex]"]').val(list.index[1].max_ratio)
                    $cont.find('[name="index[level2][minIndex]"]').val(list.index[1].min_ratio)
                    $cont.find('[name="index[level3][maxIndex]"]').val(list.index[2].max_ratio)
                    $cont.find('[name="index[level3][minIndex]"]').val(list.index[2].min_ratio)
                }
            }
            var renderUniqueEvent = function($cont_unique_event, list) {
                var $bt_switch = $cont_unique_event.find('.bt-switch');
                $bt_switch.bootstrapSwitch('setState', !_.isEmpty(list), !_.isEmpty(list));
                $bt_switch.trigger("switch-change", { value: !_.isEmpty(list) })
                $bt_switch.attr("data-status", !_.isEmpty(list))
                $cont_unique_event.find('[name="delay_day"]').find("option[value='" + list.delay_day + "']").prop("selected", true)
                $cont_unique_event.find('[name="retention_day"]').find("option[value='" + list.retention_day + "']").prop("selected", true)
                $cont_unique_event.find('[name="delay_day"]').find("option[value='" + list.delay_day + "']").prop("selected", true)
                $cont_unique_event.find('[name="index[level1][maxIndex]"]').val(list.index[0].max_ratio)
                $cont_unique_event.find('[name="index[level1][minIndex]"]').val(list.index[0].min_ratio)
                $cont_unique_event.find('[name="index[level2][maxIndex]"]').val(list.index[1].max_ratio)
                $cont_unique_event.find('[name="index[level2][minIndex]"]').val(list.index[1].min_ratio)
                $cont_unique_event.find('[name="index[level3][maxIndex]"]').val(list.index[2].max_ratio)
                $cont_unique_event.find('[name="index[level3][minIndex]"]').val(list.index[2].min_ratio)
            }
            var renderContView = function(data, type) {
                var list = data.data
                var $cont = that.$tpl.find("." + type + "_content")




                if (type === "uniqueEvent") {

                    if (list && list.indexs) {

                        _.each(list.indexs, function(_list) {
                                var $cont_unique_event = that.$tpl.find("." + _list.event_type + "_cont")
                                renderUniqueEvent($cont_unique_event, _list);

                            })
                            // that.$tpl.find('.uniqueEvent_content [data-name="event_type"]:first').prop("checked", true)
                    }
                    that.$tpl.find('.uniqueEvent_content [data-name="event_type"]:checked').change()


                } else if (type === "multiEvent") {
                    that.$tpl.find('#action_count_switch_top').bootstrapSwitch('setState', !_.isEmpty(list), !_.isEmpty(list));
                    that.$tpl.find('#action_count_switch_top').trigger("switch-change", { value: !_.isEmpty(list) })
                    that.$tpl.find('#action_count_switch_top').attr("data-status", !_.isEmpty(list))
                    renderMaxMinIndex($cont, list)
                } else {
                    renderMaxMinIndex($cont, list)

                }
            }
            this.$tpl.find("select.type").change(function(e) {
                var $select = $(e.currentTarget);
                var $option_seleted = $select.find("option:selected");
                var $content = $("." + $option_seleted.val() + "_content")
                that.$tpl.find('[data-name]').each(function() {
                    $(this).attr("name", "")
                })
                $content.find('[data-name]').each(function() {
                    $(this).attr("name", $(this).attr("data-name"))
                })
                $content.show().siblings(".content").hide()

                if ($option_seleted.val() !== "empty") {
                    var $widgt = that.$tpl.closest(".widget-placeholder")

                    $widgt.append("<div id='loading_bs' class='loading'></div>")

                    fetchEventData({
                        offer_id: $.query.get('id'),
                        type: $option_seleted.val()
                    }, function(data) {
                        renderContView(data, $option_seleted.val())
                        $widgt.find("#loading_bs").remove()
                    }, function() {
                        $widgt.find("#loading_bs").remove()
                    })
                }


            })
            this.$tpl.find("select.type option[value='retention']").prop("selected", true).trigger("change")

            this.$tpl.find('.bt-switch')['bootstrapSwitch']();

            this.$tpl.find('.uniqueEvent_content [data-name="event_type"]').on("change", function(e, data) {
                var $this = $(e.target);
                var $target = $($this.attr("data-target"))
                $target.removeClass("hide-normal").siblings(".event_type_cont").addClass("hide-normal")
                $target.siblings(".event_type_cont").find('[data-name]').each(function() {
                    $(this).attr("name", "")
                })
                $target.find('[data-name]').each(function() {
                    $(this).attr("name", $(this).attr("data-name"))
                })


            })

            this.$tpl.find('.bt-switch').on("switch-change", function(e, data) {
                var $this = $(e.target);
                var $target = $($this.attr("data-target"))
                $this.attr("data-status", data.value)
                if (data.value) {
                    $target.show()
                } else {
                    $target.hide()
                }
            })
        },

        /**
          Returns value of input.

          @method input2value() 
         **/
        input2value: function() {
            var obj = {};
            this.$tpl.find("[name]").each(function() {
                obj[$(this).attr("name")] = $(this).val()
            })
            return obj
        },

        /**
          Activates input: sets focus on the first field.

          @method activate() 
         **/
        activate: function() {},

        /**
          Attaches handler to submit form in case of 'showbuttons=false' mode

          @method autosubmit() 
         **/
        autosubmit: function() {
            this.$input.keydown(function(e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
            });
        }
    });
    var strVar = "";
    strVar += "    <div>";
    strVar += "    <div>";
    strVar += "            <div class=\"editable-input\">";
    strVar += "                <select class='type  form-control'>";
    strVar += "                    <option value=\"empty\" >Empty<\/option>";
    strVar += "                    <option value=\"retention\" >Retention<\/option>";
    strVar += "                    <option value=\"uniqueEvent\" >Unique Events<\/option>";
    strVar += "                    <option value=\"multiEvent\" >Repeated Events<\/option>";
    strVar += "                <\/select>";
    strVar += "            <\/div>";
    strVar += "    <\/div>";
    strVar += "    <div class=\"empty_content content hide-normal\">";
    strVar += "    <\/div>";
    strVar += "    <div class=\"retention_content content  hide-normal\">";

    strVar += "    <div class=\"control-group\">";
    strVar += "        <label class=' ' style='width: 20%'>Retention Day: <\/label>";
    strVar += "        <select data-name=\"retention_day\"  class='' style='width: 60px;'>";
    strVar += "           <option value=\"1\" >1<\/option>";
    strVar += "           <option value=\"2\" >2<\/option>";
    strVar += "           <option value=\"3\" >3<\/option>";
    strVar += "           <option value=\"4\" >4<\/option>";
    strVar += "           <option value=\"5\" >5<\/option>";
    strVar += "           <option value=\"6\" >6<\/option>";
    strVar += "           <option value=\"7\" >7<\/option>";
    strVar += "        <\/select>";
    strVar += "    <\/div>";
    strVar += "    <div class=\"control-group\"><label class='' style='width: 20%'>Retention Rules:<\/label>";
    strVar += "        <ul class='' style='margin-left:20%'>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level1][minIndex]\"  min=\"0\" max=\"100\"  value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level1][maxIndex]\"  min=\"0\" max=\"100\"  value=\"0\" type=\"text\"> % Fair<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level2][minIndex]\"  min=\"0\" max=\"100\"  value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level2][maxIndex]\"  min=\"0\" max=\"100\"  value=\"0\" type=\"text\"> % Poor<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level3][minIndex]\"  min=\"0\" max=\"100\"  value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level3][maxIndex]\"  min=\"0\" max=\"100\"  value=\"0\" type=\"text\"> % Fail<\/li>";
    strVar += "        <\/ul>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";

    strVar += "    <div class=\"uniqueEvent_content content hide-normal\">";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Type: <\/label>";
    strVar += "           <label class=\"radio inline\">";
    strVar += "           <input type=\"radio\" data-name=\"event_type\" value=\"firstpay\" data-target=\".firstpay_cont\"  checked> First Order";
    strVar += "         <\/label>";
    strVar += "           <label class=\"radio inline\">";
    strVar += "           <input type=\"radio\" data-name=\"event_type\" value=\"guide\" data-target=\".guide_cont\"   > Tutorial Complete";
    strVar += "         <\/label>";
    strVar += "           <label class=\"radio inline\">";
    strVar += "           <input type=\"radio\" data-name=\"event_type\" value=\"loyaluser\" data-target=\".loyaluser_cont\"   > loyal User";
    strVar += "         <\/label>";
    strVar += "           <label class=\"radio inline\">";
    strVar += "           <input type=\"radio\" data-name=\"event_type\" value=\"level\"  data-target=\".level_cont\"  > Level X";
    strVar += "         <\/label>";
    strVar += "           <label class=\"radio inline\">";
    strVar += "           <input type=\"radio\" data-name=\"event_type\" value=\"register\"  data-target=\".register_cont\"  > Registration";
    strVar += "         <\/label>";
    strVar += "    <\/div>";

    strVar += "    <div class=\"firstpay_cont event_type_cont\">";
    strVar += "    <div class=\"control-group\">";
    strVar += "         <label><\/label>";
    strVar += "         <div class=\"bt-switch \" data-target=\".first_order_switch_cont\" style=\"\" data-on-label=\"Yes\" data-off-label=\"No\" data-control-name='bt-switch' id=\"first_order_switch_top\" tabindex=\"0\">";
    strVar += "            <input type=\"checkbox\" data-control-name=\"first_order_switch\" id=\"first_order_switch\" data-control-name='bt-checkbox'\/>";
    strVar += "         <\/div>";
    strVar += "    <div class=\"first_order_switch_cont hide-normal\">  ";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Day: <\/label>";
    strVar += "        <select data-name=\"delay_day\"  class='form-control'>";
    strVar += "           <option value=\"1\" >1<\/option>";
    strVar += "           <option value=\"2\" >2<\/option>";
    strVar += "           <option value=\"3\" >3<\/option>";
    strVar += "           <option value=\"4\" >4<\/option>";
    strVar += "           <option value=\"5\" >5<\/option>";
    strVar += "           <option value=\"6\" >6<\/option>";
    strVar += "           <option value=\"7\" >7<\/option>";
    strVar += "        <\/select>";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Rules:<\/label>";
    strVar += "        <ul>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level1][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level1][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Fair<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level2][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level2][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Poor<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level3][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level3][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Fail<\/li>";
    strVar += "        <\/ul>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";

    strVar += "    <div class=\"guide_cont  event_type_cont hide-normal\">";
    strVar += "    <div class=\"control-group\">";
    strVar += "         <label><\/label>";
    strVar += "         <div class=\"bt-switch \" data-target=\".guide_switch_cont\" style=\"\" data-on-label=\"Yes\" data-off-label=\"No\" data-control-name='bt-switch' id=\"first_order_switch_top\" tabindex=\"0\">";
    strVar += "            <input type=\"checkbox\" data-control-name=\"guide_switch\" id=\"guide_switch\" data-control-name='bt-checkbox'\/>";
    strVar += "         <\/div>";
    strVar += "    <div class=\"guide_switch_cont hide-normal\">  ";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Day: <\/label>";
    strVar += "        <select data-name=\"delay_day\"  class='form-control'>";
    strVar += "           <option value=\"1\" >1<\/option>";
    strVar += "           <option value=\"2\" >2<\/option>";
    strVar += "           <option value=\"3\" >3<\/option>";
    strVar += "           <option value=\"4\" >4<\/option>";
    strVar += "           <option value=\"5\" >5<\/option>";
    strVar += "           <option value=\"6\" >6<\/option>";
    strVar += "           <option value=\"7\" >7<\/option>";
    strVar += "        <\/select>";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Rules:<\/label>";
    strVar += "        <ul>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level1][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level1][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Fair<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level2][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level2][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Poor<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level3][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level3][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Fail<\/li>";
    strVar += "        <\/ul>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";

    strVar += "    <div class=\"loyaluser_cont event_type_cont hide-normal\">";
    strVar += "    <div class=\"control-group\">";
    strVar += "         <label><\/label>";
    strVar += "         <div class=\"bt-switch \" data-target=\".loyaluser_switch_cont\" style=\"\" data-on-label=\"Yes\" data-off-label=\"No\" data-control-name='bt-switch' id=\"first_order_switch_top\" tabindex=\"0\">";
    strVar += "            <input type=\"checkbox\" data-control-name=\"loyaluser_switch\" id=\"loyaluser_switch\" data-control-name='bt-checkbox'\/>";
    strVar += "         <\/div>";
    strVar += "    <div class=\"loyaluser_switch_cont hide-normal\">  ";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Day: <\/label>";
    strVar += "        <select data-name=\"delay_day\"  class='form-control'>";
    strVar += "           <option value=\"1\" >1<\/option>";
    strVar += "           <option value=\"2\" >2<\/option>";
    strVar += "           <option value=\"3\" >3<\/option>";
    strVar += "           <option value=\"4\" >4<\/option>";
    strVar += "           <option value=\"5\" >5<\/option>";
    strVar += "           <option value=\"6\" >6<\/option>";
    strVar += "           <option value=\"7\" >7<\/option>";
    strVar += "        <\/select>";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Rules:<\/label>";
    strVar += "        <ul>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level1][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level1][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Fair<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level2][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level2][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Poor<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level3][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level3][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Fail<\/li>";
    strVar += "        <\/ul>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";


    strVar += "    <div class=\"level_cont  event_type_cont hide-normal\">";
    strVar += "    <div class=\"control-group\">";
    strVar += "         <label><\/label>";
    strVar += "         <div class=\"bt-switch \" data-target=\".level_switch_cont\" style=\"\" data-on-label=\"Yes\" data-off-label=\"No\" data-control-name='bt-switch' id=\"first_order_switch_top\" tabindex=\"0\">";
    strVar += "            <input type=\"checkbox\" data-control-name=\"level_switch\" id=\"level_switch\" data-control-name='bt-checkbox'\/>";
    strVar += "         <\/div>";
    strVar += "    <div class=\"level_switch_cont hide-normal\">  ";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Day: <\/label>";
    strVar += "        <select data-name=\"delay_day\"  class='form-control'>";
    strVar += "           <option value=\"1\" >1<\/option>";
    strVar += "           <option value=\"2\" >2<\/option>";
    strVar += "           <option value=\"3\" >3<\/option>";
    strVar += "           <option value=\"4\" >4<\/option>";
    strVar += "           <option value=\"5\" >5<\/option>";
    strVar += "           <option value=\"6\" >6<\/option>";
    strVar += "           <option value=\"7\" >7<\/option>";
    strVar += "        <\/select>";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Rules:<\/label>";
    strVar += "        <ul>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level1][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level1][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Fair<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level2][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level2][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Poor<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level3][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level3][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Fail<\/li>";
    strVar += "        <\/ul>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";



    strVar += "    <div class=\"register_cont  event_type_cont hide-normal\">";
    strVar += "    <div class=\"control-group\">";
    strVar += "         <label><\/label>";
    strVar += "         <div class=\"bt-switch \" data-target=\".register_switch_cont\" style=\"\" data-on-label=\"Yes\" data-off-label=\"No\" data-control-name='bt-switch' id=\"first_order_switch_top\" tabindex=\"0\">";
    strVar += "            <input type=\"checkbox\" data-control-name=\"register_switch\" id=\"register_switch\" data-control-name='bt-checkbox'\/>";
    strVar += "         <\/div>";
    strVar += "    <div class=\"register_switch_cont hide-normal\">  ";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Day: <\/label>";
    strVar += "        <select data-name=\"delay_day\"  class='form-control'>";
    strVar += "           <option value=\"1\" >1<\/option>";
    strVar += "           <option value=\"2\" >2<\/option>";
    strVar += "           <option value=\"3\" >3<\/option>";
    strVar += "           <option value=\"4\" >4<\/option>";
    strVar += "           <option value=\"5\" >5<\/option>";
    strVar += "           <option value=\"6\" >6<\/option>";
    strVar += "           <option value=\"7\" >7<\/option>";
    strVar += "        <\/select>";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Rules:<\/label>";
    strVar += "        <ul>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level1][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level1][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Fair<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level2][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level2][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Poor<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level3][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level3][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Fail<\/li>";
    strVar += "        <\/ul>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";



    strVar += "    <\/div>";
    strVar += "    <div class=\"multiEvent_content content hide-normal\">";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Type: <\/label>";
    strVar += "           <label class=\"radio inline\">";
    strVar += "           <input type=\"radio\" data-name=\"event_type\" value=\"action_count\" checked> Event Counts";
    strVar += "         <\/label>";
    strVar += "    <\/div>";
    strVar += "    <div class=\"control-group\">";
    strVar += "         <label><\/label>";
    strVar += "         <div class=\"bt-switch \" data-target=\".action_count_switch_cont\" style=\"\" data-on-label=\"Yes\" data-off-label=\"No\" data-control-name='bt-switch' id=\"action_count_switch_top\" tabindex=\"0\">";
    strVar += "            <input type=\"checkbox\" data-control-name=\"action_count_switch\" id=\"action_count_switch\" data-control-name='bt-checkbox'\/>";
    strVar += "         <\/div>";
    strVar += "    <div class=\"action_count_switch_cont hide-normal\">  ";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Day: <\/label>";
    strVar += "        <select data-name=\"delay_day\"  class='form-control'>";
    strVar += "           <option value=\"1\" >1<\/option>";
    strVar += "           <option value=\"2\" >2<\/option>";
    strVar += "           <option value=\"3\" >3<\/option>";
    strVar += "           <option value=\"4\" >4<\/option>";
    strVar += "           <option value=\"5\" >5<\/option>";
    strVar += "           <option value=\"6\" >6<\/option>";
    strVar += "           <option value=\"7\" >7<\/option>";
    strVar += "        <\/select>";
    strVar += "    <div class=\"control-group\">";
    strVar += "        <label>Event Rules:<\/label>";
    strVar += "        <ul>";
    strVar += "            <li>";
    strVar += "                <input class='form-control' data-name=\"index[level1][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level1][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Fair<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level2][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level2][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Poor<\/li>";
    strVar += "            <li>";
    strVar += "                <input class='form-control'  data-name=\"index[level3][minIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % -";
    strVar += "                <input class='form-control'  data-name=\"index[level3][maxIndex]\" min=\"0\" max=\"100\" value=\"0\" type=\"text\"> % Fail<\/li>";
    strVar += "        <\/ul>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "    <\/div>";
    strVar += "";
    Kpi_setting.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: strVar,
        inputclass: ''
    });

    $.fn.editabletypes.kpi_setting = Kpi_setting;

}(window.jQuery));
