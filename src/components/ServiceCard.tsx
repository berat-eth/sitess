import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  href: string;
  color: 'blue' | 'green' | 'purple';
}

const ServiceCard = ({ title, description, icon, features, href, color }: ServiceCardProps) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
      border: 'border-blue-200'
    },
    green: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
      button: 'bg-green-600 hover:bg-green-700',
      border: 'border-green-200'
    },
    purple: {
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700',
      border: 'border-purple-200'
    }
  };

  const classes = colorClasses[color];

  return (
    <div className={`${classes.bg} ${classes.border} border rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300`}>
      {/* Icon */}
      <div className={`${classes.iconBg} ${classes.iconText} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-slate-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <svg className={`w-5 h-5 ${classes.iconText} mr-3 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href={href}
        className={`${classes.button} text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center group`}
      >
        Detayları İncele
        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export default ServiceCard;
