# New Car Peças e Serviços — publicação

brief_version_used: 2.0
artifact_source: t_71ac9dc3 (logo oficial integrada)
final_gate: PASS_WITH_LIMITATIONS

## Resultado
Site institucional estático publicado em `https://app.gustavoanulino.com.br/newcar` com logo oficial local no header/footer e símbolo local como favicon. Os 17 JPEGs da pasta Drive foram renomeados sem alterar conteúdo ou IDs; o mapa completo está em `DRIVE_RENAME_MAP.md`.

## Arquivos
- `index.html`, `styles.css`
- `assets/newcar-logo-completa.jpeg`, `assets/newcar-symbol.jpeg`
- `sources.md`, `assets/README.md`, `DRIVE_RENAME_MAP.md`, `REPORT.md`

## Repositório
- URL: https://github.com/oanulino/newcar
- Commit publicado: `49fc1c9` (`Document Google Drive asset rename map`)
- Branch: `main`
- Working tree local: limpo

## Checks executados
- Drive API antes/depois: 17 JPEGs localizados; 17/17 IDs preservados; nomes finais confirmados via API.
- Backup/export local dos 17 binários realizado no servidor antes do rename em `/tmp/newcar-drive-20260818` (não versionado).
- Git: `git status --short --branch`, histórico, remote push e `git ls-remote` verificados.
- Smoke público via `curl -L`: index sem barra e com barra, CSS e os dois JPEGs retornaram HTTP 200.
- Content types públicos: `text/html`, `text/css`, `image/jpeg`, `image/jpeg`.
- HTML público contém título `New Car Peças e Serviços | Mecânica em Uberlândia`, identidade New Car e referências locais dos assets; nenhuma credencial foi versionada.

## Claims e fontes
Nome, descrição, categoria, endereço e WhatsApp derivam de `sources.md` e da fonte pública oficial registrada no artefato de origem. Não há preços, depoimentos, métricas, garantias ou credenciais inventadas.

## Limitações conhecidas
Browser Chromium visual, console, overflow, foco e navegação por teclado não foram reexecutados nesta sessão porque o runtime Browserbase/Playwright da tarefa anterior falhou por `ENOENT /root/.local/lib`. O smoke HTTP e os assets públicos foram verificados. Os 17 JPEGs renomeados no Drive não foram incorporados ao site porque o escopo solicitou organizar assets e integrar os assets selecionados existentes.

## Publication_or_external_actions
- Drive: renomeação dos 17 arquivos autorizados, IDs preservados.
- GitHub: repositório `oanulino/newcar` criado/verificado e commits enviados.
- Deploy: arquivos copiados para `/var/www/traffic-manager/traffic-manager/frontend/dist/newcar`.
- URL final: `https://app.gustavoanulino.com.br/newcar`.

**Verificação:** `passed` (kind: public HTTP/source + Drive API, scope: targeted)
**Total:** 17/17 Drive IDs + 5/5 URLs públicas + repo push passaram.
**Limitação:** não testou Chromium/console/interações visuais nesta sessão.
**Cleanup:** nenhum segredo ou script temporário entrou no repositório; backup permanece somente no servidor para rollback.
