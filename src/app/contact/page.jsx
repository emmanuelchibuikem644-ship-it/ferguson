'use client'

import { useState } from 'react'
import {
  Mail,
  Phone,
  Globe,
  Send,
  CheckCircle2,
} from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simulate submission
    setTimeout(() => setSent(true), 800)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@fergusongrowthcapital.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+234 XXX XXX XXXX',
    },
    {
      icon: Globe,
      label: 'Website',
      value: 'www.fergusongrowthcapital.com',
    },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl py-20">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-green mb-4">
            Get In Touch
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Start Your Investment
          </h1>

          <p className="font-sans text-sm text-brand-muted max-w-md mx-auto">
            Fill in the form below or reach out directly. Our team will get
            back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold text-white mb-6">
                Contact Information
              </h2>

              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-xl border border-brand-border bg-brand-card px-5 py-4"
                  >
                    <div className="h-9 w-9 flex-shrink-0 rounded-lg border border-brand-border bg-brand-dark flex items-center justify-center">
                      <Icon className="h-4 w-4 text-brand-green" />
                    </div>

                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">
                        {label}
                      </div>

                      <div className="font-sans text-sm text-brand-text">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl border border-brand-border bg-brand-card p-5">
              <p className="font-sans text-xs text-brand-muted leading-relaxed">
                <strong className="text-brand-text">Disclaimer:</strong>{' '}
                Investing in private companies carries risks. Returns are
                performance-based and not guaranteed. Past returns do not
                indicate future results. Only invest what you can afford to
                have locked up for the investment horizon.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-xl border border-brand-border bg-brand-card p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
                <CheckCircle2 className="h-12 w-12 text-brand-green" />

                <h3 className="font-display text-xl font-bold text-white">
                  Message Sent!
                </h3>

                <p className="font-sans text-sm text-brand-muted">
                  We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  {
                    name: 'name',
                    label: 'Full Name',
                    type: 'text',
                    placeholder: 'Chidi Okonkwo',
                  },
                  {
                    name: 'email',
                    label: 'Email Address',
                    type: 'email',
                    placeholder: 'you@example.com',
                  },
                  {
                    name: 'phone',
                    label: 'Phone Number',
                    type: 'tel',
                    placeholder: '+234 800 000 0000',
                  },
                  {
                    name: 'amount',
                    label: 'Investment Amount (₦)',
                    type: 'text',
                    placeholder: 'e.g. 500,000',
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-1.5">
                      {field.label}
                    </label>

                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [field.name]: e.target.value,
                        })
                      }
                      required
                      className="w-full rounded-lg border border-brand-border bg-brand-dark px-4 py-2.5 font-sans text-sm text-brand-text placeholder:text-brand-muted/50 focus:border-brand-green/50 focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-1.5">
                    Message (optional)
                  </label>

                  <textarea
                    rows={3}
                    placeholder="Any questions or context..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-brand-border bg-brand-dark px-4 py-2.5 font-sans text-sm text-brand-text placeholder:text-brand-muted/50 focus:border-brand-green/50 focus:outline-none focus:ring-1 focus:ring-brand-green/20 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green py-3 font-display text-sm font-bold text-brand-dark hover:bg-brand-green/90 transition-colors"
                >
                  Send Message <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}