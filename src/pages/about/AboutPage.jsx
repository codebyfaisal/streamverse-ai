import { Github, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

function AboutPage() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & Developer",
      avatar: "https://picsum.photos/seed/1/200/200",
      github: "johndoe",
      twitter: "johndoe",
      email: "john@example.com",
    },
    // Add more team members as needed
  ];

  return (
    <div className="container max-w-4xl py-6">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About StreamVerse</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            StreamVerse is a modern video streaming platform built for creators
            and viewers who love high-quality content.
          </p>
        </div>

        {/* Mission Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            We believe in empowering creators and providing viewers with the
            best possible streaming experience. Our platform is built on the
            principles of quality, accessibility, and community.
          </p>
        </div>

        {/* Features Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "High-Quality Streaming",
                description:
                  "Enjoy seamless video playback with adaptive quality settings.",
              },
              {
                title: "Creator Tools",
                description:
                  "Powerful tools for content creators to manage and grow their channels.",
              },
              {
                title: "Community Features",
                description:
                  "Engage with your audience through comments, likes, and shares.",
              },
              {
                title: "Cross-Platform",
                description:
                  "Access your content from any device, anywhere, anytime.",
              },
            ].map((feature, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center space-y-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                <div className="flex justify-center gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={`https://twitter.com/${member.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`mailto:${member.email}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
