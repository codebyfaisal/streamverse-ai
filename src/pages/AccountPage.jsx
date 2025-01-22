import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Camera,
  Loader2,
  Trash2,
  AlertTriangle,
  UserCircle,
  Share2,
  Shield,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const urlRegex = new RegExp(
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
);

const accountFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." })
      .max(20, { message: "Username must not be longer than 20 characters." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores.",
      }),
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(30, { message: "Name must not be longer than 30 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    bio: z
      .string()
      .max(500, { message: "Bio must not be longer than 500 characters." })
      .optional(),
    phone: z
      .string()
      .regex(phoneRegex, { message: "Invalid phone number." })
      .optional()
      .or(z.literal("")),
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required to change password." })
      .optional()
      .or(z.literal("")),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
    socialLinks: z.object({
      website: z
        .string()
        .regex(urlRegex, { message: "Invalid URL." })
        .optional()
        .or(z.literal("")),
      twitter: z
        .string()
        .regex(urlRegex, { message: "Invalid URL." })
        .optional()
        .or(z.literal("")),
      instagram: z
        .string()
        .regex(urlRegex, { message: "Invalid URL." })
        .optional()
        .or(z.literal("")),
      github: z
        .string()
        .regex(urlRegex, { message: "Invalid URL." })
        .optional()
        .or(z.literal("")),
      linkedin: z
        .string()
        .regex(urlRegex, { message: "Invalid URL." })
        .optional()
        .or(z.literal("")),
    }),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Current password is required to set a new password",
      path: ["currentPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

function AccountPage() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const form = useForm({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      username: user.username,
      name: user.displayName,
      email: user.email,
      bio: "Creating awesome content about technology and programming.",
      phone: "+92 3209396952",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      socialLinks: {
        website: "https://codebyfaisal.netlify.app",
        twitter: "https://twitter.com/faisalinsights",
        instagram: "https://instagram.com/codebyfaisal",
        github: "https://github.com/codebyfaisal",
        linkedin: "https://linkedin.com/in/codebyfaisal",
      },
    },
  });    

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form data:", data);
      console.log("Avatar:", avatar);
    } catch (error) {
      console.error("Error updating account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    // Handle account deletion
    console.log("Account deletion requested");
  };  

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground text-lg">
          Manage your account settings and preferences.
        </p>
      </div>

      <Card className="border-2 hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Profile Picture</span>
          </CardTitle>
          <CardDescription>
            Upload a picture to make your account more personalized.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div
              className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group border-2 border-muted hover:border-primary transition-colors"
              onClick={handleAvatarClick}
            >
              <img
                src={avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-medium">Upload Requirements</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Square image recommended (1:1 ratio)</li>
                <li>• At least 400x400 pixels</li>
                <li>• Maximum size of 2MB</li>
                <li>• JPG, PNG, or GIF format</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCircle className="w-5 h-5" />
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription>
                Update your personal information and contact details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormDescription>Your public @username</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormDescription>Your display name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        className="focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormDescription>
                      Your primary email address for notifications
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself..."
                        className="resize-none focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0 min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a brief description that will be shown on your
                      profile
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...field}
                        className="focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormDescription>
                      Add a phone number for enhanced account security
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>Social Links</span>
              </CardTitle>
              <CardDescription>
                Connect your social media accounts to share your content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="socialLinks.website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourwebsite.com"
                          {...field}
                          className="focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://twitter.com/username"
                          {...field}
                          className="focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://instagram.com/username"
                          {...field}
                          className="focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username"
                          {...field}
                          className="focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Password</span>
              </CardTitle>
              <CardDescription>
                Keep your account secure by using a strong password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          className="focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormDescription>
                        At least 8 characters with uppercase, lowercase &
                        numbers
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          className="focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Card className="border-destructive/50 hover:border-destructive transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            <span>Danger Zone</span>
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove all of your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}

export default AccountPage;
