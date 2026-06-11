# traveloop-qwen-ver-proto


# TRAVELOOP — HACKATHON MASTER PLAN
> Complete blueprint: Tech stack, architecture, DB schema, API design, git workflow, and full AI agent prompt.

---

## PART 1: THE MASTER PLAN

---

### 1. TECH STACK

#### Frontend
| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 + Vite | Fast HMR, modern, team-friendly |
| Routing | React Router v6 | Declarative, nested routes |
| State Management | Zustand | Lightweight, no boilerplate |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| UI Components | shadcn/ui (local, no CDN needed) | Accessible, unstyled base |
| Charts | Recharts | Works offline, React-native |
| Icons | Lucide React | Tree-shakeable, consistent |
| HTTP Client | Axios | Interceptors for auth tokens |
| Form Handling | React Hook Form + Zod | Validation + type safety |
| Date Handling | date-fns | Lightweight, no moment.js |
| Drag & Drop | @dnd-kit/core | Reorder itinerary stops |
| Toast / Alerts | react-hot-toast | Simple, lightweight |

#### Backend
| Layer | Choice | Reason |
|---|---|---|
| Runtime | Node.js 20 LTS | Stable, team knows it |
| Framework | Express.js | Minimal, flexible |
| ORM | Sequelize | MySQL compatible, migrations |
| Database | MySQL 8.x (local) | Required by spec |
| Auth | JWT (jsonwebtoken) + bcrypt | No third-party auth service |
| Validation | express-validator | Server-side input validation |
| File Uploads | Multer + local disk storage | Profile/cover photo, no cloud |
| Environment | dotenv | Config management |
| Dev Server | nodemon | Auto-restart on changes |
| CORS | cors | Frontend-backend communication |
| Rate Limiting | express-rate-limit | Basic DoS protection |
| Logging | morgan | HTTP request logging |

#### Tooling & Dev
| Tool | Purpose |
|---|---|
| Git + GitHub | Version control, 4 member branching |
| ESLint + Prettier | Code style consistency across team |
| Concurrently | Run frontend + backend together |
| MySQL Workbench | DB visualization for team |
| Postman | API testing during development |

---

### 2. PROJECT ARCHITECTURE

```
traveloop/
├── client/                         # React + Vite frontend
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/                    # Axios instances + API call functions
│   │   │   ├── axiosInstance.js    # Base axios with auth interceptor
│   │   │   ├── auth.api.js
│   │   │   ├── trips.api.js
│   │   │   ├── cities.api.js
│   │   │   ├── activities.api.js
│   │   │   └── budget.api.js
│   │   ├── components/             # Reusable UI components
│   │   │   ├── common/             # Button, Input, Modal, Card, Badge
│   │   │   ├── layout/             # Navbar, Sidebar, PageWrapper
│   │   │   ├── trips/              # TripCard, TripForm, StopCard
│   │   │   ├── itinerary/          # ItineraryBuilder, DayBlock, ActivityCard
│   │   │   ├── budget/             # BudgetChart, CostBreakdown
│   │   │   └── shared/             # PublicItineraryView
│   │   ├── pages/                  # One file per screen
│   │   │   ├── Auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── SignupPage.jsx
│   │   │   ├── Dashboard/
│   │   │   │   └── DashboardPage.jsx
│   │   │   ├── Trips/
│   │   │   │   ├── MyTripsPage.jsx
│   │   │   │   ├── CreateTripPage.jsx
│   │   │   │   └── TripDetailPage.jsx
│   │   │   ├── Itinerary/
│   │   │   │   ├── ItineraryBuilderPage.jsx
│   │   │   │   └── ItineraryViewPage.jsx
│   │   │   ├── Search/
│   │   │   │   ├── CitySearchPage.jsx
│   │   │   │   └── ActivitySearchPage.jsx
│   │   │   ├── Budget/
│   │   │   │   └── BudgetPage.jsx
│   │   │   ├── Packing/
│   │   │   │   └── PackingPage.jsx
│   │   │   ├── Notes/
│   │   │   │   └── NotesPage.jsx
│   │   │   ├── Profile/
│   │   │   │   └── ProfilePage.jsx
│   │   │   ├── Public/
│   │   │   │   └── PublicItineraryPage.jsx
│   │   │   └── Admin/
│   │   │       └── AdminDashboard.jsx
│   │   ├── store/                  # Zustand stores
│   │   │   ├── authStore.js
│   │   │   ├── tripStore.js
│   │   │   └── uiStore.js
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useTrips.js
│   │   │   └── useDebounce.js
│   │   ├── utils/                  # Pure helper functions
│   │   │   ├── formatDate.js
│   │   │   ├── formatCurrency.js
│   │   │   ├── errorHandler.js
│   │   │   └── constants.js
│   │   ├── router/
│   │   │   └── AppRouter.jsx       # All routes + ProtectedRoute wrapper
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                         # Express.js backend
│   ├── config/
│   │   ├── db.js                   # Sequelize connection
│   │   └── multer.js               # File upload config
│   ├── models/                     # Sequelize models
│   │   ├── index.js                # Model loader + associations
│   │   ├── User.js
│   │   ├── Trip.js
│   │   ├── Stop.js
│   │   ├── Activity.js
│   │   ├── TripActivity.js         # Junction table
│   │   ├── City.js
│   │   ├── CityActivity.js         # Pre-seeded activities per city
│   │   ├── PackingItem.js
│   │   ├── Note.js
│   │   └── SharedTrip.js
│   ├── routes/                     # Express routers
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── trip.routes.js
│   │   ├── stop.routes.js
│   │   ├── activity.routes.js
│   │   ├── city.routes.js
│   │   ├── budget.routes.js
│   │   ├── packing.routes.js
│   │   ├── notes.routes.js
│   │   ├── share.routes.js
│   │   └── admin.routes.js
│   ├── controllers/                # Business logic per route group
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── trip.controller.js
│   │   ├── stop.controller.js
│   │   ├── activity.controller.js
│   │   ├── city.controller.js
│   │   ├── budget.controller.js
│   │   ├── packing.controller.js
│   │   ├── notes.controller.js
│   │   ├── share.controller.js
│   │   └── admin.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js      # JWT verify middleware
│   │   ├── admin.middleware.js     # Admin role check
│   │   ├── validate.middleware.js  # express-validator error handler
│   │   └── error.middleware.js     # Global error handler
│   ├── validators/                 # express-validator rule sets
│   │   ├── auth.validator.js
│   │   ├── trip.validator.js
│   │   └── stop.validator.js
│   ├── seeders/                    # One-time DB seed scripts
│   │   ├── cities.seeder.js        # 100+ pre-loaded cities
│   │   └── activities.seeder.js    # Activities per city
│   ├── migrations/                 # Sequelize migration files
│   ├── uploads/                    # Local file storage
│   │   ├── avatars/
│   │   └── covers/
│   ├── utils/
│   │   ├── jwtHelper.js
│   │   ├── responseHelper.js       # Standardized API responses
│   │   └── budgetCalculator.js
│   ├── app.js                      # Express app setup
│   ├── server.js                   # HTTP server entry point
│   ├── .env
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json                    # Root: concurrently script
```

---

### 3. DATABASE SCHEMA (MySQL)

