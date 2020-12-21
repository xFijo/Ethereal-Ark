const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.sendStatus(200);
});
const port = process.env.PORT || 5040;

app.listen(port, () => console.log(`listening on port ${port}`));
