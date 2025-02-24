# MixMatch

## MixMatch is a Next.js application that uses NextAuth for authentication.

Getting Started

## Prerequisites

- Node.js (Latest LTS recommended)

- npm

## Installation

- Clone the repository: git clone https://github.com/mixmatch/mixmatch.git

- cd mixmatch

- Install dependencies:

npm install

## Environment Variables

Create a .env.local file in the root directory and add the following:

NEXTAUTH_SECRET=ahdkjkasdljasndmasdsajdasdljkdsadaslk
NEXTAUTH_URL=http://localhost:3000

## Running the Application

To start the development server, run:

- npm run dev

The app will be available at http://localhost:3000.

## Authentication

- Login with one of the following credentials:

User: user@test.com (Free subscription plan)

Pro User: pro@test.com (Pro subscription plan)

Master User: master@test.com (Master subscription plan)

Admin: admin@test.com

You can see the details in the [auth.config.ts file](./app/api/auth/[...nextauth]/auth.config.ts)
password: password


Once logged in, navigate to the desired page.
