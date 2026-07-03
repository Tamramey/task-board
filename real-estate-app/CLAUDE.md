# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

real-estate-app は Supabase認証機能付きの不動産管理Webアプリです。メールアドレス＋パスワードでの会員登録・ログインを行い、ログイン後は物件一覧(ダミーデータ)を閲覧できます。未ログインの状態で物件一覧など保護されたページにアクセスするとログイン画面にリダイレクトされます。

このディレクトリは task-board リポジトリ内の独立したサブプロジェクトで、ルートのタスクボードアプリとはコードを共有していません。

## 技術スタック

- React 19 + Vite 8(`@vitejs/plugin-react`)
- react-router-dom(ルーティング・認証ガード)
- Supabase(`@supabase/supabase-js`)— メール/パスワード認証
- Lint: oxlint

## 環境変数

Supabaseの接続情報は `.env` で管理し、Gitには含めない(`.gitignore` 対象)。`.env.example` をコピーして値を設定する。

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=              # SupabaseプロジェクトのURL
VITE_SUPABASE_PUBLISHABLE_KEY=  # Supabaseのpublishable(anon)key
```

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

- `src/main.jsx` — エントリーポイント。`BrowserRouter` で `App` をラップしてDOMにマウントする。
- `src/App.jsx` — ルーティング定義(`/login`、`/signup`、`/properties`)。`/properties` は `ProtectedRoute` で保護し、それ以外の未定義パスは `/properties` にリダイレクトする(未ログインなら結果的に `/login` に着地する)。
- `src/context/AuthContext.jsx` — Supabaseの認証セッションを保持するプロバイダーと `useAuth()` フック。`supabase.auth.getSession()` で初期状態を取得し、`onAuthStateChange` でログイン・ログアウトを監視する。`signUp` / `signIn` / `signOut` はここに集約する。
- `src/components/ProtectedRoute.jsx` — `useAuth()` の `user` が無ければ `/login` へリダイレクトするラッパー。セッション取得中(`loading`)は簡易的なローディング表示を出す。
- `src/lib/supabaseClient.js` — 環境変数からSupabaseクライアントを生成する。環境変数が未設定の場合はエラーを投げる。
- `src/pages/LoginPage.jsx` / `SignupPage.jsx` — メールアドレス＋パスワードのシンプルなフォーム。共通スタイルは同ディレクトリの `AuthForm.css`。
- `src/pages/PropertyListPage.jsx` — `src/data/dummyProperties.js` のダミーデータをカード形式(`PropertyCard`)で一覧表示し、ログアウトボタンを備える。

## コンポーネントの命名規約

ルートの [task-board](../CLAUDE.md) と同様の規約に従う。

- コンポーネントは1ファイル1コンポーネントでPascalCase(例: `PropertyCard.jsx`)。ページ単位のコンポーネントは `src/pages/`、再利用可能な部品は `src/components/` に置く。
- 各コンポーネント/ページに対応するCSSは同名の `.css` ファイルにまとめ、コンポーネント側で `import` する。
- CSSクラス名はBEM風の命名(`ブロック`、`ブロック__要素`、`ブロック--状態`)を使う(例: `property-card__name`)。
- イベントハンドラーの props/関数名は `onXxx`(コールバック)/ `handleXxx`(内部処理)で対応させる。

## Git運用ルール

ルートの [task-board](../CLAUDE.md) と共通。コードに変更を加えたら都度コミットし、GitHub(`https://github.com/Tamramey/task-board.git`、`main` ブランチ)へプッシュする。
