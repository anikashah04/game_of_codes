import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true },
  description:{
    type:String
  },
  ageGroup: { 
    type: String, 
    enum: ["8-12", "13-18", "19+"], //check
    required: true },
  programmingLanguage_stack: {
    type:String,
    enum:['Java','C','Python','WebDev','ML'],
    required:true
  },
  list_of_games: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Game" }], // references Games
  // badgesAwarded: [{ 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: "Badge" }],
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
