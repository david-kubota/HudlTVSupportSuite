"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface BroadcastNavSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BroadcastNavSidebar({
  activeTab,
  onTabChange,
}: BroadcastNavSidebarProps) {
  const [resourcesOpen, setResourcesOpen] = useState(false)

  const mainNavItems = [
    { id: "livestreams", label: "Livestreams" },
    { id: "analytics", label: "Analytics" },
    { id: "users", label: "Users" },
    { id: "settings", label: "Settings" },
    { id: "ppv", label: "Pay-Per-View" },
  ]

  const resourceItems = [
    { id: "fans", label: "Fans" },
    { id: "production-truck", label: "Production Truck" },
  ]

  return (
    <aside className="fixed left-0 top-28 h-[calc(100vh-112px)] w-64 bg-foreground text-white shadow-lg border-r border-muted-foreground/20 flex flex-col z-40">

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2 pt-0">
        {/* Main Navigation */}
        <div className="space-y-2">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Resources Section */}
        <div className="pt-4">
          <button
            onClick={() => setResourcesOpen(!resourcesOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase text-white/70 hover:text-white transition-colors"
          >
            <span>Resources</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
            />
          </button>
          {resourcesOpen && (
            <div className="space-y-2 pl-2 mt-2">
              {resourceItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Footer Links */}
      <div className="border-t border-muted-foreground/20 px-3 py-4">
        <a
          href="https://vcloud.hudl.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors mb-3"
        >
          Legacy vCloud
        </a>
        <div className="border-t border-muted-foreground/20 pt-3">
          <a
            href="https://fan.hudl.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            Hudl Fan →
          </a>
        </div>
      </div>
    </aside>
  )
}
