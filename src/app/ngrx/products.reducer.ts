import { Action } from "@ngrx/store";
import { Product } from "../model/product.model";
import { ProductActions, ProductsActionsTypes } from "./products.actions";

export enum ProductsStateEnum {
    LOADING ="Loading",
    LOADED ="Loaded",
    ERROR = "Error",
    INITIAL = "Initial"
}

export interface ProductsState {
    products: Product[],            // la structure de state:
    errorMessage: string,              // *gérer une liste de produit
    dataState: ProductsStateEnum       // *besoin d'une variable pour stocker l'erreur /  // *une variable pour indiquer le state  (chargement en cours, ..)
}

const initState:ProductsState={
    products:[],
    errorMessage: "",
    dataState: ProductsStateEnum.INITIAL
}

export function productsReducer(state:ProductsState=initState, action:Action):ProductsState{
    switch(action.type) {
        case ProductsActionsTypes.GET_ALL_PRODUCTS:
            return {...state, dataState:ProductsStateEnum.LOADING}
        case ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS:
            return {...state, dataState:ProductsStateEnum.LOADED,products:(<ProductActions>action).payload}
        case ProductsActionsTypes.GET_ALL_PRODUCTS_ERROR:
            return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductActions>action).payload}
        default : return {...state} // le trois points signifie que on va faire une copie de state
    }

}