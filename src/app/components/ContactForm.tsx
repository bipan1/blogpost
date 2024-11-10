'use client';

import { ContactData } from '@/types/Contact';
import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactData>();

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
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="container w-1/2">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required.</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required.</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Message</label>
          <textarea
            {...register('message', { required: true })}
            className="w-full p-2 border rounded"
            rows={4}
          />
          {errors.message && (
            <p className="text-red-500 text-sm">Message is required.</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-purple-700 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
