import { Request, Response } from 'express';
import { AdaptNow, addToFav, fetchBreedList, fetchBreeds, getAdapted, getFavorites, removeFromFav } from '../services/dog.service';
import { isEmpty } from '../middlewares/required';


export const getBreedList = async (req: Request, res: Response) => {
    try {
        const result = await fetchBreedList()
        return res.status(200).json({ ...result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const getListByBreed = async (req: Request, res: Response) => {
    try {
        const breed = req.params.breed;
        if (isEmpty(breed)) return res.status(400).json({ message: 'Breed is required' });
        const result = await fetchBreeds(breed)
        return res.status(200).json({ ...result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const AddtoFavorite = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user.data._id
        const { image } = req.body;
        if (isEmpty(image)) return res.json({ message: 'Image is required.' })
        const result = await addToFav(image, userId)
        return res.json({ ...result });
    } catch (error) {
        console.log("🚀 ~ file: dogs.control.ts:35 ~ AddtoFavorite ~ error:", error)
        res.json({ message: 'Server error', error });
    }
}

export const RemoveFromFavorite = async (req: Request, res: Response) => {
    try {
        const _id = req.params.id;
        if (isEmpty(_id)) return res.json({ error: true, message: 'Dog ID is required.' })
        const result = await removeFromFav(_id)
        console.log("🚀 ~ file: dogs.control.ts:44 ~ RemoveFromFavorite ~ result:", result)
        return res.json({ ...result });
    } catch (error) {
        res.json({ message: 'Server error', error });
    }
}

export const getFavoritesById = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user.data._id
        const result = await getFavorites(userId)
        return res.json({ ...result });
    } catch (error) {
        res.json({ message: 'Server error', error });
    }
}

export const AdaptADog = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user.data._id
        const { image } = req.body;
        if (isEmpty(image)) return res.json({ message: 'Image is required.' })
        const result = await AdaptNow(image, userId)
        return res.json({ ...result });
    } catch (error) {
        res.json({ message: 'Server error', error });
    }
}

export const listAdapted = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user.data._id
        const result = await getAdapted(userId)
        return res.json({ ...result });
    } catch (error) {
        res.json({ message: 'Server error', error });
    }
}