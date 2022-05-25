var admin = require("firebase-admin");

var serviceAccount = require("./../assets/mailshots-f723e-firebase-adminsdk-nc5j5-cd3c4006f9.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mailshots-f723e-default-rtdb.firebaseio.com"
});

module.exports = admin.database();

