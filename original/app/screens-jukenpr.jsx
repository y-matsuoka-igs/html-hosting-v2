// screens-jukenpr.jsx — 進学に向けて自分を伝える準備（自己PRベースを壁打ちで作る）
// 総合型選抜・学校推薦型選抜で必要になる自己PRのベースを、AiGROWと数回の壁打ちで一緒に作る。
const { useState: useSjk, useRef: useRjk, useEffect: useEjk } = React;

/* トリセツ由来データ */
const JK_TYPE = '行動する創造者';
const JK_STRENGTHS = [
  { name: '創造力', sub: '新しいアイデアを生み出す力' },
  { name: '実行力', sub: '思いついたらまず動ける力' },
  { name: '表現力', sub: '自分の考えを言葉で伝える力' },
];

/* 進路の選択肢 */
const JK_PATHS = [
  { key: 'sogo',   label: '総合型選抜',        note: '自己PR・志望理由が重視される' },
  { key: 'suisen', label: '学校推薦型選抜',    note: '推薦書＋自己アピールが必要' },
  { key: 'mayou',  label: 'まだ迷っている',    note: 'まずは自己分析から' },
  { key: 'ippan',  label: '一般選抜だけど準備したい', note: '面接・出願書類の備えに' },
];

/* エピソードのヒント（トリセツ・ジャーナル由来） */
const JK_EPISODE_HINTS = [
  '係の仕事で「こうすれば早い」とアイデアを出し、みんなをまとめた',
  '行事の準備が難航したけど、友だちに相談して整理し、やり遂げた',
  '授業ではじめて自分から手を挙げて意見を言えた',
];
/* 将来の活かし方ヒント */
const JK_FUTURE_HINTS = [
  '学んだことを部活や行事でも活かして、まわりを巻き込みたい',
  '興味のある分野をもっと専門的に学んで深めたい',
  '人と協力しながら、新しいことに挑戦し続けたい',
];

const JK_STEPS = ['進路', '強み', 'エピソード', '活かし方', '自己PR案'];

/* 自己PRドラフト組み立て */
function buildPR(a) {
  const s = a.strength || '創造力';
  const sub = (JK_STRENGTHS.find(x => x.name === s) || {}).sub || '';
  const ep = (a.episode || '').trim() || '日々の活動の中で、自分の力を発揮する場面がありました。';
  const fut = (a.future || '').trim() || 'この強みを、これからの学びでも活かしていきたいと考えています。';
  return (
`私の強みは「${s}」です。${sub ? sub + 'だと感じています。' : ''}

たとえば、${ep}という経験があります。このとき、${s}を発揮して行動できたことが、自分の自信につながりました。

${a.type ? `私は「${a.type}」というタイプで、` : ''}思いついたことを行動に移し、まわりに伝えていく姿勢を大切にしています。

入学後は、${fut}`
  );
}

/* トリセツのコンテキスト（AIに渡せる形でコピー） */
function buildContext(a) {
  const s = a.strength || '創造力';
  const pathLabel = a.path ? (JK_PATHS.find(p => p.key === a.path) || {}).label : '未選択';
  return (
`【私のトリセツ（AiGROW診断）】
・総合タイプ：${a.type || JK_TYPE}
・強み：${JK_STRENGTHS.map(x => x.name).join(' / ')}
・いちばん伝えたい強み：${s}

【進学に向けての準備】
・想定する進路：${pathLabel}
・${s}が出たエピソード：${(a.episode || '').trim() || '（未記入）'}
・入学後に活かしたいこと：${(a.future || '').trim() || '（未記入）'}

【お願い】
上記をふまえて、総合型選抜・学校推薦型選抜で使える自己PRを一緒に深めてください。`
  );
}

