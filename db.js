// const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);

// const mongoURL = "mongodb+srv://shivam9768gupta:lkMzBVWRGaGLUnI7@cluster0.6i9bzx5.mongodb.net/foodDelivery1?retryWrites=true&w=majority";

// const mongoDB = async () => {
//     try {
//         // Connect to MongoDB
//         await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("Connected to MongoDB");

//         // Connection successful, fetch data from collections
//         const goFoodData = await mongoose.connection.db.collection("fooditems").find({}).toArray();
//         const foodCategoryData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

//         // Log the fetched data
//         console.log("goFood data:", goFoodData);
//         console.log("foodCategory data:", foodCategoryData);

//         return { goFoodData, foodCategoryData };
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//         throw err; // Rethrow the error for handling outside
//     }
// };

// // Log MongoDB connection errors
// mongoose.connection.on('error', err => {
//     console.error(`MongoDB connection error: ${err}`);
// });

// module.exports = mongoDB;


const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const mongoURL = "mongodb+srv://shivam9768gupta:lkMzBVWRGaGLUnI7@cluster0.6i9bzx5.mongodb.net/foodDelivery1?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        // Fetch data from "goFood" collection
        const goFoodData = await mongoose.connection.db.collection("fooditemsses").find({}).toArray();
        
        // Fetch data from "foodCatogary" collection
        const foodCatogaryData = await mongoose.connection.db.collection("foodCatogary").find({}).toArray();

        // Log the fetched data
        console.log("goFood data:", goFoodData);
        console.log("foodCatogary data:", foodCatogaryData);

        return { goFoodData, foodCatogaryData };
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err; // Rethrow the error for handling outside
    }
};

module.exports = mongoDB; 






