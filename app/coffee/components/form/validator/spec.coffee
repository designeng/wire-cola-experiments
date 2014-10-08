define
    $plugins:[
        "wire/debug"
        "wire/dom"
        "wire/dom/render"
        "wire/on"
        "wire/aop"
        "core/plugin/validate"
    ]

    # @provided:
    #   form
    #   displaySlot
    #   strategy

    errorStorage:
        create: "components/form/validator/errorStorage"

    errorDisplay:
        wire:
            spec: "components/form/validator/display/spec"
            provide:
                displaySlot: {$ref: 'slot'}

    validator:
        create: "components/form/validator/validator"
        properties:
            strategy: {$ref: 'strategy'}
        ready:
            parseStrategy: {}

    controller:
        create: "components/form/validator/controller"
        properties:
            form        : {$ref: 'form'}
            errorStorage: {$ref: 'errorStorage'}
            errorDisplay: {$ref: 'errorDisplay'} 
            validator   : {$ref: 'validator'} 
        ready:
            onReady: {}
            