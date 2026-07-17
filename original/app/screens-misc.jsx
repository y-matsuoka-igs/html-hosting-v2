// screens-misc.jsx — 機能解放通知（announce）
const { useState: useSm, useEffect: useEm } = React;

const UNLOCKS = [
{ emoji: 'book', title: 'トリセツが完成しました', desc: 'キミだけの取扱説明書が見られるよ', color: 'var(--green)' },
{ emoji: 'link', title: 'トリセツをシェアできる', desc: '友だちや先生に結果を送れるよ', color: 'var(--blue)' },
{ emoji: 'footsteps', title: 'チャレンジ機能が解放', desc: 'AiGROWが次の行動を提案するよ', color: 'var(--orange)' }];


function AnnounceScreen() {
  const nav = useNav();
  const [show, setShow] = useSm(false);
  useEm(() => {const t = setTimeout(() => setShow(true), 80);nav.update({ seenAnnounce: true });return () => clearTimeout(t);}, []);

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg,#FC8524,#ef6f0a)', position: 'relative', overflow: 'hidden' }}>
      <StatusBar dark />
      {/* confetti dots */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .9 }}>
        {[['#fff', 12, 18, 0], ['#ffe08a', 80, 12, .3], ['#fff', 65, 30, .6], ['#bdf5d0', 30, 70, .2], ['#fff', 88, 60, .5], ['#ffd0e0', 15, 50, .8]].map(([c, l, top, d], i) =>
        <div key={i} style={{ position: 'absolute', left: `${l}%`, top: `${top}%`, width: 10, height: 10, borderRadius: i % 2 ? '50%' : 2, background: c, animation: `floaty 2.4s ${d}s ease-in-out infinite`, transform: 'rotate(20deg)' }}></div>
        )}
      </div>

      <div className="scroll" style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
        <div style={{ flex: 1, minHeight: 540, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 76, transform: show ? 'scale(1)' : 'scale(0)', transition: 'transform .5s cubic-bezier(.2,1.3,.4,1.3)', color: '#fff', display: 'flex', justifyContent: 'center' }}><FIcon name="party" size={70} sw={1.6} /></div>
          <h1 style={{ fontFamily: 'var(--font-round)', fontSize: 26, fontWeight: 900, color: '#fff', marginTop: 8, lineHeight: 1.4 }}>新しい機能が<br />解放されたよ！</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.92)', fontWeight: 600, marginTop: 10 }}>3つの評価が完了！おめでとう</p>

          <div style={{ width: '100%', marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {UNLOCKS.map((u, i) =>
            <div key={i} style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 13, boxShadow: 'var(--shadow)',
              transform: show ? 'translateY(0)' : 'translateY(24px)', opacity: show ? 1 : 0, transition: `all .45s ${0.2 + i * 0.12}s cubic-bezier(.2,.9,.3,1.2)` }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, flexShrink: 0, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: u.color }}>{u.emoji ? <FIcon name={u.emoji} size={22} /> : null}</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>{u.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 500 }}>{u.desc}</div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ flexShrink: 0, padding: '4px 24px 26px' }}>
          <button className="btn btn--lg" style={{ background: '#fff', color: 'var(--orange-dark)', boxShadow: 'var(--shadow-lg)' }} onClick={() => nav.go('home')}>トリセツを見る</button>
          <button className="btn" style={{ background: 'transparent', color: 'rgba(255,255,255,.9)', marginTop: 6 }} onClick={() => nav.go('exam')}>受検タブに戻る</button>
        </div>
      </div>
    </div>);

}

Object.assign(window, { AnnounceScreen });

