# Daymark — product scope and data behavior

## Product direction
A local-first, low-friction personal task planner. It uses original branding and UI rather than TickTick source code, assets, copy, or private APIs. It is not a TickTick clone or equivalent in capability. This repository is an MVP and has no user accounts or server-side storage.

## Current implemented functionality
- Task creation and editing: actual local due date, optional time, priority, repeat daily/weekly/monthly, reminder timestamp, labels, notes, and checklist items.
- Date-aware Today, Upcoming, Overdue, Anytime, Inbox, Completed, and list views; completion progress and recurring-task generation.
- List, board, and month calendar views; task search across title, notes, list, and labels; priority/date/name sort.
- Habit check-ins and simple streak counter; add, rename, and delete lists; completion/delete undo; clear completed tasks.
- JSON backup export and restore, local-data deletion, browser notification permission, keyboard shortcut N, responsive layout, sample data is opt-in.
- Existing v1 local task/list data is migrated into v2 storage when present.

## Explicit limitations
- Data remains on this browser/device. No auth, cloud sync, multi-device conflict handling, shared lists, assignments, comments, or account recovery.
- Browser reminders require notification permission and can only be delivered while the app is open; this is not a reliable OS-level scheduled notification service.
- Recurrence is daily/weekly/monthly only; no custom intervals, exceptions, or end dates. Calendar is a month grid, without event integration or time-block drag/drop.
- Habits are simple local check-ins, not a robust habit schedule/history/statistics product. No external integrations, mobile widgets, email capture, offline sync, or AI.
- Accessibility and cross-browser behavior still need dedicated automated and manual QA.

## Data shape
`Task { id, title, list, date (YYYY-MM-DD), time, priority, repeat, remindAt, tags[], notes, subs[], done, habit }` saved in localStorage key `daymark:v2`. Export regularly from Settings & data.

## Run and verify
`npm install && npm run dev`
`npm run check`
