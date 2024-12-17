# E-Commerce Application Backend

This repository contains the backend code for our E-Commerce Application, providing API endpoints and database management for the platform.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL (with Prisma ORM)
- TypeScript
- JWT for authentication

## Features

- RESTful API endpoints for all e-commerce functionalities
- User authentication and authorization
- Product and inventory management
- Order processing
- Payment integration (Stripe)
- File upload handling (Cloudinary)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/abuhosain/premium-haat-bacekend.git
   ```

2. Navigate to the project directory:
   ```
   cd e-commerce-backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db"
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. Set up the database:
   ```
   npx prisma migrate dev
   ```

## Usage

To start the development server:

```
npm run dev
```

The API will be available at `http://localhost:5000`.

## API Documentation

API endpoints are documented using Swagger. After starting the server, you can access the API documentation at `http://localhost:5000/api-docs`.

## Database Schema

The database schema is defined in the `prisma/schema.prisma` file. To update the schema:

1. Modify the `schema.prisma` file
2. Run `npx prisma migrate dev --name your_migration_name`
3. Update your API accordingly

## Contributing

We welcome contributions to improve the E-Commerce Application backend. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

 