/* ─────────── タスク完了：キミの性格・傾向コメント（元HTML準拠） ─────────── */
const TC_TRAITS = [
{ emoji: 'bulb', title: 'アイデアの豊かさ', desc: '気質の「開放性の高さ」と「創造性」が組み合わさり、誰も思いつかない発想を生み出す力があります', bg: 'var(--green-soft)', color: '#2E7D32' },
{ emoji: 'rocket', title: '自律的な実行力', desc: '「自律性の高さ」と「個人的実行力」が支え合い、目標に向かって粘り強く動き続けられます', bg: '#e3f0ff', color: '#0069b5' },
{ emoji: 'handshake', title: '深い共感力', desc: '「繊細性」と「共感・傾聴力」により、相手の気持ちを察して丁寧に関わることができます', bg: '#fff3e0', color: '#E65100' }];


function TaskCompleteScreen() {
  const nav = useNav();
  const Pause = window.InterviewPause;
  return (
    <div className="screen">
      <StatusBar />
      <AppHeader />
      <div className="scroll pad stack">
        {/* hero */}
        <div className="fade-in" style={{ background: 'linear-gradient(135deg,#1aa6ff,#0069b5)', borderRadius: 'var(--r-lg)', padding: '24px 20px', textAlign: 'center', color: '#fff', boxShadow: 'var(--shadow-blue)' }}>
          <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center', color: '#fff' }}><FIcon name="party" size={40} /></div>
          <div style={{ fontFamily: 'var(--font-round)', fontSize: 19, fontWeight: 900, lineHeight: 1.4 }}>キミのタスクが<br />全て完了したよ！</div>
          <div style={{ fontSize: 12, opacity: .9, lineHeight: 1.7, marginTop: 8 }}>気質診断・自己評価・相互評価、<br />お疲れさまでした！</div>
        </div>

        {/* トリセツ完成まであと一歩！（強調メッセージ） */}
        <div style={{ background: 'linear-gradient(135deg,#fff3e0,#ffe7cf)', borderRadius: 'var(--r-md)', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', flexShrink: 0 }}><FIcon name="sprout" size={19} color="var(--orange)" /></div>
          <div style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 15, color: 'var(--orange-dark)', lineHeight: 1.4 }}>トリセツ完成まであと一歩！</div>
        </div>

        {/* 注意：トリセツ完成まであと一歩 */}
        <div style={{ background: '#fff8e1', borderRadius: 'var(--r-md)', padding: '14px 16px', borderLeft: '4px solid var(--orange)' }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: '#E65100', marginBottom: 6, lineHeight: 1.6 }}><span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 5 }}><FIcon name="book" size={14} color="#E65100" /> <span>みんなの相互評価が完了すると「トリセツ」が完成するよ</span></span></div>
          <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7, fontWeight: 500 }}>トリセツが完成するまで、キミ自身が認識している性格と潜在的な気質の結果を確認してみよう</p>
        </div>

        {/* キミの性格・傾向コメント */}
        <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(135deg,var(--blue),#00BFA5)', color: '#fff', padding: '11px 16px', fontFamily: 'var(--font-round)', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}><FIcon name="search" size={15} color="#fff" /> キミの性格・傾向コメント</div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* 総合タイプ */}
            <div style={{ background: 'var(--blue-softer)', borderRadius: 'var(--r-md)', padding: 14, borderLeft: '3px solid var(--blue)' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--blue)', marginBottom: 6 }}>総合タイプ</div>
              <div style={{ fontFamily: 'var(--font-round)', fontSize: 15, fontWeight: 900, color: 'var(--text)', marginBottom: 8, lineHeight: 1.45 }}>アイデアと実行力を兼ね備えた<br />「行動する創造者」タイプ</div>
              <p style={{ fontSize: 12, color: 'var(--text-sub)', lineHeight: 1.85, fontWeight: 500 }}>新しいアイデアを次々と生み出しながら、自分の力で形にしていく力がキミの核心。エネルギッシュな挑戦者で人との関わりから刺激を受けやすく、それがさらにエネルギーとなって行動を加速させます。</p>
            </div>
          </div>
        </div>

        <button className="btn btn--cta btn--lg" onClick={() => nav.go('exam')}>ホームへ進む</button>
      </div>
    </div>);

}

Object.assign(window, { TaskCompleteScreen });