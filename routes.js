const routes = require('next-routes-extended')();
    
    /*
        1.  :address
            : represent the wildcard 

        2.  /campaigns/show
            represent show.js ( components )
    */
    routes
        .add('/token/transfer','/tokenTransfer/transfer')
        .add('/token/transferFrom','/tokenTransferFrom/index')
        .add('/token/transferFrom/approve','/tokenTransferFrom/approve')
        .add('/token/transferFrom/transfer','/tokenTransferFrom/transfer');

module.exports = routes;