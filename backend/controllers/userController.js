const User = require("../models/User");

const getUsers = (req, res) => {
  User.find()
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err.message));
};

const createUser = async (req, res) => {
    try {
      const { username, password, user_type, national_id, phone_no } = req.body;
  
      // Create a new user instance
      const user = new User({
        username,
        password,
        user_type, // Ensure that 'user_type' is included
        national_id,
        phone_no
      });
  
      // Save the user to the database
      const savedUser = await user.save();
  
      res.json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };
  

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json(user);
    })
    .catch(err => res.status(500).send(err.message));
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
