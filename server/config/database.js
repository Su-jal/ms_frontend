const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    //console.log("DBURL-",`'${process.env.MONGODB_URL}'`);
    mongoose.connect("mongodb+srv://ms:ms@cluster0.71l9qqu.mongodb.net/ms", {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};