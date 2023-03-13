const User = require('../models/User');

class UserController {
  static async allUsers(req, res) {
    try {
      const users = await User.find({}, { __v: 0 });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  static async oneUser(req, res) {
    try {
      const user = await User.findById(req.params.userId, { __v: 0 });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  static async createUser(req, res) {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  static async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: { username: req.body.username, email: req.body.email } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(deletedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  static async addFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  static async removeFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
