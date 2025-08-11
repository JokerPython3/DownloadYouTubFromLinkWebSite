from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from Downloader.download import Downloads
from datetime import datetime

app = FastAPI()
temp = Jinja2Templates("templates")
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/downloads", StaticFiles(directory="downloads"), name="downloads")
@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return temp.TemplateResponse("index.html", {"request": request})

@app.post("/download", response_class=HTMLResponse)
async def download(request: Request, link: str = Form(...)):
    video_data = Downloads(link).ksj()
    return temp.TemplateResponse("down.html", {
        "request": request,
        "ksj": video_data,
        "now": datetime.now
    })

@app.head("/download")
async def download_head():
    return HTMLResponse(status_code=200)

