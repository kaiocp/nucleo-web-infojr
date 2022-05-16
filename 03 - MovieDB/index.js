const express = require('express');
const fetch = require('cross-fetch');
const app = express();
const PORT = 3000;
var cors = require('cors')

app.use(cors())

app.get("/api", async(req, res) => {
    const response = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1");
    const data = await response.json();

    res.json(data)
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});