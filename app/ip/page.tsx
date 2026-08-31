import { BookOpen, Compass, ShieldCheck } from 'lucide-react';
import { Mascot } from '@/components/mascot/Mascot';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const traits = [
  { icon: ShieldCheck, title: '以法为盾', desc: '独角是辨是非的天线，护盾是守护权益的决心。', tone: 'bg-brand-blueSoft text-brand-blue' },
  { icon: BookOpen, title: 'Q 版科技感', desc: '圆润亲和，科技蓝为主，金色独角与青色点缀。', tone: 'bg-brand-tealSoft text-brand-teal' },
  { icon: Compass, title: '全民普法', desc: '让复杂的网络法律，变成人人都能读懂的知识。', tone: 'bg-brand-goldSoft text-brand-gold' }
];

export default function IpPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Badge tone="blue">IP 档案</Badge>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground">科小獬</h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-foreground-soft">
            “科”取自科大、科技，代表理性与创新；“獬”源于獬豸，传说中明辨是非、能识善恶的法治神兽。
            科小獬把“公正”与“科技”结合，成为网信普法的友好陪伴者。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="blue">獬豸 · 公正</Badge>
            <Badge tone="teal">科技 · 理性</Badge>
            <Badge tone="gold">守护 · 善意</Badge>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Mascot mood="default" className="h-64 w-64" />
        </div>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {traits.map((t) => (
          <Card key={t.title} className="p-6">
            <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${t.tone}`}>
              <t.icon className="h-5 w-5" />
            </span>
            <h2 className="font-semibold text-foreground">{t.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.desc}</p>
          </Card>
        ))}
      </div>

      <section className="mt-12 rounded-2xl border border-border bg-surface p-8 shadow-soft">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">使用规范</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          科小獬为本站公益普法 IP 形象，可用于科普、教育、宣传场景；请勿用于商业牟利、恶意篡改或与法律事实不符的宣传。如需商业合作，请先取得授权。
        </p>
      </section>
    </div>
  );
}