function JukenPRScreen() {
  const nav = useNav();
  const saved = nav.state.jukenPR || {};
  const [step, setStep] = useSjk(saved.done ? 4 : 0);
  const [path, setPath] = useSjk(saved.path || null);
  const [strength, setStrength] = useSjk(saved.strength || null);
  const [episode, setEpisode] = useSjk(saved.episode || '');
  const [future, setFuture] = useSjk(saved.future || '');
  const [copied, setCopied] = useSjk(false);
  const [toast, setToast] = useSjk(false);
  const scrollRef = useRjk(null);

  const copyContext = () => {
    const ctx = buildContext(answers);
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2200); };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(ctx).then(done, done); }
      else {
        const ta = document.createElement('textarea'); ta.value = ctx; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta); done();
      }
    } catch (e) { done(); }
  };

  const go = (n) => { setStep(n); if (scrollRef.current) scrollRef.current.scrollTop = 0; };

  const answers = { path, type: JK_TYPE, strength, episode, future };

  const finish = () => {
    nav.update((s) => ({ jukenPR: { path, strength, episode, future, done: true } }));
    go(4);
  };

  return (
    <div className="screen">
      <StatusBar />
      <div className="appbar">
        <button onClick={() => nav.go('exam')} style={{ border: 'none', background: 'var(--bg)', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }}>
          <Icon name="back" size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,var(--blue),#00BFA5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Icon name="sparkle" size={16} /></div>
          <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>自分を伝える準備</span>
        </div>
        <div style={{ width: 38 }}></div>
      </div>

      {/* 進捗ステップ */}
      <div style={{ flexShrink: 0, display: 'flex', gap: 5, padding: '10px 16px 12px', background: '#fff', borderBottom: '1px solid var(--border-soft)' }}>
        {JK_STEPS.map((label, i) => {
          const on = i === step, done = i < step;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', height: 4, borderRadius: 2, background: done ? 'var(--blue)' : on ? 'var(--blue)' : 'var(--border)' }}></div>
              <span style={{ fontSize: 9, fontWeight: 700, color: on ? 'var(--blue)' : done ? 'var(--blue-dark)' : 'var(--text-sub)' }}>{label}</span>
            </div>
          );
        })}
      </div>

      <div ref={scrollRef} className="scroll pad stack">
        {/* ステップ0：進路 */}
        {step === 0 && (
          <>
            <AiSay big>
              <b>進学に向けて、自分を伝える準備をしよう。</b><br />
              総合型選抜や学校推薦型選抜では「自己PR」が大事になるよ。キミのトリセツをもとに、<b>数回の質問</b>で自己PRのベースを一緒に作ろう！
            </AiSay>
            <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14, marginTop: 2 }}>どんな進路を考えてる？</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {JK_PATHS.map((p) => {
                const on = path === p.key;
                return (
                  <button key={p.key} onClick={() => setPath(p.key)} style={{ textAlign: 'left', cursor: 'pointer', borderRadius: 'var(--r-md)', padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 12,
                    border: '2px solid ' + (on ? 'var(--blue)' : 'var(--border-soft)'), background: on ? 'var(--blue-soft)' : '#fff', WebkitTapHighlightColor: 'transparent' }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, border: '2px solid ' + (on ? 'var(--blue)' : '#cfd5da'), background: on ? 'var(--blue)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {on && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 800, color: on ? 'var(--blue-dark)' : 'var(--text)' }}>{p.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 600, marginTop: 1 }}>{p.note}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <button className="btn btn--cta btn--lg" disabled={!path} onClick={() => go(1)}>はじめる</button>
          </>
        )}

        {/* ステップ1：強み */}
        {step === 1 && (
          <>
            <AiSay>
              キミのトリセツでは、総合タイプは<b>「{JK_TYPE}」</b>。<br />
              この中で、進学先に<b>いちばん伝えたい強み</b>はどれ？
            </AiSay>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {JK_STRENGTHS.map((s) => {
                const on = strength === s.name;
                return (
                  <button key={s.name} onClick={() => setStrength(s.name)} style={{ textAlign: 'left', cursor: 'pointer', borderRadius: 'var(--r-md)', padding: '14px 15px', display: 'flex', alignItems: 'center', gap: 12,
                    border: '2px solid ' + (on ? 'var(--blue)' : 'var(--border-soft)'), background: on ? 'var(--blue-soft)' : '#fff', WebkitTapHighlightColor: 'transparent' }}>
                    <span style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: on ? 'var(--blue)' : 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: on ? '#fff' : 'var(--blue)' }}><FIcon name="star" size={19} color={on ? '#fff' : 'var(--blue)'} /></span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-round)', fontSize: 14.5, fontWeight: 800, color: on ? 'var(--blue-dark)' : 'var(--text)' }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 600, marginTop: 1 }}>{s.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <NavRow onBack={() => go(0)} onNext={() => go(2)} nextDisabled={!strength} />
          </>
        )}

        {/* ステップ2：エピソード */}
        {step === 2 && (
          <>
            <AiSay>
              <b>「{strength}」</b>が出た<b>エピソード</b>を教えて。<br />
              小さなことでOK！下のヒントから選んで書き換えてもいいよ。
            </AiSay>
            <textarea value={episode} onChange={(e) => setEpisode(e.target.value)} rows={5}
              placeholder="例：係の仕事で、みんなが困っていた作業を効率化するアイデアを出した…"
              style={{ width: '100%', border: '2px solid var(--border)', borderRadius: 'var(--r-md)', padding: '13px 14px', fontSize: 14, fontFamily: 'var(--font)', lineHeight: 1.7, resize: 'none', outline: 'none', color: 'var(--text)' }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--blue)'; e.target.style.boxShadow = '0 0 0 4px var(--blue-soft)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
            <HintChips title="ヒント（タップで入力）" items={JK_EPISODE_HINTS} onPick={setEpisode} />
            <NavRow onBack={() => go(1)} onNext={() => go(3)} nextDisabled={episode.trim().length < 4} />
          </>
        )}

        {/* ステップ3：活かし方 */}
        {step === 3 && (
          <>
            <AiSay>
              最後に、<b>入学後にこの強みをどう活かしたいか</b>を教えて。<br />
              「これから」の気持ちが伝わると、グッと自己PRらしくなるよ。
            </AiSay>
            <textarea value={future} onChange={(e) => setFuture(e.target.value)} rows={4}
              placeholder="例：学んだことを部活や行事でも活かして、まわりを巻き込みたい…"
              style={{ width: '100%', border: '2px solid var(--border)', borderRadius: 'var(--r-md)', padding: '13px 14px', fontSize: 14, fontFamily: 'var(--font)', lineHeight: 1.7, resize: 'none', outline: 'none', color: 'var(--text)' }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--blue)'; e.target.style.boxShadow = '0 0 0 4px var(--blue-soft)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
            <HintChips title="ヒント（タップで入力）" items={JK_FUTURE_HINTS} onPick={setFuture} />
            <NavRow onBack={() => go(2)} onNext={finish} nextLabel="自己PR案をつくる" nextDisabled={future.trim().length < 4} />
          </>
        )}

        {/* ステップ4：完成した自己PR案 */}
        {step === 4 && (
          <>
            <div style={{ textAlign: 'center', paddingTop: 4 }}>
              <div style={{ display: 'inline-flex', width: 56, height: 56, borderRadius: '50%', background: 'var(--blue-soft)', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', marginBottom: 8 }}><FIcon name="party" size={30} /></div>
              <h2 style={{ fontFamily: 'var(--font-round)', fontSize: 20, fontWeight: 900, color: 'var(--text)' }}>自己PRのベースができたよ！</h2>
              <p style={{ fontSize: 12, color: 'var(--text-sub)', fontWeight: 600, marginTop: 6, lineHeight: 1.7 }}>ここから言葉を足したり削ったりして、<br />キミだけの自己PRに育てていこう。</p>
            </div>

            <div style={{ background: '#fff', border: '2px solid var(--blue-soft)', borderRadius: 'var(--r-lg)', padding: '16px 17px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid var(--border-soft)' }}>
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,var(--blue),#00BFA5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}><Icon name="sparkle" size={14} /></span>
                <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13, color: 'var(--text)' }}>自己PR案</span>
                {path && <span className="pill" style={{ marginLeft: 'auto', background: 'var(--blue-soft)', color: 'var(--blue-dark)', fontSize: 9.5, padding: '3px 9px' }}>{(JK_PATHS.find(p => p.key === path) || {}).label}</span>}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.95, fontWeight: 500, whiteSpace: 'pre-wrap' }}>{buildPR(answers)}</p>
            </div>

            <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', background: 'var(--blue-softer)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>
              <span style={{ flexShrink: 0, color: 'var(--blue)', display: 'flex', marginTop: 1 }}><FIcon name="bulb" size={16} color="var(--blue)" /></span>
              <p style={{ fontSize: 11.5, color: 'var(--text-sub)', lineHeight: 1.7, fontWeight: 500 }}>このあとAiGROWと壁打ちすると、エピソードを深掘りしたり、志望理由とつなげたりできるよ。</p>
            </div>

            <button className="btn btn--cta btn--lg" onClick={() => { setToast(true); setTimeout(() => setToast(false), 2400); }}><Icon name="sparkle" size={18} /> AiGROWに相談して深める</button>
            <button className="btn" onClick={copyContext} style={{ background: copied ? 'var(--green-soft)' : 'var(--blue-soft)', color: copied ? '#1b7a3e' : 'var(--blue-dark)' }}>
              {copied
                ? <><FIcon name="check" size={17} color="#1b7a3e" /> コピーしたよ！</>
                : <><FIcon name="copy" size={17} color="var(--blue-dark)" /> 自分のトリセツの内容をコピー</>}
            </button>
            <button className="btn" style={{ background: 'transparent', color: 'var(--text-sub)' }} onClick={() => go(2)}>エピソードを書き直す</button>
            <button className="btn" style={{ background: 'transparent', color: 'var(--text-sub)' }} onClick={() => nav.go('exam')}>受検トップにもどる</button>
            <div style={{ height: 8 }}></div>
          </>
        )}
      </div>

      {/* トースト */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', padding: '0 18px 22px', pointerEvents: 'none', zIndex: 50,
        transform: toast ? 'translateY(0)' : 'translateY(20px)', opacity: toast ? 1 : 0, transition: 'all .3s cubic-bezier(.2,.9,.3,1.1)' }}>
        <div style={{ background: 'rgba(30,40,50,.94)', color: '#fff', borderRadius: 14, padding: '13px 18px', fontSize: 12.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 9, boxShadow: '0 10px 30px rgba(0,0,0,.25)', maxWidth: '100%' }}>
          <span style={{ flexShrink: 0, color: '#ffd34d', display: 'flex' }}><FIcon name="warning" size={16} color="#ffd34d" /></span>
          この機能は現在ご利用いただけません
        </div>
      </div>
    </div>
  );
}

