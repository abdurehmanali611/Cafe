"use client"

import * as React from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon, InformationCircleIcon, Alert02Icon, MultiplicationSignCircleIcon, Loading03Icon } from "@hugeicons/core-free-icons"

const Toaster = ({ ...props }: ToasterProps) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const fallbackMatchMedia = (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList

    const originalMatchMedia = window.matchMedia?.bind(window)

    window.matchMedia = ((query: string) => {
      const mediaQuery = originalMatchMedia?.(query)

      if (!mediaQuery) {
        return fallbackMatchMedia(query)
      }

      if (!("addListener" in mediaQuery)) {
        ;(mediaQuery as MediaQueryList & {
          addListener?: (listener: EventListenerOrEventListenerObject) => void
          removeListener?: (listener: EventListenerOrEventListenerObject) => void
        }).addListener = () => {}
      }

      if (!("removeListener" in mediaQuery)) {
        ;(mediaQuery as MediaQueryList & {
          addListener?: (listener: EventListenerOrEventListenerObject) => void
          removeListener?: (listener: EventListenerOrEventListenerObject) => void
        }).removeListener = () => {}
      }

      return mediaQuery
    }) as typeof window.matchMedia

    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: (
          <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-4" />
        ),
        info: (
          <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="size-4" />
        ),
        warning: (
          <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-4" />
        ),
        error: (
          <HugeiconsIcon icon={MultiplicationSignCircleIcon} strokeWidth={2} className="size-4" />
        ),
        loading: (
          <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
