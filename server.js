import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import courseRoutes from "./routes/coursesRoutes.js";
import badgeRoutes from "./routes/badgeRoutes.js";
import planetRoutes from "./routes/planetRoutes.js";
import connectDB from "./utilities/connection.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/gameofcodes/user", userRoutes);
app.use("/gameofcodes/games", gameRoutes);
app.use("/gameofcodes/progress", progressRoutes);
app.use("/gameofcodes/courses", courseRoutes);
app.use("/gameofcodes/badges", badgeRoutes);
app.use("/gameofcodes/planets", planetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
