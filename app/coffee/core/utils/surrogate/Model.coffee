# surrogate model
define ->

    class Model

        constructor: (obj) ->

            _hash = obj || {}

            getProperty = (name) ->
                if name is ""
                    throw new Error "Property must not be empty!"
                return _hash[name]

            setProperty = (name, value) ->
                _hash[name] = value

            addSource = (object) ->
                _hash = object
                return @

            getHash = ->
                return _hash

            domesticateSource = () ->
                for property, propertyValue of _hash
                    if @.hasOwnProperty property
                        throw new Error "Source can not be domesticated - property '#{prop}' exists!"
                    else
                        @[property] = propertyValue
                return @


            return {
                getProperty         : getProperty
                setProperty         : setProperty
                addSource           : addSource
                getHash             : getHash
                domesticateSource   : domesticateSource
            }