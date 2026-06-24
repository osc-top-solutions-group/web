"use client";

import Image from "next/image";
import {
  Linkedin,
  Youtube,
  Globe,
  FileText,
  Phone,
  Mail,
  Share2,
  Download,
} from "lucide-react";

const VCARD_URL = "https://osctopsolutionsgroup.com/vcard/mauricio-rubio";

const links = [
  {
    label: "Guardar contacto",
    href: "/api/vcard/mauricio-rubio",
    icon: Download,
    primary: true,
  },
  {
    label: "Corporate Web Site",
    href: "https://osctopsolutionsgroup.com",
    icon: Globe,
    external: true,
  },
  {
    label: "Brochure OSC",
    href: "https://canva.link/deckcomercial2026",
    icon: FileText,
    external: true,
  },
  {
    label: "Llamar",
    href: "tel:+13057753898",
    icon: Phone,
  },
  {
    label: "Email",
    href: "mailto:mauricio.rubio@osctopsolutionsgroup.com",
    icon: Mail,
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mauricio-rubio-6a78a598/",
    icon: Linkedin,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/13057753898",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@osctopsolutionsgroup",
    icon: Youtube,
  },
];

const shareOptions = [
  {
    label: "LinkedIn",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(VCARD_URL)}`,
    icon: Linkedin,
    bg: "bg-[#0A66C2]",
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/?text=${encodeURIComponent(VCARD_URL)}`,
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    bg: "bg-[#25D366]",
  },
  {
    label: "Telegram",
    href: `https://t.me/share/url?url=${encodeURIComponent(VCARD_URL)}`,
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    bg: "bg-[#2AABEE]",
  },
  {
    label: "Email",
    href: `mailto:?subject=Contacto%20Mauricio%20Rubio%20-%20OSC&body=${encodeURIComponent(VCARD_URL)}`,
    icon: Mail,
    bg: "bg-[#FF0057]",
  },
];

export default function MauricioRubioVCard() {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Mauricio Rubio — OSC Top Solutions Group",
        text: "CEO de OSC Top Solutions Group",
        url: VCARD_URL,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4"
      style={{ background: "linear-gradient(160deg, #1a0050 0%, #5b006e 40%, #c8006e 75%, #ff3c7a 100%)" }}>
      <div className="w-full max-w-sm flex flex-col items-center gap-6">

        {/* Logo */}
        <Image src="/logo-30anos.png" alt="OSC 30 Años" width={160} height={48} className="object-contain" />

        {/* Avatar */}
        <div className="relative">
          <div className="w-36 h-36 rounded-full p-[3px]"
            style={{ background: "linear-gradient(135deg, #ff3c7a, #000086)" }}>
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <Image
                src="/Fotos Equipo/Mauricio Rubio.png"
                alt="Mauricio Rubio"
                width={144}
                height={144}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Name & Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Mauricio Rubio</h1>
          <p className="text-white/80 mt-1 text-sm font-medium">CEO / OSC Top Solutions Group</p>
        </div>

        {/* Action Links */}
        <div className="w-full flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                link.primary
                  ? "bg-white text-[#5b006e] hover:bg-white/90 shadow-lg"
                  : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm border border-white/20"
              }`}
            >
              <link.icon size={16} />
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-11 h-11 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all cursor-pointer"
            >
              <s.icon size={20} />
            </a>
          ))}
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-2xl p-4 shadow-xl">
          <Image
            src="/qr-mauricio-rubio.svg"
            alt="QR Mauricio Rubio"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>

        {/* Share native */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors cursor-pointer"
        >
          <Share2 size={14} />
          Comparte este contacto
        </button>

        {/* Share buttons */}
        <div className="flex items-center gap-3">
          {shareOptions.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className={`w-11 h-11 rounded-full ${s.bg} flex items-center justify-center text-white hover:opacity-90 transition-all cursor-pointer shadow-md`}
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
