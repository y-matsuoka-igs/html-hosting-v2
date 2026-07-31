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
  tendency: { done: false },
  exp: 0, tasks: [], seenAnnounce: false, peerDone: true,
  userName: 'IGS テスト9', showWelcome: false,
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
  'exam-waiting-no-tori': 'exam',
  torisetsu: 'home',     // トリセツはホームタブ内
  'home-self': 'home',   // 自己評価のみパターンもホームタブ
  challenge: 'challenge', tree: 'challenge',
  record: 'record',
  'next-step': null, 'tree': 'challenge',
  // 各ステップ完了画面 → 受検タブのみ有効
  'diag-complete': 'exam', 'self-complete': 'exam', 'other-complete': 'exam',
  'other-complete-wait': 'exam', 'tendency-complete': 'exam', 'tendency-phase-complete': 'exam',
};
// 完了画面：受検メニュー以外はロック
const STEP_COMPLETE = new Set(['diag-complete', 'self-complete', 'other-complete', 'other-complete-wait', 'tendency-complete', 'tendency-phase-complete']);
// screens that show the bottom nav
const TABBED = new Set(['home', 'home-self', 'exam', 'exam-waiting-no-tori', 'report', 'torisetsu', 'next-step', 'tree', 'challenge', 'record', ...STEP_COMPLETE]);

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
    // deep-link: index.html#home-self などで直接その画面を開ける（デモ用）
    const h = (location.hash || '').replace('#', '');
    if (h === 'home-self') {
      update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: false }, torisetsuDone: true });
      setScreen('home-self');
    } else if (h === 'tendency') {
      setScreen('start-tendency');
    } else if (h === 'home') {
      update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: true }, seenAnnounce: true });
      setScreen('home');
    }
  }, []);

  const comp = completion(state);
  const selfOnly = !!(state.self && state.self.done) && !(state.other && state.other.done) && !!state.torisetsuDone;
  const badges = { exam: state.examCourses ? true : comp < 100 };

  const render = () => {
    switch (screen) {
      case 'login':   return <LoginScreen />;
      case 'onboard': return <OnboardScreen />;
      case 'start-diag':  return <StartDiagScreen />;
      case 'diag-words':  return <DiagWordsScreen />;
      case 'diag-game':   return <DiagGameScreen />;
      case 'diag-result': return <DiagResultScreen />;
      case 'start-self':   return <StartSelfScreen />;
      case 'start-other':  return <StartOtherScreen />;
      case 'other-start':  return <OtherStartScreen />;
      case 'ask-eval':     return <AskEvalScreen />;
      case 'eval-request': return <EvalRequestScreen />;
      case 'waiting-peer': return <WaitingPeerScreen />;
      case 'start-tendency':   return <StartTendencyScreen />;
      case 'tendency-words':   return <TendencyWordsScreen />;
      case 'tendency-game':    return <TendencyGameScreen />;
      case 'tendency-complete':return <TendencyCompleteScreen />;
      case 'tendency-phase-complete': return <TendencyPhaseCompleteScreen />;
      case 'self-eval':    return <SelfEvalScreen />;
      case 'other-eval':   return <OtherEvalScreen />;
      case 'strength-eval': return <StrengthEvalScreen />;
      case 'announce':     return <AnnounceScreen />;
      case 'diag-complete':
      case 'self-complete':
      case 'other-complete': return <StepCompleteScreen />;
      case 'other-complete-wait': return <StepCompleteScreen />;
      case 'home':    return <TorisetsuCombined />;  // ホームタブ = 新トリセツ
      case 'home-self': return <TorisetsuSelfHome />;  // 自己評価のみ受検パターン
      case 'exam':    return selfOnly ? <StepCompleteScreen kind="other" waiting noModal /> : (state.examCourses ? <ExamCoursesScreen /> : ((comp >= 100 && state.seenAnnounce) ? <ExamWaitingScreen /> : <HomeScreen />));
      case 'exam-waiting-no-tori': return <ExamWaitingNoToriScreen />;
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
        {screen !== 'login' && <UserBar name={state.userName} />}
        {showNav && <BottomNav active={SCREEN_TAB[screen]} onTab={nav.tab} badges={badges} locked={!state.torisetsuDone} enabledKeys={STEP_COMPLETE.has(screen) ? ['exam'] : screen === 'exam-waiting-no-tori' ? ['exam', 'report'] : undefined} />}
        {state.torisetsuUpdated && screen !== 'login' && (
          <TorisetsuUpdatedModal onClose={() => update({ torisetsuUpdated: false })} />
        )}
        {state.showWelcome && screen !== 'login' && (
          <WelcomeModal name={state.userName}
            onOk={() => update({ showWelcome: false })}
            onLogout={() => { update({ showWelcome: false }); setScreen('login'); setParams({}); }} />
        )}
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
        <TweakButton label="気質診断 ワード確認" onClick={() => nav.go('diag-words', { round: 0 })} />
        <TweakButton label="気質診断ゲーム" onClick={() => nav.go('diag-game')} />
        <TweakButton label="気質診断の結果" onClick={() => nav.go('diag-result')} />
        <TweakButton label="自己評価" onClick={() => nav.go('self-eval')} />
        <TweakButton label="気質診断完了（ステップ）" onClick={() => { update({ diag: { ...state.diag, done: true } }); nav.go('diag-complete', { kind: 'diag' }); }} />
        <TweakButton label="自己評価完了（ステップ）" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true } }); nav.go('self-complete', { kind: 'self' }); }} />
        <TweakButton label="全タスク完了（ステップ）" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: true } }); nav.go('other-complete', { kind: 'other' }); }} />
        <TweakButton label="相互評価完了（ステップ）" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: true } }); nav.go('other-complete-wait', { kind: 'other', waiting: true }); }} />
        <TweakButton label="相互評価（友達一覧）" onClick={() => nav.go('other-start')} />
        <TweakButton label="評価をお願いする" onClick={() => nav.go('ask-eval')} />
        <TweakButton label="他者評価" onClick={() => nav.go('other-eval')} />
        <TweakButton label="評価リクエストが届いた" onClick={() => nav.go('eval-request')} />
        <TweakSection label="傾向チェック（独立フロー）" />
        <TweakButton label="傾向チェック 開始" onClick={() => nav.go('start-tendency')} />
        <TweakButton label="傾向チェック ワード確認" onClick={() => nav.go('tendency-words')} />
        <TweakButton label="傾向チェック 診断" onClick={() => nav.go('tendency-game', { block: 0 })} />
        <TweakButton label="傾向チェック フェーズ完了" onClick={() => nav.go('tendency-phase-complete', { phase: 1 })} />
        <TweakButton label="傾向チェック 完了" onClick={() => nav.go('tendency-complete')} />
        <TweakToggle label="相互評価 完了（今のキミ解放）" value={!!state.peerDone}
          onChange={v => update({ peerDone: v })} />
        <TweakButton label="トリセツ更新の通知（モーダル）" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: true }, seenAnnounce: true, torisetsuDone: true, peerDone: true, torisetsuUpdated: true }); nav.tab ? nav.tab('home') : nav.go('home'); }} />
        <TweakButton label="機能解放の通知" onClick={() => nav.go('announce')} />
        <TweakButton label="相互評価まちトリセツ未解放" onClick={() => nav.go('waiting-peer')} />
        <TweakSection label="メイン画面（タブ）" />
        <TweakButton label="ホーム（トリセツ）" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: true }, seenAnnounce: true }); setScreen('home'); }} />
        <TweakButton label="ホーム（自己評価のみ）" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: false }, torisetsuDone: true }); setScreen('home-self'); }} />
        <TweakButton label="受検（進捗リング）" onClick={() => { update({ examCourses: false }); setScreen('exam'); }} />
        <TweakButton label="受検：待機画面" onClick={() => { update({ diag: { ...state.diag, done: true }, self: { ...state.self, done: true }, other: { ...state.other, done: true }, seenAnnounce: true, examCourses: false }); setScreen('exam'); }} />
        <TweakButton label="受検：待機画面（トリセツなし）" onClick={() => { update({ examCourses: false, torisetsuDone: false }); setScreen('exam-waiting-no-tori'); }} />
        <TweakButton label="受検：受検コース登録あり" onClick={() => { update({ examCourses: true }); setScreen('exam'); }} />
        <TweakButton label="チャレンジ" onClick={() => nav.go('challenge', { tab: 'challenge' })} />
        <TweakButton label="きろく" onClick={() => nav.go('record')} />
        <TweakButton label="レポート" onClick={() => nav.go('report')} />
        <TweakSection label="その他" />
        <TweakButton label="ログイン歓迎モーダルを表示" onClick={() => update({ showWelcome: true })} />
        <TweakButton label="ログイン画面へ戻る" onClick={() => { setScreen('login'); setParams({}); }} />
        <TweakButton label="進捗をリセット" onClick={() => { reset(); setScreen('login'); setParams({}); }} />
      </TweaksPanel>
    </NavCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
