import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Compass, Sparkles, MapPin } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { FormField } from '../components/forms/FormField';
import { Button } from '../components/common/Button';
import { api } from '../services/api';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Your name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errs.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valErrors = validate();
    if (Object.keys(valErrors).length > 0) {
      setErrors(valErrors);
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.submitContact(formData);
      setSubmitSuccess(true);
      setSubmitMessage(res.message || 'Thank you for reaching out! Your message has been safely received.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Unable to deliver message right now. Please try again.';
      setErrors({ form: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-forest-950 text-cream-50 py-20 relative overflow-hidden border-b border-gold-500/20">
        <div className="absolute inset-0 bg-grain opacity-20" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400">
            <Mail className="w-3.5 h-3.5" />
            <span>Coordination & Inquiries</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50">
            Connect With <span className="gold-text-gradient">Evolve Club</span>
          </h1>

          <p className="text-lg sm:text-xl text-cream-200/90 max-w-3xl mx-auto font-light leading-relaxed">
            Have questions about our philosophy, upcoming cohorts, or community service drives? Send us a message below.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold">
                Direct Communication
              </span>
              <h3 className="font-serif text-3xl font-bold text-forest-950">
                We Welcome Thoughtful Conversations
              </h3>
              <p className="text-base text-forest-800/80 leading-relaxed">
                Whether you are a student exploring life direction, an educator interested in value-based sessions, or a curious seeker, we are here to support your journey.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-gold-500/20 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-forest-950">
                    Geographic Focus
                  </h4>
                  <p className="text-sm text-forest-800/80 mt-1">
                    Chandigarh, Mohali & surrounding Tricity region. Interactive cohorts are also hosted virtually.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gold-500/20 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-forest-950">
                    Transparency Notice
                  </h4>
                  <p className="text-sm text-forest-800/80 mt-1">
                    Evolve Club is an independent youth initiative. We maintain complete clarity regarding our voluntary coordination team and verified activities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gold-500/30 shadow-md">
              <h3 className="font-serif text-2xl font-bold text-forest-950 mb-6">
                Send a Direct Message
              </h3>

              {submitSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-emerald-900">
                    Message Sent Successfully
                  </h4>
                  <p className="text-sm text-emerald-800">
                    {submitMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="text-xs font-semibold uppercase text-emerald-700 underline mt-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errors.form && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 text-sm">
                      {errors.form}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      label="Your Name"
                      name="name"
                      placeholder="e.g. Priyanshu Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                    />

                    <FormField
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="e.g. priyanshu@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                    />
                  </div>

                  <FormField
                    label="Subject"
                    name="subject"
                    placeholder="e.g. Inquiry regarding upcoming Gita Wisdom Cohort"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    required
                  />

                  <FormField
                    label="Your Message"
                    name="message"
                    type="textarea"
                    rows={5}
                    placeholder="Write your thoughts or inquiry here..."
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    required
                  />

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={submitting}
                    icon={Send}
                  >
                    {submitting ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
