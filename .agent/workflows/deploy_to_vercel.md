---
description: How to deploy the Laundry POS app to Vercel and connect a custom domain
---

# Deploying to Vercel

Since you have a custom domain, **Vercel** is an excellent choice for hosting your Vite React app. It is free for personal/hobby projects and very easy to set up.

## Prerequisites
1. **GitHub Account**: It is best to push your code to GitHub first.
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3. **Domain Provider Access**: You will need to change DNS nameservers or A records.

## Step 1: Push Code to GitHub
If you haven't already initialized git:
```bash
git init
git add .
git commit -m "Initial commit"
# Create a new repo on GitHub and follow instructions to push
git remote add origin <your-repo-url>
git push -u origin main
```

## Step 2: Deploy on Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Select your GitHub repository (`laundry-pos` or whatever you named it).
4. Vercel will auto-detect **Vite** as the framework.
5. Click **Deploy**.
   - *Wait ~1 minute for the build to finish.*

## Step 3: Connect Your Domain
1. Once deployed, go to the project dashboard on Vercel.
2. Click **Settings** -> **Domains**.
3. Enter your custom domain (e.g., `dobi-laundry.com`) and click **Add**.
4. Vercel will provide you with DNS records to add to your domain provider (e.g., GoDaddy, Namecheap).
   - Typically, you will set an **A Record** pointing to `76.76.21.21`.
   - Or a **CNAME** for `www` pointing to `cname.vercel-dns.com`.
5. Once added, wait for propagation (usually fast, but can take up to 24h).

## Manual Build (Alternative)
If you do not want to use GitHub, you can deploy manually using the Vercel CLI:
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```
