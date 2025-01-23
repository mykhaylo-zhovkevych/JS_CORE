"use client";
// this needs wehn the hook is used
import * as z from 'zod';

import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form";
import { useSearchParams } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from '@/schemas';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";

import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from '@/actions/login';

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!" : "";

    const [ error, setError ] = useState<string | undefined>("");
    const [ success, setSuccess ] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        });
        // axios.post("/route/api", values)
    };

    return (
        <CardWrapper
        headerLabel='Welcome Back'
        backButtonLabel='Don’t have an account?'
        backButtonhref="/auth/register"
        showSocial
        >
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
            >
                <div className='space-y-4'>	
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="john.doe@example.com"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage {...field} />
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
                                    <Input
                                        disabled={isPending}
                                        {...field}
                                        placeholder="********"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <Button
                disabled={isPending}
                type="submit"
                className='w-full'
                >
                    Login
                </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
