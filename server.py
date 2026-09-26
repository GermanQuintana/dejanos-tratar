from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import re

os.chdir(Path(__file__).resolve().parent / 'dist')

class Handler(SimpleHTTPRequestHandler):
    # Las peticiones parciales permiten saltar a otro punto de un audio o vídeo.
    def send_head(self):
        self.partial_bytes = None
        path = Path(self.translate_path(self.path))
        if path.is_file() and self.headers.get('Range'):
            size = path.stat().st_size
            match = re.fullmatch(r'bytes=(\d*)-(\d*)', self.headers['Range'])
            if match:
                a, b = match.groups()
                start = int(a) if a else max(0, size-int(b or size))
                end = min(int(b) if a and b else size-1, size-1)
                if start > end or start >= size:
                    self.send_response(416)
                    self.send_header('Content-Range', f'bytes */{size}')
                    self.end_headers()
                    return None
                file = path.open('rb')
                file.seek(start)
                self.partial_bytes = end-start+1
                self.send_response(206)
                self.send_header('Content-type', self.guess_type(str(path)))
                self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
                self.send_header('Content-Length', str(self.partial_bytes))
                self.send_header('Accept-Ranges', 'bytes')
                self.end_headers()
                return file
        return super().send_head()

    def copyfile(self, source, outputfile):
        if self.partial_bytes is None:
            return super().copyfile(source, outputfile)
        remaining = self.partial_bytes
        while remaining:
            chunk = source.read(min(65536, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)

print('Web lista en http://127.0.0.1:8765', flush=True)
ThreadingHTTPServer(('127.0.0.1', 8765), Handler).serve_forever()
