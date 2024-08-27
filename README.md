# React Screaming Architecture Boilerplate

A modern, scalable React + TypeScript boilerplate using Vite, with a focus on maintainable architecture and developer experience.

## View the Deployed Application

You can view the deployed application at the following URL:

[https://itz4blitz.github.io/react-screaming-architecture-boilerplate/](https://itz4blitz.github.io/react-screaming-architecture-boilerplate/)

## Join the Community

Join our Discord server to discuss the project, ask questions, and get help:

[https://discord.gg/8nVCV2M44U](https://discord.gg/8nVCV2M44U)

## Features

- ⚡️ Vite for lightning-fast builds and hot module replacement
- 🏗️ TypeScript for type safety and improved developer experience
- ⚛️ React for building user interfaces
- 📁 Screaming Architecture for clear, scalable project structure
- 🎨 Material-UI for pre-built, customizable components
- 🛣️ Absolute imports for clean import statements
- 🧹 ESLint and Prettier for code quality and consistency
- 🌓 Dark mode support
- 📱 Responsive design
- 🎭 Framer Motion for smooth animations

## Project Structure

```
src/
├── assets/
├── features/
│   ├── todos/
│   │   ├── components/
│   │   │   ├── TodoItem.tsx
│   │   │   └── TodoList.tsx
│   │   ├── hooks/
│   │   │   └── useTodos.ts
│   │   ├── services/
│   │   │   └── todoService.ts
│   │   └── utils/
│   └── _shared/
│       ├── components/
│       │   ├── Button.tsx
│       │   ├── Footer.tsx
│       │   ├── Header.tsx
│       │   ├── Input.tsx
│       │   ├── Nav.tsx
│       │   ├── Box.tsx
│       │   ├── Checkbox.tsx
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
   git clone https://github.com/itz4blitz/react-screaming-architecture-boilerplate.git
   cd react-screaming-architecture-boilerplate
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   If you don't have `pnpm` installed, you can install it via npm:

   ```bash
   npm install -g pnpm
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

   Alternatively, you can use npm or yarn:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `pnpm dev`: Start the development server
- `pnpm build`: Build the project for production
- `pnpm lint`: Run ESLint
- `pnpm format`: Run Prettier to format the code
- `pnpm preview`: Preview the production build locally
- `pnpm deploy`: Deploy the project to GitHub Pages

## Absolute Imports

This boilerplate uses absolute imports for cleaner import statements. The following structure is used:

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
- Always use absolute imports for better maintainability

## Dark Mode

The application supports dark mode, which can be toggled using the switch in the header. The theme is persisted across page reloads using the `useLocalStorage` hook.

## Responsive Design

The application is designed to be responsive, with different layouts for mobile and desktop views. This is achieved using Material-UI's `useMediaQuery` hook and responsive styling.

## Todo App Feature

The boilerplate includes a sample Todo App feature, showcasing the recommended structure and best practices for building features in a screaming architecture.

### Components

- `TodoItem`: Represents a single todo item, with options to toggle completion, edit, and delete.
- `TodoList`: Displays a list of todo items, with options to select multiple items and delete them in bulk.

### Hooks

- `useTodos`: A custom hook that manages the state and logic for the Todo App feature, including fetching, adding, editing, and deleting todos.

### Animations

The Todo App feature uses Framer Motion to add smooth animations when adding, editing, and deleting todo items, enhancing the user experience.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://material-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [date-fns](https://date-fns.org/)

## Support

If you have any questions or need help, please open an issue or contact the maintainers.

Happy coding! 🚀
