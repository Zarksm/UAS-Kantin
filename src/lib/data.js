import { LuCoffee, LuSoup } from "react-icons/lu";
import { IoFastFoodOutline } from "react-icons/io5";


export const menuData = {
  categories: [
    { id: "minuman", name: "Minuman", icon: LuCoffee, menuCount: 15 },
    { id: "makanan", name: "Makanan", icon: LuSoup, menuCount: 5 },
    { id: "jajanan", name: "Jajanan", icon: IoFastFoodOutline, menuCount: 15 },
  ],
};

export const menuItems = {
  minuman: [
    { name: "Kopi", price: 10000, stok: 0, sold: 50 },
    { name: "Susu", price: 8000, stok: 10, sold: 21 },
    { name: "Teh Manis", price: 6000, stok: 15, sold: 45 },
    { name: "Jus Jeruk", price: 15000, stok: 5, sold: 35 },
    { name: "Es Kelapa", price: 12000, stok: 8, sold: 60 },
    { name: "Es Teh", price: 5000, stok: 20, sold: 80 },
    { name: "Air Mineral", price: 3000, stok: 50, sold: 120 },
  ],
  makanan: [
    { name: "Mie", price: 12000, stok: 5, sold: 40 },
    { name: "Nasgor", price: 15000, stok: 0, sold: 20 },
    { name: "Nasgor Special", price: 20000, stok: 3, sold: 12 },
    { name: "Pisang Goreng", price: 7000, stok: 15, sold: 70 },
    { name: "Roti Bakar", price: 10000, stok: 8, sold: 50 },
    { name: "Sate Ayam", price: 25000, stok: 5, sold: 60 },
    { name: "Ayam Goreng", price: 22000, stok: 10, sold: 45 },
  ],
  jajanan: [
    { name: "Cilok", price: 5000, stok: 10, sold: 100 },
    { name: "Bakso", price: 10000, stok: 0, sold: 15 },
    { name: "Lumpia", price: 7000, stok: 20, sold: 130 },
    { name: "Dadar Gulung", price: 4000, stok: 30, sold: 200 },
    { name: "Kue Cubir", price: 3000, stok: 50, sold: 300 },
    { name: "Martabak", price: 15000, stok: 7, sold: 50 },
    { name: "Tahu Tempe", price: 6000, stok: 12, sold: 80 },
  ],
};



export const foods = [
  {
    id: 1,
    name: "Pizza",
    price: 10000,
    description: "Delicious cheese pizza",
    stok: 10,
  },
  {
    id: 2,
    name: "Burger",
    price: 8000,
    description: "Juicy beef burger",
    stok: 20,
  },
  {
    id: 3,
    name: "Burger",
    price: 7500,
    description: "Juicy beef burger",
    stok: 5,
  },
  {
    id: 4,
    name: "Burger",
    price: 6000,
    description: "Juicy beef burger",
    stok: 50,
  },

  // Add more food items here
];
