import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" }, // badge assigned to user
  criteria:{ 
    type:String
  },
  icon: {
    type:String
  },
  description: {
    type:String
  }
}, { timestamps: true });

export default mongoose.model("Badge", badgeSchema);
