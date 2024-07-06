const express = require('express');
const router = express.Router();
const mongoDB = require("../db");

async function fetchDataAndProcess() {
    try {
        const { goFoodData, foodCatogaryData } = await mongoDB();
        return { goFoodData, foodCatogaryData };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error for handling outside
    }
}

router.post("/foodData", async (req, res) => {
    try {
        const { goFoodData, foodCatogaryData } = await fetchDataAndProcess();
        res.status(200).json({ success: true, goFoodData, foodCatogaryData });
    } catch (error) {
        console.error("Error handling foodData request:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;

