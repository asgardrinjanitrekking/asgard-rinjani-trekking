export const site = {
  name: "Asgard Rinjani Trekking",
  shortName: "Asgard Rinjani",
  tagline: "Extraordinary Journeys Await.",
  address: "Jl. Pariwisata, Senaru, Kec. Bayan, Kabupaten Lombok Utara, Nusa Tenggara Bar. 83354",
  description:
    "Premium Mount Rinjani trekking with a local Lombok team. Summit, crater rim, Segara Anak Lake, and Torean routes.",
  whatsapp: "6282266000313",
  phone: "+62 822 6600 0313",
  email: "asgardrinjanitrekking@gmail.com",
};

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message ??
      "Hello Asgard Rinjani Trekking, I would like to enquire about a Mount Rinjani trek.",
  );
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}
