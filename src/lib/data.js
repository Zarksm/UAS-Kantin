import { LuCoffee, LuSoup } from "react-icons/lu";

export const menuData = {
  categories: [
    { id: "minuman", name: "Minuman", icon: LuCoffee, menuCount: 15 },
    { id: "makanan", name: "Makanan", icon: LuSoup, menuCount: 5 },
    { id: "jajanan", name: "Jajanan", icon: LuCoffee, menuCount: 15 },
  ],
};

export const menuItems = {
  minuman: [
    { name: "Kopi", price: 10000, stok: 0, sold: 50 },
    { name: "Susu", price: 8000, stok: 10, sold: 21 },
  ],
  makanan: [
    { name: "Mie", price: 12000, stok: 5, sold: 40 },
    { name: "Nasgor", price: 15000, stok: 0, sold: 20 },
  ],
  jajanan: [
    { name: "Cilok", price: 5000, stok: 10, sold: 100 },
    { name: "Bakso", price: 10000, stok: 0, sold: 15 },
  ],
};

