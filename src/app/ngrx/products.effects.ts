import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { ProductService } from "../services/product.service";
import { GetAllProductsActionError, GetAllProductsActionSuccess, ProductsActionsTypes } from "./products.actions";
import { map, mergeMap, catchError } from "rxjs/operators";

@Injectable() 

export class ProductsEffects {
  constructor(private productsService:ProductService, private effectActions:Actions){ 

  }

  getAllProductsEffect:Observable<Action>=createEffect(
    ()=> this.effectActions.pipe(
        ofType(ProductsActionsTypes.GET_ALL_PRODUCTS),
        mergeMap((action)=>{
            return this.productsService.getProducts()
             .pipe(
                map((products)=> new GetAllProductsActionSuccess(products) ),
                catchError((err)=>of( new GetAllProductsActionError(err)))
             )

        })
    ));
    

}