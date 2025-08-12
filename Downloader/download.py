from yt_dlp import YoutubeDL
import os

class Downloads:
    def __init__(self, link):
        self.link = link

    def ksj(self):
        options = {
            "format": "mp4/best",
            "outtmpl": "downloads/%(title)s.%(ext)s",
            "noplaylist": True,
        }
        with YoutubeDL(options) as ydl:
            info_dict = ydl.extract_info(self.link, download=True)
            filename = ydl.prepare_filename(info_dict)


        filesize = os.path.getsize(filename) if os.path.exists(filename) else None

        return {
            "status": True,
            "s": filename.replace("\\", "/"),
            "title": info_dict.get("title", "video"),
            "filesize": f"{filesize / (1024*1024):.2f} MB" if filesize else "Unknown"
        }


