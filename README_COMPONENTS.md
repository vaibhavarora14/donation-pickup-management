# Component Structure Documentation

## Folder Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Button.css
│   │   ├── Select.jsx
│   │   ├── Select.css
│   │   ├── Input.jsx
│   │   ├── Input.css
│   │   ├── Card.jsx
│   │   ├── Card.css
│   │   ├── Radio.jsx
│   │   ├── Radio.css
│   │   ├── Badge.jsx
│   │   ├── Badge.css
│   │   ├── Checkbox.jsx
│   │   ├── Checkbox.css
│   │   └── index.js           # Barrel export
│   │
│   ├── layout/                # Layout components
│   │   ├── TopBar.jsx
│   │   ├── TopBar.css
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   └── index.js           # Barrel export
│   │
│   └── [other components]/    # Feature-specific components
│
├── constants/
│   └── index.js               # App-wide constants
│
└── pages/                     # Page components
    ├── LandingPage.jsx
    ├── BookDonationPickup.jsx
    ├── PickupModeSelection.jsx
    └── PaymentOption.jsx
```

## UI Components

### Button
Reusable button component with multiple variants and sizes.

```jsx
import { Button } from '../components/ui';

<Button variant="primary" size="large" onClick={handleClick}>
  Click Me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark'
- `size`: 'small' | 'medium' | 'large'
- `fullWidth`: boolean
- `disabled`: boolean
- `onClick`: function
- `type`: 'button' | 'submit' | 'reset'

### Select
Dropdown select component with custom styling.

```jsx
import { Select } from '../components/ui';

<Select
  value={selectedValue}
  onChange={(e) => setSelectedValue(e.target.value)}
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
  placeholder="Select..."
  fullWidth
/>
```

**Props:**
- `value`: string
- `onChange`: function
- `options`: array of { value, label } or array of strings
- `placeholder`: string
- `disabled`: boolean
- `fullWidth`: boolean

### Input
Text input component with label and error support.

```jsx
import { Input } from '../components/ui';
import { Mail } from 'lucide-react';

<Input
  type="email"
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  icon={<Mail size={20} />}
  error={errors.email}
  fullWidth
/>
```

**Props:**
- `type`: string (text, email, password, etc.)
- `label`: string
- `placeholder`: string
- `value`: string
- `onChange`: function
- `error`: string
- `disabled`: boolean
- `fullWidth`: boolean
- `icon`: ReactNode

### Card
Container component for grouping content.

```jsx
import { Card } from '../components/ui';

<Card variant="default" padding="medium" onClick={handleClick}>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

**Props:**
- `variant`: 'default' | 'outlined' | 'elevated' | 'flat'
- `padding`: 'small' | 'medium' | 'large' | 'none'
- `onClick`: function (makes card clickable)

### Radio
Radio button component.

```jsx
import { Radio } from '../components/ui';

<Radio
  name="option"
  value="yes"
  checked={selected === 'yes'}
  onChange={(e) => setSelected(e.target.value)}
  label="Yes"
/>
```

**Props:**
- `name`: string
- `value`: string
- `checked`: boolean
- `onChange`: function
- `label`: string
- `disabled`: boolean

### Badge
Small badge component for notifications or counts.

```jsx
import { Badge } from '../components/ui';

<Badge variant="primary" size="small">5</Badge>
```

**Props:**
- `variant`: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
- `size`: 'small' | 'medium' | 'large'

### Checkbox
Checkbox component.

```jsx
import { Checkbox } from '../components/ui';

<Checkbox
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
  label="I agree to terms"
/>
```

**Props:**
- `checked`: boolean
- `onChange`: function
- `label`: string
- `disabled`: boolean

## Layout Components

### TopBar
Top contact bar component.

```jsx
import { TopBar } from '../components/layout';

<TopBar showLogin={true} />
```

### Header
Navigation header component.

```jsx
import { Header } from '../components/layout';

<Header logoUrl={customLogoUrl} showHappieeBox={true} />
```

### Footer
Footer component with links.

```jsx
import { Footer } from '../components/layout';

<Footer />
```

## Constants

All app-wide constants are in `src/constants/index.js`:

- `COLORS`: Color palette
- `BREAKPOINTS`: Responsive breakpoints
- `LOGO_URLS`: Logo image URLs
- `CONTACT_INFO`: Contact information
- `NAVIGATION_LINKS`: Navigation menu items
- `FOOTER_LINKS`: Footer link groups

## Usage Example

```jsx
import React, { useState } from 'react';
import { TopBar, Header, Footer } from '../components/layout';
import { Button, Select, Input, Card } from '../components/ui';
import { CONTACT_INFO } from '../constants';

const MyPage = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <TopBar />
      <Header />
      
      <main>
        <Card padding="medium">
          <Input
            label="Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
          />
          
          <Select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            options={options}
            fullWidth
          />
          
          <Button variant="primary" size="large" fullWidth>
            Submit
          </Button>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};
```

## Benefits

1. **Reusability**: Components can be used across multiple pages
2. **Consistency**: Same styling and behavior everywhere
3. **Maintainability**: Update once, changes everywhere
4. **Type Safety**: Clear prop interfaces
5. **Clean Code**: Pages focus on logic, not UI details
6. **Scalability**: Easy to add new components

