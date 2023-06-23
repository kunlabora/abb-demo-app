import {app, query, errorHandler} from 'mu';
import {findAllAwards, findAwardsByYear, findById} from "./queries";

app.get('/', function (req, res) {
    console.log(req.headers['mu-session-id']);
    res.json({message: 'Hello World!'});
});

app.get('/awards/raw', async (req, res) => {
    const queryResult = await query(findAllAwards());
    res.json(queryResult);
});

app.get('/awards', async (req, res) => {
    try {
        const queryResult = await query(findAwardsByYear(req.query?.year));
        const bindings = queryResult?.results?.bindings;
        const awards = bindings.map(binding => {
            return {
                id: getId(binding.id.value),
                category: binding.categoryLabel.value,
                year: binding.year.value,
                university: binding.university?.value,
                motivation: binding.motivation?.value,
                laureate: {
                    name: binding.name.value,
                    country: binding.country.value
                }
            };
        });
        res.json({awards});
    }
    catch (e) {
        console.error(e);
    }
});

app.get('/awards/:id', async (req, res) => {
    try {
        const queryResult = await query(findById(req.params.id));
        console.log(queryResult);
        const bindings = queryResult?.results?.bindings;
        const awards = bindings.map(binding => {
            return {
                id: req.params.id,
                category: binding.categoryLabel.value,
                year: binding.year.value,
                university: binding.university?.value,
                motivation: binding.motivation?.value,
                laureate: {
                    name: binding.name.value,
                    country: binding.country.value
                }
            };
        });
        res.json({awards: {...awards[0]}});
    }
    catch (e) {
        console.error(e);
    }
});

function getId(idUrl) {
    return idUrl.split("/").at(-1);
}

app.use(errorHandler);
