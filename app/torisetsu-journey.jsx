// torisetsu-journey.jsx — トリセツ画面の新UXジャーニー（STEP 2〜5）
// STEP 2: 強みTOP3 / STEP 3: みんなの発見(声) / STEP 4: 未来のヒント＋目標設定 / STEP 5: 行動支援
const { useState: useTJ } = React;

const TJ = {
  blue:'#0096fa', blueDark:'#0069b5', blueSoft:'#e7f4ff',
  orange:'#FC8524', orangeSoft:'#fff3e0', green:'#00c853', greenSoft:'#e4f9ec',
  text:'#464a4d', sub:'#8c8c8c', border:'#ececec', bg:'#f8f9fb', surface:'#fff',
  font:"'Noto Sans JP',sans-serif", round:"'M PLUS Rounded 1c','Noto Sans JP',sans-serif",
  shadow:'0 1px 3px rgba(20,40,60,.08)',
  blueGrad:'linear-gradient(135deg,#1aa6ff,#0069b5)',
  orangeGrad:'linear-gradient(135deg,#ff9d3f,#FC8524)',
};

/* ── ステップ見出し ── */
function StepHead({ n, title, sub }) {
  return (
    <div style={{ padding:'6px 2px 0' }}>
      <div style={{ fontFamily:TJ.round, fontWeight:800, fontSize:10, letterSpacing:2, color:TJ.blue }}>STEP {n} / 5</div>
      <div style={{ fontFamily:TJ.round, fontWeight:900, fontSize:19, color:TJ.text, lineHeight:1.3, marginTop:3 }}>{title}</div>
      {sub && <div style={{ fontSize:11.5, color:TJ.sub, fontWeight:600, marginTop:3 }}>{sub}</div>}
    </div>
  );
}

function JCard({ children, style }) {
  return <div style={{ background:TJ.surface, borderRadius:14, padding:16, boxShadow:TJ.shadow, ...style }}>{children}</div>;
}

