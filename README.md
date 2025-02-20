# Wallie Wallet

Wallie Wallet is a personal finance application designed to help users manage their finances effectively.

**Web Demo**: https://vimeo.com/1058518949

**Mobile Demo**: https://vimeo.com/1058517468

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Getting Started

First, clone the repository:
```bash
git clone https://github.com/nguyenngocyennga/wallie-wallet.git
cd wallie-wallet
```

Install the dependencies:
```
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Set up the environment variables by creating a .env.local file in the root directory and adding the following:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

DATABASE_URL=your_database_url

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Run the development server:
```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Open http://localhost:3000 with your browser to see the result.

## Features
* User authentication and authorization using Clerk
* Manage accounts, categories, and transactions
* Import transactions from CSV files
* Visualize financial data with charts and graphs
* Responsive design for mobile and desktop

## Technologies Used
* Next.js: A React framework for building server-side rendered applications
* TypeScript: A statically typed superset of JavaScript
* Tailwind CSS: A utility-first CSS framework for rapid UI development
* React Query: A library for fetching, caching, and updating data in React applications
* Zustand: A small, fast, and scalable state management solution
* Drizzle ORM: A lightweight ORM for TypeScript and JavaScript
* Hono: A small, simple, and fast web framework for TypeScript and JavaScript
* Clerk: A user management solution for authentication and authorization
* Sonner: A toast notification library for React

## Project Structure
<details>

  <summary>Click to view full tree!</summary>

    ```

    .
    ├── app/
    │   ├── (auth)/
    │   │   ├── sign-in/
    │   │   │   └── [[...sign-in]]/
    │   │   │       └── page.tsx
    │   │   ├── sign-up/
    │   │   │   └── [[...sign-up]]/
    │   │   │       └── page.tsx
    │   ├── (dashboard)/
    │   │   ├── accounts/
    │   │   │   └── page.tsx
    │   │   ├── categories/
    │   │   │   └── page.tsx
    │   │   ├── transactions/
    │   │   │   └── page.tsx
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── api/
    │   │   ├── [[...route]]/
    │   │   │   └── route.ts
    │   │   ├── accounts.ts
    │   │   ├── categories.ts
    │   │   ├── summary.ts
    │   │   └── transactions.ts
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── ui/
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── form.tsx
    │   │   ├── input.tsx
    │   │   ├── label.tsx
    │   │   ├── select.tsx
    │   │   ├── sheet.tsx
    │   │   ├── skeleton.tsx
    │   │   └── textarea.tsx
    │   ├── account-filter.tsx
    │   ├── actions.tsx
    │   ├── amount-input.tsx
    │   ├── badge.tsx
    │   ├── bar-variant.tsx
    │   ├── calendar.tsx
    │   ├── category-column.tsx
    │   ├── category-tooltip.tsx
    │   ├── chart.tsx
    │   ├── custom-tooltip.tsx
    │   ├── data-card.tsx
    │   ├── data-charts.tsx
    │   ├── data-grid.tsx
    │   ├── data-table.tsx
    │   ├── date-filter.tsx
    │   ├── date-picker.tsx
    │   ├── dialog.tsx
    │   ├── dropdown-menu.tsx
    │   ├── filters.tsx
    │   ├── header-logo.tsx
    │   ├── header.tsx
    │   ├── import-card.tsx
    │   ├── import-table.tsx
    │   ├── line-variant.tsx
    │   ├── navigation.tsx
    │   ├── pie-variant.tsx
    │   ├── radar-variant.tsx
    │   ├── radial-variant.tsx
    │   ├── select.tsx
    │   ├── separator.tsx
    │   ├── spending-pie.tsx
    │   ├── table-head-select.tsx
    │   ├── table.tsx
    │   ├── tooltip.tsx
    │   ├── upload-button.tsx
    │   └── welcome-msg.tsx
    ├── db/
    │   ├── drizzle.config.ts
    │   ├── schema.ts
    │   └── seed.ts
    ├── drizzle/
    │   ├── 0000_aromatic_boomerang.sql
    │   ├── 0001_peaceful_namorita.sql
    │   ├── 0002_material_ulik.sql
    │   ├── 0003_black_stryfe.sql
    │   ├── 0003_snapshot.json
    │   ├── 0002_snapshot.json
    │   ├── 0001_snapshot.json
    │   ├── 0000_snapshot.json
    │   └── _journal.json
    ├── hooks/
    │   ├── use-bulk-create-transactions.ts
    │   ├── use-bulk-delete-accounts.ts
    │   ├── use-bulk-delete-categories.ts
    │   ├── use-bulk-delete-transactions.ts
    │   ├── use-confirm.tsx
    │   ├── use-create-account.ts
    │   ├── use-create-category.ts
    │   ├── use-create-transaction.ts
    │   ├── use-delete-account.ts
    │   ├── use-delete-category.ts
    │   ├── use-delete-transaction.ts
    │   ├── use-edit-account.ts
    │   ├── use-edit-category.ts
    │   ├── use-edit-transaction.ts
    │   ├── use-get-account.ts
    │   ├── use-get-accounts.ts
    │   ├── use-get-categories.ts
    │   ├── use-get-category.ts
    │   ├── use-get-summary.ts
    │   ├── use-get-transaction.ts
    │   ├── use-get-transactions.ts
    │   ├── use-new-account.ts
    │   ├── use-new-category.ts
    │   ├── use-new-transaction.ts
    │   ├── use-open-accounts.ts
    │   ├── use-open-categories.ts
    │   ├── use-open-transaction.ts
    │   └── use-select-account.tsx
    ├── lib/
    │   ├── hono.ts
    │   ├── utils.ts
    │   └── drizzle.ts
    ├── middleware.ts
    ├── next.config.ts
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.mjs
    ├── public/
    │   ├── logo.svg
    │   └── favicon.ico
    ├── README.md
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── .gitignore

    ```

</details>

## Scripts
* `dev`: Run the development server
* `build`: Build the application for production
* `start`: Start the production server
* `lint`: Run ESLint to check for linting errors
* `db:generate`: Generate database schema using Drizzle
* `db:migrate`: Run database migrations
* `db:seed`: Seed the database with initial data
* `db:studio`: Open Drizzle Studio for database management

## Environment Variables
The following environment variables are required to run the application:

* `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key for client-side authentication
* `CLERK_PUBLISHABLE_KEY`: Clerk publishable key for server-side authentication
* `CLERK_SECRET_KEY`: Clerk secret key for server-side authentication
* `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: URL for the sign-in page
* `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: URL for the sign-up page
* `DATABASE_URL`: URL for the PostgreSQL database
* `NEXT_PUBLIC_APP_URL`: URL for the application
