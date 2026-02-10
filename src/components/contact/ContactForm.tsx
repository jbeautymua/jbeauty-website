"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Contact form error:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-border/50">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-muted-foreground max-w-sm">
            Thank you for getting in touch. We&apos;ll get back to you within 24
            hours.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-6 text-primary font-medium hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-border/50">
      <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your full name"
            {...register("name")}
            className="w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            {...register("email")}
            className="w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
            Phone <span className="text-muted-foreground/60">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Your phone number"
            {...register("phone")}
            className="w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="How can we help you?"
            {...register("message")}
            className="w-full rounded-lg border border-border px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white rounded-full py-4 font-semibold min-h-[48px] hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
}
