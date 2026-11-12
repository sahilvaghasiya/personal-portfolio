'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Mail, MapPin } from 'lucide-react'
import { profile } from '@/data/portfolio'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { Section } from '@/components/ui/Section'

const emptyForm = {
  name: '',
  email: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setSuccess(null)
    setError(null)

    try {
      const response = await fetch('https://formspree.io/f/xjkrdwbr', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      const data = await response.json()

      if (response.ok) {
        setSuccess('Thanks. Your message is on its way.')
        setForm(emptyForm)
      } else {
        setError(data?.errors?.[0]?.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Section id="contact" className="contact-mesh">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="max-w-[16ch] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Got a product idea? Let’s make it real.
          </h2>
          <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted">
            Whether it’s an AI-powered product, a full-stack build, or a system that needs rethinking — I’m always
            open to interesting challenges.
          </p>
          <ul className="mt-8 space-y-4">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-3 text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" aria-hidden />
                {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-ink">
              <MapPin className="h-4 w-4 text-accent" aria-hidden />
              Ahmedabad, India
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-accent">
              <span className="pulse-dot" aria-hidden />
              {profile.availability}
            </li>
          </ul>
          <SocialLinks glow className="mt-8" />
        </div>

        <form className="glass-panel p-5 sm:p-8" onSubmit={onSubmit}>
          <div className="space-y-4">
            <FloatField label="Name" name="name" value={form.name} onChange={update} autoComplete="name" />
            <FloatField label="Email" name="email" type="email" value={form.email} onChange={update} autoComplete="email" />
            <FloatField label="Message" name="message" value={form.message} onChange={update} multiline />
            {success && (
              <p role="status" className="text-sm font-medium text-success">
                {success}
              </p>
            )}
            {error && (
              <p role="alert" className="text-sm font-medium text-danger">
                {error}
              </p>
            )}
            <button type="submit" className="btn-primary w-full" disabled={submitting} aria-busy={submitting}>
              {submitting && <span className="send-spin" aria-hidden />}
              {submitting ? 'Sending' : 'Send message'}
            </button>
            <p className="text-sm text-muted">Messages are delivered by Formspree.</p>
          </div>
        </form>
      </div>
    </Section>
  )
}

function FloatField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  autoComplete,
  multiline = false,
}: {
  label: string
  name: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  autoComplete?: string
  multiline?: boolean
}) {
  const id = `contact-${name}`
  const controlClass = 'float-control'

  return (
    <label htmlFor={id} className="float-field">
      {multiline ? (
        <textarea
          id={id}
          name={name}
          required
          rows={5}
          value={value}
          placeholder=" "
          onChange={onChange}
          className={`${controlClass} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required
          value={value}
          placeholder=" "
          autoComplete={autoComplete}
          onChange={onChange}
          className={controlClass}
        />
      )}
      <span className="float-label">{label}</span>
    </label>
  )
}
