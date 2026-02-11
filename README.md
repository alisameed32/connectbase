# ConnectBase - Contact Management System

![](/UI-Screenshots/Landing%20Page%201.png)

ConnectBase is a robust full-stack Contact Management System designed to provide users with a seamless experience for organizing and managing their professional and personal networks. Built using Java Spring Boot, React.js, and SQL, it emphasizes security, modular architecture, and a modern, responsive user interface.



---

## 📖 Table of Contents
* [Project Overview](#-project-overview)
* [File & Folder Structure](#-file--folder-structure)
* [Technology Stack](#-technology-stack)
* [Key Features](#-key-features)
* [Recommended UI Images & Placement](#-recommended-ui-images--placement)
* [Installation & Setup](#-installation--setup)
* [Author](#-author)

---

## 🚀 Project Overview
The system enables efficient contact organization with secure user registration and login. It supports full CRUD (Create, Read, Update, Delete) operations, advanced contact filtering, and profile management, ensuring users can maintain an up-to-date digital address book.

![](/UI-Screenshots/Landing%20Page%203.png)

---

## 📂 File & Folder Structure

Below is the high-level structure of the ConnectBase repository:

```text
connectbase/
├── backend/                # Spring Boot Application
│   ├── gradle/             # Gradle wrapper files
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/       # Backend source code (Models, Controllers, Services)
│   │   │   └── resources/  # Application properties and logging configs
│   │   └── test/           # Unit and Integration tests
│   └── build.gradle        # Backend dependencies and build script
├── client/                 # React.js Frontend
│   ├── public/             # Static assets (favicons, etc.)
│   ├── src/
│   │   ├── api/            # Axios configuration
│   │   ├── components/     # Reusable UI components (Auth, Contacts, UI)
│   │   ├── pages/          # Application views (Dashboard, Profile, Landing)
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.js      # Vite configuration
└── README.md               # Project documentation
```

## 🛠 Technology Stack

* **Backend Language**: Java 21.
* **Framework**: Spring Boot 4.0.2 with Spring Data JPA.
* **Security**: Spring Security with JWT (0.11.5) for stateless authentication.
* **Database**: MySQL for production and H2 for testing environments.
* **Cloud Services**: Cloudinary integration for handling contact profile images.
* **Frontend Library**: React.js 19.
* **Styling**: Tailwind CSS 4 with Framer Motion for smooth, interactive animations.
* **Routing**: React Router DOM (v7) for seamless single-page navigation.
* **HTTP Client**: Axios for API communication.
* **Build Tool**: Vite for a fast development experience.

## ✨ Key Features

### 1. Secure Authentication & Profile Management
Registration: Sign up using either an email address or a phone number.

* **Security**: JWT-based login ensures that user sessions are secure and private.
* **Account Security**: Integrated feature to change passwords at any point through the application.

### 2. Advanced Contact Management

* **Paginated List**: View all contacts in an organized, paginated dashboard for high performance with large datasets.
* **Dynamic Search**: Real-time search and filter options to find contacts instantly.
* **Detailed Profiles**: Store comprehensive data including multiple email labels (work, personal) and phone number categories.
* **Profile Media**: Upload and manage contact profile pictures via Cloudinary.

### 3. Reliability & Maintenance

* **Global Exception Handling**: Centralized error management to provide clear, user-friendly feedback.
* **Detailed Logging**: System-wide logging of activities, errors, and events using SLF4J.

## 📸 Recommended UI Images & Placement

### 1. Landing Pages

![](/UI-Screenshots/Landing%20Page%201.png)

![](/UI-Screenshots/Landing%20Page%203.png)

![](/UI-Screenshots/Landing%20Page%202.png)

![](/UI-Screenshots/Landing%20Page%204.png)

### 2. Authentication Flow

![](/UI-Screenshots/Sign%20Up.png)

![](/UI-Screenshots/Sign%20in.png)


### 3. User Dashboard

![](/UI-Screenshots/contact%20page%201.png)

![](/UI-Screenshots/create%20contact.png)

![](/UI-Screenshots/contact%20page%202.png)

![](/UI-Screenshots/View%20Contact.png)

![](/UI-Screenshots/Update%20Contact.png)

![](/UI-Screenshots/Delete%20Contact.png)

### 4. Contact Search

![](/UI-Screenshots/Search%20Contact.png)

### 5. Detailed Contact View

![](/UI-Screenshots/Profile%20Page.png)

## 🛠 Installation & Setup

### Backend Setup 
* Navigate to the /backend directory.
* Ensure you have JDK 21 installed.
* Configure your MySQL and Cloudinary credentials in src/main/resources/application.properties.
* Run the application using Gradle: ./gradlew bootRun.

### Frontend Setup

* Navigate to the /client directory.
* Install the required dependencies: npm install.
* Start the Vite development server: npm run dev.

## 👤 Author
**Ali Sameed**
[LinkedIn](https://www.linkedin.com/in/alisameed/) | [GitHub](https://github.com/alisameed32)