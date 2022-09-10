
const bodyParser = require('body-parser')
const fs = require('fs')
const express = require('express');
// const cron = require('node-cron');
const cors = require('cors')
const app = express();


const PORT = process.env.PORT || 8000;

var data = []
var cache = []

try {
    data = JSON.parse(fs.readFileSync('data.txt', 'utf8'))
} catch (err) {
    console.log("Error when loading data")
    console.error(err)
}

// cron.schedule('*/1 * * * *', (date) => {
//     console.log("Backing up data - " + date)
//     fs.writeFileSync('data.txt', JSON.stringify(data))
// });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()) // enables cors on all origins DEV

//#region endpoints

// todo batch requests? failing individual requests are better?
app.post('/api/beta/update', (req, res) => {

    let store, name, category, url, price, pricefloat, pricecash, pricecashfloat, pricediscount, pricediscountfloat
    //console.log(req.body)

    try {
        store = req.body.store.toUpperCase()
        name = req.body.name || "ERROR"
        // category = req.body.category.toUpperCase() // to do implement defined categories
        url = req.body.url // validate this? since I am the one sending this how secure all this endpooints have to be? other than the search one.
        price = req.body.price
        pricefloat = req.body.pricefloat
        pricecash = req.body.pricecash
        pricecashfloat = req.body.pricecashfloat
        pricediscount = req.body.pricediscount
        pricediscountfloat = req.body.pricediscountfloat
    } catch (error) {
        console.log(error)
        res.status(500).send({ "error": "Parsing parameter error" });
        return;
    }

    data.push({
        "store": store,
        "name": name.toUpperCase(),
        // "category": category,
        "url": url,
        "price": price || "",
        "pricefloat": pricefloat || 0 ,
        "pricecash": pricecash || "",
        "pricecashfloat": pricecashfloat || 0,
        "pricediscount":pricediscount || "",
        "pricediscountfloat":pricediscountfloat || 0
    })

    res.sendStatus(200)
});

// Clears cache and saves data to disk
app.get('/api/beta/clear_cache', (req, res) => {
    cache = []
    fs.writeFileSync('data.txt', JSON.stringify(data))
    console.log("Cache Cleared - Data Saved")
    res.sendStatus(200)
})

app.get('/api/beta/search', (req, res) => {

    //console.log(req.query)
    let query
    try {
        query = req.query.q.toUpperCase();
    } catch (error) {
        console.log(error)
        res.sendStatus(400);
    }

    // STALE if data update
    let found = cache[query]
    if(found === undefined){
        found = data.filter(element => element.name.includes(query))
        //console.log("HARD QUERY = ", found)
        // save results on cache
        cache.push({query: found})
    }

    res.status(200).send(found);
});




//#endregion

// function isValidHttpUrl(string) {
//     // stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
//     let url;

//     try {
//         url = new URL(string);
//     } catch (_) {
//         return false;
//     }
//     return url.protocol === "http:" || url.protocol === "https:";
// }

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`)); 