"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";

interface FormData {
  title: string;
  description: string;  
}

export default function newIssuePage() {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<FormData>();

    const  submitHandler = async (data: FormData) => {
        await axios.post('/api/issues', data)
        router.push('/issues')
    };
  return (
    <form onSubmit={handleSubmit(submitHandler)} className='max-w-xl space-y-3'>
      <Input placeholder="Title" {...register('title')} />
     < Controller
      name='description'
       control={control} 
       render={({ field }) => <SimpleMDE {...field}  placeholder='Description'/>}
      />
      
   
      
      <Button>Submit New Issue</Button>
    </form>
  )
}
