import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between border-b bg-card">
                <div className="font-bold text-xl text-primary">دليلك (Delyluk)</div>
                <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
                    <a href="#how" className="hover:text-primary">كيف يعمل؟</a>
                    <a href="#benefits" className="hover:text-primary">المميزات</a>
                    <a href="#pricing" className="hover:text-primary">الباقات</a>
                </nav>
                <Link
                    href="/auth"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                >
                    تسجيل الدخول
                </Link>
            </header>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="py-20 px-6 text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        اكتشف مسارك الأكاديمي <span className="text-primary">بذكاء وثقة</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        نظام ذكي يساعدك في اختيار التخصص الجامعي الأنسب لشخصيتك وقدراتك،
                        بعيداً عن الحيرة وضغوطات الاختيار.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/assessment"
                            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary/90 transition shadow-lg hover:shadow-xl"
                        >
                            ابدأ التقييم الآن
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <a
                            href="#how"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-medium border hover:bg-muted transition"
                        >
                            اعرف المزيد
                        </a>
                    </div>
                    <div className="mt-8 text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <span>🔒 بياناتك سرية وآمنة</span>
                        <span>•</span>
                        <span>🎓 معتمد من خبراء التوجيه</span>
                    </div>
                </section>

                {/* Value Proposition */}
                <section id="how" className="py-16 bg-muted/30">
                    <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="🎯"
                            title="تحليل دقيق"
                            desc="ليس مجرد اختبار شخصية. نستخدم خوارزميات متقدمة لفهم أنماط تفكيرك."
                        />
                        <FeatureCard
                            icon="🤖"
                            title="مستشار ذكي"
                            desc="حوار تفاعلي يشعرك بأنك تتحدث مع خبير يفهمك، وليس استبيان ممل."
                        />
                        <FeatureCard
                            icon="📄"
                            title="تقرير احترافي"
                            desc="احصل على تقرير شامل يوضح نقاط قوتك وأفضل 5 تخصصات تناسبك."
                        />
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-8 border-t text-center text-sm text-muted-foreground">
                <p>© 2024 نظام دليلك للتوجيه الأكاديمي. جميع الحقوق محفوظة.</p>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
    return (
        <div className="bg-card p-6 rounded-2xl shadow-sm border text-center hover:shadow-md transition">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{desc}</p>
        </div>
    );
}
