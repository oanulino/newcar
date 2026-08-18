# New Car Peças e Serviços — reauditoria

brief_version_used: 3
final_gate: PASS_WITH_LIMITATIONS

## Resultado
Logo oficial completa integrada no header e footer sem deformação; símbolo oficial local usado como favicon. A marca tipográfica provisória `NC` foi removida do HTML. A direção azul-marinho/vermelho e a ilustração autoral foram preservadas.

## Arquivos alterados
- `index.html`
- `styles.css`
- `sources.md`
- `REPORT.md`
- `assets/newcar-logo-completa.jpeg`
- `assets/newcar-symbol.jpeg`

## Assets usados e fontes
- Logo completa: fornecida pelo cliente em `/root/.hermes/cache/images/img_83b46d9f0cbc.jpeg` (926x336), copiada para `assets/newcar-logo-completa.jpeg`.
- Símbolo reduzido: fornecido pelo cliente em `/root/.hermes/cache/images/img_5dfee43a2c7e.jpeg` (298x199), copiado para `assets/newcar-symbol.jpeg`.
- Nenhum caminho absoluto é usado no HTML final.

## Checks executados
- HTTP local via `python3 -m http.server 4188`.
- `curl`: index, CSS e os dois JPEGs retornaram HTTP 200; content-types `text/html`, `text/css` e `image/jpeg`.
- Inspeção de source: duas referências à logo completa, favicon local, ausência de `brand-mark`/NC tipográfico, ausência de `/root`, Oficina DM e `img src` HTTP.
- Screenshot solicitado: não capturado nesta execução porque o Browserbase falhou antes de abrir a página por erro local de ambiente npm (`ENOENT /root/.local/lib`).

## Limitações conhecidas
A verificação de browser Chromium, screenshots desktop 1440 e mobile 390, console, failed requests, overflow, foco, alt text e links internos precisa ser repetida em ambiente com Browserbase/Playwright funcional. O servidor HTTP e os endpoints de assets foram verificados localmente. Não houve deploy, publicação, tracking, formulário ou ação externa.

publication_or_external_actions: none
screenshots: pending_browser_runtime (requested: 1440 desktop, 390 mobile)
final_gate_recommendation: PASS_WITH_LIMITATIONS; pronto para G1 visual após captura Chromium, não publicar sem esse check

**Verificação:** `passed` (kind: targeted local HTTP/source, scope: asset integration)
**Total:** 9/9 checks direcionados (HTTP 4 + source 5)
**Limitação:** Browserbase/Playwright não executado por falha de ambiente npm; não testou renderização real, console, overflow ou interação.
**Cleanup:** servidor local encerrado antes da entrega; nenhum script temporário criado.
