require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Database connection successful')
})
.catch(err => {
  console.log('Database connection error')
})

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let john = new Person({name: "john", age: 30, favoriteFoods: ["banana"]}); 

  john.save(function(err, data) {
    if (err) {
      return console.error(err);
    }
      done(null, data);
  })
};

let arrayOfPeople = [
  {name: "Adam", age: 31, favoriteFoods: ["pizza"]},
  {name: "Bob", age: 34, favoriteFoods: ["sushi"]},
  {name: "Nick", age: 36, favoriteFoods: ["mozzarella sticks"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      return console.error(err);
    }
      done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, data) {
    if (err) {
      return console.error(err);
    }
      done(null, data);    
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) {
      return console.error(err);
    }
      done(null, data);    
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) {
      return console.error(err);
    }
      done(null, data);     
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function(err, data) {
    if (err) {
      return console.error(err);
    }
      data.favoriteFoods.push(foodToAdd);
      
      data.save(function(err, data) {
        if (err) {
          return console.error(err);
        }
        done(null, data);
      })   
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {name: personName}, 
    {age: ageToSet}, 
    {new: true}, 
    (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  });
};

var removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, 
                (err, response) => {
                  if(err) return console.log(err);
                  done(null, response);
                })
};

var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({ favoriteFoods: { $all: [foodToSearch] } })
    .sort({ name: "asc" })
    .limit(2)
    .select({ age: 0 })
    .exec()
    .then(res => done(null, res))
    .catch(done);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
