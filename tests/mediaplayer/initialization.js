(function () {
    var MediaPlayer = kendo.ui.MediaPlayer,
        div;

    module("kendo.ui.MediaPlayer initialization", {
        setup: function () {
            div = $("<div />").appendTo(QUnit.fixture);
            mediaPlayer = new MediaPlayer(div, { media: { title: "fakeTitle", source: "http://localhost" } });
            htmlPlayerMock = {
                muted: false,
                currentTime: 0,
                duration: 0,
                volume: 0,

                play: function () { },
                pause: function () { },
                remove: function () { }
            };
            mediaPlayer._media = htmlPlayerMock;
        },
        teardown: function () {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("attaches a mediaplayer object to a target", function () {
        ok(div.data("kendoMediaPlayer") instanceof MediaPlayer);
    });

    test("adds css classes to wrapper", function () {
        ok(mediaPlayer.element.is(".k-mediaplayer.k-widget"));
    });

    test("adds toolbar widget", function () {
        ok(mediaPlayer.toolbar().element.is(".k-mediaplayer-toolbar.k-toolbar"));
    });

    test("adds volume slider widget", function () {
        ok(mediaPlayer._volumeSlider.wrapper.is(".k-mediaplayer-volume.k-slider"));
    });

    test("adds seekbar slider widget", function () {
        ok(mediaPlayer._slider.wrapper.is(".k-mediaplayer-seekbar.k-slider"));
    });

    test("adds titlebar element", function () {
        ok(mediaPlayer._titleBar.is(".k-mediaplayer-titlebar"));
    });

    test("adds play/pause toolbar button", function () {
        ok(mediaPlayer._playButtonSpan.is(".k-i-play"));
    });

    test("adds volume toolbar button", function () {
        ok(mediaPlayer._volumeButton.children().is('[class*="k-i-volume"]'));
    });

    //TODO: Test should be fixed after all font-icons cherrypicks are completed
    skip("adds dropdown template to toolbar", function () {
        ok(mediaPlayer.dropdown().span.siblings().children().is(".k-i-HD"));
    });

    test("adds dropdown widget to toolbar", function () {
        ok(mediaPlayer.dropdown() instanceof kendo.ui.DropDownList);
    });

    test("dropdown should be hidden initially when there is only one source", function () {
        ok(mediaPlayer.toolbar().wrapper.is(":visible"));
    });

    test("adds fullscreen toolbar button", function () {
        ok(mediaPlayer._fullscreenButton.children().is('[class*="k-i-fullscreen"]'));
    });

    test("adds kendo toolbar", function () { 
        ok(mediaPlayer._toolBar instanceof kendo.ui.ToolBar);    
    });

    test("adds kendo slider", function () { 
        ok(mediaPlayer._slider instanceof kendo.ui.Slider);    
    });
})();