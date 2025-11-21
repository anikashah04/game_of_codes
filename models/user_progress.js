import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Course", 
    required: true 
  },
  game: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Game", 
    required: true },
  level: { 
    type: Number, 
    required: true 
  },
  totalPoints: {
    type: Number, 
    default: 0 
  }, // derived from completed levels
  timeSpent:{
    type:Number //check
  },
  badgesEarned: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Badge"
  }],
  completed: { 
    type: Boolean, 
    default: false },
}, { timestamps: true });

export default mongoose.model("UserProgress", userProgressSchema);
