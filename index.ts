import {Bun} from "bun";

const bun = new Bun();

bun.get("/", (req,res) => {
	res.sendFile("/html/index.html");
});

bun.listen(3000);

console.log(`Listening on localhost: ${server.port}`);
