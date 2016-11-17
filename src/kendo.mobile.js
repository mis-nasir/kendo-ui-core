(function(f, define){
    define([
        "./kendo.core",
        "./kendo.fx",
        "./kendo.data.odata",
        "./kendo.data.xml",
        "./kendo.data",
        "./kendo.data.signalr",
        "./kendo.binder",
        "./kendo.validator",
        "./kendo.router",
        "./kendo.view",
        "./kendo.userevents",
        "./kendo.draganddrop",
        "./kendo.popup",
        "./kendo.touch",
        "./kendo.mobile.popover",
        "./kendo.mobile.loader",
        "./kendo.mobile.scroller",
        "./kendo.mobile.shim",
        "./kendo.mobile.view",
        "./kendo.mobile.modalview",
        "./kendo.mobile.drawer",
        "./kendo.mobile.splitview",
        "./kendo.mobile.pane",
        "./kendo.mobile.application",
        "./kendo.mobile.actionsheet",
        "./kendo.mobile.button",
        "./kendo.mobile.buttongroup",
        "./kendo.mobile.collapsible",
        "./kendo.mobile.listview",
        "./kendo.mobile.navbar",
        "./kendo.mobile.scrollview",
        "./kendo.mobile.switch",
        "./kendo.mobile.tabstrip",
        "./kendo.angular"
    ], f);
})(function(){
    "bundle all";
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
