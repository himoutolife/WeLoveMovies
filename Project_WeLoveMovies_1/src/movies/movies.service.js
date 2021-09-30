const knex = require("../db/connection");

function list(isShowing){//list all movies that are showing
    if (isShowing){
        return knex("movies as m")
                    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
                    .distinct("mt.movie_id")
                    .select("m.*")
                    .where({ is_showing: true});
    }

    return knex("movies")
                .select("*");
}

function read(movieId){//return movies that match movie id
    return knex("movies")
                .select("*")
                .where({ movie_id: movieId })
                .first();

}

module.exports = {
    list,
    read,
};