'use client'

import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { HeroSection } from '@/components/sections/HeroSection'
import { SlotMachineSection } from '@/components/sections/SlotMachineSection'
import { RsvpSection } from '@/components/sections/RsvpSection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function HomePage() {
  return (
    <>
      <LanguageToggle />
      <main>
        <HeroSection />
        <SlotMachineSection />
        <RsvpSection />
      </main>
      <FooterSection />
    </>
  )
}
