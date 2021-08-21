const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://nutsrk:X2zbtVvEnwaCr8N@cluster0.mpgsw.mongodb.net/test?authSource=admin&replicaSet=atlas-vgnfbo-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
            {useUnifiedTopology: true}
        );
    } catch (err) {
        console.error("Error connecting to mogodb")
        console.error(err);
        
    }

}

module.exports = { connect };