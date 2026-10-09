// A Paper sync may only rewrite what Paper owns: visual classes (*.styles.ts), tokens
// (theme.css) and icon geometry. Fails if any `sync(paper):` commit in the range touches
// anything else (behaviour, a11y, stories, config). Usage: check-sync-commits.mjs <base> <head>
import { execFileSync } from 'node:child_process'

const ALLOWED = [
  /^packages\/ui\/src\/.+\.styles\.ts$/,
  /^packages\/ui\/src\/styles\/theme\.css$/,
  /^packages\/ui\/src\/icons\/(mono|color)\/Icon[A-Z]\w*\.tsx$/,
  /^packages\/ui\/src\/icons\/(index|iconNames)\.ts$/,
]

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()
const [base, head = 'HEAD'] = process.argv.slice(2)
// No base (first push of a branch: GitHub sends 000…0): check the head commit only.
const range = !base || /^0+$/.test(base) ? ['-1', head] : [`${base}..${head}`]

let failed = 0
for (const line of git('log', '--format=%H %s', ...range)
  .split('\n')
  .filter(Boolean)) {
  const sha = line.slice(0, 40)
  const subject = line.slice(41)
  if (!subject.startsWith('sync(paper):')) continue
  const files = git('diff-tree', '--root', '--no-commit-id', '--name-only', '-r', sha).split('\n')
  const outside = files.filter((file) => file && !ALLOWED.some((pattern) => pattern.test(file)))
  if (outside.length) {
    failed++
    console.error(`✗ ${sha.slice(0, 7)} ${subject}\n  outside Paper-synced paths: ${outside.join(', ')}`)
  } else {
    console.log(`✓ ${sha.slice(0, 7)} ${subject}`)
  }
}
if (failed) process.exit(1)
