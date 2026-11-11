import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/transitions';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <SkipToContent />
      <Navigation />
      <main id="main-content" className="pt-20 md:pt-24">
        <div className="section-container">
          <motion.h1 
            className="section-title text-center mb-12"
            {...fadeIn()}
          >
            Privacy Policy
          </motion.h1>

          <motion.div 
            className="max-w-3xl mx-auto"
            {...slideUp(0.2)}
          >
            <div className="space-y-8">
              <section aria-labelledby="privacy-rights-heading">
                <h2 id="privacy-rights-heading" className="text-2xl md:text-3xl font-bold mb-6 text-white">
                  Privacy Rights
                </h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Do not sell or share my personal information
                  </h3>

                  <p className="mb-4 text-white/80 leading-relaxed">
                    We don't sell your personal information, and we don't share it for targeted advertising. This website runs no advertising trackers. Visit counts come from Cloudflare Web Analytics, which doesn't use cookies.
                  </p>

                  <p className="mb-4 text-white/80 leading-relaxed">
                    The music player on this site is provided by Spotify and follows Spotify's privacy policy. The merch store at shopify.cbarrgs.com runs on Shopify and has its own privacy policy.
                  </p>

                  <p className="mb-6 text-white/80 leading-relaxed">
                    To ask what personal information we hold about you, or to have it deleted, email{' '}
                    <a href="mailto:privacy@cbarrgs.com" className="underline underline-offset-4 hover:text-white">privacy@cbarrgs.com</a>.
                  </p>
                </div>
              </section>
              
              <section aria-labelledby="general-policy-heading">
                <h2 id="general-policy-heading" className="text-2xl md:text-3xl font-bold mb-6 text-white">
                  General Privacy Policy
                </h2>
                
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <p>
                    This Privacy Policy describes how CBARRGS ("we," "our," or "us") collects, uses, and discloses your personal information when you visit our website, use our services, or otherwise interact with us.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">Information We Collect</h3>
                  <p>
                    We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, make a purchase, or contact us. This information may include your name, email address, postal address, phone number, and payment information.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">How We Use Your Information</h3>
                  <p>
                    We use the information we collect to provide, maintain, and improve our services, to process your transactions, to communicate with you, and to send you marketing communications if you've opted in.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">Cookies and Similar Technologies</h3>
                  <p>
                    We use cookies and similar technologies to collect information about your browsing activities and to manage and improve our website and services. You can manage your cookie preferences through your browser settings.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">Changes to This Privacy Policy</h3>
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on our website.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">Contact Us</h3>
                  <p>
                    If you have any questions or concerns about our Privacy Policy or our data practices, please contact us at privacy@cbarrgs.com.
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
