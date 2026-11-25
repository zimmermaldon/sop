# Daymark native builds (Android + Windows)

The UI is packaged locally in each app; **the frontend does not need a public website host**. Supabase remains the cloud backend used for sign-in and task sync. The Arena preview is still a development preview, not a permanent app endpoint.

## 1. Configure Supabase once

1. Create a Supabase project and copy the project URL and **publishable/anon** key.
2. In the SQL Editor, run [`supabase/schema.sql`](supabase/schema.sql). It creates one JSON state row per account, enforces owner-only Row Level Security, and enables realtime updates.
3. In Authentication → Email Templates, use an email OTP template containing `{{ .Token }}` (the app asks the user to enter the emailed code).
4. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Never use a service-role key in the app. Vite embeds the URL and publishable key in the native package; authorization is enforced by the SQL RLS policies.

For this single-user app the cloud stores a complete task/list snapshot per account. A newly signed-in device pulls that snapshot, then pushes changes and receives Supabase realtime updates. **Concurrent offline edits are last-write-wins**; avoid editing the same task on two disconnected devices. Local data remains cached and JSON backup/restore remains available.

## 2. Android APK

Install Node.js, Android Studio (including its Android SDK), and a compatible JDK. Then:

```sh
npm install
npm run android:sync
npm run android:open
```

In Android Studio choose **Build → Build Bundle(s) / APK(s) → Build APK(s)**, or use `cd android && ./gradlew assembleDebug` (`gradlew.bat assembleDebug` on Windows). The debug APK is at `android/app/build/outputs/apk/debug/app-debug.apk`. For personal sideloading, copy it to the phone and allow installation from that source. Release APKs need your own signing keystore; do not commit the keystore or passwords.

Native reminders use Android local notifications. Open Settings & data inside the app and grant notification permission. Android may also apply battery/background restrictions; verify an actual reminder on the target phone.

## 3. Windows desktop app / installer

Build on a Windows machine with Node.js, Rust (MSVC toolchain), Microsoft C++ Build Tools, and WebView2 installed:

```powershell
npm install
npm run desktop:build
```

Tauri emits NSIS `.exe` and MSI installers under `src-tauri/target/release/bundle/`. The installer is for your own computer; signing is needed to avoid Windows SmartScreen warnings for wider distribution. Windows notifications are delivered while the app is running; a closed desktop app does not yet have a background reminder service.

During development, use `npm run desktop:dev`. On Android, use `npm run android:run` with a device/emulator attached.

## Environment and build caveats

- This checkout does not have Android Studio/JDK/SDK or the Rust/MSVC toolchain installed, so this sandbox can prepare and web-build the projects but cannot produce or test the final APK/Windows installer here.
- Each native build embeds the current frontend and Supabase project settings. After changing code or `.env.local`, rebuild/sync and reinstall the app on each device.
- Supabase Free can pause an inactive project and has no automatic backups; keep JSON exports. Review current plan terms before relying on it long-term.
