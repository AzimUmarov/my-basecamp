const express = require("express");
const {connect} = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const route = require("./src/router/router");
require('dotenv').config();

const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use("/api", route);

connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err)
        return console.log("   !!! Error occurred !!!\n" + err["message"]);
    app.listen(process.env.PORT, () => {
        console.log(`   *** Listening on port ${process.env.PORT} ***\n     --- Mongodb connected ----`);
    });
});



