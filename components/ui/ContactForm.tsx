
"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Loader2, AlertCircle } from 'lucide-react';
import Button from './Button';
import { sendEmail } from '@/lib/sendmail'; // 👈 importe ta fonction EmailJS

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    from_name: '',      // Changé pour correspondre au paramètre attendu par EmailJS
    from_email: '',     // Changé pour correspondre au paramètre attendu par EmailJS
    phone: '',
    subject: '',        // Changé de 'title' à 'subject' pour plus de clarté
    message: '',
  });

  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormState('submitting');

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.from_name.trim()) newErrors.from_name = 'Le nom est requis';
    if (!formData.from_email.trim()) {
      newErrors.from_email = "L'email est requis";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.from_email)) {
      newErrors.from_email = 'Veuillez entrer un email valide';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.subject.trim()) newErrors.subject = 'Le sujet est requis';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormState('idle');
      return;
    }

    try {
      // 👇 Envoi réel via EmailJS avec l'élément du formulaire
      if (formRef.current) {
        await sendEmail(formRef.current);
      }

      setFormState('success');
      setFormData({ from_name: '', from_email: '', phone: '', subject: '', message: '' });
      setErrors({});
      
      if (formRef.current) {
        formRef.current.reset();
      }

      setTimeout(() => setFormState('idle'), 3000);
    } catch (error) {
      console.error(error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const clone = { ...prev };
        delete clone[name];
        return clone;
      });
    }
  };

  const fieldVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

  return (
  <div className="relative">
  <AnimatePresence>
    {formState === 'success' && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 rounded-lg z-10"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé!</h3>
        <p className="text-gray-600 text-center mb-6">
          Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
        </p>
        <Button onClick={() => setFormState('idle')} className="px-6">
          Envoyer un autre message
        </Button>
      </motion.div>
    )}

    {formState === 'error' && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 rounded-lg z-10"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Erreur d'envoi</h3>
        <p className="text-gray-600 text-center mb-6">
          Une erreur est survenue lors de l&apos;envoi du message. Veuillez réessayer.
        </p>
        <Button onClick={() => setFormState('idle')} className="px-6">
          Réessayer
        </Button>
      </motion.div>
    )}
  </AnimatePresence>

  <motion.form
    ref={formRef}
    onSubmit={handleSubmit}
    className="space-y-6 relative"
    initial="hidden"
    animate="visible"
    transition={{ staggerChildren: 0.1 }}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div variants={fieldVariants}>
        <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="from_name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            required
            className={`mt-1 block w-full rounded-lg border py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all duration-200 ${
              errors.from_name ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Votre nom complet"
          />
          {errors.from_name && (
            <motion.p
              className="text-red-500 text-xs mt-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.from_name}
            </motion.p>
          )}
        </div>
      </motion.div>

      <motion.div variants={fieldVariants}>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Téléphone <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={`mt-1 block w-full rounded-lg border py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all duration-200 ${
              errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="+229 90 00 00 00"
          />
          {errors.phone && (
            <motion.p
              className="text-red-500 text-xs mt-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.phone}
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>

    <motion.div variants={fieldVariants}>
      <label htmlFor="from_email" className="block text-sm font-medium text-gray-700 mb-1">
        Email <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type="email"
          id="from_email"
          name="from_email"
          value={formData.from_email}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-lg border py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all duration-200 ${
            errors.from_email ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="votre@email.com"
        />
        {errors.from_email && (
          <motion.p
            className="text-red-500 text-xs mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.from_email}
          </motion.p>
        )}
      </div>
    </motion.div>

    <motion.div variants={fieldVariants}>
      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
        Sujet <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-lg border py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all duration-200 ${
            errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Objet de votre message"
        />
        {errors.subject && (
          <motion.p
            className="text-red-500 text-xs mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.subject}
          </motion.p>
        )}
      </div>
    </motion.div>

    <motion.div variants={fieldVariants}>
      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
        Message <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={`mt-1 block w-full rounded-lg border py-3 px-4 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all duration-200 ${
            errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Décrivez votre demande en détails..."
        />
        {errors.message && (
          <motion.p
            className="text-red-500 text-xs mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.message}
          </motion.p>
        )}
      </div>
    </motion.div>

    <motion.div variants={fieldVariants} className="pt-2">
      <Button
        type="submit"
        className="w-full group"
        disabled={formState === 'submitting'}
      >
        {formState === 'submitting' ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="h-5 w-5 mr-2 transition-transform group-hover:translate-x-1" />
            Envoyer le message
          </>
        )}
      </Button>
    </motion.div>

    <motion.p className="text-xs text-gray-500 text-center mt-6" variants={fieldVariants}>
      En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
    </motion.p>
  </motion.form>
</div>
  );
}