define
    $plugins:[
        "wire/debug"
        "wire/dom"
        "wire/dom/render"
        "wire/on"
        "wire/aop"
        "core/plugin/validate"
    ]

    errorStorage:
        create: "components/form/validator/errorStorage"

    errorDisplay:
        wire:
            spec: "components/form/validator/display/spec"
            provide:
                displaySlot: {$ref: 'slot'}

    controller:
        create: "components/form/validator/controller"
        properties:
            form        : {$ref: 'form'}
            errorStorage: {$ref: 'errorStorage'}
            errorDisplay: {$ref: 'errorDisplay'} 
        ready:
            onReady: {}
            