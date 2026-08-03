import Image from "next/image";

const testimonials = [
  {
    quote:
      'Rolling out Evven across our offices gave finance a single source of truth for shared expenses for the first time.',
    name: "Daniela K.",
    role: "VP of Finance",
  },
  {
    quote:
      'The approval workflows and audit logs made our quarterly review process dramatically faster and easier.',
    name: "Owen R.",
    role: "IT Director",
  },
];

export default function EnterpriseTestimonials() {
  return (
    <section className="pt-20 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Trusted by leading companies
        </p>
        <h2 className="mt-4 font-bold text-3xl tracking-tight md:text-4xl">
          Trusted by industry leaders
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="rounded-lg border p-6"
            >
              <p className="text-sm">{testimonial.quote}</p>
              <footer className="mt-4 flex items-baseline gap-3">
                <Image
                  src="/Evven-black.svg"
                  alt="Evven"
                  width={24}
                  height={24}
                  className="shrink-0"
                />
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}