#### Tables and Relationships

```sql
-- USERS
CREATE TABLE users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,           -- bcrypt hash
  avatar_url  VARCHAR(255) DEFAULT NULL,
  role        ENUM('user','admin') DEFAULT 'user',
  language    VARCHAR(10) DEFAULT 'en',
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- CITIES (pre-seeded, ~100+ cities globally)
CREATE TABLE cities (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  country      VARCHAR(100) NOT NULL,
  region       VARCHAR(100),
  description  TEXT,
  cost_index   DECIMAL(5,2),                  -- avg daily cost in USD
  popularity   INT DEFAULT 0,                 -- 1-100 score
  image_url    VARCHAR(255),
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TRIPS
CREATE TABLE trips (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  user_id      INT NOT NULL,
  title        VARCHAR(200) NOT NULL,
  description  TEXT,
  cover_url    VARCHAR(255),
  start_date   DATE NOT NULL,
  end_date     DATE NOT NULL,
  total_budget DECIMAL(10,2) DEFAULT 0,
  currency     VARCHAR(10) DEFAULT 'USD',
  is_public    BOOLEAN DEFAULT FALSE,
  share_token  VARCHAR(64) UNIQUE DEFAULT NULL, -- for public URL
  status       ENUM('planning','ongoing','completed') DEFAULT 'planning',
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- STOPS (cities within a trip, ordered)
CREATE TABLE stops (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  trip_id      INT NOT NULL,
  city_id      INT NOT NULL,
  order_index  INT NOT NULL DEFAULT 0,         -- for reordering
  arrive_date  DATE NOT NULL,
  depart_date  DATE NOT NULL,
  notes        TEXT,
  est_stay_cost DECIMAL(10,2) DEFAULT 0,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
  FOREIGN KEY (city_id) REFERENCES cities(id)
);

-- CITY_ACTIVITIES (pre-seeded activities available in each city)
CREATE TABLE city_activities (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  city_id       INT NOT NULL,
  name          VARCHAR(200) NOT NULL,
  category      ENUM('sightseeing','food','adventure','culture','shopping','nightlife','nature','wellness') NOT NULL,
  description   TEXT,
  est_duration  FLOAT,                          -- hours
  est_cost      DECIMAL(8,2) DEFAULT 0,
  image_url     VARCHAR(255),
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

-- STOP_ACTIVITIES (activities added to a specific stop)
CREATE TABLE stop_activities (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  stop_id           INT NOT NULL,
  city_activity_id  INT,                        -- NULL if custom activity
  custom_name       VARCHAR(200),               -- for user-added custom activities
  custom_cost       DECIMAL(8,2),
  custom_duration   FLOAT,
  scheduled_date    DATE,
  scheduled_time    TIME,
  notes             TEXT,
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (stop_id) REFERENCES stops(id) ON DELETE CASCADE,
  FOREIGN KEY (city_activity_id) REFERENCES city_activities(id) ON DELETE SET NULL
);

-- PACKING_ITEMS
CREATE TABLE packing_items (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  trip_id    INT NOT NULL,
  name       VARCHAR(200) NOT NULL,
  category   ENUM('clothing','documents','electronics','toiletries','medicine','food','other') DEFAULT 'other',
  is_packed  BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

-- TRIP_NOTES
CREATE TABLE trip_notes (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  trip_id    INT NOT NULL,
  stop_id    INT DEFAULT NULL,                  -- NULL = general trip note
  content    TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
  FOREIGN KEY (stop_id) REFERENCES stops(id) ON DELETE SET NULL
);

-- SAVED_DESTINATIONS (user wishlist)
CREATE TABLE saved_destinations (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  city_id    INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_city (user_id, city_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);
```

#### Entity Relationship Summary
```
users ──< trips ──< stops ──< stop_activities
                         └──  city_activities (many-to-many via stop_activities)
cities ──< city_activities
cities ──< stops (trip stops reference a city)
trips ──< packing_items
trips ──< trip_notes ──> stops (optional)
users ──< saved_destinations ──> cities
```

---

### 4. COMPLETE API DESIGN

All responses follow this standard envelope:
```json
{ "success": true, "data": {}, "message": "OK" }
{ "success": false, "error": "Validation failed", "details": [] }
```

#### AUTH — /api/auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /register | ❌ | Create account |
| POST | /login | ❌ | Login, get JWT |
| POST | /logout | ✅ | Invalidate client token |
| GET | /me | ✅ | Get logged-in user info |
| POST | /forgot-password | ❌ | Send reset (email-less: return token) |
| POST | /reset-password | ❌ | Reset with token |

#### USERS — /api/users
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /:id | ✅ | Get user profile |
| PUT | /:id | ✅ | Update name, language |
| PUT | /:id/avatar | ✅ | Upload profile photo (multipart) |
| DELETE | /:id | ✅ | Delete account (soft delete) |
| GET | /:id/saved-destinations | ✅ | Get saved cities |
| POST | /:id/saved-destinations | ✅ | Save a city |
| DELETE | /:id/saved-destinations/:cityId | ✅ | Remove saved city |

#### TRIPS — /api/trips
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | / | ✅ | Get all trips for logged-in user |
| POST | / | ✅ | Create new trip |
| GET | /:id | ✅ | Get trip detail with stops |
| PUT | /:id | ✅ | Update trip metadata |
| DELETE | /:id | ✅ | Delete trip + cascades |
| PUT | /:id/cover | ✅ | Upload cover photo |
| POST | /:id/share | ✅ | Generate/toggle public share token |
| GET | /:id/export | ✅ | Export itinerary as JSON |

#### STOPS — /api/trips/:tripId/stops
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | / | ✅ | Get all stops for a trip |
| POST | / | ✅ | Add stop (city + dates) |
| PUT | /:stopId | ✅ | Update stop dates/notes |
| DELETE | /:stopId | ✅ | Remove stop |
| PUT | /reorder | ✅ | Reorder stops (send ordered id array) |

#### STOP ACTIVITIES — /api/stops/:stopId/activities
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | / | ✅ | Get activities for a stop |
| POST | / | ✅ | Add activity to stop |
| PUT | /:actId | ✅ | Update scheduled time/date/notes |
| DELETE | /:actId | ✅ | Remove activity from stop |

#### CITIES — /api/cities
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | / | ❌ | List/search cities (query, country, region) |
| GET | /:id | ❌ | Get city detail |
| GET | /:id/activities | ❌ | Get activities available in city |

#### ACTIVITIES — /api/activities
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | / | ❌ | Search activities (category, cost, duration, city) |
| GET | /:id | ❌ | Get single activity detail |

#### BUDGET — /api/trips/:tripId/budget
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | / | ✅ | Get full budget breakdown |
| PUT | /budget | ✅ | Update trip total budget cap |

Budget response shape:
```json
{
  "totalBudget": 2000,
  "totalEstimated": 1750,
  "remaining": 250,
  "isOverBudget": false,
  "breakdownByStop": [
    { "city": "Paris", "activities": 200, "estimated": 200 }
  ],
  "breakdownByCategory": {
    "activities": 450,
    "accommodation": 800,
    "other": 500
  },
  "avgCostPerDay": 125
}
```

