# Storybook Setup for xUSD Staking

This project includes a complete Storybook setup for component development and testing. Our Storybook showcases the design system including custom themes, typography, and interactive components.

## Overview

The Storybook setup includes:
- **5 Custom Themes**: Pink, Terracotta, Grey, Granite, and Obsidian
- **Custom Typography**: Playfair Display (headings) and Montserrat (body)
- **Interactive Components**: Theme switcher, themed text, and themed views
- **Component Library**: All reusable UI components with different states

## Running Storybook

### Option 1: Environment Variable Method (Recommended)

1. **Start Storybook on Android:**
   ```bash
   npm run storybook:android
   ```

2. **Start Storybook on iOS:**
   ```bash
   npm run storybook:ios
   ```

### Option 2: Manual Switch Method

1. **Update index.js** to enable Storybook:
   ```javascript
   const enableStorybook = true; // Set to true
   ```

2. **Run the app normally:**
   ```bash
   npm run android
   # or
   npm run ios
   ```

3. **Don't forget to switch back** to the main app when done:
   ```javascript
   const enableStorybook = false; // Set to false
   ```

## Available Stories

### Individual Component Stories

- **`ThemeButton.stories.tsx`** - Interactive theme switcher
  - Default (full theme picker)
  - Compact (small color circles)
  - With custom styling

- **`ThemedText.stories.tsx`** - Typography showcase
  - Body text (Montserrat)
  - Headings (Playfair Display)
  - Error and success states
  - Different font weights

- **`ThemedView.stories.tsx`** - Themed containers
  - Background variations
  - Card examples
  - Shadow and elevation styles

### Comprehensive Showcase

- **`ThemeShowcase.stories.tsx`** - Complete app preview
  - All components in context
  - Real app-like interface
  - Interactive theme switching
  - Typography hierarchy

## Component Structure

```
src/components/
├── ThemeButton.tsx          # Interactive theme switcher
├── ThemeContext.tsx         # Theme state management
├── ThemedText.tsx           # Typography component
├── ThemedView.tsx           # Themed container
├── FontLoadingWrapper.tsx   # Font loading handler
├── index.ts                 # Component exports
└── *.stories.tsx            # Storybook stories
```

## Custom Themes

The app includes 5 carefully crafted themes:

1. **Pink** - Soft, feminine palette
2. **Terracotta** - Warm, earthy tones
3. **Grey** - Modern, professional
4. **Granite** - Bold, sophisticated
5. **Obsidian** - Dark, premium feel

Each theme includes:
- Background colors (light, dark, base)
- Text colors (header, body, error, success)
- Consistent color hierarchy

## Typography System

### Fonts
- **Playfair Display** - Serif font for headings
- **Montserrat** - Sans-serif font for body text

### Weights Available
- Regular (400)
- Medium (500)
- SemiBold (600)
- Bold (700)
- Black (900)

## Usage Examples

### Basic Themed Text
```tsx
<ThemedText 
  fontType="heading" 
  fontWeight="bold" 
  colorType="headerText"
>
  My Heading
</ThemedText>
```

### Themed Container
```tsx
<ThemedView colorType="backgroundLight" style={{ padding: 20 }}>
  <ThemedText colorType="bodyText">Content here</ThemedText>
</ThemedView>
```

### Theme Switcher
```tsx
<ThemeButton compact={false} />
```

## Development Workflow

1. **Design new components** in Storybook first
2. **Test different states** and themes
3. **Document component variations** with stories
4. **Export components** through `src/components/index.ts`
5. **Import into main app** when ready

## Benefits

- **Visual Development**: See components in isolation
- **Theme Testing**: Quickly test all 5 themes
- **Documentation**: Living documentation of components
- **Consistency**: Ensure design system compliance
- **Mobile-First**: Optimized for React Native development

## Adding New Stories

1. **Create a new `.stories.tsx` file** in `src/components/`
2. **Follow the existing pattern**:
   ```tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { YourComponent } from './YourComponent';
   
   const meta: Meta<typeof YourComponent> = {
     title: 'Components/YourComponent',
     component: YourComponent,
     // ... configuration
   };
   
   export default meta;
   type Story = StoryObj<typeof meta>;
   
   export const Default: Story = {
     args: {
       // ... props
     },
   };
   ```

3. **Update `storybook.requires.js`** to include your new story
4. **Test in Storybook mode**

## Troubleshooting

### Environment Variables Not Working
- On Android: Make sure to run `npm run storybook:android` not `npm run android`
- On iOS: Make sure to run `npm run storybook:ios` not `npm run ios`

### Stories Not Loading
- Check that the story file is properly exported
- Verify the story is included in `storybook.requires.js`
- Restart the Metro bundler with `--reset-cache`

### Theme Not Switching
- Ensure `ThemeProvider` wraps your component
- Check AsyncStorage permissions
- Verify theme colors are properly defined in `tailwind.config.js`

---

This Storybook setup provides a powerful development environment for building and testing the xUSD Staking app's component library. It ensures consistency across themes while enabling rapid component development. 