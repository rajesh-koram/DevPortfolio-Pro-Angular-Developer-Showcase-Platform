# DevPortfolio Pro – Angular Developer Showcase Platform

A full-stack developer portfolio built with Angular 21 on the frontend and a new MEAN-style backend using Node.js, Express, and MongoDB.

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

Copy [../server/.env.example](../server/.env.example) to `server/.env` and update values:
- `PORT`
- `MONGODB_URI`
- `CLIENT_ORIGIN`

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

## Notes

- MongoDB must be running before the backend starts
- The contact form stores data in MongoDB through `/api/contact`
- Project cards can now be migrated from frontend mock data to `/api/projects` next
- The current structure is ready for auth, admin dashboard APIs, and CMS-style content management
