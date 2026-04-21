type ScreenPreviewProps = {
    title: string;
    description: string;
};

export function ScreenPreview({
    title,
    description,
}: ScreenPreviewProps) {
    return (
        <div className="flex h-full flex-col bg-white">
            {/* Fake status bar spacer */}
            <div className="h-8 shrink-0" />

            {/* App header */}
            <div className="border-b px-4 py-3">
                <div className="text-base font-semibold text-black">{title}</div>
            </div>

            {/* Scrollable preview content */}
            <div className="flex-1 space-y-3 overflow-hidden p-4">
                {/* Hero card */}
                <button
                    type="button"
                    className="block w-full rounded-2xl border p-4 text-left shadow-sm transition active:scale-[0.99]"
                >
                    <div className="mb-2 h-4 w-24 rounded bg-neutral-200" />
                    <p className="text-sm text-neutral-600">{description}</p>
                </button>

                {/* List cards */}
                <button
                    type="button"
                    className="block w-full rounded-2xl border p-3 text-left transition active:scale-[0.99]"
                >
                    <div className="mb-2 h-4 w-20 rounded bg-neutral-200" />
                    <div className="space-y-2">
                        <div className="h-3 w-full rounded bg-neutral-100" />
                        <div className="h-3 w-5/6 rounded bg-neutral-100" />
                    </div>
                </button>

                <button
                    type="button"
                    className="block w-full rounded-2xl border p-3 text-left transition active:scale-[0.99]"
                >
                    <div className="mb-2 h-4 w-16 rounded bg-neutral-200" />
                    <div className="space-y-2">
                        <div className="h-3 w-full rounded bg-neutral-100" />
                        <div className="h-3 w-2/3 rounded bg-neutral-100" />
                    </div>
                </button>

                {/* Primary CTA */}
                <button
                    type="button"
                    className="w-full rounded-xl border border-white bg-black px-4 py-3 text-sm text-white transition active:scale-[0.99]"
                >
                    Continue
                </button>
            </div>

            {/* Bottom tab bar */}
            <div className="grid grid-cols-3 border-t bg-white px-2 py-2">
                <button type="button" className="rounded-lg px-2 py-2 text-xs font-medium text-black">
                    Home
                </button>
                <button type="button" className="rounded-lg px-2 py-2 text-xs text-neutral-400">
                    Explore
                </button>
                <button type="button" className="rounded-lg px-2 py-2 text-xs text-neutral-400">
                    Profile
                </button>
            </div>
        </div>
    );
}