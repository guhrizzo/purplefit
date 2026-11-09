# Prompts Higgsfield

Imagens geradas com `gpt_image_2_6`. Regras comuns: aparência fotográfica, iluminação profissional, **sem texto e sem logotipos**, anatomia correta.

| Arquivo | Proporção | Prompt |
| --- | --- | --- |
| `hero.webp` | 16:9 | Cinematic photograph, a fit woman mid deadlift in a modern gym, deep purple and violet rim lighting, dark moody background with rows of equipment out of focus, shallow depth of field, premium fitness campaign look, realistic anatomy, no text, no logos |
| `estrutura-musculacao.webp` | 3:2 | Wide interior photograph of a modern strength training area, rows of selectorized weight machines and benches, polished floor, purple accent LED strip lighting, clean and spacious, no people, realistic equipment, no text, no logos |
| `halteres.webp` | 4:5 | Close-up photograph of a rack of dumbbells in a gym, metallic chrome texture, purple ambient light reflecting, shallow depth of field, premium look, no people, no text, no logos |
| `aula-coletiva.webp` | 3:2 | Energetic group fitness class in a studio with pink and purple neon lights, adults of different ages dancing and exercising in sync, instructor in front, motion energy, realistic photograph, no text, no logos |
| `pilates.webp` | 4:5 | Bright pilates studio with a woman doing a pilates exercise on a mat, soft natural light with subtle lilac tones, minimal clean aesthetic, realistic photograph, no text, no logos |
| `ballet.webp` | 4:5 | Ballet fitness studio with a barre along a mirror wall, a woman in dancewear stretching at the barre, soft lilac light, elegant realistic photograph, no text, no logos |
| `treinador.webp` | 3:2 | Personal trainer guiding a smiling student on a gym exercise machine, friendly supportive moment, purple tinted modern gym background, realistic photograph, correct anatomy, no text, no logos |
| `cta-kettlebell.webp` | 16:9 | Dramatic close-up of a kettlebell and battle ropes on a dark gym floor, purple light beam, texture of rubber and metal, cinematic, no people, no text, no logos |

## Vídeo do hero (não gerado)

Modelo sugerido: `seedance_2_5` (5 s, 16:9). Custo medido em 35 créditos, acima do saldo no momento da produção.

> Slow cinematic push-in through a modern gym with purple neon lighting, athletes training with dumbbells, shallow depth of field, no text

Depois de gerar: comprimir para H.264 (até ~2 MB, 720p, sem áudio), salvar em `public/videos/hero.mp4` e ativar em `src/config/site.ts` (`heroVideo`).

## Substituindo por fotos reais

Troque os arquivos mantendo os nomes (WebP, largura máx. 1920 px, qualidade ~78) ou atualize os caminhos em `src/config/site.ts`. Depois defina `imagesAreIllustrative: false`.
