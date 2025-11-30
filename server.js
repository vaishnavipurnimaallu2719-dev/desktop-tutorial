const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");


app.use(express.json());
app.use(express.static("public"));


app.get("/questions", (req, res) => {
    const data = fs.readFileSync("questions.json");
    res.json(JSON.parse(data));
});


app.post("/login", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.json({ success: false, msg: "All fields required" });
    }

    return res.json({ success: true });
});


app.listen(3000, () => {
    console.log("Quiz Portal running at http://localhost:3000");
});
