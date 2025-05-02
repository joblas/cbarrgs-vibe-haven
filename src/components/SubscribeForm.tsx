
import React, { useState, useRef } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { AlertCircle, Check } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  honeypot: z.string().max(0, 'Bot detected')
});

type FormValues = z.infer<typeof formSchema>;

const SubscribeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeyRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      honeypot: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Check honeypot field
      if (values.honeypot || honeyRef.current?.value) {
        console.log('Bot submission detected');
        // Fake success to fool bots
        toast({
          title: "Thanks for subscribing!",
          description: "You'll receive updates soon.",
          variant: "default"
        });
        return;
      }
      
      // Real submission
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email: values.email }]);
        
      if (error) {
        if (error.code === '23505') { // Unique violation
          toast({
            title: "Already subscribed",
            description: "This email is already on our list. Thank you!",
            variant: "default"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Thanks for subscribing!",
          description: "You'll receive updates soon.",
          variant: "default",
        });
        form.reset();
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-white/50 text-white placeholder:text-white/40 font-light"
                  required
                  aria-label="Email address"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {/* Honeypot field - hidden from users but visible to bots */}
        <input
          ref={honeyRef}
          type="text" 
          name="honeypot"
          tabIndex={-1}
          className="opacity-0 absolute top-0 left-0 h-0 w-0"
          style={{ position: 'absolute', left: '-9999px' }}
          aria-hidden="true"
          {...form.register('honeypot')}
        />
        
        <Button
          type="submit"
          className="btn-secondary text-sm"
          aria-label="Subscribe to newsletter"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    </Form>
  );
};

export default SubscribeForm;
