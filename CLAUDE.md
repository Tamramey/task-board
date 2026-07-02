# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

task-board は現時点で空のプロジェクトです。技術スタック(言語・フレームワーク・ビルドツール等)は未定です。
プロジェクトの構成が決まり次第、このファイルにビルド・Lint・テストコマンドおよびアーキテクチャの説明を追記してください。

## Git運用ルール

- **コードに変更を加えたら、その都度コミットし、GitHubへプッシュすること。** 変更をローカルに留め置かず、都度リモート(origin)へ反映する。
- 1つの目的にまとまった変更ごとにコミットを分け、コミットメッセージには変更内容ではなく「なぜ」その変更をしたかが分かるようにする。
- プッシュ前に `git status` / `git diff` で差分を確認し、意図しない変更が含まれていないことを確認する。
- force push(強制プッシュ)や履歴の書き換え(`git rebase`、`git commit --amend` 等)は、ユーザーの明示的な指示がない限り行わない。
- 現時点でこのディレクトリはGitリポジトリとして初期化されていない。作業を開始する際はまず `git init` を行い、GitHub上にリモートリポジトリを作成して `origin` として登録すること。
