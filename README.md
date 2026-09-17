# Nutrition.Fitness Go Live Control

A standalone internal launch-management application for the 1 November 2026 Nutrition.Fitness go-live programme.

## Hard separation rule

This application is **not** the Nutrition.Fitness public website and must remain operationally separate from it.

It uses its own:

- GitHub repository (`nutritionfitnessltd-hub/Nutrition-Go-Live`)
- Vercel project/deployment
- Supabase project/database/auth/storage
- environment variables
- team access

The public Nutrition.Fitness website can appear in launch tasks, but its runtime code, database and deployment are not dependencies of this app.

## What is built

- master 45-day launch plan
- 8 corrected workstreams
- P0 / P1 / P2 launch priorities
- task owners and deadlines
- explicit instructions and "done means" acceptance criteria
- dependencies
- task statuses and launch blockers
- personal work queue
- phase timeline through 1 November
- decision register
- team workload view
- work submission links/notes
- CSV export
- standalone Supabase schema for shared multi-user use
- private `task-files` storage bucket schema
- local review mode when Supabase is not configured

## Local review mode

Without Supabase environment variables, the app opens directly and stores edits in browser `localStorage`. This is useful for reviewing the plan and UX, but it is not a shared team workspace.

## Shared production mode

Create a dedicated Supabase project and apply `supabase/schema.sql`.

Set these environment variables in the standalone Vercel project:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `APP_NAME=Nutrition.Fitness Go Live Control`
- `LAUNCH_AT=2026-11-01T09:00:00+00:00`

When those variables exist, the app enables team sign-in and stores the shared launch plan in Supabase.

The first account created becomes the administrator. Further accounts default to contributor and can be promoted in the `profiles` table by an administrator/manager.

## Deployment

This is a static application plus one Vercel function at `/api/config`. Vercel can deploy the repository with Framework Preset `Other` / zero-config.

## Launch-management rule

Every day, prioritise the task that is currently constraining the complete customer journey:

**discover → understand → choose → pay → access → use → receive → get support → renew/repeat**
