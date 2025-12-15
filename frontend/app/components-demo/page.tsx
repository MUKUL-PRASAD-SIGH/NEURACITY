'use client';

import { useState } from 'react';
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

export default function ComponentsDemoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Sample table data
  const tableData = [
    { id: 1, name: 'Location A', severity: 0.85, status: 'Critical' },
    { id: 2, name: 'Location B', severity: 0.45, status: 'Medium' },
    { id: 3, name: 'Location C', severity: 0.25, status: 'Low' },
  ];

  const tableColumns = [
    { key: 'name', header: 'Location', sortable: true },
    { 
      key: 'severity', 
      header: 'Severity', 
      sortable: true,
      render: (row: any) => (
        <span className={`
          px-2 py-1 rounded text-xs font-medium
          ${row.severity > 0.75 ? 'bg-red-100 text-red-800' : 
            row.severity > 0.5 ? 'bg-yellow-100 text-yellow-800' : 
            'bg-green-100 text-green-800'}
        `}>
          {row.severity.toFixed(2)}
        </span>
      )
    },
    { key: 'status', header: 'Status', sortable: true },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">UI Components Demo</h1>
        <p className="text-gray-600">Testing all reusable components in isolation</p>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Alerts</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {showAlert && (
              <>
                <Alert
                  variant="success"
                  title="Success"
                  message="Operation completed successfully!"
                  onClose={() => setShowAlert(false)}
                />
                <Alert
                  variant="error"
                  title="Error"
                  message="Something went wrong. Please try again."
                />
                <Alert
                  variant="warning"
                  message="This action cannot be undone."
                />
                <Alert
                  variant="info"
                  message="New features are available in this release."
                />
              </>
            )}
            {!showAlert && (
              <Button onClick={() => setShowAlert(true)}>Show Alerts</Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Buttons</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <Button fullWidth>Full Width Button</Button>
          </div>
        </CardBody>
      </Card>

      {/* Form Inputs */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Form Inputs</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              helperText="We'll never share your email."
              fullWidth
            />
            <Input
              label="Password"
              type="password"
              error="Password must be at least 8 characters"
              fullWidth
            />
            <Select
              label="Select Location"
              options={[
                { value: '', label: 'Choose a location' },
                { value: 'loc1', label: 'Location A' },
                { value: 'loc2', label: 'Location B' },
                { value: 'loc3', label: 'Location C' },
              ]}
              fullWidth
            />
            <Textarea
              label="Notes"
              placeholder="Enter your notes here..."
              rows={4}
              helperText="Maximum 500 characters"
              fullWidth
            />
          </div>
        </CardBody>
      </Card>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">File Upload</h2>
        </CardHeader>
        <CardBody>
          <FileUpload
            label="Upload Images"
            accept="image/*"
            multiple
            maxSize={5 * 1024 * 1024} // 5MB
            onChange={setSelectedFiles}
            helperText="Upload street images for analysis"
            fullWidth
          />
          {selectedFiles.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              {selectedFiles.length} file(s) selected
            </p>
          )}
        </CardBody>
      </Card>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hover>
          <CardHeader>
            <h3 className="font-semibold">Card with Header</h3>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-gray-600">This card has a header and body.</p>
          </CardBody>
        </Card>

        <Card hover>
          <CardBody>
            <h3 className="font-semibold mb-2">Simple Card</h3>
            <p className="text-sm text-gray-600">This card only has a body.</p>
          </CardBody>
        </Card>

        <Card hover>
          <CardHeader>
            <h3 className="font-semibold">Card with Footer</h3>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-gray-600">This card has all sections.</p>
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="secondary">Action</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Table with Sorting</h2>
        </CardHeader>
        <CardBody className="p-0">
          <Table
            columns={tableColumns}
            data={tableData}
            keyExtractor={(row) => row.id.toString()}
            onRowClick={(row) => alert(`Clicked: ${row.name}`)}
          />
        </CardBody>
      </Card>

      {/* Modal */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Modal Dialog</h2>
        </CardHeader>
        <CardBody>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Example Modal"
            size="md"
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                This is a modal dialog. You can put any content here.
              </p>
              <Input
                label="Example Input"
                placeholder="Type something..."
                fullWidth
              />
              <ModalFooter>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setModalOpen(false)}>
                  Confirm
                </Button>
              </ModalFooter>
            </div>
          </Modal>
        </CardBody>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Loading States</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </div>
            <div className="flex items-center gap-4 bg-gray-800 p-4 rounded">
              <Spinner size="md" color="white" />
              <span className="text-white">Loading with white spinner...</span>
            </div>
            <Button onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}>
              Show Loading Overlay
            </Button>
            {loading && (
              <LoadingOverlay message="Processing your request..." />
            )}
          </div>
        </CardBody>
      </Card>

      {/* Empty Table */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Empty Table State</h2>
        </CardHeader>
        <CardBody className="p-0">
          <Table
            columns={tableColumns}
            data={[]}
            keyExtractor={(row) => row.id.toString()}
            emptyMessage="No locations found. Try adjusting your filters."
          />
        </CardBody>
      </Card>
    </div>
  );
}
