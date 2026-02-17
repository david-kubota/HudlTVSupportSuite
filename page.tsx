"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Play, Settings, AlertCircle, Lock, Globe, Eye, Volume2, Tv, Radio } from "lucide-react"

// This would come from your database or props in a real app
const livestreamDetails = {
  id: "128456",
  title: "Varsity Football: West vs. East",
  site: "West High School",
  customer: "East High School",
  status: "Live",
  source: "Stadium Camera",
  date: "Oct 24, 2023",
  time: "7:30 PM",
  privacy: "Public",
  thumbnail: "thumbnail-128456.png",
  prerollVideo: "preroll-128456.mp4",
  payPerViewEnabled: true,
  viewCount: 2847,
  errorMessage: "",
  description: "Varsity Football game between West High School and East High School",
  duration: "120 minutes",
  bitrate: "Adaptive",
  resolution: "1080p",
}

export default function LivestreamDetailPage({ params }: { params: { id: string } }) {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)
  const livestream = livestreamDetails // In a real app, fetch based on params.id

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <div className="bg-foreground text-card shadow-lg p-6">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <Link href="/" className="flex items-center gap-2 text-card hover:text-card/80 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Livestreams</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, Admin</span>
            <div className="h-8 w-8 rounded-full border border-muted-foreground/40 bg-muted-foreground/20" />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-6 p-6">
        {/* Title and Status */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{livestream.title}</h1>
              <div className="mt-3 flex items-center gap-4 text-muted-foreground">
                <span className="text-sm">{livestream.site}</span>
                <span className="text-sm">vs {livestream.customer}</span>
                <span className="text-sm">{livestream.date} at {livestream.time}</span>
              </div>
            </div>
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${
              livestream.status === "Live" ? "bg-emerald-100 text-emerald-700 border-emerald-200 animate-pulse" : 
              livestream.status === "Upcoming" ? "bg-blue-100 text-blue-700 border-blue-200" :
              "bg-secondary text-muted-foreground border-border"
            }`}>
              <Play className="h-3 w-3 fill-current" />
              {livestream.status}
            </div>
          </div>
        </div>

        {/* Video Player Area */}
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="aspect-video bg-black flex items-center justify-center">
            <div className="text-center">
              <Tv className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">Live video player would appear here</p>
            </div>
          </div>
          <div className="p-4 border-t border-border flex items-center justify-between bg-secondary/30">
            <div className="text-sm text-muted-foreground">
              {livestream.viewCount.toLocaleString()} viewers • {livestream.resolution} • {livestream.bitrate}
            </div>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-colors flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Unmute
            </button>
          </div>
        </div>

        {/* Info and Settings Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Livestream Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Details Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-4">Livestream Details</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Livestream ID</p>
                  <p className="mt-1 text-foreground font-mono">{livestream.id}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Status</p>
                  <p className="mt-1 text-foreground">{livestream.status}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Source</p>
                  <p className="mt-1 text-foreground">{livestream.source}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Duration</p>
                  <p className="mt-1 text-foreground">{livestream.duration}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Privacy</p>
                  <p className="mt-1 flex items-center gap-2 text-foreground">
                    {livestream.privacy === "Public" ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                    {livestream.privacy}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Pay-Per-View</p>
                  <p className="mt-1 text-foreground">{livestream.payPerViewEnabled ? "Enabled" : "Disabled"}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-3">Description</p>
                <p className="text-foreground text-sm leading-relaxed">{livestream.description}</p>
              </div>
            </div>

            {/* Streaming Settings Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-4">Streaming Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <label className="text-sm font-medium text-foreground">Bitrate Control</label>
                  <select className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm">
                    <option>Adaptive (Recommended)</option>
                    <option>High (5 Mbps)</option>
                    <option>Medium (2.5 Mbps)</option>
                    <option>Low (1 Mbps)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <label className="text-sm font-medium text-foreground">Resolution</label>
                  <select className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm">
                    <option>1080p</option>
                    <option>720p</option>
                    <option>480p</option>
                  </select>
                </div>
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-colors mt-4">
                  Save Streaming Settings
                </button>
              </div>
            </div>

            {/* Access Control Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-4">Access Control</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <label className="text-sm font-medium text-foreground">Enable Comment Moderation</label>
                  <button className="inline-flex h-6 w-10 items-center rounded-full bg-primary transition-colors">
                    <div className="inline-block h-5 w-5 transform rounded-full bg-white translate-x-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <label className="text-sm font-medium text-foreground">Allow Downloads</label>
                  <button className="inline-flex h-6 w-10 items-center rounded-full bg-muted transition-colors">
                    <div className="inline-block h-5 w-5 transform rounded-full bg-white translate-x-0.5" />
                  </button>
                </div>
                <button className="w-full px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors font-semibold mt-4">
                  Save Access Control
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Analytics and Quick Actions */}
          <div className="space-y-6">
            {/* Analytics Summary */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-4">Live Analytics</h2>
              <div className="space-y-3">
                <div className="rounded-lg bg-secondary p-4">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Total Views</p>
                  <p className="mt-2 text-2xl font-bold text-primary">{livestream.viewCount.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-secondary p-4">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Unique Viewers</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{Math.floor(livestream.viewCount * 0.65).toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-secondary p-4">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Avg. Duration</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">34 min</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors text-sm font-semibold text-left">
                  ✎ Edit Livestream
                </button>
                <button className="w-full px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors text-sm font-semibold text-left">
                  ↗ Share Livestream
                </button>
                <button className="w-full px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors text-sm font-semibold text-left">
                  ⚙ Advanced Settings
                </button>
                <button className="w-full px-4 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 transition-colors text-sm font-semibold text-left">
                  🗑 Delete Livestream
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-4">Metadata</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Thumbnail</label>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <span className="text-sm text-foreground">✓ Uploaded</span>
                    <button className="text-xs text-primary hover:underline">Change</button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Pre-roll</label>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <span className="text-sm text-foreground">✓ Uploaded</span>
                    <button className="text-xs text-primary hover:underline">Change</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Settings Modal Toggle */}
        {showAdvancedSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-lg max-h-[80vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Advanced Settings</h2>
                <button
                  onClick={() => setShowAdvancedSettings(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Streaming Settings</h3>
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Bitrate Control</label>
                      <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm">
                        <option>Adaptive (Recommended)</option>
                        <option>High (5 Mbps)</option>
                        <option>Medium (2.5 Mbps)</option>
                        <option>Low (1 Mbps)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Resolution</label>
                      <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm">
                        <option>1080p</option>
                        <option>720p</option>
                        <option>480p</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Access Control</h3>
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-muted-foreground">Enable Comment Moderation</label>
                      <button className="inline-flex h-6 w-10 items-center rounded-full bg-primary transition-colors">
                        <div className="inline-block h-5 w-5 transform rounded-full bg-white translate-x-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-muted-foreground">Allow Downloads</label>
                      <button className="inline-flex h-6 w-10 items-center rounded-full bg-muted transition-colors">
                        <div className="inline-block h-5 w-5 transform rounded-full bg-white translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Metadata</h3>
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
                      <textarea className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm" rows={3} placeholder="Add livestream description..." />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Tags</label>
                      <input type="text" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm" placeholder="Enter tags separated by commas..." />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={() => setShowAdvancedSettings(false)}
                  className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAdvancedSettings(false)}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
