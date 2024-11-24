"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full max-w-xs flex items-center bg-light dark:bg-dark p-2 px-4 rounded-lg">
      <div>
        <MagnifyingGlassIcon className="w-5 h-5" />
      </div>
      <input
        className="w-full bg-light dark:bg-dark focus:outline-none caret-primary-500 px-2 text-sm"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
      ></input>
    </div>
  );
}
