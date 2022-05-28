const mongoose = require('mongoose');
const Laptops = require('./laptop');
const Mobile = require('./Mobile');
const Products = require('../models/ProductItem');
const TV = require('./TV');
const Console = require('./consolegame');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


//Change your user id ( object id of any user that is registered in your database and is in user collection).
const Author = '628cae5c27a25c4230cf4f97';
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async() => {
    await Products.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random10 = Math.floor(Math.random() * 10);

        const price = `${sample(Laptops).Price}`;
        const camp = new Products({
            //YOUR USER ID
            author: `${Author}`,
            title: `${sample(Laptops).Brand} ${sample(Laptops).Model}`,
            description: `${sample(Laptops).about}`,
            price,
            category: 'Laptop',
            images: [{
                    url: `${sample(Laptops).Image}`,
                    filename: "YelpCamp/ahfnenvca4tha00h2ubt",
                }, {
                    url: 'https://res.cloudinary.com/mrarthor/image/upload/v1653728352/YelpCamp/laptop_1_azh1mw.gif',
                    filename: "YelpCamp/ahfnenvca4tha00h2ubt",
                },

            ],

            TotalRating: `${random10}`,
            TotalViews: 0,
        });
        await camp.save();
    }
    for (let i = 0; i < 10; i++) {
        const random10 = Math.floor(Math.random() * 10);

        const price = `${sample(Console).Price}`;
        const camp = new Products({
            //YOUR USER ID
            author: `${Author}`,
            title: `${sample(Console).Brand} ${sample(Console).ProductName}`,
            description: `${sample(Console).about}`,
            price,
            category: 'Console',
            images: [{
                    url: `${sample(Console).Image}`,
                    filename: "YelpCamp/ahfnenvca4tha00h2ubt",
                }, {
                    url: 'https://res.cloudinary.com/mrarthor/image/upload/v1653728352/YelpCamp/gaming_fargg2.gif',
                    filename: "YelpCamp/ahfnenvca4tha00h2ubt",
                },

            ],

            TotalRating: `${random10}`,
            TotalViews: 0,
        });
        await camp.save();
    }

    for (let i = 0; i < 10; i++) {
        //const random1000 = Math.floor(Math.random() * 100);
        const random10 = Math.floor(Math.random() * 10);

        const price = `${sample(Mobile).Price}`;
        const camp = new Products({
            //YOUR USER ID
            author: `${Author}`,
            title: `${sample(Mobile).Brand} ${sample(Mobile).Model}`,
            description: `${sample(Mobile).RAM} ${sample(Mobile).Colours} ${sample(Mobile).Launched}`,
            price,
            category: 'Mobile',
            images: [{
                    url: `${sample(Mobile).Image}`,
                    filename: "YelpCamp/ahfnenvca4tha00h2ubt",
                }, {
                    url: 'https://res.cloudinary.com/mrarthor/image/upload/v1653728353/YelpCamp/706693c6b3c6940dbd67d41c69183ec4_qx1ahy.gif',
                    filename: "YelpCamp/ahfnenvca4tha00h2ubt",
                },

            ],

            TotalRating: `${random10}`,
            TotalViews: 0,
        });
        await camp.save();
    }
    for (let i = 0; i < 10; i++) {
        const random10 = Math.floor(Math.random() * 10);

        //const random1000 = Math.floor(Math.random() * 100);
        const price = `${sample(TV).Price}`;
        const camp = new Products({
            //YOUR USER ID
            author: `${Author}`,
            title: `${sample(TV).Brand} ${sample(TV).Model}`,
            description: `${sample(TV).About}`,
            price,
            category: 'TV',
            images: [{
                url: `${sample(TV).Image}`,
                filename: "YelpCamp/ahfnenvca4tha00h2ubt",
            }, {
                url: 'https://res.cloudinary.com/mrarthor/image/upload/v1653728352/YelpCamp/samsung-tv-sale-kr-2x1-tease-200717_j4qbk7.gif',
                filename: "YelpCamp/ahfnenvca4tha00h2ubt",
            }, ],

            TotalRating: `${random10}                                   `,
            TotalViews: 0,
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})