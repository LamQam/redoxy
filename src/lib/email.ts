// In src/lib/email.ts
import { supabase } from './supabase'

export const sendContactFormNotification = async (formData: any): Promise<void> => {
  try {
    const { data, error } = await supabase.functions.invoke('send-contact-email', {
      body: { formData }
    })

    if (error) {
      console.error('Error calling send-contact-email function:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    if (data?.error) {
      console.error('Error from send-contact-email function:', data.error)
      throw new Error(`Failed to send email: ${data.error}`)
    }

    console.log('Email sent successfully via Resend')
  } catch (error) {
    console.error('Error in sendContactFormNotification:', error)
    throw error
  }
}