import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
    levelNumber: { 
        type: Number, 
        required: true 
    },
    questionText: String,
    starterCode: String,
    testCases: [String],
    solutionCode: String,
    rewardPoints: Number,
    timeSpent: Number,
    score: Number,
  });

const gameSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique:true
     },
    category: [String], //["Variables", "Loops"]
    levels: [levelSchema],
}, { timestamps: true });

export default mongoose.model("Game", gameSchema);