#### PACKING — /api/trips/:tripId/packing
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | / | ✅ | Get all packing items |
| POST | / | ✅ | Add item |
| PUT | /:itemId | ✅ | Update name/category/packed status |
| DELETE | /:itemId | ✅ | Delete item |
| DELETE | / | ✅ | Reset (uncheck all items) |

#### NOTES — /api/trips/:tripId/notes
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | / | ✅ | Get all notes (optionally filter by stopId) |
| POST | / | ✅ | Add note |
| PUT | /:noteId | ✅ | Update note |
| DELETE | /:noteId | ✅ | Delete note |

#### PUBLIC SHARE — /api/share
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /:token | ❌ | View public itinerary by share token |
| POST | /:token/copy | ✅ | Copy shared trip to own account |

#### ADMIN — /api/admin
| Method | Endpoint | Auth (Admin) | Description |
|---|---|---|---|
| GET | /stats | ✅ | Platform overview stats |
| GET | /users | ✅ | Paginated user list |
| DELETE | /users/:id | ✅ | Deactivate user |
| GET | /trips | ✅ | All trips data |
| GET | /cities/popular | ✅ | Most added cities |
| GET | /activities/popular | ✅ | Most added activities |

---

### 5. GIT WORKFLOW — 4 MEMBERS

#### Branch Strategy: Git Flow (simplified)

```
main          ← production-ready only
  └── dev     ← integration branch (all features merge here first)
        ├── feature/auth-and-user
        ├── feature/trips-and-stops
        ├── feature/itinerary-builder
        ├── feature/budget-and-charts
        ├── feature/packing-and-notes
        ├── feature/city-search
        ├── feature/public-share
        └── feature/admin-dashboard
```

#### Team Split (Recommended)

| Member | Ownership | Branches |
|---|---|---|
| Member 1 | Backend lead: DB schema, auth, user, trip APIs + seeder scripts | feature/auth-and-user, feature/trips-and-stops |
| Member 2 | Backend: itinerary, budget, packing, notes APIs | feature/itinerary-builder, feature/budget-packing-notes |
| Member 3 | Frontend lead: Auth pages, Dashboard, Trip CRUD, Navigation | feature/frontend-auth-dashboard, feature/frontend-trips |
| Member 4 | Frontend: Itinerary builder, Budget charts, Public share, Admin | feature/frontend-itinerary, feature/frontend-budget-admin |

#### Commit Convention
```
feat: add stop reordering endpoint
fix: correct JWT expiry header bug
chore: seed 100 cities into DB
refactor: extract budget calculator to util
docs: update API endpoints in README
```

#### PR Rules
- Every PR must target `dev`, not `main`
- At least 1 team member must review before merge
- `main` ← `dev` only at stable checkpoints (end of day builds)

---

### 6. FEATURE-BY-FEATURE DETAILED BREAKDOWN

#### F1 — Authentication
- Registration: name, email, password (min 8 chars, 1 special)
- Login: email + password → JWT (7d expiry) stored in localStorage
- Protected routes: ProtectedRoute component wraps all authenticated pages
- Password reset: generate reset token, store in DB with expiry, no email needed (display token/link on screen for hackathon)
- Auth errors: "Invalid credentials", "Email already registered", field-level validation

#### F2 — Dashboard
- Welcome block with user name
- 3 quick-action cards: Plan New Trip, My Trips, City Search
- Recent trips (last 3): name, date range, status badge
- Recommended cities: carousel of 6 popular cities from DB (sorted by popularity)
- Budget highlights: Total spent across all trips

#### F3 — Create / Edit Trip
- Form fields: title, description, start date, end date, total budget, currency (USD/INR/EUR), cover photo upload
- Date validation: end date must be after start date
- Cover photo stored in /server/uploads/covers/ as UUID-named file

#### F4 — My Trips
- Card grid showing all user trips
- Each card: cover photo, title, date range, number of stops, status badge
- Actions: View, Edit, Delete (with confirmation modal)
- Empty state: illustration + "Plan your first trip" CTA

#### F5 — Itinerary Builder
- Left panel: list of stops in order_index order, drag to reorder
- Add Stop modal: city search autocomplete, arrive/depart dates
- Each stop expanded: shows its activities list
- Activity panel: search city activities by category, add to stop
- Reorder via @dnd-kit, sends PATCH /reorder with new id array
- Date validation: stop dates must be within trip dates

#### F6 — Itinerary View
- Two view modes: Timeline view (chronological, day blocks) and List view (grouped by city)
- Each day block shows: date header, city name, activity cards with time/cost
- Color-coded by activity category
- Toggle between view modes in the top bar

#### F7 — City Search
- Search bar with debounce (300ms)
- Filter chips: country, region, cost range
- City cards: name, country, cost index badge, popularity stars, "Add to Trip" dropdown
- City detail modal: description, cost breakdown, available activities preview
- Save to wishlist button (heart icon)

#### F8 — Activity Search
- Filter bar: category chips, cost range slider, duration range
- Activity cards: image, name, category badge, cost, duration, "Add to Stop" button
- Add to Stop: opens stop selector dropdown (which stop in which trip)
- Custom activity form: add an activity not in DB (custom name, cost, duration)

#### F9 — Budget & Cost Breakdown
- Summary cards: Total Budget, Estimated Cost, Remaining, Over/Under indicator
- Pie chart: breakdown by category (activities, accommodation, other)
- Bar chart: cost per stop/city
- Table: line-item list by stop with activity costs
- Over-budget alert: red banner if estimated > budget
- Avg cost per day metric

#### F10 — Packing Checklist
- Grouped by category tabs: All, Clothing, Documents, Electronics, etc.
- Checkbox items, checked = strikethrough style
- Add new item form inline
- Progress bar: X of Y items packed
- Reset button: uncheck all (with confirmation)
- Delete individual items

#### F11 — Public Share
- Toggle "Make Public" on trip settings → generates UUID share token
- Shareable URL: /share/:token
- Public page: read-only itinerary view, no auth required
- "Copy This Trip" button (must be logged in) → clones entire trip to user account
- Social share: just copies URL to clipboard (no external API)

#### F12 — User Profile / Settings
- Editable: name, language preference
- Avatar upload (stored locally)
- Saved destinations list with remove option
- Account deletion with confirmation ("Type your email to confirm")
- Shows join date, total trips count

#### F13 — Trip Notes / Journal
- Tab inside each trip: per-trip notes + per-stop notes
- Rich text: simple textarea (no TipTap needed for hackathon)
- Note cards sorted by newest first
- Each note shows: content, associated stop (if any), timestamp
- Edit inline, delete with confirmation

#### F14 — Admin Dashboard (Bonus)
- Accessible only if user.role === 'admin'
- Stats cards: Total Users, Total Trips, Trips This Week, Public Trips
- Top 10 most visited cities (bar chart)
- User table: name, email, trip count, join date, deactivate button
- All trips table with filters

---

### 7. ERROR HANDLING STRATEGY

#### Backend
- Global error middleware catches all unhandled errors
- Custom AppError class with statusCode + message
- Validation errors: return 422 with field-level details array
- Auth errors: 401 (not authenticated), 403 (not authorized)
- Not found: 404 with resource name in message
- DB constraint errors: caught and mapped to human-readable messages
- File upload errors: size limit (2MB), type check (jpg/png only)

