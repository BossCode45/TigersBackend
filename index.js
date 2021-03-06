const express = {express};

const app = express();
const port = 3000;

app.use(express.json());

const games = [];
const players = [];
let currID = 0;

const startBoard = ["T   T",
					"     ",
					"     ",
					"     ",
					"T   T"];

app.post("/joingame", (req, res) => {
	if(players[req.body.player.id]==null)
	{
		players[req.body.player.id] = req.body.player;
	}
	if(games[currID].p1 != null)
	{
		games[currID].p2 = req.body.player;
		res.status(200);
		res.json({game: games[currID]});
		currID++;
	}
	else
	{
		games.push({id: currID, p1: req.body.player, p2: null, turn: 0, board: startBoard, nextPlayer: 1});
		res.status(200);
		res.json({game: games[currID]});
	}
});

app.post("/playmove", (req, res) => {
	const game = games[req.body.game.id];
	const player = players[req.body.player.id];
	

	if(game.nextPlayer == 1 && game.p1.id == player.id)
	{
		game.board = req.body.game.board;
		game.nextPlayer = 2;
	}
	else if(game.nextPlayer == 2 && game.p2.id == player.id)
	{
		game.board = req.body.game.board;
		game.nextPlayer = 1;
	}
	game.turn++;
	res.status(200);
	res.json({game: game});
});

app.post("/gamestatus", (req, res) => {
	res.status(200);
	res.json({game: games[req.body.id]});
});

app.listen(port, () => {
    console.log("app listening");
});
