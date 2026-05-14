import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Compass,
  GraduationCap,
  Headphones,
  Instagram,
  Layers,
  Mail,
  Menu,
  MessageCircle,
  Mic2,
  Phone,
  Shield,
  Sparkles,
  Star,
  Users,
  Video,
  X,
} from 'lucide-react'

const NAV_LINKS = [
  { href: '#about', label: 'О преподавателе' },
  { href: '#features', label: 'Преимущества' },
  { href: '#stats', label: 'Цифры' },
  { href: '#process', label: 'Как работает' },
  { href: '#testimonials', label: 'Отзывы' },
  { href: '#pricing', label: 'Тарифы' },
  { href: '#faq', label: 'FAQ' },
]

const FEATURES = [
  {
    title: 'Живая разговорная практика',
    desc: 'От первых фраз до уверенного диалога: акцент на произношении и ритме MSA/диалекта.',
    icon: Mic2,
  },
  {
    title: 'Культура и контекст',
    desc: 'Не только грамматика: этикет, идиомы и реальные сценарии — от кафе до деловой переписки.',
    icon: Compass,
  },
  {
    title: 'Персональная дорожная карта',
    desc: 'Диагностика уровня, цели (IELTS/работа/релокация) и чёткий план на каждую неделю.',
    icon: Layers,
  },
  {
    title: 'Гибкий формат',
    desc: '1:1 онлайн, мини-группы, интенсивы и асинхронные материалы — под ваш ритм жизни.',
    icon: Headphones,
  },
  {
    title: 'Прозрачный прогресс',
    desc: 'Чек-листы навыков, записи уроков и домашние с детальным фидбеком по каждой задаче.',
    icon: Shield,
  },
  {
    title: 'Сообщество практики',
    desc: 'Закрытый чат учеников, speaking-club и еженедельные микро-задания без скуки.',
    icon: Users,
  },
]

const STEPS = [
  {
    n: 1,
    title: 'Бесплатный созвон',
    desc: '15 минут: цели, уровень, рекомендации по программе и формату.',
    icon: MessageCircle,
  },
  {
    n: 2,
    title: 'План и старт',
    desc: 'Подбираем расписание, материалы и первую «быструю победу» на уроке.',
    icon: Calendar,
  },
  {
    n: 3,
    title: 'Рост и закрепление',
    desc: 'Системные уроки + speaking, контроль произношения и регулярные мини-экзамены.',
    icon: Video,
  },
]

const TESTIMONIALS = [
  {
    quote:
      'Алхамдулиллах, за время обучения я закончил первую и вторую книгу Байна Ядайк. Прогресс, который я не ожидал так быстро. Рекомендую каждому кто хочет серьёзно изучать арабский.',
    name: 'Мухаммад',
    role: 'Ученик',
    initials: 'М',
    hue: '42',
  },
  {
    quote:
      'За полтора месяца прошёл полторы книги по Байна Ядайк и параллельно грамматику. Темп обучения очень комфортный, всё объясняется чётко и понятно.',
    name: 'Ильяс',
    role: 'Ученик',
    initials: 'И',
    hue: '168',
  },
  {
    quote:
      'Всего за месяц обучения я начал понимать арабский язык. Это было для меня невероятно — думал, что это займёт годы.',
    name: 'Абдулла',
    role: 'Ученик',
    initials: 'А',
    hue: '210',
  },
]