#### Frontend
- Axios interceptor: catches 401 → auto logout + redirect to login
- React Hook Form: inline field errors before submit
- API errors: extracted and shown via react-hot-toast
- Empty states: every list page has a friendly empty state
- Loading states: skeleton loaders on all data-fetching pages
- Network errors: offline detection banner at top of screen

---

## PART 2: AI AGENT PROMPT

> Copy everything below this line and give it to the AI coding agent.

---

# ═══════════════════════════════════════════════════════════
# TRAVELOOP — COMPLETE PROJECT BUILD PROMPT FOR AI AGENT
# ═══════════════════════════════════════════════════════════

## CONTEXT AND OBJECTIVE

You are an expert full-stack developer. Build **Traveloop**, a complete offline-first travel planning web application from scratch for a hackathon. The project must be production-quality with clean, scalable, well-commented code. Do not skip any feature, do not leave placeholder comments — write complete working code for every file.

---

## ABSOLUTE CONSTRAINTS

1. **Database**: MySQL 8.x ONLY. Use Sequelize ORM for all DB interaction. No MongoDB, no Firebase, no Supabase, no Atlas, no cloud DB of any kind.
2. **Offline-first**: The app must run entirely locally. No external API calls except those explicitly listed. No map APIs. No payment APIs. No email sending services.
3. **Auth**: JWT + bcrypt only. No Passport.js. No OAuth. No Auth0.
4. **File storage**: Local disk via Multer. No AWS S3, no Cloudinary, no CDN.
5. **Code quality**: ESLint configured. Every file neatly organized per the folder structure. No spaghetti. No god files over 200 lines unless absolutely necessary.
6. **Error handling**: Every API endpoint must have try/catch. Every frontend API call must handle errors gracefully with user-facing messages.
7. **Git-ready**: Write code with clear module boundaries so 4 developers working on separate feature branches don't create conflicts. Separate concerns strictly.
8. **No code omissions**: Write complete implementations. Do not write "// TODO: implement this". Do not write stub functions.

---

## TECH STACK (EXACT VERSIONS — DO NOT DEVIATE)

### Backend (in /server)
```
Node.js 20 LTS
Express.js ^4.18
Sequelize ^6.35
mysql2 ^3.6
bcryptjs ^2.4
jsonwebtoken ^9.0
express-validator ^7.0
multer ^1.4
cors ^2.8
dotenv ^16.3
morgan ^1.10
express-rate-limit ^7.1
nodemon ^3.0 (devDependency)
```

### Frontend (in /client)
```
React 18
Vite ^5.0
React Router DOM ^6.20
Zustand ^4.4
Tailwind CSS ^3.3
@tailwindcss/forms ^0.5
Axios ^1.6
React Hook Form ^7.48
Zod ^3.22
@hookform/resolvers ^3.3
date-fns ^2.30
Recharts ^2.9
Lucide React ^0.294
React Hot Toast ^2.4
@dnd-kit/core ^6.1
@dnd-kit/sortable ^8.0
```

---

## FOLDER STRUCTURE

Create this EXACT folder structure:

```
traveloop/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axiosInstance.js
│   │   │   ├── auth.api.js
│   │   │   ├── trips.api.js
│   │   │   ├── stops.api.js
│   │   │   ├── activities.api.js
│   │   │   ├── cities.api.js
│   │   │   ├── budget.api.js
│   │   │   ├── packing.api.js
│   │   │   ├── notes.api.js
│   │   │   ├── share.api.js
│   │   │   └── admin.api.js
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Skeleton.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── ConfirmDialog.jsx
│   │   │   │   └── OfflineBanner.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── PageWrapper.jsx
│   │   │   ├── trips/
│   │   │   │   ├── TripCard.jsx
│   │   │   │   └── TripForm.jsx
│   │   │   ├── itinerary/
│   │   │   │   ├── StopCard.jsx
│   │   │   │   ├── ActivityCard.jsx
│   │   │   │   ├── DayBlock.jsx
│   │   │   │   └── SortableStop.jsx
│   │   │   ├── budget/
│   │   │   │   ├── BudgetSummary.jsx
│   │   │   │   ├── BudgetPieChart.jsx
│   │   │   │   └── BudgetBarChart.jsx
│   │   │   └── packing/
│   │   │       └── PackingItem.jsx
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── SignupPage.jsx
│   │   │   ├── Dashboard/
│   │   │   │   └── DashboardPage.jsx
│   │   │   ├── Trips/
│   │   │   │   ├── MyTripsPage.jsx
│   │   │   │   ├── CreateTripPage.jsx
│   │   │   │   └── TripDetailPage.jsx
│   │   │   ├── Itinerary/
│   │   │   │   ├── ItineraryBuilderPage.jsx
│   │   │   │   └── ItineraryViewPage.jsx
│   │   │   ├── Search/
│   │   │   │   ├── CitySearchPage.jsx
│   │   │   │   └── ActivitySearchPage.jsx
│   │   │   ├── Budget/
│   │   │   │   └── BudgetPage.jsx
│   │   │   ├── Packing/
│   │   │   │   └── PackingPage.jsx
│   │   │   ├── Notes/
│   │   │   │   └── NotesPage.jsx
│   │   │   ├── Profile/
│   │   │   │   └── ProfilePage.jsx
│   │   │   ├── Public/
│   │   │   │   └── PublicItineraryPage.jsx
│   │   │   └── Admin/
│   │   │       └── AdminDashboard.jsx
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   ├── tripStore.js
│   │   │   └── uiStore.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useTrips.js
│   │   │   └── useDebounce.js
│   │   ├── utils/
│   │   │   ├── formatDate.js
│   │   │   ├── formatCurrency.js
│   │   │   ├── errorHandler.js
│   │   │   └── constants.js
│   │   ├── router/
│   │   │   └── AppRouter.jsx
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/
│   ├── config/
│   │   ├── db.js
│   │   └── multer.js
│   ├── models/
│   │   ├── index.js
│   │   ├── User.js
│   │   ├── Trip.js
│   │   ├── Stop.js
│   │   ├── City.js
│   │   ├── CityActivity.js
│   │   ├── StopActivity.js
│   │   ├── PackingItem.js
│   │   ├── TripNote.js
│   │   └── SavedDestination.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── trip.routes.js
│   │   ├── stop.routes.js
│   │   ├── activity.routes.js
│   │   ├── city.routes.js
│   │   ├── budget.routes.js
│   │   ├── packing.routes.js
│   │   ├── notes.routes.js
│   │   ├── share.routes.js
│   │   └── admin.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── trip.controller.js
│   │   ├── stop.controller.js
│   │   ├── activity.controller.js
│   │   ├── city.controller.js
│   │   ├── budget.controller.js
│   │   ├── packing.controller.js
│   │   ├── notes.controller.js
│   │   ├── share.controller.js
│   │   └── admin.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── admin.middleware.js
│   │   ├── validate.middleware.js
│   │   └── error.middleware.js
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── trip.validator.js
│   │   └── stop.validator.js
│   ├── seeders/
│   │   ├── cities.seeder.js
│   │   └── activities.seeder.js
│   ├── utils/
│   │   ├── jwtHelper.js
│   │   ├── responseHelper.js
│   │   └── budgetCalculator.js
│   ├── uploads/
│   │   ├── avatars/
│   │   └── covers/
│   ├── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

---

## DATABASE: EXACT SQL SCHEMA

Use Sequelize `sync({ force: false })` in development and define all models precisely. Here is the complete schema to replicate in Sequelize models:

```sql
-- Users
id INT PK AUTO_INCREMENT
name VARCHAR(100) NOT NULL
email VARCHAR(150) UNIQUE NOT NULL
password VARCHAR(255) NOT NULL  -- bcrypt hash, min rounds 12
avatar_url VARCHAR(255) NULL
role ENUM('user','admin') DEFAULT 'user'
language VARCHAR(10) DEFAULT 'en'
is_active BOOLEAN DEFAULT TRUE
created_at DATETIME
updated_at DATETIME

