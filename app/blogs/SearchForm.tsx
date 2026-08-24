"use client";

import { useRouter } from "next/navigation";

interface SearchFormProps {
    initialValue?: string;
}

export default function SearchForm({ initialValue }: SearchFormProps) {
    const router = useRouter();

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const filter = formData.get("filter") as string;

        const params = new URLSearchParams();
        if (filter && filter.trim() !== "") {
            params.set("filter", filter.trim());
        } else {
            params.delete("filter");
        }

        router.push(`/blogs?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                type="text"
                name="filter"
                data-testid="filter-input"
                defaultValue={initialValue}
                placeholder="Search blogs by title.."
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
            />
            <button
                type="submit"
                data-testid="search-button"
                className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
            >
                Search
            </button>
        </form>
    );
}