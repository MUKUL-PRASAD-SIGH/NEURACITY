# Reusable UI Components

This directory contains all reusable UI components for the CaaS Waste Prediction MVP frontend.

## Components Overview

### Button Component
**File:** `Button.tsx`

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `loading`: boolean - Shows loading spinner
- `fullWidth`: boolean - Makes button full width
- `disabled`: boolean - Disables the button

**Usage:**
```tsx
import { Button } from '@/components';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

---

### Input Component
**File:** `Input.tsx`

A text input field with label, error, and helper text support.

**Props:**
- `label`: string - Label text
- `error`: string - Error message (shows in red)
- `helperText`: string - Helper text below input
- `fullWidth`: boolean - Makes input full width
- All standard HTML input attributes

**Usage:**
```tsx
import { Input } from '@/components';

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error={errors.email}
  fullWidth
/>
```

---

### Select Component
**File:** `Select.tsx`

A dropdown select component with label and error support.

**Props:**
- `label`: string - Label text
- `error`: string - Error message
- `helperText`: string - Helper text
- `options`: SelectOption[] - Array of {value, label} objects
- `fullWidth`: boolean - Makes select full width

**Usage:**
```tsx
import { Select } from '@/components';

<Select
  label="Location"
  options={[
    { value: 'loc1', label: 'Location A' },
    { value: 'loc2', label: 'Location B' }
  ]}
  fullWidth
/>
```

---

### Textarea Component
**File:** `Textarea.tsx`

A multi-line text input with label and error support.

**Props:**
- `label`: string - Label text
- `error`: string - Error message
- `helperText`: string - Helper text
- `fullWidth`: boolean - Makes textarea full width
- All standard HTML textarea attributes

**Usage:**
```tsx
import { Textarea } from '@/components';

<Textarea
  label="Notes"
  rows={4}
  placeholder="Enter notes..."
  fullWidth
/>
```

---

### FileUpload Component
**File:** `FileUpload.tsx`

A drag-and-drop file upload component with file preview.

**Props:**
- `label`: string - Label text
- `error`: string - Error message
- `helperText`: string - Helper text
- `accept`: string - File types to accept (e.g., "image/*")
- `multiple`: boolean - Allow multiple files
- `maxSize`: number - Max file size in bytes
- `onChange`: (files: File[]) => void - Callback with selected files
- `disabled`: boolean - Disable upload
- `fullWidth`: boolean - Makes component full width

**Usage:**
```tsx
import { FileUpload } from '@/components';

<FileUpload
  label="Upload Images"
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024}
  onChange={(files) => console.log(files)}
/>
```

---

### Card Component
**File:** `Card.tsx`

A container component for displaying content in a card layout.

**Components:**
- `Card` - Main container
- `CardHeader` - Header section with border
- `CardBody` - Main content area
- `CardFooter` - Footer section with border

**Props (Card):**
- `padding`: 'none' | 'sm' | 'md' | 'lg' (default: 'md')
- `hover`: boolean - Add hover effect
- `className`: string - Additional CSS classes

**Usage:**
```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@/components';

<Card hover>
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardBody>
    <p>Content goes here</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### Modal Component
**File:** `Modal.tsx`

A modal dialog component with backdrop and close functionality.

**Components:**
- `Modal` - Main modal container
- `ModalFooter` - Footer section for action buttons

**Props (Modal):**
- `isOpen`: boolean - Controls modal visibility
- `onClose`: () => void - Close callback
- `title`: string - Modal title
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `showCloseButton`: boolean (default: true)

**Usage:**
```tsx
import { Modal, ModalFooter } from '@/components';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
>
  <p>Are you sure?</p>
  <ModalFooter>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button onClick={handleConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>
```

---

### Table Component
**File:** `Table.tsx`

A data table with sorting and filtering capabilities.

**Props:**
- `columns`: Column[] - Array of column definitions
- `data`: T[] - Array of data objects
- `keyExtractor`: (row: T) => string | number - Unique key for each row
- `onRowClick`: (row: T) => void - Row click handler
- `emptyMessage`: string - Message when no data
- `className`: string - Additional CSS classes

**Column Definition:**
```typescript
{
  key: string;           // Data key
  header: string;        // Column header text
  sortable?: boolean;    // Enable sorting
  render?: (row: T) => ReactNode;  // Custom render function
}
```

**Usage:**
```tsx
import { Table } from '@/components';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
];

<Table
  columns={columns}
  data={data}
  keyExtractor={(row) => row.id}
  onRowClick={(row) => console.log(row)}
/>
```

---

### Spinner Component
**File:** `Spinner.tsx`

Loading spinner components.

**Components:**
- `Spinner` - Animated spinner icon
- `LoadingOverlay` - Full-screen loading overlay

**Props (Spinner):**
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `color`: 'primary' | 'white' | 'gray' (default: 'primary')
- `className`: string - Additional CSS classes

**Props (LoadingOverlay):**
- `message`: string - Loading message (default: 'Loading...')

**Usage:**
```tsx
import { Spinner, LoadingOverlay } from '@/components';

// Inline spinner
<Spinner size="md" color="primary" />

// Full-screen overlay
{loading && <LoadingOverlay message="Processing..." />}
```

---

### Alert Component
**File:** `Alert.tsx`

Alert/notification component for displaying messages.

**Props:**
- `variant`: 'success' | 'error' | 'warning' | 'info'
- `title`: string - Alert title (optional)
- `message`: string - Alert message
- `onClose`: () => void - Close callback (optional)
- `className`: string - Additional CSS classes

**Usage:**
```tsx
import { Alert } from '@/components';

<Alert
  variant="success"
  title="Success"
  message="Operation completed successfully!"
  onClose={() => setShowAlert(false)}
/>
```

---

## Testing Components

All components can be tested in isolation by visiting:
```
http://localhost:3000/components-demo
```

This page demonstrates all components with various configurations and states.

## Import Pattern

All components can be imported from the main index file:

```tsx
import {
  Button,
  Input,
  Select,
  Textarea,
  FileUpload,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalFooter,
  Table,
  Spinner,
  LoadingOverlay,
  Alert,
} from '@/components';
```

## Styling

All components use Tailwind CSS for styling and follow a consistent design system:

- **Primary Color:** Blue (blue-600)
- **Secondary Color:** Gray (gray-200)
- **Danger Color:** Red (red-600)
- **Border Radius:** rounded-md (0.375rem)
- **Focus Ring:** 2px ring with offset

## Accessibility

All components follow accessibility best practices:
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Color contrast compliance

## Browser Support

Components are tested and supported on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