-- Cities (pre-seeded)
id INT PK AUTO_INCREMENT
name VARCHAR(100) NOT NULL
country VARCHAR(100) NOT NULL
region VARCHAR(100)
description TEXT
cost_index DECIMAL(5,2)   -- average daily cost in USD
popularity INT DEFAULT 0  -- 1 to 100
image_url VARCHAR(255)
created_at DATETIME

-- Trips
id INT PK AUTO_INCREMENT
user_id INT FK -> users.id CASCADE DELETE
title VARCHAR(200) NOT NULL
description TEXT
cover_url VARCHAR(255)
start_date DATE NOT NULL
end_date DATE NOT NULL
total_budget DECIMAL(10,2) DEFAULT 0
currency VARCHAR(10) DEFAULT 'USD'
is_public BOOLEAN DEFAULT FALSE
share_token VARCHAR(64) UNIQUE NULL
status ENUM('planning','ongoing','completed') DEFAULT 'planning'
created_at DATETIME
updated_at DATETIME

-- Stops
id INT PK AUTO_INCREMENT
trip_id INT FK -> trips.id CASCADE DELETE
city_id INT FK -> cities.id
order_index INT DEFAULT 0
arrive_date DATE NOT NULL
depart_date DATE NOT NULL
notes TEXT
est_stay_cost DECIMAL(10,2) DEFAULT 0
created_at DATETIME

-- CityActivities (pre-seeded per city)
id INT PK AUTO_INCREMENT
city_id INT FK -> cities.id CASCADE DELETE
name VARCHAR(200) NOT NULL
category ENUM('sightseeing','food','adventure','culture','shopping','nightlife','nature','wellness')
description TEXT
est_duration FLOAT   -- in hours
est_cost DECIMAL(8,2) DEFAULT 0
image_url VARCHAR(255)
created_at DATETIME

-- StopActivities
id INT PK AUTO_INCREMENT
stop_id INT FK -> stops.id CASCADE DELETE
city_activity_id INT FK -> city_activities.id SET NULL (nullable for custom)
custom_name VARCHAR(200)    -- used when city_activity_id is null
custom_cost DECIMAL(8,2)
custom_duration FLOAT
scheduled_date DATE
scheduled_time TIME
notes TEXT
created_at DATETIME

-- PackingItems
id INT PK AUTO_INCREMENT
trip_id INT FK -> trips.id CASCADE DELETE
name VARCHAR(200) NOT NULL
category ENUM('clothing','documents','electronics','toiletries','medicine','food','other') DEFAULT 'other'
is_packed BOOLEAN DEFAULT FALSE
created_at DATETIME

-- TripNotes
id INT PK AUTO_INCREMENT
trip_id INT FK -> trips.id CASCADE DELETE
stop_id INT FK -> stops.id SET NULL (nullable)
content TEXT NOT NULL
created_at DATETIME
updated_at DATETIME

