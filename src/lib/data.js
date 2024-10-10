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
    { name: "Kopi", price: "Rp 10.000", stok: 0, sold: 50 },
    { name: "Susu", price: "Rp 8.000", stok: 10, sold: 21 },
  ],
  makanan: [
    { name: "Mie", price: "Rp 12.000", stok: 5, sold: 40 },
    { name: "Nasgor", price: "Rp 15.000", stok: 0, sold: 20 },
  ],
  jajanan: [
    { name: "Cilok", price: "Rp 5.000", stok: 10, sold: 100 },
    { name: "Bakso", price: "Rp 10.000", stok: 0, sold: 15 },
  ],
};
