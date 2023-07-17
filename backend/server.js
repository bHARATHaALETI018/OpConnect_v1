const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// const colors = require("colors");
const StudentRoutes = require("./routes/StudentRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
const OpportunityRoutes = require("./routes/OpportunityRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const ApplicationRoutes = require("./routes/ApplicationRoutes");
const FeedbackRoute = require("./routes/FeedbackRoute");
// const path = require("path");
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // to accept json data
app.use(cors());

const allowedOrigins = ["https://opconnect.netlify.app"];
app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.get("/", (req, res) => {
  res.send("API is running!..");
});

app.use("/api/student", StudentRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/opportunities", OpportunityRoutes);
app.use("/api/applications", ApplicationRoutes);
app.use("/api/feedback", FeedbackRoute);

// // Deployment code starts
// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "/frontend/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running!..");
//   });
// }
// // Deployment code ends
app.use(notFound);
app.use(errorHandler);

// console.clear();
app.listen(PORT, console.log(`server started at port ${PORT}!...`));
