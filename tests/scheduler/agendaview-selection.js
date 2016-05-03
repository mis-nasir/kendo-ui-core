(function() {
   var AgendaView = kendo.ui.AgendaView,
        Event = kendo.data.SchedulerEvent,
        keys = kendo.keys,
        container;

    function setup(options) {
        return new AgendaView(container, $.extend(true, { date: new Date(2013, 1, 2) }, options));
    }

    function createSelection(options) {
        return $.extend(true, {
                events: [],
                start: new Date(2013, 1, 2),
                end: new Date(2013, 1, 2),
                index: 0
            },
            options
        );
    }

    module("Agenda View selection", {
        setup: function() {
            container = document.createElement("div");
            QUnit.fixture[0].appendChild(container);
            container = $(container).addClass("k-scheduler");
        },
        teardown: function() {
            container.data("kendoagenda").destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("create selection by dom element", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            title: "one day event"
        });

        view.render([ event ]);
        var tr = view.table.find(".k-task").closest("tr");
        var selection = view.selectionByElement(tr);

        deepEqual(selection.start, new Date(2013, 1, 2));
        deepEqual(selection.end, new Date(2013, 1, 2));
        equal(selection.index, tr.index());
        equal(selection.uid, event.uid);
    });

    test("view select: selects task row by index", function() {
        var view = setup();

        var event = new Event({
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });

        var selection = createSelection({
            index: 1
        });

        view.render([ event, secondEvent ]);
        view.select(selection);

        var row = view.table.find(".k-state-selected");
        ok(row.hasClass("k-state-selected"));
        equal(row.index(), selection.index);
    });

    test("view select: clear previous selected row", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });

        view.render([ event, secondEvent ]);
        view.select(createSelection());
        view.select(createSelection({
            index: 1
        }));

        var row = view.table.find(".k-state-selected");
        equal(row.length, 1);
        equal(row.index(), 1);
    });

    test("key down selects next event row", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });
        var selection = createSelection();

        view.render([ event, secondEvent ]);
        view.select(selection);
        var handled = view.move(selection, keys.DOWN);

        ok(handled);
        deepEqual(selection.start, new Date(2013, 1, 3));
        deepEqual(selection.end, new Date(2013, 1, 3));
        equal(selection.index, 1);
    });

    test("key up selects previous event row", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });
        var selection = createSelection({
            index: 1
        });

        view.render([ event, secondEvent ]);
        view.select(selection);
        var handled = view.move(selection, keys.UP);

        ok(handled);
        deepEqual(selection.start, new Date(2013, 1, 2));
        deepEqual(selection.end, new Date(2013, 1, 2));
        equal(selection.index, 0);
    });

    test("key down selects next event between multi day event", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2, 7, 0, 0),
            end: new Date(2013, 1, 3, 12, 0, 0),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });
        var selection = createSelection();

        view.render([ event, secondEvent ]);
        view.select(selection);
        var handled = view.move(selection, keys.DOWN);

        ok(handled);
        deepEqual(selection.start, new Date(2013, 1, 3));
        deepEqual(selection.end, new Date(2013, 1, 3));
        equal(selection.index, 1);
    });

    test("key down selects next occurance of multi day event", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2, 7, 0, 0),
            end: new Date(2013, 1, 3, 12, 0, 0),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });
        var selection = createSelection({
            index: 1
        });

        view.render([ event, secondEvent ]);
        view.select(selection);
        var handled = view.move(selection, keys.DOWN);

        ok(handled);
        deepEqual(selection.start, new Date(2013, 1, 3, 7, 0, 0));
        deepEqual(selection.end, new Date(2013, 1, 3, 12, 0, 0));
        equal(selection.index, 2);
    });

    test("the view is in range", function() {
        var view = setup();

        ok(view.isInRange());
    });

    test("move to selection period updates selection to first event info", function() {
        var view = setup();
        var event = new Event({
            start: new Date(2013, 1, 2),
            end: new Date(2013, 1, 2),
            title: "first event"
        });

        var secondEvent = new Event({
            start: new Date(2013, 1, 3),
            end: new Date(2013, 1, 3),
            title: "second event"
        });
        var selection = createSelection({
            index: 1
        });

        view.render([ event, secondEvent ]);
        view.select(selection);
        view.constrainSelection(selection);

        deepEqual(selection.start, new Date(2013, 1, 2));
        deepEqual(selection.end, new Date(2013, 1, 2));
        equal(selection.index, 0);
        equal(selection.events.length, 1);
        equal(selection.events[0], event.uid);
    });

})();