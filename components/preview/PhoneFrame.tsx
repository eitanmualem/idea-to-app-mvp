import type { ReactNode } from "react";

type PhoneFrameProps = {
    children: ReactNode;
};

export function PhoneFrame({ children }: PhoneFrameProps) {
    return (
        <div className="mx-auto w-full max-w-[320px]">
            <div className="rounded-[2.75rem] bg-black p-2 shadow-2xl">
                <div className="relative aspect-[9/18] w-full overflow-hidden rounded-[2.25rem] bg-white">
                    {/* Top notch */}
                    <div className="absolute left-1/2 top-0 z-20 h-7 w-36 -translate-x-1/2 rounded-b-3xl bg-black" />

                    {/* Screen content */}
                    <div className="h-full w-full">{children}</div>
                </div>
            </div>
        </div>
    );
}