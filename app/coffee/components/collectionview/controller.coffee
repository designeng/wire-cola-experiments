define [
    "jquery"
    "when"
    "underscore"
    "cola/dom/adapter/NodeList"
], ($, When, _, NodeListAdapter) ->

    class CollectionViewController

        onReady: ->
            When(true).delay(200).then () =>
                @townsCollection.addSource(@townsCollectionSource)

            When(true).delay(400).then () =>

                byId = (o) ->
                    o and o.id
                querySelector = (selector, node) ->
                    node.querySelector(selector)
                compareByLast = (a, b) ->
                    return 1

                # needed to be defined:
                # comparator, identifier, querySelector
                dest = new NodeListAdapter(@namesListView, {
                        comparator: compareByLast
                        identifier: byId
                        querySelector: querySelector
                        bindings:
                            name: '.name'
                    })
                @namesCollection.addSource(@namesCollectionSource)
                @namesCollection.addSource(dest)

                $("ul").find("[data-cola-id='Tokio']").append(@namesListView)

            # When(true).delay(700).then () =>

            #     _byId = (o) ->
            #         o and o.id
            #     _querySelector = (selector, node) ->
            #         node.querySelector(selector)
            #     _compareByLast = (a, b) ->
            #         return 1

            #     _namesCollectionSource  = _.clone @namesCollectionSource
            #     _namesCollection        = _.clone @namesCollection
            #     # _namesListView          = _.clone @namesListView

            #     # needed to be defined:
            #     # comparator, identifier, querySelector
            #     # _dest = new NodeListAdapter(_namesListView, {
            #     #         comparator: _compareByLast
            #     #         identifier: _byId
            #     #         querySelector: _querySelector
            #     #         bindings:
            #     #             name: '.name'
            #     #     })

            #     # _namesCollection.addSource(_namesCollectionSource)
            #     # _namesCollection.addSource(_dest)

            #     $("ul").find("[data-cola-id='London']").append(@namesListView)