define [
    "underscore"
    "when"
    "jasmine"
    "boot"
], (_, When) ->

    beforeEach -> 

        jasmine.addMatchers
            toBeString: () ->
                return {
                    compare: (actual) ->
                        return  {
                            pass: _.isString(actual)
                        }
                }
            toBeObject: () ->
                return {
                    compare: (actual) ->
                        return  {
                            pass: _.isObject(actual)
                        }
                }
            toBeFunction: () ->
                return {
                    compare: (actual) ->
                        return  {
                            pass: _.isFunction(actual)
                        }
                }
            toBeArray: () ->
                return {
                    compare: (actual) ->
                        return  {
                            pass: _.isArray(actual)
                        }
                }
            toBeInArray: (array) ->
                return {
                    compare: (actual) ->
                        return  {
                            pass: _.indexOf(array, actual)
                        }
                }

            toBePromise: () ->
                return {
                    compare: (actual) ->
                        return  {
                            pass: When.isPromiseLike(actual)
                        }
                }




