#!/usr/bin/env python3
"""
Extract embedded images from .docx files and update the corresponding
markdown posts to reference them. The first image becomes the cover_image.
"""
import os
import sys
import zipfile
import shutil
import re
from pathlib import Path

# Mapping from docx filename (without .docx) to post slug
DOCX_TO_SLUG = {
    "About Us": "about-department",
    "Achievement Lim Yen Kheng": "achievement-lim-yen-kheng",
    "Achievement Song Kok Wee": "achievement-song-kok-wee",
    "Intern at University of Gdansk": "internship-university-gdansk",
    "Interview Song Kok Wee": "interview-song-kok-wee",
    "Interview Tomasz": "interview-tomasz-paterek",
    "News XMUM Collaborates with Sabah Tshung Tsin Secondary": "news-xmum-sabah-tshung-tsin",
    "News XMUM Launches New Master": "news-xmum-masters-programme",
    "Research activities": "research-publications",
    "Staff Chung Fei Fang": "staff-chung-fei-fang",
    "Staff Farahdiana": "staff-farahdiana",
    "Staff Hoh Siew Yan": "staff-hoh-siew-yan",
    "Staff Kelvin": "staff-kelvin",
    "Staff Lim Yen Kheng": "staff-lim-yen-kheng",
    "Staff Nizam": "staff-nizam",
    "Staff Ong Chong Kim": "staff-ong-chong-kim",
    "Staff Siti Khatijah": "staff-siti-khatijah",
    "Staff Song Kok Wee": "staff-song-kok-wee",
    "Staff Tomasz": "staff-tomasz-paterek",
    "Staff Turgut Yilmaz": "staff-turgut-yilmaz",
    "Staff Yap Seong Shan": "staff-yap-seong-shan",
    "Student Chin Yun Ten Poland Internship": "student-chin-yun-ten-poland",
    "Students achievement": "student-achievements",
    "Student Thurston Internship Experience in Poland": "student-thurston-poland",
    "Student TohYuXuan": "student-toh-yu-xuan",
    "Student YongJingTian": "student-yong-jing-tian",
    "Kamila Public Talk": "talk-kamila-sieja-nuclear-structure",
    "Kumar Public Talk": "talk-kumar",
    "Paramasivan Public Talk": "talk-paramasivan",
    "Public Talk-Jiyong Wang": "talk-jiyong-wang",
    "Ray Ganardi Public Talk": "talk-ray-ganardi",
    "Sithi Muniandy Public Talk": "talk-sithi-muniandy",
    "YanKhenPublic Talk": "talk-yan-khen",
}

BLOG_ROOT = Path("/home/lightbulb/MEGA/05_CODE/phy-blog")
WEBPOST_DIR = BLOG_ROOT / "blog_content" / "Webpage data" / "Webpost"
TALK_DIR = BLOG_ROOT / "blog_content" / "Webpage data" / "Academic talk"
POSTS_DIR = BLOG_ROOT / "content" / "posts"
PUBLIC_IMAGES = BLOG_ROOT / "public" / "images"


def extract_images_from_docx(docx_path: Path, slug: str) -> list[str]:
    """Extract all images from a docx file, save to public/images/[slug]/.
    Returns list of web paths for the extracted images."""
    out_dir = PUBLIC_IMAGES / slug
    extracted = []

    try:
        with zipfile.ZipFile(docx_path, 'r') as z:
            media_files = [f for f in z.namelist() if f.startswith('word/media/')]
            if not media_files:
                return []

            out_dir.mkdir(parents=True, exist_ok=True)
            for media_file in sorted(media_files):
                ext = Path(media_file).suffix.lower()
                if ext not in {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'}:
                    continue
                filename = Path(media_file).name
                dest = out_dir / filename
                with z.open(media_file) as src, open(dest, 'wb') as dst:
                    shutil.copyfileobj(src, dst)
                # Web path from Next.js public/ root
                web_path = f"/images/{slug}/{filename}"
                extracted.append(web_path)
                print(f"  Extracted: {web_path}")
    except Exception as e:
        print(f"  ERROR extracting from {docx_path.name}: {e}")

    return extracted


def update_markdown_post(slug: str, image_paths: list[str]):
    """Update the markdown post to use first image as cover and embed all images."""
    md_file = POSTS_DIR / f"{slug}.md"
    if not md_file.exists():
        print(f"  WARNING: Post not found: {md_file}")
        return

    content = md_file.read_text(encoding='utf-8')

    if not image_paths:
        return

    cover = image_paths[0]

    # Replace the picsum cover_image with the real first image
    content = re.sub(
        r'cover_image:\s*"https://picsum\.photos/[^"]*"',
        f'cover_image: "{cover}"',
        content
    )

    # Build an image gallery section for all extracted images
    gallery_lines = []
    for i, path in enumerate(image_paths):
        alt = f"Image {i+1}"
        gallery_lines.append(f"![{alt}]({path})")

    gallery_md = "\n".join(gallery_lines)

    # Append gallery after the frontmatter block (after first --- ... ---)
    # Find the end of frontmatter
    fm_end = content.find('---', 3)
    if fm_end == -1:
        print(f"  WARNING: Could not find frontmatter end in {slug}.md")
        return

    # Insert after frontmatter
    insert_pos = fm_end + 3
    # Skip the newline right after ---
    while insert_pos < len(content) and content[insert_pos] == '\n':
        insert_pos += 1

    image_section = f"\n{gallery_md}\n\n"
    content = content[:insert_pos] + image_section + content[insert_pos:]

    md_file.write_text(content, encoding='utf-8')
    print(f"  Updated post: {slug}.md (cover={cover}, {len(image_paths)} images)")


def process_docx(docx_path: Path, slug: str):
    print(f"\nProcessing: {docx_path.name} → {slug}")
    images = extract_images_from_docx(docx_path, slug)
    if images:
        update_markdown_post(slug, images)
    else:
        print(f"  No embedded images found.")


def main():
    PUBLIC_IMAGES.mkdir(parents=True, exist_ok=True)

    # Process Webpost files
    for docx_name, slug in DOCX_TO_SLUG.items():
        # Try Webpost dir first, then Academic talk
        for search_dir in [WEBPOST_DIR, TALK_DIR]:
            docx_path = search_dir / f"{docx_name}.docx"
            if docx_path.exists():
                process_docx(docx_path, slug)
                break
        else:
            print(f"\nNot found: {docx_name}.docx")

    print("\n✓ Image extraction complete.")


if __name__ == "__main__":
    main()
