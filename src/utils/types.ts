export type QRData = {
    prod_id: number,
    production_date: string,
    expiry_date: string,
    type_name: string,
    amount: number,
    units: string,
    type_id: number,
    nutritional: number,
    measure_type: string,
    allergens: string | null,
    cat_name: string,
    cat_id: number
}

export type TypeData = {
    amount: number,
    units: string,
    nutritional: number,
    measure_type: string,
    allergens: string | null,
    type_id: number,
    items: [any]
}

export type ProductsData = {
    [cat_name: string]: {
        [type_name: string]: TypeData
    }
}

// export type ProductsData = Map<string, Map<string, TypeData>>;

export const allergens_specs: {[_: string]: string} = {
    "0": "аллергенное",
    "1": "лактоза",
    "2": "глютен"
}