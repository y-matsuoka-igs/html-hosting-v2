// screens-eval.jsx — 自己評価(Q1-5) / 他者評価(Q1-5) — 元HTML準拠の4段階ルーブリック
const { useState: useSe } = React;

// 自己評価：5つのコンピテンシー（statement + 4段階の選択肢、低→高）
const SELF_Q = [
  { stmt: '状況を的確に把握し「何をすべきか」「どうやって成し遂げるか」を自分で考え出すことができる。',
    opts: [
      '問題に気づいていても、自分で課題を設定するのが難しいと感じる',
      '指示や助けがあれば、課題を理解して取り組むことができる',
      '状況を把握し「何をすべきか」を自分で考えて行動できる',
      '複雑な状況でも多角的に分析し、最適な課題を設定して周囲を導ける' ] },
  { stmt: '周りが思い付かないような独自のアイデアを出し、実現への道筋を示すことができる。',
    opts: [
      '既存のやり方に沿って行動することが多く、新しいアイデアは出しにくい',
      '求められれば意見は出せるが、独自性を出すのは難しい',
      '周りとは異なる視点でアイデアを提案し、実現に向けて動ける',
      '誰も思いつかないアイデアを次々と生み出し、周囲を巻き込んで実現できる' ] },
  { stmt: '何があっても諦めずに最後まで物事をやり遂げ、自ら進んで取り組むことができる。',
    opts: [
      '困難があると途中で諦めてしまうことが多い',
      'サポートがあれば最後までやり遂げることができる',
      '自ら進んで取り組み、困難があっても諦めずやり遂げられる',
      'どんな状況でも強い意志で行動を継続し、周囲の模範となっている' ] },
  { stmt: 'どんな場面・相手でも積極的に関わり、自分から新しい人間関係を構築することができる。',
    opts: [
      '新しい環境や初対面の人が苦手で、自分から関わることが少ない',
      '紹介されれば打ち解けられるが、自分から動くのは難しい',
      'どんな場面でも積極的に関わり、自ら新しい関係を構築できる',
      '未知の環境でも即座に溶け込み、多様な人と深い信頼関係を築ける' ] },
  { stmt: '相手の話を真剣に聴き、深いレベルで理解し、相手の気持ちを尊重することができる。',
    opts: [
      '相手の話を聞いているが、相手の気持ちまで理解するのが難しい',
      '相手の話をしっかり聞き、大まかな気持ちを理解することができる',
      '相手を深いレベルで理解し、共感を示しながら関係を築ける',
      '相手の言葉の裏にある感情まで読み取り、相手が自然と話しやすい空間を作れる' ] },
];

// 他者評価：「あおいさん」を評価（元はOOさん）
const PEER_NAME = 'あおい';
const OTHER_Q = [
  { stmt: '$さんは他者に対して自分の考えや目的を伝えながら、ともに協働して物事を進めることができる。',
    opts: [
      '$さんはあまり周囲に働きかけず、自分のペースで動くことが多い',
      '$さんは求められれば意見を伝えるが、積極的に周囲を動かすことは少ない',
      '$さんは自分の考えを伝えながら、周囲と協力して物事を進めることができる',
      '$さんは高い影響力で周囲を動かし、チーム全体の方向性をリードできる' ] },
  { stmt: '$さんはどんな状況であっても、周囲に正しい行いをするように働き掛けることができる。',
    opts: [
      '$さんは自分の利益を優先することが多く、正しい行いを促す場面は少ない',
      '$さんは自分では正しく行動しているが、周囲への働きかけはあまりない',
      '$さんはどんな状況でも誠実に行動し、周囲にも正しい行いを促せる',
      '$さんは高い倫理観で常に模範となり、組織全体の信頼の柱になっている' ] },
  { stmt: '$さんは変化への対応力とともに、その場で機転を利かせて行動を適宜修正することができる。',
    opts: [
      '$さんは変化に対して戸惑うことが多く、対応に時間がかかる傾向がある',
      '$さんは時間をかければ変化に適応できるが、機転を利かせるのは難しい',
      '$さんは変化への対応力があり、その場で機転を利かせて行動を修正できる',
      '$さんはどんな変化にも即座に対応し、新しい状況でも高いパフォーマンスを発揮できる' ] },
  { stmt: '$さんは自分とは考えや意見の異なる相手に対しても理解を示し、それを許容することができる。',
    opts: [
      '$さんは自分と異なる意見に対して、受け入れることが難しそうに見える',
      '$さんは異なる意見も表面上は受け入れるが、深く理解するまでには至らない',
      '$さんは異なる考えの相手にも理解を示し、許容する態度を持っている',
      '$さんは多様な価値観を積極的に取り入れ、対立をまとめる力がある' ] },
  { stmt: '$さんは組織の目的や目標を正しく理解した上で、その実現のために真剣に取り組むことができる。',
    opts: [
      '$さんは自分の役割はこなしているが、組織目標への関心はあまり高くない',
      '$さんは組織の目標を理解しているが、自発的な貢献は限られている',
      '$さんは組織の目的を正しく理解し、その実現のために真剣に取り組んでいる',
      '$さんは組織への強い愛着を持ち、自己利益を超えて組織の発展に貢献している' ] },
];

