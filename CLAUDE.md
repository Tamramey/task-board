# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

task-board は React 製のシンプルなタスク管理アプリです。テキスト入力でのタスク追加、チェックボックスによる完了・未完了の切り替え、タスクの削除ができ、完了済みタスクはグレー表示になります。

このリポジトリのルート直下がこのタスクボードアプリ本体で、他に独立したサブプロジェクトが同居することがある(例: [real-estate-app/](real-estate-app/CLAUDE.md))。サブプロジェクト配下での作業はそれぞれの `CLAUDE.md` を参照すること。

## デプロイ先

- https://Tamramey.github.io/task-board/

## 技術スタック

- React 19 + Vite 8(`@vitejs/plugin-react`)
- Lint: oxlint

## コンポーネントの命名規約

- コンポーネントは `src/components/` 配下に1ファイル1コンポーネントで配置し、ファイル名・コンポーネント名ともにPascalCase(例: `TaskBoard.jsx`、`TaskItem.jsx`)。
- 各コンポーネントに対応するCSSは同名の `.css` ファイル(例: `TaskBoard.css`)にまとめ、コンポーネントファイル側で `import` する。
- CSSクラス名はBEM風の命名(`ブロック`、`ブロック__要素`、`ブロック--状態`)を使う(例: `task-item`、`task-item__label`、`task-item--completed`)。ブロック名はケバブケースで、コンポーネント名と対応させる。
- イベントハンドラーの props/関数名は `onXxx`(呼び出し側から渡すコールバック)/ `handleXxx`(コンポーネント内で定義する処理)の対応で統一する(例: `onToggle` props ↔ `handleToggleTask` 関数)。

## よく使うコマンド

```bash
npm install     # 依存関係のインストール
npm run dev     # 開発サーバーを起動(http://localhost:5173)
npm run build   # 本番ビルド(dist/ に出力)
npm run preview # ビルド成果物をローカルでプレビュー
npm run lint    # oxlint によるLint
```

このプロジェクトに自動テストは未導入です。

## アーキテクチャ

- `src/main.jsx` — エントリーポイント。`App` をDOMにマウントする。
- `src/App.jsx` — `TaskBoard` をレンダリングするだけの薄いルートコンポーネント。
- `src/components/TaskBoard.jsx` — タスク一覧の状態(`tasks` 配列、`{ id, text, completed }`)を保持する唯一のコンポーネント。タスクの追加・完了切り替え・削除のハンドラーをここで定義し、`TaskItem` に props として渡す。`tasks` は `localStorage`(キー: `task-board:tasks`)に自動保存され、初期状態も `localStorage` から読み込む(グローバルストアは使用していない)。
- `src/components/TaskItem.jsx` — 1件のタスク行の表示(チェックボックス・テキスト・削除ボタン)。完了時は `task-item--completed` クラスが付与され、`TaskBoard.css` でグレー表示・打ち消し線のスタイルが当たる。
- `src/index.css` — ライト/ダークテーマ用のCSS変数(`--accent`、`--border` など)を定義するグローバルスタイル。コンポーネント側のCSS(`TaskBoard.css`)はこれらの変数を再利用する。

## Git運用ルール

- **コードに変更を加えたら、その都度コミットし、GitHubへプッシュすること。** 変更をローカルに留め置かず、都度リモート(origin)へ反映する。
- 1つの目的にまとまった変更ごとにコミットを分け、コミットメッセージには変更内容ではなく「なぜ」その変更をしたかが分かるようにする。
- プッシュ前に `git status` / `git diff` で差分を確認し、意図しない変更が含まれていないことを確認する。
- force push(強制プッシュ)や履歴の書き換え(`git rebase`、`git commit --amend` 等)は、ユーザーの明示的な指示がない限り行わない。
- リモート(`origin`)は `https://github.com/Tamramey/task-board.git`、既定ブランチは `main`。
