"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const Social = () => {
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button size="lg" 
            className="w-full" 
            variant="outline" 
            onClick={() => console.log('Github')}
            >   
                <FcGoogle className="h-5 w-5" />
                <span>Google</span>
            </Button>

            <Button size="lg" 
            className="w-full" 
            variant="outline" 
            onClick={() => console.log('GitHub')}
            >   
                <FaGithub className="h-5 w-5" />
                <span>GitHub</span>
            </Button>
        </div>
        
    );
};