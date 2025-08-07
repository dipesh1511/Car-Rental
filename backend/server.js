import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/UserRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database
await connectDB();


// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// login signup route
app.use('/api/user',userRouter)
// Owner role change route
app.use('/api/owner', ownerRouter);
// Booking route
app.use('/api/bookings', bookingRouter);



app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

