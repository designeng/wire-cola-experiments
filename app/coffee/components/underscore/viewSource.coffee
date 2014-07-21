define [
    "underscore"
    "when"
], (_, When) ->

    # @param {String} template
    # @param {Object} model
    viewSource = (template, model) ->
        html = _.template template, model
        return html