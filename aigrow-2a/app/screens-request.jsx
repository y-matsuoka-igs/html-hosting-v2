// screens-request.jsx — まわりから届いた評価リクエストの確認（承諾／辞退）
const { useState: useRq } = React;

const INCOMING_REQUESTS = [
  { id: 'r1', name: '入江 平作', grade: '2年 B組', course: '自己・相互の全問題', sent: '2026-05-02 18:40',
    period: '2026-05-01 13:15 〜 2026-07-04 00:00', msg: '同じ班だったよね。よかったら相互評価おねがい！' },
  { id: 'r2', name: '青田 徳彦', grade: '2年 A組', course: 'IAT', sent: '2026-05-02 12:05',
    period: '2026-04-27 11:05 〜 2026-07-04 00:00', msg: '部活のメンバーとして評価してほしいです。' },
];

function Avatar({ name, size = 46, bg = 'var(--blue-soft)', color = 'var(--blue-dark)' }) {
  return (
    <span style={{ width: size, height: size, flexShrink: 0, borderRadius: '50%', background: bg, color, border: '2px solid #1f1b16',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: size * 0.42 }}>
      {name.slice(0, 1)}
    </span>
  );
}

/* ─────────── 詳細モーダル（誰から届いたか／断る・承諾する） ─────────── */
function RequestDetailModal({ req, onDecline, onAccept, onClose }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 22px', background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(2px)' }}>
      <div className="fade-in" style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: 18, overflow: 'hidden', border: '2px solid #1f1b16', boxShadow: '6px 6px 0 #1f1b16' }}>
        <div style={{ background: 'var(--blue)', padding: '20px 20px 18px', textAlign: 'center', color: '#fff' }}>
          <div style={{ marginBottom: 6, display: 'flex', justifyContent: 'center' }}><FIcon name="handshake" size={38} color="#fff" /></div>
          <div style={{ fontFamily: 'var(--font-round)', fontSize: 18, fontWeight: 900, lineHeight: 1.4 }}>評価リクエストが届いています</div>
        </div>
        <div style={{ padding: '18px 20px 20px' }}>
          {/* 誰から */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--blue-softer)', border: '1px solid var(--border-soft)', borderRadius: 'var(--r-md)', padding: '13px 14px', marginBottom: 12 }}>
            <Avatar name={req.name} size={48} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-sub)' }}>リクエストした人</div>
              <div style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 17, lineHeight: 1.3 }}>{req.name}</div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-sub)', marginTop: 1 }}>{req.grade}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
            {[['コース', req.course], ['受検期間', req.period], ['受信日時', req.sent]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 10, fontSize: 12 }}>
                <span style={{ flexShrink: 0, width: 62, fontWeight: 700, color: 'var(--text-sub)' }}>{k}</span>
                <span style={{ fontWeight: 700, color: 'var(--text)', lineHeight: 1.5 }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#fffdf5', border: '1px solid #f0e3b8', borderRadius: 'var(--r-md)', padding: '11px 13px', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', lineHeight: 1.7, marginBottom: 16 }}>
            「{req.msg}」
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onDecline}
              style={{ flex: 1, cursor: 'pointer', background: '#fff', color: 'var(--text)', border: '2px solid #1f1b16', borderRadius: 999, boxShadow: '3px 3px 0 #1f1b16', padding: '13px 8px', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14 }}>
              断る
            </button>
            <button className="btn btn--cta" onClick={onAccept} style={{ flex: 1, width: 'auto', padding: '13px 8px' }}>承諾する</button>
          </div>
          <button onClick={onClose}
            style={{ width: '100%', marginTop: 10, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: 'var(--text-sub)' }}>
            あとで決める
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── 結果モーダル（断った／承諾した） ─────────── */
function RequestResultModal({ kind, req, onClose }) {
  const declined = kind === 'declined';
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 22px', background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(2px)' }}>
      <div className="fade-in" style={{ width: '100%', maxWidth: 380, background: '#fff', borderRadius: 18, overflow: 'hidden', border: '2px solid #1f1b16', boxShadow: '6px 6px 0 #1f1b16', textAlign: 'center' }}>
        <div style={{ background: declined ? '#8a8579' : 'var(--green)', padding: '24px 20px 20px', color: '#fff' }}>
          <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
            <FIcon name={declined ? 'warning' : 'check'} size={40} color="#fff" />
          </div>
          <div style={{ fontFamily: 'var(--font-round)', fontSize: 19, fontWeight: 900, lineHeight: 1.45 }}>
            {declined ? 'リクエストを\nキャンセルしました'.split('\n').map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)
                      : <>「お友達からの評価依頼一覧」<br />に追加されました</>}
          </div>
        </div>
        <div style={{ padding: '18px 20px 20px' }}>
          <p style={{ fontSize: 12.5, color: 'var(--text-sub)', fontWeight: 600, lineHeight: 1.8, marginBottom: 16 }}>
            {declined
              ? <>{req.name} さんからの評価リクエストは<br />辞退しました。相手には通知されません。</>
              : <>{req.name} さんの評価は、受検タブの<br />「お友達からの評価依頼一覧」から<br />いつでも回答できるよ。</>}
          </p>
          <button className="btn btn--cta btn--lg" onClick={onClose}>{declined ? 'とじる' : '評価依頼一覧を見る'}</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── 一覧画面 ─────────── */
