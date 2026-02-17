"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Play, Calendar, MoreVertical, AlertCircle, CheckCircle, Clock, ChevronDown, Lock, Globe, Eye, ToggleLeft as Toggle2, Share2, Settings, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Broadcast {
  id: string
  title: string
  site: string
  customer: string
  status: "Live" | "Upcoming" | "Error" | "Finished"
  source: "Stadium Camera" | "Gym Camera" | "Production Truck" | "Hudl App" | "RTMP"
  date: string
  time: string
  privacy: "Public" | "Private" | "No Scout"
  thumbnail?: string
  prerollVideo?: string
  payPerViewEnabled: boolean
  viewCount: number
  errorMessage?: string
  sport: "Football" | "Basketball" | "Volleyball" | "Soccer" | "Baseball" | "Softball" | "Swimming" | "Cross Country" | "Wrestling" | "Lacrosse" | "Field Hockey" | "Cheer" | "Tennis"
  networkId?: string
  description?: string
  level?: "Varsity" | "JV" | "Freshman"
  resolution?: "1080p" | "720p" | "480p"
  bitrate?: string
  enableComments?: boolean
  allowDownload?: boolean
}

interface BroadcastTableProps {
  broadcasts: Broadcast[]
}

const statusConfig: Record<
  Broadcast["status"],
  { className: string; icon: React.ReactNode }
> = {
  Live: {
    className:
      "bg-emerald-100 text-emerald-700 border-emerald-200 animate-pulse",
    icon: <Play className="mr-1 h-2.5 w-2.5 fill-current" />,
  },
  Upcoming: {
    className: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Clock className="mr-1 h-2.5 w-2.5" />,
  },
  Error: {
    className: "bg-red-100 text-red-700 border-red-200",
    icon: <AlertCircle className="mr-1 h-2.5 w-2.5" />,
  },
  Finished: {
    className: "bg-secondary text-muted-foreground border-border",
    icon: <CheckCircle className="mr-1 h-2.5 w-2.5" />,
  },
}

const sportIcons: Record<Broadcast["sport"], React.ReactNode> = {
  Football: <span className="text-lg">🏈</span>,
  Basketball: <span className="text-lg">🏀</span>,
  Volleyball: <span className="text-lg">🏐</span>,
  Soccer: <span className="text-lg">⚽</span>,
  Baseball: <span className="text-lg">⚾</span>,
  Softball: <span className="text-lg">🥎</span>,
  Swimming: <span className="text-lg">🏊</span>,
  "Cross Country": <span className="text-lg">🏃</span>,
  Wrestling: <span className="text-lg">🤼</span>,
  Lacrosse: <span className="text-lg">🥍</span>,
  "Field Hockey": <span className="text-lg">🏑</span>,
  Cheer: <span className="text-lg">📣</span>,
  Tennis: <span className="text-lg">🎾</span>,
}

