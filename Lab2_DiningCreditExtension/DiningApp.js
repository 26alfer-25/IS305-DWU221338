/**
 * IS305 Lab 2 - Dining Booking Credit Extension
 * Part 2: Student and MealBooking Integration
 * Student Name: Obert MOSES
 * Student ID: 221338
 * Date: 14 August 2026
 */

const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const Student = require("./Student");
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

function displayBookingHistory(student, bookingArray) {
    const studentBookings = bookingArray.filter(
        booking => booking.student === student
    );

    console.log("\n========================================");
    console.log("          STUDENT INFORMATION");
    console.log("========================================");
    student.displayInfo();

    console.log("\n========================================");
    console.log("           BOOKING HISTORY");
    console.log("========================================");

    if (studentBookings.length === 0) {
        console.log("No bookings found for this student.");
        return;
    }

    let combinedCost = 0;

    studentBookings.forEach((booking, index) => {
        combinedCost += booking.calculateTotal();

        console.log(`\n${index + 1}. ${booking.mealType} - ${booking.mealDate}`);
        console.log(`   Quantity: ${booking.quantity}`);
        console.log(`   Status: ${booking.bookingStatus}`);
        console.log(`   Cost: K${booking.calculateTotal().toFixed(2)}`);
        if (booking.dietaryNote) {
            console.log(`   Dietary Note: ${booking.dietaryNote}`);
        }
    });

    console.log("\n----------------------------------------");
    console.log(`Total Bookings: ${studentBookings.length}`);
    console.log(`Combined Cost: K${combinedCost.toFixed(2)}`);
    console.log("========================================\n");
}

function isDuplicate(student, mealDate, mealType, bookingArray) {
    return bookingArray.some(booking =>
        booking.student === student &&
        booking.mealDate === mealDate &&
        booking.mealType === mealType &&
        booking.bookingStatus !== "Cancelled"
    );
}

async function createBooking(student) {
    console.log("\n--- Create Meal Booking ---");

    const mealDate = await ask("Meal Date (YYYY-MM-DD): ");

    console.log("\nMeal Types:");
    console.log("1. Breakfast - K10");
    console.log("2. Lunch     - K15");
    console.log("3. Dinner    - K20");

    const choice = await ask("Select meal type (1-3): ");
    const selected = MEAL_OPTIONS[choice];

    if (!selected) {
        console.log("ERROR: Invalid meal type.");
        return;
    }

    const quantity = Number(await ask("Quantity: "));
    const dietaryNote = await ask("Dietary Note (optional): ");

    if (isDuplicate(student, mealDate, selected.name, bookings)) {
        console.log(
            "ERROR: A booking already exists for this student, date and meal type."
        );
        return;
    }

    try {
        const booking = new MealBooking(
            student,
            mealDate,
            selected.name,
            quantity,
            dietaryNote
        );

        const errors = booking.validate();

        if (errors.length > 0) {
            console.log("\nBOOKING REJECTED:");
            errors.forEach(error => console.log(`- ${error}`));
            return;
        }

        bookings.push(booking);

        console.log("\nBooking created successfully.");
        console.log(`Status: ${booking.bookingStatus}`);

        const confirm = (await ask("Confirm booking? (y/n): ")).toLowerCase();

        if (confirm === "y" || confirm === "yes") {
            booking.confirmBooking();
            console.log("Booking confirmed.");
        } else {
            booking.cancelBooking();
            console.log("Booking cancelled.");
        }

        console.log(`Summary: ${booking.getSummary()}`);
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
    }
}

async function updateStudent(student) {
    console.log("\n--- Update Student Information ---");
    console.log("1. Update First Name");
    console.log("2. Update Last Name");

    const choice = await ask("Choose an option: ");

    try {
        if (choice === "1") {
            const newFirstName = await ask("New First Name: ");
            student.firstName = newFirstName;
        } else if (choice === "2") {
            const newLastName = await ask("New Last Name: ");
            student.lastName = newLastName;
        } else {
            console.log("Invalid option.");
            return;
        }

        console.log("Student information updated.");
        student.displayInfo();
        console.log("\nExisting booking summaries now use the updated Student object:");
        bookings
            .filter(booking => booking.student === student)
            .forEach(booking => console.log(booking.getSummary()));
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
    }
}

async function main() {
    try {
        console.log("========================================");
        console.log("       UNIVERSITY DINING SYSTEM");
        console.log("       IS305 LAB 2 - PART 2");
        console.log("========================================");

        const studentId = await ask("Student ID: ");
        const firstName = await ask("First Name: ");
        const lastName = await ask("Last Name: ");

        const student = new Student(studentId, firstName, lastName);

        let running = true;

        while (running) {
            console.log("\n1. Display Student");
            console.log("2. Create Meal Booking");
            console.log("3. Display Booking History");
            console.log("4. Update Student Name");
            console.log("5. Exit");

            const choice = await ask("Choose an option: ");

            switch (choice) {
                case "1":
                    student.displayInfo();
                    break;
                case "2":
                    await createBooking(student);
                    break;
                case "3":
                    displayBookingHistory(student, bookings);
                    break;
                case "4":
                    await updateStudent(student);
                    break;
                case "5":
                    running = false;
                    console.log("Thank you for using the University Dining System.");
                    break;
                default:
                    console.log("ERROR: Please choose an option from 1 to 5.");
            }
        }
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
    } finally {
        rl.close();
    }
}

main();
