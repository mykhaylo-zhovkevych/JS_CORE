"use server";

import { signOut } from "@/auth";


export const logout = async () => {

    // some server stuff before signing out the user

    await signOut();

};
