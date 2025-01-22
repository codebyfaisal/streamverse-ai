import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Menu,
  Search,
  Upload,
  User,
  LogOut,
  Settings,
  UserCircle,
  X,
  Sun,
  Moon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/components/ThemeProvider";

export default function Header({ onMenuClick }) {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pl-2 pr-4 md:pl-3 x1l:px-7">
      <div className="flex h-14 items-center gap-4 justify-between">
        {/* Mobile Search Overlay */}
        {showMobileSearch ? (
          <div className="absolute inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4 md:hidden">
            <form className="flex flex-1 items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search videos..."
                  className="w-full pl-9 ring-1 ring-primary focus-visible:ring-2 focus-visible:ring-offset-0"
                  autoFocus
                />
              </div>
            </form>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setShowMobileSearch(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="px-2 hover:bg-transparent text-black hover:text-black dark:text-white dark:hover:text-white"
                onClick={onMenuClick}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link to="/">
                <span className="font-bold text-lg text-primary">StreamVerse</span>
              </Link>
            </div>

            <div className="md:min-w-[24rem] lg:min-w-[30rem]">
              <form className="flex-1 flex justify-center w-full relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hidden md:block" />
                <Input
                  type="search"
                  placeholder="Search videos..."
                  className="w-full pl-9 ring-1 ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 hidden md:block"
                />
              </form>
            </div>

            <div className="flex items-center space-x-1">
              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowMobileSearch(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {isAuthenticated ? (
                <>
                  <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    <Sun
                      className={`h-5 w-5 ${theme === "dark" ? "" : "hidden"}`}
                    />
                    <Moon
                      className={`h-5 w-5 ${theme === "dark" ? "hidden" : ""}`}
                    />
                  </Button>
                  <Link to="/upload">
                    <Button variant="ghost" size="icon">
                      <Upload className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/notifications">
                    <Button variant="ghost" size="icon" className="mr-1">
                      <Bell className="h-5 w-5" />
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-primary/80 p-1"
                      >
                        <img
                          src={user.avatar}
                          alt="User"
                          className="w-8 h-8 rounded-full"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.username}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <Link to={`/user/profile/${user.username}`}>
                        <DropdownMenuItem>
                          <UserCircle className="w-4 h-4 mr-2" />
                          Profile
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/user/account">
                        <DropdownMenuItem>
                          <User className="w-4 h-4 mr-2" />
                          Account
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/settings">
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login" className="hidden md:block">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ring-1 ring-primary"
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
