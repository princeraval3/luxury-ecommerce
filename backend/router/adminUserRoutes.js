const express = require("express");

const {
  getAllUsers,
  getUserById,
  toggleBlockUser,
  deleteUser,
} = require("../controllers/adminUserController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// all users
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

// single user details
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getUserById
);

// block / unblock
router.patch(
  "/:id/block",
  authMiddleware,
  adminMiddleware,
  toggleBlockUser
);

// delete user
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

module.exports = router;