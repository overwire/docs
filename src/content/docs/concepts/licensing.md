---
title: Licensing and purchases
description: What is free, what Pro covers, how activation works, and how purchases and refunds are handled.
---

Overwire is a paid desktop app with a fully free CLI. This page covers the commercial side; current prices are always at [overwire.io](https://overwire.io/#pricing).

## Free vs Pro

The CLI is free end to end — no command or flag checks a license. Pro covers desktop GUI surfaces only: multi-repo workspaces, governance simulation (rulesets, organization settings, custom properties, statuses), and pull request views. Everything else in the app — single-repo projects, running and mocking workflows, editors, run history — is free.

## Plans

Pro is available as a monthly subscription, a yearly subscription, or a one-time **lifetime** purchase. Lifetime means exactly that: one payment, perpetual use, and every future update we release — no update window, no renewal. Subscriptions keep Pro active while they run.

## Purchases and receipts

[Polar](https://polar.sh) is the merchant of record: it handles checkout, payment, invoices, and tax. Your license key arrives in the purchase email. Prices, and any current offers, live on [overwire.io](https://overwire.io/#pricing).

## Activation

A seat is one person and covers **3 device activations** at a time — enough for a laptop, a desktop, and a reinstall. Activate with your key in the app (Settings) or from the CLI:

```sh
overwire license activate <key>
```

The app and the CLI share one license file, so activating on either covers both. Free a slot any time by deactivating from Settings or with `overwire license deactivate` — do this before wiping a machine. `overwire license status` shows the current tier. Full command reference: [`overwire license`](/cli/license/).

## Refunds

First purchases have a 14-day no-questions refund; renewal charges may be refunded at our discretion if you write within 14 days. The [terms](https://overwire.io/terms) are authoritative. Refunds are processed through Polar.

## Support

Questions about a purchase, key, or activation: [contact@overwire.io](mailto:contact@overwire.io).
