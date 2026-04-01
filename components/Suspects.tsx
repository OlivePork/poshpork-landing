import Image from 'next/image';

export default function Suspects() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Meet The Suspects</h2>
        <Image 
          src="/images/suspects.jpeg" 
          alt="Suspects" 
          width={1400} 
          height={700} 
          className="w-full rounded-lg mb-12" 
        />
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-yellow-700">Lady Posh Pork</h3>
            <p className="text-sm mb-2 font-semibold">Wrongfully Accused</p>
            <p>She has the evidence to prove her innocence.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-yellow-700">Mr. Carbohydrate</h3>
            <p className="text-sm mb-2 font-semibold">The Smooth Talker</p>
            <p>Charming but hiding a deadly secret?</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-yellow-700">Mr. Vegetable Oil</h3>
            <p className="text-sm mb-2 font-semibold">The Cold Profiteer</p>
            <p>Processed to excess and proud of it.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-yellow-700">The Bliss Brothers</h3>
            <p className="text-sm mb-2 font-semibold">Food Engineers</p>
            <p>They engineered your cravings.</p>
          </div>
        </div>
      </div>
    </section>
  );
}