/* ════════ STEP 2: 強みTOP3 ════════ */
const TOP3 = [
  { rank:1, medal:'🥇', name:'外交性', score:90, desc:'人と関わりながら、場を動かす力' },
  { rank:2, medal:'🥈', name:'個人的実行力', score:88, desc:'決めたことを、最後までやり切る力' },
  { rank:3, medal:'🥉', name:'創造力', score:82, desc:'新しいアイデアを生み出す力' },
];
function Top3Section() {
  return (
    <JCard>
      <div style={{ fontSize:11, color:TJ.sub, fontWeight:700, marginBottom:12 }}>自己評価 × みんなの評価 の総合</div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {TOP3.map(s => (
          <div key={s.rank} style={{ display:'flex', alignItems:'center', gap:12, background:s.rank===1?'#fffaf0':TJ.bg, borderRadius:12, padding:'12px 14px', border:s.rank===1?'1.5px solid #ffd9a8':'1.5px solid transparent' }}>
            <span style={{ fontSize:26, flexShrink:0 }}>{s.medal}</span>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
                <span style={{ fontFamily:TJ.round, fontWeight:900, fontSize:15, color:TJ.text }}>{s.name}</span>
                <span style={{ fontFamily:TJ.round, fontWeight:800, fontSize:13, color:TJ.blue }}>{s.score}</span>
              </div>
              <div style={{ fontSize:11, color:TJ.sub, fontWeight:600, marginTop:2 }}>{s.desc}</div>
              <div style={{ height:6, background:'#e8ecef', borderRadius:3, marginTop:6, overflow:'hidden' }}>
                <div style={{ width:`${s.score}%`, height:'100%', borderRadius:3, background:s.rank===1?TJ.orangeGrad:TJ.blueGrad }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </JCard>
  );
}

/* ════════ STEP 3: みんなの発見（4カテゴリ＋吹き出し） ════════ */
const DISCOVER_CATS = [
  {
    title: '誰もが認めているキミの強み',
    color: '#0096fa', bg: '#E3F2FD', tagColor: '#0069b5',
    tags: ['共感・傾聴力', '外交性', '個人的実行力', '寛容', '誠実さ'],
    voices: ['よく話を聞いてくれる', '場の空気をパッと明るくしてくれる', '決めたことを最後までやり切る'],
  },
  {
    title: '自分では気づいていないキミの強み',
    color: '#FC8524', bg: '#FFF3E0', tagColor: '#E65100',
    tags: ['組織への働きかけ', '柔軟性', '耐性'],
    voices: ['困っていても折れずに続けられる', 'グループをそっとまとめてくれる'],
    note: '周りはちゃんと気づいてるよ。まだ実感がなくてもOK！',
  },
  {
    title: '周りはまだ気づいていないキミの強み',
    color: '#00838F', bg: '#E0F4F7', tagColor: '#006064',
    tags: ['創造性', 'ヴィジョン', '内的価値'],
    voices: ['自分の中にちゃんとこだわりがある', 'ユニークな視点でアイデアを出す'],
    note: 'もっと積極的に出していくと、もっと伝わるよ！',
  },
  {
    title: 'これからのびる潜在的な能力',
    color: '#757575', bg: '#F5F5F5', tagColor: '#424242',
    tags: ['論理的思考', '課題設定', '疑う力'],
    voices: ['意識して取り組めば、必ず伸びる力'],
    note: '今は低くても大丈夫。意識した瞬間から変わり始めるよ。',
  },
];

function Bubble({ text }) {
  return (
    <div style={{ position:'relative', background:TJ.bg, borderRadius:'4px 12px 12px 12px', padding:'8px 12px', fontSize:11.5, color:TJ.text, fontWeight:600, lineHeight:1.6, fontFamily:TJ.font }}>
      「{text}」
    </div>
  );
}

function VoicesSection() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      <JCard style={{ padding:'12px 15px', background:TJ.blueSoft, boxShadow:'none' }}>
        <div style={{ fontSize:12, color:TJ.blueDark, fontWeight:700, lineHeight:1.7 }}>まわりのみんなが見つけたキミの姿。4つの視点で見てみよう 🔍</div>
      </JCard>

      {DISCOVER_CATS.map((cat, ci) => (
        <JCard key={ci} style={{ padding:0, overflow:'hidden' }}>
          {/* カテゴリヘッダー */}
          <div style={{ background:cat.color, color:'#fff', padding:'9px 15px', fontSize:12, fontWeight:800, fontFamily:TJ.round }}>{cat.title}</div>
          <div style={{ padding:'13px 15px', display:'flex', flexDirection:'column', gap:10 }}>
            {/* タグ */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {cat.tags.map(t => (
                <span key={t} style={{ background:cat.bg, color:cat.tagColor, fontSize:11, fontWeight:800, padding:'4px 11px', borderRadius:4, fontFamily:TJ.round }}>{t}</span>
              ))}
            </div>
            {/* 吹き出し */}
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {cat.voices.map((v, vi) => <Bubble key={vi} text={v} />)}
            </div>
            {/* 補足メモ */}
            {cat.note && (
              <div style={{ fontSize:10.5, color:cat.tagColor, fontWeight:700, background:cat.bg, borderRadius:8, padding:'7px 10px', lineHeight:1.6 }}>{cat.note}</div>
            )}
          </div>
        </JCard>
      ))}

      <div style={{ background:TJ.blueGrad, borderRadius:14, padding:'14px 17px', color:'#fff' }}>
        <div style={{ fontFamily:TJ.round, fontWeight:900, fontSize:13, marginBottom:4 }}>✨ これ、ぜんぶ本当にあったことだよ</div>
        <div style={{ fontSize:11, lineHeight:1.75, opacity:.92, fontWeight:500 }}>まわりの人が実際に感じたキミの姿。毎日の中で積み重ねてきた証拠だよ。自信を持っていい！</div>
      </div>
    </div>
  );
}

/* ════════ STEP 4: 未来のヒント＋目標設定 ════════ */
const CAREERS_PURE = [
  { id:'planner', icon:'💡', title:'商品企画・プランナー', why:'創造力 × 個人的実行力',
    desc:'新しい商品やサービスを考えて形にする仕事。アイデアを出してすぐ動けるキミにぴったり。',
    comps:[['創造力',82,86],['論理的思考',55,70],['課題設定',58,70]],
    actions:['気になる商品が「なぜ人気か」を3つ分析してみる','友だちの困りごとを1つ見つけて解決アイデアを出す'] },
  { id:'producer', icon:'🚀', title:'起業家・プロデューサー', why:'影響力の行使 × 個人的実行力',
    desc:'人を巻き込みながら新しいことを立ち上げる仕事。「まずやってみる」キミの行動力が核になる。',
    comps:[['影響力の行使',80,90],['組織への働きかけ',70,85],['論理的思考',55,72]],
    actions:['文化祭・行事で企画リーダーに立候補する','やりたい企画を紙1枚にまとめて誰かに見せる'] },
  { id:'marketer', icon:'📣', title:'マーケター・広報', why:'表現力 × 外交性',
    desc:'モノやサービスの魅力を伝えて、人の心を動かす仕事。伝える力と人懐っこさが武器になる。',
    comps:[['表現力',78,88],['創造力',82,86],['論理的思考',55,68]],
    actions:['好きなものの魅力をSNS風に1投稿書いてみる','クラスのお知らせポスターを作ってみる'] },
];
const INTERESTS = [
  { key:'スポーツ', icon:'⚽', career:{ id:'i-sports', icon:'🏟️', title:'スポーツイベントプランナー', why:'興味「スポーツ」× 強み「実行力・外交性」', desc:'大会やイベントを企画・運営して、スポーツの楽しさを届ける仕事。', comps:[['組織への働きかけ',70,82],['課題設定',58,70]], actions:['クラスマッチの運営係に立候補する','部活の練習メニューを1つ提案してみる'] } },
  { key:'音楽', icon:'🎵', career:{ id:'i-music', icon:'🎧', title:'音楽プロデューサー', why:'興味「音楽」× 強み「創造力・表現力」', desc:'アーティストや楽曲の魅力を引き出して世に送り出す仕事。', comps:[['創造力',82,88],['表現力',78,85]], actions:['行事のBGM・選曲係をやってみる','好きな曲の「良さ」を言葉にして友だちに紹介する'] } },
  { key:'ゲーム', icon:'🎮', career:{ id:'i-game', icon:'🕹️', title:'ゲームプランナー', why:'興味「ゲーム」× 強み「創造力」', desc:'ゲームの企画・ルール・体験を設計する仕事。「面白さ」を作る側に回る。', comps:[['創造力',82,88],['論理的思考',55,72]], actions:['好きなゲームの「面白さの仕組み」を3つ書き出す','かんたんなゲーム企画書を1枚作ってみる'] } },
  { key:'ものづくり', icon:'🔧', career:{ id:'i-craft', icon:'🛠️', title:'プロダクトデザイナー', why:'興味「ものづくり」× 強み「創造力・実行力」', desc:'使う人のことを考えて、カタチあるものを生み出す仕事。', comps:[['創造力',82,88],['課題設定',58,72]], actions:['身の回りの「使いにくい物」の改善案をスケッチする','文化祭の装飾・制作係に参加する'] } },
  { key:'アート・デザイン', icon:'🎨', career:{ id:'i-art', icon:'🖌️', title:'UI/UXデザイナー', why:'興味「アート」× 強み「創造力・共感力」', desc:'アプリやサービスの「使いやすさ」と「美しさ」をデザインする仕事。', comps:[['創造力',82,90],['共感・傾聴力',74,80]], actions:['毎日1つ「いいデザイン」を見つけて記録する','学校行事のポスターづくりに挑戦する'] } },
  { key:'文章を書く', icon:'✍️', career:{ id:'i-write', icon:'📝', title:'編集者・ライター', why:'興味「文章」× 強み「表現力」', desc:'言葉で情報や物語を届ける仕事。伝える力がそのまま武器になる。', comps:[['表現力',78,88],['論理的思考',55,70]], actions:['今日感じたことを3行で書く習慣をつける','学級新聞・部誌の記事を1本書いてみる'] } },
  { key:'動画・配信', icon:'🎬', career:{ id:'i-video', icon:'📹', title:'映像クリエイター', why:'興味「動画」× 強み「創造力・表現力」', desc:'映像で人を楽しませ、心を動かすコンテンツを作る仕事。', comps:[['創造力',82,86],['表現力',78,88]], actions:['1分の紹介動画を撮って編集してみる','好きな動画の「構成」を分析してみる'] } },
  { key:'人と話す', icon:'💬', career:{ id:'i-talk', icon:'🤝', title:'キャリアコーチ・営業', why:'興味「人と話す」× 強み「外交性・傾聴力」', desc:'人の話を聞き、その人に合った提案で背中を押す仕事。', comps:[['共感・傾聴力',74,85],['外交性',90,92]], actions:['初対面の人に自分から話しかけてみる','友だちの相談に「聞き役」として乗ってみる'] } },
  { key:'科学・実験', icon:'🔬', career:{ id:'i-sci', icon:'🧪', title:'研究開発エンジニア', why:'興味「科学」× 強み「実行力」', desc:'「なぜ？」を追いかけて、新しい技術や発見を生む仕事。', comps:[['論理的思考',55,75],['課題設定',58,72]], actions:['身近な「なぜ?」を1つ調べてまとめてみる','自由研究のテーマを3つ考えてみる'] } },
];
const ALL_CAREERS = [...CAREERS_PURE, ...INTERESTS.map(i => i.career)];

function GapBar({ name, now, target }) {
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:4 }}>
        <span style={{ fontSize:11.5, fontWeight:700, color:TJ.text }}>{name}</span>
        <span style={{ fontSize:10.5, fontWeight:800, color:TJ.orange }}>いま {now} → 目標 {target}（あと +{target-now}）</span>
      </div>
      <div style={{ position:'relative', height:10, background:'#e8ecef', borderRadius:5 }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:`${now}%`, background:TJ.blueGrad, borderRadius:5 }}></div>
        <div style={{ position:'absolute', left:`${target}%`, top:-3, bottom:-3, width:3, background:TJ.orange, borderRadius:2 }}></div>
      </div>
    </div>
  );
}

