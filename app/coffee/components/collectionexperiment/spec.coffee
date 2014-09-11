define ->

    $plugins: [
        'wire/debug'
        'wire/on'
        'wire/dom'
        'wire/dom/render'
        'cola'
    ]

    townsViewTemplate:
        module: "text!components/collectionexperiment/towns.html"

    townsView:
        render:
            template: {$ref: 'townsViewTemplate'}
        insert:
            at: {$ref: 'slot'}
        bind:
            to: {$ref: 'townsCollection'}
            bindings:
                port: ".port"
                chance: ".chance"
                location: ".location"

    townsCollectionSource:
        create: "components/collectionexperiment/townsCollectionSource"

    identifyByPort:
        create:
            module: 'cola/identifier/property'
            args: [ 'port' ]

    townsCollection:
        create:
            module: 'cola/Collection'
            args: {identifier: { $ref: 'identifyByPort' }}

        ready:
            addSource: {$ref: 'townsCollectionSource'}