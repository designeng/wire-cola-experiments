define
    $plugins:[
        "wire/debug"
        "wire/dom"
    ]

    controller:
        create: "components/transducer/controller"
        ready:
            onReady: {}