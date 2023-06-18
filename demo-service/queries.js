
const PREFIXES = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX nobel: <http://data.nobelprize.org/terms/>
`;

export const findAllAwards = (year) =>  {
    return `
        ${PREFIXES}
        SELECT ?id ?name ?categoryLabel ?year
        FROM <http://mu.semte.ch/application>
        WHERE {
            ?id a nobel:LaureateAward .
            ?id nobel:year ${year ? year : 1911} .
            ?id nobel:year ?year .
            ?id nobel:laureate ?laureate .
            ?id nobel:category ?category .
            ?laureate foaf:name ?name .
            ?category <http://www.w3.org/2000/01/rdf-schema#label> ?categoryLabel .
        } LIMIT 100
    `;
}

export const findAwardsByYear = (year) =>  {
    return `
        ${PREFIXES}
        SELECT ?id ?name ?categoryLabel ?year ?motivation ?university ?country
        FROM <http://mu.semte.ch/application>
        WHERE {
            ?id a nobel:LaureateAward.
            ?id nobel:year ?year.
            ?id nobel:category ?category.
            ?category rdfs:label ?categoryLabel.
            ?id nobel:laureate ?laureate.
            ?laureate foaf:name ?name.
            OPTIONAL {
                ?id nobel:motivation ?motivation.
                FILTER(langMatches( lang(?motivation), "en" )).
            }
            OPTIONAL {
                ?id nobel:university ?universityClass.
                ?universityClass rdfs:label ?university.
            }
            ?laureate <http://dbpedia.org/ontology/birthPlace> ?place.
            ?place a <http://dbpedia.org/ontology/Country>.
            ?place rdfs:label ?country.
            FILTER(?year = ${year ? year : 1911}).
            
        } LIMIT 100
    `;
}

export const findById = (id) => {
    return `
        ${PREFIXES}
        SELECT ?id ?name ?categoryLabel ?year ?motivation ?university ?country
        FROM <http://mu.semte.ch/application>
        WHERE {
             <http://data.nobelprize.org/resource/laureateaward/${id}> a nobel:LaureateAward.
             <http://data.nobelprize.org/resource/laureateaward/${id}> nobel:year ?year.
             <http://data.nobelprize.org/resource/laureateaward/${id}> nobel:category ?category.
             ?category rdfs:label ?categoryLabel.
             <http://data.nobelprize.org/resource/laureateaward/${id}> nobel:laureate ?laureate.
             ?laureate foaf:name ?name.
             OPTIONAL {
                <http://data.nobelprize.org/resource/laureateaward/${id}> nobel:motivation ?motivation.
                FILTER(langMatches( lang(?motivation), "en" )).
             }
             OPTIONAL {
                <http://data.nobelprize.org/resource/laureateaward/${id}> nobel:university ?universityClass.
                ?universityClass rdfs:label ?university.
             }
             ?laureate <http://dbpedia.org/ontology/birthPlace> ?place.
             ?place a <http://dbpedia.org/ontology/Country>.
             ?place rdfs:label ?country.
        }
    `;
};
