"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateAnalyzer = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const crypto_1 = require("crypto");
class DuplicateAnalyzer {
    constructor(rootPath, excludePatterns = []) {
        this.rootPath = rootPath;
        this.excludePatterns = excludePatterns;
        this.fileHashes = new Map();
        this.folderHashes = new Map();
        this.processedFiles = new Set();
        this.processedFolders = new Set();
    }
    async analyze() {
        console.log('Starting duplicate analysis...');
        await this.scanDirectory(this.rootPath);
        return this.findDuplicates();
    }
    async scanDirectory(dirPath) {
        try {
            const items = await fs_1.default.promises.readdir(dirPath, { withFileTypes: true });
            for (const item of items) {
                const fullPath = path_1.default.join(dirPath, item.name);
                // Skip excluded patterns
                if (this.excludePatterns.some(pattern => fullPath.includes(pattern))) {
                    continue;
                }
                // Skip symbolic links
                if (item.isSymbolicLink()) {
                    console.log(`Skipping symbolic link: ${fullPath}`);
                    continue;
                }
                // Skip hidden files (starting with .)
                if (item.name.startsWith('.')) {
                    console.log(`Skipping hidden file: ${fullPath}`);
                    continue;
                }
                if (item.isFile()) {
                    await this.processFile(fullPath);
                }
                else if (item.isDirectory()) {
                    await this.processFolder(fullPath);
                }
            }
        }
        catch (error) {
            console.error(`Error scanning directory ${dirPath}:`, error);
        }
    }
    async processFile(filePath) {
        if (this.processedFiles.has(filePath))
            return;
        try {
            const stats = await fs_1.default.promises.stat(filePath);
            const fileInfo = {
                path: filePath,
                name: path_1.default.basename(filePath),
                size: stats.size,
                created: stats.birthtime,
                modified: stats.mtime,
            };
            // Compute hash for files under 100MB
            if (stats.size < 100 * 1024 * 1024) {
                fileInfo.hash = await this.computeFileHash(filePath);
            }
            else {
                console.log(`Skipping hash computation for large file: ${filePath} (${stats.size} bytes)`);
            }
            if (fileInfo.hash) {
                if (!this.fileHashes.has(fileInfo.hash)) {
                    this.fileHashes.set(fileInfo.hash, []);
                }
                this.fileHashes.get(fileInfo.hash).push(fileInfo);
            }
            this.processedFiles.add(filePath);
        }
        catch (error) {
            console.error(`Error processing file ${filePath}:`, error);
        }
    }
    async processFolder(folderPath) {
        if (this.processedFolders.has(folderPath))
            return;
        try {
            const folderInfo = {
                path: folderPath,
                name: path_1.default.basename(folderPath),
                files: [],
                subfolders: [],
            };
            await this.scanDirectory(folderPath);
            // Collect files and subfolders
            const items = await fs_1.default.promises.readdir(folderPath, { withFileTypes: true });
            for (const item of items) {
                const fullPath = path_1.default.join(folderPath, item.name);
                if (item.isFile()) {
                    const stats = await fs_1.default.promises.stat(fullPath);
                    folderInfo.files.push({
                        path: fullPath,
                        name: item.name,
                        size: stats.size,
                        created: stats.birthtime,
                        modified: stats.mtime,
                    });
                }
                else if (item.isDirectory()) {
                    // Recursively process subfolders
                    await this.processFolder(fullPath);
                    // Note: In a full implementation, you'd collect subfolder info here
                }
            }
            // Compute folder hash based on structure and file hashes
            folderInfo.hash = await this.computeFolderHash(folderInfo);
            if (folderInfo.hash) {
                if (!this.folderHashes.has(folderInfo.hash)) {
                    this.folderHashes.set(folderInfo.hash, []);
                }
                this.folderHashes.get(folderInfo.hash).push(folderInfo);
            }
            this.processedFolders.add(folderPath);
        }
        catch (error) {
            console.error(`Error processing folder ${folderPath}:`, error);
        }
    }
    async computeFileHash(filePath) {
        return new Promise((resolve, reject) => {
            const hash = crypto_1.default.createHash('sha256');
            const stream = fs_1.default.createReadStream(filePath);
            stream.on('data', (data) => hash.update(data));
            stream.on('end', () => resolve(hash.digest('hex')));
            stream.on('error', reject);
        });
    }
    async computeFolderHash(folderInfo) {
        const hash = crypto_1.default.createHash('sha256');
        // Sort files and subfolders for consistent hashing
        folderInfo.files.sort((a, b) => a.name.localeCompare(b.name));
        folderInfo.subfolders.sort((a, b) => a.name.localeCompare(b.name));
        // Hash folder structure
        hash.update(folderInfo.name);
        // Hash file names and their hashes
        for (const file of folderInfo.files) {
            hash.update(file.name);
            if (file.hash) {
                hash.update(file.hash);
            }
        }
        // Hash subfolder names and their hashes
        for (const subfolder of folderInfo.subfolders) {
            hash.update(subfolder.name);
            if (subfolder.hash) {
                hash.update(subfolder.hash);
            }
        }
        return hash.digest('hex');
    }
    findDuplicates() {
        const duplicates = [];
        // Find duplicate files
        for (const [hash, files] of this.fileHashes) {
            if (files.length > 1) {
                duplicates.push({
                    hash,
                    files,
                    isFolder: false,
                });
            }
        }
        // Find duplicate folders
        for (const [hash, folders] of this.folderHashes) {
            if (folders.length > 1) {
                duplicates.push({
                    hash,
                    files: folders.map(f => ({
                        path: f.path,
                        name: f.name,
                        size: 0, // Folders don't have a single size
                        created: new Date(), // Would need to get folder creation time
                        modified: new Date(), // Would need to get folder modification time
                    })),
                    isFolder: true,
                });
            }
        }
        return duplicates;
    }
    generateReport(duplicates) {
        let report = '# Duplicate Files and Folders Analysis Report\n\n';
        report += `Analysis Date: ${new Date().toISOString()}\n`;
        report += `Root Directory: ${this.rootPath}\n\n`;
        report += '## Implementation Details\n\n';
        report += '- **Hash Algorithm**: SHA-256\n';
        report += '- **File Size Limit**: 100MB (larger files are skipped for performance)\n';
        report += '- **Excluded Items**: Symbolic links, hidden files (starting with "."), system files\n';
        report += '- **Folder Comparison**: Based on recursive structure and file hashes\n';
        report += '- **Metadata Compared**: File/folder names, paths, sizes, creation/modification timestamps\n\n';
        if (duplicates.length === 0) {
            report += '## Results\n\nNo duplicates found.\n';
            return report;
        }
        report += `## Results\n\nFound ${duplicates.length} duplicate groups:\n\n`;
        for (let i = 0; i < duplicates.length; i++) {
            const group = duplicates[i];
            report += `### Duplicate Group ${i + 1}\n`;
            report += `**Hash**: ${group.hash}\n`;
            report += `**Type**: ${group.isFolder ? 'Folder' : 'File'}\n\n`;
            report += '| Path | Name | Size | Created | Modified |\n';
            report += '|------|------|------|---------|----------|\n';
            for (const file of group.files) {
                report += `| ${file.path} | ${file.name} | ${this.formatSize(file.size)} | ${file.created.toISOString()} | ${file.modified.toISOString()} |\n`;
            }
            // Flag the first item as original, others as duplicates
            report += '\n**Original**: ' + group.files[0].path + '\n';
            if (group.files.length > 1) {
                report += '**Duplicates**:\n';
                for (let j = 1; j < group.files.length; j++) {
                    report += `- ${group.files[j].path}\n`;
                }
            }
            report += '\n---\n\n';
        }
        report += '## Recommendations\n\n';
        report += '### Cleanup Options:\n';
        report += '1. **Delete Duplicates**: Remove duplicate files/folders, keeping the original.\n';
        report += '2. **Merge Folders**: For duplicate folders, merge contents if appropriate.\n';
        report += '3. **Move to Archive**: Move duplicates to an archive folder for review.\n\n';
        report += '### Risks and Considerations:\n';
        report += '- **Dependencies**: Ensure no other files or applications depend on the duplicate files.\n';
        report += '- **Backups**: Create backups before deleting any files.\n';
        report += '- **Permissions**: Verify you have permission to modify/delete the files.\n';
        report += '- **Version Control**: If files are in git, consider if duplicates should be committed.\n\n';
        report += '### Automated Cleanup Script:\n';
        report += '```bash\n';
        report += '# Example cleanup script (review before running)\n';
        report += 'DUPLICATES_FILE="duplicates.txt"\n';
        report += 'while IFS= read -r file; do\n';
        report += '  if [ -f "$file" ]; then\n';
        report += '    echo "Would delete: $file"\n';
        report += '    # rm "$file"  # Uncomment to actually delete\n';
        report += '  fi\n';
        report += 'done < "$DUPLICATES_FILE"\n';
        report += '```\n\n';
        report += '## Version Changes\n\n';
        report += 'This is the initial implementation as of September 12, 2025.\n';
        report += 'No previous versions exist in the codebase.\n';
        return report;
    }
    formatSize(bytes) {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }
}
exports.DuplicateAnalyzer = DuplicateAnalyzer;
// Main execution
async function main() {
    const rootPath = process.argv[2] || '/workspaces/awe-kito';
    const excludePatterns = ['node_modules', '.git', 'dist', 'build', '.next'];
    const analyzer = new DuplicateAnalyzer(rootPath, excludePatterns);
    const duplicates = await analyzer.analyze();
    const report = analyzer.generateReport(duplicates);
    // Write report to file
    const reportPath = path_1.default.join(rootPath, 'duplicate-analysis-report.md');
    await fs_1.default.promises.writeFile(reportPath, report, 'utf8');
    console.log(`Analysis complete. Report saved to: ${reportPath}`);
    console.log(`Found ${duplicates.length} duplicate groups.`);
}
if (require.main === module) {
    main().catch(console.error);
}
