import React, { useState, useMemo } from 'react';
import { Search, Plus, Send, FileText, ChevronRight, X, Check, Edit3, Instagram, Youtube, ExternalLink, ArrowLeft, FileDown, Star, MessageCircle, Mail, Phone, Hash, Music2, Clock, AlertCircle, Users, Folder, BarChart3, Calendar, Download, Briefcase, Sparkles, LayoutDashboard, TrendingUp, Eye, DollarSign, Target } from 'lucide-react';

const MOCK_MANAGERS = [
  { id: 1, name: 'Ирина Ковалёва', short: 'И. Ковалёва', avatar: 'И', color: 'bg-pink-500' },
  { id: 2, name: 'Артём Власов', short: 'А. Власов', avatar: 'А', color: 'bg-sky-500' },
  { id: 3, name: 'Олеся Маркова', short: 'О. Маркова', avatar: 'О', color: 'bg-purple-500' },
  { id: 4, name: 'Вы', short: 'Вы', avatar: 'Я', color: 'bg-red-600' },
];

const MOCK_PROJECTS = [
  { id: 1, name: "L'Oréal — летняя кампания", client: "L'Oréal", status: 'active', bloggers: 8, budget: 1200000 },
  { id: 2, name: 'Samsung Galaxy запуск', client: 'Samsung', status: 'active', bloggers: 12, budget: 2800000 },
  { id: 3, name: 'Тинькофф Junior', client: 'T-Bank', status: 'completed', bloggers: 15, budget: 1800000 },
  { id: 4, name: 'Adidas осень', client: 'Adidas', status: 'active', bloggers: 6, budget: 950000 },
];

const MOCK_BLOGGERS = [
  { id: 1, name: 'Анна Соколова', username: '@anna_lifestyle', avatarUrl: 'https://i.pravatar.cc/150?img=47', contact: { type: 'telegram', value: '@anna_lifestyle' }, managerId: 1, lastCollabDate: '2025-04-20', rating: 5, platforms: [{ type: 'instagram', followers: 245000, er: 4.2 }, { type: 'tiktok', followers: 180000, er: 6.8 }], tags: ['lifestyle', 'beauty', 'travel'], projectIds: [1, 2], categories: ['FMCG', 'Бьюти', 'Путешествия'], status: 'active', avgViews: 95000, audienceQuality: 87, collaborations: 3 },
  { id: 2, name: 'Максим Петров', username: '@max_tech', avatarUrl: 'https://i.pravatar.cc/150?img=12', contact: { type: 'telegram', value: '@max_tech_pr' }, managerId: 2, lastCollabDate: '2025-04-01', rating: 4, platforms: [{ type: 'youtube', followers: 520000, er: 5.1 }, { type: 'telegram', followers: 45000, er: 12.3 }], tags: ['tech', 'gadgets', 'review'], projectIds: [2], categories: ['Электроника', 'IT', 'Гаджеты'], status: 'active', avgViews: 180000, audienceQuality: 92, collaborations: 7 },
  { id: 3, name: 'Елена Кравцова', username: '@elena_fit', avatarUrl: 'https://i.pravatar.cc/150?img=44', contact: { type: 'whatsapp', value: '+7 (999) 123-45-67' }, managerId: 4, lastCollabDate: null, rating: null, platforms: [{ type: 'instagram', followers: 89000, er: 7.4 }], tags: ['fitness', 'health', 'nutrition'], projectIds: [4], categories: ['Спорт', 'ЗОЖ', 'Питание'], status: 'in_progress', avgViews: 32000, audienceQuality: 94, collaborations: 0 },
  { id: 4, name: 'Дмитрий Волков', username: '@volkov_food', avatarUrl: 'https://i.pravatar.cc/150?img=33', contact: { type: 'email', value: 'volkov.pr@agency.ru' }, managerId: 1, lastCollabDate: '2025-04-25', rating: 5, platforms: [{ type: 'youtube', followers: 1200000, er: 3.8 }, { type: 'instagram', followers: 380000, er: 4.5 }], tags: ['food', 'cooking', 'recipes'], projectIds: [1, 2, 3], categories: ['Еда', 'Кулинария', 'HoReCa'], status: 'active', avgViews: 420000, audienceQuality: 81, collaborations: 12 },
  { id: 5, name: 'София Белова', username: '@sofia_mom', avatarUrl: 'https://i.pravatar.cc/150?img=49', contact: { type: 'phone', value: '+7 (916) 555-12-34' }, managerId: 3, lastCollabDate: '2025-02-10', rating: 3, platforms: [{ type: 'instagram', followers: 156000, er: 5.9 }, { type: 'vk', followers: 78000, er: 3.2 }], tags: ['parenting', 'kids', 'family'], projectIds: [3], categories: ['Семья', 'Дети', 'Образование'], status: 'archived', avgViews: 65000, audienceQuality: 89, collaborations: 5 },
];

const MOCK_COLLABORATIONS = [
  { id: 1, bloggerId: 1, projectId: 1, title: 'Reels-обзор летней коллекции', status: 'in_progress', createdAt: '2025-04-20', budget: 80000, rating: null, metrics: { leads: 142, clicks: 3200, views: 89000, comments: 340, reposts: 89, reach: 156000, sales: 23 } },
  { id: 2, bloggerId: 1, projectId: 2, title: 'Распаковка Galaxy S24', status: 'completed', createdAt: '2025-03-15', budget: 120000, rating: 5, metrics: { leads: 287, clicks: 5400, views: 145000, comments: 520, reposts: 156, reach: 230000, sales: 41 } },
  { id: 3, bloggerId: 2, projectId: 2, title: 'YouTube-обзор новинки', status: 'completed', createdAt: '2025-04-01', budget: 250000, rating: 4, metrics: { leads: 890, clicks: 12000, views: 320000, comments: 1240, reposts: 420, reach: 480000, sales: 156 } },
  { id: 4, bloggerId: 4, projectId: 1, title: 'Кулинарный stories', status: 'completed', createdAt: '2025-04-25', budget: 95000, rating: 5, metrics: { leads: 198, clicks: 4100, views: 180000, comments: 612, reposts: 203, reach: 290000, sales: 38 } },
  { id: 5, bloggerId: 4, projectId: 2, title: 'Обзор для Galaxy', status: 'completed', createdAt: '2025-04-10', budget: 200000, rating: 5, metrics: { leads: 445, clicks: 8200, views: 380000, comments: 980, reposts: 340, reach: 560000, sales: 92 } },
  { id: 6, bloggerId: 5, projectId: 3, title: 'Тинькофф Junior — семья', status: 'completed', createdAt: '2025-02-10', budget: 70000, rating: 3, metrics: { leads: 156, clicks: 2900, views: 88000, comments: 295, reposts: 78, reach: 142000, sales: 28 } },
];

