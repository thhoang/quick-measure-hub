import { useEffect } from 'react';
import { type Category, type Unit, categories } from '@/data/conversionData';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string;
}

export function SEOHead({ title, description, canonicalPath, keywords }: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${window.location.origin}${canonicalPath}`);
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);

    // Update keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }
  }, [title, description, canonicalPath, keywords]);

  return null;
}

// Helper functions to generate SEO content
export function getConversionSEO(category: Category, fromUnit: Unit, toUnit: Unit) {
  const categoryInfo = categories.find((c) => c.id === category);
  return {
    title: `Convert ${fromUnit.name} to ${toUnit.name} | ${fromUnit.symbol} to ${toUnit.symbol} Converter`,
    description: `Convert ${fromUnit.name} (${fromUnit.symbol}) to ${toUnit.name} (${toUnit.symbol}) instantly. Free online ${categoryInfo?.label.toLowerCase()} converter with accurate results and conversion tables.`,
    canonicalPath: `/${category}/${fromUnit.id}-to-${toUnit.id}`,
    keywords: `${fromUnit.name} to ${toUnit.name}, ${fromUnit.symbol} to ${toUnit.symbol}, ${category} converter, unit conversion, ${fromUnit.name} converter`,
  };
}

export function getCategorySEO(category: Category) {
  const categoryInfo = categories.find((c) => c.id === category);
  return {
    title: `${categoryInfo?.label} Converter - Free Online ${categoryInfo?.label} Unit Conversion`,
    description: `Convert ${categoryInfo?.label.toLowerCase()} units instantly. Free online ${categoryInfo?.label.toLowerCase()} converter for all ${categoryInfo?.label.toLowerCase()} measurements with accurate calculations.`,
    canonicalPath: `/${category}`,
    keywords: `${categoryInfo?.label.toLowerCase()} converter, ${categoryInfo?.label.toLowerCase()} units, convert ${categoryInfo?.label.toLowerCase()}, ${categoryInfo?.label.toLowerCase()} conversion calculator`,
  };
}

export function getHomeSEO() {
  return {
    title: 'Unit Converter - Free Online Conversion Tool for All Units',
    description: 'Convert length, temperature, area, volume, weight, time, speed, energy, and more. Free online unit converter with instant, accurate calculations.',
    canonicalPath: '/',
    keywords: 'unit converter, online converter, length converter, temperature converter, weight converter, volume converter, area converter, time converter',
  };
}
