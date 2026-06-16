// screens-final.jsx — AI相談チャット / チャレンジ(一覧・登録) / 完了の木(EXP)
const { useState: useSf, useEffect: useEf, useRef: useRf } = React;

/* ════════ AI相談チャット ════════ */
// scripted guided flow (元HTML準拠の振り返り対話)
const AI_FLOW = [
  { bot: ['こんにちは！キミのチャレンジを一緒に考えよう', 'まず、最近ちょっとでも「がんばれたな」と思えたことはある？'],
    chips: ['授業で発表できた', '友だちを手伝った', 'うーん、思いつかない'] },
  { bot: ['いいね、それは立派な一歩だよ', 'その時、どんな気持ちだった？'],
    chips: ['うれしかった', 'ドキドキした', 'ホッとした'] },
  { bot: ['なるほど、その気持ち大事にしよう！', 'キミは「行動する創造者」タイプ。アイデアを形にする力があるよ。', '次にやってみたい小さな一歩はどれが近い？'],
    chips: ['新しいことに挑戦', '得意を人にシェア', '苦手をひとつ克服'] },
  { bot: ['ナイス！その一歩、応援してるよ', 'チャレンジに登録しておこう。できたら教えてね！'],
    chips: ['一歩を登録する →'], action: 'next-step' },
];

function AiChatScreen() {
  const nav = useNav();
  const [msgs, setMsgs] = useSf([]);
  const [step, setStep] = useSf(0);
  const [typing, setTyping] = useSf(false);
  const bodyRef = useRf(null);

  const scrollDown = () => { const b = bodyRef.current; if (b) requestAnimationFrame(() => { b.scrollTop = b.scrollHeight; }); };

  // emit a bot turn
  const botTurn = (idx) => {
    const turn = AI_FLOW[idx];
    if (!turn) return;
    setTyping(true);
    let delay = 500;
    turn.bot.forEach((line, i) => {
      setTimeout(() => {
        setMsgs(m => [...m, { who: 'bot', text: line }]);
        if (i === turn.bot.length - 1) setTyping(false);
        scrollDown();
      }, delay);
      delay += 700;
    });
  };

  useEf(() => { botTurn(0); }, []);
  useEf(scrollDown, [msgs, typing]);

  const pick = (chip) => {
    const turn = AI_FLOW[step];
    setMsgs(m => [...m, { who: 'me', text: chip }]);
    if (turn.action) { setTimeout(() => nav.go(turn.action), 400); return; }
    const nextStep = step + 1;
    setStep(nextStep);
    setTimeout(() => botTurn(nextStep), 450);
  };

  const turn = AI_FLOW[step];
  const showChips = !typing && turn && msgs.length > 0 && msgs[msgs.length - 1].who === 'bot';

  return (
    <div className="screen screen--white">
      <StatusBar />
      <div className="appbar">
        <button onClick={() => nav.go('torisetsu')} style={{ border: 'none', background: 'var(--bg)', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }}>
          <Icon name="back" size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--blue),#00BFA5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Icon name="sparkle" size={17} /></div>
          <div>
            <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13 }}>AiGROW アシスタント</div>
            <div style={{ fontSize: 10, color: 'var(--green)', fontWeight: 700 }}>● オンライン</div>
          </div>
        </div>
        <div style={{ width: 38 }}></div>
      </div>

      <div ref={bodyRef} className="scroll" style={{ background: 'var(--bg)', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map((m, i) => (
          m.who === 'bot' ? (
            <div key={i} className="fade-in" style={{ display: 'flex', gap: 8, alignItems: 'flex-end', alignSelf: 'flex-start', maxWidth: '85%' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,var(--blue),#00BFA5)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Icon name="sparkle" size={13} /></div>
              <div style={{ background: '#fff', borderRadius: '4px 16px 16px 16px', padding: '11px 14px', fontSize: 12.5, lineHeight: 1.65, color: 'var(--text)', boxShadow: 'var(--shadow-sm)', fontWeight: 500 }}>{m.text}</div>
            </div>
          ) : (
            <div key={i} className="fade-in" style={{ alignSelf: 'flex-end', maxWidth: '78%' }}>
              <div style={{ background: 'linear-gradient(135deg,#1aa6ff,var(--blue))', color: '#fff', borderRadius: '16px 4px 16px 16px', padding: '11px 14px', fontSize: 12.5, lineHeight: 1.55, fontWeight: 600, boxShadow: 'var(--shadow-blue)' }}>{m.text}</div>
            </div>
          )
        ))}
        {typing && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', alignSelf: 'flex-start' }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,var(--blue),#00BFA5)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Icon name="sparkle" size={13} /></div>
            <div style={{ background: '#fff', borderRadius: '4px 16px 16px 16px', padding: '13px 16px', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 4 }}>
              {[0, 1, 2].map(d => <span key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: '#c3ccd2', animation: `typing 1s ${d * .15}s infinite` }}></span>)}
            </div>
          </div>
        )}
      </div>

      {/* quick reply chips */}
      <div style={{ flexShrink: 0, background: '#fff', borderTop: '1px solid var(--border-soft)', padding: '12px 14px', display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 64, alignItems: 'center' }}>
        {showChips ? turn.chips.map((c, i) => (
          <button key={i} onClick={() => pick(c)} style={{ border: '1.5px solid var(--blue)', background: 'var(--blue-soft)', color: 'var(--blue-dark)', borderRadius: 999, padding: '9px 15px', fontFamily: 'var(--font-round)', fontWeight: 700, fontSize: 12.5, cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>{c}</button>
        )) : <span style={{ fontSize: 11.5, color: 'var(--text-sub)', fontWeight: 600 }}>Aiが入力中…</span>}
      </div>
    </div>
  );
}

