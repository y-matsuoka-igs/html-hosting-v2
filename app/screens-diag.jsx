// screens-diag.jsx — 診断開始 / 気質診断ゲーム(語句仕分け5軸) / 軸別結果
const { useState: useSd, useEffect: useEd, useRef: useRd } = React;

/* 5軸（元HTML準拠：Big Five・語句仕分けゲーム） */
const DIAG_AXES = [
  { idx: 1, axis: '外向性 / 内向性', result: 'エネルギッシュな挑戦者', color: '#00ACC1', emoji: 'fire',
    self: '思慮深い', other: '活発な', center: '活動的', dim: ['慎重な', '社交的'] },
  { idx: 2, axis: '開放性 / 保守性', result: '知的好奇心旺盛な探求者', color: '#43A047', emoji: 'search',
    self: '安定志向', other: '革新的', center: '好奇心旺盛', dim: ['伝統的', '柔軟な'] },
  { idx: 3, axis: '繊細性 / 平穏性', result: 'リスクを察知する慎重な守り手', color: '#FB8C00', emoji: 'compass',
    self: '落ち着いた', other: '繊細な', center: '敏感な', dim: ['安定した', '感受性豊か'] },
  { idx: 4, axis: '協調性 / 独立性', result: '調和を重んじるサポーター', color: '#8E24AA', emoji: 'handshake',
    self: '自律的', other: '調和的', center: '協力的', dim: ['主体的', '思いやり深い'] },
  { idx: 5, axis: '自律性 / 自由性', result: '意志の強い努力家', color: '#1E88E5', emoji: 'target',
    self: '柔軟な', other: '責任感強い', center: '計画的', dim: ['主体的', '臨機応変'] },
];

/* ─────────── 診断開始モーダル ─────────── */
function StartDiagModal({ onStart }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 20px', background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(2px)' }}>
      <div style={{ width: '100%', maxWidth: 440, borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.35)' }}>
        {/* ヘッダー */}
        <div style={{ background: 'var(--blue)', padding: '22px 22px 20px' }}>
          <div style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 21, color: '#fff', lineHeight: 1.35 }}>キミの強みと可能性を見つけよう！</div>
          <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,.9)', marginTop: 6, fontWeight: 600 }}>3ステップ完了で「トリセツ」が完成するよ</div>
        </div>
        {/* 本文 */}
        <div style={{ background: '#fff', padding: '22px 22px 6px' }}>
          {/* 3ステップ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 20 }}>
            {[
              ['1', '気質診断', 'ゲーム感覚で潜在的な性格を発見'],
              ['2', '自己評価', '行動を振り返り強みを再確認'],
              ['3', '相互評価', 'お互いの強みを送り合って客観視'],
            ].map(([n, title, desc]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--blue)', color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{n}</div>
                <div>
                  <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>{title}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-sub)', fontWeight: 500, marginLeft: 8 }}>{desc}</span>
                </div>
              </div>
            ))}
          </div>
          {/* 完成すると */}
          <div style={{ background: 'var(--blue-softer)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13, color: 'var(--blue)', marginBottom: 10 }}><span style={{display:'inline-flex',alignItems:'center',gap:5}}><FIcon name="sparkle" size={13} color="var(--blue)" /> 完成すると...</span></div>
            {[
              ['chat', '強みを言語化して自己PRに活用'],
              ['chart', '成長の変化をグラフで確認'],
              ['crystal', '自分に合った行動・学びスタイルがわかる'],
            ].map(([e, t]) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>
                <span style={{ display:'flex', color:'var(--blue)', flexShrink:0 }}><FIcon name={e} size={16} /></span>{t}
              </div>
            ))}
          </div>
          {/* CTA */}
          <button className="btn btn--primary btn--lg" onClick={onStart} style={{ marginBottom: 20, fontSize: 17, letterSpacing: .3 }}>
            Ai GROW をはじめる
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── 診断開始 ─────────── */
function StartDiagScreen() {
  const nav = useNav();
  const [showModal, setShowModal] = useSd(true);

  const startDiag = () => {
    nav.update({ diag: { answers: {}, done: false, type: null }, self: { answers: {}, done: false }, other: { answers: {}, done: false }, seenAnnounce: false });
    nav.go('diag-game', { round: 0 });
  };

  return (
    <div className="screen screen--white" style={{ position: 'relative' }}>
      <StatusBar />
      <AppHeader sub="気質診断" />
      <div className="scroll" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, minHeight: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '12px 30px 24px', gap: 6 }}>
          <Pill style={{ background: 'var(--blue-soft)', color: 'var(--blue-dark)' }}>STEP 1 / 3</Pill>
          <div style={{ margin: '18px 0 6px', display:'flex', justifyContent:'center', color:'var(--blue)' }}><FIcon name="search" size={64} sw={1.6} /></div>
          <h1 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.5 }}>まずは、キミのタイプを<br/>サクッとチェック！</h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-sub)', fontWeight: 600, marginTop: 8, lineHeight: 1.7 }}>
            言葉を「自分」「他人」に仕分けするゲーム。<br/>5つの軸でキミの気質がわかるよ。
          </p>
        </div>
        <div style={{ flexShrink: 0, padding: '0 24px 26px' }}>
          <button className="btn btn--cta btn--lg" onClick={startDiag}>診断をはじめる</button>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-sub)', marginTop: 12 }}>1 項目 約 5 分</p>
        </div>
      </div>
      {showModal && <StartDiagModal onStart={() => setShowModal(false)} />}
    </div>
  );
}

