import espresso from "@/assets/espresso.jpg";
import cappuccino from "@/assets/cappuccino.jpg";
import latte from "@/assets/latte-art.jpg";
import coldBrew from "@/assets/cold-brew.jpg";
import tea from "@/assets/tea.jpg";
import pastries from "@/assets/pastries.jpg";
import beans from "@/assets/coffee-beans.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  bestseller?: boolean;
};

export const menu: MenuItem[] = [
  { id: "esp-1", name: "Classic Espresso", description: "Bold double shot, velvety crema.", price: 3.5, image: espresso, category: "Espresso", bestseller: true },
  { id: "esp-2", name: "Macchiato", description: "Espresso marked with foamed milk.", price: 4.0, image: espresso, category: "Espresso" },
  { id: "cap-1", name: "Classic Cappuccino", description: "Equal parts espresso, milk, foam.", price: 4.75, image: cappuccino, category: "Cappuccino", bestseller: true },
  { id: "cap-2", name: "Honey Cinnamon Cap", description: "Warm honey and Saigon cinnamon.", price: 5.25, image: cappuccino, category: "Cappuccino" },
  { id: "lat-1", name: "Vanilla Bean Latte", description: "Madagascar vanilla, silky steam.", price: 5.5, image: latte, category: "Latte", bestseller: true },
  { id: "lat-2", name: "Hazelnut Latte", description: "Toasted hazelnut, oat milk option.", price: 5.5, image: latte, category: "Latte" },
  { id: "cb-1", name: "Signature Cold Brew", description: "18-hour slow-steeped, chocolate notes.", price: 5.0, image: coldBrew, category: "Cold Brew", bestseller: true },
  { id: "cb-2", name: "Vanilla Sweet Cream Brew", description: "Cold brew topped with vanilla cream.", price: 5.75, image: coldBrew, category: "Cold Brew" },
  { id: "tea-1", name: "Jasmine Green", description: "Floral, light, soothing.", price: 4.0, image: tea, category: "Tea" },
  { id: "tea-2", name: "Earl Grey Cream", description: "Bergamot with steamed milk.", price: 4.5, image: tea, category: "Tea" },
  { id: "pas-1", name: "Butter Croissant", description: "Flaky, golden, French butter.", price: 3.75, image: pastries, category: "Pastries" },
  { id: "pas-2", name: "Almond Danish", description: "Frangipane, toasted almonds.", price: 4.25, image: pastries, category: "Pastries" },
  { id: "ss-1", name: "Maple Pecan Latte", description: "Seasonal — pure maple, toasted pecan.", price: 6.0, image: beans, category: "Seasonal", bestseller: true },
  { id: "ss-2", name: "Spiced Chai Mocha", description: "House chai meets dark chocolate.", price: 5.75, image: beans, category: "Seasonal" },
];

export const categories = ["Espresso", "Cappuccino", "Latte", "Cold Brew", "Tea", "Pastries", "Seasonal"] as const;
