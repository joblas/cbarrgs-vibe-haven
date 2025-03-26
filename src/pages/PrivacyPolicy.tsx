
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/transitions';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import SkipToContent from '@/components/SkipToContent';

const PrivacyPolicy: React.FC = () => {
  const [isOptedOut, setIsOptedOut] = useState(false);
  const [shareAccountData, setShareAccountData] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleOptOut = () => {
    setIsOptedOut(true);
    // In a real app, this would send the opt-out preference to a server
    console.log('User opted out', { shareAccountData, email });
  };

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
                  <h3 className="text-xl font-bold mb-4 text-green-500">
                    Do not sell or share my personal information
                  </h3>
                  
                  <p className="mb-4 text-white/80 leading-relaxed">
                    As described in our Privacy Policy, we collect personal information from your interactions with us and our website, including through cookies and similar technologies. We may also share this personal information with third parties, including advertising partners. We do this in order to show you ads on other websites that are more relevant to your interests and for other reasons outlined in our privacy policy.
                  </p>
                  
                  <p className="mb-4 text-white/80 leading-relaxed">
                    Sharing of personal information for targeted advertising based on your interaction on different websites may be considered "sales", "sharing", or "targeted advertising" under certain U.S. state privacy laws. Depending on where you live, you may have the right to opt out of these activities. If you would like to exercise this opt-out right, please follow the instructions below.
                  </p>
                  
                  <p className="mb-6 text-white/80 leading-relaxed">
                    If you visit our website with the Global Privacy Control opt-out preference signal enabled, depending on where you are, we will treat this as a request to opt-out of activity that may be considered a "sale" or "sharing" of personal information or other uses that may be considered targeted advertising for the device and browser you used to visit our website.
                  </p>
                  
                  <p className="mb-6 text-white/80 leading-relaxed">
                    By clicking "opt out", the browser on this device will be opted out of sharing personal data. If you select the checkbox and enter an email, the related customer account will also be opted out.
                  </p>
                  
                  <div className="mb-6 flex items-center space-x-2">
                    <Checkbox 
                      id="share-data-checkbox" 
                      checked={shareAccountData} 
                      onCheckedChange={(checked) => setShareAccountData(checked as boolean)}
                      aria-label="Don't share data from my account"
                    />
                    <label 
                      htmlFor="share-data-checkbox" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Don't share data from my account (optional)
                    </label>
                  </div>
                  
                  {shareAccountData && (
                    <div className="mb-6">
                      <label htmlFor="email-input" className="block mb-2 text-sm font-medium">
                        Email address
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-white/50 text-white placeholder:text-white/50"
                        placeholder="Enter your email"
                        aria-describedby="email-description"
                      />
                      <p id="email-description" className="mt-1 text-sm text-white/60">
                        We'll use this to opt out all data associated with your account.
                      </p>
                    </div>
                  )}
                  
                  <button
                    onClick={handleOptOut}
                    className="btn-primary"
                    aria-live="polite"
                    disabled={isOptedOut}
                  >
                    {isOptedOut ? "Opted out" : "Opt out"}
                  </button>
                  
                  {isOptedOut && (
                    <div className="mt-4 flex items-center text-green-500 space-x-2" role="status">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>The browser on this device is opted out</span>
                    </div>
                  )}
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
