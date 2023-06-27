# Employee Management API

Welcome to the documentation for Employee-management API. This API provides various endpoints for accessing and managing employees.

## Table of Contents
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
  - [Get all employees](#get-all-employees)
  - [Get employee(s) by ID](#get-employees-by-id)
  - [Find employee(s) by Parameters](#find-emplyee)
  - [Create employee](#create-employee)
  - [Update employee(s)](#update-employees)
  - [Delete employee(s)](#delete-employees)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with the API, follow these steps:

## Option 1 (Recommanded): Use docker compose
1. Clone the repository: `git clone https://github.com/Michaelt-noganet/employee-management.git`
2. Build the project with docker: `docker compose up`

## Option 2: Without Docker
1. Clone the repository: `git clone https://github.com/Michaelt-noganet/employee-management.git`
2. Install the dependencies: `yarn install` or `npm install`
3. Start the server: `yarn start` or `npm start`

The API will be available at `http://localhost:3000/v1`.

## Endpoints

### Get all employees

- URL: `/employee/read`
- Method: `GET`
- Description: Retrieves a list of all employees.
- Query Params:
  - `page`: number (optional)
- Response:
  - Status: `200 OK`
  - Body:
    - "status": "SUCCESS",
    - "data":
        - "employee_id":
            - "id": "",
            - "first_name": "",
            - "last_name": "",
            - "citizen_id": "",
            - "email": "",
            - "phone_number": "",
            - "date_of_birth": "",
            - "gender": "",
            - "position": "",
            - "date_of_joining": "",
            - "salary": "",
            - "employment_status": "",
            - "supervisor": "string",
            - "emergency_contact": "",
            - "work_schedule": ""
    
- Example without pagination:
  - HTTP: 
  GET `http://localhost:3000/v1/employee/read`
  - CURL: 
  `curl --location 'http://localhost:3000/v1/employee/read' \
--data ''`

- Example with pagination:
  - HTTP: 
  GET `http://localhost:3000/v1/employee/read?page=1`
  - CURL: 
  `curl --location 'http://localhost:3000/v1/employee/read?page=1' \
--data ''`


### Get Employee(s) by ID

- URL: `/employee/read`
- Method: `GET`
- Description: Retrieves one or many employee by ID.
- Query Params:
  - `ids[]`: Array od IDs of the employee(s).
  - `page`: number (optional)
- Response:
  - Status: `200 OK`
  - Body:
    - "status": "SUCCESS",
    - "data":
        - "employee_id": 
            - "id": "",
            - "first_name": "",
            - "last_name": "",
            - "citizen_id": "",
            - "email": "",
            - "phone_number": "",
            - "date_of_birth": "",
            - "gender": "",
            - "position": "",
            - "date_of_joining": "",
            - "salary": "",
            - "employment_status": "",
            - "supervisor": "string",
            - "emergency_contact": "",
            - "work_schedule": ""
        
- Example:
  - HTTP: 
  GET `http://localhost:3000/v1/employee/read?ids[]=6fca1a66-7c26-4924-9006-68d04eeec9b2`
  - CURL: 
  `curl --location --globoff 'http://localhost:3000/v1/employee/read?ids[]=6fca1a66-7c26-4924-9006-68d04eeec9b2' \
--data ''`


### Find Employee(s) by Parameters

- URL: `/employee/find`
- Method: `POST`
- Description: Retrieves one or many employee by parameters.
- Query Params:
  - `page`: number (optional)
- Request Body:
    | Parameter | Description |
    | -------- | -------- |
    | id   | string   |
    | first_name   | string   |
    | last_name   | string   |
    | citizen_id   | string   |
    | email   | Must be a valid email   |
    | phone_number   | Must be a valid phone number (10 numbers and start with 0)   |
    | date_of_birth   | date_of_joining   |
    | gender   | enum: "MALE", "FEMALE", "OTHER"   |
    | position   | enum: "chef", "sous_chef", "line_cook", "pastry_chef", "waiter", "bartender", "host", "busser", "dishwasher", "restaurant_manager", "barista", "cashier",  "expeditor",  "sommelier" |
    | date_of_joining   | date_of_joining   |
    | salary   | number   |
    | employment_status   | enum: "full_time", "part_time", "contract"   |
    | supervisor   | string   |
    | emergency_contact   | string   |
    | work_schedule   | string   |
- Response:
  - Status: `200 OK`
  - Body:
    - "status": "SUCCESS",
    - "data":
        - "employee_id":
            - "id": "",
            - "first_name": "",
            - "last_name": "",
            - "citizen_id": "",
            - "email": "",
            - "phone_number": "",
            - "date_of_birth": "",
            - "gender": "",
            - "position": "",
            - "date_of_joining": "",
            - "salary": "",
            - "employment_status": "",
            - "supervisor": "string",
            - "emergency_contact": "",
            - "work_schedule": ""

- Example:
  - HTTP: 
  POST `http://localhost:3000/employee/find?page=1`

  body: `{
    "gender": "MALE"
}`

  - CURL:
  `curl --location 'http://localhost:3000/v1/employee/find?page=1' \
--header 'Content-Type: application/json' \
--data '{
    "gender": "MALE"
}'`

### Create Employee

- URL: `/employee/create`
- Method: `POST`
- Description: Creates a new user.
- Request Body: Employee object.
| Parameter | Description | Required |
    | -------- | -------- | -------- |
    | first_name   | string   | yes |
    | last_name   | string   | yes |
    | citizen_id   | string   | yes |
    | email   | Must be a valid email   | no |
    | phone_number   | Must be a valid phone number (10 numbers and start with 0)   | no |
    | date_of_birth   | date_of_joining   | no |
    | gender   | enum: "MALE", "FEMALE", "OTHER"   | no |
    | position   | enum: "chef", "sous_chef", "line_cook", "pastry_chef", "waiter", "bartender", "host", "busser", "dishwasher", "restaurant_manager", "barista", "cashier",  "expeditor",  "sommelier" | no |
    | date_of_joining   | date_of_joining   | no |
    | salary   | number   | no |
    | employment_status   | enum: "full_time", "part_time", "contract"   | no |
    | supervisor   | string   | no |
    | emergency_contact   | string   | no |
    | work_schedule   | string   | no |
- Response:
  - Status: `201 Created`
  - Body: Created user object.

  - Example:
    - HTTP: 
    POST `http://localhost:3000/v1/employee/create`

    body: `{
        "employee": {
            "first_name": "Joe",
            "last_name": "Tom",
            "citizen_id": "123456789",
            "email": "joe.tom@mail.com",
            "phone_number": "0598765432",
            "date_of_birth": "01/01/1901",
            "gender": "OTHER"
        }
    }`

    - CURL:
    `curl --location 'http://localhost:3000/v1/employee/create' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "employee": {
            "first_name": "Joe",
            "last_name": "Tom",
            "citizen_id": "123456789",
            "email": "joe.tom@mail.com",
            "phone_number": "0598765432",
            "date_of_birth": "01/01/1901",
            "gender": "OTHER"
        }
    }'`

### Update Employee(s)

- URL: `/employee/update`
- Method: `PATCH`
- Description: Updates employee(s) by ID.
- Query Params:
  - `ids[]`: Array od IDs of the employee(s).
- Request Body: `{"key": "value"}`.
- Response:
  - Status: `200 OK`
  - Body: 
  `{
    "status": "SUCCESS"
    }`
- Example:
    - HTTP: 
    PATCH `http://localhost:3000/employee/update?ids[]=f90773c7-a90b-4f24-bcf6-e345477e521c5&ids[]=f90773c7-a90b-4f24-bcf6-036477e521c5`

    body: `{
    "email": "other.email@mail.com"
}`

    - CURL:
    `curl --location --globoff --request PATCH 'http://localhost:3000/employee/update?ids[]=f90773c7-a90b-4f24-bcf6-e345477e521c5&ids[]=f90773c7-a90b-4f24-bcf6-036477e521c5' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "other.email@mail.com"
}'`

### Delete Employee(s)

- URL: `/employee/delete`
- Method: `DELETE`
- Description: Deletes employee(s) by ID.
- Query Params:
  - `ids[]`: Array od IDs of the employee(s).
- Response:
  - Status: `200 OK`
  - Body: 
  `{
    "status": "SUCCESS"
    }`
- Example:
    - HTTP: 
    DELETE `http://localhost:3000/employee/delete?ids[]=f90773c7-a90b-4f24-bcf6-e345477e521c5`

    - CURL:
    `curl --location --globoff --request DELETE 'http://localhost:3000/employee/delete?ids[]=f90773c7-a90b-4f24-bcf6-e345477e521c5' \
--data ''`

## Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
