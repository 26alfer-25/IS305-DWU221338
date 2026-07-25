const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const MEAL_PRICES = {
    'Breakfast': 15.00,
    'Lunch': 25.00,
    'Dinner': 35.00
};

class MealBooking {
    #status; 

    constructor({ studentId, studentName, mealDate, mealType, quantity, dietaryNote }) {
        
        if (!studentId || studentId.trim() === "") throw new Error("Missing student ID.");
        if (!studentName || studentName.trim() === "") throw new Error("Missing student name.");
        if (!mealDate || mealDate.trim() === "") throw new Error("Missing meal date.");

        
        const formattedMealType = mealType ? mealType.trim() : "";
        if (!MEAL_PRICES.hasOwnProperty(formattedMealType)) {
            throw new Error("Invalid meal type. Must be Breakfast, Lunch, or Dinner.");
        }

        const parsedQuantity = parseInt(quantity, 10);
        if (isNaN(parsedQuantity) || parsedQuantity < 1) {
            throw new Error("Quantity must be a number equal to or greater than 1.");
        }

        this.studentId = studentId.trim();
        this.studentName = studentName.trim();
        this.mealDate = mealDate.trim();
        this.mealType = formattedMealType;
        this.quantity = parsedQuantity;
        this.dietaryNote = dietaryNote?.trim() || "None";
        this.#status = "Pending"; // Default booking status
        
        this.totalCost = MEAL_PRICES[this.mealType] * this.quantity;
    }

    get status() {
        return this.#status;
    }

    confirmBooking() {
        this.#status = "Confirmed";
    }

    cancelBooking() {
        this.#status = "Cancelled";
    }

    displayReceipt() {
        console.log("\n=================================");
        console.log("      MEAL BOOKING RECEIPT       ");
        console.log("=================================");
        console.log(`Student ID:    ${this.studentId}`);
        console.log(`Student Name:  ${this.studentName}`);
        console.log(`Meal Date:     ${this.mealDate}`);
        console.log(`Meal Type:     ${this.mealType}`);
        console.log(`Quantity:      ${this.quantity}`);
        console.log(`Dietary Note:  ${this.dietaryNote}`);
        console.log(`Status:        [${this.#status}]`);
        console.log(`Total Cost:    PGK ${this.totalCost.toFixed(2)} Kina`);
        console.log("=================================\n");
    }
}

const bookingsDatabase = [];

function isDuplicateBooking(studentId, mealDate, mealType) {
    return bookingsDatabase.some(booking => 
        booking.studentId.toLowerCase() === studentId.trim().toLowerCase() &&
        booking.mealDate === mealDate.trim() &&
        booking.mealType.toLowerCase() === mealType.trim().toLowerCase()
    );
}

async function runApplication() {
    const rl = readline.createInterface({ input, output });
    console.log("--- Student Meal Booking System ---");

    try {
        
        const studentId = await rl.question("Enter Student ID: ");
        const studentName = await rl.question("Enter Student Name: ");
        const mealDate = await rl.question("Enter Meal Date (YYYY-MM-DD): ");
        const mealType = await rl.question("Enter Meal Type (Breakfast/Lunch/Dinner): ");
        const quantity = await rl.question("Enter Quantity: ");
        const dietaryNote = await rl.question("Enter Dietary Note (Optional): ");

        if (isDuplicateBooking(studentId, mealDate, mealType)) {
            throw new Error(`Duplicate entry found! A booking for Student ID ${studentId.trim()} on ${mealDate.trim()} for ${mealType.trim()} already exists.`);
        }

        const newBooking = new MealBooking({
            studentId,
            studentName,
            mealDate,
            mealType,
            quantity,
            dietaryNote
        });

        bookingsDatabase.push(newBooking);
        console.log("\n✔ Booking created successfully!");

       
        newBooking.displayReceipt();

    } catch (error) {
        
        console.error(`\n❌ Error processing application: ${error.message}`);
    } finally {
        rl.close();
    }
}

runApplication();