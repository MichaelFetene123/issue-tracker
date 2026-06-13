import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function newIssuePage() {
  return (
    <div className='max-w-xl space-y-3'>
      <Input placeholder="Title" />
      <Textarea placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  )
}
