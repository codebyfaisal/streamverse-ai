function TermsPage() {
  return (
    <div className="container max-w-4xl py-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Terms and Conditions</h1>
          <p className="text-muted-foreground">Last updated: March 2024</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using StreamVerse, you accept and agree to be bound
            by the terms and conditions of this agreement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. User Accounts</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>When creating an account on StreamVerse, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
              <li>Not share your account credentials</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Content Guidelines</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>Users must not upload content that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Infringes on intellectual property rights</li>
              <li>Contains hate speech or harassment</li>
              <li>Promotes violence or illegal activities</li>
              <li>Contains explicit or adult content</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Termination</h2>
          <p className="text-muted-foreground">
            We reserve the right to terminate or suspend access to our service
            immediately, without prior notice or liability, for any reason
            whatsoever.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Changes to Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these terms at any time. We will
            notify users of any changes by updating the date at the top of this
            page.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-muted-foreground">
            Questions about the Terms of Service should be sent to us at{" "}
            <a href="mailto:terms@streamverse.com" className="text-primary">
              terms@streamverse.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsPage;
