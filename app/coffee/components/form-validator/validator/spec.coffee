define
    $plugins:[
        # "wire/debug"
        "wire/dom"
        "wire/dom/render"
        "wire/on"
        "wire/aop"
        "components/form/validator/plugin/streams"
    ]

    # @provided:
    #   form
    #   fieldNames
    #   displaySlot
    #   strategy

    errorDisplay:
        wire:
            spec: "components/form/validator/display/spec"
            provide:
                displaySlot: {$ref: 'slot'}

    defaultPointMessage: "Пожалуйста, заполните это поле"

    validator:
        create: 
            module: "components/form/validator/validator"
            args: [{
                strategy: {$ref: 'strategy'}
                defaultPointMessage: {$ref: 'defaultPointMessage'}
            }]

    controller:
        create: "components/form/validator/controller"
        properties:
            form            : {$ref: 'form'}
            fieldNames      : {$ref: 'fieldNames'}
            successHandler  : {$ref: 'successHandler'}
            errorDisplay    : {$ref: 'errorDisplay'} 
            validator       : {$ref: 'validator'}
        # Prefixes:
        # "before:" - method will be invoked before all filters, returned value ignored;
        # "filter:" - method will be invoked before all tasks, can return true or false.
        # Another tasks (without prefix) will be pipelined and invoked in order from left to right 
        # - in case of conjunction of all filters returns true.
        streams:
            "focus" :   "before:hideError | filter:checkForRegistredError | getRegistredError | displayError"
            "keyup" :   "filter:checkForRegistredError | validate | displayError| highLight"
            "change":   "validate | registerError | highLight"
            "submit":   "validateAll"
            