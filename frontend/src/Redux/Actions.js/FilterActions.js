import {
    FILTER_JEWELRY,
    FILTER_MEN_CLOTHING,
    FILTER_WOMEN_CLOTHING,
    FILTER_ELECRONICS,
    FILTER_ALL
} from "../Reducers/FilterProductReducer";

export const filterJewellery = (payload) => ({
    type    : FILTER_JEWELRY,
    payload : payload
});

export const filterMenClothing = (payload) => ({
    type    : FILTER_MEN_CLOTHING,
    payload : payload
});

export const filterWomenClothing = (payload) => ({
    type    : FILTER_WOMEN_CLOTHING,
    payload : payload
});

export const filterElectronics = (payload) => ({
    type    : FILTER_ELECRONICS,
    payload : payload
});

export const filterAll=(payload)=>({
    type : FILTER_ALL,
    payload : payload
})
