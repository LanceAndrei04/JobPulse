# JobPulse

**Developer job-market intelligence, not another job board.**

JobPulse collects developer job postings and turns them into explorable market signals — skill demand, salary patterns, technology relationships, and geographic concentration — instead of listing jobs to apply to.

> What do current developer job postings appear to tell us about the market?

**Live demo:** [https://your-jobpulse-domain.vercel.app](https://job-pulse-umber.vercel.app/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Data Pipeline](#data-pipeline)
- [Confidence & Data Limitations](#confidence--data-limitations)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## Overview

Traditional job boards are optimized around individual listings. JobPulse is optimized around market understanding — it answers questions like:

- Which skills appear most frequently in the collected dataset?
- Which technologies tend to appear together?
- What roles commonly require a specific skill?
- Which tracked skills have the highest estimated salaries?
- Where are certain skills or roles geographically concentrated?

Every metric in JobPulse is presented alongside its sample size and comparison baseline — the goal is honest, explorable signal, not database statistics dressed up as certainty.

## Features

**Market Overview**
Dataset-level snapshot: total postings analyzed, tracked skills, most frequently detected skills, highest-paying skills, top roles, and geographic concentration.

**Skill Intelligence**
Search any tracked skill (React, Python, AWS, Docker, ...) to see:

- Market presence — how often it's detected in the dataset
- Role alignment — which roles it appears in most
- Skill ecosystem — which skills co-occur with it, and how strongly
- Compensation position — estimated salary vs. dataset baseline
- Geographic context — where matching postings concentrate

**Role Intelligence**
The same analysis from the role's perspective — opportunity volume, skill profile (grouped by category), compensation, and geography for roles like Backend Developer, DevOps Engineer, or AI Engineer.

**Entity Search**
Deterministic search across tracked skills and roles only — no job-listing search, no natural-language queries in the MVP. Selecting a result opens its intelligence page directly.

## Tech Stack

| Layer       | Technology                                                              |
| ----------- | ----------------------------------------------------------------------- |
| Frontend    | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, Recharts |
| Backend     | Next.js Route Handlers, service/repository architecture, Prisma ORM     |
| Database    | PostgreSQL (Neon in production)                                         |
| Data source | Adzuna Jobs API                                                         |
| Infra       | Docker (local), Vercel (hosting + cron)                                 |

## Architecture

```
UI → API / data layer → Service → Repository → Prisma → PostgreSQL
```

Presentation components consume typed domain models rather than Prisma-generated types directly, keeping the UI decoupled from the database schema.

**Core data models:** `JobPosting`, `Skill`, `JobPostingSkill` (many-to-many), `FetchLog`.

## Data Pipeline

```
Adzuna API → Ingestion → Normalization → PostgreSQL
→ Skill detection → Job↔Skill relationships → Role classification
→ Aggregation → Market intelligence → Visualization
```

- Jobs are deduplicated using `source + externalId`.
- Skills are detected from job titles/descriptions against a maintained catalog (categories: language, framework, library, database, cloud, DevOps, tool, testing, mobile, AI, other), with special handling for terms like `C`, `C++`, and `C#` where naive matching fails.
- Skill co-occurrence and role association are calculated as proportions (e.g. postings with Skill A _and_ B ÷ postings with Skill A), not absolute counts.

## Confidence & Data Limitations

Adzuna descriptions may be truncated, some salary figures may be estimated rather than employer-supplied, and the ingestion strategy shapes what's in the sample. JobPulse never claims to represent the whole U.S. developer market — it uses language like _detected_, _estimated_, and _current dataset_, and gates interpretive statements behind minimum sample sizes:

| Observations | Label          |
| ------------ | -------------- |
| 0–4          | Insufficient   |
| 5–14         | Limited sample |
| 15–29        | Directional    |
| 30+          | Supported      |

Salary comparisons require 10+ observations for a limited-confidence read and 30+ to be eligible for cross-skill comparison. These are product heuristics, not statistical confidence intervals.

## Getting Started

### Prerequisites

- Node.js
- npm
- Docker Desktop

### Setup

```bash
git clone https://github.com/LanceAndrei04/JobPulse.git
cd JobPulse
npm install
```

Create a `.env` file (see [Environment Variables](#environment-variables) below), then:

```bash
docker compose up -d          # start local PostgreSQL
npx prisma migrate dev        # apply migrations
npx prisma generate           # generate Prisma client
npm run dev                   # start dev server
```

Open [http://localhost:3000](http://localhost:3000).

Inspect the local database visually with:

```bash
npx prisma studio
```

## Environment Variables

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/jobpulse"

ADZUNA_APP_ID="your_adzuna_app_id"
ADZUNA_APP_KEY="your_adzuna_app_key"

ADMIN_API_SECRET="your_admin_secret"
CRON_SECRET="your_cron_secret"

INGEST_PAGES_PER_KEYWORD=3
INGEST_DAILY_KEYWORD_LIMIT=5
```

Never commit real secrets. `DATABASE_URL`, `ADZUNA_APP_KEY`, `ADMIN_API_SECRET`, and `CRON_SECRET` must stay server-side and must never use the `NEXT_PUBLIC_` prefix — they protect ingestion, skill-seeding, and other administrative endpoints.

## Deployment

```
GitHub → Vercel → Next.js → Neon PostgreSQL
```

Production secrets are set through Vercel's Environment Variables UI, not committed files. Scheduled ingestion runs via Vercel Cron.

## Roadmap

JobPulse is intentionally scoped as an MVP. Planned areas of expansion:

- **AI interpretation layer** — natural-language summaries and search _on top of_ deterministic analytics (AI explains evidence, never invents it)
- **Historical trends** — time-series demand, salary movement, and skill momentum
- **Skill relationship graph** — interactive co-occurrence network
- **Improved role/skill classification** — embeddings, alias resolution, synonym detection
- **Richer salary analytics** — medians, percentile bands, location/seniority adjustment
- **Additional data sources** — beyond Adzuna, with source provenance retained

---

Built by [Lance Andrei](https://github.com/LanceAndrei04) · [LinkedIn](https://linkedin.com/in/lance-andrei-espina)
