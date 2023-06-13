import { app, query, errorHandler } from 'mu';

app.get('/', function( req, res ) {
    console.log("This is some logging");
    res.send('Hello world world!');
} );


app.get('/query', function( req, res ) {
    const myQuery = `
    PREFIX nobel: <http://data.nobelprize.org/terms/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    SELECT ?name ?category
    FROM <http://mu.semte.ch/application>
    WHERE {
        ?award a nobel:LaureateAward.
        ?award nobel:year 1911 . 
        ?award nobel:laureate ?laureate .
        ?award nobel:category ?category .
        ?laureate foaf:name ?name .
    } LIMIT 100`;

    query( myQuery )
        .then( function(response) {
            res.json(response);
        })
        .catch( function(err) {
            res.send( "Oops something went wrong: " + JSON.stringify( err ) );
        });
} );

app.use(errorHandler);
