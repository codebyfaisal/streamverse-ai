function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 2024</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Information We Collect</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>We collect information you provide directly to us when you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create an account</li>
              <li>Upload or interact with content</li>
              <li>Communicate with other users</li>
              <li>Contact our support team</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            How We Use Your Information
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Process your transactions</li>
              <li>Send you updates and marketing communications</li>
              <li>Detect and prevent fraud</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Rights</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a href="mailto:privacy@streamverse.com" className="text-primary">
              privacy@streamverse.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPage;
