# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Site institucional da **Rotorwest Serviços Aéreos Especializados** — empresa de hangaragem e apoio de solo (FBO) no Aeroporto dos Amarais (SDAM), Campinas/SP.

## Arquitetura

Projeto single-file: tudo está em `rotorwest-site.html` — markup, CSS (inline `<style>`) e JavaScript (inline `<script>`). Não há build system, bundler, nem dependências npm.

- **Fontes externas:** Google Fonts (DM Sans + Plus Jakarta Sans)
- **Imagens:** referenciadas localmente (`logoRTW.png` + placeholders skeleton para fotos futuras)
- **Idioma:** pt-BR — todo conteúdo textual é em português

## Como rodar

Abrir `rotorwest-site.html` diretamente no navegador, ou servir com qualquer servidor estático:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000/rotorwest-site.html
```

## Estrutura do CSS

- CSS custom properties em `:root` definem o design system (cores, border-radius)
- Classes usam nomes ultra-curtos (`.hdr`, `.btn-f`, `.svc-card`, `.rv`, etc.)
- Layout mobile-first com breakpoints em `768px` e `1100px`
- Animações de entrada via classe `.rv` (reveal) observada por IntersectionObserver

## Convenções importantes

- **Nomes de classe abreviados:** `.hdr` = header, `.svc` = serviço, `.loc` = localização, `.cta` = call-to-action, `.ftr` = footer, `.stk`/`.sticky` = barra fixa inferior, `.rv` = reveal animation, `.btn-f` = botão fire (primário), `.btn-g` = ghost, `.btn-w` = WhatsApp
- **Cores principais:** `--fire` (#df6429) laranja primário, `--ember` (#b15329) variante escura, `--dark` (#151515) fundo, `--wsp` (#25D366) WhatsApp
- **Placeholders skeleton:** imagens ainda não disponíveis usam divs `.skel` com animação shimmer e ícone SVG inline — ao adicionar fotos reais, remover o skeleton e exibir o `<img>`
- **Carrossel de serviços:** scroll horizontal nativo com snap, dots e setas (desktop) controlados por JS vanilla
