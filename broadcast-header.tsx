"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BroadcastHeaderProps {
  activeTab?: string
}

export function BroadcastHeader({ activeTab = "livestreams" }: BroadcastHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-foreground text-card shadow-lg z-40">
      {/* Upper Nav Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-muted-foreground/20">
        <div className="text-lg font-bold text-white">Hudl</div>
        <div className="flex items-center gap-4 text-sm text-white">
          <span>Welcome, Admin</span>
          <div
            className="h-8 w-8 rounded-full border border-white/40 bg-white/10"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Lower Nav Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-muted-foreground/20">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground rounded px-2 py-1 text-sm font-bold">
            WR
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Westridge Academy</div>
          </div>
        </div>

        <h1 className="text-lg font-semibold text-white">
          vCloud{" "}
          <span className="font-light text-white/70">Livestream Management</span>
        </h1>

        <div className="flex items-center gap-4">
          <HelpDropdown />
        </div>
      </div>
    </header>
  )
}

function HelpDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-white/10 transition-colors text-white"
          aria-label="Help menu"
        >
          <HelpCircle size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>What's New</DropdownMenuItem>
        <DropdownMenuItem>Give Feedback</DropdownMenuItem>
        <DropdownMenuItem>Get Help</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
