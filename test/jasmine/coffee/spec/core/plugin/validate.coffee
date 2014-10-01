# serviceHub
define [
    "wire"
    "core/plugin/utils/validatePluginUtils"
], (wire, ValidatePluginUtils) ->

    

    # controller
    # sendRequestSpy = jasmine.createSpy('sendRequest')

    define 'formController', () ->
        class FormController

            firstNameRule: ->
                return true

            behaviorHandler: ->


    # spec
    formSpec = 
        $plugins:[
            "core/plugin/validate"
        ]

        options:
            literal:
                fields:
                    firstName:
                        "not longer than 20 characters":
                            rule: {$ref: 'formController.firstNameRule'}
                            message: "Should not be longer than 20 characters!"
                    email:
                        "should have word '@'":
                            rule: /@/g
                            message: "Should have word '@'!"


        validationPlugin:
            create: "core/plugin/validate"

        formController:
            create: "formController"

    describe "validationPluginUtils", ->

        beforeEach (done) ->
            @pluginUtils = new ValidatePluginUtils()
            wire(formSpec).then (@ctx) =>           
                @options = @ctx.options
                console.log "@options", @options
                done()
            .otherwise (err) ->
                console.log "ERROR", err
                
            done()

        it "rule regexp should be normalized to function", (done) ->
            rule = /test/
            expect(@pluginUtils.normalizeRule(rule)).toBeFunction()
            done()

        it "rule function should be function", (done) ->
            rule = () -> return true
            expect(@pluginUtils.normalizeRule(rule)).toBeFunction()
            done()

        it "pipelineStrategies returns promise", (done) ->
            extracted = @pluginUtils.extractStrategies @options
            extracted = @pluginUtils.normalizeArray extracted
            # for obj in extracted
            #     console.log "OBJ::", obj
            #     expect(@pluginUtils.toPromise(obj.rule)).toBePromise()
            done()


    # describe "validationPlugin", ->

    #     beforeEach (done) ->

    #         wire(formSpec).then (@ctx) => 
    #             done()
    #         .otherwise (err) ->
    #             console.log "ERROR", err

    #     it "validationPlugin is object", (done) ->
    #         expect(@ctx.validationPlugin).toBeObject()
    #         done()

    #     it "facet function defined", (done) ->
    #         expect(@ctx.validationPlugin.facets.validate.ready).toBeFunction()
    #         done()

    # describe "validation plugin integration", ->

    #     beforeEach (done) ->
    #         wire(formSpec).then (@ctx) =>           
    #             done()
    #         .otherwise (err) ->
    #             console.log "ERROR", err

    #     it "controller", (done) ->
    #         expect(@ctx.formController).toBeDefined()
    #         done()

    #     it "controller", (done) ->
    #         expect(@ctx.formController).toBeDefined()
    #         done()