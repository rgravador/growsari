// https://dog.ceo/api/breeds/list/all
const baseUrl = 'https://dog.ceo/api'
import axios, { AxiosResponse } from "axios";
import dogModel from "../models/dog.model";
import adaptModel from "../models/adapt.model";

export const ApiReqGet = async (url) => {
    try {
        const { data, status }: AxiosResponse = await axios.get(url);
        if (status != 200) {
            return { error: true, data: data.message };
        }
        return { error: false, data: data.message };
    } catch (error: any) {
        return { error: true, data: error.message };
    }
};

export const fetchBreedList = async () => {
    const { error, data } = await ApiReqGet(`${baseUrl}/breeds/list/all`);
    if (error) return { error, data };

    const breeds: any = await Object.keys(data).map((key) => {
        if (data[key].length > 0) return key
        else return ""
    }).filter((key) => key != "")
    return { error: false, data: breeds };
}

export const fetchBreeds = async (breed: string) => {
    return await ApiReqGet(`${baseUrl}/breed/${breed}/images`);
}

export const addToFav = async (img, adaptedBy) => {
    try {
        const add = await dogModel.create({ adaptedBy, url: img, isFavorite: true });
        return { error: false, data: add };
    } catch (error) {
        console.log("🚀 ~ file: dog.service.ts:38 ~ addRemoveToFav ~ error:", error)
        return { error: true, data: error }
    }
}

export const AdaptNow = async (img, adaptedBy) => {
    try {
        const check = await adaptModel.findOne({ adaptedBy, url: img });
        if(check){
            return { error: false, data: check };
        }
        const add = await adaptModel.create({ adaptedBy, url: img, adapted: true });
        await dogModel.findOneAndRemove({ adaptedBy, url: img });
        return { error: false, data: add };
    } catch (error) {
        return { error: true, data: error }
    }
}

export const removeFromFav = async (_id) => {
    try {
        const _remove = await dogModel.findByIdAndRemove(_id);
        return { error: false, data: _remove };
    } catch (error) {
        console.log("🚀 ~ file: dog.service.ts:38 ~ addRemoveToFav ~ error:", error)
        return { error: true, data: error }
    }
}

export const getFavorites = async (adaptedBy) => {
    try {
        const list = await dogModel.find({ adaptedBy, isFavorite: true });
        return { error: false, data: list };
    } catch (error) {
        console.log("🚀 ~ file: dog.service.ts:38 ~ addRemoveToFav ~ error:", error)
        return { error: true, data: error }
    }
}

export const getAdapted = async (adaptedBy) => {
    try {
        const adapted = await adaptModel.find({ adaptedBy });
        return { error: false, data: adapted };
    } catch (error) {
        console.log("🚀 ~ file: dog.service.ts:78 ~ getAdapted ~ error:", error)
        return { error: true, data: error }
    }
}