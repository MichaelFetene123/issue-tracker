"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema'
import ErrorMessage from '@/app/components/ErrorMessage'

import "easymde/dist/easymde.min.css";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

type  FormData = z.infer<typeof createIssueSchema>

export default function newIssuePage() {
    const router = useRouter();
    const { register, control, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState<string>('');

    const  submitHandler = async (data: FormData) => {
       try {
         await axios.post('/api/issues', data)
        router.push('/issues')
       } catch (error) {
        setError('Unexpected error occured.')
       }
    };
  return (
   <div className='max-w-xl '>
    {error && (<Alert variant="destructive" aria-invalid={true} className='mb-5'>
      <AlertDescription>{error}</AlertDescription>
    </Alert>)}
     <form onSubmit={handleSubmit(submitHandler)} className='space-y-3'>
      <Input placeholder="Title" {...register('title')} />
      <ErrorMessage>
        {errors.title?.message}
        </ErrorMessage>
     < Controller
      name='description'
       control={control} 
       render={({ field }) => <SimpleMDE {...field}  placeholder='Description'/>}
      />
     <ErrorMessage>
        {errors.description?.message}
        </ErrorMessage>
      <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}
