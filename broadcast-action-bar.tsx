"use client"

import { Search, Filter, Download, ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ActionBarProps {
  filterOpen: boolean
  onToggleFilter: () => void
}

export function BroadcastActionBar({ filterOpen, onToggleFilter }: ActionBarProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1 md:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Livestream ID, Title, or Site..."
              className="pl-10 shadow-sm focus-visible:ring-primary"
            />
          </div>

          <div className="flex w-full sm:w-auto gap-2">
            <Button
              variant={filterOpen ? "default" : "outline"}
              onClick={onToggleFilter}
              className={
                filterOpen
                  ? "bg-primary/10 text-primary border-primary hover:bg-primary/20 border"
                  : ""
              }
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${filterOpen ? "rotate-180" : ""}`}
              />
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="ml-auto sm:ml-0 bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Livestream
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
