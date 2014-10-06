define
    $plugins:[
        "wire/debug"
        "wire/dom"
        "wire/dom/render"
        "wire/on"
        "core/plugin/template/hb"
        "core/plugin/validate"
    ]

    formController:
        create: "components/form/controller"
        ready:
            onReady: {}
        properties:
            formView: {$ref: 'formView'}

    formPattern:
        module: "hbs!components/form/template.html"

    formViewTemplate:
        templateSource:
            pattern: {$ref: 'formPattern'}
            fillWith:
                firstName: "firstName"
                lastName: "lastName"
                phone: "phone"
                email: "email"
                save: "save"
                clear: "clear"

    formView:
        render:
            template: {$ref: 'formViewTemplate'}
        insert:
            at: {$ref: 'slot'}
        validate:
            fields:
                firstName:
                    "not longer than 10 characters":
                        rule: (value) ->
                            if value > 10
                                return false
                            else
                                return true
                        message: "Should not be longer than 10 characters!"
                email:
                    "should have word '@'":
                        rule: /@/g
                        message: "Should have word '@'!"
            afterValidation: {$ref: "formController.afterValidation"}


