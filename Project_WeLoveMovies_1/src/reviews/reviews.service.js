const knex = require("../db/connection");

//CRUDL

const findCritic = (criticId) => {//find all critics where id matches critic id
return knex("critics")
            .select("*")
            .where({critic_id: criticId})
            .first();
}

const findReviews = (movieId) => {//find all movie reviews where id matches movie id
return knex("reviews")
            .select("*")
            .where({ movie_id: movieId});
}

const read = (reviewId) => {//read all found reviews where the id matches the review id
return knex("reviews")
            .select("*")
            .where({review_id: reviewId})
            .first();
            
}

const update = (review) => {
return knex("reviews")
            .select("*")
            .where({review_id: review.review_id})
            .update(review);
}

const destroy = (reviewId) => {
return knex("reviews")
            .where({review_id: reviewId})
            .del();
}

module.exports = {
    findCritic,
    findReviews,
    read,
    update,
    delete: destroy,
}