export default function Packages() {

    const plans = [
        { name: "Basic", price: "₹3,999" },
        { name: "Premium", price: "₹7,999" },
        { name: "Luxury", price: "₹14,999" }
    ]

    return (

        <section id="packages" className="py-32">

            <h2 className="text-4xl text-center mb-16">
                Decoration Packages
            </h2>

            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                {plans.map((p, i) => (
                    <div key={i} className="glass p-10 rounded-3xl">

                        <h3 className="text-2xl mb-4">{p.name}</h3>

                        <p className="text-4xl font-bold mb-6">{p.price}</p>

                        <ul className="space-y-2 opacity-80">

                            <li>Balloon Setup</li>
                            <li>Theme Decoration</li>
                            <li>Lighting</li>

                        </ul>

                        <button className="mt-8 w-full py-3 rounded-full">
                            Book Now
                        </button>

                    </div>
                ))}

            </div>

        </section>

    )
}