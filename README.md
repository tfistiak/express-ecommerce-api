# Express E-commerce API

This is a fully functional e-commerce API built with Express.js and MongoDB. The API provides endpoints for user authentication, product management, order processing, and user management. It is designed to be robust, scalable, and easy to use.

## Features

- User authentication (registration and login)
- Product management (CRUD operations)
- Order management (create and retrieve orders)
- User profile management
- Image upload functionality using Multer
- Error handling middleware
- Token-based authentication

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Multer (for file uploads)
- JWT (for authentication)

## Project Structure

```
express-ecommerce-api
├── src
│   ├── app.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── models
│   │   ├── productModel.js
│   │   ├── orderModel.js
│   │   └── userModel.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userRoutes.js
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── uploadMiddleware.js
│   └── utils
│       └── db.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd express-ecommerce-api
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up your MongoDB database and update the connection string in `src/utils/db.js`.

5. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user

### Products

- `GET /api/products` - Retrieve all products
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders/:userId` - Retrieve orders for a user

### Users

- `GET /api/users/:id` - Retrieve user profile
- `PUT /api/users/:id` - Update user information

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.