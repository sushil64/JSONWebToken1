const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

app.post("/validateLogin", upload.none(), async (req, res) => {

    let results = await userData.find().and({ username: req.body.username });

    if (results.length > 0) {
        // Hashing 2. Compare method - compares password in DB & tells only if it is right or wrong.
        let isPasswordCorrect = await bcrypt.compare(req.body.password, results[0].password);

        if (isPasswordCorrect == true) {
            // sign()
            let encryptedCredentials = jwt.sign({ username: req.body.username, password: req.body.password }, "secretKey");

            let userDetails = results[0];
            console.log(userDetails);
            res.json({ status: "Success", isLoggedIn: true, details: userDetails, token: encryptedCredentials });
        } else {
            res.json({ status: "Failure", isLoggedIn: false, msg: "Invalid Password" });
        }
    }
    else {
        res.json({ status: "Failure", isLoggedIn: false, msg: "Invalid Email" });
    };
});

app.post("/validateToken", upload.none(), async (req, res) => {
    // verify()
    let decryptedCredentials = jwt.verify(req.body.token, "secretKey");
    console.log(decryptedCredentials);

    let results = await userData.find().and({ username: decryptedCredentials.username });

    if (results.length > 0) {

        let isPasswordCorrect = await bcrypt.compare(decryptedCredentials.password, results[0].password);

        if (isPasswordCorrect == true) {
            let encryptedCredentials = jwt.sign({ username: req.body.username, password: req.body.password }, "secretKey");

            let userDetails = results[0];
            res.json({ status: "Success", isLoggedIn: true, details: userDetails, token: encryptedCredentials });
        } else {
            res.json({ status: "Failure", isLoggedIn: false, msg: "Invalid Password" });
        }
    }
    else {
        res.json({ status: "Failure", isLoggedIn: false, msg: "Invalid Email" });
    };
});

app.post("/signup", upload.single("profilePic"), async (req, res) => {

    // Hashing 1. giving hash password to req.body.password, which is storing in alphaNumeric value in DB
    // salt - no of rounds it has to salt, 10 is recommended.   
    let hashPassword = await bcrypt.hash(req.body.password, 10);

    let dataEntered = new userData({
        username: req.body.username,
        password: hashPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        contactNo: req.body.contactNo,
        profilePic: req.file.path,

    });
    await dataEntered.save();
    res.json(["Account Created Succesfully"]);
    console.log("Received singup data");
});

app.put("/edit", upload.single("profilePic"), async (req, res) => {
    try {
        await userData.updateMany({ _id: req.body.id },
            {
                // username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                email: req.body.email,
                contactNo: req.body.contactNo,
                profilePic: req.file.path,
            });
        res.n;
        res.json({ status: "Success", msg: "Account Updated Succesfully" });
    }
    catch (err) {
        res.json(err);
        console.log("Error Uploading");
    }
    console.log(req.body);
    console.log("Received singup data");
});

app.delete("/deleteUser", async (req, res) => {

    try {
        await userData.deleteMany({ _id: req.query.id });
        res.json({ status: "Success", msg: "Account Deleted Succesfully" });
    }
    catch (err) {
        res.json(err);
    }
});

app.listen(6677, () => {
    console.log("Listening to port 6677");
});

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    age: String,
    email: String,
    contactNo: String,
    profilePic: String,
});

let userData = new mongoose.model("jsonWebToken1", userSchema);


let connectToMGDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://brnsushil2304:brnsushil2304@cluster0.iec0j9s.mongodb.net/?retryWrites=true&w=majority');
        console.log("Succesfully Connected to DataBase");
    }
    catch (err) {
        console.log("Unsuccesfull Connection to DB");
        console.log(err);
    }
};

connectToMGDB();