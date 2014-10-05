define
    $plugins:[
        "wire/debug"
        "wire/dom"
    ]

    # controller:
    #     create: "components/when/controller"
    #     ready:
    #         # onReady: {}
    #         # validate: {}
    #         # validateWithSequence: {}

    controller:
        create: "components/when/experiments/promised"
        ready:
            # ruleToPromiseArray: {}
            wrapFunc: {}
