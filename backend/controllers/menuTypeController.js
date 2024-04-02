const MenuType = require("../models/MenuType");

const getMenuType = (req, res) => {
    MenuType.find()
        .then(menuTypes => res.json(menuTypes))
        .catch(err => res.status(500).json({ error: err.message }));
};

const getMenuTypeById = (req, res) => {
    MenuType.findById(req.params.id)
        .then(menuType => res.json(menuType))
        .catch(err => res.status(404).json({ message: "Menu type not found" }));
};

const updateMenuType = (req, res) => {
    const updateData = {
        dish_type: req.body.dish_type,
        meal_type: req.body.meal_type,
        diet_type: req.body.diet_type,
    };

    MenuType.findByIdAndUpdate(req.params.id, updateData, { new: true })
        .then(updatedMenuType => {
            if (!updatedMenuType) {
                return res.status(404).json({ message: "Menu type not found" });
            }
            res.json(updatedMenuType);
        })
        .catch(err => {
            console.error("Error updating menu type:", err);
            res.status(500).json({ error: "Internal server error" });
        });
};

const deleteMenuType = (req, res) => {
    MenuType.findByIdAndDelete(req.params.id)
        .then(menuType => {
            if (!menuType) {
                return res.status(404).json({ message: "Menu type not found" });
            }
            res.json(menuType);
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

const createMenuType = async (req, res) => {
    const menuType = new MenuType({
        dish_type: req.body.dish_type,
        meal_type: req.body.meal_type,
        diet_type: req.body.diet_type,
    });

    try {
        const savedMenuType = await menuType.save();
        res.json(savedMenuType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getMenuType,
    createMenuType,
    getMenuTypeById,
    updateMenuType,
    deleteMenuType
};
