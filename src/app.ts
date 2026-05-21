import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import authRoutes from './routes/auth'
import todosRoutes from './routes/todos'

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo-List-System API',
            version: '1.0.0',
            description: 'API documentation for Todo-List-System',
        },
        servers: [
            {
                url: '/',
                description: 'Current server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: []
        }],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions)

// Hook into Swagger UI to automatically set the Bearer token when a user logs in
const swaggerUiOptions: any = {
    customJsStr: `
      window.addEventListener('load', function() {
        setTimeout(function() {
          const originalFetch = window.fetch;
          window.fetch = async function() {
            const response = await originalFetch.apply(this, arguments);
            const clone = response.clone();
            try {
              const url = arguments[0];
              if (url && url.includes('/login') && response.ok) {
                const data = await clone.json();
                if (data && data.token && window.ui) {
                  window.ui.preauthorizeApiKey('bearerAuth', data.token);
                }
              } else if (url && url.includes('/logout') && response.ok) {
                if (window.ui && window.ui.authActions) {
                  window.ui.authActions.logout(['bearerAuth']);
                }
              }
            } catch(e) {}
            return response;
          };
        }, 1000);
      });
    `
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/todos', todosRoutes)

app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'TodoList API running.'
    })
})

export default app