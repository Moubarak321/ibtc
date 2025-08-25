// lib/sendEmail.ts
import emailjs from 'emailjs-com';

export const sendEmail = async (
  form: HTMLFormElement,
  serviceID = 'service_1ib6o0n',
  templateID = 'template_q05rlxf',
  publicKey = 'OlS5NP3Ux2CJSxCJu'
): Promise<void> => {
  try {
    await emailjs.sendForm(serviceID, templateID, form, publicKey);
    console.log('Email envoyé avec succès');
  } catch (error: any) {
    console.error('Erreur lors de l’envoi de l’email :', error?.text || error);
    throw error;
  }
};
