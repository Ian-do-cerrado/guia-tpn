"""Split Spanish apostila takes into per-step clips and posters."""
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parent
SRC = Path(r"C:\Users\ian\Documents\pedrosoft\turistapornatureza\apostila\guides-es")
MEDIA = ROOT / "media"
COPY = Path(r"C:\Users\ian\Documents\pedrosoft\turistapornatureza\public\guia-tpn\media")
FFMPEG = "ffmpeg"

jobs = [
    (
        "cadastro",
        SRC / "01-como-crear-su-cuenta" / "como-crear-su-cuenta.mp4",
        SRC / "01-como-crear-su-cuenta" / "como-crear-su-cuenta.jpg",
        [("01", 0, 8), ("02", 8, 21), ("03", 29, 6.2)],
    ),
    (
        "comprovante",
        SRC / "02-como-imprimir-el-comprobante" / "como-imprimir-el-comprobante.mp4",
        SRC / "02-como-imprimir-el-comprobante" / "como-imprimir-el-comprobante.jpg",
        [("01", 0, 10), ("02", 10, 13), ("03", 23, 6), ("04", 29, 5.9)],
    ),
    (
        "importar",
        SRC / "03-como-importar-pasajeros" / "como-importar-pasajeros.mp4",
        SRC / "03-como-importar-pasajeros" / "como-importar-pasajeros.jpg",
        [("01", 0, 7), ("02", 7, 9), ("03", 16, 7.1)],
    ),
    (
        "reembolso",
        SRC / "04-como-pedir-el-reembolso" / "como-pedir-el-reembolso.mp4",
        SRC / "04-como-pedir-el-reembolso" / "como-pedir-el-reembolso.jpg",
        [("01", 0, 12), ("02", 12, 10), ("03", 22, 8.5)],
    ),
    (
        "taxa",
        SRC / "05-como-pagar-la-tasa-ambiental" / "como-pagar-la-tasa-ambiental.mp4",
        SRC / "05-como-pagar-la-tasa-ambiental" / "como-pagar-la-tasa-ambiental.jpg",
        [("04", 0, 6.5), ("05", 6.5, 11.5), ("06", 18, 43.6)],
    ),
    (
        "titularidade",
        SRC / "06-como-cambiar-el-titular" / "como-cambiar-el-titular.mp4",
        SRC / "06-como-cambiar-el-titular" / "como-cambiar-el-titular.jpg",
        [("01", 0, 8), ("02", 8, 10.4)],
    ),
]


def run(cmd):
    subprocess.check_call(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def copy_out(src: Path):
    dest = COPY / src.relative_to(MEDIA)
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)


def encode_clip(src_mp4: Path, dest: Path, ss: float, t: float):
    dest.parent.mkdir(parents=True, exist_ok=True)
    run([
        FFMPEG, "-y", "-ss", str(ss), "-i", str(src_mp4), "-t", str(t),
        "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "-crf", "23",
        str(dest),
    ])
    jpg = dest.with_name(dest.name.replace(".es.mp4", ".es.jpg"))
    run([FFMPEG, "-y", "-i", str(dest), "-frames:v", "1", "-q:v", "3", str(jpg)])
    copy_out(dest)
    copy_out(jpg)
    print(f"  {dest.relative_to(MEDIA)}")


def copy_take(folder: str, src_mp4: Path, src_jpg: Path):
    dest_dir = MEDIA / folder
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest_mp4 = dest_dir / "take.es.mp4"
    dest_jpg = dest_dir / "take.es.jpg"
    run([
        FFMPEG, "-y", "-i", str(src_mp4),
        "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "-crf", "23",
        str(dest_mp4),
    ])
    shutil.copy2(src_jpg, dest_jpg)
    copy_out(dest_mp4)
    copy_out(dest_jpg)
    print(f"  {dest_mp4.relative_to(MEDIA)}")


def main():
    for folder, mp4, jpg, clips in jobs:
        print(folder)
        if not mp4.exists() or not jpg.exists():
            raise SystemExit(f"missing {mp4} or {jpg}")
        copy_take(folder, mp4, jpg)
        for name, ss, t in clips:
            encode_clip(mp4, MEDIA / folder / f"passo-{name}.es.mp4", ss, t)
        if folder == "titularidade":
            src_mp4 = MEDIA / folder / "passo-02.es.mp4"
            src_jpg = MEDIA / folder / "passo-02.es.jpg"
            for n in ("03", "04"):
                dest_mp4 = MEDIA / folder / f"passo-{n}.es.mp4"
                dest_jpg = MEDIA / folder / f"passo-{n}.es.jpg"
                shutil.copy2(src_mp4, dest_mp4)
                shutil.copy2(src_jpg, dest_jpg)
                copy_out(dest_mp4)
                copy_out(dest_jpg)
                print(f"  {dest_mp4.relative_to(MEDIA)} (copy of 02)")
    print("done")


if __name__ == "__main__":
    main()
