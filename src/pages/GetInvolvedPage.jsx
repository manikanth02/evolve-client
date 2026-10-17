import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  HeartHandshake,
  Compass,
  Users,
  Sparkles,
  Building2,
  HelpCircle,
  Send,
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { FormField } from '../components/forms/FormField';
import { Button } from '../components/common/Button';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { api } from '../services/api';

// 4 Compact Pathways
const pathways = [
  {
    id: 'programme',
    interestType: 'Programme',
    title: 'Join a Programme',
    desc: 'Enrol in upcoming character, mind management, or practical Gita wisdom cohorts.',
    icon: Compass,
    accent: 'bg-gold-500/10 text-gold-600 border-gold-500/30'
  },
  {
    id: 'volunteer',
    interestType: 'Volunteering',
    title: 'Volunteer in Seva',
    desc: 'Participate in hands-on civic cleanups, tree care, and youth educational outreach.',
    icon: HeartHandshake,
    accent: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
  },
  {
    id: 'mentor',
    interestType: 'Mentorship',
    title: 'Become a Youth Mentor',
    desc: 'Experienced professionals guiding students with empathy, focus, and life ethics.',
    icon: Users,
    accent: 'bg-teal-500/10 text-teal-600 border-teal-500/30'
  },
  {
    id: 'institutional',
    interestType: 'Institutional Collaboration',
    title: 'Partner with Us',
    desc: 'Host customized workshops and wisdom circles at your college, university, or company.',
    icon: Building2,
    accent: 'bg-forest-900/10 text-forest-800 border-forest-900/20'
  }
];

