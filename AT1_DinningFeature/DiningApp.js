/**
 * IS305 Assessment Task 1 - Dining Meal Booking Feature
 * Student Name: Obert MOSES
 * Student ID: 221338
 * Date: 13 August 2026
 * Description: Console application for creating and managing dining meal bookings.
 */

const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const MealBooking = require("./MealBooking");

const rl = readline.createInterface({ input, output });
const bookings = [];

const MEAL_OPTIONS = {
    "1": { name: "Breakfast", price: 10 },
    "2": { name: "Lunch", price: 15 },
    "3": { name: "Dinner", price: 20 }
};

async function ask(question) {
    return (await rl.question(question)).trim();
}

function isDuplicate(candidate) {
    return bookings.some(existing =>
        existing.studentId.toLowerCase() === candidate.studentId.toLowerCase() &&
        existing.mealDate === candidate.mealDate &&
        existing.mealType === candidate.mealType &&
        existing.bookingStatus !== "Cancelled"
    );
}

function displayReceipt(booking) {
    console.log("\n========================================");
    console.log("          DINING BOOKING RECEIPT");
    console.log("========================================");
    console.log(`Student ID    : ${booking.studentId}`);
    console.log(`Student Name  : ${booking.studentName}`);
    console.log(`Meal Date     : ${booking.mealDate}`);
    console.log(`Meal Type     : ${booking.mealType}`);
    console.log(`Quantity      : ${booking.quantity}`);
    console.log(`Dietary Note  : ${booking.dietaryNote || "None"}`);
    console.log(`Total Cost    : K${booking.calculateTotal().toFixed(2)}`);
    console.log(`Status        : ${booking.bookingStatus}`);
    console.log("========================================\n");
}

async function createBooking() {
    console.log("\n--- Create Dining Meal Booking ---");

    const studentId = await ask("Student ID: ");
    const studentName = await ask("Student Name: ");
    const mealDate = await ask("Meal Date (YYYY-MM-DD): ");

    console.log("\nMeal Types:");
    console.log("1. Breakfast - K10");
    console.log("2. Lunch     - K15");
    console.log("3. Dinner    - K20");

    const mealChoice = await ask("Select meal type (1-3): ");
    const selectedMeal = MEAL_OPTIONS[mealChoice];
    const mealType = selectedMeal ? selectedMeal.name : mealChoice;

    const quantityInput = await ask("Quantity: ");
    const quantity = Number(quantityInput);
    const dietaryNote = await ask("Dietary Note (optional): ");

    const booking = new MealBooking(
        studentId,
        studentName,
        mealDate,
        mealType,
        quantity,
        dietaryNote
    );

    const errors = booking.validate();

    if (errors.length > 0) {
        console.log("\nBOOKING REJECTED:");
        errors.forEach(error => console.log(`- ${error}`));
        return;
    }

    if (isDuplicate(booking)) {
        console.log(
            "\nBOOKING REJECTED: A booking already exists for this student, date, and meal type."
        );
        return;
    }

    bookings.push(booking);

    console.log("\nBooking created successfully.");
    console.log("Current status: Pending");

    const confirm = (await ask("Confirm this booking? (y/n): ")).toLowerCase();

    if (confirm === "y" || confirm === "yes") {
        booking.confirmBooking();
        console.log("Booking confirmed successfully.");
    } else {
        booking.cancelBooking();
        console.log("Booking cancelled.");
    }

    displayReceipt(booking);
}

function listBookings() {
    console.log("\n--- All Bookings ---");

    if (bookings.length === 0) {
        console.log("No bookings have been created.");
        return;
    }

    bookings.forEach((booking, index) => {
        console.log(`${index + 1}. ${booking.getSummary()}`);
    });
}

async function main() {
    console.log("========================================");
    console.log("       UNIVERSITY DINING SYSTEM");
    console.log("========================================");
    console.log("Student: Obert MOSES");
    console.log("ID     : 221338");

    try {
        let running = true;

        while (running) {
            console.log("\n1. Create Booking");
            console.log("2. View Bookings");
            console.log("3. Exit");

            const choice = await ask("Choose an option: ");

            switch (choice) {
                case "1":
                    await createBooking();
                    break;
                case "2":
                    listBookings();
                    break;
                case "3":
                    running = false;
                    console.log("\nThank you for using the University Dining System.");
                    break;
                default:
                    console.log("Invalid option. Please select 1, 2, or 3.");
            }
        }
    } catch (error) {
        console.error("\nUnexpected error:", error.message);
    } finally {
        rl.close();
    }
}

main();
