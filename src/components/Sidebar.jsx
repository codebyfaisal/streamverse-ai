import {
  Home,
  Flame,
  Clock,
  Bookmark,
  Clapperboard,
  LogIn,
  Copyright,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";

function Sidebar({ isOpen, onClose, isVideoPage }) {
  const { isAuthenticated } = useAuth();
  const menuItems = [
    { icon: Home, text: "Home", path: "/" },
    { icon: Flame, text: "Trending", path: "/trending" },
    { icon: Clapperboard, text: "Anime", path: "/anime" },
    { icon: Clock, text: "History", path: "/history" },
    { icon: Bookmark, text: "Library", path: "/library" },
  ];

  const footerLinks = [
    { text: "About Us", path: "/about" },
    { text: "FAQ", path: "/faq" },
    { text: "Contact Us", path: "/contact" },
    { text: "Privacy", path: "/privacy" },
    { text: "Terms", path: "/terms" },
  ];

  const renderMenuButton = (item, index) => {
    const button = (
      <Button
        key={index}
        variant="ghost"
        className={cn(
          "p-2 lg:px-3 hover:bg-primary hover:text-primary-foreground",
          !isVideoPage && !isOpen && "lg:justify-center",
          "justify-start"
        )}
        asChild
        onClick={onClose}
      >
        <Link to={item.path}>
          <item.icon className="h-5 w-5 min-w-[20px]" />
          {(isOpen || window.innerWidth < 1024) &&
            !(!isOpen && !isVideoPage && window.innerWidth >= 1024) && (
              <span className="ml-3">{item.text}</span>
            )}
        </Link>
      </Button>
    );

    // Only show tooltip when sidebar is collapsed on desktop
    if (!isVideoPage && !isOpen && window.innerWidth >= 1024) {
      return (
        <Tooltip key={index}>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right">{item.text}</TooltipContent>
        </Tooltip>
      );
    }

    return button;
  };

  const renderLoginButton = () => {
    const button = (
      <Button
        variant="outline"
        className={cn(
          "hover:bg-primary hover:text-primary-foreground hover:border-primary bg-primary/90",
          !isVideoPage && !isOpen ? "lg:w-10 lg:h-10 lg:p-0" : "w-full"
        )}
        asChild
      >
        {!isAuthenticated ? (
          <Link to="/login">
            <LogIn className="h-5 w-5 min-w-[20px]" />
            {(isOpen || window.innerWidth < 1024) &&
              !(!isOpen && !isVideoPage && window.innerWidth >= 1024) && (
                <span className="ml-3">Login</span>
              )}
          </Link>
        ) : (
          "Login"
        )}
      </Button>
    );

    if (!isVideoPage && !isOpen && window.innerWidth >= 1024) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right">Login</TooltipContent>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm z-30",
            isVideoPage ? "" : "lg:hidden"
          )}
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          // Base styles
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-background border-r",
          // Width management for regular pages
          !isVideoPage && "w-[280px] lg:w-[72px]",
          !isVideoPage && isOpen && "lg:w-[240px]",
          // Width management for video pages
          isVideoPage && "w-full lg:w-[300px]",
          // Height and transitions
          "h-[calc(100vh-3.5rem)]",
          "transition-all duration-300 ease-in-out",
          // Transform
          !isOpen && "-translate-x-full",
          !isVideoPage && "lg:static lg:translate-x-0",
          isVideoPage && !isOpen && "-translate-x-full"
        )}
      >
        {/* Close button (shown on mobile and video page) */}
        <div
          className={cn(
            "flex items-center justify-between p-4",
            !isVideoPage && "lg:hidden"
          )}
        >
          <span className="font-semibold">Menu</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Close menu</TooltipContent>
          </Tooltip>
        </div>

        {/* Main menu */}
        <div className={`flex flex-col gap-2 p-2 x1l:px-6 ${isOpen ? "" : "x1l:px-4"}`}>
          {menuItems.map((item, index) => renderMenuButton(item, index))}
        </div>

        {/* Login button */}
        <div
          className={cn(
            "p-4 border-t",
            !isVideoPage && !isOpen && "lg:flex lg:justify-center"
          )}
        >
          {renderLoginButton()}
        </div>

        {/* Footer section with links */}
        <div className="mt-auto">
          {(isOpen || window.innerWidth < 1024) &&
            !(!isOpen && !isVideoPage && window.innerWidth >= 1024) && (
              <div className="px-4 pb-4 border-t">
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground pt-4">
                  {footerLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="hover:text-primary"
                      onClick={onClose}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                  <div className="flex items-center gap-1">
                    <Copyright className="h-3 w-3" />
                    <span>2024 StreamVerse</span>
                  </div>
                  <a
                    href="https://github.com/codebyfaisal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Created by codebyfaisal
                  </a>
                </div>
              </div>
            )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
