import { useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function App() {
  const [sourceUrl, setSourceUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('');

  const publish = async () => {
    setStatus('Processing...');
    try {
      const res = await fetch(`${API}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceUrl,
          title,
          description,
          tags: tags.split(',').map((x: string) => x.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Publish failed');

      setStatus(`Uploaded privately: ${data.videoId}`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Publish failed');
    }
  };

  return <main className="page">
    <section className="card">
      <h1>Shorts Publisher</h1>
      <p className="muted">Publish media you own or are authorized to use.</p>

      <label>
        Authorized media URL
        <input
          value={sourceUrl}
          onChange={e => setSourceUrl(e.target.value)}
          placeholder="https://your-media-host/video.mp4"
        />
      </label>

      <label>
        Title
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Short title"
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>

      <label>
        Tags
        <input
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="tag1, tag2, tag3"
        />
      </label>

      <button
        className="primary"
        disabled={!sourceUrl || !title}
        onClick={publish}
      >
        PUBLISH
      </button>

      {status && <p className="result">{status}</p>}
    </section>
  </main>;
}
