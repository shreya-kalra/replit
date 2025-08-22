# FoodieApp

## Overview

FoodieApp is a full-stack web application designed for food enthusiasts to manage their profiles, addresses, payment methods, and dietary preferences. The application features a mobile-first design with comprehensive user management capabilities, built as a modern React single-page application with Express.js backend.

The system provides authenticated users with the ability to:
- Manage personal profiles including dietary preferences and allergies
- Store and organize multiple delivery addresses
- Handle payment methods and financial information
- Configure personalized application settings
- Access location-based services for address management

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using React 18 with TypeScript, following a component-based architecture:

- **Framework**: React with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing with conditional authentication-based navigation
- **State Management**: TanStack Query (React Query) for server state management, caching, and data synchronization
- **UI Framework**: Radix UI primitives with shadcn/ui components for consistent, accessible design system
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Mobile-First Design**: Optimized for mobile devices with responsive breakpoints and touch-friendly interactions

### Backend Architecture
The server-side follows a RESTful API design pattern built on Express.js:

- **Runtime**: Node.js with ESModules for modern JavaScript support
- **Framework**: Express.js with middleware-based request processing
- **Authentication**: Replit OpenID Connect (OIDC) integration with session-based authentication
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple for persistence
- **API Design**: RESTful endpoints with consistent error handling and response formatting
- **Request Processing**: Structured middleware pipeline for authentication, logging, and error handling

### Data Storage Solutions
The application uses a PostgreSQL database with Drizzle ORM for type-safe database interactions:

- **Database**: PostgreSQL with Neon serverless hosting for scalability
- **ORM**: Drizzle ORM providing type-safe queries and schema management
- **Connection Pool**: Neon serverless connection pooling for efficient resource usage
- **Migration System**: Drizzle Kit for database schema versioning and migrations

### Database Schema Design
The schema includes four primary entities:
- **Users**: Core user information with profile data, dietary preferences, and allergies
- **Addresses**: Multiple address storage with type categorization and default selection
- **Payment Methods**: Encrypted payment information with provider-specific handling
- **User Settings**: Personalized application preferences and notification settings
- **Sessions**: Authentication session persistence for secure user state management

### Authentication and Authorization
The application implements a comprehensive authentication system:

- **Provider**: Replit OIDC for seamless integration within the Replit ecosystem
- **Session Management**: Server-side sessions stored in PostgreSQL for security
- **Route Protection**: Middleware-based authentication checks for protected endpoints
- **User Context**: React hooks for client-side authentication state management
- **Security**: CSRF protection through SameSite cookies and secure session handling

### Development and Build System
The project uses modern development tooling for efficient development and deployment:

- **Build Tool**: Vite for fast development server and optimized production builds
- **Module System**: ESModules throughout the entire application stack
- **TypeScript**: Comprehensive type coverage with shared types between client and server
- **Development Server**: Hot module replacement and error overlays for rapid development
- **Production Build**: Optimized bundling with code splitting and asset optimization

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection and query execution
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect support
- **@tanstack/react-query**: Server state management and data synchronization
- **wouter**: Lightweight React router for client-side navigation

### Authentication Services
- **openid-client**: OpenID Connect client implementation for Replit authentication
- **passport**: Authentication middleware with OIDC strategy support
- **express-session**: Session management with PostgreSQL storage backend
- **connect-pg-simple**: PostgreSQL session store for persistent authentication

### UI and Design System
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for responsive design
- **class-variance-authority**: Component variant management for consistent styling
- **lucide-react**: Consistent icon system with React components

### Development Tools
- **vite**: Modern build tool with fast development server and HMR
- **tsx**: TypeScript execution for Node.js development server
- **drizzle-kit**: Database schema management and migration tooling
- **@replit/vite-plugin-runtime-error-modal**: Development error handling integration

### Production Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Replit Authentication**: OIDC-based authentication service integration
- **Express.js Server**: Production-ready HTTP server with middleware support