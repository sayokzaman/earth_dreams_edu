import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        active:
          'border-transparent bg-green-300 text-green-700',
        disabled: 
          "border-transparent bg-red-200 text-rose-700",
        pending:
          'border-transparent bg-yellow-100 text-yellow-600',
        manual:
          "border-transparent bg-cyan-200 text-cyan-800",
        blue:
          "border-blue-300 dark:border-blue-300/50 dark:text-blue-300 dark:bg-blue-800/30 bg-blue-800/5 text-blue-500",
        violet:
          "border-violet-300 dark:border-violet-300/50 dark:text-violet-300 dark:bg-violet-800/30 bg-violet-800/5 text-violet-500",
        orange:
          "border-orange-300 dark:border-orange-300/50 dark:text-orange-300 dark:bg-orange-800/30 bg-orange-800/5 text-orange-500",
        rose:
          "border-rose-300 dark:border-rose-300/50 dark:text-rose-300 dark:bg-rose-800/30 bg-rose-800/5 text-rose-500",
        green:
          "border-green-300 dark:border-green-300/50 dark:text-green-300 dark:bg-green-800/30 bg-green-800/5 text-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
