/**
 * IS305 Lab 2 - Dining Booking Credit Extension
 * Part 1: Student Class and Initial Integration
 * Student Name: Obert MOSES
 * Student ID: 221338
 * Date: 14 August 2026
 */

class Student {
    #studentId;
    #firstName;
    #lastName;

    constructor(studentId, firstName, lastName) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get studentId() {
        return this.#studentId;
    }

    set studentId(value) {
        if (!value || !String(value).trim()) {
            throw new Error("Student ID cannot be empty.");
        }
        this.#studentId = String(value).trim();
    }

    get firstName() {
        return this.#firstName;
    }

    set firstName(value) {
        if (!value || !String(value).trim()) {
            throw new Error("First name cannot be empty.");
        }
        this.#firstName = String(value).trim();
    }

    get lastName() {
        return this.#lastName;
    }

    set lastName(value) {
        if (!value || !String(value).trim()) {
            throw new Error("Last name cannot be empty.");
        }
        this.#lastName = String(value).trim();
    }

    getFullName() {
        return `${this.#firstName} ${this.#lastName}`;
    }

    displayInfo() {
        console.log("\n========================================");
        console.log("           STUDENT DETAILS");
        console.log("========================================");
        console.log(`Student ID: ${this.#studentId}`);
        console.log(`Student Name: ${this.getFullName()}`);
        console.log("========================================\n");
    }
}

module.exports = Student;