-- SavedDestinations
id INT PK AUTO_INCREMENT
user_id INT FK -> users.id CASCADE DELETE
city_id INT FK -> cities.id CASCADE DELETE
UNIQUE(user_id, city_id)
created_at DATETIME
```

---

## SEEDER DATA REQUIREMENTS

### cities.seeder.js
Seed exactly **50 cities** from across the world. Include at minimum: Paris, Tokyo, New York, London, Dubai, Singapore, Rome, Barcelona, Sydney, Mumbai, Bangkok, Istanbul, Amsterdam, Berlin, Toronto, Cape Town, Mexico City, Buenos Aires, Seoul, Cairo, Vienna, Prague, Lisbon, Bali, Maldives, Santorini, Reykjavik, Marrakech, Nairobi, Kyoto, Hong Kong, Shanghai, Los Angeles, Miami, Chicago, Vancouver, Edinburgh, Athens, Budapest, Dubrovnik, Zurich, Florence, Venice, Seville, Hanoi, Ho Chi Minh City, Petra, Colombo, Kathmandu, Havana.

Each city must have: name, country, region (continent/area), description (2 sentences), cost_index (realistic USD per day average), popularity (1-100), image_url (just a placeholder path string like '/assets/cities/paris.jpg').

### activities.seeder.js
Seed at least **6 activities per city** across varied categories (sightseeing, food, adventure, culture, etc.). Each must have a realistic est_cost and est_duration.

---

## COMPLETE FEATURE SPECIFICATIONS

### FEATURE 1 — Authentication

**SignupPage.jsx**
- Form fields: Full Name, Email, Password, Confirm Password
- Validation (client-side via Zod): name min 2 chars, valid email format, password min 8 chars with at least 1 number and 1 special character, passwords match
- On submit: POST /api/auth/register
- On success: store JWT in localStorage, store user in Zustand authStore, redirect to /dashboard
- On error: show specific error from API (e.g. "Email already registered") via toast
- "Already have an account? Login" link to /login

**LoginPage.jsx**
- Form fields: Email, Password
- "Remember me" checkbox (just extends JWT to 30d if checked)
- On submit: POST /api/auth/login
- On success: store JWT + user in authStore, redirect to /dashboard
- On error: show "Invalid email or password" via toast — do NOT say which field was wrong
- "Forgot Password?" link opens a modal where user enters email and gets a reset token displayed on screen (no actual email sending needed for hackathon — just show the token in a box for demo purposes)
- "Don't have an account? Sign up" link

**JWT Handling**
- axiosInstance.js: Attach Authorization: Bearer <token> header to every request
- Interceptor: if response is 401, clear authStore, clear localStorage, redirect to /login with toast "Session expired. Please log in again."

**authStore.js (Zustand)**
```
state: { user: null, token: null, isAuthenticated: false }
actions: login(user, token), logout(), updateUser(updates)
persist: localStorage (token + user)
```

**ProtectedRoute**
In AppRouter.jsx, wrap all authenticated routes in a ProtectedRoute component that checks authStore.isAuthenticated. If false, redirect to /login with toast "Please log in to continue."

**AdminRoute**
Separate wrapper that also checks user.role === 'admin'. If not admin, redirect to /dashboard with toast "Access denied."

---

### FEATURE 2 — Dashboard

**DashboardPage.jsx**
- Welcome banner: "Welcome back, [name]! Ready to plan your next adventure?"
- 3 Quick Action cards (large, icon + label): "Plan New Trip" → /trips/new, "My Trips" → /trips, "Explore Cities" → /cities
- "Recent Trips" section: fetch last 3 trips (GET /api/trips?limit=3&sort=recent), display as TripCard components. If no trips, show EmptyState with "No trips yet. Start planning!" and a CTA button.
- "Popular Destinations" section: fetch GET /api/cities?sort=popular&limit=6. Display as a horizontal scroll of city cards with name, country, cost_index badge.
- "Budget Overview" section: show total estimated cost across all trips (sum from all trip budgets).
- Sidebar navigation (persistent for all authenticated pages): Dashboard, My Trips, Explore Cities, Activities, My Profile. Active state highlighted.

---

### FEATURE 3 — Create & Edit Trip

**CreateTripPage.jsx**
- TripForm component with: Trip Title (required), Description (optional, textarea), Start Date (date picker using native HTML input[type=date]), End Date (date picker), Total Budget (number input), Currency (select: USD, EUR, INR, GBP, JPY, AED), Cover Photo (file input, optional, image only, max 2MB)
- Client validation: title required, end date >= start date, budget >= 0
- On submit: POST /api/trips (multipart/form-data if cover photo provided, else JSON)
- On success: redirect to /trips/:id/build (itinerary builder)
- On error: show field-level errors + toast for API errors

**Edit Trip**: same TripForm, pre-filled, PUT /api/trips/:id on submit. Accessible from TripDetailPage.

---

### FEATURE 4 — My Trips

**MyTripsPage.jsx**
- Fetch GET /api/trips for logged-in user
- Display as responsive grid of TripCard components
- TripCard shows: cover photo (or gradient placeholder), trip title, date range formatted as "Jan 12 – Jan 19, 2025", number of stops badge, status badge (planning/ongoing/completed), budget vs estimated cost mini-bar
- Actions on each card: "View" button → /trips/:id, pencil icon → edit modal, trash icon → confirm delete dialog
- Delete: DELETE /api/trips/:id, optimistic UI update (remove from list immediately, restore on error)
- Sort options: Newest, Oldest, Upcoming, Completed
- Empty state: illustration + "You haven't planned any trips yet" + "Plan Your First Trip" button

---

### FEATURE 5 — Trip Detail Page

**TripDetailPage.jsx** (route: /trips/:id)
- Trip header: cover image, title, date range, description, status, budget summary
- Tab navigation within the page: Itinerary | Budget | Packing | Notes
- Each tab renders its respective page component inline
- Share button: toggle is_public, copies URL to clipboard if public
- Edit trip button → opens edit form modal
- Quick stop summary: "X cities, Y days total"

---

### FEATURE 6 — Itinerary Builder

**ItineraryBuilderPage.jsx** (route: /trips/:id/build)
- Left panel (1/3 width): list of stops, sorted by order_index
  - Each stop is a SortableStop component (drag handle icon on left)
  - Shows: city name, country, arrive_date – depart_date
  - Click stop to select/expand it in right panel
  - "Add Stop" button at bottom opens AddStopModal
  - Reorder via @dnd-kit: on drag end, send PUT /api/trips/:tripId/stops/reorder with new ordered array of stop IDs
- Right panel (2/3 width): selected stop detail
  - Stop header: city name, arrive–depart dates, est_stay_cost
  - Activities list for this stop
  - Each ActivityCard: activity name, category badge, est_cost, est_duration, scheduled_date+time (editable inline), delete button
  - "Add Activity" button → opens ActivitySearchModal
  - "Custom Activity" button → opens CustomActivityForm

**AddStopModal**
- City search input (debounced, calls GET /api/cities?search=X)
- City list results below
- Select city → show arrive/depart date pickers
- Validation: dates must fall within trip start/end range
- On submit: POST /api/trips/:tripId/stops

**ActivitySearchModal**
- Category filter chips: All | Sightseeing | Food | Adventure | Culture | Shopping | Nightlife | Nature | Wellness
- Shows city_activities for the currently selected stop's city
- Fetch: GET /api/cities/:cityId/activities?category=X
- Each result: name, category, est_cost, est_duration, "+ Add" button
- On add: POST /api/stops/:stopId/activities with city_activity_id

**CustomActivityForm**
- Fields: Activity Name, Cost (number), Duration (hours, number), Scheduled Date (within stop date range), Scheduled Time, Notes
- On submit: POST /api/stops/:stopId/activities with custom_name, custom_cost etc.

---

### FEATURE 7 — Itinerary View

**ItineraryViewPage.jsx** (route: /trips/:id/view)
- Toggle at top: "Timeline" vs "By City"
- Timeline view: chronological day-by-day blocks. Each DayBlock shows date as header (Monday, Jan 13), city name subtitle, then activity cards for that day sorted by scheduled_time. Activities with no scheduled time appear at bottom under "Unscheduled".
- By City view: grouped by stop (city). Each group has a city header with arrive-depart dates, then all activities for that stop.
- ActivityCard in view mode: name, time, cost displayed cleanly. Category shown as colored left border.
- Print-friendly CSS: @media print styling so user can print the itinerary.

---

### FEATURE 8 — City Search

**CitySearchPage.jsx** (route: /cities)
- Search bar at top (debounced 300ms), calls GET /api/cities?search=X&country=X&region=X&minCost=X&maxCost=X
- Filter panel (collapsible on mobile): Country dropdown (populated from unique countries in DB), Region chips (Asia, Europe, Americas, Africa, Middle East, Oceania), Cost range slider (0–500 USD/day)
- City grid: 3 columns desktop, 1 column mobile. Each city card: image_url placeholder or colored gradient, city name, country, cost_index badge ("~$120/day"), popularity stars, "View Details" button, heart icon (save/unsave to wishlist)
- City detail modal (on click): full description, cost_index, popularity, list of available activities (GET /api/cities/:id/activities), "Add to Trip" dropdown (shows user's trips in planning status)
- "Add to Trip" → opens AddStopModal pre-filled with that city

---

### FEATURE 9 — Activity Search

**ActivitySearchPage.jsx** (route: /activities)
- Header search bar: text search across all city_activities
- Category filter chips
- Cost range filter (slider: 0–500)
- Duration filter (0–12 hours)
- Fetch: GET /api/activities?search=X&category=X&minCost=X&maxCost=X&minDuration=X&maxDuration=X
- Results grid: ActivityCard showing image placeholder (colored by category), name, city name, category badge, est_cost, est_duration, "Add to Trip" button
- "Add to Trip" button: opens a modal where user selects which trip and which stop, then POSTs to /api/stops/:stopId/activities

---

### FEATURE 10 — Budget & Cost Breakdown

**BudgetPage.jsx** (nested inside TripDetailPage's tabs)
- Fetch: GET /api/trips/:id/budget
- BudgetSummary component: 4 stat cards — Total Budget (user-set), Estimated Cost (sum of all stop activities), Remaining (budget - estimated), Status ("On Track" in green or "Over Budget!" in red)
- BudgetPieChart: Recharts PieChart. Segments: Activities (sum of all stop activity costs), Other (est_stay_cost from stops). Legend below.
- BudgetBarChart: Recharts BarChart. X-axis: each city/stop. Y-axis: cost in currency. Bar = estimated cost for that stop.
- Cost breakdown table: rows per stop, columns: City, Days, Activity Costs, Stay Costs, Total
- Avg cost per day: total estimated / trip duration in days
- "Update Budget Cap" button: opens inline form to change total_budget field, PUT /api/trips/:id

---

### FEATURE 11 — Packing Checklist

**PackingPage.jsx** (nested inside TripDetailPage's tabs)
- Fetch GET /api/trips/:id/packing on load
- Progress bar at top: "X of Y items packed" (width = % packed)
- Category tabs: All | Clothing | Documents | Electronics | Toiletries | Medicine | Food | Other
- Items list: each PackingItem shows checkbox (toggle is_packed), item name (strikethrough if packed), category badge, delete button
- Add item form: inline at bottom — text input for name, category select, "Add" button → POST /api/trips/:id/packing
- "Reset All" button: confirmation dialog → DELETE /api/trips/:id/packing (uncheck all, don't delete items)
- Keyboard shortcut: pressing Enter in the name input submits the form

---

### FEATURE 12 — Trip Notes / Journal

**NotesPage.jsx** (nested inside TripDetailPage's tabs)
- Fetch GET /api/trips/:id/notes on load
- Note cards sorted newest first: content preview (first 100 chars), associated stop name (or "General" if stop_id null), timestamp formatted as "3 hours ago" / "Jan 12, 2025"
- "New Note" button: opens modal with textarea (full content), stop selector dropdown (optional — select which stop this note is for), submit button → POST /api/trips/:id/notes
- Click note card to expand full content with edit/delete options
- Edit: opens same modal pre-filled → PUT /api/trips/:id/notes/:noteId
- Delete: confirm dialog → DELETE /api/trips/:id/notes/:noteId

---

### FEATURE 13 — Public Share

**Share Toggle** (in TripDetailPage header)
- Toggle switch labeled "Make Public"
- On toggle ON: POST /api/trips/:id/share → returns share_token. Show "Trip is now public!" toast. Display shareable URL: http://localhost:5173/share/:token with a "Copy Link" button.
- On toggle OFF: POST /api/trips/:id/share (same endpoint, if already public it makes private, nulls share_token)

**PublicItineraryPage.jsx** (route: /share/:token, NO auth required)
- Fetch GET /api/share/:token
- If token invalid: show 404 "This itinerary does not exist or is no longer public."
- If valid: show read-only itinerary view (same as ItineraryViewPage but no edit controls)
- Trip header: cover, title, author name ("Planned by [user.name]"), date range, destinations list
- Itinerary in "By City" read-only view
- "Copy This Trip" button: if user is not logged in → redirect to /login with toast "Log in to copy this trip." If logged in → POST /api/share/:token/copy → redirects to the new cloned trip.

**Copy Trip Logic (backend)**
When POST /api/share/:token/copy is called:
1. Find the original trip by share_token
2. Create a new trip for the requesting user with same title, description, start_date, end_date, total_budget, currency (do NOT copy cover_url, is_public, share_token)
3. For each stop in original trip: create new stop with same city_id, arrive_date, depart_date, order_index
4. For each stop_activity in each stop: create new stop_activity with same fields
5. For each packing_item: create new packing_item (is_packed = false)
6. Return the new trip ID

---

### FEATURE 14 — User Profile / Settings

**ProfilePage.jsx** (route: /profile)
- Avatar: circular image, click to upload new (PUT /api/users/:id/avatar). Preview before submit.
- Editable fields: Full Name (text input), Language (select: English, Hindi, French, Spanish, Arabic, Japanese)
- Save button: PUT /api/users/:id. Update authStore.user on success.
- "Saved Destinations" section: fetch GET /api/users/:id/saved-destinations. Show city cards in a grid. Each with a remove button.
- Account stats (read-only): Member since [date], Total trips created
- "Delete Account" section: red danger zone box, "Delete My Account" button → confirmation dialog saying "Type your email to confirm". On confirm: DELETE /api/users/:id → clear authStore → redirect to /login.

---

### FEATURE 15 — Admin Dashboard

**AdminDashboard.jsx** (route: /admin, AdminRoute protected)
- Stats bar: 4 cards — Total Users (count), Total Trips, Public Trips, Trips This Week
- Platform activity Recharts AreaChart: trips created per day for last 30 days
- Top 10 Cities BarChart: most added cities (count of stops referencing each city)
- Users table: columns — Name, Email, Role, Trips, Joined, Status, Action (deactivate/activate toggle)
  - Fetch: GET /api/admin/users?page=1&limit=20
  - Pagination at bottom
- All Trips table: columns — Title, Owner, Destinations, Status, Created
  - Fetch: GET /api/admin/trips
- On deactivate: PUT /api/admin/users/:id/status. Deactivated users cannot log in (check is_active in login controller).

---

## NAVIGATION STRUCTURE

**AppRouter.jsx** must define these routes:

```
/ → redirect to /dashboard if logged in, else /login
/login → LoginPage (public)
/signup → SignupPage (public)
/share/:token → PublicItineraryPage (public)

