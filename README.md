# Crypto Backend with Dockerized Deployment

This project is the backend for a crypto application, containerized with Docker for easy deployment. The CI/CD pipeline is set up using GitHub Actions, and resource provisioning is automated with Terraform.

The backend has been successfully deployed at [https://api.oceanzou.click](https://api.oceanzou.click), 
and you can use [https://api.oceanzou.click/api/v1/health](https://api.oceanzou.click/api/v1/health) to check its status.

## Project Structure

- **src**: Contains the source code for the Node.js application.
  ### `__tests__`
  Contains unit tests and test utilities to ensure the correctness of the application.

  ### `config`
  Holds configuration files for various environments, including settings related to database connections, API keys, and other environment-specific configurations.

  ### `controllers`
  Responsible for handling incoming requests, processing data, and orchestrating the interaction between different parts of the application.

  ### `loader`
  May contain scripts or modules responsible for loading initial data or performing setup tasks when the application starts.

  ### `middleware`
  Includes middleware functions that intercept requests before they reach the route handlers. These functions can perform tasks such as authentication, logging, or modifying the request/response objects.

  ### `models`
  Contains data models and database schema definitions, defining the structure of the application's data and including interactions with the database.

  ### `routes`
  Defines modules that specify how the application responds to specific HTTP requests. Each route module corresponds to a set of related routes.

  ### `services`
  Implements business logic and data processing services, encapsulating the core functionality of the application. These services can be used by controllers or other parts of the application.
- **Dockerfile**: Specifies the instructions to build a Docker image for the application.
- **.github/workflows**: GitHub Actions workflows for CI/CD.
- **terraform**: Terraform configuration files for resource provisioning.

## CI/CD Workflow

The CI/CD workflow is defined in the GitHub Actions configuration file. It includes steps to lint the code, build the Docker image, and deploy the application.

## Terraform Infrastructure

The `terraform` directory contains Terraform configuration files to provision AWS resources. This includes creating an ECS cluster, setting up a VPC, defining subnets, and configuring security groups.

## Deployment

### Dockerized Deployment

The backend is containerized using Docker. To build and run the Docker image locally, use the following commands:

## Local Development

### Prerequisites

- Node.js and npm installed
- Local MongoDB instance

### Configure Environment

Create a .env file in the root directory with the following content:
NODE_ENV=development
PORT=3000
MONGO_URI=<YourLocalMongoDBURI>
API_PREFIX=/api
<!-- Replace <YourLocalMongoDBURI> with the connection URI for your local MongoDB -->

### Run Locally

npm install
npm start

The app will be accessible at http://localhost:3000.


## Conclusion

Congratulations! You've successfully set up and deployed the Crypto Backend. For more details on available scripts, testing, and deployment optimizations, refer to the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). If you have any questions or encounter issues, feel free to reach out to the project contributors.

Happy coding!

