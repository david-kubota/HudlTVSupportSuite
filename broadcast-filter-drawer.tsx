"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function BroadcastFilterDrawer() {
  return (
    <div className="animate-in slide-in-from-top-4 space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm duration-200">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <Label className="mb-2 block text-xs font-bold uppercase text-muted-foreground">
            Status
          </Label>
          <select className="w-full rounded-md border border-border bg-background p-2 text-sm text-foreground">
            <option>All Statuses</option>
            <option>Live</option>
            <option>Upcoming</option>
            <option>Finished</option>
            <option>Error</option>
          </select>
        </div>
        <div>
          <Label className="mb-2 block text-xs font-bold uppercase text-muted-foreground">
            Sport
          </Label>
          <select className="w-full rounded-md border border-border bg-background p-2 text-sm text-foreground">
            <option>All Sports</option>
            <option>Football</option>
            <option>Basketball</option>
            <option>Volleyball</option>
            <option>Soccer</option>
            <option>Baseball</option>
            <option>Softball</option>
            <option>Swimming</option>
            <option>Cross Country</option>
            <option>Wrestling</option>
            <option>Lacrosse</option>
            <option>Field Hockey</option>
            <option>Cheer</option>
            <option>Tennis</option>
          </select>
        </div>
        <div>
          <Label className="mb-2 block text-xs font-bold uppercase text-muted-foreground">
            Level
          </Label>
          <select className="w-full rounded-md border border-border bg-background p-2 text-sm text-foreground">
            <option>All Levels</option>
            <option>Varsity</option>
            <option>JV</option>
            <option>Freshman</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <Label className="mb-2 block text-xs font-bold uppercase text-muted-foreground">
            Team
          </Label>
          <select className="w-full rounded-md border border-border bg-background p-2 text-sm text-foreground">
            <option>All Teams</option>
            <option>Lincoln High School</option>
          </select>
        </div>
        <div>
          <Label className="mb-2 block text-xs font-bold uppercase text-muted-foreground">
            Date From
          </Label>
          <input
            type="date"
            className="w-full rounded-md border border-border bg-background p-2 text-sm text-foreground"
          />
        </div>
        <div>
          <Label className="mb-2 block text-xs font-bold uppercase text-muted-foreground">
            Date To
          </Label>
          <input
            type="date"
            className="w-full rounded-md border border-border bg-background p-2 text-sm text-foreground"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button className="flex-1 bg-foreground text-card hover:bg-foreground/90">
          Apply Filters
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
