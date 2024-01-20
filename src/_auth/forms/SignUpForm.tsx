
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SingUpValidation } from "@/lib/validation";
import {z as zod} from 'zod'
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";



function SignUpForm() {
  const isLoading = false;

  const form = useForm<zod.infer<typeof SingUpValidation>>({
    resolver: zodResolver(SingUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: '',
      password: '',
    },
  })
 
  async function onSubmit(values: zod.infer<typeof SingUpValidation>) {
    const newUser = await createUserAccount(values)
    console.log(newUser)
  }
  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-center" >Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 text-center">To use Tohagram, please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">{
            isLoading
              ? <div className="flex-center gap-2"><Loader/>Loading...</div>
              : "Sign up"
          }</Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account? 
            <Link className="text-primary-500 text-small-semibold ml-1" to="/sign-in">
              Log in
            </Link>
            </p>
        </form>
      </div>
    </Form>
  )
}

export default SignUpForm