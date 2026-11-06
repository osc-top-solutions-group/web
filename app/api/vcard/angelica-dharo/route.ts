import { NextResponse } from "next/server";

export async function GET() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Angélica D'Haro
N:D'Haro;Angélica;;;
ORG:OSC Top Solutions Group
TITLE:Chief Business Development and Investment Officer
TEL;TYPE=CELL,VOICE:+573182853936
TEL;TYPE=WORK,VOICE:+573182853936
EMAIL;TYPE=WORK:angelica.dharo@osctopsolutionsgroup.com
URL;TYPE=WORK:https://osctopsolutionsgroup.com
URL;TYPE=LinkedIn:https://www.linkedin.com/in/ang%C3%A9lica-d%C2%B4haro-42aa9120/
NOTE:Chief Business Development and Investment Officer de OSC Top Solutions Group. Integrador tecnológico líder en infraestructuras críticas en América Latina.
END:VCARD`;

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="angelica-dharo.vcf"',
    },
  });
}
