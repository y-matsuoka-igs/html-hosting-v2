// torisetsu-journey.jsx — トリセツ画面の新UXジャーニー（STEP 2〜5）
// STEP 2: 強みTOP3 / STEP 3: みんなの発見(声) / STEP 4: 未来のヒント＋目標設定 / STEP 5: 行動支援
const { useState: useTJ } = React;

const TJ = {
  blue:'#315cfa', blueDark:'#2447c9', blueSoft:'#e8edff',
  orange:'#ff6b5e', orangeSoft:'#fff3e0', green:'#18b271', greenSoft:'#e4f9ec',
  text:'#1f1b16', sub:'#7a7263', border:'#e3d9c4', bg:'#f8f9fb', surface:'#fff',
  font:"'Noto Sans JP',sans-serif", round:"'Zen Kaku Gothic New','Noto Sans JP',sans-serif",
  shadow:'0 1px 3px rgba(20,40,60,.08)',
  blueGrad:'#315cfa',
  orangeGrad:'#ff6b5e',
};

/* ── ステップ見出し ── */
function StepHead({ n, title, sub }) {
  return (
    <div style={{ padding:'6px 2px 0' }}>
      <div style={{ fontFamily:TJ.round, fontWeight:900, fontSize:19, color:TJ.text, lineHeight:1.3, marginTop:3 }}>{title}</div>
      {sub && <div style={{ fontSize:11.5, color:TJ.sub, fontWeight:600, marginTop:3 }}>{sub}</div>}
    </div>
  );
}

function JCard({ children, style }, ref) {
  return <div ref={ref} style={{ background:TJ.surface, borderRadius:14, padding:16, boxShadow:TJ.shadow, ...style }}>{children}</div>;
}
JCard = React.forwardRef(JCard);

/* ════════ STEP 2: 今のキミ（トレーディングカード） ════════ */
const NOW_TYPE_PROFILE = {
  name:'探索する創造者',
  catch:'ひらめいたら、まず動く。',
  desc:'新しいアイデアを思いつくだけでなく、実際に動いて形にできる人。人と関わるのも得意だから、キミが動くとまわりも動き出すよ。',
  traits:['アイデア','行動力','まきこみ力'],
};
function CardStar({ size = 11 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffd633" stroke="#1f1b16" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 2l3 6.6 7 .8-5.2 4.8 1.4 7-6.2-3.6L5.8 21l1.4-7L2 9.4l7-.8z"/></svg>;
}
function TypeHeroSection() {
  const Character = window.Character;
  return (
    <div style={{ display:'flex', justifyContent:'center', padding:'6px 0 2px' }}>
      <div style={{ width:'100%', maxWidth:280, borderRadius:16, background:TJ.blue, border:'2.5px solid #1f1b16', boxShadow:'6px 6px 0 #1f1b16', position:'relative', overflow:'hidden', padding:'12px 12px 15px' }}>

          {/* カードヘッダー */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:8.5, letterSpacing:2.5, fontWeight:800, color:'#ffd633' }}>KIMI NO TORISETSU</span>
            <span style={{ display:'flex', gap:2 }}><CardStar /><CardStar /><CardStar /></span>
          </div>

          {/* アート枠 */}
          <div style={{ marginTop:9, borderRadius:12, border:'2px solid #1f1b16', background:'#6e8cff', display:'flex', alignItems:'flex-end', justifyContent:'center', height:128, position:'relative', overflow:'hidden' }}>
            <svg style={{ position:'absolute', top:10, left:14 }} width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z"/></svg>
            <svg style={{ position:'absolute', top:26, right:20 }} width="8" height="8" viewBox="0 0 24 24" fill="#ffd633"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z"/></svg>
            <svg style={{ position:'absolute', bottom:18, left:26 }} width="7" height="7" viewBox="0 0 24 24" fill="rgba(255,255,255,.65)"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z"/></svg>
            {Character && <Character size={78} body="bubble" item="magnifier" />}
          </div>

          {/* ネームプレート */}
          <div style={{ display:'flex', justifyContent:'center', marginTop:-14, position:'relative' }}>
            <div style={{ background:'#ffd633', color:'#1f1b16', border:'2px solid #1f1b16', borderRadius:10, padding:'6px 16px', fontFamily:TJ.round, fontWeight:900, fontSize:17.5, boxShadow:'3px 3px 0 #1f1b16' }}>
              探索する創造者
            </div>
          </div>

          <div style={{ fontFamily:TJ.round, fontWeight:800, fontSize:12.5, color:'#fff', textAlign:'center', marginTop:11 }}>{NOW_TYPE_PROFILE.catch}</div>

          {/* カードテキスト */}
          <div style={{ background:'#fff', border:'2px solid #1f1b16', borderRadius:10, padding:'10px 12px', marginTop:9 }}>
            <p style={{ fontSize:11, color:'#1f1b16', lineHeight:1.75, fontWeight:600, margin:0 }}>{NOW_TYPE_PROFILE.desc}</p>
          </div>

          {/* とくい技 */}
          <div style={{ display:'flex', gap:6, marginTop:10, justifyContent:'center', flexWrap:'wrap' }}>
            {NOW_TYPE_PROFILE.traits.map(t => (
              <span key={t} style={{ background:'#fff', border:'1.5px solid #1f1b16', color:'#1f1b16', borderRadius:999, padding:'3px 11px', fontSize:10, fontWeight:800, fontFamily:TJ.round, boxShadow:'2px 2px 0 #1f1b16' }}>{t}</span>
            ))}
          </div>
      </div>
    </div>
  );
}

