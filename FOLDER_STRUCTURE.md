# Project Folder Structure

## New Clean Structure

```
donation-pickup-management/
├── src/
│   ├── components/
│   │   ├── ui/                          # Reusable UI Components
│   │   │   ├── Button.jsx & .css        # Button component with variants
│   │   │   ├── Select.jsx & .css       # Select dropdown component
│   │   │   ├── Input.jsx & .css         # Input field component
│   │   │   ├── Card.jsx & .css          # Card container component
│   │   │   ├── Radio.jsx & .css         # Radio button component
│   │   │   ├── Badge.jsx & .css         # Badge component
│   │   │   ├── Checkbox.jsx & .css      # Checkbox component
│   │   │   └── index.js                 # Barrel export
│   │   │
│   │   ├── layout/                      # Layout Components
│   │   │   ├── TopBar.jsx & .css        # Top contact bar
│   │   │   ├── Header.jsx & .css        # Navigation header
│   │   │   ├── Footer.jsx & .css        # Footer component
│   │   │   └── index.js                 # Barrel export
│   │   │
│   │   └── [feature]/                   # Feature-specific components
│   │       ├── DonationForm.jsx
│   │       ├── LocationPicker.jsx
│   │       └── ...
│   │
│   ├── constants/
│   │   └── index.js                     # App-wide constants
│   │       ├── COLORS
│   │       ├── BREAKPOINTS
│   │       ├── LOGO_URLS
│   │       ├── CONTACT_INFO
│   │       ├── NAVIGATION_LINKS
│   │       └── FOOTER_LINKS
│   │
│   ├── pages/                           # Page Components
│   │   ├── LandingPage.jsx & .css
│   │   ├── BookDonationPickup.jsx & .css
│   │   ├── PickupModeSelection.jsx & .css
│   │   ├── PaymentOption.jsx & .css
│   │   ├── Login.jsx
│   │   └── AdminDashboard.jsx
│   │
│   ├── contexts/                        # React Contexts
│   │   └── AuthContext.jsx
│   │
│   ├── App.jsx                          # Main app component
│   ├── main.jsx                         # Entry point
│   └── index.css                        # Global styles
│
└── [other config files]
```

## Component Organization

### UI Components (`src/components/ui/`)
All reusable UI primitives in one place:
- **Button**: Multiple variants (primary, secondary, outline, ghost, dark)
- **Select**: Dropdown with custom styling
- **Input**: Text input with label and error support
- **Card**: Container component with variants
- **Radio**: Radio button component
- **Badge**: Small badge for notifications
- **Checkbox**: Checkbox component

### Layout Components (`src/components/layout/`)
Shared layout components used across pages:
- **TopBar**: Contact information bar
- **Header**: Navigation header with logo and menu
- **Footer**: Footer with links

### Constants (`src/constants/`)
Centralized configuration:
- Colors, breakpoints, URLs, contact info, navigation links

## Benefits

1. **Single Source of Truth**: UI components defined once, used everywhere
2. **Easy Maintenance**: Update component once, changes reflect everywhere
3. **Consistency**: Same look and feel across all pages
4. **Reusability**: Components can be used in any page
5. **Clean Code**: Pages focus on logic, not UI implementation
6. **Scalability**: Easy to add new components or pages

## Usage Pattern

```jsx
// Import layout components
import { TopBar, Header, Footer } from '../components/layout';

// Import UI components
import { Button, Select, Input, Card } from '../components/ui';

// Import constants
import { COLORS, CONTACT_INFO } from '../constants';

// Use in page
const MyPage = () => {
  return (
    <div>
      <TopBar />
      <Header />
      <main>
        <Card>
          <Input label="Name" />
          <Button variant="primary">Submit</Button>
        </Card>
      </main>
      <Footer />
    </div>
  );
};
```

## Migration Guide

To refactor existing pages:

1. Replace custom buttons with `<Button>` component
2. Replace custom selects with `<Select>` component
3. Replace custom inputs with `<Input>` component
4. Replace custom cards with `<Card>` component
5. Use `<TopBar>`, `<Header>`, `<Footer>` from layout
6. Import constants instead of hardcoding values
7. Remove duplicate CSS that's now in component files

