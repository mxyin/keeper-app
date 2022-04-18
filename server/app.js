require('dotenv').config()
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
	response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,
	{
	  useNewUrlParser: true,
	  useUnifiedTopology: true,
	}
)
.then(() => console.log("MongoDB has been connected"))
.catch((err) => console.log(err));

const noteSchema = {
	title: String,
	content: String
}

const Note = mongoose.model("Note", noteSchema);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'DELETE');
	next();
});

app.get("/notes", (req, res) => {
	Note.find(function (err, foundNotes) {
		if (!err) {
			res.send(foundNotes);
		} else {
			res.send(err);
		}
	});
});

app.post("/notes", function (req, res) {
	const newNote = new Note({
		title: req.body.title,
		content: req.body.content
	})
	newNote.save();
	res.send(newNote);
	res.end();
})

app.delete("/notes/:id", function (req, res) {
	Note.deleteOne({
		_id: req.params.id
	}, function (err) {
		if (!err) {
			res.send(`Successfully deleted the corresponding note with id ${req.params.id}`);
		} else {
			res.send(err);
		}
	})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
});