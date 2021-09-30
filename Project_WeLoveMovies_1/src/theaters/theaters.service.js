const knex = require("../db/connection");

const list = () => {//returns all theaters
    return knex("theaters").select("*");
}

const listTheaters = (movieId) => {//returns theaters where movies are showing
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .where({ movie_id: movieId})
    .select("t.*", "mt.is_showing", "mt.movie_id");
}

const listMovies = (theaterId) => {//returns movies showing at theaters
    return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .where({ theater_id: theaterId })
    .select("m.*", "mt.created_at", "mt.updated_at", "mt.is_showing", "mt.theater_id");
}

module.exports = {
    list,
    listTheaters,
    listMovies,
}