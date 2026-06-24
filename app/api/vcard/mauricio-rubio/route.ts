import { NextResponse } from "next/server";

export async function GET() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Mauricio Rubio
N:Rubio;Mauricio;;;
ORG:OSC Top Solutions Group
TITLE:CEO
TEL;TYPE=CELL,VOICE:+13057753898
TEL;TYPE=WORK,VOICE:+13057753898
EMAIL;TYPE=WORK:mauricio.rubio@osctopsolutionsgroup.com
URL;TYPE=WORK:https://osctopsolutionsgroup.com
URL;TYPE=LinkedIn:https://www.linkedin.com/in/mauricio-rubio-6a78a598/
NOTE:CEO de OSC Top Solutions Group. Integrador tecnológico líder en infraestructuras críticas en América Latina.
END:VCARD`;

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="mauricio-rubio.vcf"',
    },
  });
}
