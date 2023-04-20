import { getBreedList, getListByBreed, AddtoFavorite, RemoveFromFavorite, getFavoritesById, AdaptADog, listAdapted } from "../controllers/dogs.control";
import { authorized } from '../middlewares/authorization'
const express = require("express");
const router = express.Router();

router.get("/breeds", authorized, getBreedList)
router.get("/breeds/:breed", authorized, getListByBreed)
router.post("/add-to-favorite", authorized, AddtoFavorite)
router.delete("/remove-from-favorite/:id", authorized, RemoveFromFavorite)
router.get("/favorites", authorized, getFavoritesById)
router.post("/adapt", authorized, AdaptADog)
router.get("/adapted", authorized, listAdapted)

export default router;