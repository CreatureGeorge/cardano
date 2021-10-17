/*
    functions to interact with cli | dbsync | sql database and mint | refund***

    1. every 5 minutes query sql database and grab all received orders that are good and grab token id & metadata
    2. throw all orders in queue (addressOut, Token) ->
    3. grab 30 at a time and make a mint transaction with available addresses (roughly 40 available at a time)
    4. repeat 2-3 until empty, have 1 running on seperate thread

    1. query available addresses (address folder assume all are good and keep track of funds)
    2. add (address, ADA, status [free, pending, requested])
    3. if address.ADA is below 200, request more from backup and mark as requested funds (address.status)
    4. query addresses from dbsync to check status every slot
        a. how to check if address has a pending transaction???


    THREADS
    1. slot query (update if a new slot...run address check)
    2. updating sql database
    3. minting | generating transactions

    ????????
    1. when to refund?
    2. how many addresses?
*/

function querySlot() {
    let slotQuery= new Promise(function(resolve, reject) {
        var returnVal = ''
        if (returnVal == 'err') reject('error!')
        else resolve('success')

    });

    return slotQuery
}

function updateSQL() {

}

function mine() {
    let slotChecker = querySlot()
        
    slotChecker.then(
        function(value) { /* code if successful */ },
        function(error) { /* code if some error */ }
    );     
}

mine()