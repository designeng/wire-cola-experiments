path = require "path"
Chance = require "chance"

randomRange = (num1, num2) ->
    Math.floor(Math.random() * (num2 - num1)) + num1 + 1

ConnectMW = {}

ConnectMW.folderMount = (connect, point) ->
    return connect.static path.resolve(point)

# "service/stub"
ConnectMW.stubService = (req, res, next) ->
    if (req.url).match new RegExp("service/stub")

        params = require('url').parse(req.url, true).query

        body = 
            europe: 
                towns: ["Tokio", "Paris"]

        res.setHeader "Content-Type", "application/json; charset=utf-8"
        res.write JSON.stringify body
        res.end()

    else
        next()

# "service/autocomplete"
ConnectMW.autocompleteService = (req, res, next) ->
    if (req.url).match new RegExp("service/autocomplete")

        airports = ["Moscow", "Paris", "Tokio", "Rome", "London" ]
        id = 0
        body = 
            airports: []

        chance = new Chance()

        for port in airports      
            body.airports.push {id: id, port: port, chance: chance.word({length: 7}), location: chance.coordinates() }
            id++

        res.setHeader "Content-Type", "application/json; charset=utf-8"
        res.write JSON.stringify body
        res.end()

    else
        next()

ConnectMW.aeroportsService = (req, res, next) ->
    if (req.url).match new RegExp("service/aeroports")

        airports = []
        body = 
            airports: []

        chance = new Chance()

        for num in [1..200]
            range = randomRange(0, 10)
            innerList = []
            for i in [0..range]
                innerList.push {id: i, name: chance.name(), hash: chance.hash({length: 7}) }
            body.airports.push {id: num, port: chance.name(), chance: chance.word({length: 7}), location: chance.coordinates(), innerList: innerList }

        res.setHeader "Content-Type", "application/json; charset=utf-8"
        res.write JSON.stringify body
        res.end()

    else
        next()

# "service/names"
ConnectMW.namesService = (req, res, next) ->
    if (req.url).match new RegExp("service/names")

        names = ["Ramon Phillips", "Ted Benson", "Dorothy Wise"]
        id = 0
        body = 
            names: []

        for name in names
            body.names.push {id: id, name: name}
            id++

        res.setHeader "Content-Type", "application/json; charset=utf-8"
        res.write JSON.stringify body
        res.end()

    else
        next()

module.exports = ConnectMW