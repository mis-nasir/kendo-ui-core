﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<%:Html.Kendo().MobileView()
        .Name("listview-virtualization")
        .Title("Products")
        .Events(events => events.Init("listViewInit"))
        .Content(obj =>
            Html.Kendo().MobileListView<Kendo.Mvc.Examples.Models.ProductViewModel>()
                .Name("local-filterable-listview")
                .TemplateId("mobile-listview-filtering-template")
                .Filterable(filter => filter.Operator("startswith").Field("ProductName"))
                .DataSource(dataSource => dataSource.ServerOperation(false))
                .BindTo(Model)                
        )
%>

<script type="text/x-kendo-tmpl" id="mobile-listview-filtering-template">
    <div class="product">
        <h3>#:ProductName#</h3>
        <p>#:kendo.toString(UnitPrice, "c")#</p>
    </div>
</script>

<style>
    .product h3 {
        font-size: 1.3em;
        line-height: 1.4em;
        margin: 0;
        padding: 0;
        height: 1.3em;
        overflow: hidden;
    }
    .product p {
        font-size: 1em;
        margin: 0;
        padding: .3em 0 0;
    }
    .pullImage {
        width: 64px;
        height: 64px;
        border-radius: 3px;
        float: left;
        margin-right: 10px;
    }
</style>

</asp:Content>