/* 共通：1問の評価画面 */
function EvalQuestion({ kind, qList, accent, label, store, onComplete, nameSub }) {
  const nav = useNav();
  const total = qList.length;
  const saved = nav.state[store].answers || {};
  const first = qList.findIndex((_, i) => saved[i] === undefined);
  const [q, setQ] = useSe(first < 0 ? 0 : first);
  const [sel, setSel] = useSe(saved[q] ?? null);
  const item = qList[q];
  const stmt = nameSub ? item.stmt.replaceAll('$', nameSub) : item.stmt;
  const pct = ((q + 1) / total) * 100;

  const choose = (i) => setSel(i);
  const next = () => {
    if (sel === null) return;
    const answers = { ...nav.state[store].answers, [q]: sel };
    if (q + 1 >= total) {
      nav.update(s => ({ [store]: { answers, done: true } }));
      onComplete();
    } else {
      nav.update(s => ({ [store]: { ...s[store], answers } }));
      setQ(q + 1);
      setSel(answers[q + 1] ?? null);
    }
  };

  return (
    <div className="screen screen--white">
      <StatusBar />
      <AppHeader noMenu />
      <div style={{ padding: '10px 16px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11.5, color: 'var(--text-sub)', fontWeight: 700 }}>{label}　Q{q + 1} / {total}</span>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: accent }}>{q + 1} / {total}</span>
        </div>
        <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3 }}>
          <div style={{ width: `${pct}%`, height: '100%', background: accent, borderRadius: 3, transition: 'width .4s' }}></div>
        </div>
      </div>

      <div className="scroll pad stack">
        <div className="card fade-in" key={q} style={{ borderRadius: 'var(--r-md)' }}>
          {nameSub && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13 }}>{nameSub[0]}</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-sub)' }}>{nameSub}さんについて</span>
            </div>
          )}
          <p style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', lineHeight: 1.75, marginBottom: 14, textWrap: 'pretty' }}>{stmt}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {item.opts.map((o, i) => {
              const on = sel === i;
              return (
                <button key={i} onClick={() => choose(i)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '13px 14px', borderRadius: 'var(--r-md)', cursor: 'pointer', textAlign: 'left',
                    border: `2px solid ${on ? accent : 'var(--border-soft)'}`, background: on ? `${accent}10` : '#fff', transition: 'all .15s', WebkitTapHighlightColor: 'transparent' }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${on ? accent : 'var(--border)'}`, background: on ? accent : '#fff', flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </span>
                  <span style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.6, fontWeight: on ? 600 : 400 }}>{nameSub ? o.replaceAll('$', nameSub) : o}</span>
                </button>
              );
            })}
          </div>
        </div>
        <button className="btn btn--lg" disabled={sel === null}
          style={{ background: sel === null ? 'var(--border)' : accent, color: '#fff', boxShadow: sel === null ? 'none' : 'var(--shadow)' }}
          onClick={next}>次へ</button>
      </div>
    </div>
  );
}

/* 強み評価（フリーワード）— 他者評価の最後 */
function StrengthEvalScreen() {
  const nav = useNav();
  const accent = '#ff6b5e';
  const [tags, setTags] = useSe(nav.state.other.strengths || []);
  const [text, setText] = useSe('');
  const add = () => {
    const w = text.trim();
    if (!w || tags.includes(w)) { setText(''); return; }
    const next = [...tags, w];
    setTags(next);
    nav.update(s => ({ other: { ...s.other, strengths: next } }));
    setText('');
  };
  const remove = (w) => {
    const next = tags.filter(t => t !== w);
    setTags(next);
    nav.update(s => ({ other: { ...s.other, strengths: next } }));
  };
  return (
    <div className="screen screen--white">
      <StatusBar />
      <AppHeader noMenu />
      <div style={{ padding: '10px 16px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11.5, color: 'var(--text-sub)', fontWeight: 700 }}>相互評価　強み（フリーワード）</span>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: accent }}>最後のステップ</span>
        </div>
        <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3 }}>
          <div style={{ width: '100%', height: '100%', background: accent, borderRadius: 3 }}></div>
        </div>
      </div>
      <div className="scroll pad stack">
        <div className="card fade-in" style={{ borderRadius: 'var(--r-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13 }}>{PEER_NAME[0]}</div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-sub)' }}>{PEER_NAME}さんについて</span>
          </div>
          <p style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', lineHeight: 1.75, marginBottom: 14, textWrap: 'pretty' }}>{PEER_NAME}さんの長所など、優れているところをフリーワードで入力してね。</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={text} onChange={e => setText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') add(); }}
              placeholder="例) 英会話力"
              style={{ flex: 1, minWidth: 0, border: '2px solid var(--border-soft)', borderRadius: 'var(--r-md)', padding: '11px 13px', fontSize: 13.5, fontFamily: 'inherit', fontWeight: 600, color: 'var(--text)', outline: 'none', background: '#fff' }} />
            <button onClick={add} disabled={!text.trim()}
              style={{ flexShrink: 0, border: 'none', borderRadius: 999, padding: '0 22px', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13.5, color: '#fff', cursor: 'pointer',
                background: text.trim() ? 'var(--green)' : 'var(--border)', boxShadow: text.trim() ? 'var(--shadow)' : 'none', transition: 'all .15s' }}>追加</button>
          </div>
        </div>
        <div className="card" style={{ borderRadius: 'var(--r-md)', minHeight: 170 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>{PEER_NAME}さんの強みは</div>
          {tags.length === 0 ? (
            <p style={{ fontSize: 12, color: 'var(--text-sub)', lineHeight: 1.7 }}>まだありません。上の欄から追加してみよう！</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {tags.map(w => (
                <span key={w} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', background: accent, color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13, padding: '7px 14px', borderRadius: 8 }}>
                  {w}
                  <button onClick={() => remove(w)} aria-label="削除"
                    style={{ position: 'absolute', top: -8, right: -8, width: 20, height: 20, borderRadius: '50%', border: 'none', background: '#8d8d8d', color: '#fff', fontSize: 11, lineHeight: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>×</button>
                </span>
              ))}
            </div>
          )}
        </div>
        <button className="btn btn--lg" disabled={tags.length === 0}
          style={{ background: tags.length === 0 ? 'var(--border)' : accent, color: '#fff', boxShadow: tags.length === 0 ? 'none' : 'var(--shadow)' }}
          onClick={() => nav.go('task-complete')}>次へ</button>
      </div>
    </div>
  );
}

/* ─────────── 自己評価 開始 ─────────── */
function StartSelfScreen() {
  const nav = useNav();
  return (
    <div className="screen screen--white">
      <StatusBar />
      <AppHeader sub="自己評価" noMenu />
      <div className="scroll" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, minHeight: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '12px 30px 24px', gap: 6 }}>
          <Pill style={{ background: 'var(--blue-soft)', color: 'var(--blue-dark)' }}>STEP 2 / 3</Pill>
          <div style={{ margin: '18px 0 6px', display: 'flex', justifyContent: 'center', color: 'var(--blue)' }}><FIcon name="pencil" size={64} sw={1.6} /></div>
          <h1 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.5 }}>自己評価を開始しましょう</h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-sub)', fontWeight: 600, marginTop: 8, lineHeight: 1.8, textAlign: 'left' }}>
            これから、あなた自身に関する質問にいくつかお答えいただきます。画面の上部に質問が出ますので、4つの選択肢の内から当てはまる答えを選択し、「次へ」を押して回答してください。 一度回答した質問には戻ることができませんので、間違いのないよう正確に回答してください。
          </p>
        </div>
        <div style={{ flexShrink: 0, padding: '0 24px 26px' }}>
          <button className="btn btn--cta btn--lg" onClick={() => nav.go('self-eval')}>自己評価をはじめる</button>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-sub)', marginTop: 12 }}>全 5 問 約 3 分</p>
        </div>
      </div>
    </div>
  );
}

function SelfEvalScreen() {
  const nav = useNav();
  return <EvalQuestion store="self" qList={SELF_Q} accent="#315cfa" label="自己評価"
    onComplete={() => nav.go('self-complete', { kind: 'self' })} />;
}
function OtherEvalScreen() {
  const nav = useNav();
  return <EvalQuestion store="other" qList={OTHER_Q} accent="#ff6b5e" label="相互評価" nameSub={PEER_NAME}
    onComplete={() => nav.go('strength-eval')} />;
}

Object.assign(window, { StartSelfScreen, SelfEvalScreen, OtherEvalScreen, StrengthEvalScreen, SELF_Q, OTHER_Q });
