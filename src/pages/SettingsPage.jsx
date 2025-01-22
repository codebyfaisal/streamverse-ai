import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  ChevronRight,
  Globe,
  Key,
  LayoutGrid,
  Lock,
  Moon,
  Shield,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Link } from "react-router-dom";

function SettingSection({ icon: Icon, title, description, children }) {
  return (
    <div className="flex items-start gap-4 py-6">
      <div className="mt-0.5">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 space-y-1">
        <div>
          <h3 className="text-lg font-medium leading-6">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function SettingRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{label}</span>
      </div>
      {children}
    </div>
  );
}

function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("English");

  return (
    <div className="container max-w-4xl py-6">
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

      {/* Account Settings */}
      <SettingSection
        icon={User}
        title="Account Settings"
        description="Manage your account information and preferences"
      >
        <div className="space-y-1 divide-y pt-4">
          <SettingRow icon={User} label="Profile Information">
            <Link to="/user/account">
              <Button variant="ghost" className="text-sm">
                Edit Profile
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </SettingRow>
          <SettingRow icon={Key} label="Password">
            <Link to="/user/account#12qw">
              <Button variant="ghost" className="text-sm">
                Change Password
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </SettingRow>

          <div className="cursor-not-allowed text-muted-foreground" disabled>
            <SettingRow icon={Shield} label="Two-Factor Authentication">
              <Button variant="ghost" className="text-sm" disabled>
                Enable 2FA
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </SettingRow>
          </div>
        </div>
      </SettingSection>

      {/* Appearance Settings */}
      <SettingSection
        icon={LayoutGrid}
        title="Appearance"
        description="Customize your viewing experience"
      >
        <div className="space-y-1 divide-y pt-4">
          <SettingRow icon={theme === "dark" ? Moon : Sun} label="Theme Mode">
            <Button variant="outline" onClick={toggleTheme}>
              {theme === "dark" ? "Dark" : "Light"}
            </Button>
          </SettingRow>
          <SettingRow icon={Globe} label="Language">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Japanese</option>
            </select>
          </SettingRow>
        </div>
      </SettingSection>

      {/* Privacy Settings */}
      <SettingSection
        icon={Lock}
        title="Privacy"
        description="Manage your privacy and security settings"
      >
        <div className="space-y-1 divide-y pt-4">
          <SettingRow icon={Lock} label="Private Account">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </SettingRow>
          <SettingRow icon={Bell} label="Email Notifications">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </SettingRow>
        </div>
      </SettingSection>

      {/* Danger Zone */}
      <SettingSection
        icon={Shield}
        title="Danger Zone"
        description="Irreversible and destructive actions"
      >
        <div className="space-y-4 pt-2">
          <Button variant="destructive" className="w-full sm:w-auto">
            Delete Account
          </Button>
        </div>
      </SettingSection>
    </div>
  );
}

export default SettingsPage;