const formatNumber = (n) => { if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'; if (n >= 1000) return (n / 1000).toFixed(0) + 'K'; return n?.toString() ?? '0'; };
const platformIcon = (t) => ({ instagram: Instagram, youtube: Youtube, tiktok: Music2, telegram: MessageCircle, vk: Hash }[t] || Hash);
const platformColor = (t) => ({ instagram: 'text-pink-400', youtube: 'text-red-400', tiktok: 'text-cyan-400', telegram: 'text-blue-400', vk: 'text-blue-300' }[t] || 'text-zinc-400');
const contactIcon = (t) => ({ telegram: Send, whatsapp: MessageCircle, email: Mail, phone: Phone }[t] || Mail);
const contactColor = (t) => ({ telegram: 'text-sky-400', whatsapp: 'text-emerald-400', email: 'text-amber-400', phone: 'text-purple-400' }[t] || 'text-zinc-400');
const contactLabel = (t) => ({ telegram: 'Telegram', whatsapp: 'WhatsApp', email: 'Email', phone: 'Телефон' }[t] || t);
const getManager = (id) => MOCK_MANAGERS.find((m) => m.id === id);
const shortProjectName = (p) => p ? p.name.split('—')[0].trim() : '';
const formatDate = (s) => s ? new Date(s).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
const daysAgo = (s) => {
  if (!s) return null;
  const diff = Math.floor((new Date() - new Date(s)) / 86400000);
  if (diff === 0) return 'сегодня'; if (diff === 1) return 'вчера';
  if (diff < 7) return `${diff} д. назад`; if (diff < 30) return `${Math.floor(diff / 7)} нед. назад`;
  if (diff < 365) return `${Math.floor(diff / 30)} мес. назад`; return `${Math.floor(diff / 365)} г. назад`;
};

const statusConfig = {
  active: { label: 'Активен', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  in_progress: { label: 'В работе', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  archived: { label: 'Архив', color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' },
  completed: { label: 'Завершено', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  draft: { label: 'Черновик', color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' },
};

export default function DateBloggers() {
  const [tab, setTab] = useState('home');
  const [selectedBlogger, setSelectedBlogger] = useState(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(null);
  const [bloggers, setBloggers] = useState(MOCK_BLOGGERS);
  const [collaborations, setCollaborations] = useState(MOCK_COLLABORATIONS);

  const updateRating = (collabId, rating) => {
    const updated = collaborations.map((c) => (c.id === collabId ? { ...c, rating } : c));
    setCollaborations(updated);
    setBloggers((prev) => prev.map((b) => {
      const ratings = updated.filter((c) => c.bloggerId === b.id && c.rating).map((c) => c.rating);
      const avg = ratings.length ? ratings.reduce((s, r) => s + r, 0) / ratings.length : null;
      return { ...b, rating: avg };
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="sticky top-0 z-30 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="px-4 pt-4 pb-3">
          {selectedBlogger ? (
            <button onClick={() => setSelectedBlogger(null)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition mb-2">
              <ArrowLeft size={18} /><span className="text-sm">Назад</span>
            </button>
          ) : (
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
                  <span className="text-white font-bold text-sm">Д</span>
                </div>
                <h1 className="text-lg font-bold tracking-tight">Дэйт: <span className="text-red-500">Блогеры</span></h1>
              </div>
              <button className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-500 transition flex items-center justify-center shadow-lg shadow-red-600/30">
                <Plus size={18} className="text-white" strokeWidth={2.5} />
              </button>
            </div>
          )}

          {!selectedBlogger && (
            <div className="flex gap-1 bg-zinc-900 rounded-lg p-1 overflow-x-auto">
              {[{ id: 'home', label: 'Главная', icon: LayoutDashboard }, { id: 'bloggers', label: 'Блогеры', icon: Users }, { id: 'projects', label: 'Проекты', icon: Folder }, { id: 'reports', label: 'Отчёты', icon: BarChart3 }].map((t) => {
                const Icon = t.icon;
                return (
                  <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-md text-xs font-medium transition whitespace-nowrap ${tab === t.id ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}>
                    <Icon size={14} />{t.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-4 pb-24">
        {selectedBlogger ? (
          <BloggerDetail blogger={bloggers.find((b) => b.id === selectedBlogger.id) || selectedBlogger} collaborations={collaborations.filter((c) => c.bloggerId === selectedBlogger.id)} onCreateProposal={() => setShowProposalModal(true)} onRate={(c) => setShowRatingModal(c)} />
        ) : tab === 'home' ? (
          <Home bloggers={bloggers} collaborations={collaborations} onSelectBlogger={setSelectedBlogger} />
        ) : tab === 'bloggers' ? (
          <BloggersList bloggers={bloggers} onSelectBlogger={setSelectedBlogger} />
        ) : tab === 'projects' ? (
          <ProjectsList />
        ) : (
          <ReportsView onOpenReportModal={() => setShowReportModal(true)} />
        )}
      </div>

      {showProposalModal && <ProposalModal blogger={selectedBlogger} onClose={() => setShowProposalModal(false)} />}
      {showReportModal && <ReportGeneratorModal onClose={() => setShowReportModal(false)} />}
      {showRatingModal && <RatingModal collab={showRatingModal} onClose={() => setShowRatingModal(null)} onSave={(r) => { updateRating(showRatingModal.id, r); setShowRatingModal(null); }} />}
    </div>
  );
}

function Avatar({ url, name, size = 'md' }) {
  const [error, setError] = useState(false);
  const sizes = { xs: 'w-7 h-7 text-[10px]', sm: 'w-10 h-10 text-sm', md: 'w-12 h-12 text-base', lg: 'w-16 h-16 text-xl' };
  const initials = name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || '?';
  if (error || !url) return <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-semibold flex-shrink-0`}>{initials}</div>;
  return <img src={url} alt={name} onError={() => setError(true)} className={`${sizes[size]} rounded-full object-cover flex-shrink-0 ring-2 ring-zinc-800`} />;
}

function Stars({ value, size = 12, interactive = false, onChange }) {
  if (!value && !interactive) return <span className="text-xs text-zinc-500">Без оценки</span>;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button key={i} disabled={!interactive} onClick={() => interactive && onChange(i)} className={interactive ? 'cursor-pointer hover:scale-110 transition' : 'cursor-default'}>
          <Star size={size} className={i <= (value || 0) ? 'text-red-500' : 'text-zinc-700'} fill={i <= (value || 0) ? '#ef4444' : 'transparent'} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
}

function Home({ bloggers, collaborations, onSelectBlogger }) {
  const totals = collaborations.reduce((a, c) => { if (c.metrics) a.reach += c.metrics.reach; a.budget += c.budget; return a; }, { reach: 0, budget: 0 });
  const avgER = useMemo(() => {
    const allEr = bloggers.flatMap((b) => b.platforms.map((p) => p.er));
    return allEr.length ? (allEr.reduce((s, e) => s + e, 0) / allEr.length).toFixed(1) : 0;
  }, [bloggers]);
  const recentCollabs = [...collaborations].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  const staleBloggers = bloggers.filter((b) => {
    if (b.status !== 'active') return false;
    if (!b.lastCollabDate) return true;
    return Math.floor((new Date() - new Date(b.lastCollabDate)) / 86400000) > 30;
  });

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-red-500/15 via-zinc-900 to-zinc-900 border border-red-500/20 rounded-2xl p-4">
        <div className="text-xs text-red-300 uppercase tracking-wider font-semibold mb-1">Сводка</div>
        <div className="text-2xl font-bold mb-3">Привет! 👋</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-zinc-900/60 backdrop-blur rounded-lg p-2.5 border border-zinc-800">
            <div className="text-[10px] text-zinc-500 uppercase">Охват</div>
            <div className="text-lg font-bold text-cyan-400">{formatNumber(totals.reach)}</div>
          </div>
          <div className="bg-zinc-900/60 backdrop-blur rounded-lg p-2.5 border border-zinc-800">
            <div className="text-[10px] text-zinc-500 uppercase">Бюджет</div>
            <div className="text-lg font-bold text-red-400">{formatNumber(totals.budget)}₽</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <KPICard icon={Users} label="Блогеров" value={bloggers.length} sublabel={`${bloggers.filter(b => b.status === 'active').length} активных`} />
        <KPICard icon={DollarSign} label="Бюджет" value={formatNumber(totals.budget) + '₽'} sublabel="суммарный" />
        <KPICard icon={Eye} label="Охват" value={formatNumber(totals.reach)} sublabel="по интеграциям" />
        <KPICard icon={TrendingUp} label="Средний ER" value={avgER + '%'} sublabel="по всем" />
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-red-400" />
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Недавние интеграции</div>
        </div>
        <div className="space-y-2">
          {recentCollabs.map((c) => {
            const blogger = bloggers.find((b) => b.id === c.bloggerId);
            const project = MOCK_PROJECTS.find((p) => p.id === c.projectId);
            return (
              <button key={c.id} onClick={() => onSelectBlogger(blogger)} className="w-full flex items-center gap-3 p-2 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/60 transition text-left">
                <Avatar url={blogger?.avatarUrl} name={blogger?.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{c.title}</div>
                  <div className="text-xs text-zinc-500 truncate">{blogger?.name} · {shortProjectName(project)}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  {c.rating ? <Stars value={c.rating} size={10} /> : <div className={`text-[10px] px-1.5 py-0.5 rounded border ${statusConfig[c.status].color}`}>{statusConfig[c.status].label}</div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {staleBloggers.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={14} className="text-amber-400" />
            <div className="text-xs font-semibold text-amber-300 uppercase tracking-wide">Стоит написать</div>
          </div>
          <div className="text-xs text-zinc-400 mb-3">{staleBloggers.length} {staleBloggers.length === 1 ? 'блогер' : 'блогера'} без активности больше месяца</div>
          <div className="space-y-1.5">
            {staleBloggers.map((b) => (
              <button key={b.id} onClick={() => onSelectBlogger(b)} className="w-full flex items-center gap-2 p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition text-left">
                <Avatar url={b.avatarUrl} name={b.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{b.name}</div>
                  <div className="text-xs text-zinc-500">{b.lastCollabDate ? `Последняя: ${daysAgo(b.lastCollabDate)}` : 'Пока без интеграций'}</div>
                </div>
                <ChevronRight size={14} className="text-zinc-500" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function KPICard({ icon: Icon, label, value, sublabel }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
      <div className="flex items-center justify-between mb-1.5"><Icon size={14} className="text-zinc-500" /></div>
      <div className="text-xl font-bold mb-0.5">{value}</div>
      <div className="text-[10px] text-zinc-500 uppercase tracking-wide">{label}</div>
      {sublabel && <div className="text-[10px] text-zinc-600 mt-0.5">{sublabel}</div>}
    </div>
  );
}

function BloggersList({ bloggers, onSelectBlogger }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => bloggers.filter((b) => {
    const ms = b.name.toLowerCase().includes(search.toLowerCase()) || b.username.toLowerCase().includes(search.toLowerCase());
    const mf = filter === 'all' || b.status === filter;
    return ms && mf;
  }), [bloggers, search, filter]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск по имени или нику..." className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-sm placeholder:text-zinc-500 focus:outline-none focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10 transition" />
      </div>

      <div className="flex gap-1.5 overflow-x-auto">
        {[{ id: 'all', label: 'Все' }, { id: 'active', label: 'Активные' }, { id: 'in_progress', label: 'В работе' }, { id: 'archived', label: 'Архив' }].map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition whitespace-nowrap ${filter === f.id ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>{f.label}</button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-2.5"><div className="text-xs text-zinc-500">Всего</div><div className="text-lg font-bold">{filtered.length}</div></div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-2.5"><div className="text-xs text-zinc-500">Активные</div><div className="text-lg font-bold text-emerald-400">{filtered.filter((b) => b.status === 'active').length}</div></div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-2.5"><div className="text-xs text-zinc-500">В работе</div><div className="text-lg font-bold text-amber-400">{filtered.filter((b) => b.status === 'in_progress').length}</div></div>
      </div>

      <div className="space-y-2">
        {filtered.map((b) => <BloggerCard key={b.id} blogger={b} onClick={() => onSelectBlogger(b)} />)}
        {filtered.length === 0 && <div className="text-center py-12 text-zinc-500 text-sm">Никого не найдено</div>}
      </div>
    </div>
  );
}

function BloggerCard({ blogger, onClick }) {
  const avgER = (blogger.platforms.reduce((sum, p) => sum + p.er, 0) / blogger.platforms.length).toFixed(1);
  const projects = blogger.projectIds.map((pid) => MOCK_PROJECTS.find((p) => p.id === pid)).filter(Boolean);
  const manager = getManager(blogger.managerId);
  const ContactIcon = contactIcon(blogger.contact?.type);

  return (
    <button onClick={onClick} className="w-full bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 hover:border-red-900/50 rounded-lg p-3 transition text-left group">
      <div className="flex items-start gap-3">
        <Avatar url={blogger.avatarUrl} name={blogger.name} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="font-semibold text-sm truncate">{blogger.name}</div>
            <div className={`text-[10px] px-1.5 py-0.5 rounded border ${statusConfig[blogger.status].color} flex-shrink-0`}>{statusConfig[blogger.status].label}</div>
          </div>
          <div className="text-xs text-zinc-500 mb-2 truncate">{blogger.username}</div>

          <div className="flex items-center gap-3 mb-2 flex-wrap">
            {blogger.platforms.map((p, i) => {
              const Icon = platformIcon(p.type);
              return <div key={i} className="flex items-center gap-1"><Icon size={12} className={platformColor(p.type)} /><span className="text-xs text-zinc-400">{formatNumber(p.followers)}</span></div>;
            })}
            <div className="flex items-center gap-1 text-zinc-500"><TrendingUp size={11} /><span className="text-xs">ER {avgER}%</span></div>
            {blogger.rating && <Stars value={Math.round(blogger.rating)} size={11} />}
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-2">
            {manager && (
              <div className="flex items-center gap-1.5 bg-zinc-800/60 rounded px-1.5 py-0.5">
                <div className={`w-4 h-4 rounded-full ${manager.color} flex items-center justify-center text-[9px] font-bold text-white`}>{manager.avatar}</div>
                <span className="text-[10px] text-zinc-400">{manager.short}</span>
              </div>
            )}
            {blogger.contact && (
              <div className="flex items-center gap-1 bg-zinc-800/60 rounded px-1.5 py-0.5">
                <ContactIcon size={10} className={contactColor(blogger.contact.type)} />
                <span className="text-[10px] text-zinc-400 truncate max-w-[120px]">{blogger.contact.value}</span>
              </div>
            )}
            <div className="flex items-center gap-1 bg-zinc-800/60 rounded px-1.5 py-0.5">
              <Clock size={10} className="text-zinc-500" />
              <span className="text-[10px] text-zinc-400">{blogger.lastCollabDate ? daysAgo(blogger.lastCollabDate) : 'без интеграций'}</span>
            </div>
          </div>

          {projects.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1.5">
              {projects.slice(0, 3).map((p) => (
                <span key={p.id} className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-red-500/15 text-red-300 rounded border border-red-500/30 font-medium">
                  <Briefcase size={9} />{shortProjectName(p)}
                </span>
              ))}
              {projects.length > 3 && <span className="text-[10px] px-1.5 py-0.5 bg-red-500/15 text-red-300 rounded border border-red-500/30 font-medium">+{projects.length - 3}</span>}
            </div>
          )}

          <div className="flex flex-wrap gap-1">
            {blogger.tags.slice(0, 3).map((tag) => <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-zinc-800 text-zinc-400 rounded">#{tag}</span>)}
          </div>
        </div>
        <ChevronRight size={16} className="text-zinc-600 group-hover:text-red-400 flex-shrink-0 mt-1 transition" />
      </div>
    </button>
  );
}

function BloggerDetail({ blogger, collaborations, onCreateProposal, onRate }) {
  const projects = blogger.projectIds.map((pid) => MOCK_PROJECTS.find((p) => p.id === pid)).filter(Boolean);
  const manager = getManager(blogger.managerId);
  const ContactIcon = contactIcon(blogger.contact?.type);
  const isFirstContact = collaborations.length === 0;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar url={blogger.avatarUrl} name={blogger.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-lg">{blogger.name}</div>
            <div className="text-sm text-zinc-400 mb-2">{blogger.username}</div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className={`inline-block text-xs px-2 py-0.5 rounded border ${statusConfig[blogger.status].color}`}>{statusConfig[blogger.status].label}</div>
              {blogger.rating && (
                <div className="flex items-center gap-1">
                  <Stars value={Math.round(blogger.rating)} size={12} />
                  <span className="text-xs text-zinc-500">{blogger.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          {blogger.platforms.map((p, i) => {
            const Icon = platformIcon(p.type);
            return (
              <div key={i} className="flex items-center justify-between bg-zinc-800/50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2"><Icon size={16} className={platformColor(p.type)} /><span className="text-sm capitalize">{p.type}</span></div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-zinc-300 font-semibold">{formatNumber(p.followers)}</span>
                  <span className="text-zinc-500">ER {p.er}%</span>
                  <ExternalLink size={12} className="text-zinc-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
        <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Связь и работа</div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center">
              <ContactIcon size={16} className={contactColor(blogger.contact?.type)} />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">{contactLabel(blogger.contact?.type)}</div>
              <div className="text-sm font-medium">{blogger.contact?.value}</div>
            </div>
          </div>
          <button className="text-xs text-red-400 hover:text-red-300 font-medium">Написать</button>
        </div>

        <div className="border-t border-zinc-800" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-lg ${manager?.color || 'bg-zinc-800'} flex items-center justify-center text-white font-bold text-sm`}>{manager?.avatar || '?'}</div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Ответственный</div>
              <div className="text-sm font-medium">{manager?.name || 'Не назначен'}</div>
            </div>
          </div>
          <button className="text-xs text-red-400 hover:text-red-300 font-medium">Изменить</button>
        </div>

        <div className="border-t border-zinc-800" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center"><Clock size={16} className="text-zinc-400" /></div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Последняя интеграция</div>
              <div className="text-sm font-medium">{blogger.lastCollabDate ? `${formatDate(blogger.lastCollabDate)} (${daysAgo(blogger.lastCollabDate)})` : 'Пока не было'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <MetricCard icon={Eye} label="Ср. охват" value={formatNumber(blogger.avgViews)} color="text-cyan-400" />
        <MetricCard icon={Target} label="Качество ауд." value={`${blogger.audienceQuality}%`} color="text-emerald-400" />
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wide flex items-center gap-1.5"><Briefcase size={12} />Проекты ({projects.length})</div>
          <button className="text-xs text-red-400 hover:text-red-300 font-medium">+ Добавить</button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {projects.map((p) => (
            <span key={p.id} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-red-500/15 text-red-300 rounded-md border border-red-500/30 font-medium"><Briefcase size={11} />{p.name}</span>
          ))}
          {projects.length === 0 && <div className="text-sm text-zinc-500">Нет проектов</div>}
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2"><Sparkles size={14} className="text-red-400" /><span className="text-xs font-semibold text-red-400 uppercase tracking-wide">AI рекомендации</span></div>
        <div className="text-sm text-zinc-300 mb-3">Подходит для следующих направлений:</div>
        <div className="flex flex-wrap gap-1.5">
          {blogger.categories.map((cat) => <span key={cat} className="text-xs px-2.5 py-1 bg-red-500/20 text-red-200 rounded-md border border-red-500/20">{cat}</span>)}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Теги</div>
          <button className="text-xs text-red-400 hover:text-red-300 font-medium">+ Добавить</button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {blogger.tags.map((tag) => <span key={tag} className="text-xs px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-md border border-zinc-700">#{tag}</span>)}
        </div>
      </div>

      <button onClick={onCreateProposal} className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-red-600/30">
        <Send size={16} />{isFirstContact ? 'Написать впервые' : 'Создать предложение'}
      </button>

      <div>
        <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2 flex items-center gap-1.5"><FileText size={12} />История ({collaborations.length})</div>
        <div className="space-y-2">
          {collaborations.map((c) => {
            const project = MOCK_PROJECTS.find((p) => p.id === c.projectId);
            return (
              <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-red-500/15 text-red-300 rounded border border-red-500/30 font-medium">
                    <Briefcase size={9} />{shortProjectName(project)}
                  </span>
                  <div className={`text-[10px] px-1.5 py-0.5 rounded border ${statusConfig[c.status].color} flex-shrink-0`}>{statusConfig[c.status].label}</div>
                </div>

                <div className="text-sm font-medium mb-1">{c.title}</div>
                <div className="text-xs text-zinc-500 mb-2">{project?.name}</div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800">
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <div className="flex items-center gap-1"><Calendar size={11} />{c.createdAt}</div>
                    <div className="flex items-center gap-1"><DollarSign size={11} />{formatNumber(c.budget)}₽</div>
                    {c.metrics && <div className="flex items-center gap-1"><Eye size={11} />{formatNumber(c.metrics.views)}</div>}
                  </div>

                  {c.status === 'completed' ? (
                    c.rating ? (
                      <button onClick={() => onRate(c)} className="hover:scale-105 transition">
                        <Stars value={c.rating} size={12} />
                      </button>
                    ) : (
                      <button onClick={() => onRate(c)} className="text-[10px] uppercase tracking-wider text-red-400 border border-red-500/40 px-2 py-1 rounded hover:bg-red-500/10 transition font-medium">
                        Оценить
                      </button>
                    )
                  ) : null}
                </div>
              </div>
            );
          })}
          {collaborations.length === 0 && <div className="text-sm text-zinc-500 text-center py-6">Пока нет сотрудничеств</div>}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
      <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1"><Icon size={12} />{label}</div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

function RatingModal({ collab, onClose, onSave }) {
  const [rating, setRating] = useState(collab.rating || 0);
  const labels = ['', 'Плохо', 'Средне', 'Нормально', 'Хорошо', 'Отлично'];
  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-zinc-900 border border-zinc-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">Оценка интеграции</div>
            <div className="font-semibold text-sm">{collab.title}</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"><X size={16} /></button>
        </div>
        <div className="p-4 space-y-4">
          <div className="text-xs text-zinc-500">Поставьте оценку на своё усмотрение</div>
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 flex flex-col items-center gap-3">
            <Stars value={rating} size={28} interactive onChange={setRating} />
            <div className="text-base font-semibold h-6 text-red-400">{labels[rating]}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={onClose} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium py-2.5 rounded-lg transition text-sm">Отмена</button>
            <button onClick={() => onSave(rating)} disabled={!rating} className="bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold py-2.5 rounded-lg transition text-sm">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProposalModal({ blogger, onClose }) {
  const [step, setStep] = useState(1);
  const [task, setTask] = useState('');
  const [projectId, setProjectId] = useState('');
  const [tone, setTone] = useState('friendly');
  const [address, setAddress] = useState('ty');
  const [generated, setGenerated] = useState('');

  const previousCollabs = MOCK_COLLABORATIONS.filter((c) => c.bloggerId === blogger.id);
  const isFirstContact = previousCollabs.length === 0;
  const manager = getManager(blogger.managerId) || MOCK_MANAGERS.find((m) => m.id === 4);

  const handleGenerate = () => {
    const project = MOCK_PROJECTS.find((p) => p.id == projectId);
    const firstName = blogger.name.split(' ')[0];
    const greet = address === 'ty' ? `Привет, ${firstName}!` : `Здравствуйте, ${firstName}!`;

    let intro = '';
    if (isFirstContact) {
      if (tone === 'friendly') {
        intro = address === 'ty'
          ? `Меня зовут ${manager.name}, я комьюнити-менеджер агентства «Дэйт:». Пишу тебе по поводу проекта «${project?.name}» — кажется, твой контент очень в тему.\n\n`
          : `Меня зовут ${manager.name}, я комьюнити-менеджер агентства «Дэйт:». Пишу Вам по поводу проекта «${project?.name}» — кажется, Ваш контент отлично подходит.\n\n`;
      } else {
        intro = address === 'ty'
          ? `Меня зовут ${manager.name}, я представляю агентство «Дэйт:» в роли комьюнити-менеджера. Обращаюсь к тебе с предложением о сотрудничестве в рамках проекта «${project?.name}».\n\n`
          : `Меня зовут ${manager.name}, я представляю агентство «Дэйт:» в роли комьюнити-менеджера. Обращаюсь к Вам с предложением о сотрудничестве в рамках проекта «${project?.name}».\n\n`;
      }
    } else {
      intro = address === 'ty'
        ? `Возвращаюсь к тебе с новым предложением. На этот раз — проект «${project?.name}».\n\n`
        : `Возвращаюсь к Вам с новым предложением. На этот раз — проект «${project?.name}».\n\n`;
    }

    let body = '';
    const yourPron = address === 'ty' ? 'твоего' : 'вашего';
    const youAcc = address === 'ty' ? 'твою' : 'вашу';
    if (tone === 'friendly') body = `Очень нравится формат ${yourPron} контента — особенно вовлечённость аудитории.\n\n${task}\n\nДавай обсудим? Готовы быть гибкими по формату и подстроиться под ${youAcc} аудиторию.`;
    else body = `Особо отметили высокий уровень вовлечённости аудитории и качество ${yourPron} контента.\n\n${task}\n\nБудем рады обсудить условия сотрудничества и предложить формат, оптимальный для ${youAcc} аудитории.`;

    const sign = tone === 'friendly' ? `\n\nС уважением,\n${manager.name}\nАгентство «Дэйт:»` : `\n\nС уважением,\n${manager.name}\nКомьюнити-менеджер · Агентство «Дэйт:»`;
    setGenerated(`${greet}\n\n${intro}${body}${sign}`);
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-zinc-900 border border-zinc-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto">
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">{step === 1 ? 'Шаг 1 из 2' : 'Шаг 2 из 2'}</div>
            <div className="font-semibold">{step === 1 ? 'Новое предложение' : 'Готово!'}</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"><X size={16} /></button>
        </div>

        <div className="p-4 space-y-4">
          {step === 1 ? (
            <>
              <div className={`rounded-xl p-3 border ${isFirstContact ? 'border-red-500/40 bg-red-500/10' : 'border-zinc-700 bg-zinc-800/50'}`}>
                <div className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${isFirstContact ? 'text-red-400' : 'text-zinc-400'}`}>
                  {isFirstContact ? '⚡ Первое касание' : `${previousCollabs.length} предыдущих контакта`}
                </div>
                <div className="text-xs text-zinc-300">
                  {isFirstContact ? 'Будет добавлена вводная часть с представлением менеджера, агентства и проекта.' : 'Блогер уже знаком с вами — пропускаем формальное представление.'}
                </div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 mb-1.5 font-medium">Блогер</div>
                <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2">
                  <Avatar url={blogger.avatarUrl} name={blogger.name} size="sm" />
                  <div><div className="text-sm font-medium">{blogger.name}</div><div className="text-xs text-zinc-500">{blogger.username}</div></div>
                </div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 mb-1.5 font-medium">Проект</div>
                <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-500/60">
                  <option value="">Выберите проект...</option>
                  {MOCK_PROJECTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div>
                <div className="text-xs text-zinc-500 mb-2 font-medium">Тон обращения</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] text-zinc-500 mb-1.5 uppercase tracking-wider">Стиль</div>
                    <div className="grid grid-cols-2 gap-1 bg-zinc-800 p-1 rounded-lg">
                      {[{ id: 'friendly', label: 'Дружеский' }, { id: 'business', label: 'Деловой' }].map((t) => (
                        <button key={t.id} onClick={() => setTone(t.id)} className={`py-2 text-xs font-medium rounded transition ${tone === t.id ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>{t.label}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 mb-1.5 uppercase tracking-wider">Обращение</div>
                    <div className="grid grid-cols-2 gap-1 bg-zinc-800 p-1 rounded-lg">
                      {[{ id: 'ty', label: 'На «ты»' }, { id: 'vy', label: 'На «Вы»' }].map((t) => (
                        <button key={t.id} onClick={() => setAddress(t.id)} className={`py-2 text-xs font-medium rounded transition ${address === t.id ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>{t.label}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 mb-1.5 font-medium">ТЗ свободным текстом</div>
                <textarea value={task} onChange={(e) => setTask(e.target.value)} placeholder="Например: нужна reels-интеграция, бюджет до 50к..." rows={4} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-500/60 resize-none placeholder:text-zinc-500" />
              </div>

              <button onClick={handleGenerate} disabled={!task || !projectId} className="w-full bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"><Sparkles size={16} />Сгенерировать</button>
            </>
          ) : (
            <>
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-3">
                <div className="text-xs text-red-400 font-medium mb-2 flex items-center gap-1.5"><Sparkles size={12} />Сгенерировано AI · можно отредактировать</div>
                <textarea value={generated} onChange={(e) => setGenerated(e.target.value)} rows={14} className="w-full bg-transparent text-sm focus:outline-none resize-none leading-relaxed" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setStep(1)} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2 text-sm"><ArrowLeft size={14} />Назад</button>
                <button className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2 text-sm"><Check size={14} />Скопировать</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectsList() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-400">Активных: {MOCK_PROJECTS.filter((p) => p.status === 'active').length}</div>
        <button className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-medium"><Plus size={12} />Новый</button>
      </div>
      {MOCK_PROJECTS.map((p) => (
        <div key={p.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-red-900/50 transition cursor-pointer">
          <div className="flex items-start justify-between mb-2">
            <div className="font-semibold text-sm">{p.name}</div>
            <div className={`text-[10px] px-1.5 py-0.5 rounded border ${statusConfig[p.status === 'active' ? 'active' : 'completed'].color} flex-shrink-0 ml-2`}>{p.status === 'active' ? 'Активен' : 'Завершён'}</div>
          </div>
          <div className="text-xs text-zinc-500 mb-3">Клиент: {p.client}</div>
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-1"><Users size={11} />{p.bloggers} блогеров</div>
            <div className="flex items-center gap-1"><DollarSign size={11} />{formatNumber(p.budget)}₽</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportsView({ onOpenReportModal }) {
  return (
    <div className="space-y-4">
      <button onClick={onOpenReportModal} className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-red-600/30">
        <FileDown size={18} />Сформировать PDF-отчёт
      </button>

      <div>
        <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">Все интеграции</div>
        <div className="space-y-2">
          {MOCK_COLLABORATIONS.map((c) => {
            const blogger = MOCK_BLOGGERS.find((b) => b.id === c.bloggerId);
            const project = MOCK_PROJECTS.find((p) => p.id === c.projectId);
            return (
              <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar url={blogger?.avatarUrl} name={blogger?.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{c.title}</div>
                    <div className="text-xs text-zinc-500 truncate">{blogger?.name} · {project?.name}</div>
                  </div>
                  {c.rating && <Stars value={c.rating} size={11} />}
                </div>
                {c.metrics && (
                  <div className="grid grid-cols-4 gap-1 mt-2 pt-2 border-t border-zinc-800">
                    <MiniMetric label="Лиды" value={c.metrics.leads} />
                    <MiniMetric label="Просм." value={formatNumber(c.metrics.views)} />
                    <MiniMetric label="Охват" value={formatNumber(c.metrics.reach)} />
                    <MiniMetric label="Прод." value={c.metrics.sales} />
                  </div>
                )}
                <button className="w-full mt-2 text-xs text-red-400 hover:text-red-300 py-1 font-medium">Редактировать метрики</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-[10px] text-zinc-500">{label}</div>
      <div className="text-sm font-semibold text-zinc-200">{value}</div>
    </div>
  );
}

function ReportGeneratorModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [period, setPeriod] = useState('1month');
  const [projectId, setProjectId] = useState('');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  const periods = [
    { id: '1week', label: '1 неделя', days: 7 },
    { id: '1month', label: '1 месяц', days: 30 },
    { id: '6months', label: '6 месяцев', days: 180 },
    { id: '12months', label: '12 месяцев', days: 365 },
    { id: 'custom', label: 'Произвольно', days: 0 },
  ];

  const periodLabel = useMemo(() => {
    if (period === 'custom') return customFrom && customTo ? `${customFrom} — ${customTo}` : 'Не указан';
    const p = periods.find((x) => x.id === period);
    const to = new Date();
    const from = new Date(to.getTime() - p.days * 86400000);
    return `${from.toLocaleDateString('ru-RU')} — ${to.toLocaleDateString('ru-RU')}`;
  }, [period, customFrom, customTo]);

  if (step === 2) return <PDFPreview onBack={() => setStep(1)} onClose={onClose} periodLabel={periodLabel} projectId={projectId} />;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-zinc-900 border border-zinc-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
          <div className="font-semibold flex items-center gap-2"><FileDown size={16} className="text-red-400" />Новый отчёт</div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"><X size={16} /></button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <div className="text-xs text-zinc-500 mb-1.5 font-medium uppercase tracking-wide">Проект</div>
            <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-500/60">
              <option value="">Все проекты</option>
              {MOCK_PROJECTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div>
            <div className="text-xs text-zinc-500 mb-1.5 font-medium uppercase tracking-wide">Период</div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {periods.map((p) => (
                <button key={p.id} onClick={() => setPeriod(p.id)} className={`py-2.5 px-3 rounded-lg text-sm font-medium transition ${period === p.id ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>{p.label}</button>
              ))}
            </div>

            {period === 'custom' && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <div className="text-[10px] text-zinc-500 mb-1">С</div>
                  <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500/60 [color-scheme:dark]" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 mb-1">По</div>
                  <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500/60 [color-scheme:dark]" />
                </div>
              </div>
            )}

            <div className="text-[11px] text-zinc-500 mt-2 flex items-center gap-1"><Calendar size={10} />{periodLabel}</div>
          </div>

          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-3 space-y-1.5">
            <div className="text-xs text-zinc-400">Будет включено:</div>
            <div className="text-xs text-zinc-300 flex items-center gap-1.5"><Check size={12} className="text-emerald-400" />Сводка по KPI</div>
            <div className="text-xs text-zinc-300 flex items-center gap-1.5"><Check size={12} className="text-emerald-400" />Графики динамики</div>
            <div className="text-xs text-zinc-300 flex items-center gap-1.5"><Check size={12} className="text-emerald-400" />Список интеграций с метриками</div>
            <div className="text-xs text-zinc-300 flex items-center gap-1.5"><Check size={12} className="text-emerald-400" />Топ блогеров</div>
            <div className="text-xs text-zinc-300 flex items-center gap-1.5"><Check size={12} className="text-emerald-400" />ROI и CPS по проекту</div>
          </div>

          <button onClick={() => setStep(2)} disabled={period === 'custom' && (!customFrom || !customTo)} className="w-full bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"><Sparkles size={16} />Сформировать отчёт</button>
        </div>
      </div>
    </div>
  );
}

function PDFPreview({ onBack, onClose, periodLabel, projectId }) {
  const project = projectId ? MOCK_PROJECTS.find((p) => p.id == projectId) : null;
  const collabs = projectId ? MOCK_COLLABORATIONS.filter((c) => c.projectId == projectId) : MOCK_COLLABORATIONS;

  const totals = collabs.reduce((acc, c) => {
    if (!c.metrics) return acc;
    acc.leads += c.metrics.leads; acc.views += c.metrics.views; acc.reach += c.metrics.reach;
    acc.sales += c.metrics.sales; acc.budget += c.budget; acc.clicks += c.metrics.clicks;
    acc.comments += c.metrics.comments; acc.reposts += c.metrics.reposts;
    return acc;
  }, { leads: 0, views: 0, reach: 0, sales: 0, budget: 0, clicks: 0, comments: 0, reposts: 0 });

  const bloggerStats = {};
  collabs.forEach((c) => {
    if (!bloggerStats[c.bloggerId]) bloggerStats[c.bloggerId] = { sales: 0, reach: 0 };
    if (c.metrics) {
      bloggerStats[c.bloggerId].sales += c.metrics.sales;
      bloggerStats[c.bloggerId].reach += c.metrics.reach;
    }
  });
  const topBloggers = Object.entries(bloggerStats).map(([id, s]) => ({ blogger: MOCK_BLOGGERS.find((b) => b.id === +id), ...s })).filter((x) => x.blogger).sort((a, b) => b.sales - a.sales);

  const cps = totals.sales > 0 ? Math.round(totals.budget / totals.sales) : 0;
  const cpl = totals.leads > 0 ? Math.round(totals.budget / totals.leads) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-sm flex flex-col">
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100"><ArrowLeft size={16} /><span className="text-sm">Назад</span></button>
        <div className="text-sm font-semibold">Превью отчёта</div>
        <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"><X size={16} /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto bg-white text-zinc-900 rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center"><span className="text-red-600 font-bold text-sm">Д</span></div>
                  <div className="text-xs opacity-80 uppercase tracking-wider">Дэйт: Блогеры</div>
                </div>
                <div className="text-2xl font-bold">Отчёт по проекту</div>
                <div className="text-sm opacity-90 mt-1">{project ? project.name : 'Все проекты'}</div>
              </div>
              <div className="text-right text-xs opacity-80">
                <div>Сформирован</div>
                <div className="font-semibold">{new Date().toLocaleDateString('ru-RU')}</div>
              </div>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-lg px-3 py-2 inline-flex items-center gap-2"><Calendar size={14} /><span className="text-sm">{periodLabel}</span></div>
          </div>

          <div className="p-6 border-b border-zinc-200">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Ключевые показатели</div>
            <div className="grid grid-cols-4 gap-3 mb-4">
              <PDFKpi label="Охват" value={formatNumber(totals.reach)} color="bg-cyan-50 text-cyan-700" />
              <PDFKpi label="Просмотры" value={formatNumber(totals.views)} color="bg-blue-50 text-blue-700" />
              <PDFKpi label="Лиды" value={totals.leads.toLocaleString('ru')} color="bg-emerald-50 text-emerald-700" />
              <PDFKpi label="Продажи" value={totals.sales} color="bg-red-50 text-red-700" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              <PDFKpi label="Клики" value={formatNumber(totals.clicks)} color="bg-purple-50 text-purple-700" />
              <PDFKpi label="Комментарии" value={totals.comments.toLocaleString('ru')} color="bg-amber-50 text-amber-700" />
              <PDFKpi label="Репосты" value={totals.reposts.toLocaleString('ru')} color="bg-pink-50 text-pink-700" />
              <PDFKpi label="Бюджет" value={formatNumber(totals.budget) + '₽'} color="bg-zinc-100 text-zinc-700" />
            </div>
          </div>

          <div className="p-6 border-b border-zinc-200">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Эффективность</div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                <div className="text-[10px] text-red-600 uppercase tracking-wide font-bold mb-1">CPS</div>
                <div className="text-2xl font-bold text-red-700">{cps.toLocaleString('ru')}₽</div>
                <div className="text-[10px] text-red-600 mt-0.5">за продажу</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
                <div className="text-[10px] text-emerald-600 uppercase tracking-wide font-bold mb-1">CPL</div>
                <div className="text-2xl font-bold text-emerald-700">{cpl.toLocaleString('ru')}₽</div>
                <div className="text-[10px] text-emerald-600 mt-0.5">за лид</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="text-[10px] text-blue-600 uppercase tracking-wide font-bold mb-1">CR</div>
                <div className="text-2xl font-bold text-blue-700">{totals.clicks > 0 ? ((totals.sales / totals.clicks) * 100).toFixed(1) : 0}%</div>
                <div className="text-[10px] text-blue-600 mt-0.5">конверсия</div>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-zinc-200">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Топ блогеров</div>
            <div className="space-y-2">
              {topBloggers.slice(0, 5).map((item, i) => {
                const maxSales = topBloggers[0]?.sales || 1;
                return (
                  <div key={item.blogger.id} className="flex items-center gap-3 bg-zinc-50 rounded-lg p-3 border border-zinc-200">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-zinc-400 text-white' : i === 2 ? 'bg-orange-500 text-white' : 'bg-zinc-200 text-zinc-700'}`}>{i + 1}</div>
                    <Avatar url={item.blogger.avatarUrl} name={item.blogger.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-zinc-900 truncate">{item.blogger.name}</div>
                      <div className="text-[10px] text-zinc-500">{item.blogger.username}</div>
                      <div className="mt-1 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-red-600" style={{ width: `${(item.sales / maxSales) * 100}%` }} />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-red-600">{item.sales}</div>
                      <div className="text-[10px] text-zinc-500">продаж</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 border-b border-zinc-200">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Детализация по интеграциям</div>
            <div className="space-y-2">
              {collabs.map((c) => {
                const blogger = MOCK_BLOGGERS.find((b) => b.id === c.bloggerId);
                const proj = MOCK_PROJECTS.find((p) => p.id === c.projectId);
                return (
                  <div key={c.id} className="bg-white border border-zinc-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar url={blogger?.avatarUrl} name={blogger?.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-zinc-900 truncate">{c.title}</div>
                        <div className="text-[10px] text-zinc-500">{blogger?.name} · {proj?.name} · {c.createdAt}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-zinc-500">Бюджет</div>
                        <div className="text-sm font-bold text-zinc-900">{formatNumber(c.budget)}₽</div>
                      </div>
                    </div>
                    {c.metrics && (
                      <div className="grid grid-cols-7 gap-1 mt-2 pt-2 border-t border-zinc-100">
                        <PDFMini label="Охват" value={formatNumber(c.metrics.reach)} />
                        <PDFMini label="Просм." value={formatNumber(c.metrics.views)} />
                        <PDFMini label="Лиды" value={c.metrics.leads} />
                        <PDFMini label="Клики" value={formatNumber(c.metrics.clicks)} />
                        <PDFMini label="Комм." value={c.metrics.comments} />
                        <PDFMini label="Реп." value={c.metrics.reposts} />
                        <PDFMini label="Прод." value={c.metrics.sales} highlight />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 bg-zinc-50">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <div>Дэйт: Блогеры · Платформа управления инфлюенс-маркетингом</div>
              <div>Стр. 1 из 1</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border-t border-zinc-800 p-4 flex gap-2 flex-shrink-0">
        <button onClick={onBack} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium py-3 rounded-xl transition text-sm">Изменить параметры</button>
        <button className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-lg shadow-red-600/30">
          <Download size={16} />Скачать PDF
        </button>
      </div>
    </div>
  );
}

function PDFKpi({ label, value, color }) {
  return (
    <div className={`${color} rounded-lg p-2.5`}>
      <div className="text-[9px] uppercase tracking-wide font-bold opacity-70">{label}</div>
      <div className="text-base font-bold mt-0.5">{value}</div>
    </div>
  );
}

function PDFMini({ label, value, highlight }) {
  return (
    <div className="text-center">
      <div className="text-[9px] text-zinc-400 uppercase">{label}</div>
      <div className={`text-xs font-bold ${highlight ? 'text-red-600' : 'text-zinc-800'}`}>{value}</div>
    </div>
  );
}
