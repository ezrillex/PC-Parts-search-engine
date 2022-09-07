
const bodyParser = require('body-parser')
const fs = require('fs')
const express = require('express');
const cron = require('node-cron');
const cors = require('cors')
const app = express();

const PORT = process.env.PORT || 8000;

var data = []
var cache = []
/*
var data = [
    { "store": "E-Shop", "name": "CPU RYZON 69420K", "category": "PROCESADORES", "url": "https://www.youtube.com/", "price": "$123.45", "price-cash": "$543.21", "pricediscount": "$199.99" },
    { "store": "E-Shop", "name": "CPU RYZON 69420K", "category": "PROCESADORES", "url": "https://www.youtube.com/", "price": "$123.45", "price-cash": "$543.21", "pricediscount": "$199.99" },
    { "store": "E-Shop", "name": "CPU RYZON 69420K", "category": "PROCESADORES", "url": "https://www.youtube.com/", "price": "$123.45", "price-cash": "$543.21", "pricediscount": "$199.99" },
    { "store": "E-Shop", "name": "CPU INTOL 12345K 3.21MHZ", "category": "PROCESADORES", "url": "https://www.youtube.com/", "price": "$123.45", "price-cash": "$543.21", "pricediscount": "$199.99" },
    { "store": "E-Shop", "name": "CPU INTOL 12345K 3.21MHZ", "category": "PROCESADORES", "url": "https://www.youtube.com/", "price": "$123.45", "price-cash": "$543.21", "pricediscount": "$199.99" },
    { "store": "E-Shop", "name": "CPU INTOL 12345K 3.21MHZ", "category": "PROCESADORES", "url": "https://www.youtube.com/", "price": "$123.45", "price-cash": "$543.21", "pricediscount": "$199.99" }
]

var cache = [
    {
        "query": "RYZON", "results": [
            { "store": "E-Shop", "name": "CPU RYZON 69420K", "category": "PROCESADORES", "url": "https://www.youtube.com/", "price": 123.45, "price-cash": "$543.21", "pricediscount": "$199.99" },
            { "store": "E-Shop", "name": "CPU RYZON 69420K", "category": "PROCESADORES", "url": "https://www.youtube.com/", "price": 123.45, "price-cash": "$543.21", "pricediscount": "$199.99" },
            { "store": "E-Shop", "name": "CPU RYZON 69420K", "category": "PROCESADORES", "url": "https://www.youtube.com/", "price": 123.45, "price-cash": "$543.21", "pricediscount": "$199.99" }
        ]

    }
]
*/

try {
    data = JSON.parse(fs.readFileSync('data.txt', 'utf8'))
} catch (err) {
    console.log("Error when loading comments from text:")
    console.error(err)
}

cron.schedule('*/1 * * * *', (date) => {
    console.log("Backing up data - " + date)
    fs.writeFileSync('data.txt', JSON.stringify(data))
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()) // enables cors on all origins DEV

//#region endpoints

// todo batch requests? failing individual requests are better?
app.post('/update', (req, res) => {

    let store, name, category, url, price, pricecash, pricediscount
    console.log(req.body)

    try {
        store = req.body.store.toUpperCase()
        name = req.body.name.toUpperCase()
        category = req.body.category.toUpperCase() // to do implement defined categories
        url = req.body.url // validate this? since I am the one sending this how secure all this endpooints have to be? other than the search one.
        price = req.body.price
        pricecash = req.body.pricecash
        pricediscount = req.body.pricediscount
    } catch (error) {
        console.log(error)
        res.status(500).send({ "error": "Parsing parameter error" });
        return;
    }

    data.push({
        "store": store,
        "name": name,
        "category": category,
        "url": url,
        "price": price,
        "pricecash": pricecash,
        "pricediscount":pricediscount
    })

    res.sendStatus(200)
});

app.get('/clear_cache', (req, res) => {
    cache = []
    console.log("Cache Cleared")
    res.sendStatus(200)
})

app.get('/search', (req, res) => {

    console.log(req.query)

    let query = undefined;
    try {
        query = req.query.q;
        query = query.toUpperCase();
    } catch (error) {
        console.log(error)
        res.sendStatus(404);
    }

    // check cache OK SO in dev this wont work because if I update this afterwards the cache is no longer valid. In prod yes because only once a day it's upated so delete cache after daily update.
    let found = cache.find(element => element.query === query)
    console.log("CACHE QUERY = ", found)

    // hard query
    if (found === undefined) {
        found = data.filter(element => element.name.includes(query))
        console.log("HARD QUERY = ", found)
        if (found !== []) {
            // save results on cache
            cache.push({
                "query": query,
                "results": found
            })
        }
    }else {
        found = found.results
    }

    if (found === undefined) {
        res.status(404).send();
    }

    res.status(200).send(found);
});




//#endregion

function isValidHttpUrl(string) {
    // stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`)); 