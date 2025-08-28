# OmniSync_Incorporated_Assessment





# Requirements

# Fullstack Web Developer Assessment

## Frontend Requirements

Display eight cards, numbered 1 through 8, laid out in a 2x4 grid.

Each card should:

- Show its number, centered.
- Display the total number of clicks it has received.
- Display the timestamp of its first click.

Clicking a card should:

- Only register the first click for order tracking.
- Always increment its click counter.
- Save all click data to the PostgreSQL database.

Implement sorting options for the cards:

- Most clicks → Fewest clicks
- First clicked → Last clicked

Include a **Clear** button that:

- Resets card order to original (1 → 8).
- Resets all click counts and timestamps.
- Reflects these changes both in the UI and the database.

The layout should be responsive for mobile.

---

## Backend + Database Requirements

Use PostgreSQL to store:

- Click count for each card.
- First click timestamp.

On page load, read from the database to:

- Determine the card order (based on first click timestamp).
- Display click count and first-click timestamp.

Provide necessary API routes to:

- Read, write, and update click data.
- Reset the database state when the Clear button is pressed.

---

## Dockerization

Include a `Dockerfile` and `docker-compose.yml` file that:

- Spins up both the frontend and backend services.
- Starts a local PostgreSQL instance with a seeded schema/table for the card data.

Make sure the app can be launched with a single `docker-compose up` command.

---

## Tech Stack

You are expected to use the following stack:

- **Frontend**: React + TypeScript
- **Backend**: Node.js with Express (or any similar framework) _or_ Next.js for fullstack  
  _(whichever you choose, use TypeScript here as well)_
- **Database**: PostgreSQL
- **Styling**: Your choice (CSS Modules, Tailwind, MUI, etc.)
- **Deployment**: Docker

---

## Evaluation Criteria

We will evaluate your submission based on:

- Code organization and clarity
- Use of TypeScript types
- Database integration and API design
- UI functionality (click tracking, sorting, resetting)
- Docker setup and ease of running the app locally
- Git usage (atomic commits, meaningful messages)
- Documentation quality

---

## Submission Instructions

1. Create a **public GitHub repository** with your completed project.
2. Include a `README.md` file that contains:
   - Instructions for running the project locally.
   - Brief notes on which parts of the task were:
     - Familiar/easy
     - New or challenging
   - Any design or implementation decisions you think need clarification.
3. Make sure your Git history shows your development process  
   _(i.e., don’t just upload a zip file)_.
4. Share the GitHub repository link with us.

---

## Bonus Ideas (Optional)

If you complete the core task early and want to go further:

- Add a **dark mode** toggle.
- Add **animations** when cards are clicked or reordered.