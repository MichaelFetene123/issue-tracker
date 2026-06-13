import React, { PropsWithChildren } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'



const ErrorMessage = ({ children }: PropsWithChildren) => {
    if(!children) return null;
    
  return (
    <Alert variant="destructive" aria-invalid={true} >
        {children}
    </Alert>
  )
}

export default ErrorMessage;