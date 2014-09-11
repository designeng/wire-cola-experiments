define ->

    $plugins: [
        'wire/debug'
        'wire/on'
        'wire/dom'
        'wire/dom/render'
    ]

    viewSource:
        create:
            module: "components/collectionexperiment/viewSource"
            args: [
                {$ref: 'underscoreViewTemplate'}
                {$ref: 'underscoreModel'}
            ]

    underscoreViewTemplate:
        module: "text!components/collectionexperiment/template.html"

    underscoreView:
        render:
            template: {$ref: 'viewSource'}
        insert:
            at: {$ref: 'slot'}

    # not a cola object
    underscoreModel:
        create:
            module: 'components/collectionexperiment/modelSource'