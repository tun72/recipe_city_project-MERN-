const Recipe = require("../models/RecipeModel");
const mongoose = require("mongoose");

let PAGE_LIMIT = 6;
const RecipesController = {
  index: async (req, res, next) => {
    try {
      const page = req.query.page || 1;

      const recipes = await Recipe.find()
        .skip((page - 1) * PAGE_LIMIT)
        .limit(PAGE_LIMIT)
        .sort({ createdAt: -1 });

      let totalRecipeCount = await Recipe.countDocuments();

      let recipeEnd = Math.ceil(totalRecipeCount / PAGE_LIMIT);
      let pagination = null;

      if (recipeEnd > 1) {
        pagination = {
          next: recipeEnd == page ? false : true,
          previous: page == 1 ? false : true,
          currentPage: page,
          pages: [],
        };
        for (let i = 0; i < recipeEnd; i++) {
          pagination.pages.push(i + 1);
        }
      }

      return res.status(200).json({
        message: "success",
        recipes,
        pagination,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  show: async (req, res, next) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      return res.status(200).json({
        message: "success",
        recipe,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  store: async (req, res, next) => {
    try {
      const { title, description, ingredients } = req.body;
      const data = {
        title,
        description,
        ingredients,
      };

      const recipe = await Recipe.create(data);
      return res.status(200).json({
        recipe,
      });
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "not a valid id" });
      }

      console.log(req.body);
      const recipe = await Recipe.findByIdAndUpdate(id, {
        ...req.body,
      });

      if (!recipe) {
        return res.status(404).json({ msg: "recipe not found" });
      }

      console.log(recipe);

      return res.status(200).json({
        recipe,
        message: "success",
      });
    } catch (e) {
      return res.status(500).json({ message: "Internet server error" });
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "not a valid id" });
      }

      const isDeleted = await Recipe.findByIdAndDelete(id);
      if (!isDeleted) {
        return res.status(404).json({ msg: "recipe not found" });
      }
      return res.status(200).json({
        message: "Successfully deleted",
      });
    } catch (e) {}
  },
};

module.exports = RecipesController;
