# Daymark

Daymark is packaged as **Android (Capacitor APK)** and **Windows desktop (Tauri NSIS/MSI)** clients. The interface is bundled into each app; you do not need to host the frontend. Supabase is the optional cloud backend for email-code login and cross-device task sync. Until project settings are configured, each install works locally on its own device.

- Native packaging and setup guide: [`NATIVE_BUILDS.md`](NATIVE_BUILDS.md)
- Supabase schema: [`supabase/schema.sql`](supabase/schema.sql)
- Run the browser development preview: `npm run dev`
- Build frontend: `npm run build`
- Sync Android native project: `npm run android:sync`
- Open Android Studio: `npm run android:open`
- Build Windows installer on Windows with Rust/MSVC: `npm run desktop:build`

No Android/JDK or Rust/MSVC toolchain is installed in this sandbox, so the native packages must be built on your Android Studio/Windows machines. See the guide for prerequisites, signing, notifications, and Supabase configuration.
