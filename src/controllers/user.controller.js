import users from "../models/user.model.js";
import mongoose from "mongoose";

const updateProfileController = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const updatedUser = await users.findByIdAndUpdate(
      userId,
      {
        ...updatedData,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Unable to update user data" });
    }

    res.status(200).json({ message: "User updated" });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return next(error);
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await users
      .find({})
      .select("name skillsTaught skillsLearning");
    res.status(200).json(allUsers);
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return next(error);
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserWithId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await users
      .findById(userId)
      .populate("skillsLearning", "title")
      .populate("skillsTaught", "title")
      .select(
        "name skillsTaught skillsLearning connections email connectionRequests"
      );

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return next(error);
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendConnectionRequest = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const { senderId, senderName } = req.body;

    const user = await users.findById(receiverId);
    user.connectionRequests.push({ name: senderName, senderId: senderId });

    if (!user) {
      return res.status(404).json({ message: "Unable to connect to user" });
    }

    await user.save();

    res.status(200).json({ message: "Connection request sent!" });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return next(error);
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const changeConnectionRequest = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const { senderId, response } = req.body;

    const receiver = await users.findById(receiverId);
    const sender = await users.findById(senderId);
    
    console.log(receiver, sender);

    if (response == "accept") {
      sender.connections.push({
        name: receiver.name,
        connectionId: receiver._id,
      });
      receiver.connections.push({
        name: sender.name,
        connectionId: sender._id,
      });
    }

    receiver.connectionRequests = receiver.connectionRequests.filter(
      (request) => request.senderId === sender._id
    );

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Unable to connect to user" });
    }

    await sender.save();
    await receiver.save();
    console.log(receiver, sender);

    res.status(200).json({ message: "Connection request accepted" });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return next(error);
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  updateProfileController,
  getAllUsers,
  getUserWithId,
  sendConnectionRequest,
  changeConnectionRequest,
};
