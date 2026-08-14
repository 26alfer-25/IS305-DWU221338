/**
 * IS305 Lab 2 - Dining Booking Credit Extension
 * Part 1: Student Class and Initial Integration
 * Student Name: Obert MOSES
 * Student ID: 221338
 * Date: 14 August 2026
 */

const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const Student = require("./Student");
const MealBooking = require("./MealBooking");

const rl = readline.createInterface({ input, output });

async function ask(question) {
    return (await rl.question(question)).trim();
}

async function main() {
    try {
        console.log("========================================");
        console.log("     IS305 LAB 2 - PART 1");
        console.log("     Student and Dining Application");
        console.log("========================================");

        const studentId = await ask("Enter Student ID: ");
        const firstName = await ask("Enter First Name: ");
        const lastName = await ask("Enter Last Name: ");

        const student = new Student(studentId, firstName, lastName);
        student.displayInfo();

        // Lab 1 MealBooking remains part of the application.
        const sampleBooking = new MealBooking(
            student.studentId,
            student.getFullName(),
            "2026-08-14",
            "Lunch",
            1,
            "No special requirement"
        );

        console.log("Lab 1 MealBooking check:");
        console.log(sampleBooking.getSummary());
    } catch (error) {
        console.error(`\nERROR: ${error.message}`);
    } finally {
        rl.close();
    }
}

main();
