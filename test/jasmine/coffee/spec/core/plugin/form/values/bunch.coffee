define [
    "underscore"
    "jquery"
    "wire"
    "text!/test/jasmine/fixtures/formFixture.html"
    "jasmine-jquery"
], (_, $, wire, formFixture, displaySlotFixture) ->

    noop = () ->

    callbackSpy = jasmine.createSpy('callbackSpy')

    collectionSource = [
        {one: "1", two: "2"}
        {one: "10", two: "20"}
        {one: "100", two: "200"}
        {one: undefined, two: "200"}
        {one: "1000", two: undefined}
        {one: null, two: undefined}
        {one: null, two: null}
        {one: noop , two: {}}
        {one: parseInt("10000"), two: Number()}
        {}
    ]

    define 'controller', ->
        class Controller

            onReady: (collection) ->
                collection.addSource collectionSource

            oneFilterCallback: callbackSpy

            invokerOne: ->
                return {
                    checkForString: _.isString
                }

            invokerTwo: ->
                return {
                    allowedValues: ["2", "20"]
                }

            successHandler: (res) ->
                console.debug "RES: successHandler", res

    integrationSpec = 
        $plugins: [
            'wire/debug'
            'wire/on'
            'wire/dom'
            'wire/dom/render'
            'wire/connect'
            'core/plugin/data/structure/collection'
            'core/plugin/form/values/bunch'
        ]

        form: {$ref: 'dom.first!.searchForm'}

        controller:
            create: "controller"
            ready:
                onReady: {$ref: "firstCollection"}

        firstCollection:
            create: "core/utils/surrogate/Collection"

        secondCollection:
            cloneStructure: {$ref: "firstCollection"}
            connect:
                "applyFilter": "getSource | controller.oneFilterCallback"

    # tests
    describe "bunch plugin jasmine spec", ->

        beforeEach (done) ->
            setFixtures(formFixture)
            wire(integrationSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR:", err
                done()

        afterEach (done) ->
            @ctx.destroy()
            done()

        it "secondCollection should listen to streams", (done) ->
            form = $(@ctx.form)

            input0 = form.find("[name='firstName']")
            input = form.find("[name='lastName']")

            input0.focus()
            input0.val("123")

            done()
            