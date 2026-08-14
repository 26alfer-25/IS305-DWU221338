# IS305 Assessment Task 1 - Dining Meal Booking Feature

**Student Name:** Obert MOSES  
**Student ID:** 221338  
**Date:** 13 August 2026\
**GitHub URL:** https://github.com/26alfer-25/IS305-DWU221338.git

## 1. Project Description

This project implements a simple University Dining Meal Booking Feature using JavaScript and Node.js. It demonstrates object-oriented programming, private class fields, validation, calculations, booking status management, duplicate-booking prevention, arrays, user input, and error handling.

## 2. Files

### MealBooking.js
Contains the `MealBooking` class. It provides:
- Private fields for booking information.
- Constructor initialization.
- Getters and setters.
- Meal price definitions.
- Total-cost calculation.
- Validation.
- Booking confirmation and cancellation.
- Booking summary.
- Module export.

### DiningApp.js
Contains the console application. It:
- Collects booking information using Node.js `readline/promises`.
- Validates user input.
- Supports Breakfast (K10), Lunch (K15), and Dinner (K20).
- Stores bookings in a JavaScript array.
- Prevents duplicate bookings.
- Allows a booking to be confirmed or cancelled.
- Displays a booking receipt.
- Handles errors without crashing.

## 3. Requirements

Install Node.js on the computer.

No external npm packages are required.

## 4. How to Run

Open a terminal in the project folder and run:

```bash
node DiningApp.js
```

## 5. Meal Prices

| Meal Type | Price |
|---|---:|
| Breakfast | K10 |
| Lunch | K15 |
| Dinner | K20 |

## 6. Validation

The application checks that:
- Student ID is provided.
- Student name is provided.
- Meal date is entered in `YYYY-MM-DD` format.
- Meal type is Breakfast, Lunch, or Dinner.
- Quantity is a whole number of at least 1.
- A duplicate active booking does not already exist for the same Student ID, date, and meal type.

## 7. Test Cases

### Test 1 - Valid Booking
**Input**
- Student ID: 221338
- Student Name: Obert MOSES
- Meal Date: 2026-08-14
- Meal Type: Lunch
- Quantity: 2
- Dietary Note: No special requirement

**Expected Result**
- Booking is accepted.
- Total is calculated as K30.00.
- Status changes from Pending to Confirmed when the user confirms.

### Test 2 - Invalid Booking
**Example Input**
- Student ID: 221338
- Student Name: Obert MOSES
- Meal Date: 2026-08-14
- Meal Type: Lunch
- Quantity: 0

**Expected Result**
- Booking is rejected.
- The application displays an error stating that quantity must be at least 1.

### Test 3 - Duplicate Booking
Create a valid booking for the same:
- Student ID
- Meal Date
- Meal Type

Then attempt to create the same booking again.

**Expected Result**
- The second booking is rejected as a duplicate.

## 8. GitHub Repository

Repository name:

`IS305-221338`

Project folder:

`AT1_DiningFeature`

Recommended repository structure:

```text
IS305-221338/
└── AT1_DiningFeature/
    ├── MealBooking.js
    ├── DiningApp.js
    └── README.md
```

## 9. Suggested Git Commits

Use meaningful commits such as:

1. `Initial project setup`
2. `Add MealBooking OOP class`
3. `Add dining booking console application`
4. `Add validation and duplicate detection`
5. `Add README and test documentation`

## 10. Conclusion

The application provides a basic but complete dining meal-booking feature while demonstrating the required JavaScript OOP and application-development concepts.
