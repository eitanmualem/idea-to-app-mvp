import type { ReactNode } from "react";

type PhoneFrameProps = {
    children: ReactNode;
};

export function PhoneFrame({ children }: PhoneFrameProps) {
    return (
        <div className="mx-auto w-full max-w-[300px]">
            <div className="rounded-[2.75rem] bg-black p-2 shadow-2xl">
                <div className="relative aspect-[9/18] w-full overflow-hidden rounded-[2.25rem] bg-white">
                    {/* Dynamic Island */}
                    <div className="absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />

                    {/* Screen content */}
                    <div className="h-full w-full">{children}</div>
                </div>
            </div>
        </div>
    );
}