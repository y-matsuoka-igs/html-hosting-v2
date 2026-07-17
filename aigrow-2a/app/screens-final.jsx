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
  { name: '創造力', filled: 2 },
  { name: '実行力', filled: 1 },
  { name: '表現力', filled: 0 },
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
  React.useEffect(() => {
    if (nav.params && nav.params.tab === 'tree') setTab(1);
    else if (nav.params && nav.params.tab === 'challenge') setTab(0);
  }, [nav.params && nav.params.tab]);

  const exp = nav.state.exp || 0;
  const toNext = Math.max(1, 3 - (exp % 3));
  const Character = window.Character;
  const fg = nav.state.futureGoal;
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="screen">
      <StatusBar />
      <div style={{ background:'#315cfa', padding:'10px 16px 0', flexShrink:0, borderBottom:'2px solid #1f1b16' }}>
        <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom: collapsed ? 9 : 9 }}>
          <div style={{ width:34, height:34, borderRadius:11, background:'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', flexShrink:0 }}><FIcon name="footsteps" size={18} /></div>
          <div style={{ fontFamily:'var(--font-round)', fontWeight:900, fontSize:17, color:'#fff', flexShrink:0 }}>チャレンジ</div>
          {collapsed && (
            <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:4, minWidth:0 }}>
              <span style={{ background:'#ffd633', color:'#1f1b16', border:'1.5px solid #1f1b16', borderRadius:6, padding:'1px 7px', fontSize:9.5, fontWeight:900, fontFamily:'var(--font-round)', flexShrink:0 }}>Lv.3</span>
              {fg && <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:11, color:'#fff', fontWeight:800, fontFamily:'var(--font-round)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}><Emo e={fg.icon} size={12} color="#ffd633" />{fg.name}</span>}
            </div>
          )}
          <div style={{ marginLeft:'auto', flexShrink:0 }}><HeaderMenu dark /></div>
        </div>

        {/* めざす成長バナー（成長のヒント連動） */}
        {!collapsed && fg && (
          <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,.14)', border:'1.5px solid rgba(255,255,255,.3)', borderRadius:12, padding:'8px 11px', marginBottom:8 }}>
            <span style={{ fontSize:9.5, letterSpacing:1.2, color:'#ffd633', fontWeight:800, flexShrink:0 }}>めざす成長</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:5, background:'#ffd633', color:'#1f1b16', border:'1.5px solid #1f1b16', borderRadius:8, padding:'3px 9px', fontFamily:'var(--font-round)', fontWeight:900, fontSize:12, flexShrink:0 }}>
              <Emo e={fg.icon} size={13} color="#1f1b16" />{fg.name}
            </span>
            <span style={{ fontSize:11, color:'#fff', fontWeight:700, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>「{fg.comp}」をのばす</span>
            <button onClick={() => { nav.update && nav.update({ torisetsuStep:4, torisetsuDone:true }); nav.tab && nav.tab('home'); }} style={{ marginLeft:'auto', flexShrink:0, background:'rgba(255,255,255,.16)', color:'#fff', border:'none', borderRadius:999, padding:'4px 10px', fontSize:9.5, fontWeight:800, fontFamily:'var(--font-round)', cursor:'pointer' }}>見直す</button>
          </div>
        )}

        {/* 成長ステータス（コンパクト） */}
        {!collapsed && (
        <div style={{ background:'#fff', borderRadius:14, padding:'9px 13px', marginBottom:10, border:'2px solid #1f1b16', boxShadow:'3px 3px 0 rgba(31,27,22,.9)', display:'flex', alignItems:'center', gap:11 }}>
          <div style={{ flexShrink:0, display:'flex' }}>{Character && <Character size={40} />}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:7 }}>
              <span style={{ fontFamily:'var(--font-round)', fontWeight:900, fontSize:14, color:'var(--blue-dark)', whiteSpace:'nowrap' }}>行動する創造者</span>
              <span style={{ background:'#ffd633', color:'#1f1b16', border:'1.5px solid #1f1b16', borderRadius:6, padding:'1px 8px', fontSize:10, fontWeight:900, fontFamily:'var(--font-round)' }}>Lv.3</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:6 }}>
              <span style={{ fontSize:10, fontWeight:700, color:'var(--text-sub)', flexShrink:0 }}>次のLvまで</span>
              <div style={{ flex:1, height:6, background:'var(--bg)', borderRadius:3, overflow:'hidden' }}>
                <div style={{ width:((3-toNext)/3*100)+'%', height:'100%', background:'var(--blue)', borderRadius:3, transition:'width .6s cubic-bezier(.2,.8,.2,1)' }}></div>
              </div>
              <span style={{ fontSize:10.5, fontWeight:800, color:'var(--orange)', fontFamily:'var(--font-round)', flexShrink:0 }}>あと{toNext}歩</span>
            </div>
          </div>
        </div>
        )}

        <div style={{ display:'flex', gap:4 }}>
          {['チャレンジ中', '成長ログ'].map((t,i) => (
            <button key={i} onClick={() => setTab(i)}
              style={{ flex:1, border:'none', cursor:'pointer', padding:'9px 0', fontFamily:'var(--font-round)', fontWeight:800, fontSize:13,
                background:'transparent', color: tab===i?'#fff':'rgba(255,255,255,.55)',
                borderBottom: tab===i?'3px solid #ffd633':'3px solid transparent', transition:'all .15s' }}>
              {t}
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
  const tasks = nav.state.tasks && nav.state.tasks.length ? nav.state.tasks : defaultTasks;
  const pending = tasks.filter(t => !t.done);
  const idxTasks = tasks.map((t, i) => ({ t, i }));
  const fromTorisetsu = idxTasks.filter(x => !x.t.done && x.t.source === 'future');
  const otherPending = idxTasks.filter(x => !x.t.done && x.t.source !== 'future');
  const [selected, setSelected] = React.useState(null);
  const [custom, setCustom] = React.useState('');
  const fg = nav.state.futureGoal;
  const hasFuture = !!(fg && fg.actions && fg.actions.length);
  const futureGroup = hasFuture ? { tag:'えらんだ成長に近づくチャレンジ', emoji:fg.icon, color:'#9a6a2e', soft:'#fff5cc', items:[{ text:fg.actions[0], comp:fg.comp, future:true }] } : null;
  const recGroups = futureGroup ? [futureGroup, ...CH_WEEK_RECS] : CH_WEEK_RECS;

  const addTask = (text, comp, fromFuture) => {
    const t = { text, date:todayStr(), done:false, comp, ...(fromFuture ? { source:'future' } : {}) };
    nav.update(s => ({ tasks:[...(s.tasks&&s.tasks.length?s.tasks:defaultTasks), t] }));
    setSelected(null); setCustom('');
  };
  const selItem = recGroups.flatMap(g => g.items).find(it => it.text === selected) || {};
  const selectedComp = selItem.comp;
  const selectedFromFuture = !!selItem.future;
  const completeTask = (idx) => {
    const list = tasks.map((t,i) => i===idx?{...t,done:true,completedDate:todayStr()}:t);
    nav.update(s => ({ tasks:list, exp:(s.exp||0)+1 }));
  };

  return (
    <div className="pad stack">
      {/* トリセツで決めたチャレンジ（最上部・強調） */}
      {fromTorisetsu.length > 0 && (
        <div style={{ background:'#fff5cc', borderRadius:'var(--r-lg)', padding:'14px 15px 15px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:11 }}>
            <span style={{ width:26, height:26, borderRadius:'50%', background:'var(--orange)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', flexShrink:0 }}><FIcon name="sparkle" size={14} color="#fff" /></span>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'var(--font-round)', fontWeight:900, fontSize:14, color:'var(--orange-dark)', lineHeight:1.2 }}>トリセツで決めたチャレンジ</div>
              <div style={{ fontSize:10.5, color:'#b5651a', fontWeight:600, marginTop:1 }}>成長のヒントから、ここに届いたよ</div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {fromTorisetsu.map(({ t, i }) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:11, background:'#fff', borderRadius:'var(--r-md)', padding:'12px 13px', boxShadow:'var(--shadow-sm)' }}>
                <span style={{ flexShrink:0, color:'var(--orange)', display:'flex' }}><FIcon name="flag" size={15} color="var(--orange)" /></span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', lineHeight:1.45 }}>{t.text}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:3 }}>
                    <span style={{ fontSize:10, color:'var(--text-sub)' }}>登録日: {t.date}</span>
                    <CompTag name={t.comp || t.tag} />
                  </div>
                </div>
                <button onClick={() => completeTask(i)} className="btn btn--green btn--sm" style={{ width:'auto', padding:'9px 14px', flexShrink:0 }}>できた！✓</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {otherPending.length > 0 && (
        <>
          <h3 style={{ fontSize:13, fontWeight:800, color:'var(--text-sub)', display:'flex', alignItems:'center', gap:5 }}>チャレンジ中 <FIcon name="fire" size={14} color="var(--orange)" /></h3>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {otherPending.map(({ t, i }) => (
              <div key={i} className="card card--flat" style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 14px' }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700 }}>{t.text}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:2 }}>
                    <span style={{ fontSize:10, color:'var(--text-sub)' }}>登録日: {t.date}</span>
                    <CompTag name={t.comp || t.tag} />
                  </div>
                </div>
                <button onClick={() => completeTask(i)} className="btn btn--green btn--sm" style={{ width:'auto', padding:'9px 14px', flexShrink:0 }}>できた！✓</button>
              </div>
            ))}
          </div>
        </>
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
  const baseCompleted = [
    { text:'好きなことを3つ書いた', date:'2025.04.10' },
    { text:'友だちに強みを聞いた', date:'2025.04.08' },
  ];
  const userCompleted = (nav.state.tasks||[]).filter(t=>t.done).map(t=>({ text:t.text, date:t.completedDate||todayStr() }));
  const completed = [...userCompleted, ...baseCompleted];

  return (
    <div className="pad stack">
      {/* 最近育った力 */}
      <div className="card">
        <div style={{ fontSize:12.5, fontWeight:800, marginBottom:12, display:'flex', alignItems:'center', gap:6 }}><FIcon name="sprout" size={16} color="var(--green)" /> 最近育った力</div>
        <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
          {CH_RECENT_GROWTH.map((g) => (
            <div key={g.name} style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:13, fontWeight:700, color:'var(--text)', flex:1 }}>{g.name}</span>
              <span style={{ display:'inline-flex', alignItems:'center', gap:4, background:'var(--green-soft)', color:'#1b7a3e', fontSize:12.5, fontWeight:900, fontFamily:'var(--font-round)', padding:'4px 12px', borderRadius:999 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1b7a3e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>+{g.delta}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 完了したチャレンジ */}
      <h3 style={{ fontSize:13, fontWeight:800, color:'var(--text-sub)' }}>完了したチャレンジ</h3>
      {completed.length ? (
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {completed.map((t,i) => (
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
        </div>
      ) : (
        <p style={{ fontSize:12, color:'var(--text-sub)', textAlign:'center', padding:'16px 0' }}>まだ完了したチャレンジがありません。<br/>最初の一歩を踏み出そう！</p>
      )}

      {/* 強みマップ */}
      <div className="card">
        <div style={{ fontSize:12.5, fontWeight:800, marginBottom:13, display:'flex', alignItems:'center', gap:6 }}><FIcon name="compass" size={16} color="var(--blue)" /> 強みマップ</div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {CH_STRENGTH_MAP.map((s) => (
            <div key={s.name} style={{ display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ fontSize:13, fontWeight:700, color:'var(--text)', width:56, flexShrink:0 }}>{s.name}</span>
              <div style={{ display:'flex', gap:8 }}>
                {[0,1,2].map((d) => (
                  <span key={d} style={{ width:16, height:16, borderRadius:'50%',
                    background: d < s.filled ? 'var(--blue)' : '#fff',
                    border: d < s.filled ? 'none' : '2px solid var(--border)' }}></span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize:10.5, color:'var(--text-sub)', marginTop:12, lineHeight:1.6 }}>チャレンジを重ねると、●が増えていくよ</div>
      </div>
    </div>
  );
}

Object.assign(window, { ChallengeScreen });
