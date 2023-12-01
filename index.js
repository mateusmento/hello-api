const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/:name?', async (req, res) => {
	const personName = req.params.name;
	res.status(200).json({
		hello: personName ?? 'world',
		yourId: null
	});
});

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

