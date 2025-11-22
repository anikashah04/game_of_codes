import mongoose from "mongoose";

const planetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    //required: false   
  },
  desc: {
    type: String,
    //required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  list_of_games: [{
    type: mongoose.Schema.Types.ObjectId,  // array of {name, desc}
    ref: "Game"
  }]
}, { timestamps: true });

const Planet = mongoose.model("Planet", planetSchema);

export default Planet;
