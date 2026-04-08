# DevPortfolio Pro – Angular Developer Showcase Platform

A full-stack developer portfolio built with Angular 21 on the frontend and a new MEAN-style backend using Node.js, Express, and MongoDB.

The production deployment path is now:
- build the Angular client
- build the Node server
- start the server in production mode
- let Express serve the compiled Angular app and the `/api/*` routes from the same deployment

## Stack

### Frontend
- Angular 21
- Standalone components
- TypeScript
- SCSS
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript
- Zod validation

## Project structure

```text
client/
  src/app/
    core/
      data/
      layout/
      services/
    features/
      home/
        components/
        pages/
    shared/
      models/
      ui/

server/
  src/
    config/
    middleware/
    modules/
      contact/
      health/
      project/
    scripts/
    utils/
```

## Backend features added

- `GET /api/health` for server and database health
- `GET /api/projects` for Mongo-backed project data
- `POST /api/contact` to store submitted project briefs in MongoDB
- Contact submissions can also notify the admin by SMTP email
- Seed script for projects collection
- Environment-based config for Mongo connection and client origin

## Frontend integration added

- Contact form now submits to the backend API instead of opening an email client
- Angular `HttpClient` configured
- Dev proxy added so `/api/*` calls work during local Angular development

## Local setup

### 1. Frontend install

From the `client` folder:
- `npm install`

### 2. Backend install

From the `server` folder:
- `npm install`

### 3. Configure environment

Create `server/.env.dev` for local development and update these values:
- `PORT`
- `MONGODB_URI`
- `CLIENT_ORIGIN`
- `ADMIN_EMAIL`
- `MAIL_FROM`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

Create `server/.env.prod` for deployment and update these values:
- `PORT`
- `MONGODB_URI` or `MONGODB_URL`
- `CLIENT_ORIGIN`
- `ADMIN_EMAIL`
- `MAIL_FROM`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

Optional:
- `CLIENT_DIST_PATH` if your built Angular files are not at the default `client/dist/devportfolio-pro/browser` location. This path is resolved relative to `server/`.

The server uses only one env file at a time:
- `server/.env.dev` when `NODE_ENV` is not set to `production`
- `server/.env.prod` when `NODE_ENV=production`

Deployment environment variables provided by your host override values in that file.

Example Mongo local connection:
- `mongodb://127.0.0.1:27017/devportfolio-pro`

### 4. Seed project data

- From `client`: `npm run server:seed`
- Or from `server`: `npm run seed`

### 5. Start backend

- From `client`: `npm run server:dev`
- Or from `server`: `npm run dev`

### 6. Start frontend

From the `client` folder in another terminal:
- `npm start`

Frontend runs on:
- `http://localhost:4200`

Backend runs on:
- `http://localhost:3000`

## Available scripts

### Client
- `npm start` — start Angular dev server
- `npm run build` — build Angular app
- `npm run server:dev` — start backend in watch mode from the sibling `server` folder
- `npm run server:build` — compile backend TypeScript from the sibling `server` folder
- `npm run server:start` — run compiled backend from the sibling `server` folder
- `npm run server:seed` — seed MongoDB projects from the sibling `server` folder

### Server
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run seed`

### Workspace root
- `npm run install:all` — install both frontend and backend dependencies
- `npm run build` — build the Angular client and Node server for deployment
- `npm start` — start the compiled server from the workspace root
- `npm run dev:client` — start the Angular dev server from the workspace root
- `npm run dev:server` — start the backend watcher from the workspace root

## Production deployment

Client deployment on Netlify:
- Netlify uses [client/netlify.toml](client/netlify.toml)
- the frontend build runs from the `client` folder only
- production API calls use `src/environments/environment.production.ts`

Server deployment on a Node host:
- use [server/render.yaml](server/render.yaml) as the backend deployment manifest
- set server secrets in the hosting dashboard, not in the repo
- set `NODE_ENV=production`
- the server starts from the `server` folder only

Deployment result:
- Express serves the compiled Angular app from `client/dist/devportfolio-pro/browser`
- API endpoints remain available under `/api/*`
- frontend calls such as `/api/contact` work without a separate frontend host or proxy in production

For separate deployments:
- development client API base URL is `/api`
- production client API base URL must point to your deployed backend, for example `https://your-backend-service.onrender.com/api`

## Notes

- MongoDB must be running before the backend starts
- The contact form stores data in MongoDB through `/api/contact`
- To notify the admin on submit, configure SMTP values in the active server env file
- Project cards can now be migrated from frontend mock data to `/api/projects` next
- The current structure is ready for auth, admin dashboard APIs, and CMS-style content management
