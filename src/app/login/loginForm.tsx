"use client";

import { login } from "app/actions/auth";
import { useActionState } from "react";
import {
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button, Input } from "@heroui/react";
import React from 'react';
import { EyeSlashFilledIcon } from 'app/ui/EyeSlashFilledIcon';
import { EyeFilledIcon } from 'app/ui/EyeFilledIcon';

export function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        login,
        undefined,
    );

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <form action={formAction} className="space-y-3">
            {/* Header */}
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className="mb-3 text-2xl text-gray-900">Please log in to continue</h1>
                {/* Email Input */}
                <div>
                    <Input
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email address"
                        isRequired
                        errorMessage="Please enter a valid email"
                    />
                </div>
                {/* Password Input */}
                <div className="mt-4">
                    <Input
                        id="password"
                        name="password"
                        label="Password"
                        variant="bordered"
                        placeholder="Enter your password"
                        errorMessage="Please enter a valid password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="max-w-xs text-gray"
                    />
                </div>
                {/* Submit Button */}
                <Button type="submit" className="mt-4 w-full" aria-disabled={isPending} color="primary">
                    Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
                {/* Error Message */}
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">Login failed: Invalid user credentials.</p>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}