/* ─────────── 気質診断ゲーム（語句仕分け） ─────────── */
// each round: sort the centre word (and dim words) into 自分 / 他人. faithful to original "仕分け" concept.
function DiagGameScreen() {
  const nav = useNav();
  // Round is driven EXPLICITLY by navigation params (deterministic — no guessing).
  // Falls back to the first unanswered axis only on a param-less entry (resume).
  const answers = nav.state.diag.answers || {};
  const firstUnanswered = DIAG_AXES.findIndex(a => answers[a.idx] === undefined);
  const initialRound = nav.params && nav.params.round != null
    ? nav.params.round
    : (firstUnanswered < 0 ? 0 : firstUnanswered);
  const [round, setRound] = useSd(initialRound);
  // keep round in sync when an explicit round is passed via navigation
  useEd(() => {
    if (nav.params && nav.params.round != null && nav.params.round !== round) {
      setRound(nav.params.round);
    }
  }, [nav.params && nav.params.round]);
  const ax = DIAG_AXES[round];

  // words to sort this round: centre + dim words (start unsorted)
  const buildQueue = (a) => [a.center, ...a.dim];
  const [queue, setQueue] = useSd(() => buildQueue(ax));
  const [bins, setBins] = useSd({ self: [], other: [] });

  // drag state
  const [drag, setDrag] = useSd({ x: 0, y: 0, active: false });
  const [hover, setHover] = useSd(null);     // which zone the finger is over
  const [landing, setLanding] = useSd(null); // brief flash on a zone after a drop
  const [absorb, setAbsorb] = useSd(null);   // { tx, ty } — card flies here then disappears
  const selfRef = useRd(null), otherRef = useRd(null), cardRef = useRd(null);
  const dragData = useRd({ active: false, startX: 0, startY: 0, scale: 1, pid: null });

  useEd(() => { setQueue(buildQueue(ax)); setBins({ self: [], other: [] }); }, [round]);

  const current = queue[0];
  const done = !current;
  const progress = ((round + (done ? 1 : 0)) / DIAG_AXES.length) * 100;

  const zoneAt = (cx, cy) => {
    for (const [k, ref] of [['self', selfRef], ['other', otherRef]]) {
      const r = ref.current && ref.current.getBoundingClientRect();
      if (r && cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom) return k;
    }
    return null;
  };
  const assign = (side) => {
    if (!current) return;
    setBins(b => ({ ...b, [side]: [...b[side], current] }));
    setLanding(side);
    setTimeout(() => setLanding(null), 350);
    setQueue(q => q.slice(1));
  };
  const onDown = (e) => {
    if (!current) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const scale = el.offsetWidth ? rect.width / el.offsetWidth : 1;
    dragData.current = { active: true, startX: e.clientX, startY: e.clientY, scale, pid: e.pointerId };
    setDrag({ x: 0, y: 0, active: true });
    try { el.setPointerCapture(e.pointerId); } catch (_) {}
  };
  const onMove = (e) => {
    const d = dragData.current;
    if (!d.active) return;
    const x = (e.clientX - d.startX) / d.scale;
    const y = (e.clientY - d.startY) / d.scale;
    setDrag({ x, y, active: true });
    setHover(zoneAt(e.clientX, e.clientY));
  };
  const onUp = (e) => {
    const d = dragData.current;
    if (!d.active) return;
    d.active = false;
    const z = zoneAt(e.clientX, e.clientY);
    setHover(null);
    if (z) {
      // Fly to zone center then vanish
      const zRef = z === 'self' ? selfRef : otherRef;
      const zr = zRef.current && zRef.current.getBoundingClientRect();
      const cr = cardRef.current && cardRef.current.getBoundingClientRect();
      if (zr && cr) {
        const zCx = zr.left + zr.width / 2;
        const zCy = zr.top + zr.height / 2;
        const cCx = cr.left + cr.width / 2;
        const cCy = cr.top + cr.height / 2;
        const tx = drag.x + (zCx - cCx) / d.scale;
        const ty = drag.y + (zCy - cCy) / d.scale;
        setAbsorb({ tx, ty });
        setDrag(prev => ({ ...prev, active: false }));
        setTimeout(() => { assign(z); setAbsorb(null); setDrag({ x: 0, y: 0, active: false }); }, 340);
      } else {
        assign(z);
        setDrag({ x: 0, y: 0, active: false });
      }
    } else {
      setDrag({ x: 0, y: 0, active: false }); // snap back
    }
  };

  const judge = () => {
    const newAns = { ...nav.state.diag.answers, [ax.idx]: { self: bins.self, other: bins.other } };
    const isLast = round === DIAG_AXES.length - 1;
    nav.update(s => ({ diag: { ...s.diag, answers: newAns, done: isLast || s.diag.done, type: isLast ? 'done' : s.diag.type } }));
    nav.go('diag-result', { round });
  };

  return (
    <div className="screen screen--white">
      <StatusBar />
      <div className="appbar">
        <button onClick={() => round === 0 ? nav.go('start-diag') : setRound(round - 1)}
          style={{ border: 'none', background: 'var(--bg)', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }}>
          <Icon name="back" size={20} />
        </button>
        <div className="logo"><span className="ai">Ai</span><span className="grow">GROW</span></div>
        <div style={{ width: 38 }}></div>
      </div>

      <div style={{ padding: '6px 16px 0' }}>
        <Progress value={progress} color={ax.color} />
        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-sub)', fontWeight: 700, margin: '12px 0 2px' }}>
          カードを「自分」「他人」の枠にドラッグしよう
        </div>
      </div>

      <div className="scroll" style={{ display: 'flex', flexDirection: 'column', padding: '8px 16px 16px', touchAction: 'none' }}>
        {/* sort zones (drop targets) */}
        <div style={{ display: 'flex', gap: 12 }}>
          {[['self', '自分', selfRef], ['other', '他人', otherRef]].map(([k, label, ref]) => {
            const active = hover === k || landing === k;
            return (
              <div key={k} ref={ref} style={{ flex: 1, borderRadius: 14, overflow: 'hidden',
                boxShadow: active ? `0 8px 20px ${ax.color}55` : 'var(--shadow-sm)',
                outline: `3px solid ${active ? ax.color : 'transparent'}`, outlineOffset: -1,
                transform: active ? 'scale(1.04)' : 'scale(1)', transition: 'all .18s' }}>
                <div style={{ background: ax.color, color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15, padding: '12px', textAlign: 'center' }}>{label}</div>
                <div style={{ background: active ? `${ax.color}14` : '#fff', minHeight: 96, transition: 'background .18s' }}></div>
              </div>
            );
          })}
        </div>

        {/* draggable current word */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, minHeight: 210 }}>
          {current ? (
            <>
              <div ref={cardRef}
                onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
                style={{ background: '#fff', color: 'var(--text)', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 26,
                  padding: '26px 44px', borderRadius: 18, border: `2.5px solid ${ax.color}`,
                  boxShadow: drag.active ? `0 18px 36px ${ax.color}55` : 'var(--shadow)',
                  cursor: absorb ? 'default' : 'grab', touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none',
                  opacity: absorb ? 0 : 1,
                  transform: absorb
                    ? `translate(${absorb.tx}px,${absorb.ty}px) scale(0.05)`
                    : `translate(${drag.x}px,${drag.y}px) rotate(${drag.active ? drag.x * 0.04 : 0}deg) scale(${drag.active ? 1.06 : 1})`,
                  transition: absorb
                    ? 'transform .32s cubic-bezier(.4,0,1,1), opacity .25s ease-in'
                    : drag.active ? 'box-shadow .15s' : 'transform .32s cubic-bezier(.2,.9,.3,1.3), box-shadow .15s',
                  position: 'relative', zIndex: 5 }}>
                {current}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-sub)', fontWeight: 600, opacity: drag.active ? 0 : 1, transition: 'opacity .15s' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>ドラッグして振り分け</span>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ color:'var(--text-sub)', display:'flex' }}><FIcon name={ax.emoji} size={40} /></div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>仕分け完了！判定してみよう</div>
            </div>
          )}
        </div>

        <button className="btn btn--lg" disabled={!done}
          style={{ background: done ? ax.color : 'var(--border)', color: '#fff', boxShadow: done ? 'var(--shadow)' : 'none' }}
          onClick={judge}>判定する</button>
      </div>
    </div>
  );
}

