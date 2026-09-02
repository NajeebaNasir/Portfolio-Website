# Najeeba Nasir - GenAI & Mainframe Modernization Portfolio Website

A bespoke, responsive, high-performance developer portfolio website for **Najeeba Nasir** (GenAI Engineer & Packaged App Development Analyst at Accenture).

## 🌟 Key Features & Sections Included

1. **Header & Responsive Navigation Bar**:
   - Sticky navbar with glassmorphism backdrop.
   - Quick navigation links & **Direct Resume PDF Download** button.
   - Mobile hamburger menu toggle.

2. **Hero Section**:
   - Status badge: `Available for GenAI & Cloud Architecture Projects`.
   - Title: `GenAI Engineer & Mainframe Modernization Specialist`.
   - Quick meta: Gurugram, India | Accenture | Email & Social links.

3. **Impact Metric Cards**:
   - **60–90%** LLM Dependency Reduction (Python logic & Neo4j Graph IR).
   - **80–90%** API Scaffolding Effort Saved (FastAPI & OpenAPI generator).
   - **100%** Auditable Decision Ledgers (SHA-256 keyed & temperature-0 pinned models).
   - **~40%** Env Setup Time Cut (Azure DevOps, AWS S3 / GCP GCS integration).

4. **Engineering Philosophy & About Section**:
   - Deep dive into Deterministic Agentic Design, Graph IR (Neo4j/Cypher), and Cryptographic Audibility.

5. **Interactive Neo4j Pipeline Architecture Visualizer**:
   - Interactive flowchart covering: `Legacy COBOL/JCL` -> `Neo4j Graph IR` -> `Bounded Context Enforcer` -> `SHA-256 Decision Ledger` -> `FastAPI Microservices`.
   - Clickable nodes with live inspector panel showing descriptions, tags, and code snippets.

6. **Interactive SHA-256 Decision Ledger & TOON Simulator CLI**:
   - Live command-line terminal sandbox.
   - Input custom component names and watch real-time SHA-256 hash generation, TOON token compression calculation, and schema-validated JSON preview.
   - Copy JSON button.

7. **Professional Experience Timeline**:
   - Complete breakdown of Accenture roles (*Analyst - GenAI Engineering* & *Packaged App Development Associate*).
   - Project highlights, bounded context data isolation, and security scanning (Trivy, Bandit, Pylint).

8. **Technical Skills Matrix & Filter**:
   - Filterable skill cards by category: *GenAI & Agentic*, *Backend & APIs*, *Data & Persistence*, *Cloud & DevOps*, *Quality & Security*.

9. **Certifications & Education**:
   - 3D badge cards for **GitHub Actions Certification (GH-200)**, **AWS Partner: Agentic AI**, **IBM watsonx Code Assistant for Z**, and **B.Tech (ECE)** degree.

10. **Contact Section & Footer**:
    - Direct email, phone number, location, LinkedIn link, and interactive contact form.

---

## 🚀 How to Publish on GitHub Pages (Step-by-Step)

Follow these simple steps to deploy your website to GitHub Pages for free:

### Step 1: Create a GitHub Repository
1. Go to [GitHub.com](https://github.com) and click **New Repository**.
2. Name the repository `PortWeb` (or `najeebanasir.github.io` for a root user domain).
3. Set visibility to **Public**.

### Step 2: Push Files to GitHub
Open your terminal in `c:\Users\Najeeba Nasir\Desktop\PortWeb` and run:

```bash
git init
git add .
git commit -m "Initial commit of Najeeba Nasir Portfolio Website"
git branch -M main
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/PortWeb.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub (`https://github.com/<YOUR-GITHUB-USERNAME>/PortWeb`).
2. Click **Settings** -> **Pages** (in the left sidebar).
3. Under **Build and deployment -> Source**, select **Deploy from a branch**.
4. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
5. Your website will be live in ~1-2 minutes at:
   `https://<YOUR-GITHUB-USERNAME>.github.io/PortWeb/`

---

## 💻 Local Development / Testing

To preview the website locally on your computer:

```bash
# Option 1: Python HTTP Server
python -m http.server 8000

# Option 2: Node serve
npx serve .
```

Open `http://localhost:8000` in your web browser.
