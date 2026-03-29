import { useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface AgeStepProps {
  onNext: () => void
}

const days = Array.from({ length: 31 }, (_, i) => i + 1)
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

const ITEM_HEIGHT = 44

function ScrollPicker({ items, defaultIndex = 0 }: { items: (string | number)[]; defaultIndex?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const isDragging = useRef(false)
  const startY = useRef(0)
  const startScrollTop = useRef(0)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = defaultIndex * ITEM_HEIGHT
    }
  }, [defaultIndex])

  const updateStyles = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.top + containerRect.height / 2

    itemRefs.current.forEach((el) => {
      if (!el) return
      const itemRect = el.getBoundingClientRect()
      const itemCenter = itemRect.top + itemRect.height / 2
      const distance = Math.abs(containerCenter - itemCenter)
      const isSelected = distance < ITEM_HEIGHT / 2
      const maxDistance = containerRect.height / 2
      const scale = Math.max(0.85, 1 - (distance / maxDistance) * 0.15)
      el.style.color = isSelected ? "#0a0a0a" : "#a3a3a3"
      el.style.fontWeight = isSelected ? "600" : "400"
      el.style.transform = `scale(${scale})`
    })
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    updateStyles()
    container.addEventListener("scroll", updateStyles, { passive: true })
    return () => container.removeEventListener("scroll", updateStyles)
  }, [updateStyles])

  // Mouse drag to scroll
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    startY.current = e.clientY
    startScrollTop.current = scrollRef.current?.scrollTop ?? 0
    document.body.style.userSelect = "none"
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return
      const delta = startY.current - e.clientY
      scrollRef.current.scrollTop = startScrollTop.current + delta
    }

    const handleMouseUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      document.body.style.userSelect = ""
      // Snap to nearest item
      if (scrollRef.current) {
        const index = Math.round(scrollRef.current.scrollTop / ITEM_HEIGHT)
        scrollRef.current.scrollTo({ top: index * ITEM_HEIGHT, behavior: "smooth" })
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div className="relative h-[220px] flex-1">
      {/* Selection indicator */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[44px] border-t border-b border-muted-foreground/10 pointer-events-none z-10" />
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
      {/* Scrollable area */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        className="h-full overflow-y-scroll snap-y snap-mandatory cursor-grab active:cursor-grabbing"
        style={{
          paddingTop: 88,
          paddingBottom: 88,
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el }}
            className="h-[44px] flex items-center justify-center snap-center text-base select-none"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AgeStep({ onNext }: AgeStepProps) {
  return (
    <div className="flex flex-col flex-1 pt-4">
      <div className="flex-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Enter your age
        </h2>
        <p className="text-muted-foreground text-sm mt-4">
          We'll use this to personalize<br />your experience
        </p>
        <div className="flex gap-0 mt-8">
          <ScrollPicker items={days} defaultIndex={17} />
          <ScrollPicker items={months} defaultIndex={9} />
          <ScrollPicker items={years} defaultIndex={1} />
        </div>
      </div>
      <div className="pb-4">
        <Button
          onClick={onNext}
          className="w-full h-12 rounded-full text-base font-medium"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
