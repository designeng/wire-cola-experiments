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
        module: "hbs!components/handlebars/towns"

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
        module: "hbs!components/handlebars/collectionItem"

    collectionInnerListPartial:
        module: "hbs!components/handlebars/collectionInnerListPartial"

    # transformation on list - just to show principle
    innerListTransformation:
        create: "components/handlebars/transformations/innerListTransformation"

    collectionViewTemplate:
        templateSource:
            rootElement: "ul"
            itemPattern: {$ref: 'collectionItemViewHtml'}
            fillWith: {$ref: 'collectionSource'}

            partials:
                "innerListPartial": {$ref: 'collectionInnerListPartial'}

            itemTransformations:
                "innerList": {$ref: 'innerListTransformation'}

    collectionView:
        render:
            template: {$ref: 'collectionViewTemplate'}
        insert:
            at: {$ref: 'dom.first!.right', at: {$ref: 'contentView'}}
        on:
            "click:li": "controller.onClick"
            "click:li.inner": "controller.onClickInner"

    # just for outer functions work demonstration
    controller:
        create: "components/handlebars/controller"
        properties:
            collectionView: {$ref: 'collectionView'}
        ready:
            onReady: {}