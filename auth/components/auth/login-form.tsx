"use client";
// this needs when the hook is used
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
import Link from "next/link";

import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from '@/actions/login';

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!" : "";

    const [ showTwoFactor, setShowTwoFactor ] = useState(false);
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
                    if (data?.error) {
                        form.reset();
                        setError(data?.error);
                    }
                    if (data?.success) {
                        form.reset();
                        setSuccess(data?.success);
                    }
                    if (data?.twoFactor) {
                 
                        setShowTwoFactor(true);
                    }  
                }) 
                    .catch(() => setError("Something went wrong!"));
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
                    { showTwoFactor && (
                        <FormField 
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Two Factor Code</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="123456"
                                    />
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )}
                    />
                    )}
                    { !showTwoFactor && (
                    <>
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
                                <>
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
                                    <Button size="sm" variant="link" asChild className='px-0 font-normal'>
                                        <Link href="/auth/reset">
                                            Forgot the password?
                                        </Link>
                                    </Button>
                                </>
                            )}
                        />
                    </>
                )}
                </div>
         
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <Button
                disabled={isPending}
                type="submit"
                className='w-full'
                >
                    { showTwoFactor ? "Verify" : "Login" }
                </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
