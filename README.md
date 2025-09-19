Biodiversity Analysis Platform (Frontend)

A modern, minimalistic, dark-themed web application for **Biodiversity Mapping using eDNA datasets**.
Built for **Smart India Hackathon (SIH) 2025**.

The platform allows users to:

* Upload environmental DNA (eDNA) datasets
* Process and analyze DNA sequences
* Visualize biodiversity metrics & taxonomic classification
* Generate detailed interactive reports

---

## Features

* **Dark Black Theme** with **Google Sans typography**
* **Transparent Navbar & Buttons** with smooth hover animations
* **Highlighted Terms** with yellow gradient & handwritten underline in hero section
* **Landing Page** with features, benefits, process flow, and privacy section
* **Upload Page** with drag-and-drop dataset uploader
* **Processing Page** with progress bar, step tracker, and live logs
* **Report Page** with:

  * Overview cards (Samples, Sequences, Species Found, Shannon Index)
  * Graphical reports (Pie, Bar, Line, Taxonomy Tree, Heatmap, Map View)
  * Searchable & filterable species table
  * Export options (CSV, PDF)

---

## Pages Overview

###  Landing Page

* Hero with tagline: *“Mapping Biodiversity from eDNA”*
* Features grid (Upload, Processing, Visualization, Export)
* Benefits section with icons
* Flowchart of pipeline (Upload → Processing → Visualization → Insights → Export)
* Privacy notice

###  Upload Page

* Drag & drop uploader
* File preview + remove option
* Supported formats: FASTA, CSV, Excel
* Transparent “Start Processing” button

###  Processing Page

* Stepwise tracker: Upload ✓ → BLAST search → Taxonomy → Metrics → Report ✓
* DNA helix animation during loading
* Logs in a minimal glass card
* Success screen → “View Report”

###  Report Page

* Overview statistics (samples, species, metrics)
* Charts: Pie, Bar, Line, Taxonomy Tree, Heatmap, Map
* Searchable species table
* Export buttons

---

##  Tech Stack

* **Frontend:** React + TailwindCSS (minimalistic components, animations)
* **Charts & Graphs:** Recharts / D3.js (for biodiversity visualizations)
* **Icons:** Lucide React
* **Fonts:** Google Sans

---

## 📂 Project Structure

```
/src
  /components   → Reusable UI (buttons, navbar, charts)
  /pages
    Landing.jsx
    Upload.jsx
    Processing.jsx
    Report.jsx
  /assets       → Icons, illustrations
  /styles       → Global CSS / Tailwind config
```

---

## 🚀 Getting Started

### 1️⃣ Clone Repo

```bash
git clone https://github.com/your-username/biodiversity-frontend.git
cd biodiversity-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

### 4️⃣ Build for Production

```bash
npm run build
```

---

##  Example Report Outputs

* **Species Distribution Pie Chart**
* **Abundance Bar Graph**
* **Shannon Index Trend Line**
* **Interactive Taxonomy Tree**
* **Species Table with Search & Filters**

---

##  Privacy & Data Policy

* All uploaded data is processed **temporarily**.
* No permanent storage of user datasets.
* Complies with research-grade data privacy standards.

---


## 📜 License

This project is licensed under the **MIT License** – free to use, modify, and distribute.

---

⚡ *Designed for SIH 2025 with love, coffee, and clean code.* ☕💻