/* ── AiGROW 吹き出し ── */
function AiSay({ children, big }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,var(--blue),#00BFA5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}><Icon name="sparkle" size={17} /></div>
      <div style={{ background: '#fff', borderRadius: '4px 16px 16px 16px', padding: big ? '14px 16px' : '12px 14px', fontSize: big ? 13.5 : 12.5, lineHeight: 1.75, color: 'var(--text)', boxShadow: 'var(--shadow-sm)', fontWeight: 500, flex: 1 }}>{children}</div>
    </div>
  );
}

/* ── ヒントチップ ── */
function HintChips({ title, items, onPick }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-sub)', marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {items.map((t, i) => (
          <button key={i} onClick={() => onPick(t)} style={{ textAlign: 'left', cursor: 'pointer', border: '1.5px solid var(--border)', background: '#fff', borderRadius: 12, padding: '10px 13px', fontSize: 11.5, color: 'var(--text)', fontWeight: 500, lineHeight: 1.5, display: 'flex', gap: 8, alignItems: 'flex-start', WebkitTapHighlightColor: 'transparent' }}>
            <span style={{ flexShrink: 0, color: 'var(--orange)', display: 'flex', marginTop: 1 }}><FIcon name="pencil" size={12} color="var(--orange)" /></span>{t}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── 戻る／次へ ── */
function NavRow({ onBack, onNext, nextLabel, nextDisabled }) {
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 2 }}>
      <button onClick={onBack} style={{ flexShrink: 0, border: '2px solid var(--border)', background: '#fff', color: 'var(--text-sub)', borderRadius: 999, padding: '13px 20px', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>もどる</button>
      <button className="btn btn--cta" disabled={nextDisabled} onClick={onNext} style={{ flex: 1 }}>{nextLabel || 'つぎへ'}</button>
    </div>
  );
}

Object.assign(window, { JukenPRScreen });
