import express from 'express';
const PORT: number = +(process.env.PORT || 8081);
const NODE_ENV = process.env.NODE_ENV ?? "development";

const app = express();

app.use(express.static("./"));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/html/index.html");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
