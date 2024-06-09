# Next.js Application with shadcn, Tailwind CSS, and SWR

## Description

This is a Next.js application that integrates `shadcn` for component design, Tailwind CSS for styling, and SWR for data fetching. It connects to a backend API with the base URL specified in environment variables. The project uses `pnpm` as the package manager.

## Features

- **Next.js**: Framework for building server-rendered React applications.
- **shadcn**: A component library for consistent UI design.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **SWR**: React hooks library for data fetching.
- **pnpm**: Fast, disk space efficient package manager.

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 14.x)
- pnpm (>= 6.x)

### Steps

1. Clone the repository:

```sh
git clone https://github.com/Krish-Parekh/library-management-client.git
cd library-management-client
```

2. Install the dependencies:

```sh
pnpm install
```

3. Set up environment variables:

Create a `.env` file in the root directory of your project and add the following environment variable:
DEV_URL=http://localhost:5000/api/v1
PROD_URL=https://18.212.99.121/api/v1

```env
NEXT_PUBLIC_BASE_URL=
```

### Running the Development Server

To run the development server:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the project for production:

```sh
pnpm build
```

To start the production server:

```sh
pnpm start
```

### Linting and Formatting

To run the linter:

```sh
pnpm lint
```

To format the code:

```sh
pnpm format
```

## Project Structure

```
/project-root
  ├── components/
  │   ├── Button.js
  │   ├── Navbar.js
  │   └── ...
  ├── app/
  │   ├── api/
  │   ├── (auth)
  │   │   ├── login
  │   │   │   ├── page.tsx
  │   │   ├── signup
  │   │   │   ├── page.tsx
  │   ├── (dashboard)
  │   │   ├── admin
  │   │   │   ├── page.tsx
  │   │   ├── page.tsx
  │   └── ...
  ├── public/
  │   ├── favicon.ico
  │   └── ...
  ├── .env.local
  ├── next.config.js
  ├── postcss.config.js
  ├── tailwind.config.js
  ├── package.json
  ├── pnpm-lock.yaml
  └── README.md
```

## Usage

### Components

Custom components can be found in the `components` directory. Examples include `Button`, `Navbar`, etc.

### Pages

Next.js automatically creates routes based on the files in the `app` directory. For example:

- `app/(dashboard)/page.ts` - Home page

### Styles

Global styles are defined in `app/globals.css`.

## Deployment

To deploy the application, you can use platforms like Vercel, Netlify, or any other cloud provider that supports Node.js applications.

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License.

---

This README file provides an overview of the Next.js application with instructions for installation, usage, and deployment. If you have any questions or need further assistance, feel free to open an issue on the repository.