#!/usr/bin/env bun

import { readFileSync } from "node:fs";
import { S3Client } from "bun";

try {
	const env = readFileSync(".env.local", "utf-8");
	for (const line of env.split("\n")) {
		const [k, ...v] = line.trim().split("=");
		if (k && !k.startsWith("#") && v.length) process.env[k] = v.join("=");
	}
} catch {}

const s3 = new S3Client({
	accessKeyId: process.env.RUSTFS_ACCESS_KEY || "rustfsadmin",
	secretAccessKey: process.env.RUSTFS_SECRET_KEY || "rustfsadmin",
	bucket: process.env.RUSTFS_BUCKET || "test-bucket",
	region: process.env.RUSTFS_REGION || "us-east-1",
	endpoint: process.env.RUSTFS_ENDPOINT || "http://localhost:9000",
});

const content = `Hello from Bun S3Client!\nTest timestamp: ${new Date().toISOString()}\nThis is a test file for rustfs upload/download verification.`;
const file = s3.file("test-file.txt");

try {
	await file.write(content);
	const downloaded = await file.text();
	if (downloaded !== content) throw new Error("Content mismatch");
	console.log("✅ Test passed!");
	process.exit(0);
} catch (e) {
	console.error(`❌ ${e instanceof Error ? e.message : e}`);
	process.exit(1);
}
