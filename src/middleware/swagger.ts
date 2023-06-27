import swaggerJsdoc from 'swagger-jsdoc'

/**
 * Swagger specification options for generating API documentation.
 */
const options = {
    definition: {
        openapi: '3.1.0', // Specify the OpenAPI version
        info: {
            title: 'LogRocket Express API with Swagger',
            version: '0.1.0',
            description:
          'This is a simple CRUD API application made with Express and documented with Swagger',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'LogRocket',
                url: 'https://logrocket.com',
                email: 'info@email.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000', // Base URL of the API
            },
        ],
    },
    apis: ['./routes/*.js'], // Array of paths or file globs to the API route files
}

/**
 * Swagger specification generated using the specified options.
 */
const specs = swaggerJsdoc(options)

export default specs
