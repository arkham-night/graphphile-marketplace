import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const ensureMeta = (attr: { name?: string; property?: string }, content: string) => {
  const selector = attr.name ? `meta[name="${attr.name}"]` : `meta[property="${attr.property}"]`;
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    if (attr.name) tag.setAttribute('name', attr.name);
    if (attr.property) tag.setAttribute('property', attr.property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const ensureLink = (rel: string, href: string) => {
  let link = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const Seo: React.FC<SeoProps> = ({ title, description = '', image = '/og-image.png', type = 'website' }) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Description
    if (description) ensureMeta({ name: 'description' }, description);

    // Canonical
    const canonical = window.location.href;
    ensureLink('canonical', canonical);

    // Open Graph
    ensureMeta({ property: 'og:title' }, title);
    if (description) ensureMeta({ property: 'og:description' }, description);
    ensureMeta({ property: 'og:type' }, type);
    ensureMeta({ property: 'og:url' }, canonical);
    if (image) ensureMeta({ property: 'og:image' }, image);

    // Twitter Cards
    ensureMeta({ name: 'twitter:card' }, 'summary_large_image');
    ensureMeta({ name: 'twitter:title' }, title);
    if (description) ensureMeta({ name: 'twitter:description' }, description);
    if (image) ensureMeta({ name: 'twitter:image' }, image);

    // Structured Data (Organization)
    const ldId = 'ld-json-seo';
    const existing = document.getElementById(ldId);
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Graphphile',
      url: window.location.origin,
      logo: image,
    };
    if (existing) {
      existing.textContent = JSON.stringify(jsonLd);
    } else {
      const script = document.createElement('script');
      script.id = ldId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, image, type]);

  return null;
};

export default Seo;
