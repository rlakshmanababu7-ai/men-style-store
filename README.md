# 🚀 Supabase Auth in React - Complete Guide

This project is a React e-commerce application with a full authentication system powered by **Supabase**.

## 🛠️ Setup Instructions

### 1. Create a Supabase Account
- Visit [supabase.com](https://supabase.com) and sign up for a free account.
- Create a **New Project**.
- Give it a name, set a password, and choose a region close to you.

### 2. Get Your API Credentials
- Go to your Project **Settings** (gear icon) → **API**.
- Copy the following values:
  - **Project URL**
  - **anon / public key**

### 3. Setup Environment Variables
- In the root of this project, create a file named `.env`.
- Add your credentials like this:
  ```env
  VITE_SUPABASE_URL=your_project_url_here
  VITE_SUPABASE_ANON_KEY=your_anon_key_here
  ```

### 4. Create the Database Table
- Open the **SQL Editor** in Supabase.
- Paste and run the following command to create the `profiles` table:
  ```sql
  -- Create profiles table
  CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
  );

  -- Enable RLS
  ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

  -- Policy to allow users to view their own profile
  CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

  -- Policy to allow users to insert their own profile
  CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

  -- Policy to allow users to update their own profile
  CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);
  ```

### 5. Enable Email Auth
- Go to **Authentication** → **Providers**.
- Ensure **Email** is enabled.
- (Optional) Disable "Confirm Email" if you want users to log in immediately without verifying email.

### 6. Enable Google OAuth
- Go to **Authentication** → **Providers** → **Google**.
- Enable Google.
- You will need a **Client ID** and **Client Secret** from the [Google Cloud Console](https://console.cloud.google.com/).
  - Create a new project.
  - Setup **OAuth consent screen**.
  - Create **Credentials** → **OAuth client ID** (Web application).
  - Add your Supabase Redirect URI (found in the Supabase Google Provider settings) to **Authorized redirect URIs** in Google Cloud.
- Save settings in Supabase.

### 7. Run the Project
- Open your terminal.
- Run `npm install` (if you haven't already).
- Run `npm run dev` to start the development server.

## 📂 Folder Structure
- `/src/services/auth.js`: Contains reusable auth functions (Sign up, login, logout, etc.).
- `/src/services/supabase.js`: Initializes the Supabase client.
- `/src/pages`: Contains the UI for Login, Signup, Dashboard, and Password Recovery.
- `/src/App.jsx`: Handles routing and protects private pages (Cart, Checkout, Dashboard).

## ✨ Features
- ✅ **Email/Password Auth**: Secure account creation and login.
- ✅ **Google Login**: One-click social authentication.
- ✅ **Forgot Password**: Password recovery via email reset links.
- ✅ **Protected Routes**: Only logged-in users can access the Cart and Dashboard.
- ✅ **Session Persistence**: Users stay logged in even after refreshing the page.
- ✅ **Toast Notifications**: Interactive success/error feedback.
