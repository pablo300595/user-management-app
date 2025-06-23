# User Management Application – Angular Challenge

## 📋 Introduction

This is my submission for the **Angular Development Challenge: User Management Application**. The goal was to build a user management interface using Angular, integrating with the [Random User Generator API](https://randomuser.me/), while demonstrating modern Angular features like **standalone components**, **Angular Signals**, and **best practices** in component-driven architecture.

The application includes:

- ✅ Login page with simulated authentication
- ✅ Paginated user list table
- ✅ User detail view

## 🧠 Core Angular Concepts Implemented

- ✅ Standalone Angular components
- ✅ Angular Signals for local state
- ✅ Angular Services for business logic
- ✅ HTTP Client for API integration
- ✅ Custom Pipes (e.g., phone formatting)
- ✅ `@Input()` and `@Output()` for component interaction
- ✅ Structural directives: `@if`, `@for`
- ✅ Routing with parameterized routes
- ✅ HTTP Interceptor with auth token injection
- ✅ Angular Material UI components
- ✅ Form validation (reactive forms)

---

## 🚀 Getting Started

### Prerequisites

- Node.js v22.16.0
- Angular CLI 20.0.3

### Production Link
https://pablo300595.github.io/user-management-app/

### Mock Credentials
```ts
export const USER_LIST = [
  { username: 'user123', password: 'Password1!' },
  { username: 'coder_gal', password: 'SecurePass2#' },
  { username: 'dev_master', password: 'MySecretPwd3$' },
  { username: 'test_account', password: 'WeakPassword4%' },
  { username: 'admin_user', password: 'AdminPass5^' },
];

### Installation

```bash
git clone https://github.com/your-username/user-management-app.git
cd user-management-app
npm install
