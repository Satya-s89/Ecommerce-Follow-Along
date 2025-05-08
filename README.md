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

---

# Milestone 15: Navbar Component Creation 🚀

## Overview 🌟
Welcome to **Milestone 15**, Kalvians! In this milestone, we will focus on creating a reusable and responsive **Navbar Component** for our application. This Navbar will be integrated across multiple pages to ensure seamless navigation.

### Learning Goals 🎯
By the end of this milestone, you will:
- Understand how to create a **Nav component** in React.
- Learn how to reuse the same component across multiple pages.
- Master the techniques for making a responsive Navbar that adapts to various screen sizes.

## Key Features ✨
- **Reusable Component**: A single Navbar used across all pages to maintain consistency.
- **Smooth Navigation**: Effortless movement between pages.
- **Responsive Design**: Adaptive layout for enhanced usability on all devices.

---

## **🛠️ Milestone 16 :**
- **Product Info Page**: Added a page displaying product details dynamically.  
- **Quantity Selector**: Included an input for selecting quantity.  
- **Add to Cart**: Implemented functionality to add selected quantity to the cart.  
- **Submission**: Code pushed to a public GitHub repository with an updated README.

---

### **🛠️ Milestone 17: Created ProducedDetail page**
- create endpoints in backend *CRUD* for handling cart
- Handled quantity in cart

---

### **🛠️ Milestone 18: Created Frontend for the Cart page**
- created the cart page in frontend
- Handled cart operations from frontend

---

### **🛠️ Milestone 19: Backend endpoint for cart item quantity**
- created put request for updating quantity for cart item.

---

### **🛠️ Milestone 20: Backend endpoint for UserDetails**
- created endpoint for userdetails in backend
- created *user.jsx* for user details in frontend

---

### **🛠️ Milestone 21: Created frontend for Address**
- created route for Add Address page in Frontend
- created form for adding address
- Stored address using useState Hook

---

### **🛠️ Milsestone 22: Created backend for address and attached with frontend**
- created backend endpoint for handling address
- added backend endpoint with frontend

---

### **🛠️ Milestone 23 worked on address in frontend and backend**
- created placeorder button in cart page and added navigation to select address
- created select address page and provided option to select one address.
- created backend endpoint to sent all address to user.

---

### **🛠️ Milestone 24 worked on address in frontend and backend**
- Displayed all of products in cart.
- Displayed All address in address selection page.
- Displayed total price in cart.
- Added place order button at the bottom.

---

### **🛠️ Milestone 25 worked on order backend and email service**
- created endpoint for order.
- implemented mail service from nodemailer.
- handled address for the delivery.

---

### **🛠️ Milestone 26 worked on order backend and email service**
- Implemented mail with nodemailer.
- Sending order details to user via mail.

---

### ** Milestone 27: Created Order page in frontend**
- Created get Request for orders

---

### ** Milestone 28: Created Order page in frontend**
- Added cancel button in my-orders and create an backend endpoint for cancel order.

---

### ** Milestone 29: Created Order page in frontend**
- Created a payment gateway for payment of order.
- Created an endpoint for payment.
- Created an endpoint for payment verification.

---

### ** Milestone 30: Created Order page in frontend**
- Created a payment gateway for payment of order.
- Created an endpoint for payment.
- Created an endpoint for payment verification.
- Created a success page for payment.
- Created a failure page for payment.