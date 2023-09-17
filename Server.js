import express from "express"; 
import authRoutes from "./routes/authroute.js";
import cors from "cors";
import connectDB from './config/db.js';
connectDB();
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors())
// Define a route for the root URL

app.use("/api/v1/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Express Server!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});