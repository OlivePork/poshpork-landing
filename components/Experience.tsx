export default function Experience() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-500">
          You Are the Jury
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-yellow-500">Interactive</h3>
            <p>Watch Pixar-quality animations and cast your verdict.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-yellow-500">Real Science</h3>
            <p>Based on peer-reviewed research.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-yellow-500">Small Groups</h3>
            <p>Maximum 16 guests per session.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-yellow-500">Life-Changing</h3>
            <p>Knowledge that could save your life.</p>
          </div>
        </div>
      </div>
    </section>
  );
}