[ProtectedRoute wrapper]
/dashboard → DashboardPage
/trips → MyTripsPage
/trips/new → CreateTripPage
/trips/:id → TripDetailPage (with tabs: itinerary, budget, packing, notes)
/trips/:id/build → ItineraryBuilderPage
/trips/:id/view → ItineraryViewPage
/cities → CitySearchPage
/activities → ActivitySearchPage
/profile → ProfilePage

[AdminRoute wrapper]
/admin → AdminDashboard
```

Sidebar navigation links (visible on all protected pages):
- Dashboard (/dashboard) — Home icon
- My Trips (/trips) — Map icon
- Explore Cities (/cities) — Globe icon
- Activities (/activities) — Star icon
- Profile (/profile) — User icon
- Admin (/admin) — visible ONLY if user.role === 'admin' — Shield icon
- Logout button at bottom of sidebar

---

## API IMPLEMENTATION DETAILS

### Standard Response Helper (utils/responseHelper.js)
```javascript
// All controllers must use these:
exports.success = (res, data, message = 'Success', statusCode = 200) =>
  res.status(statusCode).json({ success: true, data, message });

exports.error = (res, message = 'Server error', statusCode = 500, details = null) =>
  res.status(statusCode).json({ success: false, error: message, ...(details && { details }) });
```

### Global Error Middleware (middleware/error.middleware.js)
Catches all errors passed via next(err). Returns 500 with a sanitized message. In development, include error.stack. In production, only the message.

### Auth Middleware (middleware/auth.middleware.js)
Verify JWT from Authorization header. Attach decoded user to req.user. If missing or invalid, return 401.

### Validate Middleware (middleware/validate.middleware.js)
Run validationResult(req). If errors, return 422 with details array: [{ field, message }].

### Budget Calculator (utils/budgetCalculator.js)
Function that takes tripId, queries all stops + stop_activities, sums costs, returns the full budget response object. Used by budget.controller.js.

### JWT Helper (utils/jwtHelper.js)
```
generateToken(payload, expiresIn = '7d') → signed JWT
verifyToken(token) → decoded payload or throw
```

---

## SEEDER EXECUTION

Add a `npm run seed` script in server/package.json:
```
"seed:cities": "node seeders/cities.seeder.js",
"seed:activities": "node seeders/activities.seeder.js",
"seed": "npm run seed:cities && npm run seed:activities"
```

Seeder files must:
1. Connect to DB using the Sequelize instance from config/db.js
2. Use Model.bulkCreate() with updateOnDuplicate to avoid errors on re-run
3. Log progress to console
4. Close DB connection when done

---

## ENVIRONMENT FILES

### server/.env
```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=traveloop_db
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=a_very_long_random_secret_at_least_64_chars
JWT_EXPIRES_IN=7d
NODE_ENV=development
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=2097152
```

### client/.env
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SERVER_BASE_URL=http://localhost:5000
```

