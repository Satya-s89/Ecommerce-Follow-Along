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

---

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

Sure, here's a concise and engaging README file for Milestone 12 based on your instructions:

---

# Milestone 12: My Products Page 🌟

Welcome to Milestone 12! This milestone focuses on creating a **My Products page** that displays all the products added by the user based on their email. By the end of this milestone, you will have learned how to build an endpoint in the backend to filter and send data from MongoDB and dynamically display this data on the frontend using pre-designed product cards.

## Learning Goals 🎯

- Create a backend endpoint to filter data by user email and send it to the client.
- Learn how to fetch this data on the frontend.
- Dynamically display product information using the Product Card component created earlier.

---

## Steps to Achieve Milestone 12 🛠️

### Backend:
1. Write an endpoint that queries MongoDB for products associated with the user's email.
2. Return the filtered data to the frontend.

### Frontend:
1. Create a function to fetch data from the backend endpoint.
2. Use the Product Card component to dynamically render the retrieved products.

---

## Key Highlights:
- Understanding **data filtering** with specific constraints (e.g., email-based filtering).
- Developing the communication flow between the backend and frontend.
- Displaying dynamic data effectively using React components.

---



