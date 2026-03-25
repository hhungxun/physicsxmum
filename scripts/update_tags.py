#!/usr/bin/env python3
"""
Update tags in all markdown files in content/posts/.
Replaces the entire tags: block in each file's YAML frontmatter.
"""

import re
import os

POSTS_DIR = "/home/lightbulb/MEGA/05_CODE/phy-blog/content/posts"

# Mapping of filename -> list of new tags
TAG_MAP = {
    "about-department.md": [
        "education",
        "department",
    ],
    "achievement-lim-yen-kheng.md": [
        "student",
        "research",
        "gravity/general-relativity",
        "gravity/cosmology",
    ],
    "achievement-song-kok-wee.md": [
        "staff",
        "research",
        "condensed-matter/2d-materials",
        "quantum/optics",
    ],
    "internship-university-gdansk.md": [
        "student",
        "internship",
        "international",
    ],
    "interview-song-kok-wee.md": [
        "staff",
        "interview",
        "condensed-matter/2d-materials",
        "quantum/optics",
    ],
    "interview-tomasz-paterek.md": [
        "staff",
        "interview",
        "quantum/information",
        "education",
    ],
    "news-xmum-masters-programme.md": [
        "news",
        "education",
        "materials-science/semiconductor",
    ],
    "news-xmum-sabah-tshung-tsin.md": [
        "outreach",
        "education",
    ],
    "research-publications.md": [
        "research",
        "condensed-matter",
        "gravity/general-relativity",
        "quantum",
    ],
    "staff-chung-fei-fang.md": [
        "staff",
        "statistical-physics/granular",
        "computational-physics",
    ],
    "staff-farahdiana.md": [
        "staff",
        "nanoscience/mems",
        "biophysics",
    ],
    "staff-hoh-siew-yan.md": [
        "staff",
        "high-energy/particle",
        "high-energy/detector",
        "experimental",
    ],
    "staff-kelvin.md": [
        "staff",
        "photonics/nanophotonics",
        "biophysics",
    ],
    "staff-lim-yen-kheng.md": [
        "staff",
        "gravity/general-relativity",
        "gravity/black-holes",
        "theoretical",
    ],
    "staff-nizam.md": [
        "staff",
        "high-energy/particle",
        "high-energy/neutrino",
        "high-energy/detector",
    ],
    "staff-ong-chong-kim.md": [
        "staff",
        "condensed-matter/spintronics",
        "condensed-matter/magnetics",
        "experimental",
    ],
    "staff-siti-khatijah.md": [
        "staff",
        "nanoscience/nanomaterials",
        "photonics/optoelectronics",
        "materials-science/energy",
    ],
    "staff-song-kok-wee.md": [
        "staff",
        "condensed-matter/2d-materials",
        "condensed-matter/superconductivity",
        "quantum/optics",
    ],
    "staff-tomasz-paterek.md": [
        "staff",
        "quantum/information",
        "quantum/biology",
        "quantum/gravity",
    ],
    "staff-turgut-yilmaz.md": [
        "staff",
        "condensed-matter/spintronics",
        "condensed-matter/topological",
        "experimental",
    ],
    "staff-yap-seong-shan.md": [
        "staff",
        "photonics/laser",
        "photonics/optoelectronics",
        "plasma",
    ],
    "student-achievements.md": [
        "student",
        "research",
        "internship",
    ],
    "student-chin-yun-ten-poland.md": [
        "student",
        "internship",
        "international",
        "gravity/general-relativity",
    ],
    "student-thurston-poland.md": [
        "student",
        "internship",
        "international",
        "gravity/general-relativity",
    ],
    "student-toh-yu-xuan.md": [
        "student",
        "internship",
        "international",
        "quantum/gravity",
    ],
    "student-yong-jing-tian.md": [
        "student",
        "education",
        "international",
    ],
    "talk-jiyong-wang.md": [
        "talk",
        "photonics/nanophotonics",
        "photonics/plasmonics",
    ],
    "talk-kamila-sieja-nuclear-structure.md": [
        "talk",
        "nuclear/shell-model",
        "quantum/many-body",
        "astrophysics",
    ],
    "talk-kumar.md": [
        "talk",
        "condensed-matter/superconductivity",
        "quantum/open-systems",
    ],
    "talk-paramasivan.md": [
        "talk",
        "nuclear",
        "quantum/computing",
        "quantum/many-body",
    ],
    "talk-ray-ganardi.md": [
        "talk",
        "quantum/information",
        "quantum/foundations",
    ],
    "talk-sithi-muniandy.md": [
        "talk",
        "statistical-physics/stochastic",
        "quantum/information",
    ],
    "talk-yan-khen.md": [
        "talk",
        "gravity/black-holes",
        "gravity/general-relativity",
        "statistical-physics/thermodynamics",
    ],
}

# Regex to match the tags block: "tags:\n" followed by one or more "  - ...\n" lines
TAGS_PATTERN = re.compile(r'^tags:\n(?:  - .+\n)+', re.MULTILINE)

def build_tags_block(tags):
    """Build a YAML tags block string from a list of tag strings."""
    lines = ["tags:"]
    for tag in tags:
        lines.append(f"  - {tag}")
    return "\n".join(lines) + "\n"

success = []
failed = []
no_tags_block = []

for filename, new_tags in TAG_MAP.items():
    filepath = os.path.join(POSTS_DIR, filename)

    if not os.path.exists(filepath):
        print(f"  MISSING:  {filename}")
        failed.append(filename)
        continue

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    new_block = build_tags_block(new_tags)
    new_content, count = TAGS_PATTERN.subn(new_block, content)

    if count == 0:
        print(f"  NO MATCH: {filename}  (tags: block not found or wrong format)")
        no_tags_block.append(filename)
        continue

    if new_content == content:
        print(f"  UNCHANGED:{filename}  (tags already match)")
        success.append(filename)
        continue

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"  UPDATED:  {filename}")
    success.append(filename)

print()
print("=" * 60)
print(f"Updated / unchanged : {len(success)}/{len(TAG_MAP)}")
print(f"No tags block found : {len(no_tags_block)}")
print(f"File missing        : {len([f for f in failed if f not in no_tags_block])}")
if no_tags_block:
    print("Files with missing/unmatched tags block:")
    for f in no_tags_block:
        print(f"  {f}")
if failed:
    print("Missing files:")
    for f in failed:
        print(f"  {f}")