function CareerCard({ c, selected, onSelect }) {
  return (
    <button onClick={() => onSelect(c.id)}
      style={{ textAlign:'left', width:'100%', cursor:'pointer', background:selected?TJ.blueSoft:TJ.surface, border:`2px solid ${selected?TJ.blue:TJ.border}`, borderRadius:14, padding:'14px 15px', transition:'all .15s', boxShadow:selected?'0 4px 14px rgba(0,150,250,.18)':TJ.shadow }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
        <span style={{ fontSize:24, flexShrink:0 }}>{c.icon}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:TJ.round, fontWeight:900, fontSize:14, color:TJ.text }}>{c.title}</div>
          <div style={{ fontSize:10, color:TJ.blue, fontWeight:700, marginTop:1 }}>{c.why}</div>
        </div>
        <div style={{ width:22, height:22, borderRadius:'50%', flexShrink:0, border:`2px solid ${selected?TJ.blue:'#d6d6d6'}`, background:selected?TJ.blue:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {selected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
        </div>
      </div>
      <div style={{ fontSize:11.5, color:TJ.sub, lineHeight:1.65, fontWeight:500 }}>{c.desc}</div>
    </button>
  );
}

/* ════════ メイン：STEP 2〜5 ════════ */
function TorisetsuJourneyExt({ nav, goChallenge }) {
  const saved = (nav.state && nav.state.career) || {};
  const [interests, setInterests] = useTJ(saved.interests || []);
  const [custom, setCustom] = useTJ(saved.custom || '');
  const [showMix, setShowMix] = useTJ((saved.interests || []).length > 0);
  const [goalId, setGoalId] = useTJ(saved.goalId || null);
  const [pickedActions, setPickedActions] = useTJ([]);
  const [registered, setRegistered] = useTJ(false);

  const persist = (patch) => nav.update && nav.update({ career: { interests, custom, goalId, ...patch } });

  const toggleInterest = (k) => {
    const next = interests.includes(k) ? interests.filter(x => x !== k) : [...interests, k];
    setInterests(next); persist({ interests: next });
  };
  const selectGoal = (id) => {
    const next = goalId === id ? null : id;
    setGoalId(next); setPickedActions([]); setRegistered(false); persist({ goalId: next });
  };
  const toggleAction = (a) => {
    setPickedActions(p => p.includes(a) ? p.filter(x => x !== a) : [...p, a]);
  };
  const registerChallenge = () => {
    if (!pickedActions.length) return;
    const d = new Date();
    const date = `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
    nav.update(s => ({ tasks: [...(s.tasks || []), ...pickedActions.map(text => ({ text, date, done:false }))] }));
    setRegistered(true);
    setTimeout(() => goChallenge && goChallenge(), 600);
  };

  const goal = ALL_CAREERS.find(c => c.id === goalId);
  const mixCareers = INTERESTS.filter(i => interests.includes(i.key)).map(i => i.career);

  return (
    <>
      {/* ── STEP 2 ── */}
      <StepHead n={2} title="キミの強み TOP3" sub="まずはここから。キミのいちばんの武器" />
      <Top3Section />

      {/* ── STEP 3 ── */}
      <StepHead n={3} title="みんなの発見" sub="まわりの人が見つけたキミの良さ" />
      <VoicesSection />

      {/* ── STEP 4 ── */}
      <StepHead n={4} title="キミの強みが活きる未来のヒント" sub="この強み、こんな仕事で活きるかも" />
      <div style={{ fontSize:11, color:TJ.sub, fontWeight:700, padding:'0 2px' }}>📖 トリセツからの提案</div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {CAREERS_PURE.map(c => <CareerCard key={c.id} c={c} selected={goalId===c.id} onSelect={selectGoal} />)}
      </div>

      {/* 興味・得意の入力 */}
      <JCard>
        <div style={{ fontFamily:TJ.round, fontWeight:800, fontSize:13, color:TJ.text, marginBottom:4 }}>🔎 キミの興味・得意をえらぶ</div>
        <div style={{ fontSize:11, color:TJ.sub, fontWeight:600, marginBottom:12, lineHeight:1.6 }}>興味をえらぶと、トリセツ × 興味 のかけ算で提案が変わるよ</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:12 }}>
          {INTERESTS.map(i => {
            const on = interests.includes(i.key);
            return (
              <button key={i.key} onClick={() => toggleInterest(i.key)}
                style={{ border:`1.5px solid ${on?TJ.blue:'#d6d6d6'}`, background:on?TJ.blueSoft:'#fff', color:on?TJ.blueDark:TJ.sub, borderRadius:999, padding:'8px 14px', fontFamily:TJ.round, fontWeight:700, fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
                <span>{i.icon}</span>{i.key}
              </button>
            );
          })}
        </div>
        <input value={custom} onChange={e => { setCustom(e.target.value); }} onBlur={() => persist({ custom })}
          placeholder="その他（自由に入力：例 料理、宇宙、ファッション…）"
          style={{ width:'100%', border:'1.5px solid #d6d6d6', borderRadius:10, padding:'10px 12px', fontSize:12, fontFamily:TJ.font, color:TJ.text, outline:'none', boxSizing:'border-box' }} />
        {!showMix && (
          <button onClick={() => interests.length && setShowMix(true)} disabled={!interests.length}
            style={{ width:'100%', marginTop:12, background:interests.length?TJ.blueGrad:'#d6d6d6', color:'#fff', border:'none', borderRadius:999, padding:'13px', fontFamily:TJ.round, fontWeight:800, fontSize:14, cursor:interests.length?'pointer':'default', boxShadow:interests.length?'0 6px 16px rgba(0,150,250,.3)':'none' }}>
            興味をふまえた提案を見る ✨
          </button>
        )}
      </JCard>

      {/* 興味 × 強み の提案 */}
      {showMix && mixCareers.length > 0 && (
        <>
          <div style={{ fontSize:11, color:TJ.sub, fontWeight:700, padding:'0 2px' }}>✨ キミの興味 × 強み からの提案</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {mixCareers.map(c => <CareerCard key={c.id} c={c} selected={goalId===c.id} onSelect={selectGoal} />)}
          </div>
        </>
      )}

      {/* 目標までの現在地（ギャップ） */}
      {goal && (
        <>
          <JCard style={{ border:`2px solid ${TJ.blue}`, boxShadow:'0 6px 20px rgba(0,150,250,.14)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:4 }}>
              <span style={{ fontSize:20 }}>{goal.icon}</span>
              <div style={{ fontFamily:TJ.round, fontWeight:900, fontSize:14, color:TJ.text }}>「{goal.title}」までの現在地</div>
            </div>
            <div style={{ fontSize:11, color:TJ.sub, fontWeight:600, marginBottom:14, lineHeight:1.6 }}>この仕事で活きるコンピテンシーと、いまのキミの数値だよ</div>
            {goal.comps.map(([name, now, target]) => <GapBar key={name} name={name} now={now} target={target} />)}
            <div style={{ marginTop:4, background:TJ.orangeSoft, borderRadius:10, padding:'10px 12px', fontSize:11, color:'#9a6a2e', fontWeight:700, lineHeight:1.65 }}>
              💡 足りない分は「のびしろ」。下のアクションで少しずつ近づけるよ
            </div>
          </JCard>

          {/* ── STEP 5 ── */}
          <StepHead n={5} title="つぎのチャレンジをえらぼう" sub="目標に近づくアクションをチャレンジに登録" />
          <JCard>
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:14 }}>
              {goal.actions.map((a, i) => {
                const on = pickedActions.includes(a);
                return (
                  <button key={i} onClick={() => toggleAction(a)}
                    style={{ textAlign:'left', display:'flex', alignItems:'center', gap:11, cursor:'pointer', background:on?TJ.greenSoft:TJ.bg, border:`2px solid ${on?TJ.green:'transparent'}`, borderRadius:12, padding:'12px 13px', transition:'all .15s' }}>
                    <div style={{ width:22, height:22, borderRadius:7, flexShrink:0, border:`2px solid ${on?TJ.green:'#c8cdd2'}`, background:on?TJ.green:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      {on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    <span style={{ fontSize:12.5, color:TJ.text, fontWeight:700, lineHeight:1.55 }}>{a}</span>
                  </button>
                );
              })}
            </div>
            {registered ? (
              <div style={{ textAlign:'center', background:TJ.greenSoft, borderRadius:12, padding:'13px', fontFamily:TJ.round, fontWeight:800, fontSize:13, color:'#2E7D32' }}>🎉 チャレンジに登録したよ！</div>
            ) : (
              <button onClick={registerChallenge} disabled={!pickedActions.length}
                style={{ width:'100%', background:pickedActions.length?TJ.orangeGrad:'#d6d6d6', color:'#fff', border:'none', borderRadius:999, padding:'14px', fontFamily:TJ.round, fontWeight:800, fontSize:14, cursor:pickedActions.length?'pointer':'default', boxShadow:pickedActions.length?'0 8px 20px rgba(252,133,36,.34)':'none' }}>
                👣 チャレンジに登録する{pickedActions.length ? `（${pickedActions.length}件）` : ''}
              </button>
            )}
          </JCard>
        </>
      )}
      {!goal && (
        <div style={{ fontSize:11.5, color:TJ.sub, fontWeight:600, textAlign:'center', padding:'2px 0 6px', lineHeight:1.7 }}>
          ☝️ 気になる仕事をえらぶと、目標までの現在地と<br/>「つぎのチャレンジ」が見られるよ
        </div>
      )}
    </>
  );
}

/* ── STEP 2+3 のみ（トリセツタブ用） ── */
function TorisetsuStrengths() {
  return (
    <>
      <StepHead n={2} title="キミの強み TOP3" sub="まずはここから。キミのいちばんの武器" />
      <Top3Section />
      <StepHead n={3} title="みんなの発見" sub="まわりの人が見つけたキミの良さ" />
      <VoicesSection />
    </>
  );
}

/* ── STEP 4+5 のみ（未来のヒントタブ用） ── */
function TorisetsuFuture({ nav, goChallenge, step, goBack }) {
  const saved = (nav.state && nav.state.career) || {};
  const [interests, setInterests] = useTJ(saved.interests || []);
  const [custom, setCustom] = useTJ(saved.custom || '');
  const [showMix, setShowMix] = useTJ((saved.interests || []).length > 0);
  const [goalId, setGoalId] = useTJ(saved.goalId || null);
  const [pickedActions, setPickedActions] = useTJ([]);
  const [registered, setRegistered] = useTJ(false);

  const persist = (patch) => nav.update && nav.update({ career: { interests, custom, goalId, ...patch } });
  const toggleInterest = (k) => { const next = interests.includes(k) ? interests.filter(x=>x!==k) : [...interests,k]; setInterests(next); persist({interests:next}); };
  const selectGoal = (id) => { const next = goalId===id?null:id; setGoalId(next); setPickedActions([]); setRegistered(false); persist({goalId:next}); };
  const toggleAction = (a) => setPickedActions(p=>p.includes(a)?p.filter(x=>x!==a):[...p,a]);
  const registerChallenge = () => {
    if(!pickedActions.length) return;
    const d=new Date(), date=`${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
    nav.update(s=>({tasks:[...(s.tasks||[]),...pickedActions.map(text=>({text,date,done:false}))]}));
    setRegistered(true);
    setTimeout(()=>goChallenge&&goChallenge(),600);
  };
  const goal = ALL_CAREERS.find(c=>c.id===goalId);
  const mixCareers = INTERESTS.filter(i=>interests.includes(i.key)).map(i=>i.career);

  const gapCard = goal ? (
    <JCard style={{border:`2px solid ${TJ.blue}`,boxShadow:'0 6px 20px rgba(0,150,250,.14)'}}>
      <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:4}}>
        <span style={{fontSize:20}}>{goal.icon}</span>
        <div style={{fontFamily:TJ.round,fontWeight:900,fontSize:14,color:TJ.text}}>「{goal.title}」までの現在地</div>
      </div>
      <div style={{fontSize:11,color:TJ.sub,fontWeight:600,marginBottom:14,lineHeight:1.6}}>この仕事で活きるコンピテンシーと、いまのキミの数値だよ</div>
      {goal.comps.map(([name,now,target])=><GapBar key={name} name={name} now={now} target={target}/>)}
      <div style={{marginTop:4,background:TJ.orangeSoft,borderRadius:10,padding:'10px 12px',fontSize:11,color:'#9a6a2e',fontWeight:700,lineHeight:1.65}}>💡 足りない分は「のびしろ」。アクションで少しずつ近づけるよ</div>
    </JCard>
  ) : null;

  /* ── STEP 5: つぎのチャレンジ ── */
  if (step === 5) {
    if (!goal) return (
      <JCard style={{textAlign:'center',padding:'28px 18px'}}>
        <div style={{fontSize:36,marginBottom:8}}>🎯</div>
        <div style={{fontFamily:TJ.round,fontWeight:900,fontSize:14.5,color:TJ.text,marginBottom:6}}>まだ目標がえらばれていないよ</div>
        <p style={{fontSize:11.5,color:TJ.sub,lineHeight:1.7,margin:'0 0 16px'}}>ひとつ前のSTEPにもどって、<br/>気になる仕事をえらんでみよう</p>
        <button onClick={()=>goBack&&goBack()}
          style={{background:TJ.blueGrad,color:'#fff',border:'none',borderRadius:999,padding:'12px 26px',fontFamily:TJ.round,fontWeight:800,fontSize:13,cursor:'pointer',boxShadow:'0 6px 16px rgba(0,150,250,.3)'}}>
          ← 目標をえらびに行く
        </button>
      </JCard>
    );
    return (
      <>
        {gapCard}
        <StepHead n={5} title="つぎのチャレンジをえらぼう" sub="目標に近づくアクションをチャレンジに登録"/>
        <JCard>
          <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:14}}>
            {goal.actions.map((a,i)=>{const on=pickedActions.includes(a);return(
              <button key={i} onClick={()=>toggleAction(a)}
                style={{textAlign:'left',display:'flex',alignItems:'center',gap:11,cursor:'pointer',background:on?TJ.greenSoft:TJ.bg,border:`2px solid ${on?TJ.green:'transparent'}`,borderRadius:12,padding:'12px 13px',transition:'all .15s'}}>
                <div style={{width:22,height:22,borderRadius:7,flexShrink:0,border:`2px solid ${on?TJ.green:'#c8cdd2'}`,background:on?TJ.green:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {on&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <span style={{fontSize:12.5,color:TJ.text,fontWeight:700,lineHeight:1.55}}>{a}</span>
              </button>
            );})}
          </div>
          {registered?(
            <div style={{textAlign:'center',background:TJ.greenSoft,borderRadius:12,padding:'13px',fontFamily:TJ.round,fontWeight:800,fontSize:13,color:'#2E7D32'}}>🎉 チャレンジに登録したよ！</div>
          ):(
            <button onClick={registerChallenge} disabled={!pickedActions.length}
              style={{width:'100%',background:pickedActions.length?TJ.orangeGrad:'#d6d6d6',color:'#fff',border:'none',borderRadius:999,padding:'14px',fontFamily:TJ.round,fontWeight:800,fontSize:14,cursor:pickedActions.length?'pointer':'default',boxShadow:pickedActions.length?'0 8px 20px rgba(252,133,36,.34)':'none'}}>
              👣 チャレンジに登録する{pickedActions.length?`（${pickedActions.length}件）`:''}
            </button>
          )}
        </JCard>
      </>
    );
  }

  /* ── STEP 4: 未来のヒント ── */
  return (
    <>
      <StepHead n={4} title="キミの強みが活きる未来のヒント" sub="この強み、こんな仕事で活きるかも" />
      <div style={{fontSize:11,color:TJ.sub,fontWeight:700,padding:'0 2px'}}>📖 トリセツからの提案</div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {CAREERS_PURE.map(c=><CareerCard key={c.id} c={c} selected={goalId===c.id} onSelect={selectGoal}/>)}
      </div>
      <JCard>
        <div style={{fontFamily:TJ.round,fontWeight:800,fontSize:13,color:TJ.text,marginBottom:4}}>🔎 キミの興味・得意をえらぶ</div>
        <div style={{fontSize:11,color:TJ.sub,fontWeight:600,marginBottom:12,lineHeight:1.6}}>興味をえらぶと、トリセツ × 興味 のかけ算で提案が変わるよ</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:12}}>
          {INTERESTS.map(i=>{const on=interests.includes(i.key);return(
            <button key={i.key} onClick={()=>toggleInterest(i.key)}
              style={{border:`1.5px solid ${on?TJ.blue:'#d6d6d6'}`,background:on?TJ.blueSoft:'#fff',color:on?TJ.blueDark:TJ.sub,borderRadius:999,padding:'8px 14px',fontFamily:TJ.round,fontWeight:700,fontSize:12,cursor:'pointer',display:'flex',alignItems:'center',gap:5}}>
              <span>{i.icon}</span>{i.key}
            </button>
          );})}
        </div>
        <input value={custom} onChange={e=>setCustom(e.target.value)} onBlur={()=>persist({custom})}
          placeholder="その他（自由に入力：例 料理、宇宙、ファッション…）"
          style={{width:'100%',border:'1.5px solid #d6d6d6',borderRadius:10,padding:'10px 12px',fontSize:12,fontFamily:TJ.font,color:TJ.text,outline:'none',boxSizing:'border-box'}}/>
        {!showMix&&(
          <button onClick={()=>interests.length&&setShowMix(true)} disabled={!interests.length}
            style={{width:'100%',marginTop:12,background:interests.length?TJ.blueGrad:'#d6d6d6',color:'#fff',border:'none',borderRadius:999,padding:'13px',fontFamily:TJ.round,fontWeight:800,fontSize:14,cursor:interests.length?'pointer':'default',boxShadow:interests.length?'0 6px 16px rgba(0,150,250,.3)':'none'}}>
            興味をふまえた提案を見る ✨
          </button>
        )}
      </JCard>
      {showMix&&mixCareers.length>0&&(
        <>
          <div style={{fontSize:11,color:TJ.sub,fontWeight:700,padding:'0 2px'}}>✨ キミの興味 × 強み からの提案</div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {mixCareers.map(c=><CareerCard key={c.id} c={c} selected={goalId===c.id} onSelect={selectGoal}/>)}
          </div>
        </>
      )}
      {goal&&gapCard}
      {goal&&<div style={{fontSize:11.5,color:TJ.sub,fontWeight:700,textAlign:'center',padding:'2px 0 4px'}}>下の「つぎへ →」で、つぎのチャレンジをえらぼう ✨</div>}
      {!goal&&(
        <div style={{fontSize:11.5,color:TJ.sub,fontWeight:600,textAlign:'center',padding:'2px 0 6px',lineHeight:1.7}}>
          ☝️ 気になる仕事をえらぶと、目標までの現在地と<br/>「つぎのチャレンジ」が見られるよ
        </div>
      )}
    </>
  );
}

