const Campground = require('../models/ProductItem');
const Review = require('../models/review');

module.exports.createReview = async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    const ProdType = req.params.product;
    const review = new Review(req.body.review);
    review.author = req.user._id;
    //change the code below this line for changing the effect of the review rating
    campground.TotalRating = review.rating + campground.TotalRating;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/${ProdType}/Productsitem/${campground._id}`);
}

module.exports.deleteReview = async(req, res) => {
    const { id, reviewId } = req.params;
    const ProdType = req.params.product;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const campground = await Campground.findById(id);

    const review = await Review.findById(reviewId);
    //update this one also as you update the above rating increment algorithm
    campground.TotalRating = campground.TotalRating - review.rating;
    await campground.save();

    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/${ProdType}/Productsitem/${id}`);
}