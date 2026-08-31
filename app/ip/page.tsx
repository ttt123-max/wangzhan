import { Mascot } from '@/components/mascot/Mascot';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function IpPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <Badge tone="blue">IP 档案</Badge>
          <h1 className="mt-3 text-3xl font-bold text-[#14213d]">科小獬</h1>
          <p className="mt-4 text-slate-600">
            “科”取自科大、科技，代表理性与创新；“獬”源于獬豸——传说中明辨是非、能识善恶的法治神兽。
            科小獬把“公正”与“科技”结合，成为网信普法的友好陪伴者。
          </p>
        </div>
        <div className="flex justify-center">
          <Mascot mood="default" className="h-64 w-64" />
        </div>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Card>
          <Badge tone="blue">理念</Badge>
          <h2 className="mt-2 font-semibold">以法为盾</h2>
          <p className="mt-1 text-sm text-slate-500">独角是辨是非的天线，护盾是守护权益的决心。</p>
        </Card>
        <Card>
          <Badge tone="teal">形象</Badge>
          <h2 className="mt-2 font-semibold">Q 版科技感</h2>
          <p className="mt-1 text-sm text-slate-500">圆润亲和，科技蓝为主，金色独角与青色点缀。</p>
        </Card>
        <Card>
          <Badge tone="gold">使命</Badge>
          <h2 className="mt-2 font-semibold">全民普法</h2>
          <p className="mt-1 text-sm text-slate-500">让复杂的网络法律，变成人人都能读懂的知识。</p>
        </Card>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-[#14213d]">使用规范</h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          科小獬为本站公益普法 IP 形象，可用于科普、教育、宣传场景；请勿用于商业牟利、恶意篡改或与法律事实不符的宣传。如需商业合作，请先取得授权。
        </p>
      </section>
    </div>
  );
}
