const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
app.use(cors());

app.get('/api/:name?', async (req, res) => {
	const personName = req.params.name;
	const db = new pg.Client({
		host: 'ec2-18-230-78-68.sa-east-1.compute.amazonaws.com',
		user: 'postgres',
		password: 'postgres',
		database: 'postgres'
	});
	await db.connect();

	const queryResult = await db.query('select * from person where name = $1 limit 1', [personName]);
	const person = queryResult.rows[0];

	res.status(200).json({
		hello: person?.name ?? 'world',
		yourId: person?.id ?? null
	});

	db.end();
});

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

