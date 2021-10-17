export class token {
    quantity: number
    name: string //policy id plus tokenid

    constructor(_quantity: number, _name: string) {
        this.quantity = _quantity
        this.name = _name
    }

    returnString() {return `${this.quantity} ${this.name}`}
}

export class nft extends token {
    metadata: string

    constructor(_quantity: number, _name: string, _metadata: string) {
        super(_quantity, _name)
        this.metadata = _metadata
    }
}

export function tokenStringOutput(tokens = [])
{
    var tokensString = ''
    
    for (var x in tokens){
        var curToken = tokens[x]
        if (Number(curToken.quantity) > 0)
            tokensString = tokensString + curToken.returnTokenString() + " + "
    }

    tokensString = tokensString.substring(0, tokensString.length - 3);
    return tokensString
}