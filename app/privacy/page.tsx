export const metadata = {
  title: 'Privacy Policy - Umbi',
  description: 'Learn how Umbi collects, uses, and protects your personal data. Includes Google AdSense, Google Analytics, and third-party service disclosures.',
};

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      {/* Hero Section */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))' }}>
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Privacy Policy
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
                Welcome to Umbi (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We are committed to protecting your privacy and ensuring transparency about how we collect, use, and share your personal information. This Privacy Policy explains our data practices when you visit our website at{' '}
                <strong>umbi-blog.vercel.app</strong> (the &quot;Site&quot;). By using our Site, you consent to the data practices described in this policy.
              </p>
            </div>

            {/* 1. Information We Collect */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                1. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--color-neutral-800)' }}>
                1.1 Information You Provide Directly
              </h3>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                We collect information that you voluntarily provide when interacting with our Site:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li><strong>Contact Form Submissions:</strong> Your name, email address, subject category, and message content when you use our Contact page</li>
                <li><strong>Comments:</strong> Your GitHub username, display name, and comment content when you participate in discussions through our Giscus commenting system</li>
                <li><strong>Newsletter Subscriptions:</strong> Your email address when you subscribe to receive updates</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--color-neutral-800)' }}>
                1.2 Information Collected Automatically
              </h3>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                When you visit our Site, certain information is collected automatically through cookies and similar technologies:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li><strong>Device Information:</strong> Browser type and version, operating system, device type (desktop, mobile, tablet), and screen resolution</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on each page, click patterns, scroll depth, and navigation paths</li>
                <li><strong>Network Information:</strong> IP address (anonymized where possible), approximate geographic location (country/region level), and referring URL</li>
                <li><strong>Technical Data:</strong> Language preferences, time zone, and JavaScript support status</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--color-neutral-800)' }}>
                1.3 Information from Third-Party Services
              </h3>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                We may receive limited information from third-party services integrated into our Site, such as authentication data from GitHub (via Giscus comments) and anonymized analytics data from Google Analytics.
              </p>
            </div>

            {/* 2. How We Use Your Information */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                2. How We Use Your Information
              </h2>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                We use the collected information for the following purposes:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-lg border-collapse mt-4" style={{ color: 'var(--color-neutral-700)' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--color-neutral-100)' }}>
                      <th className="text-left p-3 font-semibold border" style={{ borderColor: 'var(--color-neutral-200)' }}>Purpose</th>
                      <th className="text-left p-3 font-semibold border" style={{ borderColor: 'var(--color-neutral-200)' }}>Data Used</th>
                      <th className="text-left p-3 font-semibold border" style={{ borderColor: 'var(--color-neutral-200)' }}>Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Respond to inquiries</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Name, email, message</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Consent</td>
                    </tr>
                    <tr style={{ backgroundColor: 'var(--color-neutral-50)' }}>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Improve site content and performance</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Usage data, analytics</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Legitimate interest</td>
                    </tr>
                    <tr>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Display relevant advertisements</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Cookies, browsing data</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Consent</td>
                    </tr>
                    <tr style={{ backgroundColor: 'var(--color-neutral-50)' }}>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Send newsletter updates</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Email address</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Consent</td>
                    </tr>
                    <tr>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Prevent fraud and abuse</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>IP address, device info</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Legitimate interest</td>
                    </tr>
                    <tr style={{ backgroundColor: 'var(--color-neutral-50)' }}>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Comply with legal obligations</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>As required by law</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Legal obligation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Cookies and Tracking Technologies */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                3. Cookies and Tracking Technologies
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Our Site uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and serve personalized advertisements. A cookie is a small data file stored on your device when you visit a website.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--color-neutral-800)' }}>
                3.1 Types of Cookies We Use
              </h3>
              <ul className="list-disc list-inside space-y-3 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li><strong>Essential Cookies:</strong> Required for basic site functionality such as page navigation, security features, and remembering your preferences. These cookies do not collect personally identifiable information.</li>
                <li><strong>Analytics Cookies:</strong> Used by Google Analytics to track how visitors use our Site, including pages visited, session duration, and traffic sources. This data helps us improve our content and user experience.</li>
                <li><strong>Advertising Cookies:</strong> Used by Google AdSense and its partners to serve advertisements relevant to your interests. These cookies may track your browsing activity across different websites to build a profile of your interests.</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences such as theme settings, language, and previously viewed content to provide a personalized experience.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6" style={{ color: 'var(--color-neutral-800)' }}>
                3.2 Managing Your Cookie Preferences
              </h3>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or alert you when a cookie is being set. Please note that disabling cookies may affect the functionality of certain features on our Site. You can also opt out of personalized advertising by visiting{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline">Google Ads Settings</a>,{' '}
                <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline">Digital Advertising Alliance</a>, or{' '}
                <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline">Network Advertising Initiative</a>.
              </p>
            </div>

            {/* 4. Google AdSense */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                4. Google AdSense Advertising
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Our Site uses Google AdSense, a web advertising service provided by Google LLC (&quot;Google&quot;), to display advertisements. Google AdSense uses cookies, including the DoubleClick DART cookie, to serve ads based on your prior visits to our Site and other websites on the Internet.
              </p>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                <strong>How Google AdSense works on our Site:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Third-party vendors, including Google, use cookies to serve ads based on your previous visits to our Site and/or other websites</li>
                <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your browsing patterns</li>
                <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline">Google Ads Settings</a></li>
                <li>You may opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline">aboutads.info</a></li>
              </ul>
              <p className="text-lg mt-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                For more information about how Google uses data when you use our Site, please visit{' '}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline">Google&apos;s Privacy &amp; Terms page</a>.
              </p>
            </div>

            {/* 5. Google Analytics */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                5. Google Analytics
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Our Site uses Google Analytics, a web analytics service provided by Google LLC. Google Analytics uses cookies to help us analyze how visitors use our Site. The information generated by the cookie about your use of the Site (including your anonymized IP address) is transmitted to and stored by Google on servers in the United States.
              </p>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                <strong>Data collected by Google Analytics includes:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>Number of visitors and sessions</li>
                <li>Session duration and bounce rate</li>
                <li>Pages viewed and navigation paths</li>
                <li>Traffic sources (search engines, direct, referral, social)</li>
                <li>Geographic location (country/region level)</li>
                <li>Device and browser information</li>
                <li>User demographics and interests (aggregated, anonymized data)</li>
              </ul>
              <p className="text-lg mt-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                We have enabled IP anonymization in Google Analytics, which truncates your IP address before storage. You can prevent Google Analytics from collecting your data by installing the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline">Google Analytics Opt-out Browser Add-on</a>.
              </p>
            </div>

            {/* 6. Third-Party Services */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                6. Third-Party Services
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                We integrate the following third-party services into our Site. Each service has its own privacy policy governing the data it collects:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)' }}>
                  <h4 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-neutral-900)' }}>Google AdSense</h4>
                  <p style={{ color: 'var(--color-neutral-700)' }}>Advertising service that displays relevant ads on our Site. Collects browsing data and uses cookies for ad personalization.</p>
                  <p className="mt-1"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline text-sm">Google Privacy Policy</a></p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)' }}>
                  <h4 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-neutral-900)' }}>Google Analytics</h4>
                  <p style={{ color: 'var(--color-neutral-700)' }}>Web analytics service that tracks and reports website traffic. Collects anonymized usage data and device information.</p>
                  <p className="mt-1"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline text-sm">Google Privacy Policy</a></p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)' }}>
                  <h4 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-neutral-900)' }}>Supabase</h4>
                  <p style={{ color: 'var(--color-neutral-700)' }}>Backend-as-a-service platform used for database management and data storage. Stores content data and user-submitted information securely.</p>
                  <p className="mt-1"><a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline text-sm">Supabase Privacy Policy</a></p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)' }}>
                  <h4 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-neutral-900)' }}>Giscus (GitHub Discussions)</h4>
                  <p style={{ color: 'var(--color-neutral-700)' }}>Comment system powered by GitHub Discussions. Requires GitHub authentication to post comments. Collects your GitHub profile data (username, avatar) when you comment.</p>
                  <p className="mt-1"><a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline text-sm">GitHub Privacy Statement</a></p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)' }}>
                  <h4 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-neutral-900)' }}>Google Generative AI (Gemini)</h4>
                  <p style={{ color: 'var(--color-neutral-700)' }}>AI service used to assist in content generation and enhancement. No personal user data is sent to this service; it is used solely for content creation purposes.</p>
                  <p className="mt-1"><a href="https://ai.google/responsibility/principles/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline text-sm">Google AI Principles</a></p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)' }}>
                  <h4 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-neutral-900)' }}>Vercel</h4>
                  <p style={{ color: 'var(--color-neutral-700)' }}>Hosting and deployment platform. May collect basic access logs including IP addresses and request metadata for security and performance purposes.</p>
                  <p className="mt-1"><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-600)' }} className="underline text-sm">Vercel Privacy Policy</a></p>
                </div>
              </div>
            </div>

            {/* 7. Data Retention */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                7. Data Retention
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-lg border-collapse" style={{ color: 'var(--color-neutral-700)' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--color-neutral-100)' }}>
                      <th className="text-left p-3 font-semibold border" style={{ borderColor: 'var(--color-neutral-200)' }}>Data Type</th>
                      <th className="text-left p-3 font-semibold border" style={{ borderColor: 'var(--color-neutral-200)' }}>Retention Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Contact form submissions</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Up to 12 months after resolution</td>
                    </tr>
                    <tr style={{ backgroundColor: 'var(--color-neutral-50)' }}>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Newsletter subscriptions</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Until you unsubscribe</td>
                    </tr>
                    <tr>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Comments (Giscus/GitHub)</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Indefinitely (managed by GitHub)</td>
                    </tr>
                    <tr style={{ backgroundColor: 'var(--color-neutral-50)' }}>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Google Analytics data</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>26 months (Google default)</td>
                    </tr>
                    <tr>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>AdSense cookies</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Varies by cookie (managed by Google)</td>
                    </tr>
                    <tr style={{ backgroundColor: 'var(--color-neutral-50)' }}>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Server access logs</td>
                      <td className="p-3 border" style={{ borderColor: 'var(--color-neutral-200)' }}>Up to 30 days (managed by Vercel)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 8. Data Security */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                8. Data Security
              </h2>
              <p className="text-lg mb-3" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li><strong>Encryption in Transit:</strong> All data transmitted between your browser and our Site is encrypted using TLS/SSL (HTTPS)</li>
                <li><strong>Secure Hosting:</strong> Our Site is hosted on Vercel with enterprise-grade security infrastructure</li>
                <li><strong>Database Security:</strong> Data stored in Supabase is protected with row-level security (RLS) and encrypted at rest</li>
                <li><strong>Access Controls:</strong> Administrative access to our systems is restricted and protected by multi-factor authentication</li>
                <li><strong>Regular Updates:</strong> We keep all software dependencies and platforms up to date with the latest security patches</li>
              </ul>
              <p className="text-lg mt-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </div>

            {/* 9. Your Privacy Rights */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                9. Your Privacy Rights
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete personal data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;)</li>
                <li><strong>Right to Restrict Processing:</strong> Request that we limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Request your data in a structured, machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to processing of your data for certain purposes, including direct marketing</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw previously given consent at any time</li>
              </ul>
              <p className="text-lg mt-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:ummbij@gmail.com" style={{ color: 'var(--color-primary-600)' }} className="underline">ummbij@gmail.com</a>. We will respond to your request within 30 days.
              </p>
            </div>

            {/* 10. GDPR Compliance */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                10. GDPR Compliance (European Economic Area)
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have additional rights under the General Data Protection Regulation (GDPR):
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li>We process your personal data based on legitimate interests, consent, or legal obligations as outlined in Section 2</li>
                <li>You have the right to lodge a complaint with your local Data Protection Authority (DPA) if you believe your rights have been violated</li>
                <li>We will not transfer your personal data to countries outside the EEA without adequate data protection safeguards</li>
                <li>We do not engage in automated decision-making or profiling that produces legal effects concerning you</li>
              </ul>
              <p className="text-lg mt-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                <strong>Data Controller:</strong> Umbi Blog, operated by Umbi. For GDPR-related inquiries, contact us at{' '}
                <a href="mailto:ummbij@gmail.com" style={{ color: 'var(--color-primary-600)' }} className="underline">ummbij@gmail.com</a>.
              </p>
            </div>

            {/* 11. CCPA Compliance */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                11. CCPA Compliance (California Residents)
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                If you are a California resident, the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA) provide you with specific rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg" style={{ color: 'var(--color-neutral-700)' }}>
                <li><strong>Right to Know:</strong> You have the right to request disclosure of the categories and specific pieces of personal information we have collected about you in the past 12 months</li>
                <li><strong>Right to Delete:</strong> You have the right to request deletion of your personal information, subject to certain exceptions</li>
                <li><strong>Right to Opt-Out of Sale:</strong> We do not sell your personal information. However, the use of advertising cookies by Google AdSense may be considered a &quot;sale&quot; under the CCPA. You can opt out by adjusting your cookie preferences</li>
                <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights</li>
              </ul>
              <p className="text-lg mt-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                To submit a CCPA request, contact us at{' '}
                <a href="mailto:ummbij@gmail.com" style={{ color: 'var(--color-primary-600)' }} className="underline">ummbij@gmail.com</a>{' '}
                with the subject line &quot;CCPA Request.&quot; We will verify your identity before processing your request and respond within 45 days.
              </p>
            </div>

            {/* 12. Children's Privacy */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                12. Children&apos;s Privacy
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Our Site is not directed to children under the age of 13 (or 16 in the EEA). We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information promptly. If you believe we may have collected information from a child, please contact us at{' '}
                <a href="mailto:ummbij@gmail.com" style={{ color: 'var(--color-primary-600)' }} className="underline">ummbij@gmail.com</a>.
              </p>
            </div>

            {/* 13. Do Not Track */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                13. Do Not Track Signals
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Some browsers include a &quot;Do Not Track&quot; (DNT) feature that signals to websites that you do not want your online activity tracked. Due to the lack of a uniform standard for interpreting DNT signals, our Site does not currently respond to DNT browser signals. However, you can manage your tracking preferences through your browser cookie settings and the opt-out links provided in this policy.
              </p>
            </div>

            {/* 14. International Data Transfers */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                14. International Data Transfers
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                Your information may be transferred to and processed in countries other than your country of residence, including the United States, where our hosting providers and third-party services operate. These countries may have data protection laws that differ from those in your jurisdiction. By using our Site, you consent to the transfer of your information to these countries. We ensure that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
              </p>
            </div>

            {/* 15. Changes to This Policy */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                15. Changes to This Privacy Policy
              </h2>
              <p className="text-lg" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make material changes, we will update the &quot;Last Updated&quot; date at the top of this page and, where appropriate, notify you via a prominent notice on our Site. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your data. Your continued use of the Site after any changes constitutes your acceptance of the updated Privacy Policy.
              </p>
            </div>

            {/* 16. Contact Us */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-900)' }}>
                16. Contact Us
              </h2>
              <p className="text-lg mb-4" style={{ color: 'var(--color-neutral-700)', lineHeight: '1.8' }}>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
                  Response Time: We aim to respond to all privacy-related inquiries within 30 days.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
