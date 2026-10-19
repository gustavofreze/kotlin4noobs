"""Draws the link-preview card of the site, `public/og-image.png`, at 1200 by 630.

The card is the same in both languages, so it carries the name of the guide, the brand and a line in
each language. The names come from `src/content/site.ts`. Run it through `make og-image`, which supplies Pillow in a
container.
"""

import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1200, 630
NIGHT, VIOLET, CORAL, WHITE, MUTED, ACCENT = '#150e26', '#7f52ff', '#e44857', '#ffffff', '#cfc8e3', '#b39aff'
FONTS = Path(__file__).parent.parent / 'src' / 'assets' / 'fonts'
SITE = Path(__file__).parent.parent / 'src' / 'content' / 'site.ts'


def font(family: str, weight: int, size: int) -> ImageFont.FreeTypeFont:
    """The variable face of the site, `inter` or `jetbrains-mono`, set to the given weight and size."""
    face = ImageFont.truetype(str(FONTS / f'{family}-latin-variable.woff2'), size)
    face.set_variation_by_axes([weight])
    return face


def wedge(card: Image.Image) -> None:
    """Paints the wedge of the gradient cut on the diagonal at the far edge, as the bands of the site do."""
    gradient = Image.linear_gradient('L').rotate(90).resize(card.size)
    colors = Image.composite(Image.new('RGB', card.size, CORAL), Image.new('RGB', card.size, VIOLET), gradient)
    mask = Image.new('L', card.size, 0)
    ImageDraw.Draw(mask).polygon([(WIDTH, 0), (WIDTH, HEIGHT), (WIDTH - 560, HEIGHT)], fill=40)
    card.paste(colors, (0, 0), mask)
    rule = Image.new('L', card.size, 0)
    ImageDraw.Draw(rule).rectangle((0, HEIGHT - 8, WIDTH, HEIGHT), fill=255)
    card.paste(colors, (0, 0), rule)


def mark(card: Image.Image) -> None:
    """Draws the brand tile and the angle and bar inside it, supersampled so the strokes come out smooth."""
    ImageDraw.Draw(card, 'RGBA').rounded_rectangle(
        (80, 80, 152, 152), 18, fill=(127, 82, 255, 40), outline=(127, 82, 255, 150), width=2
    )
    scale = 4
    mask = Image.new('L', (WIDTH * scale, HEIGHT * scale), 0)
    draw = ImageDraw.Draw(mask)
    width = 7 * scale
    for line in (((105, 99), (105, 133)), ((128, 99), (111, 116), (128, 133))):
        draw.line([(x * scale, y * scale) for x, y in line], fill=255, width=width, joint='curve')
        for x, y in (line[0], line[-1]):
            draw.ellipse(((x * scale) - width / 2, (y * scale) - width / 2, (x * scale) + width / 2, (y * scale) + width / 2), fill=255)
    gradient = Image.linear_gradient('L').rotate(-45, expand=True).resize(card.size)
    colors = Image.composite(Image.new('RGB', card.size, CORAL), Image.new('RGB', card.size, VIOLET), gradient)
    card.paste(colors, (0, 0), mask.resize(card.size, Image.LANCZOS))


def site_names() -> dict[str, str]:
    """Reads the names the card draws from the site configuration."""
    source = SITE.read_text(encoding='utf-8')
    return {key: re.search(rf"\b{key}: '([^']+)'", source).group(1) for key in ('lead', 'highlight')}


def main(output: str) -> None:
    site = site_names()
    card = Image.new('RGB', (WIDTH, HEIGHT), NIGHT)
    wedge(card)
    draw = ImageDraw.Draw(card, 'RGBA')
    mark(card)
    draw.text((172, 98), site['lead'] + site['highlight'], font=font('jetbrains-mono', 700, 32), fill=WHITE)
    draw.text((80, 230), site['lead'], font=font('jetbrains-mono', 700, 96), fill=WHITE)
    draw.text((80, 335), site['highlight'], font=font('jetbrains-mono', 700, 96), fill=ACCENT)
    footer = '// Learn Kotlin from scratch  ·  Aprenda Kotlin do zero'
    draw.text((82, 480), footer, font=font('jetbrains-mono', 400, 28), fill=MUTED)
    card.save(output, optimize=True)


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'public/og-image.png')