function StatusBadge({ status, errorMessage }: { status: Broadcast["status"]; errorMessage?: string }) {
  const config = statusConfig[status]
  const [showTooltip, setShowTooltip] = React.useState(false)

  return (
    <div className="relative">
      <button
        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${config.className} ${status === "Error" ? "cursor-help" : ""}`}
        onMouseEnter={() => status === "Error" && setShowTooltip(true)}
        onMouseLeave={() => status === "Error" && setShowTooltip(false)}
      >
        {config.icon}
        {status}
      </button>
      
      {showTooltip && status === "Error" && errorMessage && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 rounded-lg bg-foreground text-card p-3 shadow-lg z-50 text-xs">
          <p className="font-semibold mb-2">Error Details:</p>
          <p className="text-card/90">{errorMessage}</p>
        </div>
      )}
    </div>
  )
}

export function BroadcastTable({ broadcasts }: BroadcastTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedBroadcast, setSelectedBroadcast] = useState<Broadcast | null>(null)
  const [shareOpen, setShareOpen] = useState<string | null>(null)
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState<string | null>(null)
  const [actionsOpen, setActionsOpen] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [selectedBroadcasts, setSelectedBroadcasts] = useState<Set<string>>(new Set())
  const [batchSourceChange, setBatchSourceChange] = useState<Broadcast["source"] | "">("")

  return (
    <div className="space-y-4">
      {selectedBroadcasts.size > 0 && (
        <div className="flex flex-col gap-4 p-4 rounded-lg border border-primary bg-primary/5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-foreground">
              {selectedBroadcasts.size} livestream{selectedBroadcasts.size !== 1 ? 's' : ''} selected
            </div>
            <button
              onClick={() => setSelectedBroadcasts(new Set())}
              className="px-3 py-1 rounded border border-border text-foreground hover:bg-secondary transition-colors text-sm"
            >
              Clear Selection
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Change Source:</label>
              <select
                value={batchSourceChange}
                onChange={(e) => setBatchSourceChange(e.target.value as Broadcast["source"] | "")}
                className="px-3 py-1 rounded border border-border bg-background text-foreground text-sm"
              >
                <option value="">Select source...</option>
                <option value="Stadium Camera">Stadium Camera</option>
                <option value="Gym Camera">Gym Camera</option>
                <option value="Production Truck">Production Truck</option>
                <option value="Hudl App">Hudl App</option>
                <option value="RTMP">RTMP</option>
              </select>
              <button
                onClick={() => {
                  if (batchSourceChange) {
                    console.log("[v0] Batch updating sources for", Array.from(selectedBroadcasts), "to", batchSourceChange)
                    setBatchSourceChange("")
                  }
                }}
                className="px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                Apply
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Change Privacy:</label>
              <select className="px-3 py-1 rounded border border-border bg-background text-foreground text-sm">
                <option>Select privacy...</option>
                <option>Public</option>
                <option>Private</option>
                <option>No Scout</option>
              </select>
              <button className="px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
                Apply
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Change Level:</label>
              <select className="px-3 py-1 rounded border border-border bg-background text-foreground text-sm">
                <option>Select level...</option>
                <option>Varsity</option>
                <option>JV</option>
                <option>Freshman</option>
              </select>
              <button className="px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
                Apply
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Enable PPV:</label>
              <select className="px-3 py-1 rounded border border-border bg-background text-foreground text-sm">
                <option>Select option...</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <button className="px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-border bg-secondary">
              <tr>
                <th className="p-4 text-xs font-bold uppercase text-muted-foreground w-12">
                  <input
                    type="checkbox"
                    checked={selectedBroadcasts.size === broadcasts.length && broadcasts.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBroadcasts(new Set(broadcasts.map(b => b.id)))
                      } else {
                        setSelectedBroadcasts(new Set())
                      }
                    }}
                    className="w-4 h-4 cursor-pointer"
                  />
                </th>
                <th className="p-4 text-xs font-bold uppercase text-muted-foreground">
                  Livestream Info
                </th>
                <th className="p-4 text-xs font-bold uppercase text-muted-foreground">
                  Site / Customer
                </th>
                <th className="p-4 text-xs font-bold uppercase text-muted-foreground">
                  Status
                </th>
                <th className="p-4 text-xs font-bold uppercase text-muted-foreground">
                  Source
                </th>
                <th className="p-4 text-xs font-bold uppercase text-muted-foreground">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {broadcasts.map((b) => (
                <tr key={b.id} className="group transition-colors hover:bg-secondary/50">
                  <td className="p-4 w-12">
                    <input
                      type="checkbox"
                      checked={selectedBroadcasts.has(b.id)}
                      onChange={(e) => {
                        const newSelected = new Set(selectedBroadcasts)
                        if (e.target.checked) {
                          newSelected.add(b.id)
                        } else {
                          newSelected.delete(b.id)
                        }
                        setSelectedBroadcasts(newSelected)
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <Link href={`/livestream/${b.id}`} className="block">
                      <div className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
                        {sportIcons[b.sport]}
                        {b.title}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {b.date} at {b.time}
                      </div>
                    </Link>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    <div>{b.site}</div>
                    <div className="text-xs text-muted-foreground/70">{b.customer}</div>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={b.status} errorMessage={b.errorMessage} />
                  </td>
                  <td className="p-4 text-sm font-medium text-foreground">
                    <select 
                      value={b.source}
                      onChange={(e) => {
                        console.log("[v0] Source changed for", b.id, "to", e.target.value)
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1 rounded border border-border bg-background text-foreground text-sm"
                    >
                      <option>Stadium Camera</option>
                      <option>Gym Camera</option>
                      <option>Production Truck</option>
                      <option>Hudl App</option>
                      <option>RTMP</option>
                    </select>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-1 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActionsOpen(actionsOpen === b.id ? null : b.id)
                      }}
                      className="rounded-full p-2 transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label={`${actionsOpen === b.id ? "Hide" : "Show"} actions for ${b.title}`}
                    >
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </button>

                    {actionsOpen === b.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-border bg-card shadow-lg z-40">
                        <button
                          onClick={() => {
                            setEditingId(b.id)
                            setActionsOpen(null)
                          }}
                          className="w-full flex items-center gap-3 text-left text-sm px-3 py-2 rounded hover:bg-secondary transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                          Edit Livestream
                        </button>
                        <button
                          onClick={() => {
                            setDeletingId(b.id)
                            setActionsOpen(null)
                          }}
                          className="w-full flex items-center gap-3 text-left text-sm px-3 py-2 rounded hover:bg-red-50 text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Livestream
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-secondary px-4 py-3 text-sm text-muted-foreground">
          <span>
            Showing {broadcasts.length} of 248 Livestreams
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Edit Livestream</h2>
              <button
                onClick={() => setEditingId(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  defaultValue={broadcasts.find(b => b.id === editingId)?.title}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Privacy
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground">
                    <option>Public</option>
                    <option>Private</option>
                    <option>No Scout</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    PPV Enabled
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Source
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground">
                  <option>Stadium Camera</option>
                  <option>Gym Camera</option>
                  <option>Production Truck</option>
                  <option>Hudl App</option>
                  <option>RTMP</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setEditingId(null)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-2">Delete Livestream?</h2>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete "{broadcasts.find(b => b.id === deletingId)?.title}"? This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Delete Livestream
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
