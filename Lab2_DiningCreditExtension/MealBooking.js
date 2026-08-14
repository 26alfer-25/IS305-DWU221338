/**
 * IS305 Lab 2 - Dining Booking Credit Extension
 * Part 2: Student and MealBooking Integration
 * Student Name: Obert MOSES
 * Student ID: 221338
 * Date: 14 August 2026
 */

const Student = require("./Student");

class MealBooking {
    #student;
    #mealDate;
    #mealType;
    #quantity;
    #dietaryNote;
    #bookingStatus;

    static MEAL_PRICES = {
        Breakfast: 10,
        Lunch: 15,
        Dinner: 20
    };

    constructor(student, mealDate, mealType, quantity, dietaryNote = "") {
        if (!(student instanceof Student)) {
            throw new Error("MealBooking requires a valid Student object.");
        }

        this.#student = student;
        this.#mealDate = mealDate;
        this.#mealType = mealType;
        this.#quantity = Number(quantity);
        this.#dietaryNote = dietaryNote;
        this.#bookingStatus = "Pending";
    }

    get student() { return this.#student; }
    get mealDate() { return this.#mealDate; }
    get mealType() { return this.#mealType; }
    get quantity() { return this.#quantity; }
    get dietaryNote() { return this.#dietaryNote; }
    get bookingStatus() { return this.#bookingStatus; }

    set mealDate(value) { this.#mealDate = value; }
    set mealType(value) { this.#mealType = value; }
    set quantity(value) { this.#quantity = Number(value); }
    set dietaryNote(value) { this.#dietaryNote = value; }

    calculateTotal() {
        const price = MealBooking.MEAL_PRICES[this.#mealType];
        return price ? price * this.#quantity : 0;
    }

    validate() {
        const errors = [];

        if (!(this.#student instanceof Student)) {
            errors.push("A valid Student object is required.");
        } else {
            try {
                this.#student.studentId;
                this.#student.firstName;
                this.#student.lastName;
            } catch {
                errors.push("Student information is invalid.");
            }
        }

        if (!this.#mealDate || !/^\d{4}-\d{2}-\d{2}$/.test(this.#mealDate)) {
            errors.push("Meal date must use YYYY-MM-DD format.");
        }

        if (!Object.hasOwn(MealBooking.MEAL_PRICES, this.#mealType)) {
            errors.push("Meal type must be Breakfast, Lunch, or Dinner.");
        }

        if (!Number.isInteger(this.#quantity) || this.#quantity < 1) {
            errors.push("Quantity must be a whole number of at least 1.");
        }

        return errors;
    }

    confirmBooking() {
        const errors = this.validate();
        if (errors.length) {
            throw new Error(errors.join(" "));
        }
        this.#bookingStatus = "Confirmed";
    }

    cancelBooking() {
        this.#bookingStatus = "Cancelled";
    }

    getSummary() {
        return `${this.#student.getFullName()} (${this.#student.studentId}) | ` +
            `${this.#mealDate} | ${this.#mealType} x ${this.#quantity} | ` +
            `K${this.calculateTotal().toFixed(2)} | ${this.#bookingStatus}`;
    }
}

module.exports = MealBooking;
