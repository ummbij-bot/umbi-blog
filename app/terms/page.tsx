export const metadata = {
  title: 'Terms of Service - Umbi',
  description: 'Read the terms and conditions for using Umbi Blog, including disclaimers for financial and health content, intellectual property rights, and comments policy.',
};

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      {/* Hero Section */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))' }}>
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Terms of Service
          </h1>
          <p className="text-xl text-white opacity-90">
            Last Updated: February 10, 2026
          </p>
          <p className="text-lg text-white opacity-80 mt-2">
            Effective Date: January 25, 2026
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 space-y-10" style={{ boxShadow: 'var(--shadow-soft)' }}>

            {/* Introduction */}
            <div>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Welcome to Umbi (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website at{' '}
                <strong>umbi-blog.vercel.app</strong> (the &quot;Site&quot;), including all content, features, and services offered on or through the Site. Please read these Terms carefully before using our Site. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use our Site.
              </p>
            </div>

            {/* 1. Acceptance of Terms */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                1. Acceptance of Terms
              </h2>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                By accessing, browsing, or using any part of our Site, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our{' '}
                <a href="/privacy" style={{ color: 'var(--color-primary-600)' }} className="underline">Privacy Policy</a>, which is incorporated herein by reference. These Terms apply to all visitors, users, and others who access or use the Site.
              </p>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                We reserve the right to update or modify these Terms at any time without prior notice. Changes become effective immediately upon posting to the Site. Your continued use of the Site following the posting of revised Terms means you accept and agree to the changes. We encourage you to review these Terms periodically.
              </p>
            </div>

            {/* 2. Description of Service */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                2. Description of Service
              </h2>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Umbi is an educational blog that provides informational content across three main categories:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li><strong>Finance:</strong> Personal finance, budgeting, investing, and money management topics</li>
                <li><strong>Technology:</strong> Software tools, productivity applications, AI developments, and tech guides</li>
                <li><strong>Wellness:</strong> Health, fitness, nutrition, sleep, and mental well-being topics</li>
              </ul>
              <p className="text-lg mt-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Our Site also offers features including article comments (via GitHub Discussions/Giscus), a contact form, and newsletter subscriptions. All content is provided free of charge for educational and informational purposes.
              </p>
            </div>

            {/* 3. Intellectual Property Rights */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                3. Intellectual Property Rights
              </h2>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--color-neutral-800)' }}>
                3.1 Our Content
              </h3>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                All content on this Site, including but not limited to text, articles, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the property of Umbi or its content creators and is protected by international copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--color-neutral-800)' }}>
                3.2 Limited License
              </h3>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Site and its content for personal, non-commercial purposes only. Under this license, you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Reproduce, distribute, or publicly display any content from the Site without prior written consent</li>
                <li>Modify, adapt, or create derivative works based on our content</li>
                <li>Use the content for any commercial purpose, including resale or redistribution</li>
                <li>Remove any copyright, trademark, or other proprietary notices from our materials</li>
                <li>Use web scraping, data mining, or automated tools to extract content from the Site</li>
                <li>Frame, mirror, or otherwise incorporate any part of the Site into another website</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--color-neutral-800)' }}>
                3.3 Fair Use
              </h3>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                You may quote brief excerpts from our articles for commentary, criticism, or educational purposes, provided that you include proper attribution with a link back to the original article on our Site. Such use must comply with applicable fair use/fair dealing laws.
              </p>
            </div>

            {/* 4. AI-Generated Content Disclosure */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                4. AI-Generated Content Disclosure
              </h2>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Some content on our Site may be created or enhanced with the assistance of artificial intelligence (AI) tools, including Google Generative AI (Gemini). We want to be transparent about our content creation process:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>AI tools may be used to assist in researching, drafting, or editing articles</li>
                <li>All AI-assisted content is reviewed and edited by our editorial team for accuracy, quality, and relevance</li>
                <li>AI-generated images may be used as article illustrations (e.g., from Pollinations AI)</li>
                <li>We strive to ensure all content, whether human-written or AI-assisted, meets our editorial standards for accuracy and usefulness</li>
              </ul>
              <p className="text-lg mt-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                While we make every effort to verify AI-assisted content, we encourage readers to cross-reference important information with primary sources, especially for financial and health-related decisions.
              </p>
            </div>

            {/* 5. Financial Disclaimer */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                5. Financial Information Disclaimer
              </h2>
              <div className="p-6 rounded-lg mb-4" style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082' }}>
                <p className="text-lg font-semibold mb-2" style={{ color: '#E65100' }}>
                  Important Notice
                </p>
                <p className="text-lg" style={{ color: 'var(--color-neutral-800)', lineHeight: '1.8' }}>
                  The financial content on Umbi is provided strictly for educational and informational purposes only. It does NOT constitute financial advice, investment advice, tax advice, or any other type of professional financial guidance.
                </p>
              </div>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                By using our Site, you acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Our finance articles are for general educational purposes and should not be relied upon as the sole basis for any financial decision</li>
                <li>We are not registered financial advisors, investment advisors, brokers, or dealers</li>
                <li>Past performance discussed in our articles does not guarantee future results</li>
                <li>All investments carry risk, including the potential loss of principal</li>
                <li>Tax laws and financial regulations vary by jurisdiction and change frequently</li>
                <li>You should always consult with a qualified, licensed financial advisor, accountant, or tax professional before making any financial decisions</li>
                <li>We are not responsible for any financial losses or damages resulting from the use of information presented on our Site</li>
              </ul>
            </div>

            {/* 6. Health and Wellness Disclaimer */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                6. Health and Wellness Disclaimer
              </h2>
              <div className="p-6 rounded-lg mb-4" style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082' }}>
                <p className="text-lg font-semibold mb-2" style={{ color: '#E65100' }}>
                  Important Notice
                </p>
                <p className="text-lg" style={{ color: 'var(--color-neutral-800)', lineHeight: '1.8' }}>
                  The health and wellness content on Umbi is provided strictly for educational and informational purposes only. It is NOT intended as medical advice, diagnosis, or treatment and should not be used as a substitute for professional medical guidance.
                </p>
              </div>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                By using our Site, you acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Our wellness articles are for general informational purposes and are not a substitute for professional medical advice</li>
                <li>We are not licensed physicians, dietitians, or healthcare providers (unless specifically noted in contributor bios)</li>
                <li>Always consult your physician or qualified healthcare provider before starting any new exercise program, diet, or supplement regimen</li>
                <li>Individual results may vary; what works for one person may not work for another</li>
                <li>If you experience any adverse symptoms or health concerns, seek immediate medical attention</li>
                <li>We do not endorse any specific medical treatments, products, or procedures mentioned in our articles</li>
                <li>We are not responsible for any health issues, injuries, or damages resulting from the use of information presented on our Site</li>
              </ul>
            </div>

            {/* 7. Technology Content Disclaimer */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                7. Technology Content Disclaimer
              </h2>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Our technology articles provide reviews, guides, and recommendations based on our research and experience. Please be aware that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Software, tools, and services mentioned may change their features, pricing, or availability at any time</li>
                <li>We may include links to third-party products or services; we are not responsible for their content, policies, or practices</li>
                <li>Technology recommendations are based on our editorial assessment and may not suit every user&apos;s specific needs</li>
                <li>Pricing and feature information is accurate at the time of writing but may change without notice</li>
              </ul>
            </div>

            {/* 8. Comments and User-Generated Content Policy */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                8. Comments and User-Generated Content Policy
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Our Site uses Giscus, a commenting system powered by GitHub Discussions, to facilitate community engagement. By posting comments on our Site, you agree to the following:
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--color-neutral-800)' }}>
                8.1 Comment Requirements
              </h3>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>You must have a valid GitHub account to post comments</li>
                <li>You are solely responsible for the content of your comments</li>
                <li>Comments are publicly visible and stored on GitHub&apos;s servers, subject to GitHub&apos;s Terms of Service and Privacy Policy</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--color-neutral-800)' }}>
                8.2 Prohibited Content
              </h3>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                You may not post comments that contain:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Hate speech, harassment, bullying, or threats of violence</li>
                <li>Spam, advertisements, or promotional content without prior approval</li>
                <li>Copyrighted material that you do not have the right to share</li>
                <li>Personal information of others without their consent (doxxing)</li>
                <li>Malicious links, malware, or phishing attempts</li>
                <li>Illegal content or content that encourages illegal activities</li>
                <li>Sexually explicit or obscene material</li>
                <li>Misleading financial or medical advice presented as professional guidance</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--color-neutral-800)' }}>
                8.3 Moderation Rights
              </h3>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                We reserve the right to moderate, edit, or remove any comments that violate these Terms or that we deem inappropriate, without prior notice. Repeated violations may result in being blocked from commenting. Comments do not represent the views or opinions of Umbi.
              </p>
            </div>

            {/* 9. Third-Party Links and Services */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                9. Third-Party Links and Services
              </h2>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Our Site may contain links to third-party websites, services, or resources that are not owned or controlled by Umbi. We provide these links for your convenience and reference only.
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>We have no control over the content, privacy policies, or practices of any third-party websites</li>
                <li>Inclusion of a link does not imply endorsement or recommendation of the linked site</li>
                <li>You access third-party links at your own risk and should review their terms and privacy policies</li>
                <li>We are not responsible for any damages or losses arising from your use of third-party services</li>
              </ul>
            </div>

            {/* 10. Advertising */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                10. Advertising
              </h2>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Our Site displays advertisements through Google AdSense to support the free availability of our content. Regarding advertisements on our Site:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Advertisements are served by Google AdSense and its advertising partners</li>
                <li>The display of advertisements does not constitute an endorsement of the advertised products or services</li>
                <li>We do not control the content of advertisements displayed on our Site</li>
                <li>Advertisements may use cookies to serve personalized ads based on your browsing history (see our <a href="/privacy" style={{ color: 'var(--color-primary-600)' }} className="underline">Privacy Policy</a> for details)</li>
                <li>We are not responsible for the accuracy, legality, or content of any advertisements or the products/services they promote</li>
              </ul>
            </div>

            {/* 11. Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                11. Limitation of Liability
              </h2>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                To the fullest extent permitted by applicable law:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>The Site and all content are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, either express or implied</li>
                <li>We disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                <li>We do not warrant that the Site will be uninterrupted, error-free, secure, or free of viruses or other harmful components</li>
                <li>In no event shall Umbi, its operators, contributors, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Site</li>
                <li>This includes, without limitation, damages for loss of profits, data, goodwill, or other intangible losses, even if we have been advised of the possibility of such damages</li>
              </ul>
            </div>

            {/* 12. Indemnification */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                12. Indemnification
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                You agree to indemnify, defend, and hold harmless Umbi, its operators, contributors, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorney&apos;s fees) arising from or related to: (a) your use of the Site; (b) your violation of these Terms; (c) your violation of any rights of a third party; or (d) any content you post or submit through the Site, including comments.
              </p>
            </div>

            {/* 13. Prohibited Uses */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                13. Prohibited Uses
              </h2>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                You agree not to use the Site in any way that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Violates any applicable local, national, or international law or regulation</li>
                <li>Infringes upon the rights of others, including intellectual property rights</li>
                <li>Attempts to gain unauthorized access to any portion of the Site or its related systems</li>
                <li>Interferes with or disrupts the integrity or performance of the Site</li>
                <li>Introduces any viruses, trojans, worms, or other malicious code</li>
                <li>Uses automated systems (bots, scrapers, crawlers) to access the Site without our written permission</li>
                <li>Impersonates any person or entity, or falsely represents your affiliation with a person or entity</li>
                <li>Collects or harvests personal information of other users</li>
              </ul>
            </div>

            {/* 14. Governing Law */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                14. Governing Law and Dispute Resolution
              </h2>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from or relating to these Terms or your use of the Site shall first be attempted to be resolved through informal negotiation. If a resolution cannot be reached informally, both parties agree to submit to binding arbitration in accordance with applicable arbitration rules.
              </p>
            </div>

            {/* 15. Severability */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                15. Severability
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be limited or eliminated to the minimum extent necessary so that the remaining provisions of these Terms shall remain in full force and effect.
              </p>
            </div>

            {/* 16. Entire Agreement */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                16. Entire Agreement
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                These Terms, together with our <a href="/privacy" style={{ color: 'var(--color-primary-600)' }} className="underline">Privacy Policy</a>, constitute the entire agreement between you and Umbi regarding your use of the Site and supersede all prior agreements, communications, and understandings, whether written or oral, regarding such subject matter.
              </p>
            </div>

            {/* 17. Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                17. Contact Information
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                If you have any questions or concerns about these Terms of Service, please contact us:
              </p>
              <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)' }}>
                <p className="text-lg mb-2" style={{ color: 'var(--color-neutral-800)' }}><strong>Umbi Blog</strong></p>
                <p className="text-lg mb-1" style={{ color: 'var(--color-neutral-700)' }}>
                  Email: <a href="mailto:ummbij@gmail.com" style={{ color: 'var(--color-primary-600)' }} className="underline">ummbij@gmail.com</a>
                </p>
                <p className="text-lg mb-1" style={{ color: 'var(--color-neutral-700)' }}>
                  Website: <a href="https://umbi-blog.vercel.app" style={{ color: 'var(--color-primary-600)' }} className="underline">umbi-blog.vercel.app</a>
                </p>
                <p className="text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                  For legal inquiries, please include &quot;Legal Inquiry&quot; in your email subject line.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
