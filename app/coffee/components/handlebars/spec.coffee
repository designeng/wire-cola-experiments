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

    # ------------------------ single model rendering ---------------------------
    townsViewHtml:
        module: "hb!components/handlebars/towns.html"

    townsViewTemplate:
        templateSource:
            # pattern is the reference to compiled function in handlebars case:
            pattern: {$ref: 'townsViewHtml'}
            fillWith:
                port: "Model"
                chance: "only"
                location: "rendered"

    townsView:
        render:
            template: {$ref: 'townsViewTemplate'}
        insert:
            at: {$ref: 'dom.first!.left', at: {$ref: 'contentView'}}

    # ------------------------ collection rendering ---------------------------
    collectionSource:
        create: "components/handlebars/collectionSource"

    collectionItemViewHtml:
        module: "hb!components/handlebars/collectionItem.html"

    collectionInnerListPartial:
        module: "hb!components/handlebars/collectionInnerListPartial.html"

    collectionViewTemplate:
        templateSource:
            rootElement: "ul"
            itemPattern: {$ref: 'collectionItemViewHtml'}
            fillWith: {$ref: 'collectionSource'}
            partials:
                "innerListHelper": {$ref: 'collectionInnerListPartial'}

            # itemTransformations:
            #     "innerList": {$ref: 'innerListTransformation'}

    collectionView:
        render:
            template: {$ref: 'collectionViewTemplate'}
        insert:
            at: {$ref: 'dom.first!.right', at: {$ref: 'contentView'}}