/* ── （旧）強みTOP3 ── */
const TOP3 = [
  { rank:1, medal:'🥇', name:'外交性', score:90, desc:'人と関わりながら、場を動かす力' },
  { rank:2, medal:'🥈', name:'個人的実行力', score:88, desc:'決めたことを、最後までやり切る力' },
  { rank:3, medal:'🥉', name:'創造力', score:82, desc:'新しいアイデアを生み出す力' },
];
function Top3Section() {
  return (
    <JCard>
      <div style={{ fontSize:11, color:TJ.sub, fontWeight:700, marginBottom:12 }}>タイプのもとになった強みTOP3（自己評価 × みんなの評価）</div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {TOP3.map(s => (
          <div key={s.rank} style={{ display:'flex', alignItems:'center', gap:12, background:s.rank===1?'#fffaf0':TJ.bg, borderRadius:12, padding:'12px 14px', border:s.rank===1?'1.5px solid #ffd9a8':'1.5px solid transparent' }}>
            <span style={{ flexShrink:0, color: s.rank===1?'#E0A92E':s.rank===2?'#9aa3aa':'#c08552', display:'flex' }}><FIcon name="medal" size={26} /></span>
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
    icon: 'medal', self: 'on', peer: 'on', shine: true,
    catch: 'キミもみんなも「そうだね！」って言える、太鼓判つきの強み',
    color: '#315cfa', bg: '#E3F2FD', tagColor: '#2447c9',
    tags: ['共感・傾聴力', '外交性', '個人的実行力', '寛容', '誠実さ'],
    voices: ['よく話を聞いてくれる', '場の空気をパッと明るくしてくれる', '決めたことを最後までやり切る'],
  },
  {
    title: '自分では気づいていないキミの強み',
    icon: 'gift', self: 'off', peer: 'on',
    catch: 'みんなが先に見つけてくれた、プレゼントみたいな強み',
    color: '#ff6b5e', bg: '#FFF3E0', tagColor: '#E65100',
    tags: ['組織への働きかけ', '柔軟性', '耐性'],
    voices: ['困っていても折れずに続けられる', 'グループをそっとまとめてくれる'],
    note: '周りはちゃんと気づいてるよ。まだ実感がなくてもOK！',
  },
  {
    title: '周りはまだ気づいていないキミの強み',
    icon: 'gem', self: 'on', peer: 'off',
    catch: 'キミの中でもう光ってる、まだ見せていない原石',
    color: '#00838F', bg: '#E0F4F7', tagColor: '#006064',
    tags: ['創造性', 'ヴィジョン', '内的価値'],
    voices: ['自分の中にちゃんとこだわりがある', 'ユニークな視点でアイデアを出す'],
    note: 'もっと積極的に出していくと、もっと伝わるよ！',
  },
  {
    title: 'これからのびる潜在的な能力',
    icon: 'sprout', self: 'grow', peer: 'grow',
    catch: 'タネはもうまいてある。これから芽を出すのびしろ',
    color: '#757575', bg: '#F5F5F5', tagColor: '#424242',
    tags: ['論理的思考', '課題設定', '疑う力'],
    voices: ['意識して取り組めば、必ず伸びる力'],
    note: '今は低くても大丈夫。意識した瞬間から変わり始めるよ。',
  },
];

/* だれに見えてる？をシンプルなイラストで（ワードなし） */
function DiscoverScene({ cat }) {
  const c = cat.color;
  const Face = ({ cx, cy, r, aware, look = 0 }) => aware ? (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={c} />
      <ellipse cx={cx + look * r * 0.25 - r * 0.32} cy={cy - r * 0.12} rx={r * 0.13} ry={r * 0.3} fill="#fff" />
      <ellipse cx={cx + look * r * 0.25 + r * 0.32} cy={cy - r * 0.12} rx={r * 0.13} ry={r * 0.3} fill="#fff" />
    </g>
  ) : (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={c} strokeOpacity=".45" strokeWidth="1.6" strokeDasharray="3.5 3.5" />
      <path d={`M${cx - r * 0.52} ${cy - r * 0.1}h${r * 0.32}M${cx + r * 0.2} ${cy - r * 0.1}h${r * 0.32}`} stroke={c} strokeOpacity=".45" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  );
  const spark = (x, y, s) => `M${x} ${y - s}L${x + s * .32} ${y - s * .32}L${x + s} ${y}L${x + s * .32} ${y + s * .32}L${x} ${y + s}L${x - s * .32} ${y + s * .32}L${x - s} ${y}L${x - s * .32} ${y - s * .32}Z`;
  const grow = cat.self === 'grow';
  return (
    <svg viewBox="0 0 200 62" style={{ display: 'block', width: '100%', height: 58 }}>
      <ellipse cx="100" cy="54" rx="46" ry="3.5" fill="none" stroke={c} strokeOpacity=".18" strokeWidth="1.4" />
      <ellipse cx="100" cy="50" rx="30" ry="2.4" fill="none" stroke={c} strokeOpacity=".12" strokeWidth="1.2" />
      {grow ? (
        <g stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none">
          <path d="M100 44V30" />
          <path d="M100 34c-6 0-9-4-9-9 4 0 9 2 9 9z" fill={c} fillOpacity=".18" />
          <path d="M100 30c0-6 4-9 9-9 0 5-4 9-9 9z" fill={c} fillOpacity=".18" />
        </g>
      ) : (
        <g fill={c}>
          <path d={spark(100, 24, cat.shine ? 11 : 9)} />
          <path d={spark(112, 12, cat.shine ? 5 : 4)} opacity=".55" />
          {cat.shine && (
            <g>
              <path d={spark(86, 13, 4)} opacity=".55" />
              <path d={spark(118, 30, 3.2)} opacity=".4" />
              <path d={spark(83, 32, 2.8)} opacity=".4" />
              <path d={spark(63, 12, 3)} opacity=".35" />
              <path d={spark(136, 10, 3)} opacity=".35" />
              <g stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".45" fill="none">
                <path d="M91 34l3-3M109 34l-3-3M100 38v-4" />
              </g>
            </g>
          )}
        </g>
      )}
      <Face cx={44} cy={34} r={16} aware={cat.self === 'on'} look={1} />
      {cat.peer === 'on' ? (
        <g><circle cx={166} cy={29} r={11} fill={c} opacity=".4" /><Face cx={150} cy={35} r={15} aware look={-1} /></g>
      ) : (
        <g><circle cx={166} cy={29} r={11} fill="none" stroke={c} strokeOpacity=".3" strokeWidth="1.4" strokeDasharray="3 3" /><Face cx={150} cy={35} r={15} aware={false} /></g>
      )}
    </svg>
  );
}

function Bubble({ text }) {
  return (
    <div style={{ position:'relative', background:TJ.bg, borderRadius:'4px 12px 12px 12px', padding:'8px 12px', fontSize:11.5, color:TJ.text, fontWeight:600, lineHeight:1.6, fontFamily:TJ.font }}>
      「{text}」
    </div>
  );
}

function VoicesSection() {
  const [selfOpen, setSelfOpen] = React.useState(false);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>

      {/* イントロ */}
      <div style={{ background:`${TJ.blue}`, borderRadius:14, padding:'14px 16px', color:'#fff' }}>
        <div style={{ fontFamily:TJ.round, fontWeight:900, fontSize:14, marginBottom:4 }}>まわりの人が見つけたキミの姿</div>
        <div style={{ fontSize:11, opacity:.9, lineHeight:1.7, fontWeight:600 }}>毎日の中で積み重ねてきた証拠だよ。自信を持っていい！</div>
      </div>

      {/* みんなの発見（4カテゴリ） メイン */}
      {DISCOVER_CATS.map((cat, ci) => (
        <JCard key={ci} style={{ padding:0, overflow:'hidden' }}>
          <div style={{ background:cat.color, color:'#fff', padding:'9px 15px', fontSize:12, fontWeight:800, fontFamily:TJ.round }}>
            {cat.title}
          </div>
          <div style={{ background:cat.bg, padding:'8px 26px 4px' }}>
            <DiscoverScene cat={cat} />
          </div>
          <div style={{ padding:'12px 14px', display:'flex', flexDirection:'column', gap:8 }}>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {cat.tags.map(c => (
                <span key={c} style={{ background:cat.bg, color:cat.tagColor, borderRadius:999, padding:'4px 10px', fontSize:11, fontWeight:800, fontFamily:TJ.round }}>{c}</span>
              ))}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:2 }}>
              {cat.voices.map((v, vi) => (
                <div key={vi} style={{ background:'#f7f9fb', borderRadius:'4px 12px 12px 12px', padding:'9px 12px', fontSize:11.5, color:TJ.text, lineHeight:1.65, fontWeight:500, borderLeft:'3px solid '+cat.color }}>
                  「{v}」
                </div>
              ))}
            </div>
            {cat.note && (
              <div style={{ fontSize:10.5, color:cat.tagColor, fontWeight:700, lineHeight:1.6, background:cat.bg, borderRadius:8, padding:'8px 11px', marginTop:2 }}><span style={{display:'inline-flex',alignItems:'flex-start',gap:5}}><FIcon name="bulb" size={13} color={cat.tagColor} /> {cat.note}</span></div>
            )}
          </div>
        </JCard>
      ))}

      {/* 自己評価との比較（開閉式） */}
      <div style={{ borderRadius:14, border:'1.5px solid '+TJ.border, overflow:'hidden', background:'#fff' }}>
        <button onClick={() => setSelfOpen(o => !o)}
          style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 15px', border:'none', background:'none', cursor:'pointer', WebkitTapHighlightColor:'transparent' }}>
          <div style={{ display:'flex', alignItems:'center', gap:9 }}>
            <span style={{ display:'flex', color:TJ.blue }}><FIcon name="chart" size={18} /></span>
            <div style={{ textAlign:'left' }}>
              <div style={{ fontFamily:TJ.round, fontWeight:800, fontSize:13, color:TJ.text }}>自己評価との比較</div>
              <div style={{ fontSize:10, color:TJ.sub, fontWeight:600, marginTop:1 }}>自分の認識とみんなの評価のギャップを見てみよう</div>
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TJ.sub} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: selfOpen?'rotate(180deg)':'rotate(0deg)', transition:'transform .25s' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        {selfOpen && (
          <div style={{ padding:'0 15px 15px', display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ fontSize:11, color:TJ.sub, fontWeight:600, lineHeight:1.65, padding:'4px 0 8px', borderTop:'1px solid '+TJ.border }}>
              棒グラフ：上＝自己評価　下＝みんなの評価。ギャップが大きいほど、自分が気づいていない強みかも。
            </div>
            {[
              { name:'外交性',       self:72, peer:90, note:'みんなはキミをもっと外向きに見てるよ！' },
              { name:'共感・傾聴力',  self:68, peer:82, note:'話を聞いてくれる、とよく思われてる' },
              { name:'創造性',       self:80, peer:78, note:'自己認識とほぼ一致' },
              { name:'個人的実行力',  self:60, peer:85, note:'行動力をもっと自覚してみよう！' },
              { name:'影響力の行使',  self:55, peer:74, note:'周りへの影響、意外と大きい' },
            ].map(({ name, self, peer, note }) => (
              <div key={name}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <span style={{ fontSize:11.5, fontWeight:700, color:TJ.text }}>{name}</span>
                  {Math.abs(peer - self) >= 12 && (
                    <span style={{ fontSize:10, fontWeight:800, color:TJ.orange, background:TJ.orangeSoft, borderRadius:999, padding:'2px 8px' }}>ギャップ大</span>
                  )}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:9.5, color:TJ.sub, fontWeight:700, width:48, flexShrink:0 }}>自己</span>
                  <div style={{ flex:1, height:8, background:'#eef0f3', borderRadius:4, overflow:'hidden' }}>
                    <div style={{ width:self+'%', height:'100%', background:'#b0c8e8', borderRadius:4 }}></div>
                  </div>
                  <span style={{ fontSize:10, color:TJ.sub, width:24, textAlign:'right' }}>{self}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:9.5, color:TJ.blue, fontWeight:700, width:48, flexShrink:0 }}>みんな</span>
                  <div style={{ flex:1, height:8, background:'#eef0f3', borderRadius:4, overflow:'hidden' }}>
                    <div style={{ width:peer+'%', height:'100%', background:TJ.blue, borderRadius:4 }}></div>
                  </div>
                  <span style={{ fontSize:10, color:TJ.blue, fontWeight:700, width:24, textAlign:'right' }}>{peer}</span>
                </div>
                <div style={{ fontSize:10, color:TJ.sub, lineHeight:1.6, padding:'4px 0 2px', fontStyle:'italic' }}>{note}</div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

/* ════════ STEP 4: 未来のヒント＋目標設定 ════════ */
const CAREERS_PURE = [
  { id:'planner', icon:'💡', title:'商品企画・プランナー', why:'創造力 × 個人的実行力',
    desc:'新しい商品やサービスを考えて形にすること。アイデアを出してすぐ動けるキミにぴったり。',
    comps:[['創造力',82,86],['論理的思考',55,70],['課題設定',58,70]],
    actions:['気になる商品が「なぜ人気か」を3つ分析してみる','友だちの困りごとを1つ見つけて解決アイデアを出す'] },
  { id:'producer', icon:'🚀', title:'起業家・プロデューサー', why:'影響力の行使 × 個人的実行力',
    desc:'人を巻き込みながら新しいことを立ち上げること。「まずやってみる」キミの行動力が核になる。',
    comps:[['影響力の行使',80,90],['組織への働きかけ',70,85],['論理的思考',55,72]],
    actions:['文化祭・行事で企画リーダーに立候補する','やりたい企画を紙1枚にまとめて誰かに見せる'] },
  { id:'marketer', icon:'📣', title:'マーケター・広報', why:'表現力 × 外交性',
    desc:'モノやサービスの魅力を伝えて、人の心を動かすこと。伝える力と人懐っこさが武器になる。',
    comps:[['表現力',78,88],['創造力',82,86],['論理的思考',55,68]],
    actions:['好きなものの魅力をSNS風に1投稿書いてみる','クラスのお知らせポスターを作ってみる'] },
];
const INTERESTS = [
  { key:'スポーツ', icon:'⚽', career:{ id:'i-sports', icon:'🏟️', title:'スポーツイベントプランナー', why:'興味「スポーツ」× 強み「実行力・外交性」', desc:'大会やイベントを企画・運営して、スポーツの楽しさを届けること。', comps:[['組織への働きかけ',70,82],['課題設定',58,70]], actions:['クラスマッチの運営係に立候補する','部活の練習メニューを1つ提案してみる'] } },
  { key:'音楽', icon:'🎵', career:{ id:'i-music', icon:'🎧', title:'音楽プロデューサー', why:'興味「音楽」× 強み「創造力・表現力」', desc:'アーティストや楽曲の魅力を引き出して世に送り出すこと。', comps:[['創造力',82,88],['表現力',78,85]], actions:['行事のBGM・選曲係をやってみる','好きな曲の「良さ」を言葉にして友だちに紹介する'] } },
  { key:'ゲーム', icon:'🎮', career:{ id:'i-game', icon:'🕹️', title:'ゲームプランナー', why:'興味「ゲーム」× 強み「創造力」', desc:'ゲームの企画・ルール・体験を設計すること。「面白さ」を作る側に回る。', comps:[['創造力',82,88],['論理的思考',55,72]], actions:['好きなゲームの「面白さの仕組み」を3つ書き出す','かんたんなゲーム企画書を1枚作ってみる'] } },
  { key:'ものづくり', icon:'🔧', career:{ id:'i-craft', icon:'🛠️', title:'プロダクトデザイナー', why:'興味「ものづくり」× 強み「創造力・実行力」', desc:'使う人のことを考えて、カタチあるものを生み出すこと。', comps:[['創造力',82,88],['課題設定',58,72]], actions:['身の回りの「使いにくい物」の改善案をスケッチする','文化祭の装飾・制作係に参加する'] } },
  { key:'アート・デザイン', icon:'🎨', career:{ id:'i-art', icon:'🖌️', title:'UI/UXデザイナー', why:'興味「アート」× 強み「創造力・共感力」', desc:'アプリやサービスの「使いやすさ」と「美しさ」をデザインすること。', comps:[['創造力',82,90],['共感・傾聴力',74,80]], actions:['毎日1つ「いいデザイン」を見つけて記録する','学校行事のポスターづくりに挑戦する'] } },
  { key:'文章を書く', icon:'✍️', career:{ id:'i-write', icon:'📝', title:'編集者・ライター', why:'興味「文章」× 強み「表現力」', desc:'言葉で情報や物語を届けること。伝える力がそのまま武器になる。', comps:[['表現力',78,88],['論理的思考',55,70]], actions:['今日感じたことを3行で書く習慣をつける','学級新聞・部誌の記事を1本書いてみる'] } },
  { key:'動画・配信', icon:'🎬', career:{ id:'i-video', icon:'📹', title:'映像クリエイター', why:'興味「動画」× 強み「創造力・表現力」', desc:'映像で人を楽しませ、心を動かすコンテンツを作ること。', comps:[['創造力',82,86],['表現力',78,88]], actions:['1分の紹介動画を撮って編集してみる','好きな動画の「構成」を分析してみる'] } },
  { key:'人と話す', icon:'💬', career:{ id:'i-talk', icon:'🤝', title:'キャリアコーチ・営業', why:'興味「人と話す」× 強み「外交性・傾聴力」', desc:'人の話を聞き、その人に合った提案で背中を押すこと。', comps:[['共感・傾聴力',74,85],['外交性',90,92]], actions:['初対面の人に自分から話しかけてみる','友だちの相談に「聞き役」として乗ってみる'] } },
  { key:'科学・実験', icon:'🔬', career:{ id:'i-sci', icon:'🧪', title:'研究開発エンジニア', why:'興味「科学」× 強み「実行力」', desc:'「なぜ？」を追いかけて、新しい技術や発見を生むこと。', comps:[['論理的思考',55,75],['課題設定',58,72]], actions:['身近な「なぜ?」を1つ調べてまとめてみる','自由研究のテーマを3つ考えてみる'] } },
];
const ALL_CAREERS = [...CAREERS_PURE, ...INTERESTS.map(i => i.career)];

function GapBar({ name, now, target }) {
  // 数値は出さず、now をもとに「強み / のびしろ」だけを示す
  const isStrength = now >= 75;
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10,
      background: isStrength ? TJ.blueSoft : '#f5f6f7', borderRadius:10, padding:'10px 13px', marginBottom:8,
      border:`1.5px solid ${isStrength ? 'rgba(49,92,250,.25)' : TJ.border}` }}>
      <span style={{ fontSize:12.5, fontWeight:800, color:TJ.text, fontFamily:TJ.round }}>{name}</span>
      {isStrength ? (
        <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:11, fontWeight:800, color:'#fff', background:TJ.blue, borderRadius:999, padding:'4px 10px', flexShrink:0 }}><FIcon name="sparkle" size={12} color="#fff" /> キミの強み</span>
      ) : (
        <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:11, fontWeight:800, color:'#9a6a2e', background:TJ.orangeSoft, borderRadius:999, padding:'4px 10px', flexShrink:0 }}><FIcon name="sprout" size={12} color="#9a6a2e" /> のびしろ</span>
      )}
    </div>
  );
}

