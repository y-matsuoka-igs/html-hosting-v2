// main.jsx — app state, routing, tweaks, mount
const { useState: useS, useEffect: useE } = React;

/* ─────────── Tweak defaults ─────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FC8524",
  "primary": "#0096fa",
  "roundHeadings": true,
  "cardRadius": 20,
  "playful": true
}/*EDITMODE-END*/;

/* ─────────── Persistent app state ─────────── */
const BLANK = {
  diag:  { answers: {}, done: false, type: null },
  self:  { answers: {}, done: false },
  other: { answers: {}, done: false },
  exp: 0, tasks: [], seenAnnounce: false,
  journal: (typeof window !== 'undefined' && window.journalSeed) ? window.journalSeed() : [],
};
function loadState() {
  try { return { ...BLANK, ...JSON.parse(localStorage.getItem('aigrow_state') || '{}') }; }
  catch { return { ...BLANK }; }
}
function useAppState() {
  const [state, setState] = useS(loadState);
  useE(() => { localStorage.setItem('aigrow_state', JSON.stringify(state)); }, [state]);
  const update = (patch) => setState(s => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }));
  return [state, update, () => setState({ ...BLANK })];
}
// completion %: diag=30, self=+40 (→70), other=+30 (→100)
function completion(s) {
  let c = 0;
  if (s.diag.done) c += 30;
  if (s.self.done) c += 40;
  if (s.other.done) c += 30;
  return c;
}

