define ->

    $plugins: [
        'wire/debug'
        'wire/on'
        'wire/dom'
        'wire/dom/render'
        'core/plugin/template/source'
        'cola'
    ]

    contentView:
        render:
            template:
                module: "text!components/collectionexperiment/template.html"
        insert:
            at: {$ref: 'slot'}

    townsViewTemplate:
        module: "text!components/collectionexperiment/towns.html"

    townsView:
        render:
            template: {$ref: 'townsViewTemplate'}
        insert:
            at: {$ref: 'dom.first!.left', at: {$ref: 'contentView'}}
        bind:
            to: {$ref: 'townsCollection'}
            bindings:
                port: ".port"
                chance: ".chance"
                # location: ".location"
                # location: [
                #     {selector: '.location', handler: { $ref: 'controller.locationHandler', attr: "text" }}
                # ]

    townsUnderscoreCollectionSource:
        create: "components/collectionexperiment/townsUnderscoreCollectionSource"

    townsUnderscoreViewHtml:
        module: "text!components/collectionexperiment/towns_underscore.html"

    townItemUnderscoreViewHtml:
        module: "text!components/collectionexperiment/townItem_underscore.html"

    townsUnderscoreViewTemplate:
        templateSource:
            # pattern: {$ref: 'townsUnderscoreViewHtml'}
            rootElement: "ul"
            itemPattern: {$ref: 'townItemUnderscoreViewHtml'}
            fillWith: {$ref: 'townsUnderscoreCollectionSource'}
                # can be filled with model - just set the object with fields
                # port: "testport"
                # chance: "2"
                # location: "3"



    townsUnderscoreView:
        render:
            template: {$ref: 'townsUnderscoreViewTemplate'}
        insert:
            at: {$ref: 'dom.first!.right', at: {$ref: 'contentView'}}

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

    controller:
        create: "components/collectionexperiment/controller"
        ready:
            onReady: {}