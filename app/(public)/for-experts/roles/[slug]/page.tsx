import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { roles, getRoleBySlug, formatPay, ABOUT_AIG } from "@/lib/roles";
import { RoleApplyForm } from "@/components/public/roles/RoleApplyForm";

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(
  props: PageProps<"/for-experts/roles/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const role = getRoleBySlug(slug);
  if (!role) return {};
  return {
    title: role.title,
    description: `Apply for the ${role.title} role at AIG Force. ${role.roleType}, ${role.location}, ${formatPay(role)}.`,
  };
}

export default async function RoleDetailPage(
  props: PageProps<"/for-experts/roles/[slug]">
) {
  const { slug } = await props.params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  return (
    <section className="bg-paper px-6 pt-36 pb-24 md:pt-40">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/for-experts/roles"
          className="machine text-muted hover:text-blue transition-colors inline-block mb-10"
        >
          ← All opportunities
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left — role detail */}
          <div className="lg:col-span-7">
            <h1 className="display text-ink text-4xl md:text-5xl mb-6">
              {role.title}
            </h1>

            <span className="inline-block bg-bone border border-hairline px-4 py-2 text-sm font-semibold text-ink mb-10">
              {formatPay(role)}
              <span className="text-muted font-normal"> · pay</span>
            </span>

            {/* Skills */}
            <h2 className="eyebrow text-blue mb-5">Required skills</h2>
            <div className="flex flex-wrap gap-2 mb-12">
              {role.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm text-ink bg-bone border border-hairline px-3.5 py-2"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* About AIG Force */}
            <div className="bg-bone border border-hairline p-6 md:p-8 mb-12">
              <h2 className="display text-ink text-xl mb-4">About AIG Force</h2>
              <p className="text-sm text-muted leading-relaxed">{ABOUT_AIG}</p>
            </div>

            {/* Role facts */}
            <dl className="space-y-3 mb-12">
              {[
                ["Role title", role.title],
                ["Role type", role.roleType],
                ["Location", role.location],
                ["Domain", role.domainName],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3 text-sm">
                  <dt className="text-muted w-28 shrink-0">{label}</dt>
                  <dd className="text-ink font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="text-base text-ink leading-relaxed mb-12">
              {role.summary}
            </p>

            {/* Scope of work */}
            <h2 className="display text-ink text-2xl mb-5">Scope of work</h2>
            <ul className="space-y-3 mb-12">
              {role.scope.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted leading-relaxed">
                  <span className="text-blue mt-1.5 shrink-0" aria-hidden="true">
                    ▪
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Preferred qualifications */}
            <h2 className="display text-ink text-2xl mb-5">
              Preferred qualifications
            </h2>
            <ul className="space-y-3">
              {role.qualifications.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted leading-relaxed">
                  <span className="text-blue mt-1.5 shrink-0" aria-hidden="true">
                    ▪
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — application form (sticky) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <RoleApplyForm roleTitle={role.title} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