/* ════════ チャレンジ ════════ */
function ChallengeScreen() {
  const nav = useNav();
  const initTab = (nav.params && nav.params.tab === 'tree') ? 1 : 0;
  const [tab, setTab] = React.useState(initTab);
  React.useEffect(() => {
    if (nav.params && nav.params.tab === 'tree') setTab(1);
    else if (nav.params && nav.params.tab === 'challenge') setTab(0);
  }, [nav.params && nav.params.tab]);

  return (
    <div className="screen">
      <StatusBar />
      <div style={{ background:'linear-gradient(135deg,#1aa6ff,#0069b5)', padding:'14px 18px 0', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
          <div style={{ width:42, height:42, borderRadius:14, background:'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}><FIcon name="footsteps" size={22} /></div>
          <div>
            <div style={{ fontFamily:'var(--font-round)', fontWeight:900, fontSize:18, color:'#fff' }}>チャレンジ</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,.8)', fontWeight:600 }}>小さな一歩を積み重ねよう</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:4 }}>
          {['チャレンジ中', '完了の木'].map((t,i) => (
            <button key={i} onClick={() => setTab(i)}
              style={{ flex:1, border:'none', cursor:'pointer', padding:'9px 0', fontFamily:'var(--font-round)', fontWeight:800, fontSize:13,
                background:'transparent', color: tab===i?'#fff':'rgba(255,255,255,.55)',
                borderBottom: tab===i?'3px solid #fff':'3px solid transparent', transition:'all .15s' }}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="scroll" style={{ flex:1, minHeight:0 }}>
        {tab===0 ? <ChallengeTab nav={nav} /> : <TreeTab nav={nav} />}
      </div>
    </div>
  );
}

const NS_CHOICES = [
  { icon:'📚', text:'興味のある分野をもっと調べてみる' },
  { icon:'💬', text:'得意なことを友だちにシェアしてみる' },
  { icon:'🚀', text:'気になることにチャレンジしてみる' },
  { icon:'🤝', text:'苦手なことを一つ克服してみる' },
  { icon:'✍️', text:'自分の強みを使える場を探してみる' },
  { icon:'🌱', text:'毎日少しだけ新しいことに触れてみる' },
];
const todayStr = () => { const d = new Date(); return d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0'); };

function ChallengeTab({ nav }) {
  const defaultTasks = [
    { text:'得意なことを友だちにシェアしてみる', date:'2025.04.10', done:false },
    { text:'気になることにチャレンジしてみる', date:'2025.04.15', done:false },
  ];
  const tasks = nav.state.tasks && nav.state.tasks.length ? nav.state.tasks : defaultTasks;
  const pending = tasks.filter(t => !t.done);
  const [selected, setSelected] = React.useState(null);
  const [custom, setCustom] = React.useState('');

  const addTask = (text) => {
    const t = { text, date:todayStr(), done:false };
    nav.update(s => ({ tasks:[...(s.tasks&&s.tasks.length?s.tasks:defaultTasks), t] }));
    setSelected(null); setCustom('');
  };
  const completeTask = (idx) => {
    const list = tasks.map((t,i) => i===idx?{...t,done:true,completedDate:todayStr()}:t);
    nav.update(s => ({ tasks:list, exp:(s.exp||0)+1 }));
  };

  return (
    <div className="pad stack">
      {pending.length > 0 && (
        <>
          <h3 style={{ fontSize:13, fontWeight:800, color:'var(--text-sub)', display:'flex', alignItems:'center', gap:5 }}>チャレンジ中 <FIcon name="fire" size={14} color="var(--orange)" /></h3>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {tasks.map((t,i) => t.done ? null : (
              <div key={i} className="card card--flat" style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 14px' }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700 }}>{t.text}</div>
                  <div style={{ fontSize:10, color:'var(--text-sub)', marginTop:2 }}>登録日: {t.date}</div>
                </div>
                <button onClick={() => completeTask(i)} className="btn btn--green btn--sm" style={{ width:'auto', padding:'9px 14px', flexShrink:0 }}>できた！✓</button>
              </div>
            ))}
          </div>
        </>
      )}
      <h3 style={{ fontSize:13, fontWeight:800, color:'var(--text-sub)', marginTop:4 }}>つぎのチャレンジを選ぼう</h3>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {NS_CHOICES.map((c,i) => {
          const on = selected===c.text;
          return (
            <button key={i} onClick={() => setSelected(on?null:c.text)}
              style={{ textAlign:'left', cursor:'pointer', borderRadius:'var(--r-md)', padding:'13px 15px', fontSize:13, fontWeight:600, display:'flex', alignItems:'center', gap:10,
                color:on?'var(--blue-dark)':'var(--text)',
                border:'2px solid '+(on?'var(--blue)':'var(--border-soft)'),
                background:on?'var(--blue-soft)':'#fff', transition:'all .15s', WebkitTapHighlightColor:'transparent' }}>
              <span style={{ display:'flex', color:on?'var(--blue)':'var(--text-sub)', flexShrink:0 }}><Emo e={c.icon} size={17} /></span>{c.text}
            </button>
          );
        })}
      </div>
      <button className="btn btn--primary" disabled={!selected} onClick={() => selected && addTask(selected)}>この一歩を登録する</button>
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
      <button className="btn btn--ghost" onClick={() => nav.go('ai-chat')} style={{ gap:8 }}>
        <Icon name="sparkle" size={16} /> AIコーチに相談する
      </button>
    </div>
  );
}

const EVO_STAGES = [
  { emoji:'sprout', name:'めばえの冒険者',     lv:'Lv.1-2', note:'最初の一歩を踏み出した！' },
  { emoji:'leaf', name:'成長の探求者',       lv:'Lv.3-5', note:'あと少しでアンロック！' },
  { emoji:'tree', name:'挑戦のパイオニア',   lv:'Lv.6-9', note:'' },
  { emoji:'star', name:'伝説の可能性開拓者', lv:'Lv.10+', note:'' },
];

function TreeTab({ nav }) {
  const baseExp = 2;
  const exp = baseExp + (nav.state.exp||0);
  const level = Math.max(1, Math.floor(exp/3)+1);
  const inLevel = exp%3;
  const stageIdx = level<=2?0:level<=5?1:level<=9?2:3;
  const stage = EVO_STAGES[stageIdx];
  const baseCompleted = [
    { text:'自己評価を受検する', date:'2025.04.01' },
    { text:'トリセツを読み返してみる', date:'2025.04.08' },
  ];
  const userCompleted = (nav.state.tasks||[]).filter(t=>t.done).map(t=>({ text:t.text, date:t.completedDate||todayStr() }));
  const completed = [...baseCompleted, ...userCompleted];

  return (
    <div className="pad stack">
      <div style={{ background:'linear-gradient(135deg,#1aa6ff,#0069b5)', borderRadius:'var(--r-lg)', padding:16, color:'#fff', display:'flex', alignItems:'center', gap:14, boxShadow:'var(--shadow-blue)' }}>
        <div style={{ width:60, height:60, borderRadius:'50%', background:'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:'#fff' }}><FIcon name={stage.emoji==='tree'?'leaf':stage.emoji} size={30} /></div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:9.5, opacity:.8, fontWeight:700, letterSpacing:1 }}>キミの分身</div>
          <div style={{ fontFamily:'var(--font-round)', fontSize:17, fontWeight:900, margin:'2px 0' }}>{stage.name}</div>
          <div style={{ fontSize:11, opacity:.85 }}>Lv.{level}　次のLvまであと {3-inLevel} 歩！</div>
        </div>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily:'var(--font-round)', fontSize:26, fontWeight:900 }}>{level}</div>
          <div style={{ fontSize:8.5, opacity:.7, letterSpacing:1 }}>LEVEL</div>
        </div>
      </div>
      <div className="card">
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text-sub)', marginBottom:7, fontWeight:600 }}>
          <span>経験値（EXP）</span><span style={{ fontWeight:800, color:'var(--blue)' }}>{inLevel} / 3</span>
        </div>
        <div style={{ height:12, background:'var(--bg)', borderRadius:6, overflow:'hidden' }}>
          <div style={{ width:(inLevel/3*100)+'%', height:'100%', background:'linear-gradient(90deg,var(--blue),#5cb8ff)', borderRadius:6, transition:'width .6s cubic-bezier(.2,.8,.2,1)' }}></div>
        </div>
        <div style={{ fontSize:10, color:'var(--text-sub)', marginTop:6 }}>チャレンジを完了するたびにEXPが増えます</div>
      </div>
      <div className="card">
        <div style={{ fontSize:12.5, fontWeight:800, marginBottom:12 }}>進化ロードマップ</div>
        {EVO_STAGES.map((s,i) => {
          const isCur=i===stageIdx, passed=i<stageIdx, last=i===EVO_STAGES.length-1, op=passed||isCur?1:0.4;
          return (
            <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div style={{ width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, opacity:op,
                  background:isCur?'var(--blue-soft)':passed?'var(--green-soft)':'var(--bg)',
                  border:'2px solid '+(isCur?'var(--blue)':passed?'var(--green)':'var(--border)'), color:isCur?'var(--blue)':passed?'var(--green)':'var(--text-sub)' }}><FIcon name={s.emoji==='tree'?'leaf':s.emoji} size={18} /></div>
                {!last&&<div style={{ width:2, height:26, background:passed?'var(--green)':isCur?'var(--blue)':'var(--border)' }}></div>}
              </div>
              <div style={{ paddingTop:5, opacity:op }}>
                <div style={{ fontSize:12, fontWeight:800, color:isCur?'var(--blue)':'var(--text)' }}>{s.lv}　{s.name}{isCur&&' ← 現在'}</div>
                {s.note&&<div style={{ fontSize:10, color:'var(--text-sub)', marginTop:2 }}>{s.note}</div>}
              </div>
            </div>
          );
        })}
      </div>
      <h3 style={{ fontSize:13, fontWeight:800, color:'var(--text-sub)' }}>完了したチャレンジ</h3>
      {completed.length ? (
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {completed.map((t,i) => (
            <div key={i} className="card card--flat" style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px' }}>
              <div style={{ width:24, height:24, borderRadius:'50%', background:'var(--green)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700 }}>{t.text}</div>
                <div style={{ fontSize:10, color:'var(--text-sub)', marginTop:1 }}>完了日: {t.date}　+1 EXP</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize:12, color:'var(--text-sub)', textAlign:'center', padding:'16px 0' }}>まだ完了したチャレンジがありません。<br/>最初の一歩を踏み出そう！</p>
      )}
    </div>
  );
}

Object.assign(window, { AiChatScreen, ChallengeScreen });
