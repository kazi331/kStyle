
const about = [
    {
        index: "01",
        title: "Premium grade",
        body: "Quality fabrics and finishing in every piece we stock.",
    },
    {
        index: "02",
        title: "Always current",
        body: "The most in-demand, latest styles, refreshed each season.",
    },
    {
        index: "03",
        title: "Your own look",
        body: "From clean essentials to loud graphics, pick a style that is yours.",
    },
];


function MadeFor() {
    return (
        <section
            id="about"
            className="scroll-mt-[calc(var(--header-height,5rem)+1.5rem)] grid grid-cols-1 items-start px-4 py-12 min-[861px]:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] min-[861px]:gap-10 min-[861px]:px-8 min-[861px]:py-[88px]"
        >
            <div>
                <div className="stripe h-[22px] w-[120px] min-[861px]:h-7 min-[861px]:w-40" />
                <h2 className="cd display-about mt-4 mb-5 min-[861px]:mt-5 min-[861px]:mb-0">
                    Made for a new generation
                </h2>
            </div>
            <div>
                {about.map((item, index) => (
                    <div
                        key={item.index}
                        className={`flex gap-4 border-t-2 border-ink py-4 min-[861px]:gap-5 min-[861px]:py-5 ${index === about.length - 1 ? "border-b-2" : ""
                            }`}
                    >
                        <span className="cd text-[30px] text-accent min-[861px]:text-[32px]">
                            {item.index}
                        </span>
                        <div>
                            <div className="text-lg font-extrabold min-[861px]:text-xl">
                                {item.title}
                            </div>
                            <div className="mt-0.5 leading-normal text-body min-[861px]:mt-1 min-[861px]:leading-[1.55]">
                                {item.body}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MadeFor