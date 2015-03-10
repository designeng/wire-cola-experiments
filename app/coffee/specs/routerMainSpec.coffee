# routerMainSpec
define
    $plugins: [
        # "wire/debug"
        "wire/dom"
        "core/plugin/contextRouter"
    ]

    appRouter:
        contextRouter: 
            routes:
                "collectionexperiment"    :
                    spec: "components/collectionexperiment/spec"
                    slot: {$ref: "dom.first!#page"}
                "handlebars"    :
                    spec: "components/handlebars/spec"
                    slot: {$ref: "dom.first!#page"}
                "form"    :
                    spec: "components/form/spec"
                    slot: {$ref: "dom.first!#page"}
                "when"    :
                    spec: "components/when/spec"
                    slot: {$ref: "dom.first!#page"}
                "transducer"    :
                    spec: "components/transducer/spec"
                    slot: {$ref: "dom.first!#page"}
                "collection"    :
                    spec: "components/collection/spec"
                    slot: {$ref: "dom.first!#page"}

