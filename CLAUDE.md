# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is @wgr-sa/nuxt-form, a comprehensive form building module for Nuxt 3 applications. It provides form components, validation, data handling, recaptcha integration, and dynamic form generation capabilities.

## Development Commands

### Core Development
- `npm run dev:prepare` - Generate type stubs and prepare development environment (run this first)
- `npm run dev` - Start playground development server
- `npm run dev:build` - Build playground for testing

### Testing and Quality
- `npm run test` - Run all tests with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint on codebase

### Documentation
- `npm run docs:dev` - Start VitePress documentation server
- `npm run docs:build` - Build documentation
- `npm run docs:preview` - Preview built documentation

### Release Process
- `npm run release` - Full release pipeline (lint, test, build, changelog, publish, push tags)
- `npm run prepack` - Build module distribution files

## Architecture Overview

### Module Structure
The codebase follows Nuxt module conventions with these key areas:

**Core Module (`src/module.ts`)**
- Registers all components globally and auto-imports composables
- Configures CSS assets and transpilation
- Sets up runtime configuration

**Runtime Components (`src/runtime/components/`)**
- `FormBuilder.vue` - Main form container component
- `FormGenerator.vue` - Dynamic form generation from configuration
- Input components: `FormInput`, `FormSelect`, `FormRadio`, `FormTextarea`, `FormFile`, `FormSuggest`
- `FormSubmit.vue` - Form submission handling
- `FormAlert.vue` - Form error/success messaging

**Core Composables (`src/runtime/composables/`)**
- `useFormBuilder()` - Main form initialization and validation orchestration
- `useFormValidator()` - Field validation handling
- `useFormRecaptcha()` - Recaptcha integration

**Data Layer (`src/runtime/utils/`)**
- `Form` class - Central form state management
- `FormDataHandler` - Form data manipulation and processing
- `FormValidator` - Validation rule management
- `FormMessageStore` - Internationalized message handling
- Model layers for TypeORM and class-validator integration

### Key Dependencies
- **class-validator** - Validation decorators and rules
- **maska** - Input masking capabilities
- **typeorm** - Database model integration (optional)

### Configuration
Module accepts these options in `nuxt.config.ts`:
```typescript
form: {
  format_layers: [],        // Custom formatting layers
  actions: undefined,       // Custom form actions
  recaptcha: true,         // Enable recaptcha
  hide_recaptcha: false,   // Hide recaptcha badge
  mask: true,              // Enable input masking
  default_styles: true,    // Include default CSS
  messages: {},            // Custom messages
  lang: 'fr'              // Default language
}
```

### Form Flow
1. Initialize form with `useFormBuilder().initForm(config)`
2. Add fields via `form.addField(config)` or use `FormGenerator`
3. Validate with `validateForm(form)` which runs field validation + recaptcha
4. Submit via `form.submit()` using configured submitter

### Playground Testing
The `playground/` directory contains a working Nuxt app for testing the module. It includes:
- Example entities in `entities/User.ts`
- Test configuration in `nuxt.config.ts`
- Sample implementations in `app.vue`

### TypeScript Configuration
- Uses experimental decorators for class-validator integration
- Extends playground's generated tsconfig for proper type resolution
- Strict mode enabled in playground for comprehensive type checking

## Development Notes

- Always run `npm run dev:prepare` before starting development
- The module auto-registers all components globally
- Validation messages support English and French by default
- CSS can be disabled via configuration for custom styling
- Recaptcha integration is configurable and can be hidden or disabled