/* ─────────── 軸別 結果 ─────────── */
function DiagResultScreen() {
  const nav = useNav();
  const round = (nav.params && nav.params.round) || 0;
  const ax = DIAG_AXES[round];
  const isLast = round === DIAG_AXES.length - 1;
  const remaining = DIAG_AXES.length - round - 1;

  return (
    <div className="screen screen--white">
      <StatusBar />
      <AppHeader />
      {/* step indicator */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-soft)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {DIAG_AXES.map((a, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ flex: 1, height: 2, background: 'var(--border)' }}></div>}
              <div style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff',
                background: i < round ? 'var(--green)' : i === round ? 'var(--blue)' : 'var(--border)' }}>
                {i < round ? '✓' : i + 1}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-sub)', textAlign: 'center', marginTop: 6, fontWeight: 700 }}>STEP {ax.idx} / 5</div>
      </div>

      <div className="scroll pad stack">
        <div style={{ textAlign: 'center', paddingTop: 6 }}>
          <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 700 }}>STEP {ax.idx} / 5　結果</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginTop: 4 }}>{ax.axis}</div>
        </div>

        <div className="fade-in" style={{ background: ax.color, borderRadius: 'var(--r-lg)', padding: '26px 20px', textAlign: 'center', color: '#fff', boxShadow: `0 10px 26px ${ax.color}55` }}>
          <div style={{ marginBottom: 6, display:'flex', justifyContent:'center', color:'#fff' }}><FIcon name={ax.emoji} size={38} /></div>
          <div style={{ fontSize: 12, opacity: .85, marginBottom: 6, fontWeight: 600 }}>キミの結果</div>
          <div style={{ fontFamily: 'var(--font-round)', fontSize: 22, fontWeight: 900, lineHeight: 1.35 }}>{ax.result}</div>
          <div style={{ fontSize: 11, opacity: .8, marginTop: 8 }}>この傾向をもとに診断を続けます</div>
        </div>

        <div className="card card--flat">
          <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 8 }}>この結果について</div>
          <p style={{ fontSize: 12.5, color: 'var(--text-sub)', lineHeight: 1.7 }}>スコアは優劣ではなく、キミがどのような場面で力を発揮しやすいかの傾向を示しています。引き続き診断を進めましょう。</p>
        </div>

        {isLast ? (
          <div style={{ background: 'var(--green-soft)', borderRadius: 'var(--r-lg)', padding: 16, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-round)', fontSize: 16, fontWeight: 800, color: '#2E7D32', marginBottom: 4 }}><span style={{display:'inline-flex',alignItems:'center',gap:6}}><FIcon name="party" size={16} color="#2E7D32" /> 気質診断 完了！</span></div>
            <p style={{ fontSize: 12, color: '#388E3C', fontWeight: 600, lineHeight: 1.7 }}>お疲れさまでした！ホームから次のステップに進もう。</p>
          </div>
        ) : (
          <div style={{ background: 'var(--blue-soft)', borderRadius: 'var(--r-lg)', padding: '12px 14px' }}>
            <div style={{ fontSize: 11, color: 'var(--blue-dark)', fontWeight: 800, marginBottom: 6 }}>あと {remaining} STEP</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {DIAG_AXES.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= round ? (i === round ? 'var(--blue)' : 'var(--green)') : 'var(--border)' }}></div>
              ))}
            </div>
          </div>
        )}

        <button className="btn btn--cta btn--lg"
          onClick={() => isLast ? nav.go('exam') : nav.go('diag-game', { round: round + 1 })}>
          {isLast ? 'ホームへ' : '次へすすむ'}
        </button>
        <p style={{ fontSize: 11, color: 'var(--text-sub)', textAlign: 'center' }}>1 項目 約 5 分</p>
      </div>
    </div>
  );
}

Object.assign(window, { StartDiagScreen, DiagGameScreen, DiagResultScreen, DIAG_AXES });
