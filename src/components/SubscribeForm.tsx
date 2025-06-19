
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAccessibility, useReducedMotion } from '@/hooks/useAccessibility';

const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});
  const { toast } = useToast();
  const { announceToScreenReader } = useAccessibility();
  const prefersReducedMotion = useReducedMotion();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate email
    if (!email.trim()) {
      const error = 'Email address is required';
      setErrors({ email: error });
      announceToScreenReader(error);
      return;
    }
    
    if (!validateEmail(email)) {
      const error = 'Please enter a valid email address';
      setErrors({ email: error });
      announceToScreenReader(error);
      return;
    }

    setIsSubmitting(true);
    announceToScreenReader('Submitting subscription...');

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ 
          email: email.trim().toLowerCase(),
          subscribed_at: new Date().toISOString()
        }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "You're already on our mailing list!",
            variant: "default",
          });
          announceToScreenReader("You're already subscribed to our mailing list");
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "Thank you for subscribing to updates from Cbarrgs.",
          variant: "default",
        });
        announceToScreenReader("Successfully subscribed! Thank you for joining our mailing list");
        setEmail('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      const errorMessage = "Sorry, something went wrong. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      announceToScreenReader(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const motionProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.45, 0, 0.55, 1] }
  };

  return (
    <motion.div
      className="max-w-md mx-auto"
      {...motionProps}
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <fieldset disabled={isSubmitting}>
          <legend className="sr-only">Subscribe to Cbarrgs newsletter</legend>
          
          <div>
            <label htmlFor="email-subscribe" className="sr-only">
              Email address
            </label>
            <Input
              id="email-subscribe"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                errors.email ? 'border-red-500 focus:border-red-500' : ''
              }`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : 'email-description'}
              required
              autoComplete="email"
            />
            
            <div id="email-description" className="sr-only">
              Enter your email address to receive updates about new music and shows
            </div>
            
            {errors.email && (
              <div 
                id="email-error" 
                className="text-red-400 text-sm mt-1"
                role="alert"
                aria-live="polite"
              >
                {errors.email}
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full btn-primary" 
            disabled={isSubmitting}
            aria-describedby="submit-description"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
          
          <div id="submit-description" className="sr-only">
            Click to subscribe to Cbarrgs newsletter for music updates and announcements
          </div>
        </fieldset>
      </form>
      
      {/* Live region for form status announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" />
    </motion.div>
  );
};

export default SubscribeForm;
