"use server";
import * as z from "zod";
import { AuthError } from "next-auth";

import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";

import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, code } = validatedFields.data;


    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" }
    }

    if (!existingUser.emailVerified) {
        const verficationToken = await generateVerificationToken(
            existingUser.email,
        );

        await sendVerificationEmail(verficationToken.email, verficationToken.token);

        return { success: "Confirmation email sent!" };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(
                existingUser.email
            );
            if (!twoFactorToken) {
                return { error: "Invalid 2FA code!" };
            }

            if (twoFactorToken.token !== code) {
                return { error: "Invalid 2FA code!" };
            }

            const hasExpired = new Date(twoFactorToken.expires).getTime() < new Date().getTime();
            
            if (hasExpired) {
                return { error: "2FA code has expired!" };
            }
    


            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id }
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                }
            });
        }
        else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);

        await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token
        );

        return { twoFactor: true };
        }
    }

    try {
      await signIn ("credentials", {
        email, password, redirectTo: DEFAULT_LOGIN_REDIRECT,
      })
    } catch (error) {
        if (error instanceof AuthError ) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

    throw error;

    }
};