import { type Category, type Unit, categories } from '@/data/conversionData';

interface WebsiteSchemaProps {
  type: 'website';
}

interface ConversionSchemaProps {
  type: 'conversion';
  category: Category;
  fromUnit: Unit;
  toUnit: Unit;
  conversionFactor: string;
}

interface CategorySchemaProps {
  type: 'category';
  category: Category;
}

type SchemaProps = WebsiteSchemaProps | ConversionSchemaProps | CategorySchemaProps;

export function SchemaMarkup(props: SchemaProps) {
  const getSchema = () => {
    if (props.type === 'website') {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Unit Converter',
        description: 'Free online unit converter for length, temperature, area, volume, weight, time, speed, energy, and more.',
        url: window.location.origin,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${window.location.origin}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };
    }

    if (props.type === 'category') {
      const categoryInfo = categories.find((c) => c.id === props.category);
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${categoryInfo?.label || props.category} Converter`,
        description: `Convert ${categoryInfo?.label.toLowerCase()} units instantly with our free online ${categoryInfo?.label.toLowerCase()} converter.`,
        url: `${window.location.origin}/${props.category}`,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: window.location.origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: `${categoryInfo?.label} Converter`,
              item: `${window.location.origin}/${props.category}`,
            },
          ],
        },
      };
    }

    if (props.type === 'conversion') {
      const categoryInfo = categories.find((c) => c.id === props.category);
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Convert ${props.fromUnit.name} to ${props.toUnit.name}`,
          description: `Convert ${props.fromUnit.name} (${props.fromUnit.symbol}) to ${props.toUnit.name} (${props.toUnit.symbol}). 1 ${props.fromUnit.symbol} = ${props.conversionFactor} ${props.toUnit.symbol}.`,
          url: `${window.location.origin}/${props.category}/${props.fromUnit.id}-to-${props.toUnit.id}`,
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: window.location.origin,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: `${categoryInfo?.label} Converter`,
                item: `${window.location.origin}/${props.category}`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: `${props.fromUnit.symbol} to ${props.toUnit.symbol}`,
                item: `${window.location.origin}/${props.category}/${props.fromUnit.id}-to-${props.toUnit.id}`,
              },
            ],
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: `How many ${props.toUnit.name.toLowerCase()}s are in a ${props.fromUnit.name.toLowerCase()}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `1 ${props.fromUnit.name} (${props.fromUnit.symbol}) is equal to ${props.conversionFactor} ${props.toUnit.name} (${props.toUnit.symbol}).`,
              },
            },
            {
              '@type': 'Question',
              name: `How do I convert ${props.fromUnit.name} to ${props.toUnit.name}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `To convert ${props.fromUnit.name} to ${props.toUnit.name}, multiply the value in ${props.fromUnit.name.toLowerCase()} by ${props.conversionFactor}. For example, 10 ${props.fromUnit.symbol} = 10 × ${props.conversionFactor} = ${(10 * parseFloat(props.conversionFactor)).toFixed(6)} ${props.toUnit.symbol}.`,
              },
            },
            {
              '@type': 'Question',
              name: `What is the formula to convert ${props.fromUnit.symbol} to ${props.toUnit.symbol}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `The formula is: ${props.toUnit.symbol} = ${props.fromUnit.symbol} × ${props.conversionFactor}`,
              },
            },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: `How to Convert ${props.fromUnit.name} to ${props.toUnit.name}`,
          description: `Step-by-step guide to convert ${props.fromUnit.name} (${props.fromUnit.symbol}) to ${props.toUnit.name} (${props.toUnit.symbol})`,
          step: [
            {
              '@type': 'HowToStep',
              name: 'Know the conversion factor',
              text: `1 ${props.fromUnit.symbol} = ${props.conversionFactor} ${props.toUnit.symbol}`,
            },
            {
              '@type': 'HowToStep',
              name: 'Multiply your value',
              text: `Multiply your ${props.fromUnit.name.toLowerCase()} value by ${props.conversionFactor}`,
            },
            {
              '@type': 'HowToStep',
              name: 'Get the result',
              text: `The result is your value in ${props.toUnit.name.toLowerCase()}`,
            },
          ],
        },
      ];
    }

    return null;
  };

  const schema = getSchema();
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(schema) ? schema : [schema]),
      }}
    />
  );
}
