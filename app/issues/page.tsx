import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function IssuesPage() {
  return (
    <div>
        <h2>Issue Page</h2>
        <div>
            <Button><Link href="/issues/new">New Issue</Link></Button>
        </div>
    </div>

  )
}