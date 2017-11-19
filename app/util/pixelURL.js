function PixelURL(config) {
    return new PixelURL.prototype.init(config);
}
PixelURL.prototype = {
    parse: function(data, hasSubmit) {
        data = data || '';
        var set = typeof data === 'string' ? data.split(/\n+/ig) : data;
        set = set.length == 0 ? [''] : set;
        var str = '';
        for (var i = 0, len = set.length; i < len; i++) {
            str += this.getOneRecord(set[i], i == len - 1 && len < this.limit);
        }
        if (hasSubmit) {
            str += this.getSubmitBtn();
        }
        return str;
    },
    getSubmitBtn: function() {
        return '<div class="row-editable-submit {css}"><button class="btn row-editable-submit"><i class="icon-ok icon-white"></i></button><button class="btn row-editable-cancel"><i class="icon-remove icon-white"></i></button></div>'.replace('{css}', this.css);
    },
    getOneRecord: function(data, isAdd) {
        return '<div class="row-editable {css}"><input class="form-control" type="text" value="{data}"><button class="btn btn-row-{isAdd}">{text}</button></div>'.replace('{data}', data).replace(/{isAdd}/ig, isAdd ? "Add" : "Delete").replace(/{text}/ig, isAdd ? this.addText : this.deleteText).replace('{css}', this.css);
    },
    bindEvent: function() {
        var self = this;
        var jParent = self.tag.parent();
        jParent.off("keydown", 'input[type="text"]').on("keydown", 'input[type="text"]', function(event) {
            if (event.keyCode == 13) {
                return false
            }
        })
        jParent.off('click', '.btn-row-Delete').on('click', '.btn-row-Delete', function() {
                $(this).parents('.row-editable').remove();
                jParent.find('.row-editable').last().find('.btn-row-Delete').removeClass('btn-row-Delete').addClass('btn-row-Add').html(self.addText);
            })
            .off('click', '.btn-row-Add').on('click', '.btn-row-Add', function() {
                $(this).removeClass('btn-row-Add').addClass('btn-row-Delete').html(self.deleteText);
                if (self.tag.next('.editable-container').find('.btn-row-Add').length == 0) {
                    $(this).parents('.row-editable').after(self.getOneRecord('', jParent.find('.row-editable').length + 1 < self.limit));
                }
                jParent.find('.editable-input').scrollTop(99999);
                jParent.find('input').last().focus();
                return false;
            });

    },
    getNewValue: function() {
        var str = [];
        $.each(this.tag.parent().find('input'), function(k, v) {
            var value = $.trim(v.value);
            if (value) {
                str.push(value);
            }
        });
        return str.join('\n');
    },
    onShown: function($elm, e, editable, html) {
        var self = this;
        var textarea = $elm.find('.editable-input textarea');
        var html = html;

        textarea.hide();
        textarea.prevAll('.row-editable').remove();
        textarea.before(self.parse(html));
    },
    init: function(config) {
        config = config || {};
        this.limit = +config.limit || 10;
        this.tag = $(config.tag || document);
        this.css = config.css || '';
        this.addText = config.addText || 'Add';
        this.deleteText = config.deleteText || 'Delete';
        this.emptytext = config.emptytext || "";
        this.bindEvent();
    }
}
PixelURL.prototype.init.prototype = PixelURL.prototype;

export default PixelURL
