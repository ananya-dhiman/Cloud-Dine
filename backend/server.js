    import dotenv from 'dotenv';
    dotenv.config();

    import express from 'express';

    import mongoose from 'mongoose';
    const app = express();
    const PORT = process.env.PORT || 3000; 
    import orderRoutes from './routes/orderRoutes.js';
    import reviewRoutes from './routes/reviewRoutes.js';
    import kitchenRoutes from './routes/kitchenRoutes.js';
    import userRoutes from './routes/userRoutes.js';
    import menuRoutes from './routes/menuRoutes.js';
    

    app.use(express.json());

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));


    app.get('/', (req, res) => {
        res.send('Backend is running!');
    });

    app.use('/api/orders', orderRoutes);
    app.use('/api/reviews', reviewRoutes);  
    app.use('/api/kitchens', kitchenRoutes);
    // app.use('/api/users', userRoutes);
    app.use('/api/menus', menuRoutes);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });