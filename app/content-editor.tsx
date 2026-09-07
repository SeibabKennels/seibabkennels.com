'use client';
import { useEffect, useState } from 'react';
import { ye } from './data-client';
import texts from './editable-content.json';
import { setContent } from './content-store';
export default function ContentEditor() {
  const [content, setValues] = useState<Record<string, string>>({});
  const [id, setId] = useState('');
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    void ye
      .from('Settings')
      .select()
      .then(({ data }: any) => {
        if (data?.[0]) {
          setId(data[0].id);
          setValues(data[0].content || {});
        }
      });
  }, []);
  return (
    <section className="admin-panel">
      <h2>Website Text & Photos</h2>
      <p>
        Edit page text and replace gallery photos. Changes appear on the website
        after saving.
      </p>
      <label>
        Find text
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by a word on the website"
        />
      </label>
      <form
        className="admin-form"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setStatus('');
          const result: any = await (id
            ? ye.from('Settings').update({ content }).eq('id', id)
            : ye.from('Settings').insert([{ content }]));
          if (!result.error) {
            if (!id) setId(result.data[0].id);
            setContent(content);
            setStatus('Website changes saved.');
          } else setStatus('Changes were not saved. Please try again.');
          setBusy(false);
        }}
      >
        {texts
          .filter((t) => t.toLowerCase().includes(filter.toLowerCase()))
          .map((text, i) => (
            <label key={text}>
              {text.length > 100 ? text.slice(0, 100) + '…' : text}
              <textarea
                value={content[text] ?? text}
                onChange={(e) =>
                  setValues({ ...content, [text]: e.target.value })
                }
              />
            </label>
          ))}
        <h3>Home Gallery & Logo</h3>
        {[
          '/assets/logo1-BDcs8sUA.jpg',
          '/assets/dog1-BnooSC2S.png',
          '/assets/dog2-aGY4b_qt.png',
          '/assets/dog3-DrSctZIJ.png',
          '/assets/dog4-CimmZFWE.jpg',
          '/assets/seibab_dog-Cf47a7Cc.jpg',
          '/assets/seibab_dog2-DRUpwLpA.jpg',
          '/assets/seibab_dog3-AlurKDNl.jpg',
          '/assets/seibab_dog4-BuZKqFuc.jpg',
        ].map((src, i) => (
          <label key={src}>
            {i === 0 ? 'Logo' : 'Gallery photo ' + i}
            <img
              src={content[src] || src}
              alt={i === 0 ? 'Logo' : 'Gallery photo ' + i}
              width="120"
            />
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setBusy(true);
                const result = await ye.storage
                  .from('kennel-images')
                  .upload('owner/' + file.name, file);
                if (result.data)
                  setValues((c) => ({
                    ...c,
                    [src]: '/api/media/' + result.data.path,
                  }));
                else setStatus(result.error.message);
                setBusy(false);
              }}
            />
          </label>
        ))}
        <button disabled={busy}>
          {busy ? 'Saving…' : 'Save Website Changes'}
        </button>
        <p role="status">{status}</p>
      </form>
    </section>
  );
}