const PRICING = [
  {
    id: 'base',
    name: 'Базовый',
    desc: 'Старт с нуля или «вспомнить всё»',
    monthlyRub: 6900,
    monthlySom: 7200,
    features: ['2 урока в неделю по 50 мин', 'Материалы и ДЗ', 'Чат поддержки', 'План на месяц'],
    popular: false,
  },
  {
    id: 'pro',
    name: 'Про',
    desc: 'Максимум практики и скорости',
    monthlyRub: 9900,
    monthlySom: 10000,
    features: [
      '3 урока в неделю + speaking-club',
      'Разбор произношения каждый урок',
      'Расширенный фидбек по письму',
      'Приоритетные слоты расписания',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Энтерпрайз',
    desc: 'Командам и компаниям',
    monthlyRub: 17000,
    monthlySom: 18000,
    features: [
      'Корпоративная программа под KPI',
      'Несколько преподавателей / уровней',
      'Отчёты для HR / L&D',
      'Онбординг и сертификация прогресса',
    ],
    popular: false,
  },
]

function useCountUp(target, enabled, durationMs = 2000) {
  const [v, setV] = useState(0)

  useEffect(() => {
    if (!enabled) return undefined
    const steps = 50
    const stepMs = durationMs / steps
    let step = 0
    const id = setInterval(() => {
      step += 1
      const t = Math.min(step / steps, 1)
      const eased = 1 - (1 - t) ** 3
      setV(Math.round(target * eased))
      if (step >= steps) {
        clearInterval(id)
        setV(target)
      }
    }, stepMs)
    return () => clearInterval(id)
  }, [enabled, target, durationMs])

  return v
}

const FAQ_ITEMS = [
  {
    q: 'С какого уровня можно начать?',
    a: 'С любого: от алфавита и чтения до продвинутого Arabic for professionals. На созвоне быстро определим точку старта.',
  },
  {
    q: 'MSA или диалект?',
    a: 'По умолчанию — современный стандарт (MSA) как «скелет», плюс выбранный диалект под вашу цель (например, левантийский или эмиратский).',
  },
  {
    q: 'Как проходят уроки?',
    a: 'Онлайн в Zoom/Google Meet: интерактивная доска, чат с материалами, записи по запросу и чёткое ДЗ с дедлайнами.',
  },
  {
    q: 'Можно ли переносить занятия?',
    a: 'Да, при уведомлении за 12 часов. В тарифе Про — дополнительный «гибкий» слот в месяц.',
  },
  {
    q: 'Что нужно от меня?',
    a: '15–30 минут на подготовку к уроку, честная обратная связь и регулярность. Остальное — моя зона ответственности.',
  },
  {
    q: 'Есть ли рассрочка или пакеты?',
    a: 'Да: квартальные пакеты со скидкой и корпоративные счета. Напишите в Telegram по кнопке ниже — подберём оптимально.',
  },
]

const FOOTER_COLS = [
  {
    title: 'Продукт',
    links: ['Программа', 'Speaking-club', 'Корпоратив', 'Сертификаты'],
  },
  {
    title: 'Ресурсы',
    links: ['Блог', 'Гайды', 'Подкасты', 'Памятка по алфавиту'],
  },
  {
    title: 'Компания',
    links: ['Обо мне', 'Медиа', 'Вакансии', 'Партнёрам'],
  },
  {
    title: 'Правовое',
    links: ['Оферта', 'Конфиденциальность', 'Cookies', 'Реквизиты'],
  },
]

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    if (!nodes.length) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('reveal-visible')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
}

