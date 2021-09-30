const service = require("./theaters.service");

async function list(req, res){
    const theaters = await service.list();//pull the information from the list function in service

    for(let theater of theaters){//for loop through theaters
        const movies = await service.listMovies(theater.theater_id);//pull the information from listmovies in service

        theater["movies"] = movies;
    }
    res.json({ data: theaters });//respond with the data from the loop
}

async function listMovie(req, res, next) {
    if(res.locals.movie) {
        return res.json({ data: await service.listTheaters(res.locals.movie.movie_id) });
    }
    next();

}

module.exports = {
    list: [listMovie, list],
}