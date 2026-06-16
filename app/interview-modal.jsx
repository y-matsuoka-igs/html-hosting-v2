// interview-modal.jsx — インタビュー用「一旦停止」共通モーダル
// 指定画面で表示。「次へ進む」で閉じ、画面を再訪すると再度表示される。
function InterviewPause() {
  const FIcon = window.FIcon;
  const [show, setShow] = React.useState(true);
  if (!show) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(15,30,45,.72)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 'var(--r-xl)', padding: '34px 26px 26px', width: '100%', maxWidth: 360, textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
            {FIcon ? <FIcon name="hourglass" size={34} color="var(--blue)" /> : null}
          </div>
        </div>
        <h2 style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 25, color: 'var(--text)', lineHeight: 1.45, letterSpacing: '-.5px' }}>ここで一旦<br />止めてください！</h2>
        <p style={{ fontSize: 14, color: 'var(--text-sub)', fontWeight: 600, marginTop: 14, lineHeight: 1.7 }}>次の指示があるまで<br />お待ちください</p>
        <button className="btn btn--primary btn--lg" style={{ marginTop: 24 }} onClick={() => setShow(false)}>次へ進む</button>
      </div>
    </div>
  );
}

Object.assign(window, { InterviewPause });
