import React, { useState } from 'react';
import { Building2, Sparkles, CheckCircle2, Send, Shield, Users, Compass, Clock, MapPin, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { FormField } from '../components/forms/FormField';
import { Button } from '../components/common/Button';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { api } from '../services/api';

const workshopModules = [
  {
    title: 'Leadership & Team Development',
    desc: 'Cultivating selfless leadership (Nishkama Karma) where managers lead by steadfast personal example, authentic empathy, and ethical responsibility.',
    tag: 'Executive & Emerging Leads'
  },
  {
    title: 'Stress & Mind Management',
    desc: 'Actionable techniques for mental hygiene, emotional regulation, and cognitive clarity under tight delivery timelines and high-stakes demands.',
    tag: 'All Teams'
  },
  {
    title: 'Work-Life Harmony & Vitality',
    desc: 'Aligning physical vitality, sleep, and work habits (Yukta Ahara Vihara) to prevent burnout and foster sustainable human performance.',
    tag: 'Wellness & Culture'
  },
  {
    title: 'Handling Failure, Pressure & Equanimity',
    desc: 'Developing psychological immunity to setback (Samatvam). Training minds to treat praise and blame, triumph and defeat, with balanced perspective.',
    tag: 'Resilience Training'
  },
  {
    title: 'Purpose & Meaning at Work',
    desc: 'Connecting daily operational tasks to broader personal and societal contribution, elevating morale, engagement, and retention.',
    tag: 'Culture & Purpose'
  },
  {
    title: 'Positive Habits & Responsible Choices',
    desc: 'Breaking unconscious habits of distraction, procrastination, and digital fatigue through structured cognitive protocols.',
    tag: 'Focus & Productivity'
  }
];

export const ForOrganisationsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    designation: '',
    programmeInterest: 'Leadership & Team Development',
    preferredFormat: 'To Be Discussed',
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
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.organisation.trim()) errs.organisation = 'Organisation name is required';
    if (!formData.programmeInterest) errs.programmeInterest = 'Please select a workshop module';
    if (!formData.message.trim()) {
      errs.message = 'Please provide details on your team size and objectives';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.submitEnquiry(formData);
      setSubmitSuccess(true);
      setSubmitMessage(res.message || 'Your organisation enquiry has been received! Our coordination team will reach out within 24–48 hours.');
      setFormData({
        name: '',
        email: '',
        organisation: '',
        designation: '',
        programmeInterest: 'Leadership & Team Development',
        preferredFormat: 'To Be Discussed',
        message: ''
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Unable to submit enquiry right now. Please try again or email us directly.';
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
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate & Institutional Collaborations</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50">
            Empowering Teams Through <span className="gold-text-gradient">Wisdom & Character</span>
          </h1>

          <p className="text-lg sm:text-xl text-cream-200/90 max-w-3xl mx-auto font-light leading-relaxed">
            Thoughtfully crafted workshops for founders, HR leaders, and managers in Chandigarh, Mohali, and beyond. Grounded in mental discipline, purpose, and ethical leadership.
          </p>
        </div>
      </section>

      {/* Workshop Modules Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tailored Modules"
          title="Core Workshop Offerings"
          subtitle="Designed to address the root causes of workplace burnout, reactive decision-making, and organizational cynicism."
          theme="light"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshopModules.map((module, i) => (
            <AnimatedSection
              key={i}
              delay={i * 0.1}
              className="bg-white p-8 rounded-3xl border border-gold-500/25 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-xs font-mono font-semibold uppercase text-gold-600 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20 inline-block">
                  {module.tag}
                </span>
                <h4 className="font-serif text-2xl font-bold text-forest-950">
                  {module.title}
                </h4>
                <p className="text-sm text-forest-800/80 leading-relaxed">
                  {module.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cream-200 flex items-center justify-between text-xs text-forest-700/60 font-medium">
                <span>Available Online / Offline</span>
                <span>Custom Duration</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Delivery Formats Notice */}
      <section className="py-14 bg-cream-100 border-y border-gold-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-forest-900 text-cream-50 p-8 rounded-3xl border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="font-serif text-xl font-bold text-cream-50">
                Flexible Delivery Options
              </h4>
              <p className="text-sm text-cream-200/80">
                Sessions can be conducted on-site in Chandigarh/Mohali or via interactive virtual cohorts across India.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-forest-950 border border-gold-500/30 text-xs font-mono text-gold-400">
                On-site Workshops
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-forest-950 border border-gold-500/30 text-xs font-mono text-gold-400">
                Virtual Cohorts
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Enquiry Form */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gold-500/30 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h3 className="font-serif text-3xl font-bold text-forest-950">
              Request An Organisation Consultation
            </h3>
            <p className="text-sm text-forest-800/80">
              Share your team's objectives and our academic coordinators will provide a customized module outline and schedule.
            </p>
          </div>

          {submitSuccess ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-emerald-900">
                Enquiry Successfully Received
              </h4>
              <p className="text-sm text-emerald-800 max-w-md mx-auto">
                {submitMessage}
              </p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="text-xs font-semibold uppercase tracking-wider text-emerald-700 underline mt-4"
              >
                Submit another inquiry
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
                  label="Full Name"
                  name="name"
                  placeholder="e.g. Ananya Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />

                <FormField
                  label="Work Email"
                  name="email"
                  type="email"
                  placeholder="e.g. ananya@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  label="Organisation / Institution"
                  name="organisation"
                  placeholder="e.g. Tech Horizons Pvt Ltd"
                  value={formData.organisation}
                  onChange={handleChange}
                  error={errors.organisation}
                  required
                />

                <FormField
                  label="Designation"
                  name="designation"
                  placeholder="e.g. Head of HR / Founder"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  label="Interested Module"
                  name="programmeInterest"
                  type="select"
                  value={formData.programmeInterest}
                  onChange={handleChange}
                  options={workshopModules.map(m => ({ label: m.title, value: m.title }))}
                  required
                />

                <FormField
                  label="Preferred Delivery Format"
                  name="preferredFormat"
                  type="select"
                  value={formData.preferredFormat}
                  onChange={handleChange}
                  options={[
                    { label: 'To Be Discussed', value: 'To Be Discussed' },
                    { label: 'Offline / In-person Workshop', value: 'Offline' },
                    { label: 'Online / Virtual Cohort', value: 'Online' }
                  ]}
                />
              </div>

              <FormField
                label="Team Context & Objectives"
                name="message"
                type="textarea"
                rows={4}
                placeholder="Briefly describe your team size, key challenges (e.g. stress, communication, leadership transition), and preferred timeline..."
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={submitting}
                  icon={Send}
                >
                  {submitting ? 'Submitting Enquiry...' : 'Submit Organisation Enquiry'}
                </Button>
              </div>

              <p className="text-[11px] text-forest-700/60 text-center">
                We respect your privacy. No confidential organisation data is disclosed to third parties.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
