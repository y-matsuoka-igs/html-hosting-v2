// screens-final.jsx — AI相談チャット / チャレンジ(一覧・登録) / 完了の木(EXP)
const { useState: useSf, useEffect: useEf, useRef: useRf } = React;

/* ════════ チャレンジ ════════ */
const CH_STRENGTHS = ['創造力', '実行力', '表現力'];
const CH_GROWING = '実行力';
const CH_RECENT_GROWTH = [
  { name: '実行力', delta: 2 },
  { name: '表現力', delta: 1 },
];
const CH_STRENGTH_MAP = [
  { name: '創造力', filled: 2, count: 5, desc: '新しい発想やアイデアを生み出す力。問題に対して既存の風にとらわれず、ユニークなアプローチを見つけられるよ。' },
  { name: '実行力', filled: 1, count: 4, desc: '決めたことを最後までやり抜く力。小さな一歩を継続して、目標に近づいていけるよ。' },
  { name: '表現力', filled: 0, count: 2, desc: '自分の考えや気持ちを、相手に伝わるよう届ける力。言葉・図・行動など　1つの型にとらわれずに。' },
  { name: '課題設定', filled: 1, count: 3, desc: '問いを見つけ、本当に大切なことは何かを見極める力。「なぜ？」を大事にしよう。' },
];
const CH_WEEK_RECS = [
  { tag: '5分でできる', icon: 'bolt', color: 'var(--blue)', soft: 'var(--blue-soft)', items: [
    { text:'好きなことを3つ書き出してみる', comp:'創造力' },
    { text:'今日できたことを1つメモする', comp:'課題設定' },
  ] },
  { tag: '友だちとできる', icon: 'handshake', color: 'var(--green)', soft: 'var(--green-soft)', items: [
    { text:'友だちに「強み」を聞いてみる', comp:'共感・傾聴力' },
    { text:'得意なことを1つ友だちに教える', comp:'表現力' },
  ] },
  { tag: 'ちょっと挑戦', icon: 'fire', color: 'var(--orange)', soft: 'rgba(255,107,94,.13)', items: [
    { text:'授業で1回、自分の意見を発言する', comp:'表現力' },
    { text:'行事で係・リーダーに立候補する', comp:'影響力の行使' },
  ] },
];

function CompTag({ name }) {
  if (!name) return null;
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:3, background:'var(--blue-soft)', color:'var(--blue-dark)', fontSize:9.5, fontWeight:800, padding:'2px 8px', borderRadius:999, whiteSpace:'nowrap' }}>
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>{name}
    </span>
  );
}

function StatusRow({ label, children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, minHeight:24 }}>
      <span style={{ fontSize:11, fontWeight:700, color:'var(--text-sub)', width:64, flexShrink:0 }}>{label}</span>
      <div style={{ flex:1, minWidth:0, display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>{children}</div>
    </div>
  );
}

