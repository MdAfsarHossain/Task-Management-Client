# [Task Management System](https://task-management-6aed6.web.app)

The `Task Management System` is a dynamic and user-friendly web application designed to help users efficiently `organize` and `manage` their tasks. It provides a seamless `drag-and-drop` interface for categorizing tasks into three sections: `To-Do`, `In Progress`, and `Done`. The system ensures real-time persistence by instantly saving all changes to the database. Only `authenticated` users can access the application, and their details (User ID, email, and display name) are securely `stored` upon their first login. Each task includes a `title` and `description`, allowing users to keep track of their work with ease.

## [Key Features]()

- `User Authentication:`
  - Only authenticated users can access the application.
  - User details (User ID, email, and display name) are stored in the database upon first login.
- `Task Management:`
  - `Add Tasks:` Users can create new tasks with a title and description.
  - `Edit Tasks:` Users can modify the title and description of existing tasks.
  - `Delete Tasks:` Users can remove tasks they no longer need.
- `Drag-and-Drop Interface:`
  - Users can drag and drop tasks between the three categories: `To-Do`, `In Progress`, and `Done`.
  - Tasks can be reordered within a category for better organization.
- `Real-Time Database Updates:`
  - All changes (adding, editing, deleting, reordering, or moving tasks) are instantly saved to the database to ensure data persistence.
- `Task Details:`
  - Each task includes a title and description for clarity and context.
- `Intuitive User Interface:`
  - The interface is designed to be simple and easy to use, making task management efficient and enjoyable.

## [Technology Stack]()

- `Frontend:` React, Tailwind CSS, Daisy UI.
- `Backend:` Node.js, Express.js.
- `Database:` MongoDB.
- `Authentication:` Firebase.
- `APIs:` RESTful APIs for data retrieval and management.

## [Dependencies]()

- `@headlessui/react`: ^2.2.0
- `@hello-pangea/dnd`: ^18.0.1
- `@tailwindcss/vite`: ^4.0.7
- `@tanstack/react-query`: ^5.66.7
- `@tanstack/react-query-devtools`: ^5.66.7
- `axios`: ^1.7.9
- `firebase`: ^11.3.1
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `react-hook-form`: ^7.54.2
- `react-hot-toast`: ^2.5.2
- `react-icons`: ^5.5.0
- `react-router-dom`: ^6.29.0
- `react-spinners`: ^0.15.0
- `tailwindcss`: ^4.0.7
- `uuid`: ^11.1.0

## [Installation]()

- Run `npm install` to install project Dependencies

## [How to Run]()

1. Clone the repository

```js
git clone https://github.com/MdAfsarHossain/Task-Management-Client.git
cd task-management-client
```

2. Install dependencies using

```js
npm install
```

3. Setup Environment Variables

- Create `.env.local` in the root directory.
- Add `VITE_API_URL` variable and put your server url here.
- Create a firebase project and add config here firebase config will look like

```js
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

4. Run the website to locally

```js
npm run dev
```

5. Open the website in your local browser http://localhost:5173

## [Deployment]()

- Hosted on Netlify or Vercel for a fast and reliable experience.
- Firebase Authentication requires authorized domains to ensure secure access.

## [Contributions]()

- Contributions are welcome! Fork this repository, make your changes, and submit a pull request.

### [Live Site Link](https://task-management-6aed6.web.app)

### [Server Site Code Link](https://github.com/MdAfsarHossain/Task-Management-Server)
