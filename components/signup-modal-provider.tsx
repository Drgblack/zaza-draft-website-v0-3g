"use client"

import { useState, useEffect } from "react"
import { SignupModal } from "./signup-modal"

export function SignupModalProvider() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpenSignup = () => {
      setIsOpen(true)
    }

    window.addEventListener("openSignupModal", handleOpenSignup)

    return () => {
      window.removeEventListener("openSignupModal", handleOpenSignup)
    }
  }, [])

  return <SignupModal open={isOpen} onOpenChange={setIsOpen} />
}