function ChallengeScreen() {
  const nav = useNav();
  const initTab = (nav.params && nav.params.tab === 'tree') ? 1 : 0;
  const [tab, setTab] = React.useState(initTab);
  const logUpdated = !!nav.state.growthLogUpdated;
  const pickTab = (i) => { setTab(i); if (i === 1 && nav.state.growthLogUpdated) nav.update({ growthLogUpdated:false }); };
  React.useEffect(() => { if (tab === 1 && nav.state.growthLogUpdated) nav.update({ growthLogUpdated:false }); }, [tab, nav.state.growthLogUpdated]);
  React.useEffect(() => {
    if (nav.params && nav.params.tab === 'tree') setTab(1);
    else if (nav.params && nav.params.tab === 'challenge') setTab(0);
  }, [nav.params && nav.params.tab]);

  const exp = nav.state.exp || 0;
  const toNext = Math.max(1, 3 - (exp % 3));
  const cyclePos = exp % 3;
  const weekCleared = exp > 0 && cyclePos === 0;
  const weekDone = weekCleared ? 3 : cyclePos;
  const weekRemaining = 3 - weekDone;
  const Character = window.Character;
  const fg = nav.state.futureGoal;
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="screen">
      <StatusBar />
      <div style={{ background:'#315cfa', padding:'10px 18px 0', flexShrink:0, borderBottom:'2px solid #1f1b16' }}>
        {collapsed ? (
        <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:8 }}>
          <div style={{ color:'#fff', display:'flex', alignItems:'center', flexShrink:0 }}><FIcon name="footsteps" size={20} /></div>
          <div style={{ fontFamily:'var(--font-round)', fontWeight:900, fontSize:17, color:'#fff', flexShrink:0 }}>チャレンジ</div>
          {fg && (
            <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:4, minWidth:0 }}>
              <span style={{ background:'#ffd633', color:'#1f1b16', border:'1.5px solid #1f1b16', borderRadius:6, padding:'1px 8px', fontSize:9.5, fontWeight:900, fontFamily:'var(--font-round)', flexShrink:0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:180 }}><Emo e={fg.icon} size={11} color="#1f1b16" /> {fg.name}に挑戦中</span>
            </div>
          )}
          <div style={{ marginLeft:'auto', flexShrink:0 }}><HeaderMenu dark /></div>
        </div>
        ) : (
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:7, minWidth:0 }}>
              <div style={{ color:'#fff', display:'flex', alignItems:'center', flexShrink:0 }}><FIcon name="footsteps" size={18} /></div>
              <div style={{ fontFamily:'var(--font-round)', fontWeight:900, fontSize:16, color:'#fff', flexShrink:0 }}>チャレンジ</div>
            </div>
            <div style={{ fontFamily:'var(--font-round)', fontSize:12, fontWeight:800, color:'rgba(255,255,255,.85)', marginTop:4, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>「探索するシェイパー」</div>
            <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:7 }}>
              <span style={{ fontSize:10, fontWeight:800, color:'rgba(255,255,255,.85)', flexShrink:0 }}>今週のチャレンジ</span>
              <div style={{ flex:1, height:7, background:'rgba(255,255,255,.28)', border:'1.5px solid #1f1b16', borderRadius:999, overflow:'hidden', minWidth:34 }}>
                <div style={{ width:(weekDone/3*100)+'%', height:'100%', background:weekCleared?'#18b271':'#ffd633', transition:'width .6s cubic-bezier(.2,.8,.2,1)' }}></div>
              </div>
              {weekCleared ? (
                <span style={{ display:'inline-flex', alignItems:'center', gap:3, background:'#fff', color:'#c0392b', border:'2px solid #c0392b', borderRadius:6, padding:'1px 8px', fontSize:11, fontWeight:900, fontFamily:'var(--font-round)', letterSpacing:1, transform:'rotate(-6deg)', flexShrink:0 }}>CLEAR!</span>
              ) : (
                <span style={{ fontSize:10.5, fontWeight:800, color:'#ffd633', fontFamily:'var(--font-round)', flexShrink:0 }}>あと{weekRemaining}つ</span>
              )}
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
            <div style={{ width:82, height:82, borderRadius:'50%', background:'#fff', border:'2.5px solid #1f1b16', display:'flex', alignItems:'flex-end', justifyContent:'center', overflow:'hidden' }}>
              <img src="assets/shaper.svg" alt="探索するシェイパー" style={{ height:78, width:'auto', display:'block', marginBottom:-4 }} />
            </div>
            {fg && <div style={{ background:'#ffd633', color:'#1f1b16', border:'1.5px solid #1f1b16', borderRadius:6, padding:'2px 9px', fontSize:10, fontWeight:800, fontFamily:'var(--font-round)', marginTop:-13, position:'relative', zIndex:2, transform:'rotate(3deg)', whiteSpace:'nowrap', maxWidth:140, overflow:'hidden', textOverflow:'ellipsis' }}>{fg.name}に挑戦中</div>}
          </div>
          <HeaderMenu dark />
        </div>
        )}

        {/* めざす成長バナー（成長のヒント連動） */}
        {/* めざす成長バナーはチャレンジ中の最上部へ移動 */}

        {/* 成長ステータス（コンパクト） */}
        {/* メタ情報はヘッダー上部に統合 */}

        <div style={{ display:'flex', gap:4 }}>
          {['チャレンジ中', '成長ログ'].map((t,i) => (
            <button key={i} onClick={() => pickTab(i)}
              style={{ flex:1, border:'none', cursor:'pointer', padding:'9px 0', fontFamily:'var(--font-round)', fontWeight:800, fontSize:13,
                background:'transparent', color: tab===i?'#fff':'rgba(255,255,255,.55)', display:'flex', alignItems:'center', justifyContent:'center', gap:6,
                borderBottom: tab===i?'3px solid #ffd633':'3px solid transparent', transition:'all .15s' }}>
              {t}
              {i===1 && logUpdated && <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--orange)', border:'1.5px solid #fff', flexShrink:0 }}></span>}
            </button>
          ))}
        </div>
      </div>
      <div className="scroll" style={{ flex:1, minHeight:0 }} onScroll={(e) => { const t = e.target.scrollTop; setCollapsed(c => c ? t > 12 : t > 40); }}>
        {tab===0 ? <ChallengeTab nav={nav} /> : <GrowthLogTab nav={nav} />}
      </div>
    </div>
  );
}

