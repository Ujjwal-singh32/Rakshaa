"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    (<TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props} />)
=======
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props} />
>>>>>>> 05cc324dc894f7e259f90ca9adbcc3e8f8f8684c
  );
}

function TabsList({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    (<TabsPrimitive.List
=======
    <TabsPrimitive.List
>>>>>>> 05cc324dc894f7e259f90ca9adbcc3e8f8f8684c
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
<<<<<<< HEAD
      {...props} />)
=======
      {...props} />
>>>>>>> 05cc324dc894f7e259f90ca9adbcc3e8f8f8684c
  );
}

function TabsTrigger({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    (<TabsPrimitive.Trigger
=======
    <TabsPrimitive.Trigger
>>>>>>> 05cc324dc894f7e259f90ca9adbcc3e8f8f8684c
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
<<<<<<< HEAD
      {...props} />)
=======
      {...props} />
>>>>>>> 05cc324dc894f7e259f90ca9adbcc3e8f8f8684c
  );
}

function TabsContent({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    (<TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props} />)
=======
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props} />
>>>>>>> 05cc324dc894f7e259f90ca9adbcc3e8f8f8684c
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
