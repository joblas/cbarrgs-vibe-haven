
import { Resend } from 'resend';
import { renderToString } from 'react-dom/server';
import { EmailTemplate } from '../components/email-template';

// Initialize Resend with your API key
const resendApiKey = import.meta.env.VITE_RESEND_API_KEY || '';
const resend = new Resend(resendApiKey);

/**
 * Send an email using Resend
 * @param to Recipient email address
 * @param firstName Recipient's first name for the template
 * @param subject Email subject
 * @returns Promise with the email result
 */
export const sendWelcomeEmail = async (
  to: string,
  firstName: string,
  subject = 'Welcome to Cbarrgs Music'
) => {
  try {
    if (!resendApiKey) {
      console.error('Resend API key is not defined');
      return { error: 'API key missing' };
    }

    // Convert React component to HTML string
    const reactHtml = renderToString(EmailTemplate({ firstName }));

    const { data, error } = await resend.emails.send({
      from: 'Cbarrgs Music <updates@cbarrgs.com>',
      to: [to],
      subject,
      html: reactHtml,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error };
  }
};
