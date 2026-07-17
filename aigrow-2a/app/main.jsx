// main.jsx — app state, routing, tweaks, mount
const { useState: useS, useEffect: useE } = React;

/* ─────────── Tweak defaults ─────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ff6b5e",
  "primary": "#315cfa",
  "roundHeadings": true,
  "cardRadius": 14,
  "playful": true
}/*EDITMODE-END*/;

/* ─────────── Persistent app state ─────────── */
const BLANK = {
  diag:  { answers: {}, done: false, type: null },
  self:  { answers: {}, done: false },
  other: { answers: {}, done: false },
  exp: 0, tasks: [], seenAnnounce: false,
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
  home: 'home', exam: 'exam', report: 'report',
  torisetsu: 'home',     // トリセツはホームタブ内
  challenge: 'challenge', tree: 'challenge',
  record: 'record',
  'next-step': null, 'tree': 'challenge',
};
// screens that show the bottom nav
const TABBED = new Set(['home', 'exam', 'report', 'torisetsu', 'next-step', 'tree', 'challenge', 'record']);

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
      ? "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif"
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
  const badges = { exam: state.examCourses ? true : comp < 100 };

  const render = () => {
    switch (screen) {
      case 'login':   return <LoginScreen />;
      case 'onboard': return <OnboardScreen />;
      case 'start-diag':  return <StartDiagScreen />;
      case 'diag-game':   return <DiagGameScreen />;
      case 'diag-result': return <DiagResultScreen />;
      case 'self-eval':    return <SelfEvalScreen />;
      case 'other-eval':   return <OtherEvalScreen />;
      case 'strength-eval': return <StrengthEvalScreen />;
      case 'announce':     return <AnnounceScreen />;
      case 'task-complete':return <TaskCompleteScreen />;
      case 'diag-complete':
      case 'self-complete': return <StepCompleteScreen />;
      case 'home':    return <TorisetsuCombined />;  // ホームタブ = 新トリセツ
      case 'exam':    return state.examCourses ? <ExamCoursesScreen /> : ((comp >= 100 && state.seenAnnounce) ? <ExamWaitingScreen /> : <HomeScreen />);   // 受検タブ = コース登録 / 進捗リング / 準備中
      case 'torisetsu': return <TorisetsuScreen />;   // エイリアス
      case 'next-step':
      case 'challenge':
      case 'tree':     return <ChallengeScreen />;
      case 'report':   return <ReportScreen />;
      case 'record':   return <RecordScreen />;
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
          options={['#315cfa', '#1a8cff', '#0bbbd6', '#5b6cff']}
          onChange={v => setTweak('primary', v)} />
        <TweakColor label="アクセント(CTA)" value={t.accent}
          options={['#ff6b5e', '#ff5d8f', '#ff9f1c', '#18b271']}
          onChange={v => setTweak('accent', v)} />
        <TweakSection label="スタイル" />
        <TweakToggle label="まるい見出しフォント" value={t.roundHeadings}
          onChange={v => setTweak('roundHeadings', v)} />
        <TweakSlider label="カードの角丸" value={t.cardRadius} min={8} max={28} step={2} unit="px"
          onChange={v => setTweak('cardRadius', v)} />
        <TweakToggle label="ポップ演出" value={t.playful}
          onChange={v => setTweak('playful', v)} />
        <TweakSection label="診断フロー（デモ）" />
        <TweakButton label="気質診断スタート" onClick={() => nav.go('start-diag')} />
        <TweakButton label="気質診断ゲーム" onClick={() => nav.go('diag-game')} />
        <TweakButton label="気質診断の結果" onClick={() => nav.go('diag-result')} />
        <TweakButton label="自己評価" onClick={() => nav.go('self-eval')} />
        <TweakButton label="気質診断完了（ステップ）" onClick={() => { update({ diag: { ...state.diag, done: true } }); nav.go('diag-complete', { kind: 'diag' }); }} />
        <TweakButton label="自己評価完了（ステップ）" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true } }); nav.go('self-complete', { kind: 'self' }); }} />
        <TweakButton label="他者評価" onClick={() => nav.go('other-eval')} />
        <TweakButton label="完了サマリー" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: true } }); nav.go('task-complete'); }} />
        <TweakButton label="機能解放の通知" onClick={() => nav.go('announce')} />
        <TweakSection label="メイン画面（タブ）" />
        <TweakButton label="ホーム（トリセツ）" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: true }, seenAnnounce: true }); setScreen('home'); }} />
        <TweakButton label="受検（進捗リング）" onClick={() => { update({ examCourses: false }); setScreen('exam'); }} />
        <TweakButton label="受検：待機画面" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: true }, seenAnnounce: true, examCourses: false }); setScreen('exam'); }} />
        <TweakButton label="受検：受検コース登録あり" onClick={() => { update({ examCourses: true }); setScreen('exam'); }} />
        <TweakButton label="チャレンジ" onClick={() => nav.go('challenge', { tab: 'challenge' })} />
        <TweakButton label="きろく" onClick={() => nav.go('record')} />
        <TweakButton label="レポート" onClick={() => nav.go('report')} />
        <TweakSection label="その他" />
        <TweakButton label="ログイン画面へ戻る" onClick={() => { setScreen('login'); setParams({}); }} />
        <TweakButton label="進捗をリセット" onClick={() => { reset(); setScreen('login'); setParams({}); }} />
      </TweaksPanel>
    </NavCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
