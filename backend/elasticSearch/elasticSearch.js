const express = require("express");
const router = express.Router();
// const elasticsearch = require('elasticsearch');
// const { Client } = require('@elastic/elasticsearch');

// const client = new elasticsearch.Client({
//     hosts: ['http://localhost:9200']
// });

// client.ping({
//     requestTimeout: 30000,
// }, function (error) {
//     if (error) {
//         console.error('Cannot connect to Elasticsearch.');
//     } else {
//         console.log('Connected to Elasticsearch was successful!');
//     }
// });

router.get("/getelkdata", async (req, res) => {
    const { body } = await client.search({
        index: 'dummy_check_status',
        size: 60000,
        body: {
            query: {
                match_all: {}
            }
        },
    });
    res.send(body.hits.hits);
    //     catch((err) => {
    //     console.log(err);
    //     return res.status(500).json({
    //         msg: 'Error',
    //         err
    //     });
    // });
})



module.exports = router;