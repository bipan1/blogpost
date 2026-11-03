'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import type { ContactData } from '@/types/Contact';

type Status = 'idle' | 'sent' | 'failed';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactData>();
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (data: ContactData) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name,
          to_name: 'Bipan Chhetri',
          from_email: data.email,
          to_email: 'bipan13345@gmail.com',
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );
      reset();
      setStatus('sent');
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus('failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register('name', { required: true })}
            className="field-input"
          />
          {errors.name && <p className="field-error">Name is required.</p>}
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register('email', {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            className="field-input"
          />
          {errors.email && (
            <p className="field-error">A valid email is required.</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="field-label">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          aria-invalid={!!errors.message}
          {...register('message', { required: true })}
          className="field-input resize-y"
        />
        {errors.message && <p className="field-error">Message is required.</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Sending...' : 'Send message'}
        </button>
        <p role="status" className="text-sm">
          {status === 'sent' && (
            <span className="text-emerald-700">
              Thanks! Your message has been sent.
            </span>
          )}
          {status === 'failed' && (
            <span className="text-red-600">
              Sorry, your message could not be sent. Please try again later.
            </span>
          )}
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
