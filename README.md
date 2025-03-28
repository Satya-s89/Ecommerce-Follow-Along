# 🛒 **Ecommerce Application**

---

## **Milestone 1: Project Setup**
- Created the initial project structure.
- Added a basic README file to guide the project setup and progress.

---

## **Milestone 2: Frontend & Backend Setup**
- Set up a React app for the frontend.
- Created a Node.js server for the backend.
- Installed and integrated Tailwind CSS for styling.
- Connected the backend to MongoDB.

---

## **Milestone 3: User Authentication Basics**
- Designed the folder structure for the backend with routes, controllers, and models.
- Connected the backend to the database with basic error handling.
- Began implementing secure user authentication using bcrypt.

---

## **Milestone 4: User Management and File Uploads**
- Created a user model to manage user information, such as name, email, and password.
- Enabled user profile picture uploads using Multer.

---

## **Milestone 5: Signup Page**
- Built a user signup page with input fields for name, email, and password.
- Added frontend form validation.
- Integrated the signup form with the backend API.

---

## **Milestone 6: Signup Backend**
- Implemented bcrypt for secure password encryption.
- Created a `/signup` backend endpoint to securely store user information.

---

## **Milestone 7: Login Authentication**
- Built a `/login` endpoint to validate user credentials.
- Added secure password comparison using bcrypt.
- Returned appropriate error messages for incorrect inputs.

---

## **Milestone 8: Product Card Component**
- Designed a reusable product card component for displaying product details.
- Organized a grid layout to display multiple product cards on the homepage.

---

## **Milestone 9: Product Input Form**
- Created an input form for adding new products.
- Added fields for product title, description, and image uploads.
- Implemented multiple image upload functionality.

---

## **Milestone 10: Product Schema and Endpoint Creation**
- Developed a Mongoose schema for products.
  - Included fields such as `name`, `description`, `price`, and `image URL`.
- Created a POST endpoint to handle and validate product data submission to the database.

---

## **Milestone 11: Dynamic Product Display**
### **Backend**
- Developed an API endpoint to retrieve all products from MongoDB.
- Implemented error handling for database operations.

### **Frontend**
- Created a function to fetch product data from the backend.
- Dynamically displayed the data on the homepage using the product card component.
- Enhanced the UI by seamlessly integrating the backend with the frontend.


## **Tech Stack**
### Frontend:
- React, Redux, Tailwind CSS

### Backend:
- Node.js, Express.js

### Database:
- MongoDB

### Authentication:
- bcrypt for password security

---

# Milestone 12: My Products Page 🌟

Welcome to Milestone 12! This milestone focuses on creating a **My Products page** that displays all the products added by the user based on their email. By the end of this milestone, you will have learned how to build an endpoint in the backend to filter and send data from MongoDB and dynamically display this data on the frontend using pre-designed product cards.

## Learning Goals 🎯

- Create a backend endpoint to filter data by user email and send it to the client.
- Learn how to fetch this data on the frontend.
- Dynamically display product information using the Product Card component created earlier.

### Backend:
1. Write an endpoint that queries MongoDB for products associated with the user's email.
2. Return the filtered data to the frontend.

### Frontend:
1. Create a function to fetch data from the backend endpoint.
2. Use the Product Card component to dynamically render the retrieved products.

---

# Milestone 13: Edit Functionality for Uploaded Products 🌟

## Overview
In this milestone, we have implemented the **edit functionality** for uploaded products. This includes adding an edit button to product cards, autofilling the form with existing data, and allowing users to update product details. The backend logic has been designed to ensure seamless data updates in the MongoDB database.

### Backend:
1. Created an API endpoint in the backend to handle the update operation for product details.
2. Validated incoming data to ensure integrity before updating the MongoDB database.
3. Updated the database with the new product details.

### Frontend:
1. Added an **Edit** button to product cards.
2. Upon clicking the Edit button:
   - Passed the selected product’s data to the form.
   - Autofilled the form with the product’s existing details for easy editing.
3. Provided users the option to modify details and save changes.

---


# Milestone 14: Delete Product Functionality 🌟

Welcome to Milestone 14! In this milestone, we enhance our product management system by implementing a delete functionality. Users will be able to remove products from MongoDB using a backend endpoint.

**Backend:**  
1. Create a DELETE endpoint in your server to handle requests to remove a product using its ID.  
2. Implement logic to find and delete the product in MongoDB.

**Frontend:**  
1. Add a delete button to each product card.  
2. On button click, send the product ID to the DELETE endpoint.  
3. Update the UI to reflect the removal.



