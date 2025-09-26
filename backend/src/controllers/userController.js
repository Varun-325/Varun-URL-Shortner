import { User } from "../models/user/user.model.js";
import { ShortURL } from "../models/shorturl.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await User.findById(userId);
    return res.status(200).json({ user: data });
  } catch (error) {
    return res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

export const getMyUrls = async (req, res) => {
  try {
    const userId = req.user.id;

    // pagination support
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [urls, total] = await Promise.all([
      ShortURL.find({ userId, isActive: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ShortURL.countDocuments({ userId, isActive: true }),
    ]);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      urls,
    });
  } catch (error) {
    return res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};
