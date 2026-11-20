import Image from "next/image";

const visualStories = [
  {
    src: "/images/demlab-golden-still.jpg",
    alt: "DEMLAB amber şişesi ve altın tonlarında sıvı formu",
    title: "Amber seri",
    detail: "Meşe ve sıcak amber tonları",
  },
  {
    src: "/images/demlab-water-still.jpg",
    alt: "DEMLAB şeffaf şişesi, buz ve mavi su hareketi",
    title: "Berrak seri",
    detail: "Buzul berraklığında sunum",
  },
];

export default function HomepageVisuals() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-8" aria-labelledby="homepage-visuals-title">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e59840]">
            DEMLAB görsel seçkisi
          </p>
          <h2 id="homepage-visuals-title" className="font-serif text-2xl font-extrabold text-[#fff5ea] sm:text-3xl">
            DEMLAB’in amber ve berrak karakteri.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-[#c6ad97]">
          Amber ve berraklık temalı DEMLAB görsellerini keşfedin.
        </p>
      </div>

      <figure className="relative aspect-[2.5/1] min-h-44 overflow-hidden rounded-2xl border border-[#e59840]/30 bg-[#180d07] sm:aspect-[3/1] sm:min-h-64">
        <Image
          src="/images/demlab-home-panorama.jpg"
          alt="DEMLAB ürünlerini amber, berrak ve zanaat temalı dört sahnede gösteren geniş görsel kolaj"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1216px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
        <figcaption className="absolute bottom-4 left-4 right-4 text-xs font-semibold tracking-wide text-white sm:bottom-6 sm:left-6 sm:text-sm">
          DEMLAB · Zanaat, berraklık ve amber karakter
        </figcaption>
      </figure>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {visualStories.map((story) => (
          <figure key={story.src} className="overflow-hidden rounded-xl border border-[#e59840]/20 bg-[#1a0f09]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={story.src}
                alt={story.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <figcaption className="flex items-baseline justify-between gap-3 p-4">
              <span className="font-serif text-base font-semibold text-[#fff5ea]">{story.title}</span>
              <span className="text-right text-xs text-[#c6ad97]">{story.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