---

## ROOT PACKAGE.JSON

```json
{
  "name": "traveloop",
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "dev:server": "cd server && npm run dev",
    "dev:client": "cd client && npm run dev",
    "install:all": "npm install && cd client && npm install && cd ../server && npm install",
    "seed": "cd server && npm run seed"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
```

---

## .GITIGNORE
```
node_modules/
dist/
.env
*.log
server/uploads/avatars/*
server/uploads/covers/*
!server/uploads/avatars/.gitkeep
!server/uploads/covers/.gitkeep
```

---

## README.MD REQUIREMENTS

Write a complete README with:
1. Project description
2. Tech stack list
3. Prerequisites (Node 20, MySQL 8 installed)
4. Setup steps:
   a. Clone repo
   b. Create MySQL database: `CREATE DATABASE traveloop_db;`
   c. Copy .env.example files and fill in DB credentials
   d. `npm run install:all`
   e. `npm run seed`
   f. `npm run dev`
5. Default admin account (seed one admin user in cities.seeder.js: email admin@traveloop.com, password Admin@1234)
6. Git branching guide for team
7. API endpoint reference table

---

## DESIGN SYSTEM

Use this consistent design across all pages:

**Color Palette (Tailwind custom config)**
```javascript
// tailwind.config.js extend.colors:
primary: { 50:'#eff6ff', 500:'#3b82f6', 600:'#2563eb', 700:'#1d4ed8' },
accent:  { 400:'#34d399', 500:'#10b981' },
danger:  '#ef4444',
warning: '#f59e0b',
surface: '#f8fafc',
card:    '#ffffff'
```

**Typography**: Use `font-family: 'Inter', sans-serif` via Tailwind. Load from Google Fonts in index.html.

**Component Consistency**:
- All primary buttons: `bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-4 py-2 font-medium transition-colors`
- All cards: `bg-white rounded-xl shadow-sm border border-gray-100 p-4`
- All inputs: `border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none`
- All modals: centered, backdrop blur, max-w-lg, rounded-2xl
- Toasts: top-right, 3 second duration

**Responsive**: All pages must work on mobile (375px min). Use Tailwind responsive prefixes (sm:, md:, lg:). Sidebar collapses to bottom navigation bar on mobile.

---

## GIT SETUP FILES

### .github/PULL_REQUEST_TEMPLATE.md
```markdown
## What does this PR do?
<!-- Describe the feature or fix -->

## Checklist
- [ ] Code tested locally
- [ ] No console.log left in production code
- [ ] Error handling added
- [ ] Responsive on mobile
- [ ] Reviewed by at least 1 team member
```

---

## FINAL IMPLEMENTATION ORDER

Build in this exact sequence to avoid dependency issues:

1. Root package.json + .gitignore + README skeleton
2. server/ setup: package.json, .env, app.js, server.js, config/db.js
3. All Sequelize models + associations in models/index.js
4. Seeders (cities + activities), run them
5. All middleware files
6. All validators
7. Auth routes + controller (register, login, me)
8. User routes + controller
9. Trip routes + controller
10. Stop routes + controller
11. City + Activity routes + controllers (read-only, from seeded data)
12. Budget controller (uses budgetCalculator util)
13. Packing, Notes, Share, Admin routes + controllers
14. client/ setup: package.json, vite.config.js, tailwind.config.js, index.html
15. axiosInstance.js + all api/*.api.js files
16. Zustand stores
17. Common components (Button, Input, Modal, Card, etc.)
18. Layout components (Navbar, Sidebar, PageWrapper)
19. AppRouter.jsx with all routes + ProtectedRoute + AdminRoute
20. Auth pages (Login, Signup)
21. Dashboard page
22. My Trips page + TripCard + TripForm
23. Create Trip page
24. Trip Detail page with tab structure
25. Itinerary Builder page (most complex — do last in frontend)
26. Itinerary View page
27. City Search page
28. Activity Search page
29. Budget page (with Recharts)
30. Packing page
31. Notes page
32. Profile page
33. Public Itinerary page
34. Admin Dashboard page
35. Final: test all flows end-to-end, fix any issues

---

## IMPORTANT IMPLEMENTATION NOTES

1. **All API calls in frontend must have try/catch**. On catch, extract error.response?.data?.error or fall back to "Something went wrong. Please try again." and show via toast.

2. **All text inputs must be trimmed server-side** before DB insertion.

3. **Images**: Since there are no real city/activity images, use a colored gradient as CSS background based on the city name's first letter. Create a utility that maps A-Z to a gradient color palette.

4. **Budget calculation must be real-time**: When an activity is added/removed from a stop, the budget page must reflect updated numbers. Use Zustand to trigger re-fetches.

5. **Date display**: Always use date-fns format() for consistent display. Store dates as DATE (no time) in MySQL.

6. **Sequelize associations** in models/index.js must be complete:
   - User.hasMany(Trip), Trip.belongsTo(User)
   - Trip.hasMany(Stop), Stop.belongsTo(Trip)
   - Stop.belongsTo(City)
   - City.hasMany(CityActivity)
   - Stop.hasMany(StopActivity)
   - StopActivity.belongsTo(CityActivity) (optional/nullable)
   - Trip.hasMany(PackingItem)
   - Trip.hasMany(TripNote)
   - TripNote.belongsTo(Stop) (optional/nullable)
   - User.belongsToMany(City, { through: SavedDestination })

7. **The reorder endpoint** (PUT /api/trips/:tripId/stops/reorder) receives body: `{ orderedIds: [3, 1, 4, 2] }` and updates order_index for each stop sequentially using a Sequelize transaction.

8. **Share token generation**: Use Node's `crypto.randomBytes(32).toString('hex')` — no uuid library needed.

9. **Admin user seeding**: In cities.seeder.js, after seeding cities, also create one admin user if not exists: email `admin@traveloop.com`, password `Admin@1234` (hashed with bcrypt rounds 12), role `admin`.

10. **File validation in Multer**: Only accept image/jpeg and image/png. Reject others with a 400 error and clear message.

11. **Rate limiting**: Apply to /api/auth routes only: 10 requests per 15 minutes per IP.

12. **CORS**: Allow origin http://localhost:5173 only (Vite default).

13. **The Offline Banner**: OfflineBanner.jsx listens to window online/offline events. When offline, show a sticky yellow banner: "You're offline. Some features may not work."

14. **Empty states must include**: an SVG illustration (simple, inline), a headline, a subtext, and a CTA button where applicable.

Now build the complete project. Start with the file structure setup, then proceed through the implementation order above. Write complete, working code for every single file.
```

---
*End of Agent Prompt*
