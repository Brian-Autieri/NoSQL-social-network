const mongoose = require("mongoose");

// Connects to Mongoose database and exports the connection for use in other parts of the application
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/social-network-api",
    {
        // useNewUrlParse: true,
        useUnifiedTopology: true,
    }
);

mongoose.set("debug", true);

module.exports = mongoose.connection;