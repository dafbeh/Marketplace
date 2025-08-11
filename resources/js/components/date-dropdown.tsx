"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type DropDownProps = {
  value: string
  onChange: (value: string) => void
}

export function DropDown({ value, onChange }: DropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {value === "0" ? "Last day" : value === "1" ? "Last 7 days" : "Last 31 days"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-38">
        <DropdownMenuLabel>Select date range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          <DropdownMenuRadioItem value="0">Last day</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="1">Last 7 days</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="2">Last 31 days</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}