export const GetInvolvedPage = () => {
  const [searchParams] = useSearchParams();

  // Query parameter support: ?interest=Programme&programme=... or ?interest=Institutional+Collaboration or ?interest=General+Enquiry
  const paramInterest = searchParams.get('interest');
  const paramProgramme = searchParams.get('programme');
  const paramMentor = searchParams.get('mentor');

  // Determine initial interest type
  const getInitialInterestType = () => {
    if (paramInterest) {
      const lower = paramInterest.toLowerCase();
      if (lower.includes('collab') || lower.includes('partner') || lower.includes('institution')) return 'Institutional Collaboration';
      if (lower.includes('volunteer') || lower.includes('seva')) return 'Volunteering';
      if (lower.includes('mentor')) return 'Mentorship';
      if (lower.includes('general') || lower.includes('contact') || lower.includes('enquiry')) return 'General Enquiry';
      if (lower.includes('prog')) return 'Programme';
    }
    if (paramProgramme) return 'Programme';
    if (paramMentor) return 'Mentorship';
    return 'Programme';
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestType: getInitialInterestType(),
    organisation: '',
    designation: '',
    programmeInterest: paramProgramme || 'Leadership & Character Development',
    preferredFormat: 'To Be Discussed',
    message: paramMentor ? `I am interested in mentorship with ${paramMentor}. ` : ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    document.title = 'Get Involved & Connect — Evolve Club';

    if (paramInterest || paramProgramme || paramMentor) {
      setFormData(prev => ({
        ...prev,
        interestType: getInitialInterestType(),
        programmeInterest: paramProgramme || prev.programmeInterest,
        message: paramMentor ? `I am interested in mentorship with ${paramMentor}. ` : prev.message
      }));

      // Smooth scroll to form container
      const timer = setTimeout(() => {
        const formElem = document.getElementById('shared-form-section');
        if (formElem) {
          formElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [paramInterest, paramProgramme, paramMentor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePathwaySelect = (interestType, defaultTitle) => {
    setFormData(prev => ({
      ...prev,
      interestType,
      programmeInterest: defaultTitle || prev.programmeInterest
    }));
    const formElem = document.getElementById('shared-form-section');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.interestType) errs.interestType = 'Please select your interest';

    // Required organisation for Institutional Collaboration
    if (formData.interestType === 'Institutional Collaboration' && !formData.organisation.trim()) {
      errs.organisation = 'College, university, or organisation name is required';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide details or questions in your message';
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
      setErrors({});

      // Construct safe payload
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        interestType: formData.interestType,
        organisation: formData.organisation.trim(),
        designation: formData.designation.trim(),
        programmeInterest: formData.interestType === 'Programme'
          ? formData.programmeInterest
          : `${formData.interestType} Enquiry`,
        preferredFormat: formData.preferredFormat,
        message: formData.message.trim()
      };

      let res;
      if (formData.interestType === 'General Enquiry') {
        // Submit via contact endpoint or enquiry endpoint
        res = await api.submitEnquiry(payload);
      } else {
        res = await api.submitEnquiry(payload);
      }

      setSubmitSuccess(true);
      setSubmitMessage(
        res.message ||
        'Thank you! Your submission has been received. Our coordination team will review your details and reach out within 24 to 48 hours.'
      );

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        interestType: 'Programme',
        organisation: '',
        designation: '',
        programmeInterest: 'Leadership & Character Development',
        preferredFormat: 'To Be Discussed',
        message: ''
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Unable to submit your details right now. Please check your network or try again.';
      setErrors({ form: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-24 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-forest-950 text-cream-50 py-20 relative overflow-hidden border-b border-gold-500/20">
        <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Connect · Collaborate · Contribute</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            Get <span className="gold-text-gradient">Involved</span>
          </h1>

          <p className="text-lg sm:text-xl text-cream-200/90 max-w-3xl mx-auto font-light leading-relaxed">
            Whether you wish to join a learning cohort, volunteer in community seva, mentor students, collaborate with your institution, or submit a general enquiry, there is a meaningful place for you in Evolve Club.
          </p>
        </div>
      </section>

      {/* 2. Four Compact Pathways Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Ways to Participate"
          title="Choose Your Pathway"
          subtitle="Select an option below to automatically configure the shared form."
          theme="light"
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((p, idx) => {
            const Icon = p.icon;
            const isSelected = formData.interestType === p.interestType;
            return (
              <AnimatedSection
                key={p.id}
                delay={idx * 0.08}
                className={`p-6 rounded-3xl border shadow-sm flex flex-col justify-between transition-all duration-200 ${
                  isSelected
                    ? 'bg-forest-900 text-cream-50 border-gold-500/60 shadow-md ring-2 ring-gold-400/30'
                    : 'bg-white text-forest-950 border-gold-500/20 hover:border-gold-500/40 hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                    isSelected ? 'bg-forest-950 text-gold-400 border-gold-500/40' : p.accent
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold">
                    {p.title}
                  </h4>
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isSelected ? 'text-cream-200/80' : 'text-forest-800/80'
                  }`}>
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-cream-200/40">
                  <button
                    type="button"
                    onClick={() => handlePathwaySelect(p.interestType, p.title)}
                    className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isSelected
                        ? 'text-gold-300 hover:text-gold-200'
                        : 'text-gold-600 hover:text-gold-700'
                    }`}
                  >
                    <span>{isSelected ? '✓ Selected Pathway' : 'Select this pathway'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* 3. Unified Shared Form Section */}
      <section id="shared-form-section" className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gold-500/30 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold block">
              Unified Expression of Interest
            </span>
            <h2 className="font-serif text-3xl font-bold text-forest-950">
              Submit Your Details
            </h2>
            <p className="text-xs sm:text-sm text-forest-800/80">
              Fill out this form and our academic and coordination team will respond within 24 to 48 hours.
            </p>
          </div>

          {submitSuccess ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 sm:p-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-emerald-950">
                Submission Received!
              </h3>
              <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                {submitMessage}
              </p>
              <div className="pt-4">
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => setSubmitSuccess(false)}
                >
                  Submit Another Enquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.form && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 text-sm">
                  {errors.form}
                </div>
              )}

              {/* Interest Type Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest-800 mb-2">
                  What are you interested in? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { label: 'Programme', value: 'Programme' },
                    { label: 'Volunteering', value: 'Volunteering' },
                    { label: 'Mentorship', value: 'Mentorship' },
                    { label: 'Collaboration', value: 'Institutional Collaboration' },
                    { label: 'General Enquiry', value: 'General Enquiry' }
                  ].map((opt) => {
                    const active = formData.interestType === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, interestType: opt.value }))}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                          active
                            ? 'bg-forest-900 text-gold-400 border-gold-500/50 shadow-sm font-semibold'
                            : 'bg-cream-50 text-forest-800 border-forest-900/10 hover:border-gold-500/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
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

              {/* Phone (Optional for all) & Conditional Organisation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  label="Phone Number (Optional)"
                  name="phone"
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <FormField
                  label={
                    formData.interestType === 'Institutional Collaboration'
                      ? 'College / University / Organisation'
                      : 'College / Organisation (Optional)'
                  }
                  name="organisation"
                  placeholder="e.g. Panjab University / Tech Horizons"
                  value={formData.organisation}
                  onChange={handleChange}
                  error={errors.organisation}
                  required={formData.interestType === 'Institutional Collaboration'}
                />
              </div>

              {/* Conditional Field: Programme specific */}
              {formData.interestType === 'Programme' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-cream-100 border border-gold-500/20">
                  <FormField
                    label="Focus Area / Programme"
                    name="programmeInterest"
                    type="select"
                    value={formData.programmeInterest}
                    onChange={handleChange}
                    options={[
                      { label: 'Leadership & Character Development', value: 'Leadership & Character Development' },
                      { label: 'Life Skills & Mind Management', value: 'Life Skills & Mind Management' },
                      { label: 'Purposeful Living & Personal Philosophy', value: 'Purposeful Living & Personal Philosophy' },
                      { label: 'Practical Bhagavad Gita Wisdom', value: 'Practical Bhagavad Gita Wisdom' },
                      { label: 'Healthy Habits & Well-being', value: 'Healthy Habits & Well-being' },
                      { label: 'Youth Mentorship & Peer Growth', value: 'Youth Mentorship & Peer Growth' },
                      { label: 'Community Service (Seva)', value: 'Community Service (Seva)' },
                      { label: 'Addiction Awareness & Responsible Choices', value: 'Addiction Awareness & Responsible Choices' }
                    ]}
                  />

                  <FormField
                    label="Preferred Format"
                    name="preferredFormat"
                    type="select"
                    value={formData.preferredFormat}
                    onChange={handleChange}
                    options={[
                      { label: 'To Be Discussed', value: 'To Be Discussed' },
                      { label: 'Offline / In-person (Chandigarh/Mohali)', value: 'Offline' },
                      { label: 'Online / Virtual Cohort', value: 'Online' }
                    ]}
                  />
                </div>
              )}

              {/* Conditional Field: Institutional Collaboration specific */}
              {formData.interestType === 'Institutional Collaboration' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-cream-100 border border-gold-500/20">
                  <FormField
                    label="Your Designation / Role"
                    name="designation"
                    placeholder="e.g. Professor, Dean, HR Manager, Club Lead"
                    value={formData.designation}
                    onChange={handleChange}
                  />

                  <FormField
                    label="Preferred Format"
                    name="preferredFormat"
                    type="select"
                    value={formData.preferredFormat}
                    onChange={handleChange}
                    options={[
                      { label: 'To Be Discussed', value: 'To Be Discussed' },
                      { label: 'Campus On-site Seminar', value: 'Offline' },
                      { label: 'Virtual Cohort / Webinar', value: 'Online' }
                    ]}
                  />
                </div>
              )}

              {/* Message */}
              <FormField
                label="Message or Details"
                name="message"
                type="textarea"
                rows={4}
                placeholder={
                  formData.interestType === 'Programme'
                    ? 'Share what you hope to learn or improve (e.g. focus, habits, leadership)...'
                    : formData.interestType === 'Volunteering'
                    ? 'Tell us about your background, availability, and how you would like to participate in community seva...'
                    : formData.interestType === 'Mentorship'
                    ? 'Share your background, areas of guidance, or mentor of interest...'
                    : formData.interestType === 'Institutional Collaboration'
                    ? 'Describe your student or employee audience, campus location, and workshop goals...'
                    : 'How can we help you? Feel free to ask any question...'
                }
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
              />

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={submitting}
                  icon={Send}
                >
                  {submitting ? 'Submitting Details...' : 'Submit Expression of Interest'}
                </Button>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-forest-700/60 font-mono gap-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                  <span>Privacy respected. Your information is never sold or shared.</span>
                </div>
                <span>Motto: LEARN · GROW · SERVE · LEAD</span>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default GetInvolvedPage;
