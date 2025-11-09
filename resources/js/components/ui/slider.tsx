// components/ui/slider.tsx
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className="relative h-2 w-full overflow-hidden rounded-full bg-muted"
    >
      {/* make the filled range very visible */}
      <SliderPrimitive.Range className="absolute h-full bg-theme-secondary" />
    </SliderPrimitive.Track>

    {/* bigger thumbs + better hit area + focus ring */}
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full border border-border bg-background shadow transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50 hover:border-theme-secondary",
        // fat invisible hitbox:
        "after:absolute after:-inset-2 after:content-['']"
      )}
    />
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full border border-border bg-background shadow transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50 hover:border-theme-secondary",
        "after:absolute after:-inset-2 after:content-['']"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
