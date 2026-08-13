/**
 * IS305 Assessment Task 1 - Dining Meal Booking Feature
 * Student Name: Obert MOSES
 * Student ID: 221338
 * Date: 13 August 2026
 * Description: Defines the MealBooking class for managing dining meal bookings.
 */

class MealBooking {
    #studentId;
    #studentName;
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

    constructor(studentId, studentName, mealDate, mealType, quantity, dietaryNote = "") {
        this.#studentId = studentId;
        this.#studentName = studentName;
        this.#mealDate = mealDate;
        this.#mealType = mealType;
        this.#quantity = Number(quantity);
        this.#dietaryNote = dietaryNote;
        this.#bookingStatus = "Pending";
    }

    get studentId() { return this.#studentId; }
    set studentId(value) { this.#studentId = value; }

    get studentName() { return this.#studentName; }
    set studentName(value) { this.#studentName = value; }

    get mealDate() { return this.#mealDate; }
    set mealDate(value) { this.#mealDate = value; }

    get mealType() { return this.#mealType; }
    set mealType(value) { this.#mealType = value; }

    get quantity() { return this.#quantity; }
    set quantity(value) { this.#quantity = Number(value); }

    get dietaryNote() { return this.#dietaryNote; }
    set dietaryNote(value) { this.#dietaryNote = value; }

    get bookingStatus() { return this.#bookingStatus; }

    calculateTotal() {
        const price = MealBooking.MEAL_PRICES[this.#mealType];
        return price ? price * this.#quantity : 0;
    }

    validate() {
        const errors = [];

        if (!this.#studentId || !this.#studentId.trim()) {
            errors.push("Student ID is required.");
        }

        if (!this.#studentName || !this.#studentName.trim()) {
            errors.push("Student name is required.");
        }

        if (!this.#mealDate || !/^\d{4}-\d{2}-\d{2}$/.test(this.#mealDate)) {
            errors.push("Meal date is required in YYYY-MM-DD format.");
        } else {
            const selectedDate = new Date(`${this.#mealDate}T00:00:00`);
            if (Number.isNaN(selectedDate.getTime())) {
                errors.push("Meal date is invalid.");
            }
        }

        if (!Object.prototype.hasOwnProperty.call(MealBooking.MEAL_PRICES, this.#mealType)) {
            errors.push("Meal type must be Breakfast, Lunch, or Dinner.");
        }

        if (!Number.isInteger(this.#quantity) || this.#quantity < 1) {
            errors.push("Quantity must be a whole number of at least 1.");
        }

        return errors;
    }

    confirmBooking() {
        const errors = this.validate();
        if (errors.length > 0) {
            throw new Error(errors.join(" "));
        }
        this.#bookingStatus = "Confirmed";
    }

    cancelBooking() {
        this.#bookingStatus = "Cancelled";
    }

    getSummary() {
        return `${this.#studentName} (${this.#studentId}) | ${this.#mealDate} | ` +
               `${this.#mealType} x ${this.#quantity} | K${this.calculateTotal().toFixed(2)} | ` +
               `${this.#bookingStatus}`;
    }
}

module.exports = MealBooking;
