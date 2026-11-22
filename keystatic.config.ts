import { config, collection, fields, singleton } from '@keystatic/core';

const cmsImage = (label: string) =>
  fields.image({
    label,
    directory: 'public/images/keystatic',
    publicPath: '/asgard-rinjani-trekking/images/keystatic/',
  });

const seoFields = {
  seoTitle: fields.text({ label: 'SEO title' }),
  seoDescription: fields.text({ label: 'SEO description', multiline: true }),
  socialImage: cmsImage('Social sharing image'),
  socialImageAlt: fields.text({ label: 'Social image alt text' }),
};

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/cms/homepage.yaml',
      schema: {
        heroTitle: fields.text({ label: 'Hero title' }),
        heroDescription: fields.text({ label: 'Hero description', multiline: true }),
        heroImage: cmsImage('Hero image'),
        heroImageAlt: fields.text({ label: 'Hero image alt text' }),
        introductionHeading: fields.text({ label: 'Introduction heading' }),
        introduction: fields.text({ label: 'Introduction', multiline: true }),
        featuredPackageSlugs: fields.array(fields.text({ label: 'Package slug' }), {
          label: 'Featured package slugs',
          description: 'Use existing package routes; keep their slugs unchanged.',
        }),
        gallery: fields.array(
          fields.object({
            image: cmsImage('Gallery image'),
            alt: fields.text({ label: 'Alternative text' }),
            caption: fields.text({ label: 'Caption' }),
          }),
          { label: 'Homepage gallery' },
        ),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'Homepage FAQ' },
        ),
        ...seoFields,
      },
    }),
    contact: singleton({
      label: 'Contact and WhatsApp',
      path: 'src/content/cms/contact.yaml',
      schema: {
        businessName: fields.text({ label: 'Business name' }),
        address: fields.text({ label: 'Address', multiline: true }),
        phone: fields.text({ label: 'Phone number' }),
        whatsappNumber: fields.text({
          label: 'WhatsApp number',
          description: 'International digits only, without a plus sign.',
        }),
        whatsappDefaultMessage: fields.text({ label: 'Default WhatsApp message', multiline: true }),
        email: fields.text({ label: 'Email address' }),
      },
    }),
  },
  collections: {
    packages: collection({
      label: 'Trekking packages',
      path: 'src/content/cms/packages/*/',
      slugField: 'slug',
      columns: ['slug', 'duration', 'difficulty'],
      schema: {
        slug: fields.slug({
          name: { label: 'Package name' },
          slug: {
            label: 'Existing URL slug',
            description: 'Keep aligned with the existing route, for example 2d1n-crater-rim.',
          },
        }),
        route: fields.text({
          label: 'Existing page route',
          description: 'Reference only. Do not change the published URL during this setup stage.',
        }),
        duration: fields.text({ label: 'Duration' }),
        difficulty: fields.select({
          label: 'Difficulty',
          options: [
            { label: 'Easy', value: 'easy' },
            { label: 'Moderate', value: 'moderate' },
            { label: 'Challenging', value: 'challenging' },
            { label: 'Moderate to challenging', value: 'moderate-to-challenging' },
          ],
          defaultValue: 'challenging',
        }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        heroImage: cmsImage('Package hero image'),
        heroImageAlt: fields.text({ label: 'Hero image alt text' }),
        itinerary: fields.array(
          fields.object({
            day: fields.integer({ label: 'Day number', validation: { min: 1 } }),
            title: fields.text({ label: 'Day title' }),
            route: fields.text({ label: 'Route or stops' }),
            description: fields.text({ label: 'Itinerary details', multiline: true }),
          }),
          { label: 'Daily itinerary' },
        ),
        gallery: fields.array(
          fields.object({
            image: cmsImage('Gallery image'),
            alt: fields.text({ label: 'Alternative text' }),
            caption: fields.text({ label: 'Caption' }),
          }),
          { label: 'Package gallery' },
        ),
        included: fields.array(fields.text({ label: 'Included item' }), { label: 'Included' }),
        notIncluded: fields.array(fields.text({ label: 'Not included item' }), {
          label: 'Not included',
        }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'Package FAQ' },
        ),
        ...seoFields,
      },
    }),
  },
});
