'use server';
import { directusLogin } from 'app/lib/auth';
import { LoginFormSchema } from 'app/lib/definitions';
import { redirect } from 'next/navigation';

export const login = async (prevState: any, formData: FormData) => {
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  const validatedFields = LoginFormSchema.safeParse({ email, password });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Perform login
  // Attempt to login the user
  const user = await directusLogin({ email, password }).catch((error: any) => {
    // If login fails, return an error object
    console.error('Login failed:', error);
    return {
      errors: error,
    };
  });

  // Redirect to the dashboard on success
  redirect('/dashboard');
};
