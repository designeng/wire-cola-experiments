define [
], () ->

    modelSource = () ->
        personData = 
            firstName           : "Ivan"
            lastName            : "Ivanov"
            bonusCardNumber     : undefined
            birthDate           : "01.01.1991"
            citizenship         : "Germany"
            documentNumber      : "1234567"
            expirationDate      : "01.01.2014"
            ticketNumbers       : "123, 4567"

        return personData