import AnimatedButton from "../../components/AnimatedButton";

export default function IletisimPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-14 space-y-10">
      <header className="space-y-3">
        <p className="text-sm text-white/60">İletişim</p>
        <h1 className="text-4xl font-bold">İş birliği için</h1>
        <p className="text-lg text-white/70 leading-relaxed">
          Proje, danışmanlık veya ekip katkısı için ulaşabilirsin. Tercihen
          e-posta; LinkedIn/GitHub üzerinden de yazabilirsin.
        </p>
      </header>

      <section className="rounded-3xl p-8 bg-gradient-to-b from-white/10 to-white/5 border border-white/10 space-y-6">
        <div className="flex flex-wrap gap-3">
          <a href="mailto:alperenbyr12@gmail.com">
            <AnimatedButton>E-posta Gönder</AnimatedButton>
          </a>
          <a
            href="https://github.com/ALPERENBAYAR"
            target="_blank"
            rel="noreferrer"
            title="GitHub profili"
          >
            <AnimatedButton variant="ghost">GitHub</AnimatedButton>
          </a>
          <a
            href="https://www.linkedin.com/in/alperen-bayar12/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn profili"
          >
            <AnimatedButton variant="ghost">LinkedIn</AnimatedButton>
          </a>
          <a
            href="https://www.instagram.com/alperenbyr12/"
            target="_blank"
            rel="noreferrer"
            title="Instagram profili"
          >
            <AnimatedButton variant="ghost">Instagram</AnimatedButton>
          </a>
        </div>

        <div className="h-px w-full bg-white/10" />

        <form
          action="mailto:alperenbyr12@gmail.com"
          method="POST"
          encType="text/plain"
          className="grid gap-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block text-sm text-white/70 space-y-2">
              <span>İsim Soyisim</span>
              <input
                name="isim"
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                placeholder="Alperen Bayar"
              />
            </label>
            <label className="block text-sm text-white/70 space-y-2">
              <span>E-posta</span>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                placeholder="ornek@mail.com"
              />
            </label>
          </div>

          <label className="block text-sm text-white/70 space-y-2">
            <span>Konu</span>
            <input
              name="konu"
              required
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              placeholder="Proje / danışmanlık / ekip katkısı"
            />
          </label>

          <label className="block text-sm text-white/70 space-y-2">
            <span>Mesaj</span>
            <textarea
              name="mesaj"
              required
              rows={5}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              placeholder="Kısaca ihtiyacını veya fikrini paylaş."
            />
          </label>

          <div className="flex gap-3">
            <AnimatedButton type="submit">Mesajı Gönder</AnimatedButton>
            <AnimatedButton variant="ghost" type="reset">
              Temizle
            </AnimatedButton>
          </div>
        </form>
      </section>
    </main>
  );
}
