define ->

    $plugins: [
        'wire/debug'
        'wire/on'
        'wire/dom'
        'wire/dom/render'
        'core/plugin/template/hb'
    ]

    contentView:
        render:
            template:
                module: "text!components/handlebars/template.html"
        insert:
            at: {$ref: 'slot'}

    townsViewHtml:
        module: "hb!components/handlebars/towns.html"

    townsViewTemplate:
        templateSource:
            # compiled function in handlebars case:
            pattern: {$ref: 'townsViewHtml'}
            # rootElement: "ul"
            # itemPattern: {$ref: 'townItemUnderscoreViewHtml'}
            fillWith:
                port: "Model"
                chance: "only"
                location: "rendered"

            # itemTransformations:
            #     "innerList": {$ref: 'innerListTransformation'}

    townsView:
        render:
            template: {$ref: 'townsViewTemplate'}
        insert:
            at: {$ref: 'dom.first!.left', at: {$ref: 'contentView'}}

    # collectionViewHtml:
    #     module: "hb!components/handlebars/towns.html"