"use client"

import { cva } from "class-variance-authority"
import { clsx } from "clsx/lite"
import crypto from "crypto"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(36),
  username: z
    .string()
    .min(4, { message: "Username must be at least 2 characters." })
    .max(20),
  gender: z.string(),
})

const itemVariants = cva(
  "rounded-md px-3 pb-2.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-sky-400",
)

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  const { isDirty, isValid } = form.formState

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Yes, this is a terrible way to do this.
      // But it's 2002, so we're going to do it anyway.
      const password: string = crypto
        .createHash("md5")
        .update(values.password)
        .digest("hex")
      const response = await fetch("/api/register", {
        body: JSON.stringify({
          email: values.email,
          password,
          username: values.username,
          gender: values.gender,
        }),
        method: "POST",
      })

      const res = await response.json()
      if (!response.ok) throw new Error(res.message)
    } catch (err: any) {
      console.error(err.message)
    } finally {
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field, formState }) => (
            <FormItem className={clsx(itemVariants())}>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@nyxsis.io" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field, formState }) => (
            <FormItem className={clsx(itemVariants())}>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="avalonstar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, formState }) => (
            <FormItem className={clsx(itemVariants())}>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="●●●●●●●●" {...field} />
              </FormControl>
              <FormDescription className="text-pretty border-t pb-1 pt-2 text-xs text-gray-400">
                <strong>Tip:</strong> Use something strong but easy to remember.
                Password managers don&apos;t work in this 2002 game!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field, formState }) => (
            <FormItem className="p-3">
              <FormLabel>Character Gender</FormLabel>
              <FormDescription className="pb-2 text-xs">
                <strong>Note: </strong>This determines the gender of{" "}
                <strong>all</strong> the characters created on this account.
              </FormDescription>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <Image
                      src={"/images/head_male.png"}
                      alt="Male Presenting Character"
                      width={32}
                      height={32}
                    />
                    <FormControl>
                      <RadioGroupItem value="MALE" />
                    </FormControl>
                    <FormLabel>Male Presenting</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <Image
                      src={"/images/head_female.png"}
                      alt="Female Presenting Character"
                      width={32}
                      height={32}
                    />
                    <FormControl>
                      <RadioGroupItem value="FEMALE" />
                    </FormControl>
                    <FormLabel>Female Presenting</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!isDirty || !isValid}
          variant="outline"
          className="w-full"
        >
          Create Your Account
        </Button>
      </form>
    </Form>
  )
}

export default Page
