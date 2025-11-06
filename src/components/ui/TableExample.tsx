/**
 * Table Component Usage Examples
 *
 * This file demonstrates how to use the reusable Table components
 * across the application with proper semantic HTML structure.
 */

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./Table";

// Example 1: Simple Data Table
export function SimpleTable() {
  const users = [
    { id: 1, name: "John Michael", job: "Manager", employed: "23/04/18" },
    { id: 2, name: "Alexa Liras", job: "Developer", employed: "23/04/18" },
    { id: 3, name: "Laurent Perrier", job: "Executive", employed: "19/09/17" },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Job</TableHeaderCell>
          <TableHeaderCell>Employed</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.job}</TableCell>
            <TableCell>{user.employed}</TableCell>
            <TableCell>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Example 2: Clickable Rows Table
export function ClickableTable() {
  const handleRowClick = (userId: number) => {
    console.log("User clicked:", userId);
    // Navigate to detail page or open modal
  };

  const users = [
    { id: 1, name: "John Michael", job: "Manager", employed: "23/04/18" },
    { id: 2, name: "Alexa Liras", job: "Developer", employed: "23/04/18" },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Job</TableHeaderCell>
          <TableHeaderCell>Employed</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} onClick={() => handleRowClick(user.id)}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.job}</TableCell>
            <TableCell>{user.employed}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Example 3: Table with Aligned Columns
export function AlignedColumnsTable() {
  const products = [
    { id: 1, name: "Product A", quantity: 100, price: 29.99 },
    { id: 2, name: "Product B", quantity: 250, price: 49.99 },
    { id: 3, name: "Product C", quantity: 75, price: 19.99 },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell align="center" className="w-20">
            ID
          </TableHeaderCell>
          <TableHeaderCell>Product Name</TableHeaderCell>
          <TableHeaderCell align="right" className="w-[120px]">
            Quantity
          </TableHeaderCell>
          <TableHeaderCell align="right" className="w-[120px]">
            Price
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell align="center">{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell align="right">{product.quantity}</TableCell>
            <TableCell align="right">${product.price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Example 4: Table with Custom Cell Content
export function CustomContentTable() {
  const orders = [
    {
      id: 1,
      customer: "John Doe",
      status: "completed",
      total: 299.99,
    },
    {
      id: 2,
      customer: "Jane Smith",
      status: "pending",
      total: 149.5,
    },
    {
      id: 3,
      customer: "Bob Johnson",
      status: "cancelled",
      total: 89.99,
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status as keyof typeof statusColors]
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell className="w-20">Order</TableHeaderCell>
          <TableHeaderCell>Customer</TableHeaderCell>
          <TableHeaderCell className="w-[150px]">Status</TableHeaderCell>
          <TableHeaderCell align="right" className="w-[120px]">
            Total
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>#{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
            <TableCell align="right">${order.total.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/**
 * Key Features:
 *
 * 1. Semantic HTML Structure:
 *    - Uses proper <table>, <thead>, <tbody>, <tr>, <th>, <td> elements
 *    - Better accessibility and SEO
 *
 * 2. Responsive Design:
 *    - Horizontal scrolling on small screens (overflow-x-auto)
 *    - Minimum width preserved (min-w-max)
 *
 * 3. Row Hover Effect:
 *    - Automatic hover:bg-gray-50 on all rows
 *    - Smooth transition-colors
 *
 * 4. Clickable Rows:
 *    - Pass onClick handler to TableRow
 *    - Cursor changes to pointer automatically
 *
 * 5. Flexible Alignment:
 *    - TableHeaderCell and TableCell support align prop
 *    - Options: "left" (default), "center", "right"
 *
 * 6. Custom Styling:
 *    - All components accept className prop
 *    - Use Tailwind utilities for width, spacing, etc.
 *
 * 7. Auto-Border Management:
 *    - Last row automatically has no bottom border
 *    - Maintains consistent spacing
 */
