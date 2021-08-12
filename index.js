const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

let db;
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    db = self.connection;
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let pizza = { title: 'Pizza', level: 'Amateur Chef', ingredients: ['Water', 'Flour', 'Tomato Sauce', 'Cheese', 'Basilicum', 'Yeast'], cuisine: 'Italian', dishType: 'main_course', image: '/public/images/pizza.jpg', duration: '30', creator: 'Peter' };
    return Recipe.create(pizza);
  }).then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
  })
  const filter = { title: 'Rigatoni alla Genovese' };
  const update = { duration: 100 };
  return Recipe.findOneAndUpdate(filter, update, {
    returnOriginal: false,
    useFindAndModify: false
})
.then(() => {
  return Recipe.deleteOne({title: 'Carrot Cake'})
   })
   .then(() => {
    mongoose.connection.close();
    console.log("Database Connection closed");
   })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
