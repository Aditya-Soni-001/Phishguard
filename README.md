# PhishGuard Terminal 🛡️

**PhishGuard Terminal** is a high-fidelity spear-phishing simulation and educational platform. This tool demonstrates the end-to-end "Kill Chain" of a modern social engineering attack—from automated lure delivery to real-time data exfiltration.

## 🚀 Project Overview

It is designed to train users on identifying psychological triggers used by attackers, such as urgency, authority, and professional masking.

### 🔑 Key Features
* **Hyper-Realistic Lure:** A Tailwind CSS-powered HR portal featuring educational "Logic Tooltips" that explain the attacker's intent behind specific data requests.
* **Automated Delivery:** Integration with the **Resend API** to deliver personalized emails that dynamically pull the target's identity from their email address.
* **Live Command Center:** A secure administrative dashboard inspired by "Darktrace" UI, monitoring simulation statistics in real-time.
* **Instant Exfiltration Alerts:** Implements the **Browser Audio API** to provide an immediate "Ping" notification the moment a target interacts with the trap.
* **Secure Backend:** Built on **Next.js 14** and **Supabase (PostgreSQL)** for robust, encrypted data handling.

---

## 🛠️ Technical Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | Next.js (App Router), Tailwind CSS, Lucide React |
| **Backend** | Next.js API Routes (Serverless) |
| **Database** | Supabase (PostgreSQL) |
| **Email Engine** | Resend API |
| **State Mgmt** | React Hooks (useEffect, useRef for real-time syncing) |

---

## 🛡️ Security & Best Practices

To adhere to industry standards, this project implements:
* **Environment Secret Management:** Sensitive API keys (Resend/Supabase) are stored in `.env.local` and protected via `.gitignore`.
* **Server-Side Logic:** Email triggers are handled via API routes to prevent exposing credentials on the client-side.
* **Data Minimization:** Simulated exfiltration is limited to PII fields necessary for educational demonstration.

---

## ⚠️ Disclaimer

**FOR EDUCATIONAL PURPOSES ONLY.**
This project was created to study social engineering vulnerabilities. Unauthorized use of these tactics against real users without explicit consent is illegal. The developer assumes no liability for misuse of this software.

---

## 👨‍💻 Developer
**Aditya Soni**
