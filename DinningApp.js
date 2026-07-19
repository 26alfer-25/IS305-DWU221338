
import MealBooking from "./MealBooking.js";

const booking1 = new MealBooking(
    "S1001",
    "Obert Moses",
    "2026-07-20",
    "Lunch",
    2,
    "Vegetarian"
);

console.log(booking1.getSummary());
console.log("Calculated Total: $" + booking1.calculateTotal());