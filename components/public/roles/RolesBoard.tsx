"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { type Role } from "@/lib/roles";
import { RoleCard } from "@/components/public/roles/RoleCard";

export function RolesBoard({ roles }: { roles: Role[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.domainName.toLowerCase().includes(q) ||
        r.skills.some((s) => s.toLowerCase().includes(q))
    );
  }, [query, roles]);

  return (
    <div>
      {/* Search bar */}
      <div className="max-w-3xl mx-auto mb-10 md:mb-14">
        <label htmlFor="role-search" className="sr-only">
          Search roles by title, domain, or skill
        </label>
        <div className="flex items-stretch border border-hairline bg-paper focus-within:border-blue transition-colors">
          <input
            id="role-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by role"
            className="flex-1 px-6 py-4 text-ink text-base placeholder:text-muted/60 bg-transparent focus:outline-none"
          />
          <span
            className="w-14 shrink-0 bg-ink text-white flex items-center justify-center"
            aria-hidden="true"
          >
            <Search size={18} />
          </span>
        </div>
      </div>

      <p className="text-center text-sm text-muted mb-12 md:mb-16">
        {filtered.length} {filtered.length === 1 ? "role" : "roles"} found
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((role, i) => (
            <RoleCard key={role.slug} role={role} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-t border-hairline">
          <p className="display text-ink text-2xl mb-3">No roles match that search.</p>
          <p className="text-sm text-muted">
            Try a different title, domain, or skill, or clear the search to see
            everything.
          </p>
        </div>
      )}
    </div>
  );
}
