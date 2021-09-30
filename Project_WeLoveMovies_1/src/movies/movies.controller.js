const service = require("./movies.service");

async function list(req, res) {//list movies if showing
    const {is_showing = false} = req.query;
    res.json({ data: await service.list(Boolean(is_showing)) })
}

async function read(req, res){//read the movies local data
    res.json({ data: res.locals.movie })
}

async function validateMovieId(req, res, next){//validate movie and show if movie id matches
    const {movieId} = req.params;
    const movie = await service.read(Number(movieId));

    if (movie) {
        res.locals.movie = movie;
        return next();
    }

    next({
        status: 404,
        message: "Movie cannot be found."
    });
}

module.exports = {
    list,
    read: [validateMovieId, read],
    validateMovieId,
}