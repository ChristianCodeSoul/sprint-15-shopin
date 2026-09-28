const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalProducts,
            totalOrders,
        ] = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Order.countDocuments(),
        ]);

        const salesResult = await Order.aggregate([
            {
                $match: {
                    status: { $ne: "cancelled" },
                },
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalAmount" },
                },
            },
        ]);

        const totalSales = salesResult[0]?.totalSales || 0;

        res.json({
            success: true,
            data: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalSales,
            },
        });
    } catch (error) {
        console.error("Admin stats error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to load admin statistics.",
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-passwordHash")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.error("Admin users error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to load users.",
        });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate(
                "user",
                "firstName lastName username email"
            )
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: orders.length,
            data: orders,
        });
    } catch (error) {
        console.error("Admin orders error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to load orders.",
        });
    }
};

module.exports = {
    getStats,
    getUsers,
    getOrders,
};