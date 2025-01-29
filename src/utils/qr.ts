import {APIRequest} from "@/utils/http";
import type {QRData} from "@/utils/types.ts";

export function decodeQR(text: string) : QRData {
    let data = JSON.parse(text)

    // const keys: string[] = ['prod_id', 'production_date', 'expiry_date', 'type_name', 'amount', 'units', 'type_id', 'nutritional', 'measure_type', 'allergens', 'cat_name', 'cat_id']
    //
    // let data: Object = {}
    // for (let i = 0; i < keys.length; i++) {
    //     data[keys[i]] = obj[i]
    // }
    //
    // const prod_date = new Date(data['production_date'])
    // data['production_date'] = `${String(prod_date.getDate()).padStart(2, '0')}.${String(prod_date.getMonth() + 1).padStart(2, '0')}.${prod_date.getFullYear()}`
    // const exp_date = new Date(data['expiry_date'])
    // data['expiry_date'] = `${String(exp_date.getDate()).padStart(2, '0')}.${String(exp_date.getMonth() + 1).padStart(2, '0')}.${exp_date.getFullYear()}`
    // return data

    let res: QRData = {
        prod_id: data[0],
        production_date: data[1],
        expiry_date: data[2],
        type_name: data[3],
        amount: data[4],
        units: data[5],
        type_id: data[6],
        nutritional: data[7],
        measure_type: data[8],
        allergens: data[9],
        cat_name: data[10],
        cat_id: data[11]
    };

    let date_val = new Date(res.production_date);
    res.production_date = `${String(date_val.getDate()).padStart(2, '0')}.${String(date_val.getMonth() + 1).padStart(2, '0')}.${date_val.getFullYear()}`;
    date_val = new Date(res.expiry_date);
    res.expiry_date = `${String(date_val.getDate()).padStart(2, '0')}.${String(date_val.getMonth() + 1).padStart(2, '0')}.${date_val.getFullYear()}`;

    return res;
}

export async function genQR(id) {
    console.log(`genQR ${id}`)
    const data = await APIRequest('/products/product', 'GET', {'id': id}, {}, true)

    if (data.status === 200) {
        // console.log(data.json)
        const keys = ['prod_id', 'production_date', 'expiry_date', 'type_name', 'amount', 'units', 'type_id', 'nutritional', 'measure_type', 'allergens', 'cat_name', 'cat_id']

        let vals = []
        keys.forEach((k) => {
            vals.push(data.json[k])
        })

        console.log(vals)
        console.log(JSON.stringify(vals))

        // this.$store.commit('setQRData', {'value': JSON.stringify(vals)})
        return JSON.stringify(vals)
    }

    return 'wtf'
}