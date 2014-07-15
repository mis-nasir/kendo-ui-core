﻿namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Text.RegularExpressions;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// The server side wrapper for Kendo UI PivotGrid
    /// </summary>
    public class PivotGrid<TModel>: WidgetBase
        where TModel : class
    {
        public PivotGrid(ViewContext viewContext,
                    IJavaScriptInitializer initializer,
                    IUrlGenerator urlGenerator
            )
            : base(viewContext, initializer)
        {
            DataSource = new PivotDataSource();
            DataSource.ModelType(typeof(TModel));

            UrlGenerator = urlGenerator;

            AutoBind = true;
            Reorderable = true;
            Messages = new PivotGridMessages();
        }

        public PivotDataSource DataSource
        {
            get;
            private set;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public string Configurator
        {
            get;
            set;
        }

        public int ColumnWidth
        {
            get;
            set;
        }

        public int Height
        {
            get;
            set;
        }

        public bool Reorderable
        {
            get;
            set;
        }

        public bool Filterable
        {
            get;
            set;
        }

        public PivotGridMessages Messages
        {
            get;
            set;
        }

        public bool AutoBind { get; set; }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = this.SeriailzeBaseOptions();

            if (AutoBind == false)
            {
                options["autoBind"] = AutoBind;
            }

            if (!string.IsNullOrEmpty(Configurator))
            {
                options["configurator"] = Configurator;
            }

            if (ColumnWidth != 0)
            {
                options["columnWidth"] = ColumnWidth;
            }

            if (Height != 0)
            {
                options["height"] = Height;
            }

            if (Reorderable == false)
            {
                options["reorderable"] = Reorderable;
            }

            if (Filterable == true)
            {
                options["filterable"] = Filterable;
            }

            var messages = Messages.ToJson();
            if (messages.Count > 0)
            {
                options["messages"] = messages;
            }

            options["dataSource"] = DataSource.ToJson();

            writer.Write(Initializer.Initialize(Selector, "PivotGrid", options));

            base.WriteInitializationScript(writer);
        }

        protected virtual IDictionary<string, object> SeriailzeBaseOptions()
        {
            var options = new Dictionary<string, object>(Events);

            return options;
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            PivotGridHtmlBuilder<TModel> builder = new PivotGridHtmlBuilder<TModel>(this);

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
