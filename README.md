# Screaming Architecture Boilerplate

A modern, scalable React + TypeScript boilerplate using Vite, with a focus on maintainable architecture and developer experience.

## Features

- ⚡️ Vite for lightning-fast builds and hot module replacement
- 🏗️ TypeScript for type safety and improved developer experience
- ⚛️ React for building user interfaces
- 📁 Screaming Architecture for clear, scalable project structure
- 🎨 Material-UI for pre-built, customizable components
- 🛣️ Path aliases for clean import statements
- 🧹 ESLint and Prettier for code quality and consistency
- 🌓 Dark mode support
- 📱 Responsive design

## Project Structure

```
src/
├── assets/
├── features/
│   ├── todos/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   └── _shared/
│       ├── components/
│       │   ├── Button.tsx
│       │   ├── Footer.tsx
│       │   ├── Header.tsx
│       │   ├── Input.tsx
│       │   ├── Nav.tsx
│       │   └── Table.tsx
│       └── theme/
│           └── index.ts
└── pages/
    ├── App.tsx
    └── home/
        ├── index.tsx
        └── LandingPage.tsx
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/screaming-architecture-boilerplate.git
   cd screaming-architecture-boilerplate
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `pnpm dev`: Start the development server
- `pnpm build`: Build the project for production
- `pnpm lint`: Run ESLint
- `pnpm preview`: Preview the production build locally

## Path Aliases

This boilerplate uses path aliases for cleaner import statements. The following aliases are available:

- `@/*`: `src/*`
- `@features/*`: `src/features/*`
- `@shared/*`: `src/features/_shared/*`

## Customization

### Styling

This boilerplate uses Material-UI for styling. You can customize the theme in `@shared/theme/index.ts`.

### Adding New Features

1. Create a new folder in `src/features/`
2. Add components, hooks, services, and utils as needed
3. Import and use your new feature in the relevant pages or components

## Best Practices

- Keep components small and focused
- Use custom hooks for reusable logic
- Implement lazy loading for better performance
- Write unit tests for critical functionality
- Use TypeScript's type system to its full potential
- Always use aliased imports for better maintainability

## Dark Mode

The application supports dark mode, which can be toggled using the switch in the header. The theme is persisted across page reloads.

## Responsive Design

The application is designed to be responsive, with different layouts for mobile and desktop views. This is achieved using Material-UI's `useMediaQuery` hook and responsive styling.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://material-ui.com/)
- [date-fns](https://date-fns.org/)

## Support

If you have any questions or need help, please open an issue or contact the maintainers.

Happy coding! 🚀
