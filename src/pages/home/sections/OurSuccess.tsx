
const StatItem = ({ value, label, valueColorClass = "text-teal-500" }: any) => (
  <div className="flex flex-col items-center text-center">
    <div className={`text-5xl font-bold mb-2 ${valueColorClass}`}>{value}</div>
    <div className="text-lg text-gray-700 font-medium">{label}</div>
  </div>
);

export default function OurSuccess() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Our Success
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae
            sollicitudin at nec nam et pharetra gravida. Adipiscing a quis
            ultrices eu ornare tristique vel nisl orci.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 mt-12">
          <StatItem
            value="15K+"
            label="Students"
            valueColorClass="text-blue-500"
          />
          <StatItem
            value="75%"
            label="Total success"
            valueColorClass="text-teal-500"
          />
          <StatItem
            value="35"
            label="Main questions"
            valueColorClass="text-teal-500"
          />
          <StatItem
            value="26"
            label="Chief experts"
            valueColorClass="text-teal-500"
          />
          <StatItem
            value="16"
            label="Years of experience"
            valueColorClass="text-teal-500"
          />
        </div>
      </div>
    </section>
  );
}