/* ── ステップインジケーター＆フッターナビ（トリセツ統合UI） ── */
const TORI_STEPS = ['トリセツ','強みTOP3','みんなの発見','未来のヒント','つぎのチャレンジ'];

const TORI_STEP_CHIPS = [['📖','トリセツ'],['🏆','強みTOP3'],['💬','みんなの発見'],['💡','未来のヒント'],['👣','つぎのチャレンジ']];

function ToriStepIndicator({ step, onJump }) {
  const railRef = React.useRef(null);
  React.useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const el = rail.children[step - 1];
    if (el) rail.scrollTo({ left: Math.max(0, el.offsetLeft - 56), behavior: 'smooth' });
  }, [step]);
  return (
    <div style={{ flexShrink:0, background:TJ.surface, paddingTop:10, boxShadow:'0 2px 10px rgba(20,40,60,.05)', position:'relative', zIndex:5 }}>
      <div ref={railRef} style={{ display:'flex', gap:7, overflowX:'auto', padding:'0 14px 10px', scrollbarWidth:'none' }}>
        {TORI_STEP_CHIPS.map(([icon, label], i) => {
          const n = i + 1, active = n === step, done = n < step;
          return (
            <button key={n} onClick={() => onJump(n)}
              style={{ flexShrink:0, display:'flex', alignItems:'center', gap:6, border:'none', cursor:'pointer',
                borderRadius:999, padding:'8px 14px', fontFamily:TJ.round, fontWeight:800, fontSize:11.5,
                background: active ? TJ.blueGrad : done ? TJ.blueSoft : '#f1f3f5',
                color: active ? '#fff' : done ? TJ.blueDark : '#9aa1a7',
                boxShadow: active ? '0 5px 14px rgba(0,150,250,.35)' : 'none' }}>
              <span style={{ fontSize:13 }}>{done ? '✓' : icon}</span>{label}
            </button>
          );
        })}
      </div>
      <div style={{ height:3, background:'#eef1f4' }}>
        <div style={{ height:'100%', width:`${(step / 5) * 100}%`, background:'linear-gradient(90deg,#0096fa,#FC8524)' }}></div>
      </div>
    </div>
  );
}