export default function ArabicTeacherLanding() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [navSolid, setNavSolid] = useState(false)
  const [billingYearly, setBillingYearly] = useState(true)
  const [currencyRub, setCurrencyRub] = useState(true)
  const [faqOpen, setFaqOpen] = useState(() => new Set())
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

  useReveal()

  const onScroll = useCallback(() => {
    setNavSolid(window.scrollY > 50)
  }, [])

  useEffect(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useEffect(() => {
    const el = statsRef.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStatsVisible(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const c15 = useCountUp(15, statsVisible)
  const c4 = useCountUp(4, statsVisible)
  const c500 = useCountUp(500, statsVisible)

  const toggleFaq = (idx) => {
    setFaqOpen((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const yearlyDiscount = 0.78

  return (
    <div
      className="min-h-screen text-white antialiased"
      style={{
        fontFamily: "'Manrope', 'Outfit', system-ui, sans-serif",
        backgroundColor: 'var(--bg-primary)',
        ['--bg-primary']: '#08080f',
        ['--accent-from']: '#f4c95d',
        ['--accent-to']: '#14c8b0',
        ['--accent-mid']: '#7dd3fc',
        ['--card-bg']: 'rgba(255,255,255,0.06)',
        ['--border']: 'rgba(255,255,255,0.12)',
        ['--glow']: 'rgba(20, 200, 176, 0.35)',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 28px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes floatBlob {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(18px, -22px, 0) scale(1.05); }
          66% { transform: translate3d(-14px, 12px, 0) scale(0.98); }
        }
        @keyframes floatBlob2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-20px, 18px, 0) scale(1.08); }
        }
        @keyframes gridDrift {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-40px, -40px, 0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hero-anim { animation: fadeInUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .hero-anim-1 { animation-delay: 0.05s; }
        .hero-anim-2 { animation-delay: 0.18s; }
        .hero-anim-3 { animation-delay: 0.3s; }
        .hero-anim-4 { animation-delay: 0.42s; }
        .hero-anim-5 { animation-delay: 0.54s; }
        .blob { animation: floatBlob 18s ease-in-out infinite; will-change: transform; }
        .blob-2 { animation: floatBlob2 22s ease-in-out infinite; will-change: transform; }
        .grid-bg {
          background-size: 48px 48px;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px);
          animation: gridDrift 28s linear infinite;
          opacity: 0.35;
        }
        [data-reveal] {
          opacity: 0;
          transform: translate3d(0, 32px, 0);
          transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        [data-reveal].reveal-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        .btn-ghost {
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .btn-ghost:hover {
          transform: scale(1.05);
          box-shadow: 0 14px 40px rgba(0,0,0,0.25);
        }
        .btn-glow {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-glow:hover {
          transform: scale(1.05);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 18px 50px rgba(20, 200, 176, 0.35);
        }
        #pricing .pricing-btn {
          transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease, box-shadow 300ms ease,
            transform 300ms ease, filter 300ms ease;
        }
        #pricing .pricing-btn:hover {
          background-color: #ffd700 !important;
          background-image: none !important;
          color: #000000 !important;
          border-color: #ffd700 !important;
          box-shadow: none !important;
          transform: none;
        }
        #pricing .pricing-btn:hover * {
          color: #000000 !important;
        }
        .card-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .card-hover:hover {
          transform: scale(1.03) translateY(-4px);
          border-color: rgba(244, 201, 93, 0.45);
          box-shadow: 0 22px 60px rgba(0,0,0,0.45), 0 0 40px rgba(20, 200, 176, 0.18);
        }
        .gradient-text {
          background-image: linear-gradient(120deg, var(--accent-from), var(--accent-mid), var(--accent-to));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .faq-panel {
          transition: max-height 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
        }
        @keyframes telegramPulseRing {
          0% { transform: scale(0.65); opacity: 0.55; }
          70% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(0.65); opacity: 0; }
        }
        .cta-tg-pulse {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 88px;
          height: 88px;
          margin-left: -44px;
          margin-top: -44px;
          border-radius: 9999px;
          border: 2px solid rgba(34, 158, 217, 0.55);
          animation: telegramPulseRing 2.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
          pointer-events: none;
        }
        .cta-tg-pulse-2 { animation-delay: 0.75s; width: 88px; height: 88px; margin-left: -44px; margin-top: -44px; border-color: rgba(34, 158, 217, 0.35); }
        .cta-tg-pulse-3 { animation-delay: 1.5s; width: 88px; height: 88px; margin-left: -44px; margin-top: -44px; border-color: rgba(125, 211, 252, 0.4); }
        .cta-telegram-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #081018;
          outline: none;
        }
        .cta-telegram-link:focus-visible {
          border-radius: 1.5rem;
          box-shadow: 0 0 0 3px rgba(8, 16, 24, 0.35), 0 0 0 6px rgba(34, 158, 217, 0.45);
        }
        .cta-tg-icon-wrap {
          position: relative;
          display: grid;
          place-items: center;
          width: 64px;
          height: 64px;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .cta-telegram-link:hover .cta-tg-icon-wrap {
          transform: scale(1.12) rotate(10deg);
        }
        .cta-telegram-link:active .cta-tg-icon-wrap {
          transform: scale(1.05) rotate(6deg);
        }
        .drawer-enter { transform: translate3d(100%, 0, 0); }
        .drawer-enter-active { transform: translate3d(0, 0, 0); transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>

      {/* Nav */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          navSolid ? 'border-b border-white/10 bg-[#08080f]/70 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[4.25rem] md:px-6 lg:px-8">
          <a href="#top" className="group flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-xl px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60">
            <span
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition group-hover:border-white/20"
              style={{ boxShadow: '0 0 30px rgba(20, 200, 176, 0.18)' }}
            >
              <BookOpen className="h-5 w-5 text-teal-300" aria-hidden />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-extrabold tracking-tight">Ali</span>
              <span className="text-[11px] text-white/55">Arabic Studio</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/70 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn-glow hidden min-h-[44px] cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-amber-300 via-teal-300 to-teal-400 px-5 text-sm font-extrabold text-[#081018] shadow-lg sm:inline-flex"
              onClick={() => window.open('https://wa.me/996550662755', '_blank')}
            >
              Записаться
            </button>
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90 transition hover:bg-white/10 lg:hidden"
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden ${
            menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
          aria-hidden={!menuOpen}
        />
        <div
          className={`fixed right-0 top-0 z-50 h-full w-[min(92vw,380px)] border-l border-white/10 bg-[#0a0a12]/95 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out lg:hidden ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="mt-16 flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="min-h-[48px] rounded-xl px-3 py-3 text-base font-semibold text-white/85 hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              className="btn-glow mt-4 inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-amber-300 via-teal-300 to-teal-400 px-5 text-sm font-extrabold text-[#081018]"
              onClick={() => {
                setMenuOpen(false)
                window.open('https://wa.me/996550662755', '_blank')
              }}
            >
              Записаться
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden pt-24 md:pt-28 lg:pt-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid-bg" />
            <div
              className="blob absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl md:h-96 md:w-96"
              style={{ background: 'radial-gradient(circle at 30% 30%, rgba(244,201,93,0.55), transparent 60%)' }}
            />
            <div
              className="blob-2 absolute -right-28 top-40 h-80 w-80 rounded-full blur-3xl md:h-[28rem] md:w-[28rem]"
              style={{ background: 'radial-gradient(circle at 40% 40%, rgba(20,200,176,0.45), transparent 62%)' }}
            />
            <div
              className="absolute left-1/2 top-[62%] h-64 w-[120%] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(125,211,252,0.18), transparent 65%)' }}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-20 md:px-6 lg:px-8 lg:pb-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/75 hero-anim hero-anim-1">
              <Sparkles className="h-4 w-4 text-amber-300" />
              Преподаватель арабского · MSA + диалекты · Онлайн
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl hero-anim hero-anim-2">
              <span className="gradient-text">Говорите по-арабски уверенно</span>
              <span className="block text-white">без сухой «школы» и хаоса самоучки</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg hero-anim hero-anim-3">
              Персональные уроки с сильной методикой: произношение, грамматика в контексте и реальные сценарии —
              от быта до бизнеса. Вы строите навык, который звучит естественно.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center hero-anim hero-anim-4">
              <button
                type="button"
                className="btn-glow inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-teal-300 to-teal-400 px-7 text-sm font-extrabold text-[#081018] shadow-xl"
                onClick={() => window.open('https://wa.me/996550662755', '_blank')}
              >
                Согласовать время
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#process"
                className="btn-ghost inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 text-sm font-extrabold text-white/90 backdrop-blur-md hover:border-white/25 hover:bg-white/10"
              >
                Как проходит обучение
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-4 text-xs text-white/55 hero-anim hero-anim-5">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <GraduationCap className="h-4 w-4 text-teal-300" />
                4+ лет практики преподавания
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <Users className="h-4 w-4 text-amber-300" />
                15+ учеников выпущено
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <Star className="h-4 w-4 text-amber-300" fill="currentColor" />
                500+ часов преподавания
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative mx-auto max-w-6xl px-4 pb-4 pt-4 md:px-6 md:pb-6 lg:px-8">
          <div
            data-reveal
            className="card-hover rounded-3xl border border-white/10 p-6 md:p-10"
            style={{ background: 'var(--card-bg)', backdropFilter: 'blur(18px)' }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300/90">О преподавателе</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
              Али — <span className="gradient-text">Ali Arabic Studio</span>
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
              Родился в Медине, Саудовская Аравия. Хафиз Корана. Уже 5+ лет обучается в Египте. Закончил 5+ книг по арабской
              грамматике. Преподаёт с душой и системным подходом.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/blog.aliakhi/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-bold text-white/90"
              >
                <Instagram className="h-4 w-4 text-amber-300" />
                @blog.aliakhi
              </a>
              <a
                href="mailto:aliviner08@gmail.com"
                className="btn-glow inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-bold text-white/90"
              >
                <Mail className="h-4 w-4 text-teal-300" />
                aliviner08@gmail.com
              </a>
              <a
                href="https://wa.me/996550662755"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-bold text-white/90"
              >
                <Phone className="h-4 w-4 text-teal-300" />
                WhatsApp: Али · +996 550 662755
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8"
        >
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300/90">Преимущества</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Дизайн урока, который <span className="gradient-text">держит в фокусе</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">
              Каждая минута — под ваш уровень и цель: разговор, экзамен, релокация или работа с документами.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <article
                  key={f.title}
                  data-reveal
                  className="card-hover rounded-2xl border border-white/10 p-6"
                  style={{
                    background: 'var(--card-bg)',
                    backdropFilter: 'blur(18px)',
                    transitionDelay: `${80 + i * 90}ms`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-amber-300/20 to-teal-400/15">
                      <Icon className="h-6 w-6 text-teal-200" />
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold tracking-tight">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">{f.desc}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Stats */}
        <section id="stats" ref={statsRef} className="relative py-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(244,201,93,0.65), rgba(20,200,176,0.65), transparent)',
            }}
          />
          <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <div
              data-reveal
              className="grid gap-4 rounded-3xl border border-white/10 p-6 md:grid-cols-3 md:p-8 lg:grid-cols-3"
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)' }}
            >
              {[
                { label: 'Учеников выпущено', val: c15, suffix: '+' },
                { label: 'Лет практики преподавания', val: c4, suffix: '+' },
                { label: 'Часов преподавания', val: c500, suffix: '+' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="text-4xl font-extrabold tracking-tight md:text-5xl">
                    <span>
                      {s.val}
                      <span className="gradient-text">{s.suffix}</span>
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
            <p data-reveal className="mt-4 text-center text-xs text-white/45">
              *Цифры отражают опыт Ali Arabic Studio по состоянию на текущий период.
            </p>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(20,200,176,0.55), rgba(244,201,93,0.55), transparent)',
            }}
          />
        </section>

        {/* How it works */}
        <section id="process" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300/90">Как это работает</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Три шага — и вы уже <span className="gradient-text">в игре</span>
            </h2>
          </div>

          <div className="relative mt-14">
            <div className="hidden lg:block">
              <div
                className="absolute left-[10%] right-[10%] top-[52px] h-px"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(244,201,93,0.0), rgba(244,201,93,0.55), rgba(20,200,176,0.55), rgba(244,201,93,0.0))',
                }}
              />
            </div>

            <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
              {STEPS.map((s, idx) => {
                const Icon = s.icon
                return (
                  <div key={s.n} data-reveal className="relative" style={{ transitionDelay: `${idx * 110}ms` }}>
                    <div className="hidden lg:flex justify-center">
                      <div
                        className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 text-lg font-extrabold shadow-lg"
                        style={{
                          backgroundImage: 'linear-gradient(135deg, rgba(244,201,93,0.95), rgba(20,200,176,0.95))',
                          color: '#081018',
                        }}
                      >
                        {s.n}
                      </div>
                    </div>
                    <div className="mt-0 flex items-start gap-4 lg:mt-8 lg:flex-col lg:items-center lg:text-center">
                      <div
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 lg:hidden"
                        style={{
                          backgroundImage: 'linear-gradient(135deg, rgba(244,201,93,0.95), rgba(20,200,176,0.95))',
                          color: '#081018',
                          fontWeight: 800,
                        }}
                      >
                        {s.n}
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:w-full">
                        <div className="mb-4 hidden h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-amber-300/20 to-teal-400/15 lg:mx-auto lg:grid">
                          <Icon className="h-6 w-6 text-teal-200" />
                        </div>
                        <div className="flex items-center gap-3 lg:hidden">
                          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-amber-300/20 to-teal-400/15">
                            <Icon className="h-5 w-5 text-teal-200" />
                          </span>
                          <h3 className="text-lg font-extrabold">{s.title}</h3>
                        </div>
                        <h3 className="mt-1 hidden text-lg font-extrabold lg:block">{s.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/65">{s.desc}</p>
                      </div>
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div
                        className="my-2 ml-6 h-10 w-px bg-gradient-to-b from-amber-300/50 to-teal-300/50 lg:hidden"
                        aria-hidden
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300/90">Отзывы</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Люди приходят за языком — <span className="gradient-text">остаются за результатом</span>
            </h2>
          </div>

          <div className="mt-10 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible [&::-webkit-scrollbar]:hidden">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                data-reveal
                className="card-hover min-w-[min(86vw,340px)] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:min-w-0"
              >
                <div className="flex items-center gap-1 text-amber-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" fill="currentColor" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-white/80">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div
                    className="grid h-11 w-11 place-items-center rounded-full text-sm font-extrabold"
                    style={{
                      background: `linear-gradient(135deg, hsla(${t.hue}, 90%, 62%, 0.95), hsla(${(Number(t.hue) + 40) % 360}, 85%, 55%, 0.95))`,
                      color: '#081018',
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-extrabold">{t.name}</div>
                    <div className="text-xs text-white/55">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300/90">Тарифы</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Прозрачные пакеты — <span className="gradient-text">без сюрпризов</span>
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap md:gap-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-xl">
                <button
                  type="button"
                  className={`pricing-btn min-h-[44px] cursor-pointer rounded-full px-5 text-sm font-extrabold transition ${
                    !billingYearly ? 'bg-gradient-to-r from-amber-300/90 to-teal-300/90 text-[#081018]' : 'text-white/65'
                  }`}
                  onClick={() => setBillingYearly(false)}
                >
                  Месяц
                </button>
                <button
                  type="button"
                  className={`pricing-btn min-h-[44px] cursor-pointer rounded-full px-5 text-sm font-extrabold transition ${
                    billingYearly ? 'bg-gradient-to-r from-amber-300/90 to-teal-300/90 text-[#081018]' : 'text-white/65'
                  }`}
                  onClick={() => setBillingYearly(true)}
                >
                  Год <span className="ml-1 text-xs font-extrabold text-emerald-200">−22%</span>
                </button>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-xl">
                <button
                  type="button"
                  className={`pricing-btn min-h-[44px] cursor-pointer rounded-full px-5 text-sm font-extrabold transition ${
                    currencyRub ? 'bg-gradient-to-r from-amber-300/90 to-teal-300/90 text-[#081018]' : 'text-white/65'
                  }`}
                  onClick={() => setCurrencyRub(true)}
                >
                  ₽ Рубли
                </button>
                <button
                  type="button"
                  className={`pricing-btn min-h-[44px] cursor-pointer rounded-full px-5 text-sm font-extrabold transition ${
                    !currencyRub ? 'bg-gradient-to-r from-amber-300/90 to-teal-300/90 text-[#081018]' : 'text-white/65'
                  }`}
                  onClick={() => setCurrencyRub(false)}
                >
                  с Сомы
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PRICING.map((plan) => {
              const monthlyAmount = currencyRub ? plan.monthlyRub : plan.monthlySom
              const price = billingYearly ? Math.round(monthlyAmount * 12 * yearlyDiscount) : monthlyAmount
              const currencyLabel = currencyRub ? ' ₽' : ' с'
              const period = billingYearly ? '/ год' : '/ месяц'
              return (
                <div
                  key={plan.id}
                  data-reveal
                  className={`relative rounded-3xl border p-7 backdrop-blur-xl transition ${
                    plan.popular
                      ? 'card-hover border-amber-300/35 bg-gradient-to-b from-white/10 to-white/5 shadow-[0_0_0_1px_rgba(244,201,93,0.18)] lg:scale-[1.04]'
                      : 'card-hover border-white/10 bg-white/5'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-amber-300/40 bg-[#0c0c14] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-200">
                      Популярный
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-extrabold">{plan.name}</h3>
                      <p className="mt-1 text-sm text-white/60">{plan.desc}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-end gap-2">
                    <div className="text-4xl font-extrabold tracking-tight">
                      {price.toLocaleString('ru-RU')}
                      <span className="text-base font-bold text-white/55">{currencyLabel}</span>
                    </div>
                    <div className="pb-1 text-sm text-white/55">{period}</div>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm text-white/75">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" aria-hidden />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#cta"
                    className={`pricing-btn btn-glow mt-8 inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-full text-sm font-extrabold ${
                      plan.popular
                        ? 'bg-gradient-to-r from-amber-300 via-teal-300 to-teal-400 text-[#081018]'
                        : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    Выбрать
                  </a>
                </div>
              )
            })}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300/90">FAQ</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Вопросы, которые <span className="gradient-text">закрывают сомнения</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {FAQ_ITEMS.map((item, idx) => {
              const open = faqOpen.has(idx)
              return (
                <div
                  key={item.q}
                  data-reveal
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
                  style={{ transitionDelay: `${(idx % 3) * 70}ms` }}
                >
                  <button
                    type="button"
                    className="flex w-full min-h-[52px] items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                    onClick={() => toggleFaq(idx)}
                  >
                    <span className="text-sm font-extrabold text-white/90">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-white/55 transition-transform duration-300 ${
                        open ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>
                  <div
                    className="faq-panel px-5 text-sm leading-relaxed text-white/65"
                    style={{
                      maxHeight: open ? '220px' : '0px',
                      opacity: open ? 1 : 0,
                      overflow: 'hidden',
                    }}
                  >
                    <div className="pb-5">{item.a}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-20 lg:px-8">
          <div
            data-reveal
            className="relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-12"
            style={{
              backgroundImage: 'linear-gradient(120deg, rgba(244,201,93,0.95), rgba(20,200,176,0.92), rgba(125,211,252,0.75))',
            }}
          >
            <div
              className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.55), transparent 60%)' }}
            />
            <div
              className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(8,16,24,0.35), transparent 60%)' }}
            />
            <div
              className="pointer-events-none absolute left-4 top-1/2 hidden h-28 w-28 -translate-y-1/2 rounded-2xl border-2 border-[#081018]/12 md:block"
              style={{ animation: 'spinSlow 26s linear infinite' }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-6 top-8 hidden h-20 w-20 rounded-full border-2 border-[#081018]/10 lg:block"
              style={{ animation: 'spinSlow 18s linear infinite reverse' }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-6 right-10 hidden h-16 w-16 rotate-12 rounded-xl border-2 border-[#081018]/12 md:block"
              style={{ animation: 'spinSlow 22s linear infinite' }}
              aria-hidden
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-[#081018] md:text-4xl">
                  Готовы услышать свой арабский — ясно и уверенно?
                </h2>
                <p className="mt-3 max-w-xl text-sm font-semibold leading-relaxed text-[#081018]/75 md:text-base">
                  Напишите в Telegram — пришлю короткий гайд по алфавиту и предложу 2 слота для бесплатного созвона.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <a
                  href="https://t.me/arabskyii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-telegram-link min-h-[44px] min-w-[44px] rounded-3xl px-4 py-2"
                >
                  <div className="relative mx-auto flex h-[132px] w-[132px] items-center justify-center">
                    <span className="cta-tg-pulse cta-tg-pulse-1" aria-hidden />
                    <span className="cta-tg-pulse cta-tg-pulse-2" aria-hidden />
                    <span className="cta-tg-pulse cta-tg-pulse-3" aria-hidden />
                    <div className="cta-tg-icon-wrap relative z-10 shrink-0">
                      <svg width="64" height="64" viewBox="0 0 24 24" aria-hidden>
                        <circle cx="12" cy="12" r="12" fill="#229ED9" />
                        <path
                          fill="#fff"
                          d="M5.671 11.043 18.238 6.188c.924-.356 1.661.225 1.37 1.606l-.001-.001-2.13 10.01c-.225 1.015-.82 1.263-1.657.785l-2.84-2.093-1.369 1.318c-.15.15-.274.274-.563.274l.204-2.889 9.83-8.884c.43-.383-.093-.596-.667-.384l-12.45 4.873-5.51-1.72c-1.2-.375-1.22-.9.253-1.34z"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="mt-1 max-w-[220px] text-center text-base font-extrabold leading-snug text-[#081018] md:text-lg">
                    Получить гайд бесплатно
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#06060c]">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <BookOpen className="h-5 w-5 text-teal-300" />
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-extrabold">Ali Arabic Studio</div>
                  <div className="text-xs text-white/55">Преподаватель арабского · онлайн</div>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                Родился в Медине, хафиз Корана, 5+ лет учёбы в Египте и глубокая грамматика — системные уроки с душой для тех,
                кто хочет серьёзно говорить по-арабски.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm text-white/70">
                <a
                  href="https://www.instagram.com/blog.aliakhi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Instagram className="h-4 w-4 shrink-0 text-amber-300" />
                  @blog.aliakhi
                </a>
                <a href="mailto:aliviner08@gmail.com" className="inline-flex items-center gap-2 transition hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-teal-300" />
                  aliviner08@gmail.com
                </a>
                <a
                  href="https://wa.me/996550662755"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-teal-300" />
                  WhatsApp: +996 550 662755 (Али)
                </a>
              </div>
            </div>
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-extrabold uppercase tracking-wider text-white/45">{col.title}</div>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/70 transition hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} Ali Arabic Studio. Все права защищены.</span>
            <span>Сделано с вниманием к деталям · MSA + диалекты · Онлайн по всему миру</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
