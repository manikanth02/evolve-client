import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HeartHandshake, Compass, Users, Sparkles, Send, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { FormField } from '../components/forms/FormField';
import { Button } from '../components/common/Button';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { api } from '../services/api';

const pathways = [
  {
    id: 'join',
    title: 'Join a Programme',
    desc: 'Participate in our character building, mind management, or Bhagavad Gita wisdom cohorts.',
    icon: Compass,
    accent: 'bg-gold-500/10 text-gold-600 border-gold-500/20'
  },
  {
    id: 'volunteer',
    title: 'Volunteer in Seva',
    desc: 'Contribute your time and skills in local community clean-ups, educational outreach, and food drives.',
    icon: HeartHandshake,
    accent: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
  },
  {
    id: 'mentor',
    title: 'Become a Youth Mentor',
    desc: 'Experienced professionals and educators who can guide emerging students with empathy and wisdom.',
    icon: Users,
    accent: 'bg-teal-500/10 text-teal-600 border-teal-500/20'
  },
  {
    id: 'collab',
    title: 'Institutional Collaboration',
    desc: 'Partner with Evolve Club to bring workshops, wisdom circles, and youth camps to your university or college.',
    icon: Sparkles,
    accent: 'bg-forest-500/10 text-forest-700 border-forest-500/20'
  }
];

export const GetInvolvedPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedProgramme = searchParams.get('programme');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    designation: '',
    programmeInterest: preselectedProgramme || 'Join a Programme (Cohort Enrolment)',
    preferredFormat: 'To Be Discussed',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (preselectedProgramme) {
      setFormData(prev => ({
        ...prev,
        programmeInterest: `Enrolment: ${preselectedProgramme}`
      }));
    }
  }, [preselectedProgramme]);

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
      errs.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.programmeInterest) errs.programmeInterest = 'Please select a pathway';
    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief message about yourself';
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
      const res = await api.submitEnquiry(formData);
      setSubmitSuccess(true);
      setSubmitMessage(res.message || 'Your participation request has been received! Our team will contact you soon.');
      setFormData({
        name: '',
        email: '',
        organisation: '',
        designation: '',
        programmeInterest: 'Join a Programme (Cohort Enrolment)',
        preferredFormat: 'To Be Discussed',
        message: ''
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Unable to submit enquiry right now. Please try again.';
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
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Step Forward</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50">
            Get <span className="gold-text-gradient">Involved</span>
          </h1>

          <p className="text-lg sm:text-xl text-cream-200/90 max-w-3xl mx-auto font-light leading-relaxed">
            Whether you wish to join a learning cohort, volunteer in community drives, or mentor younger students, there is a meaningful place for you in Evolve Club.
          </p>
        </div>
      </section>

      {/* 4 Pathways Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Ways to Participate"
          title="Choose Your Pathway"
          subtitle="Discover how you can learn, contribute, and grow with our community."
          theme="light"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((p, idx) => {
            const Icon = p.icon;
            return (
              <AnimatedSection
                key={p.id}
                delay={idx * 0.1}
                className="bg-white p-6 rounded-3xl border border-gold-500/20 shadow-sm flex flex-col justify-between hover:border-gold-500/50 transition-all hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${p.accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-forest-950">
                    {p.title}
                  </h4>
                  <p className="text-sm text-forest-800/80 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-cream-200">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, programmeInterest: p.title }));
                      const formElem = document.getElementById('enquiry-form');
                      if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1"
                  >
                    <span>Select this pathway</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Participation Form */}
      <section id="enquiry-form" className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gold-500/30 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h3 className="font-serif text-3xl font-bold text-forest-950">
              Expression of Interest
            </h3>
            <p className="text-sm text-forest-800/80">
              Fill out this form and a member of the coordination team will reach out to understand your background and align you with the right circle.
            </p>
          </div>

          {submitSuccess ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-emerald-900">
                Participation Request Sent!
              </h4>
              <p className="text-sm text-emerald-800 max-w-md mx-auto">
                {submitMessage}
              </p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="text-xs font-semibold uppercase tracking-wider text-emerald-700 underline mt-4"
              >
                Submit another request
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
                  label="Your Full Name"
                  name="name"
                  placeholder="e.g. Rahul Verma"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="e.g. rahul@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  label="Pathway / Programme of Interest"
                  name="programmeInterest"
                  type="select"
                  value={formData.programmeInterest}
                  onChange={handleChange}
                  options={[
                    { label: 'Join a Programme (Cohort Enrolment)', value: 'Join a Programme' },
                    { label: 'Volunteer in Community Seva', value: 'Volunteer in Seva' },
                    { label: 'Become a Youth Mentor', value: 'Become a Youth Mentor' },
                    { label: 'Institutional / Campus Collaboration', value: 'Institutional Collaboration' },
                    { label: 'Bhagavad Gita Wisdom Circle', value: 'Wisdom Circle' }
                  ]}
                  required
                />

                <FormField
                  label="College / Organisation (Optional)"
                  name="organisation"
                  placeholder="e.g. Panjab University / Self-employed"
                  value={formData.organisation}
                  onChange={handleChange}
                />
              </div>

              <FormField
                label="Tell us about yourself & why you wish to get involved"
                name="message"
                type="textarea"
                rows={4}
                placeholder="Share your current focus (student / working professional), key interests, and how you hope to grow or contribute..."
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={submitting}
                  icon={Send}
                >
                  {submitting ? 'Submitting...' : 'Submit Expression of Interest'}
                </Button>
              </div>

              <p className="text-[11px] text-forest-700/60 text-center">
                Motto: LEARN · GROW · SERVE · LEAD
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
