---
title: Uninstall & reset
description: Remove Overwire completely, or reset local state without uninstalling.
---

Everything Overwire writes lives in the locations mapped on [Directory layout](/platform/directory-layout/) — removal is a handful of deletions, with one step first.

## macOS

1. **Deactivate your license** (Pro only) so the machine stops using an activation slot:

   ```sh
   overwire license deactivate
   ```

   Or Settings → License → Deactivate in the app. Skipping this wastes a slot until you deactivate from another device.

2. **Quit the app and remove it:** drag `Overwire.app` out of Applications.

3. **Remove machine state** (all rebuildable or now-unused):

   ```sh
   rm -rf ~/.cache/overwire            # run store, action/tool caches, lock files
   rm -rf ~/Library/Application\ Support/Overwire   # app state: layout, recent projects, theme
   rm -f  ~/.config/overwire/license.json           # license state (deactivate first!)
   ```

4. **Remove the CLI**, if you installed it:

   ```sh
   npm uninstall -g overwire
   ```

5. **Project config** (`.overwire/` in your repositories) is yours — committable scenario files, not app state. Delete per repo if you no longer want it; `.overwire/state/` and `.overwire/cache/` are the only run-written parts.

Live-run leftovers: Overwire manages its own runner containers, but the pulled `overwireio/runner` image stays in your container engine — remove it there (`docker rmi overwireio/runner`) if you want the space back.

## Reset without uninstalling

To get a fresh slate but keep Overwire installed, delete the run-derived state only:

```sh
rm -rf ~/.cache/overwire        # run history, caches — rebuilt on demand
```

Per project, delete `.overwire/state/` and `.overwire/cache/` (both git-ignored). `overwire cache` can inspect and clear the action/tool caches without manual deletion.

## Windows

Documented when the Windows build ships.
