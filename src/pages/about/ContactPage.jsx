import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, Phone } from "lucide-react";

function ContactMethod({ icon: Icon, title, value, href }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
      <div className="p-2 rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <a
          href={href}
          className="text-sm text-muted-foreground hover:text-primary"
        >
          {value}
        </a>
      </div>
    </div>
  );
}

function FormField({ label, id, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      {props.type === "textarea" ? (
        <textarea
          id={id}
          className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          {...props}
        />
      ) : (
        <Input id={id} {...props} />
      )}
    </div>
  );
}

function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container max-w-4xl py-6">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with our team for support or feedback
            </p>
          </div>

          <div className="space-y-4">
            <ContactMethod
              icon={Mail}
              title="Email"
              value="support@streamverse.com"
              href="mailto:support@streamverse.com"
            />
            <ContactMethod
              icon={Phone}
              title="Phone"
              value="+1 (555) 123-4567"
              href="tel:+15551234567"
            />
            <ContactMethod
              icon={MessageSquare}
              title="Live Chat"
              value="Available 24/7"
              href="#"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Office Location</h2>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-muted-foreground">
                123 StreamVerse Street
                <br />
                San Francisco, CA 94105
                <br />
                United States
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-lg border bg-card p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Name"
              id="name"
              placeholder="Your name"
              required
            />
            <FormField
              label="Email"
              id="email"
              type="email"
              placeholder="your@email.com"
              required
            />
            <FormField
              label="Subject"
              id="subject"
              placeholder="How can we help?"
              required
            />
            <FormField
              label="Message"
              id="message"
              type="textarea"
              placeholder="Tell us more about your inquiry..."
              required
            />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
