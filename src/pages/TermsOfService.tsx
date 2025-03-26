
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/transitions';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';

const TermsOfService: React.FC = () => {
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
            Terms of Service
          </motion.h1>

          <motion.div 
            className="max-w-3xl mx-auto"
            {...slideUp(0.2)}
          >
            <div className="space-y-8">
              <section aria-labelledby="terms-heading">
                <h2 id="terms-heading" className="text-2xl md:text-3xl font-bold mb-6 text-white">
                  Website Terms and Conditions
                </h2>
                
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <p>
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">
                    1. Agreement to Terms
                  </h3>
                  <p>
                    By accessing and using CBARRGS website ("the Website"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this Website.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">
                    2. Use License
                  </h3>
                  <p>
                    All content on this Website, including but not limited to text, images, audio recordings, video material, and design elements, is the property of CBARRGS and is protected by copyright and other intellectual property laws.
                  </p>
                  <p className="mt-3">
                    Permission is granted to temporarily access and view the materials on the Website for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the Website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  </ul>
                  <p className="mt-3">
                    This license shall automatically terminate if you violate any of these restrictions and may be terminated by CBARRGS at any time.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">
                    3. Music and Media Content
                  </h3>
                  <p>
                    The music, videos, and other media content available on this Website are for streaming purposes only. Unauthorized downloading, distribution, or reproduction of this content is strictly prohibited.
                  </p>
                  <p className="mt-3">
                    For any authorized use of our music (such as for covers, remixes, or in other media), please contact us directly for permission.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">
                    4. User-Generated Content
                  </h3>
                  <p>
                    Certain areas of the Website may allow users to post comments, feedback, or other content. By submitting user-generated content, you:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    <li>Guarantee that you own or have the necessary rights to the content you submit</li>
                    <li>Grant CBARRGS a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, publish, and display your content</li>
                    <li>Agree not to post content that is harmful, offensive, misleading, or violates the rights of others</li>
                  </ul>
                  <p className="mt-3">
                    CBARRGS reserves the right to remove any user-generated content at its sole discretion.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">
                    5. Merchandise and Purchases
                  </h3>
                  <p>
                    All merchandise purchases are subject to separate terms and conditions provided at the time of purchase. CBARRGS does not guarantee availability of all merchandise and reserves the right to discontinue items without notice.
                  </p>
                  <p className="mt-3">
                    Prices are subject to change without notice. We make every effort to display accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, or error-free.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">
                    6. Disclaimer
                  </h3>
                  <p>
                    The materials on CBARRGS's Website are provided "as is". CBARRGS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                  <p className="mt-3">
                    Further, CBARRGS does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Website or otherwise relating to such materials or on any sites linked to this Website.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">
                    7. Limitations
                  </h3>
                  <p>
                    In no event shall CBARRGS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Website, even if CBARRGS or a CBARRGS authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">
                    8. External Links
                  </h3>
                  <p>
                    The Website may contain links to external websites that are not provided or maintained by or in any way affiliated with CBARRGS. CBARRGS does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">
                    9. Revisions and Errata
                  </h3>
                  <p>
                    The materials appearing on the Website could include technical, typographical, or photographic errors. CBARRGS does not warrant that any of the materials on its Website are accurate, complete, or current. CBARRGS may make changes to the materials contained on its Website at any time without notice.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">
                    10. Governing Law
                  </h3>
                  <p>
                    These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">
                    11. Changes to Terms
                  </h3>
                  <p>
                    CBARRGS reserves the right to modify these Terms of Service at any time. We will inform users of any material changes by posting a notice on our Website. Your continued use of the Website after such modifications will constitute your acknowledgment of the modified Terms of Service and agreement to abide and be bound by them.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-6 mb-3 text-white">
                    12. Contact Information
                  </h3>
                  <p>
                    If you have any questions about these Terms of Service, please contact us at terms@cbarrgs.com.
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

export default TermsOfService;
