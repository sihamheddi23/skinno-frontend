import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

type Product = {
    id: number,
    name: string,
    price: number,
    quantity: number,
    image_url: string

}

interface CardState {
    card: {
     products: Product[],
    totalPrice: number
    }
}

const card: any = Cookie.get("card");

const initialState:CardState  = {
    card: card ? JSON.parse(card) : {
        products: [],
        totalPrice: 0
    },
}

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const product = state.card.products.find((product) => product.id === action.payload.id);
            if (product) {
                const other_products = state.card.products.filter((p) => {
                    return p.id !== action.payload.id;
                })
        
                product.quantity += action.payload.quantity 
                other_products.push(product)
                state.card.products = other_products

            }
            else {
                const products = state.card.products
                products.push(action.payload)
                state.card.products = products
            }
            Cookie.set("card", JSON.stringify(state.card))
        },
        deleteProduct: (state, action:PayloadAction<number>)=> {
            const other_products = state.card.products.filter((p) => {
                return p.id !== action.payload
            })

            state.card.products = other_products
            Cookie.set("card", JSON.stringify(state.card))
        },
        calculateTotalPrice: (state) => {
            const totalPrice = state.card.products.reduce((previous,current)=> {
                return previous + (current.price * current.quantity)
            }, 0)

            state.card.totalPrice = totalPrice
            Cookie.set("card", JSON.stringify(state.card))
        },
        clearCard: (state) => {
            state.card = {
                products: [],
                totalPrice: 0
            }
            Cookie.remove("card")
        }
    },
});

export default cardSlice.reducer