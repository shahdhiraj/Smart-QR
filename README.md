# EventFoto OS 📸

**EventFoto OS** is a modern, cloud-native event photo platform designed to streamline photo sharing and engagement. It features real-time gallery updates, QR code-based guest access, and a powerful collage creator tool.

## 🚀 Key Features

*   **📱 OneQR Experience**: A unified QR code system for guests to access event details, upload photos, and view the gallery.
    *   Dynamic Phone Preview with customization (Pink, Dark, Slate, Light themes).
    *   Downloadable and Shareable QR Cards.
*   **🖼️ Modern Photo Gallery**:
    *   Beautiful masonry grid layout using Glassmorphism design principles.
    *   **Video Support**: Seamlessly handles both photos and videos.
    *   **Drag & Drop Upload**: Intuitive drag-and-drop zone for bulk media uploads.
*   **🎨 Collage Creator**:
    *   Select multiple photos from the gallery to instantly generate professional collages.
    *   Built-in download functionality.
*   **🔐 Secure Authentication**: Integrated with **Clerk** for robust user management and route protection.
*   **⚡ Real-time Updates**: (Coming Soon) Live photo feed for events.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + `tailwindcss-animate`
*   **UI Components**: [Radix UI](https://www.radix-ui.com/) (Primitives) & [Lucide React](https://lucide.dev/) (Icons)
*   **Authentication**: [Clerk](https://clerk.com/)
*   **Image Generation**: `html-to-image` (for QR cards and collages)
*   **QR Code**: `react-qr-code`

## 🏁 Getting Started

### Prerequisites

*   Node.js 18+
*   npm

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/shahdhiraj/Smart-QR.git
    cd Smart-QR
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root directory and add your Clerk API keys:
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...
    
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/events
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/events
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📂 Project Structure

```bash
├── app/
│   ├── (dashboard)/       # Protected routes (Events, QR, Analytics)
│   ├── components/        # Reusable UI components
│   │   ├── events/        # PhotoGallery, CollageGenerator
│   │   ├── event-qr/      # OneQRCard, customize-panel
│   │   ├── layout/        # Sidebar, TopBar
│   │   └── ui/            # Shadcn/Radix UI primitives
│   ├── sign-in/           # Clerk Sign-in page
│   ├── sign-up/           # Clerk Sign-up page
│   ├── layout.tsx         # Root layout with ClerkProvider
│   └── globals.css        # Global styles & Tailwind directives
├── public/                # Static assets
└── middleware.ts          # Clerk route protection
```

## 🚧 Roadmap

- [x] **Authentication**: Clerk Integration.
- [x] **Core UI**: OneQR, Gallery, Collage Creator.
- [ ] **Backend Integration**: Connect to Supabase/PostgreSQL for persistent data.
- [ ] **Storage**: Integrate AWS S3 or Supabase Storage for media files.
- [ ] **Live Feed**: Implement WebSocket/Real-time updates for the gallery.

## 📄 License

This project is licensed under the MIT License.
