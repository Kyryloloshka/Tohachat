
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpValidation } from "@/lib/validation";
import {z as zod} from 'zod'
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/querysAndMutations";
import { useUserContext } from "@/context/AuthContext";



function SignUpForm() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { checkAuthUser } = useUserContext()

  const { mutateAsync: signInAccount} = useSignInAccount() 

  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } = useCreateUserAccount()

  const form = useForm<zod.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: '',
      password: '',
    },
  })
 

  async function onSubmit(values: zod.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values)
    if (!newUser) {
      return toast({
        title: "Sign up failed. Please try again.",
      })
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session) {
      return toast({title: 'Sign in failed. Please try again.'})
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({title: 'Sign in failed. Please try again.'})
    }

  }
  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
      <div className="flex gap-1 items-center"> 
          <img src="/assets/icons/toha-logo-white.svg" alt="logo" width={56} height={56} />
          <div className=" text-3xl font-semibold">Tohachat</div>
        </div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-center" >Create a new account</h2>
        <p className="text-dark-3 small-medium md:base-regular mt-2 text-center">To use Tohachat, please enter your details</p>

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
            isCreatingUser
              ? <div className="flex-center gap-2"><Loader/>Loading...</div>
              : "Sign up"
          }</Button>
          <p className="text-small-regular text-dark-2 text-center mt-2">
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