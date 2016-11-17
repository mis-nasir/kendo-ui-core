(function(f, define){
    define([
        "./kendo.core",
        "./kendo.router",
        "./kendo.view",
        "./kendo.fx",
        "./kendo.dom",
        "./kendo.data.odata",
        "./kendo.data.xml",
        "./kendo.data",
        "./kendo.ooxml",
        "./kendo.excel",
        "./kendo.data.signalr",
        "./kendo.binder",
        "./kendo.drawing",
        "./kendo.validator",
        "./kendo.userevents",
        "./kendo.draganddrop",
        "./kendo.mobile.scroller",
        "./kendo.groupable",
        "./kendo.reorderable",
        "./kendo.resizable",
        "./kendo.sortable",
        "./kendo.selectable",
        "./kendo.button",
        "./kendo.pager",
        "./kendo.popup",
        "./kendo.notification",
        "./kendo.tooltip",
        "./kendo.list",
        "./kendo.calendar",
        "./kendo.datepicker",
        "./kendo.autocomplete",
        "./kendo.dropdownlist",
        "./kendo.combobox",
        "./kendo.multiselect",
        "./kendo.colorpicker",
        "./kendo.columnmenu",
        "./kendo.columnsorter",
        "./kendo.grid",
        "./kendo.listview",
        "./kendo.filebrowser",
        "./kendo.imagebrowser",
        "./kendo.editor",
        "./kendo.numerictextbox",
        "./kendo.maskedtextbox",
        "./kendo.mediaplayer",
        "./kendo.menu",
        "./kendo.editable",
        "./kendo.pivot.fieldmenu",
        "./kendo.filtercell",
        "./kendo.panelbar",
        "./kendo.progressbar",
        "./kendo.responsivepanel",
        "./kendo.tabstrip",
        "./kendo.timepicker",
        "./kendo.toolbar",
        "./kendo.datetimepicker",
        "./kendo.treeview.draganddrop",
        "./kendo.treeview",
        "./kendo.slider",
        "./kendo.splitter",
        "./kendo.upload",
        "./kendo.dialog",
        "./kendo.window",
        "./kendo.virtuallist",
        "./kendo.scheduler.view",
        "./kendo.scheduler.dayview",
        "./kendo.scheduler.agendaview",
        "./kendo.scheduler.monthview",
        "./kendo.scheduler.recurrence",
        "./kendo.scheduler",
        "./kendo.gantt.list",
        "./kendo.gantt.timeline",
        "./kendo.gantt",
        "./kendo.treelist",
        "./kendo.pivotgrid",
        "./kendo.spreadsheet",
        "./kendo.pivot.configurator",
        "./kendo.angular"
    ], f);
})(function(){
    "bundle all";
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
