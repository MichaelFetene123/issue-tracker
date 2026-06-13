"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import "easymde/dist/easymde.min.css";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface FormData {
  title: string;
  description: string;  
}

export default function newIssuePage() {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<FormData>();
    const [error, setError] = useState<string>('');

    const  submitHandler = async (data: FormData) => {
       try {
         await axios.post('/api/issues', data)
        router.push('/issues')
       } catch (error) {
         if (axios.isAxiosError(error) && error.response?.status === 400) {
           const validationErrors = error.response.data;
           if (validationErrors.title?._errors?.[0]) {
             setError(validationErrors.title._errors[0]);
           } else if (validationErrors.description?._errors?.[0]) {
             setError(validationErrors.description._errors[0]);
           } else {
             setError('Validation failed. Please check your inputs.');
           }
         } else {
           setError('Unexpected error occured.');
         }
       }
    };
  return (
   <div className='max-w-xl '>
    {error && (<Alert variant="destructive" className='mb-5'>
      <AlertDescription>{error}</AlertDescription>
    </Alert>)}
     <form onSubmit={handleSubmit(submitHandler)} className='space-y-3'>
      <Input placeholder="Title" {...register('title')} />
     < Controller
      name='description'
       control={control} 
       render={({ field }) => <SimpleMDE {...field}  placeholder='Description'/>}
      />
      <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}
