'use client'

import { useState } from 'react'
import { Bell, Shield, User, Mail } from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    quarterly: true,
    cycle: true,
  })

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl py-20">
        <div className="mb-10">
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-green mb-2">
            Account
          </div>

          <h1 className="font-display text-3xl font-bold text-white">
            Settings
          </h1>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <section className="rounded-xl border  bg-brand-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-4 w-4 text-brand-green" />

              <h2 className="font-display text-base font-bold text-white">
                Profile
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Full Name',
                'Email Address',
                'Phone Number',
                'BVN (last 4 digits)',
              ].map((field) => (
                <div key={field}>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-1.5">
                    {field}
                  </label>

                  <input
                    type="text"
                    placeholder="—"
                    className="w-full rounded-lg border  bg-brand-dark px-4 py-2.5 font-sans text-sm text-brand-text placeholder:text-brand-muted/40 focus:border-brand-green/50 focus:outline-none transition-colors"
                  />
                </div>
              ))}
            </div>

            <button className="mt-5 rounded-lg border  bg-brand-dark px-5 py-2 font-display text-xs font-semibold text-brand-text hover:border-brand-green/40 hover:text-white transition-all">
              Save Profile
            </button>
          </section>

          {/* Notifications */}
          <section className="rounded-xl border  bg-brand-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-4 w-4 text-brand-green" />

              <h2 className="font-display text-base font-bold text-white">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: 'email',
                  label: 'Email Notifications',
                  desc: 'Receive updates via email',
                },
                {
                  key: 'sms',
                  label: 'SMS Alerts',
                  desc: 'Get SMS alerts for key events',
                },
                {
                  key: 'quarterly',
                  label: 'Quarterly Reports',
                  desc: 'Receive quarterly performance summaries',
                },
                {
                  key: 'cycle',
                  label: 'Cycle Completion',
                  desc: 'Alert when investment cycles complete',
                },
              ].map(({ key, label, desc }) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-brand-border/50 last:border-0"
                >
                  <div>
                    <div className="font-sans text-sm font-medium text-brand-text">
                      {label}
                    </div>

                    <div className="font-sans text-xs text-brand-muted">
                      {desc}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setNotifications((n) => ({
                        ...n,
                        [key]: !n[key],
                      }))
                    }
                    className={`relative h-5 w-9 rounded-full transition-colors ${
                      notifications[key]
                        ? 'bg-brand-green'
                        : 'bg-brand-border'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        notifications[key]
                          ? 'translate-x-4'
                          : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Security */}
          <section className="rounded-xl border border-brand-border bg-brand-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-4 w-4 text-brand-green" />

              <h2 className="font-display text-base font-bold text-white">
                Security
              </h2>
            </div>

            <div className="space-y-3">
              {[
                'Change Password',
                'Enable 2FA',
                'Download Account Data',
              ].map((action) => (
                <button
                  key={action}
                  className="flex w-full items-center justify-between rounded-lg border border-brand-border px-4 py-3 hover:border-brand-green/30 transition-colors"
                >
                  <span className="font-sans text-sm text-brand-text">
                    {action}
                  </span>

                  <Mail className="h-3.5 w-3.5 text-brand-muted" />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}