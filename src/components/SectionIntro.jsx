export default function SectionIntro({ title, description, image }) {
    return (
        <section className="bg-gray-100 py-10 px-5 sm:px-10 md:px-20">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-5">
                <div className="flex-1">
                    <h2 className="text-blue-900 text-3xl font-bold mb-3">{title}</h2>
                    <p className="text-md font-semibold text-black">{description}</p>
                </div>
                <div className="flex-1">
                    <Image src={image} alt={title} width={500} height={500} className="rounded-lg shadow-lg" />
                </div>
            </div>
        </section>
    );
}