function ToriStepNav({ step, goStep, onShare }) {
  const first = step === 1, last = step === 5;
  const nextLabel = last ? null : TORI_STEP_CHIPS[step][1];
  const circ = (disabled) => ({
    width:46, height:46, borderRadius:'50%', border:'none', flexShrink:0,
    background:'#fff',
    boxShadow: disabled ? 'inset 0 0 0 1.5px #e7eaec' : 'inset 0 0 0 1.5px #d6d6d6, 0 2px 8px rgba(20,40,60,.06)',
    color: disabled ? '#ccd2d7' : TJ.text, cursor: disabled ? 'default' : 'pointer',
    display:'flex', alignItems:'center', justifyContent:'center',
  });
  return (
    <div style={{ display:'flex', gap:10, alignItems:'center', marginTop:6 }}>
      <button onClick={() => !first && goStep(step - 1)} disabled={first} aria-label="もどる" style={circ(first)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
      </button>
      <button onClick={onShare} aria-label="シェア" style={{ ...circ(false), color:TJ.blue }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
      </button>
      {last ? (
        <button onClick={() => goStep(1)}
          style={{ flex:1, height:50, background:TJ.blueGrad, color:'#fff', border:'none', borderRadius:999, fontFamily:TJ.round, fontWeight:800, fontSize:14, cursor:'pointer', boxShadow:'0 8px 20px rgba(0,150,250,.32)', display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
          🔁 トリセツを見直す
        </button>
      ) : (
        <button onClick={() => goStep(step + 1)}
          style={{ flex:1, height:50, background:TJ.orangeGrad, color:'#fff', border:'none', borderRadius:999, fontFamily:TJ.round, fontWeight:800, fontSize:13.5, cursor:'pointer', boxShadow:'0 8px 20px rgba(252,133,36,.34)', display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'0 18px' }}>
          <span style={{ opacity:.85, fontSize:11, fontWeight:700 }}>つぎへ</span>
          <span style={{ whiteSpace:'nowrap' }}>{nextLabel}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7"/></svg>
        </button>
      )}
    </div>
  );
}

Object.assign(window, { TorisetsuJourneyExt, TorisetsuStrengths, TorisetsuFuture, Top3Section, VoicesSection, ToriStepIndicator, ToriStepNav, JStepHead: StepHead });
