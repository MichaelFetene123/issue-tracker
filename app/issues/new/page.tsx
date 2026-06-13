"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";

export default function newIssuePage() {
  return (
    <div className='max-w-xl space-y-3'>
      <Input placeholder="Title" />
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  )
}
