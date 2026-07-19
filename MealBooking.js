class MealBooking {
    // Private fields
    #studentId;
    #studentName;
    #mealDate;
    #mealType;
    #quantity;
    #dietaryNote;
    #bookingStatus;
    
    constructor(studentId, studentName, mealDate, mealType, quantity, dietaryNote) {
        this.#studentId = studentId;
        this.#studentName = studentName;
        this.#mealDate = mealDate;
        this.#mealType = mealType;
        this.#quantity = quantity;
        this.#dietaryNote = dietaryNote;
        this.#bookingStatus = "Pending"; // Default status
    }

    get studentId() {
        return this.#studentId;
    }

    get studentName() {
        return this.#studentName;
    }

    get mealDate() {
        return this.#mealDate;
    }

    get mealType() {
        return this.#mealType;
    }

    get quantity() {
        return this.#quantity;
    }

    get dietaryNote() {
        return this.#dietaryNote;
    }

    get bookingStatus() {
        return this.#bookingStatus;
    }

    set studentId(studentId) {
        this.#studentId = studentId;
    }

    set studentName(studentName) {
        this.#studentName = studentName;
    }

    set mealDate(mealDate) {
        this.#mealDate = mealDate;
    }

    set mealType(mealType) {
        this.#mealType = mealType;
    }

    set quantity(quantity) {
        this.#quantity = quantity;
    }

    set dietaryNote(dietaryNote) {
        this.#dietaryNote = dietaryNote;
    }

    set bookingStatus(status) {
        this.#bookingStatus = status;
    }

    calculateTotal() {
        let pricePerMeal = 0;

        switch (this.#mealType.toLowerCase()) {
            case "breakfast":
                pricePerMeal = 10;
                break;
            case "lunch":
                pricePerMeal = 15;
                break;
            case "dinner":
                pricePerMeal = 20;
                break;
            default:
                pricePerMeal = 0;
        }

        return pricePerMeal * this.#quantity;
    }

    getSummary() {
        return `
Meal Booking Summary
--------------------
Student ID: ${this.#studentId}
Student Name: ${this.#studentName}
Meal Date: ${this.#mealDate}
Meal Type: ${this.#mealType}
Quantity: ${this.#quantity}
Dietary Note: ${this.#dietaryNote}
Status: ${this.#bookingStatus}
Total Cost: $${this.calculateTotal()}
        `;
    }
}

export default MealBooking;
