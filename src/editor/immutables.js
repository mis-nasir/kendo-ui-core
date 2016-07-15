(function(f, define){
    define([ "./tables" ], f);
})(function(){

(function($, undefined) {
    var kendo = window.kendo,
        Class = kendo.Class,
        Editor = kendo.ui.editor,
        dom = Editor.Dom,
        template = kendo.template,
        RangeUtils = Editor.RangeUtils,
        complexBlocks = ["ul", "ol", "tbody", "thead", "table"],
        toolsToBeUpdated = [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "superscript",
            "subscript",
            "forecolor",
            "backcolor",
            "fontname",
            "fontsize",
            "createlink",
            "unlink",
            "autolink",
            "addcolumnleft",
            "addcolumnright",
            "addrowabove",
            "addrowbelow",
            "deleterow",
            "deletecolumn",
            "mergecells",
            "formatting",
            "cleanformatting" ],
        IMMUTABALE = "k-immutable";

    var rootCondition = function(node) {
        return $(node).is("body,.k-editor");
    };

    var immutable = function(node) {
        return node.getAttribute && node.getAttribute("contenteditable") == "false";
    };

    var immutableParent = function (node) {
        return dom.closestBy(node, immutable, rootCondition);
    };

    var expandImmutablesIn = function(range) {
        var startImmutableParent = immutableParent(range.startContainer);
        var endImmutableParent = immutableParent(range.endContainer);

        if (startImmutableParent || endImmutableParent) {
            if (startImmutableParent){
                range.setStartBefore(startImmutableParent);
            }
            if (endImmutableParent){
                range.setEndAfter(endImmutableParent);
            }
        }
    };

    var immutablesContext = function(range) {
        if (immutableParent(range.commonAncestorContainer)) {
            return true;
        } else if(immutableParent(range.startContainer) || immutableParent(range.endContainer)){
            var editableNodes = RangeUtils.editableTextNodes(range);
            if (editableNodes.length === 0){
                return true;
            }
        }
        return false;
    };

    var deletingKey = function (keyCode) {
        var keys = kendo.keys;
        return keyCode === keys.BACKSPACE || keyCode == keys.DELETE;
    };

    var Immutables = Class.extend({
        init: function (editor) {
            this.editor = editor;
            this.serializedImmutables = {};
            this.options = $.extend({}, editor && editor.options && editor.options.immutables);
        },

        serialize: function(node) {
            var result = this._toHtml(node);
            var id = this.randomId();
            this.serializedImmutables[id] = $(node).clone(true);
            if (result.indexOf(IMMUTABALE) === -1) {
                result = result.replace(/>/, ' ' + IMMUTABALE + '="' + id + '">');
            }
            return result;
        },

        _toHtml: function(node){
            var serialization = this.options.serialization;
            var serializationType = typeof serialization;
            var nodeName;

            switch (serializationType) {
                case "string":
                    return template(serialization)(node);
                case "function":
                    return serialization(node);
                default:
                    nodeName = dom.name(node);
                    return "<" + nodeName + "></" + nodeName + ">";
            }
        },

        deserialize: function(node) {
            var that = this;
            var deserialization = this.options.deserialization;

            $('[' + IMMUTABALE+ ']', node).each(function() {
                var id = this.getAttribute(IMMUTABALE);
                var immutable = that.serializedImmutables[id];
                if (kendo.isFunction(deserialization)) {
                    deserialization(this, immutable[0]);
                }
                $(this).replaceWith(immutable);
            });

            that.serializedImmutables = {};
        },

        randomId: function(length) {
            var result = '';
            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (var i = length || 10; i > 0; --i) {
                result += chars.charAt(Math.round(Math.random() * (chars.length - 1)));
            }
            return result;
        },

        keydown: function(e, range) {
            var isDeleting = deletingKey(e.keyCode);
            var shouldCancelEvent = (isDeleting && this._cancelDeleting(e, range)) ||
                (!isDeleting && this._cancelTyping(e, range));

            if (shouldCancelEvent) {
                e.preventDefault();
                return true;
            }
        },

        _cancelTyping: function(e, range) {
            var editor = this.editor;
            var keyboard = editor.keyboard;

            return range.collapsed && !keyboard.typingInProgress &&
                keyboard.isTypingKey(e) && immutablesContext(range);
        },

        _cancelDeleting: function(e, range) {
            var keys = kendo.keys;
            var backspace = e.keyCode === keys.BACKSPACE;
            var del = e.keyCode == keys.DELETE;

            if (!backspace && !del) {
                return false;
            }
            var cancelDeleting = false;
            if (range.collapsed) {
                if (immutablesContext(range)) {
                    return true;
                }
                var immutable = this.nextImmutable(range, del);
                if (immutable && backspace) {
                    var closestSelectionLi = dom.closest(range.commonAncestorContainer, "li");
                    if (closestSelectionLi) {
                        var closestImmutableLi = dom.closest(immutable, "li");
                        if (closestImmutableLi && closestImmutableLi !== closestSelectionLi) {
                            return cancelDeleting;
                        }
                    }
                }
                if (immutable && !dom.tableCell(immutable)) {
                    if (dom.parentOfType(immutable, complexBlocks) === dom.parentOfType(range.commonAncestorContainer, complexBlocks)) {
                        while (immutable && immutable.parentNode.childNodes.length == 1) {
                            immutable = immutable.parentNode;
                        }
                        if (dom.tableCell(immutable)) {
                            return cancelDeleting;
                        }
                        this._removeImmutable(immutable, range);
                    }
                    cancelDeleting = true;
                }
            }
            return cancelDeleting;
        },

        nextImmutable: function(range, forwards) {
            var commonContainer = range.commonAncestorContainer;
            if (dom.isBom(commonContainer) || ((forwards && RangeUtils.isEndOf(range, commonContainer)) || (!forwards && RangeUtils.isStartOf(range, commonContainer)))) {
                var next = this._nextNode(commonContainer, forwards);
                if (next && dom.isBlock(next) && !immutableParent(next)) {
                    while (next && next.children && next.children[forwards ? 0 : next.children.length - 1]) {
                        next = next.children[forwards ? 0 : next.children.length - 1];
                    }
                }
                return immutableParent(next);
            }
        },

        _removeImmutable: function(immutable, range) {
            var editor = this.editor;
            var startRestorePoint = new Editor.RestorePoint(range, editor.body);
            dom.remove(immutable);
            Editor._finishUpdate(editor, startRestorePoint);
        },

        _nextNode: function(node, forwards) {
            var sibling = forwards ? "nextSibling" : "previousSibling";
            var current = node, next;
            while(current && !next) {
                next = current[sibling];
                if (next && dom.isDataNode(next) && /^\s|[\ufeff]$/.test(next.nodeValue)){
                    current = next;
                    next = current[sibling];
                }
                if (!next){
                    current = current.parentNode;
                }
            }
            return next;
        }
    });

    Immutables.immutable = immutable;
    Immutables.immutableParent = immutableParent;
    Immutables.expandImmutablesIn = expandImmutablesIn;
    Immutables.immutablesContext = immutablesContext;
    Immutables.toolsToBeUpdated = toolsToBeUpdated;

    Editor.Immutables = Immutables;
})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });