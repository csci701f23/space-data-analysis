import React from 'react'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Gallery',
    description: 'Gallery displaying past projects',
  }

export default function GalleryLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    <main>{children}</main>
  )
}
