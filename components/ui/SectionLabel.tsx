interface Props {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: Props) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-3" aria-hidden="true">
      <span className="w-6 h-px bg-gradient-to-r from-[#FF0057] to-transparent" />
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF0057]">
        {children}
      </span>
      <span className="w-6 h-px bg-gradient-to-l from-[#FF0057] to-transparent opacity-40" />
    </div>
  );
}
