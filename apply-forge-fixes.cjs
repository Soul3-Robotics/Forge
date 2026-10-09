const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');

const root = process.cwd();
const base = '54d3abfb4abd6d0eb9f0bb33ffa6c8585cd01317';

const files = [
    'index.html',
    'src/App.tsx',
    'src/components/AboutUs.tsx',
    'src/components/ContactUs.tsx',
    'src/components/HeroSection.tsx',
    'src/components/NavBar.tsx',
    'src/components/RecoveryGlobe.tsx',
    'src/components/SceneController.tsx',
    'src/components/ui/wilderness.tsx'
];

const images = ['background', 'floor', 'our-mission', 'logo', 'favicon'];

const generated = [
    'public/favicon.png',
    'src/assets/background.webp',
    'src/assets/floor.webp',
    'src/assets/our-mission.webp',
    'src/assets/logo.webp',
    'src/assets/brand-mark.webp'
];

// Compare code structure rather than exact formatting.
function signature(text, file) {
    if (file.endsWith('.html')) {
        return text.replace(/\r\n/g, '\n').trim();
    }

    const source = ts.createSourceFile(
        file, text, ts.ScriptTarget.Latest, true
    );

    if (source.parseDiagnostics.length) {
        throw new Error('Cannot parse ' + file);
    }

    function jsxText(value) {
        const lines = value.split(/\r\n|\n|\r/);
        let last = 0;

        lines.forEach((line, i) => {
            if (/[^ \t]/.test(line)) last = i;
        });

        return lines.map((line, i) => {
            let s = line.replace(/\t/g, ' ');
            if (i > 0) s = s.replace(/^ +/, '');
            if (i < lines.length - 1) s = s.replace(/ +$/, '');
            return s ? s + (i !== last ? ' ' : '') : '';
        }).join('');
    }

    function visit(node) {
        if (
            ts.isParenthesizedExpression(node) &&
            !(ts.isExpressionStatement(node.parent) &&
                ts.isStringLiteral(node.expression))
        ) {
            return visit(node.expression);
        }

        if (
            ts.isJsxExpression(node) &&
            node.expression &&
            ts.isStringLiteral(node.expression)
        ) {
            return ['jsxText', node.expression.text];
        }

        let value = node.kind === ts.SyntaxKind.SourceFile
            ? ''
            : (node.text ?? '');

        if (ts.isJsxText(node)) {
            value = jsxText(value);
            return value ? ['jsxText', value] : null;
        }

        const children = [];

        ts.forEachChild(node, child => {
            const result = visit(child);
            if (result === null) return;

            const previous = children[children.length - 1];
            if (result[0] === 'jsxText' && previous?.[0] === 'jsxText') {
                previous[1] += result[1];
            } else {
                children.push(result);
            }
        });

        return [
            node.kind,
            value,
            node.operator ?? null,
            node.flags & (ts.NodeFlags.Const | ts.NodeFlags.Let),
            children
        ];
    }

    return JSON.stringify(visit(source));
}

function main() {
    const lag = ['fix-lag.cjs', 'lag.cjs', 'fixlag.cjs']
        .find(name => fs.existsSync(name));

    if (!lag) {
        throw new Error(
            'Keep your earlier fix-lag.cjs (or lag.cjs) in this folder.'
        );
    }

    for (const name of [lag, 'fix-pagespeed.cjs']) {
        if (!fs.existsSync(name)) {
            throw new Error('Place ' + name + ' beside this helper.');
        }
    }

    const tools = path.join(root, '.forge-image-tools');

    if (!fs.existsSync(path.join(tools, 'node_modules/sharp'))) {
        throw new Error(
            'First run: npm install --prefix .forge-image-tools --no-audit --no-fund sharp@0.35.4'
        );
    }

    const originals = new Map(
        files.map(file => [file, fs.readFileSync(file)])
    );

    const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'forge-fixes-'));

    try {
        const states = [];

        const snapshot = () => states.push(
            new Map(files.map(file => [
                file,
                signature(
                    fs.readFileSync(path.join(stage, file), 'utf8'),
                    file
                )
            ]))
        );

        // Prepare the tested versions in a temporary folder.
        for (const file of files) {
            let bytes;

            try {
                bytes = execFileSync('git', ['show', base + ':' + file], {
                    cwd: root,
                    stdio: ['ignore', 'pipe', 'pipe']
                });
            } catch {
                throw new Error(
                    'The original revision is unavailable locally. ' +
                    'No project files changed. Run: git fetch origin ' +
                    base + ' — then retry.'
                );
            }

            const dest = path.join(stage, file);
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.writeFileSync(dest, bytes);
        }

        snapshot();

        fs.mkdirSync(path.join(stage, 'src/assets'), { recursive: true });

        for (const name of images) {
            fs.copyFileSync(
                'src/assets/' + name + '.png',
                path.join(stage, 'src/assets/' + name + '.png')
            );
        }

        fs.cpSync(
            tools,
            path.join(stage, '.forge-image-tools'),
            { recursive: true }
        );

        for (const script of [lag, 'fix-pagespeed.cjs']) {
            try {
                execFileSync(process.execPath, [path.join(root, script)], {
                    cwd: stage,
                    stdio: ['ignore', 'pipe', 'pipe']
                });
            } catch (error) {
                throw new Error(
                    'Preparation failed in ' + script + ': ' +
                    (error.stderr?.toString() || error.message)
                );
            }

            snapshot();
        }

        const pending = [];

        for (const file of files) {
            const original = originals.get(file);
            const current = signature(original.toString('utf8'), file);

            if (!states.some(state => state.get(file) === current)) {
                throw new Error(
                    file + ' contains different code. No project files changed. ' +
                    'Send this filename and its git diff.'
                );
            }

            let updated = fs.readFileSync(path.join(stage, file), 'utf8');

            if (original.includes(Buffer.from('\r\n'))) {
                updated = updated.replace(/\r?\n/g, '\r\n');
            }

            const bytes = Buffer.from(updated);

            if (!original.equals(bytes)) {
                pending.push({ file, original, updated: bytes });
            }
        }

        for (const file of generated) {
            const updated = fs.readFileSync(path.join(stage, file));
            const original = fs.existsSync(file)
                ? fs.readFileSync(file)
                : null;

            if (original?.equals(updated)) continue;

            if (original) {
                throw new Error(
                    file + ' has different content. No project files changed.'
                );
            }

            pending.push({ file, original, updated });
        }

        if (!pending.length) {
            console.log('Both fixes are already applied.');
            return;
        }

        const backup = '.forge-fixes-backup-' + Date.now();

        for (const item of pending) {
            if (item.original === null) continue;

            const dest = path.join(backup, item.file);
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.writeFileSync(dest, item.original, { flag: 'wx' });
        }

        const written = [];

        try {
            for (const item of pending) {
                fs.mkdirSync(path.dirname(item.file), { recursive: true });
                written.push(item);
                fs.writeFileSync(item.file, item.updated);
            }
        } catch (error) {
            for (const item of written.reverse()) {
                if (item.original === null) {
                    fs.rmSync(item.file, { force: true });
                } else {
                    fs.writeFileSync(item.file, item.original);
                }
            }

            throw error;
        }

        console.log('Both fixes applied locally. Backups: ' + backup);
    } finally {
        fs.rmSync(stage, { recursive: true, force: true });
    }
}

try {
    main();
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
}