# IS305 Lab 2 - Dining Booking Credit Extension

**Student Name:** Obert MOSES  
**Student ID:** 221338  
**Folder:** `Lab2_DiningCreditExtension`

## Description

This project extends the working Lab 1 Dining Meal Booking application. Lab 2 introduces a separate `Student` class so that student identity is stored once and the same Student object can be connected to multiple MealBooking objects.

## Files

### Student.js
Defines the Student class with:
- private `#studentId`, `#firstName`, and `#lastName`;
- constructor using `this`;
- getters and controlled setters;
- validation against empty values;
- `getFullName()`;
- `displayInfo()`.

### MealBooking.js
Refactors MealBooking so it receives and stores a Student object. MealBooking continues to manage:
- meal date;
- meal type;
- quantity;
- dietary note;
- booking status;
- validation;
- total cost;
- confirmation/cancellation;
- booking summary.

The summary gets the student's name and ID from the connected Student object.

### DiningApp.js
Provides console interaction for:
- creating a Student from user input;
- creating meal bookings connected to that Student;
- storing bookings in an array;
- viewing booking history;
- updating the student's first or last name;
- demonstrating that existing booking summaries reflect the updated Student object.

## Object Relationship

```text
Student
  |
  | referenced by
  v
MealBooking
  |
  +-- mealDate
  +-- mealType
  +-- quantity
  +-- dietaryNote
  +-- bookingStatus
```

The same Student object can be referenced by several MealBooking objects.

## Run the application

Make sure Node.js is installed, then run:

```bash
node DiningApp.js
```

No database or external npm package is required.

## Required Tests

### 1. Valid Student
Enter:
- ID: `221338`
- First name: `Obert`
- Last name: `MOSES`

Expected: Student information is accepted and displayed.

### 2. Invalid Student
Leave the Student ID, first name, or last name empty.

Expected: The controlled setter rejects the value and displays an error.

### 3. Student and Booking Integration
Create a valid student and create a Lunch booking for quantity 2.

Expected:
- Booking is connected to the Student object.
- Cost is K30.00.
- Booking summary displays the Student name and ID.

### 4. Updated Student Name
Create a booking, then update the first or last name.

Expected: The existing booking summary displays the updated name because it uses the same Student object reference.

### 5. Booking History
Create two bookings for the same Student.

Expected:
- Student information is displayed once.
- Both bookings are listed.
- Total booking count is displayed.
- Combined cost is displayed.

## GitHub

Repository name:

`IS305-DWU221338`

Required Lab 2 folder:

`Lab2_DiningCreditExtension`

**GitHub URL:** https://github.com/26alfer-25/IS305-DWU221338.git

## AI Use

ChatGPT was used to help with the codes. Testing was done before submitting.
