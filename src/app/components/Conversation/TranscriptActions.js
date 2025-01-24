export function TranscriptActions({ transcript }) {
  const getTranscriptText = () => {
    return transcript.map(m => `${m.role === 'agent' ? 'Agent' : 'You'}: ${m.content}`).join('\n');
  };

  const copyTranscript = () => {
    navigator.clipboard.writeText(getTranscriptText());
  };

  const downloadTranscript = () => {
    const text = getTranscriptText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4 flex justify-end space-x-2">
      <button
        className="text-sm text-gray-400 hover:text-gray-300"
        onClick={copyTranscript}
      >
        Copy Transcript
      </button>
      <button
        className="text-sm text-gray-400 hover:text-gray-300"
        onClick={downloadTranscript}
      >
        Download Transcript
      </button>
    </div>
  );
} 