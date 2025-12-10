import express from "express";
import cors from "cors";
import checkoutRoutes from "./routes/checkout.js";
import cartRoutes from "./routes/cartRoutes.js";
import { startCronJobs } from "./services/cronService.js";

const app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Routes
app.use("/api/checkout", checkoutRoutes);
app.use("/api/cart", cartRoutes);

// Init Cron Jobs
startCronJobs();

// Health check endpoint
app.get("/health", async (req, res) => {
    try {
        // Test database connection
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        await prisma.$queryRaw`SELECT 1`;
        await prisma.$disconnect();

        res.json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            database: "connected"
        });
    } catch (error) {
        res.status(503).json({
            status: "unhealthy",
            timestamp: new Date().toISOString(),
            database: "disconnected",
            error: error.message
        });
    }
});

app.get("/", (req, res) => {
    res.json({
        status: "running",
        name: "Antigravity Backend API",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