function CareerCard({ c, selected, onSelect }) {
  return (
    <button onClick={() => onSelect(c.id)}
      style={{ textAlign:'left', width:'100%', cursor:'pointer', background:selected?TJ.blueSoft:TJ.surface, border:`2px solid ${selected?TJ.blue:TJ.border}`, borderRadius:14, padding:'14px 15px', transition:'all .15s', boxShadow:selected?'0 4px 14px rgba(49,92,250,.18)':TJ.shadow }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
        <span style={{ flexShrink:0, width:38, height:38, borderRadius:11, background:selected?'#fff':TJ.blueSoft, display:'flex', alignItems:'center', justifyContent:'center', color:TJ.blue }}><Emo e={c.icon} size={20} /></span>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:TJ.round, fontWeight:900, fontSize:14, color:TJ.text }}>{c.title}</div>
          <div style={{ fontSize:10, color:TJ.blue, fontWeight:700, marginTop:1 }}>{c.why}</div>
        </div>
        <div style={{ width:22, height:22, borderRadius:'50%', flexShrink:0, border:`2px solid ${selected?TJ.blue:'#cfc4ab'}`, background:selected?TJ.blue:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {selected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
        </div>
      </div>
      <div style={{ fontSize:11.5, color:TJ.sub, lineHeight:1.65, fontWeight:500 }}>{c.desc}</div>

      {/* 選択時：この分野で必要な能力をカード内に表示（チャレンジUIに合わせた行リスト） */}
      {selected && c.comps && (
        <div style={{ marginTop:12, paddingTop:12, borderTop:`1px dashed ${TJ.blue}55` }}>
          <div style={{ fontSize:10.5, fontWeight:800, color:TJ.blueDark, marginBottom:8, fontFamily:TJ.round, display:'flex', alignItems:'center', gap:5 }}><FIcon name="target" size={14} color={TJ.blue} /> この分野で活きる力</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {c.comps.map(([name, now]) => {
              const isStrength = now >= 75;
              return (
                <div key={name}
                  style={{ display:'flex', alignItems:'center', gap:11, background:isStrength?TJ.blueSoft:TJ.bg, border:`2px solid ${isStrength?TJ.blue:'transparent'}`, borderRadius:12, padding:'12px 13px' }}>
                  <div style={{ width:26, height:26, borderRadius:8, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
                    background:isStrength?TJ.blue:'#fff', border:`2px solid ${isStrength?TJ.blue:'#e0c6a8'}`, color:isStrength?'#fff':'#c98f52' }}>
                    {isStrength ? <FIcon name="sparkle" size={14} /> : <FIcon name="sprout" size={14} />}
                  </div>
                  <span style={{ flex:1, fontSize:12.5, color:TJ.text, fontWeight:700, lineHeight:1.4 }}>{name}</span>
                  <span style={{ fontSize:10.5, fontWeight:800, fontFamily:TJ.round, flexShrink:0,
                    color:isStrength?TJ.blue:'#9a6a2e' }}>{isStrength ? 'キミの強み' : 'のびしろ'}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
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
      <StepHead n={2} title="今のキミ" sub="診断とみんなの評価からうまれた、キミの一枚" />
      <TypeHeroSection />

      {/* ── STEP 3 ── */}
      <StepHead n={3} title="みんなの発見" sub="まわりの人が見つけたキミの良さ" />
      <VoicesSection />

      {/* ── STEP 4 ── */}
      <StepHead n={4} title="キミの強みが活きる未来のヒント" sub="この強み、こんなところで活きるかも" />
      <div style={{ fontSize:11, color:TJ.sub, fontWeight:700, padding:'0 2px' }}><span style={{display:'inline-flex',alignItems:'center',gap:5}}><FIcon name="book" size={13} /> トリセツからの提案</span></div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {CAREERS_PURE.map(c => <CareerCard key={c.id} c={c} selected={goalId===c.id} onSelect={selectGoal} />)}
      </div>

      {/* 興味・得意の入力 */}
      <JCard>
        <div style={{ fontFamily:TJ.round, fontWeight:800, fontSize:13, color:TJ.text, marginBottom:4 }}><span style={{display:'inline-flex',alignItems:'center',gap:5}}><FIcon name="search" size={13} /> キミの興味・得意をえらぶ</span></div>
        <div style={{ fontSize:11, color:TJ.sub, fontWeight:600, marginBottom:12, lineHeight:1.6 }}>興味をえらぶと、トリセツ × 興味 のかけ算で提案が変わるよ</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:12 }}>
          {INTERESTS.map(i => {
            const on = interests.includes(i.key);
            return (
              <button key={i.key} onClick={() => toggleInterest(i.key)}
                style={{ border:`1.5px solid ${on?TJ.blue:'#cfc4ab'}`, background:on?TJ.blueSoft:'#fff', color:on?TJ.blueDark:TJ.sub, borderRadius:999, padding:'8px 14px', fontFamily:TJ.round, fontWeight:700, fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
                <span style={{display:'flex'}}><Emo e={i.icon} size={14} /></span>{i.key}
              </button>
            );
          })}
        </div>
        <input value={custom} onChange={e => { setCustom(e.target.value); }} onBlur={() => persist({ custom })}
          placeholder="その他（自由に入力：例 料理、宇宙、ファッション…）"
          style={{ width:'100%', border:'1.5px solid #cfc4ab', borderRadius:10, padding:'10px 12px', fontSize:12, fontFamily:TJ.font, color:TJ.text, outline:'none', boxSizing:'border-box' }} />
        {!showMix && (
          <button onClick={() => interests.length && setShowMix(true)} disabled={!interests.length}
            style={{ width:'100%', marginTop:12, background:interests.length?TJ.blueGrad:'#cfc4ab', color:'#fff', border:'none', borderRadius:999, padding:'13px', fontFamily:TJ.round, fontWeight:800, fontSize:14, cursor:interests.length?'pointer':'default', boxShadow:interests.length?'0 6px 16px rgba(49,92,250,.3)':'none' }}>
            興味をふまえた提案を見る ✨
          </button>
        )}
      </JCard>

      {/* 興味 × 強み の提案 */}
      {showMix && mixCareers.length > 0 && (
        <>
          <div style={{ fontSize:11, color:TJ.sub, fontWeight:700, padding:'0 2px' }}><span style={{display:'inline-flex',alignItems:'center',gap:5}}><FIcon name="sparkle" size={13} /> キミの興味 × 強み からの提案</span></div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {mixCareers.map(c => <CareerCard key={c.id} c={c} selected={goalId===c.id} onSelect={selectGoal} />)}
          </div>
        </>
      )}

      {/* 目標までの現在地（ギャップ） */}
      {goal && (
        <>
          <JCard ref={gapRef} style={{ border:`2px solid ${TJ.blue}`, boxShadow:'0 6px 20px rgba(49,92,250,.14)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:4 }}>
              <span style={{ fontSize:20 }}>{goal.icon}</span>
              <div style={{ fontFamily:TJ.round, fontWeight:900, fontSize:14, color:TJ.text }}>「{goal.title}」までの現在地</div>
            </div>
            <div style={{ fontSize:11, color:TJ.sub, fontWeight:600, marginBottom:14, lineHeight:1.6 }}>この分野で活きるコンピテンシーと、いまのキミの数値だよ</div>
            {goal.comps.map(([name, now, target]) => <GapBar key={name} name={name} now={now} target={target} />)}
            <div style={{ marginTop:4, background:TJ.orangeSoft, borderRadius:10, padding:'10px 12px', fontSize:11, color:'#9a6a2e', fontWeight:700, lineHeight:1.65 }}>
              💡 足りない分は「のびしろ」。下のアクションで少しずつ近づけるよ
            </div>
          </JCard>

          {/* ── STEP 5 ── */}
          <StepHead n={5} title="マイチャレンジをえらぼう" sub="未来のヒントに近づくアクションをチャレンジに登録" />
          <JCard>
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:14 }}>
              {goal.actions.map((a, i) => {
                const on = pickedActions.includes(a);
                const comp = ((goal.comps && (goal.comps[i] || goal.comps[0])) || [])[0];
                return (
                  <button key={i} onClick={() => toggleAction(a)}
                    style={{ textAlign:'left', display:'flex', alignItems:'center', gap:11, cursor:'pointer', background:on?TJ.greenSoft:TJ.bg, border:`2px solid ${on?TJ.green:'transparent'}`, borderRadius:12, padding:'12px 13px', transition:'all .15s' }}>
                    <div style={{ width:22, height:22, borderRadius:7, flexShrink:0, border:`2px solid ${on?TJ.green:'#c8cdd2'}`, background:on?TJ.green:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      {on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <span style={{ fontSize:12.5, color:TJ.text, fontWeight:700, lineHeight:1.55, display:'block' }}>{a}</span>
                      {comp && <span style={{ display:'inline-flex', alignItems:'center', gap:3, marginTop:5, background:TJ.blueSoft, color:TJ.blueDark, fontSize:9.5, fontWeight:800, padding:'2px 8px', borderRadius:999 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>{comp}
                      </span>}
                    </div>
                  </button>
                );
              })}
            </div>
            {registered ? (
              <div style={{ textAlign:'center', background:TJ.greenSoft, borderRadius:12, padding:'13px', fontFamily:TJ.round, fontWeight:800, fontSize:13, color:'#2E7D32' }}><FIcon name="party" size={14} color="#2E7D32" style={{verticalAlign:'-2px',marginRight:4}} /> チャレンジにチャレンジを決めたよ！</div>
            ) : (
              <button onClick={registerChallenge} disabled={!pickedActions.length}
                style={{ width:'100%', background:pickedActions.length?TJ.orangeGrad:'#cfc4ab', color:'#fff', border:'none', borderRadius:999, padding:'14px', fontFamily:TJ.round, fontWeight:800, fontSize:14, cursor:pickedActions.length?'pointer':'default', boxShadow:pickedActions.length?'0 8px 20px rgba(255,107,94,.34)':'none' }}>
                このチャレンジにする
              </button>
            )}
          </JCard>
        </>
      )}
      {!goal && (
        <div style={{ fontSize:11.5, color:TJ.sub, fontWeight:600, textAlign:'center', padding:'2px 0 6px', lineHeight:1.7 }}>
          気になることをえらぶと、活きる強みと<br/>「マイチャレンジ」が見られるよ
        </div>
      )}
    </>
  );
}

/* ── STEP 2+3 のみ（トリセツタブ用） ── */
function TorisetsuStrengths() {
  return (
    <>
      <StepHead n={2} title="今のキミ" sub="診断とみんなの評価からうまれた、キミの一枚" />
      <TypeHeroSection />
      <StepHead n={3} title="みんなの発見" sub="まわりの人が見つけたキミの良さ" />
      <VoicesSection />
    </>
  );
}

/* ── (旧) STEP 4+5 未来のヒント：職業提案型（未使用） ── */
function TorisetsuFutureOld({ nav, goChallenge, step, goBack }) {
  const saved = (nav.state && nav.state.career) || {};
  const [interests, setInterests] = useTJ(saved.interests || []);
  const [custom, setCustom] = useTJ(saved.custom || '');
  const [showMix, setShowMix] = useTJ((saved.interests || []).length > 0);
  const [goalId, setGoalId] = useTJ(saved.goalId || null);
  const [pickedActions, setPickedActions] = useTJ([]);
  const [registered, setRegistered] = useTJ(false);
  const [regCount, setRegCount] = useTJ(0);

  const persist = (patch) => nav.update && nav.update({ career: { interests, custom, goalId, ...patch } });
  const toggleInterest = (k) => { const next = interests.includes(k) ? interests.filter(x=>x!==k) : [...interests,k]; setInterests(next); persist({interests:next}); };
  const gapRef = React.useRef(null);
  const selectGoal = (id) => {
    const next = goalId===id?null:id;
    setGoalId(next); setPickedActions([]); setRegistered(false); persist({goalId:next});
    if (next) setTimeout(() => {
      const el = gapRef.current;
      if (!el) return;
      let parent = el.parentElement;
      while (parent && getComputedStyle(parent).overflowY === 'visible') parent = parent.parentElement;
      if (parent) parent.scrollTop = el.offsetTop - 16;
    }, 0);
  };
  const toggleAction = (a) => setPickedActions(p=>p.includes(a)?p.filter(x=>x!==a):[...p,a]);
  const registerChallenge = () => {
    if(!pickedActions.length) return;
    const d=new Date(), date=`${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
    nav.update(s=>({tasks:[...pickedActions.map(text=>({text,date,done:false,source:'future',fresh:true,comp:(goal.comps&&goal.comps[0]&&goal.comps[0][0])||''})),...(s.tasks||[])]}));
    setRegCount(pickedActions.length);
    setRegistered(true);
  };
  const goal = ALL_CAREERS.find(c=>c.id===goalId);
  const mixCareers = INTERESTS.filter(i=>interests.includes(i.key)).map(i=>i.career);

  const gapCard = goal ? (
    <JCard style={{border:`2px solid ${TJ.blue}`,boxShadow:'0 6px 20px rgba(49,92,250,.14)'}}>
      <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:4}}>
        <span style={{fontSize:20}}>{goal.icon}</span>
        <div style={{fontFamily:TJ.round,fontWeight:900,fontSize:14,color:TJ.text}}>「{goal.title}」で活きるコンピテンシー</div>
      </div>
      <div style={{fontSize:11,color:TJ.sub,fontWeight:600,marginBottom:14,lineHeight:1.6}}>この分野で活きる力と、キミの強みが活かせるところだよ</div>
      {goal.comps.map(([name,now,target])=><GapBar key={name} name={name} now={now} target={target}/>)}
      <div style={{marginTop:4,background:TJ.orangeSoft,borderRadius:10,padding:'10px 12px',fontSize:11,color:'#9a6a2e',fontWeight:700,lineHeight:1.65}}><span style={{display:'inline-flex',alignItems:'flex-start',gap:5}}><FIcon name="bulb" size={13} color="#9a6a2e" /> 「のびしろ」は伸ばすチャンス。下のアクションで近づけるよ</span></div>
    </JCard>
  ) : null;

  /* ── STEP 5: マイチャレンジ ── */
  if (step === 5) {
    if (!goal) return (
      <JCard style={{textAlign:'center',padding:'28px 18px'}}>
        <div style={{marginBottom:8,display:'flex',justifyContent:'center',color:TJ.blue}}><FIcon name="target" size={40} /></div>
        <div style={{fontFamily:TJ.round,fontWeight:900,fontSize:14.5,color:TJ.text,marginBottom:6}}>まだ未来のヒントがえらばれていないよ</div>
        <p style={{fontSize:11.5,color:TJ.sub,lineHeight:1.7,margin:'0 0 16px'}}>ひとつ前のSTEPにもどって、<br/>気になることをえらんでみよう</p>
        <button onClick={()=>goBack&&goBack()}
          style={{background:TJ.blueGrad,color:'#fff',border:'none',borderRadius:999,padding:'12px 26px',fontFamily:TJ.round,fontWeight:800,fontSize:13,cursor:'pointer',boxShadow:'0 6px 16px rgba(49,92,250,.3)'}}>
          ← 未来のヒントをえらびに行く
        </button>
      </JCard>
    );
    return (
      <>
        {gapCard}
        <StepHead n={5} title="マイチャレンジをえらぼう" sub="未来のヒントに近づくアクションをチャレンジに登録"/>
        <JCard>
          <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:14}}>
            {goal.actions.map((a,i)=>{const on=pickedActions.includes(a);const comp=((goal.comps&&(goal.comps[i]||goal.comps[0]))||[])[0];return(
              <button key={i} onClick={()=>toggleAction(a)}
                style={{textAlign:'left',display:'flex',alignItems:'center',gap:11,cursor:'pointer',background:on?TJ.greenSoft:TJ.bg,border:`2px solid ${on?TJ.green:'transparent'}`,borderRadius:12,padding:'12px 13px',transition:'all .15s'}}>
                <div style={{width:22,height:22,borderRadius:7,flexShrink:0,border:`2px solid ${on?TJ.green:'#c8cdd2'}`,background:on?TJ.green:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {on&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <span style={{fontSize:12.5,color:TJ.text,fontWeight:700,lineHeight:1.55,display:'block'}}>{a}</span>
                  {comp&&<span style={{display:'inline-flex',alignItems:'center',gap:3,marginTop:5,background:TJ.blueSoft,color:TJ.blueDark,fontSize:9.5,fontWeight:800,padding:'2px 8px',borderRadius:999}}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>{comp}
                  </span>}
                </div>
              </button>
            );})}
          </div>
          {registered?(
            <div style={{textAlign:'center',padding:'6px 4px 2px'}}>
              <div style={{width:60,height:60,margin:'0 auto 12px',borderRadius:'50%',background:TJ.greenSoft,display:'flex',alignItems:'center',justifyContent:'center',color:TJ.green}}><FIcon name="party" size={32} /></div>
              <div style={{fontFamily:TJ.round,fontWeight:900,fontSize:20,color:TJ.text,lineHeight:1.3}}>チャレンジを決めたよ！</div>
              <p style={{fontSize:12,color:TJ.sub,fontWeight:600,lineHeight:1.7,margin:'8px 0 0'}}>えらんだアクションを<br/>ここからスタートしてみよう！</p>
              <button onClick={()=>goChallenge&&goChallenge()}
                style={{width:'100%',marginTop:18,background:TJ.orangeGrad,color:'#fff',border:'none',borderRadius:999,padding:'14px',fontFamily:TJ.round,fontWeight:800,fontSize:14,cursor:'pointer',boxShadow:'0 8px 20px rgba(255,107,94,.34)',display:'flex',alignItems:'center',justifyContent:'center',gap:7}}>
                <FIcon name="fire" size={18} color="#fff" /> チャレンジ中を見る
              </button>
            </div>
          ):(
            <button onClick={registerChallenge} disabled={!pickedActions.length}
              style={{width:'100%',background:pickedActions.length?TJ.orangeGrad:'#cfc4ab',color:'#fff',border:'none',borderRadius:999,padding:'14px',fontFamily:TJ.round,fontWeight:800,fontSize:14,cursor:pickedActions.length?'pointer':'default',boxShadow:pickedActions.length?'0 8px 20px rgba(255,107,94,.34)':'none'}}>
              このチャレンジにする
            </button>
          )}
        </JCard>
      </>
    );
  }

  /* ── STEP 4: 未来のヒント ── */
  return (
    <>
      <StepHead n={4} title="キミの強みが活きる未来のヒント" />
      <div style={{display:'flex',alignItems:'center',gap:11,background:'#fffdf4',border:`1.5px solid #ffe2c2`,borderRadius:14,padding:'13px 15px'}}>
        <span style={{width:34,height:34,borderRadius:10,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',color:TJ.orange,flexShrink:0,boxShadow:'0 2px 8px rgba(20,40,60,.08)'}}><FIcon name="bulb" size={18} color={TJ.orange} /></span>
        <p style={{fontSize:13,color:TJ.text,fontWeight:700,lineHeight:1.6,fontFamily:TJ.round}}>気になることをえらぶと、<span style={{color:TJ.orange}}>活きる強み</span>と<span style={{color:TJ.blue}}>「マイチャレンジ」</span>が見られるよ</p>
      </div>
      <div style={{fontSize:11,color:TJ.sub,fontWeight:700,padding:'0 2px'}}><span style={{display:'inline-flex',alignItems:'center',gap:5}}><FIcon name="book" size={13} /> トリセツからの提案</span></div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {CAREERS_PURE.map(c=><CareerCard key={c.id} c={c} selected={goalId===c.id} onSelect={selectGoal}/>)}
      </div>
      <JCard>
        <div style={{fontFamily:TJ.round,fontWeight:800,fontSize:13,color:TJ.text,marginBottom:4}}><span style={{display:'inline-flex',alignItems:'center',gap:5}}><FIcon name="search" size={13} /> キミの興味・得意をえらぶ</span></div>
        <div style={{fontSize:11,color:TJ.sub,fontWeight:600,marginBottom:12,lineHeight:1.6}}>興味をえらぶと、トリセツ × 興味 のかけ算で提案が変わるよ</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:12}}>
          {INTERESTS.map(i=>{const on=interests.includes(i.key);return(
            <button key={i.key} onClick={()=>toggleInterest(i.key)}
              style={{border:`1.5px solid ${on?TJ.blue:'#cfc4ab'}`,background:on?TJ.blueSoft:'#fff',color:on?TJ.blueDark:TJ.sub,borderRadius:999,padding:'8px 14px',fontFamily:TJ.round,fontWeight:700,fontSize:12,cursor:'pointer',display:'flex',alignItems:'center',gap:5}}>
              <span style={{display:'flex'}}><Emo e={i.icon} size={14} /></span>{i.key}
            </button>
          );})}
        </div>
        <input value={custom} onChange={e=>setCustom(e.target.value)} onBlur={()=>persist({custom})}
          placeholder="その他（自由に入力：例 料理、宇宙、ファッション…）"
          style={{width:'100%',border:'1.5px solid #cfc4ab',borderRadius:10,padding:'10px 12px',fontSize:12,fontFamily:TJ.font,color:TJ.text,outline:'none',boxSizing:'border-box'}}/>
        {!showMix&&(
          <button onClick={()=>interests.length&&setShowMix(true)} disabled={!interests.length}
            style={{width:'100%',marginTop:12,background:interests.length?TJ.blueGrad:'#cfc4ab',color:'#fff',border:'none',borderRadius:999,padding:'13px',fontFamily:TJ.round,fontWeight:800,fontSize:14,cursor:interests.length?'pointer':'default',boxShadow:interests.length?'0 6px 16px rgba(49,92,250,.3)':'none'}}>
            興味をふまえた提案を見る ✨
          </button>
        )}
      </JCard>
      {showMix&&mixCareers.length>0&&(
        <>
          <div style={{fontSize:11,color:TJ.sub,fontWeight:700,padding:'0 2px'}}><span style={{display:'inline-flex',alignItems:'center',gap:5}}><FIcon name="sparkle" size={13} /> キミの興味 × 強み からの提案</span></div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {mixCareers.map(c=><CareerCard key={c.id} c={c} selected={goalId===c.id} onSelect={selectGoal}/>)}
          </div>
        </>
      )}
      {goal&&<div style={{fontSize:11.5,color:TJ.sub,fontWeight:700,textAlign:'center',padding:'2px 0 4px'}}>下の「つぎへ →」で、マイチャレンジをえらぼう</div>}
    </>
  );
}

/* ════════ 新 STEP 4: 未来のヒント（統合型：ハニカム俯瞰 × カード詳細）════════ */
const HINT_NOW = { id:'creator', name:'創造者', sub:'アイデアを形にする' };

const HINT_DEST = [
  { id:'producer', tier:'up', name:'演出家', kana:'プロデューサー', key:'影響力の行使', keyShort:'影響力', reco:true, emoji:'📣',
    catch:'アイデアに「人を動かす力」が加わっていくみたい',
    desc:'自分のアイデアにまわりを巻きこんで、チームで大きく形にしていくキミ。ひとりでは作れないものも、作れるようになっていくかも。',
    scenes:['文化祭の企画役','イベント運営','映像・番組づくり'],
    actions:['行事や班活動で、1回リーダー役に立候補する','自分のアイデアを3人以上に話して感想をもらう'] },
  { id:'driver', tier:'side', name:'推進者', kana:'', key:'実行力', keyShort:'実行力', reco:true, emoji:'🚀',
    catch:'思いついたら、すぐ動けるキミになっていくみたい',
    desc:'アイデアをあたためるだけじゃなく、まず動いてためしながら形にしていくキミ。失敗もデータに変えて前に進めていけるかも。',
    scenes:['部活の企画係','プロトタイプづくり','学級プロジェクト'],
    actions:['思いついたことを、まず小さく1つためしてみる','1週間つづける「毎日ミニ行動」を決める'] },
  { id:'innovator', tier:'up', name:'発明家', kana:'イノベーター', key:'論理的思考', keyShort:'論理的思考', reco:false, emoji:'💡',
    catch:'ひらめきが「発明」に変わっていくかも',
    desc:'思いつきをすじ道立てて設計し、本当に使えるものに仕上げていくキミ。「なんとなく面白い」が「世界を便利にする発明」になっていくみたい。',
    scenes:['研究・開発','商品企画','ものづくり'],
    actions:['好きな商品が「なぜ人気か」を3つ分析してみる','やりたいことを「目的→手順」の順にメモしてみる'] },
  { id:'cocreator', tier:'side', name:'共創者', kana:'', key:'共感・傾聴力', keyShort:'共感力', reco:false, emoji:'🤝',
    catch:'「ひとりで作る」から「みんなで作る」へ広がっていくみたい',
    desc:'仲間の気もちやアイデアを受け取って、いっしょに作品を育てていけるキミ。ひとりではとどかない完成度に近づいていくかも。',
    scenes:['班活動・グループ制作','合唱・演劇','チーム開発'],
    actions:['友だちの相談に「聞き役」として乗ってみる','班活動で、まず全員の意見を1周聞いてみる'] },
  { id:'pioneer', tier:'up', name:'開拓者', kana:'パイオニア', key:'探究心', keyShort:'探究心', reco:false, emoji:'🧭',
    catch:'「見つける力」がついて、道なき道へ進んでいくみたい',
    desc:'まだだれも気づいていないテーマを見つけて、さいしょの一歩をふみ出していくキミ。「作る人」から「切りひらく人」へ広がっていくかも。',
    scenes:['新プロジェクトの立ち上げ','フィールドワーク','冒険的な研究'],
    actions:['気になる「なぜ？」を1つ決めて調べてみる','まだだれもやってない小さな企画を1つ提案する'] },
];

const HINT_DISTANT = [
  { id:'explorer', tier:'side', name:'探索者', kana:'', catch:'「気になる」をどこまでも追いかける' },
  { id:'supporter', tier:'side', name:'支援者', kana:'', catch:'人の力をしずかに引き出す' },
  { id:'changer', tier:'side', name:'変革者', kana:'', catch:'あたりまえをうたがい、変えていく' },
  { id:'leader', tier:'up', name:'統率者', kana:'リーダー', catch:'みんなを動かしゴールへみちびく' },
  { id:'mentor', tier:'up', name:'育成者', kana:'メンター', catch:'人の成長に火をつける' },
  { id:'gamechanger', tier:'up', name:'革新者', kana:'ゲームチェンジャー', catch:'しくみごと未来を変える' },
];

/* ── タイプアイコン（幾何マーク＋やわらかい顔） ── */
const HINT_SYM = (id, c) => {
  const R = React.createElement;
  const S = { stroke:c, strokeWidth:2, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' };
  switch (id) {
    case 'creator': return [R('path',{key:'s',d:'M31 .5L33.3 5.2L38 7.5L33.3 9.8L31 14.5L28.7 9.8L24 7.5L28.7 5.2Z',fill:c})];
    case 'explorer': return [R('circle',{key:'a',cx:31,cy:7.5,r:5.5,...S}),R('path',{key:'b',d:'M31 4l2.2 3.5L31 11l-2.2-3.5Z',fill:c})];
    case 'driver': return [R('path',{key:'s',d:'M31 1L37.5 12.5h-13Z',fill:c})];
    case 'cocreator': return [R('circle',{key:'a',cx:28,cy:7.5,r:4.5,...S}),R('circle',{key:'b',cx:34.5,cy:7.5,r:4.5,...S})];
    case 'supporter': return [R('rect',{key:'a',x:29.5,y:1.5,width:3,height:12,rx:1.5,fill:c}),R('rect',{key:'b',x:25,y:6,width:12,height:3,rx:1.5,fill:c})];
    case 'changer': return [R('polyline',{key:'s',points:'33.5,0.5 27.5,7.5 31.5,7.5 26.5,15',...S,strokeWidth:2.5})];
    case 'pioneer': return [R('rect',{key:'a',x:26.5,y:1,width:2.2,height:14,rx:1,fill:c}),R('path',{key:'b',d:'M29 2l9 3.5L29 9Z',fill:c})];
    case 'innovator': return [R('circle',{key:'a',cx:31,cy:6.5,r:5,...S}),R('rect',{key:'b',x:29,y:13,width:4,height:2.8,rx:1,fill:c})];
    case 'leader': return [R('path',{key:'s',d:'M24.5 13V4.5L28.5 8L31 1.5L33.5 8L37.5 4.5V13Z',fill:c})];
    case 'producer': return [R('circle',{key:'a',cx:31,cy:7.5,r:6.5,...S}),R('path',{key:'b',d:'M29 4.5L35 7.5L29 10.5Z',fill:c})];
    case 'mentor': return [R('circle',{key:'a',cx:31,cy:7.5,r:3.2,fill:c}),R('path',{key:'b',d:'M31 .5v2.5M31 12v2.5M24 7.5h2.5M35.5 7.5H38M26 2.5l1.8 1.8M36 2.5l-1.8 1.8M26 12.5l1.8-1.8M36 12.5l-1.8-1.8',...S})];
    case 'gamechanger': return [R('polyline',{key:'a',points:'26,8.5 31,3.5 36,8.5',...S,strokeWidth:2.5}),R('polyline',{key:'b',points:'26,14.5 31,9.5 36,14.5',...S,strokeWidth:2.5})];
    default: return [];
  }
};
function hintFace(id, size, face='#1f1b16', eye='#ffffff') {
  const R = React.createElement;
  return R('svg',{width:size,height:size,viewBox:'0 0 40 40',style:{display:'block'}},
    R('circle',{cx:19,cy:24,r:13.5,fill:face}),
    R('ellipse',{cx:14.8,cy:22.5,rx:2.7,ry:5.2,fill:eye}),
    R('ellipse',{cx:23.2,cy:22.5,rx:2.7,ry:5.2,fill:eye}),
    ...HINT_SYM(id, face));
}
function hintSym(id, size, c='#1f1b16') {
  const R = React.createElement;
  return R('svg',{width:size,height:size,viewBox:'0 0 40 40',style:{display:'block'}},
    R('g',{transform:'translate(20,20) scale(2) translate(-31,-7.75)'}, ...HINT_SYM(id, c)));
}

const HINT_AXES = ['考え創る','やり抜く','巻き込む','協働する','社会を想う','発見する'];
const HINT_SELF  = [0.88, 0.55, 0.62, 0.45, 0.40, 0.78];
const HINT_OTHER = [0.80, 0.62, 0.70, 0.56, 0.44, 0.70];
const HINT_BOOST = { producer:2, driver:1, innovator:0, cocreator:3, pioneer:5 };

function TorisetsuFuture({ nav, goChallenge, step, goBack }) {
  const saved = (nav.state && nav.state.career) || {};
  const [selId, setSelId] = useTJ(saved.goalId || null);
  const previewRef = React.useRef(null);
  const persist = (patch) => nav.update && nav.update({ career: { ...saved, ...patch } });

  const find = (id) => HINT_DEST.find(d => d.id === id) || null;
  const decorate = (d) => {
    if (!d) return null;
    const up = d.tier === 'up';
    return { ...d, far: false,
      kindLabel: up ? '深める' : 'ひろげる',
      kindBg: up ? '#efe9ff' : '#e4f9ec', kindFg: up ? '#6a4fd8' : '#0f7a4d',
      tierLabel: up ? '深める成長' : 'ひろげる成長' };
  };
  const scrollToPreview = () => {
    const el = previewRef.current;
    if (!el) return;
    let parent = el.parentElement;
    while (parent && getComputedStyle(parent).overflowY === 'visible') parent = parent.parentElement;
    if (parent) parent.scrollTo({ top: el.offsetTop - 12, behavior:'smooth' });
  };
  const pick = (id) => {
    const next = selId === id ? null : id;
    setSelId(next); persist({ goalId: next });
    if (next) setTimeout(scrollToPreview, 80);
  };
  const sel = decorate(find(selId));
  const goFuture = () => {
    if (!sel) return;
    nav.update && nav.update({ futureGoal: { comp: sel.key, name: sel.name, icon: sel.emoji, actions: sel.actions } });
    goChallenge && goChallenge();
  };

  /* レーダー（自己 × 他者 × 未来） */
  const W = 358, CX = 179, CY = 128, R = 88, N = 6;
  const pt = (i, r) => { const a = -Math.PI/2 + i*2*Math.PI/N; return [CX + Math.cos(a)*r, CY + Math.sin(a)*r]; };
  const ring = (g) => HINT_AXES.map((_, i) => pt(i, R*g).join(',')).join(' ');
  const polySelf  = HINT_SELF.map((v, i) => pt(i, R*v).join(',')).join(' ');
  const polyOther = HINT_OTHER.map((v, i) => pt(i, R*v).join(',')).join(' ');
  const boostIdx = selId != null ? HINT_BOOST[selId] : null;
  const futureVals = HINT_SELF.map((v, i) => {
    const base = Math.max(v, HINT_OTHER[i]);
    return i === boostIdx ? Math.min(base + 0.28, 0.99) : base;
  });
  const polyFuture = futureVals.map((v, i) => pt(i, R*v).join(',')).join(' ');
  const legendItem = { display:'inline-flex', alignItems:'center', gap:5, fontSize:9.5, fontWeight:700, color:'#7a7263' };

  return (
    <>
      <StepHead n={2} title="成長のヒント" sub="今のキミの成分に、力を足すとカタチが変わる" />

      {/* ── 成分ブレンド レーダー（自己 × 他者） ── */}
      <div style={{ background:'#fff', border:'1.5px solid #e3d9c4', borderRadius:16, padding:'13px 8px 10px' }}>
        <div style={{ padding:'0 10px' }}>
          <div style={{ fontSize:13, fontWeight:900, fontFamily:TJ.round }}>今のキミの成分ブレンド</div>
          <div style={{ fontSize:9.5, color:'#a89e8a', fontWeight:700, marginTop:2 }}>自己評価と、みんなから見たキミを重ねたよ</div>
        </div>
        <svg viewBox={'0 0 ' + W + ' 256'} style={{ width:'100%', display:'block' }}>
          {[0.33, 0.66, 1].map(g => <polygon key={g} points={ring(g)} fill="none" stroke="#e9e0cc" strokeWidth="1" />)}
          {HINT_AXES.map((_, i) => { const [x, y] = pt(i, R); return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="#e9e0cc" strokeWidth="1" />; })}
          <polygon points={polySelf} fill="rgba(49,92,250,.14)" stroke="#315cfa" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points={polyOther} fill="rgba(46,133,96,.10)" stroke="#2E8560" strokeWidth="2.5" strokeLinejoin="round" />
          {sel && <polygon points={polyFuture} fill="rgba(255,107,94,.08)" stroke="#ff6b5e" strokeWidth="2.5" strokeDasharray="5 5" strokeLinejoin="round" />}
          {sel && boostIdx != null && (() => { const [dx, dy] = pt(boostIdx, R*futureVals[boostIdx]); return <circle cx={dx} cy={dy} r="4.5" fill="#ff6b5e" stroke="#fff" strokeWidth="2" />; })()}
          {HINT_AXES.map((l, i) => { const [lx, ly] = pt(i, R + 20); return <text key={l} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="800" fill={i === boostIdx && sel ? '#ff6b5e' : '#5c5546'} fontFamily={TJ.round}>{l}</text>; })}
        </svg>
        <div style={{ display:'flex', justifyContent:'center', gap:13, flexWrap:'wrap', padding:'2px 8px 4px' }}>
          <span style={legendItem}><span style={{ width:10, height:10, borderRadius:'50%', background:'#315cfa' }}></span>自己</span>
          <span style={legendItem}><span style={{ width:10, height:10, borderRadius:'50%', background:'#2E8560' }}></span>他者</span>
          <span style={legendItem}><span style={{ width:16, height:0, borderTop:'2.5px dashed #ff6b5e', display:'inline-block' }}></span>力を足した未来</span>
        </div>
        {sel ? (
          <div style={{ display:'flex', alignItems:'flex-start', gap:7, background:'#fff0ee', borderRadius:10, padding:'8px 11px', margin:'2px 6px 2px' }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'#ff6b5e', flexShrink:0, marginTop:5 }}></span>
            <span style={{ fontSize:10, color:'#c2483c', fontWeight:700, lineHeight:1.6 }}>点線が、「{sel.key}」を足した未来のキミのカタチだよ</span>
          </div>
        ) : (
          <div style={{ textAlign:'center', fontSize:9.5, color:'#a89e8a', fontWeight:700, padding:'2px 0 4px' }}>下のルートをえらぶと、点線で未来のキミが見えるよ</div>
        )}
      </div>

      {/* ── 進化ルート（成長の可能性） ── */}
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'0 2px' }}>
        <span style={{ fontSize:11, fontWeight:800, fontFamily:TJ.round }}>キミの成長ルート</span>
        <span style={{ fontSize:9, color:'#a89e8a', fontWeight:700 }}>今の力に、新しい力を足してみよう</span>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
        {['producer','driver','innovator','cocreator','pioneer'].map(id => {
          const d = decorate(find(id));
          const on = selId === id;
          return (
            <div key={id} onClick={() => pick(id)}
              style={{ position:'relative', border:'2px solid '+(on?'#315cfa':'#e3d9c4'), background:on?'#e8edff':'#fff', borderRadius:14, padding:'11px 13px', cursor:'pointer', transition:'all .15s' }}>
              {d.reco && <span style={{ position:'absolute', top:-8, right:10, background:'#ff6b5e', color:'#fff', fontSize:7.5, fontWeight:800, borderRadius:999, padding:'2px 7px', border:'1px solid #1f1b16', fontFamily:TJ.round }}>おすすめ</span>}
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ width:38, height:38, borderRadius:11, background:on?'#fff':'#f6f2e7', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{hintSym(id, 24)}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                    <span style={{ background:d.kindBg, color:d.kindFg, fontSize:8, fontWeight:800, borderRadius:999, padding:'2px 8px', fontFamily:TJ.round }}>{d.kindLabel}</span>
                    <span style={{ fontFamily:TJ.round, fontWeight:900, fontSize:13 }}>{d.name}</span>
                    {d.kana && <span style={{ fontSize:7.5, color:'#7a7263', fontWeight:700, letterSpacing:.5 }}>{d.kana}</span>}
                  </div>
                  <div style={{ fontSize:9.5, color:'#7a7263', fontWeight:700, marginTop:3 }}>「{d.key}」を足す — {d.catch}</div>
                </div>
                <span style={{ width:24, height:24, borderRadius:'50%', border:'2px solid '+(on?'#315cfa':'#cfc4ab'), background:on?'#315cfa':'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 詳細 ── */}
      {!sel && (
        <div style={{ textAlign:'center', fontSize:11, color:'#7a7263', fontWeight:600, lineHeight:1.8, padding:'4px 0' }}>気になるルートをえらぶと、<br/>「成長のキミ」とチャレンジへの道が見えてくるよ</div>
      )}
      {sel && (
        <div ref={previewRef} style={{ background:'#fff', border:'2px solid #1f1b16', borderRadius:16, padding:15, boxShadow:'4px 4px 0 #1f1b16' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10, flexWrap:'wrap' }}>
            <span style={{ background:sel.kindBg, color:sel.kindFg, fontSize:9, fontWeight:800, borderRadius:999, padding:'3px 9px', fontFamily:TJ.round }}>{sel.kindLabel}</span>
            <span style={{ fontSize:10.5, fontWeight:800, color:'#2447c9', fontFamily:TJ.round }}>「{sel.key}」をのばすと…</span>
          </div>
          <div style={{ background:'#1f1b16', borderRadius:14, padding:14, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-22, right:-22, width:84, height:84, borderRadius:'50%', background:'rgba(255,214,51,.12)' }}></div>
            <div style={{ fontSize:9, letterSpacing:2, color:'#ffd633', fontWeight:800, marginBottom:6 }}>成長のキミ ・ {sel.tierLabel}</div>
            <div style={{ display:'flex', alignItems:'center', gap:9 }}>
              <span style={{ width:40, height:40, borderRadius:11, background:'rgba(255,255,255,.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{hintSym(sel.id,28,'#ffffff')}</span>
              <div>
                <div style={{ fontFamily:TJ.round, fontWeight:900, fontSize:16, color:'#fff', lineHeight:1.25 }}>「{sel.name}」</div>
                {sel.kana && <div style={{ fontSize:9, color:'rgba(255,255,255,.6)', fontWeight:700, letterSpacing:1, marginTop:2 }}>{sel.kana}</div>}
              </div>
            </div>
            <div style={{ fontSize:11, color:'#ffd633', fontWeight:800, marginTop:8, fontFamily:TJ.round }}>{sel.catch}</div>
            <p style={{ fontSize:10.5, color:'rgba(255,255,255,.82)', lineHeight:1.75, fontWeight:500, margin:'5px 0 0' }}>{sel.desc}</p>
            <div style={{ borderTop:'1px solid rgba(255,255,255,.14)', marginTop:11, paddingTop:9 }}>
              <div style={{ fontSize:9, color:'rgba(255,255,255,.6)', fontWeight:700, marginBottom:6 }}>活やくのイメージ</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                {sel.scenes.map(s => <span key={s} style={{ background:'rgba(255,255,255,.12)', color:'#fff', borderRadius:999, padding:'3px 10px', fontSize:9.5, fontWeight:700, fontFamily:TJ.round }}>{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {sel && (
        <>
          <button onClick={goFuture}
            style={{ width:'100%', background:TJ.orangeGrad, color:'#fff', border:'none', borderRadius:999, padding:15, fontFamily:TJ.round, fontWeight:800, fontSize:14, cursor:'pointer', boxShadow:'0 8px 20px rgba(255,107,94,.34)', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <FIcon name="fire" size={17} color="#fff" /> 「{sel.key}」をのばすチャレンジへ
          </button>
          <div style={{ fontSize:10.5, color:TJ.sub, fontWeight:600, textAlign:'center', padding:'0 0 4px' }}>チャレンジ画面に「めざす成長」がセットされるよ</div>
        </>
      )}
    </>
  );
}

/* ── ステップインジケーター＆フッターナビ（トリセツ統合UI） ── */
const TORI_STEPS = ['今のキミ','成長のヒント'];

const TORI_STEP_CHIPS = [['📖','今のキミ'],['💡','成長のヒント']];

function ToriStepIndicator({ step, onJump, freeJump }) {
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
          const locked = !freeJump && n > step;
          return (
            <button key={n} onClick={() => !locked && onJump(n)} disabled={locked} aria-disabled={locked}
              style={{ flexShrink:0, display:'flex', alignItems:'center', gap:6, border: '1.5px solid ' + (active || done ? '#1f1b16' : '#e3d9c4'), cursor: locked ? 'default' : 'pointer',
                borderRadius:10, padding:'8px 14px', fontFamily:TJ.round, fontWeight:800, fontSize:11.5,
                background: active ? '#1f1b16' : done ? '#ffd633' : '#fffbf2',
                color: active ? '#ffd633' : done ? '#1f1b16' : locked ? '#c9bfa8' : '#7a7263',
                opacity: locked ? .7 : 1,
                boxShadow: active ? '2px 2px 0 rgba(31,27,22,.22)' : 'none' }}>
              <span style={{ display:'flex', alignItems:'center' }}>{done ? <span style={{ fontSize:13, fontWeight:900 }}>✓</span> : locked ? <FIcon name="lock" size={12} color="#c3c9ce" /> : <Emo e={icon} size={14} />}</span>{label}
            </button>
          );
        })}
      </div>
      <div style={{ height:3, background:'#eef1f4' }}>
        <div style={{ height:'100%', width:`${(step / 2) * 100}%`, background:'#315cfa' }}></div>
      </div>
    </div>
  );
}

function ToriStepNav({ step, goStep, onShare }) {
  const first = step === 1, last = step === 2;
  const nextLabel = last ? null : TORI_STEP_CHIPS[step][1];
  const circ = (disabled) => ({
    width:46, height:46, borderRadius:'50%', border:'none', flexShrink:0,
    background:'#fff',
    boxShadow: disabled ? 'inset 0 0 0 1.5px #e7eaec' : 'inset 0 0 0 1.5px #cfc4ab, 0 2px 8px rgba(20,40,60,.06)',
    color: disabled ? '#ccd2d7' : TJ.text, cursor: disabled ? 'default' : 'pointer',
    display:'flex', alignItems:'center', justifyContent:'center',
  });
  return (
    <div style={{ display:'flex', gap:10, alignItems:'center', marginTop:6 }}>
      <button onClick={() => !first && goStep(step - 1)} disabled={first} aria-label="もどる" style={circ(first)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
      </button>
      {last ? (
        <button onClick={() => goStep(1)}
          style={{ flex:1, height:50, background:'transparent', color:TJ.sub, border:`1.5px solid ${TJ.border}`, borderRadius:999, fontFamily:TJ.round, fontWeight:700, fontSize:12.5, cursor:'pointer', boxShadow:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
          トリセツを見直す
        </button>
      ) : (
        <button onClick={() => goStep(step + 1)}
          style={{ flex:1, height:50, background:TJ.orangeGrad, color:'#fff', border:'none', borderRadius:999, fontFamily:TJ.round, fontWeight:800, fontSize:13.5, cursor:'pointer', boxShadow:'0 8px 20px rgba(255,107,94,.34)', display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'0 18px' }}>
          <span style={{ opacity:.85, fontSize:11, fontWeight:700 }}>つぎへ</span>
          <span style={{ whiteSpace:'nowrap' }}>{nextLabel}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7"/></svg>
        </button>
      )}
    </div>
  );
}

Object.assign(window, { TorisetsuJourneyExt, TorisetsuStrengths, TorisetsuFuture, Top3Section, TypeHeroSection, VoicesSection, ToriStepIndicator, ToriStepNav, JStepHead: StepHead });
