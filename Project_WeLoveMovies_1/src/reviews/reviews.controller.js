const service = require("./reviews.service");

async function hasReviewId(req,res,next){
    const {reviewId} = req.params;
    const review = await service.read(Number(reviewId));
    
    if(review){//if review id is found, return review
        res.locals.review = review;
        return next();
    }

    next({//if not, return error 404
        status: 404,
        message: "Review cannot be found."
    })

}

async function readReviews(req, res){
    const reviews = await service.findReviews(res.locals.movie.movie_id);//

    for(let review of reviews){//for loop through reviews and pull information from findcritic in service
        const critic = await service.findCritic(review.critic_id);
        review["critic"] = critic;
    }
    res.json({ data: reviews });
}

async function update(req,res){//update the review request
    const newReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    }

    await service.update(newReview);
    const review = await service.read(res.locals.review.review_id);

    const desiredReview = {
        ...review,
        critic: await service.findCritic(res.locals.review.critic_id),

    }

    res.json({ data: desiredReview })
}

async function destroy(req, res){//destroy the local data
    await service.delete(Number(res.locals.review.review_id))
    res.sendStatus(204);
}
module.exports = {
        readReviews,
        update: [hasReviewId, update],
        delete: [hasReviewId, destroy],
        
}