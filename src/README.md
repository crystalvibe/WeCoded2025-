# Project Structure

```src/
├── app/                    # App-wide setup and configuration
│   ├── providers/         # Context providers
│   ├── routes/           # Route definitions
│   └── config/           # App configuration
├── assets/               # Static assets (images, fonts, etc.)
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components
│   ├── features/        # Feature-specific components
│   │   ├── articles/    # Article-related components
│   │   ├── stories/     # Story-related components
│   │   └── community/   # Community-related components
│   └── animations/      # Animation components
├── hooks/               # Custom React hooks
├── lib/                # Utilities and helpers
│   ├── api/           # API-related functions
│   └── utils/         # Utility functions
├── pages/             # Page components
├── styles/            # Global styles and theme
│   ├── base/         # Base styles
│   ├── components/   # Component-specific styles
│   └── theme/        # Theme configuration
└── types/            # TypeScript type definitions
```

## Directory Structure Explanation

- `app/`: Contains app-wide setup and configuration
  - `providers/`: React context providers
  - `routes/`: Route definitions and configuration
  - `config/`: App-wide configuration files

- `assets/`: Static files like images, fonts, etc.

- `components/`: React components organized by purpose
  - `ui/`: Reusable UI components (buttons, inputs, etc.)
  - `layout/`: Layout components (header, footer, etc.)
  - `features/`: Feature-specific components organized by domain
  - `animations/`: Animation-related components

- `hooks/`: Custom React hooks

- `lib/`: Utilities and helpers
  - `api/`: API-related functions and services
  - `utils/`: General utility functions

- `pages/`: Page components that correspond to routes

- `styles/`: Styling-related files
  - `base/`: Base styles and CSS reset
  - `components/`: Component-specific styles
  - `theme/`: Theme configuration

- `types/`: TypeScript type definitions

## Best Practices

1. Keep components focused and single-responsibility
2. Use feature-based organization for domain-specific components
3. Maintain clear separation between UI components and business logic
4. Keep pages lightweight, move complex logic to components
5. Use relative imports with aliases (@/ prefix) 