import {APIRequest} from "@/utils/http";

export function decodeQR(text: string) {
    let obj = JSON.parse(text)

    const keys = ['prod_id', 'production_date', 'expiry_date', 'type_name', 'amount', 'units', 'type_id', 'nutritional', 'measure_type', 'allergens', 'cat_name', 'cat_id']

    let data = {}
    for (let i = 0; i < keys.length; i++) {
        data[keys[i]] = obj[i]
    }
    console.log(data)
    return data
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