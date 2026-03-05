# Vibe Coding Security Guide

バイブコーディング・AIエージェント時代のセキュリティと環境設定を、非エンジニア向けに整理した単一ページガイドです。

## 公開先

- GitHub Pages（Project Pages）で公開
- 公開URL: https://hirokioshiro.github.io/vibe_coding_security_guide/

## 関連ガイド

- [Vibe Coding Preflight Guide](https://hirokioshiro.github.io/vibe_coding_preflight_guide/) — コードを書く前に考えるべきこと（要件定義・設計・品質）

## リポジトリ構成

- `index.html` : 本体（HTML）
- `assets/css/styles.css` : ページスタイル
- `assets/js/main.js` : 画面インタラクション（チェックリスト、コピー、目次ハイライト）
- `404.html` : GitHub Pages用404ページ
- `robots.txt` : クローラー向け設定
- `sitemap.xml` : 検索エンジン向けサイトマップ
- `CHANGELOG.md` : バージョン履歴
- `README.md` : 運用方針・更新手順



## 更新フロー（推奨）

1. 本文を更新
2. フッターの「バージョン」「最終更新日」を更新
3. `CHANGELOG.md` に変更内容を追記
4. ブラウザで最低限の動作確認（下記チェックリスト）
5. コミットメッセージに変更種別を含める（例: `docs:`, `a11y:`, `meta:`）

## 公開前/更新時チェックリスト

- [ ] レイアウト崩れがない（PC/スマホ幅）
- [ ] キーボード操作（Tab, Enter, Space）が機能する
- [ ] コピー操作が機能する
- [ ] 外部リンクに誤りがない
- [ ] フッターのバージョンと `CHANGELOG.md` の最新バージョンが一致する

## バージョニング方針

- 当面は `v0.x.y` で運用
- 目安
  - `x`（minor）: 章追加や構成変更など、内容の拡張
  - `y`（patch）: 誤字修正、リンク修正、軽微なUI/文言修正

## 参照元

- OWASP Top 10 for LLM Applications 2025
- OWASP Top 10（Web Applications）
- IPA「安全なウェブサイトの作り方」
- IPA「AI事業者ガイドライン v1.1」
- NIST AI Risk Management Framework
- 徳丸浩「安全なWebアプリケーションの作り方 第2版」
