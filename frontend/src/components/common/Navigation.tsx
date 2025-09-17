import React, { useState } from "react";
import { SquareActivity, QrCode, FileText, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import gradientBackground from "@/assets/6bd48d86654bce1db831d2562ca2d8e0b37b4902.png";

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Navigation({ currentView, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "scan", label: "Scan Asset", icon: QrCode },
    { id: "dashboard", label: "Dashboard", icon: SquareActivity },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleNavigate = (view: string) => {
    onNavigate(view);
    setIsMenuOpen(false); // close mobile menu after navigating
  };

  return (
    <nav
      className="border-b border-border relative"
      style={{
        backgroundImage: `url(${gradientBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      role="navigation"
      aria-label="Main"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <SquareActivity className="w-6 h-6 text-white" />
            <span className="text-lg sm:text-xl font-medium text-white">Asset Health AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center gap-2 ${!isActive ? 'text-white hover:text-white hover:bg-white/20' : ''}`}
                  size="sm"
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-2 text-white hover:text-white hover:bg-white/20"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            id="mobile-nav"
            className="md:hidden border-t border-white/20"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full justify-start flex items-center gap-3 ${!isActive ? 'text-white hover:text-white hover:bg-white/20' : ''}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
