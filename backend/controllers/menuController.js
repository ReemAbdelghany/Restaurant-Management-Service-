// menuController.js

const Menu = require("../models/Menu");

const getMenu = (req, res) => {
    Menu.find()
        .then(menu => res.json(menu))
        .catch(err => res.send(err));
};

const getMenuById = (req, res) => {
    const { id } = req.params; // Access ID from request parameters
    Menu.findById(id) // Use req.params.id to find the menu item
        .then(menu => {
            if (!menu) {
                return res.status(404).json({ message: "Menu not found" });
            }
            res.json(menu);
        })
        .catch(err => res.send(err));
};


const updateMenu = (req, res) => {
    const { id } = req.params; // Access ID from request parameters
    const updateData = {
        dish_name: req.body.dish_name,
        dish_description: req.body.dish_description,
        dish_price: req.body.dish_price,
        diet_type: req.body.diet_type // Ensure diet_type is updated
    };

    Menu.findByIdAndUpdate(id, updateData, { new: true })
        .then(updatedMenu => {
            if (!updatedMenu) {
                return res.status(404).json({ message: "Menu not found" });
            }
            res.json(updatedMenu);
        })
        .catch(err => {
            console.error("Error updating menu:", err);
            res.status(500).send("Internal server error");
        });
};

const deleteMenu = (req, res) => {
    const { id } = req.params; // Access ID from request parameters
    Menu.findByIdAndDelete(id)
        .then(menu => {
            if (!menu) {
                return res.status(404).json({ message: "Menu not found" });
            }
            res.json(menu);
        })
        .catch(err => res.send(err));
};

const createMenu = async (req, res) => {
    const menu = new Menu({
        dish_name: req.body.dish_name,
        dish_description: req.body.dish_description,
        dish_price: req.body.dish_price,
        diet_type: req.body.diet_type // Ensure diet_type is set
    });

    try {
        const savedMenu = await menu.save();
        console.log("inserted");
        res.json(savedMenu);
    } catch (err) {
        res.send(err);
    }
};

module.exports = {
    getMenu,
    createMenu,
    getMenuById,
    updateMenu,
    deleteMenu
};