function EvalRequestScreen() {
  const nav = useNav();
  const [status, setStatus] = useRq({});           // id → 'accepted' | 'declined'
  const [openId, setOpenId] = useRq(INCOMING_REQUESTS[0].id);
  const [result, setResult] = useRq(null);         // { kind, req }

  const open = INCOMING_REQUESTS.find(r => r.id === openId);
  const pending = INCOMING_REQUESTS.filter(r => !status[r.id]).length;

  const decide = (req, kind) => {
    setStatus(s => ({ ...s, [req.id]: kind }));
    setOpenId(null);
    setResult({ kind, req });
  };

  return (
    <div className="screen" style={{ position: 'relative' }}>
      <StatusBar />
      <AppHeader sub="評価リクエスト" noMenu />
      <div className="scroll pad stack">
        <div style={{ background: 'var(--blue)', borderRadius: 'var(--r-lg)', padding: '15px 16px', color: '#fff', border: '2px solid #1f1b16', boxShadow: '4px 4px 0 #1f1b16', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FIcon name="megaphone" size={22} color="#fff" />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 15 }}>評価リクエストが届いています</div>
            <div style={{ fontSize: 11, opacity: .88, fontWeight: 600, marginTop: 2 }}>
              {pending > 0 ? `未対応 ${pending} 件 — 承諾するか、断るかを選ぼう` : 'すべて対応が完了したよ'}
            </div>
          </div>
        </div>

        <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-sub)', fontFamily: 'var(--font-round)', padding: '2px 2px 0' }}>届いたリクエスト</div>
        <div className="card" style={{ padding: '4px 16px' }}>
          {INCOMING_REQUESTS.map((r, i) => {
            const st = status[r.id];
            return (
              <div key={r.id} onClick={() => !st && setOpenId(r.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', cursor: st ? 'default' : 'pointer', borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none', opacity: st ? .62 : 1 }}>
                <Avatar name={r.name} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-round)', fontSize: 15.5, fontWeight: 900, color: 'var(--text)' }}>{r.name}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-sub)', marginTop: 2 }}>{r.grade}・{r.course}</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-sub)', marginTop: 3 }}>受信: {r.sent}</div>
                </div>
                {st
                  ? <span style={{ flexShrink: 0, fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 11, padding: '5px 10px', borderRadius: 999,
                      background: st === 'accepted' ? 'var(--green-soft)' : '#efece6', color: st === 'accepted' ? '#2E7D32' : 'var(--text-sub)' }}>
                      {st === 'accepted' ? '承諾済み' : '辞退した'}
                    </span>
                  : <span style={{ flexShrink: 0, fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 11.5, padding: '7px 12px', borderRadius: 999, background: 'var(--blue-soft)', color: 'var(--blue-dark)' }}>確認する</span>}
              </div>
            );
          })}
        </div>

        <p style={{ fontSize: 11, color: 'var(--text-sub)', lineHeight: 1.7, textAlign: 'center' }}>
          承諾すると、受検タブの「お友達からの評価依頼一覧」に追加されるよ
        </p>
        <button className="btn btn--lg" style={{ background: '#fff', color: 'var(--text)', border: '2px solid #1f1b16', boxShadow: '3px 3px 0 #1f1b16' }}
          onClick={() => { nav.update && nav.update({ examCourses: true }); nav.tab ? nav.tab('exam') : nav.go('exam'); }}>
          受検タブへもどる
        </button>
      </div>

      {open && !result && (
        <RequestDetailModal req={open}
          onDecline={() => decide(open, 'declined')}
          onAccept={() => decide(open, 'accepted')}
          onClose={() => setOpenId(null)} />
      )}
      {result && (
        <RequestResultModal kind={result.kind} req={result.req}
          onClose={() => {
            const accepted = result.kind === 'accepted';
            setResult(null);
            if (accepted) { nav.update && nav.update({ examCourses: true }); nav.tab ? nav.tab('exam') : nav.go('exam'); }
          }} />
      )}
    </div>
  );
}

Object.assign(window, { EvalRequestScreen, INCOMING_REQUESTS });
