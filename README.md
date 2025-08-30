# OmniSync Incorporated - Fullstack Web Developer Assessment

## Overview

This is a fullstack web application displaying eight cards in a 2x4 responsive grid. Each card tracks its own individual click count and first-click timestamp. The cards can be sorted and reset, and all data persists in a PostgreSQL database. The app is fully Dockerized for easy local deployment.

## Features

**Cards**: 

Shows centered card number, increments and tracks click count, and records the first click timestamp. Data persists to the database.

**Sorting**:

Most clicks → Fewest clicks

First clicked → Last clicked

**Clear Button**: 

Resets card order, click counts, and timestamps in the database.

**Enhancements (Beyond MVP)**: 

Light/Dark mode toggle and card animations on click/reorder using Framer Motion implemented.

## Tech Stack

**Frontend:** 

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

**Backend:** 

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

**Database:** 

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

**Styling:** 

![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

**Deployment:** 

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## How to Run
1. Clone this repository
```bash
git clone https://github.com/jameschenn/OmniSync_Incorporated_Assessment.git
```
2. Navigate to the project root (if not already in it):
```bash
cd OmniSync_Incorporated_Assessment
```
3. Build and start the app using Docker
```bash
docker-compose up --build
```
Frontend runs on port **5173**

Backend API runs on port **5050**

PostgreSQL runs on port **5432**

4. Access project at
```bash
http://localhost:5173/
```

5. Stop the project **(when finished)**
```bash
docker-compose down
```

## Development Notes

### Familiar / Easy
- Building and organizing React components for proper data flow and reusability.  
- Building out RESTful APIs in Express performing CRUD operations.   
- Designing the PostgreSQL schema for simple, efficient storage of clicks and timestamps.

### New / Challenging
- Gained hands-on experience with Docker by containerizing the frontend, backend, and database into a smooth single-command deployment using docker-compose.
- Writing raw SQL scripts for seeding and migrations instead of relying on an ORM like Sequelize.
- Using CSS Grid for layout instead of my usual Flexbox approach  


### Design & Implementation Decisions
- Kept the stack lightweight and easy to maintain due to simplicity of project outline. 
- Stored clicks directly in the database to keep data consistent for all users while choosing only to sort cards on the frontend.  
- Chose a consistent timestamp format for accurate tracking and comparison, and then formatted for user readability on the UI.”
- Added subtle animations with Framer Motion for users to easily visualize responsive sorting.  

## API Routes

| Method | Endpoint            | Description                                              |
|--------|-------------------|----------------------------------------------------------|
| GET    | `/cards`           | Fetch all cards. |
| POST   | `/cards/:id/click` | Increment the click count for specific card. Saves "firstClick" timestamp only on the first click. |
| POST   | `/cards/clear`     | Reset all cards. |


## Database Schema

**Table:** `Cards`

| Column      | Type       | Description                                  |
|------------|-----------|----------------------------------------------|
| `id`       | SERIAL    | Primary key, card number (1–8).            |
| `clicks`   | INT       | Number of times the card has been clicked. |
| `firstClick` | TIMESTAMP | Timestamp of the first click. NULL if never clicked. |
