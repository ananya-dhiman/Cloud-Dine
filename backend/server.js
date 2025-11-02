    import dotenv from 'dotenv';
    dotenv.config();

    import express from 'express';
    import path from 'path';
    import mongoose from 'mongoose';
    const app = express();
    const PORT = process.env.PORT || 3001; 
    import orderRoutes from './routes/orderRoutes.js';
    import reviewRoutes from './routes/reviewRoutes.js';
    import kitchenRoutes from './routes/kitchenRoutes.js';
    import userRoutes from './routes/userRoutes.js';
    import menuRoutes from './routes/menuRoutes.js';
    import cors from "cors";

    const allowedOrigins = [
  "http://localhost:5173",   
  "https://your-frontend-domain.com", 
];

    app.use(express.json());
    app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
    app.use(
    cors({
       origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
        credentials: true, 
    })
    );
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));


    app.get('/', (req, res) => {
        res.send('Backend is running!');
    });

    app.use('/api/orders', orderRoutes);
    app.use('/api/reviews', reviewRoutes);  
    app.use('/api/kitchens', kitchenRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/menus', menuRoutes);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });