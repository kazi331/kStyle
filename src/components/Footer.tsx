import { Newsletter } from "@/components/newsletter"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"

function Footer() {
    return (
        <footer className="overflow-hidden bg-ink px-4 pt-10 text-paper min-[861px]:px-8 min-[861px]:pt-16">
            <div className="flex flex-col min-[861px]:flex-row min-[861px]:items-end min-[861px]:justify-between min-[861px]:gap-6">
                <div>
                    <div className="cd text-[52px] leading-[0.9] min-[861px]:text-[48px]">
                        First to know.
                    </div>
                    <p className="mt-2 mb-0 text-steel">
                        Drops and offers, straight to your inbox.
                    </p>
                </div>
                <Newsletter />
            </div>
            {/* <div className="cd wordmark stroke-wordmark mt-9 min-[861px]:mt-10">Kstyle</div> */}

            <div className="flex items-center justify-center">
                <TextHoverEffect text="KSTYLE" />
            </div>
        </footer>
    )
}

export default Footer