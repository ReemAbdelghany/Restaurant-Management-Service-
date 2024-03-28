const UserType = require("../models/UserType");

const getUserTypes = (req, res) => {
  UserType.find()
    .then(userTypes => res.send(userTypes))
    .catch(err => res.status(500).send(err.message));
};

const createUserType = async (req, res) => {
  const { type_name } = req.body;

  try {
    const userType = new UserType({
      type_name
    });

    const savedUserType = await userType.save();
    res.json(savedUserType);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

const updateUserType = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUserType = await UserType.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUserType) {
      return res.status(404).send("UserType not found");
    }
    res.json(updatedUserType);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

const getUserTypeById = (req, res) => {
  const { id } = req.params;
  UserType.findById(id)
    .then(userType => {
      if (!userType) {
        return res.status(404).send("UserType not found");
      }
      res.json(userType);
    })
    .catch(err => res.status(500).send(err.message));
};

const deleteUserType = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUserType = await UserType.findByIdAndDelete(id);
    if (!deletedUserType) {
      return res.status(404).send("UserType not found");
    }
    res.json(deletedUserType);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports = {
  getUserTypes,
  createUserType,
  getUserTypeById,
  updateUserType,
  deleteUserType
};
