import {Section} from "@/types/dto/Section";
import {Category} from "@/types/dto/Category";
import {ProductShort} from "@/types/dto/Product";

export const sections: Section[] = [
    {name: "Бассейны", id: 150,},
    {name: "Насосы", id: 150},
    {name: "Кулеры", id: 150},
    {name: "Финтифлюхи", id: 150},
    {name: "Кукарачи", id: 150},
]

export const categories: Category[] = [
    {
        "id": 1153,
        "name": "Композитные бассейны",
        "orderId": null,
        "notToDeleteFlag": null,
        "properties": []
    },
    {
        "id": 1154,
        "name": "Бетонные бассейны",
        "orderId": null,
        "notToDeleteFlag": null,
        "properties": []
    },
    {
        "id": 1152,
        "name": "Сборные бассейны",
        "orderId": null,
        "notToDeleteFlag": null,
        "properties": [
            {
                "id": 805,
                "name": "Установка",
                "valueType": "STRING",
                "categoryId": null,
                "top": false,
                "value": null
            },
            {
                "id": 5,
                "name": "Вес, кг",
                "valueType": "FLOAT",
                "categoryId": null,
                "top": false,
                "value": null
            },
            {
                "id": 802,
                "name": "Размер бассейна",
                "valueType": "STRING",
                "categoryId": null,
                "top": true,
                "value": null
            },
            {
                "id": 803,
                "name": "Объем (90%) л.",
                "valueType": "INTEGER",
                "categoryId": null,
                "top": true,
                "value": null
            },
            {
                "id": 804,
                "name": "Система фильтрации",
                "valueType": "STRING",
                "categoryId": null,
                "top": true,
                "value": null
            }
        ]
    }
]

export const products: ProductShort[] = [
    {
        id: 1,
        orderId: 1,
        name: "Попа Ильи",
        price: 200
    }, {
        id: 2,
        orderId: 2,
        name: "Фредди Фазбер",
        price: 3000
    }, {
        id : 2,
        orderId : 2,
        name : "Гальванический элемент 20 шт.",
        price : 50000
    },

]