/* ─────────── Stub screen (placeholder for not-yet-built) ─────────── */
function Stub({ tab, title, emoji, note }) {
  return (
    <div className="screen">
      <AppHeader />
      <div className="scroll pad">
        <div style={{ minHeight: 460, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 64 }}>{emoji}</div>
          <h2 style={{ fontSize: 22, fontWeight: 900 }}>{title}</h2>
          <div className="pill" style={{ background: 'var(--blue-soft)', color: 'var(--blue-dark)' }}>これから作ります</div>
          <p style={{ fontSize: 13, color: 'var(--text-sub)', maxWidth: 240, lineHeight: 1.7 }}>{note}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Routing ─────────── */
// which bottom-nav tab is highlighted for a given screen
const SCREEN_TAB = {
  home: 'home', exam: 'exam', contents: 'contents',
  torisetsu: 'home',     // トリセツはホームタブ内
  challenge: 'challenge', tree: 'challenge',
  record: 'record', journal: 'record', 'journal-write': 'record',
  'next-step': null, 'ai-chat': null, 'juken-pr': 'exam',
};
// screens that show the bottom nav
const TABBED = new Set(['home', 'exam', 'contents', 'torisetsu', 'next-step', 'tree', 'challenge', 'record', 'juken-pr']);

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [state, update, reset] = useAppState();
  const [screen, setScreen] = useS('login');
  const [params, setParams] = useS({});

  // apply tweaks to CSS variables
  useE(() => {
    const r = document.documentElement.style;
    r.setProperty('--blue', t.primary);
    r.setProperty('--orange', t.accent);
    r.setProperty('--r-lg', t.cardRadius + 'px');
    r.setProperty('--font-round', t.roundHeadings
      ? "'M PLUS Rounded 1c', 'Noto Sans JP', sans-serif"
      : "'Noto Sans JP', sans-serif");
  }, [t]);

  const nav = {
    go: (s, p = {}) => { setScreen(s); setParams(p); },
    tab: (key) => { setScreen(key); setParams({}); },
    params,
    state, update, reset,
    completion: completion(state),
  };

  useE(() => {
    window.__setScreen = setScreen;
    window.__setParams = setParams;
    window.__updateState = update;
  }, []);

  const comp = completion(state);
  const badges = { exam: comp < 100 };

  const render = () => {
    switch (screen) {
      case 'login':   return <LoginScreen />;
      case 'onboard': return <OnboardScreen />;
      case 'start-diag':  return <StartDiagScreen />;
      case 'diag-game':   return <DiagGameScreen />;
      case 'diag-result': return <DiagResultScreen />;
      case 'self-eval':    return <SelfEvalScreen />;
      case 'other-eval':   return <OtherEvalScreen />;
      case 'announce':     return <AnnounceScreen />;
      case 'task-complete':return <TaskCompleteScreen />;
      case 'home':    return <TorisetsuCombined />;  // ホームタブ = 新トリセツ
      case 'exam':    return (comp >= 100 && state.seenAnnounce) ? <ExamWaitingScreen /> : <HomeScreen />;   // 受検タブ = 進捗リング or 準備中
      case 'torisetsu': return <TorisetsuScreen />;   // エイリアス
      case 'ai-chat':  return <AiChatScreen />;
      case 'next-step':
      case 'challenge':
      case 'tree':     return <ChallengeScreen />;
      case 'contents': return <ContentsScreen />;
      case 'record':   return <RecordScreen />;
      case 'juken-pr': return <JukenPRScreen />;
      case 'rpg-result': return <RpgResultScreen />;
      case 'rpg-reveal': return <RpgRevealScreen />;
      case 'journal':       return <JournalScreen />;
      case 'journal-write': return <JournalWriteScreen />;
      default: return <LoginScreen />;
    }
  };

  const showNav = TABBED.has(screen);

  return (
    <NavCtx.Provider value={nav}>
      <Device>
        {render()}
        {showNav && <BottomNav active={SCREEN_TAB[screen]} onTab={nav.tab} badges={badges} locked={!state.torisetsuDone} />}
      </Device>

      <TweaksPanel>
        <TweakSection label="ブランドカラー" />
        <TweakColor label="プライマリ" value={t.primary}
          options={['#0096fa', '#1a8cff', '#0bbbd6', '#5b6cff']}
          onChange={v => setTweak('primary', v)} />
        <TweakColor label="アクセント(CTA)" value={t.accent}
          options={['#FC8524', '#ff5d8f', '#ff9f1c', '#00c853']}
          onChange={v => setTweak('accent', v)} />
        <TweakSection label="スタイル" />
        <TweakToggle label="まるい見出しフォント" value={t.roundHeadings}
          onChange={v => setTweak('roundHeadings', v)} />
        <TweakSlider label="カードの角丸" value={t.cardRadius} min={8} max={28} step={2} unit="px"
          onChange={v => setTweak('cardRadius', v)} />
        <TweakToggle label="ポップ演出" value={t.playful}
          onChange={v => setTweak('playful', v)} />
        <TweakSection label="ホーム状態（デモ）" />
        <TweakButton label="受検 30%（診断のみ）" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { answers: {}, done: false }, other: { answers: {}, done: false } }); setScreen('exam'); }} />
        <TweakButton label="受検 70%（自己評価まで）" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { answers: {}, done: false } }); setScreen('exam'); }} />
        <TweakButton label="受検 100%（完成）" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: true } }); setScreen('exam'); }} />
        <TweakButton label="ホーム（トリセツ）を見る" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: true }, seenAnnounce: true }); setScreen('home'); }} />
        <TweakSection label="画面ジャンプ（デモ）" />
        <TweakButton label="気質診断へ" onClick={() => nav.go('start-diag')} />
        <TweakButton label="自己評価へ" onClick={() => nav.go('self-eval')} />
        <TweakButton label="他者評価へ" onClick={() => nav.go('other-eval')} />
        <TweakButton label="完了サマリーへ" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: true } }); nav.go('task-complete'); }} />
        <TweakButton label="機能解放通知へ" onClick={() => nav.go('announce')} />
        <TweakButton label="トリセツ(ホーム)へ" onClick={() => nav.go('home')} />
        <TweakButton label="AI相談チャットへ" onClick={() => nav.go('ai-chat')} />
        <TweakButton label="チャレンジへ" onClick={() => nav.go('challenge', { tab: 'challenge' })} />
        <TweakButton label="完了の木(EXP)へ" onClick={() => nav.go('tree', { tab: 'tree' })} />
        <TweakButton label="コンテンツへ" onClick={() => nav.go('contents')} />
        <TweakButton label="成長きろくへ" onClick={() => nav.go('record')} />
        <TweakButton label="成長ジャーナルへ" onClick={() => nav.go('journal')} />
        <TweakButton label="6月の診断（転生RPG）へ" onClick={() => nav.go('rpg-result')} />
        <TweakButton label="種明かしへ" onClick={() => nav.go('rpg-reveal')} />
        <TweakButton label="ふり返りを書くへ" onClick={() => nav.go('journal-write')} />
        <TweakButton label="ログイン画面へ戻る" onClick={() => { setScreen('login'); setParams({}); }} />
        <TweakButton label="進捗をリセット" onClick={() => { reset(); setScreen('login'); setParams({}); }} />
      </TweaksPanel>
    </NavCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
