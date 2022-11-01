const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i =0; i< 50; ++i){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '635781ba9c0ecdb92c86643c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime voluptatum corrupti placeat qui illum aperiam harum quibusdam dolore delectus iste corporis provident fugit nulla reprehenderit, fuga non vero at ut!',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/diprjycz4/image/upload/v1667025980/YelpCamp/hm8i8yf5b6srwbiy0gsj.jpg',
                  filename: 'YelpCamp/hm8i8yf5b6srwbiy0gsj'
                },
                {
                  url: 'https://res.cloudinary.com/diprjycz4/image/upload/v1667025981/YelpCamp/mjleywtc2viillfcqunr.jpg',
                  filename: 'YelpCamp/mjleywtc2viillfcqunr'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