const todayStr = () => { const d = new Date(); return d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0'); };

function ChallengeTab({ nav }) {
  const defaultTasks = [
    { text:'得意なことを友だちにシェアしてみる', date:'2025.04.10', done:false, comp:'表現力' },
    { text:'気になることにチャレンジしてみる', date:'2025.04.15', done:false, comp:'課題設定' },
  ];
  const tasks = nav.state.tasks ? nav.state.tasks : defaultTasks;
  const pending = tasks.filter(t => !t.done);
  const idxTasks = tasks.map((t, i) => ({ t, i }));
  const fromTorisetsu = idxTasks.filter(x => !x.t.done && x.t.source === 'future');
  const otherPending = idxTasks.filter(x => !x.t.done);
  const [selected, setSelected] = React.useState(null);
  const [custom, setCustom] = React.useState('');
  const fg = nav.state.futureGoal;
  const hasFuture = !!(fg && fg.actions && fg.actions.length);
  const futureGroup = hasFuture ? { tag:'えらんだ成長に近づくチャレンジ', emoji:fg.icon, color:'#9a6a2e', soft:'#fff5cc', items:[{ text:fg.actions[0], comp:fg.comp, future:true }] } : null;
  const recGroups = futureGroup ? [futureGroup, ...CH_WEEK_RECS] : CH_WEEK_RECS;

  const addTask = (text, comp, fromFuture) => {
    const t = { text, date:todayStr(), done:false, comp, ...(fromFuture ? { source:'future' } : {}) };
    nav.update(s => ({ tasks:[...(s.tasks ? s.tasks : defaultTasks), t] }));
    setSelected(null); setCustom('');
  };
  const selItem = recGroups.flatMap(g => g.items).find(it => it.text === selected) || {};
  const selectedComp = selItem.comp;
  const selectedFromFuture = !!selItem.future;
  const completeTask = (idx) => {
    const list = tasks.map((t,i) => i===idx?{...t,done:true,completedDate:todayStr()}:t);
    nav.update(s => ({ tasks:list, exp:(s.exp||0)+1, growthLogUpdated:true }));
  };
  const [delIdx, setDelIdx] = React.useState(null);
  const deleteTask = (idx) => {
    nav.update({ tasks: tasks.filter((_, i) => i !== idx) });
    setDelIdx(null);
  };

  return (
    <div className="pad stack">
      {/* めざす成長バナー（チャレンジ中の最上部） */}
      {fg && (
        <div style={{ display:'flex', alignItems:'center', gap:8, background:'#fff5cc', border:'2px solid #1f1b16', boxShadow:'3px 3px 0 #1f1b16', borderRadius:12, padding:'10px 12px' }}>
          <span style={{ fontSize:9.5, letterSpacing:1.2, color:'var(--orange-dark)', fontWeight:800, flexShrink:0 }}>めざす成長</span>
          <span style={{ display:'inline-flex', alignItems:'center', gap:5, background:'#ffd633', color:'#1f1b16', border:'1.5px solid #1f1b16', borderRadius:8, padding:'3px 9px', fontFamily:'var(--font-round)', fontWeight:900, fontSize:12, flexShrink:0 }}>
            <Emo e={fg.icon} size={13} color="#1f1b16" />{fg.name}
          </span>
          <span style={{ fontSize:11, color:'var(--text)', fontWeight:700, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>「{fg.comp}」をのばす</span>
          <button onClick={() => { nav.update && nav.update({ torisetsuStep:4, torisetsuDone:true }); nav.tab && nav.tab('home'); }} style={{ marginLeft:'auto', flexShrink:0, background:'#fff', color:'var(--orange-dark)', border:'1.5px solid var(--orange-dark)', borderRadius:999, padding:'4px 10px', fontSize:9.5, fontWeight:800, fontFamily:'var(--font-round)', cursor:'pointer' }}>見直す</button>
        </div>
      )}

      {/* トリセツで決めたチャレンジは非表示 */}

      {otherPending.length > 0 && (
        <>
          <h3 style={{ fontSize:13, fontWeight:800, color:'var(--text-sub)', display:'flex', alignItems:'center', gap:5 }}>チャレンジ中 <FIcon name="fire" size={14} color="var(--orange)" /></h3>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {otherPending.map(({ t, i }) => (
              <div key={i} className="card card--flat" style={{ padding:'13px 14px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700 }}>{t.text}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:2 }}>
                      <span style={{ fontSize:10, color:'var(--text-sub)' }}>登録日: {t.date}</span>
                      <CompTag name={t.comp || t.tag} />
                    </div>
                  </div>
                  <button onClick={() => completeTask(i)} className="btn btn--green btn--sm" style={{ width:'auto', padding:'9px 14px', flexShrink:0 }}>できた！✓</button>
                  <button onClick={() => setDelIdx(delIdx === i ? null : i)} aria-label="このチャレンジを消す"
                    style={{ flexShrink:0, width:30, height:30, borderRadius:'50%', background:delIdx===i?'#ffe9e6':'#fff', border:'1.5px solid '+(delIdx===i?'#ff6b5e':'var(--border)'), color:delIdx===i?'#d94a3d':'#a89e8a', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                {delIdx === i && (
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:11, paddingTop:10, borderTop:'1.5px dashed var(--border)' }}>
                    <span style={{ flex:1, minWidth:0, fontSize:11.5, fontWeight:700, color:'var(--text-sub)' }}>このチャレンジを消す？</span>
                    <button onClick={() => setDelIdx(null)}
                      style={{ flexShrink:0, background:'#fff', border:'1.5px solid var(--border)', color:'var(--text-sub)', borderRadius:999, padding:'7px 14px', fontSize:11.5, fontWeight:800, fontFamily:'var(--font-round)', cursor:'pointer' }}>やめる</button>
                    <button onClick={() => deleteTask(i)}
                      style={{ flexShrink:0, background:'#ff6b5e', border:'1.5px solid #1f1b16', color:'#fff', borderRadius:999, padding:'7px 16px', fontSize:11.5, fontWeight:800, fontFamily:'var(--font-round)', cursor:'pointer' }}>消す</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {otherPending.length === 0 && (
        <div style={{ background:'var(--bg)', border:'1.5px dashed var(--border)', borderRadius:'var(--r-md)', padding:'16px 14px', textAlign:'center', fontSize:12, fontWeight:700, color:'var(--text-sub)', lineHeight:1.7 }}>いま挑戦中のチャレンジはないよ<br/>下から気になる一歩をえらんでみよう</div>
      )}
      <h3 style={{ fontSize:13, fontWeight:800, color:'var(--text-sub)', marginTop:4, display:'flex', alignItems:'center', gap:5 }}>チャレンジを選ぶ <FIcon name="sparkle" size={14} color="var(--orange)" /></h3>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {recGroups.map((g) => (
          <div key={g.tag}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:g.soft, color:g.color, borderRadius:999, padding:'5px 12px', marginBottom:8 }}>
              {g.emoji ? <Emo e={g.emoji} size={13} color={g.color} /> : <FIcon name={g.icon} size={13} color={g.color} />}
              <span style={{ fontSize:11.5, fontWeight:800, fontFamily:'var(--font-round)' }}>{g.tag}</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {g.items.map((item) => {
                const on = selected === item.text;
                return (
                  <button key={item.text} onClick={() => setSelected(on ? null : item.text)}
                    style={{ textAlign:'left', cursor:'pointer', borderRadius:'var(--r-md)', padding:'12px 14px', fontSize:13, fontWeight:600, display:'flex', alignItems:'center', gap:10,
                      color:on?'var(--blue-dark)':'var(--text)',
                      border:'2px solid '+(on?'var(--blue)':'var(--border-soft)'),
                      background:on?'var(--blue-soft)':'#fff', transition:'all .15s', WebkitTapHighlightColor:'transparent' }}>
                    <span style={{ width:20, height:20, borderRadius:7, flexShrink:0, border:'2px solid '+(on?'var(--blue)':'#d0d5da'), background:on?'var(--blue)':'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      {on && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    </span>
                    <span style={{ flex:1, minWidth:0 }}>{item.text}</span>
                    <CompTag name={item.comp} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn--primary" disabled={!selected} onClick={() => selected && addTask(selected, selectedComp, selectedFromFuture)}>この一歩を登録する</button>
      <div className="card card--flat">
        <div style={{ fontSize:11, fontWeight:800, color:'var(--text-sub)', marginBottom:8, display:'flex', alignItems:'center', gap:5 }}><FIcon name="pencil" size={13} color="var(--text-sub)" /> 自分で入力する</div>
        <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
          <textarea value={custom} onChange={e=>setCustom(e.target.value)} rows={2} placeholder="例：毎朝5分、読書する"
            style={{ flex:1, border:'2px solid var(--border)', borderRadius:'var(--r-md)', padding:'10px 12px', fontSize:13, fontFamily:'var(--font)', resize:'none', lineHeight:1.5, outline:'none' }}
            onFocus={e=>e.target.style.borderColor='var(--blue)'} onBlur={e=>e.target.style.borderColor='var(--border)'} />
          <button onClick={() => custom.trim()&&addTask(custom.trim())}
            style={{ flexShrink:0, width:44, height:44, borderRadius:'50%', background:'var(--blue)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function GrowthLogTab({ nav }) {
  const [mapOpen, setMapOpen] = React.useState(null);
  const [showAllDone, setShowAllDone] = React.useState(false);
  const baseCompleted = [
    { text:'好きなことを3つ書いた', date:'2025.04.10' },
    { text:'友だちに強みを聞いた', date:'2025.04.08' },
  ];
  const userCompleted = (nav.state.tasks||[]).filter(t=>t.done).map(t=>({ text:t.text, date:t.completedDate||todayStr() }));
  const completed = [...userCompleted, ...baseCompleted];

  return (
    <div className="pad stack">
      {/* サマリー */}
      <div className="card card--flat" style={{ padding:'14px 14px 13px' }}>
        <div style={{ fontSize:11.5, fontWeight:800, color:'var(--text-sub)', letterSpacing:.5, marginBottom:10, display:'flex', alignItems:'center', gap:6 }}><FIcon name="chart" size={13} color="var(--text-sub)" /> これまでのあしあと</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8 }}>
          {[
            { label:'やってみた', value:12, unit:'回', color:'var(--orange)' },
            { label:'チャレンジした日', value:7, unit:'日', color:'var(--blue)' },
            { label:'使ったコンピテンシー', value:4, unit:'種類', color:'var(--green)' },
          ].map((s) => (
            <div key={s.label} style={{ background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:12, padding:'10px 6px 9px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-round)', color:s.color, lineHeight:1 }}>
                <span style={{ fontSize:24, fontWeight:900 }}>{s.value}</span>
                <span style={{ fontSize:11, fontWeight:800, marginLeft:2 }}>{s.unit}</span>
              </div>
              <div style={{ fontSize:10, fontWeight:700, color:'var(--text-sub)', marginTop:6, lineHeight:1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* チャレンジマップ */}
      <div className="card">
        <div style={{ fontSize:12.5, fontWeight:800, marginBottom:13, display:'flex', alignItems:'center', gap:6 }}><FIcon name="compass" size={16} color="var(--blue)" /> チャレンジマップ</div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {CH_STRENGTH_MAP.map((s) => {
            const open = mapOpen === s.name;
            return (
              <div key={s.name} style={{ background: open ? 'var(--blue-soft)' : 'var(--bg)', border:'1.5px solid ' + (open ? 'var(--blue)' : 'var(--border)'), borderRadius:12, transition:'background .2s, border-color .2s' }}>
                <button onClick={() => setMapOpen(open ? null : s.name)} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 13px', width:'100%', background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
                  <span style={{ fontSize:13, fontWeight:800, color:'var(--text)', flex:1 }}>{s.name}</span>
                  <span style={{ display:'inline-flex', alignItems:'baseline', gap:2, fontFamily:'var(--font-round)', color:'var(--blue-dark)' }}>
                    <span style={{ fontSize:22, fontWeight:900, lineHeight:1 }}>{s.count}</span>
                    <span style={{ fontSize:10.5, fontWeight:800 }}>回</span>
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-sub)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition:'transform .2s' }}><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                {open && (
                  <div style={{ padding:'0 13px 12px', fontSize:11.5, color:'var(--text)', lineHeight:1.75 }}>{s.desc}</div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ fontSize:10.5, color:'var(--text-sub)', marginTop:12, lineHeight:1.6 }}>タップでコンピテンシーの説明が見られるよ</div>
      </div>
      {/* 完了したチャレンジ */}
      <h3 style={{ fontSize:13, fontWeight:800, color:'var(--text-sub)' }}>完了したチャレンジ</h3>
      {completed.length ? (
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {(showAllDone ? completed : completed.slice(0,5)).map((t,i) => (
            <div key={i} className="card card--flat" style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px' }}>
              <div style={{ width:24, height:24, borderRadius:'50%', background:'var(--green)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12.5, fontWeight:700 }}>{t.text}</div>
                <div style={{ fontSize:10, color:'var(--text-sub)', marginTop:1 }}>完了日: {t.date}</div>
              </div>
            </div>
          ))}
          {completed.length > 5 && (
            <button onClick={() => setShowAllDone(!showAllDone)}
              style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, width:'100%', background:'#fff', border:'1.5px solid var(--border)', borderRadius:999, padding:'10px 14px', fontSize:12, fontWeight:800, fontFamily:'var(--font-round)', color:'var(--text-sub)', cursor:'pointer', marginTop:2 }}>
              {showAllDone ? '閉じる' : `もっと見る（あと${completed.length - 5}件）`}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: showAllDone ? 'rotate(180deg)' : 'none', transition:'transform .2s' }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          )}
        </div>
      ) : (
        <p style={{ fontSize:12, color:'var(--text-sub)', textAlign:'center', padding:'16px 0' }}>まだ完了したチャレンジがありません。<br/>最初の一歩を踏み出そう！</p>
      )}

    </div>
  );
}

Object.assign(window, { ChallengeScreen });
